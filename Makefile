build:
	docker-compose up --build

up:
	docker-compose up -d client server

server-logs:
	docker-compose logs -f server

client-logs:
	docker-compose logs -f client

logs:
	docker-compose logs -f

down:
	docker-compose down --remove-orphans

restart: 
	down up

install:
	npm run bootstrap
