FROM node:12-alpine

RUN npm install -g nodemon

WORKDIR /usr/src/app/packages/hearthstone-server

RUN npm install

COPY package*.json ./

COPY . .

CMD [ "npm", "run", "server" ]
