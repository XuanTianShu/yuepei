<template>
  <view class="home">
		<uni-nav-bar leftText="共享陪护床" style="font-weight:bold;" :fixed="true" :statusBar="true" />
		<view class="lbt_img">
			<!-- <u-swiper
				:list="banner"
				previousMargin="20"
				nextMargin="20"
				:circular="true"
				:indicator="true"
				radius="5"
				indicatorActiveColor="rgba(0,0,0,0.08)"
				indicatorInactiveColor="rgba(0,0,0,0.04)"></u-swiper> -->
				<swiper1Vue :banner="banner"></swiper1Vue>
		</view>
		
		<view class="home_content">
			<view class="ho_v1_a1" >{{point}}</view>
			
			<view class="ho_v2_a1">
				<view class="ho_v2_b1" v-for="(item,index) in list" :key="index" @click="skip(item.url)">
					<image :src="item.img" class="image"></image>
					<text>{{item.name}}</text>
				</view>
			</view>
			
			
			<!-- <view class="ho_v3_a1" @click=" demo">test</view> -->
			<view class="ho_v3_a1" @click=" $disabledClick(scanCode)">扫码开锁</view>

			
		</view>
		
		<view v-if="carouselBottom.length>0" class="btn">
			<image v-for="i in carouselBottom" :src="i" ></image>
		</view>
		<view v-else class="home_bottom">
				<text >广告位招租</text>
		</view>
		
  </view>
</template>

