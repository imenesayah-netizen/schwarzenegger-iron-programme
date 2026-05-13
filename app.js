// ============================================================
// SCHWARZENEGGER IRON PROGRAMME — Main App Logic
// ============================================================

let currentDate = new Date();
currentDate.setHours(0,0,0,0);
let currentView = 'today';
let currentLog = {};
let autoSaveTimer = null;

// ============================================================
// INIT
// ============================================================
async function init() {
  await openDB();
  renderQuote();
  setInterval(renderQuote, 30000);
  renderNav();
  await showView('today');
  registerSW();
}

function registerSW() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }
}

// ============================================================
// QUOTE ROTATOR
// ============================================================
let quoteIndex = 0;
function renderQuote() {
  const q = QUOTES[quoteIndex % QUOTES.length];
  const el = document.getElementById('quote-text');
  const attr = document.getElementById('quote-attr');
  if (el) {
    el.style.opacity = 0;
    setTimeout(() => {
      el.textContent = `"${q.text}"`;
      if (attr) attr.textContent = `— ${q.attr}`;
      el.style.opacity = 1;
    }, 400);
  }
  quoteIndex++;
}

// ============================================================
// NAVIGATION
// ============================================================
function renderNav() {
  const navItems = [
    { id: 'today', icon: '🏋️', label: 'TODAY' },
    { id: 'calendar', icon: '📅', label: 'CALENDAR' },
    { id: 'progress', icon: '📊', label: 'PROGRESS' },
    { id: 'macros', icon: '🥩', label: 'MACROS' },
    { id: 'supplements', icon: '💊', label: 'SUPPS' }
  ];
  const nav = document.getElementById('bottom-nav');
  nav.innerHTML = navItems.map(item => `
    <button class="nav-btn ${currentView === item.id ? 'active' : ''}" onclick="showView('${item.id}')">
      <span class="nav-icon">${item.icon}</span>
      <span class="nav-label">${item.label}</span>
    </button>
  `).join('');
}

async function showView(view) {
  currentView = view;
  renderNav();
  const main = document.getElementById('main-content');
  main.style.opacity = 0;
  setTimeout(async () => {
    switch(view) {
      case 'today': await renderToday(); break;
      case 'calendar': await renderCalendar(); break;
      case 'progress': await renderProgress(); break;
      case 'macros': renderMacros(); break;
      case 'supplements': renderSupplements(); break;
    }
    main.style.opacity = 1;
  }, 150);
}

