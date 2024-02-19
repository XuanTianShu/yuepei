<template>
	<view class="containet" style="">
		<view class="head" style="">
			<view class="search-bar">
				<view class="search-bar-box">
				<input type="text"  v-model="inputvalue"   placeholder="请输入设备编号或订单编号" class="search-text" maxlength="30" focus placeholder-style="color:#d1d1d1;font-size:22rpx;"/>
				<button class="search-btn" style="" @click="getinput">搜索</button>
				</view>
			</view>
			<view class="select" style="">
				<uni-data-select
				  v-model="value"
				  :localdata="devicelist"
				  @change='changes'
				  placeholder="请选择设备"
				></uni-data-select>
			</view>
			<view class="select" style="">
				<uni-data-select
				  v-model="values"
				  :localdata="selist"
				  @change='change'
				  placeholder="请选择科室"
				></uni-data-select>
			</view>
			
			<view class="head-item" style="">
				<view class="item" style="" @tap="oeder=0" :class="oeder==0?'black':'red'" @click="getLease">
					<text>租借订单</text>
					<view v-if="oeder==0"   style="">
					</view>
				</view>
				<view class="item" style="margin-left: 40rpx;" @tap="oeder=1" :class="oeder==1?'black':'red'" @click="getGoods">
					<text>商品订单</text>
					<view v-if="oeder==1"  style="">
					</view>
				</view>
			</view>
		</view>
		<view class="list" style="">
			<view class="list-title" style="">
				<view class="" @tap="num=0" :class="num==0?'green':'red'" @click="getstatus()">全部</view>
				<view class="" @tap="num=1" :class="num==1?'green':'red'" @click="getstatus(0)">租借中</view>
				<view class="" @tap="num=2" :class="num==2?'green':'red'" @click="getstatus(1)">待支付</view>
				<!-- <view class="" @tap="num=3" :class="num==3?'green':'red'">审核中</view> -->
				<view class="" @tap="num=4" :class="num==4?'green':'red'" @click="getstatus(2)">已完成</view>
			</view>
			
			<view class="list-content" style="" v-for="item in list">
				
				
				<view class="list-item items"  style="">
					<view class="">
						设备类型<text style="">{{item.deviceType}}</text>
					</view>
					<view class="" v-if="item.status==0" style="color: #61d156;">
						租赁中
					</view>
					<view class="" v-else-if="item.status==1" style="color: #000000;">
						待支付
					</view>
					<view class="" v-else style="color: #f09a74;">
						支付完成
					</view>
				</view>
				<view class="items" style="">
					订单编号<text style="">{{item.orderNumber}}</text>
					
				</view>
				<view class="list-item items"  style="">
					<view class="">
						设备编号<text style="">{{item.deviceNumber }}</text>
					</view>
					
				</view>
				<view class="items" style="">
					租借地址<text style="">{{item.leaseAddress}}</text>
				</view>
				<view class="items" style="">
					租借时间<text style="">{{item.leaseTime}}</text>
				</view>
				<view class="item-bg" style="">
					<view class="" style="" v-if="item.restoreTime==null">
						归还时间：<text style="">--</text>
					</view>
					<view class="" style="" v-else>
						归还时间：<text style="">{{item.restoreTime}}</text>
					</view>
					<view class="" style="" v-if="item.restoreAddress==null">
						归还地址：<text style="">--</text>
					</view>
					<view class="" style="" v-else>
						归还地址：<text style="">{{item.restoreAddress}}</text>
					</view>
				</view>
				<view class="list-item items" style="">
					<view class="">
						支付金额
						<text style="color: #feb196;" v-if="item.netAmount==null">0.00</text>
						<text style="color: #feb196;" v-else>{{item.netAmount}}</text>
					</view>
					<view class="" @click="ToDetail(item.status,item.orderNumber)">
						详情>
					</view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {selectGoodsOrder,selectLeaseOrder,selectDepartment,selectDeviceTypeName} from '@/api/system/hospital'
	
	export default{
		data(){
			return{
				oeder:0,
				num:0,
				value: '',
				selist: [],
				values: '',
				devicelist: [],
				list:[],
				statuList:[],
				deviceDepartment:'',
				userid:'',
				inputvalue:''
			}
		},
		onLoad() {
			this.userid=uni.getStorageSync('userid')
			this.getLease()
		},
		methods:{
			
			async getinput(){
				
					console.log('hahaha');
					
					let value
					
					if(this.inputvalue==undefined){
						console.log('shizhey me ');
						value=''
					}else{
						value=this.inputvalue
					}
					let Department
					if(this.deviceDepartment==undefined){
						
						Department=''
					}else{
						Department=this.deviceDepartment
					}
					let TypeName
					if(this.deviceTypeName==undefined){
						
						TypeName=''
					}else{
						TypeName=this.deviceTypeName
					}
						let data={
							deviceDepartment:Department,
							deviceTypeName:TypeName,
							userId:this.userid,
							orderNumber:value
						}
						console.log(data,'--==');
						let res = await selectLeaseOrder(data)
						if(res.code==200){
							this.statuList=res.data
							this.list=res.data
							for(let i in res.data){
								// res.data[i].leaseTime = 2023-03-01T12:07:27.000+08:00
								// 2023-03-01 12:07:27
								var now=Date.parse(res.data[i].leaseTime);
								let endDate = res.data[i].leaseTime
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
									  let data=y+'-'+MM+'-'+d+" "+h + ':' + m + ':' + s
									  
									  this.statuList[i].leaseTime=data
									  this.list[i].leaseTime=data
							}
						}
					// }
					
				
			},
			async changes(e){
				console.log('hahaha');
				if(e){
					for(let i in this.devicelist){
						if(e==this.devicelist[i].value){
							this.deviceTypeName =this.devicelist[i].text
							console.log(this.deviceTypeName,'this.deviceTypeName');
						}
						
					}
				}else{
					this.deviceTypeName=''
				}
				let value
				
				if(this.inputvalue==undefined){
					console.log('shizhey me ');
					value=''
				}else{
					value=this.inputvalue
				}
					let data={
						deviceDepartment:this.deviceDepartment,
						deviceTypeName:this.deviceTypeName,
						userId:this.userid,
						orderNumber:value
					}
					console.log(data,'--==');
					let res = await selectLeaseOrder(data)
					if(res.code==200){
						this.statuList=res.data
						this.list=res.data
						for(let i in res.data){
							// res.data[i].leaseTime = 2023-03-01T12:07:27.000+08:00
							// 2023-03-01 12:07:27
							var now=Date.parse(res.data[i].leaseTime);
							let endDate = res.data[i].leaseTime
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
								  let data=y+'-'+MM+'-'+d+" "+h + ':' + m + ':' + s
								  
								  this.statuList[i].leaseTime=data
								  this.list[i].leaseTime=data
						}
					}
				// }
				
			},
			
			async change(e){
				console.log('gaibianle',e);
				if(e){
					for(let i in this.selist){
						if(e==this.selist[i].value){
							this.deviceDepartment =this.selist[i].text
						}
					}
				}else{
					this.deviceDepartment=''
				}
				let value
				
				if(this.inputvalue==undefined){
					// console.log('shizhey me ');
					value=''
				}else{
					value=this.inputvalue
				}
					let name=''
					if(this.deviceTypeName==undefined){
						name=''
					}else{
						name=this.deviceTypeName
					}
					console.log(typeof this.deviceDepartment,'leixing');
					let data={
						deviceDepartment:this.deviceDepartment,
						deviceTypeName:name,
						userId:this.userid,
						orderNumber:value
					}
					// console.log(data,'--00000000-==');
					let res = await selectLeaseOrder(data)
					if(res.code==200){
						this.statuList=res.data
						this.list=res.data
						for(let i in res.data){
							// res.data[i].leaseTime = 2023-03-01T12:07:27.000+08:00
							// 2023-03-01 12:07:27
							var now=Date.parse(res.data[i].leaseTime);
							let endDate = res.data[i].leaseTime
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
								  let data=y+'-'+MM+'-'+d+" "+h + ':' + m + ':' + s
								  
								  this.statuList[i].leaseTime=data
								  this.list[i].leaseTime=data
						}
					}
				// }
				
			},
			ToDetail(status,orderNumber){
				if(status==0){
					// 租赁中
					uni.navigateTo({
						url:"Rental?orderNumber="+orderNumber
					})
				}else if(status==1){
					// 待支付
					uni.navigateTo({
						url:"bepaid?orderNumber="+orderNumber
					})
				}else{
					// 支付完成
					uni.navigateTo({
						url:"Completedpackage?orderNumber="+orderNumber
					})
				}
				
			},
			getstatus(status){
				if(status==0||status==1||status==2){
					let data=[]
					for(let i in this.statuList){
						if(this.statuList[i].status==status){
							data.push(this.statuList[i])
						}
					}
					this.list=data
				}else{
					this.list=this.statuList
				}
			},
			async getLease(){
				let name
				console.log(this.deviceTypeName,'this.deviceTypeNamethis.deviceTypeNamethis.deviceTypeName');
				if(this.deviceTypeName==undefined){
					name=''
					
				}else{
					name=this.deviceTypeName
				}
				let value
				
				if(this.inputvalue==undefined){
					console.log('shizhey me ');
					value=''
				}else{
					value=this.inputvalue
				}
				console.log(value,'=====');
				let userid=uni.getStorageSync('userid')
				userid=Number(userid)
				let data={
					deviceTypeName:name,
					userId:userid,
					deviceDepartment:'',
					orderNumber:value
				}
				console.log(data,'data');
				let res = await selectLeaseOrder(data)
				if(res.code==200){
					this.statuList=res.data
					this.list=res.data
					for(let i in res.data){
						var now=Date.parse(res.data[i].leaseTime);
						let endDate = res.data[i].leaseTime
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
							  let data=y+'-'+MM+'-'+d+" "+h + ':' + m + ':' + s
							  
							  this.statuList[i].leaseTime=data
							  this.list[i].leaseTime=data
					}
					
				}
				let userId=userid
				console.log('科室');
				let reg=await selectDepartment(userId)
				if(reg.code==200){
					
					
					
					for(let i in reg.data){
						let res={text:'',value:''}
						res.text=reg.data[i]
						res.value=i
						this.selist.push(res)
					}
				}
				console.log('设备类型');
				let regs=await selectDeviceTypeName(userId)
				if(regs.code==200){
					for(let i in regs.data){
						let res={text:'',value:''}
						res.text=regs.data[i]
						res.value=i
						this.devicelist.push(res)
					}
				}
				
			},
			// async getGoods(){
			// 	let userId=uni.getStorageSync('userid')
				
			// 	let res = await selectGoodsOrder(userId)
			// 	if(res.code==200){
			// 		console.log('hahah');
			// 	}
			// }
		}
	}
