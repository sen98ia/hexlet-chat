install:
	npm ci

start:
	npx start-server -s ./frontend/dist

build:
	rm -rf frontend/dist
	cd frontend/ && npm run build

start-frontend:
	cd frontend && npm run dev

start-backend:
	npx start-server -s ./frontend/dist

develop:
	make start-backend & make start-frontend
