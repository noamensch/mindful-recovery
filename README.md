# Mindful Recovery

A web-based mindfulness app designed for people with head trauma / traumatic brain injury (TBI).

## The Problem

Mainstream mindfulness apps (Calm, Headspace, etc.) are designed for neurotypical users and often fail people with TBI because:

- Sessions are too long for limited attention spans
- Interfaces are visually complex and overwhelming
- No accommodation for cognitive fatigue
- Habit formation features assume normal memory function
- Audio/visual elements may trigger sensory sensitivities

## Target Audience

**Primary:** Patients in head trauma recovery (inpatient and outpatient)
**Secondary:** Occupational therapists, caregivers, family members supporting recovery

### Common Challenges for TBI Patients

| Challenge | Impact on Mindfulness Practice |
|-----------|-------------------------------|
| Attention deficits | Difficulty completing standard 10-20 min sessions |
| Memory impairment | Forgetting to practice, forgetting instructions |
| Cognitive fatigue | Mental exhaustion limits session capacity |
| Sensory sensitivity | Overwhelmed by music, visuals, notifications |
| Processing speed | Need slower pacing, simpler instructions |
| Emotional dysregulation | May need grounding before/during practice |

---

## Proposed Features

### 1. Micro-Sessions (Core Differentiator)

**The Problem:** Standard apps start at 5-10 minutes. Many TBI patients can only sustain focus for 1-3 minutes initially.

**Solution:**
- **"One Breath" mode** - Literally one guided breath (30 seconds)
- **1-minute sessions** - Single focus exercises
- **Graduated progression** - 1 min → 2 min → 3 min → 5 min over weeks/months
- **"Stop anytime" design** - Every 30 seconds is a natural exit point with positive reinforcement

### 2. Cognitive Load Reduction

**Interface Design:**
- Single action per screen
- High contrast, large text
- Minimal animations (or toggle off)
- No cluttered menus - linear, simple navigation
- Audio-first with optional visuals

**Session Design:**
- One instruction at a time
- Longer pauses between instructions
- Repetition of key phrases
- Simple, concrete language (no metaphors or abstract concepts)

### 3. Adaptive Reminders (Memory Support)

**The Problem:** "I forgot" is the #1 reason habits fail, especially with memory impairment.

**Solutions:**
- **Contextual linking** - "After breakfast", "When you sit in your chair" rather than clock times
- **Caregiver notifications** - Option to notify a support person to prompt practice
- **Visual cues** - Printable cards/posters for physical environment
- **Persistent gentle reminders** - Not pushy, but present (widget, home screen presence)
- **"Snooze, don't dismiss"** - Reminders return rather than disappearing

### 4. Sensory Customization

Allow users to control:
- **Audio:** Voice only / Music / Nature sounds / Silence with text
- **Voice speed:** Slow / Normal / Very slow
- **Visuals:** High contrast / Dark mode / Minimal mode / Audio-only mode
- **Notifications:** Sounds / Vibration only / Silent badge / Off

### 5. Progress That Matters

**Avoid:** Streaks that break and cause discouragement

**Use Instead:**
- **Total sessions completed** (lifetime, can never go down)
- **"Return" celebrations** - "Welcome back! Every practice counts"
- **Weekly snapshots** - Gentle summary, not judgment
- **Therapist dashboard** (optional) - OT can see progress for treatment planning

### 6. Grounding & Crisis Support

TBI patients may experience:
- Sudden anxiety or panic
- Disorientation
- Emotional flooding

**Features:**
- **"Ground Me Now" button** - Always accessible, immediate grounding exercise
- **5-4-3-2-1 sensory exercise** - Guided through senses
- **Simple breathing pacer** - Visual expanding circle, no audio required
- **Emergency contacts** - Quick access to support person

### 7. Caregiver/Therapist Integration

- **Shared progress view** - Patient can share access with OT or family
- **Assignment feature** - OT can "prescribe" specific sessions
- **Notes/observations** - Patient or caregiver can log how they felt
- **Session library for OTs** - Curated content for clinical use

### 8. Offline-First Design

**Why:** Hospital WiFi is unreliable, data plans may be limited

- Core sessions work offline
- Sync when connected
- Low bandwidth mode

---

## Session Content Ideas

### Beginner Track (Week 1-4)
1. One breath awareness
2. Feeling your hands
3. Listening to one sound
4. Noticing your feet on the floor
5. Three slow breaths

