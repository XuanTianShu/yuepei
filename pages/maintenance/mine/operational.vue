<template>
	<view class="container" style="">
		<view class="item"  @click="login"  style="">
			<text>登录记录</text><uni-icons type="forward"color="#d5d5d5"></uni-icons>
		</view>
		<view class="item"  @click="coderecord"  style="">
			<text>扫码记录</text><uni-icons type="forward" color="#d5d5d5"></uni-icons>
		</view>
		<view class="item"  @click="Restockrecords"  style="">
			<text>补货记录</text><uni-icons type="forward" color="#d5d5d5"></uni-icons>
		</view>
		<view class="item"  @click="batteryrecord"  style="">
			<text>更换电池记录</text><uni-icons type="forward" color="#d5d5d5"></uni-icons>
		</view>
		<view class="item"  @click="device"  style="">
			<text>设备故障处理记录</text><uni-icons type="forward" color="#d5d5d5"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			login(){
				uni.navigateTo({
					url:'Loginrecord'
				})
			},
			coderecord(){
				uni.navigateTo({
					url:'coderecord'
				})
			},
			Restockrecords(){
				uni.navigateTo({
					url:'Restockrecords'
				})
			},
			batteryrecord(){
				uni.navigateTo({
					url:'batteryrecord'
				})
			},
			device(){
				uni.navigateTo({
					url:"/pages/maintenance/fault/index"
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.container{
		width: 100%;
		.item{
			width: 100%; background-color: #fff;padding: 30rpx;display: flex;
			justify-content: space-between;margin-top: 20rpx;box-shadow: 6rpx 6rpx 15rpx #e4e4e5;
		}
	}
	
	
</style>