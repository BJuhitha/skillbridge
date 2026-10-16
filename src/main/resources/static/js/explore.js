// =========================================================
// SkillBridge - Skill Exploration & Mutual Match Finder
// =========================================================

let currentUser = null;
let currentTab = 'mutual'; // 'mutual' or 'all'
let myTeachSkills = [];

document.addEventListener('DOMContentLoaded', async () => {
    currentUser = requireAuth();
    if (!currentUser) return;

    // Load user's teach skills for exchange proposal dropdown
    try {
        const skills = await apiFetch(`/api/skills/user/${currentUser.id}?type=TEACH`);
        myTeachSkills = skills.map(s => s.skillName);
    } catch (e) {
        console.error('Error fetching my teach skills', e);
    }

    // Search bar listeners
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(() => {
            if (currentTab === 'all') {
                loadAllSkills(searchInput.value);
            }
        }, 300));
    }

    loadMatches();
});

function switchExploreTab(tab) {
    currentTab = tab;
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`tab-${tab}`).classList.add('active');

    const mutualSection = document.getElementById('mutual-matches-section');
    const allSection = document.getElementById('all-skills-section');
    const searchBar = document.getElementById('search-bar-container');

    if (tab === 'mutual') {
        mutualSection.style.display = 'block';
        allSection.style.display = 'none';
        searchBar.style.display = 'none';
        loadMatches();
    } else {
        mutualSection.style.display = 'none';
        allSection.style.display = 'block';
        searchBar.style.display = 'block';
        loadAllSkills();
    }
}

// 1. Mutual Matches Algorithm
async function loadMatches() {
    const container = document.getElementById('matches-grid');
    if (!container) return;

    try {
        container.innerHTML = `<p style="color:var(--text-muted);grid-column:1/-1;">Searching peer exchange matches...</p>`;
        const matches = await apiFetch(`/api/matches/${currentUser.id}`);

        if (matches.length === 0) {
            container.innerHTML = `
                <div class="card" style="grid-column:1/-1;text-align:center;padding:3rem 1rem;">
                    <div style="font-size:2.5rem;margin-bottom:0.75rem;">🤝</div>
                    <h3 style="font-size:1.2rem;margin-bottom:0.5rem;">No Direct Matches Found Yet</h3>
                    <p style="color:var(--text-secondary);max-width:500px;margin:0 auto 1.5rem;">
                        Add more skills to your profile (skills you want to learn & skills you can teach) or browse all skills directly!
                    </p>
                    <a href="profile.html" class="btn btn-primary btn-sm">Update My Skills</a>
                </div>
            `;
            return;
        }

        container.innerHTML = matches.map(m => renderMatchCard(m)).join('');
    } catch (err) {
        container.innerHTML = `<p style="color:var(--danger);grid-column:1/-1;">Failed to load matches: ${err.message}</p>`;
    }
}

function renderMatchCard(match) {
    const peer = match.peer;
    const isMutual = match.mutualExchange;

    return `
        <div class="match-card ${isMutual ? 'mutual' : ''}">
            ${isMutual ? `<div class="match-badge-banner">✨ Mutual Exchange!</div>` : ''}
            <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1rem;">
                <div class="user-avatar-circle">${escapeHtml(peer.name.charAt(0))}</div>
                <div>
                    <h3 style="font-size:1.15rem;font-weight:700;">${escapeHtml(peer.name)}</h3>
                    <div style="font-size:0.82rem;color:var(--text-secondary);">
                        ${escapeHtml(peer.department || 'Student')} &bull; ${escapeHtml(peer.college || '')}
                    </div>
                </div>
            </div>

            <p style="font-size:0.88rem;color:var(--text-secondary);margin-bottom:1rem;min-height:40px;">
                ${escapeHtml(peer.bio || 'Ready to learn and share skills.')}
            </p>

            <div style="margin-bottom:0.85rem;">
                <div style="font-size:0.8rem;font-weight:600;color:#065f46;margin-bottom:0.35rem;">THEY CAN TEACH YOU:</div>
                <div style="display:flex;flex-wrap:wrap;gap:0.4rem;">
                    ${match.peerCanTeachYou.map(s => `<span class="badge badge-teach">${escapeHtml(s)}</span>`).join('')}
                </div>
            </div>

            ${match.youCanTeachPeer.length > 0 ? `
                <div style="margin-bottom:1.25rem;">
                    <div style="font-size:0.8rem;font-weight:600;color:#1e40af;margin-bottom:0.35rem;">YOU CAN TEACH THEM:</div>
                    <div style="display:flex;flex-wrap:wrap;gap:0.4rem;">
                        ${match.youCanTeachPeer.map(s => `<span class="badge badge-learn">${escapeHtml(s)}</span>`).join('')}
                    </div>
                </div>
            ` : '<div style="margin-bottom:1.25rem;"></div>'}

            <button class="btn btn-primary" style="width:100%;" onclick="openRequestModal(${peer.id}, '${escapeHtml(peer.name)}', '${escapeHtml(match.peerCanTeachYou[0] || '')}', '${escapeHtml(match.youCanTeachPeer[0] || '')}')">
                Send Exchange Request
            </button>
        </div>
    `;
}

