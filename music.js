// LOXIDASH MUSIC UPDATE

(async function(){

const musicButton=document.createElement("button");
musicButton.textContent="🎵 LOXIDASH MUSIC";
musicButton.style.position="absolute";
musicButton.style.top="15px";
musicButton.style.right="15px";
musicButton.style.zIndex="10";

document.getElementById("game").appendChild(musicButton);

musicButton.onclick=async()=>{

let old=document.getElementById("musicPanel");
if(old)old.remove();

const panel=document.createElement("div");
panel.id="musicPanel";
panel.className="screen";

panel.innerHTML=`
<div class="panel">
<h1 class="logo">LOXIDASH MUSIC</h1>
<div id="songs">Načítám songy...</div>
<audio id="musicAudio" controls style="width:100%"></audio>
<button id="closeMusic">ZAVŘÍT</button>
</div>`;

document.getElementById("game").appendChild(panel);

document.getElementById("closeMusic").onclick=()=>panel.remove();

try{

const response=await fetch("songs/update.json?"+Date.now());
const data=await response.json();
const list=document.getElementById("songs");

list.innerHTML="";

(data.songs||[]).forEach(song=>{

const ready=Date.now()>=new Date(song.release).getTime();

const button=document.createElement("button");
button.textContent=ready?"▶ "+song.title:"🔒 "+song.title;
button.disabled=!ready;

button.onclick=()=>{
const audio=document.getElementById("musicAudio");
audio.src=song.file;
audio.play();
};

list.appendChild(button);

});

}catch(e){
document.getElementById("songs").textContent="Nepodařilo se načíst songy.";
}

};

})();
