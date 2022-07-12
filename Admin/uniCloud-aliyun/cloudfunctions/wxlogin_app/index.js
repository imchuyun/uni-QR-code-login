'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.database()
	const data_system = db.collection('im_system')
		.where({
			id: 0,
		})
		.field({
			'wx_appid': true,
			'wx_secret': true
		})
		.get(

		)
		.catch(err => {
			console.error(err)
		})
		return data_system;


};
