let URLList = JSON.parse(localStorage.getItem('URLList'));
const url = window.location.href.split("/")
URLList[8][0] = document.title
URLList[8][1] = url[url.length - 1]
localStorage.setItem("URLList",JSON.stringify(URLList))

let misstakeCounter=0
let next_status = 0
let Qcomment = false
let isOn = true;
let Subcomment = false
const next_button = document.getElementById("next_button")
const messageElement = document.getElementById("message-text");
const commentsList = ["問題を表示するね!","解けたら右の解答欄に入力して、\n「解答する」ボタンを押してね!\n見にくいときは左上の印刷ボタンから問題を印刷してね"]
let finFlag = false
let commentFlag = 0
let Maincomment = true
let replay_button_disabled = true
let next_button_disabled = true
document.getElementById("answer").disabled = true
messageElement.style.visibility = "visible"
messageElement.style.opacity = 0
let nextURL = ""

const data_checkURL = URLList[9][1]

async function checkURLFunction(){

	const res_checkURL = await fetch('/checkURL', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ data_checkURL })
	});

	const checkURL = await res_checkURL.json();

	return checkURL.message

}

window.addEventListener('load',async ()=>{
	if(await checkURLFunction()){
		document.getElementById("answer").value = URLList[8][2]
		document.getElementById("answer").disabled = true
		next_button.style.backgroundColor = "#05aa9084"
		next_button_disabled = false
		next_button.innerText = "Fへ行く⇨"
		next_status = 2
		next_button.addEventListener("click",()=>{
			window.location.href = `/${data_checkURL}`
		})
	}
	typeWriter("comment-text",commentsList[commentFlag],100)
})

const replay_button = document.getElementById("replay_button")
replay_button.addEventListener("click",async () =>{
	if(!replay_button_disabled){
		replay_button.style.backgroundColor = "#cccccc84"
		replay_button_disabled = true
		finFlag = false
		commentFlag = 0
		Maincomment = true
		Qcomment = false
		document.getElementById("questionImg").style.visibility = "hidden"

		if(!(await checkAnswer())){
			next_status = 0
		}

		if(next_status == 0){
			document.getElementById("answer").style.backgroundColor = "#cccccc84"
			document.getElementById("answer").disabled = true
			next_button.style.backgroundColor = "#cccccc84"
			next_button_disabled = true
		}
		
		typeWriter("comment-text",commentsList[commentFlag],100)
		document.body.style.background= "url('Bj7bJUOh/background.jpg') no-repeat center center fixed"; // 黒色に透明度をつけて暗転
		document.body.style.backgroundSize = "cover"
		document.getElementById("rangelImg").style.visibility = "visible"
	}

})

function typeWriter(elementId, text, speed) {
	document.getElementById(elementId).innerHTML = null
	let i = 0;  // 文字のインデックス
	const element = document.getElementById(elementId);
	// テキストを1文字ずつ処理
	async function type() {

		if(!(await checkAnswer())){
			next_status = 0
		}
	  if (i < text.length) {
		// 改行の場合は、brタグを挿入
		if (text.charAt(i) === '\n') {
		  element.innerHTML += '<br>';
		} else {
		  // 改行以外の場合は通常の文字を追加
		  element.innerHTML += text.charAt(i);
		}
		i++;
		type_Timeout = setTimeout(type, speed);  // speedの間隔で次の文字を表示
	  }else if(Subcomment){


	  }else if(Maincomment){
		
		finFlag = true
		if (commentsList.length-1 > commentFlag ){
			messageElement.style.opacity = 1;  // 透明度を1にすることでフェードイン	
		}else{
			replay_button.style.backgroundColor = "#05aa9084"
			next_button.style.backgroundColor = "#05aa9084"
			replay_button_disabled = false
			next_button_disabled = false
			if (next_status == 0){
				document.getElementById("answer").style.backgroundColor = "#05aa9084"
				document.getElementById("answer").disabled = false
			}
		}
		if(next_status == 1 && await checkAnswer()){
			next_button.innerText = "Fへ行く⇨"
		}
		
	  }else if(Qcomment){
		finFlag = true
		if(next_status == 1 && await checkAnswer()){
			messageElement.style.opacity = 1;
		}else if(next_status == 2 && await checkAnswer()){
			next_button_disabled = false
			next_button.style.backgroundColor = "#05aa9084"
			next_button.innerText = "Fへ行く⇨"
		}
		
	  }
	} 
  
	type();  // タイプを開始
}

