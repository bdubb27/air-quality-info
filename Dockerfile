FROM node:18-alpine AS base
WORKDIR /
COPY package.json ./
RUN yarn install

FROM base AS build
COPY public ./public
COPY src ./src
RUN yarn run build

FROM nginx:alpine
COPY --from=build /build /usr/share/nginx/html
