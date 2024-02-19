<template>
	<view class="agent-home">
		<view class="navbar">
			<uni-nav-bar leftText="共享陪护床" style="font-weight:bold;" :fixed="true" :statusBar="true" />
		</view>
		
		<view class="lbt_img">
			<swiper1Vue :banner="banner"></swiper1Vue>
		</view>
		
		<view class="content">
			<view class="ho_v2_a1">
				
				<view class="ho_v2_b1"  v-for="(item,index) in list" :key="index" @click="Toitem(item.url)" v-if="item.show==1">
					<image :src="item.img" class="image" style="border-radius: 50rpx;"></image>
					<text>{{item.title}}</text>
				</view>
				<view class="ho_v2_b1"  @click="signout()" >
					<image src="https://images.weserv.nl/?url=https://www.yp10000.com/static/img/home/out.png" class="image" style="border-radius: 50rpx;"></image>
					<text>退出登录</text>
				</view>
			</view>
		</view>
		<view class="button" style="width: 100%;display: flex;flex-direction: row-reverse;padding-right: 40rpx;background-color: #fff;">
			<!-- <view class="button" @click="phone" style="width: 100rpx;height: 100rpx;background-color: #fff;border-radius: 50rpx;text-align: center;box-shadow: 2px 2px 5px 5px rgba(238, 238, 238, 0.9);"> -->
				<image @click="phone"  src="https://www.yp10000.com/static/img/agent/14.png" mode="" style="width: 150rpx;height: 150rpx;"></image>
			<!-- </view> -->
		</view>
	</view>
</template>

<script>
import swiper1Vue from '@/components/swiper/swiper1.vue'
import {selectCarouselList,contactUsList} from '@/api/system/hospital'
export default {
	data(){
		return{
			banner: [],
			baseUrl:'',
			phonenumber:'',
			list:[
					
					
							{
								title:'营收统计',
								show:1,
								url:'/pages/agent/Revenue/statistics',
								img:'https://www.yp10000.com/static/img/agent/5.png',
							},{
								title:'设备管理',
								show:1,
								url:'/pages/agent/device/index',
								img:'https://www.yp10000.com/static/img/agent/4.png',
							},{
								title:'订单记录',
								show:1,
								url:'/pages/agent/commodity/rentorders',
								img:'https://www.yp10000.com/static/img/agent/2.png',
							},{
								title:'医院管理',
								show:1,
								url:'/pages/agent/manage/devicedetails',
								img:'https://www.yp10000.com/static/img/agent/6.png',
							},{
								title:'添加医院',
								show:1,
								url:'/pages/agent/manage/addhospita',
								img:'https://www.yp10000.com/static/img/agent/7.png',
							},{
								title:'提现',
								show:1,
								url:'/pages/agent/Withdrawals/index',
								img:'https://www.yp10000.com/static/img/agent/8.png',
							},{
								title:'我的资料',
								show:1,
								url:'/pages/nursingBed/mine/personalData',
								img:'https://www.yp10000.com/static/img/agent/9.png',
							},{
								title:'添加子账户',
								show:1,
								url:'/pages/agent/account/openSubaccounts',
								img:'https://www.yp10000.com/static/img/agent/7.png',
							},{
								title:'子账户列表',
								show:1,
								url:'/pages/agent/account/SubaccountsList',
								img:'https://www.yp10000.com/static/img/agent/10.png',
							},{
								title:'拍照上传',
								show:1,
								url:'/pages/agent/photograph/upload',
								img:'https://www.yp10000.com/static/img/agent/11.png',
							},{
								title:'故障信息',
								show:1,
								url:'/pages/agent/device/fault',
								img:'https://www.yp10000.com/static/img/agent/12.png',
							},{
								title:'使用说明',
								show:1,
								url:'/pages/agent/illustrate/index',
								img:'https://www.yp10000.com/static/img/agent/13.png',
							}
					
			]
		}
	},
	onLoad() {
		this.baseUrl='https://yp10000.com/'
		this.getlist()
	},
	// onShow() {
	// 	let parentId=uni.getStorageSync('parentId')
	// 	console.log(parentId,'parentId');
	// 	if(parentId==0){
	// 		console.log('dengyu');
	// 		delete this.list[7]
	// 	}
	// },
	methods:{
		signout(){
			uni.showModal({
				title: '提示',
				content: '是否退出登录',
				success: function (res) {
					if (res.confirm) {
						console.log('用户退出登录');
						uni.reLaunch({
							url:'/pages/nursingBed/login/login'
						})
						uni.clearStorageSync();
						uni.setStorageSync('show',1)
						wx.setStorageSync('Sign_in','lgoin')
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
			
		},
		async phone(){
			uni.makePhoneCall({
				phoneNumber: this.phonenumber //仅为示例
			});
		},
		async getlist(){
			
				let parentId=uni.getStorageSync('parentId')
				console.log(parentId,'parentId');
				if(parentId!=0){
					console.log('dengyu');
					delete this.list[7]
				}
			
			
			
			let res = await contactUsList()
			if(res.code==200){
				// console.log('打电话',this.phonenumber);
				this.phonenumber=res.data[0].servicePhone
				// console.log('打电话',this.phonenumber);
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
					 for(let i in banner){
						 let data=''
						 data=banner[i]
						 this.banner.push(data)
					 }
			}
		},
		Toitem(url){
			console.log(url);
			uni.navigateTo({
				url:url
			})
		},
	},
	components:{
		swiper1Vue
	}
}
</script>

<style lang="less" scoped>
	.agent-home{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1;
		background-color:#F6F8FA;
		display: flex;
		flex-flow: column;
		.lbt_img{
			width:100%;
			padding:20rpx 0rpx 50rpx 0rpx;
		}
		
		.content{
			width: 100%;
			height: 1050rpx;
			background: #FFFFFF;
			border-radius: 60rpx 60rpx 0px 0px;
			padding:0 30rpx;
			image{
				width: 80rpx;height: 80rpx;
			}
			.ho_v2_a1{
				width:100%;
				display:flex;
				align-items:center;
				justify-content:space-between;
				flex-flow: wrap;
				
				.ho_v2_b1{
					display:flex;
					flex-flow: column;
					align-items: center;
					margin:30rpx;
					width:20%;
					.image{
						margin-bottom:26rpx;
					}
					text{
						font-size:26rpx;
						text-align: justify;
						text-justify: distribute-all-lines;
						text-align-last: justify;
					}
				}
			}
			.kefu{
				position: absolute;
				right: 30rpx;
				// filter: invert(100%);
			}
			
		}
	}
</style>