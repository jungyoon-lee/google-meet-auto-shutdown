setInterval(check, 2000);

function check() {
    if ($('.wnPUne').length == 0) { // enter room
        return;
    }
    
    chrome.storage.sync.get(['power', 'limit_num', 'message'], function(result) {
        if (!result.power) {
            return;
        }
        
        var participants_num = document.querySelector('.wnPUne').innerHTML;
        if (Number(result.limit_num) >= Number(participants_num)) {

            if ($('.VfPpkd-kBDsod').length == 0) {
                $('.HKarue').click();
            }
            
            send_message(result.message);

            setTimeout(function(){
                window.location.reload();
            }, 1000)
        }   
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


// function check() {
//     var comments = $("div[jsname^='dTKtvb']");
    
//     chrome.storage.sync.get(['is', 'keyword', 'count'], function(result) {        
//         if (result.is == true) {
//             var num = 0;
//             for (var i = 0; i < comments.length; i++) {
//                 if (comments[i].textContent.indexOf(result.keyword) == 0) {
//                     num += 1;
//                 } 
//             }
    
//             console.log(num);
            
//             if (num >= result.count) {
//                 window.location.reload();
//                 // alert(result.keyword + ' * ' + num);
//             }
//         }
//     });
// }