# Use the official Node.js image.
FROM node:18

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy local code to the container image.
COPY . .

# Change the ownership of the directory to a non-root user
RUN chown -R node:node /usr/src/app

# Switch to the non-root user
USER node

# Run the web service on container startup.
CMD ["node", "index.js"]
