/**
 * Mindful Recovery - Main Application
 * With internationalization (i18n) support for English and Hebrew
 */

(function () {
    'use strict';

    // ========================================
    // State Management
    // ========================================

    const state = {
        currentScreen: 'home-screen',
        currentSession: null,
        currentSessionId: null,
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
            language: 'he',
        },
        progress: {
            totalSessions: 0,
            completedSessionIds: [],
            weeklyHistory: [],
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
    // Internationalization
    // ========================================

    function updateUILanguage() {
        const lang = getCurrentLang();

        // Update ALL elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = t(key);
            if (translation && translation !== key) {
                el.textContent = translation;
            }
        });

        // Update specific UI elements that don't have data-i18n
        document.querySelector('.home-header h1').textContent = t('appName');
        document.querySelector('.tagline').textContent = t('tagline');
        document.querySelector('#ground-me-btn').innerHTML = `
            <span class="ground-icon"></span>
            ${t('groundMeNow')}
        `;
        document.querySelector('.sessions-section h2').textContent = t('todaysPractice');

        // Progress labels
        document.querySelectorAll('.progress-label')[0].textContent = t('totalSessions');
        document.querySelectorAll('.progress-label')[1].textContent = t('thisWeek');

        // Player
        document.getElementById('player-back').textContent = t('back');
        document.getElementById('player-stop').textContent = t('stop');

        // Grounding
        document.querySelector('.grounding-title').textContent = t('groundingTitle');
        document.getElementById('grounding-back').textContent = t('back');

        // Complete screen
        document.querySelector('.complete-title').textContent = t('wellDone');

        // Library
        document.querySelector('.library-header h1').textContent = t('allSessions');
        const librarySections = document.querySelectorAll('.library-section');
        librarySections[0].querySelector('h2').textContent = t('microSessions');
        librarySections[0].querySelector('.section-desc').textContent = t('microDesc');
        librarySections[1].querySelector('h2').textContent = t('bodyAwareness');
        librarySections[1].querySelector('.section-desc').textContent = t('bodyDesc');
        librarySections[2].querySelector('h2').textContent = t('grounding');
        librarySections[2].querySelector('.section-desc').textContent = t('groundingDesc');

        // Settings header
        document.querySelector('.settings-header h1').textContent = t('settings');

        // Update language selector buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // Re-render dynamic content
        renderHome();
        renderLibrary();
    }

    function switchLanguage(lang) {
        state.settings.language = lang;
        setLanguage(lang);
        saveSettings();

        // Force RTL update on both html and body
        const isRTL = lang === 'he';
        document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
        document.body.dir = isRTL ? 'rtl' : 'ltr';
        document.body.classList.toggle('rtl', isRTL);

        console.log('Language switched to:', lang, 'RTL:', isRTL);
        console.log('document.dir:', document.documentElement.dir);
        console.log('body.classList:', document.body.className);

        // Update all UI with new language (this also re-renders home and library)
        updateUILanguage();

        // Apply RTL styles directly to elements
        applyRTLStyles(isRTL);
    }

    // Apply RTL styles directly via JavaScript (CSS fallback)
    // Note: In RTL context, flex-direction: row already goes right-to-left
    // So we use 'row' for RTL (not 'row-reverse' which would flip it back!)
    function applyRTLStyles(isRTL) {
        console.log('applyRTLStyles called with isRTL:', isRTL);

        // Session cards - in RTL, 'row' goes right-to-left naturally
        const sessionCards = document.querySelectorAll('.session-card');
        console.log('Found session cards:', sessionCards.length);
        sessionCards.forEach(card => {
            // Use 'row' for both - RTL context handles the direction
            card.style.flexDirection = 'row';
        });

        // Session info text alignment
        document.querySelectorAll('.session-info').forEach(info => {
            info.style.textAlign = isRTL ? 'right' : 'left';
        });

        // Setting items - in RTL, 'row' goes right-to-left naturally
        const settingItems = document.querySelectorAll('.setting-item');
        console.log('Found setting items:', settingItems.length);
        settingItems.forEach(item => {
            // Use 'row' for both - RTL context handles the direction
            item.style.flexDirection = 'row';
        });

        // Setting labels text alignment
        document.querySelectorAll('.setting-item label').forEach(label => {
            label.style.textAlign = isRTL ? 'right' : 'left';
        });

        // Section headers
        document.querySelectorAll('.sessions-section h2, .settings-section h2, .library-section h2').forEach(h2 => {
            h2.style.textAlign = isRTL ? 'right' : 'left';
        });
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
    // Session Data with Translations
    // ========================================

    function getTranslatedSession(sessionId) {
        const baseSession = getSessionById(sessionId);
        if (!baseSession) return null;

        const sessionTranslation = t(`sessions.${sessionId}`);

        // Create translated session object
        return {
            ...baseSession,
            title: sessionTranslation.title || baseSession.title,
            description: sessionTranslation.description || baseSession.description,
            steps: baseSession.steps.map((step, index) => ({
                ...step,
                text: sessionTranslation.steps?.[index] || step.text,
            })),
        };
    }

    function getTranslatedGroundingSteps() {
        return t('groundingSteps') || GROUNDING_STEPS;
    }

    // ========================================
    // Session Player
    // ========================================

    function startSession(sessionId) {
        const session = getTranslatedSession(sessionId);
        if (!session) return;

        state.currentSession = session;
        state.currentSessionId = sessionId;  // Store session ID for audio files
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

        // Play audio if enabled
        if (state.settings.useVoice && state.currentSessionId) {
            playSessionAudio(state.currentSessionId, state.stepIndex);
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
            pauseBtn.textContent = t('play');
            pauseBtn.setAttribute('aria-label', 'Resume');

            // Stop breathing animation
            document.getElementById('breathing-circle').classList.remove('animating');
        } else {
            pauseBtn.textContent = t('pause');
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
        stopAudio();  // Stop any playing audio
        state.currentSession = null;
        state.currentSessionId = null;
        state.stepIndex = 0;
        state.isPaused = false;

        // Stop breathing animation
        document.getElementById('breathing-circle').classList.remove('animating');

        // Reset pause button
        const pauseBtn = document.getElementById('player-pause');
        pauseBtn.textContent = t('pause');
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

        const messages = t('completeMessages');
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        document.getElementById('complete-message').textContent = randomMessage;

        // Update button text
        document.getElementById('complete-done').textContent = t('done');

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
        const steps = getTranslatedGroundingSteps();
        const step = steps[state.groundingStep];
        if (!step) {
            finishGrounding();
            return;
        }

        document.getElementById('grounding-instruction').textContent = step.instruction;
        document.getElementById('grounding-detail').textContent = step.detail;
        document.getElementById('grounding-step').textContent =
            `${state.groundingStep + 1} ${t('stepOf')} ${steps.length}`;

        // Update button text for last step
        const nextBtn = document.getElementById('grounding-next');
        if (state.groundingStep === steps.length - 1) {
            nextBtn.textContent = t('done');
        } else {
            nextBtn.textContent = t('next');
        }

        // Play audio if enabled
        if (state.settings.useVoice) {
            playGroundingAudio(state.groundingStep);
        }
    }

    function nextGroundingStep() {
        const steps = getTranslatedGroundingSteps();
        state.groundingStep++;
        if (state.groundingStep >= steps.length) {
            finishGrounding();
        } else {
            showGroundingStep();
        }
    }

    function finishGrounding() {
        showScreen('home-screen');
    }

    // ========================================
    // Audio Playback (Pre-recorded audio files)
    // ========================================

    let currentAudio = null;

    // Get audio file path for a session step
    function getAudioPath(sessionId, stepIndex) {
        const lang = getCurrentLang();
        return `audio/${lang}/${sessionId}-${stepIndex}.mp3`;
    }

    // Get audio file path for grounding step
    function getGroundingAudioPath(stepIndex) {
        const lang = getCurrentLang();
        return `audio/${lang}/grounding-${stepIndex}.mp3`;
    }

    // Play audio file
    function playAudio(audioPath) {
        return new Promise((resolve, reject) => {
            if (!state.settings.useVoice) {
                resolve();
                return;
            }

            // Stop any currently playing audio
            stopAudio();

            currentAudio = new Audio(audioPath);

            // Set playback rate based on settings
            switch (state.settings.voiceSpeed) {
                case 'very-slow':
                    currentAudio.playbackRate = 0.75;
                    break;
                case 'slow':
                    currentAudio.playbackRate = 0.85;
                    break;
                default:
                    currentAudio.playbackRate = 1.0;
            }

            currentAudio.onended = () => {
                console.log('Audio ended:', audioPath);
                resolve();
            };

            currentAudio.onerror = (e) => {
                console.warn('Audio file not found:', audioPath);
                resolve(); // Don't reject - just continue without audio
            };

            currentAudio.play().catch(e => {
                console.warn('Could not play audio:', e.message);
                resolve();
            });
        });
    }

    // Stop currently playing audio
    function stopAudio() {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            currentAudio = null;
        }
    }

    // Play session step audio
    function playSessionAudio(sessionId, stepIndex) {
        const audioPath = getAudioPath(sessionId, stepIndex);
        return playAudio(audioPath);
    }

    // Play grounding step audio
    function playGroundingAudio(stepIndex) {
        const audioPath = getGroundingAudioPath(stepIndex);
        return playAudio(audioPath);
    }

    // Legacy speak function - now uses audio files
    function speak(text, sessionId, stepIndex) {
        if (sessionId !== undefined && stepIndex !== undefined) {
            playSessionAudio(sessionId, stepIndex);
        }
        // If no session info provided, we can't play audio
        // (grounding uses playGroundingAudio directly)
    }

    // ========================================
    // UI Rendering
    // ========================================

    function renderSessionCard(session) {
        // Get translated session data
        const translatedSession = getTranslatedSession(session.id);

        const card = document.createElement('button');
        card.className = 'session-card';
        card.setAttribute('aria-label', `${translatedSession.title}, ${formatDuration(session.duration)}`);
        card.onclick = () => startSession(session.id);

        card.innerHTML = `
            <div class="session-info">
                <div class="session-title">${translatedSession.title}</div>
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

        // Apply RTL styles to newly rendered elements
        const isRTL = getCurrentLang() === 'he';
        applyRTLStyles(isRTL);
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

        // Apply RTL styles to newly rendered elements
        const isRTL = getCurrentLang() === 'he';
        applyRTLStyles(isRTL);
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

        // Language
        if (state.settings.language) {
            setLanguage(state.settings.language);
        }
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

        // Language selector
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                switchLanguage(btn.dataset.lang);
            });
        });

        // Reminder enabled toggle
        document.getElementById('reminder-enabled').addEventListener('change', (e) => {
            state.settings.reminderEnabled = e.target.checked;
            applySettings();
            saveSettings();

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
            if (confirm(t('clearConfirm'))) {
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
        // Load saved data
        loadSettings();
        loadProgress();

        // Initialize language
        if (state.settings.language) {
            setLanguage(state.settings.language);
            // Ensure RTL is applied
            const isRTL = state.settings.language === 'he';
            document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
            document.body.classList.toggle('rtl', isRTL);
        } else {
            loadLanguagePreference();
            state.settings.language = getCurrentLang();
        }

        // Apply settings and render
        applySettings();
        initSettings();
        initEventListeners();

        // Update UI with current language
        updateUILanguage();

        // Apply RTL styles after everything is rendered
        const isRTL = getCurrentLang() === 'he';
        applyRTLStyles(isRTL);

        // Register service worker
        registerServiceWorker();

        // Log ready
        console.log('App initialized. Using pre-recorded audio files for narration.');
    }

    // Start the app
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
