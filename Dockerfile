# Build BASE
FROM node:21-alpine3.18 as BASE
LABEL author="jpeace08"

WORKDIR /app
COPY package.json yarn.lock ./
RUN apk add --no-cache git \
    && yarn --frozen-lockfile \
    && yarn cache clean

# Build Image
FROM node:21-alpine3.18 AS BUILD
LABEL author="jpeace08"

WORKDIR /app
COPY --from=BASE /app/node_modules ./node_modules
COPY . .

RUN apk add --no-cache git curl \
    && yarn build \
    && cd .next/standalone \
    # Follow https://github.com/ductnn/Dockerfile/blob/master/nodejs/node/16/alpine/Dockerfile \
    && curl -sf https://gobinaries.com/tj/node-prune | sh -s -- -b /usr/local/bin \
    && node-prune

# Build production
FROM node:21-alpine3.18 AS PRODUCTION
LABEL author="jpeace08"

WORKDIR /app

COPY --from=BUILD /app/public ./public
COPY --from=BUILD /app/next.config.mjs ./

# Set mode "standalone" in file "next.config.js"
COPY --from=BUILD /app/.next/standalone ./
COPY --from=BUILD /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]