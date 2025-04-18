
const replay_button = document.getElementById("replay_button")
replay_button.addEventListener("click",() =>{
	if(!replay_button_disabled){
		replay_button.style.backgroundColor = "#cccccc84"
		replay_button_disabled = true
		finFlag = false
		commentFlag = 0
		typeWriter("comment-text",commentsList[commentFlag],100)
		commentFlag ++
	}

})

const next_button = document.getElementById("next_button")

next_button.addEventListener("click",()=>{
	if(!next_button_disabled){
		window.location.href = "/FcxKopx0"
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
	  }else{
		
		finFlag = true
		if (commentsList.length > commentFlag ){
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

  
  

const commentsList = ["こんにちは!\nVRゲーム「ミステリーダンジョン」体験版にようこそ。","VRの世界でダンジョンを探索しながら謎解きに挑戦しよう。\nでも、今日は体験版だから地上1階のみで終了だよ。","紹介が遅くなったけど、\nぼくは、このダンジョンの案内役を務める\nAIの「ランゲル」だよ。\nよろしくね!","それではまず例題を解いてみよう。\n右下の「例題を解く」ボタンを押して!"]
let finFlag = false
let commentFlag = 0 
let replay_button_disabled = true
let next_button_disabled = true
messageElement.style.visibility = "visible"
messageElement.style.opacity = 0

window.addEventListener('load',()=>{
	const URLList = JSON.parse(localStorage.getItem('URLList'));
	const URL = window.location.href.split("/")
	URLList[1][0] = document.title
	URLList[1][1] = URL[URL.length - 1]
	localStorage.setItem("URLList",JSON.stringify(URLList))
	typeWriter("comment-text",commentsList[commentFlag],100)
	commentFlag ++
})

document.addEventListener('keydown', event => {
	if (event.key == "Enter"){
		comment()
	}
})

document.getElementById("comment").addEventListener("click", ()=>{
	if (finFlag){
		comment()
	}else{
		clearTimeout(type_Timeout)
		document.getElementById("comment-text").innerHTML = commentsList[commentFlag-1].split("\n").join('<br>')
		finFlag = true
		if (commentsList.length > commentFlag ){
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
	if (commentsList.length > commentFlag && finFlag){
		typeWriter("comment-text",commentsList[commentFlag],100);
		messageElement.style.visibility = "hidden"
		messageElement.style.opacity = 0
		messageElement.style.visibility = "visible"
		finFlag = false
		commentFlag ++
	}
}