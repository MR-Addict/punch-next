FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build && npm prune --omit=dev
EXPOSE 3000
CMD ["npm", "start"]