FROM node:18-alpine

WORKDIR /usr/src/app
COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .
COPY /src ./src

RUN yarn install
RUN yarn build

COPY . .
