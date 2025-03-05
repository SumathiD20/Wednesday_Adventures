# Stage 1: Build the frontend
FROM node:18.19.1 as frontend-builder

# Set the working directory for the frontend
WORKDIR /app/frontend

# Copy frontend package.json and package-lock.json into the container
COPY frontend/package.json frontend/package-lock.json ./ 

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend code (from the 'frontend' directory)
COPY frontend/ .

# Build the frontend
RUN npm run build

# Stage 2: Build the backend
FROM node:18.19.1 as backend-builder

# Set the working directory for the backend
WORKDIR /app/project-backend

# Copy backend package.json and package-lock.json into the container
COPY project-backend/package.json project-backend/package-lock.json ./ 

# Install backend dependencies
RUN npm install

# Copy the rest of the backend code (from the 'project-backend' directory)
COPY project-backend/ .

# Stage 3: Create the final image
FROM node:18.19.1

# Set the working directory for the final image
WORKDIR /app

# Copy the backend code and dependencies from the 'backend-builder' stage
COPY --from=backend-builder /app/project-backend ./project-backend

# Copy the built frontend files (the build output) from the 'frontend-builder' stage to /public
COPY --from=frontend-builder /app/frontend/build ./public

# Expose the port the backend runs on (assuming backend is running on port 3000)
EXPOSE 3000

# Command to run the backend server
CMD ["node", "server.js"]
