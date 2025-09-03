# syntax=docker/dockerfile:1.6

# 1) Install deps
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# 2) Build (reuse Next build cache + npm cache)
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Reuse caches between builds
RUN --mount=type=cache,target=/root/.npm \
    --mount=type=cache,target=/app/.next/cache \
    npm run build

# 3) Runtime
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Copy only what's needed at runtime
COPY --from=builder /app/.next ./.next
COPY public ./public
COPY package*.json ./
RUN npm ci --omit=dev
EXPOSE 3000
# Use platform PORT if provided (DO sets it)
CMD ["sh","-c","npx next start -p ${PORT:-3000}"]