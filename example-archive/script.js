// 画像を取得
var toggleImg = document.getElementById("toggleImg");
		// 画像のsrc属性の値を格納する変数を用意
var imgSrc = toggleImg.src;

document.getElementById("prologueImg").style.visibility = 'hidden' 
document.getElementById('inputContainer').style.visibility = 'hidden'
setTimeout( function(){ alert("ランゲル:問題を表示するね!!") }, 2000);
setTimeout( function(){document.body.style.backgroundColor = "black";
					toggleImg.src = "abjlsiej/off.jpg";
					imgSrc = "abjlsiej/off.jpg";
					
					setTimeout( function(){ alert("ランゲル:ごめん電気消しちゃった。スイッチを押して!→") }, 100);				
}, 5000 );


// 画像がクリックされたら画像と背景色をトグルする
setTimeout( function(){
toggleImg.addEventListener("click", function() {
	if (imgSrc === "abjlsiej/off.jpg") {
		toggleImg.src = "abjlsiej/on.jpg";
		prologueImg.style.visibility = 'visible';
		document.body.style.backgroundColor = "white";
		imgSrc = "abjlsiej/on.jpg";
		setTimeout( function(){ alert("ランゲル:ありがとう") }, 100 );
		document.getElementById('inputContainer').style.visibility = 'visible'


	}
	
	
	else {
		toggleImg.src = "abjlsiej/off.jpg";
		prologueImg.style.visibility = 'hidden';
		document.body.style.backgroundColor = "black";
		imgSrc = "abjlsiej/off.jpg";
		setTimeout( function(){ alert("ランゲル:電気つけて!") }, 100 );
		document.getElementById('inputContainer').style.visibility = 'hidden'
	}
});
}, 5200);


const button1 = document.getElementById('button1')

button1.addEventListener("click", async () =>{
	const answer = document.getElementById("answer").value
	console.log(answer)
	const response = await fetch('/answer/prologue', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ answer })
	});

	const result = await response.json();
	
	if (response.ok) {
		document.getElementById("message").textContent = "正解！"
		window.location.href = 'https:\/\/vr-escape-game.studio.site/1';
	} else {
		document.getElementById("message").textContent = "不正解！"
	}
})