<template>
  <view class="mine">
		<view class="myorder_vi_a1">
			<view class="myorder_v1_b1" :style="item.style" v-for="(item,index) in styleCss" :key="index" @click="navSwitch(index)">
				<text>{{item.title}}</text>
				<view :style="item.bgColor"></view>
			</view>
		</view>
		
		<view class="myorder_vi_a2">
			<swiper :current="dispayType" @change="changeSwiper" style="height:100%;">
				<swiper-item v-for="index in styleCss.length" :key="index" style="overflow:auto;">
					
					<view 
					:class="ix==idx?'cpon_v1_a1 cpon_v1_a2':'cpon_v1_a1'"
					v-for="(item,idx) in list" 
					:key="" 
					:style="item.status==0?'background-color:#FF7C4A':'background-color:rgba(0,0,0,0.1)'"
					@click="choose(idx)"
					>
						<view class="cpon_v1_b1">
							<text>{{item.price}}元</text>
							<view class="cpon_v1_c1">
								<view>{{item.thresholdName}}</view>
								<view style="margin-top:16rpx;">有效期：{{item.expireTime}}</view>
							</view>
						</view>
						<image src="https://images.weserv.nl/?url=https://www.yp10000.com/static/img/Used.png" class="image" v-if="item.status == 1"></image>
						<image src="https://images.weserv.nl/?url=https://www.yp10000.com/static/img/Expired.png" class="image" v-if="item.status == 2"></image>
						<view class="cpon_v1_b2" @click="rule()">使用规则></view>
					</view>
					
					<view class="cpon_s1 "  v-if="statu && ix!=-1">
							<view class="btn" @click="toback()">确定</view>
							<view >已选1张，可减{{sum}}元</view>
					</view>
					
				</swiper-item>
			</swiper>
		</view>
		
		<message ref="message"></message>
  </view>
</template>

