FROM node:18-alpine

WORKDIR /usr/src/app
COPY package.json .

RUN yarn install
RUN yarn build

COPY . .
