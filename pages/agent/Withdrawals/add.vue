<template>
	<view class="" style="width: 100%;">
		
		<view class="" style="display: flex;flex-direction: column;padding-top: 70rpx;font-weight: 500;background-color: #fff;">
			<view class="" style="text-align: center;font-weight: 600;padding-bottom: 20rpx;">
				请绑定持卡人本人的银行卡
			</view>
			<view class="" style="display: flex;border-bottom: 1rpx solid #e8e8e8;padding: 40rpx;">
				<view class="" style="width: 23%;">
					持卡人
				</view>
				<input type="text" v-model="accountHolder" placeholder="输入持卡人本人的银行卡">
			</view>
			
			
			
			
			<view class="" style="display: flex;border-bottom: 1rpx solid #e8e8e8;padding: 40rpx;">
				<view class="" style="width: 23%;">
					银行名
				</view>
				<input type="text" v-model="bankName" placeholder="输入银行名字">
			</view>
			<view class="" style="display: flex;border-bottom: 1rpx solid #e8e8e8;padding: 40rpx;">
				<view class="" style="width: 23%;">
					开户行
				</view>
				<input type="text"  v-model="bankDetailName" placeholder="输入开户行名字">
			</view>
			<view class="" style="display: flex;border-bottom: 1rpx solid #e8e8e8;padding: 40rpx;">
				<view class="" style="width: 23%;">
					银行卡号
				</view>
				<input type="text" v-model="bankNumber" placeholder="输入银行卡号">
			</view>
		</view>
		<view class="item" style="margin: 30rpx 40rpx;margin-top: 200rpx;">
			<button type="default" @click="submitbank" style="background-color: #64d057;color: #fff;">绑定</button>
		</view>
	</view>
</template>

<script>
	import {weChatWithdrawa,selectPersonalData,bindingBank} from '@/api/system/agent'
	export default{
		data(){
			return{
				accountHolder:'',
				bankName:'',
				bankDetailName:'',
				bankNumber:'',
			}
		},
		
		mounted() {
			// this.getList()
			
			// console.log(this.userName,'===');
		},
		onLoad(val) {
			this.fund=parseFloat(val.fund)||0
			console.log('资金',val.fund);
			this.userName=wx.getStorageSync('userName')
			this.getlist()
			// let name=uni.getStorageSync('bindname')
			// console.log(name);
			// if(!name){
			// 	console.log('还没绑定');
			// }else{
			// 	this.bindname=name
			// 	// this.wxbtn=1
			// 	console.log('已绑定：',name);
			// }
		},
		methods:{
	
			async submitbank(){
				// this.bankName
				// this.bankDetailName
				// this.bankNumberthis
				console.log(this.accountHolder,this.bankName,this.bankDetailName,this.bankNumber);
				if(this.accountHolder==''||this.bankName==''||this.bankDetailName==''||this.bankNumber==''){
					uni.showToast({
						title:'请输入完整的银行卡信息',
						icon:'none',
						duration:2000
					})
				}else{
					let userid=uni.getStorageSync('userid')
					let data={
						accountHolder:this.accountHolder,
						bankName:this.bankName,
						bankDetailName:this.bankDetailName,
						bankNumber:this.bankNumber,
						userId:userid
					}
					console.log(data);
					// return false
					let res=await bindingBank(data)
					if(res.data.code==200){
						uni.showToast({
							title:res.data.msg,
							icon:'none',
							duration:2000
						})
					uni.setStorageSync('bankName',this.accountHolder)
					setTimeout(() => {
					uni.navigateBack({
						delta: 1
					});
					}, 2000)
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:'none',
							duration:2000
						})
					
					}
					
				}
					
			},
			
		}
		
	}
</script>

<style>
</style>