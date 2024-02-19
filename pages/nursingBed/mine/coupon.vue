<template>
  <view class="mine">
		
		<!-- <view class="cpon_v1_a1" v-for="index in 2">
			<view class="cpon_v1_b1">
				<text>5.00</text>
				<view class="cpon_v1_c1">
					<view>5元消费券</view>
					<view style="margin-top:16rpx;">消耗积分：100积分</view>
				</view>
			</view>
			<view class="cpon_v1_b2">立即兑换</view>
		</view> -->
		
		<view class="cpon_v1_a1" v-for="(item,index) in couponList" :key="index">
			<view class="cpon_v1_b1">
				<text>{{item.money}}</text>
				<view class="cpon_v1_c1">
					<view>{{item.discountName}}</view>
					<view style="margin-top:16rpx;">消耗积分：{{item.integral}}积分</view>
				</view>
			</view>
			<view class="cpon_v1_b2" @click="popup(item)">立即兑换</view>
		</view>
		
		<uni-popup ref="popup">
			<view class="cpon_v2_a1">
				<view class="cpon_v2_b1">
					<view class="image"></view>
					<text>兑换消费券红包</text>
					<image src="https://images.weserv.nl/?url=https://www.yp10000.com/static/img/close.png" class="image" @click="$refs.popup.close()"></image>
				</view>
				<view class="cpon_v2_b2">
					<view>将消耗<text>{{puyCoupon.integral}}</text>积分，红包有效期<text>{{puyCoupon.period}}</text>天 兑换后红包不可退回</view>
				</view>
				<view class="cpon_v2_b3" @click="assignUser()">确定兑换</view>
			</view>
		</uni-popup>
		
  </view>
</template>

<script>
  import { selectCouponList,assignUser } from '@/api/system/user'
  export default {
    data() {
      return {
				couponList:[],
				puyCoupon:''
      }
    },
		onLoad(){
			this.selectCouponList()
		},
    methods: {
			//获取所有优惠券
			async selectCouponList(){
				let res = await selectCouponList({isJyb:1});
				this.couponList = res.rows
				// console.log(res)
			},
			//购买优惠券
			async assignUser(){
				let data={
					discountId:this.puyCoupon.id
				}
				let res = await assignUser(data);
				if(res.code == 200){
					this.$refs.popup.close()
					this.$modal.msgSuccess("兑换成功")
				}
			},
			popup(data){
				// console.log(data)
				this.puyCoupon = data
				this.$refs.popup.open('center')
			}
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
				width: 128rpx;
				height: 56rpx;
				background: #FFF6E8;
				border-radius: 28rpx;
				text-align:center;
				line-height:56rpx;
				font-size:22rpx;
				font-weight:bold;
				color: #FF7C4A;
			}
		}
		
		.cpon_v2_a1{
			width: 558rpx;
			background: #FFFFFF;
			border-radius: 10rpx;
			margin:130rpx auto;
			
			.cpon_v2_b1{
				padding:20rpx;
				display:flex;
				flex-direction:row;
				align-items:center;
				justify-content:space-between;
				
				text{
					padding-top:10rpx;
					font-weight:bold;
					font-size:28rpx;
					color: #FF7C4A;
				}
				.image{
					width: 30rpx;
					height: 30rpx;
				}
			}
			
			.cpon_v2_b2{
				padding:40rpx 85rpx;
				text-align:center;
				font-size:28rpx;
				font-weight:bold;
				line-height:50rpx;
				
				text{
					color:#FF7C4A;
				}
			}
			
			.cpon_v2_b3{
				font-size:26rpx;
				font-weight:bold;
				color: #FF603B;
				text-align:center;
				border-top:1rpx solid #EEEEEE;
				padding:20rpx 0rpx;
			}
		}
		
  }
</style>
