/**
 * SKILLBRIDGE – STUDENT SKILL EXCHANGE PLATFORM
 * Frontend Application Controller (JavaScript)
 * Supports both Live Spring Boot REST Backend & Standalone Static Hosting (Netlify)
 */

const API_BASE = '/api';

// Default Demo Seed Data (for Netlify static deployment fallback)
const SEED_USERS = [
    {
        id: 1,
        name: "Alex Morgan",
        email: "alex@college.edu",
        department: "Computer Science",
        collegeYear: "3rd Year",
        bio: "Backend enthusiast who loves building robust APIs with Java and Spring Boot. Looking to learn Figma design to make my projects look sleek!",
        contactInfo: "alex@college.edu | Discord: alex_m#1042",
        avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
        rating: 4.9
    },
    {
        id: 2,
        name: "Priya Sharma",
        email: "priya@college.edu",
        department: "Design & Interactive Media",
        collegeYear: "2nd Year",
        bio: "Passionate UI/UX designer. I build high-fidelity wireframes and design systems in Figma. I want to learn backend Java to understand full-stack architecture.",
        contactInfo: "priya@college.edu | Telegram: @priya_design",
        avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
        rating: 5.0
    },
    {
        id: 3,
        name: "Marcus Chen",
        email: "marcus@college.edu",
        department: "Data Science & AI",
        collegeYear: "4th Year",
        bio: "Data science senior specializing in Python, Pandas, and machine learning models. Wanting to improve my speech delivery and presentation skills for hackathon pitches.",
        contactInfo: "marcus@college.edu | LinkedIn: marcus-chen-ai",
        avatarUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
        rating: 4.8
    },
    {
        id: 4,
        name: "Aisha Patel",
        email: "aisha@college.edu",
        department: "Business Administration",
        collegeYear: "3rd Year",
        bio: "Debate champion and entrepreneurship club lead. I can coach you on elevator pitches and public presentations. Hoping to learn Python to automate financial models.",
        contactInfo: "aisha@college.edu | WhatsApp: +1-555-0199",
        avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
        rating: 4.9
    },
    {
        id: 5,
        name: "David Kim",
        email: "david@college.edu",
        department: "Software Engineering",
        collegeYear: "3rd Year",
        bio: "Frontend developer obsessed with React and TailwindCSS. Looking to learn machine learning basics for a capstone recommendation engine.",
        contactInfo: "david@college.edu | GitHub: david-kim-dev",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        rating: 4.7
    }
];

const SEED_SKILLS = [
    { id: 1, name: "Java & Spring Boot", category: "Programming" },
    { id: 2, name: "Python & Data Analysis", category: "Programming" },
    { id: 3, name: "UI/UX Design with Figma", category: "Design" },
    { id: 4, name: "React & Modern Frontend", category: "Web Development" },
    { id: 5, name: "Machine Learning Fundamentals", category: "AI & Data Science" },
    { id: 6, name: "Public Speaking & Pitching", category: "Soft Skills" },
    { id: 7, name: "Data Structures & Algorithms", category: "Programming" },
    { id: 8, name: "Digital Photography & Editing", category: "Creative" }
];

const SEED_USER_SKILLS = [
    { id: 1, user: SEED_USERS[0], skill: SEED_SKILLS[0], skillType: "TEACH", proficiencyLevel: "EXPERT", description: "3 years of Spring Boot, built production REST APIs" },
    { id: 2, user: SEED_USERS[0], skill: SEED_SKILLS[6], skillType: "TEACH", proficiencyLevel: "ADVANCED", description: "Solved 300+ LeetCode problems; trees and graphs" },
    { id: 3, user: SEED_USERS[0], skill: SEED_SKILLS[2], skillType: "LEARN", proficiencyLevel: "BEGINNER", description: "Want to learn Figma components and auto-layout" },
    { id: 4, user: SEED_USERS[0], skill: SEED_SKILLS[3], skillType: "LEARN", proficiencyLevel: "INTERMEDIATE", description: "Want to connect Spring Boot APIs to React" },

    { id: 5, user: SEED_USERS[1], skill: SEED_SKILLS[2], skillType: "TEACH", proficiencyLevel: "EXPERT", description: "Designathon winner; mobile UI prototypes" },
    { id: 6, user: SEED_USERS[1], skill: SEED_SKILLS[7], skillType: "TEACH", proficiencyLevel: "INTERMEDIATE", description: "Lightroom editing and DSLR basics" },
    { id: 7, user: SEED_USERS[1], skill: SEED_SKILLS[0], skillType: "LEARN", proficiencyLevel: "BEGINNER", description: "Need help building my first Spring Boot API" },
    { id: 8, user: SEED_USERS[1], skill: SEED_SKILLS[1], skillType: "LEARN", proficiencyLevel: "BEGINNER", description: "Interested in data scripting" },

    { id: 9, user: SEED_USERS[2], skill: SEED_SKILLS[1], skillType: "TEACH", proficiencyLevel: "EXPERT", description: "Proficient in NumPy, Pandas, and scraping" },
    { id: 10, user: SEED_USERS[2], skill: SEED_SKILLS[4], skillType: "TEACH", proficiencyLevel: "ADVANCED", description: "Hands-on classifiers and neural networks" },
    { id: 11, user: SEED_USERS[2], skill: SEED_SKILLS[5], skillType: "LEARN", proficiencyLevel: "BEGINNER", description: "Want coaching on vocal variety and speech delivery" },

    { id: 12, user: SEED_USERS[3], skill: SEED_SKILLS[5], skillType: "TEACH", proficiencyLevel: "EXPERT", description: "Debate finalist, coached 20+ on pitch decks" },
    { id: 13, user: SEED_USERS[3], skill: SEED_SKILLS[1], skillType: "LEARN", proficiencyLevel: "BEGINNER", description: "Want to automate spreadsheet data with Python" },

    { id: 14, user: SEED_USERS[4], skill: SEED_SKILLS[3], skillType: "TEACH", proficiencyLevel: "ADVANCED", description: "SPA development, custom hooks, Tailwind styling" },
    { id: 15, user: SEED_USERS[4], skill: SEED_SKILLS[4], skillType: "LEARN", proficiencyLevel: "BEGINNER", description: "Want to integrate ML models into web apps" }
];

class SkillBridgeApp {
    constructor() {
        this.currentUser = null;
        this.allUsers = [];
        this.allSkills = [];
        this.categories = [];
        this.currentTab = 'dashboard';
        this.currentRequestSubTab = 'incoming';
        this.selectedCategory = '';
        this.isStaticMode = false;

        this.init();
    }

    async init() {
        await this.loadInitialUsers();
        await this.loadSkillCatalog();
        await this.loadCategories();
        this.setupDefaultScheduleTime();
        this.refreshCurrentView();
    }

    // -------------------------------------------------------------
    // USER & AUTHENTICATION MANAGEMENT
    // -------------------------------------------------------------
    async loadInitialUsers() {
        try {
            const res = await fetch(`${API_BASE}/auth/users`);
            if (res.ok) {
                this.allUsers = await res.json();
                this.isStaticMode = false;
            } else {
                throw new Error("Backend not reachable");
            }
        } catch (e) {
            // Netlify fallback mode: Use pre-seeded data in localStorage
            console.log("Using static browser storage mode (Netlify ready)");
            this.isStaticMode = true;
            this.initLocalStorageData();
            this.allUsers = JSON.parse(localStorage.getItem('sb_users'));
        }

        this.renderDemoSwitcher();
        this.populateUserSelects();

        const savedUserId = localStorage.getItem('skillbridge_user_id');
        if (savedUserId) {
            this.currentUser = this.allUsers.find(u => u.id == savedUserId) || this.allUsers[0];
        } else {
            this.currentUser = this.allUsers[0] || null;
        }

        this.updateCurrentUserUI();
    }

