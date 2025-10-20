# web/Dockerfile.dev (tối ưu build)
FROM node:20-bookworm

WORKDIR /app

# Chỉ copy package.json để Docker có thể cache dependency layer
COPY web/package*.json ./

# Cài dependencies (cache lại layer này)
RUN npm install

# Copy toàn bộ source code sau khi dependencies đã cache
COPY web/ ./

EXPOSE 5173
CMD ["npm", "run", "start", "--", "--host"]
