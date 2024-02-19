<template>
	<view class="containet" style="">
		<!-- <uni-nav-bar left-icon="left" :border="false" :fixed="true" statusBar @clickLeft="back"    title="故障详情"  /> -->
		<view class="head" style="">
			<view class="search-bar">
				<view class="search-bar-box">
				<input type="text" value="" v-model="numberOrAddress"  placeholder="谓输入订单编号,设备地址" class="search-text" maxlength="30" focus placeholder-style="color:#d1d1d1;"/>
				<button class="search-btn" style="" @tap="getlist(1)">搜索</button>
				</view>
			</view>
			<view class="head-item" style="">
			
				<view class="head-left">
					<view class="item" style="" @tap="getstauts(0)" :class="oeder==0?'black':'red'">
						<text>等待维修</text>
						<view v-if="oeder==0"   style="">
						</view>
					</view>
					<view class="item" style="margin-left: 40rpx;" @tap="getstauts(1)" :class="oeder==1?'black':'red'" >
						<text>维修完成</text>
						<view v-if="oeder==1"  style="">
						</view>
					</view>
					
				</view>
				<view class="">
					设备总数:{{devicesum}}
				</view>
			</view>
			
		</view>
		<view class="list" style="">
			<view class="list-item" style="" v-for="item in showlist">
				<view class="item-top" style="">
					<view class="">
						故障编号 <text style="color: #c0c0c0;margin-left: 30rpx;">{{item.feedbackId}}</text>
					</view>
					<view class="" v-if="item.status==0" style="color: #ed936a;">
						等待维修
					</view>
					<view class="" v-else style="color: #9f9f9f;">
						维修完成
					</view>
				</view>
				<view class="item-content" style="">
					<view class="contents" style="">
						<view class="img" style="">
							<image :src="item.feedbackUrl[0]" mode="" style=""></image>
						</view>
						<view class="data" style="width: 100%;">
							<view class="" style="width: 100%;">
								<view class="devnum" style="display: flex;">
									<view class="" style="">
										设备编号
									</view>
								
									<text style="">{{item.deviceNumber}}</text>
								</view>
								<view class="devress" style="width: 100%;">
									<view class="label" style="width: 25%;" >
										设备地址
									</view>
									<view class="ress" style="width: 75%;display: flex;justify-content: space-between">
										<view class="" style="" >{{item.deviceAddress}}</view>
										<image src="https://www.yp10000.com/static/img/yunwei/9.png" mode=""></image>
									</view>
									
								</view>
							</view>
							
						</view>
						
					</view>
					<view class="open"  style="color: red;" @click="todetail(item)" v-if="item.status==0" >
						无法开锁>
					</view>
					<view class="open"  style="color: #dfdfdf;" v-else @click="tofinish(item)" >
						无法开锁>
					</view>
				</view>
			</view>
			
			
		</view>
	</view>
</template>

<script>
	import {malfunction} from '@/api/system/maintenance.js'
	
	export default{
		data(){
			return{
				oeder:1,
				num:0,
				value: '',
				selist: [],
				values: 0,
				ranges: [],
				list:[],
				faultlist:[],
				showlist:[],
				devicesum:'',
				statuList:[],
				deviceDepartment:'',
				numberOrAddress:'',
				status:''
			}
		},
		onLoad(option) {
			this.userid=uni.getStorageSync('userid')
			this.getlist()
		},
		methods:{
			getstauts(num){
				this.oeder=num
				this.faultlist=[]
				this.showlist=[]
				console.log(this.list,'--');
				for(let i in this.list){
					if(this.list[i].status==num){
						console.log(this.list[i],'this.list[i]');
						this.faultlist.push(this.list[i])
						this.showlist=this.faultlist
					}
				}
				
			},
			back(){
			   uni.reLaunch({
			    url:"/pages/agent/home/index"
			   })
			  },
			tofinish(item){
				let data=JSON.stringify(item)
				uni.navigateTo({
					url:'faultfinish?list='+data
				})
			},
			todetail(item){
				let data=JSON.stringify(item)
				uni.navigateTo({
					url:'faultdetail?list='+data
				})
			},
			async getlist(val){
				if(val==undefined){
					let data={
						deviceNumber:''
					}
					let res=await malfunction(data)
					if(res.code==200){
						this.list=res.data.list
						this.devicesum=res.data.malfunctionCount
						
						for(let i in this.list){
							
							
							let str =  this.list[i].feedbackUrl.slice(1);
							let str1 =  str.substring(0,  str.length - 1)
							let str2=JSON.parse(str1)
								this.list[i].feedbackUrl=str2
								if(this.list[i].status=="1"){
									console.log(this.list[i],'---');
									this.faultlist.push(this.list[i])
									
								}
								this.showlist=this.faultlist
						}
						
					}
				}else{
					let data={
						deviceNumber:this.numberOrAddress
					}
					let res=await malfunction(data)
					if(res.code==200){
						this.showlist=[]
						this.faultlist=[]
						this.list=res.data.list
						console.log(this.list,'lllll');
						this.devicesum=res.data.malfunctionCount
						
						if(this.list){
							for(let i in this.list){
								
								
								let str =  this.list[i].feedbackUrl.slice(1);
								let str1 =  str.substring(0,  str.length - 1)
								let str2=JSON.parse(str1)
									this.list[i].feedbackUrl=str2
									if(this.list[i].status==this.oeder){
										// console.log(this.list[i],'---');
										this.faultlist.push(this.list[i])
										
									}
									this.showlist=this.faultlist
									console.log(this.showlist);
							}
						}else{
							this.showlist=this.list
						}
						
					}
				}
				
				
			},
			// getstatus(status){
			// 	if(status==0||status==1||status==2){
			// 		let data=[]
			// 		for(let i in this.statuList){
			// 			if(this.statuList[i].status==status){
			// 				data.push(this.statuList[i])
			// 			}
			// 		}
			// 		this.list=data
			// 	}else{
			// 		this.list=this.statuList
			// 	}
			// },
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
				display: flex;margin: 40rpx 0;justify-content: space-between;
				.head-left{
					display: flex;
				}
				.item{
					text-align: center;
					view{
						background-color: #64cf59;height: 10rpx;width: 50rpx;border-radius: 20rpx;margin-top: 20rpx;margin-left: 20rpx;
					}
				}
			}
		}
		.list{
			background-color: #f6f8fa;padding-top: 20rpx;padding: 10rpx 30rpx ;
			.list-item{
				display: flex;flex-direction: column;background-color: #ffffff;
				.item-top{
					display: flex;justify-content: space-between;padding: 30rpx
				}
			}
			.item-content{
				display: flex;flex-direction: column;padding: 30rpx;
				.contents{
					display: flex;
					.img{
						width: 110rpx;height: 110rpx;
						image{
							width: 110rpx;height: 110rpx;
						}
					}
					.data{
						display: flex;margin-left: 20rpx;
						view{
							.devnum{
								display: flex;
								text{
									margin-left: 10rpx;color: #c0c0c0;
								}
							}
							.devress{
								display: flex;margin-top: 20rpx;
								.label{
									// width: 45%;
									
								}
								.ress{
									
									image{
										width: 30rpx;height: 30rpx;border-radius: 50rpx;
									}
									// margin-left: 10rpx;color: #c0c0c0;
								}
								
							}
						}
					}
				}
				.open{
					display: flex;flex-direction: row-reverse;margin-top: 30rpx;color: #c0c0c0;
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