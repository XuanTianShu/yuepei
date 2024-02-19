<template>
  <view class="pay">
		<!-- <uni-nav-bar left-icon="left" :border="false" :fixed="true" statusBar @clickLeft="back"    title="支付"  /> -->
		<!-- 支付 -->
		<view v-if="payShow == true">
			<view class="bala_v1_a1">
				<text>{{device.deviceDeposit.toFixed(2)||0}}</text>
				<view>共享陪护床</view>
			</view>
			
			<view class="pay_a1">
				<text>收款方</text>
				<text>共享陪护床</text>
			</view>
			
			<view class="pay_a3" >
				<view class="pay_a3_v" v-for="(item,index) in paymentMethod" :key="index" @click="selectMethod(index)">
					<text>{{item.text}}</text>
					<view class="bala_v5_b1">
						<view v-if="selectIndex == index"></view>
					</view>
				</view>
			</view>
			
			<!-- <view class="cop_v1_a3" @click="pay(selectIndex)">立即支付</view> -->
			<button class="cop_v1_a3" @click="pay(selectIndex)">立即支付</button>
		</view>
		
	
		<view v-else>
		<!-- 测试 -->
		<!-- <view> -->
			<view class="bala_v1_a1 bala_v1_a2">
				<image src="https://images.weserv.nl/?url=https://www.yp10000.com/static/img/pay.png" class="image"></image>
				<text>支付成功</text>
				<view>押金已缴纳，继续下面步骤完成借床</view>
			</view>
			
			<view class="pay_a1 pay_a2">
				<text>金额</text>
				<text>¥{{device.deviceDeposit.toFixed(2)}}</text>
				<!-- <text>¥0.01</text> -->
			</view>
			
			<view class="cop_v1_a3 cop_v1_a4" @click="redirectToSkip('/pages/nursingBed/openCabinet/openCabinet?device='+JSON.stringify(device))">下一步</view>
		</view>
		
  </view>
</template>

<script>
  import { paymentPrepaymentOrder,depositPrepaymentOrder,balancePrepaymentOrder } from '@/api/system/user'
	
  export default {
    data() {
      return {
				payShow:true,
				payInfo:'',
				paymentMethod:[
					{status:1,text:'微信支付'},
					{status:2,text:'余额支付'}
				],
				selectIndex:0,
				device:[],
				method:0,
      }
    },
		//method	1,押金支付，2,租借支付
		onLoad(options){
			this.device = JSON.parse(options.device)
			this.method = options.method
			if(this.method==1) this.paymentMethod.splice(1,1)
			console.log('device',this.device)
		},
    methods: {
			pay(selectIndex){
				let _this = this
				
				
				if(_this.method == 1){
					_this.depositPrepaymentOrder()
				}else if(_this.method == 2){
					let params = {
						couponId:_this.device.couponId
					}
					let data = {
						orderNumber:_this.device.orderNumber,
						deviceNumber:_this.device.deviceNumber,
						price:_this.device.deviceDeposit
					}
					if(selectIndex == 0){
						_this.paymentPrepaymentOrder(params,data)
					}else{
						_this.balancePrepaymentOrder(params,data)
					}
				}
			},
			
			//押金支付
			async depositPrepaymentOrder(){
				let _this = this

				let data = {
					deviceNumber:_this.device.deviceNumber,
					price:_this.device.deviceDeposit
				}
				//押金预支付订单
				let tmp = await depositPrepaymentOrder(data)
				
				if(!tmp.data){
					_this.$modal.msgError("支付功能调用失败，请联系客服");
					return
				}
				
				wx.requestPayment({
				  timeStamp: tmp.data.timeStamp,
				  nonceStr: tmp.data.nonceStr,
				  package: tmp.data.packageStr,
				  signType: 'RSA',
				  paySign: tmp.data.paySign,
				  success (res) {
						
						console.log(res,'支付成功')
						uni.showToast({
							title: '支付成功',
							duration: 2000
						});
						_this.payShow = false
						_this.$forceUpdate()
					},
				  fail (res) {
						console.log(res,'支付失败')
					}
				})
			},
			//租借支付
			async paymentPrepaymentOrder(params,data){
				let _this = this
				
				let tmp = await paymentPrepaymentOrder(params,data)
	
				if(!tmp.data){
					if(tmp.code==200 && _this.device.deviceDeposit==0){
						_this.$tab.redirectTo("/pages/nursingBed/mine/deposit").then(() => {
							_this.$modal.msgSuccess("支付成功");
						})
					}else{
						_this.$modal.msgError("支付功能异常，请联系后台"+tmp.msg);
						return
					}
				}
				
				wx.requestPayment({
				  timeStamp: tmp.data.timeStamp,
				  nonceStr: tmp.data.nonceStr,
				  package: tmp.data.packageStr,
				  signType: 'RSA',
				  paySign: tmp.data.paySign,
				  success (res) {
						_this.$tab.redirectTo("/pages/nursingBed/mine/deposit").then(() => {
							_this.$modal.msgSuccess("支付成功");
						})
						_this.$forceUpdate()
					},
				  fail (res) {
						_this.$modal.msgError("支付失败");
					},
				})
			},
			//余额支付
			async balancePrepaymentOrder(params,data){
				let _this = this
				
				let tmp = await balancePrepaymentOrder(params,data)
				
				if(tmp.code == 200){
					_this.$modal.confirm('支付成功').then(() => {
						_this.$tab.redirectTo("/pages/nursingBed/mine/deposit");
					})
				}else{
					_this.$modal.msgSuccess("支付失败"+tmp.msg);
				}
			},
			selectMethod(index){
				this.selectIndex = index
			},
			skip(url){
				uni.navigateTo({
					url:url
				});
			},
			redirectToSkip(url){
				uni.redirectTo({
					url:url
				});
			}
    }
  }
