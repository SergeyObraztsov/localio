# ------------------------------------------------
# NPM DEPENDENCIES
# ------------------------------------------------
FROM node:20-alpine AS depends

RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@8.15.4 --activate

WORKDIR /localio

COPY package.json pnpm-lock.yaml ./

RUN pnpm i --frozen-lockfile


# ------------------------------------------------
# STATIC BUILD
# ------------------------------------------------
FROM depends AS build

WORKDIR /localio

RUN pnpm build

# ------------------------------------------------
# STATIC DIST
# ------------------------------------------------
FROM node:16-alpine AS dist

WORKDIR /localio

ENV PORT 3000
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

ARG NODE_ENV
ARG DATABASE_URL
ARG SERVER_URL
ARG S3_API_SECRET_TOKEN
ARG S3_API_ACCESS_TOKEN
ARG S3_BUCKET_NAME

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=build /localio/package.json ./package.json
COPY --from=build /localio/node_modules ./node_modules

COPY --from=build /localio/next.config.js ./next.config.js

COPY --from=build /localio/public ./public
COPY --from=build --chown=nextjs:nodejs /localio/.next ./.next

USER nextjs

EXPOSE 3000

CMD ["pnpm", "start"]
