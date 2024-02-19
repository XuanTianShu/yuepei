<template>
	<view class="container" >
		<!-- <uni-nav-bar left-icon="left" :border="false" :fixed="true" statusBar @clickLeft="back"   title="个人中心" background-color="#64d059" /> -->
		<u-navbar :autoBack="true" bgColor="rgba(0,0,0,0)" leftIconColor="white">
					<view class="navbarTitle" slot="center">个人中心</view>
		</u-navbar>
		<view class="mine"  @tap="Tocenter">
			<image :src="imgUrl" mode="" ></image>
			<view class="mine-name"   >
				<text>{{userName}}</text>
				<uni-icons type="right" size="18" color="#fff" ></uni-icons>
				
			</view>
		</view>
		<view class="content" >
			<view class="mine-data" @click="$tab.navigateTo('/pages/agent/Withdrawals/index?fund='+amount)">
				<view class="value" >
					{{amount}}
				</view>
				<view class="text" >
					我的资金
				</view>
			</view>
			<view class="item"  @click="getGoods"> 
				<image src="https://www.yp10000.com/static/img/hos/15.png" mode=""  ></image>
				<view class=""  >
					<view>订单记录</view>
					<uni-icons type="right" size="15" color="#d3d5d7"></uni-icons>
				</view>
			</view>
			<view class="item"   @click="phone">
				<image src="https://www.yp10000.com/static/img/hos/16.png" mode="" ></image>
				<view class="" >
					<view>客服热线</view>
					<text style="color:#d3d5d7;">{{phonenumber}}</text>
				</view>
			</view>
			<view class="item"  @click="skip('/pages/nursingBed/lease/instructions')">
				<image src="https://www.yp10000.com/static/img/hos/13.png" mode="" ></image>
				<view class="" >
					<view>使用说明</view>
					<uni-icons type="right" size="15" color="#d3d5d7"></uni-icons>
				</view>
			</view>
			<view class="" style="background-color: #f6f8fa;margin-top: 30rpx;padding: 35rpx 30rpx;width: 100%;font-size: 30rpx;" @click="Signout">
				<view class="" style="text-align: center;">
					<view>退出登录</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {selectPersonalCenter,contactUsList,selectInstructionsList} from '@/api/system/hospital'
	export default{
		data(){
			return{
				imgUrl:'',
				userName:'',
				userId:'',
				amount:'',
				phonenumber:''
			}
		},
		onShow() {
			this.userId=uni.getStorageSync('userid')
			this.getdata()
		},
		methods:{
			skip(url){
				console.log('url',url)
				uni.navigateTo({
					url:url
				});
			},
			async illustrate(){
				uni.navigateTo({
					url:"/pages/nosocomial/illustrate/index"
				})
				
			},
			async phone(){
				uni.makePhoneCall({
					phoneNumber: this.phonenumber //仅为示例
				});
			},
			async  getdata(){
				let userId=this.userId
				let res=await selectPersonalCenter(userId)
				if(res.code==200){
					console.log(res.data);
					this.imgUrl=res.data.avatar
					this.userName=res.data.userName
					this.amount=res.data.amount
					
				}
				
				let reg = await contactUsList()
				if(reg.code==200){
					console.log('打电话');
					this.phonenumber=reg.data[0].servicePhone
					}
			},
			Signout(){
				// uni.showModal({
				// 				content: '是否退出登录',
				// 				confirmText: '确定',
				// 				cancelText: '取消'
				// 			});
				uni.reLaunch({
					url:'/pages/nursingBed/login/login'
				})
				uni.clearStorageSync();
				wx.setStorageSync('Sign_in','lgoin')
			},
			getGoods(){
				// console.log('tiao');
				uni.navigateTo({
					url:"/pages/nosocomial/orders/index"
				})
			},
			back(){
				uni.navigateBack({
						delta:1//返回层数，2则上上页
					})
			},
			
			
			Tocenter(){
				uni.navigateTo({
					url:"/pages/nursingBed/mine/personalData"
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.navbarTitle{
		color:white;
	}
	.container{
		width: 100%;height: 100vh;position: relative;font-size: 25rpx;
		.mine{
			
			image{
				// margin-top: 400rpx;
				width: 110rpx;height: 110rpx;border-radius: 50%;margin-top: 30%;margin-left: 40rpx;
			}
			width:100%;
			height:624rpx;
			background-image:url('https://www.yp10000.com/static/img/hos/21.png');
			background-size:100% 100%;
			
			
			display: flex;
			.mine-name{
				display: flex;justify-content: space-between;line-height: 110rpx;margin-top: 30%;color: #fff;font-size: 30rpx;padding:0 40rpx 0 30rpx;width: 82%;
			}
		}
		.content{
			position: absolute;top:25%;background-color: #fff;border-radius: 30rpx;height: 80%;padding: 50rpx 30rpx;width: 100%;
			.mine-data{
				text-align: center;
				
				// background-image: linear-gradient(to right , #fff2d7,#ffe5b5,#ffe8c3);
				background:url('https://www.yp10000.com/static/img/hos/19.png');
				  background-size:100% 100%;
				  background-repeat:no-repeat;
				
				padding: 40rpx;color: #78571b;border-radius: 10rpx;
				.value{
					font-size: 40rpx;margin-bottom: 20rpx;font-weight: 700;
				}
				.text{
					font-weight: 400;
				}
			}
			.item{
				display: flex;background-color: #f6f8fa;margin-top: 30rpx;padding: 35rpx 30rpx;width: 100%;
				image{
					margin-right: 20rpx;height: 40rpx;width: 40rpx;
				}
				view{
					display: flex;line-height: 40rpx;justify-content: space-between;width: 100%;
				}
			}
		
		}
		
	}
	
</style>