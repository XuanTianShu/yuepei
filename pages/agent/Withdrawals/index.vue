<template>
	<view class="container" >
		<uni-nav-bar left-icon="left" :border="false" :fixed="true" statusBar @clickLeft="back"   title="提现" background-color="#64d059" color="#fff" />
		<!-- <u-navbar :autoBack="true" bgColor="rgba(0,0,0,0)" leftIconColor="white">
					<view class="navbarTitle" slot="center">提现</view>
		</u-navbar> -->
		<view class="top"></view>
		<view class="title" >
				<text class="title-top"  >{{balance.toFixed(2)}}</text>
				<text class="title-bottom" >我的资金</text>
		</view>
		
		<view  class="content" >
			
			<view class="list" >
				<view class="item" >
					提现至
				</view>
				<view class="item" style="display: flex;margin: 20rpx 0;width: 100%;">
					<view class="itemlabel" >
						￥
					</view>
					<view class="item-input" >
						<input type="text" :style="prices?'':'opacity: 0.5;'" v-model="prices" placeholder="请输入提现金额" />
					</view>
				</view>
				<view class="item" >
					<text class="text1" >可提现金额：{{price}}</text>
					<text class="text2"  @click="setP()">全部提现</text>
				</view>
				<view class="item" >
					<view class="item-bing" >
						<view class="bind-wx" >
							<image src="https://www.yp10000.com/static/img/agent/27.png" mode="" ></image>
							<view >微信</view>
						</view>
						<view class="bind-tobank"  >
							<!-- <button style="background-color: #fff;color: #6fb3eb;height: 50rpx;line-height: 50rpx;" open-type="getUserInfo" @tap="bindgetuserinfo($event)" >{{bindname}}</button> -->
							<view>{{userName}}</view>
							<uni-icons type="circle" size="20" color="#d5d5d5" @click="bingup(1)" v-if="bingbtn==0"  ></uni-icons>
							<uni-icons type="checkbox" size="20" color="#64d057"  v-if="bingbtn==1"></uni-icons>
							
						</view>
						
					</view>
					<view class="item-bing" >
						<view class="bind-wx" >
							<image src="https://www.yp10000.com/static/img/agent/26.png" mode="" ></image>
							<view >微信</view>
						</view>
						<view class="bind-tobank" >
							<view  @click="add" >{{bindname}}</view>
							<uni-icons type="circle" size="20" color="#d5d5d5"   @click="bingup(0)"  v-if="bingbtn==1"  ></uni-icons>
							<uni-icons type="checkbox" size="20" color="#64d057"  v-if="bingbtn==0"  @click="cards" v></uni-icons>
						</view>
					
					</view>
				</view>
				<view class="item" style="margin: 30rpx 0;">
					<button type="default" @click="tobind" >确认</button>
				</view>
			</view>
		</view>
		<view  class="bottom" style="padding: 0rpx 30rpx 50rpx 30rpx;">
			<view style="width: 170rpx;height: 70rpx;background-color: #fbe1ac;margin: 0 auto;text-align: center;line-height: 70rpx;border-radius: 30rpx 10rpx 30rpx 10rpx;color: #694a0b;">
				提现记录
			</view>
			<view class="hislist" style="display: flex;flex-direction: column;">
				
				<view v-if="orderlist.length>0" v-for="item in orderlist" class="" style="background-color: #fff;padding: 30rpx;border-radius: 20rpx;margin-top: 30rpx;">
					<view class="" style="display: flex;justify-content: space-between;font-weight: 500;">
						<view class="">
							<text>{{item.amount}}</text>
						</view>
						<view class="" style="color: #ed7b57;" v-if="item.status==0">
							审核中
						</view>
						<view class="" style="color: #6ec766;" v-else-if="item.status==1">
							已通过
						</view>
						<view class="" style="color: red;" v-else-if="item.status==2">
							已拒绝
						</view>
						<view class="" style="color: #6ec766;" v-else>
							已打款
						</view>
					</view>
					<view class="">
						<view class="" style="margin: 15rpx 0;">
							申请时间 <text style="margin-left: 20rpx;color: #c2c2c2;">{{item.applyTime}}</text>
						</view>
						
						<view class="">
							审核时间 <text style="margin-left: 20rpx;color: #c2c2c2;" v-if="item.handleTime==null">- -</text>
							<text style="margin-left: 20rpx;color: #c2c2c2;" v-else>{{item.handleTime}}</text>
						</view>
					</view>
				</view>
				<div v-else style="background-color: #fff;padding: 30rpx;border-radius: 20rpx;margin-top: 30rpx;text-align: center;">
					暂无提现记录
				</div>
				<!-- <view class="" style="background-color: #fff;padding: 30rpx;border-radius: 20rpx;margin-top: 30rpx;">
					<view class="" style="display: flex;justify-content: space-between;font-weight: 500;">
						<view class="">
							<text>500.00</text>
						</view>
						<view class="" style="color: #6ec766;">
							已到账
						</view>
					</view>
					
					<view class="">
						<view class="" style="margin: 15rpx 0;">
							申请时间 <text style="margin-left: 20rpx;color: #c2c2c2;">2022-10-22 12:00:00</text>
						</view>
						<view class="">
							审核时间 <text style="margin-left: 20rpx;color: #c2c2c2;">2022-10-22 12:00:00</text>
						</view>
					</view>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import {withdrawalApplication,selectPersonalData,selectBank,withdrawalRecords} from '@/api/system/agent'
	export default{
		data(){
			return{
				code:'',
				fund:0,//资金
				price:1000,//可提限额
				prices:'',//提现金额
				devicesList:[],
				userid:'',
				userName:'',
				bindname:'绑定银行卡>',
				balance:'',
				bingbtn:0,
				bankNumber:'',
				orderlist:[]
			}
		},
		
		mounted() {
			// this.getList()
			
			// console.log(this.userName,'===');
		},
		onShow() {
			this.getlist()
		},
		onLoad(val) {
			this.userName=wx.getStorageSync('userName')
			this.getlist()
		},
		methods:{
			bingup(val){
				this.bingbtn=val
			},
			setP(){
				console.log(this.balance,this.price,'this.pricethis.price');
				this.prices=this.balance>this.price?this.price:this.balance
			},
			async getlist(){
				let userId=uni.getStorageSync('userid')
				let res=await selectPersonalData(userId)
				if(res.code==200){
					this.balance=res.data.balance
				}
				let resg=await selectBank(userId)
				if(resg.code==200){
					console.log();
					if(resg.data.length==0){
						console.log('nnihgnn');
						this.bindname='绑定银行卡>'
						
					}else{
						this.bindname=resg.data[resg.data.length-1].keys+'('+resg.data[resg.data.length-1].value.substr(-4)+')'
						this.bankNumber=resg.data[resg.data.length-1].value
						console.log(this.bindname);
					}
				}
				let datas={
					userId:userId
				}
				console.log('--000');
				let reg=await withdrawalRecords(datas)
				if(reg.code==200){
					this.orderlist=reg.data
					for(let i in this.orderlist){
						
						if(this.orderlist[i].applyTime){
							let andTime = this.orderlist[i].applyTime
							let datess = new Date(andTime)
							let yy = datess.getFullYear() // 年
							let MMm = datess.getMonth() + 1 // ⽉
							MMm = MMm < 10 ? ('0' + MMm) : MMm
							let dd = datess.getDate() // ⽇
							dd = dd < 10 ? ('0' + dd) : dd
							let hh = datess.getHours() // 时
							hh = hh < 10 ? ('0' + hh) : hh
							let mm = datess.getMinutes()// 分
							mm = mm < 10 ? ('0' + mm) : mm
							let ss = datess.getSeconds()// 秒
							ss = ss < 10 ? ('0' + ss) : ss
							// let data=y+'-'+MM+'-'+d+" "+h + ':' + m + ':' + s
							this.orderlist[i].applyTime=yy+'-'+MMm+'-'+dd+" "+hh + ':' + mm + ':' + ss
						}
						if(this.orderlist[i].handleTime){
							let endTime = this.orderlist[i].handleTime
							let date = new Date(endTime)
							let y = date.getFullYear() // 年
							let MM = date.getMonth() + 1 // ⽉
							MM = MM < 10 ? ('0' + MM) : MM
							let d = date.getDate() // ⽇
							d = d < 10 ? ('0' + d) : d
							let h = date.getHours() // 时
							h = h < 10 ? ('0' + h) : h
							let m = date.getMinutes()// 分
							m = m < 10 ? ('0' + m) : m
							let s = date.getSeconds()// 秒
							s = s < 10 ? ('0' + s) : s
							this.orderlist[i].handleTime=y+'-'+MM+'-'+d+" "+h + ':' + m + ':' + s
						}
						
						
					}
				}
			},
			check(){
				if(this.prices>this.balance){
					this.$modal.alert("超出最大金额")
					this.prices=0
					return
				}
			},
			submit(){
				if(this.wxbtn==1){
					console.log(this.code);
				}else{
					console.log('银行卡');
				}
			},
	
			async tobind(){
				console.log(this.bingbtn,'bbbb');
				if(this.bingbtn==0){
					if(this.prices==''||this.prices==0){
						uni.showToast({
							title:'请输入正确的提现金额',
							icon:'none',
							duration:2000
						})
					}else if(this.bankNumber==''){
						uni.showToast({
							title:'请先绑定银行卡',
							icon:'none',
							duration:2000
						})
					}else{
						this.check()
							let userid=uni.getStorageSync('userid')
							
								let data={
									userId:userid,
									amount:this.prices,
									bankNumber:this.bankNumber
								}
								console.log(data);
						
						let res=await withdrawalApplication(data)
						if(res.code==200){
							uni.showToast({
								title:res.msg,
								icon:'success',
								duration:2000
							})
							this.prices=0
							this.getlist()
						}
					}
				}else{
				// 微信提现
				console.log('微信');
				}
			},
			bindgetuserinfo(){
				let that=this
				uni.showLoading({
					title: '加载中'
				});
				
				
				wx.getUserProfile({
					lang:'zh_CN',
					desc:'获取用户绑定账号信息',
					success:function(res){
						console.log(res.userInfo);
						uni.setStorageSync('bindname',res.userInfo.nickName)
						that.bindname=res.userInfo.nickName
						this.wxbtn=1
						setTimeout(function () {
							uni.hideLoading();
						}, 1000);
						wx.login({
							success (resg) {
							    if (resg.code) {
							      //发起网络请求
								  console.log(resg.code,'code');
								  that.code=resg.code
								  that.getuser(res.userInfo,resg.code)
							      // wx.request({
							      //   url: 'https://example.com/onLogin',
							      //   data: {
							      //     code: res.code
							      //   }
							      // })
							    } else {
							      console.log('登录失败！' + resg.errMsg)
							    }
							  }
						})
					}
				})
			},
			add(){
				uni.navigateTo({
					url:'/pages/agent/Withdrawals/add'
				})
			},
			 getdevice(deviceTypeId){
				 console.log(this.userName,this.userid,'===');
				uni.navigateTo({
					url:"/pages/nosocomial/device/details?deviceTypeId="+deviceTypeId+"&userId="+this.userid+"&userName="+this.userName
				})
				
				
			},
			
			back(){
				uni.navigateBack({
					delta: 1
				});
			}
		}
		
	}
