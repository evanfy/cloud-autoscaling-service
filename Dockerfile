# Stage 1: Build stage (for installing dependencies)
FROM node:18-alpine AS builder

# Set working directory inside container
WORKDIR /app

# Copy package files first (Docker optimization)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Stage 2: Production stage 
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy node_modules from builder stage 
COPY --from=builder /app/node_modules ./node_modules

# Copy application code
COPY server.js ./

# Expose port 3000 (tells Docker this app listens on port 3000)
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Health check (Docker will ping this to verify container is healthy)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the application
CMD ["node", "server.js"]