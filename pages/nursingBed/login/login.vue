<template>
  <view class="login">
		
		<uni-nav-bar title="登录" :fixed="true" :statusBar="true" />
		
		<view v-if="Sign_in">
			<view class="image">
				<image src="https://images.weserv.nl/?url=https://www.yp10000.com/static/img/logo.png"></image>
			</view>
			<view class="account" :style="selectCss1">
				<text :style="selectCssText1">账号</text>
				<input type="text" v-model="user" placeholder="请输入账号" @focus="selectFocus1" @blur="selectFocus1" />
			</view>
			
			<view class="password" :style="selectCss2">
				<text :style="selectCssText2">密码</text>
				<input  type="text" :password='eye' v-model="pass" placeholder="请输入密码" @focus="selectFocus2" @blur="selectFocus2"   />
				<view @click="eye=!eye" class="eye">
					<uni-icons  type="eye-filled"></uni-icons>
				</view>
          </view>
			
			<view class="bala_v5_a1">
				<view  @click="read=!read" class="bala_v5_b1">
					<view v-if="read"></view>
				</view>
				<text class="bala_v5_c1">我以阅读并同意<text @click="compactList">《用户协议》及《隐私政策》</text></text>
			</view>
			
			<view class="submitLogin" @click="logins()">登录</view>
		</view>
		
		<view class="wxLogin">
			
			<view class="wexinLogin">
				<view class="wxImage" @click="getUser()">
					<uni-icons type="weixin" color="white" size="30" />
				</view>
				<text>微信登录</text>
			</view>
			
			<view v-if="!Sign_in">
				<view class="bala_v5_a1">
					<view  @click="read=!read" class="bala_v5_b1">
						<view v-if="read"></view>
					</view>
					<text class="bala_v5_c1">我以阅读并同意<text @click="compactList">《用户协议》及《隐私政策》</text></text>
				</view>
				<!-- <view class="submitLogin" @click="getUser()">登录</view> -->
			</view>
			
		</view>
		
		
		<uni-popup ref="popup" type="bottom">
			<scroll-view class="bto" :scroll-y="true">
				<view class="content">
					<rich-text :nodes="serviceAgreementInfo"></rich-text>
					<button class="mini-btn" type="primary" size="mini" @click="$refs.popup.close()">确认</button>
					<button class="mini-btn" type="default" size="mini" @click="$refs.popup.close()">返回</button>
				</view>
				<image src="https://images.weserv.nl/?url=https://www.yp10000.com/static/img/close.png" class="close" @click="$refs.popup.close()"></image>
			</scroll-view>
			
		</uni-popup>
  </view>
</template>

