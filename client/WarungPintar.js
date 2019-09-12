
$(function () {
    var mainUrl = 'http://localhost:4000'

    //make connection
    var socket = io.connect(mainUrl)

    //buttons and inputs
    var message = $("#message")
    var send_message = $("#send_message")
    var chatroom = $("#chatroom")
    var feedback = $("#feedback")

    // get all messages
    $.get('mainUrl + "/message/all"', function (response) {
        for (var i = 0; i < response.length; i++) {
            var data = response[i];
            chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
        }
    });


    //Emit message
    send_message.click(function () {
        var data = { message: message.val() }
        $.ajax({
            type: "POST",
            url: mainUrl + "/message/send",
            data: JSON.stringify(data),
            contentType: 'application/json'
        });
        socket.emit('new_message', data)
    })

    //Listen on new_message
    socket.on("new_message", (data) => {
        feedback.html('');
        message.val('');
        chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
    })
});


