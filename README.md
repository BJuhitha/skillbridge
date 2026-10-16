# SKILLBRIDGE – Student Skill Exchange Platform

> **Peer-to-Peer Learning & Knowledge Sharing Ecosystem**  
> Developed with **Java, Spring Boot, HTML5, CSS3, JavaScript, Spring Data JPA, and MySQL / H2**.

---

## 📌 Project Overview
**SkillBridge** is a web-based student skill exchange platform built to foster collaborative, peer-to-peer learning in university and college environments. Instead of relying solely on formal classroom courses, students can exchange knowledge in a barter or 1-on-1 tutoring format. For example, a student proficient in Java can teach another student in exchange for learning UI/UX Design, Python, Public Speaking, or Data Structures.

---

## 🚀 Key Modules Implemented

| Module | Features & Capabilities |
| :--- | :--- |
| **1. User Registration & Login** | Multi-user authentication, student profile creation, department & academic year management, contact info & bio customization. |
| **2. Skill Profile** | Add skills to **Teach** (offered) and skills to **Learn** (goals) with proficiency levels (`BEGINNER`, `INTERMEDIATE`, `ADVANCED`, `EXPERT`) and descriptions. |
| **3. Skill Search & Discovery** | Instant live search across peer profiles by skill name, student name, department, or category. Quick-filter category pills. |
| **★ Smart Mutual Barter Match** | Unique matching algorithm that discovers students with mutual exchange synergy: Student A teaches what Student B wants, and Student B teaches what Student A wants! |
| **4. Learning Requests** | Send 1-on-1 learning requests with custom notes and optional barter skill proposals. Accept, reject, or cancel incoming/outgoing requests. |
| **5. Learning Sessions** | Schedule sessions with date/time, duration, meeting format (Online Google Meet/Zoom link or In-Person campus room), notes, and submit 5-star ratings & reviews upon completion. |
| **6. Dashboard & Analytics** | Real-time overview of skills taught, learning goals, pending requests, scheduled sessions, peer teaching rating, and activity feeds. |

---

## 🛠️ Technology Stack
- **Backend Framework:** Spring Boot 3.2.4 (Java 17+)
- **ORM & Data Layer:** Spring Data JPA / Hibernate
- **Database:** MySQL (Production) & H2 In-Memory (Zero-setup instant demo mode)
- **Frontend:** HTML5, Modern CSS3, JavaScript (Fetch REST API client)
- **UI Design:** Responsive CSS Grid/Flexbox, Plus Jakarta Sans typography, FontAwesome icons
- **Build Tool:** Apache Maven

---

## 📁 Project Architecture
```
skillbridge/
├── pom.xml                                  # Maven dependencies & build config
├── schema-mysql.sql                         # Complete MySQL DDL & Schema
├── run.bat                                  # Windows double-click runner
├── run.sh                                   # Linux/macOS runner
├── README.md                                # Full documentation & viva guide
└── src/
    └── main/
        ├── java/com/skillbridge/
        │   ├── SkillBridgeApplication.java  # Spring Boot Main Class
        │   ├── model/                       # JPA Entities
        │   │   ├── User.java
        │   │   ├── Skill.java
        │   │   ├── UserSkill.java
        │   │   ├── LearningRequest.java
        │   │   └── LearningSession.java
        │   ├── repository/                  # Spring Data Repositories
        │   │   ├── UserRepository.java
        │   │   ├── SkillRepository.java
        │   │   ├── UserSkillRepository.java
        │   │   ├── LearningRequestRepository.java
        │   │   └── LearningSessionRepository.java
        │   ├── dto/                         # Data Transfer Objects
        │   │   ├── LoginRequest.java
        │   │   ├── RegisterRequest.java
        │   │   ├── UserSkillDto.java
        │   │   ├── RequestCreateDto.java
        │   │   ├── SessionCreateDto.java
        │   │   ├── CompleteSessionDto.java
        │   │   ├── DashboardSummaryDto.java
        │   │   └── MutualMatchDto.java
        │   ├── service/                     # Business Logic Services
        │   │   ├── UserService.java
        │   │   ├── SkillService.java
        │   │   ├── RequestService.java
        │   │   └── SessionService.java
        │   ├── controller/                  # REST API Controllers
        │   │   ├── AuthController.java
        │   │   ├── UserController.java
        │   │   ├── SkillController.java
        │   │   ├── RequestController.java
        │   │   ├── SessionController.java
        │   │   └── DashboardController.java
        │   └── config/                      # Configurations & Seeders
        │       ├── WebMvcConfig.java        # CORS & Static Resource mappings
        │       └── DataInitializer.java    # Auto-seeds 5 students, skills & sessions
        └── resources/
            ├── application.properties       # Default properties (H2 zero-setup)
            ├── application-mysql.properties # Dedicated MySQL profile properties
            └── static/                      # Web Frontend (Served on port 8080)
                ├── index.html
                ├── css/style.css
                └── js/app.js
```

---

## ⚡ How to Run in Under 2 Minutes

### Method 1: Using Terminal / Command Prompt
1. Navigate to the project folder:
   ```cmd
   cd C:\Users\lovel\.gemini\antigravity\scratch\skillbridge
   ```
2. Run the application:
   ```cmd
   mvn spring-boot:run
   ```
   *(Or simply double-click `run.bat` on Windows!)*
