var data = {
    title:[
        "Eminem - Lose Your self",
        "ADELE - Skyfall",
        "Wiz Khalifa feat. Charlie Puth - See You Again",
        "18 Survivor - Eye of the Tiger"
        
    ],

    song:[
        "music/Eminem - Lose Your self.mp3",
        "music/ADELE - Skyfall.mp3",
        "music/Wiz Khalifa feat. Charlie Puth - See You Again (feat. Charlie Puth).mp3",
        "music/18 Survivor - Eye of the Tiger.mp3"
    ],

    poster:[
        "music/images/8mile.jpeg",
        "music/images/007.jpg",
        "music/images/ff7.jpg",
        "music/images/rocky.jpg"
    ]
}

var title = document.getElementById("title");
var srcMusic = document.getElementById("srcMusic");
var srcImage = document.getElementById("srcImage");

var nam = title.value.trim();
var mus = srcMusic.value.trim();
var img = srcImage.value.trim();



function enter(){
    data.title.push(title.value);
    data.song.push(srcMusic.value);
    data.poster.push(srcImage.value);
    console.log(title.value);
    console.log(srcMusic.value);
    console.log(srcImage.value);
}


var song = new Audio ()

// console.log(song);

window.onload = function () {
    playSong()    
}



var currentSong = 0

function playSong(n) {
song.src = data.song[currentSong];
let songTitle = document.getElementById("songTitle");
songTitle.textContent = data.title[currentSong];
let img = document.getElementById("row1");


img.style.backgroundImage = "url(" + data.poster[currentSong] + ")";
let main = document.getElementById("main")
main.style.backgroundImage = "url(" + data.poster[currentSong] + ")";
song.play();
}


  
song.controls = true;
song.load();

song.onloadeddata = function(){
    var audDuration = song.duration;
    var curTime = song.currentTime;
    
    
    if(audDuration%60<10){
        var time = Math.floor(audDuration/60)+':0'+Math.round(audDuration % 60) ;
    }else{
        var time = Math.floor(audDuration/60)+':'+Math.round(audDuration % 60) ;
    }
    if(curTime%60<10){
        var curTime = Math.floor(curTime/60)+':0'+Math.round( curTime % 60);
    }else{
        var curTime = Math.floor(curTime/60)+':'+Math.round( curTime % 60);
    }
    
    songTime.innerHTML ="<b>"+ curTime + " / " + time + "</b>";
}
  



function playOrPauseSong() {
let play = document.getElementById("play")
//console.log(play);

if (song.paused) {
song.play();
play.src = "images/pause.png" //pause
} else {
song.pause();
play.src = "images/play-button-arrowhead.png" //play
}
}

function prev(){
    if(currentSong > 0){
        currentSong -= 1;
        playSong();
        song.pause();
        play.src = "images/play-button-arrowhead.png";
        fill.style.width = 0+"%";
    }
    else if(currentSong <= 0){
        currentSong += data.title.length - 1; 
        playSong();
        song.pause();
        play.src = "images/play-button-arrowhead.png";
        fill.style.width = 0+"%";
    }
}

function next(){
    if(currentSong < data.title.length-1){
        currentSong += 1;
        playSong();
        song.pause();
        play.src = "images/play-button-arrowhead.png";
        fill.style.width = 0+"%";
    }
    else if(currentSong >= data.title.length-1){
        currentSong -= data.title.length - 1; 
        playSong();
        song.pause();
        play.src = "images/play-button-arrowhead.png";
        fill.style.width = 0+"%";
    }
}

let fill = document.querySelector("#fill");
let songTime = document.getElementById("currentTime");

function updateCurrentTime(a){
    var {duration, currentTime} = a.srcElement;
    var progressPercent = (currentTime/duration) * 100;
    fill.style.width = `${progressPercent}%`

    
    if(duration%60<10){
        var time = Math.floor(duration/60)+':0'+Math.round(duration % 60) ;
    }else{
        var time = Math.floor(duration/60)+':'+Math.round(duration % 60) ;
    }
    if(currentTime%60<10){
        var curTime = Math.floor(currentTime/60)+':0'+Math.round( currentTime % 60);
    }else{
        var curTime = Math.floor(currentTime/60)+':'+Math.round( currentTime % 60);
    }
    
    songTime.innerHTML ="<b>"+ curTime + " / " + time + "</b>";
}

song.addEventListener("timeupdate", updateCurrentTime);


var handle = document.querySelector(".handle");

function setCurrentTime(a){
    var width = this.clientWidth;
    var clickPosX = a.offsetX;
    var duration = song.duration;
    song.currentTime = (clickPosX/width) * duration;
}

handle.addEventListener("click", setCurrentTime);


function nextAuto(){
    if(currentSong < data.title.length-1){
        currentSong += 1;
        playSong();
    }
    else if(currentSong >= data.title.length-1){
        currentSong -= data.title.length - 1; 
        playSong();
    }
}
song.addEventListener("ended", nextAuto);



function decrease(){
    if(song.volume > 0){
        song.volume -= 0.1;
    }  
}

let mute = document.getElementById("mute");

function muted(){
    if(song.muted){
        song.muted = false;
        console.log("unmute");
        mute.src = "images/volume.png";
    }
    else{
        song.muted = true;
        mute.src = "images/volume-mute.png"
        console.log("mute");
    }
}

function increase(){
    if(song.volume < 1){
        song.volume += 0.1;
    }
}