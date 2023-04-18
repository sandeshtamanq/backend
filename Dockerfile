FROM node:19-alpine as base

WORKDIR /home/node/app

COPY package.json .

RUN yarn install

COPY . .

FROM  base as production


RUN  yarn build

CMD [ "yarn", "start" ]