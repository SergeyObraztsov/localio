# ------------------------------------------------
# NPM DEPENDENCIES
# ------------------------------------------------
FROM node:20-alpine AS depends
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --ignore-engines --silent


# ------------------------------------------------
# STATIC BUILD
# ------------------------------------------------
FROM node:20-alpine AS build

ARG NODE_ENV
ARG DATABASE_URL
ARG SERVER_URL
ARG S3_API_SECRET_TOKEN
ARG S3_API_ACCESS_TOKEN
ARG S3_BUCKET_NAME

WORKDIR /app
COPY --from=depends /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build

# ------------------------------------------------
# STATIC DIST
# ------------------------------------------------
FROM node:20-alpine AS dist

WORKDIR /app

ENV PORT 3000
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=build --chown=nextjs:nodejs /app/.next ./.next
COPY --from=build /app/node_modules ./app/node_modules
COPY --from=build /app/package.json ./package.json

USER nextjs

EXPOSE 3000

CMD ["yarn", "start"]
