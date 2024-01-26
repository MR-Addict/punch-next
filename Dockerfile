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
RUN npm install && npm run build
RUN mv .next/static .next/standalone/.next

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/.next/standalone .
EXPOSE 3000
CMD ["node", "server.js"]