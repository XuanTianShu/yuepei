<template>
	<view class="container" style="">
		<uni-nav-bar left-icon="left" :border="false" :fixed="true" statusBar @clickLeft="back"    title="医院设备" background-color="#64d059" />
		<view class="title" style="">
			<view class="title-item" style="">
				<text class="" style="">{{deviceSum}}</text>
				<text class="" style="">设备总数</text>
			</view>
			<view class="title-item" style="">
				<text class="" style="">{{hospitalSum}}</text>
				<text class="" style="">医院总数</text>
			</view>
			
			<view class="title-item" style="">
				<text class="" style="">{{useDeviceSum}}</text>
				<text class="" style="">正使用设备</text>
			</view>
				
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
	import {selectAgentByDevice} from '@/api/system/agent'
	export default{
		data(){
			return{
				userid:'',
				devicesList:[],
				deviceSum:'',
				hospitalSum:'',
				useDeviceSum:''
			}
		},
		
		mounted() {
			this.userid=uni.getStorageSync('userid')
			this.getList()
		},
		methods:{
			async getList(){
				let userId=this.userid
				let data={
					userId:this.userid
				}
				console.log(data);
				let res = await selectAgentByDevice(userId)
				if(res.code == 200){
					this.devicesList=res.data.deviceTypes
					this.deviceSum=res.data.deviceSum
					this.hospitalSum=res.data.hospitalSum
					this.useDeviceSum=res.data.useDeviceSum
				}
			},
			 getdevice(deviceTypeId){
				 
				 if(deviceTypeId==undefined){
					 uni.navigateTo({
					 	url:"/pages/agent/device/manage"
					 })
				 }else{
					 uni.navigateTo({
					 	url:"/pages/agent/device/manage?deviceTypeId="+deviceTypeId
					 })
				 }
				
				
				
			},
			
			back(){
				console.log('hahah');
				uni.reLaunch({
						url:'/pages/agent/home/index'
					})
			}
		}
		
	}
</script>

<style lang="less" scoped>
	.container{
		height: 100vh;width: 100%;
		// background-image: linear-gradient(to bottom , #64d059,#64d059,#88da7e,#ffffff,#ffffff,#ffffff,#ffffff,#ffffff,#ffffff);
		background:url('https://www.yp10000.com/static/img/agent/3.png');
		  background-size:100% 40%;
		  background-repeat:no-repeat;
		.title{
			width: 100%;text-align: center;display: flex;color: #fff;padding: 80rpx 80rpx;font-size: 30rpx;justify-content: space-between;;
			.title-item{
				display: flex;flex-direction: column;
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