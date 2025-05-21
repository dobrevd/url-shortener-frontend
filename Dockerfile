FROM node:23-alpine AS build

ARG ANGULAR_ENV=production

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration $ANGULAR_ENV

FROM nginx:alpine
COPY --from=build /app/dist/my-project/browser /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]