document.addEventListener('keydown', async event => {
	if (event.key == "Enter"){
		comment()
	}
})

document.getElementById("comment").addEventListener("click", async ()=>{
	if (finFlag){
		comment()
	}else{
		
		if(Maincomment && isOn){
			clearTimeout(type_Timeout)
			finFlag = true
			document.getElementById("comment-text").innerHTML = commentsList[commentFlag].split("\n").join('<br>')
			if (commentsList.length-1 > commentFlag ){
				messageElement.style.opacity = 1;  // 透明度を1にすることでフェードイン	
			}else{
				replay_button.style.backgroundColor = "#05aa9084"
				next_button.style.backgroundColor = "#05aa9084"
				replay_button_disabled = false
				next_button_disabled = false
				if (next_status == 0){
					document.getElementById("answer").style.backgroundColor = "#05aa9084"
					document.getElementById("answer").disabled = false
				}
			}
			if(next_status == 1 && await checkAnswer()){
				next_button.innerText = "Fへ行く⇨"
			}
		}
	}
})

async function comment(){
	if(!(await checkAnswer())){
		next_status = 0
	}

	if (commentsList.length-1 > commentFlag && finFlag && Maincomment && isOn){
		commentFlag ++
		

		if(commentFlag == commentsList.length-1){
			document.getElementById("questionImg").style.visibility = "visible"
		}
		typeWriter("comment-text",commentsList[commentFlag],100);
		messageElement.style.opacity = 0

		finFlag = false
		
	}
	if(next_status == 1 && finFlag && await checkAnswer() && isOn){
		typeWriter("comment-text","次は「Fへ行く」ボタンを押してFへ行こう。",100);
		Qcomment = true
		messageElement.style.opacity = 0
		next_status = 2
		finFlag = false
	}
}



