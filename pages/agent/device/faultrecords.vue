<template>
	<view class="containet" style="">
		<view class="list" style="">
			<view class="item" style="">
				故障编号<text style="">{{feedbackId}}</text>
			</view>
			<view class="item" style="">
				维修时间<text style="">2022-10-10 12:10</text>
			</view>
			<view class="item" style="">
				设备编号<text style="">{{deviceNumber}}</text>
			</view>
			<view class="item" style="">
				设备地址<text style="">{{deviceAddress}}</text>
			</view>
			<view class="item" style="">
				维修状态
				<text style="" v-if="status==1">维修完成</text>
			</view>
			<view class="item" style="display: flex;">
				<view class="" style="width: 17%;">
					故障描述
				</view>
				<text style="">{{feedbackInfo}}</text>
			</view>
		</view>
		<view class="image" style="display: flex;">
			
			<view class="" style="width: 17%;">
				
				设备图片 
			</view>
			<view class="" v-for="item in devicePicture" style="display: flex;">
				<image :src="item" mode="" style=""></image>
			</view> 
		</view>
	</view>
</template>
<script>
	import {feedbackRepairCompleted} from '@/api/system/agent'
	export default{
		data(){
			return{
				deviceAddress:'',
				deviceNumber:'',
				feedbackId:'',
				feedbackInfo:'',
				feedbackType:'',
				devicePicture:'',
				status:'',
				feedbackTime:''
			}
		},
		onLoad(option) {
			this.feedbackId=option.feedbackId
			this.getlist()
		},
		methods:{
			async getlist(){
				let feedbackId=this.feedbackId
				let res=await feedbackRepairCompleted(feedbackId)
				if(res.code==200){
					this.deviceAddress=res.data.deviceAddress
					this.deviceNumber=res.data.deviceNumber
					this.feedbackId=res.data.feedbackId
					this.feedbackInfo=res.data.feedbackInfo
					this.feedbackType=res.data.feedbackType
					this.devicePicture=res.data.devicePicture
					this.status=res.data.status
				}
			},
			navigateTo(url){
				console.log('hahah',url);
				uni.navigateTo({
					url:url
					
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.containet{
		width: 100%;height: 100vh;background-color: #fff;padding: 30rpx;
		.list{
			.item{
				margin: 40rpx 0rpx;
				text{
					margin-left: 30rpx;color: #a4a6a7;
				}
			}
		}
		.image{
			margin-top: 30rpx;
			
			view{
				// position: absolute;
				// margin-left: 30rpx;
				image{
					width: 170rpx;height: 170rpx;margin: 0 10rpx;
				}
			}
		}
	}
	
		 
</style>