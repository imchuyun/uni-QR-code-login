<!--本页面由uniapp切片工具生成，uni-app切片-可视化设计工具(一套代码编译到7个平台iOS、Android、H5、小程序)，软件下载地址：http://www.ymznkf.com/new_view_669.htm -->
<template>
	<view class="YmContent">
		<view class="my_service_1">
			<view v-if="login==0">
				<image src="../../static/login/index_background.png" style="height: 40vw;width:100vw;">
					<view class="box_relative">

					</view>
			</view>
			<view class="my_service_2" @click="wxLogin" v-if="login==0">
				<image v-on:click="my_service_3_3_click()" src="/static/my_service/images/my_service_3_3.png"
					mode="scaleToFill" border="0" class="my_service_3" v-if="login==0"></image>
				<text decode="true" class="my_service_4" v-if="login==0">点我登录</text>
			</view>


			<view class="my_service_2" @click="wxLogin" v-if="login==1">
				<image v-on:click="my_service_3_3_click()" :src="wxuserInfo.avatarUrl" v-if="login==1"
					mode="scaleToFill" border="0" class="my_service_3"></image>
				
				<view class="texti">
					<text decode="true" class="my_service_4" v-if="login==1">{{wxuserInfo.nickName}}</text>
					</view>
				
			</view>


			<view v-if="login==1">
				<text decode="true" class="my_service_5">快捷服务</text>
				<view class="my_service_6">
					<view class="my_service_7" @click="sao">
						<image v-on:click="my_service_8_8_click()" src="/static/me/code.png"
							mode="scaleToFill" border="0" class="my_service_8"></image>
						<text decode="true" class="my_service_9">扫一扫</text>
					</view>
					<view class="my_service_10">
						<image v-on:click="my_service_11_11_click()"
							src="/static/my_service/images/my_service_11_11.jpg" mode="scaleToFill" border="0"
							class="my_service_11"></image>
						<text decode="true" class="my_service_12">售后政策</text>
					</view>
					<view class="my_service_13">
						<image v-on:click="my_service_14_14_click()"
							src="/static/my_service/images/my_service_14_14.jpg" mode="scaleToFill" border="0"
							class="my_service_14"></image>
						<text decode="true" class="my_service_15">维修价格</text>
					</view>
					<view class="my_service_16" @click="loginout">
						<image v-on:click="my_service_17_17_click()" src="/static/me/close.png"
							mode="scaleToFill" border="0" class="my_service_17"></image>
						<text decode="true" class="my_service_18">退出登录</text>
					</view>
				</view>
				<text decode="true" class="my_service_22">联系我们</text>
				<view class="my_service_20">
					<image v-on:click="my_service_23_23_click()" src="/static/my_service/images/my_service_23_23.jpg"
						mode="scaleToFill" border="0" class="my_service_23"></image>
					<view class="my_service_24">
						<text decode="true" class="my_service_25">联系我们</text>
						<text decode="true" class="my_service_26">微信：imchuyun</text>
					</view>
					<image v-on:click="my_service_29_29_click()" src="/static/my_service/images/my_service_29_29.jpg"
						mode="scaleToFill" border="0" class="my_service_29"></image>
				</view>
				<view class="my_service_30">
				</view>
				<text decode="true" class="my_service_48">官方服务</text>
				<view class="my_service_66">
					<image v-on:click="my_service_49_49_click()" src="/static/my_service/images/my_service_49_49.jpg"
						mode="scaleToFill" border="0" class="my_service_49"></image>
					<text decode="true" class="my_service_52">以旧换新</text>
					<text decode="true" class="my_service_53">用你的旧设备,换出新价值</text>
					<text decode="true" class="my_service_61">立即换新</text>
					<image v-on:click="my_service_64_64_click()" src="/static/my_service/images/my_service_64_64.jpg"
						mode="scaleToFill" border="0" class="my_service_64"></image>
				</view>
				<view class="my_service_67">
					<image v-on:click="my_service_50_50_click()" src="/static/my_service/images/my_service_50_50.jpg"
						mode="scaleToFill" border="0" class="my_service_50"></image>
					<text decode="true" class="my_service_56">手机保障服务</text>
					<text decode="true" class="my_service_57">官方保障原厂维修</text>
					<text decode="true" class="my_service_62">立即获取</text>
					<image v-on:click="my_service_65_65_click()" src="/static/my_service/images/my_service_65_65.jpg"
						mode="scaleToFill" border="0" class="my_service_65"></image>
				</view>
			</view>
		</view>

		<view class="loading">{{loadingText}}</view>
		<view class="ymBbottom"></view>
	</view>
