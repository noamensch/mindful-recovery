/**
 * Mindful Recovery - Internationalization (i18n)
 * Supports English and Hebrew
 */

const TRANSLATIONS = {
    en: {
        // Meta
        lang: 'en',
        dir: 'ltr',
        langName: 'English',

        // Home Screen
        appName: 'Mindful Recovery',
        tagline: 'One breath at a time',
        groundMeNow: 'Ground Me Now',
        todaysPractice: "Today's Practice",
        totalSessions: 'total sessions',
        thisWeek: 'this week',

        // Navigation
        navHome: 'Home',
        navSessions: 'Sessions',
        navSettings: 'Settings',

        // Player
        back: '← Back',
        pause: '❚❚',
        play: '▶',
        stop: 'Stop',

        // Grounding
        groundingTitle: "Let's Ground Together",
        next: 'Next',
        done: 'Done',
        stepOf: 'of',

        // Complete Screen
        wellDone: 'Well Done',
        completeTotalPrefix: 'Total sessions:',
        completeMessages: [
            'Every practice counts.',
            'You showed up for yourself today.',
            'Small steps lead to big changes.',
            "You're building a healthy habit.",
            'Nicely done.',
        ],

        // Library
        allSessions: 'All Sessions',
        microSessions: 'Micro Sessions',
        microDesc: '30 seconds to 2 minutes',
        bodyAwareness: 'Body Awareness',
        bodyDesc: 'Notice sensations in your body',
        grounding: 'Grounding',
        groundingDesc: 'Feel present and stable',

        // Settings
        settings: 'Settings',
        display: 'Display',
        highContrast: 'High Contrast Mode',
        largeText: 'Larger Text',
        reduceMotion: 'Reduce Motion',
        audio: 'Audio',
        voiceSpeed: 'Voice Speed',
        speedSlow: 'Slow',
        speedNormal: 'Normal',
        speedVerySlow: 'Very Slow',
        speakInstructions: 'Speak Instructions',
        language: 'Language',
        reminders: 'Reminders',
        dailyReminder: 'Daily Reminder',
        reminderTime: 'Reminder Time',
        linkToRoutine: 'Link to Routine',
        routineNone: 'Just use time',
        routineMorning: 'After waking up',
        routineBreakfast: 'After breakfast',
        routineLunch: 'After lunch',
        routineMedication: 'After medication',
        routineEvening: 'Before bed',
        data: 'Data',
        clearProgress: 'Clear All Progress',
        clearConfirm: 'This will clear all your progress. Are you sure?',

        // Sessions
        sessions: {
            'one-breath': {
                title: 'One Breath',
                description: 'Just one mindful breath',
                steps: [
                    "Let's take one breath together.",
                    'Breathe in slowly...',
                    'And breathe out slowly...',
                    "That's it. Well done.",
                ]
            },
            'three-breaths': {
                title: 'Three Breaths',
                description: 'Three slow, calming breaths',
                steps: [
                    "Let's take three breaths together.",
                    'First breath in...',
                    'And out...',
                    'Second breath in...',
                    'And out...',
                    'Third breath in...',
                    'And out...',
                    'Well done.',
                ]
            },
            'feel-your-hands': {
                title: 'Feel Your Hands',
                description: 'Notice the sensations in your hands',
                steps: [
                    'Rest your hands in your lap.',
                    'Feel the weight of your hands.',
                    'Notice if they feel warm or cool.',
                    'Feel any tingling or stillness.',
                    'Just notice. No need to change anything.',
                    'Well done.',
                ]
            },
            'feet-on-floor': {
                title: 'Feet on the Floor',
                description: 'Ground yourself through your feet',
                steps: [
                    'Feel your feet on the floor.',
                    'Press them gently into the ground.',
                    'Notice the floor supporting you.',
                    'You are here. You are safe.',
                    'Well done.',
                ]
            },
            'listen': {
                title: 'One Sound',
                description: 'Focus on a single sound',
                steps: [
                    'Close your eyes if you like.',
                    'Listen for one sound around you.',
                    'Just one sound. Any sound.',
                    'Follow it. Notice it.',
                    'Let other sounds fade away.',
                    'Just this one sound.',
                    'Now let it go.',
                    'Open your eyes when ready.',
                    'Well done.',
                ]
            },
            'shoulder-drop': {
                title: 'Shoulder Drop',
                description: 'Release tension in your shoulders',
                steps: [
                    'Notice your shoulders right now.',
                    'Are they lifted? Tight?',
                    'Take a breath in...',
                    'As you breathe out, let your shoulders drop.',
                    'Let them be heavy and soft.',
                    'Notice the difference.',
                    'Well done.',
                ]
            },
            'face-relax': {
                title: 'Relax Your Face',
                description: 'Soften the muscles in your face',
                steps: [
                    'Notice your face.',
                    'Soften your forehead.',
                    'Let your eyebrows relax.',
                    'Unclench your jaw.',
                    'Let your tongue rest softly.',
                    'Feel your whole face relax.',
                    'Well done.',
                ]
            },
            'simple-body-scan': {
                title: 'Simple Body Check',
                description: 'Quick scan from head to feet',
                steps: [
                    "Let's check in with your body.",
                    'Notice your head.',
                    'Notice your shoulders.',
                    'Notice your arms and hands.',
                    'Notice your chest.',
                    'Notice your belly.',
                    'Notice your hips.',
                    'Notice your legs.',
                    'Notice your feet.',
                    'Your whole body, here with you.',
                    'Well done.',
                ]
            },
            'five-senses': {
                title: '5-4-3-2-1 Grounding',
                description: 'Use your senses to feel present',
                steps: [
                    "Let's ground you in the present moment.",
                    'Look around. Find 5 things you can see.',
                    'Good. Now find 4 things you can touch.',
                    'Notice 3 things you can hear.',
                    'Find 2 things you can smell.',
                    'Notice 1 thing you can taste.',
                    'You are here. You are present.',
                    'Well done.',
                ]
            },
            'anchor': {
                title: 'Find Your Anchor',
                description: 'Create a physical point of focus',
                steps: [
                    'Press your feet into the floor.',
                    'Feel the chair supporting you.',
                    'Place your hand on your belly.',
                    'Feel it rise as you breathe in...',
                    'And fall as you breathe out...',
                    'This is your anchor.',
                    'You can return here anytime.',
                    'Well done.',
                ]
            },
        },

        // Grounding steps
        groundingSteps: [
            {
                instruction: 'Take a slow breath.',
                detail: 'In through your nose... out through your mouth.'
            },
            {
                instruction: 'Feel your feet on the ground.',
                detail: 'Press them into the floor. Feel the support.'
            },
            {
                instruction: 'Look around you.',
                detail: 'Name 3 things you can see right now.'
            },
            {
                instruction: 'Listen.',
                detail: 'What sounds do you hear? Near or far?'
            },
            {
                instruction: 'Touch something nearby.',
                detail: 'Notice its texture. Smooth? Rough? Warm? Cool?'
            },
            {
                instruction: 'You are here. You are safe.',
                detail: 'Take one more slow breath.'
            },
        ],
    },

    he: {
        // Meta
        lang: 'he',
        dir: 'rtl',
        langName: 'עברית',

        // Home Screen
        appName: 'התאוששות מודעת',
        tagline: 'נשימה אחת בכל פעם',
        groundMeNow: 'עזרו לי להירגע',
        todaysPractice: 'התרגול של היום',
        totalSessions: 'סה״כ תרגולים',
        thisWeek: 'השבוע',

        // Navigation
        navHome: 'בית',
        navSessions: 'תרגולים',
        navSettings: 'הגדרות',

        // Player
        back: 'חזרה ←',
        pause: '❚❚',
        play: '▶',
        stop: 'עצור',

        // Grounding
        groundingTitle: 'בואו נירגע יחד',
        next: 'הבא',
        done: 'סיום',
        stepOf: 'מתוך',

        // Complete Screen
        wellDone: 'כל הכבוד',
        completeTotalPrefix: 'סה״כ תרגולים:',
        completeMessages: [
            'כל תרגול חשוב.',
            'הגעת היום בשביל עצמך.',
            'צעדים קטנים מובילים לשינויים גדולים.',
            'את/ה בונה הרגל בריא.',
            'עבודה יפה.',
        ],

        // Library
        allSessions: 'כל התרגולים',
        microSessions: 'תרגולים קצרים',
        microDesc: '30 שניות עד 2 דקות',
        bodyAwareness: 'מודעות לגוף',
        bodyDesc: 'שימו לב לתחושות בגוף',
        grounding: 'עיגון והרגעה',
        groundingDesc: 'להרגיש נוכח ויציב',

        // Settings
        settings: 'הגדרות',
        display: 'תצוגה',
        highContrast: 'ניגודיות גבוהה',
        largeText: 'טקסט גדול',
        reduceMotion: 'הפחתת תנועה',
        audio: 'שמע',
        voiceSpeed: 'מהירות דיבור',
        speedSlow: 'איטי',
        speedNormal: 'רגיל',
        speedVerySlow: 'איטי מאוד',
        speakInstructions: 'הקראת הוראות',
        language: 'שפה',
        reminders: 'תזכורות',
        dailyReminder: 'תזכורת יומית',
        reminderTime: 'שעת תזכורת',
        linkToRoutine: 'קישור לשגרה',
        routineNone: 'רק לפי שעה',
        routineMorning: 'אחרי ההשכמה',
        routineBreakfast: 'אחרי ארוחת בוקר',
        routineLunch: 'אחרי ארוחת צהריים',
        routineMedication: 'אחרי נטילת תרופות',
        routineEvening: 'לפני השינה',
        data: 'נתונים',
        clearProgress: 'מחיקת כל ההתקדמות',
        clearConfirm: 'פעולה זו תמחק את כל ההתקדמות שלך. להמשיך?',

        // Sessions
        sessions: {
            'one-breath': {
                title: 'נשימה אחת',
                description: 'רק נשימה אחת מודעת',
                steps: [
                    'בואו ניקח נשימה אחת יחד.',
                    'שאפו לאט...',
                    'ונשפו לאט...',
                    'זהו. כל הכבוד.',
                ]
            },
            'three-breaths': {
                title: 'שלוש נשימות',
                description: 'שלוש נשימות איטיות ומרגיעות',
                steps: [
                    'בואו ניקח שלוש נשימות יחד.',
                    'נשימה ראשונה פנימה...',
                    'והחוצה...',
                    'נשימה שנייה פנימה...',
                    'והחוצה...',
                    'נשימה שלישית פנימה...',
                    'והחוצה...',
                    'כל הכבוד.',
                ]
            },
            'feel-your-hands': {
                title: 'להרגיש את הידיים',
                description: 'שימו לב לתחושות בידיים',
                steps: [
                    'הניחו את הידיים על הברכיים.',
                    'הרגישו את משקל הידיים.',
                    'שימו לב אם הן חמות או קרירות.',
                    'הרגישו עקצוץ או שקט.',
                    'פשוט שימו לב. אין צורך לשנות דבר.',
                    'כל הכבוד.',
                ]
            },
            'feet-on-floor': {
                title: 'כפות רגליים על הרצפה',
                description: 'התארקו דרך כפות הרגליים',
                steps: [
                    'הרגישו את כפות הרגליים על הרצפה.',
                    'לחצו אותן בעדינות לתוך הקרקע.',
                    'שימו לב לרצפה שתומכת בכם.',
                    'אתם כאן. אתם בטוחים.',
                    'כל הכבוד.',
                ]
            },
            'listen': {
                title: 'צליל אחד',
                description: 'התמקדו בצליל בודד',
                steps: [
                    'עצמו את העיניים אם נוח לכם.',
                    'הקשיבו לצליל אחד סביבכם.',
                    'רק צליל אחד. כל צליל.',
                    'עקבו אחריו. שימו לב אליו.',
                    'תנו לצלילים אחרים להיעלם.',
                    'רק הצליל הזה.',
                    'עכשיו שחררו אותו.',
                    'פתחו את העיניים כשמוכנים.',
                    'כל הכבוד.',
                ]
            },
            'shoulder-drop': {
                title: 'שחרור כתפיים',
                description: 'שחררו מתח מהכתפיים',
                steps: [
                    'שימו לב לכתפיים שלכם עכשיו.',
                    'האם הן מורמות? מתוחות?',
                    'קחו נשימה פנימה...',
                    'כשאתם נושפים, תנו לכתפיים לרדת.',
                    'תנו להן להיות כבדות ורכות.',
                    'שימו לב להבדל.',
                    'כל הכבוד.',
                ]
            },
            'face-relax': {
                title: 'הרפיית הפנים',
                description: 'רככו את שרירי הפנים',
                steps: [
                    'שימו לב לפנים שלכם.',
                    'רככו את המצח.',
                    'תנו לגבות להירגע.',
                    'שחררו את הלסת.',
                    'תנו ללשון לנוח ברכות.',
                    'הרגישו את כל הפנים נרגעות.',
                    'כל הכבוד.',
                ]
            },
            'simple-body-scan': {
                title: 'סריקת גוף פשוטה',
                description: 'סריקה מהירה מהראש עד הרגליים',
                steps: [
                    'בואו נבדוק איך הגוף מרגיש.',
                    'שימו לב לראש.',
                    'שימו לב לכתפיים.',
                    'שימו לב לזרועות ולידיים.',
                    'שימו לב לחזה.',
                    'שימו לב לבטן.',
                    'שימו לב לאגן.',
                    'שימו לב לרגליים.',
                    'שימו לב לכפות הרגליים.',
                    'כל הגוף שלכם, כאן איתכם.',
                    'כל הכבוד.',
                ]
            },
            'five-senses': {
                title: 'עיגון 5-4-3-2-1',
                description: 'השתמשו בחושים להרגיש נוכחות',
                steps: [
                    'בואו נעגן אתכם ברגע הנוכחי.',
                    'הסתכלו סביב. מצאו 5 דברים שאתם רואים.',
                    'טוב. עכשיו מצאו 4 דברים שאתם יכולים לגעת.',
                    'שימו לב ל-3 דברים שאתם שומעים.',
                    'מצאו 2 דברים שאתם מריחים.',
                    'שימו לב לדבר אחד שאתם טועמים.',
                    'אתם כאן. אתם נוכחים.',
                    'כל הכבוד.',
                ]
            },
            'anchor': {
                title: 'מצאו את העוגן',
                description: 'צרו נקודת מיקוד פיזית',
                steps: [
                    'לחצו את כפות הרגליים לרצפה.',
                    'הרגישו את הכיסא תומך בכם.',
                    'הניחו את היד על הבטן.',
                    'הרגישו אותה עולה כששואפים...',
                    'ויורדת כשנושפים...',
                    'זה העוגן שלכם.',
                    'תוכלו לחזור לכאן בכל עת.',
                    'כל הכבוד.',
                ]
            },
        },

        // Grounding steps
        groundingSteps: [
            {
                instruction: 'קחו נשימה איטית.',
                detail: 'פנימה דרך האף... החוצה דרך הפה.'
            },
            {
                instruction: 'הרגישו את כפות הרגליים על הקרקע.',
                detail: 'לחצו אותן לרצפה. הרגישו את התמיכה.'
            },
            {
                instruction: 'הסתכלו סביבכם.',
                detail: 'תנו שם ל-3 דברים שאתם רואים עכשיו.'
            },
            {
                instruction: 'הקשיבו.',
                detail: 'אילו צלילים אתם שומעים? קרובים או רחוקים?'
            },
            {
                instruction: 'געו במשהו קרוב.',
                detail: 'שימו לב למרקם. חלק? מחוספס? חם? קריר?'
            },
            {
                instruction: 'אתם כאן. אתם בטוחים.',
                detail: 'קחו עוד נשימה איטית אחת.'
            },
        ],
    }
};

