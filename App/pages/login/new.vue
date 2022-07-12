<template>
	<view class="content" v-if="ion==1">
		<view class="text-area">
			<!-- <view style="text-align:center;font-size: larger;color: #2C405A;">
				用户登录 | Login
			</view> -->
			<view class="logo">
				<image src="../../static/my_service/images/link.png" style="width: 350rpx;height: 350rpx;"></image>

			</view>
			<view class="logo">
				<text style="font-size: smaller;color: #2C405A;">
					· 登录IP：{{user.clientIP}}
					· 操作系统：{{user.os}}
				</text>
			</view>
			<view style="margin-top: 10px">

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

				ioption: {},
				user: {},
				ion: 0
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
			this.ioption = option;
			if (option.type !== "wxlogin") {
				uni.showModal({
					title: '二维码错误',
					showCancel: false,
					success: function(res) {
						if (res.confirm) {
							uni.navigateBack();
						}
					}
				});
			} else {
				let clientID = this.ioption.clientID
				let clientIP = this.ioption.clientIP;
				let time = this.ioption.time;
				let os = this.ioption.os;
				if (clientIP == null && time == null && os == null && clientID == null) {
					uni.showModal({
						title: '非法请求',
						showCancel: false,
						success: function(res) {
							if (res.confirm) {
								uni.navigateBack();
							}
						}
					});
				} else {
					if (time + 300 >= nowtime) {
						uni.showModal({
							title: '二维码已过期，请重新获取（5分钟内有效）',
							showCancel: false,
							success: function(res) {
								if (res.confirm) {
									uni.navigateBack();
								}
							}
						});
					} else {
						this.ion = 1
					}
				}
			}



		},
		onShow() {



		},
		methods: {
			login() {
				console.log(uni.getStorageSync('wxuid'));
				uniCloud.callFunction({
					name: 'db_user',
					data: {
						clientID: clientID,
						clientIP: clientIP,
						time: time,
						os: os,
						wx_openid: uni.getStorageSync('wxuid'),
						state: 1
					},
					success(res) {
						console.log(res)
						
					}
				})
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
