FROM php:fpm-alpine
ADD . /var/www/dreamsark

RUN docker-php-ext-install pdo pdo_mysql
RUN curl -sS https://getcomposer.org/installer | php
RUN mv composer.phar /usr/local/bin

CMD ["php-fpm"]

#FROM httpd:latest
#ADD ./dreamsark.dev.conf /usr/local/apache2/htdocs/

#FROM mysql:latest
#ENV MYSQL_ROOT_PASSWORD 478135
#ENV MYSQL_DATABASE dreamsark
#ENV MYSQL_USER root
#ENV MYSQL_PASSWORD 478135

#FROM ubuntu:latest
#RUN apt-get update && apt-get -y install apache2
#EXPOSE 80

#FROM php:7.0.6-apache

#RUN a2ensite dreamsark.dev.conf

#RUN apt-get update
#RUN groupadd docker
#WORKDIR /var/www
#VOLUME /var/www
#RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
#RUN php "composer-setup.php --install-dir=/usr/bin --filename=composer"
#RUN php -r "unlink('composer-setup.php');"
#RUN apt-get -y install cron nano git && service apache2 restart
#RUN composer install
