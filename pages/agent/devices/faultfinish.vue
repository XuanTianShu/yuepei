<template>
	<view class="containet" style="">
		<view class="top"  style="">
			<image src="../../../static/login.jpg" mode="" style=""></image>
			<view class="">
				维修完成
			</view>
		</view>
		<view class="list" style="">
			<view class="list-item" style="">
				故障编号<text style="">1234567890</text>
			</view>
			<view class="list-item" style="">
				设备编号<text style="">12345</text>
			</view>
			<view class="list-item" style="">
				设备地址<text style="">郑大一附院</text>
			</view>
			<view class="list-item" style="">
				故障类型<text style="">无法开锁</text>
			</view>
			<view class="list-item" style="display: flex;">
				<view class="" style="width: 20%;">
					故障描述
				</view>
				<text style="">打不开呀打不开怎么办呀怎么办麻烦您赶紧维修一下吧</text>
			</view>
		</view>
		<view class="image" style="">
			设备图片 <image src="../../../static/login.jpg" mode="" style=""></image>
		</view>
		<view class="">
			<button type="default" @click="navigateTo('faultrecords')" style="margin-top: 300rpx;background-color: #fff;color: #000000;font-size: 30rpx;padding: 5rpx;border-radius: 20rpx;">查看维修记录</button>
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
		width: 100%;height: 100vh;background-color: #fff;padding: 30rpx;
		.top{
			text-align: center;padding: 60rpx 0;
			image{
				border-radius: 50%;height: 80rpx;width: 80rpx;
			}
		}
		.list{
			.list-item{
				margin: 40rpx 0rpx;
				text{
					margin-left: 30rpx;color: #a4a6a7;
				}
			}
		}
		.image{
			position: relative;margin-top: 30rpx;
			image{
				width: 200rpx;height: 200rpx;position: absolute;margin-left: 30rpx;
			}
		}

	}
	
		 
</style>