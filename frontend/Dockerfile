# Stage 1: Build the frontend
FROM node:18.19.1 as frontend-builder

# Set working directory inside container
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all frontend files (relative to frontend directory)
COPY . .

# Set environment variable
ENV REACT_APP_ENV_ENDPOINT=https://wednesdayadventures.me

# Build the application
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy build output
COPY --from=frontend-builder /app/build /usr/share/nginx/html

# Copy Nginx config (ensure this file exists in frontend directory)
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
