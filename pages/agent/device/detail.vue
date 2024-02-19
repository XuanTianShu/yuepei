<template>
	<view class="container" style="height: 100vh;background-color: #fff;">
		<view class="list" >
			<!-- <view class="list-item" style="">
				<view class="item-label">
					设备名称
				</view>
				<view class="item-value" style="">
					{{datalist.deviceTypeName}}
				</view>
				
			</view> -->
			<view class="list-item" style="">
				<view class=".item-label">
					设备编号
				</view>
				<view class="item-value" style="">
					{{datalist.deviceNumber}}
				</view>
			</view>
			<view class="list-item" style="">
				<view class="item-label">
					设备类型
				</view>
				<view class="item-value" style="">
					
					
					{{datalist.deviceTypeName}}
				</view>
			</view>
			<view class="list-item" style="">
				<view class="item-label">
					设备地址
				</view>
				<view class="item-value" style="">
					{{datalist.deviceAddress}}
				</view>
			</view>
			<view class="list-item" style="">
				<view class="item-label">
					设备归属
				</view>
				<view class="item-value" style="">
					{{datalist.deviceFullAddress}}
				</view>
			</view>
			<view class="list-item" style="">
				<view class="item-label">
					工作状态
				</view>
				<view class="item-value" style="" v-if="datalist.status==0" >
					使用中
				</view>
				<view class="item-value" style="" v-if="datalist.status==1" >
					故障
				</view>
				<view class="item-value" style="" v-if="datalist.status==2" >
					空闲
				</view>
				<view class="item-value" style="" v-if="datalist.status==3" >
					缺货
				</view>
			</view>
			<view class="list-item" style="">
				<view class="item-label">
					电量显示
				</view>
				<view class="item-value" style="">
					{{datalist.power}}
				</view>
			</view>
			<view class="list-item" style="">
				<view class="item-label">
					心跳时间
				</view>
				<view class="item-value" style="">
					{{datalist.heartbeat}}
				</view>
			</view>
			<view class="list-item" style="">
				<view class="">
					工作累计时间
				</view>
				<view class="item-value" style="">
					{{datalist.cumulativeTime}}
				</view>
			</view>
		
		</view>
		
		<view class="fontButton" style="" >
			<button type="primary" style="" @tap="tofault(datalist.status)">故障列表</button>
			
		</view>
		<view class="" style="margin-top: 200rpx;color: #00a6ff;background-color: #fff;text-align: center;">
			更换电池记录
		</view>
		
	</view>
</template>

<script>
	import {selectDeviceDetailsByDeviceNumber} from '@/api/system/agent'
	export default{
		data(){
			return{
				datalist:[],
				hospitalName:'22',
				deviceNumber:'',
				deviceFllor:'',
				deviceDepartment:'',
				deviceRoom:'',
				deviceBed:'',
				deviceTypeId:''
				
			}
		},
		onLoad(option) {
			console.log(option,'---');
			this.deviceNumber=option.deviceNumber,
			this.getlist()
		},
		methods:{
			async getlist(){
				let data={
					deviceNumber:this.deviceNumber
				}
				
				let res = await selectDeviceDetailsByDeviceNumber(data)
				if(res.code==200){
					this.datalist=res.data
					var now= Date.parse(this.datalist.heartbeat);
					let endDate = this.datalist.heartbeat
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
					this.datalist.heartbeat=y+'-'+MM+'-'+d+" "+h +':'+ m +':'+ s
					
				}
				
				
			},
			tofault(){
				uni.navigateTo({
					url:"fault"
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.container{
		height: 100vh;
		.list{
			background-color: #fff;padding: 40rpx;
			.list-item{
				display: flex;justify-content: space-between;margin: 40rpx 0;border-bottom: 1rpx solid #efefef;padding-bottom: 20rpx;
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
		// margin-top: 300rpx;
		
	}
	.fontButton{
		padding: 0 40rpx 0rpx 40rpx;
		margin-top: 100rpx;
		button{
			 width: 100%; background-color: #ffffff;
			 color: #000;border: #fff 1rpx solid;box-shadow: 1px 6px 5px #f7f7f8;
		}
	}
	
	
</style>