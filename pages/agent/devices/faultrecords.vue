<template>
	<view class="containet" style="padding: 30rpx;">
		<view class="" style="">
			<view class="" style="margin: 40rpx 0rpx;">
				故障编号<text style="margin-left: 30rpx;color: #a4a6a7;">1234567890</text>
			</view>
			<view class="" style="margin: 40rpx 0rpx;">
				维修时间<text style="margin-left: 30rpx;color: #a4a6a7;">2022-10-10 12:10</text>
			</view>
			<view class="" style="margin: 40rpx 0rpx;">
				设备编号<text style="margin-left: 30rpx;color: #a4a6a7;">12345</text>
			</view>
			<view class="" style="margin: 40rpx 0rpx;">
				设备地址<text style="margin-left: 30rpx;color: #a4a6a7;">郑大一附院</text>
			</view>
			<view class="" style="margin: 40rpx 0rpx;">
				维修状态<text style="margin-left: 30rpx;color: #a4a6a7;">维修完成</text>
			</view>
			<view class="" style="margin: 40rpx 0rpx;display: flex;">
				<view class="" style="width: 20%;">
					故障描述
				</view>
				<text style="margin-left: 30rpx;color: #a4a6a7;">打不开呀打不开怎么办呀怎么办麻烦您赶紧维修一下吧</text>
			</view>
		</view>
		<view class="" style="position: relative;margin-top: 30rpx;">
			设备图片 <image src="../../../static/login.jpg" mode="" style="width: 200rpx;height: 200rpx;position: absolute;margin-left: 30rpx;"></image>
		</view>
	</view>
</template>
<script>
	// import {selectGoodsOrder,selectLeaseOrder,selectDepartment} from '@/api/system/hospital'
	export default{
		data(){
			return{
			}
		},
		onLoad() {
			// this.getLease()
		},
		methods:{
			navigateTo(url){
				console.log('hahah',url);
				uni.navigateTo({
					url:url
					
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.containet{
		width: 100%;height: 100vh;background-color: #fff;
	}
	
		 
</style>