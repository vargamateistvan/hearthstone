FROM node:12

WORKDIR /usr/Documents/hearthstone

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "client" ]
