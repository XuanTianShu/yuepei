<template>
  <view class="lease">
		<view class="bala_v2_a1">
			<view class="bala_v2_b1">
				<view class="bala_v2_c1">{{list.deviceDeposit.toFixed(2)}}</view>
				<view class="bala_v2_c2">缴纳押金</view>
			</view>
			<view class="bala_v2_b2">
				<text>单价</text>
				<view>{{price.toFixed(2)}}/</view>
				<text>小时</text>
			</view>
		</view>
		
		<view class="bala_v3_a1">
			<view class="bala_v3_b1">
				<view class="bala_v3_c1">
					<view></view>
					<text>范围时间</text>
				</view>
				<view class="bala_v3_c2" @click="open()">计费规则</view>
			</view>
			<view class="bala_v3_b3">
				<view class="bala_v3_b4">
					<view class="bala_v3_d1">
						<text>白天计时套餐</text>
						<view>{{list.deviceRules[0].startTime}}-{{list.deviceRules[0].endTime}}</view>
					</view>
					<view class="bala_v3_d2">
						<text>晚上固定套餐</text>
						<view>{{list.deviceRules[1].startTime}}-{{list.deviceRules[1].endTime}}</view>
					</view>
				</view>
			</view>
			<view class="bala_v3_b2">
				<text>预付金额</text>
				<view class="bala_v3_c3">{{list.deviceDeposit.toFixed(2)||0}}</view>
			
			</view>
		</view>
		
		<view class="bala_v3_a1 bala_v3_a2">
			<view class="bala_v3_b1">
				<view class="bala_v3_c1">
					<view></view>
					<text>详细信息</text>
				</view>
			</view>
			<view class="bala_v3_b2">
				<text>床位编号</text>
				<view>{{list.bed||''}}</view>
			</view>
			<view class="bala_v3_b2">
				<text>所属医院</text>
				<view>{{list.deviceAddress}}</view>
			</view>
			<view class="bala_v3_b2">
				<text>所属科室</text>
				<view>{{list.istrative||''}}</view>
			</view>
		</view>
		
		<view class="bala_v4_a1">备注：如一分钟不计费，超过10分钟开始按小时计算</view>
		
		<view class="bala_v5_a1" @click="show = !show">
			<view class="bala_v5_b1">
				<view v-if="show == true"></view>
			</view>
			<text>已阅读并同意《共享陪护床协议》</text>
		</view>
		<view class="cop_v1_a3" @click="skip()">支付押金</view>
		
		
		<!-- 弹出层提示 -->
		<uni-popup ref="popup">
			<view class="popup_v1_a1">
				<view class="popup_v1_b1">
					<view></view>
					<text>计费规则</text>
					<image src="https://images.weserv.nl/?url=https://www.yp10000.com/static/img/close.png" class="close"></image>
				</view>
				<view class="popup_v1_b2" v-for="(item,index) in list.deviceRules" :key="index">
					<image src="https://images.weserv.nl/?url=https://www.yp10000.com/static/img/triangle.png" class="popupIcon"></image>
					<view class="popup_v1_c1">
						<!-- <view>{{item.title}}:<text>{{JSON.parse(item.rule).startTime}}-{{JSON.parse(item.rule).endTime}}</text></view> -->
						<view>{{item.time=='0'?'白天计时套餐' : '晚上固定套餐'}}:<text>{{item.startTime}}-{{item.endTime}}</text></view>
						<view v-if="item.time=='0'">计费:<text>{{item.price}}元/小时</text></view>
						<view v-else><text>{{item.price}}元</text></view>
					</view>
				</view>
				<view class="popup_v1_b3">备注：白天计时套餐时间到了固定套餐设定的时间，系统自动转为固定套餐，结算的订单信息里面包含计时费用和固定套餐费用。</view>
			</view>
		</uni-popup>
		
  </view>
</template>

<script>
  import { ewmInLock,checkLeaseOrder } from '@/api/system/user'
  export default {
    data() {
      return {
				show:true,
				list:[],
				price:'0',
      }
    
		},
		onLoad(){
				this.ewmInLock()
		},
    methods: {
			//获取设备数据
			 ewmInLock(){
				let _this = this
				this.list  = wx.getStorageSync('ewmInLock')
				// console.log('payDeposit',this.list)
				
				let startTime = this.list.deviceRules[0].startTime
				let endTime = this.list.deviceRules[0].endTime
				
				let timeData = new Date();
				timeData = timeData.getHours()
				
				if(timeData >= startTime && timeData < endTime){
					this.price = this.list.deviceRules[0].price
				}else{
					this.price = this.list.deviceRules[1].price
				}
				// console.log('payDeposit',this.list)
				wx.setStorageSync('ewmInLock',this.list)
			},
			open(){
				this.$refs.popup.open('bottom')
			},
			
			async skip(){
				let url='/pages/nursingBed/pay/pay?method=1&device='+JSON.stringify(this.list)
				if(this.list.depositList.length>0) url='/pages/nursingBed/openCabinet/openCabinet'
				uni.redirectTo({
					url:url
				});
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
    background-color:#F6F8FA;
		padding:0rpx 30rpx 100rpx 30rpx;
		overflow: auto;
		
		.bala_v2_a1{
			width: 100%;
			height: 270rpx;
			background-image:url('https://images.weserv.nl/?url=https://www.yp10000.com/static/img/balance.png');
			background-size:100% 100%;
			background-repeat:no-repeat;
			margin-top:50rpx;
			display:flex;
			flex-direction:row;
			align-items:center;
			justify-content:space-between;
			padding:0rpx 30rpx;
			
			.bala_v2_b1{
				display:flex;
				flex-direction:column;
				
				.bala_v2_c1{
					font-size:56rpx;
					font-weight:bold;
					color:white;
				}
				
				.bala_v2_c2{
					margin-top:10rpx;
					font-size: 28rpx;
					font-weight: 400;
					color: rgba(255,255,255,0.9);
				}
			}
			
			.bala_v2_b2{
				display:flex;
				flex-direction:row;
				align-items:center;
				
				view{
					font-size:48rpx;
					font-weight:bold;
					color:white;
					margin-left:16rpx;
				}
				text{
					font-size:28rpx;
					font-weight: 400;
					color: rgba(255,255,255,0.9);
				}
			}
		}
		
		
		
		.bala_v3_a1{
			width:100%;
			background-color:white;
			position:relative;
			top:-50rpx;
			border-radius: 16rpx;
			padding:36rpx 0rpx;
			
			.bala_v3_b1{
				display:flex;
				flex-direction:row;
				align-items:center;
				justify-content:space-between;
				margin-bottom:30rpx;
				padding-right:30rpx;
				
				.bala_v3_c1{
					display:flex;
					flex-direction:row;
					align-items:center;
					
					view{
						width: 14rpx;
						height: 30rpx;
						background: #FF7C4A;
						border-radius: 7rpx;
					}
					text{
						font-size: 28rpx;
						font-weight:bold;
						margin-left:18rpx;
					}
				}
				
				.bala_v3_c2{
					font-size: 24rpx;
					color: #007AFF;
					padding:8rpx 16rpx;
					border-radius: 10rpx;
					border: 1rpx solid #007AFF;
				}
			}
			
			.bala_v3_b2{
				display:flex;
				flex-direction:row;
				align-items: center;
				justify-content:space-between;
				padding:0rpx 30rpx;
				margin-top:25rpx;
				font-size: 26rpx;
				font-weight: bold;
				
				.bala_v3_c3{
					font-weight: bold;
					font-size: 36rpx;
					color: #FF7C4A;
				}
			}
			
			.bala_v3_b3{
				padding:0rpx 30rpx;
				
				.bala_v3_b4{
					display: flex;
					flex-direction:row;
					align-items:center;
					justify-content:center;
					font-size: 32rpx;
					font-weight: bold;
					border-bottom:1rpx solid #EEEEEE;
					padding:20rpx 0rpx 40rpx 0rpx;
					
					.bala_v3_d1{
						border-right:1rpx solid #EEEEEE;
						padding-right:75rpx;
						
						view{
							padding-top:20rpx;
						}
					}
					
					.bala_v3_d2{
						padding-left:75rpx;
						
						view{
							padding-top:20rpx;
						}
					}
					
					text{
						font-size: 26rpx;
						font-weight: 400;
						color:rgba(0,0,0,0.4);
					}
				}
			}
		}
		.bala_v3_a2{
			top:-25rpx;
		}
		.bala_v4_a1{
			font-size: 26rpx;
			font-weight: 400;
			color:rgba(0,0,0,0.3);
		}
		
		.bala_v5_a1{
			display:flex;
			flex-direction:row;
			align-items:center;
			justify-content:center;
			margin-top:50rpx;
			
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
		
		
		.popup_v1_a1{
			width:100%;
			border-radius: 40rpx 40rpx 0px 0px;
			background-color:white;
			padding:40rpx 30rpx;
			
			.popup_v1_b1{
				display:flex;
				flex-direction:row;
				align-items:center;
				justify-content: space-between;
				margin-bottom:40rpx;
				
				view{
					width:35rpx;
				}
				text{
					font-size: 28rpx;
					font-weight:bold;
				}
				.close{
					width: 35rpx;
					height:35rpx;
				}
			}
			
			.popup_v1_b2{
				width: 100%;
				padding:30rpx 0rpx 10rpx 0rpx;
				background: #F6F8FA;
				border-radius: 16rpx;
				display:flex;
				flex-direction:row;
				margin-bottom:30rpx;
				
				.popupIcon{
					width: 26rpx;
					height: 36rpx;
					margin-right:12rpx;
				}
				
				.popup_v1_c1 view{
					font-size: 28rpx;
					font-weight: bold;
					margin-bottom:20rpx;
					
					text{
						font-weight: 400;
						margin-left:30rpx;
						color:rgba(0,0,0,0.4);
					}
				}
			}
			
			.popup_v1_b3{
				font-size: 26rpx;
				color: #FF7C4A;
				margin-bottom:10rpx;
			}
		}
		
  }
</style>
