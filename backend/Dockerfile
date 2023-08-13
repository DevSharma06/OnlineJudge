FROM node:20-alpine
RUN npm install -g nodemon
WORKDIR /oj_backend
COPY package.json .
RUN npm install
RUN apk add python3
RUN apk add g++
RUN apk add build-base
RUN apk add openjdk11
COPY . .
EXPOSE 4000
CMD ["node", "server.js"]