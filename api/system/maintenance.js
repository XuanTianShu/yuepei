import upload from '@/utils/upload'
import request from '@/utils/request'

// 运维端

// 首页
export function homelist() {
  return request({
    'url': '/wechat/user/maintenance/home/list',
	// 'url': '/wechat/user/order/weChatWithdrawal2',
    'method': 'get'
		// params:{...data}
  })
}
// 设备缺货
export function homestock(data) {
  return request({
    'url': '/wechat/user/maintenance/home/stock',
	// 'url': '/wechat/user/order/weChatWithdrawal2',
    'method': 'get',
		data:{...data}
  })
}

// 设备故障
export function malfunction(data) {
  return request({
    'url': '/wechat/user/maintenance/home/malfunction',
    'method': 'get',
		data:{...data}
  })
}


// 填写维修记录
export function insertMaintenanceRecord(data) {
  return request({
    'url': '/wechat/user/maintenance/home/insertMaintenanceRecord',
    'method': 'post',
		data:{...data}
  })
}


// 租借订单列表
export function leaseDeviceList(data) {
  return request({
    'url': '/wechat/user/maintenance/home/leaseDeviceList',
    'method': 'get',
		data:{...data}
  })
}


// 设备详情
export function leaseDeviceDetails(data) {
  return request({
    'url': '/wechat/user/maintenance/home/leaseDeviceDetails',
    'method': 'get',
		data:{...data}
  })
}

// 测试设备流程扫码
export function testDevice(data) {
  return request({
    'url': '/wechat/user/maintenance/home/testDevice',
    'method': 'get',
		data:{...data}
  })
}



// 一拖五设备开锁专用(deviceTypeId为4和5)
export function unlocking(data) {
  return request({
    'url': '/wechat/user/maintenance/home/unlocking',
    'method': 'post',
		data:{...data}
  })
}


// 一拖五设备开锁专用(deviceTypeId为4和5)
export function getfaultDetail(feedbackId) {
  return request({
    'url': '/wechat/user/maintenance/home/getDetail/'+feedbackId,
    'method': 'get',
		// data:{...data}
  })
}
// http://192.168.2.35:8005/wechat/user/maintenance/home/getDetail/{feedbackId}