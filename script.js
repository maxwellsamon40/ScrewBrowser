document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const audioUpload = document.getElementById('audioUpload');
    const fileName = document.getElementById('fileName');
    const audioPlayer = document.getElementById('audioPlayer');
    const audioPlayerContainer = document.getElementById('audioPlayerContainer');
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
const processBtn = document.getElementById('processBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const pitchControl = document.getElementById('pitchControl');
    const pitchValue = document.getElementById('pitchValue');
    const speedControl = document.getElementById('speedControl');
    const speedValue = document.getElementById('speedValue');
    const advancedToggle = document.getElementById('advancedToggle');
    const advancedOptions = document.getElementById('advancedOptions');
    const reverseAudio = document.getElementById('reverseAudio');
    const echoEffect = document.getElementById('echoEffect');
    const audioFormat = document.getElementById('audioFormat');
    const volumeControl = document.getElementById('volumeControl');
    const volumeValue = document.getElementById('volumeValue');
let audioContext;
    let audioBuffer;
    let modifiedAudioBuffer;
    let isPlaying = false;
    let audioSource;
    
    // Initialize audio context
    function initAudioContext() {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
    }
    // File upload handler
    audioUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        fileName.textContent = `Selected: ${file.name}`;
        fileName.classList.remove('hidden');
        
        const fileURL = URL.createObjectURL(file);
        audioPlayer.src = fileURL;
        audioPlayerContainer.classList.remove('hidden');
        playPauseBtn.disabled = false;
// Enable buttons
        playBtn.disabled = false;
        processBtn.disabled = false;
        
        // Load audio file into buffer
        const reader = new FileReader();
        reader.onload = function(e) {
            initAudioContext();
            audioContext.decodeAudioData(e.target.result)
                .then(buffer => {
                    audioBuffer = buffer;
                    console.log('Audio loaded successfully');
                })
                .catch(err => {
                    console.error('Error decoding audio data', err);
                });
        };
        reader.readAsArrayBuffer(file);
    });
    
    // Play button handler
    playBtn.addEventListener('click', function() {
        if (!audioBuffer) return;
        playAudio();
        playBtn.disabled = true;
    pauseBtn.disabled = false;
    isPlaying = true;
    feather.replace();
    });

    pauseBtn.addEventListener('click', function() {
        stopAudio();
        playBtn.disabled = false;
        pauseBtn.disabled = true;
        isPlaying = false;
        feather.replace();
    });
// Process button handler (now optional for format change)
    processBtn.addEventListener('click', function() {
        if (!audioBuffer) return;
        processAudio(false);
    });
// Download button handler
    downloadBtn.addEventListener('click', function() {
        if (!modifiedAudioBuffer) {
            alert('Please process the audio first!');
            return;
        }
        
        downloadAudio();
    });
    // Volume control handler
    volumeControl.addEventListener('input', function() {
        volumeValue.textContent = `${this.value}%`;
    });
    // Pitch control handler
    pitchControl.addEventListener('input', function() {
        pitchValue.textContent = parseFloat(this.value).toFixed(1);
        if (audioBuffer) {
            processAudio(true);
        }
    });

    // Speed control handler
    speedControl.addEventListener('input', function() {
        speedValue.textContent = `${this.value}x`;
        if (audioBuffer) {
            processAudio(true);
        }
    });

    // Volume control handler
    volumeControl.addEventListener('input', function() {
        volumeValue.textContent = `${this.value}%`;
        if (audioBuffer) {
            processAudio(true);
        }
    });

    // Checkbox handlers for real-time processing
    reverseAudio.addEventListener('change', function() {
        if (audioBuffer) {
            processAudio(true);
        }
    });

    echoEffect.addEventListener('change', function() {
        if (audioBuffer) {
            processAudio(true);
        }
    });
// Advanced options toggle
    advancedToggle.addEventListener('click', function() {
        advancedOptions.classList.toggle('hidden');
        const icon = this.querySelector('i');
        if (advancedOptions.classList.contains('hidden')) {
            icon.setAttribute('data-feather', 'chevron-down');
        } else {
            icon.setAttribute('data-feather', 'chevron-up');
        }
        feather.replace();
    });
    // Audio player elements
    const playPauseBtn = document.getElementById('playPauseBtn');
    const currentTimeDisplay = document.getElementById('currentTime');
    const durationDisplay = document.getElementById('duration');
    const progressBar = document.getElementById('progressBar');
    const progressContainer = document.querySelector('.progress-container');
    
    // Modified audio player elements
    const modifiedPlayPauseBtn = document.getElementById('modifiedPlayPauseBtn');
    const modifiedCurrentTimeDisplay = document.getElementById('modifiedCurrentTime');
    const modifiedDurationDisplay = document.getElementById('modifiedDuration');
    const modifiedProgressBar = document.getElementById('modifiedProgressBar');
    const modifiedProgressContainer = document.querySelectorAll('.progress-container')[1];
    const modifiedAudioPlayer = document.getElementById('modifiedAudioPlayer');
    const modifiedAudioPlayerContainer = document.getElementById('modifiedAudioPlayerContainer');
