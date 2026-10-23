# syntax=docker/dockerfile:1

# Stage 1 - Dependencies + build
FROM node:lts-alpine AS builder

RUN npm install -g corepack

RUN corepack enable pnpm

WORKDIR /app

COPY package*.json pnpm-lock.yaml* pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# Stage 2 - Production runner
FROM node:lts-alpine AS runner
WORKDIR /app

# Create user
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
