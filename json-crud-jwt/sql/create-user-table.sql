--
-- Create a sample table for users and add some users to it.
--
USE tasks_db;

DROP TABLE IF EXISTS `user_jwt`;
CREATE TABLE `user_jwt` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(50) NOT NULL UNIQUE,
    `password` VARCHAR(255),
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `role` VARCHAR(10) DEFAULT 'user',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO `user_jwt` (`username`, `password`, `email`) VALUES 
    ('alice', 'alice', 'alice@example.com'),
    ('bob', 'bob', 'bob@example.com'),
    ('charlie', 'mypassword', 'charlie@example.com'),
    ('diana', '1234abcd', 'diana@example.com'),
    ('eve', 'passw0rd!', 'eve@example.com')
;

INSERT INTO `user_jwt` (`username`, `password`, `email`, `role`) VALUES 
    ('admin', 'admin', 'admin@admin.org', 'admin')
;