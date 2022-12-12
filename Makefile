build-dev:
	@docker build -f Dockerfile.dev -t pgres-test .

build-prod:
	@docker build -f Dockerfile.prod -t pgres-test .

run:
	@docker run -p 4000:3000 --net=host --name pgres-app pgres-test

build-db:
	@docker build -f Dockerfile.database -t pgres-db .

run-db:
	@docker run -d -p 5433:5432 --net=host --name pgres-database pgres-db sleep infinity

stop:
	@docker stop pgres-app
	@docker stop pgres-database

teardown-db:
	@docker rm pgres-database
	@docker rmi pgres-db

teardown:
	@docker rm pgres-app
	@docker rmi pgres-test

init-db:
	@psql -U postgres -f migrations/createdb/once.sql

drop-db:
	@psql -U postgres -f migrations/createdb/down.sql

db-upgrade:
	@for folder in $(shell ls migrations -tr); \
	do \
		if [[ -f "migrations/$$folder/up.sql" ]]; \
		then psql -U postgres -d pgres_db -f "migrations/$$folder/up.sql"; \
		fi \
	done

lastMigration:=$(shell migrations=($$(ls migrations -t)); \
	echo $${migrations[0]})
db-downgrade:
	echo "Dropping migration $(lastMigration)"
	@psql -U postgres -d pgres_db -f migrations/$(lastMigration)/down.sql

list-migrations:
	@ls migrations -tr
