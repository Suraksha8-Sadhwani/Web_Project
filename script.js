const music = new Audio('songs/1.mp3');

//create Array
const songs = [
    {
        id: "1",
        songName: `Mana k hum yar nhi <br>
        <div class="subtitle">Pariniti</div>`,
        poster: "covers/1.jpg",
    },
    {
        id: "2",
        songName: `kabhi kabhi adti <br>
        <div class="subtitle">AR.Rehman</div>`,
        poster: "covers/2.jpg",
    },
    {
        id: "3",
        songName: `give me some sunshine <br>
        <div class="subtitle">Suraj Jagan</div>`,
        poster: "covers/3.jpg",
    },
    {
        id: "4",
        songName: `kesariya tera ishq hai <br>
        <div class="subtitle">Arijit</div>`,
        poster: "covers/4.jpg",
    },
    {
        id: "5",
        songName: `apna har pal ese jiyo <br>
        <div class="subtitle">Sanket</div>`,
        poster: "covers/5.jpg",
    },
    {
        id: "6",
        songName: `yaroon ki yaari <br>
        <div class="subtitle">Idol Fam</div>`,
        poster: "covers/6.jpg",
    },
    {
        id: "7",
        songName: `Ek Pyar Ka Nagma <br>
        <div class="subtitle">Sanam</div>`,
        poster: "covers/7.jpg",
    },
    {
        id: "8",
        songName: `Pi Jaun <br>
        <div class="subtitle">Farhan</div>`,
        poster: "covers/8.jpg",
    },
    {
        id: "9",
        songName: `Iktara  <br>
        <div class="subtitle">Trivedi</div>`,
        poster: "covers/9.jpg",
    },
    {
        id: "10",
        songName: `Jab Koi Baat <br>
        <div class="subtitle">Atif</div>`,
        poster: "covers/10.jpg",
    },
    {
        id: "11",
        songName: `Kabira <br>
        <div class="subtitle">Arijit</div>`,
        poster: "covers/11.jpg",
    },
    {
        id: "12",
        songName: `Main Rahoon Ya <br>
        <div class="subtitle">Armaan</div>`,
        poster: "covers/12.jpg",
    },
    {
        id: "13",
        songName: `Mere Humsafar Original <br>
        <div class="subtitle">Yashal</div>`,
        poster: "covers/13.jpg",
    },
    {
        id: "14",
        songName: `Namo Namo <br>
        <div class="subtitle">Amitabh B</div>`,
        poster: "covers/14.jpg",
    },
    {
        id: "15",
        songName: `Tum Se Hi Lyrcial <br>
        <div class="subtitle"> Mohit </div>`,
        poster: "covers/15.jpg",
    },
]

Array.from(document.getElementsByClassName('songItem')).forEach((element, i) =>{
    element.getElementsByTagName('img')[0].src = songs[i].poster;
    element.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
})

let masterPlay = document.getElementById('masterPlay');
masterPlay.addEventListener('click',() =>{
    if (music.paused || music.currentTime <= 0) {
        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        gif.style.opacity = 1;  
    }
    else{
        music.pause();
        masterPlay.classList.remove('bi-pause-fill');
        masterPlay.classList.add('bi-play-fill');
        gif.style.opacity = 0;
    }
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('playListPlay')).forEach((element) =>{
        element.classList.remove('bi-pause-circle-fill'); 
        element.classList.add('bi-play-circle-fill');
    })
}

const makeAllBackgrounds = () => {
    Array.from(document.getElementsByClassName('songItem')).forEach((element) =>{
        element.style.background = 'rgb(105, 105, 170, 0)';
})
}

let index = 0;
let poster_master_play = document.getElementById('poster_master_play');
let title = document.getElementById('title');
Array.from(document.getElementsByClassName('playListPlay')).forEach((element) =>{
    element.addEventListener('click',(e) =>{
        index = parseInt(e.target.id);
        makeAllPlays();
        e.target.classList.remove('bi-play-circle-fill');
        e.target.classList.add('bi-pause-circle-fill');
        music.src = `songs/${index}.mp3`;
        poster_master_play.src = `covers/${index}.jpg`;
        music.play();
        gif.style.opacity = 1;
        let song_title = songs.filter((ele) =>{
            return ele.id == index;
        })
        song_title.forEach(ele =>{
            let {songName} = ele;
            title.innerHTML = songName;
        })
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        gif.style.opacity = 1; 

        music.addEventListener('ended',()=> {
            masterPlay.classList.remove('bi-pause-fill');
            masterPlay.classList.add('bi-play-fill');
           gif.style.opacity = 0;
        })
        makeAllBackgrounds();
        Array.from(document.getElementsByClassName('songItem'))[`${index+1}`].style.background = 'rgb(105, 105, 170, .1)';
    })
})

