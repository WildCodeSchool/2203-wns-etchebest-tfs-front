FROM node:lts-alpine

RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . ./
EXPOSE 3000

CMD ["yarn","dev"]