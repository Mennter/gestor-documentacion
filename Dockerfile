FROM nginx:1.15-alpine

LABEL maintainer="Ezequiel"

WORKDIR /

RUN rm -rf /usr/share/nginx/html/*
COPY dist/edm-soflex /usr/share/nginx/html

RUN chmod +w /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD nginx -g 'daemon off;'
