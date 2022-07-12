'use strict';
const uniIDs = require('uni-id')
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)

	const uniID = uniIDs.createInstance({
		context: context
	})
	if (event.token == null) {
		exports.main = async function(event, context) {
			const {
				uid
			} = event
			const res1 = await uniID.createToken({
				uid: uid,
				needPermission: true
			})
			const res = await uniID.updateUser({
				uid: uid,
				token: [res1.token]
			})
			return res1;
		};
	} else {
		const payload = await uniID.checkToken(event.token)
		const {
			code,
			token,
			tokenExpired
		} = payload
		return payload

	}
};