### Body Awareness Track
1. Face relaxation
2. Shoulder drop
3. Hand scan
4. Seated body awareness (simplified body scan)

### Emotional Regulation Track
1. Naming the feeling
2. Where is it in your body?
3. Breathing with the feeling
4. Letting it be there

### Daily Life Integration
1. Mindful sip of water
2. Mindful first bite
3. Mindful hand washing
4. Pause at doorways

---

## Habit Formation Strategies

### Why Habit Formation is Hard with TBI

1. **Prospective memory impairment** - Forgetting to do future actions
2. **Reduced dopamine response** - Less reward sensation
3. **Executive function deficits** - Difficulty initiating tasks
4. **Fatigue** - Less capacity for "extra" activities

### Strategies for This Population

| Strategy | Implementation |
|----------|---------------|
| **Piggyback on existing routines** | "After morning medication" prompts |
| **External cues** | Physical objects, environmental reminders |
| **Social accountability** | Caregiver involvement, shared progress |
| **Tiny habits** | Start with 30-second sessions, build slowly |
| **Immediate reward** | Satisfying completion sounds, encouraging messages |
| **Remove friction** | One-tap start, no login required to practice |
| **Forgiveness built in** | No streak pressure, "every time counts" messaging |

---

## Technical Considerations

### Web-Based Benefits
- No app store approval needed
- Works on any device with a browser
- Easy to update content
- Can add to home screen (PWA)
- Low barrier for hospital IT approval

### PWA (Progressive Web App) Features
- Offline capability via service workers
- Push notifications (with permission)
- Home screen installation
- Full-screen mode

### Accessibility Requirements
- WCAG 2.1 AA compliance minimum
- Screen reader compatible
- Keyboard navigation
- Reduced motion option
- High contrast mode

### Suggested Tech Stack
- **Frontend:** React or Vue (simple, well-documented)
- **Styling:** Tailwind CSS (utility-first, easy to customize)
- **Audio:** Howler.js or native Web Audio API
- **Storage:** IndexedDB for offline data
- **Backend (optional):** Supabase or Firebase for sync/auth
- **Hosting:** Vercel, Netlify, or GitHub Pages

---

## MVP Scope Suggestion

### Phase 1: Core Experience
- [ ] 5-10 micro-sessions (30 sec to 2 min)
- [ ] Simple audio player with pause/resume
- [ ] "Ground Me Now" emergency button
- [ ] Basic progress tracking (local storage)
- [ ] Clean, accessible interface
- [ ] Offline support

### Phase 2: Habit Support
- [ ] Customizable reminders
- [ ] Routine linking ("after breakfast")
- [ ] Caregiver notification option
- [ ] Progress sharing

### Phase 3: Clinical Integration
- [ ] Therapist dashboard
- [ ] Session assignment
- [ ] Notes/observations
- [ ] Usage analytics for treatment planning

---

## Questions to Explore with Your GF (the OT)

1. What's the typical attention span of patients in her unit?
2. What mindfulness exercises work best in her classes?
3. What barriers does she see to patients practicing independently?
4. Would therapists want a dashboard to track patient progress?
5. Are there specific triggers/sensitivities common in her patients?
6. What language/terminology do patients respond to best?
7. Are there existing hospital systems this would need to integrate with?

---

## Competitive Landscape

| App | Strengths | Gaps for TBI |
|-----|-----------|--------------|
| Calm | Beautiful, extensive library | Too long, complex UI, no accessibility focus |
| Headspace | Good instruction, animations | Animations may be distracting, no micro-sessions |
| Insight Timer | Free, lots of content | Overwhelming choices, no curation for TBI |
| Breathwrk | Focused on breathing | Limited content, not designed for cognitive impairment |

**Opportunity:** No major player focuses on cognitive accessibility or the TBI population specifically.

---

## Next Steps

1. **User research** - Talk to patients and OTs about needs
2. **Content creation** - Record 5-10 pilot sessions with appropriate pacing
3. **Prototype** - Build basic web app with core sessions
4. **Test in clinical setting** - Get feedback from your GF's patients
5. **Iterate** - Refine based on real-world use

---

## Resources

- [Brain Injury Association of America](https://www.biausa.org/)
- [WCAG Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Tiny Habits by BJ Fogg](https://tinyhabits.com/) - Evidence-based habit formation
- [Trauma-Sensitive Mindfulness](https://www.traumasensitivemindfulness.com/)
