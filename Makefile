make start:
	npx start-server -s ./frontend/dist
make build:
	rm -rf frontend/dist
	npm run build
