<template>
	<view class="container" style="">
		<view class="item"    style="" @click="getdetail">
			<view class="top">
				<view>售卖柜<text style="margin-left: 10rpx;color: #a0a0a0;">No.123456</text></view><text>补货数量:3></text>
			</view>
			<view style="color: #a0a0a0;margin-top: 20rpx;">2022-09-12 12:00:00</view>
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
			getdetail(){
				uni.navigateTo({
					url:'Restockdetail'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.container{
		width: 100%;
		padding: 20rpx;
		.item{
			background-color: #fff;padding: 30rpx;margin-top: 20rpx;border-radius: 20rpx;
			.top{
				width: 100%; display: flex;
				justify-content: space-between;
			}
			
		}
	}
	
	
</style>