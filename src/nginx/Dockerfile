FROM valian/docker-nginx-auto-ssl

COPY nginx.conf.template nginx-no-ssl.conf.template gzip.conf /usr/local/openresty/nginx/conf/

# wait for it script
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /bin/wait-for-it
RUN chmod +x /bin/wait-for-it

COPY entrypoint-nginx.sh /entrypoint-nginx.sh
RUN mkdir -p /www/data/frontend

ENTRYPOINT ["/entrypoint-nginx.sh"]
CMD ["/usr/local/openresty/bin/openresty", "-g", "daemon off;"]
