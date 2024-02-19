<template>
	<view class="containet" style="">
		<uni-nav-bar left-icon="left" :border="false" :fixed="true" statusBar @clickLeft="back"    title="设备详情"  />
		<view class="top"  style="">
			<image src="https://www.yp10000.com/static/img/agent/19.png" mode=""></image>
			<view class="" style="font-weight: 500;">
				等待维修
			</view>
		</view>
		<view class="list" style="">
			<view class="list-item" style="">
				故障编号<text style="">{{list.feedbackId}}</text>
			</view>
			<view class="list-item" style="">
				设备编号<text style="">{{list.deviceNumber}}</text>
			</view>
			<view class="list-item" style="">
				设备地址<text style="">{{list.deviceAddress}}</text>
			</view>
			<view class="list-item" style="">
				
				故障类型<text style="color: #f53f3f;">等待维修</text>
			</view>
		</view>
		<view class="content" style="">
			{{list.feedbackInfo}}
		</view>
		<view class="image" style="">
			设备图片 
			<image :src="imgurl" mode=""></image>
		</view>
		<view class="button">
			<button type="default" @click="fillout()" style="">填写维修记录</button>
		</view>
	</view>
</template>

<script>
	import {selectDeviceFaultDetails} from '@/api/system/agent'
	
	export default{
		data(){
			return{
				oeder:0,
				num:0,
				value: '',
				list: [],
				values: 0,
				ranges: [
					{ value: 0, text: "陪护床" },
					{ value: 1, text: "轮椅" },
					{ value: 2, text: "柜子" },
				],
				statuList:[],
				deviceDepartment:'',
				userid:'',
				feedbackId:'',
				imgurl:''
			}
		},
		onLoad(option) {
			this.userid=uni.getStorageSync('userid')
			console.log(option);
			this.feedbackId=option.feedbackId
			this.getlist()
		},
		methods:{
			back(){
				uni.reLaunch({
					url:"fault"
				})
			},
			fillout(){
				console.log(this.list.feedbackUrl);
				// let img=JSON.stringify(this.list.feedbackUrl[0])
				let img=JSON.stringify(this.list.feedbackUrl)
				console.log(img,'img');
				uni.navigateTo({
					url:'faultdetails?feedbackId='+this.feedbackId+"&deviceNumber="+this.list.deviceNumber
				})
			},
			async getlist(){
				let data={
					userId:this.userid,
					feedbackId:this.feedbackId
				}
				console.log(data);
				let res=await selectDeviceFaultDetails(data)
				if(res.code==200){
					this.list=res.data[0]
					this.imgurl=res.data[0].feedbackUrl[0]
					// .split('.')[0].replace('(', '').replace(')', '')
					
					console.log(this.imgurl,'res.data[0].feedbackUrl[0]');
					
				}
				
			}
		}
	}
</script>

<style lang="less" scoped>
	.containet{
		width: 100%;height: 100vh;background-color: #fff;padding: 30rpx;
		.top{
			text-align: center;padding: 60rpx 0;
			image{
				border-radius: 50%;height: 80rpx;width: 80rpx;
			}
		}
		.list{
			.list-item{
				margin: 40rpx 0rpx;
				text{
					margin-left: 30rpx;color: #a4a6a7;
				}
			}
		}
		.content{
			background-color: #f6f8fa;padding: 40rpx;color: #a4a6a7;border-radius: 20rpx;
		}
		.image{
			position: relative;margin-top: 30rpx;
			image{
				width: 200rpx;height: 200rpx;position: absolute;margin-left: 30rpx;
			}
		}
		.button{
			button{
				margin-top: 300rpx;border: 1rpx solid #6ed161;background-color: #fff;color: #6ed161;font-size: 30rpx;padding: 5rpx;border-radius: 20rpx;
			}
		}
	}
	
		 
</style>