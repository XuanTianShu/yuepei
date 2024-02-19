<template>
  <view class="openCabinet">
		
		<!-- 开柜中 -->
		<view class="optlte" v-if="show == 1">
			<view class="opca_v1_a1" v-if="open ==0">
				<image src="https://images.weserv.nl/?url=https://www.yp10000.com/static/img/openCabinet.png" class="image"></image>
				<view>开柜中，请稍等…</view>
				<text>感谢您的耐心等待</text>
			</view>
			<view class="opca_v2_a1" v-if="open !=0">
				<text>柜门已打开，请您取走货物并关上柜门</text>
				<view class="subit" @click="skip('/pages/nursingBed/lease/leaseOrder')">确定</view>
			</view>
		</view>
		
		<!-- 开柜失败 -->
		<view v-if="show == 2">
			<view class="opca_v1_a1">
				<image src="https://images.weserv.nl/?url=https://www.yp10000.com/static/img/fail.png" class="image"></image>
				<view>开柜失败</view>
			</view>
			
			<view class="opca_v1_a2" @click="reOpen">重新开柜</view>
			
		</view>
		
		<message ref="message"></message>
		
  </view>
</template>

<script>
	import CryptoJS from 'crypto-js'
	import message from '@/components/popup_message.vue'
  import { insertUserLeaseOrder ,setElectric} from '@/api/system/user'
  export default {
    data() {
      return {
				show:1,
				open:0,
				options:'',
				
				token:'',
				deviceId:'',
				serviceId:'',
				uuid:'',
				
				fee:'FEE7',
				sel:0,
				latchId:'',
				// system:'',
				electric:0,
				
				issetelectric:true,
				isInsert:true,
			}
    },
		components:{
			message
		},
		onLoad(options){
			this.options = wx.getStorageSync('ewmInLock')
	
			//selOneFive选中的子锁  rows.status是子锁状态 0可用 1故障 2试用（无）
			//大域一拖五  大域单个锁
			if(this.options.selOneFive>=0 || this.options.deviceMac.indexOf(':')==-1) {
				this.fee='FFF0'
				this.sel=Number(this.options.selOneFive)||0
				this.sel++
			}
			
			//梦远一拖五
			if(this.options.deviceMac=='F7:64:1B:06:E0:F4' ) {
				this.fee='FEE7'
			}
			
			
			// let	info = wx.getSystemInfoSync()
			//  if (info.system.indexOf('Android') > -1) {
			// 					this.system=1
			// 				}else{
			// 					this.system=2
			// 				}
	
			this.init()
		},
		onHide() {
			if(this.deviceId) this.closeBlue()
			uni.stopBluetoothDevicesDiscovery()
		},
		onUnload() {
			if(this.deviceId) this.closeBlue()
			// 监听页面销毁事件  （出现open页面的js在onlease执行的情况）
			uni.stopBluetoothDevicesDiscovery()
			// console.log('--------------------')
		},
		methods: {
			async setElectric(){
				let data={
					deviceNumber:this.options.deviceNumber,
					electric:this.electric
				}
				let res= await setElectric(data)
				if(res.code==200){
					console.log('电量上传成功')
				}
				
			},
			
			
			
			
			reOpen(){
				this.show=1;
				this.init()
			},
			closeBlue(){
				console.log('开始关闭蓝牙',this.deviceId)
				uni.closeBLEConnection({
					deviceId:this.deviceId,
					success(res){
						console.log('关闭蓝牙成功',res)
						wx.closeBluetoothAdapter({
							success(re){
								console.log('关闭授权',re)
							}
						})
					}
				})
			},
			//初始化蓝牙
			init(){
				let _this = this
				 _this.isInsert=true
								uni.openBluetoothAdapter({
									success(res) {
										_this.findBlue()
										// if(_this.system==1 && _this.options.deviceMac.indexOf(':')!=-1){
										// 	//连接蓝牙
										// 	_this.deviceId=_this.options.deviceMac
										// 	_this.connetBlue(_this.options.deviceMac)
										// }else{
										// 	_this.findBlue()//ios专用
										// }
									},
									fail(res) {
										_this.show = 2
										_this.$modal.msgError("请开启蓝牙和定位");
										console.log(res);
										
									}
								})
			},
			//发现附近蓝牙
			findBlue(){
				let that=this
				uni.startBluetoothDevicesDiscovery({
				  // allowDuplicatesKey: true,
				  services: [that.fee],
				  success(res) {
						that.onBlue()
				  },
				  fail(res) {
				  	that.show = 2
					that.$modal.msgError("蓝牙匹配失败",res);
					uni.stopBluetoothDevicesDiscovery()
				  }
				})
			},
			
			onBlue(){
				let _this = this
				console.log('监听蓝牙')
			
				setTimeout(function(){
					if(!_this.deviceId){
						_this.show=2
						_this.$modal.alert("匹配超时");
						uni.stopBluetoothDevicesDiscovery()
					}
				},15000)
				uni.onBluetoothDeviceFound(function (res) {
					
					console.log(res,'监听蓝牙',res.devices[0].deviceId , _this.options.deviceMac)
					// if(_this.sel>0){
					if(_this.fee=='FFF0'){
						//广播数据属于arrybuffer，需要创建一个内存空间
						let s = String.fromCharCode.apply(null, new Uint8Array(res.devices[0].advertisData))
						console.log(s,_this.options.deviceMac)
						if(s.indexOf(_this.options.deviceNumber)!=-1)	{
							_this.deviceId=res.devices[0].deviceId
							uni.stopBluetoothDevicesDiscovery()
							_this.connetBlue(res.devices[0].deviceId)
						}
						
					}else{
						let s=_this.ab2hex(res.devices[0].advertisData)
						
						let device=_this.options.deviceMac
						device=device.replaceAll(":",'')
						device=device.toLowerCase()
						console.log(s,device,_this.options.deviceMac)

						if(s.indexOf(device)>0 || res.devices[0].deviceId == _this.options.deviceMac ){
							_this.deviceId=res.devices[0].deviceId
							_this.connetBlue(res.devices[0].deviceId)
							//停止搜索蓝牙
							uni.stopBluetoothDevicesDiscovery()
						}
					}
				}
				)
			},
			//连接蓝牙
			connetBlue(deviceId){
				let _this = this
								
								uni.createBLEConnection({
								  deviceId:deviceId,
								  success(res) {
										_this.getServiceId(deviceId)
								  },
									fail(res) {
										console.log('createBLEConnection fail',res)
										if(res.errMsg.indexOf('already'!=-1)){
											_this.getServiceId(deviceId)
										}else{
											_this.show = 2
											_this.$modal.msgError("蓝牙连接失败");
										}
									}
								})
			},
			//获取蓝牙设备所有服务
			getServiceId(deviceId){
				let _this = this
				setTimeout(()=>{
						uni.getBLEDeviceServices({
								  deviceId:deviceId,
								  success(res) {
										console.log(res)
								    res.services.forEach((item)=>{
								    	if(item.uuid.indexOf(_this.fee) >= 0){
												_this.serviceId=item.uuid
								    		_this.getCharacteId(deviceId,item.uuid)
								    	}
								    })
								  },
									fail(res) {
										_this.show = 2
										console.log(res)
										_this.closeBlue()
									}
								})
				},1000)
				
			},
			//获取蓝牙设备某个服务中所有特征值
			getCharacteId(deviceId,serviceId){
				let _this = this
								uni.getBLEDeviceCharacteristics({
								  // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
								  deviceId:deviceId,
								  // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
								  serviceId:serviceId,
								  success(res) {
										console.log(res)
										if(res.characteristics.length > 0){
											res.characteristics.forEach((item)=>{
												
												if(_this.sel>0){//一拖五	   大域								 梦远
													if (item.uuid.indexOf("FFF6") != -1 || item.uuid.indexOf("000036F") != -1) {
														if(item.properties.notify) _this.startNotice(deviceId,serviceId,item.uuid)
														if(item.properties.write )	_this.uuid = item.uuid
													}
													
												}else{//单个锁
													if(item.properties.notify)	_this.startNotice(deviceId,serviceId,item.uuid)
													if(item.properties.write )	_this.uuid = item.uuid
												}
												
											})
										}
								  },
									fail(res) {
										_this.show = 2
										console.log('getBLEDeviceCharacteristics fail ',res)
										_this.closeBlue()
									}
								})
			},
			//启用低功耗蓝牙设备特征值变化时的 notify 功能
			//重点：开启监听服务。监听设备数据变化
			startNotice(deviceId,serviceId,uuid){
				let _this = this
				uni.notifyBLECharacteristicValueChange({
				  state: true, // 启用 notify 功能
				  deviceId:deviceId,
				  serviceId:serviceId,
				  characteristicId:uuid,
				  success(res) {
						console.log('notifyBLE success', res);
							if(_this.fee=='FFF0'){//一拖五 大域
								_this.listenBle(deviceId,serviceId,uuid)
								_this.sendCmd(deviceId,serviceId,'UL123456'	)
							}	
							else{//其他锁
								_this.onBle()
								let str='40980A4246DA9214764601E01AF7A5A3'
								if(_this.sel>0) {
									str='0AD6BA4F484ADD7DA1772C8CF3EF1418' 
									// 临时测试
									// return
								}
								_this.sendCmd(deviceId,serviceId,str)
							}
							
							uni.onBLEConnectionStateChange(function (res) {
							  // 该方法回调中可以用于处理连接意外断开等异常情况
							  console.log(`device ${res.deviceId} , 连接状态: ${res.connected}`)
								if(!res.connected){
									if(!_this.open)	_this.show =2
								}
							})
					},
					fail(res) { 
						 console.log('notify fail ',res)
							_this.closeBlue()
							_this.show=2
						}
					})			
								
			},
			//监听一拖五特征数据变化
			listenBle(deviceId,serviceId,uuid){
				let that=this
				wx.onBLECharacteristicValueChange(function (characteristic) {
				  // console.log('characteristic value comed:${res.value}', characteristic.value)
				  /**
				   * 监听char6中的结果
				   */
				  if (characteristic.characteristicId.indexOf("FFF6") != -1) {
						
						let str = String.fromCharCode.apply(null, new Uint8Array(characteristic.value))
						console.log('str',str);
						if(str.indexOf('OK')!=-1) {
							// that.$modal.msgSuccess("开锁指令成功");
						}
				    if (str.substring(0, 3) == 'KEY') { 
							// 明文指令 查询	以下方法需要封装 考虑到一拖五需要200ms延迟和其他蓝牙需要加密
							// 获取电量
							setTimeout(function(){that.sendCmd(deviceId,serviceId,'BA=?')},200)	
							
							//获取状态和插销id 生成预订单
							if(that.options.selOneFive>=0) setTimeout(function(){that.sendCmd(deviceId,serviceId,'CU123456'+that.sel)},200)
				
				    }
						else if (str.indexOf('UnLkOK')>=0) {
							if(that.options.deviceMac.indexOf(':')==-1){
								that.insertUserLeaseOrder()
							}
							if(that.options.selOneFive>=0) setTimeout(function(){that.sendCmd(deviceId,serviceId,'CU123456'+that.sel)},200)
						}
						else if (str.substring(0, 2) == 'BA') {
							that.electric=str.substring(3,str.length)
							console.log('电量'+that.electric+'%')
							if(that.issetelectric) {//电量返回两次
									that.setElectric()
									that.issetelectric=false
							}
						}
						else if (str.substring(0, 4) == 'SN=1') {//开锁
							// 发送开锁指令
							setTimeout(function(){
								that.writedata(deviceId,serviceId,'UL123456'+that.sel)
							},200)
						}
						else if (str.substring(0, 4) == 'SN=0') {//开锁
						  if(str.substring(6,7).indexOf(that.sel)!=-1){
								that.latchId=str.substring(7,19)
							    if(that.isInsert) {
									that.insertUserLeaseOrder()
									that.isInsert=false
								}
							}
						}
				    else if (str.substring(0, 6) == 'ULFail' || str.substring(0, 12) == "moto running" || str.substring(0, 9) == 'PassError') {
				      
				      let titleSTR = '密码错误'
				      if (str.substring(0, 6) == 'ULFail')  titleSTR = '开锁失败！没有检测到磁铁或在开锁周期内！';
					  
				      if (str.substring(0, 12) == "moto running") titleSTR = '开锁失败！电机正在运行中---'
				
					  console.log(titleSTR)
					  that.show=2
					  that.closeBlue()
					}
				  }
				})       
			},
			
			//一拖五发送密文指令
			writedata(deviceId,serviceId,arry) {
			 // console.log(arry)
			 let _this = this
			 let buffer=[]
			 buffer = new Uint8Array(arry.length);
			 for(let i = 0; i < arry.length; i++) {
			     buffer[i] = arry.charCodeAt(i);
			 } 
			 
			 	buffer=buffer.buffer
			 	uni.writeBLECharacteristicValue({
			 	  deviceId:deviceId,
			 	  serviceId:serviceId,
			 	  characteristicId:_this.uuid,
			 	  value: buffer,
			 	  success(res) {
					_this.insertUserLeaseOrder()
			 	    console.log(res,'发送指令成功')
			 	  },
				  fail(res) {
				  	_this.show=2
				  }
			 	})	
			
			},
			//监听特征数据变化
			onBle(){
				let _this = this
				// 必须在这里的回调才能获取
				uni.onBLECharacteristicValueChange(function (characteristic) {
					if(characteristic.value){
						
						let str=_this.ab2hex(characteristic.value)
						_this.token = _this.decrypt(str)
		
						 console.log('解密后:',_this.token)
						 
						if(_this.token.indexOf('0602') >= 0) {
							_this.sendOpen()
						}
						else if(_this.token.indexOf('05020700')!=-1
						|| _this.token.indexOf('05020100') >= 0
						||_this.token.indexOf('058203000000') >= 0  ){
							 _this.insertUserLeaseOrder()
						}
						
						
						// 梦远子锁
						else if(_this.token.indexOf('05070c')!=-1 ){
							let s=_this.token.substr(6,24)
							let c1=s.substr(0,8)
							let c2=s.substr(8,8)
							let c3=s.substr(16,8)
							console.log(c1,c2,c3);
							switch(_this.sel){
								case 1:_this.latchId=c1;break;
								case 2:_this.latchId=c2;break;
								case 3:_this.latchId=c3;break;
							}
							_this.sendOpen()
						}else{
							let s=_this.token.substr(6,16)
							let c4=s.substr(0,8)
							let c5=s.substr(8,8)
							console.log(c4,c5);
							switch(_this.sel){
								case 4:_this.latchId=c4;break;
								case 5:_this.latchId=c5;break;
							}
							_this.sendOpen()
						}
						
						
					}
				})
			},
			
			//发送指令
			sendCmd(deviceId,serviceId,arry){
				let _this = this
				let data=[]
				
				if(_this.fee=='FFF0'){//32
					data = new Uint8Array(arry.length);
					    for(let i = 0; i < arry.length; i++) {
					        data[i] = arry.charCodeAt(i);
					    }
				}else{//16
					data= new Uint8Array(arry.match(/[\da-f]{2}/gi).map(function (h) {
										return parseInt(h, 16)
					}))
				}
	
					uni.writeBLECharacteristicValue({
					  deviceId:deviceId,
					  serviceId:serviceId,
					  characteristicId:_this.uuid,
					  value: data.buffer,
					  success(res) {
					    console.log(res,'发送指令成功')
						
					  }
					})			
			},
		
			//发送开锁指令
			sendOpen(){
				let _this = this
								let token = _this.token.slice(6,14)
								//普通锁
								let tmp = '050106303030303030'
								tmp = tmp + token + '000000'
								//梦远
								/**
								 * 1号口对应----------01
									2号口对应----------02
									3号口对应----------04
									4号口对应----------08
									5号口对应----------10
									6号口对应----------20
									7号口对应----------40
									8号口对应----------8
								 * */
									
								if(_this.sel>=0 && _this.fee=='FEE7') {
									if(!_this.latchId){
										// 查询锁状态
										tmp='0507'+token+'00000000000000000000'
										if(_this.sel>3) tmp='0508'+token+'00000000000000000000'
									}else{
										let child
										switch(_this.sel){
											case 1:child='01';break;
											case 2:child='02';break;
											case 3:child='04';break;
											case 4:child='08';break;
											case 5:child='10';break;
										}
										
										tmp='058109303030303030'
										tmp=tmp+`${child}0000`+token
									}
									
								}
								
								let arr = _this.encrypt(tmp)
							
								
								// 16进制字符串转ArrayBuffer
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
									//新增订单
									console.log(res,'开锁成功')
									// _this.insertUserLeaseOrder()
								  },
								  fail(res) {
								  	_this.show=2
								  }
								})
			},
			//加密
			encrypt(data) {
				let key='3A60432A5C01211F291E0F4E0C132825'
				//梦远
				if(this.sel>=0 && this.fee=='FEE7') key='20572F52364B3F473050415811632D2B'
				let keyHex = CryptoJS.enc.Hex.parse(key);
				let srcs = CryptoJS.enc.Hex.parse(data);
				const cipher = CryptoJS.AES.encrypt(srcs, keyHex, {
						mode: CryptoJS.mode.ECB,
						padding: CryptoJS.pad.NoPadding,
				});
				
				return cipher.ciphertext.toString().toUpperCase();
			},
			//解密
			decrypt(decodedData) {
				let key='3A60432A5C01211F291E0F4E0C132825'
				//梦远
				if(this.sel>=0 && this.fee=='FEE7') key='20572F52364B3F473050415811632D2B'
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
			
			//新增订单
			async insertUserLeaseOrder(){
				let _this = this
				let rows=1
				// let rows=[{status:1}]
				if(_this.sel>0 && _this.options.deviceMac.indexOf(':')!=-1) {
					rows=JSON.parse(_this.options.rows)
					rows[_this.sel-1].status=2
				}
				console.log(rows)
				let params = {
					rows: JSON.stringify(rows)
				}
				let data = {
					leaseAddress:_this.options.deviceAddress,
					deviceNumber:_this.options.deviceNumber,
					rule:JSON.stringify(_this.options.deviceRules),
					choose:_this.sel,
					child:_this.latchId
				}
				// console.log("调用订单接口",data);
				let res = await insertUserLeaseOrder(params,data)
				
				console.log("接口返回",res);
				if(res){
					if(res.code == 200){
						_this.open=1
						_this.show=1
						_this.$modal.msgSuccess("开锁成功,请关闭蓝牙");
						
					}else{
						console.log("开锁失败");
						_this.show=2
						
					}
				}
				else{
					console.log("开锁失败");
					_this.show=2
				}
				_this.closeBlue()//断开蓝牙
			},
			
			skip(url){
				uni.redirectTo({
					url:url
				});
			},
			ab2hex(buffer) {
			  const hexArr = Array.prototype.map.call(
			    new Uint8Array(buffer),
			    function (bit) {
			      return ('00' + bit.toString(16)).slice(-2)
			    }
			  )
			  return hexArr.join('')
			},
			
			
			
		}
  }
