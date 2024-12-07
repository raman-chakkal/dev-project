# Use the official Node.js image as the base
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy application files
COPY . .

# Expose the port your application runs on
EXPOSE 3000

# Run the application
CMD ["npm", "start"]
