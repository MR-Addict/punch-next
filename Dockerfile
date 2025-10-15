FROM node:18-alpine as builder
WORKDIR /app
COPY . .

# build environment variables
ARG FIRST_WEEK
ARG START_DATE
ARG END_DATE
ARG CURRENT_TERM
ARG MONGODB_URI

RUN echo "module.exports = { output: 'standalone' };" > next.config.js
RUN npm install && npm install pnpm -g && pnpm run build
RUN mv .next/static .next/standalone/.next && mv public .next/standalone

FROM node:18-alpine
WORKDIR /app

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"
ENV NODE_ENV production

COPY --from=builder /app/.next/standalone .

CMD ["node", "server.js"]