/**
 * Mindful Recovery - Session Content
 *
 * Sessions are designed with TBI patients in mind:
 * - Short duration (30 sec to 2 min)
 * - Simple, concrete instructions
 * - Longer pauses between steps
 * - One instruction at a time
 */

const SESSIONS = {
    // Micro Sessions - 30 seconds to 2 minutes
    micro: [
        {
            id: 'one-breath',
            title: 'One Breath',
            duration: 30,
            category: 'micro',
            description: 'Just one mindful breath',
            steps: [
                { text: 'Let\'s take one breath together.', duration: 4000 },
                { text: 'Breathe in slowly...', duration: 4000, action: 'inhale' },
                { text: 'And breathe out slowly...', duration: 5000, action: 'exhale' },
                { text: 'That\'s it. Well done.', duration: 3000 },
            ]
        },
        {
            id: 'three-breaths',
            title: 'Three Breaths',
            duration: 60,
            category: 'micro',
            description: 'Three slow, calming breaths',
            steps: [
                { text: 'Let\'s take three breaths together.', duration: 4000 },
                { text: 'First breath in...', duration: 4000, action: 'inhale' },
                { text: 'And out...', duration: 5000, action: 'exhale' },
                { text: 'Second breath in...', duration: 4000, action: 'inhale' },
                { text: 'And out...', duration: 5000, action: 'exhale' },
                { text: 'Third breath in...', duration: 4000, action: 'inhale' },
                { text: 'And out...', duration: 5000, action: 'exhale' },
                { text: 'Well done.', duration: 3000 },
            ]
        },
        {
            id: 'feel-your-hands',
            title: 'Feel Your Hands',
            duration: 60,
            category: 'micro',
            description: 'Notice the sensations in your hands',
            steps: [
                { text: 'Rest your hands in your lap.', duration: 5000 },
                { text: 'Feel the weight of your hands.', duration: 6000 },
                { text: 'Notice if they feel warm or cool.', duration: 6000 },
                { text: 'Feel any tingling or stillness.', duration: 6000 },
                { text: 'Just notice. No need to change anything.', duration: 6000 },
                { text: 'Well done.', duration: 3000 },
            ]
        },
        {
            id: 'feet-on-floor',
            title: 'Feet on the Floor',
            duration: 60,
            category: 'micro',
            description: 'Ground yourself through your feet',
            steps: [
                { text: 'Feel your feet on the floor.', duration: 5000 },
                { text: 'Press them gently into the ground.', duration: 6000 },
                { text: 'Notice the floor supporting you.', duration: 6000 },
                { text: 'You are here. You are safe.', duration: 6000 },
                { text: 'Well done.', duration: 3000 },
            ]
        },
        {
            id: 'listen',
            title: 'One Sound',
            duration: 90,
            category: 'micro',
            description: 'Focus on a single sound',
            steps: [
                { text: 'Close your eyes if you like.', duration: 5000 },
                { text: 'Listen for one sound around you.', duration: 8000 },
                { text: 'Just one sound. Any sound.', duration: 8000 },
                { text: 'Follow it. Notice it.', duration: 8000 },
                { text: 'Let other sounds fade away.', duration: 8000 },
                { text: 'Just this one sound.', duration: 8000 },
                { text: 'Now let it go.', duration: 5000 },
                { text: 'Open your eyes when ready.', duration: 5000 },
                { text: 'Well done.', duration: 3000 },
            ]
        },
    ],

    // Body Awareness Sessions
    body: [
        {
            id: 'shoulder-drop',
            title: 'Shoulder Drop',
            duration: 60,
            category: 'body',
            description: 'Release tension in your shoulders',
            steps: [
                { text: 'Notice your shoulders right now.', duration: 5000 },
                { text: 'Are they lifted? Tight?', duration: 5000 },
                { text: 'Take a breath in...', duration: 4000, action: 'inhale' },
                { text: 'As you breathe out, let your shoulders drop.', duration: 6000, action: 'exhale' },
                { text: 'Let them be heavy and soft.', duration: 6000 },
                { text: 'Notice the difference.', duration: 5000 },
                { text: 'Well done.', duration: 3000 },
            ]
        },
        {
            id: 'face-relax',
            title: 'Relax Your Face',
            duration: 90,
            category: 'body',
            description: 'Soften the muscles in your face',
            steps: [
                { text: 'Notice your face.', duration: 5000 },
                { text: 'Soften your forehead.', duration: 6000 },
                { text: 'Let your eyebrows relax.', duration: 6000 },
                { text: 'Unclench your jaw.', duration: 6000 },
                { text: 'Let your tongue rest softly.', duration: 6000 },
                { text: 'Feel your whole face relax.', duration: 8000 },
                { text: 'Well done.', duration: 3000 },
            ]
        },
        {
            id: 'simple-body-scan',
            title: 'Simple Body Check',
            duration: 120,
            category: 'body',
            description: 'Quick scan from head to feet',
            steps: [
                { text: 'Let\'s check in with your body.', duration: 5000 },
                { text: 'Notice your head.', duration: 6000 },
                { text: 'Notice your shoulders.', duration: 6000 },
                { text: 'Notice your arms and hands.', duration: 6000 },
                { text: 'Notice your chest.', duration: 6000 },
                { text: 'Notice your belly.', duration: 6000 },
                { text: 'Notice your hips.', duration: 6000 },
                { text: 'Notice your legs.', duration: 6000 },
                { text: 'Notice your feet.', duration: 6000 },
                { text: 'Your whole body, here with you.', duration: 6000 },
                { text: 'Well done.', duration: 3000 },
            ]
        },
    ],

    // Grounding Sessions
    grounding: [
        {
            id: 'five-senses',
            title: '5-4-3-2-1 Grounding',
            duration: 180,
            category: 'grounding',
            description: 'Use your senses to feel present',
            steps: [
                { text: 'Let\'s ground you in the present moment.', duration: 5000 },
                { text: 'Look around. Find 5 things you can see.', duration: 12000 },
                { text: 'Good. Now find 4 things you can touch.', duration: 12000 },
                { text: 'Notice 3 things you can hear.', duration: 12000 },
                { text: 'Find 2 things you can smell.', duration: 10000 },
                { text: 'Notice 1 thing you can taste.', duration: 8000 },
                { text: 'You are here. You are present.', duration: 5000 },
                { text: 'Well done.', duration: 3000 },
            ]
        },
        {
            id: 'anchor',
            title: 'Find Your Anchor',
            duration: 90,
            category: 'grounding',
            description: 'Create a physical point of focus',
            steps: [
                { text: 'Press your feet into the floor.', duration: 6000 },
                { text: 'Feel the chair supporting you.', duration: 6000 },
                { text: 'Place your hand on your belly.', duration: 5000 },
                { text: 'Feel it rise as you breathe in...', duration: 5000, action: 'inhale' },
                { text: 'And fall as you breathe out...', duration: 6000, action: 'exhale' },
                { text: 'This is your anchor.', duration: 5000 },
                { text: 'You can return here anytime.', duration: 5000 },
                { text: 'Well done.', duration: 3000 },
            ]
        },
    ],
};

// Grounding exercise steps (for emergency grounding)
const GROUNDING_STEPS = [
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
];

// Helper function to get all sessions as flat array
function getAllSessions() {
    return [
        ...SESSIONS.micro,
        ...SESSIONS.body,
        ...SESSIONS.grounding,
    ];
}

// Helper function to get session by ID
function getSessionById(id) {
    return getAllSessions().find(s => s.id === id);
}

// Helper function to format duration
function formatDuration(seconds) {
    if (seconds < 60) {
        return `${seconds} sec`;
    }
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (secs === 0) {
        return `${mins} min`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Export for use in app.js
window.SESSIONS = SESSIONS;
window.GROUNDING_STEPS = GROUNDING_STEPS;
window.getAllSessions = getAllSessions;
window.getSessionById = getSessionById;
window.formatDuration = formatDuration;
