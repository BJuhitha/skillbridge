// =========================================================
// SkillBridge - Student Dashboard Controller
// =========================================================

let currentUser = null;

document.addEventListener('DOMContentLoaded', async () => {
    currentUser = requireAuth();
    if (!currentUser) return;

    // Set welcome greeting
    const greetingEl = document.getElementById('dashboard-greeting');
    if (greetingEl) {
        greetingEl.innerText = `Welcome, ${currentUser.name}! 👋`;
    }

    await loadDashboardData();
});

async function loadDashboardData() {
    try {
        // Fetch all data in parallel
        const [skills, receivedRequests, sentRequests, sessions, matches] = await Promise.all([
            apiFetch(`/api/skills/user/${currentUser.id}`),
            apiFetch(`/api/requests/received/${currentUser.id}`),
            apiFetch(`/api/requests/sent/${currentUser.id}`),
            apiFetch(`/api/sessions/user/${currentUser.id}`),
            apiFetch(`/api/matches/${currentUser.id}`)
        ]);

        // 1. Calculate Stats
        const teachSkillsCount = skills.filter(s => s.skillType === 'TEACH').length;
        const learnSkillsCount = skills.filter(s => s.skillType === 'LEARN').length;
        const pendingRequestsCount = receivedRequests.filter(r => r.status === 'PENDING').length;
        const scheduledSessionsCount = sessions.filter(s => s.status === 'SCHEDULED').length;

        // Populate stat cards
        document.getElementById('stat-teach-count').innerText = teachSkillsCount;
        document.getElementById('stat-learn-count').innerText = learnSkillsCount;
        document.getElementById('stat-requests-count').innerText = pendingRequestsCount;
        document.getElementById('stat-sessions-count').innerText = scheduledSessionsCount;
        document.getElementById('stat-matches-count').innerText = matches.length;

        // 2. Upcoming Sessions Section
        const upcomingSessions = sessions.filter(s => s.status === 'SCHEDULED').slice(0, 3);
        const sessionsContainer = document.getElementById('dashboard-upcoming-sessions');

        if (sessionsContainer) {
            if (upcomingSessions.length === 0) {
                sessionsContainer.innerHTML = `
                    <p style="color:var(--text-muted);font-size:0.9rem;">
                        No upcoming sessions scheduled. Once you accept a request, schedule your first exchange!
                    </p>
                `;
            } else {
                sessionsContainer.innerHTML = upcomingSessions.map(s => {
                    const isTeacher = s.teacher.id === currentUser.id;
                    const partner = isTeacher ? s.student : s.teacher;
                    return `
                        <div style="background:#f8fafc;border-left:4px solid var(--primary);padding:0.75rem 1rem;border-radius:4px;margin-bottom:0.75rem;display:flex;justify-content:space-between;align-items:center;">
                            <div>
                                <strong style="font-size:0.95rem;">${escapeHtml(s.topic)}</strong>
                                <div style="font-size:0.8rem;color:var(--text-secondary);">
                                    With ${escapeHtml(partner.name)} &bull; 📅 ${escapeHtml(s.sessionDate)} at ${escapeHtml(s.sessionTime)}
                                </div>
                            </div>
                            <a href="sessions.html" class="btn btn-secondary btn-sm">View</a>
                        </div>
                    `;
                }).join('');
            }
        }

        // 3. Recommended Mutual Matches Section
        const matchesContainer = document.getElementById('dashboard-matches-preview');
        if (matchesContainer) {
            if (matches.length === 0) {
                matchesContainer.innerHTML = `
                    <p style="color:var(--text-muted);font-size:0.9rem;">
                        No direct matches found yet. Try adding more skills to your profile!
                    </p>
                `;
            } else {
                const topMatches = matches.slice(0, 3);
                matchesContainer.innerHTML = topMatches.map(m => `
                    <div style="background:#ffffff;border:1px solid var(--border);padding:0.85rem;border-radius:var(--radius-sm);margin-bottom:0.75rem;display:flex;justify-content:space-between;align-items:center;">
                        <div>
                            <div style="display:flex;align-items:center;gap:0.5rem;">
                                <strong>${escapeHtml(m.peer.name)}</strong>
                                ${m.mutualExchange ? '<span class="badge badge-mutual">Mutual</span>' : ''}
                            </div>
                            <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:2px;">
                                Teaches: ${escapeHtml(m.peerCanTeachYou.join(', ') || 'N/A')}
                            </div>
                        </div>
                        <a href="explore.html" class="btn btn-primary btn-sm">Connect</a>
                    </div>
                `).join('');
            }
        }

    } catch (err) {
        console.error('Error loading dashboard data:', err);
    }
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
}