<script>
  import { selectUserCoupon,selectMyDiscountByOpenId } from '@/api/system/user'
	import message from '@/components/popup_message.vue'
  export default {
    data() {
      return {
				list:[],
				styleCss:[
					{style:'font-weight:bold;color:black',bgColor:'background-color:#64CF59',title:'全部'},
					{style:'font-weight:400;color:rgba(0,0,0,0.4)',bgColor:'background-color:none',title:'可使用'},
					{style:'font-weight:400;color:rgba(0,0,0,0.4)',bgColor:'background-color:none',title:'已使用'},
					{style:'font-weight:400;color:rgba(0,0,0,0.4)',bgColor:'background-color:none',title:'已过期'}
				],
				dispayType:0,
				method:'',
				statu: null,
				ix:-1,
				sum:0
      }
    },
		onLoad(e) {
		   this.statu=e.price
			 let pages=getCurrentPages()
			 if(pages.length>3){
				 let prevPage = pages[ pages.length - 2 ];  //获取上个页面
				 prevPage.$vm.card=null
			 }
			 
		},
		components:{
			message
		},
		onShow(){
			this.selectMyDiscountByOpenId()
		},
    methods: {
			//获取所有优惠券
			async selectMyDiscountByOpenId(status){
				
				let data = {
					status:status
				}
				let res = await selectMyDiscountByOpenId(data);
				this.list = res.rows
				this.list.reverse()
				//0可用1使用2过期
				// console.log('优惠券', res.rows)
			},
			
			toback(){
				uni.navigateBack({  //uni.navigateTo跳转的返回，默认1为返回上一级
					delta: 1
				});
			},
			choose(idx){
				const that = this
				let pages=getCurrentPages()
				let prevPage =''
				if(pages.length>3) prevPage = pages[ pages.length - 2 ];  //获取上个页面
				if(that.ix==idx){
					 that.ix=-1
					 prevPage.$vm.card=null
				}else{
					 that.ix=idx
					 if(pages.length>3) 
					 if(!that.list[idx].status){ //状态可用
					 		// console.log(pages)
					 		if(that.list[idx].full>that.statu){//限额
					 			 that.$refs.message.setMsg('warn','满'+that.list[idx].full+'可用')
					 			 that.ix=-1
					 			 prevPage.$vm.card=null
					 		}else{
								console.log(that.list[idx].price)
								 that.sum=that.list[idx].price
					 			 prevPage.$vm.card=that.list[idx]
					 		}
					 }else{
					 	that.$refs.message.setMsg('warn','优惠券不可用')
						that.ix=-1
					 }
				}
			},
			navSwitch(index){
				for(let i in this.styleCss){
					this.styleCss[i].style = 'font-weight:400;color:rgba(0,0,0,0.4)'
					this.styleCss[i].bgColor = 'background-color:none'
					if(i == index){
						this.dispayType = i
						this.styleCss[i].style = 'font-weight:bold;color:black'
						this.styleCss[i].bgColor = 'background-color:#64CF59'
					}
				}
			},
			changeSwiper(e){
				// console.log(e.detail.current)
				if(e.detail.current == 0){
					this.selectMyDiscountByOpenId()
				}
				else if(e.detail.current == 1){
					this.selectMyDiscountByOpenId(0)
				}
				else{
					this.selectMyDiscountByOpenId(e.detail.current-1)
				}
				this.navSwitch(e.detail.current)
			},
			rule(){
				this.$modal.alert("仅限登录手机号可使用")
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
    background-color:#F6F8FA;
		
		.myorder_vi_a1{
			width:100%;
			padding:26rpx 60rpx 0rpx 60rpx;
			background-color:white;
			display:flex;
			flex-direction:row;
			align-items:center;
			justify-content:space-between;
			
			.myorder_v1_b1{
				display:flex;
				flex-direction:column;
				align-items:center;
				font-size:28rpx;
				
				view{
					margin-top:12rpx;
					width: 44rpx;
					height: 14rpx;
					border-radius: 7rpx;
				}
			}
		}
		
		.myorder_vi_a2{
			height:85vh;
			width:100%;
			padding:0rpx 30rpx;
			
			.cpon_s1{
					display: flex;
					flex-direction:row-reverse;
					align-items: center;
					width:100%;
					position: fixed;
					bottom: 0;
					padding: 10rpx;
					font-size: 26rpx;
					.btn{
						 margin-left: 20rpx;
						 font-size: 24rpx;
						 height:50rpx;
						 width:120rpx;
						 border-radius: 60rpx;
						 text-align: center;line-height: 48rpx;
						 background-color: #FF7C4A;
						 color: #F6F8FA;
					}
			}
			.cpon_v1_a2{
				 opacity: 0.5;
			}
			.cpon_v1_a1{
				margin-top:30rpx;
				padding:26rpx 30rpx;
				background-image:radial-gradient(circle at top left,#F6F8FA 15rpx,transparent 17rpx),
				radial-gradient(circle at bottom left,#F6F8FA 15rpx,transparent 17rpx),
				radial-gradient(circle at top right,#F6F8FA 15rpx,transparent 17rpx),
				radial-gradient(circle at bottom right,#F6F8FA 15rpx,transparent 17rpx);
				background-color:#FF7C4A;
				display: flex;
				flex-direction:row;
				align-items:center;
				justify-content:space-between;
				
	
				.cpon_v1_b1{
					display: flex;
					flex-direction:row;
					align-items:center;
					
					text{
						font-size:44rpx;
						color:white;
					}
					
					.cpon_v1_c1{
						padding-left:40rpx;
						margin-left:30rpx;
						border-left:1rpx dashed white;
						
						view{
							max-width:300rpx;
							font-size:26rpx;
							color:rgba(255,255,255,0.8);
						}
					}
				}
				
				.image{
					width: 114rpx;
					height:114rpx;
				}
				
				.cpon_v1_b2{
					font-size: 22rpx;
					font-weight: 400;
					color:rgba(255,255,255,0.8);
				}
			}
		}
		
  }
</style>
