FROM node:16

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV NODE_PATH=./build

CMD ["npm", "run", "build"]