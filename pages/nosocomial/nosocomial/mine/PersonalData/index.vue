<template>
	<view class="container" style="width: 100%;">
		<view class="top" style=""> 
			<view class="item" style="">
				<view class="" style="line-height: 70rpx;" >
					头像
				</view>
				<image :src="imgUrl" mode="" style="width: 70rpx;height: 70rpx;border-radius: 50rpx;"></image>
			</view>
			<view class="item" style="">
				<view class="">
					名称
				</view>
				<view class="">
					{{userName}}
				</view>
			</view>
		</view>
		<view class="item" style="">
			<view class="">
				手机号
			</view>
			<view class="">
				{{phone}}
			</view>
		</view>
		<!-- <view class="item" style="">
			<view class="">
				地区
			</view>
			
			<view class="" v-if="arae==null">
				
			</view>
			<view class="" v-else>
				{{arae}}
			</view>
		</view> -->
	</view>
</template>

<script>
	import {selectPersonalData} from '@/api/system/hospital'
	export default{
		data(){
			return{
				imgUrl:'',
				userName:'',
				phone:'',
				arae:'',
				userId:''
			}
		},
		onLoad() {
			this.userId=uni.getStorageSync('userid')
			this.getdata()
		},
		methods:{
			async getdata(){
				let userId=this.userId
				let res=await selectPersonalData(userId)
				if(res.code==200){
					this.imgUrl=res.data.avatar
					this.userName=res.data.userName
					this.phone=res.data.phoneNumber
					this.arae=res.data.area
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.container{
		width: 100%;
		.top{
			margin: 20rpx 0;background-color: #fff;box-shadow: 2px 2px 5px #ddddde;
			.item{
				display: flex;justify-content: space-between;padding: 30rpx 40rpx;
			}
		}
		.item{
			display: flex;justify-content: space-between;padding: 30rpx 40rpx;margin: 20rpx 0;background-color: #fff;box-shadow: 2px 2px 5px #ddddde
		}
	}
</style>