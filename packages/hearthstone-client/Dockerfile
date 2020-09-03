FROM node:12-alpine

WORKDIR /usr/src/app/packages/hearthstone-client

RUN npm install

COPY package*.json ./

COPY . .

CMD [ "npm", "run", "client" ]
