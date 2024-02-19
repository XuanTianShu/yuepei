<template>
  <view class="lease">
		
		<view class="bala_v2_a1">
			<view class="bala_v2_b1">
				<view class="bala_v2_c1"><text>{{totalTime}}</text></view>
				<view class="bala_v2_c2">已使用</view>
			</view>
			<view class="bala_v2_b2">
				<text>预估</text>
				<view>{{estimate}}</view>
			</view>
		</view>
		
		<view class="bala_v3_a1">
			<view class="bala_v3_b1">
				<view></view>
				<text>价格明细</text>
			</view>
			<view class="bala_v3_b2">
				<text>计费规则</text>
				<view >
					<view>{{order.rule[0].price}}元/小时，前10分钟免费，超过10分钟按小时计算</view>
					<view style="margin-top: 10rpx;">{{ruletime}},共{{order.rule[1].price}}元</view>
				</view>
			</view>
			<view class="bala_v3_b2">
				<text>租借押金</text>
				<view>{{order.deposit}}元</view>
			</view>
			<view class="bala_v3_b2">
				<text>使用时长</text>
				<view>{{totalTime}}</view>
			</view>
			
			
			<view class="bala_v3_b1 bala_v3_b3">
				<view></view>
				<text>租借信息</text>
			</view>
			<view class="bala_v3_b2">
				<text>租借时间</text>
				<view>{{order.leaseTime}}</view>
			</view>
			<view class="bala_v3_b2">
				<text>租借地点</text>
				<view>{{order.leaseAddress||''}}</view>
			</view>
			<view class="bala_v3_b2">
				<text>订单编号</text>
				<view>{{order.orderNumber}}</view>
			</view>
		</view>
		<!-- <u-loading-icon v-if="showloagding" text="正在还床" textSize="18"></u-loading-icon> -->
		<!-- <view class="cop_v1_a3" v-if="order.choose==0" @click=" $disabledClick(stillBed)">还床</view> -->
		
		<message ref="message"></message>
		
  </view>
</template>

