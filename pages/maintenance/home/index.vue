<template>
	<view class="container">
		<map class="map" scale="15" :latitude="latitude" :longitude="longitude"   @markertap="tapMap" :markers="covers" >
			<!-- <cover-image class="location" style="height: 25rpx;width: 25rpx;" :src="item.iconPath" v-for="item in covers" @click="getLocation"></cover-image> -->
		</map>
		<view class="list" >
			<view class="list-title" >
				<text class="title-num" style="">设备总数：{{deviceCount}}</text>
				<text>缺货设备：{{stockCount}}</text>
			</view>
			<view class="list-content" style="">
				<view class="item" style="" v-for="item in list" >
					<view class="item-top" style="">
						<!-- <image src="../../agent/pos.png" style="width: 160rpx;height: 160rpx;" mode=""></image> -->
						<image src="../../../static/nursingBed/logo.png" style="" mode=""></image>
						<view class="top-content" style=''>
							<view class="item-type" style="">
								<view class="">
									{{item.deviceTypeName}}
								</view>
								<image src="https://www.yp10000.com/static/img/yunwei/1.png" style="" mode=""></image>
							</view>
							<view class="" style="margin-top: 20rpx;color: #cdcfd0;">
								{{item.deviceNumber}}
							</view>
							
							<view class="item-ress" style="">
								<image src="https://www.yp10000.com/static/img/yunwei/21.png" style="" mode=""></image>
								<view style="">{{item.deviceAddress}}</view>
							</view>
							<view class="item-km" style="">
								<view class="km-dl" style="">
									<image src="https://www.yp10000.com/static/img/yunwei/19.png" style="" mode=""></image>
									<view style="">{{item.electric}}%</view>
								</view>
								
								<!-- <view class="">
									{{item.mm}}km
								</view> -->
							</view>
						</view>
					</view>
					<view class="item-bottom" >
						
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
						<image src="https://www.yp10000.com/static/img/yunwei/9.png" @click="tomap(item)" style="width: 40rpx;height: 40rpx;" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<view class="tabbar" style="">
			<view class="tabbar-content" style="">
				<view class="tabbar-item" @click="getdevice">
					<image src="https://www.yp10000.com/static/img/yunwei/7.png"   style="" mode=""></image>
					<view class="">
						设备管理
					</view>
				</view>
				<view class="tabbar-item"  @click='getmine'>
					<image src="https://www.yp10000.com/static/img/yunwei/3.png" mode="" style=""></image>
					<view class="">
						{{userName}}
					</view>
				</view>
			</view>
			
			
		</view>
	</view>
</template>



<script>
	import {homelist} from '@/api/system/maintenance.js'
