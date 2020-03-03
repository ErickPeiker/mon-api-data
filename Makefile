#/bin/bash

ifneq (,$(wildcard .env))
	include .env
endif

DOCKER=docker-compose
DOCKER_EXEC=$(DOCKER) exec web

up:
	$(DOCKER) up -d --remove-orphans --force-recreate

down:
	$(DOCKER) down

install:
	$(DOCKER_EXEC) yarn install

nodemon:
	$(DOCKER_EXEC) nodemon

mongo:
	$(DOCKER) exec mongo mongo
