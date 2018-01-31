#!/bin/bash

if [ "$NO_SSL" == "true" ]; then
    cp /usr/local/openresty/nginx/conf/nginx-no-ssl.conf.template /usr/local/openresty/nginx/conf/nginx.conf
else
    cp /usr/local/openresty/nginx/conf/nginx.conf.template /usr/local/openresty/nginx/conf/nginx.conf
fi

source /entrypoint.sh "$@"