<script>
  import { login } from '@/api/login'
  import { setToken } from '@/utils/auth'
  import {   loginHospitalPort,APPLogin } from '@/api/system/hospital'
  import { compactList} from '@/api/system/user'
  import config from '@/config'
  export default {
    data() {
      return {
				code:'',
				selectCss1:'',
				selectCss2:'',
				selectCssText1:'',
				selectCssText2:'',
				user:'',
				pass:'',
				serviceAgreementInfo:'',
				Sign_in:false,
				// 
				userInfo: {},
				hasUserInfo: false,
				canIUseGetUserProfile: false,
				read:true,
  				eye:true
			}
    },
		onLoad(){
			let type=uni.getStorageSync('userType');
			switch(type){
				  case '03':
				  uni.reLaunch({
				   url:"/pages/investor/home/home"
				  })
				  console.log('投资人端');
				  break;
			      case '04':
			       uni.reLaunch({
			        url:"/pages/nosocomial/Home/index"
			       })
			       console.log('医院端');
			       break;
			      case '05':
			       uni.reLaunch({
			        url:"/pages/agent/home/index"
			       })
			       console.log('代理端');
			       break;
			      case '06':
			       uni.reLaunch({
			        url:"/pages/maintenance/home/index"
			       })
			       console.log('运维端');
			       break;
			       default:
			       
			      }
	
			if(wx.getStorageSync('Sign_in')) this.Sign_in=true
		
		},
    methods: {
		
		
		sure(){
			this.$refs.popup.close()
		},
		
		async compactList(){
			if(!this.serviceAgreementInfo){
				let res = await compactList();
				if(res && res.data[0].serviceAgreementInfo){
					this.serviceAgreementInfo = res.data[0].serviceAgreementInfo
					// console.log(this.serviceAgreementInfo)
					this.$refs.popup.open('center')
				}else{
					this.$modal.msgError("查询失败")
				}
			}else{
				this.$refs.popup.open('center')
			}
				
		},
		async logins(){
			let _this = this
			
			
			if(_this.user==''||_this.pass==''){
				this.$modal.msgError("请输入账号和密码")
			}else{
				let data={
					userName:_this.user,
					password:_this.pass
				}
				let res = await loginHospitalPort(data)
				console.log('哈哈哈');
				console.log(res,'----',res.code);
				console.log('hahahjinlai');
				
				if(res.code===200){
					console.log('是200么');
					uni.setStorageSync('userName', res.data.userName);
					uni.setStorageSync('userid', res.data.userId);
					uni.setStorageSync('userlist', res.data);
					uni.setStorageSync('App-Token', res.token);
					uni.setStorageSync('userType', res.data.userType);
					// return false
					switch(res.data.userType){
						  case '03':
						  uni.reLaunch({
						   url:"/pages/investor/home/home"
						  })
						  console.log('投资人端');
						  break;
					      case '04':
					       uni.reLaunch({
					        url:"/pages/nosocomial/Home/index"
					       })
					       console.log('医院端');
					       break;
					      case '05':
					       uni.reLaunch({
					        url:"/pages/agent/home/index"
					       })
					       console.log('代理端');
					       break;
					      case '06':
					       uni.reLaunch({
					        url:"/pages/maintenance/home/index"
					       })
					       console.log('运维端');
					       break;
					       default:
					       console.log('其他端');
					      }
					
					uni.showToast({
						title: res.msg,
						icon: 'success',    //将值设置为 success 或者 ''
						duration: 1000    //持续时间为 2秒
					})
					// this.buttonIsShow = uni.getStorageSync('buttonIsShow')
				}
				else{
					console.log('500啊');
					uni.showToast({
						title: res.msg,
						icon: 'none',    //将值设置为 success 或者 ''
						duration: 1000    //持续时间为 2秒
					})
					_this.user=''
					_this.pass=''
				}
				
			}
			
			
		},
		login(data){
				let _this = this
				
				uni.login({
					provider: 'weixin',
				  success:async function (res) {
						
						wx.setStorageSync('Sign_in','lgoin')
						_this.code = res.code
						
						let r = await login(_this.code,data)
						
						if(r.code == 200){
							setToken(r.token)
							_this.$tab.reLaunch("/pages/nursingBed/home/home")
						}
				  }
				})
			},
			
		getUser(){
				let _this = this
				
				uni.getUserProfile({
					desc:'获取用户头像和昵称',
				  success: function(resData) {
						let data = {
							avatar:resData.userInfo.avatarUrl,
							nickName:resData.userInfo.nickName,
							sex:resData.userInfo.gender
						}
						
						_this.login(data)
					
						
				  }
				})
			},
			
			//输入框焦点
			selectFocus1(e){
				
				
				if(e.type == 'focus'){
					this.selectCss1 = 'border: 1rpx solid #5EDB51'
					this.selectCssText1 = 'color:#5EDB51'
				}else{
					this.selectCss1 = 'border: 1rpx solid rgba(0,0,0,0.28)'
					this.selectCssText1 = 'color:rgba(0,0,0,0.28)'
				}
			},
			selectFocus2(e){
				
				if(e.type == 'focus'){
					this.selectCss2 = 'border: 1rpx solid #5EDB51'
					this.selectCssText2 = 'color:#5EDB51'
				}else{
					this.selectCss2 = 'border: 1rpx solid rgba(0,0,0,0.28)'
					this.selectCssText2 = 'color:rgba(0,0,0,0.28)'
				}
			}
			
			
			
		}
  }
