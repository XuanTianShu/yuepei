<template>
  <view class="device">
		<u-navbar :autoBack="true" bgColor="rgba(0,0,0,0)" @leftClick="leftClick">
			<view class="navbarLeft" slot="left">
				<uni-icons type="back" size="20" color="white"></uni-icons>
			</view>
		</u-navbar>
		
		<view class="swiperImg">
			<swiper class="swiper" :circular="true" @change="change">
				<swiper-item v-for="item in list">
					<image :src="item" class="image"></image>
				</swiper-item>
			</swiper>
			
			<view class="indicator">{{current}}/3</view>
		</view>
		
		<view class="comd_v1_a1">¥14.00</view>
		<view class="comd_v2_a1">赫莲娜黑绷带</view>
		<view class="comd_v3_a1">
			<image src="https://images.weserv.nl/?url=https://www.yp10000.com/static/img/heart.png" class="heart"></image>
			<text>商品描述</text>
		</view>
		
		<view class="comd_v4_a1">
			<view class="comd_v4_b1">
				<view>品牌</view>
				<view>商品名称</view>
				<view>产地</view>
				<view>规格</view>
			</view>
			<view class="comd_v4_b2">
				<view>HR</view>
				<view>黑绷带</view>
				<view>中国</view>
				<view>30ml/瓶</view>
			</view>
		</view>
		
		<image src="https://cdn.uviewui.com/uview/swiper/swiper3.png" class="pro_img"></image>
		<view class="buy">立即购买</view>
		
		
  </view>
</template>

<script>
  export default {
    data() {
      return {
				list: [
								'https://cdn.uviewui.com/uview/swiper/swiper3.png',
								'https://cdn.uviewui.com/uview/swiper/swiper2.png',
								'https://cdn.uviewui.com/uview/swiper/swiper1.png',
						],
				current:1
			}
    },
    methods: {
			leftClick(e){
				////console.log('----------')
			},
			change(e){
				this.current = e.detail.current + 1
			}
		}
  }
</script>

<style lang="less" scoped>
  .device {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-color:#FFFFFF;
		overflow:auto;
		
		.navbarLeft{
			width:60rpx;
			height:60rpx;
			background-color:rgba(0,0,0,0.4);
			text-align:center;
			line-height:60rpx;
			border-radius:50%;
		}
		
		.swiperImg{
			width:100%;
			height:750rpx;
			position: relative;
			
			.swiper{
				width:100%;
				height:100%;
				
				.image{
					width:100%;
					height:100%;
				}
			}
			
			.indicator{
				font-size:24rpx;
				color:white;
				background-color:red;
				position:absolute;
				bottom:30rpx;
				right:30rpx;
				padding:7rpx 20rpx;
				background:rgba(0,0,0,0.5);
				border-radius: 20rpx;
			}
		}
		
		.comd_v1_a1{
			font-size: 44rpx;
			font-weight: bold;
			color: #FF4847;
			padding:30rpx;
		}
		.comd_v2_a1{
			font-size: 30rpx;
			font-weight: bold;
			padding:0rpx 30rpx;
		}
		.comd_v3_a1{
			margin-top:30rpx;
			width:100%;
			height:108rpx;
			background-image:url('https://images.weserv.nl/?url=https://www.yp10000.com/static/img/heartImg.png');
			background-repeat: no-repeat;
			background-size:100% 100%;
			font-size: 32rpx;
			font-weight: bold;
			padding:0rpx 30rpx;
			display:flex;
			flex-direction:row;
			align-items:center;
			
			.heart{
				margin-right:15rpx;
				width: 40rpx;
				height: 40rpx;
			}
		}
		
		.comd_v4_a1{
			margin-top:45rpx;
			width:100%;
			display:flex;
			flex-direction:row;
			padding-left:30rpx;
			
			.comd_v4_b1{
				font-size: 28rpx;
				color:rgba(0,0,0,0.44);
				
				view{
					margin-bottom:30rpx;
				}
			}
			.comd_v4_b2{
				font-size: 28rpx;
				font-weight:bold;
				margin-left:40rpx;
				
				view{
					margin-bottom:30rpx;
				}
			}
		}
		
		.pro_img{
			margin-top:20rpx;
			width:100%;
			height: 698rpx;
		}
		
		.buy{
			width: 690rpx;
			height: 92rpx;
			background: #FF7C4A;
			border-radius: 16rpx;
			text-align:center;
			line-height:92rpx;
			color:white;
			font-size: 28rpx;
			font-weight:bold;
			position:fixed;
			bottom:50rpx;
			left:50%;
			margin-left:-345rpx;
		}
		
  }
</style>
