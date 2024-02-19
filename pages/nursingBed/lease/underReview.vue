<template>
  <view class="lease">
		<uni-nav-bar left-icon="left" :title="title" :fixed="true" :statusBar="true" :border="false" @clickLeft="$tab.navigateBack()" />
		
		<view class="bala_v2_a1">
			<view class="bala_v2_b1">
				<view class="bala_v2_c1"><text>{{totalTime}}</text></view>
				<view class="bala_v2_c2">已使用</view>
			</view>
			<view class="bala_v2_b2">
				<text >{{status==1?"预估":'支付金额'}}</text>
				<view>{{orderInfo.price.toFixed(2)||0}}</view>
			</view>
		</view>
		
		<view class="bala_v3_a1">
			<view class="bala_v3_b1">
				<view></view>
				<text>价格明细</text>
			</view>
			<view class="bala_v3_b2">
				<text>计费规则</text>
				<view style="text-align: justify;">
					<view>{{orderInfo.rule[0].price}}元/小时，前10分钟免费，超过10分钟按小时计算</view>
					<view style="margin-top: 10rpx;">固定套餐{{ruletime}},共{{orderInfo.rule[1].price}}元</view>
				</view>
			</view>
			<view class="bala_v3_b2">
				<text>租借押金</text>
				<view>{{orderInfo.deposit}}元</view>
			</view>
			<view class="bala_v3_b2">
				<text>使用时长</text>
				<view>{{totalTime}}</view>
			</view>
			
			
			<view class="bala_v3_b1 bala_v3_b3">
				<view></view>
				<text>租借信息</text>
			</view>
			<view class="bala_v3_b2">
				<text>租借时间</text>
				<view>{{ orderInfo.leaseTime}}</view>
			</view>
			<view class="bala_v3_b2">
				<text>租借地点</text>
				<view>{{orderInfo.leaseAddress||''}}</view>
			</view>
			<view class="bala_v3_b2">
				<text>归还时间</text>
				<view>{{ orderInfo.restoreTime}}</view>
			</view>
			<view class="bala_v3_b2">
				<text>归还地点</text>
				<view>{{orderInfo.leaseAddress||''}}</view>
			</view>
			<view class="bala_v3_b2">
				<text>订单编号</text>
				<view>{{orderInfo.orderNumber}}</view>
			</view>
			<view class="bala_v3_b2 bala_v3_b4">
				<text>交易状态</text>
				<view class="bala_v3_c4" v-if="status == '2'">已完成</view>
				<view class="bala_v3_c4" v-if="status == '1'">待支付</view>
				<view class="bala_v3_c4" v-if="status == '4'">已退款</view>
			</view>
		</view>
		
		<view class="bala_v3_a1 bala_v3_a2">
			<view class="bala_v3_b1">
				<view></view>
				<!-- <text>付款信息</text> -->
				<text>付款</text>
				
			</view>
			<view class="bala_v3_b2 rule">
				<text>套餐费用</text>
				<view>{{orderInfo.fixedPrice||0}}元</view>
			</view>
			<view class="bala_v3_b2" v-if="status==1">
				<text>优惠券</text>
				<view class="bala_v3_c5" v-if="card" @click="skip('/pages/nursingBed/mine/myCard?price='+orderInfo.price)">已使用优惠券，可优惠{{card.price}}元></view>
				<view class="bala_v3_c5" v-else @click="skip('/pages/nursingBed/mine/myCard?price='+orderInfo.price)">未选优惠券，可用优惠券{{cards.length||0}}张></view>
			</view>
			<view class="bala_v3_b2" v-else>
				<text>优惠券</text>
				<view>{{orderInfo.couponPrice==0?'':'－'+orderInfo.couponPrice.toFixed(2)}}</view>
			</view>

			<view class="bala_v3_b2" v-if="status == '2'">
				<text>支付方式</text>
				<!--0微信支付1支付宝2余额 -->
				<view>{{orderInfo.payType=='0'?'微信支付':'余额支付'}}</view>
			</view>
			<view class="bala_v3_b2">
				<text>支付金额</text>
				<view class="bala_v3_c3">{{deviceDeposit.toFixed(2)}}</view>
			</view>
		</view>
		
		<view class="cop_v1_a3" @click="$tab.redirectTo('/pages/nursingBed/home/home')" v-if="status != '1'">返回首页</view>
		<view class="cop_v1_a3" @click="pay()" v-if="status == '1'">立即支付</view>
		<view class="cop_v1_a4" @click="skip('/pages/nursingBed/mine/faultFeedback')" v-if="status == '1'">故障反馈</view>
		<view class="cop_v1_a5" v-if="status == '2'">
			<text @click="skip('/pages/nursingBed/mine/deposit')">退押金></text>
			<text @click="skip('/pages/nursingBed/mine/faultFeedback')">故障反馈</text>
		</view>
		
  </view>
</template>


