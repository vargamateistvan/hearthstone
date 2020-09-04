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
NODE_ENV = "development"
PUBLIC_URL = http://localhost:3000
```

## Install docker compose

https://docs.docker.com/compose/install/


## Run with docker

Build docker images

```
make build
```

Run docker image (You dont have to build the images before running)

```
make up
```