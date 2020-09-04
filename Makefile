build:
	docker-compose build

up:
	docker-compose up -d client server

down:
	docker-compose down --remove-orphans

restart: 
	down up

restart-client: 
	docker-compose restart client

restart-server: 
	docker-compose restart server

server-logs:
	docker-compose logs -f server

client-logs:
	docker-compose logs -f client

logs:
	docker-compose logs -f

install:
	npm run bootstrap
