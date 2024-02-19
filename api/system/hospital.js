import upload from '@/utils/upload'
import request from '@/utils/request'


export function maintenanceListssss() {
  return request({
    'url': '/wechat/user/maintenance/list',
    'method': 'get'
  })
}
export function devicelistttt() {
  return request({
    'url': '/system/device/list',
    'method': 'get'
  })
}
export function maintenancellll() {
  return request({
    'url': '/hospital/user/maintenance/list',
    'method': 'get'
  })
}
// 轮播图
export function selectCarouselList() {
  return request({
    'url': '/system/device/selectCarouselList',
    'method': 'get',
  })
}

// 使用说明
export function selectInstructionsList() {
  return request({
    'url': '/system/device/selectInstructionsList',
    'method': 'get',
  })
}

// 客服热线
export function contactUsList() {
  return request({
    'url': '/system/device/contactUsList',
    'method': 'get',
  })
}
// /wechat/user/APPLogin
export function APPLogin(data) {
  return request({
    'url': '/wechat/user/APPLogin',
    'method': 'post',
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

//选择科室下拉框
export function selectDepartment(userId) {
  return request({
    'url': '/system/device/selectDepartment/'+userId,
    'method': 'get'
	 // data:{...data}
  })
}


// 账号登录接口
export function loginHospitalPort(data) {
  return request({
    'url': '/wechat/user/loginHospitalPort',
    'method': 'get',
		data:{...data}
  })
}

//个人资料
export function selectPersonalData(userId) {
  return request({
    'url': '/system/device/selectPersonalData/'+userId,
    'method': 'get'
	 // data:{...data}
  })
}
// 个人中心
export function selectPersonalCenter(userId) {
  return request({
    'url': '/system/device/selectPersonalCenter/'+userId,
    'method': 'get'
	 // data:{...data}
  })
}


//查询该医院设备
export function selectDeviceType(userId) {
  return request({
    'url': '/system/device/selectDeviceType/'+userId,
    'method': 'get',
	// data
		// params:{...data}
  })
}

export function maintenanceList() {
  return request({
    'url': '/device/user/maintenance/list',
    'method': 'get'
  })
}

//查询医院设备详情信息
export function selectDeviceTypeDetails(data) {
  return request({
    'url': '/system/device/selectDeviceTypeDetails',
    'method': 'get',
		data:{...data}
  })
}

export function indexPage(userld) {
  return request({
    'url': '/system/device/indexPage/'+userld,
    'method': 'get',
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

//医院端设备详情编辑信息

export function updateDeviceDetails(data) {
  return request({
    'url': '/system/device/updateDeviceDetails',
    'method': 'get',
		data:{...data}
  })
}

//查询商品订单
export function selectGoodsOrder() {
  return request({
    'url': '/system/device/selectGoodsOrder',
    'method': 'get'
  })
}

//陪护床租借订单

export function selectLeaseOrder(data) {
  return request({
    'url': '/system/device/selectLeaseOrder',
	'method': 'get',
		data:{...data}
  })
}
//陪护床租借详情

export function selectLeaseOrderDetails(data) {
  return request({
    'url': '/system/device/selectLeaseOrderDetails',
    'method': 'get',
		data:{...data}
  })
}


//医院营收统计
export function selectRevenueStatistics(data) {
  return request({
    'url': '/system/device/selectRevenueStatistics',
    'method': 'get',
		data:{...data}
  })
}

//查询商品详细信息
export function selectGoodsOrderDetails(data) {
  return request({
    'url': '/system/device/selectGoodsOrderDetails',
    'method': 'get',
		data:{...data}
  })
}


