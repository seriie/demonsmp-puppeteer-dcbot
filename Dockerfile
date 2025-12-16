FROM node:20-slim

# Install Chromium + dependency
RUN apt update && apt install -y \
    chromium \
    libnss3 \
    libx11-xcb1 \
    libatk1.0-0 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libgbm1 \
    libcups2 \
    libasound2 \
    fonts-liberation \
    --no-install-recommends && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /home/container

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Set default command
CMD ["npm", "start"]