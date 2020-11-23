build:
	yarn build

dkbuild:
	docker-compose build

dkup:
	docker-compose up

dkdown:
	docker-compose down

dkup/build:
	docker-compose up --build

.PHONY: test
test:
	yarn test

.PHONY: coverage
coverage:
	yarn test:cov
