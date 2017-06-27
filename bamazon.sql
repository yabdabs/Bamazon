DROP DATABASE IF EXISTS Bamazon;

CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE Products(
	item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(2) NOT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO Products(product_name, department_name, price, stock_quantity)
VALUES ("blender", "kitchen", 60, 15), ("Matcha Green Tea", "Food", 12, 46), ("Multi Vitamin", "Supplements", 40, 24),
("Lenovo Laptop", "Laptops", 999, 7), ("HP Laptop", "Laptops", 680, 15), ("Whey Protien", "Food", 55, 20),
("Almonds", "Food", 14, 22), ("Coffee Maker", "kitchen", 60, 15), ("Microwave", "kitchen", 60, 15), ("cologne", "beauty", 88, 5);

SELECT product_name FROM Products;