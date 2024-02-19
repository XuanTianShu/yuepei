<template>
  <view class="indent">
		<uni-nav-bar left-icon="left" :title="title" :fixed="true" :statusBar="true" :border="false" @clickLeft="back()" />
		<!-- <uni-nav-bar left-icon="left" :title="title" :fixed="true" :statusBar="true" :border="false" @clickLeft="uni.navigateBack({delta:1})" /> -->
		
		<view class="section">
				<h1>用户名: {{orderInfo.userName||''}}</h1>
				<view class="cO_a">
						<text>{{orderInfo.investorProportion||0}}%</text>
						<view>分成比例</view>
				</view>
				<view class="cO_b">
						<text>归属代理商</text>
						<text>{{orderInfo.agentName||'' }}</text>
				</view>
				<view class="cO_b">
						<text>归属医院</text>
						<text>{{orderInfo.hospitalName||''}}</text>
				</view>
		</view>
		
		<view class="bala_v3_a1">
			<view class="bala_v3_b1">
				<view></view>
				<text>订单信息</text>
			</view>
			<view class="bala_v3_b2">
				<text>已使用时长</text>
				<view>{{totalTime}}</view>
			</view>
			<view class="bala_v3_b2">
				<text>{{orderInfo.status=='0'?'预估金额':'支付金额'}} </text>
				<view class="bala_v3_c4">{{orderInfo.status=='0'?estimate:orderInfo.price.toFixed(2)}}</view>
			</view>
			
			<view class="bala_v3_b1 bala_v3_b3" >
				<view style="background: #FF7C4A;"></view>
				<text>价格明细</text>
			</view>
			<view class="bala_v3_b2">
				<text>计费规则</text>
				<!-- <view>{{orderInfo.deviceRule[0].price}}元/小时，前1分钟免费，超过10分钟按小时计算</view> -->
				<view class="">
					<view>{{orderInfo.deviceRule[0].price}}元/小时，前10分钟免费，超过10分钟按小时计算</view>
					<view style="margin-top: 10rpx;">{{ruletime}},共{{orderInfo.deviceRule[1].price}}元</view>
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
			<view v-if="orderInfo.status!='0'" class="bala_v3_b2">
				<text>套餐费用</text>
				<view>
					<text>{{orderInfo.estimateAmount}}元</text>
					<!-- <text style="color: #FF7C4A;margin-left: 10rpx;">{{orderInfo.deviceRule[0].price}}元</text> -->
				</view>
			</view>
			<view v-if="orderInfo.status!='0' " class="bala_v3_b2">
				<text>优惠券</text>
				<view v-if="orderInfo.couponPrice">-{{orderInfo.couponPrice}}元</view>
				<view v-else>未使用</view>
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
				<view>{{orderInfo.leaseAddress}}</view>
			</view>
			<view v-if="orderInfo.status!='0'" class="bala_v3_b2">
				<text>归还时间</text>
				<view>{{ orderInfo.restoreTime}}</view>
			</view>
			<view v-if="orderInfo.status!='0'" class="bala_v3_b2">
				<text>归还地点</text>
				<view>{{orderInfo.leaseAddress}}</view>
			</view>
			<view class="bala_v3_b2">
				<text>订单编号</text>
				<view>{{orderInfo.orderNumber}}</view>
			</view>
			<view v-if="orderInfo.status!='0'" class="bala_v3_b2 bala_v3_b4">
				<text>交易状态</text>
				<view class="bala_v3_c4"  v-if="orderInfo.status == '2'">已完成</view>
				<view class="bala_v3_c4"  v-if="orderInfo.status == '1'">待支付</view>
				<view class="bala_v3_c4"  v-if="orderInfo.status == '3'">审核中</view>
				<view class="bala_v3_c4"  v-if="orderInfo.status == '4'">已退款</view>
			</view>
		</view>
		
		<view v-if="orderInfo.status!='0'" class="bala_v3_a1 bala_v3_a2">
			
			<view class="bala_v3_b2">
				<text>应付金额</text>
				<view class="bala_v3_c3">{{orderInfo.price.toFixed(2)}}</view>
			</view>
			
		</view>
		
  </view>
</template>


