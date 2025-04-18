const prologueVideo = document.getElementById("prologueVideo") 
prologueVideo.mute = false
prologueVideo.addEventListener("ended",()=>{
	document.getElementById("buttons").hidden = false
})
const replay_button = document.getElementById("replay_button")
replay_button.addEventListener("click",() =>{
	prologueVideo.currentTime = 0
	prologueVideo.play()
})

const prologue_button = document.getElementById("prologue_button")

prologue_button.addEventListener("click",()=>{
	console.log(1)
	window.location.href = "/FcxKopx0"
})