<script>
	import { selectMyDiscountByOpenId } from '@/api/system/user'
	import { getToken } from '@/utils/auth'
	import { toNumber} from '@/utils/dateFormart.js'
  export default {
    data() {
      return {
				title:'待支付 ',
				status:'1',
				orderInfo:'',
				cards:[
				],
				totalTime:'',
				card:null,//优惠券
				deviceDeposit:'',
				ruletime:''
      }
    },
		onLoad(options){
			if(options?.status == '1'){
				this.title = '待支付'
				this.selectMyDiscountByOpenId()
			}else if(options?.status == '2'){
				this.title = '已完成'
			}
			
			this.status = options?.status
			this.orderInfo = JSON.parse(options?.orderInfo)
			this.orderInfo.rule=JSON.parse(this.orderInfo.rule)
			
		},
		onShow() {
			this.deviceDeposit=this.orderInfo.price
			this.orderInfo.deviceDeposit=this.orderInfo.price
			if(this.card){
				let { id ,price}=this.card
				this.deviceDeposit=this.deviceDeposit-price
				if(this.deviceDeposit<0)this.deviceDeposit=0
				this.orderInfo.deviceDeposit=this.deviceDeposit
				this.orderInfo.couponId=id
			}
			console.log('orderInfo',this.orderInfo)
			this.timer()
			
		},
	
    methods: {
			async selectMyDiscountByOpenId(){
			  let _this=this
				getToken
				let data = {
					status:0
				}
				let res = await selectMyDiscountByOpenId(data);
				_this.cards=res.rows
				// console.log('cards：',_this.cards)
				_this.$forceUpdate()
			},
			timer(){
				const _this = this
				
				let times= _this.orderInfo.playTime/3600000 //总用时
				let hour=Math.trunc(times)				//总小时
				let minute=Math.round((times-hour)*60)	//分钟数
				if(hour/10<1) hour='0'+hour
				if(minute/10<1) minute='0'+minute
				_this.totalTime=hour+'小时'+minute+'分钟'
				_this.totalTime=hour+'小时'+minute+'分钟'
				
				let r=JSON.stringify(_this.orderInfo.rule)
				let [a,b]=JSON.parse(r)
				b=toNumber(b)
				
				_this.ruletime='(当日)'+_this.orderInfo.rule[1].startTime+'至'+_this.orderInfo.rule[1].endTime
							
				if(	b.endTime<b.startTime){
					_this.ruletime='(当日)'+_this.orderInfo.rule[1].startTime+'至(次日)'+_this.orderInfo.rule[1].endTime
				}
			},
			
			skip(url){
				wx.navigateTo({
					url:url
				})
			},
			pay(){
				let url= '/pages/nursingBed/pay/pay?method=2&device='+JSON.stringify(this.orderInfo)
				// console.log(url)
				this.$tab.redirectTo(url)
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
					font-size: 28rpx;
					font-weight: 400;
					color:white;
					
					text{
						font-size: 56rpx;
						font-weight:bold;
					}
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
					font-size: 56rpx;
					font-weight:bold;
					color:white;
				}
				text{
					margin-right:16rpx;
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
			margin-bottom:20rpx;
			
			.bala_v3_b1{
				display:flex;
				align-items:center;
				margin-bottom:30rpx;
				
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
			
			.bala_v3_b3{
				padding-top:40rpx;
				
				view{
					background: #64CF59;
				}
			}
			
			.bala_v3_b4 view{
				display:flex;
				flex-direction:row;
				align-items:center;
				
				.bala_v3_c1{
					color: #FF0000;
				}
				.bala_v3_c2{
					color: #007AFF;
					border:1rpx solid #007AFF;
					padding:8rpx 16rpx;
					border-radius:10rpx;
					margin-left:16rpx;
				}
			}
			
			.bala_v3_b2{
				display:flex;
				// align-items: flex-start;
				justify-content:space-between;
				padding:0rpx 30rpx;
				margin-top:25rpx;
				
				text{
					font-size: 26rpx;
					font-weight: 400;
				}
				.rule{
					width: 100%;
					text-align: end !important;
				}
				view{
					font-size: 26rpx;
					font-weight: 400;
					color: rgba(0,0,0,0.4);
					max-width:370rpx;
					text-align:justify;
				}
				
				.bala_v3_c4{
					color: #FF7C4A;
					font-weight:bold;
				}
			}
		}
		
		.bala_v3_a2 .bala_v3_b2{
			align-items:center;
			
			 view{
				color:black;
				
				text{
					margin-right:16rpx;
					color: rgba(0,0,0,0.4);
				}
			}
			
			.bala_v3_c3{
				font-size: 36rpx;
				font-weight: bold;
				color: #FF7C4A;
			}
			
			.bala_v3_c5{
				color: #FF0000;
			}
		}
		
		.cop_v1_a3{
			width: 100%;
			height: 92rpx;
			background: #64CF59;
			border-radius: 16rpx;
			text-align:center;
			line-height:92rpx;
			color:white;
			font-size: 28rpx;
			font-weight: bold;
		}
		
		.cop_v1_a4{
			width:200rpx;
			margin:40rpx auto;
			text-align:center;
			font-size: 26rpx;
			color: rgba(0,0,0,0.3);
		}
		.cop_v1_a5{
			width:300rpx;
			margin:40rpx auto;
			font-size: 26rpx;
			color: rgba(0,0,0,0.3);
			display:flex;
			flex-direction:row;
			align-items:center;
			justify-content:space-between;
		}
		
  }
</style>
