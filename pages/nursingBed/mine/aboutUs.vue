<template>
  <view class="mine">
			 <u-navbar :autoBack="true" bgColor="rgba(0,0,0,0)" leftIconColor="black" :placeholder="true">
						<view  slot="center">{{title}}</view>
			</u-navbar>
			<view class="top">
				<image src="https://images.weserv.nl/?url=https://www.yp10000.com/static/img/logo.png"></image>
			</view>
			<view class="center" >
				<!-- <rich-text :nodes="content"></rich-text> -->
				{{content}}
			</view>
			<view class="pic" @click="compactList()">
				《用户协议》
			</view>
			<uni-popup ref="popup" type="bottom">
				<scroll-view class="bto" :scroll-y="true">
					<view class="content">
						<rich-text :nodes="serviceAgreementInfo"></rich-text>
					</view>
						<image src="https://images.weserv.nl/?url=https://www.yp10000.com/static/img/close.png" class="close" @click="$refs.popup.close()"></image>
				</scroll-view>
				
			</uni-popup>
  </view>
</template>

<script>
  import { aboutUsList,compactList,selectInstructionsList ,selectUserData} from '@/api/system/user'
  export default {
    data() {
      return {
				content:'',
				status:1,
				title:'',
				serviceAgreementInfo:''
			}
    },
		onLoad(option){
			if(option?.nav == 1){
				this.selectInstructionsList()
			}else{
				this.aboutUsList()
			}
		},
    methods: {
			//使用说明
			async selectInstructionsList(){
				let res = await selectInstructionsList();
				this.content = res.data[0].instructionsInfo
				
				this.status = 3
				this.statusTitle()
			},
			//关于我们
			async aboutUsList(){
				let res = await aboutUsList();
				this.content = res.data[0].aboutUsInfo
				console.log(this.content)
				this.status = 1
				this.statusTitle()
			},
			//用户协议
			async compactList(){
				let res = await compactList();
				this.serviceAgreementInfo = res.data[0].serviceAgreementInfo
				console.log(this.serviceAgreementInfo)
				this.$refs.popup.open('center')
			},
			skip(url,index){
				if(index == 1){
					uni.navigateTo({
						url:url+'?userInfo='+JSON.stringify(this.userInfo)
					});
				}else{
					uni.navigateTo({
						url:url
					});
				}
				
			},
			
			statusTitle(){
				if(this.status == 1){
					this.title = '关于我们'
				}else if(this.status == 2){
					this.title = '用户协议'
				}else{
					this.title = '使用说明'
				}
			}
    }
  }
</script>

<style lang="less" scoped>
.mine{
	background-color:#FFFFFF;
	height: 100%;
	.top{
		width:100%;
		text-align: center;
		margin:100rpx 0rpx;
		image{
			width:123rpx;
			height:102rpx;
		}
	}
	
	.center{
		color: black;
		letter-spacing: 2px;
		padding:0 50rpx;
	}
	
	.pic{
		position: absolute;
		bottom: 10%;
		width: 100%;
		text-align: center;
		color: rgba(0, 123, 255, 1.0);
	}
	.bto{
		overflow-y: auto !important;
		height: 990rpx;
		background-color: #FFFFFF;
		border-radius: 15rpx 15rpx 0 0;  
		position: relative;
		.content{
			padding:30rpx 40rpx;
			text-align: center;
		}
		.close{
			width: 40rpx;
			height: 40rpx;
			position: absolute;
			border-radius: 50%;
			right: 10rpx;top: 10rpx;
		}
	}
}
</style>
