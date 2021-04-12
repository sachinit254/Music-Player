const musicContainer = document.querySelector('.music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// Song title
const songs = ['hey','summer','ukulele'];

// keep track of songs 
let songIndex = 1;

//Initially load song details into DOM
loadSong(songs[songIndex]);

//Update song details 
function loadSong(song){
    title.innerText = song;
    audio.src = `./music/${song}.mp3`;
    cover.src = `./image/${song}.jpg`;
}

function playSong(){
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}

function pauseSong(){
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    audio.pause();
}

function prevSong(){
    songIndex--;

    if(songIndex<0){
        songIndex = songs.length-1;
    }
    loadSong(songs[songIndex]);

    playSong();
}

function nextSong(){
    songIndex ++;

    if(songIndex>songs.length-1){
        songIndex = 0;
    }
    loadSong(songs[songIndex])

    playSong();
}

function updateProgress(e){
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime/duration)*100;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX/width)*duration;
}

//Event listeners
playBtn.addEventListener('click', () =>{
    const isPLaying = musicContainer.classList.contains('play');
    
    if(isPLaying){
        pauseSong();
    }else{
        playSong();
    }
});

// Change song events
 prevBtn.addEventListener('click', prevSong);
 nextBtn.addEventListener('click', nextSong);

 audio.addEventListener('timeupdate', updateProgress);

 progressContainer.addEventListener('click',setProgress);