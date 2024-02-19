<template>
	<view class="containet" style="">
		  <uni-nav-bar left-icon="left" :border="false" :fixed="true" statusBar @clickLeft="back"    title="故障详情"  />
		<view class="top"  style="">
			<image src="https://www.yp10000.com/static/img/agent/18.png" mode="" style=""></image>
			<view class="">
				维修完成
			</view>
		</view>
		<view class="list" style="">
			<view class="list-item" style="">
				故障编号<text style="">{{feedbackId}}</text>
			</view>
			<view class="list-item" style="">
				设备编号<text style="">{{deviceNumber}}</text>
			</view>
			<view class="list-item" style="">
				设备地址<text style="">{{deviceAddress}}</text>
			</view>
			<view class="list-item" style="">
				故障类型<text style="">维修完成</text>
			</view>
			<view class="list-item" style="display: flex;">
				<view class="" style="width: 17%;">
					故障描述
				</view>
				<text style="">{{feedbackInfo}}</text>
			</view>
		</view>
		<view class="image" style="display: flex;" >
			<view class="" style="width: 27%;">
				设备图片
				
			</view>
			<view class="" v-for="item in devicePicture" style="display: flex;">
				<image :src="item" mode="" style="" style="margin: 0 10rpx;"></image>
			</view> 
		</view>
		<view class="">
			<button type="default" @click="navigateTo('faultrecords')" style="margin-top: 300rpx;background-color: #fff;color: #000000;font-size: 30rpx;padding: 5rpx;border-radius: 20rpx;">查看维修记录</button>
		</view>
	</view>
</template>

<script>
	import {feedbackRepairCompleted} from '@/api/system/agent'
	
	export default{
		data(){
			return{
				imglist:[],
				feedbackId:'',
				deviceAddress:'',
				deviceNumber:'',
				feedbackInfo:'',
				feedbackType:'',
				devicePicture:'',
			}
		},
		onLoad(option) {
			this.feedbackId=option.feedbackId
			
			this.getlist()
		},
		methods:{
			back(){
			   uni.reLaunch({
			    url:"fault"
			   })
			  },
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
					console.log(this.devicePicture);
				}
			},
			navigateTo(url){
				console.log('hahah',url);
				uni.navigateTo({
					url:url+'?feedbackId='+this.feedbackId
					
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.containet{
		width: 100%;height: 100vh;background-color: #fff;padding: 30rpx;padding-top: 0;
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
		.image{
			// position: relative;
			margin-top: 30rpx;
			view{
				// position: absolute;
				// margin-left: 30rpx;
				image{
					width: 170rpx;height: 170rpx;
				}
			}
			
		}

	}
	
		 
</style>