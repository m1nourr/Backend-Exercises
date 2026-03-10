--
-- Create a user with full grants.
--
CREATE USER IF NOT EXISTS 'Mikael'@'localhost' 
IDENTIFIED BY 'Mikael';

GRANT ALL PRIVILEGES ON tasks_db.* TO 'Mikael'@'localhost';
FLUSH PRIVILEGES;