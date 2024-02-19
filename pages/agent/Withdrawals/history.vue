<template>
	<view class="container" style="">
		<uni-nav-bar left-icon="left" :border="false" :fixed="true" statusBar @clickLeft="back"    title="医院设备" background-color="#64d059" color="#fff" />
		<view class="title" style="">
				<text class="title-top" style="">10032.00</text>
				<text class="title-bottom" style="">我的资金</text>
		</view>
		
		<view  class="content" style="">
			
			<view class="list" style="">
				<view class="item" style="">
					提现金额
				</view>
				<view class="item" style="display: flex;margin: 20rpx 0;width: 100%;">
					<view class="itemlabel" style="">
						￥
					</view>
					<view class="item-input" style="">
						<input type="text" placeholder="请输入提现金额" />
					</view>
				</view>
				<view class="item" style="">
					<text class="text1" style="">可提现金额：1000.00</text>
					<text class="text2" style="">全部提现</text>
				</view>
				<view class="item" style="">
					<view class="item-bing" style="">
						<view class="bind-wx" style="">
							<image src="../../../static/agent/weixin.png" mode="" style=""></image>
							<view style="">微信</view>
						</view>
						<view class="bind-tobank" style="">
							<view style="">小沈></view>
							<uni-icons type="checkbox" size="20" color="#64d057"></uni-icons>
						</view>
						
					</view>
					<view class="item-bing" style="">
						<view class="bind-wx" style="">
							<image src="../../../static/agent/bank.png" mode="" style=""></image>
							<view style="">微信</view>
						</view>
						<view class="bind-tobank" style="">
							<view style="" @click="add">中国银行(0089)></view>
							<uni-icons type="circle" size="20" color="#d5d5d5"></uni-icons>
						</view>
					
					</view>
				</view>
				<view class="item" style="margin: 30rpx 0;">
					<button type="default" @click="" style="">确认</button>
				</view>
			</view>
		</view>
		<view class="bottom" style="padding: 0rpx 30rpx 50rpx 30rpx;">
			<view class="" style="width: 170rpx;height: 70rpx;background-color: #fbe1ac;margin: 0 auto;text-align: center;line-height: 70rpx;border-radius: 30rpx 10rpx 30rpx 10rpx;color: #694a0b;">
				提现记录
			</view>
			<view class="hislist" style="display: flex;flex-direction: column;">
				<view class="" style="background-color: #fff;padding: 30rpx;border-radius: 20rpx;margin-top: 30rpx;">
					<view class="" style="display: flex;justify-content: space-between;font-weight: 500;">
						<view class="">
							<text>500.00</text>
						</view>
						<view class="" style="color: #ed7b57;">
							审核中
						</view>
					</view>
					<view class="">
						<view class="" style="margin: 15rpx 0;">
							申请时间 <text style="margin-left: 20rpx;color: #c2c2c2;">2022-10-22 12:00:00</text>
						</view>
						<view class="">
							审核时间 <text style="margin-left: 20rpx;color: #c2c2c2;">- -</text>
						</view>
					</view>
				</view>
				<view class="" style="background-color: #fff;padding: 30rpx;border-radius: 20rpx;margin-top: 30rpx;">
					<view class="" style="display: flex;justify-content: space-between;font-weight: 500;">
						<view class="">
							<text>500.00</text>
						</view>
						<view class="" style="color: #6ec766;">
							已到账
						</view>
					</view>
					<view class="">
						<view class="" style="margin: 15rpx 0;">
							申请时间 <text style="margin-left: 20rpx;color: #c2c2c2;">2022-10-22 12:00:00</text>
						</view>
						<view class="">
							审核时间 <text style="margin-left: 20rpx;color: #c2c2c2;">2022-10-22 12:00:00</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// import {selectDeviceType} from '@/api/system/hospital'
	export default{
		data(){
			return{
				devicesList:[],
				userid:'',
				userName:''
				
			}
		},
		
		mounted() {
			// this.getList()
			
			// console.log(this.userName,'===');
		},
		methods:{
			add(){
				uni.navigateTo({
					url:'/pages/agent/Withdrawals/add'
				})
			},
			 getdevice(deviceTypeId){
				 console.log(this.userName,this.userid,'===');
				uni.navigateTo({
					url:"/pages/nosocomial/device/details?deviceTypeId="+deviceTypeId+"&userId="+this.userid+"&userName="+this.userName
				})
				
				
			},
			
			back(){
				console.log('hahah');
				uni.reLaunch({
						url:'/pages/nosocomial/Home/index'
					})
			}
		}
		
	}
</script>

<style lang="less" scoped>
	.container{
		height: 100vh;width: 100%;
		background-image: linear-gradient(to bottom , #64d059,#64d059,#88da7e,#f6f8fa,#f6f8fa,#f6f8fa,#f6f8fa,#f6f8fa,#f6f8fa);
		.title{
			width: 100%;text-align: center;display: flex;color: #fff;flex-direction: column;padding: 80rpx 0;
			.title-top{
				font-size: 40rpx;
			}
			.title-bottom{
				font-size: 30rpx;margin-top: 20rpx;
			}
		}
		.content{
			width: 100%;;padding: 0 40rpx;text-align: center;border-radius: 20rpx;padding:30rpx;
			.list{
				border-radius: 10rpx;padding: 40rpx;background-color: #fff;
				display: flex;flex-direction: column;text-align: left;
				.item{
					margin: 20rpx 0;
					.item-bing{
						display: flex;justify-content: space-between;margin: 20rpx 0;
						.bind-wx{
							display: flex;
							image{
								width: 50rpx;height: 50rpx;
							}
							view{
								margin: auto 20rpx;
							}
						}
						.bind-tobank{
							display: flex;
							view{
								margin-right: 30rpx;color: #6fb3eb;
							}
						}
					}
					
					.itemlabel{
						font-size: 60rpx;
					}
					.item-input{
						padding: 30rpx;background-color: #fff;border-bottom: 1rpx solid #d5d5d5;width: 100%;
					}
					.text1{
						color:#d5d5d5;
					}
					.text2{
						margin-left: 30rpx;color: #6fb3eb;
					}
					button{
						background-color: #64d057;color: #fff;font-size: 30rpx;
					}
				}
			}
		}
	}
</style>