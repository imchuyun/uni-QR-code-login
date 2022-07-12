'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const db = uniCloud.database()
	let res = await db.collection('im_wxlogin').where({
		accountID: event.accountID
	}).get()
	if (event.wx_unid == "") {
		let res1 = await db.collection('im_wxlogin').where({
			accountID: event.accountID,
			state: 0
		}).updateAndReturn({
			state: 1
		})
	} else {
		let res3 = await db.collection('im_wxlogin').where({
			accountID: event.accountID
		}).updateAndReturn({
			wx_unid: event.wx_unid,
			state: 2
		})
	}
return res
};
