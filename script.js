const songs = [
  {
    name: "1 - Chill",
    src: "https://lambda.vgmtreasurechest.com/soundtracks/restaurant-tycoon-2-roblox-gamerip-2021/bchfeelt/01.%20Classical.mp3",
    class: "chill"
  },
  {
    name: "2 - Restaurant",
    src: "https://lambda.vgmtreasurechest.com/soundtracks/restaurant-tycoon-2-roblox-gamerip-2021/adomsbgb/08.%20Slow%20Piano.mp3",
    class: "restaurant"
  },
  {
    name: "3 - Ocean 🌊",
    src: "https://nu.vgmtreasurechest.com/soundtracks/fortnite-music-packs-gamerip-2017/iyrrfbre/1-08.%20Coral%20Chorus.mp3",
    class: "ocean"
  },
  {
    name: "4 - Minecraft",
    src: "https://archive.org/download/08-minecraft_202302/08%20-%20Minecraft.mp3",
    class: "minecraft"
  }
];

let i = 0;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const vinyl = document.getElementById("vinyl");
const arm = document.getElementById("arm");
const deck = document.getElementById("deck");
const progress = document.getElementById("progress");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

function loadSong(index){
  const song = songs[index];
  audio.src = song.src;
  audio.load();
  title.textContent = song.name;
  deck.className = "deck " + song.class;
  progress.value = 0;
}

/* FORCE SPIN UPDATE */
function updateUI(){
  if(audio.paused){
    vinyl.classList.remove("spin");
    arm.classList.remove("active");
    playBtn.textContent = "▶";
  } else {
    vinyl.classList.add("spin");
    arm.classList.add("active");
    playBtn.textContent = "⏸";
  }
}

playBtn.onclick = async () => {
  if(!audio.src) loadSong(i);

  if(audio.paused){
    await audio.play().catch(()=>{});
  } else {
    audio.pause();
  }

  updateUI(); // 🔥 FORCE update
};

nextBtn.onclick = async () => {
  i = (i+1) % songs.length;
  loadSong(i);
  await audio.play().catch(()=>{});
  updateUI();
};

prevBtn.onclick = async () => {
  i = (i-1+songs.length) % songs.length;
  loadSong(i);
  await audio.play().catch(()=>{});
  updateUI();
};

audio.onplay = updateUI;
audio.onpause = updateUI;

audio.ontimeupdate = () => {
  if(audio.duration){
    progress.value = (audio.currentTime / audio.duration) * 100;
  }
};
