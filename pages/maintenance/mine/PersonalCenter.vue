<template>
	<view class="container" style="">
		<u-navbar :autoBack="true" bgColor="rgba(0,0,0,0)" leftIconColor="white" >
					<view class="navbarTitle" slot="center" style="color: #fff;" >个人中心</view>
		</u-navbar>
		
		<!-- <uni-nav-bar left-icon="left" :border="false" :fixed="true" statusBar @clickLeft="back"   title="个人中心" background-color="#64d059" /> -->
		<view class="mine" style="">
			<!-- <image src="https://www.yp10000.com/static/img/yunwei/17.png" mode="" v-if="imgUrl==''" style=""></image> -->
			<image :src="imgUrl" mode="" style=""></image>
			<view class="mine-name" style=""  @tap="Tocenter">
				<text>{{userName}}</text>
				<uni-icons type="right" size="18" color="#fff" ></uni-icons>
				
			</view>
		</view>
		<view class="content" style="">
			<view class="item" style="" @click="getdevice"> 
				<image src="https://www.yp10000.com/static/img/yunwei/14.png" mode=""  style=""></image>
				<view class="" style="" >
					<view>设备故障</view>
					<uni-icons type="right" size="15" color="#d3d5d7"></uni-icons>
				</view>
			</view>
			<view class="item" style="" @click="getcode">
				<image src="https://www.yp10000.com/static/img/yunwei/17.png" mode="" style=""></image>
				<view class="" style="">
					<view>测试设备流程</view>
					<uni-icons type="right" size="15" color="#d3d5d7"></uni-icons>
				</view>
			</view>
			<view class="item" style=""  @click="phone">
				<image src="https://www.yp10000.com/static/img/yunwei/18.png" mode="" style=""></image>
				<view class="" style="">
					<view>客服热线</view>
					<text style="color:#d3d5d7;">{{phonenumber}}</text>
				</view>
			</view>
			<view class="item" style="" @click="operational">
				<image src="https://www.yp10000.com/static/img/yunwei/15.png" mode="" style=""></image>
				<view class="" style="">
					<view>操作日志</view>
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
	import {selectPersonalData} from '@/api/system/agent'
	import {testDevice,unlocking} from '@/api/system/maintenance.js'
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
		onLoad() {
			this.userId=uni.getStorageSync('userid')
			console.log(this.userId);
			this.getdata()
		},
		methods:{
			getcode(){
				let that=this
				uni.scanCode({
						success: function (res) {
							console.log('---：' + res);
							console.log('条码类型：' + res.scanType);
							console.log('条码内容：' + res.result);
							var str = res.result;
							 console.log(str.split("=")[1]);
							let number=str.split("=")[1]
							that.getlist(number)
							// uni.navigateTo({
							// 	url:'processes?deviceNumber='+number
							// })
						}
				})
			},
			async getlist(number){
				let data={
					deviceNumber:number
				}
				let res=await testDevice(data)
				if(res.code==200){
					let list=JSON.stringify(res.data)
					uni.navigateTo({
						url:'processes?list='+list
					})
					console.log(list);
					// this.deviceNumber=res.data.deviceNumber
					// this.deviceTypeName=res.data.deviceTypeName
					// this.hospitalName=res.data.hospitalName
					// this.deviceAddress=res.data.deviceAddress
					// this.list=JSON.parse(res.data.rows)
					// console.log(this.list);
				}
				if(res.code==500){
					uni.showToast({
							title: res.msg,
							icon:'none',
							duration: 2000,
						});
				}
				
			},
			operational(){
				uni.navigateTo({
					url:"operational"
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
			getdevice(){
				// console.log('tiao');
				uni.navigateTo({
					url:"/pages/maintenance/device/index"
				})
			},
			back(){
				uni.navigateBack({
						delta:1//返回层数，2则上上页
					})
			},
			
			
			// Tocenter(){
				
				
			// 	uni.navigateTo({
			// 		url:"/pages/maintenance/mine/PersonalData?imgUrl="+this.imgUrl+'&userName='+this.userName
			// 		// +'&phonenumber='+this.phonenumber
			// 	})
			// }
			Tocenter(){
				uni.navigateTo({
					url:"/pages/nursingBed/mine/personalData"
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.container{
		width: 100%;height: 100vh;position: relative;font-size: 25rpx;
		.mine{
			width:100%;
			height:424rpx;
			background-image:url('https://www.yp10000.com/static/img/hos/21.png');
			background-size:100% 100%;
			image{
				width: 110rpx;height: 110rpx;border-radius: 50%;margin-top: 30%;margin-left: 40rpx;
			}
			display: flex;
			.mine-name{
				display: flex;justify-content: space-between;line-height: 110rpx;margin-top: 30%;color: #fff;font-size: 30rpx;padding:0 40rpx 0 30rpx;width: 82%;
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