<script>
	import CryptoJS from 'crypto-js'
	import message from '@/components/popup_message.vue'
	import { dateFormart ,sumPrice} from '@/utils/dateFormart.js'
  import { insertUserLeaseOrder,updateLeaseOrderStatus,setElectric } from '@/api/system/user'
  export default {
    data() {
      return {
				noClick:true,//防止恶意点击
				order:'',
				
				estimate:0,
				totalTime:'',
				showloagding:false,
				ruletime:'',
				
				token:'',
				deviceId:'',
				serviceId:'',
				uuid:'',
				fee:'FEE7',
				
				system:'',//判断手机系统
				electric:0
      }
    },
		components:{
			message
		},
		onLoad(val){
			this.order=JSON.parse(val.orderInfo)
			console.log('orderInfo',this.order)
			this.order.rule=JSON.parse(this.order.rule)
			let	info = wx.getSystemInfoSync() 
			if (info.system.indexOf('Android') > -1) {
				this.system=1
			}else{
				this.system=2
			}
			this.timer()
		},
		onHide(){
			
		},
		onUnload(){
		
		},
    methods: {
			async setElectric(){
				let data={
					deviceNumber:this.order.deviceNumber,
					electric:this.electric
				}
				let res= await setElectric(data)
				if(res.code==200){
					console.log('电量上传成功')
				}
				console.log('电量上传返回',res)
			},
			
			//计算租借时间及费用
			timer(){
				const _this = this
				let leaseTime= new Date(_this.order.leaseTime.replace(/-/g,'/'))
				// -----------------------
				let now = new Date()
				let times= (now-leaseTime)/3600000 //总用时
				let hour=Math.trunc(times)||0				//总小时
				let minute=Math.trunc((times-hour)*60)||0	//分钟数
				// minute=10
				if(hour/10<1) hour='0'+hour
				if(minute/10<1) minute='0'+minute
				_this.totalTime=hour+'小时'+minute+'分钟'

				_this.estimate=0//价格初始化
				let res=sumPrice(leaseTime,JSON.stringify(_this.order.rule),times.toFixed(2))
				_this.estimate=res.sum.toFixed(2)	
					
				_this.ruletime='固定套餐(当日)'+_this.order.rule[1].startTime+'至'+_this.order.rule[1].endTime
							
				if(	res.rlb.endTime<res.rlb.startTime){
					_this.ruletime='固定套餐(当日)'+_this.order.rule[1].startTime+'至(次日)'+_this.order.rule[1].endTime
				}
				
			},
			
			//初始化蓝牙
			stillBed(){
				let _this = this;
				wx.showModal({
					 title: '提示',
					 content: '请开启GPS定位和蓝牙',
					 success: function (res) {
					     if (res.confirm) {
					 				_this.showloagding=true
					 				uni.openBluetoothAdapter({
					 					success(res) {
											console.log(res)
					 						if(_this.system==1){
					 							//连接蓝牙
					 							_this.connetBlue(_this.order.deviceMac)
												_this.deviceId=_this.order.deviceMac
					 						}else{
					 							_this.findBlue()
					 						}
					 					},
					 					fail(res) {
					 						_this.showloagding=false
					 						_this.$modal.msgError("蓝牙初始化失败，请开启蓝牙和定位");
											console.log(res)
					 					}
					 				})
					     }
					 }	            
				})
				
			},
			//发现附近蓝牙
			findBlue(){
				let that=this
				uni.startBluetoothDevicesDiscovery({
				  services: [that.fee],
				  success(res) {
						console.log(res)
						that.onBlue()
				  }
				})
			},
			//监听蓝牙
			onBlue(){
				let _this = this
				uni.onBluetoothDeviceFound(function (res) {
					console.log(res,'监听蓝牙',res.devices[0].deviceId , _this.order.deviceMac)
					if(res.devices[0].deviceId == _this.order.deviceMac){
						_this.deviceId=res.devices[0].deviceId
						_this.connetBlue(res.devices[0].deviceId)
						//停止搜索蓝牙
						uni.stopBluetoothDevicesDiscovery()
					}
				})
			},
			//连接蓝牙
			connetBlue(deviceId){
				let _this = this
				
				uni.createBLEConnection({
				  deviceId:deviceId,
				  success(res) {
						console.log(res,'连接蓝牙')
						_this.getServiceId(deviceId)
				  },
					fail(res) {
						if(res.errMsg.indexOf('already'!=-1)){
							console.log(res.errMsg)
							_this.getServiceId(deviceId)
						}else{
							_this.showloagding=false
							console.log('createBLEConnection fail',res)
							_this.$modal.msgError("蓝牙连接失败");
						}
					}
				})
			},
			//获取蓝牙设备所有服务
			getServiceId(deviceId){
				let _this = this
				
				uni.getBLEDeviceServices({
				  deviceId:deviceId,
				  success(res) {
						////console.log(res,'获取蓝牙设备所有服务')
				    res.services.forEach((item)=>{
				    	if(item.uuid.indexOf(_this.fee) >= 0){
								_this.serviceId = item.uuid
				    		_this.getCharacteId(deviceId)
				    	}
				    })
				  },
					fail(res) {
						_this.close()
						_this.showloagding=false
						_this.$modal.msgError("还床失败");
						console.log(res)
					}
				})
			},
			//获取蓝牙设备某个服务中所有特征值
			getCharacteId(deviceId){
				let _this = this
				
				uni.getBLEDeviceCharacteristics({
				  // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
				  deviceId:deviceId,
				  // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
				  serviceId:_this.serviceId,
				  success(res) {
						
						if(res.characteristics.length > 0){
							res.characteristics.forEach((item)=>{
								if(item.properties.notify)	_this.startNotice(deviceId)
								if(item.properties.write )	_this.uuid = item.uuid
							})
						}
				  },
					fail(res) {
						_this.close()
						_this.showloagding=false
						_this.$modal.msgError("还床失败");
						console.log("getCharacteId（）方法获取蓝牙设备某个服务中所有特征值失败",res)
					}
				})
				
			},
			//启用低功耗蓝牙设备特征值变化时的 notify 功能
			//重点：开启监听服务。监听设备数据变化
			startNotice(deviceId){
				let _this = this
				
				uni.notifyBLECharacteristicValueChange({
				  state: true, // 启用 notify 功能
				  deviceId:deviceId,
				  serviceId:_this.serviceId,
				  characteristicId:_this.uuid,
				  success(res) {
						_this.onBle()
						_this.sendCmd(deviceId,'40980A4246DA9214764601E01AF7A5A3')
				  },
					fail(res) {
						_this.close()
						_this.showloagding=false
						_this.$modal.msgError("还床失败");
						console.log(res)
					}
					
				})
			},
			//监听特征数据变化
			onBle(){
				let _this = this
				// 监听蓝牙设备的特征值变化事件
				uni.onBLECharacteristicValueChange(function (characteristic) {
					if(characteristic.value){//蓝牙设备最新特征
						const hexArr = Array.prototype.map.call(
						//转16进制
						 new Uint8Array(characteristic.value),
						 function (bit) {
							 return ('00' + bit.toString(16)).slice(-2)
						 })
						 
						 let str = hexArr.join('')
						_this.token = _this.decrypt(str)
						console.log('_this.token0',_this.token)
						if(_this.token.indexOf('0602') >= 0){
							// 向蓝牙设备写入16进制数据
							_this.getSuo()
						}
						// 蓝牙锁
						if(_this.token.indexOf('050f020101') >= 0 
						// PH70蓝牙锁 token  050f0501
						|| _this.token.indexOf('050f0501') >= 0 ){
							_this.insertUserLeaseOrder()
						}
					}
				})
			},
			//发送指令
			sendCmd(deviceId,arry){
				let _this = this
				let buffer= new Uint8Array(arry.match(/[\da-f]{2}/gi).map(function (h) {
					return parseInt(h, 16)
				}))
				
					buffer=buffer.buffer
					setTimeout(function(){
						uni.writeBLECharacteristicValue({
							deviceId:deviceId,
							serviceId:_this.serviceId,
							characteristicId:_this.uuid,
							value: buffer,
							success(res) {
								console.log(res,'发送指令成功',arry)
							}
						})			
					},500)
			},
			//获取锁状态
			getSuo(){
				let _this = this
				//普通锁
				
				let tmp = '050E0101'
				let token = _this.token.slice(6,14)
				
				tmp = tmp + token + '0000000000000000'
				
				let arr = _this.encrypt(tmp)
				
				let typedArray = new Uint8Array(arr.match(/[\da-f]{2}/gi).map(function (h) {
					return parseInt(h, 16)
				}))
				let buffer = typedArray.buffer
					
				uni.writeBLECharacteristicValue({
				  deviceId:_this.deviceId,
				  serviceId:_this.serviceId,
				  characteristicId:_this.uuid,
				  value: buffer,
				  success(res) {
				    console.log(res,'获取状态成功')
				  }
				})
			},
			//加密
			encrypt(data) {
				let key = CryptoJS.enc.Hex.parse('3A60432A5C01211F291E0F4E0C132825');
				let srcs = CryptoJS.enc.Hex.parse(data);
				const cipher = CryptoJS.AES.encrypt(srcs, key, {
						mode: CryptoJS.mode.ECB,
						padding: CryptoJS.pad.NoPadding,
				});
				
				return cipher.ciphertext.toString().toUpperCase();
			},
			//解密 
			decrypt(decodedData) {
				let keyHex = CryptoJS.enc.Hex.parse('3A60432A5C01211F291E0F4E0C132825');
				let decrypted = CryptoJS.AES.decrypt({
					ciphertext: CryptoJS.enc.Hex.parse(decodedData)
				}, keyHex, {
						iv: [],
						mode: CryptoJS.mode.ECB,
						padding: CryptoJS.pad.NoPadding
					});
				
				return decrypted.toString(CryptoJS.enc.Hex);
			},
			//结束订单
			async insertUserLeaseOrder(){
				let _this = this
				_this.timer()//计算价格
				let rows=[{status:0}]
				let params = {
					rows: JSON.stringify(rows)
				}
				
				let data = {
					restoreAddress:_this.order.deviceAddress,
					deviceNumber:_this.order.deviceNumber,
					orderNumber:_this.order.orderNumber,
					rule:JSON.stringify(_this.order.rule),
					price:_this.estimate//费用
				}
				
				let res = await insertUserLeaseOrder(params,data)
				if(res){
					if(res.code == 200){
						
						_this.showloagding=false
						// _this.$modal.msgSuccess("还床成功");
						_this.$refs.message.setMsg('success','还床成功,请关闭蓝牙')
						_this.order.restoreTime=dateFormart(new Date())
						_this.order.restoreAddress=_this.order.deviceAddress
						_this.order.price=Number(_this.estimate)
						console.log('还床跳转',_this.order)
						uni.redirectTo({
							url:'/pages/nursingBed/lease/underReview?status='+1+'&orderInfo='+JSON.stringify(_this.order)
						});
					}else{
						_this.showloagding=false
						// _this.$modal.alert("还床失败,请重新尝试");
						_this.$refs.message.setMsg('error','还床失败,请重新尝试')
					}
					
				}else{
					_this.showloagding=false
					// _this.$modal.alert("还床失败,请重新尝试");
					_this.$refs.message.setMsg('error','还床失败,请重新尝试')
				}
			},
			// 对获取到的url进行正则取值
			getvl(url,name) {
				let reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");
				if (reg.test(url)) return unescape(RegExp.$2.replace(/\+/g, " "));
				return "";
			},
			
			close(){
				uni.closeBLEConnection({
					deviceId:this.deviceId,
					success(res){
						console.log('断开蓝牙连接成功')
						this.$refs.message.setMsg('warn','已断开蓝牙连接')
						wx.closeBluetoothAdapter({
							success(res){}
						})
					},
					fail(res) {
						console.log('蓝牙断开连接失败',res)
					}
				})
			}
			
			
    }
  }
