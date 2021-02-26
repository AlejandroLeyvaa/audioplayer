import imageSrc from './assets/images/sheika.png';
import songSrc from './assets/audios/Guardian-The-Legend-of-Zelda-Breath-of-the-Wild.mp3';

import './styles/styles.css';

const audio = document.querySelector('#audio');
const durationContainer = document.querySelector('.Duration-container');
const durationLoad = document.querySelector('.Duration-load');
const audioSrc = document.querySelector('.Audio-src');
const imageContainer = document.querySelector('.Image');
const modal = document.querySelector('.Modal');
const warn = document.querySelector('.Warn');
const play = document.querySelector('.Play');
const mute = document.querySelector('.Mute');
const next = document.querySelector('.Next');
const back = document.querySelector('.Back');
const close = document.querySelector('.Close');
const random = document.querySelector('.Random');
const upload = document.querySelectorAll('.Upload');
const showModal = document.querySelector('#Show-modal');


const player = {
  play: false,
};

let playlist = [];
let imageList = [];

let count = 1;

play.addEventListener('click', togglePlay);

window.addEventListener('load', () => {
  const song = './Guardian-The-Legend-of-Zelda-Breath-of-the-Wild.mp3';
  const image = './images/sheika.png';
  imageList.push(imageSrc);
  playlist.push(songSrc);
  imageContainer.setAttribute('src', imageList[0]);
  audio.setAttribute('src', playlist[0]);
});

function togglePlay() {
  if (!player.play) {
    setInterval(() => {
      durationLoad.style.width = `${audio.currentTime}px`;
    }, 100);

    player.play = true;
    audio.play();
    play.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    audio.pause();
    player.play = false;
    play.innerHTML = '<i class="fas fa-play"></i>';
  }
}

mute.addEventListener('click', () => {
  if (audio.muted) {
    audio.muted = false;
    mute.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else {
    audio.muted = true;
    mute.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
});

upload.forEach((button) => {
  button.addEventListener('change', (e) => {
    const accept = e.target.accept;
    const file = e.target.files[0];
    const src = window.URL.createObjectURL(file);
    console.log(accept);
    if (accept === 'image/*') {
      imageList.push(src);
    }
    if (accept === 'audio/*') {
      playlist.push(src);
    }
  });
});

showModal.addEventListener('click', () => {
  const modal = document.querySelector('.Modal');
  modal.style.display = 'flex';
});

close.addEventListener('click', () => {
  if (playlist.length === imageList.length) {
    modal.style.display = 'none';
  } else {
    console.log('Add an image and one song to close modal');
    warn.style.display = 'flex';
    setTimeout(() => {
      warn.style.display = 'none';
    }, 5000)
  }
});

next.addEventListener('click', (e) => {
  if (playlist.length === 1) {
    console.log('Playlist is empty');
  } else {
    if (count === playlist.length) {
      count -= 1;
    }
    togglePlay();
    audio.setAttribute('src', playlist[count]);
    imageContainer.setAttribute('src', imageList[count]);
    togglePlay();
    count += 1;
  }
});

back.addEventListener('click', () => {
  if (playlist.length === 1) {
    console.log('Playlist is empty');
  } else {
    count -= 1;
    if (count === 0) {
      count = 1;
    }
    togglePlay();
    audio.setAttribute('src', playlist[count - 1]);
    imageContainer.setAttribute('src', imageList[count - 1]);
    togglePlay();
  }
});
