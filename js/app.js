

document.getElementById('year').textContent = new Date().getFullYear();

let audioContext;
let oscillator;
let filter;
let noiseBufferSource;

document.getElementById('a').addEventListener('hover', startLoFi);
document.getElementById('a').addEventListener('click', stopLoFi);

function startLoFi() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Create oscillator for a base melody
    oscillator = audioContext.createOscillator();
    oscillator.type = 'triangle'; // Lo-fi tends to use softer waveforms like triangle or sine
    oscillator.frequency.setValueAtTime(150, audioContext.currentTime); // A lower tone
    oscillator.detune.setValueAtTime(-1200, audioContext.currentTime); // Detune for Lo-Fi effect

    // Create a low-pass filter to get that muffled Lo-Fi sound
    filter = audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, audioContext.currentTime); // Cutting off higher frequencies for warmth

    // Add some noise for that vintage sound
    const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 2, audioContext.sampleRate);
    let output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < output.length; i++) {
        output[i] = Math.random() * 2 - 1; // White noise
    }

    noiseBufferSource = audioContext.createBufferSource();
    noiseBufferSource.buffer = noiseBuffer;
    noiseBufferSource.loop = true;

    // Connect everything together
    oscillator.connect(filter);
    filter.connect(audioContext.destination);
    noiseBufferSource.connect(audioContext.destination);

    // Start the sounds
    oscillator.start();
    noiseBufferSource.start();
}

function stopLoFi() {
    if (oscillator) {
        oscillator.stop();
    }
    if (noiseBufferSource) {
        noiseBufferSource.stop();
    }
    if (audioContext) {
        audioContext.close();
    }
}