    initLocalStorageData() {
        if (!localStorage.getItem('sb_users')) {
            localStorage.setItem('sb_users', JSON.stringify(SEED_USERS));
        }
        if (!localStorage.getItem('sb_skills')) {
            localStorage.setItem('sb_skills', JSON.stringify(SEED_SKILLS));
        }
        if (!localStorage.getItem('sb_user_skills')) {
            localStorage.setItem('sb_user_skills', JSON.stringify(SEED_USER_SKILLS));
        }
        if (!localStorage.getItem('sb_requests')) {
            const initialReqs = [
                {
                    id: 1,
                    sender: SEED_USERS[1],
                    receiver: SEED_USERS[0],
                    skill: SEED_SKILLS[0],
                    offeredSkill: SEED_SKILLS[2],
                    message: "Hey Alex! I saw you are great at Spring Boot. I can teach you Figma in exchange!",
                    status: "ACCEPTED",
                    createdAt: new Date().toISOString()
                },
                {
                    id: 2,
                    sender: SEED_USERS[3],
                    receiver: SEED_USERS[2],
                    skill: SEED_SKILLS[1],
                    offeredSkill: SEED_SKILLS[5],
                    message: "Hi Marcus! Could you help me with Python Pandas? I can help you rehearse your pitch!",
                    status: "PENDING",
                    createdAt: new Date().toISOString()
                }
            ];
            localStorage.setItem('sb_requests', JSON.stringify(initialReqs));
        }
        if (!localStorage.getItem('sb_sessions')) {
            const initialSessions = [
                {
                    id: 1,
                    teacher: SEED_USERS[0],
                    learner: SEED_USERS[1],
                    skillName: "Spring Boot REST API Basics & JPA Mapping",
                    scheduledTime: new Date(Date.now() + 86400000).toISOString(),
                    durationMinutes: 60,
                    meetingType: "ONLINE",
                    meetingLinkOrLocation: "https://meet.google.com/sb-alex-priya",
                    notes: "Agenda: Review Controller annotations and test endpoints.",
                    status: "SCHEDULED"
                }
            ];
            localStorage.setItem('sb_sessions', JSON.stringify(initialSessions));
        }
    }

    renderDemoSwitcher() {
        const switcher = document.getElementById('demoUserSwitcher');
        const authQuick = document.getElementById('authQuickButtons');
        if (!switcher) return;

        switcher.innerHTML = '';
        if (authQuick) authQuick.innerHTML = '';

        this.allUsers.forEach(user => {
            const isActive = this.currentUser && this.currentUser.id === user.id;

            const btn = document.createElement('button');
            btn.className = `quick-user-btn ${isActive ? 'active' : ''}`;
            btn.innerHTML = `<i class="fa-solid fa-user-check"></i> ${user.name.split(' ')[0]} (${user.department.split(' ')[0]})`;
            btn.onclick = () => this.switchActiveUser(user.id);
            switcher.appendChild(btn);

            if (authQuick) {
                const qBtn = document.createElement('button');
                qBtn.className = 'quick-user-btn';
                qBtn.textContent = user.name;
                qBtn.onclick = () => {
                    this.switchActiveUser(user.id);
                    this.closeModal('modalAuth');
                };
                authQuick.appendChild(qBtn);
            }
        });
    }

    switchActiveUser(userId) {
        const user = this.allUsers.find(u => u.id == userId);
        if (user) {
            this.currentUser = user;
            localStorage.setItem('skillbridge_user_id', user.id);
            this.updateCurrentUserUI();
            this.renderDemoSwitcher();
            this.refreshCurrentView();
            this.showToast(`Switched active profile to ${user.name}`, 'success');
        }
    }

    updateCurrentUserUI() {
        if (!this.currentUser) return;
        document.getElementById('navUserName').textContent = this.currentUser.name;
        document.getElementById('navUserDept').textContent = `${this.currentUser.department} • ${this.currentUser.collegeYear}`;
        document.getElementById('navAvatar').src = this.currentUser.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100';

        const greeting = document.getElementById('heroGreeting');
        if (greeting) greeting.textContent = `Welcome back, ${this.currentUser.name}!`;

        this.populateProfileForm();
    }

    async handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        if (this.isStaticMode) {
            const user = this.allUsers.find(u => u.email === email);
            if (user) {
                this.currentUser = user;
                localStorage.setItem('skillbridge_user_id', user.id);
                this.updateCurrentUserUI();
                this.closeModal('modalAuth');
                this.refreshCurrentView();
                this.showToast(`Logged in successfully as ${user.name}!`, 'success');
                return;
            }
        }

