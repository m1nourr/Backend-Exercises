--
-- Create a sample table for users and add some users to it.
--
USE tasks_db;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(50) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO `user` (`username`, `password`, `email`) VALUES 
    ('alice', 'password123', 'alice@example.com'),
    ('bob', 'securepass', 'bob@example.com'),
    ('charlie', 'mypassword', 'charlie@example.com'),
    ('diana', '1234abcd', 'diana@example.com'),
    ('eve', 'passw0rd!', 'eve@example.com');
