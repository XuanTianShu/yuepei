<template>
	<view class="container" style="">
		<view class="title" style="">
			<view class="title-item" @click="getval(1)" style="" >
				昨日
				<view v-if="dispayType==1" style="">
				</view>
			</view>
			<view class="title-item" @tap="getval(2)" style="" >
				今日 
				<view class="" v-if="dispayType== 2" style="">
				</view>
			</view>
			<view class="title-item" @tap="getval(3)" style="" >
				本月
				<view class="" v-if="dispayType== 3" style="">
				</view>
			</view>
			<view class="title-item" @tap="getval(4)"  >
				累计 
				<view class="" v-if="dispayType== 4" style="">
				</view>
			</view>
		</view>
		<view class="content" >
			<view class="" style="">
				<text style="">{{orderAmount}}</text>
				有效金额
			</view>
			<view class="" style="">
				<text style="">{{dividendAmount}}</text>
				分润金额
			</view>
			<view class="" style="">
				<text style="">{{effective}}</text>
		
				有效订单
			</view>
		</view>
		<view class="data" style="">
			<view class="" style="">
				订单编号
				<text style="margin-top: 30rpx;font-size: 30rpx;color: #000;" v-for="item in orderList">{{item.orderNumber}}</text>
			</view>
			<view class="" style="">
				实收金额
				<text style="margin-top: 30rpx;font-size: 30rpx;font-weight: 700;color: #000;" v-for="item in orderList">{{item.netAmount}}</text>
			</view>
			<view class="" style="">
				收益金额
				<text style="margin-top: 30rpx;font-size: 30rpx;font-weight: 700;color: #e49278;" v-for="item in orderList">{{item.incomeAmount}}</text>
			</view>
			<view class="" style="">
				分润比例
				<text style="margin-top: 30rpx;color: #000;font-weight: 700;font-size: 30rpx;" v-for="item in orderList">{{item.dividendRatio}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {selectRevenueStatistics} from '@/api/system/hospital'
	export default{
		data(){
			return{
				dispayType:2,
				dividendAmount:'',
				orderAmount:'',
				effective:'',
				orderList:''
				
			}
		},
		onLoad(option) {
			this.getList()
		},
		methods:{
			async getval(val){
				this.dispayType= val
				
				let username=uni.getStorageSync('userName')
				let data={
					statistics:val,
					userName:username
				}
				let res = await selectRevenueStatistics(data)
				if(res.code==200){
					this.orderList=res.data.orderVos
					this.dividendAmount=res.data.dividendAmount
					this.orderAmount=res.data.orderAmount
					this.effective=res.data.effectiveOrder
				}
			},
			async getList(val){
				
				this.dispayType= 2
				// if(val==undefined){
					let username=uni.getStorageSync('userName')
					let data={
						statistics:2,
						userName:username
					}
					let res = await selectRevenueStatistics(data)
					if(res.code==200){
						this.orderList=res.data.orderVos
						this.dividendAmount=res.data.dividendAmount
						this.orderAmount=res.data.orderAmount
						this.effective=res.data.effectiveOrder
						console.log(res.data.effectiveOrder,'this.effective',this.effective);
					}
				// }else{
				// 	let data={
				// 		statistics:val
				// 	}
				// 	let res = await selectRevenueStatistics(data)
				// 	if(res.code==200){
				// 		this.orderList=res.data.orderVos
				// 		this.dividendAmount=res.data.dividendAmount
				// 		this.orderAmount=res.data.orderAmount
				// 		this.effectiveOrderr=res.data.effectiveOrderr
				// 	}
				// }
				
				
				
			}
		}
	}
</script>

<style lang="less" scoped>
	.container{
		height: 100vh;background-color: #fff;padding: 40rpx;
		.title{
			display: flex;justify-content: space-between;
			.title-item{
				display: flex;justify-content: space-between;flex-direction: column;
				view{
					background-color: #64cf59;height: 10rpx;width: 50rpx;border-radius: 20rpx;margin-top: 20rpx;
				}
			}
		}
		.content{
			margin-top: 40rpx;background-image: linear-gradient(to right , #fff3dc,#ffebc3,#ffeac4);
			display: flex;justify-content: space-between;padding: 70rpx 40rpx;border-radius: 10rpx;
			view{
				display: flex;flex-direction: column;color: #6f4d17;font-size: 23rpx;text-align: center;
				text{
					font-size: 35rpx;font-weight:600;
				}
			}
		}
		.data{
			// width: 2000rpx;
			// background-color: #64cf59;
			view{
				display: flex;flex-direction: column;
			}
			display: flex;justify-content: space-between;margin-top: 40rpx;font-size: 25rpx;color: #c3c3c3;
		}
	}
</style>