3. Open your browser at:
   ```
   http://localhost:8080
   ```

### Method 2: In VS Code
1. Open VS Code.
2. Click **File -> Open Folder...** and select:
   `C:\Users\lovel\.gemini\antigravity\scratch\skillbridge`
3. If prompted, install the recommended **Extension Pack for Java** and **Spring Boot Extension Pack**.
4. Navigate to `src/main/java/com/skillbridge/SkillBridgeApplication.java`.
5. Click the **Run** button (or press `F5`).
6. Open your web browser at `http://localhost:8080`.

### Method 3: In IntelliJ IDEA
1. Open IntelliJ IDEA -> **Open** -> Select `skillbridge` folder.
2. IntelliJ will automatically detect it as a Maven project and sync dependencies.
3. Open `SkillBridgeApplication.java` and click the green **Play** arrow next to `public static void main`.
4. Open `http://localhost:8080`.

---

## 🗄️ Database Configurations

### Option A: Zero-Setup In-Memory H2 (Active by Default)
- No installation or MySQL startup needed!
- Automatically seeds 5 pre-configured student accounts, 8 skills, requests, and sessions so you can immediately present the project.
- Web Console: `http://localhost:8080/h2-console`
  - JDBC URL: `jdbc:h2:mem:skillbridge_db`
  - User: `sa` | Password: *(blank)*

### Option B: Running with Local MySQL
1. Make sure your MySQL Server is running on port `3306`.
2. Create the database (or let Hibernate create it automatically):
   ```sql
   CREATE DATABASE IF NOT EXISTS skillbridge_db;
   ```
   *(You can also execute `schema-mysql.sql` in MySQL Workbench or phpMyAdmin)*
3. Run Spring Boot with the MySQL profile:
   ```cmd
   mvn spring-boot:run -Dspring-boot.run.profiles=mysql
   ```
   *(You can edit username/password in `src/main/resources/application-mysql.properties` if needed)*

---

## 🎭 Pre-Seeded Demo Accounts (Viva Quick-Switch)
For quick demonstrations to professors or evaluators without manual data entry, the top bar features a **1-click profile switcher**:

1. **Alex Morgan** (`alex@college.edu` / `alex123`)
   - **Department:** Computer Science, 3rd Year
   - **Teaches:** Java & Spring Boot, Data Structures & Algorithms
   - **Wants to Learn:** UI/UX Design, React
2. **Priya Sharma** (`priya@college.edu` / `priya123`)
   - **Department:** Design & Media, 2nd Year
   - **Teaches:** UI/UX Design with Figma, Digital Photography
   - **Wants to Learn:** Java & Spring Boot, Python
   - *(Note: Alex & Priya are a 100% Mutual Barter Pair!)*
3. **Marcus Chen** (`marcus@college.edu` / `marcus123`)
   - **Department:** Data Science & AI, 4th Year
   - **Teaches:** Python & Data Analysis, Machine Learning Fundamentals
   - **Wants to Learn:** Public Speaking
4. **Aisha Patel** (`aisha@college.edu` / `aisha123`)
   - **Department:** Business Administration, 3rd Year
   - **Teaches:** Public Speaking & Pitching
   - **Wants to Learn:** Python & Data Analysis
   - *(Note: Marcus & Aisha are also a 100% Mutual Barter Pair!)*
5. **David Kim** (`david@college.edu` / `david123`)
   - **Department:** Software Engineering, 3rd Year
   - **Teaches:** React & Modern Frontend
   - **Wants to Learn:** Machine Learning Fundamentals

---

## 🎓 Viva & Presentation Q&A Guide

**Q1: What is the main objective of SkillBridge?**  
*Answer:* SkillBridge is a decentralized student skill exchange platform that facilitates peer-to-peer tutoring and barter-style knowledge sharing, eliminating financial barriers and encouraging students to teach skills they know in return for learning skills they need.

**Q2: What is the architectural design pattern used?**  
*Answer:* The application follows a Layered MVC Architecture:
- **Controller Layer (`@RestController`):** Exposes clean RESTful API endpoints and handles HTTP requests/responses.
- **Service Layer (`@Service`):** Implements business logic (e.g. mutual barter matching, session rating calculations, request status transitions).
- **Repository Layer (`@Repository`):** Leverages Spring Data JPA interfaces for high-performance database CRUD and custom JPQL queries.
- **Entity/Model Layer (`@Entity`):** Relational database mapping using Jakarta Persistence annotations.
- **Frontend Layer:** Single Page Application (SPA) driven by semantic HTML5, CSS3 variables/grid, and native JavaScript Fetch API.

**Q3: How does the Mutual Barter Matching algorithm work?**  
*Answer:* The algorithm in `SkillService.java` inspects the active student's `LEARN` list and `TEACH` list. It then scans all peer profiles to find a bipartite match where `Peer.teaches` matches `User.wantsToLearn` **and** `User.teaches` matches `Peer.wantsToLearn`. When both conditions are met, it highlights the peer under the "Mutual Barter" tab.

**Q4: How does SkillBridge handle learning sessions?**  
*Answer:* Once a learning request is accepted by the teacher, either student can schedule a learning session by specifying a timestamp, duration, format (virtual link via Google Meet/Zoom or in-person campus room), and agenda. Upon session completion, the learner submits a 1-to-5 star rating and feedback review, which dynamically updates the teacher's cumulative rating.
