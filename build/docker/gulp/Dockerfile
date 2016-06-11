FROM node:slim

#ENV HOME=/home/data
#ENV APP_BASE_DIR=$HOME
#ENV DOCKER_USER_ID=1000
#
#WORKDIR $HOME
#VOLUME $HOME

RUN apt-get update
RUN apt-get install -y python-software-properties build-essential
RUN apt-get clean
RUN rm -rf /var/lib/apt/lists/*
RUN npm install -g gulp bower typescript typings

#RUN usermod -u ${DOCKER_USER_ID:-$DOCKER_USER_ID} www-data \
#    && mkdir -p ${APP_BASE_DIR:-$HOME}

#ENTRYPOINT top -b
ENTRYPOINT gulp watch