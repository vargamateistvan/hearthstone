FROM node:12

WORKDIR /usr/Documents/hearthstone-server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8081

CMD [ "node", "server.js" ]
