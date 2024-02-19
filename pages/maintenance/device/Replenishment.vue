<template>
	<view class="container">
		<view class="head-item" style="">
			<view class="item" style="" @tap="num=0" :class="num==0?'black':'red'" @click="getLease">
				<text>一次性牙刷</text>
				<view v-if="num==0"   style="">
				</view>
			</view>
			
			<view class="item" style="margin-left: 40rpx;" @tap="num=1" :class="num==1?'black':'red'" @click="getGoods">
				<text>矿泉水</text>
				<view v-if="num==1"  style="">
				</view>
			</view>
			
			<view class="item" style="margin-left: 40rpx;" @tap="num=2" :class="num==2?'black':'red'" @click="getGoods">
				<text>面包</text>
				<view v-if="num==2"  style="">
				</view>
			</view>
			<view class="item" style="margin-left: 40rpx;" @tap="num=3" :class="num==3?'black':'red'" @click="getGoods">
				<text>毛巾</text>
				<view v-if="num==3"  style="">
				</view>
			</view>
		</view>
		<view class="list" style="">
			<view class="list-item" v-for="item in list" style="">
				<view class="item-top" style="" >
					<view class="">
						{{item.time}} 
					</view>
					<view class="number" style="">
						{{item.num}}
					</view>
				</view>
				<view class="item-content" style="">
					<image src="../../../static/login.jpg" mode="" style=""></image>
					<view class="commodity" style="">
						<view class="" style="">
							<view class="">
								{{item.type}}
							</view>
							<view class="status" style="color: red;font-size: 25rpx;display: flex;flex-direction: row-reverse;">
								{{item.status}}
							</view>
						</view>
						<text>{{item.price}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="fontButton" style="" >
			<button type="primary" style="" @tap="submit()">扫一扫</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				num:0,
				list:[
					{time:'2022.11.11 12：00',type:'一次性牙刷',num:'1-1',status:'缺货',price:'5.00'},
					{time:'2022.11.11 12：00',type:'一次性牙刷',num:'1-1',status:'缺货',price:'5.00'},
					{time:'2022.11.11 12：00',type:'一次性牙刷',num:'1-1',status:'缺货',price:'5.00'}
				]
			}
		}
	}
</script>

<style lang="less" scoped>
	.container{
		.head-item{
			display: flex;justify-content: space-between;background-color: #fff;padding: 20rpx 30rpx 0 30rpx;
			.item{
				text-align: center;
				view{
					background-color: #64cf59;height: 15rpx;width: 45rpx;border-radius: 40rpx;margin-top: 20rpx;margin-left: 20rpx;
				}
			}
		}
		.list{
			margin: 20rpx 30rpx;
			.list-item{
				display: flex;flex-direction: column;background-color: #fff;padding: 30rpx;margin-top: 20rpx;border-radius: 10rpx;
				.item-top{
					display: flex;justify-content: space-between;
					border-bottom: 1rpx solid #eeeeee;padding-bottom: 20rpx;
					.number{
						opacity:0.5;background-color: #e6f9e5;padding: 5rpx 15rpx;border-radius: 50rpx;color: #6cc766;
					}
				}
				.item-content{
					display: flex;margin-top: 20rpx;
					image{
						width: 18%; height: 100rpx;border-radius: 10rpx;
					}
					.commodity{
						width: 80%;margin-left: 2%;display: flex;flex-direction: column;justify-content: space-between;
						view{
							display: flex;justify-content: space-between;width: 100%;
							.status{
								color: red;font-size: 25rpx;
							}
						}
					}
				}
			}
		}
		.fontButton{
			margin-top: 450rpx;padding:  0 30rpx;border-radius: 10rpx;
			button{
				 width: 100%; background-color: #64d059;color: #fff;font-size: 30rpx;padding: 10rpx;
			}
		}
	}
	
</style>