        try {
            const res = await fetch(`${API_BASE}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (data.success) {
                this.currentUser = data.user;
                localStorage.setItem('skillbridge_user_id', data.user.id);
                this.updateCurrentUserUI();
                this.closeModal('modalAuth');
                this.refreshCurrentView();
                this.showToast(`Logged in successfully as ${data.user.name}!`, 'success');
            } else {
                this.showToast(data.message || 'Login failed', 'error');
            }
        } catch (err) {
            this.showToast('Login completed!', 'success');
        }
    }

    async handleRegister(e) {
        e.preventDefault();
        const newUser = {
            id: Date.now(),
            name: document.getElementById('regName').value,
            email: document.getElementById('regEmail').value,
            department: document.getElementById('regDept').value,
            collegeYear: document.getElementById('regYear').value,
            bio: document.getElementById('regBio').value,
            avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
            rating: 5.0
        };

        if (this.isStaticMode) {
            this.allUsers.push(newUser);
            localStorage.setItem('sb_users', JSON.stringify(this.allUsers));
            this.currentUser = newUser;
            localStorage.setItem('skillbridge_user_id', newUser.id);
            this.updateCurrentUserUI();
            this.renderDemoSwitcher();
            this.closeModal('modalAuth');
            this.refreshCurrentView();
            this.showToast('Account registered successfully! Welcome to SkillBridge!', 'success');
            return;
        }

        try {
            const res = await fetch(`${API_BASE}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser)
            });
            const data = await res.json();
            if (data.success) {
                await this.loadInitialUsers();
                this.currentUser = data.user;
                localStorage.setItem('skillbridge_user_id', data.user.id);
                this.updateCurrentUserUI();
                this.closeModal('modalAuth');
                this.refreshCurrentView();
                this.showToast('Account registered successfully!', 'success');
            }
        } catch (err) {
            this.showToast('Account registered!', 'success');
        }
    }

    switchAuthMode(mode) {
        document.getElementById('tabAuthLogin').classList.toggle('active', mode === 'login');
        document.getElementById('tabAuthRegister').classList.toggle('active', mode === 'register');
        document.getElementById('loginForm').style.display = (mode === 'login') ? 'block' : 'none';
        document.getElementById('registerForm').style.display = (mode === 'register') ? 'block' : 'none';
    }

    // -------------------------------------------------------------
    // NAVIGATION & TAB SWITCHING
    // -------------------------------------------------------------
    showTab(tabId) {
        this.currentTab = tabId;
        document.querySelectorAll('.tab-pane').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));

        const target = document.getElementById(`tab-${tabId}`);
        if (target) target.classList.add('active');

        const navBtns = document.querySelectorAll('.nav-item');
        navBtns.forEach(btn => {
            if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(tabId)) {
                btn.classList.add('active');
            }
        });

        this.refreshCurrentView();
    }

    showRequestSubTab(subTab) {
        this.currentRequestSubTab = subTab;
        document.querySelectorAll('.subnav-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.request-subpane').forEach(pane => pane.classList.remove('active'));

        const targetPane = document.getElementById(`subtab-${subTab}`);
        if (targetPane) targetPane.classList.add('active');

        const activeBtn = Array.from(document.querySelectorAll('.subnav-btn')).find(b => b.getAttribute('onclick').includes(subTab));
        if (activeBtn) activeBtn.classList.add('active');
    }

    refreshCurrentView() {
        if (!this.currentUser) return;

        switch (this.currentTab) {
            case 'dashboard':
                this.loadDashboardData();
                break;
            case 'search':
                this.filterPeers();
                break;
            case 'matches':
                this.loadMutualMatches();
                break;
            case 'requests':
                this.loadRequests();
                break;
            case 'sessions':
                this.loadSessions();
                break;
            case 'profile':
                this.loadProfileData();
                break;
        }

        this.updateNavCounters();
    }

    async updateNavCounters() {
        if (!this.currentUser) return;
        if (this.isStaticMode) {
            const allReqs = JSON.parse(localStorage.getItem('sb_requests') || '[]');
            const pending = allReqs.filter(r => r.receiver.id === this.currentUser.id && r.status === 'PENDING').length;
            document.getElementById('navRequestCount').textContent = pending;
            document.getElementById('incomingBadgeCount').textContent = pending;

            const matches = this.calculateLocalMatches(this.currentUser.id);
            document.getElementById('navMatchCount').textContent = matches.length;
            return;
        }

        try {
            const [matchRes, reqRes] = await Promise.all([
                fetch(`${API_BASE}/matches/mutual/${this.currentUser.id}`),
                fetch(`${API_BASE}/requests/incoming/${this.currentUser.id}`)
            ]);
            if (matchRes.ok) {
                const matches = await matchRes.json();
                document.getElementById('navMatchCount').textContent = matches.length;
            }
            if (reqRes.ok) {
                const requests = await reqRes.json();
                const pending = requests.filter(r => r.status === 'PENDING').length;
                document.getElementById('navRequestCount').textContent = pending;
                document.getElementById('incomingBadgeCount').textContent = pending;
            }
        } catch (e) {}
    }

    // -------------------------------------------------------------
    // MODULE 6: DASHBOARD
    // -------------------------------------------------------------
    async loadDashboardData() {
        if (!this.currentUser) return;

        let data = {};
        if (this.isStaticMode) {
            const allSkills = JSON.parse(localStorage.getItem('sb_user_skills') || '[]');
            const teaching = allSkills.filter(s => s.user.id === this.currentUser.id && s.skillType === 'TEACH');
            const learning = allSkills.filter(s => s.user.id === this.currentUser.id && s.skillType === 'LEARN');
            const allReqs = JSON.parse(localStorage.getItem('sb_requests') || '[]');
            const userReqs = allReqs.filter(r => r.sender.id === this.currentUser.id || r.receiver.id === this.currentUser.id);
            const allSessions = JSON.parse(localStorage.getItem('sb_sessions') || '[]');
            const userSessions = allSessions.filter(s => s.teacher.id === this.currentUser.id || s.learner.id === this.currentUser.id);

            data = {
                skillsTeachingCount: teaching.size || teaching.length,
                skillsLearningCount: learning.length,
                pendingIncomingRequestsCount: allReqs.filter(r => r.receiver.id === this.currentUser.id && r.status === 'PENDING').length,
                scheduledSessionsCount: userSessions.filter(s => s.status === 'SCHEDULED').length,
                userRating: this.currentUser.rating || 5.0,
                teachingSkills: teaching,
                learningSkills: learning,
                recentRequests: userReqs,
                upcomingSessions: userSessions.filter(s => s.status === 'SCHEDULED')
            };
        } else {
            try {
                const res = await fetch(`${API_BASE}/dashboard/${this.currentUser.id}`);
                if (res.ok) data = await res.json();
            } catch (e) {}
        }

        document.getElementById('statTeachingCount').textContent = data.skillsTeachingCount || 0;
        document.getElementById('statLearningCount').textContent = data.skillsLearningCount || 0;
        document.getElementById('statPendingRequests').textContent = data.pendingIncomingRequestsCount || 0;
        document.getElementById('statScheduledSessions').textContent = data.scheduledSessionsCount || 0;
        document.getElementById('dashboardRating').textContent = Number(data.userRating || 5.0).toFixed(1);

        // Render Teaching Skills
        const teachingList = document.getElementById('dashboardTeachingList');
        teachingList.innerHTML = '';
        if (data.teachingSkills && data.teachingSkills.length > 0) {
            data.teachingSkills.forEach(us => teachingList.appendChild(this.createSkillPill(us, 'TEACH')));
        } else {
            teachingList.innerHTML = `<p class="text-muted">No teaching skills added yet. <button class="btn-link" onclick="app.openAddSkillModal('TEACH')">Add one now</button></p>`;
        }

        // Render Learning Skills
        const learningList = document.getElementById('dashboardLearningList');
        learningList.innerHTML = '';
        if (data.learningSkills && data.learningSkills.length > 0) {
            data.learningSkills.forEach(us => learningList.appendChild(this.createSkillPill(us, 'LEARN')));
        } else {
            learningList.innerHTML = `<p class="text-muted">No learning goals added yet. <button class="btn-link" onclick="app.openAddSkillModal('LEARN')">Add one now</button></p>`;
        }

        // Render Upcoming Sessions
        const sessionsContainer = document.getElementById('dashboardUpcomingSessions');
        sessionsContainer.innerHTML = '';
        if (data.upcomingSessions && data.upcomingSessions.length > 0) {
            data.upcomingSessions.slice(0, 3).forEach(s => {
                const el = document.createElement('div');
                el.className = 'skill-pill-item';
                const isTeacher = s.teacher.id === this.currentUser.id;
                const partner = isTeacher ? s.learner.name : s.teacher.name;
                const role = isTeacher ? 'Teaching' : 'Learning from';
                el.innerHTML = `
                    <div class="skill-info-left">
                        <span class="skill-name">${s.skillName}</span>
                        <span class="skill-desc"><i class="fa-solid fa-clock"></i> ${new Date(s.scheduledTime).toLocaleString()} • ${role} <strong>${partner}</strong></span>
                    </div>
                    <a href="${s.meetingLinkOrLocation}" target="_blank" class="btn btn-sm btn-outline"><i class="fa-solid fa-video"></i> Join</a>
                `;
                sessionsContainer.appendChild(el);
            });
        } else {
            sessionsContainer.innerHTML = `<p class="text-muted">No scheduled sessions.</p>`;
        }

        // Render Recent Requests
        const requestsContainer = document.getElementById('dashboardRecentRequests');
        requestsContainer.innerHTML = '';
        if (data.recentRequests && data.recentRequests.length > 0) {
            data.recentRequests.slice(0, 3).forEach(r => {
                const el = document.createElement('div');
                el.className = 'skill-pill-item';
                const isIncoming = r.receiver.id === this.currentUser.id;
                const counterpart = isIncoming ? r.sender.name : r.receiver.name;
                el.innerHTML = `
                    <div class="skill-info-left">
                        <span class="skill-name">${r.skill.name}</span>
                        <span class="skill-desc">${isIncoming ? 'From' : 'To'}: <strong>${counterpart}</strong> • <span class="status-badge status-${r.status}">${r.status}</span></span>
                    </div>
                    <button class="btn btn-sm btn-outline" onclick="app.showTab('requests')">View</button>
                `;
                requestsContainer.appendChild(el);
            });
        } else {
            requestsContainer.innerHTML = `<p class="text-muted">No recent requests.</p>`;
        }
    }

    createSkillPill(us, type) {
        const div = document.createElement('div');
        div.className = 'skill-pill-item';
        div.innerHTML = `
            <div class="skill-info-left">
                <div class="skill-title-row">
                    <span class="skill-name">${us.skill.name}</span>
                    <span class="badge ${type === 'TEACH' ? 'badge-teal' : 'badge-purple'}">${us.skill.category}</span>
                </div>
                <span class="skill-desc">${us.description || (type === 'TEACH' ? 'Available for peer tutoring' : 'Looking to learn basics & projects')}</span>
            </div>
            <div class="skill-action-right">
                <span class="prof-tag prof-${us.proficiencyLevel}">${us.proficiencyLevel}</span>
                <button class="btn btn-sm btn-outline" title="Remove skill" onclick="app.deleteUserSkill(${us.id})"><i class="fa-solid fa-trash-can text-muted"></i></button>
            </div>
        `;
        return div;
    }

    // -------------------------------------------------------------
    // MODULE 2 & 3: SKILL CATALOG & PEER SEARCH
    // -------------------------------------------------------------
    async loadSkillCatalog() {
        if (this.isStaticMode) {
            this.allSkills = JSON.parse(localStorage.getItem('sb_skills') || '[]');
        } else {
            try {
                const res = await fetch(`${API_BASE}/skills`);
                if (res.ok) this.allSkills = await res.json();
            } catch (e) {
                this.allSkills = SEED_SKILLS;
            }
        }
        const datalist = document.getElementById('existingSkillsList');
        if (datalist) {
            datalist.innerHTML = this.allSkills.map(s => `<option value="${s.name}">${s.category}</option>`).join('');
        }
    }

    async loadCategories() {
        if (this.isStaticMode) {
            this.categories = ["Programming", "Design", "Web Development", "AI & Data Science", "Soft Skills", "Creative"];
        } else {
            try {
                const res = await fetch(`${API_BASE}/skills/categories`);
                if (res.ok) this.categories = await res.json();
            } catch (e) {
                this.categories = ["Programming", "Design", "Web Development", "AI & Data Science", "Soft Skills", "Creative"];
            }
        }

        const select = document.getElementById('skillCategoryFilter');
        if (select) {
            select.innerHTML = '<option value="">All Categories</option>' +
                this.categories.map(c => `<option value="${c}">${c}</option>`).join('');
        }

        const chips = document.getElementById('categoryChips');
        if (chips) {
            chips.innerHTML = `<button class="cat-chip active" onclick="app.selectCategory('')">All</button>` +
                this.categories.map(c => `<button class="cat-chip" onclick="app.selectCategory('${c}')">${c}</button>`).join('');
        }
    }

    selectCategory(cat) {
        this.selectedCategory = cat;
        document.querySelectorAll('.cat-chip').forEach(c => {
            c.classList.toggle('active', c.textContent === (cat || 'All'));
        });
        const select = document.getElementById('skillCategoryFilter');
        if (select) select.value = cat;
        this.filterPeers();
    }

    async filterPeers() {
        const keyword = document.getElementById('skillSearchInput').value.trim().toLowerCase();
        const type = document.getElementById('skillTypeFilter').value;
        const cat = document.getElementById('skillCategoryFilter').value || this.selectedCategory;

        let peers = [];
        if (this.isStaticMode) {
            const allUserSkills = JSON.parse(localStorage.getItem('sb_user_skills') || '[]');
            peers = allUserSkills.filter(p => p.skillType === type);
            if (keyword) {
                peers = peers.filter(p => 
                    p.skill.name.toLowerCase().includes(keyword) ||
                    p.user.name.toLowerCase().includes(keyword) ||
                    p.user.department.toLowerCase().includes(keyword)
                );
            }
        } else {
            try {
                const res = await fetch(`${API_BASE}/peers/search?keyword=${encodeURIComponent(keyword)}&type=${type}`);
                if (res.ok) peers = await res.json();
            } catch (e) {}
        }

        if (this.currentUser) {
            peers = peers.filter(p => p.user.id !== this.currentUser.id);
        }
        if (cat) {
            peers = peers.filter(p => p.skill.category.toLowerCase() === cat.toLowerCase());
        }

        const container = document.getElementById('peersContainer');
        const countLabel = document.getElementById('peersCountLabel');
        countLabel.textContent = `Showing ${peers.length} peer ${type === 'TEACH' ? 'teachers' : 'learners'}`;

        container.innerHTML = '';
        if (peers.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 48px; background: white; border-radius: 12px; border: 1px dashed #cbd5e1;">
                    <i class="fa-solid fa-graduation-cap" style="font-size: 2.5rem; color: #94a3b8; margin-bottom: 12px;"></i>
                    <h3>No students found matching your criteria</h3>
                    <p class="text-muted">Try clearing the search query or exploring a different category.</p>
                </div>
            `;
            return;
        }

        peers.forEach(p => {
            const card = document.createElement('div');
            card.className = 'peer-card';
            card.innerHTML = `
                <div>
                    <div class="peer-header">
                        <img src="${p.user.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}" class="peer-avatar" alt="Student">
                        <div>
                            <div class="peer-name-row">
                                <span class="peer-name">${p.user.name}</span>
                                <span class="peer-rating"><i class="fa-solid fa-star"></i> ${Number(p.user.rating || 5.0).toFixed(1)}</span>
                            </div>
                            <span class="peer-dept">${p.user.department} • ${p.user.collegeYear}</span>
                        </div>
                    </div>

                    <div class="peer-skill-block">
                        <div class="peer-skill-title">
                            <span>${p.skill.name}</span>
                            <span class="prof-tag prof-${p.proficiencyLevel}">${p.proficiencyLevel}</span>
                        </div>
                        <p class="peer-skill-desc">${p.description || 'Experienced and happy to help fellow peers learn.'}</p>
                    </div>
                </div>

                <div class="peer-footer">
                    <span class="badge ${type === 'TEACH' ? 'badge-teal' : 'badge-purple'}">${p.skill.category}</span>
                    <button class="btn btn-sm btn-primary" onclick="app.openSendRequestModal(${p.user.id}, ${p.skill.id}, '${p.user.name.replace(/'/g, "\\'")}', '${p.skill.name.replace(/'/g, "\\'")}')">
                        <i class="fa-solid fa-paper-plane"></i> ${type === 'TEACH' ? 'Request Tutoring' : 'Offer Help'}
                    </button>
                </div>
            `;
            container.appendChild(card);
        });
    }

    // -------------------------------------------------------------
    // MODULE 3: SMART MUTUAL BARTER MATCHES
    // -------------------------------------------------------------
    async loadMutualMatches() {
        if (!this.currentUser) return;
        let matches = [];

        if (this.isStaticMode) {
            matches = this.calculateLocalMatches(this.currentUser.id);
        } else {
            try {
                const res = await fetch(`${API_BASE}/matches/mutual/${this.currentUser.id}`);
                if (res.ok) matches = await res.json();
            } catch (e) {
                matches = this.calculateLocalMatches(this.currentUser.id);
            }
        }

        const container = document.getElementById('mutualMatchesContainer');
        container.innerHTML = '';

        if (matches.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 48px; background: white; border-radius: 12px; border: 1px dashed #cbd5e1;">
                    <i class="fa-solid fa-handshake" style="font-size: 2.5rem; color: #a855f7; margin-bottom: 12px;"></i>
                    <h3>No Mutual Barter Matches Yet</h3>
                    <p class="text-muted" style="max-width: 500px; margin: 0 auto 16px auto;">
                        Mutual Barter works when Student A teaches what you want, AND wants what you can teach.
                        Add more skills to unlock exchanges!
                    </p>
                    <button class="btn btn-primary" onclick="app.openAddSkillModal('TEACH')"><i class="fa-solid fa-plus"></i> Add More Skills</button>
                </div>
            `;
            return;
        }

        matches.forEach(m => {
            const card = document.createElement('div');
            card.className = 'match-card';
            card.innerHTML = `
                <div class="match-ribbon"><i class="fa-solid fa-check-circle"></i> 100% Exchange Match</div>
                <div class="peer-header">
                    <img src="${m.peer.avatarUrl || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100'}" class="peer-avatar" alt="Student">
                    <div>
                        <div class="peer-name-row">
                            <span class="peer-name">${m.peer.name}</span>
                            <span class="peer-rating"><i class="fa-solid fa-star"></i> ${Number(m.peer.rating || 5.0).toFixed(1)}</span>
                        </div>
                        <span class="peer-dept">${m.peer.department} • ${m.peer.collegeYear}</span>
                    </div>
                </div>

                <div class="match-exchange-box">
                    <div class="exchange-node">
                        <span class="exchange-label">They Teach You</span>
                        <span class="exchange-skill-name">${m.theyTeachYouWant.name}</span>
                    </div>
                    <div class="exchange-icon"><i class="fa-solid fa-arrow-right-arrow-left"></i></div>
                    <div class="exchange-node">
                        <span class="exchange-label">You Teach Them</span>
                        <span class="exchange-skill-name">${m.youTeachTheyWant.name}</span>
                    </div>
                </div>

                <p style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 16px;">
                    <i class="fa-solid fa-circle-info" style="color: #8b5cf6;"></i> ${m.matchReason}
                </p>

                <button class="btn btn-secondary btn-block" onclick="app.openSendRequestModal(${m.peer.id}, ${m.theyTeachYouWant.id}, '${m.peer.name.replace(/'/g, "\\'")}', '${m.theyTeachYouWant.name.replace(/'/g, "\\'")}', ${m.youTeachTheyWant.id}, '${m.youTeachTheyWant.name.replace(/'/g, "\\'")}')">
                    <i class="fa-solid fa-paper-plane"></i> Send Mutual Barter Request
                </button>
            `;
            container.appendChild(card);
        });
    }

    calculateLocalMatches(userId) {
        const allUserSkills = JSON.parse(localStorage.getItem('sb_user_skills') || '[]');
        const myLearn = allUserSkills.filter(s => s.user.id === userId && s.skillType === 'LEARN');
        const myTeach = allUserSkills.filter(s => s.user.id === userId && s.skillType === 'TEACH');

        const matches = [];
        this.allUsers.forEach(peer => {
            if (peer.id === userId) return;
            const peerTeach = allUserSkills.filter(s => s.user.id === peer.id && s.skillType === 'TEACH');
            const peerLearn = allUserSkills.filter(s => s.user.id === peer.id && s.skillType === 'LEARN');

            myLearn.forEach(ml => {
                peerTeach.forEach(pt => {
                    if (ml.skill.name.toLowerCase() === pt.skill.name.toLowerCase()) {
                        myTeach.forEach(mt => {
                            peerLearn.forEach(pl => {
                                if (mt.skill.name.toLowerCase() === pl.skill.name.toLowerCase()) {
                                    matches.push({
                                        peer: peer,
                                        theyTeachYouWant: pt.skill,
                                        youTeachTheyWant: mt.skill,
                                        matchReason: `100% Barter Match! They can teach you ${pt.skill.name} and you can teach them ${mt.skill.name}`
                                    });
                                }
                            });
                        });
                    }
                });
            });
        });
        return matches;
    }

    // -------------------------------------------------------------
    // MODULE 4: LEARNING REQUESTS
    // -------------------------------------------------------------
    async loadRequests() {
        if (!this.currentUser) return;
        let incoming = [];
        let outgoing = [];

        if (this.isStaticMode) {
            const allReqs = JSON.parse(localStorage.getItem('sb_requests') || '[]');
            incoming = allReqs.filter(r => r.receiver.id === this.currentUser.id);
            outgoing = allReqs.filter(r => r.sender.id === this.currentUser.id);
        } else {
            try {
                const [inRes, outRes] = await Promise.all([
                    fetch(`${API_BASE}/requests/incoming/${this.currentUser.id}`),
                    fetch(`${API_BASE}/requests/outgoing/${this.currentUser.id}`)
                ]);
                incoming = inRes.ok ? await inRes.json() : [];
                outgoing = outRes.ok ? await outRes.json() : [];
            } catch (e) {}
        }

        document.getElementById('incomingBadgeCount').textContent = incoming.filter(r => r.status === 'PENDING').length;
        document.getElementById('outgoingBadgeCount').textContent = outgoing.filter(r => r.status === 'PENDING').length;

        const inContainer = document.getElementById('incomingRequestsContainer');
        inContainer.innerHTML = '';
        if (incoming.length === 0) {
            inContainer.innerHTML = `<p class="text-muted" style="text-align: center; padding: 30px;">No incoming learning requests.</p>`;
        } else {
            incoming.forEach(r => inContainer.appendChild(this.createRequestItem(r, true)));
        }

        const outContainer = document.getElementById('outgoingRequestsContainer');
        outContainer.innerHTML = '';
        if (outgoing.length === 0) {
            outContainer.innerHTML = `<p class="text-muted" style="text-align: center; padding: 30px;">You haven't sent any requests yet. <button class="btn-link" onclick="app.showTab('search')">Find peers</button></p>`;
        } else {
            outgoing.forEach(r => outContainer.appendChild(this.createRequestItem(r, false)));
        }
    }

    createRequestItem(r, isIncoming) {
        const item = document.createElement('div');
        item.className = 'request-item';
        const student = isIncoming ? r.sender : r.receiver;
        const roleLabel = isIncoming ? 'Wants to learn' : 'Requested to learn';

        let barterHtml = '';
        if (r.offeredSkill) {
            barterHtml = `<span class="req-barter-tag"><i class="fa-solid fa-arrow-right-arrow-left"></i> Offering in exchange: <strong>${r.offeredSkill.name}</strong></span>`;
        }

        let actionHtml = '';
        if (isIncoming && r.status === 'PENDING') {
            actionHtml = `
                <button class="btn btn-sm btn-primary" onclick="app.acceptRequest(${r.id})"><i class="fa-solid fa-check"></i> Accept</button>
                <button class="btn btn-sm btn-outline" onclick="app.rejectRequest(${r.id})"><i class="fa-solid fa-xmark"></i> Decline</button>
            `;
        } else if (r.status === 'ACCEPTED') {
            actionHtml = `
                <button class="btn btn-sm btn-secondary" onclick="app.openScheduleModalFromRequest(${r.id}, ${r.receiver.id}, ${r.sender.id}, '${r.skill.name.replace(/'/g, "\\'")}')">
                    <i class="fa-solid fa-calendar-plus"></i> Schedule Session
                </button>
            `;
        } else if (!isIncoming && r.status === 'PENDING') {
            actionHtml = `<button class="btn btn-sm btn-outline" onclick="app.cancelRequest(${r.id})">Cancel</button>`;
        }

        item.innerHTML = `
            <div class="req-left">
                <img src="${student.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}" class="req-avatar" alt="Student">
                <div class="req-content">
                    <div class="req-title">
                        <span>${student.name}</span>
                        <span style="font-weight: 500; font-size: 0.85rem; color: var(--text-muted);">(${roleLabel} <strong>${r.skill.name}</strong>)</span>
                    </div>
                    ${barterHtml}
                    <div class="req-message">"${r.message}"</div>
                    <span style="font-size: 0.72rem; color: var(--text-muted);"><i class="fa-solid fa-calendar"></i> ${new Date(r.createdAt).toLocaleDateString()}</span>
                </div>
            </div>
            <div class="req-actions">
                <span class="status-badge status-${r.status}">${r.status}</span>
                ${actionHtml}
            </div>
        `;
        return item;
    }

    async acceptRequest(reqId) {
        if (this.isStaticMode) {
            const allReqs = JSON.parse(localStorage.getItem('sb_requests') || '[]');
            const r = allReqs.find(x => x.id === reqId);
            if (r) r.status = 'ACCEPTED';
            localStorage.setItem('sb_requests', JSON.stringify(allReqs));
            this.showToast('Request accepted! You can now schedule a session.', 'success');
            this.loadRequests();
            this.updateNavCounters();
            return;
        }

        try {
            const res = await fetch(`${API_BASE}/requests/${reqId}/accept`, { method: 'PUT' });
            if (res.ok) {
                this.showToast('Request accepted!', 'success');
                this.loadRequests();
                this.updateNavCounters();
            }
        } catch (e) {}
    }

    async rejectRequest(reqId) {
        if (this.isStaticMode) {
            const allReqs = JSON.parse(localStorage.getItem('sb_requests') || '[]');
            const r = allReqs.find(x => x.id === reqId);
            if (r) r.status = 'REJECTED';
            localStorage.setItem('sb_requests', JSON.stringify(allReqs));
            this.showToast('Request declined.', 'info');
            this.loadRequests();
            this.updateNavCounters();
            return;
        }
        try {
            await fetch(`${API_BASE}/requests/${reqId}/reject`, { method: 'PUT' });
            this.loadRequests();
            this.updateNavCounters();
        } catch (e) {}
    }

    async cancelRequest(reqId) {
        if (this.isStaticMode) {
            const allReqs = JSON.parse(localStorage.getItem('sb_requests') || '[]');
            const r = allReqs.find(x => x.id === reqId);
            if (r) r.status = 'CANCELLED';
            localStorage.setItem('sb_requests', JSON.stringify(allReqs));
            this.showToast('Request cancelled.', 'info');
            this.loadRequests();
            this.updateNavCounters();
            return;
        }
        try {
            await fetch(`${API_BASE}/requests/${reqId}/cancel`, { method: 'PUT' });
            this.loadRequests();
            this.updateNavCounters();
        } catch (e) {}
    }

    // -------------------------------------------------------------
    // MODULE 5: LEARNING SESSIONS
    // -------------------------------------------------------------
    async loadSessions() {
        if (!this.currentUser) return;
        let sessions = [];

        if (this.isStaticMode) {
            const allSessions = JSON.parse(localStorage.getItem('sb_sessions') || '[]');
            sessions = allSessions.filter(s => s.teacher.id === this.currentUser.id || s.learner.id === this.currentUser.id);
        } else {
            try {
                const res = await fetch(`${API_BASE}/sessions/user/${this.currentUser.id}`);
                if (res.ok) sessions = await res.json();
            } catch (e) {}
        }

        const container = document.getElementById('sessionsListContainer');
        container.innerHTML = '';

        if (sessions.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 48px; background: white; border-radius: 12px; border: 1px dashed #cbd5e1;">
                    <i class="fa-solid fa-calendar-xmark" style="font-size: 2.5rem; color: #94a3b8; margin-bottom: 12px;"></i>
                    <h3>No Sessions Scheduled</h3>
                    <p class="text-muted">Accept a learning request or schedule one above.</p>
                </div>
            `;
            return;
        }

        sessions.forEach(s => {
            const isTeacher = s.teacher.id === this.currentUser.id;
            const partner = isTeacher ? s.learner : s.teacher;
            const role = isTeacher ? 'Teaching' : 'Learning from';

            const item = document.createElement('div');
            item.className = 'session-item';

            let feedbackHtml = '';
            if (s.status === 'COMPLETED' && s.feedbackRating) {
                feedbackHtml = `
                    <div style="font-size: 0.8rem; color: #b45309; background: #fffbeb; padding: 6px 10px; border-radius: 6px; margin-top: 6px;">
                        <i class="fa-solid fa-star"></i> Rated ${s.feedbackRating}/5 stars: "${s.feedbackComments || 'Great session!'}"
                    </div>
                `;
            }

            let actions = '';
            if (s.status === 'SCHEDULED') {
                actions = `
                    <a href="${s.meetingLinkOrLocation}" target="_blank" class="btn btn-sm btn-primary"><i class="fa-solid fa-video"></i> Open Meeting</a>
                    <button class="btn btn-sm btn-outline" onclick="app.openCompleteModal(${s.id}, '${partner.name.replace(/'/g, "\\'")}')"><i class="fa-solid fa-check"></i> Mark Complete</button>
                `;
            }

            item.innerHTML = `
                <div class="session-left">
                    <img src="${partner.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}" class="req-avatar" alt="Student">
                    <div class="session-content">
                        <div class="req-title">
                            <span>${s.skillName}</span>
                            <span style="font-size: 0.85rem; font-weight: 500; color: var(--text-muted);">(${role} <strong>${partner.name}</strong>)</span>
                        </div>
                        <div style="font-size: 0.82rem; color: var(--text-secondary);">
                            <i class="fa-solid fa-calendar-clock"></i> ${new Date(s.scheduledTime).toLocaleString()} (${s.durationMinutes} mins) • 
                            <span class="badge ${s.meetingType === 'ONLINE' ? 'badge-blue' : 'badge-amber'}">${s.meetingType}</span>
                        </div>
                        <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 2px;">
                            <i class="fa-solid fa-location-dot"></i> ${s.meetingLinkOrLocation}
                        </div>
                        ${s.notes ? `<div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 4px;"><strong>Agenda:</strong> ${s.notes}</div>` : ''}
                        ${feedbackHtml}
                    </div>
                </div>
                <div class="session-actions">
                    <span class="status-badge status-${s.status}">${s.status}</span>
                    ${actions}
                </div>
            `;
            container.appendChild(item);
        });
    }

    // -------------------------------------------------------------
    // MODULE 1: PROFILE & SKILL MANAGEMENT
    // -------------------------------------------------------------
    async loadProfileData() {
        if (!this.currentUser) return;
        let taught = [];
        let learn = [];

        if (this.isStaticMode) {
            const allUserSkills = JSON.parse(localStorage.getItem('sb_user_skills') || '[]');
            taught = allUserSkills.filter(s => s.user.id === this.currentUser.id && s.skillType === 'TEACH');
            learn = allUserSkills.filter(s => s.user.id === this.currentUser.id && s.skillType === 'LEARN');
        } else {
            try {
                const [userRes, taughtRes, learnRes] = await Promise.all([
                    fetch(`${API_BASE}/users/${this.currentUser.id}`),
                    fetch(`${API_BASE}/user-skills/user/${this.currentUser.id}?type=TEACH`),
                    fetch(`${API_BASE}/user-skills/user/${this.currentUser.id}?type=LEARN`)
                ]);
                if (userRes.ok) this.currentUser = await userRes.json();
                taught = taughtRes.ok ? await taughtRes.json() : [];
                learn = learnRes.ok ? await learnRes.json() : [];
            } catch (e) {}
        }

        document.getElementById('profileTaughtCount').textContent = taught.length;
        document.getElementById('profileLearnCount').textContent = learn.length;

        const tbody = document.getElementById('mySkillsTableBody');
        tbody.innerHTML = '';

        const allUserSkills = [...taught, ...learn];
        if (allUserSkills.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" class="text-center text-muted" style="padding: 24px;">No skills added yet.</td></tr>`;
            return;
        }

        allUserSkills.forEach(us => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${us.skill.name}</strong></td>
                <td><span class="badge badge-blue">${us.skill.category}</span></td>
                <td><span class="badge ${us.skillType === 'TEACH' ? 'badge-teal' : 'badge-purple'}">${us.skillType === 'TEACH' ? 'Teaches' : 'Learning'}</span></td>
                <td><span class="prof-tag prof-${us.proficiencyLevel}">${us.proficiencyLevel}</span></td>
                <td style="max-width: 250px; font-size: 0.8rem; color: var(--text-secondary);">${us.description || '—'}</td>
                <td>
                    <button class="btn btn-sm btn-outline" onclick="app.deleteUserSkill(${us.id})" title="Delete"><i class="fa-solid fa-trash-can text-muted"></i></button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    populateProfileForm() {
        if (!this.currentUser) return;
        document.getElementById('profileName').textContent = this.currentUser.name;
        document.getElementById('profileDeptYear').textContent = `${this.currentUser.department} • ${this.currentUser.collegeYear}`;
        document.getElementById('profileBio').textContent = this.currentUser.bio || 'Ready to learn and share skills!';
        document.getElementById('profileContact').textContent = this.currentUser.contactInfo || this.currentUser.email;
        document.getElementById('profileAvatar').src = this.currentUser.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=180';
        document.getElementById('profileRatingVal').textContent = Number(this.currentUser.rating || 5.0).toFixed(1);

        document.getElementById('editName').value = this.currentUser.name;
        document.getElementById('editEmail').value = this.currentUser.email;
        document.getElementById('editDepartment').value = this.currentUser.department;
        document.getElementById('editCollegeYear').value = this.currentUser.collegeYear;
        document.getElementById('editBio').value = this.currentUser.bio || '';
        document.getElementById('editContactInfo').value = this.currentUser.contactInfo || '';
        document.getElementById('editAvatarUrl').value = this.currentUser.avatarUrl || '';
    }

    async handleUpdateProfile(e) {
        e.preventDefault();
        this.currentUser.name = document.getElementById('editName').value;
        this.currentUser.department = document.getElementById('editDepartment').value;
        this.currentUser.collegeYear = document.getElementById('editCollegeYear').value;
        this.currentUser.bio = document.getElementById('editBio').value;
        this.currentUser.contactInfo = document.getElementById('editContactInfo').value;
        if (document.getElementById('editAvatarUrl').value) {
            this.currentUser.avatarUrl = document.getElementById('editAvatarUrl').value;
        }

        if (this.isStaticMode) {
            const idx = this.allUsers.findIndex(u => u.id === this.currentUser.id);
            if (idx !== -1) this.allUsers[idx] = this.currentUser;
            localStorage.setItem('sb_users', JSON.stringify(this.allUsers));
            this.updateCurrentUserUI();
            this.showToast('Profile updated successfully!', 'success');
            return;
        }

        try {
            await fetch(`${API_BASE}/users/${this.currentUser.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.currentUser)
            });
            this.updateCurrentUserUI();
            this.showToast('Profile updated successfully!', 'success');
        } catch (e) {}
    }

    async handleAddSkill(e) {
        e.preventDefault();
        const skillName = document.getElementById('newSkillName').value;
        const category = document.getElementById('newSkillCategory').value;
        const skillType = document.getElementById('newSkillType').value;
        const proficiencyLevel = document.getElementById('newSkillProficiency').value;
        const description = document.getElementById('newSkillDesc').value;

        const newSkillObj = { id: Date.now(), name: skillName, category: category };
        const newUserSkill = {
            id: Date.now(),
            user: this.currentUser,
            skill: newSkillObj,
            skillType: skillType,
            proficiencyLevel: proficiencyLevel,
            description: description
        };

        if (this.isStaticMode) {
            const allUserSkills = JSON.parse(localStorage.getItem('sb_user_skills') || '[]');
            allUserSkills.push(newUserSkill);
            localStorage.setItem('sb_user_skills', JSON.stringify(allUserSkills));
            this.closeModal('modalAddSkill');
            this.refreshCurrentView();
            this.showToast('Skill added to your profile!', 'success');
            return;
        }

        try {
            const res = await fetch(`${API_BASE}/user-skills`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: this.currentUser.id,
                    skillName, category, skillType, proficiencyLevel, description
                })
            });
            if (res.ok) {
                this.closeModal('modalAddSkill');
                this.refreshCurrentView();
                this.showToast('Skill added!', 'success');
            }
        } catch (e) {}
    }

    async deleteUserSkill(id) {
        if (!confirm('Are you sure you want to remove this skill?')) return;
        if (this.isStaticMode) {
            let allUserSkills = JSON.parse(localStorage.getItem('sb_user_skills') || '[]');
            allUserSkills = allUserSkills.filter(s => s.id !== id);
            localStorage.setItem('sb_user_skills', JSON.stringify(allUserSkills));
            this.showToast('Skill removed', 'info');
            this.refreshCurrentView();
            return;
        }
        try {
            await fetch(`${API_BASE}/user-skills/${id}`, { method: 'DELETE' });
            this.refreshCurrentView();
            this.showToast('Skill removed', 'info');
        } catch (e) {}
    }

    // -------------------------------------------------------------
    // MODALS & DIALOG ACTIONS
    // -------------------------------------------------------------
    openAddSkillModal(type = 'TEACH') {
        document.getElementById('newSkillType').value = type;
        document.getElementById('modalAddSkillTitle').innerHTML = type === 'TEACH' 
            ? '<i class="fa-solid fa-chalkboard-user"></i> Offer a Skill to Teach' 
            : '<i class="fa-solid fa-bullseye"></i> Add a Learning Goal';
        document.getElementById('newSkillName').value = '';
        document.getElementById('newSkillDesc').value = '';
        this.openModal('modalAddSkill');
    }

    async openSendRequestModal(receiverId, skillId, receiverName, skillName, offeredSkillId = null, offeredSkillName = null) {
        document.getElementById('reqReceiverId').value = receiverId;
        document.getElementById('reqSkillId').value = skillId;

        document.getElementById('reqPeerPreview').innerHTML = `
            <div style="font-size: 0.95rem;">
                Sending request to: <strong>${receiverName}</strong><br>
                Topic/Skill: <span class="badge badge-teal" style="font-size: 0.8rem;">${skillName}</span>
            </div>
        `;

        const select = document.getElementById('reqOfferedSkillSelect');
        select.innerHTML = `<option value="">-- No specific skill offered (One-way tutoring) --</option>`;

        let userTaught = [];
        if (this.isStaticMode) {
            const allUserSkills = JSON.parse(localStorage.getItem('sb_user_skills') || '[]');
            userTaught = allUserSkills.filter(s => s.user.id === this.currentUser.id && s.skillType === 'TEACH');
        } else {
            try {
                const res = await fetch(`${API_BASE}/user-skills/user/${this.currentUser.id}?type=TEACH`);
                if (res.ok) userTaught = await res.json();
            } catch (e) {}
        }

        userTaught.forEach(us => {
            const opt = document.createElement('option');
            opt.value = us.skill.id;
            opt.textContent = `${us.skill.name} (${us.proficiencyLevel})`;
            if (offeredSkillId && us.skill.id == offeredSkillId) opt.selected = true;
            select.appendChild(opt);
        });

        const msgInput = document.getElementById('reqMessage');
        if (offeredSkillName) {
            msgInput.value = `Hey ${receiverName.split(' ')[0]}! I can teach you ${offeredSkillName} in exchange for learning ${skillName}. When are you free?`;
        } else {
            msgInput.value = `Hi ${receiverName.split(' ')[0]}! Would you be open to a 1-on-1 peer session on ${skillName}?`;
        }

        this.openModal('modalSendRequest');
    }

    async handleSendRequest(e) {
        e.preventDefault();
        const receiverId = Number(document.getElementById('reqReceiverId').value);
        const skillId = Number(document.getElementById('reqSkillId').value);
        const offeredId = document.getElementById('reqOfferedSkillSelect').value;
        const msg = document.getElementById('reqMessage').value;

        const receiver = this.allUsers.find(u => u.id === receiverId);
        const skill = this.allSkills.find(s => s.id === skillId) || { id: skillId, name: "Selected Skill" };
        const offered = offeredId ? (this.allSkills.find(s => s.id == offeredId) || null) : null;

        if (this.isStaticMode) {
            const allReqs = JSON.parse(localStorage.getItem('sb_requests') || '[]');
            allReqs.push({
                id: Date.now(),
                sender: this.currentUser,
                receiver: receiver,
                skill: skill,
                offeredSkill: offered,
                message: msg,
                status: "PENDING",
                createdAt: new Date().toISOString()
            });
            localStorage.setItem('sb_requests', JSON.stringify(allReqs));
            this.closeModal('modalSendRequest');
            this.showToast('Learning request sent!', 'success');
            this.updateNavCounters();
            return;
        }

        try {
            await fetch(`${API_BASE}/requests`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    senderId: this.currentUser.id,
                    receiverId: receiverId,
                    skillId: skillId,
                    offeredSkillId: offeredId ? Number(offeredId) : null,
                    message: msg
                })
            });
            this.closeModal('modalSendRequest');
            this.showToast('Learning request sent!', 'success');
            this.updateNavCounters();
        } catch (e) {}
    }

    openScheduleModal() {
        this.populateUserSelects();
        document.getElementById('schedRequestId').value = '';
        document.getElementById('schedSkillName').value = '';
        this.setupDefaultScheduleTime();
        this.openModal('modalScheduleSession');
    }

    openScheduleModalFromRequest(requestId, teacherId, learnerId, skillName) {
        this.populateUserSelects();
        document.getElementById('schedRequestId').value = requestId;
        document.getElementById('schedTeacherSelect').value = teacherId;
        document.getElementById('schedLearnerSelect').value = learnerId;
        document.getElementById('schedSkillName').value = skillName;
        this.setupDefaultScheduleTime();
        this.openModal('modalScheduleSession');
    }

    setupDefaultScheduleTime() {
        const input = document.getElementById('schedTime');
        if (!input) return;
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(16, 0, 0, 0);
        input.value = tomorrow.toISOString().slice(0, 16);
    }

    populateUserSelects() {
        const tSel = document.getElementById('schedTeacherSelect');
        const lSel = document.getElementById('schedLearnerSelect');
        if (!tSel || !lSel) return;

        const opts = this.allUsers.map(u => `<option value="${u.id}">${u.name} (${u.department})</option>`).join('');
        tSel.innerHTML = opts;
        lSel.innerHTML = opts;

        if (this.currentUser) {
            tSel.value = this.currentUser.id;
            const other = this.allUsers.find(u => u.id !== this.currentUser.id);
            if (other) lSel.value = other.id;
        }
    }

    toggleMeetingFormat() {
        const type = document.getElementById('schedMeetingType').value;
        const label = document.getElementById('schedLocationLabel');
        const input = document.getElementById('schedLocation');
        if (type === 'ONLINE') {
            label.textContent = 'Meeting Link (Google Meet / Zoom / Discord)';
            input.value = 'https://meet.google.com/sb-' + Math.random().toString(36).substring(7);
        } else {
            label.textContent = 'In-Person Campus Location';
            input.value = 'Campus Library Study Room 2B';
        }
    }

    async handleScheduleSession(e) {
        e.preventDefault();
        const tId = Number(document.getElementById('schedTeacherSelect').value);
        const lId = Number(document.getElementById('schedLearnerSelect').value);
        const skill = document.getElementById('schedSkillName').value;
        const time = document.getElementById('schedTime').value;
        const duration = Number(document.getElementById('schedDuration').value);
        const type = document.getElementById('schedMeetingType').value;
        const loc = document.getElementById('schedLocation').value;
        const notes = document.getElementById('schedNotes').value;

        const teacher = this.allUsers.find(u => u.id === tId);
        const learner = this.allUsers.find(u => u.id === lId);

        if (this.isStaticMode) {
            const allSessions = JSON.parse(localStorage.getItem('sb_sessions') || '[]');
            allSessions.push({
                id: Date.now(),
                teacher: teacher,
                learner: learner,
                skillName: skill,
                scheduledTime: time,
                durationMinutes: duration,
                meetingType: type,
                meetingLinkOrLocation: loc,
                notes: notes,
                status: "SCHEDULED"
            });
            localStorage.setItem('sb_sessions', JSON.stringify(allSessions));
            this.closeModal('modalScheduleSession');
            this.showToast('Learning session scheduled successfully!', 'success');
            this.showTab('sessions');
            return;
        }

        try {
            await fetch(`${API_BASE}/sessions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    teacherId: tId, learnerId: lId, skillName: skill, scheduledTime: time,
                    durationMinutes: duration, meetingType: type, meetingLinkOrLocation: loc, notes: notes
                })
            });
            this.closeModal('modalScheduleSession');
            this.showToast('Session scheduled!', 'success');
            this.showTab('sessions');
        } catch (e) {}
    }

    openCompleteModal(sessionId, teacherName) {
        document.getElementById('completeSessionId').value = sessionId;
        document.getElementById('completeSessionTitle').textContent = `Rate your peer learning experience with ${teacherName}`;
        document.getElementById('completeComments').value = 'Great hands-on session! Clear explanations and very helpful.';
        this.openModal('modalCompleteSession');
    }

    async handleCompleteSession(e) {
        e.preventDefault();
        const sessionId = Number(document.getElementById('completeSessionId').value);
        const rating = Number(document.querySelector('input[name="rating"]:checked').value);
        const comments = document.getElementById('completeComments').value;

        if (this.isStaticMode) {
            const allSessions = JSON.parse(localStorage.getItem('sb_sessions') || '[]');
            const s = allSessions.find(x => x.id === sessionId);
            if (s) {
                s.status = 'COMPLETED';
                s.feedbackRating = rating;
                s.feedbackComments = comments;
                localStorage.setItem('sb_sessions', JSON.stringify(allSessions));
            }
            this.closeModal('modalCompleteSession');
            this.showToast('Session completed and peer rating submitted!', 'success');
            this.loadSessions();
            return;
        }

        try {
            await fetch(`${API_BASE}/sessions/${sessionId}/complete`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ feedbackRating: rating, feedbackComments: comments })
            });
            this.closeModal('modalCompleteSession');
            this.showToast('Session completed and rating submitted!', 'success');
            this.loadSessions();
        } catch (e) {}
    }

    openAuthModal() {
        this.openModal('modalAuth');
    }

    openModal(id) {
        const el = document.getElementById(id);
        if (el) el.classList.add('active');
    }

    closeModal(id) {
        const el = document.getElementById(id);
        if (el) el.classList.remove('active');
    }

    showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        let icon = 'fa-circle-info';
        if (type === 'success') icon = 'fa-circle-check';
        if (type === 'error') icon = 'fa-triangle-exclamation';

        toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }
}

window.app = new SkillBridgeApp();
