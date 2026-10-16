// =========================================================
// SkillBridge - Learning Sessions Management
// =========================================================

let currentUser = null;
let currentSessionFilter = 'ALL'; // 'ALL', 'SCHEDULED', 'COMPLETED'

document.addEventListener('DOMContentLoaded', async () => {
    currentUser = requireAuth();
    if (!currentUser) return;

    loadSessions();
});

function filterSessions(status) {
    currentSessionFilter = status;
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`tab-${status.toLowerCase()}`).classList.add('active');
    loadSessions();
}

async function loadSessions() {
    const container = document.getElementById('sessions-list');
    if (!container) return;

    try {
        container.innerHTML = `<p style="color:var(--text-muted);">Loading sessions...</p>`;
        const endpoint = currentSessionFilter === 'ALL'
            ? `/api/sessions/user/${currentUser.id}`
            : `/api/sessions/user/${currentUser.id}?status=${currentSessionFilter}`;

        const sessions = await apiFetch(endpoint);

        if (sessions.length === 0) {
            container.innerHTML = `
                <div class="card" style="text-align:center;padding:3rem 1rem;">
                    <div style="font-size:2rem;margin-bottom:0.5rem;">📅</div>
                    <p style="color:var(--text-secondary);">No sessions found for this filter.</p>
                    <a href="requests.html" class="btn btn-secondary btn-sm" style="margin-top:0.75rem;">View Accepted Requests</a>
                </div>
            `;
            return;
        }

        container.innerHTML = sessions.map(s => renderSessionCard(s)).join('');
    } catch (err) {
        container.innerHTML = `<p style="color:var(--danger);">${err.message}</p>`;
    }
}

function renderSessionCard(s) {
    const isTeacher = s.teacher.id === currentUser.id;
    const partner = isTeacher ? s.student : s.teacher;
    const roleLabel = isTeacher ? 'Teaching' : 'Learning from';
    const statusClass = `badge-status-${s.status.toLowerCase()}`;

    return `
        <div class="card" style="margin-bottom:1.25rem;">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:0.75rem;flex-wrap:wrap;gap:0.5rem;">
                <div>
                    <div style="font-size:0.8rem;font-weight:700;color:var(--primary);text-transform:uppercase;">
                        ${roleLabel} ${escapeHtml(partner.name)}
                    </div>
                    <h3 style="font-size:1.2rem;font-weight:700;">${escapeHtml(s.topic)}</h3>
                </div>
                <span class="badge ${statusClass}">${s.status}</span>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:0.75rem;background:#f8fafc;padding:0.85rem;border-radius:var(--radius-sm);margin-bottom:1rem;font-size:0.88rem;">
                <div>📅 <strong>Date:</strong> ${escapeHtml(s.sessionDate)}</div>
                <div>⏰ <strong>Time:</strong> ${escapeHtml(s.sessionTime)} (${s.durationMinutes} mins)</div>
                <div>👥 <strong>Partner:</strong> ${escapeHtml(partner.name)}</div>
            </div>

            ${s.meetingLink ? `
                <div style="margin-bottom:1rem;display:flex;align-items:center;gap:0.75rem;flex-wrap:wrap;">
                    <a href="${escapeHtml(s.meetingLink)}" target="_blank" class="btn btn-primary btn-sm">
                        🔗 Open Video Meeting
                    </a>
                    <span style="font-size:0.8rem;color:var(--text-muted);">${escapeHtml(s.meetingLink)}</span>
                </div>
            ` : ''}

            ${s.notes ? `
                <div style="font-size:0.88rem;color:var(--text-secondary);margin-bottom:1rem;background:#f1f5f9;padding:0.6rem 0.85rem;border-radius:6px;">
                    📝 <strong>Notes:</strong> ${escapeHtml(s.notes)}
                </div>
            ` : ''}

            <div style="border-top:1px solid var(--border);padding-top:0.75rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;">
                <span style="font-size:0.8rem;color:var(--text-muted);">
                    Contact: ${escapeHtml(partner.contactInfo || partner.email)}
                </span>
                <div style="display:flex;gap:0.5rem;">
                    ${s.status === 'SCHEDULED' ? `
                        <button class="btn btn-success btn-sm" onclick="markCompleted(${s.id})">
                            ✅ Mark as Completed
                        </button>
                        <button class="btn btn-secondary btn-sm" style="color:var(--danger);" onclick="cancelSession(${s.id})">
                            Cancel Session
                        </button>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

async function markCompleted(sessionId) {
    if (!confirm('Mark this learning session as completed?')) return;
    try {
        await apiFetch(`/api/sessions/${sessionId}/status?userId=${currentUser.id}&status=COMPLETED`, {
            method: 'PUT'
        });
        showToast('Session marked as completed! Knowledge shared!', 'success');
        loadSessions();
    } catch (err) {
        showToast(err.message, 'error');
    }
}

async function cancelSession(sessionId) {
    if (!confirm('Are you sure you want to cancel this session?')) return;
    try {
        await apiFetch(`/api/sessions/${sessionId}/status?userId=${currentUser.id}&status=CANCELLED`, {
            method: 'PUT'
        });
        showToast('Session cancelled', 'info');
        loadSessions();
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
