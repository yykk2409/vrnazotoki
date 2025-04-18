// 画像を取得
var toggleImg = document.getElementById("toggleImg");
document.getElementById("prologueImg").style.display ="none";
document.getElementById('button1').style.display = 'none'
		// 画像のsrc属性の値を格納する変数を用意
var imgSrc = toggleImg.src;
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
		prologueImg.style.display ="block";
		document.body.style.backgroundColor = "white";
		imgSrc = "abjlsiej/on.jpg";
		setTimeout( function(){ alert("ランゲル:ありがとう") }, 100 );
		document.getElementById('button1').style.display = 'inline'

	}
	
	
	else {
		toggleImg.src = "abjlsiej/off.jpg";
		prologueImg.style.display ="none";
		document.body.style.backgroundColor = "black";
		imgSrc = "abjlsiej/off.jpg";
		setTimeout( function(){ alert("ランゲル:電気つけて!") }, 100 );
		document.getElementById('button1').style.display = 'none'
	}
});
}, 5200);
