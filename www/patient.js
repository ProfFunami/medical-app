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

function defObj(){
  return obj = {
            name: $('#name').val(),
            country: $('#country').val(),
            language: $('#language').val(),
            destination: $('#destination').val(),
            work_place: $('#work_place').val(),
            length_of_stay: $('#length_of_stay').val(),
            medical_insurance: buttonClick(document.getElementsByName('yn')),
            method_of_payment: $('#method_of_payment').val(),
            religious_requests: $('#religious_requests').val(),
            emergency_contact: $('#emergency_contact').val(),
            acquaintance: $('#acquaintance').val(),
            others: $('#others').val()
        };
}

function backCheck(){
  const latestObj = localStorage.getItem("datalist");
  console.log("latest: "+ latestObj);
  const nowObj = JSON.stringify(defObj(), undefined, "\t");
  console.log("now: "+nowObj);
  if(latestObj===nowObj){
      //トップ画面に戻る
      popPage1();
  }else{
      var dialog = document.getElementById('my-alert-dialog');
      if (dialog) {
        dialog.show();
      } else {
        ons.createElement('alert-dialog.html', { append: true })
          .then(function(dialog) {
            dialog.show();
          });
      }
  }
}

function saveCancel() {
  hideAlertDialog();
  popPage1();
}
function saveAccept() {
  hideAlertDialog();
  regist();
}

var hideAlertDialog = function() {
  document
    .getElementById('my-alert-dialog')
    .hide();
};

var hideAlertDialog2 = function() {
  document
    .getElementById('my-alert-dialog-init')
    .hide();
};

function check(obj){
  for(let k of Object.keys(obj)) {
    if(k=="length_of_stay"||k=="religious_requests"||k=="acquaintance"||k=="others") {continue;}
    else if(obj[k]==""||obj[k]==null){
      console.log(k);
      return false;
    }
  }
  return true; 
}

function buttonClick(_radio) {
    for(var i = 0; i < _radio.length; i++) {
        if(_radio[i].checked) {
          return _radio[i].value
        }
    }
}

function regist() {
    const obj = defObj();
        if (!check(obj)){
          console.log(obj);
          ons.notification.alert('正しく入力されていない箇所があります');
        }else{
        // JSON化
        var jsonObj = JSON.stringify(obj, undefined, "\t");
        console.log(jsonObj);
        localStorage.setItem("datalist",jsonObj);
        ons.notification.alert('情報を更新しました。');
        //元のページに戻る
        popPage1();
        }
};

function makeqr(){
  const jsonObj=localStorage.getItem("datalist");
  // 暗号化キー
  var txt_key = "0123456789ABCDEF0123456789ABCDEF";
  console.log('original_strngs: ' + jsonObj);
  var utf8_plain = CryptoJS.enc.Utf8.parse(jsonObj);
  // 暗号化
  var encrypted = CryptoJS.AES.encrypt(utf8_plain, txt_key);
  var encrypted_strings = txt_key + "," + encrypted.toString();

  //署名
  const source = encrypted_strings + "," + sign(encrypted.toString());
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
}

$(function () {
    $("button[name='size']").on("click", function (e) {
        e.preventDefault();
        const obj = {
            name: $('#name').val(),
            country: $('#country').val(),
            language: $('#language').val(),
            destination: $('#destination').val(),
            work_place: $('#work_place').val(),
            length_of_stay: $('#length_of_stay').val(),
            medical_insurance: $('#medical_insurance').val(),
            method_of_payment: $('#method_of_paymnt').val(),
            religious_requests: $('#religious_requests').val(),
            emergency_contact: $('#emergency_contact').val(),
            acquaintance: $('#acquaintance').val(),
            others: $('#others').val()
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


