FROM node:10.13.0

RUN apt-get update
RUN npm i -g yarn

WORKDIR /home/app

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

EXPOSE 8000

CMD yarn start
