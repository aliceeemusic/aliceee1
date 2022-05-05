
const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const playlistChildrenEl = document.querySelectorAll('#playlist li a');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');
const songlist = document.querySelector('#songlist');
const playlist = document.querySelector('#playlist');


const songs = ['technicoloursupersong', 'ultraflowerpopsong','afakesprogress', 'superbrightneonlight', 'neverbetter','eye', 'musicfornotachoir','walkinghomealone', 'ifitmeansthatimnothappy', 'pin', 'pinkneonlight', 'heartbroken', 'popsongsforpornstars', 'breakthrough', 'variationinterlude', 'underthelights','boy', 'allilluse', 'hyperbandpopedit', 'summertimesong', 'argument', 'anti', 'strings', 'blueintothecity', 'settingup'];


let songIndex = 0;


playlistChildrenEl.forEach(
  childEl =>
  childEl.addEventListener('click', () => {
    // Your play function
    const isPlaying = musicContainer.classList.contains('play');
    isPlaying ? playSong() : playSong();
  })
);

loadSong(songs[songIndex]);

function loadSong(song) {

  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.png`;
  
}

function audioPlayer(){
    var currentSong = 0;
    $("#audio")[0].src = $("#playlist li a")[0];

    $("#audio")[0].pause();
    $("#playlist li a").click(function(e){
       e.preventDefault(); 
       $("#audio")[0].src = this;
       $("#audio")[0].play();
       
	  
       $("#playlist li").removeClass("current-song");
        currentSong = $(this).parent().index();
        $(this).parent().addClass("current-song");
    });

	audioPlayer.addEventListener('click', () => {
		const isPlaying = musicContainer.classList.contains('play');
	  
		if (isPlaying) {
		  pauseSong();
		} else {
		  playSong();
		}
	  });
    
    $("#audio")[0].addEventListener("ended", function(){
       currentSong++;
        if(currentSong == $("#playlist li a").length)
            currentSong = 0;
        $("#playlist li").removeClass("current-song");
        $("#playlist li:eq("+currentSong+")").addClass("current-song");
        $("#audio")[0].src = $("#playlist li a")[currentSong].href;
        $("#audio")[0].play();
    });

    
}
// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();

  
}
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}


function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}




// Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}


function DurTime (e) {
	const {duration,currentTime} = e.srcElement;
	var sec;
	var sec_d;

	let min = (currentTime==null)? 0:
	 Math.floor(currentTime/60);
	 min = min <10 ? '0'+min:min;


	function get_sec (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec = Math.floor(x) - (60*i);
					sec = sec <10 ? '0'+sec:sec;
				}
			}
		}else{
		 	sec = Math.floor(x);
		 	sec = sec <10 ? '0'+sec:sec;
		 }
	} 


  

	get_sec (currentTime,sec);

	// change currentTime DOM
	currTime.innerHTML = min +':'+ sec;

	// define minutes duration
	let min_d = (isNaN(duration) === true)? '0':
		Math.floor(duration/60);
	 min_d = min_d <10 ? '0'+min_d:min_d;


	 function get_sec_d (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec_d = Math.floor(x) - (60*i);
					sec_d = sec_d <10 ? '0'+sec_d:sec_d;
				}
			}
		}else{
		 	sec_d = (isNaN(duration) === true)? '0':
		 	Math.floor(x);
		 	sec_d = sec_d <10 ? '0'+sec_d:sec_d;
		 }
	} 

	
	get_sec_d (duration);


	durTime.innerHTML = min_d +':'+ sec_d;
		
};


playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});



// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);

// Time of song
audio.addEventListener('timeupdate',DurTime);



