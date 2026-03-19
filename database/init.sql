CREATE DATABASE IF NOT EXISTS laptrinhweb;
USE laptrinhweb;

-- Table users
CREATE TABLE IF NOT EXISTS users (
    user_id INT(11) AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(25) NOT NULL,
    user_email VARCHAR(55) NOT NULL,
    user_pass VARCHAR(255) NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table products
CREATE TABLE IF NOT EXISTS products (
    product_id INT(11) AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    product_price DOUBLE NOT NULL,
    product_description TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table orders
CREATE TABLE IF NOT EXISTS orders (
    order_id INT(11) AUTO_INCREMENT PRIMARY KEY,
    user_id INT(11) NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Table order_details
CREATE TABLE IF NOT EXISTS order_details (
    order_detail_id INT(11) AUTO_INCREMENT PRIMARY KEY,
    order_id INT(11) NOT NULL,
    product_id INT(11) NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Dữ liệu giả (Seed Data)
INSERT INTO users (user_name, user_email, user_pass) VALUES
('alpha', 'alpha@gmail.com', '123456'),
('minh', 'minh@yahoo.com', '123456'),
('mai', 'mai.test@gmail.com', '123456'),
('hoa', 'hoa@outlook.com', '123456'),
('binh', 'binh_i@gmail.com', '123456'),
('anh', 'anh@gmail.com', '123456'),
('anhtuan', 'anhi_tuan@gmail.com', '123456'),
('thuhi', 'thuhi@gmail.com', '123456'),
('mi', 'mi@gmail.com', '123456');

INSERT INTO products (product_name, product_price, product_description) VALUES
('Samsung Galaxy S23', 20000000, 'Điện thoại Samsung'),
('Apple iPhone 15', 25000000, 'Điện thoại Apple'),
('Sony Bravia 4K', 15000000, 'Tivi Sony'),
('Samsung Monitor', 5000000, 'Màn hình Samsung');

INSERT INTO orders (user_id) VALUES
(1), (1), (2), (3), (5), (7), (8), (9);

INSERT INTO order_details (order_id, product_id) VALUES
(1, 1), (1, 2), -- Order 1, user 1: Samsung S23, iPhone 15
(2, 3), -- Order 2, user 1: Sony
(3, 1), (3, 4), -- Order 3, user 2: Samsung S23, Samsung Monitor
(4, 2), -- Order 4, user 3: iPhone 15
(5, 1), -- Order 5, user 5: Samsung S23
(6, 2), -- Order 6, user 7: iPhone 15
(7, 3), -- Order 7, user 8: Sony
(8, 4); -- Order 8, user 9: Samsung Monitor