// Format time (seconds to MM:SS)
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    // Update progress bar
    function updateProgress() {
        if (audioPlayer.duration) {
            const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            progressBar.style.width = `${progressPercent}%`;
            currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
        }
    }
    
    // Set progress when clicked on progress bar
    progressContainer.addEventListener('click', function(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audioPlayer.duration;
        audioPlayer.currentTime = (clickX / width) * duration;
    });
    // Audio player time update
    audioPlayer.addEventListener('timeupdate', updateProgress);
    
    // Audio player loaded metadata
    audioPlayer.addEventListener('loadedmetadata', function() {
        durationDisplay.textContent = formatTime(audioPlayer.duration);
    });
    
    // Play/Pause button click
    playPauseBtn.addEventListener('click', function() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseBtn.innerHTML = '<i data-feather="pause" class="w-4 h-4"></i>';
        } else {
            audioPlayer.pause();
            playPauseBtn.innerHTML = '<i data-feather="play" class="w-4 h-4"></i>';
        }
        feather.replace();
    });
    
    // Audio ended
    audioPlayer.addEventListener('ended', function() {
        playPauseBtn.innerHTML = '<i data-feather="play" class="w-4 h-4"></i>';
        feather.replace();
    });

    // Modified audio player functions
    function updateModifiedProgress() {
        if (modifiedAudioPlayer.duration) {
            const progressPercent = (modifiedAudioPlayer.currentTime / modifiedAudioPlayer.duration) * 100;
            modifiedProgressBar.style.width = `${progressPercent}%`;
            modifiedCurrentTimeDisplay.textContent = formatTime(modifiedAudioPlayer.currentTime);
        }
    }

    // Set progress when clicked on modified progress bar
    modifiedProgressContainer.addEventListener('click', function(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = modifiedAudioPlayer.duration;
        modifiedAudioPlayer.currentTime = (clickX / width) * duration;
    });

    // Modified audio player time update
    modifiedAudioPlayer.addEventListener('timeupdate', updateModifiedProgress);
    
    // Modified audio player loaded metadata
    modifiedAudioPlayer.addEventListener('loadedmetadata', function() {
        modifiedDurationDisplay.textContent = formatTime(modifiedAudioPlayer.duration);
    });
    
    // Modified Play/Pause button click
    modifiedPlayPauseBtn.addEventListener('click', function() {
        if (modifiedAudioPlayer.paused) {
            // Pause main audio if it's playing
            if (isPlaying) {
                stopAudio();
                playBtn.disabled = false;
                pauseBtn.disabled = true;
                isPlaying = false;
            }
            modifiedAudioPlayer.play();
            modifiedPlayPauseBtn.innerHTML = '<i data-feather="pause" class="w-4 h-4"></i>';
        } else {
            modifiedAudioPlayer.pause();
            modifiedPlayPauseBtn.innerHTML = '<i data-feather="play" class="w-4 h-4"></i>';
        }
        feather.replace();
    });
// Modified audio ended
    modifiedAudioPlayer.addEventListener('ended', function() {
        modifiedPlayPauseBtn.innerHTML = '<i data-feather="play" class="w-4 h-4"></i>';
        feather.replace();
    });
// Audio playback functions
    function playAudio() {
        initAudioContext();
        stopAudio();
        
        // Pause modified audio player if it's playing
        if (!modifiedAudioPlayer.paused) {
            modifiedAudioPlayer.pause();
            modifiedPlayPauseBtn.innerHTML = '<i data-feather="play" class="w-4 h-4"></i>';
        }
        
        audioSource = audioContext.createBufferSource();
        audioSource.buffer = modifiedAudioBuffer || audioBuffer;
        audioSource.connect(audioContext.destination);
        audioSource.start();
        
        // Handle when audio ends
        audioSource.onended = function() {
            isPlaying = false;
            playBtn.disabled = false;
            pauseBtn.disabled = true;
            playPauseBtn.innerHTML = '<i data-feather="play" class="w-4 h-4"></i>';
            feather.replace();
        };
    }
