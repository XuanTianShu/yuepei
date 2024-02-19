<template>
	<view class="device_info">
			<u-navbar :autoBack="true" bgColor="rgba(0,0,0,0)" leftIconColor="white"></u-navbar>
			<view class="top"></view>
			
			<view class="content">
				<view class="title">
						<view class="t1">设备信息</view>
						<view >选择要查看的数据</view>
				</view>
				<view class="main">
						<view class="topic" @click="skip('')">
								<view>全部</view>
								<uni-icons type="forward" size="20" color="silver" />
						</view>
						<view class="topic" v-for="(item,index) in list" :key="index" @click="skip(item.deviceTypeId)">
								<view>{{item.deviceTypeName}}</view>
								<uni-icons type="forward" size="20" color="silver" />
						</view>
				</view>
			</view>
	</view>
</template>

<script>
	import {selectDeviceType} from '@/api/system/user.js'
	export default{
		data(){
			return{
				list:[
					// '全部','陪护床','折叠椅','2折床','轮椅','售货柜'
				],
				sum:0
			
			}
		},
		onLoad() {
			this.selectDeviceType()
		},
		methods:{
			// 
			async selectDeviceType(){
				let res= await selectDeviceType()
				this.list=res.data
				console.log(res.data)
			},
	
			skip(deviceTypeId){
				wx.navigateTo({
					url:'manage?deviceTypeId='+deviceTypeId
				})
			}	
		},
	}
</script>

<style lang="less" scoped>
	.device_info{
		width: 100%;height: 100%;
		margin: 0;padding: 0;
		background-color: #FFF;
		text-align: center;
		.top{
			width: 100%;
			height:650rpx;
			background-image: url('https://www.yp10000.com/static/img/touzi/5.png');
			background-size: 100% 100%;
		}
		.content{
			position: fixed;
			top: 14%;
			width: 100%;
			padding: 0 30rpx;
			.title{
					color: #FFF;
					margin-bottom: 50px;
					font-weight: 100;
					letter-spacing: 2rpx;
					font-size: 26rpx;
					.t1{
						font-size: 26px;
						font-weight: 500;
						margin-bottom: 15rpx;
					}
			}
			.main{
				width: 100%;
				.topic{
					width: 100%;
					border-radius: 8px;
					height: 160rpx;
					background-color:#f4f4f4 ;
					margin: 25rpx 0;
					padding: 10rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					view{
						width: 100%;
						padding-left: 25rpx;
					}
				}
			}
		}
	}
</style>