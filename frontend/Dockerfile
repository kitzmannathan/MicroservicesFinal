FROM node as vite-app

WORKDIR /app
COPY . .

RUN npm i

RUN npm run build


FROM nginx:latest as prod

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=vite-app /app/dist /usr/share/nginx/html

EXPOSE 80/tcp

CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
