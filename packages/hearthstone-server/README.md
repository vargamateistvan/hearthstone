## Innkeepers - Server

This app is works with Hearthstone Game Data API
https://develop.battle.net/documentation/hearthstone/game-data-apis

To install all dependencies run:

```
npm install
```

Add a *.env* file to the root directory with:
Get the credentials from here: https://develop.battle.net/access

```
REACT_APP_BNET_ID = Client ID
REACT_APP_BNET_SECRET = Client Secret
```

In the project directory, you can run:

```
npm run server
```

Server running on localhost:4000

## Run with docker

Build docker images

```
docker build -t <your_dockerhub_username>/hearthstone-server .  
```

Run docker image

```
docker run -t <your_dockerhub_username>/hearthstone-server
```