<template>
	<view class="tabbar rowAroundCenter" style="width: 100%;height: 145rpx;display: flex;justify-content: space-between;background-color: #fff;padding-top: 30rpx;">
		<view class="tab_home rowCenter" style="width: 30%;height: 40rpx;">
			<view class="columnCenter" v-show="tabIndexs!=1" @tap="tabChange1" style="margin: 0 auto;">
				<image class="tabbar_icon" :src="homeIcon" mode="" style="text-align: center;"></image>
				<view class="tabTitle" style="width: 30%;height: 70rpx;">首页</view>
			</view>
			 <!-- @tap="tabChange1" -->
			<view class="columnCenter" v-show="tabIndexs==1" style="text-align: center;">
				<image class="tabbar_icon" :src="homeIconed" mode="" style="width: 30%;height: 70rpx;"></image>
				<view class="tabTitle_actived">首页</view>
			</view>
		</view>
		
		<view class="tab_mine rowCenter" style="width: 30%;height: 40rpx;">
			<view class="columnCenter" v-show="tabIndexs!=2" @tap="tabChange2" style="text-align: center;">
				<image class="tabbar_icon" :src="mineIcon" mode="" style="width: 30%;height: 70rpx;"></image>
				<view class="tabTitle">医院设备</view>
			</view>
			<view class="columnCenter" v-show="tabIndexs==2" @tap="tabChange2" style="">
				<image class="tabbar_icon" :src="mineIconed" mode="" style="text-align: center;"></image>
				<view class="tabTitle_actived" style="width: 30%;height: 70rpx;">医院设备</view>
			</view>
		</view>
		
		<view class="tab_mine rowCenter" style="width: 30%;height: 40rpx;">
			<view class="columnCenter" v-show="tabIndexs!=3" @tap="tabChange3" style="text-align: center;">
				<image class="tabbar_icon" :src="mineIcon" mode="" style="width: 30%;height: 70rpx;"></image>
				<view class="tabTitle" >医院中心</view>
			</view>
			<view class="columnCenter" v-show="tabIndexs==3" @tap="tabChange3" style="">
				<image class="tabbar_icon" :src="mineIconed" mode="" style="text-align: center;"></image>
				<view class="tabTitle_actived" style="width: 30%;height: 70rpx;">医院中心</view>
			</view>
		</view>
	</view>
</template>

<script>
	// import home from 'https://images.weserv.nl/?url=https://www.yp10000.com/static/img/home@2x.png'
	// import home_actived from 'https://images.weserv.nl/?url=https://www.yp10000.com/static/img/home_actived@2x.png'
	// import shebei from 'https://images.weserv.nl/?url=https://www.yp10000.com/static/img/sCode.png'
	// import shebei_actived from 'https://images.weserv.nl/?url=https://www.yp10000.com/static/img/scanCode.png'
	// import mine from 'https://images.weserv.nl/?url=https://www.yp10000.com/static/img/mine@2x.png'
	// import mine_actived from 'https://images.weserv.nl/?url=https://www.yp10000.com/static/img/mine_actived@2x.png'
	export default {
		props:['tabIndexs'],
		data() {
			return {
				homeIcon: 'https://www.yp10000.com/static/img/hos/33.png',
				homeIconed: 'https://www.yp10000.com/static/img/hos/32.png',
				shebeiIcon: 'https://www.yp10000.com/static/img/hos/31.png',
				shebeiIconed: 'https://www.yp10000.com/static/img/hos/30.png',
				mineIcon: 'https://www.yp10000.com/static/img/hos/26.png',
				mineIconed: 'https://www.yp10000.com/static/img/hos/27.png',
				tabIndex: 1,
			}
		},
		onShow() {
			
		},
		methods: {
			tabChange1() {
				this.tabIndex = 1
				
				uni.navigateTo({
					url: '/pages/nosocomial/Home/index'
				})
			},
			tabChange2() {
				this.tabIndex=2
				uni.navigateTo({
					url: '/pages/nosocomial/device/index'
				})
			},
			tabChange3() {
				this.tabIndex = 3
				uni.navigateTo({
					url: '/pages/nosocomial/mine/PersonalCenter/index'
				})
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	// .tabbar {
	// 	width: 100%;
	// 	height: 130rpx;
	// 	position: fixed;
	// 	display: flex;
	// 	justify-content: space-between;
	// 	bottom: 0;
	// 	left: 0;
	// 	right: 0;
	// 	z-index: 999;
	// 	background: #fff;
	// 	padding-bottom: constant(safe-area-inset-bottom);//兼容 IOS<11.2
	// 	padding-bottom: env(safe-area-inset-bottom);//兼容 IOS>11.2
	// }

	// .tabbar_icon {
	// 	width: 44rpx;
	// 	height: 40rpx;
	// 	margin-bottom: 4rpx;
	// }

	// .tabbar_icon2 {
	// 	width: 44rpx;
	// 	height: 48rpx;
	// 	margin-bottom: 4rpx;
	// }

	// .tab_home,
	// .tab_shebei,
	// .tab_mine {
	// 	width: 33%;
	// }

	// .tabTitle {
	// 	font-size: 26rpx;
	// 	font-family: PingFangSC-Regular, PingFang SC;
	// 	font-weight: 400;
	// 	color: #D8D8D8;
	// }

	// .tabTitle_actived {
	// 	font-size: 26rpx;
	// 	font-family: PingFangSC-Regular, PingFang SC;
	// 	font-weight: 400;
	// 	color: #000000;
	// }
</style>
