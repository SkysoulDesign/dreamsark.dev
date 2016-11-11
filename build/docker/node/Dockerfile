FROM node:latest

RUN truncate -s 0 /etc/apt/sources.list && \
    echo \
    "deb http://mirrors.aliyun.com/debian jessie main contrib non-free" \
    "deb http://mirrors.aliyun.com/debian jessie-updates main contrib non-free" \
    "deb http://mirrors.aliyun.com/debian-security jessie/updates main contrib non-free" \
    >> /etc/apt/sources.list

RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y libcairo2-dev libjpeg-dev \
    libpango1.0-dev libgif-dev build-essential g++ gcc \
    graphicsmagick imagemagick

ENV NODEJS_ORG_MIRROR=http://npm.taobao.org/mirrors/node

RUN npm config set registry https://registry.npm.taobao.org && \
    npm config set python /usr/bin/python2.7 && \
    npm install -g node-gyp gulp typings yarn

RUN mkdir /src
WORKDIR /src

EXPOSE 3000

#CMD ["node", "server.js"]
CMD ["top", "-b"]

#ENTRYPOINT "docker-entrypoint.sh"
