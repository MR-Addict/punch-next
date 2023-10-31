FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm ci && npm run build && npm ci --omit=dev
CMD ["npm", "start"]