</script>

<style lang="less" scoped>
  .login {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-color:#FFFFFF;
	padding:0rpx 30rpx;
		
		.wxLogin{
			width: 100%;
			// position: fixed;
			// top: 45%;
			padding-top: 50%;
			margin: 0 auto;
		}
		
		.bto{
			overflow-y: auto !important;
			height: 990rpx;
			background-color: #FFFFFF;
			border-radius: 15rpx 15rpx 0 0;  
			position: relative;
			z-index: 999;
			.content{
				padding:30rpx 40rpx;
				text-align: center;
				
				button{
					margin-left: 20rpx;
				}
			}
			.close{
				width: 40rpx;
				height: 40rpx;
				position: absolute;
				border-radius: 50%;
				right: 10rpx;top: 10rpx;
			}
		}
		.image{
			width:100%;
			text-align: center;
			margin:100rpx 0rpx;
			
			image{
				width:123rpx;
				height:102rpx;
			}
		}
		
		.account{
			width: 100%;
			height: 92rpx;
			border-radius: 10rpx;
			border: 1rpx solid rgba(0,0,0,0.28);
			margin-top:100rpx;
			display:flex;
			flex-direction: row;
			align-items:center;
			font-size:28rpx;
			
			text{
				font-weight: bold;
				color: rgba(0,0,0,0.28);
				margin:0rpx 48rpx;
			}
			
			input{
				height:100%;
				width:70%;
			}
		}
		
		.password{
			width: 100%;
			height: 92rpx;
			border-radius: 10rpx;
			border: 1rpx solid rgba(0,0,0,0.28);
			margin-top:40rpx;
			display:flex;
			flex-direction: row;
			align-items:center;
			font-size:28rpx;
			position: relative;
			.eye{
				position: absolute;
				right: 10rpx;
				z-index: 999;
				height: 100%;width: 60rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			
			text{
				font-weight: bold;
				color:rgba(0,0,0,0.28);
				margin:0rpx 48rpx;
			}
			
			input{
				height:100%;
				width:70%;
			}
		}
		
		.bala_v5_a1{
			display:flex;
			flex-direction:row;
			align-items:center;
			justify-content:center;
			margin-top:50rpx;
			
			.bala_v5_b1{
				width: 32rpx;
				height: 32rpx;
				border: 1rpx solid #64CF59;
				border-radius:50%;
				margin-right:16rpx;
				display:flex;
				flex-direction:row;
				align-items:center;
				justify-content:center;
				
				view{
					width: 20rpx;
					height: 20rpx;
					background: #64CF59;
					border-radius:50%;
				}
			}
			
			.bala_v5_c1{
				font-size: 24rpx;
				font-weight: 400;
				color:rgba(0,0,0,0.6);
				
				text{
					color:#009BFF;
				}
			}
		}
		
		.submitLogin{
			width: 626rpx;
			height: 88rpx;
			background:#64CF59;
			border-radius: 16rpx;
			text-align:center;
			line-height:88rpx;
			color:white;
			font-weight: 500;
			font-size: 28rpx;
			margin:100rpx auto;
		}
		
		.wexinLogin{
			width:100%;
			display:flex;
			flex-direction:column;
			align-items:center;
			justify-content:center;
			
			.wxImage{
				width: 80rpx;
				height: 80rpx;
				background: #28C445;
				margin-bottom:24rpx;
				border-radius:50%;
				text-align:center;
				line-height:80rpx;
				position:relative;
				z-index:99;
			
			}
			text{
				font-size: 26rpx;
				color:rgba(0,0,0,0.3);
			}
		}
		
  }
</style>
