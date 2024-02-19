<template>
  <view class="mine">
		 <u-navbar :autoBack="true" bgColor="rgba(0,0,0,0)" leftIconColor="white">
			<view class="navbarTitle" slot="center">个人中心</view>
		 </u-navbar>
		
		<view class="personal_view1">
			<view class="personal_vi_a1" @click="skip('/pages/nursingBed/mine/personalData?userInfo='+JSON.stringify(userInfo))">
				
				<view class="personal_vi_b1">
					<image :src="userInfo.avatar" class="image"></image>
					<view class="personal_vi_c1">
						<view class="personal_vi_d1">{{userInfo.nickName}} <text></text> </view>
						<view class="personal_vi_d2">{{userInfo.phoneNumber}}</view>
					</view>
				</view>
				<uni-icons  type="forward" size="20" color="white" />
			</view>
		</view>
		
		
		<view class="personal_view2">
				<view class="m1" @click="skip('/pages/agent/Withdrawals/index?fund='+fund)">
						<view class="m1_a">{{fund.toFixed(2)||0}}</view>
						<view >我的资金</view>
				</view>
				
				<view class="m2">
						<view class="m2_a" v-for="(item,index) in list" :key="index" >
								<view class="m2_a_b"  @click="skip(item.url)">
									<image class="image" :src="item.icon" ></image>
									<text>{{item.title}}</text>
								</view>
						</view>
						<view class="m2_a">
							<view class="m2_a_b" @click="signout()">
								<image src="https://images.weserv.nl/?url=https://www.yp10000.com/static/img/home/out.png" class="image" style="border-radius: 50rpx;"></image>
								<text>退出登录</text>
							</view>
						</view>
				</view>
				
		</view>
		
		<view class="bto">
				<view @click="phone" class="onLine">
						客服热线:{{servicePhone}}
				</view>
		</view>
		
  </view>
</template>

<script>
  import { contactUsList,getUserProfile ,investorPersonalCenter} from '@/api/system/user'
  export default {
    data() {
      return {
				percent:30,
				list:[
					{
						title:'订单记录',
						icon:'https://www.yp10000.com/static/img/touzi/3.png',
						url:'/pages/nursingBed/lease/leaseOrder?investor=true'
					},{
						title:'添加子账户',
						icon:'https://www.yp10000.com/static/img/touzi/12.png',
						url:'/pages/agent/account/openSubaccounts?from=1'
					},{
						title:'子账户列表',
						icon:'https://www.yp10000.com/static/img/touzi/13.png',
						url:'/pages/agent/account/SubaccountsList'
					},{
						title:'拍照上传',
						icon:'https://www.yp10000.com/static/img/touzi/14.png',
						url:'/pages/agent/photograph/upload'
					},
					{
						title:'文档列表',
						icon:'https://www.yp10000.com/static/img/touzi/15.png',
						url:'/pages/agent/photograph/Replacebattery',
					},
					{
						title:'使用说明',
						icon:'https://www.yp10000.com/static/img/touzi/16.png',
						url:'/pages/nursingBed/lease/instructions'
					},
				],
				
				userInfo:{},
				servicePhone:'',
				fund:0
      }
    },
		onShow(){
			this.getUserProfile()
			this.contactUsList()
			this.investorPersonalCenter()
		},
    methods: {
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
							wx.setStorageSync('Sign_in','lgoin')
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
			},
			out(url){
				uni.reLaunch({
					url:url
				})
			},
			//个人信息
			async getUserProfile(){
				let res = await getUserProfile();
				this.userInfo = res.data
				uni.setStorageSync('userName', this.userInfo.nickName);
				console.log('user',this.userInfo)
				this.$forceUpdate()
			},
			//客服电话
			async contactUsList(){
				let res = await contactUsList();
				this.servicePhone = res.data[0].servicePhone
			},
			async investorPersonalCenter(){
				let res = await investorPersonalCenter();
				this.fund=res.data.amount
			},
			
		
			skip(url){
				console.log('url',url)
				uni.navigateTo({
					url:url
				});
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
    width: 100%;height: 100%;
    z-index: 1;
    background-color:#FFF;
		
		.bto{
			width: 100%;
			position: absolute;
			bottom: 4%;
			.onLine{
				opacity: 0.5;
				width: 90%;
				height: 80rpx;
				border-radius: 10rpx;
				text-align: center;
				line-height: 80rpx;
				font-weight: bold;
				margin: 0 auto;
				box-shadow: 0 0 15rpx rgba(131, 131, 131, 0.3); 
			}
		}
		
		.personal_view2{
			width:100%;
			background-color:white;
			border-radius:40rpx 40rpx 0rpx 0rpx;
			position:relative;
			top:-210rpx;
			padding-top: 45rpx;
			
			.m2{
				display: flex;
				flex-wrap: wrap;
				margin-top: 20rpx;
				.m2_a{
					width: 25%;
					display: flex;
					justify-content: center;
					padding: 20rpx 0;
					.m2_a_b{
						display: flex;
						justify-content: center;
						flex-wrap: wrap;
						.image{
							width: 100rpx;height: 100rpx;
							margin-bottom: 15rpx;
						}
					}
					
				}
			}
			
			.m1{
				width: 90%;
				margin: 0 auto;
				padding: 40rpx;
				border-radius: 15rpx;
				// background-image: linear-gradient(to right, rgba(255, 207, 124, 0.5) ,rgba(255, 227, 156, 0.5));
				background-image: url('https://www.yp10000.com/static/img/touzi/6.png');
				background-size: 100% 100%;
				align-items: center;
				display: flex;
				flex-flow: column;
				justify-content: center;
				color: rgba(132, 107, 64, 1.0);
				view{
					width: 100%;
					text-align: center;
				}
				.m1_a{
					font-size: 40rpx;
					font-weight: bold;
					margin-bottom: 20rpx;
				}
			}
		}
		
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
		
		
  }
</style>
