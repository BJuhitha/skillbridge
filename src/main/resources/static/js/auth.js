// =========================================================
// SkillBridge - Authentication Logic
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const submitBtn = loginForm.querySelector('button[type="submit"]');

            try {
                submitBtn.disabled = true;
                submitBtn.innerText = 'Signing in...';

                const res = await apiFetch('/api/auth/login', {
                    method: 'POST',
                    body: JSON.stringify({ email, password })
                });

                setCurrentUser(res.user);
                showToast(`Welcome back, ${res.user.name}!`, 'success');
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 800);
            } catch (err) {
                showToast(err.message, 'error');
                submitBtn.disabled = false;
                submitBtn.innerText = 'Sign In';
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const college = document.getElementById('college').value.trim();
            const department = document.getElementById('department').value.trim();
            const yearOfStudy = document.getElementById('yearOfStudy').value;
            const bio = document.getElementById('bio').value.trim();
            const contactInfo = document.getElementById('contactInfo').value.trim();
            const submitBtn = registerForm.querySelector('button[type="submit"]');

            try {
                submitBtn.disabled = true;
                submitBtn.innerText = 'Creating account...';

                const res = await apiFetch('/api/auth/register', {
                    method: 'POST',
                    body: JSON.stringify({
                        name, email, password, college, department, yearOfStudy, bio, contactInfo
                    })
                });

                setCurrentUser(res.user);
                showToast('Registration successful! Redirecting...', 'success');
                setTimeout(() => {
                    window.location.href = 'profile.html?firstLogin=true';
                }, 1000);
            } catch (err) {
                showToast(err.message, 'error');
                submitBtn.disabled = false;
                submitBtn.innerText = 'Create Account';
            }
        });
    }
});

// Quick demo login function for evaluators
function quickLogin(email, password) {
    const emailField = document.getElementById('email');
    const passField = document.getElementById('password');
    if (emailField && passField) {
        emailField.value = email;
        passField.value = password;
        const form = document.getElementById('login-form');
        if (form) form.dispatchEvent(new Event('submit'));
    }
}
