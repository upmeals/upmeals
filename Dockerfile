FROM nginx:stable-alpine

COPY frontend/build /usr/share/nginx/html/
COPY nginx/nginx.prod.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]