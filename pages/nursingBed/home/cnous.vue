<template>
  <view class="cnous">
		
		<view class="acma_v1_a1 acma_v1_a2" @click="skip('/pages/nursingBed/mine/balance')">
			<view class="acma_v1_b1">
				<image src="https://images.weserv.nl/?url=https://www.yp10000.com/static/img/integral.png" class="image"></image>
				<view class="acma_v1_c2">我的积分</view>
			</view>
			<uni-icons type="right" color="rgba(0,0,0,0.39)" size="18"></uni-icons>
		</view>
		
		<view class="acma_v1_a1 acma_v1_a2" @click="skip('/pages/nursingBed/mine/myCard')">
			<view class="acma_v1_b1">
				<image src="https://images.weserv.nl/?url=https://www.yp10000.com/static/img/Card.png" class="image"></image>
				<view class="acma_v1_c2">我的卡券</view>
			</view>
			<uni-icons type="right" color="rgba(0,0,0,0.39)" size="18"></uni-icons>
		</view>
	
		
  </view>
</template>

<script>
	import CryptoJS from 'crypto-js'
  export default {
    data() {
      return {
				
			}
    },
		mounted() {
			this.demo()
		},
    methods: {
			demo(){
				
			},
			skip(url){
				uni.navigateTo({
					url:url
				});
			}
		}
  }
</script>

<style lang="less" scoped>
  .cnous {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-color:#FFFFFF;
		padding:0rpx 30rpx;
		
		.acma_v1_a1{//
			width:100%;
			padding:48rpx 30rpx;
			margin-bottom:30rpx;
			background-color:#F6F8FA;
			display:flex;
			flex-direction:row;
			align-items:center;
			justify-content:space-between;
			border-radius: 16rpx;
			
			.acma_v1_b1{
				display:flex;
				flex-direction:row;
				align-items:center;
				
				.image{
					width: 80rpx;
					height: 80rpx;
					border-radius:50%;
				}
				
				
				
				.acma_v1_c2{
					margin-left:28rpx;
					font-size:26rpx;
					font-weight:400;
				}
			}
		}
		
		.acma_v1_a2{
			padding:30rpx;
		}
		
  }
</style>
