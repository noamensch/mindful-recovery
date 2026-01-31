# UI Improvements for Head Trauma Patients

Based on TBI-specific cognitive challenges: attention deficits, processing speed, memory impairment, decision fatigue, sensory sensitivity, and visual processing issues.

---

## 1. Reduce Visual Complexity

### Current Problem
The home screen shows multiple elements competing for attention: header, Ground Me button, sessions list, progress cards, bottom nav.

### Recommendations

**A. Single-focus screens**
Instead of showing everything, show ONE primary action per screen.

```
HOME SCREEN (simplified):

┌─────────────────────────────┐
│                             │
│      [large calm image      │
│       or solid color]       │
│                             │
│     "Ready to practice?"    │
│                             │
│   ┌─────────────────────┐   │
│   │                     │   │
│   │    START SESSION    │   │
│   │                     │   │
│   └─────────────────────┘   │
│                             │
│      "or choose below"      │
│          ↓                  │
└─────────────────────────────┘
```

**B. Progressive disclosure**
- Hide the session library by default
- Show only ONE recommended session
- "More sessions" is a secondary, smaller link
- Settings accessible but not prominent

**C. Remove bottom navigation during sessions**
Navigation is a distraction. During a session, only show:
- The instruction
- Pause button
- Stop button (labeled "I need to stop")

---

## 2. Eliminate Decision Fatigue

### Current Problem
User must choose which session to do. Choice = cognitive load.

### Recommendations

**A. "Just Start" default**
```
┌─────────────────────────────┐
│                             │
│        START NOW            │
│      (One Breath - 30s)     │
│                             │
└─────────────────────────────┘
         ↑
   One big button that starts
   the simplest session immediately
```

**B. Smart suggestions based on time of day**
- Morning: "Good morning. Start with one breath?"
- After lunch: "Afternoon pause?"
- Evening: "Wind down with a body scan?"

**C. Remove progress stats from home**
Stats create pressure. Move to a separate "My Progress" screen that users can optionally visit. Home should be calming, not achievement-focused.

---

## 3. Improve Session Player

### Current Problems
- Breathing circle animation may be overstimulating
- Progress bar creates time pressure
- Multiple controls visible

### Recommendations

**A. Minimal session screen**
```
┌─────────────────────────────┐
│                             │
│                             │
│                             │
│    "Feel your feet on       │
│     the floor."             │
│                             │
│                             │
│                             │
│         [PAUSE]             │
│                             │
│    tap anywhere to stop     │
└─────────────────────────────┘
```

- ONE instruction, large text, centered
- Remove breathing circle by default (optional in settings)
- Remove progress bar (creates anxiety about time)
- Remove time remaining display
- Single large PAUSE button
- "Tap anywhere to stop" - forgiving exit

**B. Add "Repeat" functionality**
TBI patients often need to hear instructions multiple times.
```
┌─────────────────────────────┐
│                             │
│    "Feel your feet on       │
│     the floor."             │
│                             │
│    [🔄 Say again]           │
│                             │
└─────────────────────────────┘
```

**C. Longer pauses between instructions**
Current: 5-6 seconds between steps
Recommended: 8-10 seconds minimum, with option for "extra slow" mode (15 seconds)

---

## 4. Ground Me Button - Always Accessible

### Current Problem
Ground Me is only on home screen. During a panic moment, user may not be able to navigate.

### Recommendations

**A. Floating Ground Me button on ALL screens**
```
┌─────────────────────────────┐
│                    [●]←─────│── Always visible
│                             │   small, unobtrusive
│      [session content]      │   but always there
│                             │
│                             │
└─────────────────────────────┘
```

**B. Simplified grounding flow**
Current: 6 steps requiring "Next" button press
Better: Auto-advance with generous timing, or single continuous audio

**C. Physical anchor option**
"Hold something in your hand" - encourage a physical grounding object

---

## 5. Color & Visual Adjustments

### Current Problems
- Blue color scheme may feel "cold"
- Pure white backgrounds can cause glare
- Multiple colors compete for attention

### Recommendations

**A. Warmer, softer palette**
```css
/* Current */
--color-background: #f7fafc;  /* Cool gray */
--color-primary: #2c5282;     /* Bold blue */

/* Recommended */
--color-background: #faf9f7;  /* Warm off-white */
--color-primary: #5d6b5d;     /* Soft sage green */
--color-accent: #8b7355;      /* Warm brown */
```

Earthy, muted tones are:
- Less stimulating
- Associated with nature/calm
- Easier on light-sensitive eyes

**B. Reduce color variety**
Use only 2-3 colors total:
- Background (warm off-white)
- Text (dark gray, not pure black)
- One accent color for buttons

