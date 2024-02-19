<template>
	<view class="container" style="">
		<uni-nav-bar left-icon="left" :border="false" :fixed="true" statusBar   title="设备管理" background-color="#64d059" />
		<view class="main" style="">
			<swiper class="swiper main-img" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
							:duration="duration">
							<swiper-item v-for="item in imglist">
								<image class="" :src="item.img" alt="" style="">
							</swiper-item>
						</swiper>
			<!-- <image class="main-img" src="https://images.weserv.nl/?url=https://www.yp10000.com/static/img/login.jpg" alt="" style=""> -->
				
			<view class="content" style="">
				<view class="title">
					<text>医院名称</text>
					<text class="title-text" style="">{{hospitalName}}</text>
				</view>
				<view class="list" style="">
					<view class="item"  style="" @click="todevice">
						<view class="item-left" style="" >
							<image class="left-img" src="https://images.weserv.nl/?url=https://www.yp10000.com/static/img/shebei.png" mode="" style=""></image>
							<view class="left-text" style="">设备数量</view>
						</view>
						<view >
							<text >{{sum}}</text>
							<uni-icons type="forward" size="15"></uni-icons>
						</view>
					</view>
					<view class="item"  style="" @click="Toitem()">
						<view class="item-left" style="">
							<image class="left-img" src="https://images.weserv.nl/?url=https://www.yp10000.com/static/img/shouyi.png" mode="" style=""></image>
							<view class="left-text" style="">设备总收益</view>
						</view>
						<view >
							<text >{{deviceAmount}}</text>
							<uni-icons type="forward" size="15"></uni-icons>
						</view>
					</view>
					<view class="item"  style="" @click="">
						<view class="item-left" style="">
							<image class="left-img" src="https://images.weserv.nl/?url=https://www.yp10000.com/static/img/gaishuai.png" mode="" style=""></image>
							<view class="left-text" style="">综合使用率</view>
						</view>
						<view >
							
							<text v-if="utilizationRate==null">0%</text>
							<text v-else>{{utilizationRate}}%</text>
							<uni-icons type="forward" size="15"></uni-icons>
						</view>
					</view>
					
				</view>
				
				
				<view class="Usage"  style="">
					<view class="Usage-item" style="" v-for="item in Usage" >
						
						<text>{{item.name}}</text>
						
						<view class="item-value" style="" v-if="item.value==null">0%</view>
						<view class="item-value" style="" v-else>{{item.value}}%</view>
						<uni-icons type="forward" size="15"></uni-icons>
					</view>
					
				</view>
				<view class="proportion" style="">
						<view class="proportion-left" style="">
							<image src="https://images.weserv.nl/?url=https://www.yp10000.com/static/img/qiandai.png" mode="" style=""></image>
							<view style="">分成比例</view>
						</view>
						<view class="proportion-right" style="">
							<text style="color: #ffb082;font-size: 30rpx;">{{proportion}}%</text>
							<uni-icons type="forward" size="15"></uni-icons>
						</view>
				</view>
			</view>
		</view>
		<tabBar :tabIndexs='1' ></tabBar>
		
	</view>
</template>

