FROM node:lts-alpine

RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . ./
EXPOSE 3000

CMD ["npm", "run","dev"]