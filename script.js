const songs = [
  {
    name: "Minecraft",
    src: "https://archive.org/download/08-minecraft_202302/08%20-%20Minecraft.mp3",
    class: "minecraft"
  }
];

let i = 0;

const audio = document.getElementById("audio");
const vinyl = document.getElementById("vinyl");
const arm = document.getElementById("arm");
const deck = document.getElementById("deck");
const playBtn = document.getElementById("play");

function loadSong(){
  const song = songs[i];
  audio.src = song.src;
  deck.className = "deck " + song.class;
}

function updateUI(){
  if(audio.paused){
    vinyl.classList.remove("spin");
    arm.classList.remove("active");
  } else {
    vinyl.classList.add("spin");
    arm.classList.add("active");
  }
}

playBtn.onclick = async () => {
  if(!audio.src) loadSong();

  if(audio.paused){
    await audio.play().catch(()=>{});
  } else {
    audio.pause();
  }

  updateUI();
};

audio.onplay = updateUI;
audio.onpause = updateUI;
