<template>
	<view class="container" style="">
		<!-- <uni-nav-bar left-icon="left" :border="false" :fixed="true" statusBar @clickLeft="back"    title="代设备详情"  /> -->
		<view class="head" style="background-color: #fff;">
			<view class="search-bar">
				<view class="search-bar-box">
				<input type="text" value="" v-model="numberOrAddress"  placeholder="谓输入订单编号,设备地址" class="search-text" maxlength="30" focus placeholder-style="color:#d1d1d1;"/>
				<button class="search-btn" style="" @tap="getList(1)">搜索</button>
				</view>
			</view>
			<view class="head-item" style="">
			
				
				<view class="">
					设备总数:{{leaseDeviceCount}}
				</view>
			</view>
			
		</view>
		
		<view class="bottom" style="">
			<view class="bottom-content" style="" >
				<view class="view" v-for=" item in devicesList" style="background-color: #fff;">
					<view class="item-conttent" style="">
						<image src="../../../static/nursingBed/openCabinet/openCabinet.png"  mode="" style=""></image>
						<view class="items">
							<view class="items-top" style="">
								<view class="items-type" style="">
									{{item.deviceTypeName}}
								</view>
								<view class="" style="" v-if="item.status==2">
									使用中
								</view>
								<view class="" style="color: red;" v-if="item.status==1">
									故障
								</view>
								<view class="" style="color: #61d156;" v-if="item.status==0">
									空闲
								</view>
							</view>
							<view class="items-number" style="">
								编号:<text style="margin-left: 20rpx;">{{item.deviceNumber}}</text>
							</view>
							<view class="items-ress" style="">
								
								<view class="ress-text" style="">
									<image src="https://www.yp10000.com/static/img/yunwei/21.png" style="" mode=""></image>
									<text style="">{{item.deviceAddress}}</text>
								</view>
								<view class="detail" style="" @click="orderdetail(item)">
									详情>
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
	import {leaseDeviceList} from '@/api/system/maintenance'
  export default {
    data() {
      return {
		devicesList:[],
		numberOrAddress:'',
		leaseDeviceCount:''
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
		orderdetail(item){
			uni.navigateTo({
				url:'detail?deviceNumber='+item.deviceNumber
			})
		},
		back(){
			uni.reLaunch({
				url:"/pages/agent/device/index"
			})
		},
		async getList(val){
			let _this = this
			if(val==undefined){
				let data={
					deviceNumber:''
				}
				console.log(data,'列表数据');
				let res = await leaseDeviceList()
				if(res.code == 200){
					this.devicesList=res.data.list
					this.leaseDeviceCount=res.data.leaseDeviceCount
				}
			}else{
				let data={
					deviceNumber:this.numberOrAddress
				}
				console.log(data,'列表数据');
				let res = await leaseDeviceList(data)
				if(res.code == 200){
					this.devicesList=res.data.list
					this.leaseDeviceCount=res.data.leaseDeviceCount
				}
			}
			
			
			
			
			
		},
		// 食肉显示缺货数据
		shows(item){
			if(item.show==0){
				item.show=1
			}else{
				item.show=0
			}
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
				.view{
					
					padding: 20rpx;background-color: #fff;margin: 10rpx;border-radius: 20rpx;margin-bottom: 0;padding-bottom: 0;
					.item-conttent{
						display: flex;
						image{
							width: 160rpx;height: 160rpx;margin-right: 20rpx;
						}
						.items{
							width: 80%;
							.items-top{
								display: flex;justify-content: space-between;
								.items-type{
									font-size: 30rpx;
								}
							}
							.items-number{
								margin: 20rpx 0;color: #9d9d9d;
							}
							.items-ress{
								margin: 20rpx 0;color: #9d9d9d;display: flex;justify-content: space-between;
								.ress-text{
									width: 80%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;display: flex;
									image{
										height: 35rpx;width: 35rpx;
									}
									view{
										margin-left: 20rpx;
									}
								}
								.detail{
									width: 16%;
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