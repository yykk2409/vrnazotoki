let URLList = JSON.parse(localStorage.getItem('URLList'));
const url = window.location.href.split("/")
URLList[13][0] = document.title
URLList[13][1] = url[url.length - 1]
localStorage.setItem("URLList",JSON.stringify(URLList))

let misstakeCounter=0
let next_status = 0
let Qcomment = false
let isOn = true;
let Subcomment = false
const next_button = document.getElementById("next_button")
const messageElement = document.getElementById("message-text");
document.getElementById("questionImg").style.visibility = "visible"
const commentsList = [
	"[ランゲル]から通信あり",
	"こちらランゲル。聞こえる？",
	"今、地上に戻っている途中なんだけど、\n目の前の壁を壊さないと、先に進めないから、\n左上のボタンから遠隔操作で\n壁破壊のコマンドを送ってほしいんだ。",
	"コマンドの操作方法",
	"ありがとう。これで先に進めるよ。また地上についたら連絡するね。",
	"通信終了",
	"[ランゲル]から通信あり",
	"こちらランゲル。聞こえる？",
	"無事地上についたよ。\n	途中いろいろあったけど、僕の能力をできる限り使って\nなんとかたどり着くことができたよ。",
	"僕の能力は、メンテナンスルームに戻ったら\n全て回復して、通信もできることになったよ。",
	"それじゃあ、状況を伝えるけど、\n君たちが地上に戻るには難しい状況だったよ。\nまず、いくつか落とし穴が空いていて、\n歩いての脱出は無理そうだった。",
	"それから、地上まで階段は繋がっていたけれど、\nダンジョンの構成が全く変わっていて\n各階の順番も、方角も前とは違っていたよ。",
	"僕の頭脳でも脱出するための方法は\n見つけられなかったけど、\n脱出のヒントは見つけることができたよ。",
	"今、それを送ったよ",
	"なにか僕にできることであれば何でも協力するからね！"
]
let finFlag = false
let commentFlag = 0
let Maincomment = true
let replay_button_disabled = true
let next_button_disabled = true
document.getElementById("answer").disabled = true
messageElement.style.visibility = "visible"
messageElement.style.opacity = 0
let nextURL = ""

const data_checkURL = URLList[14][1]

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
		document.getElementById("answer").value = URLList[13][2]
		document.getElementById("answer").disabled = true
		next_button.style.backgroundColor = "#05aa9084"
		next_button_disabled = false
		next_button.innerText = "次へ⇨"
		next_status = 1
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
		document.body.style.background= "url('r8RSLqHD/background.jpg') no-repeat center center fixed"; // 黒色に透明度をつけて暗転
		document.body.style.backgroundSize = "cover"
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
			next_button.innerText = "次へ⇨"
		}
		
	  }else if(Qcomment){
		finFlag = true
		if(next_status == 1 && await checkAnswer()){
			next_button_disabled = false
			next_button.style.backgroundColor = "#05aa9084"
			next_button.innerText = "次へ⇨"
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
				next_button_disabled = false
				next_button.style.backgroundColor = "#05aa9084"
				next_button.innerText = "次へ⇨"
			}
		}
	}
})

async function comment(){
	if(!(await checkAnswer())){
		next_status = 0
	}

	if(commentFlag >= 0){
		document.getElementById("comment-text").style.color = "#f5603b"
	}else{
		document.getElementById("comment-text").style.color = "white"
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
	document.body.style.background= "url('r8RSLqHD/background.jpg') no-repeat center center fixed"; // 黒色に透明度をつけて暗転
	document.body.style.backgroundSize = "cover"
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
					typeWriter("comment-text","キーワードが違います。",100);
				}else{
					document.getElementById("comment-text").innerHTML = "キーワードが違います。".split("\n").join('<br>')
				}
			}
		}else if(next_status == 1 && await checkAnswer()){
			if(!finFlag){
				typeWriter("comment-text","解除成功",100);
			}else{
				messageElement.style.opacity = 1
				document.getElementById("comment-text").innerHTML = "解除成功".split("\n").join('<br>')
				next_button.style.backgroundColor = "#05aa9084"
				next_button_disabled = false
			}
		}
	}
  }

  isOn = !isOn;
}

async function checkAnswer(){
	const answer = document.getElementById("answer").value
	if (answer != ""){
		const response = await fetch('/answer/STEP2', {
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
				response = await fetch('/answer/STEP2', {
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
				URLList[13][2] = answer
				URLList[14][0] = "ランゲルを助けに!"
				URLList[14][1] = nextURL
				typeWriter("comment-text","解除成功",100);
				messageElement.style.opacity = 0;
				finFlag = false
				next_status = 1
				next_button.innerText = "次へ⇨"
				Maincomment = false
				Qcomment = true
				next_button.style.backgroundColor = "#cccccc84"
				document.getElementById("answer").style.backgroundColor = "#cccccc84"
				next_button_disabled = true
				document.getElementById("answer").disabled = true
			} else {
				if (finFlag){
					typeWriter("comment-text","キーワードが違います。",100);
					finFlag =false
					Maincomment = false
					Qcomment = true
					misstakeCounter = 1
				}
				
			}
			localStorage.setItem("URLList",JSON.stringify(URLList))
		}else if(next_status == 1 && await checkAnswer()){
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

function openConsole() {
	const width = 600;
	const height = 300;

	// 現在の画面サイズから中央座標を計算
	const left = (window.screen.width - width) / 2;
	const top = (window.screen.height - height) / 2;

	const features = `width=${width},height=${height},left=${left},top=${top},resizable=no`;

	const win = window.open('/r8RSLqHD/console.html', 'CommandPrompt', features);

	if (!win) {
		alert("ポップアップがブロックされました。ブラウザの設定を確認してください。");
	}
}