# Stage 1: Build Angular app
FROM node:lts-slim AS build
WORKDIR /src

COPY package*.json ./
RUN npm ci
COPY . ./
ARG BASE_HOST="http://localhost:9090"
RUN BASE_HOST=${BASE_HOST} npm run build -- --configuration=production --output-path=dist

# Stage 2: Serve with Nginx
FROM nginx:stable AS final
EXPOSE 80

# Copy built Angular app to nginx
COPY --from=build /src/dist/browser /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf
