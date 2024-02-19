<template>
  <view class="device">
		
		
		<view class="eq_v1_a1">
			<view class="image"></view>
			<view class="eq_v1_b1">
				<text>毛巾</text>
				<view>¥5.00</view>
			</view>
		</view>
		
		<view class="eq_v2_a1">
			<view class="eq_v2_b1">
				<text>设备编号</text>
				<view>1234567890</view>
			</view>
			<view class="eq_v2_b1">
				<text>订单编号</text>
				<view>12345</view>
			</view>
			<view class="eq_v2_b1">
				<text>订单时间</text>
				<view>2022-09-09 12:00:00</view>
			</view>
			<view class="eq_v2_b1">
				<text>医院名称</text>
				<view>郑大一附院</view>
			</view>
			<view class="eq_v2_b1">
				<text>支付方式</text>
				<view><image src="https://images.weserv.nl/?url=https://www.yp10000.com/static/img/wx_pay.png" class="payImage"></image>微信支付</view>
			</view>
			<view class="eq_v2_b1">
				<text>交易状态</text>
				<view>已完成</view>
			</view>
		</view>
		
		
  </view>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {}
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
		
		.eq_v1_a1{
			width: 690rpx;
			height: 160rpx;
			background: #F6F8FA;
			border-radius: 16rpx;
			margin:30rpx;
			display:flex;
			flex-direction:row;
			align-items:center;
			
			.image{
				width: 128rpx;
				height: 128rpx;
				border-radius: 16rpx;
				background-color:palegoldenrod;
				margin-right:32rpx;
				margin-left:16rpx;
			}
			
			.eq_v1_b1{
				display:flex;
				flex-direction:column;
				font-size:28rpx;
				font-weight:bold;
				
				view{
					margin-top:30rpx;
				}
			}
		}
		
		.eq_v2_a1{
			width:100%;
			
			.eq_v2_b1{
				display:flex;
				flex-direction: row;
				align-items:center;
				justify-content: space-between;
				padding:12rpx 30rpx;
				font-size: 26rpx;
				
				text{
					font-weight:bold;
				}
				
				view{
					display:flex;
					flex-direction:row;
					align-items:center;
					color:rgba(0,0,0,0.4);
					
					.payImage{
						margin-right:16rpx;
						width:32rpx;
						height:32rpx;
					}
				}
			}
		}
		
  }
</style>
