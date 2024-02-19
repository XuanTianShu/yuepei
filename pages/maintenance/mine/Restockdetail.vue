<template>
	<view class="container" style="">
		<view class="item" style="">
			<view class="" style="">
				售卖柜
			</view>
			<text>
				1234567890
			</text>
		</view>
		<view class="item" style="">
			<view class="" style="">
				补货时间
			</view>
			<text style="">
				2022-10-10 12：30
			</text>
		</view>
		<view class="item" style="">
			<view class="" style="">
				设备地址
			</view>
			<text>
				郑大一附院
			</text>
		</view>
		<view class="item" style="">
			<view class="" style="">
				补货人员
			</view>
			<text>
				小沈
			</text>
		</view>
		<view class="manifest-title" style="">
			补货清单
		</view>
		<view class="manifest-content" style="">
			<view class="">
				毛巾
			</view>
			<view class="manifest-item" style="">
				<text>10</text>
				<text class="label" style="">库存</text>
			</view>
			<view class="manifest-item" style="">
				<text>10</text>
				<text class="label" style="">补货数量</text>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="less">
	.container{
		width: 100%;height: 100vh;background-color: #fff;padding: 30rpx;
		.item{
			width: 100%;display: flex;
			margin: 20rpx 0;
			view{
				width: 20%;
			}
			text{
				color: #a3a3a3;
			}
		}
		.manifest-title{
			font-weight: 600;margin: 50rpx 0;
		}
		.manifest-content{
			text-align: center;display: flex;justify-content: space-between;padding: 20rpx 0;border-top: 1rpx solid #ebebeb;border-bottom: 1rpx solid #ebebeb;
			.manifest-item{
				display: flex;flex-direction: column;
				.label{
					margin-top: 10rpx;color: #a3a3a3;
				}
			}
			
		}
	}
</style>