</script>

<style lang="less" scoped>
  .openCabinet {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-color:#FFFFFF;
		
		.opca_v1_a1{
			margin-top:120rpx;
			margin-bottom:200rpx;
			width:100%;
			display:flex;
			flex-direction:column;
			align-items:center;
			justify-content:center;
			
			.image{
				width: 99rpx;
				height: 99rpx;
			}
			view{
				font-size: 28rpx;
				font-weight:bold;
				margin:34rpx 0rpx 16rpx 0rpx;
			}
			text{
				font-size: 26rpx;
				font-weight:400;
				color:rgba(0,0,0,0.49);
			}
		}
		.optlte{
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
		}
		.opca_v1_a2{
			margin:80rpx auto;
			width: 686rpx;
			height: 92rpx;
			border-radius: 16rpx;
			border: 2rpx solid #64CF59;
			font-size:28rpx;
			font-weight:bold;
			text-align:center;
			line-height:92rpx;
			color:#64CF59;
		}
		
		.opca_v2_a1{
			margin:0rpx auto;
			width: 568rpx;
			background: #FFFFFF;
			box-shadow: 0px 6rpx 12rpx 0px rgba(0,0,0,0.12);
			border-radius: 24rpx;
			display:flex;
			flex-direction:column;
			align-items:center;
			padding:100rpx 30rpx 40rpx 30rpx;
			font-size:26rpx;
			
			.subit{
				margin-top:90rpx;
				width: 414rpx;
				height: 74rpx;
				background: #FF7C4A;
				border-radius: 37rpx;
				color:white;
				font-weight:bold;
				font-size:28rpx;
				text-align:center;
				line-height:74rpx;
			}
		}
		
  }
</style>
