# Stage 1: Build the backend
FROM node:18.19.1 as backend-builder

# Set the working directory for the backend
WORKDIR /app

# Copy backend package.json and package-lock.json into the container
COPY project-backend/package.json project-backend/package-lock.json ./project-backend/

# Install backend dependencies
WORKDIR /app/project-backend
RUN npm install

# Copy the rest of the backend code
COPY project-backend/ ./project-backend/

# Set environment variable for API
ENV FRONTEND_URL=http://api.wednesdayadventures.me

# Expose the port the backend runs on
EXPOSE 3000

# Command to run the backend server
CMD ["node", "index.js"]
