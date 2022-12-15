FROM node

RUN mkdir -p /app
RUN mkdir -p /app/node_modules

WORKDIR /app

ENV SPRING_PROFILES_ACTIVE=all,dev,local
EXPOSE 3000
ENV SERVER_PORT=3000

COPY package.json /app
COPY package-lock.json /app
COPY src /app/src
COPY public /app/public
COPY .prettierrc.json /app
COPY .env /app
COPY .env.development /app
COPY vue.config.js /app
COPY index.html /app

ENTRYPOINT ["sh", "-c", "npm install; npm start -- --host 0.0.0.0"]
