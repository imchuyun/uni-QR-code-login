<template>
	<view class="content">
		<view class="text-area">
			<!-- <view style="text-align:center;font-size: larger;color: #2C405A;">
				用户登录 | Login
			</view> -->
			<view style="margin-top: 10px;">

			</view>
			<button class="bottom login" @tap="wxLogin">微信登录</button>
			<view style="margin-top: 10px">

			</view>
			<button class="bottom login1" @tap="back">暂不登录</button>
			<view style="margin-top: 30px">

			</view>
		</view>
	</view>
</template>

<script>
	var _self, page = 1,
		timer = null;
	export default {
		data() {
			return {
				title: '微信授权登录',
				host: '' //配置为自己的额服务器即可
			}
		},
		onLoad() {
			_self = this;
		},
		methods: {
			wxLogin() {
				// 获取code 小程序专有，用户登录凭证。
				uni.getUserProfile({
					desc: "获取用户基本资料",
					lang: 'zh_CN',
					success: (user) => {
						//获取成功基本资料后开启登录，因为基本资料首先要授权
						uni.login({
							provider: 'weixin',
							success: function(code_res) {
								if (code_res.errMsg == "login:ok") {
									let code = code_res.code;
									console.log(user.userInfo);
									_self.wxuserInfo = user.userInfo;
									//console.log(code);
									uniCloud.callFunction({
										name: 'wx_openid_get',
										data: {
											js_code: code
										},
										success(res) {
											console.log(res.result.data.openid);
													_self.wxuid = res.result.data.openid;
													console.log(_self.wxuid);
													uni.setStorageSync('login', 1);
													uni.setStorageSync('wxuserInfo', user
														.userInfo);
													uni.setStorageSync('wxuid', res.result.data.openid);
													uni.navigateBack();
										},fail(res) {
											console.log(res);
											uni.showModal({
												title: '登录失败',
												showCancel: false,
												success: function(res) {
													if (res.confirm) {
														uni.navigateBack();
													}
												}
											});
										}
									});
									// uni.request({
									// 	url: 'https://api.weixin.qq.com/sns/jscode2session',
									// 	data: {
									// 		"appid": "wxbbc48eccdfa1006d",
									// 		"secret": "69ae0e82867cf6ca4c095a272c43282b",
									// 		"js_code": code,
									// 		"grant_type": "authorization_code"
									// 	},
									// 	success: (res) => {
											
									// 		//console.log(res.data);
									// 		_self.wxuid = res.data.openid;
									// 		// uni.showModal({
									// 		// 	title: '微信登录成功',
									// 		// 	content:res.data.openid,
									// 		// 	showCancel: false,
									// 		// 	success: function(res) {
													
									// 		// 	}
									// 		// });
									// 		console.log(_self.wxuid);
									// 		uni.setStorageSync('login', 1);
									// 		uni.setStorageSync('wxuserInfo', user
									// 			.userInfo);
									// 		uni.setStorageSync('wxuid', res.data
									// 			.openid);
									// 		// uni.navigateBack();
									// 	},fail(res) {
									// 		uni.showModal({
									// 					title: '失败',
									// 					showCancel: false,
									// 					success: function(res) {
															
									// 					}
									// 				});
									// 	}
									// });
								}
							}
						});

					},
					fail: (res) => {
						uni.showModal({
							title: "用户拒绝授权",
							showCancel: false
						})
						uni.navigateBack();
					}
				});
			},
			back() {
				uni.navigateBack();
			}
		}
	}
</script>

<style>
	.login {
		border-radius: 10px;
		background: #10c62b;
		width: 250px;
		color: #FFFFFF;
		font-size: 15px;
	}

	.login1 {
		border-radius: 10px;
		background: #FFFFFF;
		width: 250px;
		color: #10c62b;
		font-size: 15px;
		border-width: thin;
		border-style: solid;
		border-color: #10c62b;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.text-area {
		justify-content: center;
		top: 30%;
		position: absolute;

	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	.title-a {
		font-size: 25px;
		font-weight: 100;
	}
</style>
