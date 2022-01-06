FROM node:14

WORKDIR /opt/app

RUN npm install

CMD npm run watch