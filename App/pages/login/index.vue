<template>
	<view class="content">
		<view class="text-area">
			<!-- <view style="text-align:center;font-size: larger;color: #2C405A;">
				用户登录 | Login
			</view> -->
			<view class="logo">
				<image src="../../static/my_service/images/link.png" style="width: 350rpx;height: 350rpx;"></image>

			</view>
			<view class="logo">
				<text style="font-size:20px;color:#000000">
					后台登录
				</text>
				
			</view>
			<view style="margin-top: 10px">
			
			</view>
			<view class="logo">
				<text style="color: #878787;font-size:12px;">
					将使用微信登录后台
				</text>
				
			</view>
			<view style="margin-top: 30px">


			</view>
			<button class="bottom login" @tap="login">授权登录</button>
			<view style="margin-top: 10px">

			</view>
			<button class="bottom login1" @tap="back">取消登录</button>
			<view style="margin-bottom: 60px">

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

				ioption: 0,
				user: {},
				ion:0
			}
		},
		filters: {
			// 时间戳处理
			formatDate: function(value, spe = '/') {
				value = value * 1000
				let data = new Date(value);
				let year = data.getFullYear();
				let month = data.getMonth() + 1;
				let day = data.getDate();
				let h = data.getHours();
				let mm = data.getMinutes();
				let s = data.getSeconds();
				month = month > 10 ? month : "0" + month;
				day = day > 10 ? day : "0" + day;
				h = h > 10 ? h : "0" + h;
				mm = mm > 10 ? mm : "0" + mm;
				s = s > 10 ? s : "0" + s;
				return `${year}${spe}${month}${spe}${day} ${h}:${mm}:${s}`;
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			_self = this;
			console.log(option); //打印出上个页面传递的参数。
			let code=decodeURIComponent(option.scene)
			let code_g = code.split("=");
			this.ioption =code_g[1] ;

			let accountID = code_g[1];
			console.log(code)
			uniCloud.callFunction({
				name: 'db_user',
				data: {
					accountID: accountID,
					wx_unid: ""
				},
				success(res) {
					console.log(res);
					if (res.result.data!==[]) {
						
						let clientIP = res.result.data[0].clientIP;
						let os = res.result.data[0].os;
						let time = res.result.data[0].time;
						let wx_unid = res.result.data[0].wx_unid;
						let state = res.result.data[0].state;
						_self.user = {
							clientIP: res.result.data[0].clientIP,
							os: res.result.data[0].os,
							time: res.result.data[0].time,
							wx_unid: res.result.data[0].wx_unid,
							state: res.result.data[0].state
						}
						console.log(_self.user);
						console.log(time);
						let nowtime = Math.round(new Date() / 1000);
						console.log(nowtime);
						if (accountID == '') {
							uni.showModal({
								title: '非法访问',
								showCancel: false,
								success: function(res) {
									if (res.confirm) {
										uni.navigateBack();
									}
								}
							});

						}else if (time + 400 >= nowtime) {
							if (state == 2) {
								uni.showModal({
									title: '二维码已使用',
									showCancel: false,
									success: function(res) {
										if (res.confirm) {
											uni.navigateBack();
										}
									}
								});

							} else {
								if (state == 1) {
									uni.showModal({
										title: '二维码已使用',
										showCancel: false,
										success: function(res) {
											if (res.confirm) {
												uni.navigateBack();
											}
										}
									});
								} else {
									if (wx_unid !== '') {
										uni.showModal({
											title: '二维码已使用',
											showCancel: false,
											success: function(res) {
												if (res.confirm) {
													uni.navigateBack();
												}
											}
										});
									}else{
										
									}
								}
							}
						} else {
							uni.showModal({
								title: '二维码已过期',
								showCancel: false,
								success: function(res) {
									if (res.confirm) {
										uni.navigateBack();
									}
								}
							});

						}

					} else {
						uni.showModal({
							title: '二维码错误',
							showCancel: false,
							success: function(res) {
								if (res.confirm) {
									uni.navigateBack();
								}
							}
						});
					}
				}
			});

		},
		onShow() {



		},
		methods: {
			login() {
				console.log(uni.getStorageSync('wxuid'));
				uniCloud.callFunction({
					name: 'db_user',
					data: {
						accountID: this.ioption,
						wx_unid: uni.getStorageSync('wxuid'),
						state: 2
					},
					success(res) {
						uni.showModal({
							title: '登录成功',
							showCancel: false,
							success: function(res) {
								if (res.confirm) {
									uni.navigateBack();
								}
							}
						});
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
		background: #0055ff;
		width: 250px;
		color: #FFFFFF;
		font-size: 15px;
	}

	.login1 {
		border-radius: 10px;
		background: #FFFFFF;
		width: 250px;
		color: #0055ff;
		font-size: 15px;
		border-width: thin;
		border-style: solid;
		border-color: #0055ff;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.text-area {
		justify-content: center;
		top: 10%;
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

	.logo {
		display: flex;
		height: 60%;
		width: 100%;
		align-items: center; //适合单行显示的组件，垂直居中
		justify-content: center; //水平居中
		color: #FFFFFF;
	}
</style>
