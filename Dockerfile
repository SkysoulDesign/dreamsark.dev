FROM ubuntu:latest
FROM mysql:latest
ENV MYSQL_ROOT_PASSWORD 478135
ENV MYSQL_DATABASE dreamsark
ENV MYSQL_USER root
ENV MYSQL_PASSWORD 478135

FROM php:7.0.6-apache
ADD dreamsark.dev.conf /etc/apache2/sites-available/
RUN a2ensite dreamsark.dev.conf

RUN apt-get update
RUN groupadd docker
WORKDIR /var/www
VOLUME . .
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN php composer-setup.php --install-dir=/usr/bin --filename=composer
RUN php -r "unlink('composer-setup.php');"
RUN apt-get -y install cron nano git && service apache2 restart
RUN composer install