<script>
	import tabBar from '@/components/tabBar.vue'
	
	import {indexPage,selectCarouselList} from '@/api/system/hospital'
	export default{
		data(){
			return{
				imglist:[],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				
				hospitalName:'',
				sum:'',
				deviceAmount:'',
				utilizationRate:'',
				daytimeUsage:'',
				nightUsage:'',
				proportion:'',
				sum:'',
				deviceAmount:'',
				utilizationRate:'',
				list:[
					{id:0,name:'设备数量',value:"5",icon:'https://images.weserv.nl/?url=https://www.yp10000.com/static/img/shebei.png'},
					{id:1,name:'设备总收益',value:"29301.00",icon:'https://images.weserv.nl/?url=https://www.yp10000.com/static/img/shouyi.png',url:'pages/nosocomial/Revenue/statistics'},
					{id:2,name:'综合使用率',value:"20%",icon:'https://images.weserv.nl/?url=https://www.yp10000.com/static/img/gaishuai.png'}
				],
				Usage:[
					{value:'',name:'白天使用率'},
					{value:'',name:'晚上使用率'}
				],
				baseUrl:''
			}
		},
		mounted() {
			console.log('登录')
		},
		onLoad() {
			this.baseUrl='https://yp10000.com/'
			this.getlist()
		},
		methods:{
			
			async getlist(){
				// this.userName=uni.getStorageSync('userName')
				let userId=uni.getStorageSync('userid')
				let res =await indexPage(userId)
				if(res.code==200){
					
					this.hospitalName=res.data.hospitalName
					this.sum=res.data.sum
					this.deviceAmount=res.data.deviceAmount
					this.utilizationRate=res.data.utilizationRate
					this.proportion=res.data.proportion
					// this.Usage.push(res.data.daytimeUsage)
					this.Usage[0].value=res.data.daytimeUsage
					this.Usage[1].value=res.data.nightUsage
					
					console.log(this.proportion,'===');
				}
				let reg=await selectCarouselList()
				if(reg.code==200){
					let banner = reg.data[0].carouselTop.split(',')
					     //https://www.yp10000.com
					     banner.forEach((i,index)=>{
							 
					      i=this.baseUrl+i
					      banner[index]=i
						  // console.log(banner,'banner');
					     })
					     console.log(banner,'--000')
						 for(let i in banner){
							 let data={img:''}
							 data.img=banner[i]
							 this.imglist.push(data)
						 }
						 console.log(this.imglist,'listttt');
					// for(let i in reg.data){
					// 	// console.log(reg.data[i].carouselTop);
					// 	// let url=JSON.parse(reg.data[i].carouselTop)
					// 	console.log(url,'【【【【');
					// 	let list={img:''}
					// 	list.img=url
					// 	this.imglist.push(list)
					// 	console.log(url,'urlll',this.imglist);
					// }
					console.log('轮播图');
				}
			},
			Toitem(){
				console.log('yemian');
				uni.navigateTo({
					url:'/pages/nosocomial/Revenue/statistics'
				})
			},
			todevice(){
				uni.navigateTo({
					url:'/pages/nosocomial/device/index'
				})
			}
		},
		components: {
		  tabBar
		},
	}
</script>

<style scoped lang="less">

	.container{
		height: 100vh;width: 100%;
		.main{
			width: 100%;height: 80%;position: relative;
			.main-img{
				width: 100%;height: 31%;
				image{
					width: 100%;height: 100%;
				}
				
			}
			.content{
				width: 100%;border-radius: 20rpx 20rpx 0 0 ;position: absolute;top: 30%;background-color: #fff;padding: 40rpx;height: 70%;
				.title{
					.title-text{
						margin-left: 20rpx;font-size: 30rpx;font-weight: 600;
					}
				}
				.list{
					margin: 60rpx 0rpx 20rpx 0rpx;
					.item{
						display: flex;justify-content: space-between;padding: 30rpx 20rpx;background-color: #fcfcfc;margin: 30rpx 0;border-radius: 20rpx;
						.item-left{
							display: flex;margin-left: 20rpx;
							.left-img{
								width: 50rpx;height: 50rpx;
							}
							.left-text{
								margin-left: 20px;font-size: 30rpx;line-height: 50rpx;
							}
						}
					}
				}
				.Usage{
					display: flex;justify-content: space-between;border-radius: 20rpx;
					.Usage-item{
						background-color: #fcfcfc;padding: 30rpx 40rpx;border-radius: 20rpx;margin: 0 10rpx 0 0;display: flex;
						.item-value{
							font-size:30rpx;margin-left: 10rpx;
						}
					}
				}
				.proportion{
					padding: 30rpx 40rpx;display: flex;justify-content: space-between;background-color: #fcfcfc;margin: 30rpx 0;border-radius: 20rpx;
					.proportion-left{
						display: flex;
						image{
							width: 50rpx;height: 50rpx;
						}
						view{
							margin-left: 20px;font-size: 30rpx;line-height: 50rpx;
						}
					}
					.proportion-right{
						margin-top: 10rpx;
						text{
							color: #ffb082;font-size: 30rpx;
						}
					}
				}
			}
		}
	}
	

</style>