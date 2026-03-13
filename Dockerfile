# Sử dụng image Nginx nhẹ trên nền Alpine Linux
FROM nginx:stable-alpine

# Sao chép toàn bộ nội dung project vào thư mục phục vụ web của Nginx
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Chạy Nginx ở chế độ foreground
CMD ["nginx", "-g", "daemon off;"]
