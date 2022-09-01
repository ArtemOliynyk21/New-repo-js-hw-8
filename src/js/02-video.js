import Player from '@vimeo/player';
var throttle = require('lodash.throttle');

const iframe = document.querySelector('iframe');
const STORAGE_KEY = 'videoplayer-current-time';
const optimizeTrottle = throttle(onPlay, 1000);

const player = new Player(iframe)
player.on('timeupdate', optimizeTrottle)

function onPlay(data) {
    localStorage.setItem(STORAGE_KEY, data.seconds)
}

const currentTime = localStorage.getItem(STORAGE_KEY)

if (currentTime) {
    player.setCurrentTime(currentTime)
}

