# NGINX

## Location
file location : /etc/nginx/sites-available (sudo -su)

## Create a symbolic link
`
cd /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/your_site_config_file.conf
ls -l
sudo systemctl reload nginx
`
