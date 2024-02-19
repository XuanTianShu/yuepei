<template>
	<view class="container" style="">
		<view class="header" style="">
			<view class="">
				用户名：{{list.userName}}
			</view>
			
			<view class="data" style="">
				<view class="" >
					
					{{list.proportion}}%
				</view>
				<view class="" style="">
					分成比例
				</view>
			</view>
			
			<view class="item" style="">
				<text style="">归属代理商</text><text>{{list.agentName}}</text>
			</view>
			<view class="item" style="">
				<text>归属医院</text><text>{{list.hospitalName}}</text>
			</view>
		</view>
		<view class="list" style="">
			<view class="item" style="margin-top: 0;">
				<view class="item-title" style="">
					<view class="" style="background-color: #63cf59;">
					</view>
					<text style="">订单信息</text>
				</view>
				<view class="item-list" style="">
					<view class="item" style="">
						<text>已使用时长</text>
						<text >{{list.playTime}}</text>
					</view>
					<view class="item" style="">
						<text>支付金额</text>
						<text style="color: #ff7b4c;">{{list.netAmount}}</text>
					</view>
				</view>
				
			</view>
			<view class="item" style="margin-top: 50rpx;">
			
				<view class="item-title" style="display: flex;">
					<view class="" style="background-color: #ff7b4c;">
					</view>
					<text style="">价格明细</text>
				</view>
				<view class="item-list" style="">
					
					<view class="item" style="">
						<text>计费规则</text>
						<text class="grey" style="width: 70%;">{{list.content}}</text>
					</view>
					
					<view class="item" style="">
						<text>租借押金</text>
						<text  class="grey">{{list.depositNum}}</text>
					</view>
					<view class="item" style="">
						<text>使用时长</text>
						
						<text class="grey">{{list.playTime}}</text>
					</view>
					<view class="item" style="">
						<text>套餐费用</text>
						<text class="grey"><text style="color: #ff7b4c;margin-left: 10rpx;">{{list.estimateAmount}}</text></text>
					</view>
					<view class="item" style="">
						<text>优惠券</text>
						<text class="grey">{{list.couponPrice}}</text>
					</view>
				</view>
			</view>
			<view class="item" style="">
				<view class="item-title" style="">
					<view class="" style="background-color: #63cf59;">
					</view>
					<text style="">租借信息</text>
				</view>
				<view class="item-list" style="">
					
					<view class="item" style="">
						<text>租借时间</text>
						<text class="grey">{{list.leaseTime}}</text>
					</view>
					<view class="item" style="">
						<text>租借地点</text>
						<text class="grey">{{list.leaseAddress}}</text>
					</view>
					<view class="item" style="">
						<text>归还时间</text>
						<text class="grey">{{list.restoreTime}}</text>
					</view>
					<view class="item" >
						<text>归还地点</text>
						<text class="grey">{{list.restoreAddress}}</text>
					</view>
					<view class="item" style="">
						<text>订单编号</text>
						<text class="grey">{{list.orderNumber}}</text>
					</view>
					<view class="item" style="">
						<text>支付方式</text>
						<text class="grey" v-if="list.payType==0">微信支付</text>
						<text class="grey" v-if="list.payType==1">支付宝</text>
						<text class="grey" v-if="list.payType==2">余额</text>
					</view>
					<view class="item" style="">
						<text>交易状态</text>
						<text class="grey" v-if="list.status==0">租借中</text>
						<text class="grey" v-if="list.status==1">待支付</text>
						<text class="grey" v-if="list.status==2">支付成功</text>
					</view>
				</view>
			</view>
			
		</view>
		<view class="btn" style="">
			<text>应付金额</text>
			<text style="color: #ff7b4c;" >{{list.price}}</text>
			<!-- <text style="color: #ff7b4c;" v-if="list.price==null">0</text>
			<text style="color: #ff7b4c;" v-else>{{list.price}}</text> -->
			 
		</view>
	</view>
</template>

