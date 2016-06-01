FROM node:slim
WORKDIR /var/www

RUN apt-get update
RUN apt-get install -y python-software-properties build-essential
RUN npm install -g gulp typescript typings
RUN apt-get clean
RUN rm -rf /var/lib/apt/lists/*

ENTRYPOINT top -b