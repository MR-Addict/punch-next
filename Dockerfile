FROM node:18-slim
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
RUN npm ci --omit=dev
CMD ["npm", "start"]