</script>

<style lang="less" scoped>
	.container{
		height: 100vh;width: 100%;
		// background-image: linear-gradient(to bottom , #64d059,#64d059,#88da7e,#f6f8fa,#f6f8fa,#f6f8fa,#f6f8fa,#f6f8fa,#f6f8fa);
		
		.top{
			position: absolute;
			top: 0%;left:0% ;
			z-index: -1;
			width: 100%;
			height:650rpx;
			background-image: url('https://www.yp10000.com/static/img/touzi/5.png');
			background-size: 100% 100%;
			padding: 20px;
		}
		
		.title{
			width: 100%;text-align: center;display: flex;color: #fff;flex-direction: column;padding: 80rpx 0;
			.title-top{
				font-size: 40rpx;
			}
			.title-bottom{
				font-size: 30rpx;margin-top: 20rpx;
			}
		}
		.content{
			width: 100%;;padding: 0 40rpx;text-align: center;border-radius: 20rpx;padding:30rpx;
			.list{
				border-radius: 10rpx;padding: 40rpx;background-color: #fff;
				display: flex;flex-direction: column;text-align: left;
				.item{
					margin: 20rpx 0;
					.item-bing{
						display: flex;justify-content: space-between;margin: 20rpx 0;
						.bind-wx{
							display: flex;
							image{
								width: 50rpx;height: 50rpx;
							}
							view{
								margin: auto 20rpx;
							}
						}
						.bind-tobank{
							display: flex;
							view{
								margin-right: 30rpx;color: #6fb3eb;
							}
						}
					}
					
					.itemlabel{
						font-size: 60rpx;
					}
					.item-input{
						padding: 30rpx;background-color: #fff;border-bottom: 1rpx solid #d5d5d5;width: 100%;
					}
					.text1{
						color:#d5d5d5;
					}
					.text2{
						margin-left: 30rpx;color: #6fb3eb;
					}
					button{
						background-color: #64d057;color: #fff;font-size: 30rpx;
					}
				}
			}
		}
	}
	button::after { border: none }
</style>