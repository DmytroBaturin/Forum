FROM node:16

RUN mkdir -p /usr/src/app/backend

WORKDIR /usr/src/app/backend

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "start"]
