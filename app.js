function showDashboard() {
    document.getElementById('landing').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('taskForm').style.display = 'none';
    initChart();
    checkBreakPopup();
    updateEnvironmentalContext();
    updateShieldAuto();
}

function showTaskForm() {
    document.getElementById('landing').style.display = 'none';
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('taskForm').style.display = 'block';
}

document.getElementById('landing').style.display = 'block';
document.getElementById('dashboard').style.display = 'none';
document.getElementById('taskForm').style.display = 'none';

let loadChart;
function initChart() {
    const ctx = document.getElementById('loadChart')?.getContext('2d');
    if (!ctx) return;
    if (loadChart) loadChart.destroy();
    loadChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'cognitive load',
                data: [45, 58, 62, 48, 72, 68, 55],
                borderColor: '#888',
                backgroundColor: 'rgba(136,136,136,0.08)',
                tension: 0.3,
                fill: true,
                pointBackgroundColor: '#888',
                pointRadius: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { ticks: { color: '#555', font: { family: 'IBM Plex Mono' } }, grid: { color: '#1a1a1a' } },
                y: { ticks: { color: '#555', font: { family: 'IBM Plex Mono' } }, grid: { color: '#1a1a1a' }, min: 0, max: 100 }
            }
        }
    });
}

function checkBreakPopup() {
    const load = parseInt(document.getElementById('loadScore')?.innerText) || 68;
    const popup = document.getElementById('breakPopup');
    popup.style.display = load > 75 ? 'block' : 'none';
}

let shieldActive = false;
function toggleShield() {
    shieldActive = !shieldActive;
    const toggle = document.getElementById('shieldToggle');
    const status = document.getElementById('shieldStatusText');
    const desc = document.getElementById('shieldDesc');
    const items = document.querySelectorAll('.blocked-item');

    toggle.classList.toggle('active', shieldActive);
    status.textContent = shieldActive ? 'Shield Active — Blocking Distractions' : 'Shield Inactive';
    status.style.color = shieldActive ? 'var(--danger)' : 'var(--text)';
    desc.textContent = shieldActive
        ? 'All listed sites are currently blocked. Focus mode engaged.'
        : 'Your load is below threshold — shield is standby.';
    items.forEach(i => i.classList.toggle('active-block', shieldActive));
}

function updateShieldAuto() {
    const load = parseInt(document.getElementById('loadScore')?.innerText) || 68;
    if (load >= 75 && !shieldActive) toggleShield();
}

function updateEnvironmentalContext() {
    const hour = new Date().getHours();
    const el = document.getElementById('envTime');
    if (hour < 6) el.textContent = 'Night';
    else if (hour < 12) el.textContent = 'Morning';
    else if (hour < 17) el.textContent = 'Afternoon';
    else if (hour < 21) el.textContent = 'Evening';
    else el.textContent = 'Night';
}

let rxInterval;
function startRecoveryTimer(cardId, seconds) {
    clearInterval(rxInterval);
    let remaining = seconds;
    const el = document.querySelector(`#${cardId} .recovery-timer`);
    rxInterval = setInterval(() => {
        remaining--;
        const m = Math.floor(remaining / 60);
        const s = remaining % 60;
        el.textContent = `${m}:${String(s).padStart(2, '0')}`;
        if (remaining <= 0) {
            clearInterval(rxInterval);
            el.textContent = 'Done ✓';
            el.style.color = 'var(--success)';
        }
    }, 1000);
}

document.querySelectorAll('.recovery-card').forEach(card => {
    card.addEventListener('click', function () {
        document.querySelectorAll('.recovery-card').forEach(c => c.classList.remove('active-rx'));
        this.classList.add('active-rx');
        const timeText = this.querySelector('.recovery-timer')?.textContent || '5:00';
        const parts = timeText.split(':');
        const secs = parseInt(parts[0]) * 60 + parseInt(parts[1] || 0);
        if (secs > 0 && this.id) startRecoveryTimer(this.id, secs);
    });
});

