# NGINX

## Location

```bash
 # use sudo
 cd /etc/nginx/sites-available
```

## Create a symbolic link
```bash
cd /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/your_site_config_file.conf
ls -l
sudo nginx -t
sudo systemctl reload nginx
```

## Nginx command

```bash
sudo nginx -t
sudo nginx -s reload
```

## Nginx config

```bash
server {

    listen 80;
    server_name             localhost;
    client_max_body_size    100M;
    root                    /home/ix-0026/devs/gits/alfred-web/public;
    add_header              'Access-Control-Allow-Origin' *;
    add_header              'Access-Control-Allow-Credentials' 'true' always;
    add_header              'Access-Control-Allow-Headers' 'Authorization, Accept, Origin, DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Content-Range, Range' always;
    server_tokens           off;
    add_header              X-Frame-Options SAMEORIGIN;
    add_header              X-Content-Type-Options nosniff;
    add_header              X-XSS-Protection "1; mode=block";
    # THIS WILL CAUSE PROBLEMS WHEN SOME EXTERNAL SITE TRIED TO CONNECT TO IT. FOR INSTANCE "web-socket"
    # EITHER COMMENT IT OR ADD SOME EXTRA CONF.
    # add_header              Content-Security-Policy "default-src 'self'; script-src * 'self' 'unsafe-inline' 'unsafe-eval'; style-src * 'self' 'unsafe-inline'; font-src * 'self' data:";


    proxy_connect_timeout       1200s;
    proxy_send_timeout          1200s;
    proxy_read_timeout          1200s;


    location / {
        try_files $uri @backend;

    }

    location @backend {
        proxy_pass          http://backend;
        proxy_set_header    X-Real-IP $remote_addr;
        proxy_set_header    Host $host;
        proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header    Upgrade $http_upgrade;
        proxy_set_header    Connection "upgrade";
        proxy_set_header    X-Forward-Proto http;
        proxy_set_header    X-Nginx-Proxy true;
        proxy_set_header    X-Forwarded-Proto https;
        proxy_http_version  1.1;
    }
}
```

