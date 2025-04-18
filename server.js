const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // URLエンコードされたデータを解析

const answerList = {
    example : "しゅっぱつ",
    STEP1_A:"おとしあな",
    STEP1_B:"かいだん",
    STEP1_C:"こんぱす",
    STEP1_D:"かくしとびら",
    STEP1_E:"じんこうちのう",
    STEP1_F:"いきどまり",
    STEP1_G:"あんこくのま",
    STEP2:"なまえのしんい",
    STEP3_start:"じゃんぴんぐましん",
    STEP3_end:"げんじつせかいへ"
}

app.use(express.static('public'))

const jsonString = fs.readFileSync('./qnum.json', 'utf8');
const data = JSON.parse(jsonString);

app.get('/:qnum', (req, res, next) => {
    const qnum = req.params.qnum;

    // qnumに対応するフォルダ名を取得
    const folderName = data[qnum];
    if (!folderName) {
        return res.status(404).send('フォルダが見つかりません');
    }

    const folderPath = path.join(__dirname, folderName);

    // フォルダが存在するか確認
    if (!fs.existsSync(folderPath)) {
        return res.status(404).send('指定されたフォルダが存在しません');
    }

    // フォルダを静的に公開
    app.use(`/${qnum}`, express.static(folderPath));

    // index.htmlを返す
    const indexPath = path.join(folderPath, 'index.html');
    if (!fs.existsSync(indexPath)) {
        return res.status(404).send('index.htmlが存在しません');
    }

    res.sendFile(indexPath);
});

app.get('/print/:qnum', (req, res) => {
    const qnum = req.params.qnum;

    // qnumに対応するフォルダ名を取得
    const fileName = `${data[qnum]}.pdf`;

    if (!fileName) {
        return res.status(404).send('ファイルが見つかりません');
    }

    const filePath = path.join(__dirname, "pdf" , fileName);

    // フォルダが存在するか確認
    if (!fs.existsSync(filePath)) {
        return res.status(404).send('指定されたファイルが存在しません');
    }

    // フォルダを静的に公開
    res.sendFile(filePath)
});

const findNextKey = (json, targetKey) => {
    // JSONのキー一覧を取得
    const keys = Object.keys(json);

    // 対象文字列のインデックスを取得
    const index = keys.indexOf(targetKey);

    // インデックスが見つからない、または最後のキーの場合
    if (index === -1 || index === keys.length - 1) {
        return null; // 次のキーは存在しない
    }

    // 次のインデックスのキーを返す
    return keys[index + 1];
};
// ログインのエンドポイント
app.post('/answer/:q', async (req, res) => {
    const { answer } = req.body;
    const q = req.params.q
    const list = req.headers.referer.split("/")
    if (answer == answerList[q]) {
        res.status(200).json({ message: findNextKey(data, list[list.length - 1]) });
    } else {
        res.status(400).json({ message: findNextKey(data, list[list.length - 1]) });
    }
});

app.post('/checkURL', async (req,res) => {
    const { data_checkURL } = req.body;
    const list = req.headers.referer.split("/")
    if (data_checkURL == findNextKey(data, list[list.length - 1])){
        res.status(200).json({ message: true })
    }else {
        res.status(400).json({ message: false })
    }

})

// サーバー起動
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});