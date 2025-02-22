document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');
    const audio = document.getElementById('audio');
    const playButton = document.querySelector('.play');
    const timeDisplay = document.querySelector('.time-display');
    const timeButtons = document.querySelectorAll('.time-select button');
    const soundButtons = document.querySelectorAll('.sound-picker button');
    let duration = 600; // default to 10 minutes
    let isPlaying = false;
    let timer;
    let currentSound = 'beach';

    playButton.addEventListener('click', togglePlayPause);
    timeButtons.forEach(button => button.addEventListener('click', setTime));
    soundButtons.forEach(button => button.addEventListener('click', changeSound));

    function togglePlayPause() {
        if (isPlaying) {
            video.pause();
            audio.pause();
            clearInterval(timer);
            playButton.textContent = 'Play';
        } else {
            video.play();
            audio.play();
            timer = setInterval(updateTime, 1000);
            playButton.textContent = 'Pause';
        }
        isPlaying = !isPlaying;
    }

    function setTime(event) {
        const id = event.target.id;
        if (id === 'smaller-mins') {
            duration = 120;
        } else if (id === 'medium-mins') {
            duration = 300;
        } else if (id === 'long-mins') {
            duration = 600;
        }
        resetTime();
    }

    function resetTime() {
        clearInterval(timer);
        timeDisplay.textContent = `${Math.floor(duration / 60)}:${duration % 60}`;
        if (isPlaying) {
            timer = setInterval(updateTime, 1000);
        }
    }

    function updateTime() {
        duration--;
        timeDisplay.textContent = `${Math.floor(duration / 60)}:${duration % 60}`;
        if (duration <= 0) {
            clearInterval(timer);
            video.pause();
            audio.pause();
            isPlaying = false;
            playButton.textContent = 'Play';
        }
    }

    function changeSound(event) {
        const id = event.target.id;
        if (id === 'beach') {
            currentSound = 'beach';
            video.src = 'videos/beach.mp4';
            audio.src = 'sounds/beach.mp3';
        } else if (id === 'rain') {
            currentSound = 'rain';
            video.src = 'videos/rain.mp4';
            audio.src = 'sounds/rain.mp3';
        }
        resetTime();
        if (isPlaying) {
            video.play();
            audio.play();
        }
    }
});
