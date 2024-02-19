import upload from '@/utils/upload'
import request from '@/utils/request'

// 代理端
// 测试
export function weChatWithdrawal(data) {
  return request({
    'url': '/wechat/user/order/weChatWithdrawal',
    'method': 'post',
	data
		// params:{...data}
  })
}



// 绑定银行卡
export function bindingBank(data) {
  return request({
    'url': '/wechat/user/investor/device/bindingBank',
    'method': 'post',
	data
		// params:{...data}
  })
}
// 银行卡提现
export function withdrawalApplication(data) {
  return request({
    'url': '/system/finance/withdrawalApplication',
    'method': 'post',
	data
		// params:{...data}
  })
}

// 提现记录
export function withdrawalRecords(data) {
  return request({
    'url': '/system/finance/withdrawalRecords',
    'method': 'get',
	data
		// params:{...data}
  })
}
// 查询当前登录人绑定的银行卡
export function selectBank(data) {
  return request({
    'url': '/wechat/user/investor/device/selectBank',
    'method': 'get',
	data
		// params:{...data}
  })
}

// 添加医院设备编号下拉框
export function selectDeviceNumberList(userId) {
  return request({
    'url': '/agent/user/info/selectDeviceNumberList/'+userId,
    'method': 'get',
	// data
		// params:{...data}
  })
}

// 设备类型管理
export function selectAgentByDevice(userId) {
  return request({
    'url': '/agent/user/info/selectAgentByDevice/'+userId,
    'method': 'get',
	// data
		// params:{...data}
  })
}

// 代理-设备管理详情列表 
export function selectAgentInfo(data) {
  return request({
    'url': '/agent/user/info/selectAgentInfo',
    'method': 'get',
	data:{...data}
  })
}
// 查询楼层科室房间床位号
export function selectDeviceAddressByHospital(hospitalId) {
  return request({
    'url': '/agent/user/info/selectDeviceAddressByHospital/'+hospitalId,
    'method': 'get'
  })
}
// 科室下拉框
export function selectDepartment(userId) {
  return request({
    'url': '/agent/user/info/selectDepartment/'+userId,
    'method': 'get'
  })
}

// 故障详情
export function selectDeviceFaultList(data) {
  return request({
    'url': '/agent/user/info/selectDeviceFaultList',
    'method': 'get',
	data
  })
}

// 代理端-故障详情-维修完成
export function feedbackRepairCompleted(feedbackId) {
  return request({
    'url': '/agent/user/info/feedbackRepairCompleted/'+feedbackId,
    'method': 'get',
	// data
  })
}

// 故障详情-待维修
export function selectDeviceFaultDetails(data) {
  return request({
    'url': '/agent/user/info/selectDeviceFaultDetails',
    'method': 'get',
	data
  })
}

// 代理端-故障详情-待维修-填写维修记录
export function writeMaintenanceRecords(data) {
  return request({
    'url': '/agent/user/info/writeMaintenanceRecords',
    'method': 'post',
	data
  })
}
// 编辑信息
export function updateDeviceDetails(data) {
  return request({
    'url': '/agent/user/info/updateDeviceDetails',
    'method': 'get',
	data:{...data}
  })
}

// 查看可分配的分成比例
// export function selectProportion(userId) {
//   return request({
//     'url': '/agent/user/info/selectProportion/'+userId,
//     'method': 'get',
//   })
// }

// 代理端-陪护床-设备详情deviceNumber
export function selectDeviceDetailsByDeviceNumber(data) {
  return request({
    'url': '/agent/user/info/selectDeviceDetailsByDeviceNumber',
    'method': 'get',
	data:{...data}
  })
}

// 营收统计 userId statistics
export function selectAgentRevenueStatistics(data) {
  return request({
    'url': '/agent/user/info/selectAgentRevenueStatistics',
    'method': 'get',
	data:{...data}
  })
}

// 医院管理 userId hospitalId
export function selectHospitalAdministration(data) {
  return request({
    'url': '/agent/user/info/selectHospitalAdministration',
    'method': 'get',
		data
  })
}
// 租借订单 userId
export function  selectLeaseOrder(data) {
  return request({
    'url': '/agent/user/info/selectLeaseOrder',
    'method': 'get',
		data:{...data}
  })
}

// 订单详情 userId orderNumber
export function  selectLeaseOrderDetails(data) {
  return request({
    'url': '/agent/user/info/selectLeaseOrderDetails',
    'method': 'get',
		data:{...data}
  })
}
   
//设备类型下拉框
export function selectDeviceTypeName(userId) {
  return request({
    'url': '/system/device/selectDeviceTypeName/'+userId,
    'method': 'get',
	 // data:{...data}
  })
}


//上传文档
export function uploadsFile(data) {
  return request({
    'url': '/agent/user/info/uploadsFile',
    'method': 'post',
	 data:{...data}
  })
}


//代理端-上传的文档列表
export function selectUploadsFileList(userId) {
  return request({
    'url': '/agent/user/info/selectUploadsFileList/'+userId,
    'method': 'get',
  })
}

//代理端-上传文档列表-未处理
export function selectUploadsFileListDetails(feedbackId) {
  return request({
    'url': '/agent/user/info/selectUploadsFileListDetails/'+feedbackId,
    'method': 'get',
  })
}

//添加医院 userId
export function addHospitalByAgent(data) {
  return request({
    'url': '/agent/user/info/addHospitalByAgent',
    'method': 'post',
	 data:{...data}
  })
}


// 查询当前用户是哪个代理商
export function selectAgentByUser(userId) {
  return request({
    'url': '/agent/user/info/selectAgentByUser/'+userId,
    'method': 'get'
	 // data:{...data}
  })
}

//查询可分配的分成比例
export function selectProportion(data) {
  return request({
    'url': '/agent/user/info/selectProportion',
    'method': 'get',
	 data:{...data}
  })
}


// 开通子账户
export function insertAgentAccount(data) {
  return request({
    'url': '/agent/user/info/insertAgentAccount',
    'method': 'post',
	 data:{...data}
  })
}


//子账户查询
export function selectSubAccount(userId) {
  return request({
    'url': '/agent/user/info/selectSubAccount/'+userId,
    'method': 'get',
	// data
		// params:{...data}
  })
}
// 个人资料
export function selectPersonalData(userId) {
  return request({
    'url': '/agent/user/info/selectPersonalData/'+userId,
    'method': 'get',
	 // data:{...data}
  })
}


// 医院下拉框
export function selectHospitalList() {
  return request({
    'url': '/agent/user/info/selectHospitalList',
    'method': 'get'
  })
}
// 查看该代理商下管理的医院
export function selectAgentHospitalList(userId) {
  return request({
    'url': '/agent/user/info/selectAgentHospitalList/'+userId,
    'method': 'get'
  })
}

// 设备下拉框
export function selectDeviceList(userId) {
  return request({
    'url': '/agent/user/info/selectDeviceList/'+userId,
    'method': 'get'
  })
}

//-设备详情-没有选择医院
export function selectDeviceTypeDetails(data) {
  return request({
    'url': '/agent/user/info/selectDeviceTypeDetails',
    'method': 'get',
		data:{...data}
  })
}


// 根据医院查询详细地址

export function selectDeviceAddress1(hospitalId) {
  return request({
    'url': '/system/device/selectDeviceAddress1/'+hospitalId,
    'method': 'get'
		// params:{...data}
  })
}

