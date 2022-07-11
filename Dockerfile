FROM node:18-alpine AS build
WORKDIR /
COPY package.json ./
RUN yarn install
COPY public ./public
COPY src ./src
RUN yarn run build

FROM nginx:alpine
COPY --from=build /build /usr/share/nginx/html
