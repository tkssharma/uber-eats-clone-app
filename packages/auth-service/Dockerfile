FROM node:14-buster-slim

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install && \
    rm -rf /tmp/* /var/tmp/*

COPY ./docker-utils/entrypoint/init.sh /usr/local/bin/docker-entrypoint.sh

COPY . /app

RUN npm run build

EXPOSE 3000

USER node

ENV TYPEORM_MIGRATION=ENABLE
ENV NPM_INSTALL=DISABLE
CMD npm run start:prod