<template>
  <view class="mine">
		<view class="bala_v1_a1">
			<text>租借前需支付押金</text>
			<view>结束服务后，随时可退还押金</view>
		</view>
		
		<view class="bala_v2_a1">
			<view class="bala_v2_b1">
				<view>我的押金</view>
				<text></text>
			</view>
			<view class="bala_v2_b1">
				<text>{{sum.toFixed(2)}}</text>
				<view @click="skip('/pages/nursingBed/mine/transactionDetails?nav=1')">明细></view>
			</view>
			
			<view class="bala_v2_b2">押金随时退 安全速到帐</view>
		</view>
		<view v-show="isShow" class="title"><text>存在待支付或租赁中的订单，无法退取押金</text>(。•́︿•̀。)</view>
		
		<view class="bala_v3_a1" @click="compactList">
			<view class="bala_v3_b1">
				<view v-if="readShow == true"></view>
			</view>
			<text style="color: blue;">已阅读并同意《共享陪护床协议》</text>
		</view>
		<!-- 一次性退 -->
		<view class="bala_v4_a1" @click="retreat()">退押金</view>
		<!-- <view class="bala_v4_a1" @click="retreatDeposit()">退押金</view> -->
		
		<view class="bala_v5_a1"><text @click="skip('/pages/nursingBed/mine/faultFeedback')">故障反馈</text></view>
		
		<!-- 弹出层提示 -->
		<uni-popup ref="popup">
			<view class="popup_v1_a1">
				<view class="popup_v1_b1">{{sum==0?'暂无押金,无法退款':'您有订单在审核，审核通过后可退押金'}}</view>
				<view class="popup_v1_b2" @click="retreatDeposit()">确定</view>
			</view>
		</uni-popup>
		
		<uni-popup ref="popup2" type="bottom">
			<scroll-view class="bto" :scroll-y="true">
				<view class="content">
					<rich-text :nodes="serviceAgreementInfo"></rich-text>
					<button class="mini-btn" type="primary" size="mini" @click="$refs.popup2.close()">确认</button>
					<button class="mini-btn" type="default" size="mini" @click="$refs.popup2.close()">返回</button>
				</view>
				<image src="https://images.weserv.nl/?url=https://www.yp10000.com/static/img/close.png" class="close" @click="$refs.popup.close()"></image>
			</scroll-view>
			
		</uni-popup>
		
		<message ref="message"></message>
  </view>
</template>

<script>
  import { selectUserDepositInfo,userDepositRefund,compactList } from '@/api/system/user'
	import message from '@/components/popup_message.vue'
  export default {
    data() {
      return {
				list:[],
				readShow:true,
				sum: 0,
				isShow:false,
				serviceAgreementInfo:'',
      }
    },
		components:{
			message
		},
		onLoad(){
			this.selectUserDepositInfo()
		},
    methods: {
			async compactList(){
					let res = await compactList();
					this.serviceAgreementInfo = res.data[0].serviceAgreementInfo
					// console.log(this.serviceAgreementInfo)
					this.$refs.popup2.open('center')
				},
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
				this.list = res.data
				for (var i = 0; i < this.list.length; i++) {
					this.sum+=this.list[i].depositNum
				}
			},
			//退押金
			async retreatDeposit(){
				this.$refs.popup.close()
				if(!this.sum) {
					return
				}
				//新接口
				let res = await userDepositRefund();
				if(res.code==200) {
					this.$refs.message.setMsg('success','请求已处理，请留意到账通知！')
					this.selectUserDepositInfo()
				}else{
					// this.$modal.msgError("操作失败");
					this.$refs.message.setMsg('error','操作失败')
				}
	
				
			},
			retreat(){
				if(this.readShow){
					this.$refs.popup.open('center')
				}else{
					this.$modal.msgError("未勾选");
				}
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
	.title{
		width: 100%;
		text-align: center;
		text{
			color: red;font-size: 24rpx;
			font-weight: 400;
		}
		margin-bottom: 80rpx;
	}
	.popup_sw{
		width: 700rpx;
		height: 1080rpx;
		padding: 30rpx;
		background-color:#FFFFFF;
		border-radius: 40rpx;
		swiper-box{
			background-color: #64CF59;
		}
		.swiper-item{
			height: 70rpx;
			// justify-content: space-between;
			font-size: 26rpx;
			text{
				
			}
		}
	}
  .mine {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-color:#FFFFFF;
		
		.bala_v1_a1{
			margin-top:50rpx;
			margin-left:30rpx;
			
			text{
				font-size:40rpx;
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
			margin: auto;
			margin-top: 80rpx;
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
				font-size: 24rpx;
				font-weight:400;
				color:rgba(255,255,255,0.5);
				text-align:center;
				margin-top:50rpx;
			}
		}
		
		.bala_v3_a1{
			display:flex;
			flex-direction:row;
			align-items:center;
			justify-content:center;
			margin-top:150rpx;
			
			.bala_v3_b1{
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
		
		.bala_v4_a1{
			margin:60rpx auto;
			width: 478rpx;
			height: 88rpx;
			background: #FFFFFF;
			box-shadow: 0px 4rpx 18rpx 0px rgba(137,137,137,0.19);
			border-radius: 16rpx;
			font-size: 26rpx;
			font-weight:bold;
			text-align:center;
			line-height:88rpx;
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
		
		.popup_v1_a1{
			width: 452rpx;
			background: #FFFFFF;
			border-radius: 16rpx;
			
			.popup_v1_b1{
				width:100%;
				padding:48rpx 88rpx;
				font-size:26rpx;
				font-weight:bold;
				text-align:center;
			}
			
			.popup_v1_b2{
				font-size:26rpx;
				font-weight:bold;
				color: #64CF59;
				width:100%;
				padding:24rpx 0rpx;
				text-align:center;
				border-top:1rpx solid #EEEEEE;
			}
		}
		
  }
</style>
