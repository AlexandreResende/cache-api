FROM node:16

WORKDIR /poupa-up

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 7777

CMD ["npm", "start"]