<template>
	<view class="container" style="" >
		<uni-nav-bar left-icon="left" :border="false" :fixed="true" statusBar @clickLeft="back"    title="上传文档列表" background-color="" />
		<view class="" v-for="item in list">
			<view class="item" style="" @click="todetail(item)" >
				<text>{{item.feedbackTime}}</text>
				<text style="color: red;" v-if="item.status==0">未处理</text>
				<text v-else>已处理</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {selectUploadsFileList} from '@/api/system/agent'
	import {dateFormart} from '@/utils/dateFormart.js'
	export default{
		data(){
			return{
				userid:'',
				list:[]
			}
		},
		onLoad() {
			this.userid=uni.getStorageSync('userid')
			this.getlist()
		},
		methods:{
			back(){
				uni.navigateBack({
					delta:1,
				})
			},
			async getlist(){
				let userId=this.userid
				let res = await selectUploadsFileList(userId)
				if(res.code==200){
					this.list=res.data
					console.log(this.list)
					this.list.forEach((item,index)=>{
						this.list[index].feedbackTime=dateFormart(new Date(item.feedbackTime))
						
					})
				}
			},
			todetail(item){
				uni.navigateTo({
					url:'/pages/agent/photograph/Replacebatterys?info='+JSON.stringify(item)
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.container{
		width: 100%;
		.item{
			width: 100%; background-color: #fff;padding: 30rpx;display: flex;
			justify-content: space-between;margin-top: 20rpx;box-shadow: 0rpx 0rpx 15rpx #e7e7e8;
		}
	}
	
	
</style>