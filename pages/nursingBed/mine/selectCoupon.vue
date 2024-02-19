<template>
  <view class="mine">
		
		<view class="cpon_v1_a1" v-for="(item,index) in list" :key="index">
			<view class="cpon_v1_b1">
				<text>{{item.discountAmount}}</text>
				<view class="cpon_v1_c1">
					<view>{{item.title}}</view>
					<view style="margin-top:16rpx;">有效期：{{item.couponEndTime}}</view>
				</view>
			</view>
			<view class="cpon_v1_b2" v-if="index == 1"></view>
			<u-icon name="checkmark-circle" color="white" size="22" v-else></u-icon>
		</view>
		
  </view>
</template>

<script>
  import { selectUserCoupon } from '@/api/system/user'
  export default {
    data() {
      return {
				list:[]
      }
    },
		onShow(){
				this.selectUserCoupon()
		},
    methods: {
			async selectUserCoupon(){
				let res = await selectUserCoupon();
				this.list = res.data
			},
    }
  }
</script>

<style lang="less" scoped>
  .mine {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-color:#F6F8FA;
		padding:30rpx;
		
		.cpon_v1_a1{
			margin-top:30rpx;
			padding:26rpx 30rpx;
			background:radial-gradient(circle at top left,white 15rpx,#FF7C4A 0) top left,
			radial-gradient(circle at bottom left,white 15rpx,#FF7C4A 0) bottom left,
			radial-gradient(circle at top right,white 15rpx,#FF7C4A 0) top right,
			radial-gradient(circle at bottom right,white 15rpx,#FF7C4A 0) bottom right;
			background-repeat: no-repeat;
			background-size:50% 50%;
			display: flex;
			flex-direction:row;
			align-items:center;
			justify-content:space-between;
			
			.cpon_v1_b1{
				display: flex;
				flex-direction:row;
				align-items:center;
				
				text{
					font-size:44rpx;
					color:white;
				}
				
				.cpon_v1_c1{
					padding-left:40rpx;
					margin-left:30rpx;
					border-left:1rpx dashed white;
					
					view{
						max-width:300rpx;
						font-size:26rpx;
						color:rgba(255,255,255,0.8);
					}
				}
			}
			
			.cpon_v1_b2{
				width: 40rpx;
				height: 40rpx;
				border: 2rpx solid #FFFFFF;
				border-radius:50%;
			}
		}
		
		
  }
</style>
