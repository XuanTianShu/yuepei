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
			<view class="" style="">
				<text>归属医院</text><text>郑大一附院</text>
			</view>
		</view>
		<view class="list" style="">
			<view class="item" style="margin-top: 0;">
				<view class="item-title" style="">
					<view class="" style="background-color: #63cf59;">
					</view>
					<text style="">订单信息</text>
				</view>
				<view class="item-list" style="">
					<view class="item" style="">
						<text>已使用时长</text>
						<text >1小时30分钟</text>
					</view>
					<view class="item" style="">
						<text>支付金额</text>
						<text style="color: #ff7b4c;">6.00</text>
					</view>
				</view>
				
			</view>
			<view class="item" style="">
			
				<view class="item-title" style="">
					<view class="" style="background-color: #ff7b4c;">
					</view>
					<text style="">价格明细</text>
				</view>
				<view class="item-list" style="">
					
					<view class="item" style="">
						<text>计费规则</text>
						<text class="grey">3元/小时，前1分钟免费，超过10
						分钟按1小时计算</text>
					</view>
					
					<view class="item" style="">
						<text>租借押金</text>
						<text  class="grey">99元</text>
					</view>
					<view class="item" style="">
						<text>使用时长</text>
						
						<text class="grey">1小时30分钟</text>
					</view>
					<view class="item" style="">
						<text>套餐费用</text>
						<text class="grey">(当日18:00~(次日)09:00)<text style="color: #ff7b4c;margin-left: 10rpx;">10元</text></text>
					</view>
					<view class="item" style="">
						<text>优惠券</text>
						<text class="grey">-10元</text>
					</view>
				</view>
			</view>
			<view class="item" style="">
				<view class="item-title" style="">
					<view class="" style="background-color: #63cf59;">
					</view>
					<text style="">租借信息</text>
				</view>
				<view class="item-list" style="padding: 0 30rpx;">
					
					<view class="item" style="">
						<text>租借时间</text>
						<text class="grey">2022-11-11 12:00:00</text>
					</view>
					<view class="item" style="">
						<text>租借地点</text>
						<text class="grey">郑大一附院</text>
					</view>
					<view class="item" style="">
						<text>归还时间</text>
						<text class="grey">2022-12-12 12:00:00</text>
					</view>
					<view class="item" style="">
						<text>归还地点</text>
						<text class="grey">郑大一附院骨科</text>
					</view>
					<view class="item" style="">
						<text>订单编号</text>
						<text class="grey">1234567</text>
					</view>
					<view class="item" style="">
						<text>交易状态</text>
						<text style="color: #ff7b4c;">待支付</text>
					</view>
				</view>
			</view>
			
		</view>
		<view class="btn" style="">
			<text>应付金额</text>
			<text style="color: #ff7b4c;">2.00</text>
			 
		</view>
	</view>
</template>

<script>
</script>

<style lang="less" scoped>
	.container{
		padding: 40rpx;
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
		.list{
			margin-top: 40rpx;padding: 40rpx 0;background-color: #fff;border-radius: 10rpx;
			.item{
				margin-top: 50rpx;
				.item-title{
					display: flex;
					view{
						width: 10rpx;height: 25rpx;background-color: #ff7b4c;border-radius: 20rpx;margin-right: 20rpx;
					}
					text{
						line-height: 30rpx;
					}
					
				}
				.item-list{
					padding: 0 30rpx;
					.item{
						display: flex;justify-content: space-between;margin: 30rpx 0;
					}
				}
			}
		}
		.btn{
			display: flex;justify-content: space-between;margin-top: 30rpx;padding: 30rpx;background-color: #fff;border-radius: 10rpx;
		}
	}
	.grey{
		color: #9f9f9f;
		font-size: 25rpx;
		
	}
</style>