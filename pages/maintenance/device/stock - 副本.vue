<template>
	<view class="container" style="">
		<!-- <uni-nav-bar left-icon="left" :border="false" :fixed="true" statusBar @clickLeft="back"    title="代设备详情"  /> -->
		<view class="head" style="background-color: #fff;">
			<view class="search-bar">
				<view class="search-bar-box">
				<input type="text"  v-model="numberOrAddress"  placeholder="谓输入订单编号,设备地址" class="search-text" maxlength="30" focus placeholder-style="color:#d1d1d1;"/>
				<button class="search-btn" style="" @tap="getList(numberOrAddress)">搜索</button>
				</view>
			</view>
			<view class="head-item" style="">
			
				
				<view class="">
					设备总数:{{stockCount}}
				</view>
			</view>
			
		</view>
		
		<view class="bottom" style="">
			<view class="bottom-content" style="" >
				<view class="item" v-for=" item in devicesList"  style="background-color: #fff;">
					<view class="item-conttent" style="" @click="ToReplenishment">
						<image src="../../../static/nursingBed/openCabinet/openCabinet.png" style="" mode=""></image>
						<view class="items">
							<view class="items-top" style="">
								<view class="items-type" style="">
									{{item.deviceTypeName}}<text style="">{{item.deviceNumber}}</text>
								</view>
								<view class=""  v-if="item.status==0">
									正常
								</view>
								<view class=""  v-if="item.status==2" style="color: red;">
									故障
								</view>
								<view class=""  v-if="item.status==3">
									缺货
								</view>
								<view class=""  v-if="item.status==1">
									使用中
								</view>
							</view>
							<view class="items-ress" style="">
								<image src="https://www.yp10000.com/static/img/yunwei/21.png" style="" mode=""></image>
								<view style="">{{item.deviceAddress}}></view>
							</view>
							<view class="items-guishu" style="">
								归属<text style="">{{item.hospitalName}}</text>
							</view>
						</view>
					</view>
					<view class="listbotton" style="color: #9d9d9d;" >
						<uni-icons type="bottom" size="15" @click="shows(item)"></uni-icons>
						<view class="bottom" style="" v-if="item.show==1" >
							<view class="bottom-item" style="">
								<view class="">
									一次性牙刷
								</view>
								<view class="">
									3
								</view>
								<view class="" style="color: red;">
									缺货
								</view>
							</view>
							<view class="bottom-item" style="">
								<view class="">
									一次性牙刷
								</view>
								<view class="">
									3
								</view>
								<view class="" style="color: red;">
									缺货
								</view>
							</view>
						</view>
						
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	import {homestock} from '@/api/system/maintenance.js'
  export default {
    data() {
      return {
		devicesList:[],
		stockCount:'',
		numberOrAddress:''
      };
    },
	onLoad(option) {
		this.userName=uni.getStorageSync('userName')
		this.deviceTypeId=option.deviceTypeId //打印出上个页面传递的参数。
		console.log(option,'chuan');
		this.userid=uni.getStorageSync('userid')
		// this.userid=option.userId
		this.getList()
	},
    methods: {
		ToReplenishment(){
			uni.navigateTo({
				url:'Replenishment'
				
			})
		},
		back(){
			uni.reLaunch({
				url:"/pages/agent/device/index"
			})
		},
		async getList(number){
			if(number==undefined){
				let data={
					deviceNumber:''
				}
				let res = await homestock(data)
				if(res.code == 200){
					this.stockCount=res.data.stockCount
					this.devicesList=res.data.list
					for(let i in this.devicesList){
						this.devicesList[i].show=0
					}
					console.log(this.devicesList);
				}
			}else{
				console.log(number);
				let data={
					deviceNumber:number
				}
				let res = await homestock(data)
				if(res.code == 200){
					this.stockCount=res.data.stockCount
					this.devicesList=res.data.list
					for(let i in this.devicesList){
						this.devicesList[i].show=0
					}
				}
			}
			
		},
		// 食肉显示缺货数据
		shows(item){
			// console.log(item.show);
			if(item.show==0){
				item.show=1
			}else{
				item.show=0
			}
			console.log(item.show);
		},
		getedit(){
			uni.navigateTo({
				url:"/pages/agent/device/edit"
			})
		},
		// 编辑
		getedits(item){
			console.log(item);
			// return false
			let hospitalName=item.hospitalName
			let deviceNumber=item.deviceNumber
			let deviceFloor=item.deviceFloor
			let deviceDepartment=item.deviceDepartment
			let deviceRoom=item.deviceRoom
			let deviceBed=item.deviceBed
			let hospitalId=item.hospitalId
			uni.navigateTo({
				url:"/pages/agent/device/edits?hospitalName="+hospitalName+"&deviceNumber="+deviceNumber+"&deviceTypeId="+this.deviceTypeId+"&deviceFloor="+deviceFloor+"&deviceDepartment="+deviceDepartment+"&deviceRoom="+deviceRoom+"&deviceBed="+deviceBed+"&hospitalId="+hospitalId
			})
		},
      // change(e) {
      //   console.log("e:", e);
      // },
    },
  };