</script>

<style lang="less" scoped>
  .lease {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-color:#F6F8FA;
		padding:0rpx 30rpx;
		
		.bala_v2_a1{
			width: 100%;
			height: 270rpx;
			background-image:url('https://images.weserv.nl/?url=https://www.yp10000.com/static/img/balance.png');
			background-size:100% 100%;
			background-repeat:no-repeat;
			margin-top:80rpx;
			display:flex;
			flex-direction:row;
			align-items:center;
			justify-content:space-between;
			padding:0rpx 30rpx;
			
			.bala_v2_b1{
				display:flex;
				flex-direction:column;
				
				.bala_v2_c1{
					font-size: 28rpx;
					font-weight: 400;
					color:white;
					
					text{
						font-size: 56rpx;
						font-weight:bold;
					}
				}
				
				.bala_v2_c2{
					margin-top:10rpx;
					font-size: 28rpx;
					font-weight: 400;
					color: rgba(255,255,255,0.9);
				}
			}
			
			.bala_v2_b2{
				display:flex;
				flex-direction:row;
				align-items:center;
				
				view{
					font-size: 56rpx;
					font-weight:bold;
					color:white;
				}
				text{
					margin-right:16rpx;
					font-size:28rpx;
					font-weight: 400;
					color: rgba(255,255,255,0.9);
				}
			}
		}
		
		.bala_v3_a1{
			width:100%;
			background-color:white;
			position:relative;
			top:-50rpx;
			border-radius: 16rpx;
			padding:36rpx 0rpx;
			
			.bala_v3_b1{
				display:flex;
				flex-direction:row;
				align-items:center;
				margin-bottom:30rpx;
				
				view{
					width: 14rpx;
					height: 30rpx;
					background: #FF7C4A;
					border-radius: 7rpx;
				}
				text{
					font-size: 28rpx;
					font-weight:bold;
					margin-left:18rpx;
				}
			}
			
			.bala_v3_b3{
				padding-top:20rpx;
				
				view{
					background: #64CF59;
				}
			}
			
			.bala_v3_b2{
				display:flex;
				flex-direction:row;
				align-items:center;
				justify-content:space-between;
				padding:0rpx 30rpx;
				margin-bottom:25rpx;
				
				text{
					font-size: 26rpx;
					font-weight: 400;
				}
				view{
					font-size: 26rpx;
					font-weight: 400;
					color: rgba(0,0,0,0.4);
					max-width:470rpx;
					text-align:justify;
				}
			}
		}
		
		.cop_v1_a3{
			width: 100%;
			height: 92rpx;
			background: #64CF59;
			border-radius: 16rpx;
			text-align:center;
			line-height:92rpx;
			color:white;
			font-size: 28rpx;
			font-weight: bold;
		}
		
  }
</style>
