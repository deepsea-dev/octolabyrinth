# TODO this could be converted to a multi-stage build
FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)arn ci
COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./

RUN yarn install --frozen-lockfile
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY ./src .

# Bundle react app
COPY ./app ./app-src
RUN yarn --cwd app-src install --frozen-lockfile
RUN yarn --cwd app-src run build

RUN mv app-src/build ./site

EXPOSE 8088
ENV NODE_ENV='production'
CMD node --experimental-specifier-resolution=node --loader ts-node/esm index.ts