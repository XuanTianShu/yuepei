<template>
  <view class="accountManagement">
		
		<view class="acma_v1_a1" @click="skip('/pages/nursingBed/mine/personalData?userInfo='+JSON.stringify(userInfo))">
			<view class="acma_v1_b1">
				<image :src="userInfo.avatar" class="image"></image>
				<view class="acma_v1_c1">
					<!-- <view class="acma_v1_d1">回忆 <text>广东深圳</text> </view> -->
					<view class="acma_v1_d1">{{userInfo.nickName}}</view>
					<view class="acma_v1_d2">{{userInfo.phoneNumber}}</view>
				</view>
			</view>
			<uni-icons type="right" color="#000000" size="18"></uni-icons>
		</view>
		
		<view class="acma_v1_a1 acma_v1_a2" @click="skip('/pages/nursingBed/mine/deposit')">
			<view class="acma_v1_b1">
				<image src="https://images.weserv.nl/?url=https://www.yp10000.com/static/img/deposit.png" class="image"></image>
				<view class="acma_v1_c2">我的押金</view>
			</view>
			<uni-icons type="right" color="rgba(0,0,0,0.39)" size="18"></uni-icons>
		</view>
		
		<view class="acma_v1_a1 acma_v1_a2" @click="skip('/pages/nursingBed/mine/recharge')">
			<view class="acma_v1_b1">
				<image src="https://www.yp10000.com/static/img/user/20.png" class="image"></image>
				<view class="acma_v1_c2">我的充值</view>
			</view>
			<uni-icons type="right" color="rgba(0,0,0,0.39)" size="18"></uni-icons>
		</view>
		
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
		
		<view class="acma_v1_a1 acma_v1_a2" @click="out('/pages/nursingBed/login/login')">
			<view class="acma_v1_b1">
				<image src="https://images.weserv.nl/?url=https://www.yp10000.com/static/img/mine_actived@2x.png" class="image"></image>
				<view class="acma_v1_c2">切换登录</view>
			</view>
			<uni-icons type="right" color="rgba(0,0,0,0.39)" size="18"></uni-icons>
		</view>
		
  </view>
</template>

<script>
  import { getUserProfile } from '@/api/system/user'
  export default {
    data() {
      return {
				userInfo:''
			}
    },
		onShow(){
			this.getUserProfile()
		},
    methods: {
			//个人信息
			async getUserProfile(){
				let res = await getUserProfile();
				this.userInfo = res.data
			},
			skip(url){
				uni.navigateTo({
					url:url
				});
			},
			out(url){
				
				uni.reLaunch({
					url:url
				})
			}
		}
  }
</script>

<style lang="less" scoped>
  .accountManagement {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-color:#FFFFFF;
		padding:0rpx 30rpx;
		
		.acma_v1_a1{
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
				
				.acma_v1_c1{
					margin-left:28rpx;
					
					.acma_v1_d1{
						font-size:28rpx;
						font-weight:bold;
						
						text{
							margin-left:26rpx;
							font-size:24rpx;
							font-weight:400;
							color:rgba(0,0,0,0.29);
						}
					}
					.acma_v1_d2{
						margin-top:10rpx;
						font-size:26rpx;
						font-weight:400;
					}
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
