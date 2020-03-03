FROM node:latest

RUN npm install -g nodemon

WORKDIR /usr/app

EXPOSE 80
