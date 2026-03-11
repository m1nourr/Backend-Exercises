USE tasks_db;

DROP TABLE IF EXISTS `tasks`;

CREATE TABLE `tasks` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `completed` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO `tasks` (`title`, `completed`) VALUES
  ('Buy milk', 0),
  ('Pay bills', 1),
  ('Walk the dog', 0);