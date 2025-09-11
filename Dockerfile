# Use node LTS
FROM node:18

WORKDIR /app

# Copy package definition first (cải thiện cache)
COPY package.json package-lock.json ./

# Install dependencies (including dev deps, Prisma)
RUN npm ci

# Copy the rest of the project
COPY . .

# Generate Prisma Client (nếu cần)
# Note: This will run during build; we also run in container entry command to ensure up-to-date
RUN npx prisma generate || true

EXPOSE 3000

# Default command (dev)
CMD ["npm", "run", "dev"]
