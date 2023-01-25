FROM php:8.2-apache

# Updates
RUN apt-get update && apt-get -y upgrade

# Packages
RUN apt-get install -y apt-utils git libonig-dev libicu-dev unzip wget zip zsh

# Intall ohmyzsh
RUN sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# PHP Extensions
RUN docker-php-ext-install intl mbstring pdo pdo_mysql

# PHP Config
RUN echo "memory_limit = 2048M" > $PHP_INI_DIR/conf.d/docker-php-memlimit.ini;

# Composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN php composer-setup.php
RUN php -r "unlink('composer-setup.php');"
RUN mv composer.phar /usr/local/bin/composer

# Symfony CLI
RUN wget https://get.symfony.com/cli/installer -O - | bash
RUN mv /root/.symfony5/bin/symfony /usr/local/bin/symfony

# Apache vhosts
COPY tob.conf /etc/apache2/sites-available/tob.conf
RUN a2ensite tob.conf

# NodeJS
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -y nodejs
RUN npm i -g npm