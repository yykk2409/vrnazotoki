// LocalStorage から JSON を読み込む
let storedData = JSON.parse(localStorage.getItem('URLList'));

if (!storedData){
    const arr = [['???',null],['???',null],['???',null,null],['???',null],['???',null,null],['???',null,null],['???',null,null],['???',null,null],['???',null,null],['???',null,null],['???',null,null],['???',null],['???',null,null],['???',null],['???',null,null],['???',null]]
    localStorage.setItem("URLList",JSON.stringify(arr))
    storedData = arr
}
const reset_button = document.getElementById("reset_button")
reset_button.addEventListener("click",()=>{
    const arr = [['???',null],['???',null],['???',null,null],['???',null],['???',null,null],['???',null,null],['???',null,null],['???',null,null],['???',null,null],['???',null,null],['???',null,null],['???',null],['???',null,null],['???',null],['???',null,null],['???',null]]
    localStorage.setItem("URLList",JSON.stringify(arr))
    storedData = arr
})


// div-container を取得
const container = document.getElementById('div-container');

container.style.paddingTop = (container.offsetHeight/10)+'px'
container.style.paddingBottom = (container.offsetHeight/10)+'px'
// JSON のキーと値を元に div 要素を生成
storedData.forEach(element => {
        
    const div = document.createElement('div');
    div.classList.add('link-div');
    div.textContent = element[0]; // divにキーをテキストとして設定
    div.id = "div"

    // div をクリックした時の遷移処理
    const url = element[1]; // 値（URL）を取得
    if(url != null){
        div.addEventListener('click', () => {
            window.location.href = url; // 指定されたURLへ遷移
        });
    }

    // divをcontainerに追加
    container.appendChild(div);
})

const next_button = document.getElementById("next_button")

next_button.addEventListener("click",()=>{
    window.location.href = "/R7unvOKv"
})