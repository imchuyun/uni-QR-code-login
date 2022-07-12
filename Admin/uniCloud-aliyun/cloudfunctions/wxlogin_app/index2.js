'use strict';
exports.main = async (event, context) => {
	let apiUrl = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential";
	const res = await uniCloud.httpclient.request(apiUrl, {
		method: 'GET',
		data: {
			test: 'testValue'
		}
	})
	return res.data;


};
