FROM node:lts-alpine

RUN mkdir /app
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . ./
EXPOSE 3000

CMD ["yarn","dev"]