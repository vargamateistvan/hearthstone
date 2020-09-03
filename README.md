## Innkeepers

This app is works with Hearthstone Game Data API
https://develop.battle.net/documentation/hearthstone/game-data-apis


Add a *.env* file to the root directory with:
Get the credentials from here: https://develop.battle.net/access

```
REACT_APP_BNET_ID = Client ID
REACT_APP_BNET_SECRET = Client Secret
REACT_APP_APOLLO_SERVER = Server location (http://localhost:4000/)
REACT_APP_SENTRY = Sentry url
```

Install lerna globally
```
npm i lerna -g
```

Install dependencies
```
make install
```

Start server
```
npm run server
```

Server running on http://localhost:4000

Start client
```
npm run client
```

Client running on http://localhost:3000

## Run with docker

Build docker images

```
make build
```

Run docker image (You dont have to build the images before running)

```
make up
```