FROM node:20.16-alpine3.19 AS builder
RUN npm install -g pnpm
WORKDIR /usr/src/app
COPY package*.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpm run build

FROM node:20.16-alpine3.19 AS runner
RUN npm install -g pnpm
USER node
WORKDIR /usr/src/app
COPY --chown=node:node --from=builder /usr/src/app/dist ./dist
COPY --chown=node:node --from=builder /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=builder /usr/src/app/package.json ./
COPY --chown=node:node --from=builder /usr/src/app/prisma ./prisma
EXPOSE 3001
CMD ["/bin/sh", "-c", "pnpm prisma generate && pnpm run start"]
