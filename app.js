/**
 * Mindful Recovery - Main Application
 *
 * A mindfulness app designed for people with TBI
 */

(function () {
    'use strict';

    // ========================================
    // State Management
    // ========================================

    const state = {
        currentScreen: 'home-screen',
        currentSession: null,
        sessionTimer: null,
        stepIndex: 0,
        isPaused: false,
        startTime: null,
        groundingStep: 0,
        settings: {
            highContrast: false,
            largeText: false,
            reduceMotion: false,
            voiceSpeed: 'normal',
            useVoice: true,
            reminderEnabled: false,
            reminderTime: '09:00',
            reminderRoutine: '',
        },
        progress: {
            totalSessions: 0,
            completedSessionIds: [],
            weeklyHistory: [], // Array of { date: 'YYYY-MM-DD', count: number }
        }
    };

    // ========================================
    // Local Storage
    // ========================================

    function saveProgress() {
        try {
            localStorage.setItem('mindful-recovery-progress', JSON.stringify(state.progress));
        } catch (e) {
            console.warn('Could not save progress:', e);
        }
    }

    function loadProgress() {
        try {
            const saved = localStorage.getItem('mindful-recovery-progress');
            if (saved) {
                state.progress = { ...state.progress, ...JSON.parse(saved) };
            }
        } catch (e) {
            console.warn('Could not load progress:', e);
        }
    }

    function saveSettings() {
        try {
            localStorage.setItem('mindful-recovery-settings', JSON.stringify(state.settings));
        } catch (e) {
            console.warn('Could not save settings:', e);
        }
    }

    function loadSettings() {
        try {
            const saved = localStorage.getItem('mindful-recovery-settings');
            if (saved) {
                state.settings = { ...state.settings, ...JSON.parse(saved) };
            }
        } catch (e) {
            console.warn('Could not load settings:', e);
        }
    }

    // ========================================
    // Screen Navigation
    // ========================================

    function showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        const target = document.getElementById(screenId);
        if (target) {
            target.classList.add('active');
            state.currentScreen = screenId;

            // Update nav buttons
            document.querySelectorAll('.nav-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.screen === screenId);
            });
        }
    }

    // ========================================
    // Session Player
    // ========================================

    function startSession(sessionId) {
        const session = getSessionById(sessionId);
        if (!session) return;

        state.currentSession = session;
        state.stepIndex = 0;
        state.isPaused = false;
        state.startTime = Date.now();

        // Update player UI
        document.getElementById('player-title').textContent = session.title;
        document.getElementById('player-duration').textContent = formatDuration(session.duration);

        showScreen('player-screen');

        // Start breathing animation if not reduced motion
        const circle = document.getElementById('breathing-circle');
        if (!state.settings.reduceMotion) {
            circle.classList.add('animating');
        }

        // Start first step
        playStep();
    }

    function playStep() {
        const session = state.currentSession;
        if (!session || state.stepIndex >= session.steps.length) {
            completeSession();
            return;
        }

        const step = session.steps[state.stepIndex];

        // Update instruction text
        document.getElementById('player-instruction').textContent = step.text;

        // Speak instruction if enabled
        if (state.settings.useVoice) {
            speak(step.text);
        }

        // Update progress bar
        updateProgress();

        // Schedule next step
        if (!state.isPaused) {
            state.sessionTimer = setTimeout(() => {
                state.stepIndex++;
                playStep();
            }, step.duration);
        }
    }

    function togglePause() {
        state.isPaused = !state.isPaused;
        const pauseBtn = document.getElementById('player-pause');

        if (state.isPaused) {
            clearTimeout(state.sessionTimer);
            pauseBtn.textContent = '▶';
            pauseBtn.setAttribute('aria-label', 'Resume');

            // Stop breathing animation
            document.getElementById('breathing-circle').classList.remove('animating');
        } else {
            pauseBtn.textContent = '❚❚';
            pauseBtn.setAttribute('aria-label', 'Pause');

            // Resume breathing animation
            if (!state.settings.reduceMotion) {
                document.getElementById('breathing-circle').classList.add('animating');
            }

            // Resume from current step
            const session = state.currentSession;
            if (session && state.stepIndex < session.steps.length) {
                const step = session.steps[state.stepIndex];
                state.sessionTimer = setTimeout(() => {
                    state.stepIndex++;
                    playStep();
                }, step.duration);
            }
        }
    }

    function stopSession() {
        clearTimeout(state.sessionTimer);
        state.currentSession = null;
        state.stepIndex = 0;
        state.isPaused = false;

        // Stop breathing animation
        document.getElementById('breathing-circle').classList.remove('animating');

        // Reset pause button
        const pauseBtn = document.getElementById('player-pause');
        pauseBtn.textContent = '❚❚';
        pauseBtn.setAttribute('aria-label', 'Pause');

        showScreen('home-screen');
    }

    function completeSession() {
        clearTimeout(state.sessionTimer);

        // Stop breathing animation
        document.getElementById('breathing-circle').classList.remove('animating');

        // Update progress
        state.progress.totalSessions++;

        // Update weekly history
        const today = new Date().toISOString().split('T')[0];
        const todayEntry = state.progress.weeklyHistory.find(h => h.date === today);
        if (todayEntry) {
            todayEntry.count++;
        } else {
            state.progress.weeklyHistory.push({ date: today, count: 1 });
        }

        // Keep only last 7 days
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        state.progress.weeklyHistory = state.progress.weeklyHistory.filter(h => {
            return new Date(h.date) >= weekAgo;
        });

        saveProgress();

        // Show completion screen
        document.getElementById('complete-total-count').textContent = state.progress.totalSessions;

        const messages = [
            'Every practice counts.',
            'You showed up for yourself today.',
            'Small steps lead to big changes.',
            'You\'re building a healthy habit.',
            'Nicely done.',
        ];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        document.getElementById('complete-message').textContent = randomMessage;

        showScreen('complete-screen');
    }

    function updateProgress() {
        const session = state.currentSession;
        if (!session) return;

        // Calculate total duration and elapsed duration
        let totalDuration = 0;
        let elapsedDuration = 0;

        session.steps.forEach((step, index) => {
            totalDuration += step.duration;
            if (index < state.stepIndex) {
                elapsedDuration += step.duration;
            }
        });

        const progress = (elapsedDuration / totalDuration) * 100;
        document.getElementById('progress-fill').style.width = `${progress}%`;

        // Update time remaining
        const remainingMs = totalDuration - elapsedDuration;
        const remainingSec = Math.ceil(remainingMs / 1000);
        const mins = Math.floor(remainingSec / 60);
        const secs = remainingSec % 60;
        document.getElementById('time-remaining').textContent =
            `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // ========================================
    // Grounding Exercise
    // ========================================

    function startGrounding() {
        state.groundingStep = 0;
        showScreen('grounding-screen');
        showGroundingStep();
    }

    function showGroundingStep() {
        const step = GROUNDING_STEPS[state.groundingStep];
        if (!step) {
            finishGrounding();
            return;
        }

        document.getElementById('grounding-instruction').textContent = step.instruction;
        document.getElementById('grounding-detail').textContent = step.detail;
        document.getElementById('grounding-step').textContent =
            `${state.groundingStep + 1} of ${GROUNDING_STEPS.length}`;

        // Update button text for last step
        const nextBtn = document.getElementById('grounding-next');
        if (state.groundingStep === GROUNDING_STEPS.length - 1) {
            nextBtn.textContent = 'Done';
        } else {
            nextBtn.textContent = 'Next';
        }

        // Speak if enabled
        if (state.settings.useVoice) {
            speak(step.instruction);
        }
    }

    function nextGroundingStep() {
        state.groundingStep++;
        if (state.groundingStep >= GROUNDING_STEPS.length) {
            finishGrounding();
        } else {
            showGroundingStep();
        }
    }

    function finishGrounding() {
        showScreen('home-screen');
    }

    // ========================================
    // Text-to-Speech
    // ========================================

    function speak(text) {
        if (!('speechSynthesis' in window)) return;

        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);

        // Set speed based on settings
        switch (state.settings.voiceSpeed) {
            case 'very-slow':
                utterance.rate = 0.6;
                break;
            case 'slow':
                utterance.rate = 0.8;
                break;
            default:
                utterance.rate = 0.9; // Slightly slower than default for clarity
        }

        window.speechSynthesis.speak(utterance);
    }

    // ========================================
    // UI Rendering
    // ========================================

    function renderSessionCard(session) {
        const card = document.createElement('button');
        card.className = 'session-card';
        card.setAttribute('aria-label', `${session.title}, ${formatDuration(session.duration)}`);
        card.onclick = () => startSession(session.id);

        card.innerHTML = `
            <div class="session-info">
                <div class="session-title">${session.title}</div>
                <div class="session-duration">${formatDuration(session.duration)}</div>
            </div>
            <div class="session-play" aria-hidden="true">▶</div>
        `;

        return card;
    }

    function renderHome() {
        // Render recommended sessions (first 3 micro sessions)
        const sessionsList = document.getElementById('sessions-list');
        sessionsList.innerHTML = '';

        SESSIONS.micro.slice(0, 3).forEach(session => {
            sessionsList.appendChild(renderSessionCard(session));
        });

        // Update progress display
        updateProgressDisplay();
    }

    function renderLibrary() {
        // Micro sessions
        const microList = document.getElementById('micro-sessions');
        microList.innerHTML = '';
        SESSIONS.micro.forEach(session => {
            microList.appendChild(renderSessionCard(session));
        });

        // Body sessions
        const bodyList = document.getElementById('body-sessions');
        bodyList.innerHTML = '';
        SESSIONS.body.forEach(session => {
            bodyList.appendChild(renderSessionCard(session));
        });

        // Grounding sessions
        const groundingList = document.getElementById('grounding-sessions');
        groundingList.innerHTML = '';
        SESSIONS.grounding.forEach(session => {
            groundingList.appendChild(renderSessionCard(session));
        });
    }

    function updateProgressDisplay() {
        document.getElementById('total-sessions').textContent = state.progress.totalSessions;

        // Calculate this week's sessions
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);

        const thisWeek = state.progress.weeklyHistory
            .filter(h => new Date(h.date) >= weekAgo)
            .reduce((sum, h) => sum + h.count, 0);

        document.getElementById('this-week').textContent = thisWeek;
    }

    // ========================================
    // Settings
    // ========================================

    function applySettings() {
        const body = document.body;

        // High contrast
        body.classList.toggle('high-contrast', state.settings.highContrast);
        document.getElementById('high-contrast').checked = state.settings.highContrast;

        // Large text
        body.classList.toggle('large-text', state.settings.largeText);
        document.getElementById('large-text').checked = state.settings.largeText;

        // Reduce motion
        body.classList.toggle('reduce-motion', state.settings.reduceMotion);
        document.getElementById('reduce-motion').checked = state.settings.reduceMotion;

        // Voice settings
        document.getElementById('voice-speed').value = state.settings.voiceSpeed;
        document.getElementById('use-voice').checked = state.settings.useVoice;

        // Reminder settings
        document.getElementById('reminder-enabled').checked = state.settings.reminderEnabled;
        document.getElementById('reminder-time').value = state.settings.reminderTime;
        document.getElementById('reminder-routine').value = state.settings.reminderRoutine;

        // Show/hide reminder options
        const showReminders = state.settings.reminderEnabled;
        document.getElementById('reminder-time-setting').style.display = showReminders ? 'flex' : 'none';
        document.getElementById('reminder-routine-setting').style.display = showReminders ? 'flex' : 'none';
    }

    function initSettings() {
        // High contrast toggle
        document.getElementById('high-contrast').addEventListener('change', (e) => {
            state.settings.highContrast = e.target.checked;
            applySettings();
            saveSettings();
        });

        // Large text toggle
        document.getElementById('large-text').addEventListener('change', (e) => {
            state.settings.largeText = e.target.checked;
            applySettings();
            saveSettings();
        });

        // Reduce motion toggle
        document.getElementById('reduce-motion').addEventListener('change', (e) => {
            state.settings.reduceMotion = e.target.checked;
            applySettings();
            saveSettings();
        });

        // Voice speed
        document.getElementById('voice-speed').addEventListener('change', (e) => {
            state.settings.voiceSpeed = e.target.value;
            saveSettings();
        });

        // Use voice toggle
        document.getElementById('use-voice').addEventListener('change', (e) => {
            state.settings.useVoice = e.target.checked;
            saveSettings();
        });

        // Reminder enabled toggle
        document.getElementById('reminder-enabled').addEventListener('change', (e) => {
            state.settings.reminderEnabled = e.target.checked;
            applySettings();
            saveSettings();

            // Request notification permission if enabled
            if (e.target.checked && 'Notification' in window) {
                Notification.requestPermission();
            }
        });

        // Reminder time
        document.getElementById('reminder-time').addEventListener('change', (e) => {
            state.settings.reminderTime = e.target.value;
            saveSettings();
        });

        // Reminder routine
        document.getElementById('reminder-routine').addEventListener('change', (e) => {
            state.settings.reminderRoutine = e.target.value;
            saveSettings();
        });

        // Clear data button
        document.getElementById('clear-data').addEventListener('click', () => {
            if (confirm('This will clear all your progress. Are you sure?')) {
                state.progress = {
                    totalSessions: 0,
                    completedSessionIds: [],
                    weeklyHistory: [],
                };
                saveProgress();
                updateProgressDisplay();
            }
        });

        // Check for prefers-reduced-motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            state.settings.reduceMotion = true;
            applySettings();
            saveSettings();
        }
    }

    // ========================================
    // Event Listeners
    // ========================================

    function initEventListeners() {
        // Navigation buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                showScreen(btn.dataset.screen);
            });
        });

        // Ground Me button
        document.getElementById('ground-me-btn').addEventListener('click', startGrounding);

        // Player controls
        document.getElementById('player-back').addEventListener('click', stopSession);
        document.getElementById('player-pause').addEventListener('click', togglePause);
        document.getElementById('player-stop').addEventListener('click', stopSession);

        // Grounding controls
        document.getElementById('grounding-back').addEventListener('click', () => showScreen('home-screen'));
        document.getElementById('grounding-next').addEventListener('click', nextGroundingStep);

        // Complete screen
        document.getElementById('complete-done').addEventListener('click', () => {
            showScreen('home-screen');
            updateProgressDisplay();
        });

        // Keyboard navigation for player
        document.addEventListener('keydown', (e) => {
            if (state.currentScreen === 'player-screen') {
                if (e.key === ' ' || e.key === 'Spacebar') {
                    e.preventDefault();
                    togglePause();
                } else if (e.key === 'Escape') {
                    stopSession();
                }
            }
        });
    }

    // ========================================
    // Service Worker Registration
    // ========================================

    function registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('sw.js')
                    .then(registration => {
                        console.log('SW registered:', registration.scope);
                    })
                    .catch(error => {
                        console.log('SW registration failed:', error);
                    });
            });
        }
    }

    // ========================================
    // Initialize App
    // ========================================

    function init() {
        loadSettings();
        loadProgress();
        applySettings();
        initSettings();
        initEventListeners();
        renderHome();
        renderLibrary();
        registerServiceWorker();
    }

    // Start the app
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
