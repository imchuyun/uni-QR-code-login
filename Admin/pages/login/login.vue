<template>
	<view class="login-box">
		<view class="back">
			<text title="V1.0" class="title">V1.0</text>
			<view class="admin-logo">
				<text title="后台登录" class="title-a">后台登录</text>
			</view>


			<view class="uni-container">
				<view>
					<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem"
						styleType="button" activeColor="#007AFF"></uni-segmented-control>
					<text>\n</text>
					<view class="content">
						<view v-show="current === 0">
							<uni-forms ref="form" v-model="formData" :rules="rules" @submit="submit">
								<uni-forms-item left-icon="person-filled" name="username" labelWidth="35">
									<input ref="usernameInput" @confirm="submitForm" class="uni-input-border"
										type="text" :placeholder="$t('login.field.username')"
										v-model="formData.username" />
								</uni-forms-item>
								<uni-forms-item left-icon="locked-filled" class="icon-container" name="password"
									labelWidth="35">
									<input ref="passwordInput" @confirm="submitForm" class="uni-input-border"
										:password="showPassword" :placeholder="$t('login.field.password')"
										v-model="formData.password" />
									<text class="uni-icon-password-eye pointer"
										:class="[!showPassword ? 'uni-eye-active' : '']"
										@click="changePassword">&#xe568;</text>
								</uni-forms-item>
								<uni-forms-item v-if="needCaptcha" left-icon="image" class="icon-container"
									name="captcha" labelWidth="35">
									<input ref="captchaInput" @confirm="submitForm" class="uni-input-border" type="text"
										:placeholder="$t('login.field.captcha')" v-model="formData.captcha" />
									<view class="admin-captcha-img pointer" @click="createCaptcha">
										<i v-if="captchaLoading" class="uni-loading"></i>
										<img v-else :src="captchaBase64" style="width:120px; height:32px" />
									</view>
								</uni-forms-item>
								<view class="uni-button-group">
									<button class="uni-button uni-button-full" type="primary" :loading="loading"
										:disabled="loading" @click="submitForm">{{$t('login.button.login')}}</button>
								</view>
							</uni-forms>
							<view class="uni-tips">
								<text class="uni-tips-text" @click="initAdmin">{{$t('login.text.prompt')}}...</text>
							</view>
						</view>
						<view v-show="current === 1">

							<view class="content_code" v-show="load === 0">
								<image :src="code" mode="" class="image"></image>
							</view>

							<view class="content_code" v-show="load === 1">
								<image src="/static/icode.png" mode="" class="image"></image>
							</view>

							<view @click="refresh" class="content_code">
								<uni-icons type="refresh-filled" color="#007aff" size="24"></uni-icons>
							</view>
							<view class="content_code">
								<text class="title">（5分钟内有效）</text>
							</view>
							<view class="content_code">
								<text class="title">微信扫一扫 -> 打开小程序 -> 授权登录</text>

							</view>

							<view v-show="2 == 1">
								<view class="code_div">
									<view v-for="(item, index) in item1">
										<view class="code_style">{{ item }}</view>
									</view>
									<view></view>
									<view @click="refresh">
										<uni-icons type="refresh-filled" color="#007aff" size="24"></uni-icons>
									</view>
								</view>
								<view class="content_code">
									<text class="title">输入登录码也可登录</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapActions
	} from 'vuex'
	import config from '@/admin.config.js'
	import {
		getDeviceUUID
	} from '@/js_sdk/uni-admin/util.js'

	const captchaOptions = {
		deviceId: getDeviceUUID(),
		scene: 'login'
	}

	export default {
		data() {
			return {
				...config.navBar,
				moduleKey: 0,
				intervalID: 0,
				load: 0,
				state: '',
				code: '',
				item1: [],
				accountID: '',
				current: 0,
				items: [
					'账号密码登录',
					'微信登录'
				],
				indexPage: config.index.url,
				showPassword: true,
				loading: false,
				formData: {
					username: '',
					password: '',
					captcha: '',
				},
				captchaLoading: false,
				needCaptcha: false,
				captchaBase64: '',
				rules: {
					// 对name字段进行必填验证
					username: {
						rules: [{
								required: true,
								errorMessage: '请输入账户',
							},
							{
								minLength: 1,
								maxLength: 30,
								errorMessage: '账户长度在{minLength}到{maxLength}个字符',
							}
						]
					},
					// 对email字段进行必填验证
					password: {
						rules: [{
								required: true,
								errorMessage: '请输入正确的密码',
							},
							{
								minLength: 6,
								errorMessage: '密码长度大于{minLength}个字符',
							}
						]
					},
					// 对captcha字段进行必填验证
					captcha: {
						rules: [{
							required: true,
							errorMessage: '请输入验证码',
						}]
					}
				}
			}
		},
		mounted() {
			// #ifdef H5
			// #ifndef VUE3
			this.focus()
			// #endif
			// #endif
			const self = this
			uni.getStorage({
				key: "lastUsername",
				success: function(res) {
					self.formData.username = res.data
				}
			})
			// this.getNeedCaptcha()
		},

		methods: {
			refresh() {
				uni.navigateTo({
					url: '/pages/login/login?s=wechat'
				})
			},
			update() {
				this.$forceUpdate()
			},
			code_get() {


				var _self = this;

				uniCloud.callFunction({
					name: 'wxlogin_code',
					data: {},
					success(res) {
						//console.log(res);
						//console.log(res.result);
						const arrayBuffer = new Uint8Array(res.result[0].data);
						const base64 = uni.arrayBufferToBase64(arrayBuffer);
						let src = 'data:image/jpeg;base64,' + base64;
						//console.log(src);
						_self.code = src;
						_self.accountID = res.result[1];
						_self.item1 = _self.accountID.split('');
						console.log(_self.accountID);
					},
					fail(e) {
						console.log("error" + e);
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
			...mapActions({
				init: 'app/init'
			}),
			...mapMutations({
				setToken(commit, tokenInfo) {
					commit('user/SET_TOKEN', tokenInfo)
				}
			}),
			submit(event) {
				if (this.loading) {
					return
				}
				const {
					errors,
					value
				} = event.detail
				if (errors) {
					return
				}
				// #ifdef H5
				// #ifndef VUE3
				this.$refs.usernameInput.$refs.input.blur()
				this.$refs.passwordInput.$refs.input.blur()
				this.$refs.captchaInput && this.$refs.captchaInput.$refs.input.blur()
				// #endif
				// #endif
				this.loading = true
				this.$request('login', {
					...value,
					captchaOptions
				}, {
					functionName: 'uni-id-cf',
					showModal: false
				}).then(res => {
					this.setToken({
						token: res.token,
						tokenExpired: res.tokenExpired
					})
					return this.init().then(() => {
						uni.showToast({
							title: '登录成功',
							icon: 'none'
						})
						uni.setStorage({
							key: 'lastUsername',
							data: value.username
						});
						uni.redirectTo({
							url: this.indexPage,
						})
					})
				}).catch(err => {
					if (err.needCaptcha) {
						this.formData.captcha = ''
						this.createCaptcha()
						this.needCaptcha = true
					}
					const that = this
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false,
						success: function() {
							// #ifdef H5
							// #ifndef VUE3
							if (err.code === 10101 && that.$refs.usernameInput) {
								that.$refs.usernameInput.$refs.input.focus()
							}
							if (err.code === 10102 && that.$refs.passwordInput) {
								that.$refs.passwordInput.$refs.input.focus()
							}
							if (err.code === 10002 && that.$refs.captchaInput) {
								that.$refs.captchaInput.$refs.input.focus()
							}
							// #endif
							// #endif
						}
					})
				}).finally(err => {
					this.loading = false
				})

			},

			createCaptcha() {
				this.captchaLoading = true
				this.$request('createCaptcha', captchaOptions, {
					functionName: 'uni-id-cf'
				}).then(res => {
					if (res.code === 0) {
						this.captchaBase64 = res.captchaBase64
					}
				}).catch(err => {}).finally(err => {
					this.captchaLoading = false
				})
			},

			confirmForm(name, value) {
				// this.binddata(name, value)
				this.submitForm()
			},
			run() {
				console.log("微信登录检测开始");
				console.log(this.accountID);
				uniCloud.callFunction({
					name: 'wxlogin_client',
					data: {
						"accountID": this.accountID
					},
					success(res) {
						console.log(res);
						console.log(res.result.data[0])
						if (res.result.data[0].state == 1) {
							console.log("已扫描");
							uni.showModal({
								title: '请在小程序上确认登录',
								showCancel: false
							});
							this.code = "/static/icode.png"
							this.load = 1
							console.log(this.code);
							console.log(this.load);

						} else {
							if (!res.result.data[0].wx_unid == "") {
								console.log("微信登录成功");
								uniCloud.callFunction({
									name: 'user-center',
									data: {
										uid: "61aa25be3976eb00014da677"
									},
									fail: res => {
										console.log(res);
									},
									success(res) {
										console.log(res)
										if (res.result.token !== null) {
											uni.setStorageSync('uni_id_token', res.result.token);
											uni.setStorageSync('token', res.result.token);
											uni.setStorageSync('uni_id_token_expired', res.result
												.tokenExpired);
											console.log(res.result.token);
											console.log("登录成功");
											console.log("清理" + uni.getStorageSync("intervalID"))


											uni.navigateTo({
												url: '/pages/index/index'
											})
											clearInterval(uni.getStorageSync("intervalID"));

										}
									}
								});


							}
						}

					},
					fail(e) {
						console.log(e);
					}
				});

			},
			btnwx() {
				uni.navigateTo({
					url: '/pages/login/wx',
					animationType: 'fade-in',
					animationDuration: 1000,
					success: (res) => {
						console.log(res)
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			submitForm() {
				this.$refs.form.submit()
			},
			onLoad() {
				uni.removeStorageSync("intervalID")
				this.loaddata();

			},
			reload: function() {
				this.$forceUpdate();
			},
			loaddata() {
				let uni_id_token = uni.getStorageSync('uni_id_token')
				console.log(uni_id_token)
				if (uni_id_token !== "") {
					uniCloud.callFunction({
						name: 'user-center',
						data: {
							token: uni_id_token
						},
						fail: res => {
							console.log(res);
						},
						success(res) {
							console.log(res.result.code)
							if (res.result.code == 0) {
								uni.navigateTo({
									url: '/pages/index/index',
									animationType: 'fade-in',
									animationDuration: 1000,
									success: (res) => {
										console.log(res)
									},
									fail: (err) => {
										console.log(err)
									}
								})
							}
						}
					});
				} else {
					uni.clearStorage();
				}

				this.code_get();

			},
			onClickItem(e) {

				this.current = e.currentIndex;
				if (e.currentIndex == 1) {
					console.log(this.intervalID);
					if (this.intervalID == 0) {
						this.intervalID = setInterval(this.run, 5000);
						//console.log("intervalID" + this.intervalID)
						uni.setStorageSync("intervalID", this.intervalID)
					}
				}
				if (e.currentIndex == 0) {
					clearInterval(this.intervalID);
					this.intervalID = 0
					console.log("微信登录检测关闭");
				}
			},
			initAdmin() {
				uni.redirectTo({
					url: '/pages/demo/init/init'
				})
			},
			changePassword: function() {
				this.showPassword = !this.showPassword;
			},
			// #ifdef H5
			focus: function() {
				this.$refs.usernameInput.$refs.input.focus()
			},
			// #endif
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		background-image: url(../../static/background.jpg);
		background-repeat: no-repeat;
		-moz-background-size: 100% 100%;

		background-repeat: no-repeat;
		background-size: cover;

	}

	.title-a {
		font-size: 25px;
		font-weight: 100;
	}

	.back {
		background-color: #FFFFFF;
		padding: 20px;
		border-radius: 7px 7px 7px 7px;
		box-shadow: 4px 4px 4px rgba(255, 255, 255, 0.4);
	}

	.image {
		width: 150px;
		height: 150px;
	}

	.login-box {
		position: relative;
		max-width: 350px;
		flex: 1;
		padding: 140px 35px 0;
		margin: 0 auto;
		overflow: hidden;
		/* background-color: #F5F5F5; */
		margin-top: -20px;
	}


	.underline:hover {
		text-decoration: underline;
	}

	.uni-tips {
		display: flex;
		justify-content: flex-end;
		margin-top: 15px;
	}

	.uni-tips-text {
		cursor: pointer;
		text-decoration: underline;
		font-size: 13px;
		color: #007AFF;
		opacity: 0.8;
	}

	.no-padding {
		padding: 0;
	}

	.admin-logo {
		display: flex;
		justify-content: center;
		margin-bottom: 20px;
	}

	.admin-logo image {
		height: 40px;
	}

	.admin-captcha-img {
		position: absolute;
		top: 1px;
		right: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #fff;
		width: 100px;
		height: 33px;
		border-left: 1px #E5E5E5 solid;
		border-right: 1px #E5E5E5 solid;
		border-radius: 0 5px 5px 0;
		background-color: #f9f9f9;
	}

	.admin-captcha-img img {
		border-radius: 5px;
	}

	.title {
		font-size: 5px;
		color: #303133;
	}

	.uni-loading:before {
		background: rgba(0, 0, 0, 0) url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=") no-repeat
	}

	.uni-loading {
		margin: 0 auto;
		width: 20px;
		height: 20px;
		display: inline-block;
		vertical-align: middle;
		-webkit-animation: uni-loading 1s steps(12) infinite;
		animation: uni-loading 1s steps(12) infinite;
		background-size: 100%
	}

	@-webkit-keyframes uni-loading {
		0% {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg)
		}

		to {
			-webkit-transform: rotate(1turn);
			transform: rotate(1turn)
		}
	}

	@keyframes uni-loading {
		0% {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg)
		}

		to {
			-webkit-transform: rotate(1turn);
			transform: rotate(1turn)
		}
	}

	.code_div {
		display: flex;
		flex-flow: row;
		justify-content: center;
	}

	.content_code {
		margin: 10px;
		display: flex;
		flex-flow: row;
		justify-content: center;

	}

	.code_style {
		padding: 2px;
		--status-bar-height: 0px;
		--top-window-height: 60px;
		--window-left: 350px;
		--window-right: 0px;
		--window-margin: 0px;
		--window-top: calc(var(--top-window-height) + calc(44px + env(safe-area-inset-top)));
		--window-bottom: 0px;
		user-select: none;
		-webkit-box-direction: normal;
		margin-right: 5px;
		-webkit-tap-highlight-color: transparent;
		position: relative;
		border: 0 solid #000;
		box-sizing: border-box;
		text-align: center;
		color: rgb(255, 255, 255);
		background-color: rgb(0, 122, 255);
		font-size: 14px;
		width: 20px;
		line-height: 20px;
		border-radius: 3px;
	}
</style>
