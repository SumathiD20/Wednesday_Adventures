# Stage 1: Build the frontend
FROM node:18.19.1 as frontend-builder

# Set the working directory for the frontend
WORKDIR /app/frontend

# Copy frontend package.json and package-lock.json
COPY frontend/package.json frontend/package-lock.json ./ 

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend code
COPY frontend/ .

# Build the frontend
RUN npm run build

# Stage 2: Build the backend
FROM node:18.19.1 as backend-builder

# Set the working directory for the backend
WORKDIR /app/project-backend  # Corrected to project-backend directory

# Copy backend package.json and package-lock.json
COPY project-backend/package.json project-backend/package-lock.json ./  # Copying correctly from project-backend

# Install backend dependencies
RUN npm install

# Copy the rest of the backend code
COPY project-backend/ .  # Ensure this copies all the necessary backend files

# Stage 3: Create the final image
FROM node:18.19.1

# Set the working directory for the final image
WORKDIR /app

# Copy backend dependencies and source code
# This copies the contents of /app/project-backend from backend-builder into the final image
COPY --from=backend-builder /app/project-backend ./project-backend

# Copy the built frontend files
# Copy the build output from the frontend-builder to the final image
COPY --from=frontend-builder /app/frontend/build ./public

# Expose the port the backend runs on
EXPOSE 3000

# Command to run the backend server
CMD ["node", "server.js"]