</script>



<style lang="less" scoped>
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
	.container{
		height: 100vh;width: 100%;
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
				padding: 10rpx 0 29rpx 0;
			}
		}
		// .top{
		// 	background-color: #64d059;padding: 20rpx 30rpx 0 30rpx;height: 30%;
		// 	.top-content{
		// 		background-color: #ffffff;border-radius: 20rpx 20rpx 0 0;padding-top: 20rpx;
		// 		.title{
		// 			padding: 30rpx;
		// 			.title-text{
		// 				margin-left: 30rpx;
		// 			}
		// 		}
		// 		.select{
		// 			margin: 10rpx auto;background-color: #f6f8fa;z-index:999;border-radius: 10rpx;width: 80%;color: #c6c8ca;
		// 		}
		// 		.content{
		// 			display: flex;margin: 0 30rpx;
		// 			.item{
		// 				text-align: center;width: 50%;background-color: #f6f8fa;margin: 20rpx 20px;padding: 28rpx;border-radius: 10rpx;
		// 				.item-value{
		// 					font-size: 40rpx;
		// 				}
		// 				.item-text{
		// 					color: #c6c8ca;font-size: 23rpx;margin-top: 8rpx;
		// 				}
		// 			}
					
		// 		}
		// 	}
		// }
		
		.bottom{
			padding: 20rpx;height: 70%;
			.bottom-title{
				margin: 0 20rpx;
				
			}
			.bottom-content{
				display: flex;flex-direction: column;
				.item{
					
					padding: 20rpx;background-color: #fff;margin: 10rpx;border-radius: 20rpx;margin-bottom: 0;
					.item-conttent{
						display: flex;border-bottom: 1rpx solid #dfdfdf;padding-bottom: 20rpx;
						image{
							width: 160rpx;height: 160rpx;margin-right: 20rpx;
						}
						.items{
							width: 100%;
							.items-top{
								display: flex;justify-content: space-between;
								.items-type{
									font-size: 30rpx;
									text{
										font-size: 25rpx;margin-left: 10rpx;color: #d0d0d0;
									}
								}
							}
							.items-ress{
								font-size: 25rpx;margin: 20rpx 0;color: #9d9d9d;display: flex;
								image{
									height: 30rpx;width: 30rpx;
								}
								view{
									margin-left: 10rpx;
								}
							}
							.items-guishu{
								color: #9d9d9d;
								text{
									font-size: 25rpx;margin-left: 25rpx;
								}
							}
							
						}
					}
					.listbotton{
						 text-align: center;
						 .bottom{
							 display: flex;flex-direction: column;
							 
							.bottom-item{
										
										display: flex;justify-content: space-between;padding: 0 20rpx;				 
							} 
						 }
						 
					}
					
					
				}
				
			}
		}
	}
</style>