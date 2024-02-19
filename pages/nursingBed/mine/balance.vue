<template>
  <view class="mine">
		
		<view class="bala_v1_a1">
			<text>{{sum.toFixed(2)}}</text>
			<view @click="skip('/pages/nursingBed/mine/deposit')">我的押金></view>
		</view>
		
		<view class="bala_v2_a1">
			<view class="bala_v2_b1">
				<view>我的余额</view>
				<text></text>
			</view>
			<view class="bala_v2_b1">
				<text>{{list.balance.toFixed(2)}}</text>
				<view @click="skip('/pages/nursingBed/mine/transactionDetails?nav=2')">明细></view>
			</view>
			<view class="bala_v2_b2" @click="skip('/pages/nursingBed/mine/recharge')">充值</view>
		</view>
		
		<view class="bala_v2_a1 bala_v2_a2">
			<view class="bala_v2_b1">
				<view>我的积分</view>
				<text></text>
			</view>
			<view class="bala_v2_b1">
				<text>{{list.integral.toFixed(2)}}</text>
				<view @click="skip('/pages/nursingBed/mine/transactionDetails?nav=3')">明细></view>
			</view>
			<view class="bala_v2_b2" @click="skip('/pages/nursingBed/mine/coupon')">兑换</view>
		</view>
		
		
		<view class="bala_v5_a1"><text @click="skip('/pages/nursingBed/mine/faultFeedback')">故障反馈</text></view>
		
  </view>
</template>

<script>
  import { selectUserBalance,selectUserDepositInfo } from '@/api/system/user'
  export default {
    data() {
      return {
				list:[],
				sum:0
      }
    },
		onShow(){
				this.selectUserBalance()
				this.selectUserDepositInfo()
		},
    methods: {
			//获取押金
			async selectUserDepositInfo(){
				let params = {
					depositStatus: '0',
					status: '1',
				}
			/*
			押金规则：首次使用一台轮椅的押金XX,元（后台设押金金额及免费时间，每一台设备可以单独设置）交一次押金只能借一台轮椅、
			有未支付的订单不能退押金需要先结算才可退押金，同一用户已有租用中一台轮椅订单，租借第二台轮椅需要再次交押金。未归还的订单，
			第二个用户再次扫买，系统提示不可用， 已归还但是未支付费用的，第二个用户扫码，可以正常使用。
			*/	
				let res = await selectUserDepositInfo(params);
				console.log(res)
				let arr = res.data
				this.sum=0
				for (var i = 0; i < arr.length; i++) {
					this.sum+=arr[i].depositNum
				}
			},
			//余额
			async selectUserBalance(){
				
				let res = await selectUserBalance();
				this.list = res.data
				// console.log(this.list)
				this.$forceUpdate()
			},
			skip(url){
				uni.navigateTo({
					url:url
				});
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
    background-color:#FFFFFF;
		
		.bala_v1_a1{
			margin-top:72rpx;
			text-align: center;
			
			text{
				font-size:72rpx;
				font-weight: bold;
			}
			view{
				margin-top:14rpx;
				font-size:28rpx;
				font-weight:400;
				color: rgba(0,0,0,0.4);
			}
		}
		
		.bala_v2_a1{
			width: 686rpx;
			height: 270rpx;
			background-image:url('https://images.weserv.nl/?url=https://www.yp10000.com/static/img/balance.png');
			background-size:100% 100%;
			background-repeat:no-repeat;
			margin:80rpx auto;
			padding:20rpx 40rpx;
			position:relative;
			
			.bala_v2_b1{
				margin-bottom:16rpx;
				display:flex;
				flex-direction:row;
				align-items:center;
				justify-content:space-between;
				
				view{
					font-size: 26rpx;
					font-weight: 400;
					color: rgba(255,255,255,0.9);
				}
				text{
					font-size: 72rpx;
					font-weight:bold;
					color:white;
				}
			}
			
			.bala_v2_b2{
				width: 478rpx;
				height: 88rpx;
				background: #FFFFFF;
				box-shadow: 0px 4rpx 18rpx 0px rgba(137,137,137,0.19);
				border-radius: 16rpx;
				border: 2rpx solid #FFFFFF;
				font-size: 26rpx;
				font-weight:bold;
				color: #70D266;
				text-align:center;
				line-height:88rpx;
				position:absolute;
				bottom:-44rpx;
				left:50%;
				margin-left:-239rpx;
			}
		}
		
		.bala_v2_a2{
			margin-top:150rpx;
			background-image:url('https://www.yp10000.com/static/img/mine_integral.png');
			
			.bala_v2_b2{
				color: #FF7C4A;
			}
		}
		
		.bala_v5_a1{
			font-size: 26rpx;
			color: rgba(0,0,0,0.3);
			position:absolute;
			bottom:100rpx;
			left:0rpx;
			width:100%;
			text-align:center;
		}
		
  }
</style>