let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];


music.addEventListener('timeupdate', () => {
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    let min = Math.floor(music_dur/60);
    let sec = Math.floor(music_dur%60);
    if(sec < 10){
        sec = `0${sec}`;
    }

    currentEnd.innerText = `${min}:${sec}`;

    let min1 = Math.floor(music_curr/60);
    let sec1 = Math.floor(music_curr%60);
    if(sec1 < 10){
        sec1 = `0${sec1}`;
    }

    currentStart.innerText = `${min1}:${sec1}`;

    let progressbar = parseInt((music.currentTime / music.duration) * 100);
    seek.value = progressbar;
    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;
})

seek.addEventListener('change', () => {
    music.currentTime = seek.value * music.duration /100;
})

music.addEventListener('ended',() => {
    masterPlay.classList.add('bi-play-fill');
    masterPlay.classList.remove('bi-pause-fill');
    gif.style.opacity = 1;
})

let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_dot = document.getElementById('vol_dot');
let vol_bar = document.getElementsByClassName('vol_bar')[0];

vol.addEventListener('change',() => {
    if(vol.value == 0){
       vol_icon.classList.remove('bi-volume-down-fill'); 
       vol_icon.classList.add('bi-volume-mute-fill'); 
       vol_icon.classList.remove('bi-volume-up-fill'); 
    } 
    if(vol.value > 0){
        vol_icon.classList.add('bi-volume-down-fill'); 
        vol_icon.classList.remove('bi-volume-mute-fill'); 
        vol_icon.classList.remove('bi-volume-up-fill'); 
     } 
     if(vol.value > 50){
        vol_icon.classList.remove('bi-volume-down-fill'); 
        vol_icon.classList.remove('bi-volume-mute-fill'); 
        vol_icon.classList.add('bi-volume-up-fill'); 
     } 

     let vol_a = vol.value;
     vol_bar.style.width = `${vol_a}%`;
     vol_dot.style.left = `${vol_a}%`;
     music.volume = vol_a /100;
})

let back = document.getElementById('back');
let next = document.getElementById('next');
back.addEventListener('click', () => {
    index -= 1;
    if(index < 1){
        index = Array.from(document.getElementsByClassName('songItem')).length;
    }
    music.src = `songs/${index}.mp3`;
        poster_master_play.src = `covers/${index}.jpg`;
        music.play();
        gif.style.opacity = 1;
        let song_title = songs.filter((ele) =>{
            return ele.id == index;
        })
        song_title.forEach(ele =>{
            let {songName} = ele;
            title.innerHTML = songName;
        })
        makeAllPlays();
        document.getElementById(`${index}`).classList.remove('bi-play-circle-fill');
        document.getElementById(`${index}`).classList.add('bi-pause-circle-fill');
        makeAllBackgrounds();
        Array.from(document.getElementsByClassName('songItem'))[`${index+1}`].style.background = 'rgb(105, 105, 170, .1)';
})

next.addEventListener('click', () => {
    index -= 0;
    index += 1;
    if(index > Array.from(document.getElementsByClassName('songItem')).length){
        index = 1;
    }
    music.src = `songs/${index}.mp3`;
        poster_master_play.src = `covers/${index}.jpg`;
        music.play();
        gif.style.opacity = 1;
        let song_title = songs.filter((ele) =>{
            return ele.id == index;
        })
        song_title.forEach(ele =>{
            let {songName} = ele;
            title.innerHTML = songName;
        })
        makeAllPlays();
        document.getElementById(`${index}`).classList.remove('bi-play-circle-fill');
        document.getElementById(`${index}`).classList.add('bi-pause-circle-fill');
        makeAllBackgrounds();
        Array.from(document.getElementsByClassName('songItem'))[`${index+1}`].style.background = 'rgb(105, 105, 170, .1)';
})

let left_scroll = document.getElementById('left_scroll');
let right_scroll = document.getElementById('right_scroll');
let pop_song = document.getElementsByClassName('pop_song')[0];

left_scroll.addEventListener('click',() =>{
    pop_song.scrollLeft -= 330;
})

right_scroll.addEventListener('click',() =>{
    pop_song.scrollLeft += 330;
})

let left_scrolls = document.getElementById('left_scrolls');
let right_scrolls = document.getElementById('right_scrolls');
let item = document.getElementsByClassName('item')[0];

left_scrolls.addEventListener('click',() =>{
    item.scrollLeft -= 330;
})

right_scrolls.addEventListener('click',() =>{
    item.scrollLeft += 330;
})


