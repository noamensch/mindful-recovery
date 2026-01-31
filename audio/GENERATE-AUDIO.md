# Generating Audio Files for Mindful Recovery

The app uses pre-recorded audio files for narration. This ensures consistent, calming voices that work on all devices without requiring users to install anything.

## File Structure

Audio files should be placed in:
```
audio/
  en/                    # English audio files
    one-breath-0.mp3
    one-breath-1.mp3
    one-breath-2.mp3
    ...
    grounding-0.mp3
    grounding-1.mp3
    ...
  he/                    # Hebrew audio files
    one-breath-0.mp3
    one-breath-1.mp3
    ...
```

## Naming Convention

- Session audio: `{session-id}-{step-index}.mp3`
- Grounding audio: `grounding-{step-index}.mp3`

Step index starts at 0.

## Option 1: Narakeet (Recommended)

[Narakeet](https://www.narakeet.com/) offers high-quality text-to-speech with natural voices.

1. Go to https://www.narakeet.com/
2. Create a script file with all the text
3. Select a calm, slow voice:
   - English: "Amy" or "Joanna" (slow, calm)
   - Hebrew: "Carmit" (Israeli Hebrew)
4. Set speech rate to slow (0.8-0.9x)
5. Export as MP3 files
6. Rename files to match the naming convention

## Option 2: ElevenLabs

[ElevenLabs](https://elevenlabs.io/) has very natural-sounding voices.

1. Go to https://elevenlabs.io/
2. Use the text-to-speech feature
3. Select a calm voice
4. Generate each line separately
5. Download and rename files

## Option 3: Google Cloud Text-to-Speech

More technical but offers WaveNet voices that sound natural.

1. Set up Google Cloud account
2. Use the Text-to-Speech API
3. Select WaveNet voices:
   - English: en-US-Wavenet-F (female) or en-US-Wavenet-D (male)
   - Hebrew: he-IL-Wavenet-A or he-IL-Wavenet-B

## Option 4: Record Human Voice

For the best experience, record a real person:
- Use a calm, slow speaking pace
- Record in a quiet environment
- Speak clearly with pauses between phrases
- Export as MP3 at 128kbps or higher

## Text to Record

See `audio-list.json` for the complete list of all text that needs to be recorded.

### Quick Reference - English Sessions

**one-breath (4 files: 0-3)**
- "Let's take one breath together."
- "Breathe in slowly..."
- "And breathe out slowly..."
- "That's it. Well done."

**three-breaths (8 files: 0-7)**
- "Let's take three breaths together."
- "First breath in..."
- "And out..."
- "Second breath in..."
- "And out..."
- "Third breath in..."
- "And out..."
- "Well done."

**grounding (6 files: 0-5)**
- "Take a slow breath. In through your nose... out through your mouth."
- "Feel your feet on the ground. Press them into the floor. Feel the support."
- "Look around you. Name 3 things you can see right now."
- "Listen. What sounds do you hear? Near or far?"
- "Touch something nearby. Notice its texture. Smooth? Rough? Warm? Cool?"
- "You are here. You are safe. Take one more slow breath."

## Audio Specifications

- Format: MP3
- Bitrate: 128kbps (minimum), 192kbps (recommended)
- Sample rate: 44100 Hz
- Channels: Mono (to reduce file size) or Stereo
- Duration: Keep each file short (3-10 seconds)

## Testing

After generating audio files, test by:
1. Opening the app
2. Starting a session
3. Verifying audio plays for each instruction
4. Testing both English and Hebrew

If audio doesn't play, check the browser console for errors.
