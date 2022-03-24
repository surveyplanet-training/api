# | STAGE 1 | (production base)
# Installs production dependencies and sets environmental variables
# Keep this version latest patch
FROM node:14.19-slim AS base

ARG version
ARG npm_token

LABEL menu.maintainer="Luka Markovic <luka.markovic.it@protonmail.com>"
LABEL menu.project="API"
LABEL menu.description="Menu API Docker Image"
LABEL menu.version=${version:-latest}
LABEL menu.nodeversion=14.19.0

ENV NODE_ENV=production
ENV BASE_DIR=/var/www
ENV APP_DIR=$BASE_DIR/api
ENV PORT=9000
ENV AWS_DEFAULT_REGION=eu-central-1

EXPOSE $PORT

RUN mkdir -p $APP_DIR
RUN chown -R node:node $BASE_DIR

WORKDIR $APP_DIR

USER node

ENV PATH $BASE_DIR/node_modules/.bin/:$PATH


# | STAGE 2 | (add npm token and install prod modules)
FROM base as modules
# Install node modules into the parent directory so they're not shared
# with host OS. This ensures binary compatability with Linux vs. Mac
# for node_modules/.bin things
# NOTE: we're splitting this out from base so we can later start
# from base and avoid any secrets during this stage.
# Later we'll copy node_modules from this stage
WORKDIR $BASE_DIR

# needed to pull private node module during npm install

COPY package.json package-lock.json* ./

# add npm token, install prod-only dependencies, then cleanup
# combine these commands to speed up builds, reduce layer count, and
# prevent .npmrc from ever being saved to a layer (securit-ah!)
RUN echo "//registry.npmjs.org/:_authToken=${npm_token}" > /var/www/.npmrc \
      && npm ci \
      && rm /var/www/.npmrc \
      && npm cache clean --force


WORKDIR $APP_DIR



# | STAGE 3 | (development)
# Only used when targeting development and CI, not in production image
# All files are retrieved in a the bind mount so there is no copy command,
# This saves time when building locally
FROM modules as development

# This can be changed by setting API_TARGET e.g.: API_TARGET=staging
ENV NODE_ENV=development

USER root

# These come in hande for debugging in staging env
RUN apt-get -y update \
&& apt-get -y install curl \
&& apt-get -y install tree \
&& apt-get -y install vim

USER node

WORKDIR $BASE_DIR

RUN npm install

WORKDIR $APP_DIR

# RUN ls -alH

# RUN ls -alH ../node_modules/.bin

CMD ["../node_modules/.bin/nodemon", "--legacy-watch", "index.js"]



# | STAGE 4 | (fresh image, copy in prod modules and source code)
# Copy source code into the build process. Copy gets so it doesn't happen twice.
FROM base as source
WORKDIR $BASE_DIR
COPY --from=modules --chown=node:node $BASE_DIR/node_modules $BASE_DIR/node_modules
WORKDIR $APP_DIR
COPY --chown=node:node . .


# | STAGE 5 | (testing)
# Run unit tests in development or staging but not in production.
FROM source as test

ENV NODE_ENV=staging
ENV TESTING=true
# disable rate limiting for testing since codebuild does not have access to Redis server
ENV DISABLE_RATE_LIMIT=true

# Copy all dependencies from development
COPY --from=development --chown=node:node $BASE_DIR/node_modules $BASE_DIR/node_modules

# audit node modules
# RUN better-npm-audit audit --production

CMD ["npm", "test"]


# | STAGE 6 | (staging)
# For use in staging cluster
FROM source as staging

ENV NODE_ENV=staging

USER root

# These come in hande for debugging in staging env
RUN apt-get -y update \
&& apt-get -y install curl \
&& apt-get -y install vim

USER node

HEALTHCHECK --interval=30s CMD healthcheck http://localhost:$PORT/liveness --type json --search live=1

CMD ["node", "index.js"]


# | STAGE 7 | (default, production)
# Run by default if target is not included.
FROM source as production

ENV NODE_ENV=production

HEALTHCHECK --interval=30s CMD healthcheck http://localhost:$PORT/liveness --type json --search live=1

CMD ["node", "index.js"]
