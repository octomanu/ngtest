FROM nginx:1.15.9-alpine

COPY ./ /var/www/html/app

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

RUN apk update && apk add vim ca-certificates