// ============================================================
// TODAY VIEW
// ============================================================
async function renderToday(date) {
  if (date) currentDate = date;
  const main = document.getElementById('main-content');
  const workout = getWorkoutForDate(currentDate);
  const log = await loadWorkoutLog(currentDate);
  currentLog = log ? { ...log } : { sets: {}, completed: false };

  const isRest = isRestDay(currentDate.getDay());
  const isActive = isProgrammeDay(currentDate);

  const dateStr = currentDate.toLocaleDateString('en-GB', { weekday:'long', day:'numeric', month:'long', year:'numeric' });
  const week = isActive ? getWeekNumber(currentDate) : null;

  if (!isActive) {
    main.innerHTML = `
      <div class="view-header">
        <h1 class="view-title">THE IRON PROGRAMME</h1>
        <p class="view-sub">Programme: Jun 1, 2026 – Mar 19, 2027</p>
      </div>
      <div class="quote-block">
        <p id="quote-text" class="quote-text"></p>
        <p id="quote-attr" class="quote-attr"></p>
      </div>
      <div class="rest-card">
        <div class="rest-icon">🏆</div>
        <h2>OUTSIDE PROGRAMME DATES</h2>
        <p>${dateStr}</p>
        <p style="margin-top:8px;color:var(--gold-muted)">Programme starts June 1st, 2026</p>
      </div>
      ${renderDateNav()}
    `;
    renderQuote();
    return;
  }

  if (isRest) {
    const phase = getPhaseForDate(currentDate);
    main.innerHTML = `
      <div class="view-header">
        <h1 class="view-title">THE IRON PROGRAMME</h1>
        <p class="view-sub">${phase.name} · Week ${week}</p>
      </div>
      <div class="quote-block">
        <p id="quote-text" class="quote-text"></p>
        <p id="quote-attr" class="quote-attr"></p>
      </div>
      <div class="date-display">${dateStr}</div>
      <div class="rest-card">
        <div class="rest-icon">⚡</div>
        <h2>REST DAY</h2>
        <p>Champions recover. Champions grow.</p>
        <div class="rest-tips">
          <div class="tip">💧 Hydrate 3–4L water</div>
          <div class="tip">🥩 Hit your protein: 200g</div>
          <div class="tip">😴 8 hours sleep — non-negotiable</div>
          <div class="tip">🧘 Light stretching or walk</div>
        </div>
      </div>
      ${renderDateNav()}
    `;
    renderQuote();
    return;
  }

  const phase = getPhaseForDate(currentDate);
  const isCompleted = currentLog.completed || false;

  main.innerHTML = `
    <div class="view-header">
      <div>
        <h1 class="view-title">THE IRON PROGRAMME</h1>
        <p class="view-sub">${phase.name} · Week ${week}</p>
      </div>
      ${isCompleted ? '<div class="completed-badge">✓ DONE</div>' : ''}
    </div>
    <div class="quote-block">
      <p id="quote-text" class="quote-text"></p>
      <p id="quote-attr" class="quote-attr"></p>
    </div>
    <div class="date-display">${dateStr}</div>
    <div class="workout-header-card">
      <div class="workout-day-name">${workout.name}</div>
      <div class="workout-muscles">${workout.muscles}</div>
    </div>
    <div class="exercises-list">
      ${workout.exercises.map((ex, i) => renderExercise(ex, i, currentLog)).join('')}
    </div>
    <div class="cardio-card">
      <div class="cardio-header">
        <span class="cardio-icon">🔥</span>
        <span class="cardio-title">CARDIO FINISHER</span>
      </div>
      <div class="cardio-type">${workout.cardio.type}</div>
      <div class="cardio-detail">${workout.cardio.duration} · ${workout.cardio.protocol}</div>
      <label class="cardio-check">
        <input type="checkbox" id="cardio-done" ${currentLog.cardioDone ? 'checked' : ''} onchange="toggleCardio(this.checked)">
        <span class="check-label">CARDIO COMPLETE</span>
      </label>
    </div>
    <div class="complete-section">
      <button class="complete-btn ${isCompleted ? 'completed' : ''}" onclick="toggleComplete()">
        ${isCompleted ? '✓ SESSION COMPLETE' : 'MARK SESSION COMPLETE'}
      </button>
      <p class="autosave-status" id="autosave-status">Auto-saved</p>
    </div>
    ${renderDateNav()}
  `;

  renderQuote();
}