export default {
	data() {
		// 地图标记点
		// https://www.yp10000.com/static/img/yunwei/4.png
		// https://www.yp10000.com/static/img/yunwei/5.png
		return {
			id:0, // 使用 marker点击事件 需要填写id
			title: 'map',
			latitude: 22.58081,
			longitude: 113.926659,
			// 22.58081,113.926659
			covers: [
				{
					id:0,
					title:'hahaha',
					latitude: 22.586636,
					longitude:113.930658,
					width: 25,
					height: 25,
					iconPath: 'https://www.yp10000.com/static/img/yunwei/5.png'
				}, {
					id:1,
					title:'hahaha',
					latitude: 22.584347,
					longitude: 113.925392,
					width: 25,
					height: 25,
					iconPath: 'https://www.yp10000.com/static/img/yunwei/4.png'
				}
			],
			list:[],
			deviceCount:'',
			stockCount:'',
			userName:''
		}
	},
	onLoad(){
		this.userName=uni.getStorageSync('userName');
		this.getlist()
	},
	methods: {
		async getlist(){
			let res=await homelist()
			if(res.code==200){
				console.log('200');
				this.list=res.data.HomeList
				console.log(this.list,'---');
				this.deviceCount=res.data.deviceCount
				
				this.stockCount=res.data.stockCount
				uni.setStorageSync('deviceCount', this.deviceCount);
			}
		},
		tomap(item){
			
							console.log("获取周围美食");
							// latitude: 22.586636,
							// longitude:113.930658,
							// 目的地
							// 22.700594,114.151925
							let lng1=114.151925
							let lat1=22.700594
							
							// 我的地址
							let lng2=114.650118
							let lat2=22.650118
							// 22.650118,114.650118
							// uni.getLocation({
								// success: res => {
									// console.log('location success', parseFloat(lat),parseFloat(lon))
									// let lat2 = res.lat;
														// let lng2 = res.lng;
														let rad1 = lat1 * Math.PI / 180.0;
														let rad2 = lat2 * Math.PI / 180.0;
														let a = rad1 - rad2;
														let b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
									
														let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(
															rad2) * Math.pow(
															Math.sin(b / 2), 2)));
														s = s * 6378.137;
														s = Math.round(s * 10000) / 10000;
														s = s.toString();
														s = s.substring(0, s.indexOf('.') + 2);
														console.log('距离：', s);
														return s;//返回距离
														
														
														let end = Math.sqrt(Math.pow(lng1-lng2,2)+Math.pow(lat1-lat2,2))
														
														
									//  uni.openLocation({
									// 	 latitude: parseFloat(lat),
									// 	 longitude:parseFloat(lon),
									// 	 scale: 18,
									// 	 success: function () {
									// 	 				console.log('success');
									// 	 			},
									// 	 fail:function(){
									// 	 	console.log('error')
									// 	 },
									// })
							                        // }
							                    // })
						
		},
		getdevice(){
			uni.navigateTo({
				url:'/pages/maintenance/device/index?deviceCount='+this.deviceCount
			})
		},
		getmine(){
			uni.navigateTo({
				url:'/pages/maintenance/mine/PersonalCenter'
			})
		},

	}
}
</script>

<style lang="less" scoped>
	.container{
		width: 100%;height: 100%;
		// position: relative;
		map{
			width: 100%; 
			height: 40%;
		}
		.list{
			width: 100%;
			background-color: #fff;
			position: fixed;
			top: 45%;
			border-top-left-radius: 50rpx;
			border-top-right-radius: 50rpx;
			padding: 30rpx;height: 45%;
			.list-title{
				// position: fixed;
				// top:47%;
				margin-bottom: 10rpx;
				.title-num{
					margin-right: 50rpx;
				}
			}
			.list-content{
				position: absolute;height: 90%;width: 92%;
				overflow: scroll;
				display: flex;flex-direction: column;
				.item{
					background-color: #f6f8fa;display: flex;flex-direction: column;margin: 10rpx 0;padding: 20rpx;
					.item-top{
						display: flex;padding-bottom: 30rpx;
						image{
							width: 190rpx;height: 190rpx;border-radius: 20rpx;
						}
						.top-content{
							width: 70%;margin-left: 20rpx;
							.item-type{
								display: flex;justify-content: space-between;
								image{
									width: 30rpx;height: 30rpx;
								}
							}
							.item-ress{
								margin: 20rpx 0;color: #cdcfd0;display: flex;font-size: 25rpx;
								image{
									width: 30rpx;height: 30rpx;
								}
								view{
									margin-left: 10rpx;line-height: 30rpx;
								}
							}
							.item-km{
								margin: 20rpx 0;color: #cdcfd0;display: flex;font-size: 25rpx;justify-content: space-between;
								.km-dl{
									display: flex;
									image{
										width: 30rpx;height: 30rpx;
									}
									view{
										margin-left: 10rpx;line-height: 30rpx;margin-top: 1rpx;
									}
								}
							}
						}
					}
					.item-bottom{
						border-top: 1rpx solid #ebebeb;padding-top: 30rpx;display: flex;justify-content: space-between;
					}
				}
			
			}
		}
		.tabbar{
			position: fixed;
			bottom: 0%;
			height: 15vh;width: 100%;padding: 50rpx 25%;background-color: #fff;text-align: center;
			.tabbar-content{
				display: flex;justify-content: space-between;margin-top: 50rpx;
				.tabbar-item{
					image{
						width: 60rpx;height: 60rpx;
					}
				}
				
			}
			

		}
		
	}

</style>