FROM node:lts-buster
MAINTAINER mrt

WORKDIR /opt/web

COPY ./package*.json ./

RUN npm install

COPY . .
EXPOSE 3000