</script>

<style lang="less" scoped>
	.containet{
		width: 100%;height: 100%;background-color: #fff;
		.head{
			padding: 40rpx 40rpx 0 40rpx;
			.search-bar{
				width: 100%;
				height: 80rpx;
				// margin-top: 2%;
			}
			.select{
				background-color:#fff ;margin-top: 20rpx;
			}
			.head-item{
				display: flex;margin: 40rpx 0;
				.item{
					text-align: center;
					view{
						background-color: #64cf59;height: 10rpx;width: 50rpx;border-radius: 20rpx;margin-top: 20rpx;margin-left: 20rpx;
					}
				}
			}
		}
		.list{
			background-color: #f6f8fa;padding-top: 20rpx;
			.list-title{
				display: flex;justify-content: space-between;margin: 0 60rpx;
			}
			.list-content{
				padding: 40rpx;background-color: #fff;margin: 20rpx 40rpx;color: #d9d9d9;border-radius: 20rpx;font-size: 25rpx;
				.list-item{
					display: flex;justify-content: space-between;
					view{
						text{
							color: #000000;margin-left: 20rpx;
						}
					}
				}
				.items{
					margin: 20rpx 0;
					text{
						color: #000000;margin-left: 20rpx;
					}
				}
				.item-bg{
					padding: 20rpx;background-color: #f6f8fa;border-radius: 20rpx;
					view{
						margin: 10rpx 0;
						.text{
							color: #000000;margin-left: 20rpx;
						}
					}
					
					
				}
			}
		}
	}
	.org{
		color: #f09a74;
	}
	.green{
		color: #61d156;
	}
	.black{
		color: #000000;
	}
	.red{
		color: #d5d5d5;
	}
	
	.search-bar-box{
		display: flex;
		margin: 0 auto;
		width: 100%;
		height: 60rpx;
		background-color: #f6f8fa;
		border-radius: 10rpx;
	}
	.search-text{
		width: 100%;
		margin-top: 10rpx;
		margin-left: 20rpx;
		font-size: 30rpx;
		color: #7f7f81;
	}
	.search-btn{
		background-color: #61d156;
		color: white;
		text-align: center;
		display: inline-block;
		font-size: 25rpx;
		width: 150rpx;
		height: 60rpx;
		line-height: 60rpx;
		border-radius: 10rpx;
		 
	}
</style>