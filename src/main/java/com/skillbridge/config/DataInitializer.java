package com.skillbridge.config;

import com.skillbridge.model.*;
import com.skillbridge.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private UserSkillRepository userSkillRepository;

    @Autowired
    private LearningRequestRepository requestRepository;

    @Autowired
    private LearningSessionRepository sessionRepository;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() > 0) {
            System.out.println(">> Database already contains data. Skipping initial seeding.");
            return;
        }

        System.out.println(">> Seeding initial SkillBridge demo data...");

        // 1. Seed Skills
        Skill javaSkill = skillRepository.save(new Skill("Java & Spring Boot", "Programming", "Core Java, OOP, Spring Boot, REST APIs, JPA & Hibernate"));
        Skill pythonSkill = skillRepository.save(new Skill("Python & Data Analysis", "Programming", "Python syntax, Pandas, NumPy, Scripting & Automation"));
        Skill uiuxSkill = skillRepository.save(new Skill("UI/UX Design with Figma", "Design", "User research, wireframing, interactive prototyping, Figma design systems"));
        Skill reactSkill = skillRepository.save(new Skill("React & Modern Frontend", "Web Development", "React hooks, state management, component architecture, responsive CSS"));
        Skill mlSkill = skillRepository.save(new Skill("Machine Learning Fundamentals", "AI & Data Science", "Scikit-Learn, regression, classification, neural network basics"));
        Skill publicSpeaking = skillRepository.save(new Skill("Public Speaking & Pitching", "Soft Skills", "Confident presentation, pitch deck delivery, persuasive communication"));
        Skill dsaSkill = skillRepository.save(new Skill("Data Structures & Algorithms", "Programming", "Arrays, Trees, Graphs, Dynamic Programming, LeetCode problem solving"));
        Skill photoSkill = skillRepository.save(new Skill("Digital Photography & Editing", "Creative", "DSLR basics, Lightroom editing, portrait composition"));

        // 2. Seed Users
        User alex = userRepository.save(new User(
                null,
                "Alex Morgan",
                "alex@college.edu",
                "alex123",
                "Computer Science",
                "3rd Year",
                "Backend enthusiast who loves building robust APIs with Java and Spring Boot. Looking to learn Figma design to make my projects look sleek!",
                "alex@college.edu | Discord: alex_m#1042",
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
        ));
        alex.setRating(4.9);
        alex = userRepository.save(alex);

        User priya = userRepository.save(new User(
                null,
                "Priya Sharma",
                "priya@college.edu",
                "priya123",
                "Design & Interactive Media",
                "2nd Year",
                "Passionate UI/UX designer. I build high-fidelity wireframes and design systems in Figma. I want to learn backend Java to understand full-stack architecture.",
                "priya@college.edu | Telegram: @priya_design",
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
        ));
        priya.setRating(5.0);
        priya = userRepository.save(priya);

        User marcus = userRepository.save(new User(
                null,
                "Marcus Chen",
                "marcus@college.edu",
                "marcus123",
                "Data Science & AI",
                "4th Year",
                "Data science senior specializing in Python, Pandas, and machine learning models. Wanting to improve my speech delivery and presentation skills for hackathon pitches.",
                "marcus@college.edu | LinkedIn: marcus-chen-ai",
                "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80"
        ));
        marcus.setRating(4.8);
        marcus = userRepository.save(marcus);

        User aisha = userRepository.save(new User(
                null,
                "Aisha Patel",
                "aisha@college.edu",
                "aisha123",
                "Business Administration",
                "3rd Year",
                "Debate champion and entrepreneurship club lead. I can coach you on elevator pitches and public presentations. Hoping to learn Python to automate financial models.",
                "aisha@college.edu | WhatsApp: +1-555-0199",
                "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80"
        ));
        aisha.setRating(4.9);
        aisha = userRepository.save(aisha);

        User david = userRepository.save(new User(
                null,
                "David Kim",
                "david@college.edu",
                "david123",
                "Software Engineering",
                "3rd Year",
                "Frontend developer obsessed with React and TailwindCSS. Looking to learn machine learning basics for a capstone recommendation engine.",
                "david@college.edu | GitHub: david-kim-dev",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
        ));
        david.setRating(4.7);
        david = userRepository.save(david);

        // 3. Seed UserSkills (Teach & Learn)
        // Alex: Teaches Java & DSA; Wants UI/UX & React
        userSkillRepository.save(new UserSkill(alex, javaSkill, "TEACH", "EXPERT", "3 years of Spring Boot, built 4 production REST APIs and microservices"));
        userSkillRepository.save(new UserSkill(alex, dsaSkill, "TEACH", "ADVANCED", "Solved 300+ LeetCode problems; can teach graph algorithms and dynamic programming"));
        userSkillRepository.save(new UserSkill(alex, uiuxSkill, "LEARN", "BEGINNER", "Want to learn Figma component variants, typography, and responsive auto-layout"));
        userSkillRepository.save(new UserSkill(alex, reactSkill, "LEARN", "INTERMEDIATE", "Want to connect my Spring Boot APIs to modern React frontends"));

        // Priya: Teaches UI/UX; Wants Java & Python
        userSkillRepository.save(new UserSkill(priya, uiuxSkill, "TEACH", "EXPERT", "Winner of College Designathon 2025; specialized in mobile app prototypes"));
        userSkillRepository.save(new UserSkill(priya, photoSkill, "TEACH", "INTERMEDIATE", "DSLR portrait shooting and photo color grading in Adobe Lightroom"));
        userSkillRepository.save(new UserSkill(priya, javaSkill, "LEARN", "BEGINNER", "Need help understanding Java OOP concepts and building my first Spring Boot API"));
        userSkillRepository.save(new UserSkill(priya, pythonSkill, "LEARN", "BEGINNER", "Interested in creative coding and simple data scripting"));

        // Marcus: Teaches Python & ML; Wants Public Speaking
        userSkillRepository.save(new UserSkill(marcus, pythonSkill, "TEACH", "EXPERT", "Proficient in NumPy, Pandas, automation scripts, and scraping"));
        userSkillRepository.save(new UserSkill(marcus, mlSkill, "TEACH", "ADVANCED", "Hands-on experience training classifiers, CNNs, and regression models"));
        userSkillRepository.save(new UserSkill(marcus, publicSpeaking, "LEARN", "BEGINNER", "Get nervous during team presentations; need coaching on vocal variety and body language"));

        // Aisha: Teaches Public Speaking; Wants Python
        userSkillRepository.save(new UserSkill(aisha, publicSpeaking, "TEACH", "EXPERT", "Collegiate debate finalist, coached 20+ students on pitch decks and stage confidence"));
        userSkillRepository.save(new UserSkill(aisha, pythonSkill, "LEARN", "BEGINNER", "Want to automate spreadsheet data analysis using basic Python scripts"));

        // David: Teaches React; Wants ML
        userSkillRepository.save(new UserSkill(david, reactSkill, "TEACH", "ADVANCED", "SPA development, custom hooks, Tailwind CSS styling"));
        userSkillRepository.save(new UserSkill(david, mlSkill, "LEARN", "BEGINNER", "Interested in understanding how to integrate ML prediction models into web apps"));

        // 4. Seed Learning Requests
        // Priya sent Alex a request to learn Java in exchange for UI/UX (ACCEPTED)
        LearningRequest req1 = requestRepository.save(new LearningRequest(
                priya,
                alex,
                javaSkill,
                uiuxSkill,
                "Hey Alex! I saw you are great at Spring Boot. I need help understanding JPA entities and REST controllers. In exchange, I can review your UI designs in Figma and teach you auto-layout!"
        ));
        req1.setStatus("ACCEPTED");
        req1 = requestRepository.save(req1);

        // Aisha sent Marcus a request to learn Python (PENDING)
        requestRepository.save(new LearningRequest(
                aisha,
                marcus,
                pythonSkill,
                publicSpeaking,
                "Hi Marcus! I loved your AI workshop last month. Could you give me a 1-on-1 intro to Python Pandas? I can help you rehearse your upcoming hackathon pitch!"
        ));

        // David sent Alex a request to learn Java DSA (PENDING)
        requestRepository.save(new LearningRequest(
                david,
                alex,
                dsaSkill,
                reactSkill,
                "Alex, I have an upcoming technical interview next week. Could we do a 1-hour session on graph traversals? Happy to share React tips!"
        ));

        // 5. Seed Learning Sessions
        // Scheduled Session between Alex (teacher) and Priya (learner)
        sessionRepository.save(new LearningSession(
                req1,
                alex,
                priya,
                "Spring Boot REST API Basics & JPA Mapping",
                LocalDateTime.now().plusDays(1).withHour(16).withMinute(0),
                60,
                "ONLINE",
                "https://meet.google.com/sb-alex-priya",
                "Agenda: We will review Controller annotations (@GetMapping, @PostMapping) and test endpoints using browser devtools."
        ));

        // Completed Session between Aisha (teacher) and Marcus (learner)
        LearningSession completedSession = new LearningSession(
                null,
                aisha,
                marcus,
                "Elevator Pitch Structure & Stage Presence",
                LocalDateTime.now().minusDays(3).withHour(14).withMinute(0),
                45,
                "IN_PERSON",
                "College Central Library - Study Room 3B",
                "Reviewed Marcus's 3-minute project pitch and practiced vocal pacing."
        );
        completedSession.setStatus("COMPLETED");
        completedSession.setFeedbackRating(5);
        completedSession.setFeedbackComments("Aisha's feedback transformed my presentation! She gave practical tips on pausing and eye contact. Highly recommended teacher!");
        sessionRepository.save(completedSession);

        System.out.println(">> Initial demo data seeded successfully!");
    }
}
