# Stage 1: Build
FROM node:20.5.1 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code to the container
COPY . .

# Build the application for production
RUN npm run build

# Stage 2: Serve
FROM nginx:stable-alpine

# Copy the build output from Stage 1 to Nginx's public directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration (optional, but recommended for SPAs)
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
