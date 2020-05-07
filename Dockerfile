FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./
COPY . /usr/src/app

RUN npm install

EXPOSE 3001

ENTRYPOINT [ "node", "index.js" ]