**C. No pure white or pure black**
```css
/* Instead of */
color: #000000;
background: #ffffff;

/* Use */
color: #2d3748;      /* Softer dark */
background: #faf9f7; /* Softer light */
```

---

## 6. Typography Improvements

### Current Problems
- Font sizes may still be too small
- Line height could be more generous
- Instruction text could be simpler

### Recommendations

**A. Larger base sizes**
```css
/* Current */
--font-size-base: 18px;
--font-size-large: 22px;

/* Recommended minimum */
--font-size-base: 20px;
--font-size-large: 26px;
--font-size-instruction: 32px; /* Session instructions */
```

**B. Simpler language in sessions**
```
/* Current */
"Notice if they feel warm or cool."

/* Better */
"Are your hands warm? Or cool?"

/* Current */
"Just notice. No need to change anything."

/* Better */
"Just feel them. That's all."
```

**C. One sentence per screen**
Never show more than one instruction/sentence at a time.

---

## 7. Touch Targets & Motor Considerations

### Current Problem
48px touch targets may be too small for users with motor difficulties (common with TBI).

### Recommendations

**A. Larger touch targets**
```css
/* Current */
--touch-target: 48px;

/* Recommended */
--touch-target: 64px;
--button-height: 72px;
```

**B. Generous tap zones**
Make the tappable area larger than the visual button:
```css
.session-card {
    padding: 24px; /* More padding = larger tap area */
}
```

**C. Avoid edges of screen**
Keep interactive elements away from screen edges where accidental taps happen.

---

## 8. Memory Support Features

### Recommendations

**A. "Welcome back" context**
When app opens, show what happened last time:
```
┌─────────────────────────────┐
│                             │
│      Welcome back.          │
│                             │
│   Last time you did         │
│   "Three Breaths"           │
│                             │
│   [Do it again]             │
│   [Try something new]       │
│                             │
└─────────────────────────────┘
```

**B. Session summary**
After completing, show clear summary:
```
┌─────────────────────────────┐
│                             │
│         Done ✓              │
│                             │
│    You just completed       │
│    "Feel Your Hands"        │
│    1 minute                 │
│                             │
│    Total practices: 12      │
│                             │
│         [Done]              │
└─────────────────────────────┘
```

**C. Physical reminders integration**
Offer printable cards:
- "Place this card where you'll see it"
- Simple visual reminder to practice
- QR code to open app directly

---

## 9. Error Prevention & Forgiveness

### Recommendations

**A. No timeouts**
Never automatically close, log out, or lose progress.

**B. Confirm destructive actions**
```
"Clear all progress?"

[Keep my progress]  [Yes, clear it]
       ↑
  Make the safe option
  more prominent
```

**C. Easy recovery**
If user accidentally exits a session:
```
"Continue where you left off?"
[Yes, continue]  [Start over]
```

---

## 10. Audio Improvements

### Recommendations

**A. Voice characteristics**
- Slower speech rate (0.7x - 0.8x normal)
- Longer pauses between sentences (3-4 seconds)
- Warm, calm voice (not robotic TTS if possible)
- Consistent voice throughout (don't switch voices)

**B. No background music by default**
Music adds cognitive load. Make it opt-in, not opt-out.

**C. Gentle audio cues**
- Soft chime when session starts
- Soft tone when session ends
- No jarring sounds ever

---

## 11. Caregiver Mode

### New Feature Suggestion

Add a simple "Caregiver Mode" toggle that:
- Shows clearer labels ("Help [Patient Name] practice")
- Adds "Guide them through" option (caregiver reads instructions aloud)
- Provides simple tips: "Sit with them. Stay calm. Don't rush."

---

## Implementation Priority

### High Priority (Do First)
1. Simplify home screen to single action
2. Remove progress bar from session player
3. Add "Repeat instruction" button
4. Make Ground Me accessible from all screens
5. Increase touch targets to 64px

### Medium Priority
6. Implement warmer color palette
7. Slow down session pacing
8. Add "Welcome back" context
9. Simplify session language

### Lower Priority (Nice to Have)
10. Printable reminder cards
11. Caregiver mode
12. Custom audio recordings (replace TTS)

---

## Testing Recommendations

Before finalizing:
1. **Test with actual TBI patients** in your GF's unit
2. **Test with occupational therapists** for clinical input
3. **Test in hospital environment** (fluorescent lighting, distractions)
4. **Test on various devices** (old phones, tablets)
5. **Test with screen readers** for accessibility

Key questions to ask during testing:
- "What feels confusing?"
- "What feels overwhelming?"
- "Can you find the stop button quickly?"
- "Does this feel calming or stressful?"
