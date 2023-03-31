# Trials of Banshee
Website application for *trials-of-banshee.com*

### Clone
Don't forget the submodules for translations:  
`git clone --recurse-submodules git@github.com:Dowdow/trials-of-banshee.git`

### .htaccess
Apache `.htaccess` conf for Symfony, adapted for the Trials of Banshee:  
```apacheconf
DirectoryIndex index.php

<IfModule mod_negotiation.c>
    Options -MultiViews
</IfModule>

<IfModule mod_rewrite.c>
    RewriteEngine On

    RewriteCond %{SERVER_PORT} 80
    RewriteRule .* https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]

    RewriteCond %{HTTP_HOST} ^www.trials-of-banshee\.com [NC]
    RewriteRule ^(.*)$ https://trials-of-banshee.com/$1 [L,R=301]
	
    RewriteCond %{REQUEST_URI}::$0 ^(/.+)/(.*)::\2$
    RewriteRule .* - [E=BASE:%1]

    RewriteCond %{HTTP:Authorization} .+
    RewriteRule ^ - [E=HTTP_AUTHORIZATION:%0]

    RewriteCond %{ENV:REDIRECT_STATUS} =""
    RewriteRule ^index\.php(?:/(.*)|$) %{ENV:BASE}/$1 [R=301,L]

    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ %{ENV:BASE}/index.php [L]
</IfModule>

<IfModule !mod_rewrite.c>
    <IfModule mod_alias.c>
        RedirectMatch 307 ^/$ /index.php/
    </IfModule>
</IfModule>
```
