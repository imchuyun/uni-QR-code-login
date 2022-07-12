'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const db = uniCloud.database()
	let res = await db.collection('im_wxlogin').add({
		clientID: event.clientID,
		clientIP: event.clientIP,
		time: event.time,
		wx_openid: event.wx_openid,
		state: event.wx_state
	})
	return res
};
