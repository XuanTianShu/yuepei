<template>
	<view class="container" style="">
		<view class="list" style="">
			<view class="content" style="">
				<view class="item" style="">
					设备编号<text style="">{{deviceNumber}}</text>
				</view>
				<view class="item" style="">
					设备类型<text style="">{{deviceTypeName}}</text>
				</view>
				<view class="item" style="">
					设备归属<text style="">{{hospitalName}}</text>
				</view>
				<view class="item" style="">
					设备地址<text style="">{{deviceAddress}}</text>
				</view>
			</view>
		</view>
		<view class="open-list" style="">
			<view class="open-content" style="">
				<view class="open-item" v-for="item in lists" style="" :class="item.color==0?'grey':'green'">
					<view class="" >
						{{item.index}}
					</view>
					<view class="item-openbtn"  @click="color(item)" style="">
						打开
					</view>
				</view>
			</view>
			<view class="open-submit" style="">
				<button type="primary" style="background-color: #64d060;" @click="open">打开全部</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {testDevice,unlocking} from '@/api/system/maintenance.js'
	export default{
		data(){
			return{
				list:[],
				lists:[],
				devicenumber:'',
				deviceNumber:'',
				deviceTypeName:'',
				hospitalName:'',
				deviceAddress:'',
			}
		},
		onLoad(option) {
			console.log(option);
			this.list=option.list
			this.getlist()
		},
		methods:{
			 getlist(){
					let data=JSON.parse(this.list)
					this.deviceNumber=data.deviceNumber
					this.deviceTypeName=data.deviceTypeName
					this.hospitalName=data.hospitalName
					this.deviceAddress=data.deviceAddress
					this.lists=JSON.parse(data.rows)
				
			},
			async color(item){
				let data={
					lock:item.index,
					deviceNumber:this.deviceNumber
					
				}
				let res=await unlocking(data)
				if(res.code==200){
					uni.showToast({
							title: res.msg,
							icon:'success',
							duration: 2000,
						});
				}
				
			}
		},
		// 打开全部
		
		open(){
			
		}
	}
</script>

<style lang="less">
	.container{
		height: 100vh;background-color: #fff;
		.list{
			padding: 40rpx;background-color: #f6f8fa;
			.content{
				border: 1px solid #64d060;padding: 10rpx;border-radius: 20rpx;background-color: #fff;
				.item{
					margin: 20rpx;
					text{
						margin-left: 30rpx;color: #b7b7b7;
					}
				}
			}
		}
		.open-list{
			padding: 40rpx 5%;
			.open-content{
				display: flex;flex-wrap: wrap;text-align: center;
				.open-item{
					width: 15%;margin: 2.5%;padding: 25rpx 15rpx;border-radius: 20rpx;
					.item-openbtn{
						margin-top: 20rpx;background-color: #64d060;border-radius: 10rpx;font-size: 25rpx;color: #fff;padding: 5rpx 0;
					}
				}
			}
			.open-submit{
				color: #fff;position: fixed;bottom: 3vh;width: 90%;font-size: 25rpx;
			}
		}
	}
	
	.green{
		border: solid 1rpx #64d060;
	}
	.grey{
		border: solid 1rpx #ccc8cc;
	}
</style>