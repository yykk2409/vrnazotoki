
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

const next_button = document.getElementById("next_button")

next_button.addEventListener("click",()=>{
	if(!next_button_disabled){
		window.location.href = "/uBMrjeP8"
	}
	
})
const messageElement = document.getElementById("message-text");

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
	  }else if(Subcomment){}else{
		
		finFlag = true
		if (commentsList.length -1 > commentFlag ){
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

  
  

const commentsList = ["みんなは今ダンジョンの地上1階に閉じ込められているよ。\n無事ここから脱出しよう。","脱出方法は、まずこのダンジョンのAからFに行き、\nそこにある謎を解こう。\n次にGに行き、脱出のためのキーワードを見つけ出そう。","最後にそのキーワードを入力すればログアウトでき、\nこのミステリーダンジョンを脱出できるよ。","それではスタート!!"]
let finFlag = false
let commentFlag = 0 
let replay_button_disabled = true
let next_button_disabled = true
messageElement.style.visibility = "visible"
messageElement.style.opacity = 0

window.addEventListener('load',()=>{
	typeWriter("comment-text",commentsList[commentFlag],100)
})

document.addEventListener('keydown', event => {
	if (event.key == "Enter"){
		comment()
	}
})

document.getElementById("comment").addEventListener("click", async ()=>{
	if (finFlag){
		comment()
	}else{
		if(!Subcomment && isOn){	
			clearTimeout(type_Timeout)
			document.getElementById("comment-text").innerHTML = commentsList[commentFlag].split("\n").join('<br>')
			finFlag = true
			if (commentsList.length -1 > commentFlag ){
				messageElement.style.opacity = 1;  // 透明度を1にすることでフェードイン
			}else{
				replay_button.style.backgroundColor = "#05aa9084"
				next_button.style.backgroundColor = "#05aa9084"
				replay_button_disabled = false
				next_button_disabled = false
			}
		}
	}
})

function comment(){
	if (commentsList.length-1 > commentFlag && finFlag && isOn){
		commentFlag ++
		typeWriter("comment-text",commentsList[commentFlag],100);
		messageElement.style.opacity = 0
		finFlag = false
	}
}

let isOn = true;
let Subcomment = false

function toggleSwitch() {
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
	document.body.style.background= "url('FcxKopx0/background.jpg') no-repeat center center fixed"; // 黒色に透明度をつけて暗転
	document.body.style.backgroundSize = "cover"
	document.getElementById("rangelImg").style.visibility = "visible"
	
		
	clearTimeout(type_Timeout)

	Subcomment = false
	
	if (!finFlag){
		typeWriter("comment-text",commentsList[commentFlag],100);
	}else {
		if(commentFlag != commentsList.length - 1){
			messageElement.style.opacity = 1
		}else{
			next_button.style.backgroundColor = "#05aa9084"
			next_button_disabled = false
			document.getElementById("answer").style.backgroundColor = "#05aa9084"
			document.getElementById("answer").disabled = false
		}
		document.getElementById("comment-text").innerHTML = commentsList[commentFlag].split("\n").join('<br>')
	}	
	
  }

  isOn = !isOn;
}