<script>

	import { dateFormart ,sumPrice} from '@/utils/dateFormart.js'
	import { investorLeaseOrderDetails } from '@/api/system/user'
  export default {
    data() {
      return {
				title:'',
				orderInfo:'',
				totalTime:'',
				ruletime:'',
				estimate:0,
      }
    },
		onLoad(options){
			let info=JSON.parse(options?.orderInfo)
			this.investorLeaseOrderDetails(info.orderNumber)
			let sta=parseInt(info.status)
			switch(sta) {
			  case 1:
			   this.title = '待支付';
			    break;
			  case 2:
			    this.title = '已完成';
			    break;
			  case 3:
			    this.title = '审核中';
			    break;
			  case 4:
				  this.title = '已退款';
				  break;
			  default:
			    this.title = '租赁中';
			}
		},
	
		methods: {
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			async investorLeaseOrderDetails(orderNumber){
				let res= await investorLeaseOrderDetails({orderNumber:orderNumber})
				
				this.orderInfo =res.data
				this.orderInfo.deviceRule=JSON.parse(this.orderInfo.deviceRule)
				console.log('orderInfo',this.orderInfo)
				if(this.orderInfo.status!='0'){
					let estimateAmount= this.orderInfo.estimateAmount
					let [a,b]=estimateAmount.slice(1,18).split('~')
					let s=estimateAmount.slice(19,estimateAmount.length)
					if(parseInt(estimateAmount.slice(1,3))+parseInt(estimateAmount.slice(4,6))/60
					> parseInt(estimateAmount.slice(10,12))+parseInt(estimateAmount.slice(13,15))/60
					){
						this.orderInfo.estimateAmount='(当日'+a+'~次日'+b+')'+s
					}else{
						this.orderInfo.estimateAmount='(当日'+a+'~'+b+')'+s
					}
				}
				
				
				if(this.orderInfo.leaseTime){
					this.orderInfo.leaseTime=dateFormart(new Date(this.orderInfo.leaseTime))
				}
				
				if(this.orderInfo.restoreTime){
					this.orderInfo.restoreTime=dateFormart(new Date(this.orderInfo.restoreTime))
				}
				(()=>{
					this.timer()
				})()
				
				
			},
		
			timer(){
				const _this = this
				let leaseTime=new Date(_this.orderInfo.leaseTime.replace(/-/g,'/'))
				
				let restoreTime=new Date()
				
				if(_this.orderInfo.status!='0') restoreTime=new Date(_this.orderInfo.restoreTime.replace(/-/g,'/'))
				
				let times=restoreTime-leaseTime
				
				times=times/3600000 //总用时
				
				let hour=Math.trunc(times)				//总小时
				let minute=Math.round((times-hour)*60)	//分钟数
				
				if(hour/10<1) hour='0'+hour
				if(minute/10<1) minute='0'+minute
				_this.totalTime=hour+'小时'+minute+'分钟'
				
				// 预估
				_this.estimate=0//价格初始化
							
				let res=sumPrice(leaseTime,JSON.stringify(_this.orderInfo.deviceRule),times.toFixed(2))
				// console.log('预估',res)
				_this.estimate=res.sum.toFixed(2)	
				
				_this.ruletime='固定套餐(当日)'+_this.orderInfo.deviceRule[1].startTime+'至'+_this.orderInfo.deviceRule[1].endTime
							
				if(	res.rlb.endTime<res.rlb.startTime){
					_this.ruletime='固定套餐(当日)'+_this.orderInfo.deviceRule[1].startTime+'至(次日)'+_this.orderInfo.deviceRule[1].endTime
				}
					
					
			
			},
			
			skip(url){
				wx.navigateTo({
					url:url
				})
			}
    }
  }
</script>

<style lang="less" scoped>
  .indent {
    position: absolute;
    width: 100%;height: 100%;
    z-index: 1;
    background-color:#F6F8FA;
		padding:0rpx 30rpx 100rpx 30rpx;
		overflow: auto;
		
		.section{
			width:100%;
			border-radius: 16rpx;
			padding:36rpx 30rpx;
			margin-bottom:20rpx;
			// background-image: linear-gradient(to right,rgba(255, 211, 148, 1.0),rgba(255, 230, 167, 1.0));
			background-image: url('https://www.yp10000.com/static/img/touzi/6.png');
			background-size: 100% 100%;
			.cO_a{
				text-align: center;
				text{
					font-size: 40rpx;
					font-weight: bold;
				}
			}
			
			.cO_b{
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin: 20rpx 0;
			}
		}
		
		.bala_v3_a1{
			width:100%;
			background-color:white;
			position:relative;
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
					background: #64CF59;
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
