'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.database()

	const data = db.collection('im_wxlogin')
		 .orderBy('create_time','desc') // 按照quantity字段升序排序，quantity相同时按照create_date降序排序
		 .where({
		 	user_id: event.user_id
		 })
		.get()
		.catch(err => {
			console.error(err)
		})


	return data

};
