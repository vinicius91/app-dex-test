
start-docker:
	- docker-compose build
	- docker-compose up

start-node:
	- npm install
	- npm start

build:
	- npm run build

test:
	- rm -rf tests/screenshots
	- npm run build
	- npm run test


