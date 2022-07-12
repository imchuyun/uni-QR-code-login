'use strict';
exports.main = async (event, context) => {
	let clientIP = context.CLIENTIP // 客户端ip信息
	let os = context.OS //客户端操作系统，返回值：android、ios    等
	let uuid = (Math.random()) * 0x10000
	let accountID = uuid.toString(25).substring(5)
	const db = uniCloud.database()
	const data = await db.collection('im_wxlogin')
		.add({
			accountID: accountID,
			clientIP: clientIP,
			os: os,
			time: Math.round(new Date() / 1000),
			wx_unid: '',
			state: 0,
		})
		.catch(err => {
			console.error(err)
		})

	let api_access_token =
		"https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential"; //获取access_token
	let access_token = ""
	if (!accountID == "") {
		console.log('正在获取微信小程序码');
		const res = await uniCloud.httpclient.request(api_access_token, {
			method: 'GET',
			data: {
				"appid": "wxbbc48eccdfa1006d",
				"secret": "69ae0e82867cf6ca4c095a272c43282b"
			},
			dataType: 'json' // 指定返回值为json格式，自动进行parse
		})

		access_token = res.data.access_token;

		let api_test = "https://api.weixin.qq.com/wxa/getwxacode?access_token=" + access_token //只有10万次
		let api_use = "https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=" + access_token //无限次数，但是小程序要审核通过
		// 测试模式start
		// const code = await uniCloud.httpclient.request(api_test, {
		// 	method: 'POST',
		// 	data: {
		// 		"path": "pages/login/index?accountID=" + accountID,
		// 		"width": 230
		// 	},
		// 	contentType: 'json', // 指定以application/json发送data内的数据
		// });
		// let datas = code.data;
		// let redata = [
		// 	datas,
		// 	accountID
		// ];
		// return redata;
		// 测试模式end
		// 正常模式start
		const code = await uniCloud.httpclient.request(api_use, {
			data: {
				"page": "pages/login/index",
				"width": "230",
				"scene": "accountID=" + accountID
			},
			method: "POST",
			contentType: 'json'
		});
		let datas = code.data;
		let redata = [
			datas,
			accountID
		];
		return redata;
		// 正常模式end
	}

};
