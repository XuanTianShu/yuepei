<template>
  <view class="lease">
		<u-navbar :autoBack="true" bgColor="rgba(0,0,0,0)" leftIconColor="white">
			<view class="navbarTitle" slot="center">我的余额</view>
		</u-navbar>
		
		<view class="rech_v1_a1">
			<view class="rech_v1_b1">充值金额</view>
			<view class="rech_v1_b2">
				<view class="rech_v1_c1">￥</view>
				<input type="text" class="rechargeInput" :value="money" disabled />
			</view>
		</view>
		
		<view class="rech_v2_a1">
			<view class="rech_v2_b1">
				<!-- <view class="rech_v2_c1" v-for="index in 4">
					<text>50.00</text>
					<view>送10积分</view>
				</view> -->
				<view class="rech_v2_c1" v-for="(item,index) in moneyList" :key="index" @click="selectMoney(item.paySum)">
					<text>{{item.paySum.toFixed(2)}}</text>
					<view>送{{item.integral}}积分</view>
				</view>
			</view>
			
			<view class="bala_v5_a1">
				<view class="bala_v5_b1">
					<view v-if="readShow == true"></view>
				</view>
				<text @click="compactList" style="color: blue;">已阅读并同意《共享陪护床协议》</text>
			</view>
			
			<view class="cop_v1_a3" @click="payPrepaymentOrder(money)">立即支付</view>
		</view>
		
		<uni-popup ref="popup" type="bottom">
			<scroll-view class="bto" :scroll-y="true">
				<view class="content">
					<rich-text :nodes="serviceAgreementInfo"></rich-text>
					<button class="mini-btn" type="primary" size="mini" @click="$refs.popup.close()">确认</button>
					<button class="mini-btn" type="default" size="mini" @click="$refs.popup.close()">返回</button>
				</view>
				<image src="https://images.weserv.nl/?url=https://www.yp10000.com/static/img/close.png" class="close" @click="$refs.popup.close()"></image>
			</scroll-view>
			
		</uni-popup>
		
  </view>
</template>

<script>
  import { compactList,selectPayType,payPrepaymentOrder } from '@/api/system/user'
  export default {
    data() {
      return {
				readShow:true,
				money:0,
				moneyList:[],
				serviceAgreementInfo:''
      }
    },
		onShow(){
			this.selectPayType()
		},
    methods: {
			async compactList(){
					let res = await compactList();
					this.serviceAgreementInfo = res.data[0].serviceAgreementInfo
					console.log(this.serviceAgreementInfo)
					this.$refs.popup.open('center')
				},
			//获取支付需要的参数
			async payPrepaymentOrder(money){
				let _this = this
				
				if(!money){
					_this.$modal.msgError("未选择金额")
					return
				}
				
				_this.$modal.loading('请稍等...')
				
				let data = {
					price:money
				}
				let tmp = await payPrepaymentOrder(data)
				
				//支付
				if(tmp.code == 200){
					_this.$modal.closeLoading()
					
					wx.requestPayment({
					  timeStamp: tmp.data.timeStamp,
					  nonceStr: tmp.data.nonceStr,
					  package: tmp.data.packageStr,
					  signType: 'RSA',
					  paySign: tmp.data.paySign,
					  success (res) {
							_this.$modal.msgSuccess("充值成功")
						}
					})
				}
			},
			//支付金额展示
			async selectPayType(){
				let res = await selectPayType();
				this.moneyList = res.data
				////console.log(res,'----------------')
			},
			selectMoney(money){
				this.money = money
			}
    }
  }
</script>

<style lang="less" scoped>
  .lease {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-color:#FFFFFF;
	overflow: auto;
		.bto{
			overflow-y: auto !important;
			height: 990rpx;
			background-color: #FFFFFF;
			border-radius: 15rpx 15rpx 0 0;  
			position: relative;
			z-index: 999;
			.content{
				padding:30rpx 40rpx;
				text-align: center;
				
				button{
					margin-left: 20rpx;
				}
			}
			.close{
				width: 40rpx;
				height: 40rpx;
				position: absolute;
				border-radius: 50%;
				right: 10rpx;top: 10rpx;
			}
		}
		.navbarTitle{
			color:white;
			font-size: 30rpx;
		}
		
		.rech_v1_a1{
			width:100%;
			height:420rpx;
			background-image:url('https://images.weserv.nl/?url=https://www.yp10000.com/static/img/bg-money.png');
			background-size:100% 100%;
			background-repeat: no-repeat;
			display:flex;
			flex-direction:column;
			justify-content:center;
			padding:0rpx 30rpx;
			
			.rech_v1_b1{
				font-size: 26rpx;
				font-weight: bold;
				color:white;
				margin-top:120rpx;
			}
			
			.rech_v1_b2{
				margin-top:30rpx;
				display:flex;
				flex-direction:row;
				align-items:center;
				
				.rech_v1_c1{
					font-size: 52rpx;
					color:white;
					font-weight:bold;
				}
				
				.rechargeInput{
					margin-left:16rpx;
					padding-left:5rpx;
					color:white;
					font-size:40rpx;
					width:358rpx;
					border-bottom:1rpx solid white;
				}
			}
		}
		
		.rech_v2_a1{
			width:100%;
			background-color:white;
			border-radius: 50rpx 50rpx 0px 0px;
			position:relative;
			top:-50rpx;
			padding:50rpx 30rpx;
			
			.rech_v2_b1{
				display:flex;
				flex-direction:row;
				justify-content:space-between;
				flex-wrap:wrap;
				
				.rech_v2_c1{
					width: 328rpx;
					height: 188rpx;
					background: #F6F8FA;
					border-radius: 16rpx;
					display:flex;
					flex-direction:column;
					align-items:center;
					justify-content:center;
					margin-bottom:25rpx;
					
					text{
						font-size: 48rpx;
						font-weight: bold;
					}
					view{
						font-size: 26rpx;
						font-weight: 400;
						color: #FF7C4A;
					}
				}
			}
			
			.bala_v5_a1{
				display:flex;
				flex-direction:row;
				align-items:center;
				justify-content:center;
				margin-top:150rpx;
				
				.bala_v5_b1{
					width: 36rpx;
					height: 36rpx;
					border: 1rpx solid #64CF59;
					border-radius:50%;
					margin-right:16rpx;
					display:flex;
					flex-direction:row;
					align-items:center;
					justify-content:center;
					
					view{
						width: 20rpx;
						height: 20rpx;
						background: #64CF59;
						border-radius:50%;
					}
				}
				
				text{
					font-size: 24rpx;
					font-weight: 400;
					color:rgba(0,0,0,0.6);
				}
			}
			
			.cop_v1_a3{
				width: 100%;
				height: 92rpx;
				margin-top:25rpx;
				background: #64CF59;
				border-radius: 16rpx;
				text-align:center;
				line-height:92rpx;
				color:white;
				font-size: 28rpx;
				font-weight: bold;
			}
		}
		
  }
</style>
