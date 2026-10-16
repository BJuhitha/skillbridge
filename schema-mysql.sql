-- =============================================================
-- SKILLBRIDGE DATABASE SCHEMA & SAMPLE DATA (MySQL)
-- Student Skill Exchange Platform
-- =============================================================

CREATE DATABASE IF NOT EXISTS skillbridge_db;
USE skillbridge_db;

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    department VARCHAR(100) NOT NULL,
    college_year VARCHAR(50) NOT NULL,
    bio TEXT,
    contact_info VARCHAR(150),
    avatar_url VARCHAR(255),
    rating DOUBLE DEFAULT 5.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. SKILLS TABLE
CREATE TABLE IF NOT EXISTS skills (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    category VARCHAR(100) NOT NULL,
    description TEXT
);

-- 3. USER_SKILLS TABLE (Junction table: what user teaches vs wants to learn)
CREATE TABLE IF NOT EXISTS user_skills (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    skill_id BIGINT NOT NULL,
    skill_type VARCHAR(20) NOT NULL, -- 'TEACH' or 'LEARN'
    proficiency_level VARCHAR(30) NOT NULL, -- 'BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'
    description TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
);

-- 4. LEARNING_REQUESTS TABLE
CREATE TABLE IF NOT EXISTS learning_requests (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    sender_id BIGINT NOT NULL,
    receiver_id BIGINT NOT NULL,
    skill_id BIGINT NOT NULL,
    offered_skill_id BIGINT,
    message TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING', -- 'PENDING', 'ACCEPTED', 'REJECTED', 'CANCELLED'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE,
    FOREIGN KEY (offered_skill_id) REFERENCES skills(id) ON DELETE SET NULL
);

-- 5. LEARNING_SESSIONS TABLE
CREATE TABLE IF NOT EXISTS learning_sessions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    request_id BIGINT,
    teacher_id BIGINT NOT NULL,
    learner_id BIGINT NOT NULL,
    skill_name VARCHAR(100) NOT NULL,
    scheduled_time DATETIME NOT NULL,
    duration_minutes INT DEFAULT 60,
    meeting_type VARCHAR(20) NOT NULL, -- 'ONLINE' or 'IN_PERSON'
    meeting_link_or_location VARCHAR(255) NOT NULL,
    notes TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'SCHEDULED', -- 'SCHEDULED', 'COMPLETED', 'CANCELLED'
    feedback_rating INT,
    feedback_comments TEXT,
    FOREIGN KEY (request_id) REFERENCES learning_requests(id) ON DELETE SET NULL,
    FOREIGN KEY (teacher_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (learner_id) REFERENCES users(id) ON DELETE CASCADE
);
