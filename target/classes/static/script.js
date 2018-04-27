var stompClient = null,
    clientUser;
function connect() {
	var socket = new SockJS('/chat-messaging');
	stompClient = Stomp.over(socket);
	clientUser = $('#user_input').val();
	stompClient.connect({}, function(frame) {
		console.log("connected: " + frame);
		stompClient.subscribe('/chat/messages', function(response) {
			var data = JSON.parse(response.body);
			appendNewMessage(data.message,data.from,data.time)
		});
	});
}

function disconnect(){
	stompClient.disconnect();
}

function sendMessage(){
	stompClient.send("/app/message", {}, JSON.stringify({'message': $("#message_input").val(),'from':$('#user_input').val()}));
}

function appendNewMessage(message,user,time) {
	
    var messageItem = $('<div></div>').addClass("message-item"),
    	messageText = $('<span></span').addClass("message-text").text(message),
    	messageUser = $('<span></span').addClass("message-author").text(" " +user),
    	messageTime = $('<span></span').addClass("sent-at").text(" " + time);
    
    
    //console.log("clientUser: " + clientUser + "givenuser: " + user);
    console.log("equality check " + (clientUser == user));
    if(user == clientUser){
    	messageUser.addClass("current-client");
    }
    
    messageItem.append(messageText,messageUser,messageTime);
    
    $('.messages-wrap').append(messageItem);
}