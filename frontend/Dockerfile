FROM node:16

RUN mkdir -p /usr/src/app/frontend

WORKDIR /usr/src/app/frontend

COPY package*.json ./
RUN npm install -g npm@9.6.2
RUN npm install

COPY . .

CMD ["npm", "start"]