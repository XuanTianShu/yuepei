<template>
	<view class="container" style="">
		<uni-nav-bar left-icon="left" :border="false" :fixed="true" statusBar @clickLeft="back"    title="设备管理" background-color="#64d059" />
		<view class="title" style="" >
			
			<view class="" style="font-size: 90rpx;">
				{{deviceSum}}
			</view>
			<view class="">
				设备总数
			</view>
			
				
		</view>
		
		<view  class="content" style="">
			
			<view class="list" style="">
				<view class="item" style=""  @click="getdevice(1)">
					<view class="" style="display: flex">
						<image src="https://www.yp10000.com/static/img/yunwei/14.png" style="height: 50rpx;width: 50rpx;" mode=""></image>
						<view style="line-height: 50rpx;margin-left: 20rpx;">设备故障</view>
					</view>
					<view class="" style="line-height: 50rpx;">
						<uni-icons type="forward" size="15" style=""></uni-icons>
					</view>
					
				</view>
				<view class="item" style=""  @click="getdevice(2)">
					<view class="" style="display: flex">
						<image src="https://www.yp10000.com/static/img/yunwei/15.png" style="height: 50rpx;width: 50rpx;" mode=""></image>
						<view style="line-height: 50rpx;margin-left: 20rpx;">缺货设备</view>
					</view>
					<view class="" style="line-height: 50rpx;">
						<uni-icons type="forward" size="15" style=""></uni-icons>
					</view>
					
				</view>
				<view class="item" style=""  @click="getdevice(3)">
					<view class="" style="display: flex">
						<image src="https://www.yp10000.com/static/img/yunwei/13.png" style="height: 50rpx;width: 50rpx;" mode=""></image>
						<view style="line-height: 50rpx;margin-left: 20rpx;">租借设备列表</view>
					</view>
					<view class="" style="line-height: 50rpx;">
						<uni-icons type="forward" size="15" style=""></uni-icons>
					</view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {selectAgentByDevice} from '@/api/system/agent'
	export default{
		data(){
			return{
				userid:'',
				devicesList:[],
				deviceSum:'',
				hospitalSum:'',
				useDeviceSum:''
			}
		},
		
		mounted() {
			this.userid=uni.getStorageSync('userid')
		},
		onLoad(option) {
			this.deviceSum= uni.getStorageSync('deviceCount');
			console.log(option,'chuan');
		},
		methods:{
			 getdevice(num){
				 
				 if(num==1){
					 uni.navigateTo({
					 	url:"/pages/maintenance/fault/index"
					 })
				 }else if(num==2){
					 uni.navigateTo({
					 	url:"/pages/maintenance/device/stock"
					 })
				 }else{
					 uni.navigateTo({
					 	url:"/pages/maintenance/orders/index"
					 })
				 }
				
				
				
			},
			
			back(){
				console.log('hahah');
				uni.navigateBack({
						delta: 1
					})
			}
		}
		
	}
</script>

<style lang="less" scoped>
	.container{
		height: 100vh;width: 100%;
		background:url('https://www.yp10000.com/static/img/hos/29.png');
		  background-size:100% 40%;
		  background-repeat:no-repeat;
		// background-image: linear-gradient(to bottom , #64d059,#64d059,#88da7e,#ffffff,#ffffff,#ffffff,#ffffff,#ffffff,#ffffff);
		.title{
			width: 100%;text-align: center;display: flex;flex-direction: column;color: #fff;padding: 80rpx 80rpx;justify-content: space-between;;
			// .title-item{
			// 	display: flex;
			// }
		}
		.content{
			width: 100%;;padding: 0 40rpx;text-align: center;border-radius: 10rpx;
			.list{
				border-radius: 10rpx;padding: 40rpx;
				.item{
					border-radius: 10rpx;padding: 40rpx;display: flex;justify-content: space-between;margin-top: 20rpx;background-color: #f6f8fa;
					uni-icons{
						margin-left: 40%;
					}
				}
			}
		}
	}
</style>