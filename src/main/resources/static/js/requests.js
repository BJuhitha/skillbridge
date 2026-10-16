// =========================================================
// SkillBridge - Learning Requests Management
// =========================================================

let currentUser = null;
let currentTab = 'received';

document.addEventListener('DOMContentLoaded', async () => {
    currentUser = requireAuth();
    if (!currentUser) return;

    loadRequests();

    // Schedule Session form submission listener
    const scheduleForm = document.getElementById('schedule-session-form');
    if (scheduleForm) {
        scheduleForm.addEventListener('submit', handleScheduleSessionSubmit);
    }
});

function switchRequestTab(tab) {
    currentTab = tab;
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`tab-${tab}`).classList.add('active');

    document.getElementById('received-section').style.display = tab === 'received' ? 'block' : 'none';
    document.getElementById('sent-section').style.display = tab === 'sent' ? 'block' : 'none';
    loadRequests();
}

async function loadRequests() {
    if (currentTab === 'received') {
        await loadReceivedRequests();
    } else {
        await loadSentRequests();
    }
}

async function loadReceivedRequests() {
    const container = document.getElementById('received-list');
    if (!container) return;

    try {
        container.innerHTML = `<p style="color:var(--text-muted);">Loading requests...</p>`;
        const requests = await apiFetch(`/api/requests/received/${currentUser.id}`);

        if (requests.length === 0) {
            container.innerHTML = `
                <div class="card" style="text-align:center;padding:2.5rem 1rem;">
                    <div style="font-size:2rem;margin-bottom:0.5rem;">📬</div>
                    <p style="color:var(--text-secondary);">No incoming requests right now.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = requests.map(req => renderRequestCard(req, true)).join('');
    } catch (err) {
        container.innerHTML = `<p style="color:var(--danger);">${err.message}</p>`;
    }
}

async function loadSentRequests() {
    const container = document.getElementById('sent-list');
    if (!container) return;

    try {
        container.innerHTML = `<p style="color:var(--text-muted);">Loading requests...</p>`;
        const requests = await apiFetch(`/api/requests/sent/${currentUser.id}`);

        if (requests.length === 0) {
            container.innerHTML = `
                <div class="card" style="text-align:center;padding:2.5rem 1rem;">
                    <div style="font-size:2rem;margin-bottom:0.5rem;">🚀</div>
                    <p style="color:var(--text-secondary);">You haven't sent any learning requests yet.</p>
                    <a href="explore.html" class="btn btn-primary btn-sm" style="margin-top:0.75rem;">Explore Skills</a>
                </div>
            `;
            return;
        }

        container.innerHTML = requests.map(req => renderRequestCard(req, false)).join('');
    } catch (err) {
        container.innerHTML = `<p style="color:var(--danger);">${err.message}</p>`;
    }
}

function renderRequestCard(req, isReceived) {
    const peer = isReceived ? req.sender : req.receiver;
    const statusClass = `badge-status-${req.status.toLowerCase()}`;

    return `
        <div class="card" style="margin-bottom:1rem;">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:0.75rem;flex-wrap:wrap;gap:0.5rem;">
                <div>
                    <h3 style="font-size:1.1rem;font-weight:700;">
                        ${isReceived ? 'From: ' : 'To: '} ${escapeHtml(peer.name)}
                    </h3>
                    <div style="font-size:0.82rem;color:var(--text-secondary);">
                        ${escapeHtml(peer.department || 'Student')} &bull; ${escapeHtml(peer.college || '')}
                    </div>
                </div>
                <span class="badge ${statusClass}">${req.status}</span>
            </div>

            <div style="background:#f8fafc;padding:0.75rem;border-radius:var(--radius-sm);margin-bottom:0.85rem;display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;">
                <div>
                    <div style="font-size:0.75rem;font-weight:700;color:var(--text-muted);">SKILL REQUESTED:</div>
                    <div style="font-weight:600;color:#065f46;">🎯 ${escapeHtml(req.skillToLearn)}</div>
                </div>
                <div>
                    <div style="font-size:0.75rem;font-weight:700;color:var(--text-muted);">OFFERED IN RETURN:</div>
                    <div style="font-weight:600;color:#1e40af;">🔄 ${escapeHtml(req.skillOffered || 'None')}</div>
                </div>
            </div>

            ${req.message ? `
                <p style="font-size:0.88rem;color:var(--text-secondary);margin-bottom:1rem;font-style:italic;">
                    "${escapeHtml(req.message)}"
                </p>
            ` : ''}

            <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--border);padding-top:0.75rem;">
                <span style="font-size:0.78rem;color:var(--text-muted);">
                    Contact: ${escapeHtml(peer.contactInfo || peer.email)}
                </span>
                <div style="display:flex;gap:0.5rem;">
                    ${isReceived && req.status === 'PENDING' ? `
                        <button class="btn btn-success btn-sm" onclick="respondRequest(${req.id}, 'ACCEPTED')">Accept</button>
                        <button class="btn btn-danger btn-sm" onclick="respondRequest(${req.id}, 'REJECTED')">Reject</button>
                    ` : ''}

                    ${req.status === 'ACCEPTED' ? `
                        <button class="btn btn-primary btn-sm" onclick="openScheduleModal(${req.id}, ${peer.id}, '${escapeHtml(peer.name)}', '${escapeHtml(req.skillToLearn)}')">
                            📅 Schedule Session
                        </button>
                    ` : ''}

                    {!isReceived && req.status === 'PENDING' ? `
                        <button class="btn btn-secondary btn-sm" style="color:var(--danger);" onclick="cancelRequest(${req.id})">Cancel</button>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

async function respondRequest(requestId, status) {
    try {
        await apiFetch(`/api/requests/${requestId}/status?userId=${currentUser.id}&status=${status}`, {
            method: 'PUT'
        });
        showToast(`Request ${status.toLowerCase()}!`, 'success');
        loadRequests();
    } catch (err) {
        showToast(err.message, 'error');
    }
}

async function cancelRequest(requestId) {
    if (!confirm('Cancel this learning request?')) return;
    try {
        await apiFetch(`/api/requests/${requestId}/status?userId=${currentUser.id}&status=CANCELLED`, {
            method: 'PUT'
        });
        showToast('Request cancelled', 'info');
        loadRequests();
    } catch (err) {
        showToast(err.message, 'error');
    }
}

// Session scheduling modal
function openScheduleModal(requestId, peerId, peerName, topic) {
    document.getElementById('modal-sched-request-id').value = requestId;
    document.getElementById('modal-sched-peer-id').value = peerId;
    document.getElementById('modal-sched-topic').value = `${topic} Peer Learning Session`;
    document.getElementById('modal-sched-partner-name').innerText = peerName;

    // Set default tomorrow date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('modal-sched-date').value = tomorrow.toISOString().split('T')[0];
    document.getElementById('modal-sched-time').value = '17:00';
    document.getElementById('modal-sched-link').value = 'https://meet.google.com/new';

    document.getElementById('schedule-modal').classList.add('active');
}

function closeScheduleModal() {
    document.getElementById('schedule-modal').classList.remove('active');
}

async function handleScheduleSessionSubmit(e) {
    e.preventDefault();
    const requestId = document.getElementById('modal-sched-request-id').value;
    const peerId = document.getElementById('modal-sched-peer-id').value;
    const topic = document.getElementById('modal-sched-topic').value.trim();
    const sessionDate = document.getElementById('modal-sched-date').value;
    const sessionTime = document.getElementById('modal-sched-time').value;
    const durationMinutes = Number(document.getElementById('modal-sched-duration').value);
    const meetingLink = document.getElementById('modal-sched-link').value.trim();
    const notes = document.getElementById('modal-sched-notes').value.trim();

    try {
        await apiFetch('/api/sessions', {
            method: 'POST',
            body: JSON.stringify({
                requestId: Number(requestId),
                teacherId: currentUser.id,
                studentId: Number(peerId),
                topic,
                sessionDate,
                sessionTime,
                durationMinutes,
                meetingLink,
                notes
            })
        });

        closeScheduleModal();
        showToast('Session scheduled successfully! See in Sessions tab.', 'success');
        setTimeout(() => {
            window.location.href = 'sessions.html';
        }, 1200);
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
