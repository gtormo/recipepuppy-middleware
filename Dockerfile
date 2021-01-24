FROM node:14.15.1-alpine3.10

RUN apk add -qU git

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN apk del git --quiet

CMD ["npm", "run", "start"]