<template>
	<view class="container" style="">
		<uni-nav-bar left-icon="left" :border="false" :fixed="true" statusBar @clickLeft="back"   title="个人中心" background-color="#64d059" />
		<view class="mine" style="">
			<image :src="imgUrl" mode="" style=""></image>
			<view class="mine-name" style=""  @tap="Tocenter">
				<text>{{userName}}</text>
				<uni-icons type="right" size="18" color="#fff" ></uni-icons>
				
			</view>
		</view>
		<view class="content" style="">
			<view class="mine-data" style="">
				<view class="value" style="">
					{{amount}}
				</view>
				<view class="text" style="">
					我的资金
				</view>
			</view>
			<view class="item" style="" @click="getGoods"> 
				<image src="https://images.weserv.nl/?url=https://www.yp10000.com/static/img/dingdan.png" mode=""  style=""></image>
				<view class="" style="" >
					<view>订单记录</view>
					<uni-icons type="right" size="15" color="#d3d5d7"></uni-icons>
				</view>
			</view>
			<view class="item" style=""  @click="phone">
				<image src="https://images.weserv.nl/?url=https://www.yp10000.com/static/img/dianhua.png" mode="" style=""></image>
				<view class="" style="">
					<view>客服热线</view>
					<text style="color:#d3d5d7;">{{phonenumber}}</text>
				</view>
			</view>
			<view class="item" style="">
				<image src="https://images.weserv.nl/?url=https://www.yp10000.com/static/img/kaoheshuoming.png" mode="" style=""></image>
				<view class="" style="">
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
	import {selectPersonalCenter,contactUsList} from '@/api/system/hospital'
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
		onLoad() {
			this.userId=uni.getStorageSync('userid')
			this.getdata()
		},
		methods:{
			async phone(){
				uni.makePhoneCall({
					phoneNumber: this.phonenumber //仅为示例
				});
			},
			async  getdata(){
				let userId=this.userId
				let res=await selectPersonalCenter(userId)
				if(res.code==200){
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
					url:"/pages/nosocomial/mine/PersonalData/index"
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.container{
		width: 100%;height: 100vh;position: relative;font-size: 25rpx;
		.mine{
			image{
				width: 110rpx;height: 110rpx;border-radius: 50%;margin-top: 10%;margin-left: 40rpx;
			}
			background-image: linear-gradient(to bottom , #64d059,#88da7e);height: 23%;width: 100%;display: flex;
			.mine-name{
				display: flex;justify-content: space-between;line-height: 110rpx;margin-top: 10%;color: #fff;font-size: 30rpx;padding:0 40rpx 0 30rpx;width: 82%;
			}
		}
		.content{
			position: absolute;top:25%;background-color: #fff;border-radius: 30rpx;height: 80%;padding: 50rpx 30rpx;width: 100%;
			.mine-data{
				text-align: center;background-image: linear-gradient(to right , #fff2d7,#ffe5b5,#ffe8c3);padding: 40rpx;color: #78571b;border-radius: 10rpx;
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