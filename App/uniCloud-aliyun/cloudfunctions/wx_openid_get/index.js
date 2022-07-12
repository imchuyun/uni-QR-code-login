'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	// uni.request({
	// 	url: 'https://api.weixin.qq.com/sns/jscode2session',
	// 	data: {
	// 		"appid": "wxbbc48eccdfa1006d",
	// 		"secret": "69ae0e82867cf6ca4c095a272c43282b",
	// 		"js_code": event.js_code,
	// 		"grant_type": "authorization_code"
	// 	},
	// 	success: (res) => {
	// 		//返回数据给客户端
	// 		return res
	// 	}
	// });

	const res = await uniCloud.httpclient.request('https://api.weixin.qq.com/sns/jscode2session', {
		method: 'GET',
		data: {
			appid: "wxbbc48eccdfa1006d",
			secret: "69ae0e82867cf6ca4c095a272c43282b",
			js_code: event.js_code,
			grant_type: "authorization_code"
		},
		contentType: 'json', // 指定以application/json发送data内的数据
		dataType: 'json' // 指定返回值为json格式，自动进行parse
	})
	console.log(res)
	return res
};
