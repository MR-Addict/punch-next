FROM node:18-slim
COPY . .
RUN npm ci && npm run build && npm ci --omit=dev
CMD ["npm", "start"]
