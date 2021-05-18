FROM node:16.1.0-alpine3.13 as base
WORKDIR /usr/src/app

# Install the deps in temp to cache them
FROM base AS install
# Install for testing use
RUN mkdir -p /temp/dev
COPY package.json yarn.lock /temp/dev/
RUN cd /temp/dev && yarn install --frozen-lockfile

# Install for production use
RUN mkdir -p /temp/prod
COPY package.json yarn.lock /temp/prod/
RUN cd /temp/prod && yarn install --frozen-lockfile --prod

# Build the application
FROM install AS build
COPY --from=install /temp/dev/node_modules node_modules
COPY . .
#RUN yarn lint # If you add eslint, uncomment this line
RUN yarn test
RUN yarn audit --production
ENV NODE_ENV=production
RUN yarn build

# Release
FROM base AS release
# Copy only the packages requried for production
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=build /usr/src/app/dist dist
COPY --from=build /usr/src/app/package.json .

USER node
ENV NODE_ENV=production

ENTRYPOINT [ "yarn", "start" ]