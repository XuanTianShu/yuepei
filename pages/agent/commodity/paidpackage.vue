<template>
	<view class="container" style="">
		<view class="header" style="">
			<view class="">
				用户名：小沈
			</view>
		
			<view class="data" style="">
				<view class="" >
					50%
				</view>
				<view class="" style="font-size: 30rpx;margin-top: 10rpx;">
					分成比例
				</view>
			</view>
			
			<view class="item" style="">
				<text style="">归属代理商</text><text>郑大一附院代理商</text>
			</view>
			<view class="item" style="margin-top: 20rpx;">
				<text>归属医院</text><text>郑大一附院</text>
			</view>
		</view>
		<view class="content" style="padding: 20rpx;background-color: #f6f8fa;border-radius: 20rpx;display: flex;width: 100%;height: 200rpx;margin-top: 40rpx;">
			<view class="image" style="width: 160rpx;height: 160prx;">
				<image src="../../../static/login.jpg" mode="" style="width: 100%;height: 100%;border-radius: 20rpx;"></image>
			</view>
			<view class="price" style="">
				<text>毛巾</text>
				<text>￥5.00</text>
			</view>
		</view>
		<view class="list" style="">
			<view class="item" style="">
				<text class="label">设备编号</text>
				<text>1234567890</text>
			</view>
			<view class="item" style="">
				<text class="label">订单编号</text>
				<text>123456</text>
			</view>
			<view class="item" style="">
				<text class="label">订单时间</text>
				<text>2022-09-09 12:00:00</text>
			</view>
			<view class="item" style="">
				<text class="label">医院名称</text>
				<text>郑大一附院</text>
			</view>
			<view class="item" style="">
				<text class="label">支付方式</text>
				<view class="wxzf" style="">
					<image src="https://www.yp10000.com/static/img/agent/28.png" mode="" style=""></image>
					<view style="">微信支付</view >
				</view>
			</view>
			<view class="item" style="">
				<text class="label">交易状态</text>
				<text>已完成</text>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="less" scoped>
	.container{
		padding: 40rpx;height: 100vh;background-color: #fff;
		.header{
			background-image: linear-gradient(to right , #fef2d4,#ffe7b8,#ffeac6);padding: 40rpx;display: flex;flex-direction: column;font-weight: 400;color: #5e4406;border-radius: 20rpx;
			.data{
				text-align: center;margin: 40rpx 40rpx 60rpx 40rpx;font-size: 40rpx;font-weight: 600;
				.text{
					font-size: 30rpx;margin-top: 10rpx;
				}
			}
			.item{
				display: flex;justify-content: space-between;
				
				
				
			}
		}
		.content{
			padding: 20rpx;background-color: #f6f8fa;border-radius: 20rpx;
			display: flex;width: 100%;height: 200rpx;margin-top: 40rpx;
			.image{
				width: 160rpx;height: 160prx;
				image{
					width: 100%;height: 100%;border-radius: 20rpx;
				}
			}
			.price{
				display: flex;flex-direction: column;justify-content: space-between;
				margin-left: 30rpx;padding: 20rpx 0;
			}
		}
		.list{
			margin-top: 50rpx;
			.item{
				display: flex;justify-content: space-between;margin: 20rpx 0;color: #9f9f9f;
				.label{
					color: #000;
	
				}
				.wxzf{
					display: flex;
					image{
						width: 35rpx;height: 35rpx;
					}
					view{
						margin-left: 20rpx;
						line-height: 35rpx;
					}
				}
			}
			
		}
		
		
	}
	.grey{
		color: #9f9f9f;
		font-size: 25rpx;
		
	}
</style>