FROM php:8.2-apache

SHELL ["/bin/bash", "-c"]

# Updates
RUN apt-get update && apt-get -y upgrade

# Packages
RUN apt-get install -y apt-utils git libonig-dev libicu-dev pipx rsync sshpass unzip wget zip zsh

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

# SSL Certificates
RUN openssl req -x509 -out /etc/ssl/certs/tob.crt -keyout /etc/ssl/private/tob.key -newkey rsa:2048 -nodes -sha256 -subj "/C=FR/ST=Paris/L=Paris/O=Security/OU=Development/CN=trials-of-banshee.local"

# Apache vhosts
RUN a2enmod ssl
RUN a2enmod http2
COPY tob.conf /etc/apache2/sites-available/tob.conf
RUN a2ensite tob.conf

# NodeJS
RUN apt-get install -y ca-certificates curl gnupg
RUN mkdir -p /etc/apt/keyrings
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
RUN echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_21.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list
RUN apt-get update && apt-get install nodejs -y
RUN npm i -g npm

# Git
RUN git config --global --add safe.directory /var/www/html

# Ansible
RUN pipx install --include-deps ansible
RUN echo "export PATH=$PATH:/root/.local/bin" >> /root/.zshrc
RUN /root/.local/bin/ansible-galaxy install ansistrano.deploy ansistrano.rollback
