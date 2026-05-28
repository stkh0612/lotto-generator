// src/utils/AudioHelper.ts

let audioCtx: AudioContext | null = null

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
  }
  return audioCtx
}

/**
 * Synthesizes a simple sound using oscillator
 */
export function playSynthTone(frequency: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.1) {
  try {
    const ctx = getAudioContext()
    if (ctx.state === 'suspended') {
      ctx.resume()
    }
    
    const osc = ctx.createOscillator()
    const gainNode = ctx.createGain()
    
    osc.type = type
    osc.frequency.setValueAtTime(frequency, ctx.currentTime)
    
    gainNode.gain.setValueAtTime(volume, ctx.currentTime)
    // Smooth decay
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration)
    
    osc.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    osc.start()
    osc.stop(ctx.currentTime + duration)
  } catch (e) {
    console.warn('Audio synthesis failed', e)
  }
}

/**
 * Plays a retro lotto draw beep
 */
export function playDrawBeep() {
  playSynthTone(587.33, 0.12, 'triangle', 0.15) // D5 note
}

/**
 * Plays a happy victory chime sequence
 */
export function playVictoryChime() {
  const notes = [523.25, 659.25, 783.99, 1046.50] // C5, E5, G5, C6
  notes.forEach((freq, idx) => {
    setTimeout(() => {
      playSynthTone(freq, 0.35, 'sine', 0.15)
    }, idx * 120)
  })
}