</script>

<style lang="less" scoped>
  .pay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-color:#FFFFFF;
		
		.bala_v1_a1{
			margin-top:72rpx;
			display:flex;
			flex-direction:column;
			align-items:center;
			
			.image{
				width: 99rpx;
				height: 99rpx;
				margin-bottom:30rpx;
			}
			
			text{
				font-size:72rpx;
				font-weight: bold;
			}
			view{
				margin-top:14rpx;
				font-size:28rpx;
				font-weight:400;
			}
		}
		
		.bala_v1_a2 text{
				font-size:28rpx;
		}
		
		.bala_v1_a2 view{
				font-size:26rpx;
				color:rgba(0,0,0,0.49);
		}
		
		.pay_a1{
			width: 686rpx;
			height: 104rpx;
			background: #F6F8FA;
			border-radius: 16rpx;
			display:flex;
			flex-direction:row;
			align-items:center;
			justify-content:space-between;
			padding:0rpx 30rpx;
			margin:100rpx auto;
			font-size:28rpx;
			color:rgba(0,0,0,0.49);
			font-weight:400;
		}
		
		.pay_a2{
			color:black;
			font-weight:bold;
		}
		
		.cop_v1_a3{
			width: 686rpx;
			height: 92rpx;
			background: #64CF59;
			border-radius: 16rpx;
			text-align:center;
			line-height:92rpx;
			color:white;
			font-size: 28rpx;
			font-weight: bold;
			margin:100rpx auto;
		}
		
		.cop_v1_a4{
			background-color:white;
			border: 2rpx solid #64CF59;
			color:#64CF59 ;
		}
		
		.pay_a3{
			width: 686rpx;
			height: 104rpx;
			background: #F6F8FA;
			border-radius: 16rpx;
			padding:0rpx 30rpx;
			margin:20rpx auto;
			font-size:28rpx;
			font-weight:bold;
			display:flex;
			flex-flow: column;
			align-items:center;
			
			.pay_a3_v{
				width: 100%;height: 100%;
				display:flex;
				align-items:center;
				justify-content:space-between;
			}
			
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
		}
		
  }
</style>
