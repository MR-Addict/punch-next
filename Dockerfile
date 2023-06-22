FROM node:18.15.0-slim
WORKDIR /app
COPY . .
RUN npm install && npm run build && npm ci --omit dev
CMD ["node", "build"]