FROM node:20-alpine
WORKDIR /oj_frontend
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]