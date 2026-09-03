-- =====================================================
-- E-COMMERCE DATABASE
-- =====================================================



USE defaultdb;


-- =====================================================
-- 2. DROP EXISTING TABLES
-- Allows you to safely re-run this entire script
-- =====================================================

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS addresses;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;

SET FOREIGN_KEY_CHECKS = 1;


-- =====================================================
-- 3. USERS
-- =====================================================

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =====================================================
-- 4. CATEGORIES
-- =====================================================

CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE
);


-- =====================================================
-- 5. PRODUCTS
-- =====================================================

CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url VARCHAR(500),
    stock INT DEFAULT 0,
    rating DECIMAL(2,1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (category_id)
        REFERENCES categories(id)
);


-- =====================================================
-- 6. ADDRESSES
-- =====================================================

CREATE TABLE addresses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    address_line VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) DEFAULT 'India',

    FOREIGN KEY (user_id)
        REFERENCES users(id)
);


-- =====================================================
-- 7. ORDERS
-- =====================================================

CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
);


-- =====================================================
-- 8. ORDER ITEMS
-- =====================================================

CREATE TABLE order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (order_id)
        REFERENCES orders(id),

    FOREIGN KEY (product_id)
        REFERENCES products(id)
);


-- =====================================================
-- 9. REVIEWS
-- =====================================================

CREATE TABLE reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    product_id INT NOT NULL,
    rating INT NOT NULL,
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id),

    FOREIGN KEY (product_id)
        REFERENCES products(id)
);


-- =====================================================
-- 10. BOOKINGS
-- =====================================================

CREATE TABLE bookings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    status VARCHAR(50) DEFAULT 'Confirmed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
);


-- =====================================================
-- 11. INSERT CATEGORIES
-- =====================================================

INSERT INTO categories (name) VALUES
('Men'),
('Women'),
('Footwear'),
('Bags'),
('Watches');


-- =====================================================
-- 12. INSERT PRODUCTS
-- =====================================================

INSERT INTO products
(category_id, name, description, price, image_url, stock, rating)
VALUES

(1,
 'Classic Cotton Shirt',
 'Premium cotton casual shirt designed for everyday comfort.',
 2499.00,
 '/images/shirt-1.jpg',
 25,
 4.5),

(1,
 'Slim Fit Denim',
 'Comfortable slim-fit denim jeans.',
 3299.00,
 '/images/jeans-1.jpg',
 20,
 4.4),

(3,
 'Classic Sneakers',
 'Minimal everyday sneakers suitable for casual wear.',
 4999.00,
 '/images/shoes-1.jpg',
 15,
 4.7),

(4,
 'Leather Crossbody Bag',
 'Premium leather crossbody bag.',
 3999.00,
 '/images/bag-1.jpg',
 12,
 4.6),

(5,
 'Minimal Analog Watch',
 'Classic analog watch with a leather strap.',
 5999.00,
 '/images/watch-1.jpg',
 10,
 4.8),

(2,
 'Floral Summer Dress',
 'Lightweight summer dress perfect for everyday wear.',
 2999.00,
 '/images/dress-1.jpg',
 18,
 4.5),

(1,
 'Oversized Casual T-Shirt',
 'Soft cotton oversized t-shirt.',
 1499.00,
 '/images/tshirt-1.jpg',
 30,
 4.3),

(3,
 'Running Shoes',
 'Lightweight running shoes with comfortable cushioning.',
 5499.00,
 '/images/running-shoes-1.jpg',
 14,
 4.6);


-- =====================================================
-- 13. VERIFY DATABASE
-- =====================================================

SHOW TABLES;

SELECT * FROM categories;

SELECT * FROM products;
UPDATE products SET image_url = '/images/shirt.png' WHERE id = 1;
UPDATE products SET image_url = '/images/jeans.png' WHERE id = 2;
UPDATE products SET image_url = '/images/shoes.png' WHERE id = 3;
UPDATE products SET image_url = '/images/bag.png' WHERE id = 4;
UPDATE products SET image_url = '/images/watch.png' WHERE id = 5;
UPDATE products SET image_url = '/images/dress.png' WHERE id = 6;
UPDATE products SET image_url = '/images/tshirt.png' WHERE id = 7;
UPDATE products SET image_url = '/images/running-shoes.png' WHERE id = 8;

ALTER TABLE users
ADD COLUMN role ENUM('customer', 'admin') NOT NULL DEFAULT 'customer';

UPDATE users
SET role = 'admin'
WHERE id = 1;
SELECT id, name, email, role
FROM users;