function stopAudio() {
        if (audioSource) {
            audioSource.stop();
            audioSource.disconnect();
        }
    }
    // Audio processing functions
    function processAudio(isRealtime) {
initAudioContext();
        
        // Get volume value (0-1)
        const volume = parseFloat(volumeControl.value) / 100;
// Use the Web Audio API to modify the audio
        const offlineContext = new OfflineAudioContext(
            audioBuffer.numberOfChannels,
            audioBuffer.length,
            audioBuffer.sampleRate
        );
        
        const source = offlineContext.createBufferSource();
        source.buffer = audioBuffer;
        // Apply pitch shift (using playbackRate)
        const pitchValue = parseFloat(pitchControl.value);
        const semitoneRatio = Math.pow(2, pitchValue / 12);
// Apply speed change
        const speedValue = parseFloat(speedControl.value);
        
        source.playbackRate.value = speedValue * semitoneRatio;
        
        // Apply effects if selected
        let lastNode = source;
        
        if (reverseAudio.checked) {
            // Reverse audio
            const reverseNode = offlineContext.createScriptProcessor(4096, 1, 1);
            reverseNode.onaudioprocess = function(e) {
                const input = e.inputBuffer.getChannelData(0);
                const output = e.outputBuffer.getChannelData(0);
                for (let i = 0; i < input.length; i++) {
                    output[i] = input[input.length - i - 1];
                }
            };
            lastNode.connect(reverseNode);
            lastNode = reverseNode;
        }
        
        if (echoEffect.checked) {
            // Echo effect
            const delay = offlineContext.createDelay(2.0);
            delay.delayTime.value = 0.5;
            const feedback = offlineContext.createGain();
            feedback.gain.value = 0.6;
            
            lastNode.connect(delay);
            delay.connect(feedback);
            feedback.connect(delay);
            delay.connect(offlineContext.destination);
        }
        // Create gain node for volume control
        const gainNode = offlineContext.createGain();
        gainNode.gain.value = volume;
        
        lastNode.connect(gainNode);
        gainNode.connect(offlineContext.destination);
        source.start();
offlineContext.startRendering().then(function(renderedBuffer) {
            modifiedAudioBuffer = renderedBuffer;
            console.log('Audio processing complete');
            // Update UI
            if (!isRealtime) {
                processBtn.disabled = false;
                processBtn.innerHTML = '<i data-feather="refresh-cw" class="mr-2 inline"></i> Process';
                downloadBtn.disabled = false;
                feather.replace();
            }
// Create URL for modified audio
            const wavData = bufferToWav(modifiedAudioBuffer);
            const blob = new Blob([wavData], { type: 'audio/wav' });
            const url = URL.createObjectURL(blob);
            modifiedAudioPlayer.src = url;
            modifiedAudioPlayerContainer.classList.remove('hidden');
            // Play the processed audio if currently playing
            if (isPlaying || isRealtime) {
                stopAudio();
                playAudio();
            }
}).catch(function(err) {
            console.error('Rendering failed:', err);
            // Reset UI on error
            if (!isRealtime) {
                processBtn.disabled = false;
                processBtn.innerHTML = '<i data-feather="refresh-cw" class="mr-2 inline"></i> Process';
                feather.replace();
            }
});
    }
    
    // Audio download function
    function downloadAudio() {
        if (!modifiedAudioBuffer) return;
        
        let audioData;
        let mimeType;
        
        switch(audioFormat.value) {
            case 'mp3':
                // In a real app you would use a proper MP3 encoder library here
                audioData = bufferToWav(modifiedAudioBuffer); // Using WAV as fallback
                mimeType = 'audio/mpeg';
                break;
            case 'ogg':
                // In a real app you would use a proper OGG encoder library here
                audioData = bufferToWav(modifiedAudioBuffer); // Using WAV as fallback
                mimeType = 'audio/ogg';
                break;
            case 'flac':
                // In a real app you would use a proper FLAC encoder library here
                audioData = bufferToWav(modifiedAudioBuffer); // Using WAV as fallback
                mimeType = 'audio/flac';
                break;
            case 'aac':
                // In a real app you would use a proper AAC encoder library here
                audioData = bufferToWav(modifiedAudioBuffer); // Using WAV as fallback
                mimeType = 'audio/aac';
                break;
            case 'wav':
            default:
                audioData = bufferToWav(modifiedAudioBuffer);
                mimeType = 'audio/wav';
}
        
        const blob = new Blob([audioData], { type: mimeType });
const url = URL.createObjectURL(blob);
        
        // Create download link
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `modified_${audioUpload.files[0].name.split('.')[0]}.${audioFormat.value}`;
document.body.appendChild(a);
        a.click();
        
        // Clean up
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 100);
    }
    
    // Helper function to convert buffer to WAV
    function bufferToWav(buffer) {
        const numOfChan = buffer.numberOfChannels;
        const length = buffer.length * numOfChan * 2 + 44;
        const bufferArray = new ArrayBuffer(length);
        const view = new DataView(bufferArray);
        
        // Write WAV header
        writeString(view, 0, 'RIFF');
        view.setUint32(4, 36 + buffer.length * numOfChan * 2, true);
        writeString(view, 8, 'WAVE');
        writeString(view, 12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true);
        view.setUint16(22, numOfChan, true);
        view.setUint32(24, buffer.sampleRate, true);
        view.setUint32(28, buffer.sampleRate * 2 * numOfChan, true);
        view.setUint16(32, numOfChan * 2, true);
        view.setUint16(34, 16, true);
        writeString(view, 36, 'data');
        view.setUint32(40, buffer.length * numOfChan * 2, true);
        
        // Write the PCM samples
        let offset = 44;
        for (let i = 0; i < buffer.numberOfChannels; i++) {
            const channel = buffer.getChannelData(i);
            for (let j = 0; j < channel.length; j++) {
                const sample = Math.max(-1, Math.min(1, channel[j]));
                view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
                offset += 2;
            }
        }
        
        return bufferArray;
    }
    
    function writeString(view, offset, string) {
        for (let i = 0; i < string.length; i++) {
            view.setUint8(offset + i, string.charCodeAt(i));
        }
    }
    
    // Initialize feather icons
    feather.replace();
});