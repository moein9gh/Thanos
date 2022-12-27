FROM node:lts-buster
MAINTAINER mrt

WORKDIR /opt/web

COPY ./package*.json ./

RUN npm install

COPY . .

RUN cp -r ./src/gateway/grpc/protos ./dist/gateway/grpc

EXPOSE 3000