function renderExercise(ex, index, log) {
  const exLog = log.sets && log.sets[index] ? log.sets[index] : {};
  const setsArray = Array.from({length: ex.sets}, (_, s) => s);

  return `
    <div class="exercise-card">
      <div class="ex-header">
        <div class="ex-num">${String(index+1).padStart(2,'0')}</div>
        <div class="ex-info">
          <div class="ex-name">${ex.name}</div>
          <div class="ex-prescription">${ex.sets} sets × ${ex.reps} reps · Rest ${ex.rest}</div>
          <div class="ex-notes">${ex.notes}</div>
        </div>
      </div>
      <div class="sets-container">
        <div class="sets-header-row">
          <span class="sets-col-label">SET</span>
          <span class="sets-col-label">KG</span>
          <span class="sets-col-label">REPS</span>
          <span class="sets-col-label">✓</span>
        </div>
        ${setsArray.map(s => {
          const setLog = exLog[s] || {};
          return `
            <div class="set-row" id="set-${index}-${s}">
              <span class="set-num">${s+1}</span>
              <input type="number" class="set-input" placeholder="kg"
                value="${setLog.kg || ''}"
                oninput="logSet(${index}, ${s}, 'kg', this.value)"
                step="0.5" min="0">
              <input type="number" class="set-input" placeholder="reps"
                value="${setLog.reps || ''}"
                oninput="logSet(${index}, ${s}, 'reps', this.value)"
                min="0" max="100">
              <button class="set-check ${setLog.done ? 'set-done' : ''}"
                onclick="toggleSet(${index}, ${s})">
                ${setLog.done ? '✓' : ''}
              </button>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function renderDateNav() {
  const prev = new Date(currentDate); prev.setDate(prev.getDate() - 1);
  const next = new Date(currentDate); next.setDate(next.getDate() + 1);
  return `
    <div class="date-nav">
      <button class="date-nav-btn" onclick="navigateDate(-1)">◀ PREV</button>
      <button class="date-nav-btn today-btn" onclick="goToToday()">TODAY</button>
      <button class="date-nav-btn" onclick="navigateDate(1)">NEXT ▶</button>
    </div>
  `;
}

function navigateDate(delta) {
  const d = new Date(currentDate);
  d.setDate(d.getDate() + delta);
  d.setHours(0,0,0,0);
  currentDate = d;
  renderToday();
}

function goToToday() {
  currentDate = new Date();
  currentDate.setHours(0,0,0,0);
  renderToday();
}

// ============================================================
// LOGGING
// ============================================================
function logSet(exIndex, setIndex, field, value) {
  if (!currentLog.sets) currentLog.sets = {};
  if (!currentLog.sets[exIndex]) currentLog.sets[exIndex] = {};
  if (!currentLog.sets[exIndex][setIndex]) currentLog.sets[exIndex][setIndex] = {};
  currentLog.sets[exIndex][setIndex][field] = value;
  scheduleAutoSave();
}

function toggleSet(exIndex, setIndex) {
  if (!currentLog.sets) currentLog.sets = {};
  if (!currentLog.sets[exIndex]) currentLog.sets[exIndex] = {};
  if (!currentLog.sets[exIndex][setIndex]) currentLog.sets[exIndex][setIndex] = {};
  const current = currentLog.sets[exIndex][setIndex].done || false;
  currentLog.sets[exIndex][setIndex].done = !current;
  const btn = document.querySelector(`#set-${exIndex}-${setIndex} .set-check`);
  if (btn) {
    btn.classList.toggle('set-done', !current);
    btn.textContent = !current ? '✓' : '';
  }
  scheduleAutoSave();
}

function toggleCardio(checked) {
  currentLog.cardioDone = checked;
  scheduleAutoSave();
}

async function toggleComplete() {
  currentLog.completed = !currentLog.completed;
  await saveWorkoutLog(currentDate, currentLog);
  renderToday(currentDate);
}

function scheduleAutoSave() {
  const status = document.getElementById('autosave-status');
  if (status) status.textContent = 'Saving...';
  if (autoSaveTimer) clearTimeout(autoSaveTimer);
  autoSaveTimer = setTimeout(async () => {
    await saveWorkoutLog(currentDate, currentLog);
    const s = document.getElementById('autosave-status');
    if (s) { s.textContent = 'Auto-saved ✓'; }
  }, 800);
}

// ============================================================
// CALENDAR VIEW
// ============================================================
async function renderCalendar() {
  const main = document.getElementById('main-content');
  const allLogs = await loadAllWorkoutLogs();
  const logMap = {};
  allLogs.forEach(l => { logMap[l.dateKey] = l; });

  const today = new Date(); today.setHours(0,0,0,0);
  const viewDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

  const monthName = viewDate.toLocaleDateString('en-GB', { month:'long', year:'numeric' }).toUpperCase();
  const firstDay = viewDate.getDay();
  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth()+1, 0).getDate();

  let cells = '';
  const startOffset = (firstDay === 0 ? 6 : firstDay - 1);
  for(let i = 0; i < startOffset; i++) cells += '<div class="cal-cell empty"></div>';

  for(let d = 1; d <= daysInMonth; d++) {
    const cellDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), d);
    cellDate.setHours(0,0,0,0);
    const key = dateKey(cellDate);
    const log = logMap[key];
    const isToday = cellDate.getTime() === today.getTime();
    const isCurrent = cellDate.getTime() === currentDate.getTime();
    const inProg = isProgrammeDay(cellDate);
    const rest = isRestDay(cellDate.getDay());
    const hasWorkout = inProg && !rest;
    const isDone = log && log.completed;
    const isPast = cellDate < today;

    let cellClass = 'cal-cell';
    if (isToday) cellClass += ' cal-today';
    if (isCurrent) cellClass += ' cal-selected';
    if (!inProg) cellClass += ' cal-inactive';
    else if (rest) cellClass += ' cal-rest';
    else if (isDone) cellClass += ' cal-done';
    else if (isPast && hasWorkout) cellClass += ' cal-missed';
    else if (hasWorkout) cellClass += ' cal-workout';

    cells += `
      <div class="${cellClass}" onclick="calSelectDate(${cellDate.getTime()})">
        <span class="cal-day-num">${d}</span>
        ${isDone ? '<span class="cal-dot done-dot">✓</span>' : ''}
        ${rest && inProg ? '<span class="cal-dot rest-dot">R</span>' : ''}
      </div>`;
  }

  main.innerHTML = `
    <div class="view-header">
      <h1 class="view-title">TRAINING CALENDAR</h1>
    </div>
    <div class="cal-nav">
      <button class="cal-nav-btn" onclick="calChangeMonth(-1)">◀</button>
      <span class="cal-month-name">${monthName}</span>
      <button class="cal-nav-btn" onclick="calChangeMonth(1)">▶</button>
    </div>
    <div class="cal-legend">
      <span class="leg leg-done">✓ Done</span>
      <span class="leg leg-workout">● Training</span>
      <span class="leg leg-rest">R Rest</span>
      <span class="leg leg-missed">○ Missed</span>
    </div>
    <div class="calendar-grid">
      <div class="cal-weekday">M</div><div class="cal-weekday">T</div>
      <div class="cal-weekday">W</div><div class="cal-weekday">T</div>
      <div class="cal-weekday">F</div><div class="cal-weekday">S</div>
      <div class="cal-weekday">S</div>
      ${cells}
    </div>
  `;
}

