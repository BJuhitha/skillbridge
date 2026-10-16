// =========================================================
// SkillBridge - Core API and Session Utility
// =========================================================

const API_BASE_URL = window.location.origin.includes(':8080') 
    ? window.location.origin 
    : 'http://localhost:8080';

// Current session helpers
function getCurrentUser() {
    const data = localStorage.getItem('skillbridge_user');
    try {
        return data ? JSON.parse(data) : null;
    } catch (e) {
        return null;
    }
}

function setCurrentUser(user) {
    localStorage.setItem('skillbridge_user', JSON.stringify(user));
}

function logout() {
    localStorage.removeItem('skillbridge_user');
    window.location.href = 'login.html';
}

function requireAuth() {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = 'login.html';
        return null;
    }
    return user;
}

// Unified API caller
async function apiFetch(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const defaultHeaders = {
        'Content-Type': 'application/json'
    };

    const config = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers
        }
    };

    try {
        const response = await fetch(url, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || data.message || `Request failed (${response.status})`);
        }

        return data;
    } catch (err) {
        console.error(`API Error on ${endpoint}:`, err);
        throw err;
    }
}

// Toast notification banner
function showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span>${message}</span>
        <button style="background:none;border:none;margin-left:12px;cursor:pointer;color:#94a3b8;font-size:16px;">&times;</button>
    `;

    toast.querySelector('button').onclick = () => toast.remove();
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// Render dynamic navbar user section
function setupNavbar() {
    const userContainer = document.getElementById('nav-user-area');
    if (!userContainer) return;

    const user = getCurrentUser();
    if (user) {
        userContainer.innerHTML = `
            <div class="user-badge">
                <span>👤</span>
                <span>${user.name}</span>
            </div>
            <button class="btn btn-secondary btn-sm" onclick="logout()">Logout</button>
        `;
    } else {
        userContainer.innerHTML = `
            <a href="login.html" class="btn btn-secondary btn-sm">Login</a>
            <a href="register.html" class="btn btn-primary btn-sm">Sign Up</a>
        `;
    }
}

// Automatically bind when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setupNavbar();
});
