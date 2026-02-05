FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 8080

ENV PORT=8080
CMD [ "node", "src/server.js" ]
