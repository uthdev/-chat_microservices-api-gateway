FROM node:12

WORKDIR /opt/app

RUN npm install

CMD npm run watch