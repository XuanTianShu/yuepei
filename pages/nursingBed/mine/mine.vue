<template>
  <view class="mine">
		 <u-navbar :autoBack="true" bgColor="rgba(0,0,0,0)" leftIconColor="white">
			<view class="navbarTitle" slot="center">个人中心</view>
		 </u-navbar>
		
		<view class="personal_view1">
			<view class="personal_vi_a1" @click="skip('/pages/nursingBed/mine/personalData?userInfo='+JSON.stringify(userInfo))">
				<!-- <view class="image">
					<view></view>
					<text>未登录</text>
				</view> -->
				<view class="personal_vi_b1">
					<image :src="userInfo.avatar" class="image"></image>
					<!-- <view class="image"></view> -->
					<view class="personal_vi_c1">
						<!-- <view class="personal_vi_d1">{{userInfo.nickName}} <text>广东深圳</text> </view> -->
						<view class="personal_vi_d1">{{userInfo.nickName}} <text></text> </view>
						<view class="personal_vi_d2">{{userInfo.phoneNumber}}</view>
					</view>
				</view>
				<uni-icons type="forward" size="20" color="white" />
			</view>
		</view>
		<view class="personal_view2">
			<view class="personal_vi_a3" v-for="(item,index) in navList" :key="index" @click="skip(item.url,index)">
				<view class="image">
					<image :src="item.image"></image>
					<text>{{item.text}}</text>
				</view>
				<view class="vi_right">
					<text v-if="index == 4" @click="phone()">{{servicePhone}}</text>
					<uni-icons type="forward" size="20" color="silver" />
				</view>
			</view>
			<view class="out" @click="out('/pages/nursingBed/login/login')">
				<view>退出></view>
			</view>
		</view>
		
  </view>
</template>

<script>
  import { contactUsList,getUserProfile } from '@/api/system/user'
  // import {REQUEST_BASE_URL} from '@/config'
  // import {} from '@/api';
	
	
  export default {
    data() {
      return {
				percent:30,
				navList:[
					{text:'基本信息',url:'/pages/nursingBed/mine/personalData',image:'https://images.weserv.nl/?url=https://www.yp10000.com/static/img/information.png'},
					{text:'我的订单',url:'/pages/nursingBed/lease/leaseOrder',image:'https://images.weserv.nl/?url=https://www.yp10000.com/static/img/order.png'},
					{text:'合作加盟',url:'/pages/nursingBed/cooperation/cooperativeFranchise',image:'https://images.weserv.nl/?url=https://www.yp10000.com/static/img/cooperation.png'},
					{text:'关于我们',url:'/pages/nursingBed/mine/aboutUs',image:'https://images.weserv.nl/?url=https://www.yp10000.com/static/img/news.png'},
					{text:'联系客服',url:'/',image:'https://images.weserv.nl/?url=https://www.yp10000.com/static/img/customerService.png'},
					{text:'常见问题',url:'/pages/nursingBed/mine/commonProblem',image:'https://images.weserv.nl/?url=https://www.yp10000.com/static/img/feedback.png'},
					{text:'故障反馈',url:'/pages/nursingBed/mine/faultFeedback',image:'https://images.weserv.nl/?url=https://www.yp10000.com/static/img/setUp.png'},
				],
				userInfo:{},
				servicePhone:''
      }
    },
		onShow(){
			this.getUserProfile()
			this.contactUsList()
		},
    methods: {
			out(url){
				// wx.clearStorage()
				uni.reLaunch({
					url:url
				})
			},
			//个人信息
			async getUserProfile(){
				let res = await getUserProfile();
				this.userInfo = res.data
				// console.log('user',this.userInfo)
				this.$forceUpdate()
			},
			//客服电话
			async contactUsList(){
				let res = await contactUsList();
				this.servicePhone = res.data[0].servicePhone
			},
			navigateBack(){
				uni.navigateBack()
			},
			skip(url,index){
				if(index == 0){
					uni.navigateTo({
						url:url+'?userInfo='+JSON.stringify(this.userInfo)
					});
				}else{
					uni.navigateTo({
						url:url
					});
				}
				
			},
			phone(){
				wx.makePhoneCall({
				  phoneNumber: this.servicePhone
				})
			}
    }
  }
</script>

<style lang="less" scoped>
  .mine {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-color:white;
		
		.navbarTitle{
			color:white;
		}
		
		.personal_view1{
			width:100%;
			height:624rpx;
			background-image:url('https://images.weserv.nl/?url=https://www.yp10000.com/static/img/mineImg.png');
			background-size:100% 100%;
			display: flex;
			flex-direction:column;
			// align-items:center;
			
			.personal_vi_a1{
				width:690rpx;
				height:400rpx;
				font-size:30rpx;
				color:white;
				display:flex;
				flex-direction:row;
				justify-content:space-between;
				align-items:center;
				margin-top:75rpx;
				
				.personal_vi_b1{
					display:flex;
					flex-direction:row;
					align-items:center;
					
					.image{
						width:130rpx;
						height:130rpx;
						// background-color:paleturquoise;
						border-radius:50%;
						margin-right: 40rpx;
						margin-left:20rpx;
					}
					
					.personal_vi_c1{
						display:flex;
						flex-direction:column;
						
						.personal_vi_d1{
							font-size:36rpx;
							color:white;
							font-weight:bold;
							
							text{
								margin-left:10rpx;
								font-size:24rpx;
								font-weight:400;
							}
						}
						
						.personal_vi_d2{
							margin-top:24rpx;
							font-size:28rpx;
							color:white;
						}
					}
				}
			}
		}
		
		.personal_view2{
			width:100%;
			background-color:white;
			border-radius:40rpx 40rpx 0rpx 0rpx;
			position:relative;
			top:-210rpx;
			padding-top:20rpx;
			// padding-bottom:50rpx;
			
		  .out{
				width:640rpx;
				border-bottom:unset !important;
				display: flex;
				flex-direction: row-reverse !important;
				flex-wrap: wrap-reverse;
				margin-left:60rpx;
				padding: 60rpx 0 30rpx 0;
				color:rgba(0,0,0,0.39);
				view{
					border-bottom: 1rpx rgba(0,0,0,0.39) dotted ;
					}
			
			}
			.personal_vi_a3{
				width:640rpx;
				height:125rpx;
				margin-left:60rpx;
				display:flex;
				flex-direction:row;
				align-items:center;
				justify-content:space-between;
				border-bottom:1rpx solid #EEEEEE;
				
				.image{
					display:flex;
					flex-direction:row;
					align-items:center;
					
					image{
						width:60rpx;
						height:60rpx;
						margin-right:30rpx;
					}
					
					text{
						font-size:30rpx;
						font-weight:bold;
					}
				}
				
				.vi_right text{
						font-size:30rpx;
						margin-right:15rpx;
						color:rgba(0,0,0,0.39);
				}
			}
		}
  }
</style>