function calSelectDate(timestamp) {
  currentDate = new Date(timestamp);
  currentDate.setHours(0,0,0,0);
  showView('today');
}

function calChangeMonth(delta) {
  currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + delta, 1);
  renderCalendar();
}

// ============================================================
// PROGRESS VIEW
// ============================================================
async function renderProgress() {
  const main = document.getElementById('main-content');
  const weights = await loadAllBodyWeights();
  const allLogs = await loadAllWorkoutLogs();

  const totalDone = allLogs.filter(l => l.completed).length;
  const totalSessions = (() => {
    let count = 0;
    const d = new Date(PROGRAMME_START);
    const now = new Date(); now.setHours(0,0,0,0);
    while(d <= now && d <= PROGRAMME_END) {
      if(!isRestDay(d.getDay()) && isProgrammeDay(d)) count++;
      d.setDate(d.getDate()+1);
    }
    return count;
  })();

  const completionPct = totalSessions > 0 ? Math.round((totalDone / totalSessions) * 100) : 0;

  main.innerHTML = `
    <div class="view-header">
      <h1 class="view-title">PROGRESS</h1>
      <p class="view-sub">The Iron Never Lies</p>
    </div>
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value">${totalDone}</div>
        <div class="stat-label">SESSIONS DONE</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${totalSessions}</div>
        <div class="stat-label">TOTAL SO FAR</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${completionPct}%</div>
        <div class="stat-label">COMPLETION</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${weights.length > 0 ? weights[weights.length-1].kg : '—'}</div>
        <div class="stat-label">CURRENT KG</div>
      </div>
    </div>
    <div class="progress-bar-container">
      <div class="progress-bar-label">Programme Progress</div>
      <div class="progress-bar-track">
        <div class="progress-bar-fill" style="width: ${completionPct}%"></div>
      </div>
      <div class="progress-bar-pct">${completionPct}%</div>
    </div>
    <div class="weight-section">
      <h3 class="section-title">BODYWEIGHT TRACKER</h3>
      <div class="weight-input-row">
        <input type="number" id="new-weight" class="weight-input" placeholder="Enter weight (kg)" step="0.1" min="40" max="200">
        <button class="gold-btn" onclick="logWeight()">LOG</button>
      </div>
      ${weights.length > 0 ? renderWeightChart(weights) : '<p class="no-data">No weight entries yet. Start logging to see your progress.</p>'}
    </div>
  `;
}

function renderWeightChart(weights) {
  if (weights.length < 2) {
    return `<div class="weight-history">
      ${weights.map(w => `<div class="weight-entry"><span class="we-date">${w.date}</span><span class="we-val">${w.kg} kg</span></div>`).join('')}
    </div>`;
  }

  const recent = weights.slice(-20);
  const min = Math.min(...recent.map(w=>w.kg)) - 1;
  const max = Math.max(...recent.map(w=>w.kg)) + 1;
  const W = 100, H = 60;

  const points = recent.map((w, i) => {
    const x = (i / (recent.length-1)) * W;
    const y = H - ((w.kg - min) / (max - min)) * H;
    return `${x},${y}`;
  }).join(' ');

  const change = (recent[recent.length-1].kg - recent[0].kg).toFixed(1);
  const changeSign = change > 0 ? '+' : '';

  return `
    <div class="chart-container">
      <svg viewBox="0 0 100 60" class="weight-chart" preserveAspectRatio="none">
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#C9A84C" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="#C9A84C" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <polyline points="${points}" fill="none" stroke="#C9A84C" stroke-width="0.8"/>
        ${recent.map((w,i) => {
          const x = (i / (recent.length-1)) * W;
          const y = H - ((w.kg - min) / (max - min)) * H;
          return `<circle cx="${x}" cy="${y}" r="1" fill="#C9A84C"/>`;
        }).join('')}
      </svg>
      <div class="chart-labels">
        <span>${recent[0].date.slice(5)}</span>
        <span class="change-label ${change < 0 ? 'neg' : 'pos'}">${changeSign}${change} kg</span>
        <span>${recent[recent.length-1].date.slice(5)}</span>
      </div>
    </div>
    <div class="weight-history">
      ${weights.slice(-8).reverse().map(w => `
        <div class="weight-entry">
          <span class="we-date">${new Date(w.date).toLocaleDateString('en-GB',{day:'numeric',month:'short'})}</span>
          <span class="we-val">${w.kg} kg</span>
        </div>`).join('')}
    </div>
  `;
}

