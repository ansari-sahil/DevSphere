# Lightweight Node image
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy app source
COPY . .

# Exponse app port
EXPOSE 5000

# Start app
CMD ["npm", "start"]
