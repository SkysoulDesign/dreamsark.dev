FROM php:fpm-alpine

RUN truncate -s 0 /etc/apk/repositories && \
    echo "http://mirrors.aliyun.com/alpine/v3.4/main" >> /etc/apk/repositories && \
    echo "http://mirrors.aliyun.com/alpine/v3.4/community" >> /etc/apk/repositories && \
    echo "http://mirrors.aliyun.com/alpine/v3.4/releases" >> /etc/apk/repositories

RUN docker-php-ext-install pdo pdo_mysql
RUN curl -sS https://getcomposer.org/installer | php && \
    mv composer.phar /usr/local/bin/composer

CMD ["php-fpm"]
