FROM node:18-slim as builder
LABEL stage=builder
WORKDIR /builder
COPY . .
RUN npm install && npm run build
RUN mv .next/static .next/standalone/.next && mv public .next/standalone

FROM node:18-slim
WORKDIR /app
EXPOSE 3000
COPY --from=builder /builder/.next/standalone .
CMD ["node", "/app/server.js"]
