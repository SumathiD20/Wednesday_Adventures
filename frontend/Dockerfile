# Stage 1: Build the frontend
FROM node:18.19.1 as frontend-builder

# Set the working directory for the frontend
WORKDIR /app

# Copy frontend package.json and package-lock.json into the container
COPY frontend/package.json frontend/package-lock.json ./frontend/

# Install frontend dependencies
WORKDIR /app/frontend
RUN npm install

# Copy the rest of the frontend code
COPY frontend/ ./frontend/

# Set environment variable for staging
ENV REACT_APP_ENV_ENDPOINT=http://staging.wednesdaysadventures.me

# Build the frontend
RUN npm run build

# Stage 2: Serve the frontend
FROM nginx:alpine

# Copy the built frontend files to Nginx's serving directory
COPY --from=frontend-builder /app/frontend/build /usr/share/nginx/html

# Expose the default Nginx port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
