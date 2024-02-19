<template>
	<view class="container" style="">
		<view class="form">
			<view class="form-item" style="">
				<view class="label"  style="">
					用户名 
				</view>
				<view class="input" style="">
					<input type="text" v-model="userName" placeholder-style="color:#f5f5f5;" placeholder="请输入内容" />
					
				</view>
			</view>
			<view class="form-item" style="">
				<view class="label" style="">
					密码 
				</view>
				<view class="input" style="">
					<input type="text" v-model="password" placeholder-style="color:#f5f5f5;" placeholder="请输入内容" />
				</view>
				
			</view>
			<view class="form-item" style="">
				<view class="label" style="">
					手机号 
				</view>
				<view class="input" style="">
					<input @blur="checkPhone" type="text" v-model="number" placeholder-style="color:#f5f5f5;" placeholder="请输入内容" />
				</view>
			</view>
			<view class="form-item" style="">
				<view class="label" style="">
					所属角色 
				</view>
				<view class="input" style="">
					<!-- <input type="text" v-model="role" placeholder-style="color:#f5f5f5;" placeholder="请输入内容" /> -->
					<text>{{typeText}}</text>
				</view>
			</view>
			<view class="form-item" style="margin-bottom: 20rpx;">
				<view class="label" style="">
					分成比例 
				</view>
				<view class="input" style="">
					<input type="text" v-model="proportion" @blur="inputnum" placeholder-style="color:#f5f5f5;" placeholder="请输入分成比例" />
					
				</view>
			</view>
			<view class="" style="color: #ffb895;font-size: 25rpx;margin-left: 26%;">
				{{text1}}
				<text v-if="text==''">0</text>
				<text v-else>{{text}}</text>
				%
			</view>
			<view class="form-item" style="">
				<view class="label" style="padding:0 15rpx;">
					代理商名称 
				</view>
				<view class="input" style="height: 70rpx;">   
					<input type="text" v-model="agentName" placeholder-style="color:#f5f5f5;" placeholder="请输入代理商名称" />
				</view>
			</view>
			<view class="form-item" style="">
				<view class="label" style="">
					所在城市 
				</view>
				<view class="input" style="">
					<input type="text" v-model="area" placeholder-style="color:#f5f5f5;" placeholder="请输入所在城市" />
				</view>
			</view>
			<view class="form-item" style="">
				<view class="label" style="">
					详细地址 
				</view>
				<view class="input" style="">
					<input type="text" v-model="address" placeholder-style="color:#f5f5f5;" placeholder="请输入详细地址" />
				</view>
			</view>
			<view class="form-item" style="">
				<view class="label" style="">
					联系人 
				</view>
				<view class="input" style="">
					<input type="text" @blur="checkPhone" v-model="contacts" placeholder-style="color:#f5f5f5;" placeholder="请输入联系人" />
				</view>
			</view>
		</view>
		<view class="">
			
			<button type="default" @click="submit()" style="margin-top: 150rpx;border: 1rpx solid #6ed161;background-color: #64d059;color: #ffffff;font-size: 30rpx;padding: 5rpx;border-radius: 20rpx;">确认</button>
		</view>
	</view>
</template>

<script>
	import {insertAgentAccount,selectProportion} from '@/api/system/agent'
	import {investorSelectProportion} from '@/api/system/user.js'
	export default{
		data(){
			return{
				userName:'',
				password:'',
				number:'',
				role:'',
				proportion:Number,
				agentId:'',
				agentName:'',
				area:'',
				address:'',
				contacts:'',
				userid:'',
				text1:'可分配的分成比例为',
				text:'',
				userType:'',
				typeText:'xxx',
				// url:''
			}
		},
		onLoad() {
			this.userid=uni.getStorageSync('userid')
			this.userType=uni.getStorageSync('userType')
			console.log(this.userType,'this.userType');
			if(this.userType=='04'){
				this.typeText='医院'
			
				console.log('医院');
			}
			else if(this.userType=='05'){
				this.typeText='代理'
				console.log('代理');
			}
			else if(this.userType=='03'){
				this.typeText='投资人'
				console.log('投资人');
			}
			else{
				this.typeText='其它'
				console.log('其他端');
			}
			this.getlist()
			
			
		},
		methods:{
			checkPhone(){
				if(this.number)
				if(!(/^1[3-9]\d{9}$/.test(this.number))) {
					this.$modal.msgError("号码格式错误");
					this.number=''
				}
				
				if(this.contacts)
				if(!(/^1[3-9]\d{9}$/.test(this.contacts))) {
					this.$modal.msgError("号码格式错误");
					this.contacts=''
				}
			},
			inputnum(e){
				console.log(e.detail.value);
				if(isNaN(this.proportion)) {
					this.proportion=''
					this.$modal.msgError("请输入数字");
				}
				if(e.detail.value>this.text){
						uni.showToast({
							title: '已超出分配的分成比例，请重新分配',
							icon:'none',
							duration: 2000,
						})
						this.proportion=''
				}
			},
			async getlist(){
				let res
				if(this.userType=='03'){
					 res= await investorSelectProportion()
				}else{
					let datas={
						userId:this.userid,
						status:1
					}
					res=await selectProportion(datas)
				}
				
				if(res.code==200){
					this.text=res.data
					if(this.userType=='05'){
						this.role='代理商'
					}else{
						this.role='投资人'
					}
				}else{
					this.$modal.msgError("比例查询无返回");
				}
			},
			async submit(){
				let data={
					userId:this.userid,
					userName:this.userName,
					password:this.password,
					number:this.number,
					role:this.role,
					proportion:this.proportion,
					agentId:this.agentId,
					agentName:this.agentName,
					area:this.area,
					address:this.address,
					contacts:this.contacts
				}
				
				console.log(data);
				if(this.password==''||this.userName==''){
					uni.showToast({
						title: '请输入用户名和密码',
						icon:'none',
						duration: 1000
					});
				}else if(this.number==''||this.contacts==''){
					uni.showToast({
						title: '请输入联系人和联系人手机号',
						icon:'none',
						duration: 1000
					});
					
				}else if(this.role==''){
					uni.showToast({
						title: '请输入所属角色',
						icon:'none',
						duration: 1000
					});
					
				}
				else if(this.proportion==''){
					uni.showToast({
						title: '请输入分成比例',
						icon:'none',
						duration: 1000
					});
					
				}
				else if(this.area==''||this.address==''){
					uni.showToast({
						title: '请输入所在城市和详细地址',
						icon:'none',
						duration: 1000
					});
					
				}else if(this.agentName==''){
					uni.showToast({
						title: '请输入代理商名称',
						icon:'none',
						duration: 1000
					});
				}else{
					let res=await insertAgentAccount(data)
					if(res.code==200 && res.msg.indexOf('添加成功')!=-1){
						this.$modal.msgSuccess(res.msg);
						
						uni.navigateTo({
							url:'/pages/agent/account/SubaccountsList'
						})
					}else{
					
						this.userName=''
						this.number=''
						this.$modal.alert(res.msg);
					}
					
				}
				
			}
		}
			
	}
</script>

<style lang="less" scoped>
	.container{
		width: 100%;height: 100vh;background-color: #fff;padding: 30rpx;
		.form{
			.form-item{
				display: flex;
				margin: 40rpx 0;
				.label{
					width: 25%;
					padding: 15rpx;
					text-align-last: justify;
					text-align: justify;
					
				}
				.input{
					
					background-color: #f6f8fa;width: 80%;padding: 15rpx;border-radius: 10rpx;
				}
			}
		}
	}
	.place{
		color: #f6f8fa;
	}
</style>