</template>

<script>
	//本页面由uniapp切片工具生成，uni-app切片-可视化设计工具(一套代码编译到7个平台iOS、Android、H5、小程序)，软件下载地址：http://www.ymznkf.com/new_view_669.htm
	import app from "../../App.vue"


	// 定义全局参数,控制数据加载
	var _self, page = 1,
		timer = null;

	export default {
		data() {
			return {

				wxuserInfo: {},
				wxuid: "",
				login: ""

			}
		},
		components: {

		},
		onLoad(options) {
			_self = this;
			this.wxuid = uni.getStorageSync('wxuid');
			this.login = uni.getStorageSync('login');
			this.wxuserInfo = uni.getStorageSync('wxuserInfo');
			console.log(this.login);
			console.log(this.wxuserInfo);

			//检查是否登录参考代码,需要用的时候，可以把注释取掉
			//if(this.checkLogin()==false){
			//	return;
			//}

			//this.getLaction();//得到gps

			this.page = 0;

			//检测有没有传入id参数
			if (options.id != null && options.id != "") {
				this.id = options.id;
			}
			//执行初始化,需要用的时候，可以把注释取掉
			//this.Refresh("init");

		},
		onShow() {
			this.wxuid = uni.getStorageSync('wxuid');
			this.login = uni.getStorageSync('login');
			this.wxuserInfo = uni.getStorageSync('wxuserInfo');
			console.log(this.login);
			console.log(this.wxuserInfo);

			console.log("on show");
			//if(this.checkLogin()==false){
			//	return;
			//}

			//执行初始化,需要用的时候，可以把注释取掉
			//this.Refresh("init");
		},
		onPullDownRefresh: function() {
			//下拉刷新的时候请求一次数据
			console.log("刷新")
		},
		methods: {
			loginout() {
				uni.clearStorage();
				uni.showToast({
					title: "已退出",
					icon: 'none',
					duration: 2000
				})
				uni.navigateTo({
					url: '../wxlogin/index'
				});
			},
			sao() {
				// 只允许通过相机扫码
				uni.scanCode({
					success: function(res) {
						console.log('条码类型：' + res.scanType);
						if (res.scanType == "WX_CODE") { // 小程序码
							console.log(res.path);
							uni.navigateTo({
								url: "/" + res.path
							});
						}
						console.log('条码内容：' + res.result);
					},
					fail: function(res) {
						console.log(res)
					},
					complete: function(res) {
						console.log(res)
					},
				});
			},
			wxLogin() {
				uni.navigateTo({
					url: '../wxlogin/index'
				});
			},
			/**
			 * my_service_3_3处理函数
			 * 数据绑定  data-index="{{index}}" 
			 * 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
			 */
			my_service_3_3_click: function(event) {

			},

			/**
			 * my_service_8_8处理函数
			 * 数据绑定  data-index="{{index}}" 
			 * 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
			 */
			my_service_8_8_click: function(event) {

			},

			/**
			 * my_service_11_11处理函数
			 * 数据绑定  data-index="{{index}}" 
			 * 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
			 */
			my_service_11_11_click: function(event) {

			},

			/**
			 * my_service_14_14处理函数
			 * 数据绑定  data-index="{{index}}" 
			 * 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
			 */
			my_service_14_14_click: function(event) {

			},

			/**
			 * my_service_17_17处理函数
			 * 数据绑定  data-index="{{index}}" 
			 * 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
			 */
			my_service_17_17_click: function(event) {


			},

			/**
			 * my_service_23_23处理函数
			 * 数据绑定  data-index="{{index}}" 
			 * 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
			 */
			my_service_23_23_click: function(event) {

			},

			/**
			 * my_service_29_29处理函数
			 * 数据绑定  data-index="{{index}}" 
			 * 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
			 */
			my_service_29_29_click: function(event) {

			},

			/**
			 * my_service_49_49处理函数
			 * 数据绑定  data-index="{{index}}" 
			 * 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
			 */
			my_service_49_49_click: function(event) {

			},

			/**
			 * my_service_50_50处理函数
			 * 数据绑定  data-index="{{index}}" 
			 * 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
			 */
			my_service_50_50_click: function(event) {

			},

			/**
			 * my_service_64_64处理函数
			 * 数据绑定  data-index="{{index}}" 
			 * 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
			 */
			my_service_64_64_click: function(event) {

			},

			/**
			 * my_service_65_65处理函数
			 * 数据绑定  data-index="{{index}}" 
			 * 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
			 */
			my_service_65_65_click: function(event) {

			},



			//刷新数据
			Refresh: function(_action) {

				uni.showLoading();

				//提交到服务器
				var that = this
				var url = that.apiUrl + '{server_code_file_path}';
				console.log(url);
				uni.request({
					url: url, //后端接口地址，需要改成自己的接口地址
					data: {
						action: _action, //上传动作，如按钮点击会产生click动作，分页也会产生，在后端根据具体的动作来判断事件
						uid: that.getUid(), //上传用户id,在登录中获得
						//上传页面中的变量
						//定义变量---start

						//定义变量---end
						id: that.id, //上传id值，后端可以根据此值来操作当前id
						del_id: that.del_id, //在列表中删除按钮选中时，上传到有后端，进行删除操作
						page: that.page
					},
					method: 'GET',
					success: function(res) { //后端返回数据

						// 隐藏导航栏加载框  
						uni.hideNavigationBarLoading();
						// 停止下拉动作  
						uni.stopPullDownRefresh();

						// 隐藏加载框  
						uni.hideLoading();

						var tmp = res.data;

						//初始化，对页面上的控件进行赋值操作
						if (_action == "init") {

						}

						{
							deal_listpages
						}



						//如果后端有返回消息，则弹出消息提示
						if (tmp.message != null && tmp.message != "") {
							uni.showToast({
								title: tmp.message,
								icon: 'none',
								duration: 2000
							})
						}



						//如果后端有返回页码，则更改当前页码
						if (tmp.page != null && tmp.page != "") {
							page = tmp.page;
						}

					},
					fail: function(res) {
						uni.showToast({
							title: "服务器访问失败",
							icon: 'none',
							duration: 2000
						})
						console.log(res.data);
						console.log('is failed')
					}
				})
			},
		}
	}
