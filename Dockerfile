# Sử dụng base image Node.js chính thức
FROM node:18-alpine AS builder

WORKDIR /app

# Sao chép tệp cấu hình phụ thuộc
COPY package*.json ./
RUN npm install

# Sao chép toàn bộ mã nguồn dự án
COPY . .

# Xây dựng ứng dụng
RUN npm run build

# Stage chạy ứng dụng production nhẹ hơn
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["npm", "start"]
