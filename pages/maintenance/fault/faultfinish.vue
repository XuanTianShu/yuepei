<template>
	<view class="containet" style="">
		  <!-- <uni-nav-bar left-icon="left" :border="false" :fixed="true" statusBar @clickLeft="back"    title="故障详情"  /> -->
		<view class="top"  style="">
			<image src="https://www.yp10000.com/static/img/yunwei/10.png" mode="" style=""></image>
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
	import {getfaultDetail} from '@/api/system/maintenance.js'
	
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
				datas:'',
				list:[]
			}
		},
		onLoad(option) {
			this.datas=option.list
			console.log(option,'---');
			this.getlist()
		},
		methods:{
			back(){
			   uni.reLaunch({
			    url:"fault"
			   })
			  },
			 async getlist(){
				
				let datas=JSON.parse(this.datas)
				console.log(datas,'===');
				// let json = JSON.parse(datas.devicePicture)
				
				// datas.devicePicture=json
				let feedbackId=datas.feedbackId
				console.log('羊一样');
				let res=await getfaultDetail(feedbackId)
					if(res.code==200){
						console.log('wancx',res.data.feedbackUrl);
						let json = JSON.parse(res.data.feedbackUrl)
						
						this.deviceAddress=res.data.deviceAddress
						this.deviceNumber=res.data.deviceNumber
						this.feedbackId=res.data.feedbackId
						
						this.feedbackInfo=res.data.feedbackInfo
						this.feedbackType=res.data.feedbackType
						this.devicePicture=[]
						
						for(let i in json){
							this.devicePicture.push(json[i])
							
						}
						
						this.list=res.data
					}
					// this.deviceAddress=datas.deviceAddress
					// this.deviceNumber=datas.deviceNumber
					// this.feedbackId=datas.feedbackId
					
					// this.feedbackInfo=datas.feedbackInfo
					// this.feedbackType=datas.feedbackType
					// this.devicePicture=json
					// this.list=datas
			},
			navigateTo(url){
				console.log('hahah',url);
				let data=JSON.stringify(this.list)
				uni.navigateTo({
					url:url+'?list='+data
					
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