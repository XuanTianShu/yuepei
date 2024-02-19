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
					<text style="">价格明细</text>
				</view>
				<view class="item-list" style="">
					<view class="item" style="">
						<text>已使用时长</text>
						<text >{{list.playTime}}</text>
					</view>
					<view class="item" style="">
						<text>预估金额</text>
						<text style="color: #ff7b4c;" >{{estimate}}</text>
					</view>
				</view>
				
			</view>
			<view class="item" style="margin-top: 50rpx;">
			
				<view class="item-title" style="display: flex;">
					<view class="" style="background-color: #ff7b4c;">
					</view>
					<text style="">订单信息</text>
				</view>
				<view class="item-list" style="">
					
					<view class="item" style="">
						<!-- <text>计费规则</text> -->
						<!-- <text class="grey" style="width: 70%;display: flex;flex-direction: row-reverse;">{{list.content}}</text> -->
						
						 <!-- <text class="grey" style="width: 70%;display: flex;flex-direction: row-reverse;">
						 {{orderInfo.deviceRule[0].price}}元/小时，前10分钟免费，超过10分钟按小时计算
						 {{ruletime}},共{{orderInfo.deviceRule[1].price}}元
						 </text> -->
						 <view class="item" style="">
						 	<text>计费规则</text>
						 	<text class="grey" style="width: 70%;display: flex;flex-direction: row-reverse;">
						 	{{list.deviceRule[0].price}}元/小时，前10分钟免费，超过10分钟按小时计算
						 	{{ruletime}},共{{list.deviceRule[1].price}}元
						 	</text>
						 </view>
					</view>
					
					<view class="item" style="">
						<text>租借押金</text>
						<text  class="grey">{{list.depositNum}}</text>
					</view>
					<view class="item" style="">
						<text>使用时长</text>
						<text class="grey">{{list.playTime}}</text>
					</view>
				</view>
			</view>
			<view class="item" style="">
				<view class="item-title" style="">
					<view class="" style="width: 10rpx;height: 25rpx;background-color: #63cf59;border-radius: 20rpx;margin-right: 20rpx;">
					</view>
					<text style="line-height: 30rpx;">租借信息</text>
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
						<text>订单编号</text>
						<text class="grey">{{list.orderNumber}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {selectLeaseOrderDetails} from '@/api/system/agent'
	import { dateFormart ,sumPrice} from '@/utils/dateFormart.js'
	export default{
		data(){
			return{
				list:[],
				orderNumber:'',
				title:'',
				orderInfo:'',
				totalTime:'',
				ruletime:'',
				estimate:0,
			}
		},
		onLoad(option) {
			console.log(option,'---');
			this.orderNumber=option.orderNumber
			this.getList()
		},
		methods:{
			timer(){
				
				const _this = this
				let leaseTime=new Date(_this.list.leaseTime.replace(/-/g,'/'))
				
				let restoreTime=new Date()
				
				if(_this.list.status!='0') restoreTime=new Date(_this.list.restoreTime.replace(/-/g,'/'))
				
				let times=restoreTime-leaseTime
				
				times=times/3600000 //总用时
				
				let hour=Math.trunc(times)				//总小时
				let minute=Math.round((times-hour)*60)	//分钟数
				
				if(hour/10<1) hour='0'+hour
				if(minute/10<1) minute='0'+minute
				_this.totalTime=hour+'小时'+minute+'分钟'
				
				// 预估
				_this.estimate=0//价格初始化
							console.log(leaseTime);
				// let res=sumPrice(leaseTime,JSON.stringify(_this.list.deviceRule))
				let res=sumPrice(leaseTime,JSON.stringify(_this.list.deviceRule),times.toFixed(2))
				
				// console.log('预估',res)
				_this.estimate=res.sum.toFixed(2)
				
				// _this.newtimconsole.log('就迷糊呢');er =
				_this.ruletime= _this.newtimer.substr(0, _this.newtimer.length - 1);
							console.log('就迷糊呢');
				// if(	res.rlb.endTime<res.rlb.startTime){
					_this.ruletime='固定套餐'+_this.ruletime
				// }
					
				console.log('ruletime',_this.ruletime);	
			
			},
			sumPrice(start,rl,times){ //开始时间，套餐规则rule，0，总用时
						
						let [a,b]=JSON.parse(rl)//去索引
						a=Number(a)
						b=Number(b)
						let sum=0
						start=start.getHours()+start.getMinutes()/60
						// --------
						// console.log(start,'start');
						sum=count(start,a,b,0,times)
						// --------
						let res={
							sum:sum,
							rlb:b
						}	
						console.log('restime',res)
						return res
			},
			async getList(){
				
				let userid=uni.getStorageSync('userid')
		
				let data={
					orderNumber:this.orderNumber,
					userId:userid
				}
				// console.log(data,'data');
				let res=await selectLeaseOrderDetails(data)
				console.log('res',22222222222222222222222);
				console.log('res',res);
				console.log('res',11111111111111111111111);
				if(res.code==200){
					
					this.list=res.data
					for(let i in this.list){
						if(this.list[i]==null){
							this.list[i]=""
						}
					}
					this.list.deviceRule=JSON.parse(this.list.deviceRule)
					let timers=this.list.estimateAmount
					// console.log(timers,'--');
					let index1=timers.indexOf('(')
					let index2=timers.indexOf(')')
					let newStr=timers.substring(index1+1,index2)
					this.newtimer=newStr
					// console.log(newStr,'newStr');
					let newStr1 = newStr.replace(/\:/g,'');
					let arr=newStr1.split('~')
					arr[0]=Number(arr[0])
					arr[1]=Number(arr[1])
			
					if(arr[0]>=arr[1]){
						var d1 = timers.slice(0,index1+1) + "今日" + timers.slice(1)
						let index3=d1.indexOf('~')
						var d2 = d1.slice(0,index3+1) + "次日" + d1.slice(index3+1)
						this.list.estimateAmount=d2
						this.newtimer=d2
						// console.log(d2,'newStr');
					}
					
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
						  
						  this.timer()
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
			background:url('https://www.yp10000.com/static/img/agent/22.png');
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