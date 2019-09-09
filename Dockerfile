FROM nginx:alpine AS builder

COPY . /usr/share/nginx/html
COPY ./nginx-default.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

RUN apk update && apk add nodejs npm && apk add git
RUN npm install 
RUN npm run build

# Fin del Builder

FROM nginx:alpine AS prod

COPY --from=builder /usr/share/nginx/html/dist/octo-alain /usr/share/nginx/html/dist/octo-alain
COPY ./nginx-default.conf /etc/nginx/conf.d/default.conf