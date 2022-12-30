FROM node:lts-buster

WORKDIR /opt/web

COPY ./package*.json ./

RUN npm install

COPY . .
