FROM node:12

RUN npm install -g nodemon

WORKDIR /usr/Documents/hearthstone-server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "server" ]