// 2. All Skills Directory
async function loadAllSkills(keyword = '') {
    const container = document.getElementById('skills-grid');
    if (!container) return;

    try {
        container.innerHTML = `<p style="color:var(--text-muted);grid-column:1/-1;">Loading skills...</p>`;
        const endpoint = keyword 
            ? `/api/skills/search?type=TEACH&keyword=${encodeURIComponent(keyword)}`
            : `/api/skills/offered`;

        const skills = await apiFetch(endpoint);

        // Filter out current user's own skills
        const peerSkills = skills.filter(s => s.user.id !== currentUser.id);

        if (peerSkills.length === 0) {
            container.innerHTML = `<p style="color:var(--text-muted);grid-column:1/-1;">No skills found matching your search.</p>`;
            return;
        }

        container.innerHTML = peerSkills.map(s => renderSkillDirectoryCard(s)).join('');
    } catch (err) {
        container.innerHTML = `<p style="color:var(--danger);grid-column:1/-1;">Error: ${err.message}</p>`;
    }
}

function renderSkillDirectoryCard(skill) {
    return `
        <div class="card">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:0.75rem;">
                <div>
                    <h3 style="font-size:1.15rem;font-weight:700;margin-bottom:0.2rem;">${escapeHtml(skill.skillName)}</h3>
                    <span style="font-size:0.78rem;background:#f1f5f9;color:#475569;padding:2px 8px;border-radius:4px;">${escapeHtml(skill.category)}</span>
                </div>
                <span class="badge badge-teach">${escapeHtml(skill.proficiencyLevel)}</span>
            </div>

            <p style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:1rem;min-height:36px;">
                ${escapeHtml(skill.description || 'Offers peer mentoring in this skill.')}
            </p>

            <div style="border-top:1px solid var(--border);padding-top:0.85rem;display:flex;justify-content:space-between;align-items:center;">
                <div style="font-size:0.85rem;font-weight:600;">
                    👤 ${escapeHtml(skill.user.name)}
                </div>
                <button class="btn btn-secondary btn-sm" onclick="openRequestModal(${skill.user.id}, '${escapeHtml(skill.user.name)}', '${escapeHtml(skill.skillName)}', '')">
                    Request
                </button>
            </div>
        </div>
    `;
}

// 3. Request Modal Handlers
function openRequestModal(receiverId, receiverName, skillToLearn, defaultExchangeSkill) {
    document.getElementById('modal-receiver-id').value = receiverId;
    document.getElementById('modal-receiver-name').innerText = receiverName;
    document.getElementById('modal-skill-to-learn').value = skillToLearn;

    const offeredSelect = document.getElementById('modal-skill-offered');
    if (offeredSelect) {
        offeredSelect.innerHTML = `<option value="">-- Select skill you can teach in return --</option>` +
            myTeachSkills.map(s => `<option value="${escapeHtml(s)}" ${s === defaultExchangeSkill ? 'selected' : ''}>${escapeHtml(s)}</option>`).join('');
    }

    document.getElementById('modal-message').value = `Hi ${receiverName}! I would love to learn ${skillToLearn} from you. I can help you with ${defaultExchangeSkill || 'my skills'} in exchange!`;

    document.getElementById('request-modal').classList.add('active');
}

function closeRequestModal() {
    document.getElementById('request-modal').classList.remove('active');
}

async function submitLearningRequest(e) {
    e.preventDefault();
    const receiverId = document.getElementById('modal-receiver-id').value;
    const skillToLearn = document.getElementById('modal-skill-to-learn').value.trim();
    const skillOffered = document.getElementById('modal-skill-offered').value.trim();
    const message = document.getElementById('modal-message').value.trim();

    try {
        await apiFetch('/api/requests', {
            method: 'POST',
            body: JSON.stringify({
                senderId: currentUser.id,
                receiverId: Number(receiverId),
                skillToLearn,
                skillOffered,
                message
            })
        });

        closeRequestModal();
        showToast('Learning exchange request sent successfully!', 'success');
    } catch (err) {
        showToast(err.message, 'error');
    }
}

function debounce(func, wait) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
}
