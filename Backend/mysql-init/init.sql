CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  age INT,
  gender ENUM('ชาย','หญิง','อื่นๆ'),
  interests TEXT,
  description TEXT,
  
);