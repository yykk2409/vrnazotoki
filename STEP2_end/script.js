let URLList = JSON.parse(localStorage.getItem('URLList'));
const url = window.location.href.split("/")
URLList[12][0] = document.title
URLList[12][1] = url[url.length - 1]
localStorage.setItem("URLList",JSON.stringify(URLList))

let misstakeCounter=0
let next_status = 0
let Qcomment = false
let isOn = true;
let Subcomment = false
const next_button = document.getElementById("next_button")
const messageElement = document.getElementById("message-text");
const commentsList = [
	"助けに来てくれてありがとう！",
	"無事にたどり着けて良かった！\n通信機能が壊れて、途中から通信できなくなっちゃった。\nでも、扉が開いて謎の霧が晴れたら、\n通信機能も回復したよ。\n謎の霧が通信妨害していたみたい。",
	"これで地上に戻れるね。さあ、一緒に戻ろう!",
	"うわっ!地震だ!",
	"すごい揺れだったね\n何かが崩れるような音もしていたね。\n危険があるかもしれないから、先に地上に行って\n状況を確認してくるね。",
	"少し待ってて"
]
let finFlag = false
let commentFlag = 0
let Maincomment = true
let replay_button_disabled = true
let next_button_disabled = true
messageElement.style.visibility = "visible"
messageElement.style.opacity = 0
let nextURL = ""

const data_checkURL = URLList[13][1]

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
const replay_button = document.getElementById("replay_button")
replay_button.addEventListener("click",() =>{
	if(!replay_button_disabled){
		replay_button.style.backgroundColor = "#cccccc84"
		replay_button_disabled = true
		finFlag = false
		commentFlag = 0
		typeWriter("comment-text",commentsList[commentFlag],100)
	}

})

next_button.addEventListener("click",()=>{
	if(!next_button_disabled){
		window.location.href = "/r8RSLqHD"
	}
	
})

function typeWriter(elementId, text, speed) {
	document.getElementById("comment-text").innerHTML = null
	let i = 0;  // 文字のインデックス
	const element = document.getElementById(elementId);
  
	// テキストを1文字ずつ処理
	function type() {
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

	  }else if(commentFlag != 3){
		
		finFlag = true
		if (commentsList.length-1 > commentFlag ){
			messageElement.style.opacity = 1;  // 透明度を1にすることでフェードイン
		}else{
			replay_button.style.backgroundColor = "#05aa9084"
			next_button.style.backgroundColor = "#05aa9084"
			replay_button_disabled = false
			next_button_disabled = false
		}
		
	  }
	} 
  
	type();  // タイプを開始
}

window.addEventListener('load',()=>{
	typeWriter("comment-text",commentsList[commentFlag],100)
})

document.addEventListener('keydown', event => {
	if (event.key == "Enter"){
		comment()
	}
})

document.getElementById("comment").addEventListener("click", ()=>{
	if (finFlag){
		comment()
	}else if(!Subcomment && commentFlag != 3){
		clearTimeout(type_Timeout)
		document.getElementById("comment-text").innerHTML = commentsList[commentFlag].split("\n").join('<br>')
		finFlag = true
		if (commentsList.length-1 > commentFlag ){
			messageElement.style.opacity = 1;  // 透明度を1にすることでフェードイン
		}else{
			replay_button.style.backgroundColor = "#05aa9084"
			next_button.style.backgroundColor = "#05aa9084"
			replay_button_disabled = false
			next_button_disabled = false
		}
	}
})

function comment(){

	if(commentFlag == 2 && isOn){
		const body = document.body;
		body.style.backgroundSize = "110%"
		let x = 0;
		let y = 0;

		document.getElementById("audio").play()

		// 揺れ幅と速度
		const intensity = 5; // 揺れの強さ（ピクセル）
		const speed = 50; // 揺れの速度（ミリ秒）

		// 背景を揺らす関数
		function shakeBackground() {
			// ランダムに揺れる方向を計算
			x = (Math.random() - 8) * intensity * 2;
			y = (Math.random() - 8) * intensity * 2;

			// CSS の background-position を変更
			body.style.backgroundPosition = `${x}px ${y}px`;
		}

		// 一定間隔で揺らす
		const interval = setInterval(shakeBackground, speed);

		// 一定時間後に揺れを止める（例: 5秒後）
		setTimeout(() => {
			clearInterval(interval);
			document.getElementById("audio").pause()
			body.style.backgroundPosition = "center"; // 元の位置に戻す
			finFlag = true
			messageElement.style.opacity = 1;  // 透明度を1にすることでフェードイン
			body.style.backgroundSize = "cover"
		}, 5000); // 5000ms = 5秒
	}
	if (commentsList.length-1 > commentFlag && finFlag && isOn){
		commentFlag ++
		typeWriter("comment-text",commentsList[commentFlag],100);
		messageElement.style.visibility = "hidden"
		messageElement.style.opacity = 0
		messageElement.style.visibility = "visible"
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
	  Subcomment = true
	  messageElement.style.opacity = 0
	  clearTimeout(type_Timeout)
	  
	  typeWriter("comment-text","電気をつけて!",100);
	  next_button.style.backgroundColor = "#cccccc84"
	  next_button_disabled = true
	  replay_button.style.backgroundColor = "#cccccc84"
	  replay_button_disabled = true
  } else {
	  // ON状態にする
	  lever.style.backgroundColor = "#444";
	  knob.style.left = "85px";
	  statusText.textContent = "ON";
	  statusText.classList.remove("off");
	  statusText.classList.add("on");
	  document.body.style.background= "url('FTPpxepP/background.jpg') no-repeat center center fixed"; // 黒色に透明度をつけて暗転
	  document.body.style.backgroundSize = "cover"
	  if (commentFlag == commentsList.length-1){
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
		  }
  
		  document.getElementById("comment-text").innerHTML = commentsList[commentFlag].split("\n").join('<br>')
	  }else{
		  if(!(await checkAnswer())){
			  next_status = 0
		  }
  
		  if(next_status == 0){
			  next_button.style.backgroundColor = "#05aa9084"
			  next_button_disabled = false
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