<script>
	import {selectLeaseOrderDetails} from '@/api/system/hospital'
	export default{
		data(){
			return{
				list:[],
				orderNumber:''
			}
		},
		onLoad(option) {
			console.log(option,'---');
			this.orderNumber=option.orderNumber
			this.getList()
		},
		methods:{
			async getList(){
				
				let userid=uni.getStorageSync('userid')
				let data={
					orderNumber:this.orderNumber,
					userId:userid
				}
				console.log(data,'data');
				let res=await selectLeaseOrderDetails(data)
				if(res.code==200){
					
					this.list=res.data
					for(let i in this.list){
						if(this.list[i]==null){
							this.list[i]=""
						}
					}
					// let times=this.list.playTime//338000
					// console.log(times,'===');
					// let date= new Date(times);
					// let year = date.getFullYear() + '-';
					// let month = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
					// let day = date.getDate() + ' ';
					// let hour = date/1000/60/60;
					// let scoed =(date-hour*3600*1000)/60/1000;
					// let miao = ((data-(hour*24+scoed)*60*1000)/1000);
					// let ress=hour+scoed+miao
					// console.log(date,'===',ress);
					
					var now=Date.parse(this.list.leaseTime);
					let endDate = this.list.leaseTime
					let andDate = this.list.restoreTime
					let andTime = andDate
					let datess = new Date(andTime)
					
					      let endTime = endDate
					      let dates = new Date(endTime)
						  
					      let y = dates.getFullYear() // 年
					      let MM = dates.getMonth() + 1 // ⽉
					      MM = MM < 10 ? ('0' + MM) : MM
					      let d = dates.getDate() // ⽇
					      d = d < 10 ? ('0' + d) : d
					      let h = dates.getHours() // 时
					      h = h < 10 ? ('0' + h) : h
					      let m = dates.getMinutes()// 分
					      m = m < 10 ? ('0' + m) : m
					      let s = dates.getSeconds()// 秒
					      s = s < 10 ? ('0' + s) : s
						  
						  let yy = datess.getFullYear() // 年
						  let MMm = datess.getMonth() + 1 // ⽉
						  MMm = MMm < 10 ? ('0' + MMm) : MMm
						  let dd = datess.getDate() // ⽇
						  dd = dd < 10 ? ('0' + dd) : dd
						  let hh = datess.getHours() // 时
						  hh = hh < 10 ? ('0' + hh) : hh
						  let mm = datess.getMinutes()// 分
						  mm = mm < 10 ? ('0' + mm) : mm
						  let ss = datess.getSeconds()// 秒
						  ss = ss < 10 ? ('0' + ss) : ss
						  let data=y+'-'+MM+'-'+d+" "+h + ':' + m + ':' + s
						  let dataa=yy+'-'+MMm+'-'+dd+" "+hh + ':' + mm + ':' + ss
						  this.list.leaseTime=data
						  this.list.restoreTime=dataa
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.container{
		padding: 40rpx;
		.header{
			// background-image: linear-gradient(to right , #fef2d4,#ffe7b8,#ffeac6);
			background:url('https://www.yp10000.com/static/img/hos/19.png');
			  background-size:100% 100%;
			  background-repeat:no-repeat;
			
			padding: 40rpx;display: flex;flex-direction: column;font-weight: 400;color: #5e4406;border-radius: 20rpx;
			.data{
				text-align: center;margin: 40rpx 40rpx 60rpx 40rpx;font-size: 40rpx;font-weight: 600;
				.text{
					font-size: 30rpx;margin-top: 10rpx;
				}
			}
			.item{
				display: flex;justify-content: space-between;
				
			}
		}
		.list{
			margin-top: 40rpx;padding: 40rpx 0;background-color: #fff;border-radius: 10rpx;
			.item{
				margin-top: 50rpx;
				.item-title{
					display: flex;
					view{
						width: 10rpx;height: 25rpx;background-color: #ff7b4c;border-radius: 20rpx;margin-right: 20rpx;
					}
					text{
						line-height: 30rpx;
					}
					
				}
				.item-list{
					padding: 0 30rpx;
					.item{
						display: flex;justify-content: space-between;margin: 30rpx 0;
					}
				}
			}
		}
		.btn{
			display: flex;justify-content: space-between;margin-top: 30rpx;padding: 30rpx;background-color: #fff;border-radius: 10rpx;
		}
	}
	.grey{
		color: #9f9f9f;
		font-size: 25rpx;
		
		
	}
</style>