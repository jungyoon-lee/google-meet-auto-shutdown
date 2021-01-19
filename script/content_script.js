setInterval(check, 2000);

function check() {
    if ($('.wnPUne').length == 0) { // enter room
        return;
    }
    
    chrome.storage.sync.get(['power', 'limit_num', 'message'], function(result) {
        if (!result.power) { // popup.html's ON/OFF Button
            return;
        }
        
        var participants_num = document.querySelector('.wnPUne').innerHTML; // jquery don't work
        if (Number(result.limit_num) < Number(participants_num)) {
            return;
        }

        chrome.storage.sync.set({'power': false});

        if (result.message != '') {
            if ($('.VfPpkd-kBDsod').length == 0) { // Toggle Message Leave Button 
            $('.HKarue').click(); // Toggle Message Open Button
            }
        }
        send_message(result.message);

        var messages = backup_messages();
        
        setTimeout(function() {
            window.location.reload();
        }, 2000)

        var filename = getNowDate();
        download(messages, filename);
    });
}


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var participants_num = document.querySelector('.wnPUne').innerHTML;

    if (request.greeting == "hello") 
        sendResponse({farewell: participants_num});
});


function send_message(message) {
    if ($('.VfPpkd-kBDsod').length == 0) {
        $('.HKarue').click();
    }

    var textarea = document.querySelector('.KHxj8b');
    textarea.value = message;   

    var send_btn = document.querySelector('.Cs0vCd');
    send_btn.classList.remove('RDPZE');
    send_btn.setAttribute('aria-disabled','false');
    send_btn.click();
     
}

function backup_messages() {
    // var _messages = document.querySelectorAll('.oIy2qc'); // just message
    var _messages = document.querySelectorAll('.GDhqjd'); // {username}{date}{message}
    var messages = [];

    for (var i = 0; i < _messages.length; i++) {
        messages.push(_messages[i].textContent);
        messages.push("\n");
    }

    return messages;

    
}

function download(texts, filename) {
    var a = document.createElement('a');
    var file = new Blob(texts, {type: 'text/plain;charset=utf-8'});

    a.href= URL.createObjectURL(file);
    a.download = filename;
    a.click();
}

function getNowDate() {
    var today = new Date();
    filename = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate() + 
    '-' + today.getHours() + ":" + today.getMinutes();

    return filename;
}