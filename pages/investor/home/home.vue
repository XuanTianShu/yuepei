<template>
<view class="investor_home">
	<uni-nav-bar   color="#FFF"  :border="false" :statusBar="true"  title="设备管理" background-color="#64d059" />
	<view class="img">
		<img src="https://images.weserv.nl/?url=https://www.yp10000.com/static/img/login.jpg">
	</view>
	
	<view class="comtent">
		<uni-data-select
		  :localdata="arry"
		  v-model="value"
		  @change="change"
		  :clear="true"
		  placeholder='请选择医院'
		></uni-data-select>
				<view class="ct_a_b" @click="skip(item.url)" v-if="index<3" v-for="(item,index) in list" :key="index">
						<view>
							<img :src="item.icon" >
						</view>
						<view class="ct_a_b1">
								<text>{{item.name}}</text>
								<text class='text2'>{{item.value||0}}</text>
						</view>
						<uni-icons type="forward" size="15"></uni-icons>
				</view>
				<view class="ct_a_c" >
						<view class="ct_a_c1" @click="skip(list[3].url)">
							<view class="ct_a_b1">
									<text>{{list[3].name}}</text>
									<text class='text2'>{{list[3].value||0}}</text>
							</view>
							<uni-icons type="forward" size="15"></uni-icons>
						</view>
						<view class="ct_a_c1" @click="skip(list[4].url)">
							<view class="ct_a_b1">
									<text>{{list[4].name}}</text>
									<text class='text2'>{{list[4].value||0}}</text>
							</view>
							<uni-icons type="forward" size="15"></uni-icons>
						</view>
				</view>
				<view class="ct_a_b" @click="skip(list[5].url)">
						<view>
							<img :src="list[5].icon" >
						</view>
						<view class="ct_a_b1">
								<text>{{list[5].name}}</text>
						</view>
						<uni-icons type="forward" size="15"></uni-icons>
				</view>
			
	</view>
	
	<view class="btoBar">
		<view class="ct_b" v-for="(item,index) in home" :key="index" @click="skip(item.path)">
			<img :src="item.url"></img>
			<view class="tabTitle_actived">{{item.title}}</view>
		</view>
	</view>
	
</view>
</template>

<script>
	import {investorHome,selectHospitalName} from '@/api/system/user.js'
	export default{
		data(){
			return{
				value:'',
				arry:[],
				list:[
					{name:'设备数量',value:"5",icon:'https://www.yp10000.com/static/img/touzi/23.png',url:'/pages/investor/device/info'},
					{name:'设备总收益',value:"29301.00",icon:'https://www.yp10000.com/static/img/touzi/20.png',url:'/pages/investor/mine/mine'},
					{name:'综合使用率',value:"20%",icon:'https://www.yp10000.com/static/img/touzi/21.png'},
					{name:'白天使用率',value:"10%",icon:'https://www.yp10000.com/static/img/touzi/gaishuai.png'},
					{name:'晚上使用率',value:"10%",icon:'https://www.yp10000.com/static/img/touzi/gaishuai.png'},
					{name:'营收统计',icon:'https://www.yp10000.com/static/img/touzi/22.png',url:'/pages/investor/home/revenue'}
				],
				home:[
					{
						title:'首页',
						url:'https://www.yp10000.com/static/img/touzi/11.png',
						path:'/'
					},{
						title:'设备信息',
						url:'https://www.yp10000.com/static/img/touzi/8.png',
						path:'/pages/investor/device/info'
					},{
						title:'个人中心',
						url:'https://www.yp10000.com/static/img/touzi/4.png',
						path:'/pages/investor/mine/mine'
					},
				]
			}
		},
		onLoad() {
			let tk=wx.getStorageSync('Sign_in')
			console.log(tk,'登录')
			this.investorHome()
			this.selectHospitalName()
		},
	
		methods:{
			/*设备数量：sum
			设备总收益：deviceAmount
			综合使用率：utilizationRate
			白天使用率：daytimeUsage
			晚上使用率nightUsage*/
			async investorHome(id){
				let data={
					hospitalId:id
				}
				let res= await investorHome(data)
				this.list[0].value=res.data.sum
				this.list[1].value=res.data.deviceAmount
				this.list[2].value=res.data.utilizationRate
				this.list[3].value=res.data.daytimeUsage
				this.list[4].value=res.data.nightUsage
				console.log(res.data)
			},
			async selectHospitalName(){
				let res = await selectHospitalName()
				
				res.data.forEach(item=>{
					let data={
						value:item.hospitalId,
						text:item.hospitalName
					}
					this.arry.push(data)
				})
				
				console.log('HospitalName',res.data)
			},
			
			change(e) {
				// console.log( e);
				// wx.setStorageSync('hospitalId',e)
				this.investorHome(e)
			},
			skip(url){
				wx.navigateTo({
					url:url
				})
			},
	
		}
	}
</script>

<style lang="less" scoped>
	.investor_home{
		width: 100%;height: 100%;
		background-color: #ffffff;
		// 共用
		.text2{
			font-weight: bold;font-size: 32rpx;
		}
		.ct_a_b1{
			width: 100%;
			display: flex;justify-content: space-between;
			padding-right: 10rpx;
			font-size: 26rpx;
		}
		.img{
			width: 100%;
			min-height: 240rpx;
		}
		img{
			width: 100%;
		}
		.comtent{
				width: 100%;
				height: 70%;
				position: relative;
				z-index: 2;
				margin-top: -180rpx;
				border-radius: 40rpx 40rpx 0 0;
				padding: 30rpx 25rpx ;
				background-color:  #ffffff;
			
				.ct_a_b{
						width: 100%;
						margin: 25rpx 0;border-radius: 10rpx ;
						background-color: rgba(#c4dbe8, 0.2);
						padding:25rpx;
						display: flex;
						align-items: center;
						img{
							width: 50rpx;height: 50rpx;
							margin-right: 20rpx;
						}
						
				}
				
				.ct_a_c{
					display: flex;
					justify-content: space-between;
					width: 100%;
					.ct_a_c1{
						border-radius: 10rpx ;width: 48%;
						background-color: rgba(#c4dbe8, 0.2);
						padding:40rpx 25rpx;
						display: flex;justify-content: space-between;
						align-items: center;
					}
				}
		}
		.btoBar{
			width: 100%;
			position: fixed;
			bottom: 0%;
			z-index: 2;
			padding: 20rpx;
			display: flex;
			background-color:  #ffffff;
			justify-content: space-around;
			.ct_b{
				text-align: center;
				width: 200rpx;
				margin-bottom: 10rpx;
				img{
					width: 70rpx;
					height: 70rpx;
				}
			}
		}
	}
</style>