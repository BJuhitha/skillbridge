-- =========================================================
-- SKILLBRIDGE - STUDENT SKILL EXCHANGE PLATFORM
-- MySQL Database Schema and Seed Data
-- =========================================================

CREATE DATABASE IF NOT EXISTS skillbridge_db;
USE skillbridge_db;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    college VARCHAR(150),
    department VARCHAR(100),
    year_of_study VARCHAR(20),
    bio TEXT,
    contact_info VARCHAR(150),
    avatar_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. User Skills Table (Skills user can teach OR wants to learn)
CREATE TABLE IF NOT EXISTS user_skills (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    skill_name VARCHAR(100) NOT NULL,
    skill_type ENUM('TEACH', 'LEARN') NOT NULL,
    category VARCHAR(80) DEFAULT 'General',
    proficiency_level VARCHAR(50) DEFAULT 'Intermediate', -- Beginner, Intermediate, Expert
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Learning Requests Table
CREATE TABLE IF NOT EXISTS learning_requests (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    sender_id BIGINT NOT NULL,
    receiver_id BIGINT NOT NULL,
    skill_to_learn VARCHAR(100) NOT NULL,     -- The skill sender wants receiver to teach
    skill_offered VARCHAR(100),               -- The skill sender can teach in return (Exchange)
    message TEXT,
    status ENUM('PENDING', 'ACCEPTED', 'REJECTED', 'CANCELLED') DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 4. Learning Sessions Table
CREATE TABLE IF NOT EXISTS learning_sessions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    request_id BIGINT,
    teacher_id BIGINT NOT NULL,
    student_id BIGINT NOT NULL,
    topic VARCHAR(150) NOT NULL,
    session_date VARCHAR(50) NOT NULL,
    session_time VARCHAR(50) NOT NULL,
    duration_minutes INT DEFAULT 60,
    meeting_link VARCHAR(255),
    notes TEXT,
    status ENUM('SCHEDULED', 'COMPLETED', 'CANCELLED') DEFAULT 'SCHEDULED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (request_id) REFERENCES learning_requests(id) ON DELETE SET NULL,
    FOREIGN KEY (teacher_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =========================================================
-- SEED DATA (Includes abstract examples: Student A & B)
-- Passwords below are plain/demo 'password123'
-- =========================================================

-- Sample Students
INSERT INTO users (id, name, email, password, college, department, year_of_study, bio, contact_info) VALUES
(1, 'Aarav Sharma (Student A)', 'studenta@college.edu', 'password123', 'National Institute of Tech', 'Computer Science', '3rd Year', 'Passionate about backend development and web architectures. Happy to teach Java and HTML!', 'aarav@discord.gg'),
(2, 'Bhavna Patel (Student B)', 'studentb@college.edu', 'password123', 'National Institute of Tech', 'Design & Media', '2nd Year', 'UI/UX enthusiast, love digital illustration and Photoshop. Looking for a peer to mentor me in Java.', 'bhavna_designs (Insta)'),
(3, 'Chetan Verma', 'chetan@college.edu', 'password123', 'City Engineering College', 'Information Technology', '4th Year', 'Competitive programmer, Python specialist, looking to pick up Cloud Computing & AWS.', 'chetan@linkedin'),
(4, 'Divya Nair', 'divya@college.edu', 'password123', 'City Engineering College', 'Data Science', '3rd Year', 'Data science and ML geek. Can mentor in Python & SQL. Want to practice English public speaking & UI Design.', 'divya.nair@telegram')
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- Skills for Student A (Can teach: Java, HTML | Wants to learn: Photoshop)
INSERT INTO user_skills (user_id, skill_name, skill_type, category, proficiency_level, description) VALUES
(1, 'Java', 'TEACH', 'Programming', 'Expert', 'Core Java, OOPs, Collections, Multi-threading, and Spring basics'),
(1, 'HTML & CSS', 'TEACH', 'Web Development', 'Intermediate', 'Semantic HTML5, Flexbox, CSS Grid and responsive UI design'),
(1, 'Photoshop', 'LEARN', 'Design', 'Beginner', 'Need to learn photo manipulation, banner design, and digital art basics'),

-- Skills for Student B (Can teach: Photoshop | Wants to learn: Java)
(2, 'Photoshop', 'TEACH', 'Design', 'Expert', 'UI design, photo editing, asset creation for web applications'),
(2, 'Figma', 'TEACH', 'Design', 'Intermediate', 'Wireframing, prototypes, and user flows'),
(2, 'Java', 'LEARN', 'Programming', 'Beginner', 'Want to master core Java fundamentals and prepare for lab exams'),

-- Skills for Chetan
(3, 'Python', 'TEACH', 'Programming', 'Expert', 'Data structures, algorithms, automation scripting'),
(3, 'AWS Cloud', 'LEARN', 'DevOps', 'Beginner', 'EC2, S3, and cloud deployment principles'),

-- Skills for Divya
(4, 'SQL & Databases', 'TEACH', 'Database', 'Expert', 'Relational database modeling, queries, indexing'),
(4, 'Public Speaking', 'LEARN', 'Soft Skills', 'Beginner', 'Presentation and communication confidence')
ON DUPLICATE KEY UPDATE skill_name=VALUES(skill_name);

-- Sample Learning Request between Student A and Student B
INSERT INTO learning_requests (id, sender_id, receiver_id, skill_to_learn, skill_offered, message, status) VALUES
(1, 1, 2, 'Photoshop', 'Java', 'Hi Bhavna! I saw you excel at Photoshop. I can help you with your Java coursework in exchange for a few sessions on graphic design!', 'ACCEPTED'),
(2, 3, 1, 'Java', 'Python', 'Hey Aarav! Can you explain Spring Boot setup? I can teach you Python scripting in return.', 'PENDING')
ON DUPLICATE KEY UPDATE status=VALUES(status);

-- Sample Learning Session for the accepted request
INSERT INTO learning_sessions (id, request_id, teacher_id, student_id, topic, session_date, session_time, duration_minutes, meeting_link, notes, status) VALUES
(1, 1, 2, 1, 'Photoshop Fundamentals & Layer Management', '2026-10-15', '16:00', 60, 'https://meet.google.com/abc-defg-hij', 'Bring your laptop with Photoshop installed. Will cover tools, layers, and masks.', 'SCHEDULED')
ON DUPLICATE KEY UPDATE topic=VALUES(topic);
