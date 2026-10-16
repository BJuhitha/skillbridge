// =========================================================
// SkillBridge - Profile and Skill Management Logic
// =========================================================

let currentUser = null;

document.addEventListener('DOMContentLoaded', async () => {
    currentUser = requireAuth();
    if (!currentUser) return;

    loadProfileDetails();
    await loadUserSkills();

    // Skill Form listener
    const addSkillForm = document.getElementById('add-skill-form');
    if (addSkillForm) {
        addSkillForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const skillName = document.getElementById('skillName').value.trim();
            const skillType = document.getElementById('skillType').value;
            const category = document.getElementById('skillCategory').value;
            const proficiencyLevel = document.getElementById('proficiencyLevel').value;
            const description = document.getElementById('skillDescription').value.trim();

            if (!skillName) {
                showToast('Skill name is required', 'warning');
                return;
            }

            try {
                await apiFetch('/api/skills', {
                    method: 'POST',
                    body: JSON.stringify({
                        userId: currentUser.id,
                        skillName,
                        skillType,
                        category,
                        proficiencyLevel,
                        description
                    })
                });

                showToast(`Skill added successfully!`, 'success');
                addSkillForm.reset();
                await loadUserSkills();
            } catch (err) {
                showToast(err.message, 'error');
            }
        });
    }

    // Profile Edit Form listener
    const editProfileForm = document.getElementById('edit-profile-form');
    if (editProfileForm) {
        editProfileForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const updated = {
                name: document.getElementById('profName').value.trim(),
                college: document.getElementById('profCollege').value.trim(),
                department: document.getElementById('profDepartment').value.trim(),
                yearOfStudy: document.getElementById('profYear').value,
                bio: document.getElementById('profBio').value.trim(),
                contactInfo: document.getElementById('profContact').value.trim()
            };

            try {
                const res = await apiFetch(`/api/users/${currentUser.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(updated)
                });
                currentUser = res;
                setCurrentUser(res);
                showToast('Profile updated successfully!', 'success');
                loadProfileDetails();
                setupNavbar();
            } catch (err) {
                showToast(err.message, 'error');
            }
        });
    }
});

function loadProfileDetails() {
    const nameEl = document.getElementById('display-name');
    const emailEl = document.getElementById('display-email');
    const collegeEl = document.getElementById('display-college');
    const deptEl = document.getElementById('display-department');
    const yearEl = document.getElementById('display-year');
    const bioEl = document.getElementById('display-bio');
    const contactEl = document.getElementById('display-contact');

    if (nameEl) nameEl.textContent = currentUser.name;
    if (emailEl) emailEl.textContent = currentUser.email;
    if (collegeEl) collegeEl.textContent = currentUser.college || 'Not specified';
    if (deptEl) deptEl.textContent = currentUser.department || 'Not specified';
    if (yearEl) yearEl.textContent = currentUser.yearOfStudy || 'Not specified';
    if (bioEl) bioEl.textContent = currentUser.bio || 'No bio provided yet.';
    if (contactEl) contactEl.textContent = currentUser.contactInfo || 'Not specified';

    // Populate edit fields if available
    const profName = document.getElementById('profName');
    if (profName) {
        profName.value = currentUser.name || '';
        document.getElementById('profCollege').value = currentUser.college || '';
        document.getElementById('profDepartment').value = currentUser.department || '';
        document.getElementById('profYear').value = currentUser.yearOfStudy || '1st Year';
        document.getElementById('profBio').value = currentUser.bio || '';
        document.getElementById('profContact').value = currentUser.contactInfo || '';
    }
}

async function loadUserSkills() {
    const teachListEl = document.getElementById('teach-skills-list');
    const learnListEl = document.getElementById('learn-skills-list');

    if (!teachListEl && !learnListEl) return;

    try {
        const skills = await apiFetch(`/api/skills/user/${currentUser.id}`);

        const teachSkills = skills.filter(s => s.skillType === 'TEACH');
        const learnSkills = skills.filter(s => s.skillType === 'LEARN');

        if (teachListEl) {
            if (teachSkills.length === 0) {
                teachListEl.innerHTML = `<p style="color:var(--text-muted);font-size:0.9rem;">No skills added yet. Add what you can teach to find peers!</p>`;
            } else {
                teachListEl.innerHTML = teachSkills.map(s => renderSkillItem(s, 'teach')).join('');
            }
        }

        if (learnListEl) {
            if (learnSkills.length === 0) {
                learnListEl.innerHTML = `<p style="color:var(--text-muted);font-size:0.9rem;">No learning goals added yet. Add skills you wish to learn!</p>`;
            } else {
                learnListEl.innerHTML = learnSkills.map(s => renderSkillItem(s, 'learn')).join('');
            }
        }
    } catch (err) {
        console.error('Failed to load user skills:', err);
    }
}

function renderSkillItem(skill, type) {
    const badgeClass = type === 'teach' ? 'badge-teach' : 'badge-learn';
    const tag = type === 'teach' ? 'Can Teach' : 'Wants to Learn';

    return `
        <div style="background:#ffffff;border:1px solid var(--border);border-radius:var(--radius-sm);padding:0.9rem;display:flex;justify-content:space-between;align-items:center;">
            <div>
                <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.25rem;">
                    <strong style="font-size:1.05rem;">${escapeHtml(skill.skillName)}</strong>
                    <span class="badge ${badgeClass}">${tag}</span>
                    <span style="font-size:0.75rem;background:#f1f5f9;color:#475569;padding:2px 8px;border-radius:4px;">${escapeHtml(skill.proficiencyLevel)}</span>
                </div>
                <div style="font-size:0.85rem;color:var(--text-secondary);">
                    <strong>Category:</strong> ${escapeHtml(skill.category)} 
                    ${skill.description ? ` &bull; <em>${escapeHtml(skill.description)}</em>` : ''}
                </div>
            </div>
            <button class="btn btn-secondary btn-sm" style="color:var(--danger);" onclick="deleteSkill(${skill.id})">
                Remove
            </button>
        </div>
    `;
}

async function deleteSkill(skillId) {
    if (!confirm('Are you sure you want to remove this skill?')) return;
    try {
        await apiFetch(`/api/skills/${skillId}?userId=${currentUser.id}`, {
            method: 'DELETE'
        });
        showToast('Skill removed successfully', 'info');
        await loadUserSkills();
    } catch (err) {
        showToast(err.message, 'error');
    }
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
}
