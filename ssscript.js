let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const curr_track = new Audio();
const now_playing = document.querySelector('.now-playing');
const track_art = document.querySelector('.track-art');
const track_name = document.querySelector('.track-name');
const track_artist = document.querySelector('.track-artist');
const playpause_btn = document.querySelector('.playpause-track i');
const randomIcon = document.querySelector('.fa-random');
const seek_slider = document.querySelector('.seek_slider');
const volume_slider = document.querySelector('.volume_slider');
const curr_time = document.querySelector('.current-time');
const total_duration = document.querySelector('.total-duration');

const music_list = [

    { img: 'file:///C:/Users/hp/Downloads/Telegram%20Desktop/photo_2024-09-15_18-37-12.jpg', name: 'Falling Down', artist: 'Widcards', music: 'music/fallingdown.mp3' },
    { img: 'file:///C:/Users/hp/Downloads/Telegram%20Desktop/photo_2024-09-15_18-37-03.jpg', name: 'Faded', artist: 'Alan Walker', music: 'music/faded.mp3' },
    { img: 'file:///C:/Users/hp/Downloads/Telegram%20Desktop/photo_2024-09-15_18-36-46.jpg', name: 'Rather Be', artist: 'Clean Bandit', music: 'music/ratherbe.mp3' }

];

function loadTrack(index) {
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[index].music;
    curr_track.load();

    track_art.style.backgroundImage = `url(${music_list[index].img})`;
    track_name.textContent = music_list[index].name;
    track_artist.textContent = music_list[index].artist;
    now_playing.textContent = `Playing ${index + 1} of ${music_list.length}`;

    updateTimer = setInterval(setUpdate, 1000);
    curr_track.addEventListener('ended', nextTrack);
}

function playTrack() {
    curr_track.play();
    isPlaying = true;
    playpause_btn.classList.replace('fa-play-circle', 'fa-pause-circle');
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    playpause_btn.classList.replace('fa-pause-circle', 'fa-play-circle');
}

function playPauseTrack() {
    isPlaying ? pauseTrack() : playTrack();
}

function nextTrack() {
    track_index = isRandom ? Math.floor(Math.random() * music_list.length) : (track_index + 1) % music_list.length;
    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
    track_index = (track_index - 1 + music_list.length) % music_list.length;
    loadTrack(track_index);
    playTrack();
}

function reset() {
    curr_time.textContent = '00:00';
    total_duration.textContent = '00:00';
    seek_slider.value = 0;
}

function setUpdate() {
    if (!isNaN(curr_track.duration)) {
        const seekPosition = (curr_track.currentTime / curr_track.duration) * 100;
        seek_slider.value = seekPosition;

        const currentMinutes = Math.floor(curr_track.currentTime / 60);
        const currentSeconds = Math.floor(curr_track.currentTime % 60);
        const durationMinutes = Math.floor(curr_track.duration / 60);
        const durationSeconds = Math.floor(curr_track.duration % 60);

        curr_time.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
        total_duration.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
    }
}

// Initialize
loadTrack(track_index);
