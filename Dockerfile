FROM node:18-alpine

WORKDIR /usr/src/app

# Khai báo biến môi trường cho DB connection
ENV DB_HOST=db
ENV DB_USER=root
ENV DB_PASSWORD=root
ENV DB_NAME=laptrinhweb
ENV PORT=8080

COPY package*.json ./
RUN npm install

# Copy source code gồm cả thư mục public
COPY . .

EXPOSE 8080

CMD ["node", "server.js"]
