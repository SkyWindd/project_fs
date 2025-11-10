# syntax=docker/dockerfile:1.4
########################################
# Stage 1 — Build app bằng Node
########################################
FROM node:20-bookworm AS build

# Đặt thư mục làm việc
WORKDIR /app

# Copy file định nghĩa dependencies
COPY web/package*.json ./

# Cài đặt dependencies (cache lại npm layer)
RUN --mount=type=cache,target=/root/.npm npm install

# Copy toàn bộ mã nguồn web
COPY web/ ./

# Build Vite project (tạo ra thư mục dist)
RUN npm run build


########################################
# Stage 2 — Serve app bằng Nginx
########################################
FROM nginx:alpine AS production

# Copy build output từ stage 1 sang thư mục Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Xóa file config mặc định và thay bằng config tùy chỉnh (nếu có)
# COPY web/nginx.conf /etc/nginx/conf.d/default.conf

# Mở port 80 để truy cập
EXPOSE 80

# Chạy Nginx
CMD ["nginx", "-g", "daemon off;"]
