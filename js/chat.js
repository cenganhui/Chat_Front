var btn = document.getElementById("sendMessage");
var talkUser = null;

window.onload=function(){

	connect();
	getUserList();
}

/**
 * 发送按钮事件
 */
$("#sendMessage").click(function(){
	var sendName = jQuery("#sendName").val();
	var content = jQuery("#sendContent").val();
	// 发送消息
	//send(talkUser.uname,content);
	send(sendName,content);
	// 添加消息
	addContent(content);
	jQuery("#sendContent").val("")
})

// mui.plusReady(function () {
// 	// 传过来的talkUser需要包含uid,uname,nickName三个属性
// 	// 获取参数
// 	talkUser = plus.webview.currentWebview().talkUser;
// 	// 设置标题
// 	var head = document.getElementById("talkName");
// 	head.innerHTML = talkUser.nickName
// 	// 获取信息列表
// 	getMessage();
// 	// websocket连接
// 	connect();
// })

/**
 * 获取消息列表（未完）
 */
function getMessageList(){
	var sendName = jQuery("#sendName").val();
	jQuery.ajax({
		method : "GET",
		url : "http://127.0.0.1:8080/api/v1/message?uName=" + sendName,
		contentType : "application/json;charset=utf-8",
		headers : {
			"Authorization" : window.localStorage.getItem("token")
		},
		xhrFields : {
			withCredentials : true
		},
		success: function(res) {
			if(res.code == 200) {
				var messageList = res.data.messageList;
				var len = messageList.length;
				for(var i=0;i<len;i++){
					if(window.localStorage.getItem("uid") == messageList[i].senderId){
						addContent(messageList[i].content);
					}
				}
				
			}
		},
		error: function(err) {
			console.log(err)
		}
	})
}


/**
 * 获取除自己外所有用户
 */
function getUserList(){
	jQuery.ajax({
		method : "GET",
		url : "http://127.0.0.1:8080/api/v1/all_user",
		contentType : "application/json;charset=utf-8",
		headers : {
			"Authorization" : window.localStorage.getItem("token")
		},
		xhrFields : {
			withCredentials : true
		},
		success: function(res) {
			if(res.code == 200) {
				var ul = document.getElementById("chat_user");
				var userList = res.data.userList;
				var len = userList.length;
				for(var i=0;i<len;i++){
					var li = document.createElement("li");
					li.className = "list-group-item text-center";
					li.id = userList[i].uid;
					li.innerHTML = userList[i].uname;
					ul.appendChild(li);
				}
			}
		},
		error: function(err) {
			console.log(err)
		}
	})
}

/**
 * 添加发送内容
 * @param {Object} content
 */
function addContent(content) {
	var messageContent = document.getElementById("chat_content");
	
	var str = "";
	str += "<div class='media' style='margin-right: 50px;'>";
	str +=   "<div class='media-left'>";
	str +=     "<a href='#'>";
	str +=       "<img class='media-object' style='width: 38px;height: 38px;' src='img/ro1.jpg'>";
	str +=    "</a>";
	str +=   "</div>";
	str +=   "<div class='media-body mDiv'>";
	str +=     content;
	str +=   "</div>";
	str += "</div>";
	
	messageContent.innerHTML += str;
	
}