// Current language
let currentLang = 'en';

// Get translation by key path (e.g., 'sessions.one-breath.title')
function t(key) {
    const keys = key.split('.');
    let value = TRANSLATIONS[currentLang];

    for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
            value = value[k];
        } else {
            // Fallback to English
            value = TRANSLATIONS['en'];
            for (const fallbackKey of keys) {
                if (value && typeof value === 'object' && fallbackKey in value) {
                    value = value[fallbackKey];
                } else {
                    return key; // Return key if not found
                }
            }
            break;
        }
    }

    return value;
}

// Set language
function setLanguage(lang) {
    if (!TRANSLATIONS[lang]) {
        console.warn(`Language ${lang} not supported`);
        return;
    }

    currentLang = lang;

    // Update document direction and lang
    document.documentElement.lang = TRANSLATIONS[lang].lang;
    document.documentElement.dir = TRANSLATIONS[lang].dir;
    document.body.classList.toggle('rtl', TRANSLATIONS[lang].dir === 'rtl');

    // Save preference
    try {
        localStorage.setItem('mindful-recovery-lang', lang);
    } catch (e) {
        console.warn('Could not save language preference');
    }
}

// Get current language
function getCurrentLang() {
    return currentLang;
}

// Get available languages
function getAvailableLanguages() {
    return Object.keys(TRANSLATIONS).map(code => ({
        code,
        name: TRANSLATIONS[code].langName,
        dir: TRANSLATIONS[code].dir,
    }));
}

// Load saved language preference
function loadLanguagePreference() {
    try {
        const saved = localStorage.getItem('mindful-recovery-lang');
        if (saved && TRANSLATIONS[saved]) {
            setLanguage(saved);
            return;
        }
    } catch (e) {
        // Ignore
    }

    // Try to detect from browser
    const browserLang = navigator.language.split('-')[0];
    if (TRANSLATIONS[browserLang]) {
        setLanguage(browserLang);
    }
}

// Export
window.t = t;
window.setLanguage = setLanguage;
window.getCurrentLang = getCurrentLang;
window.getAvailableLanguages = getAvailableLanguages;
window.loadLanguagePreference = loadLanguagePreference;
window.TRANSLATIONS = TRANSLATIONS;
