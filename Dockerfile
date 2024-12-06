# Use the official Node.js image as a base
FROM node:16

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 8574

# Command to run the app
CMD ["node", "index.js"]
