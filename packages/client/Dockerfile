FROM node:12.20.1

RUN apt-get update

WORKDIR /home/app

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .
