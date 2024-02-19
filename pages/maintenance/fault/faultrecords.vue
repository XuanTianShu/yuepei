<template>
	<view class="containet" style="">
		<view class="list" style="">
			<view class="item" style="">
				故障编号<text style="">{{feedbackId}}</text>
			</view>
			<view class="item" style="">
				维修时间<text style="">{{feedbackTime}}</text>
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
		<!-- <view class="image" style="display: flex;">
			
			<view class="" style="width: 17%;">
				
				设备图片 
			</view>
			<view class="" v-for="item in devicePicture" style="display: flex;">
				<image :src="item" mode="" style=""></image>
			</view> 
		</view> -->
		<view class="image" style="display: flex;" >
			<view class="" style="width: 27%;">
				设备图片
				
			</view>
			<view class="" v-for="item in devicePicture" style="display: flex;">
				<image :src="item" mode="" style="" style="margin: 0 10rpx;"></image>
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
				feedbackTime:'',
				list:[]
			}
		},
		onLoad(option) {
			console.log(option.list,'-===');
			this.list=option.list
			this.getlist()
		},
		methods:{
			getlist(){
				// let res=await feedbackRepairCompleted(feedbackId)
				// if(res.code==200){
					let datas=JSON.parse(this.list)
					console.log(datas);
					this.deviceAddress=datas.deviceAddress
					this.deviceNumber=datas.deviceNumber
					this.feedbackId=datas.feedbackId
					// this.time=datas.createTime
					
					var now= Date.parse(datas.createTime);
					let endDate = datas.createTime
					let endTime = endDate
					let dates = new Date(endTime)
					let y = dates.getFullYear() // 年let MM = dates.getMonth() + 1 // 
					let MM=dates.getMonth()+1
					MM = MM < 10 ? ('0'+ MM) : MM
					let d = dates.getDate() // 
					d = d < 1 ? ('0'+ d) : d
					let h = dates.getHours() // 8
					h = h < 10 ? ('0'+ h) : h
					let m = dates.getMinutes()// 
					m = m < 10 ? ('0'+ m) : m
					let s = dates.getSeconds()// @
					s = s < 10 ? ('0'+ s) : s
					this.feedbackTime=y+'-'+MM+'-'+d+" "+h +':'+ m +':'+ s
					
					
					this.feedbackInfo=datas.feedbackInfo
					this.feedbackType=datas.feedbackType
					this.devicePicture=JSON.parse(datas.feedbackUrl)
					
					this.status=datas.status
				// }
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