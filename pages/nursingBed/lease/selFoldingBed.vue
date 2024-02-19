<template>
		<view class="content">
			<view class="content_a1">
				<view class="title">折叠床状态</view>
				<view class="content_a1_b1">
						<view class="content_a1_b1_c1">
							<view class="img" style="background-color: #64CF59;box-shadow: 0 10rpx 10rpx #64CF59;"></view>
							<view>可借</view>
						</view>
						<view class="content_a1_b1_c1">
							<view class="img" style="background-color: #bdbdbd;box-shadow: 0 10rpx 10rpx #bdbdbd;"></view>
							<view>无</view>
						</view>
						<view class="content_a1_b1_c1">
							<view class="img" style="background-color: red;box-shadow: 0 10rpx 10rpx red;"></view>
							<view>故障</view>
						</view>
			</view>
		</view>
		<view class="content_a1">
				<view class="title" >选择折叠床</view>
				<view class="content_a1_b1">
						<view  class="content_a2_b0" v-for="(i,index) in list" :key="index">
							<view class="content_a2_b1" :class="bgColor==index?'bgColor':''" :style="style[i.status]" 	@click="choese(index)">{{index+1}}</view>
							<view class="content_a2_title" v-if="i.status<1" :style="i.status<1?'color:#64CF59;':''">可选</view>
							<view class="content_a2_title" v-else-if="i.status==1" :style="i.status==1?'color:red;':''">故障</view>
							<view class="content_a2_title" v-else :style="i.status>1?'color:#bdbdbd;':''">租出</view>
						</view>
						<!-- <u-loading-icon v-if="show" text="正在连接设备" textSize="18"></u-loading-icon> -->
			</view>
		</view>
			
		<view class="content_a2">
				<view class="btn" @click="open">一键开锁</view>
				<!-- pages/nursingBed/mine/faultFeedback-->
				<view class="er_bck" @click="skip('/pages/nursingBed/mine/faultFeedback?deviceNumber='+deviceInfo.deviceNumber)">故障反馈</view>
		</view>
			
		</view>
</template>

<script>
 import {ewmInLock } from '@/api/system/user'
export default{
		data(){
			return{
				list:[//0可选 1故障 2无
					{
						status:0,
					},{
						status:0,
					},{
						status:0,
					},{
						status:0,
					},{
						status:0,
					},
				],
				bgColor:0,
				style:[
					'border: 1.5px solid #64CF59;color:#64CF59;',
					'color:red;border: 1.5px solid red;',
					'background-color: #bdbdbd;border: 1.5px solid #bdbdbd;color:#FFF;',
				],
				deviceInfo:''
			}
		},
		onShow(){
			let info= wx.getStorageSync('ewmInLock')
			//刷新数据
			this.ewmInLock(info.deviceNumber)
			
		},
		methods:{
			async ewmInLock(deviceNumber){
				let _this = this
				console.log('deviceNumber',deviceNumber,'页面显示')
				let res = await ewmInLock({deviceNumber:deviceNumber})
				_this.deviceInfo=res.data
				console.log(_this.deviceInfo)
				_this.list=JSON.parse(_this.deviceInfo.rows)
				
				wx.setStorageSync('ewmInLock',_this.deviceInfo)
				
			},
			open() {
				//一拖五子锁 
				if(this.list[this.bgColor].status){
					this.$modal.msgError('请选择');
				}else{
					this.deviceInfo.selOneFive=this.bgColor
					// '[{"index":1,"status":0}, {"index":2,"status":0}, {"index":3,"status":0}, {"index":4,"status":0}, {"index":5,"status":0}]'
					
					// let row= JSON.parse(this.deviceInfo.rows)
					// row[this.bgColor].status=2
					// console.log('状态',this.bgColor,row)
					
					wx.setStorageSync('ewmInLock',this.deviceInfo)
					this.skip('/pages/nursingBed/lease/payDeposit')
				}
				
			},
			skip(url){
				uni.navigateTo({
					url:url
				});
			},
			choese(index){
				let that=this
				if(that.list[index].status==0) that.bgColor=index
			},
			
			
		}	
}
</script>

<style lang="less" scoped>
	
	.content{
		margin: 0;
		padding: 30rpx;
		overflow: hidden;
		
		.content_a1{
			 margin: 60rpx 0 60rpx 0;
			 color: black ;
			.title{font-weight: 600;font-size: 30rpx;}
			.content_a1_b1{
				border-radius: 20rpx;
				background-color: #fff;
				width: 100%;
				margin:30rpx 0 ;
				display: flex;
				justify-content: center;
				.content_a1_b1_c1{
					padding: 35rpx;
					display: flex;
					justify-content:center;
					flex-flow: column;
					align-items: center;
					text-align: center;
					margin: 0 50rpx;
					.img{
						margin-bottom: 20rpx;
						border-radius: 60%;
						width: 40rpx;height: 40rpx;
					}
				}
				.content_a2_b0{
					padding: 50rpx 20rpx;
					text-align: center;
					font-weight: 600;
					.content_a2_b1{
						padding: 45rpx 30rpx;
						font-size: 35rpx;
						border-radius: 20rpx;
						margin-bottom: 20rpx;
					}
					.bgColor{
						background-color: #64CF59;
						color: #fff !important;
					}
				}
				
			}
		}
	
		.content_a2{
			bottom: 0%;
			text-align: center;
			width: 100%;
			padding: 100rpx 0 150rpx 0;
			.er_bck{
				color: #aaaaaa;
			}
			.btn{
				width: 100%;
				font-size: 26rpx;
				padding: 25rpx 0;
				margin-bottom: 40rpx;
				color: #ffffff;
				border-radius: 10rpx;
				background-color: #64CF59;
			}
		}
	}
</style>