<template>
	<view>
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="button"
			activeColor="#007AFF"></uni-segmented-control>
		<view class="content">
			<view v-show="current === 0">
				选项卡1的内容
			</view>
			<view v-show="current === 1">
				<image :src="code" mode="" class="image"></image>
				<uni-link href="" :text="accountID"></uni-link>
			</view>
			<view v-show="current === 2">
				选项卡3的内容
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				code: '',
				accountID: '',
				current:0,
				items:[
					'账号密码登录',
					'微信登录'
				]
			}
		},
		methods: {
			code_get() {
				var _self = this;
				uniCloud.callFunction({
					name: 'wxlogin_code',
					data: {
						"appid": "wxbbc48eccdfa1006d",
						"secret": "40f7bf84274f264999090d3a43acc490"
					},
					success(res) {
						console.log(res.result);
						const arrayBuffer = new Uint8Array(res.result[0].data);
						const base64 = uni.arrayBufferToBase64(arrayBuffer);
						let src = 'data:image/jpeg;base64,' + base64;
						//console.log(src);
						_self.code = src;
						_self.accountID = res.result[1];
						console.log(_self.accountID);
					},
					fail(e) {
						console.log(e);
					}
				});
				// uniCloud.callFunction({
				// 	name: 'wxlogin_app',
				// 	data: {},
				// 	success(res) {
				// 		uniCloud.callFunction({
				// 			name: 'wxlogin_code',
				// 			data: {
				// 				"appid":res.result.data[0].wx_appid,
				// 				"secret":res.result.data[0].wx_secret
				// 			},
				// 			success(res) {
				// 				console.log(res.result);
				// 				const arrayBuffer = new Uint8Array(res.result[0].data);
				// 				const base64 = uni.arrayBufferToBase64(arrayBuffer);
				// 				let src = 'data:image/jpeg;base64,' + base64;
				// 				//console.log(src);
				// 				_self.code = src;
				// 				_self.accountID=res.result[1];
				// 				console.log(_self.accountID);
				// 			},
				// 			fail(e) {
				// 				console.log(e);
				// 			}
				// 		});
				// 	},
				// 	fail(e) {
				// 		console.log(e);
				// 	}
				// });

			},
			onLoad() {

				this.loaddata();

			},
			loaddata() {


				this.code_get();

			},onClickItem(e){
				this.current=e.currentIndex;
			}
		}
	}
</script>

<style>
	.image {
		width: 280rpx;
		height: 280rpx;
	}
</style>