<script>
	import { selectInstructionsList,insertUserLeaseOrder,selectCarouselList,ewmInLock,getPoint } from '@/api/system/user'
	import CryptoJS from 'crypto-js'
	import swiper1Vue from '@/components/swiper/swiper1.vue'
	import config from '@/config.js'
	import {toNumber} from '@/utils/dateFormart.js'
	export default {
    data() {
      return {
				noClick:true,//防止恶意点击
				banner: [
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper3.png',
				],
				carouselBottom:[],
				list:[
					{name:'帐号管理',url:'/pages/nursingBed/accountManagement/accountManagement',img:'https://images.weserv.nl/?url=https://www.yp10000.com/static/img/accountManagement.png'},
					{name:'个人中心',url:'/pages/nursingBed/mine/mine',img:'https://images.weserv.nl/?url=https://www.yp10000.com/static/img/PersonalCenter.png'},
					{name:'使用说明',url:'/pages/nursingBed/lease/instructions',img:'https://images.weserv.nl/?url=https://www.yp10000.com/static/img/UserManual.png'},
					{name:'我的病例',url:'/pages/nursingBed/mine/myCase',img:'https://images.weserv.nl/?url=https://www.yp10000.com/static/img/MyCase.png'},
					{name:'福利中心',url:'/pages/nursingBed/home/cnous',img:'https://images.weserv.nl/?url=https://www.yp10000.com/static/img/WelfareCenter.png'},
					{name:'康养知识',url:'/pages/nursingBed/mine/commonProblem?tml=2',img:'https://images.weserv.nl/?url=https://www.yp10000.com/static/img/HealthKnowledge.png'},
					{name:'医疗字典',url:'/pages/nursingBed/mine/commonProblem?tml=1',img:'https://images.weserv.nl/?url=https://www.yp10000.com/static/img/MedicalDictionary.png'},
					{name:'保险合作',url:'/pages/nursingBed/cooperation/insuranceCooperation',img:'https://images.weserv.nl/?url=https://www.yp10000.com/static/img/InsuranceCooperation.png'},
				],
				payInfo:'',
				userInfo:'',
				point:'温馨提示：感谢您对本产品的信任与支持'
			}
    },
		
		components:{
			swiper1Vue
		},
		onLoad(){
			
			this.selectCarouselList()
			this.getPoint()
			
			
				
		},
		
		methods: {
			decrypt(decodedData) {
				let key='20572F52364B3F473050415811632D2B'
				//梦远
				// if(this.sel>=0 && this.fee=='FEE7') key='20572F52364B3F473050415811632D2B'
				let keyHex = CryptoJS.enc.Hex.parse(key);
				let decrypted = CryptoJS.AES.decrypt({
					ciphertext: CryptoJS.enc.Hex.parse(decodedData)
				}, keyHex, {
						iv: [],
						mode: CryptoJS.mode.ECB,
						padding: CryptoJS.pad.NoPadding
					});
				
				return decrypted.toString(CryptoJS.enc.Hex);
			},
			//加密
			encrypt(data) {
				let key = CryptoJS.enc.Hex.parse('20572F52364B3F473050415811632D2B');
				let srcs = CryptoJS.enc.Hex.parse(data);
				const cipher = CryptoJS.AES.encrypt(srcs, key, {
						mode: CryptoJS.mode.ECB,
						padding: CryptoJS.pad.NoPadding,
				});
				
				return cipher.ciphertext.toString().toUpperCase();
			},
			demo(){
				// console.log(this.encrypt('060101012D1A683D48271A18316E471A'));
				// console.log(this.decrypt('0AD6BA4F484ADD7DA1772C8CF3EF1418'));
				
			
				let b='s'
				let a=`0${b}0000`
				console.log(a);
				// uni.getSetting({
				// 	success(res) {
				// 		console.log(res)
				// 		if (!res.authSetting['scope.userLocation']) {
				// 			 wx.authorize({
				// 			        scope: 'scope.userLocation',
				// 			        success () {
				// 			          wx.openSetting({
				// 							success(settingdata) {
				// 			          			console.log('settingdata',settingdata)
				// 			          			//用户设置定位权限
				// 			          			if (settingdata.authSetting["scope.userLocation"]) {
							          					
				// 			          			}
				// 			          		}
				// 			          	})				
				// 			        },
				// 					fail() {
				// 						this.$modal.alert('未授权')
				// 					}
				// 			      })
							
				// 		}else{
				// 			wx.openSetting({
				// 														success(settingdata) {
				// 						console.log('settingdata',settingdata)
				// 						//用户设置定位权限
				// 						if (settingdata.authSetting["scope.userLocation"]) {
												
				// 						}
				// 					}
				// 				})	
				// 		}
				// 	}
				// })
				
				// let start=new Date('2023/4/25 16:00:00')
				// let now=new Date()
				// let times=(now-start)/3600000
				// let [a,b]=JSON.parse('[{"startTime":"09:00:00","endTime":"18:00:00","time":0,"price":"1"},{"startTime":"01:15:00","endTime":"6:45:00","time":1,"price":"2"}]')//去索引
				// a=toNumber(a)
				// b=toNumber(b)
				// let sum=0
				// start=start.getHours()+start.getMinutes()/60
				// console.log(times,start,b);
				// sum=this.count(start,a,b,0,times.toFixed(2))
				// console.log(sum);
			},
			count(start,r1,r2,sum,times){
				
					let lang=r2.endTime-r2.startTime 
				
					if(r2.startTime>=r2.endTime){// 套餐第二天结束
						
						lang=24-r2.startTime+r2.endTime //套餐时长
						
						if(start>=r2.startTime){
							//套餐起步
							sum+=r2.price
							lang=lang-(start-r2.startTime)//套餐剩余时长
							if(times<=lang) return sum
							times-=lang
						 	return this.count(r2.endTime,r1,r2,sum,times)
							
						}else{
							if(start>=r2.endTime){//计时起步
							
								lang=r2.startTime-start//计时时长
								
								if(times<=lang){
									let s= Math.trunc(times)
									if(times-s>0) s++
									sum+=s*r1.price
									return sum
									
								}else{
									times-=lang
									let s= Math.trunc(lang)
									if((lang-s)>0) s++
									sum+=s*r1.price
									return this.count(r2.startTime,r1,r2,sum,times)
								}
							}else{
								sum+=r2.price
								lang=r2.endTime-start
								if(times<=lang)return sum
								return this.count(r2.endTime,r1,r2,sum,times)
							}
							
						}
					}else{
						if(start>=r2.startTime && start<=r2.endTime){//套餐期间
						
							sum+=r2.price
							lang=r2.endTime-start
							if(times<=lang) return sum
							
							times-=lang
							// 加两秒
							return this.count(r2.endTime+(2/360),r1,r2,sum,times)
							
						}else{//计时期间  
							if(start<r2.startTime) lang=r2.startTime-start
							if(start>r2.endTime) lang=24-start+r2.startTime
							if(times<=lang){
								let s= Math.trunc(times)
								if((times-s)>0) s++
								sum+=s*r1.price
								return sum
								
							}else{
								let s= Math.trunc(lang)
								if((lang-s)>0) s++
								times-=lang
								sum+=s*r1.price
								
								return this.count(r2.startTime,r1,r2,sum,times)
								
							}
						}
					}
					
			},	
			async getPoint(){
				let res=await getPoint()
				this.point=res.rows[0].serviceWarmPromptInfo
			},
			
			//获取轮播图
			async selectCarouselList(){
				let _this = this
				
				let res = await selectCarouselList()
				console.log(res)
				if(res.code == 200){
					this.banner = res.data[0].carouselTop.split(',')
					this.banner.forEach((i,index)=>{
						i=config.baseUrl+i
						this.banner[index]=i
					})
					this.carouselBottom=res.data[0].carouselBottom.split(',')
					this.carouselBottom.forEach((i,index)=>{
						i=config.baseUrl+i
						this.carouselBottom[index]=i
					})
					// console.log(this.banner)
				}
			},

			
			//扫码开锁
			scanCode(){
				let _this = this
				uni.scanCode({
					onlyFromCamera: true,
					success: function (res) {
						let deviceNumber = _this.getvl(res.result,'deviceNumber')
						if(deviceNumber==null || deviceNumber=='') deviceNumber=res.result
						// console.log(res,deviceNumber)
						_this.ewmInLock(deviceNumber)
					}
					
				})
			},
			
			async ewmInLock(deviceNumber){
				let _this = this
				let res = await ewmInLock({deviceNumber:deviceNumber})
				console.log('home device',res)
				if(!res || !res.data || parseInt(res.code)!=200) {
					_this.$modal.msgError('扫码错误')
					return
				}
				
				
				if(res.data.status && res.data.deviceTypeId<4){
					_this.$modal.msgError('该设备已被租赁')
					return
				}else{
					if(res.data.rows){
						let arr=JSON.parse(res.data.rows)
						if(arr.length==5){
								let s=true
								arr.forEach(i=>{
									if(i.status==0) s=false
								})
								if(s){
									_this.$modal.msgError('该设备已被租赁')
									return
								}
						}
					}
				}
				
				// 退出小程序时删除
				wx.removeStorageSync('ewmInLock')
				wx.setStorageSync('ewmInLock',res.data)
				// if(res.deviceDeposit==0)res.deviceDeposit=0.01;//押金
				//设备类型判断	deviceTypeId ： 2--陪护床（床头柜）	3--折叠椅  4--2折床（一拖五） 5--轮椅（一拖五）
				_this.skip('/pages/nursingBed/lease/chairLease?&deviceTypeId='+res.data.deviceTypeId )
			},
			// 对获取到的url进行正则取值
			getvl(url,name) {
				var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");
				if (reg.test(url)) return unescape(RegExp.$2.replace(/\+/g, " "));
				return "";
			},
			skip(url){
				uni.navigateTo({
					url:url
				});
			}
			
		}
  }
