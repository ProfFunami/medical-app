// const web3 = new Web3('wss://rinkeby.infura.io/ws/v3/cf93a80dccb7456d806de40695023f72');

const hospitalContractInstance  = new web3.eth.Contract(HospitalContractABI, HospitalContractAddress);
const examinationContractInstance = new web3.eth.Contract(ExaminationContractABI);

// テスト用に秘密鍵とアドレス,パスフレーズはセットしておく
localStorage.setItem('privateKey', "0x0D274BD5D6DC605137D958AC2DB9C9BD189FF86338150A04C7DB4B3E942FAC0C");
localStorage.setItem('address', "0x5f527BD60061b937836526BAe83bB4581f9bAc01");
localStorage.setItem('passPhrase', "0x346198ef122e68c6a0d4e037289317178a0555aad18e5cd1366df39683483b1785bc632ac5c7981a9a98e5660ec05f");

// ブラウザのローカルストレージから秘密鍵を読み込み
let myPrivateKey = localStorage.getItem('privateKey');
let myAddress = localStorage.getItem('address');

// ブラウザのローカルストレージからCryptoJS.AES256用のパスフレーズ読み込み
let myPassPhrase = localStorage.getItem('passPhrase');


// 初回起動
if(myPrivateKey == null){
    let account = web3.eth.accounts.create();
    myPrivateKey = account.privateKey;
    myAddress = account.address;
    // 充分長いパスフレーズを生成
    myPassPhrase = web3.utils.randomHex(50);
    localStorage.setItem('privateKey', myPrivateKey);
    localStorage.setItem('address', myAddress);
    localStorage.setItem('passPhrase', myPassPhrase);
} 

function web3test(){
    console.log("start");
    hospitalContractInstance.methods.testReturnAddress().call({from: myAddress}).then(console.log);
}

$('#medicalCostButton').click(function () {
    let val = $('#medicalCost').val();
    try {
        $('#qrcode').html("").qrcode({
            width: 200,
            height: 200,
            text: val,
        });
    } catch (e) {
        $('#qrcode').html("").append("文字数オーバーです：<br>" + e);
    }
})