function addStudySession() {
    const subject = document.getElementById('subjectName')?.value || 'Unknown';
    const duration = parseInt(document.getElementById('duration')?.value) || 60;
    const difficulty = parseInt(document.getElementById('difficulty')?.value) || 3;
    const taskType = document.getElementById('taskType')?.value || 'Creative';
    const newLoad = Math.min(95, 68 + difficulty * 4 + Math.floor(duration / 30) * 3);

    document.getElementById('loadScore').innerHTML = `${newLoad}<span class="summary-unit">/100</span>`;
    document.getElementById('loadFill').style.width = `${newLoad}%`;
    document.getElementById('studyTime').innerHTML = '5.1<span class="summary-unit">hrs</span>';
    document.getElementById('switchCount').innerText = '22';
    document.getElementById('fatigueLevel').innerText = newLoad > 75 ? 'High' : 'Medium';
    document.getElementById('routingLoad').textContent = `${newLoad}%`;

    if (loadChart) {
        loadChart.data.datasets[0].data = [48, 62, 71, 55, 78, newLoad, 72];
        loadChart.update();
    }

    document.getElementById('insightsPanel').innerHTML = `
        <div class="insight-item"><div class="insight-icon">add</div><div class="insight-text">Added <strong>${subject}</strong> — ${duration}min — difficulty ${difficulty}</div></div>
        <div class="insight-item"><div class="insight-icon">!</div><div class="insight-text">Load now <strong>${newLoad}%</strong> — ${newLoad > 75 ? 'take a break' : 'within safe range'}</div></div>
        <div class="insight-item"><div class="insight-icon">dd</div><div class="insight-text">Decision density: <strong>51</strong> today</div></div>
    `;

    const newHRV = Math.max(20, 42 - difficulty * 3);
    document.getElementById('hrvValue').innerHTML = `${newHRV}<span class="unit"> ms</span>`;
    document.getElementById('hrvFill').style.width = `${newHRV}%`;
    document.getElementById('stressIndex').innerHTML = `${Math.min(95, 67 + difficulty * 5)}<span class="unit"> /100</span>`;

    const hrvStatus = document.getElementById('hrvStatus');
    if (newHRV < 30) { hrvStatus.textContent = '▸ Critical — high physiological stress'; hrvStatus.className = 'bio-status bad'; }
    else if (newHRV < 45) { hrvStatus.textContent = '▸ Below optimal (50+ ms recommended)'; hrvStatus.className = 'bio-status warn'; }
    else { hrvStatus.textContent = '▸ Healthy range'; hrvStatus.className = 'bio-status good'; }

    const taskItems = document.querySelectorAll('.task-item');
    taskItems.forEach(item => {
        const type = item.querySelector('.task-type');
        const match = item.querySelector('.energy-match');
        if (!type || !match) return;
        if (newLoad > 70 && (type.classList.contains('analytical') || type.classList.contains('creative'))) {
            item.classList.add('disabled');
            match.className = 'energy-match blocked';
            match.textContent = 'blocked';
        } else {
            item.classList.remove('disabled');
            match.className = 'energy-match recommended';
            match.textContent = '✓ recommended';
        }
    });

    const switchHistory = document.getElementById('switchHistory');
    const prevSubject = switchHistory.querySelector('.switch-event:last-child span:nth-child(3)')?.textContent || 'Math';
    const cost = Math.floor(Math.random() * 15) + 5;
    switchHistory.innerHTML += `<div class="switch-event"><span>${prevSubject}</span><span class="switch-arrow">→</span><span>${subject}</span><span class="switch-cost">+${cost}%</span></div>`;
    const totalCost = parseInt(document.getElementById('totalSwitchCost').textContent) + cost;
    document.getElementById('totalSwitchCost').textContent = `+${totalCost}%`;

    document.getElementById('burnoutAdvice').textContent =
        `Adding ${subject} raised predicted load to ${newLoad}%. ${newLoad > 75 ? 'Strongly recommend a 15-min break before next session.' : 'You still have headroom — continue with lighter tasks.'}`;

    if (newLoad >= 75 && !shieldActive) toggleShield();

    document.getElementById('breakPopup').style.display = newLoad > 75 ? 'block' : 'none';

    showDashboard();
}
