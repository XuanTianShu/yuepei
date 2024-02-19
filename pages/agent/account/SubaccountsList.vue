<template>
	<view class="containe" style="">
		<view class="item" v-for="item in list" style="">
			<view class="title" style="">
				<view class="">
					{{item.agentName}}
				</view>
				<view class="">
					分成比例<text style="">{{item.proportion}}%</text>
				</view>
			</view>
			<view class="data" style="">
				<view class="hosnum" style="">
					医院总数<text style="">{{item.hospitalSum}}</text>  
				</view>
				<view class="devicenum">
					设备总数<text style="">{{item.deviceSum}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {selectSubAccount} from '@/api/system/agent'
	export default{
		data(){
			return{
				list:[],
				userid:''
			}
		},
		onLoad() {
			this.userid=uni.getStorageSync('userid')
			this.getlist()
		},
		methods:{
			async getlist(){
				let userId=this.userid
				let res=await selectSubAccount(userId)
				if(res.code==200){
					console.log(res.data);
					this.list=res.data
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.containe{
		width: 100%;padding: 20rpx 30rpx;
		.item{
			display: flex;
			flex-direction: column;
			background-color: #fff;
			padding: 40rpx;
			margin-bottom: 20rpx;
			border-radius: 20rpx;
			.title{
				display: flex;justify-content: space-between;
				view{
					text{
						color: #ffbd9e;margin-left: 20rpx;
					}
				}
			}
			
			.data{
				display: flex;flex-direction: column;
				.hosnum{
					margin: 30rpx 0;
					text{
						color: #c0c0c0;margin-left: 30rpx;
					}
				}
				.devicenum{
					text{
						color: #c0c0c0;margin-left: 30rpx;
					}
				}
				
			}
		}
	}
</style>