</script>

<style>
	//本页面由uniapp切片工具生成，uni-app切片-可视化设计工具(一套代码编译到7个平台iOS、Android、H5、小程序)，软件下载地址：http://www.ymznkf.com/new_view_669.htm
	html,
	body,
	#app {
		height: 100%;
		width: 100%;
	}

	.YmContent {
		height: 100%;
		width: 100%;
	}

	uni-page-body,
	#app {
		height: 100%;
	}

	button::after {
		border: none;
		width: auto;
	}

	input {
		outline: none;
		border: none;
		list-style: none;
		width: auto;
	}

	.list_item {
		float: left;
	}

	.ym_hide {
		display: none;
	}

	.ym_show {
		display: block;
	}

	.slide-image {
		width: 100%;
		height: 100%;
	}

	.list_horizontal {
		width: auto;
		display: inline-block;
	}

	.my_service_1 {
		white-space: normal;
		width: 749upx;
		min-height: 1379upx;
		padding: 0upx;
		clear: both;
		float: left;
		background-color: #ffffff;
		border-radius: 0upx;
		font-size: 8upx;
	}

	.my_service_1 .my_service_2 {
		white-space: normal;
		width: 663upx;
		height: 113upx;
		padding: 0upx;
		clear: both;
		margin-top: 40upx;
		margin-left: 43upx;
		float: left;
		border-bottom-color: #e1e1e1;
		border-bottom-width: 1upx;
		border-bottom-style: solid;
		border-radius: 0upx;
		font-size: 8upx;
	}

	.my_service_1 .my_service_2 .my_service_3 {
		white-space: normal;
		width: 73upx;
		height: 73upx;
		overflow: hidden;
		padding: 0upx;
		margin-top: 9upx;
		margin-left: 6upx;
		float: left;
		border-radius: 53upx;
		font-size: 8upx;
		line-height: 73upx;
	}

	.my_service_1 .my_service_2 .my_service_4 {
		white-space: normal;
		width: 382upx;
		height: 36upx;
		padding: 0upx;
		margin-top: 29upx;
		margin-left: 36upx;
		float: left;
		border-radius: 0upx;
		color: #000000;
		font-size: 30upx;
		line-height: 36upx;
	}

	.my_service_1 .my_service_5 {
		white-space: normal;
		width: 119upx;
		height: 37upx;
		padding: 0upx;
		clear: both;
		margin-top: 43upx;
		margin-left: 41upx;
		float: left;
		border-radius: 0upx;
		color: #c8c8c8;
		font-size: 22upx;
		line-height: 37upx;
	}

	.my_service_1 .my_service_6 {
		white-space: normal;
		width: 693upx;
		height: 186upx;
		padding: 0upx;
		clear: both;
		margin-top: 18upx;
		margin-left: 35upx;
		float: left;
		border-radius: 0upx;
		font-size: 8upx;
	}

	.my_service_1 .my_service_6 .my_service_7 {
		white-space: normal;
		width: 108upx;
		height: 128upx;
		padding: 0upx;
		margin-top: 29upx;
		margin-left: 4upx;
		float: left;
		border-radius: 0upx;
		font-size: 8upx;
	}

	.my_service_1 .my_service_6 .my_service_7 .my_service_8 {
		white-space: normal;
		width: 78upx;
		height: 78upx;
		padding: 0upx;
		clear: both;
		margin-top: 0upx;
		margin-left: 14upx;
		float: left;
		border-radius: 0upx;
		font-size: 8upx;
		line-height: 78upx;
	}

	.my_service_1 .my_service_6 .my_service_7 .my_service_9 {
		white-space: normal;
		width: 108upx;
		height: 24upx;
		padding: 0upx;
		clear: both;
		margin-top: 25upx;
		margin-left: 0upx;
		float: left;
		text-align: center;
		justify-content: center;
		border-radius: 0upx;
		color: #808080;
		font-size: 20upx;
		line-height: 24upx;
	}

	.my_service_1 .my_service_6 .my_service_10 {
		white-space: normal;
		width: 108upx;
		height: 128upx;
		padding: 0upx;
		margin-top: 29upx;
		margin-left: 79upx;
		float: left;
		border-radius: 0upx;
		font-size: 8upx;
	}

	.my_service_1 .my_service_6 .my_service_10 .my_service_11 {
		white-space: normal;
		width: 77upx;
		height: 79upx;
		padding: 0upx;
		clear: both;
		margin-top: 0upx;
		margin-left: 14upx;
		float: left;
		border-radius: 0upx;
		font-size: 8upx;
		line-height: 79upx;
	}

	.my_service_1 .my_service_6 .my_service_10 .my_service_12 {
		white-space: normal;
		width: 108upx;
		height: 24upx;
		padding: 0upx;
		clear: both;
		margin-top: 24upx;
		margin-left: 0upx;
		float: left;
		text-align: center;
		justify-content: center;
		border-radius: 0upx;
		color: #808080;
		font-size: 20upx;
		line-height: 24upx;
	}

	.my_service_1 .my_service_6 .my_service_13 {
		white-space: normal;
		width: 108upx;
		height: 127upx;
		padding: 0upx;
		margin-top: 30upx;
		margin-left: 79upx;
		float: left;
		border-radius: 0upx;
		font-size: 8upx;
	}

	.my_service_1 .my_service_6 .my_service_13 .my_service_14 {
		white-space: normal;
		width: 78upx;
		height: 78upx;
		padding: 0upx;
		clear: both;
		margin-top: 0upx;
		margin-left: 14upx;
		float: left;
		border-radius: 0upx;
		font-size: 8upx;
		line-height: 78upx;
	}

	.my_service_1 .my_service_6 .my_service_13 .my_service_15 {
		white-space: normal;
		width: 108upx;
		height: 24upx;
		padding: 0upx;
		clear: both;
		margin-top: 24upx;
		margin-left: 0upx;
		float: left;
		text-align: center;
		justify-content: center;
		border-radius: 0upx;
		color: #808080;
		font-size: 20upx;
		line-height: 24upx;
	}

	.my_service_1 .my_service_6 .my_service_16 {
		white-space: normal;
		width: 110upx;
		height: 127upx;
		padding: 0upx;
		margin-top: 30upx;
		margin-left: 79upx;
		float: left;
		border-radius: 0upx;
		font-size: 8upx;
	}

	.my_service_1 .my_service_6 .my_service_16 .my_service_17 {
		white-space: normal;
		width: 79upx;
		height: 77upx;
		padding: 0upx;
		clear: both;
		margin-top: 0upx;
		margin-left: 14upx;
		float: left;
		border-radius: 0upx;
		font-size: 8upx;
		line-height: 77upx;
	}

	.my_service_1 .my_service_6 .my_service_16 .my_service_18 {
		white-space: normal;
		width: 107upx;
		height: 24upx;
		padding: 0upx;
		clear: both;
		margin-top: 25upx;
		margin-left: 0upx;
		float: left;
		text-align: center;
		justify-content: center;
		border-radius: 0upx;
		color: #808080;
		font-size: 20upx;
		line-height: 24upx;
	}

	.my_service_1 .my_service_22 {
		white-space: normal;
		width: 119upx;
		height: 27upx;
		padding: 0upx;
		clear: both;
		margin-top: 39upx;
		margin-left: 41upx;
		float: left;
		border-radius: 0upx;
		color: #c8c8c8;
		font-size: 23upx;
		line-height: 27upx;
	}

	.my_service_1 .my_service_20 {
		white-space: normal;
		width: 661upx;
		height: 83upx;
		padding: 0upx;
		clear: both;
		margin-top: 49upx;
		margin-left: 43upx;
		float: left;
		border-radius: 0upx;
		font-size: 8upx;
	}

	.my_service_1 .my_service_20 .my_service_23 {
		white-space: normal;
		width: 78upx;
		height: 78upx;
		padding: 0upx;
		margin-top: 4upx;
		margin-left: 13upx;
		float: left;
		border-radius: 0upx;
		font-size: 8upx;
		line-height: 78upx;
	}

	.my_service_1 .my_service_20 .my_service_24 {
		white-space: normal;
		width: 434upx;
		height: 74upx;
		padding: 0upx;
		margin-top: 8upx;
		margin-left: 40upx;
		float: left;
		border-radius: 0upx;
		font-size: 8upx;
	}

	.my_service_1 .my_service_20 .my_service_24 .my_service_25 {
		white-space: normal;
		width: 434upx;
		height: 33upx;
		padding: 0upx;
		clear: both;
		margin-top: 0upx;
		margin-left: 0upx;
		float: left;
		border-radius: 0upx;
		color: #000000;
		font-size: 32upx;
		line-height: 33upx;
	}

	.my_service_1 .my_service_20 .my_service_24 .my_service_26 {
		white-space: normal;
		width: 434upx;
		height: 25upx;
		padding: 0upx;
		clear: both;
		margin-top: 15upx;
		margin-left: 0upx;
		float: left;
		border-radius: 0upx;
		color: #646464;
		font-size: 27upx;
		line-height: 25upx;
	}

	.my_service_1 .my_service_20 .my_service_29 {
		white-space: normal;
		width: 15upx;
		height: 27upx;
		padding: 0upx;
		margin-top: 31upx;
		margin-left: 78upx;
		float: left;
		border-radius: 0upx;
		font-size: 25upx;
		line-height: 27upx;
	}

	.my_service_1 .my_service_30 {
		white-space: normal;
		width: 663upx;
		height: 2upx;
		padding: 0upx;
		clear: both;
		margin-top: 36upx;
		margin-left: 43upx;
		float: left;
		background-color: #e1e1e1;
		border-radius: 0upx;
		font-size: 1upx;
		line-height: 2upx;
	}

	.my_service_1 .my_service_48 {
		white-space: normal;
		width: 119upx;
		height: 27upx;
		padding: 0upx;
		clear: both;
		margin-top: 46upx;
		margin-left: 41upx;
		float: left;
		border-radius: 0upx;
		color: #c8c8c8;
		font-size: 23upx;
		line-height: 27upx;
	}

	.my_service_1 .my_service_66 {
		white-space: normal;
		width: 663upx;
		position: relative;
		height: 109upx;
		padding: 0upx;
		clear: both;
		margin-top: 44upx;
		margin-left: 43upx;
		float: left;
		border-radius: 0upx;
		font-size: 8upx;
	}

	.my_service_1 .my_service_66 .my_service_49 {
		white-space: normal;
		width: 78upx;
		height: 78upx;
		padding: 0upx;
		margin-top: 10upx;
		margin-left: 14upx;
		float: left;
		position: absolute;
		top: 0upx;
		left: 0upx;
		border-radius: 0upx;
		font-size: 8upx;
		line-height: 78upx;
	}

	.my_service_1 .my_service_66 .my_service_52 {
		white-space: normal;
		width: 192upx;
		height: 33upx;
		padding: 0upx;
		margin-top: 13upx;
		margin-left: 133upx;
		float: left;
		position: absolute;
		top: 0upx;
		left: 0upx;
		border-radius: 0upx;
		color: #000000;
		font-size: 31upx;
		line-height: 33upx;
	}

	.my_service_1 .my_service_66 .my_service_53 {
		white-space: normal;
		width: 338upx;
		height: 27upx;
		padding: 0upx;
		margin-top: 61upx;
		margin-left: 133upx;
		float: left;
		position: absolute;
		top: 0upx;
		left: 0upx;
		border-radius: 0upx;
		color: #646464;
		font-size: 24upx;
		line-height: 27upx;
	}

	.my_service_1 .my_service_66 .my_service_61 {
		white-space: normal;
		width: 109upx;
		height: 26upx;
		padding: 0upx;
		margin-top: 36upx;
		margin-left: 526upx;
		float: left;
		position: absolute;
		top: 0upx;
		left: 0upx;
		border-radius: 0upx;
		color: #c8c8c8;
		font-size: 24upx;
		line-height: 26upx;
	}

	.my_service_1 .my_service_66 .my_service_64 {
		white-space: normal;
		width: 15upx;
		height: 24upx;
		padding: 0upx;
		margin-top: 37upx;
		margin-left: 642upx;
		float: left;
		position: absolute;
		top: 0upx;
		left: 0upx;
		border-radius: 0upx;
		font-size: 22upx;
		line-height: 24upx;
	}

	.my_service_1 .my_service_67 {
		white-space: normal;
		width: 663upx;
		position: relative;
		height: 106upx;
		padding: 0upx;
		clear: both;
		margin-top: 43upx;
		margin-left: 43upx;
		float: left;
		border-radius: 0upx;
		font-size: 8upx;
	}

	.my_service_1 .my_service_67 .my_service_50 {
		white-space: normal;
		width: 78upx;
		height: 77upx;
		padding: 0upx;
		margin-top: 10upx;
		margin-left: 13upx;
		float: left;
		position: absolute;
		top: 0upx;
		left: 0upx;
		border-radius: 0upx;
		font-size: 8upx;
		line-height: 77upx;
	}

	.my_service_1 .my_service_67 .my_service_56 {
		white-space: normal;
		width: 255upx;
		height: 33upx;
		padding: 0upx;
		margin-top: 13upx;
		margin-left: 133upx;
		float: left;
		position: absolute;
		top: 0upx;
		left: 0upx;
		border-radius: 0upx;
		color: #000000;
		font-size: 30upx;
		line-height: 33upx;
	}

	.my_service_1 .my_service_67 .my_service_57 {
		white-space: normal;
		width: 336upx;
		height: 27upx;
		padding: 0upx;
		margin-top: 61upx;
		margin-left: 134upx;
		float: left;
		position: absolute;
		top: 0upx;
		left: 0upx;
		border-radius: 0upx;
		color: #646464;
		font-size: 27upx;
		line-height: 27upx;
	}

	.my_service_1 .my_service_67 .my_service_62 {
		white-space: normal;
		width: 108upx;
		height: 26upx;
		padding: 0upx;
		margin-top: 36upx;
		margin-left: 526upx;
		float: left;
		position: absolute;
		top: 0upx;
		left: 0upx;
		border-radius: 0upx;
		color: #646464;
		font-size: 24upx;
		line-height: 26upx;
	}

	.my_service_1 .my_service_67 .my_service_65 {
		white-space: normal;
		width: 15upx;
		height: 24upx;
		padding: 0upx;
		margin-top: 37upx;
		margin-left: 642upx;
		float: left;
		position: absolute;
		top: 0upx;
		left: 0upx;
		border-radius: 0upx;
		font-size: 22upx;
		line-height: 24upx;
	}

	.box_relative {
		position: absolute;
		top: 150upx;
		text-align: center;
		font-size: 15px;
	}
	
	.texti{
		display: inline-block;

	}
</style>
