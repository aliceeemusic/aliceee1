const bioText = [
    "thomas mcconville is a composer working in", "electronic and acoustic", "gallery installation", 
    "international festival announcement", "new concert hall performance", "aliceee /// mcconville", "apollo /// r&S records", 
    "SCHEMATIC RECORDS", "BBC Radio 1", "RTÉ Lyric / Radio France", "Plaid (Warp Records)", 
    "support from charli", "commissioned by city of culture", "iscm world music days 2025"
];

// --- GLITCH SYSTEM ---
function spawnGlitch() {
    const overlay = document.getElementById('glitch-overlay');
    if (!overlay) return;
    const div = document.createElement('div');
    div.className = 'glitch-fragment';
    div.innerText = bioText[Math.floor(Math.random() * bioText.length)];
    div.style.left = (Math.random() * 70 + 5) + 'vw';
    div.style.top = (Math.random() * 80 + 10) + 'vh';
    overlay.appendChild(div);
    setTimeout(() => { div.remove(); }, 1000);
}
setInterval(spawnGlitch, 50);

// --- MUSIC PLAYER SYSTEM ---
const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');

// Hijack playlist clicks
const links = document.querySelectorAll('.playlist li a');
links.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // STOPS PAGE RELOAD
        const src = link.getAttribute('href');
        audio.src = src;
        
        // Update active class
        document.querySelectorAll('.playlist li').forEach(li => li.classList.remove('current-song'));
        link.parentElement.classList.add('current-song');
        
        playSong();
    });
});

function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.replace('fa-play', 'fa-pause');
    audio.play();
}

function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.replace('fa-pause', 'fa-play');
    audio.pause();
}

playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
    isPlaying ? pauseSong() : playSong();
});

audio.addEventListener('timeupdate', (e) => {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
});

progressContainer.addEventListener('click', (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
});