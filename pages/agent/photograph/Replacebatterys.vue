<template>
	<view class="container" style="">
		<view class="item" style="">
			<text>{{info.feedbackTime}}</text>
			<text style="color: red;" v-if="info.status==0">未处理</text>
			<text v-else>已处理</text>
		</view>
		<view class="" style="padding: 40rpx;background-color: #fff;"v-for="(item,index) in info.feedbackUrl">
			<image :src="item" mode="" style="width: 100%;height: 600rpx;"></image>
		</view>
	</view>
</template>

<script>
	import {selectUploadsFileListDetails} from '@/api/system/agent'
	export default{
		data(){
			return{
				info:''
			}
		},
		onLoad(option) {
			this.info=JSON.parse(option.info)
			console.log('info',this.info)
		},
		methods:{
			
		}
	}
</script>

<style lang="less" scoped>
	.container{
		width: 100%;height: 100vh;background-color: #fff;
		.item{
			width: 100%; padding: 30rpx;display: flex;
			justify-content: space-between;box-shadow: 0rpx 0rpx 15rpx #e7e7e8;
		}
	}
	
	
</style>