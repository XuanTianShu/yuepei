<template>
	<view class="revenue">
		<view class="top font_color as">
				<view class="t1" v-for="(item,index) in list" :key="index" @click="choose(index)">
						<text :class="idx==index?'backColor':''">{{item}}</text>
						<view :class="idx==index?'t1_a0':''">
						</view>
				</view>
		</view>
		
		<view class="main ">
			<view class="as">
				<view class="m1">
						<view class="m1_a" v-for="(item,index) in list2" :key="index">
								<view>{{index!=2?item.sum.toFixed(2):item.sum}}</view>
								<view class="m1_a_p">{{item.pic}}</view>
						</view>
				</view>
			</view>
				<view class="m2">
					<view class="top topic font_color as">
						<view :style="index==0?'width: 40%;':'width: 20%;text-align: center;'" v-for="(item,index) in list3" :key="index">
							{{item}}
						</view>
					</view>
					<view class="content">
							<view class="m3" v-for="(item,idx) in data" :key="idx">
									<view>{{item.hospitalName||''}}</view>
									<view class="top">
											<view class="font_color" style="font-weight: 200;">{{item.orderNumber}}</view>
											<view class="m4">{{item.dividendRatio}}%</view>
											<view class="m4 font_color2">{{item.incomeAmount.toFixed(2)}}</view>
											<view class="m4 font_color2">{{item.netAmount.toFixed(2)}}</view>
									</view>
							</view>
					</view>	
						
				</view>
		</view>
	</view>
</template>

<script>
	import {selectRevenueStatistics} from '@/api/system/user.js'
	export default{
		data(){
			return{
				list:[
					'昨日','今日','本月','累计'
				],
				idx:0,
				
				list2:[
					{pic:'有效金额',sum:0},
					{pic:'分润金额',sum:0},
					{pic:'有效订单',sum:0},
				],
				
				list3:[
					'订单编号','分润比例','分润金额','收益金额'
				],
				
				data:[
					 // {
						//  name:'郑大一附院',
						//  id:'123456789101',
						//  scale:'10',
						//  sx:90000,
						//  sum:5000
					 // },{
						//  name:'医院名称',
						//  id:'123456789101',
						//  scale:'10',
						//  sx:90000,
						//  sum:5000
					 // }
					
				]
			}
		},
		onLoad() {
			this.selectRevenueStatistics(1)
		},
		methods:{
			choose(i){
				 this.idx=i
				 this.selectRevenueStatistics(i+1)
			},
			
			//
			async selectRevenueStatistics(idx){
				let data={
					statistics:idx
				}
				let res= await selectRevenueStatistics(data)
				console.log(res.data)
				this.data=res.data.orderVos
				this.list2[0].sum=res.data.orderAmount
				this.list2[1].sum=res.data.dividendAmount
				this.list2[2].sum=res.data.effectiveOrder
			},
		},
	}
</script>

<style lang="less" scoped>
	page { 
	 --bar-top: #5EDB51;
	 --ft-bg:#999999;
	 --crf: rgba(255, 170, 0, 0.5);
	 --cre: rgba(255, 255, 127, 0.5);
	}
	
	.backColor{
		color: black !important;
	}
	.font_color{
		color: #999999;;
	}
	.font_color2{
		color: rgba(255, 170, 0, 1.0) !important;
	}
	.as{
		padding:  0 30rpx;
	}
	.revenue{
		height: 100%;
		width: 100%;
		margin: 0;
		padding: 20rpx 0;
		background-color: #FFF;
		.main{
			width: 100%;
			.m1{
				width: 100%;height: 260rpx;
				border-radius: 15rpx;
				margin: 50rpx auto;
				// background-image: linear-gradient(to right, rgba(255, 207, 124, 0.5) ,rgba(255, 227, 156, 0.5));
				background-image: url('https://www.yp10000.com/static/img/touzi/31.png');
				background-size:100% 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 50rpx;
				.m1_a{
					font-weight: bold;
					color: #626231;
					font-size: 35rpx;
					padding: 10rpx;
					text-align: center;
					.m1_a_p{
						font-size: 24rpx;
						margin-top: 15rpx;
					}
				}
			}
			
			.m2{
				width: 100%;
				background-color: #FFF;
				 .topic{
					 width: 100%;
					 view{
						 width: 25%;
					 }
				 }
				 .content{
					 width: 100%;
					 font-weight: bold;
					 font-size: 30rpx;
					 margin-top: 25rpx;
					 .m3{
						 padding: 10rpx 30rpx;
						 border-bottom: 1rpx solid rgba(154, 150, 147, 0.2);
						 view{
							 padding: 10rpx 0;
						 }
						 .m4{
						 	width: 20%;
						 	text-align: center;
						 }	
					 }
					 
				 }
			}
		}
		
		
		.top{
			display: flex;
			justify-content: space-between;
			.t1{
				 font-weight: bold;
				.t1_a0{
					width: 100%;height: 15rpx;
					// background-color: var(--bar-top);
					background-color: #5EDB51;
					border-radius: 6rpx;
				}
			}
		}
	}
</style>