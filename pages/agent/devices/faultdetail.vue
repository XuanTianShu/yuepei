<template>
	<view class="containet" style="">
		<view class="top"  style="">
			<image src="../../../static/login.jpg" mode="" style=""></image>
			<view class="">
				等待维修
			</view>
		</view>
		<view class="list" style="">
			<view class="list-item" style="">
				故障编号<text style="">1234567890</text>
			</view>
			<view class="list-item" style="">
				设备编号<text style="">12345</text>
			</view>
			<view class="list-item" style="">
				设备地址<text style="">郑大一附院</text>
			</view>
			<view class="list-item" style="">
				故障类型<text style="color: #f53f3f;">无法开锁</text>
			</view>
		</view>
		<view class="content" style="">
			不管怎么弄，就是打不开这个，怎么回事呀，麻烦修一下吧
		</view>
		<view class="image" style="">
			设备图片 <image src="../../../static/login.jpg" mode="" style=""></image>
		</view>
		<view class="button">
			<button type="default" @click="navigateTo('faultdetails')" style="">填写维修记录</button>
		</view>
	</view>
</template>

<script>
	// import {selectGoodsOrder,selectLeaseOrder,selectDepartment} from '@/api/system/hospital'
	
	export default{
		data(){
			return{
				oeder:0,
				num:0,
				value: '',
				selist: [],
				values: 0,
				ranges: [
					{ value: 0, text: "陪护床" },
					{ value: 1, text: "轮椅" },
					{ value: 2, text: "柜子" },
				],
				list:[],
				statuList:[],
				deviceDepartment:''
			}
		},
		onLoad() {
			// this.getLease()
		},
		methods:{
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
		.content{
			background-color: #f6f8fa;padding: 40rpx;color: #a4a6a7;border-radius: 20rpx;
		}
		.image{
			position: relative;margin-top: 30rpx;
			image{
				width: 200rpx;height: 200rpx;position: absolute;margin-left: 30rpx;
			}
		}
		.button{
			button{
				margin-top: 300rpx;border: 1rpx solid #6ed161;background-color: #fff;color: #6ed161;font-size: 30rpx;padding: 5rpx;border-radius: 20rpx;
			}
		}
	}
	
		 
</style>