async function toggleSwitch() {
  const lever = document.getElementById("lever");
  const knob = document.querySelector(".lever-knob");
  const statusText = document.getElementById("status");
  if (isOn) {
    // OFF状態に戻す
    lever.style.backgroundColor = "#555";
    knob.style.left = "5px";
    statusText.textContent = "OFF";
    statusText.classList.remove("on");
    statusText.classList.add("off");
	document.body.style.background= "rgba(0, 0, 0, 1)"; // 黒色に透明度をつけて暗転
	document.getElementById("rangelImg").style.visibility = "hidden"
	document.getElementById("questionImg").style.visibility = "hidden"
	Subcomment = true
	messageElement.style.opacity = 0
	clearTimeout(type_Timeout)
	
	typeWriter("comment-text","電気をつけて!",100);
	next_button.style.backgroundColor = "#cccccc84"
	document.getElementById("answer").style.backgroundColor = "#cccccc84"
	next_button_disabled = true
	document.getElementById("answer").disabled = true
	replay_button.style.backgroundColor = "#cccccc84"
	replay_button_disabled = true
} else {
    // ON状態にする
    lever.style.backgroundColor = "#444";
    knob.style.left = "85px";
    statusText.textContent = "ON";
    statusText.classList.remove("off");
    statusText.classList.add("on");
	document.body.style.background= "url('Bj7bJUOh/background.jpg') no-repeat center center fixed"; // 黒色に透明度をつけて暗転
	document.body.style.backgroundSize = "cover"
	document.getElementById("rangelImg").style.visibility = "visible"
	if (commentFlag == commentsList.length-1){
		document.getElementById("questionImg").style.visibility = "visible"
	}
	
		
	clearTimeout(type_Timeout)
	
	if(await checkURLFunction()){
		next_button.style.backgroundColor = "#05aa9084"
		next_button_disabled = false
	}

	Subcomment = false
	if (!finFlag && !Qcomment){
		typeWriter("comment-text",commentsList[commentFlag],100);
	}else if(finFlag && !Qcomment){
		if(commentFlag != commentsList.length-1){
			messageElement.style.opacity = 1
		}else{
			next_button.style.backgroundColor = "#05aa9084"
			next_button_disabled = false
			if (!(await checkURLFunction())){
				document.getElementById("answer").style.backgroundColor = "#05aa9084"
				document.getElementById("answer").disabled = false
			}
		}

		document.getElementById("comment-text").innerHTML = commentsList[commentFlag].split("\n").join('<br>')
	}else{
		if(!(await checkAnswer())){
			next_status = 0
		}

		if(next_status == 0){
			next_button.style.backgroundColor = "#05aa9084"
			next_button_disabled = false
			document.getElementById("answer").style.backgroundColor = "#05aa9084"
			document.getElementById("answer").disabled = false
			if (misstakeCounter == 1){
				if(!finFlag){
					typeWriter("comment-text","残念!",100);
				}else{
					document.getElementById("comment-text").innerHTML = "残念!".split("\n").join('<br>')
				}
			}
		}else if(next_status == 1 && await checkAnswer()){
			if(!finFlag){
				typeWriter("comment-text","正解!",100);
			}else{
				messageElement.style.opacity = 1
				document.getElementById("comment-text").innerHTML = "正解!".split("\n").join('<br>')
			}
		}else if(next_status == 2 && await checkAnswer()){
			if(!finFlag){
				typeWriter("comment-text","次は「Fへ行く」ボタンを押してFへ行こう。",100);
			}else{
				next_button.style.backgroundColor = "#05aa9084"
				next_button_disabled = false
				document.getElementById("comment-text").innerHTML = "次は「Fへ行く」ボタンを押してFへ行こう。".split("\n").join('<br>')
			}
		}
			
			
		
		
	}
  }

  isOn = !isOn;
}

async function checkAnswer(){
	const answer = document.getElementById("answer").value
	if (answer != ""){
		const response = await fetch('/answer/STEP1_E', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ answer })
		});

		return response.ok
	}
}

next_button.addEventListener("click", async () =>{
	if (!next_button_disabled){

		if(!(await checkAnswer())){
			next_status = 0
		}

		if (next_status == 0){
			const answer = document.getElementById("answer").value
			if (answer != ""){
				replay_button_disabled = true
				replay_button.style.backgroundColor = "#cccccc84"
				response = await fetch('/answer/STEP1_E', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ answer })
				});
			}

			const result = await response.json();
	
			nextURL = result.message

			const URLList = JSON.parse(localStorage.getItem('URLList'));
			
			if (response.ok) {
				URLList[8][2] = answer
				URLList[9][0] = "F"
				URLList[9][1] = nextURL
				typeWriter("comment-text","正解!",100);
				messageElement.style.opacity = 0;
				finFlag = false
				next_status = 1
				next_button.innerText = "Fへ行く⇨"
				Maincomment = false
				Qcomment = true
				next_button.style.backgroundColor = "#cccccc84"
				document.getElementById("answer").style.backgroundColor = "#cccccc84"
				next_button_disabled = true
				document.getElementById("answer").disabled = true
			} else {
				if (finFlag){
					typeWriter("comment-text","残念!",100);
					finFlag =false
					Maincomment = false
					Qcomment = true
					misstakeCounter = 1
				}
				
			}
			localStorage.setItem("URLList",JSON.stringify(URLList))
		}else if(next_status == 2 && await checkAnswer()){
			if(Qcomment){
				if(finFlag){
					
					window.location.href = `/${nextURL}`
				}
			}else{
				window.location.href = `/${nextURL}`
			}
		}
	}
})