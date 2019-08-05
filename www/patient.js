const web3 = new Web3('wss://rinkeby.infura.io/ws/v3/cf93a80dccb7456d806de40695023f72');

console.log(web3);
const HospitalContractInstance  = new web3.eth.Contract(HospitalContractABI, HospitalContractAddress);

// ブラウザのローカルストレージから秘密鍵を読み込み
const privateKey = localStorage.getItem('privateKey');

if(privateKey == null){
    alert("Please Input Your Private Key");
    location.href = '../common.html';
}

// 秘密鍵 => アドレス
const account = web3.eth.accounts.privateKeyToAccount(privateKey);

// イベントのキャッチ設定
HospitalContractInstance.events.StartExamination({}, function(error, event){
	console.log(event);
	if(event.returnValues.patientAddress == account.address){
	    $('#contractAddress').text("Examination Contract Address : "+event.returnValues.contractAddress);
	}
	localStorage.setItem("contractAddress", event.returnValues.contractAddress);
});

function regist() {
    const obj = {
            "name": $('#name').val(),
            "country": $('#country').val(),
            "language": $('#language').val(),
            "destination": $('#destination').val(),
            "work place": $('#work_place').val(),
            "length of stay": $('#length_of_stay').val(),
            "medical insurance": $('#medical_insurance').val(),
            "method of payment": $('#method_of_paymnt').val(),
            "religious requests": $('#religious_requests').val(),
            "emergency contact": $('#emergency_contact').val(),
            "acquaintance": $('#acquaintance').val(),
            "others": $('#others').val()
        };
        
        //JSON化
        var jsonObj = JSON.stringify(obj, undefined, "\t");
        console.log(jsonObj);
};

$(function () {
    $("button[name='size']").on("click", function (e) {
        e.preventDefault();
        const obj = {
            "name": $('#name').val(),
            "country": $('#country').val(),
            "language": $('#language').val(),
            "destination": $('#destination').val(),
            "work place": $('#work_place').val(),
            "length of stay": $('#length_of_stay').val(),
            "medical insurance": $('#medical_insurance').val(),
            "method of payment": $('#method_of_paymnt').val(),
            "religious requests": $('#religious_requests').val(),
            "emergency contact": $('#emergency_contact').val(),
            "acquaintance": $('#acquaintance').val(),
            "others": $('#others').val()
        };
        //JSON化
        var jsonObj = JSON.stringify(obj, undefined, "\t");

        // 暗号化キー
        var txt_key = "0123456789ABCDEF0123456789ABCDEF";
        console.log('original_strngs: ' + jsonObj);
        var utf8_plain = CryptoJS.enc.Utf8.parse(jsonObj);
        // 暗号化
        var encrypted = CryptoJS.AES.encrypt(utf8_plain, txt_key);
        var encrypted_strings = txt_key + "," + encrypted.toString();

        //署名
        const source = encrypted_strings + "," + sign(jsonObj);
        console.log('source: ' + source);
        try {
            $('#qrcode').html("").qrcode({
                width: 400,
                height: 400,
                text: source,
            });
        } catch (e) {
            $('#qrcode').html("").append("文字数オーバーです：<br>" + e);
        }
    })
});

$("#setMedicalCostButton").on("click", function (e) {
    e.preventDefault();
    var cost = $("#setMedicalCostInput").val();
    cost_sign = sign(String(cost));
    console.log(cost_sign);
    $('#setMedicalCostQrcode').html("").qrcode({
        width: 200,
        height: 200,
        text: cost_sign,
    });
});