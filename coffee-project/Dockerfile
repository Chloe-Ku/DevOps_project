FROM node:21.1.0

COPY . /app
WORKDIR /app

RUN npm ci

ENTRYPOINT [ "node", "app.js" ]
EXPOSE 3000
