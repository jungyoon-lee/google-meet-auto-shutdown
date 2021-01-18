chrome.storage.sync.get(['power', 'limit_num', 'message'], function(result) {
    if (result.power) {
        var background_color = 'red';
        var color = 'white';
    } else {
        var background_color = 'white';
        var color = 'black';
    }
    $('#onoff_btn').css({
        'background-color': background_color,
        'color': color
    });


    if (result.limit_num) {
        $('#limit_num').val(result.limit_num);
    }
    if (result.message) {
        $('#message').val(result.message);
    }
});



$(window).on('load', function() {
    // $('#option_btn').click(function() {
    //     window.open(chrome.runtime.getURL('options.html'));
    // });

    $('#onoff_btn').click(function() {
        chrome.storage.sync.get(['power'], function(result) {
            if (result.power) {
                var background_color = 'white';
                var color = 'black';
                var power = false;
            } else {
                var background_color = 'red';
                var color = 'white';
                var power = true;
            }

            chrome.storage.sync.set({'power': power});
            $('#onoff_btn').css({
                'background-color': background_color,
                'color': color
            });
        });
    });

    $('#save_btn').click(function() {
        alert("save complete");

        var limit_num = $('#limit_num').val();
        var message = $('#message').val();

        chrome.storage.sync.set({'limit_num': limit_num, 'message': message});
    });
});

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
        var num = response.farewell;
        $('#participants_num').text("participants_num = " + num);
    });
});