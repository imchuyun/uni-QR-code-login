<template>
	<scroll-view style="padding: 15px;box-sizing: border-box;">
		{{ $t("index.text.prompt") }}
		<text style="color: #666; font-size: 15px;">（ v{{adminVersion}}, {{ $t("index.text.vesion") }}）</text>
		<!-- #ifndef H5 -->
		<fix-window />
		<!-- #endif -->
	</scroll-view>
</template>

<script>
	import {
		version
	} from '../../package.json'

	export default {
		data() {
			return {
				adminVersion: version,
			}
		},
		watch: {

		},
		onLoad: function(option) {
		},
		// methods: {
		// 	onLoad() {
		// 		this.data()
		// 	},
		// 	data() {
		// 		console.log("hello")
		// 	}
		// },
		onTabItemTap(e) {
			// tab 点击时执行，此处直接接收单击事件
			console.log(e)
		}
	}
</script>

<style>
	/* #ifndef H5 */
	page {
		padding-top: 85px;
	}

	/* #endif */
</style>
