<template>
	<view class="container" style="height: 100vh;">
		<view class="list" >
			<view class="list-item" style="">
				<view class="item-label">
					设备名称
				</view>
				<view class="item-value" style="">
					悦陪陪护床
				</view>
			</view>
			<view class="list-item" style="">
				<view class=".item-label">
					设备编号
				</view>
				<view class="item-value" style="">
					123456
				</view>
			</view>
			<view class="list-item" style="">
				<view class="item-label">
					设备类型
				</view>
				<view class="item-value" style="">
					
					
					售卖柜
				</view>
			</view>
			<view class="list-item" style="">
				<view class="item-label">
					设备地址
				</view>
				<view class="item-value" style="">
					广东省深圳市福田区广东省深圳市福田区
				</view>
			</view>
			<view class="list-item" style="">
				<view class="item-label">
					设备归属
				</view>
				<view class="item-value" style="">
					郑大一附院5楼骨科203房3床
				</view>
			</view>
			<view class="list-item" style="">
				<view class="item-label">
					工作状态
				</view>
				<view class="item-value" style="">
					
					使用中/故障/空闲/缺货
				</view>
			</view>
			<view class="list-item" style="">
				<view class="item-label">
					电量显示
				</view>
				<view class="item-value" style="">
					100%
				</view>
			</view>
			<view class="list-item" style="">
				<view class="item-label">
					心跳时间
				</view>
				<view class="item-value" style="">
					2022-10-10 13:00:00
				</view>
			</view>
			<view class="list-item" style="">
				<view class="">
					工作累计时间
				</view>
				<view class="item-value" style="">
					100小时45分10秒
				</view>
			</view>
			
		</view>
		<view class="inventory">
			<view class="title" style="">
				库存
			</view>
			<view class="data" style="">
					<view class="data-item" style="">
						<view class="">
							一次性牙刷
						</view>
						<view class="">
							3
						</view>
						<view class="" style="color: red;">
							缺货
						</view>
					</view>
					<view class="data-item" style="">
						<view class="">
							一次性牙刷
						</view>
						<view class="">
							3
						</view>
						<view class="" style="color: red;">
							缺货
						</view>
					</view>
					<view class="fontButton" style="" >
						<button type="primary" style="" @tap="submit()">更换电池记录</button>
					</view>
			</view>
		</view>
		
		
		
	</view>
</template>

<script>
	import {updateDeviceDetails} from '@/api/system/hospital'
	export default{
		data(){
			return{
				list:[],
				hospitalName:'22',
				deviceNumber:'22',
				deviceFllor:'',
				deviceDepartment:'',
				deviceRoom:'',
				deviceBed:'',
				deviceTypeId:''
				
			}
		},
		onLoad(option) {
			console.log(option,'---');
			this.hospitalName=option.hospitalName,
			this.deviceNumber=option.deviceNumber,
			this.deviceTypeId=option.deviceTypeId
			this.deviceFllor=option.deviceFllor
			this.deviceDepartment=option.deviceDepartment
			this.deviceRoom=option.deviceRoom
			this.deviceBed=option.deviceBed
		},
		methods:{
			requestRegister(){
				uni.navigateTo({
					url:"/pages/nosocomial/device/details"
				})
			},
			async submit(){
				let _this=this
				if(_this.deviceFllor==''){
					uni.showToast({
						title: '请输入楼层',
						icon: 'none'
					})
				}else if(_this.deviceDepartment==''){
					uni.showToast({
						title: '请输入科室',
						icon: 'none'
					})
				}else if(_this.deviceRoom==''){
					uni.showToast({
						title: '请输入病房',
						icon: 'none'
					})
				}else if(_this.deviceBed==''){
					uni.showToast({
						title: '请输入床号',
						icon: 'none'
					})
				}else{
					let data={
						hospitalName:_this.hospitalName,
						deviceNumber:_this.deviceNumber,
						deviceFllor:_this.deviceFllor,
						deviceDepartment:_this.deviceDepartment,
						deviceRoom:_this.deviceRoom,
						deviceBed:_this.deviceBed
					}
					let res = await updateDeviceDetails(data)
					if(res.code==200){
						uni.showToast({
							title: '操作成功',
							icon: 'success',    //将值设置为 success 或者 ''
							duration: 1000    //持续时间为 2秒
						})
						uni.reLaunch({
							url:'details?deviceTypeId='+_this.deviceTypeId
						});
					}
				}
				
				
			}
		}
	}
</script>

<style lang="less" scoped>
	.container{
		height: 100vh;
		.list{
			background-color: #fff;padding: 40rpx;
			.list-item{
				display: flex;justify-content: space-between;margin: 30rpx 0;border-bottom: 1rpx solid #eaeaea;padding-bottom: 20rpx;
				.item-label{
					width: 25%;
				}
				.item-value{
					margin-left: 20%;
				}
			}
			.list-input{
				display: flex;margin: 40rpx 0;
				.input-lable{
					width: 25%;margin-top: 5rpx;
				}
				.input{
					background-color: #fafafa;padding: 15rpx;width: 75%;border-radius: 10rpx;
					input{
						margin-left: 10rpx;
					}
				}
			}
		}
	}
	.inventory{
		font-size: 25rpx;
		display: flex;
		flex-direction: column;
		.title{
			padding: 40rpx;
		}
		.data{
			background-color: #fff;padding:40rpx 50rpx;
			.data-item{
				display: flex;justify-content: space-between;margin: 20rpx 0;
			}
			
		}
		
	}
	.fontButton{
		padding: 0 40rpx 100rpx 40rpx;
		margin-top: 100rpx;
		button{
			 width: 100%; background-color: #ffffff;color: #000;border: #fff 1rpx solid;box-shadow: 1px 6px 5px #f7f7f8;
		}
	}
	
	
</style>