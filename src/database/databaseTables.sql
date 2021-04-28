USE noderestapi;

-- Create Users Table
CREATE TABLE users(
	id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    email_verified TINYINT default(1),
    password VARCHAR(255) NOT NULL,
    img_url TEXT,
    bio TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW() ON UPDATE NOW()
);

-- Create Articles Table
CREATE TABLE articles(
	id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    user_id INT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    draft TINYINT DEFAULT(0),
    published TINYINT DEFAULT(0),
    likable TINYINT DEFAULT(1),
    commentable TINYINT DEFAULT(1),
    contributable TINYINT DEFAULT(1),
    show_views TINYINT DEFAULT(1),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW() ON UPDATE NOW()
);

-- Create Article Comments Tables
create table article_comments(
	id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    user_id INT NOT NULL,
    article_id INT NOT NULL,
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW() ON UPDATE NOW()
);

-- Create Article Likes Tables
create table article_likes(
	id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    user_id INT NOT NULL,
    article_id INT NOT NULL,
    liked TINYINT DEFAULT(1),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW() ON UPDATE NOW()
);

-- Create Article Views Tables
create table article_views(
	id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    user_id INT NOT NULL,
    article_id INT NOT NULL,
    viewed INT DEFAULT(1),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW() ON UPDATE NOW()
);
