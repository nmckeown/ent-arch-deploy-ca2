# Use official Node.js image as the base
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Start the application 
#CMD ["node", "fe-server.js"]
ENTRYPOINT ["node", "fe-server.js"]