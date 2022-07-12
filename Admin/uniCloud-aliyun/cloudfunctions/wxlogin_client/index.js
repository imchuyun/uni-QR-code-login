'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.database();
	let res = await db.collection('im_wxlogin').where({
		accountID: event.accountID
	}).get()
	return res;

};