</script>

<style lang="less" scoped>
  .home {
    background-color:#F6F8FA;
		
		.lbt_img{
			width:100%;
			padding:20rpx 0rpx 50rpx 0rpx;
		}
		
		.home_content{
			width: 100%;
			background: #FFFFFF;
			border-radius: 60rpx 60rpx 0px 0px;
			padding:44rpx 30rpx 150rpx 30rpx;
			
			.ho_v1_a1{
				height: 74rpx;
				background: #F6F8FA;
				border-radius: 18rpx;
				padding-left:24rpx;
				line-height:74rpx;
				font-size:26rpx;
			}
			
			.ho_v2_a1{
				width:100%;
				display:flex;
				flex-direction:row;
				align-items:center;
				justify-content:space-between;
				flex-wrap:wrap;
				margin-bottom: 100rpx;
				.ho_v2_b1{
					display:flex;
					flex-direction:column;
					justify-content:center;
					align-items:center;
					margin:30rpx 30rpx;
					
					.image{
						width:80rpx;
						height:80rpx;
						margin-bottom:26rpx;
					}
					text{
						font-size:26rpx;
					}
				}
			}
			
			.ho_v3_a1{
				width: 654rpx;
				height:268rpx;
				background-image:url('https://images.weserv.nl/?url=https://www.yp10000.com/static/img/code.png');
				background-size:100% 100%;
				background-repeat:no-repeat;
				margin:0 auto;
				color:white;
				font-size: 26rpx;
				font-weight:bold;
				text-align:center;
				line-height:350rpx;
			}
		}
		
		.home_bottom{
					text-align: center;
					width: 100%;
					background: linear-gradient(to right,#ead6c4,#eff1ff,#bbd7ea);
					text{
						line-height:200rpx;
						color: #ffc515;
						font-weight: 600;
						font-size: 20px;
					}
				}
				
		.btn{
			image{
				width: 100%;
			}
		}
  }
	
	/deep/ .u-swiper{
		overflow:visible;
	}
	/deep/ .u-swiper__indicator{
		bottom:-28rpx;
	}
</style>
