window.addEventListener('load',()=>{
	const URLList = JSON.parse(localStorage.getItem('URLList'));
	const URL = window.location.href.split("/")
	URLList[0][0] = document.title
	URLList[0][1] = URL[URL.length - 1]
	localStorage.setItem("URLList",JSON.stringify(URLList))
})

const next_button = document.getElementById("next_button")

next_button.addEventListener("click",()=>{
		window.location.href = "/5t0HO0j5"
})