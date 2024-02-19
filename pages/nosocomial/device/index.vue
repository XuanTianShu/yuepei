<template>
	<view class="container" style="">
		<uni-nav-bar left-icon="left" :border="false" :fixed="true" statusBar @clickLeft="back"    title="医院设备" background-color="#64d059" />
		<view class="title" style="">
				<text class="title-top" style="">医院设备</text>
				<text class="title-bottom" style="">选择要查看的数据</text>
		</view>
		
		<view  class="content" style="">
			
			<view class="list" style="">
				<view class="item" style=""  @click="getdevice()">
					<text>全部</text>
					<uni-icons type="forward" size="15" style=""></uni-icons>
				</view>
				<view class="item" style="" v-for="item in devicesList" @click="getdevice(item.deviceTypeId)">
					<text>{{item.deviceTypeName}}</text>
					<uni-icons type="forward" size="15" style=""></uni-icons>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	import {selectDeviceType} from '@/api/system/hospital'
	export default{
		data(){
			return{
				devicesList:[],
				userid:'',
				userName:''
				
			}
		},
		
		mounted() {
			this.getList()
			
			// console.log(this.userName,'===');
		},
		methods:{
			async getList(){
				// let _this = this
				let userName=uni.getStorageSync('userName')
				let userId=uni.getStorageSync('userid')
				this.userid=userId
				this.userName=userName
				console.log(userId,'diididid',userName);
				let res = await selectDeviceType(userId)
				if(res.code == 200){
					this.devicesList=res.data
				}
				
			},
			
			 getdevice(deviceTypeId){
				 console.log(this.userName,this.userid,'===');
				
				if(deviceTypeId==undefined){
									 uni.navigateTo({
									 	url:"/pages/nosocomial/device/details?userId="+this.userid+"&userName="+this.userName
									 })
				}else{
									uni.navigateTo({
										url:"/pages/nosocomial/device/details?deviceTypeId="+deviceTypeId+"&userId="+this.userid+"&userName="+this.userName
									})
				}
				
				
			},
			
			back(){
				console.log('hahah');
				uni.reLaunch({
						url:'/pages/nosocomial/Home/index'
					})
			}
		}
		
	}
</script>

<style lang="less" scoped>
	.container{
		height: 100vh;width: 100%;
		// background: url('https://www.yp10000.com/static/img/mipmap-xhdpi/25.png') no-repeat;
		background:url('https://www.yp10000.com/static/img/hos/29.png');
		background-size:100% 40%;
		background-repeat:no-repeat;
		.title{
			width: 100%;text-align: center;display: flex;color: #fff;flex-direction: column;padding: 80rpx 0;
			.title-top{
				font-size: 40rpx;
			}
			.title-bottom{
				font-size: 30rpx;margin-top: 20rpx;
			}
		}
		.content{
			width: 100%;;padding: 0 40rpx;text-align: center;border-radius: 10rpx;
			.list{
				border-radius: 10rpx;padding: 40rpx;
				.item{
					border-radius: 10rpx;padding: 40rpx;display: flex;justify-content: space-between;margin-top: 20rpx;background-color: #f6f8fa;
					uni-icons{
						margin-left: 40%;
					}
				}
			}
		}
	}
</style>