async function logWeight() {
  const input = document.getElementById('new-weight');
  const val = parseFloat(input.value);
  if (!val || val < 30 || val > 250) return;
  await saveBodyWeight(new Date(), val);
  input.value = '';
  renderProgress();
}

// ============================================================
// MACROS VIEW
// ============================================================
function renderMacros() {
  const main = document.getElementById('main-content');
  const dow = currentDate.getDay();
  const isRest = isRestDay(dow) || !isProgrammeDay(currentDate);
  const m = isRest ? MACROS.rest : MACROS.training;
  const type = isRest ? 'REST DAY' : 'TRAINING DAY';
  const todayDow = new Date().getDay();
  const todayIsRest = isRestDay(todayDow);
  const todayM = todayIsRest ? MACROS.rest : MACROS.training;

  main.innerHTML = `
    <div class="view-header">
      <h1 class="view-title">MACROS</h1>
      <p class="view-sub">Fuel the Machine</p>
    </div>
    <div class="macros-type-toggle">
      <button class="macro-toggle-btn ${!todayIsRest ? 'active' : ''}" onclick="showMacroType('training')">TRAINING DAY</button>
      <button class="macro-toggle-btn ${todayIsRest ? 'active' : ''}" onclick="showMacroType('rest')">REST DAY</button>
    </div>
    <div id="macro-display">
      ${renderMacroCards(todayM, todayIsRest ? 'REST DAY' : 'TRAINING DAY')}
    </div>
    <div class="macro-notes">
      <h3 class="section-title">ALCOHOL PROTOCOL</h3>
      <div class="alcohol-rules">
        <div class="rule">🍺 Max 3–4 drinks per week to preserve results</div>
        <div class="rule">⏰ No alcohol within 3hrs post-workout</div>
        <div class="rule">📊 Budget ~150–200 kcal per drink from fat/carb allowance</div>
        <div class="rule">💧 Match every drink with a glass of water</div>
      </div>
    </div>
  `;
}

function renderMacroCards(m, type) {
  return `
    <div class="macro-day-type">${type}</div>
    <div class="macro-total-cal">${m.calories} <span class="cal-unit">kcal</span></div>
    <div class="macros-grid">
      <div class="macro-card protein">
        <div class="macro-icon">🥩</div>
        <div class="macro-amount">${m.protein}g</div>
        <div class="macro-name">PROTEIN</div>
        <div class="macro-kcal">${m.protein * 4} kcal</div>
      </div>
      <div class="macro-card carbs">
        <div class="macro-icon">🍚</div>
        <div class="macro-amount">${m.carbs}g</div>
        <div class="macro-name">CARBS</div>
        <div class="macro-kcal">${m.carbs * 4} kcal</div>
      </div>
      <div class="macro-card fat">
        <div class="macro-icon">🥑</div>
        <div class="macro-amount">${m.fat}g</div>
        <div class="macro-name">FAT</div>
        <div class="macro-kcal">${m.fat * 9} kcal</div>
      </div>
    </div>
  `;
}

function showMacroType(type) {
  const m = type === 'rest' ? MACROS.rest : MACROS.training;
  const label = type === 'rest' ? 'REST DAY' : 'TRAINING DAY';
  document.getElementById('macro-display').innerHTML = renderMacroCards(m, label);
  document.querySelectorAll('.macro-toggle-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
}

// ============================================================
// SUPPLEMENTS VIEW
// ============================================================
function renderSupplements() {
  const main = document.getElementById('main-content');
  main.innerHTML = `
    <div class="view-header">
      <h1 class="view-title">SUPPLEMENT STACK</h1>
      <p class="view-sub">The Champion's Arsenal</p>
    </div>
    <div class="supps-list">
      ${SUPPLEMENTS.map(s => `
        <div class="supp-card">
          <div class="supp-info">
            <div class="supp-name">${s.name}</div>
            <div class="supp-timing">${s.timing}</div>
          </div>
          <div class="supp-dose">${s.dose}</div>
        </div>
      `).join('')}
    </div>
    <div class="supp-disclaimer">
      <p>⚕️ Consult your GP before starting any supplement regimen.</p>
    </div>
  `;
}

// ============================================================
// BOOT
// ============================================================
document.addEventListener('DOMContentLoaded', init);
