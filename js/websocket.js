var mytoken = window.localStorage.getItem("token");
var uname = window.localStorage.getItem("uname");
var stompClient = null;

/**
 * 创建websocket连接
 */
function connect() {
	var ws = new SockJS("http://127.0.0.1:8080/websocket");
	stompClient = Stomp.over(ws);
	stompClient.debug = null;
	alert("connect");
	// 建立连接
	stompClient.connect({
		token: mytoken
	},
	function(frame) {
		// 连接成功。订阅
		subscribe();
	},
	function(error) {
	});
}

/**
 * websocket断开连接
 */
function disconnect() {
	if(stompClient != null) {
		stompClient.disconnect(function() {
			alert("good bye!")
		},{})
	}
}

/**
 * websocket订阅
 */
function subscribe() {
	stompClient.subscribe("/queue/chat/"+uname,
	function(message) {
		//接收消息
		var messageList = JSON.parse(message.body);
		var length = messageList.length;
		for (var i = 0; i < length; i++) {
			//将接收消息添加至窗口
			var messageContent = document.getElementById("chat_content");
			
			var str = "";
			str += "<div class='media' style='margin-left: 50px;'>";
			str += 	"<div class='media-body mDiv' style='text-align: right;'>";
			str += 	  messageList[i].content;
			str += 	"</div>";
			str +=   "<div class='media-right'>";
			str +=     "<a href='#'>";
			str +=       "<img class='media-object' style='width: 38px;height: 38px;' src='img/ro.png'>";
			str +=     "</a>";
			str += "</div>";
			
			messageContent.innerHTML += str;
		}
	},{
		token: mytoken
	})
}

/**
 * websocket发送消息
 */
function send(toUserName,content) {
	if(stompClient != null) {
		var data = JSON.stringify({
			'content': content,
			'to': toUserName,
			'token': mytoken
		});
		stompClient.send("/app/chat",{},data);
		// 添加消息
	}
}
