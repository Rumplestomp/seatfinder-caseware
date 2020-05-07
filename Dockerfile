FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./
COPY . /usr/src/app/

RUN npm install

EXPOSE $PORT

CMD [ "npm", "start" ]
