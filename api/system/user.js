import request from '@/utils/request'




// -------------------------------------
//投资人首页
export function investorLeaseOrderDetails(data) {
  return request({
    'url': '/wechat/user/investor/device/investorLeaseOrderDetails',
    'method': 'get',
	params:{...data}
  })
}
export function investorHome(data) {
  return request({
    'url': '/wechat/user/investor/device/indexPage',
    'method': 'get',
	params:{...data}
  })
}
export function selectHospitalName() {
  return request({
    'url': '/wechat/user/investor/device/selectHospitalName',
    'method': 'get'
  })
}
// 分成比例
export function investorSelectProportion() {
  return request({
    'url': '/wechat/user/investor/device/selectProportion',
    'method': 'get'
  })
}
//营收统计
export function selectRevenueStatistics(data) {
  return request({
    'url': '/wechat/user/investor/device/selectRevenueStatistics',
    'method': 'get',
	 params:{...data}
  })
}
//设备信息 
export function selectDeviceType() {
  return request({
    'url': '/wechat/user/investor/device/selectDeviceType',
    'method': 'get'
  })
}
//设备管理
export function investorDeviceManage(data) {
  return request({
    'url': '/wechat/user/investor/device/investorDeviceManage',
    'method': 'get',
	 params:{...data}
  })
}
export function selectDeviceTypeByHospital(data) {
  return request({
    'url': '/wechat/user/investor/device/selectDeviceTypeByHospital',
    'method': 'get',
	params:{...data}
  })
}
//个人中心 资金
export function investorPersonalCenter() {
  return request({
    'url': '/wechat/user/investor/device/investorPersonalCenter',
    'method': 'get'
  })
}
//订单 
export function investorLeaseOrder(data) {
  return request({
    'url': '/wechat/user/investor/device/investorLeaseOrder',
    'method': 'get',
	 params:{...data}
  })
}
// -------------------------------------
//上传电量
export function setElectric(data) {
  return request({
    'url': '/wechat/user/lease',
    'method': 'put',
		params:{...data}
  })
}
//故障申报详情 
export function selectFaultFeedbackList(data) {
  return request({
    'url': '/wechat/user/feedback/selectFaultFeedbackList',
    'method': 'get',
		params:{...data}
  })
}
// 下拉框
export function selectDepartment() {
  return request({
    'url': '/wechat/user/investor/device/selectDepartment',
    'method': 'get'
  })
}
//查看保险合作 
export function selectByUserId() {
  return request({
    'url': '/wechat/user/insurance/selectByUserId',
    'method': 'get'
  })
}

// //查看病例 
export function selectUserCaseByUserId() {
  return request({
    'url': '/wechat/user/case/selectUserCaseByUserId',
    'method': 'get'
  })
}

//使用说明
export function selectVideo() {
  return request({
    'url': '/wechat/user/management/list',
    'method': 'get'
  })
}
// 温馨提示
export function getPoint() {
  return request({
    'url': '/wechat/user/warmPrompt/list',
    'method': 'get'
  })
}
// -----------------------------------------------
//余额详细
export function selectUserBalanceList(data) {
  return request({
    'url': '/wechat/user/balance/selectUserBalanceList',
    'method': 'get',
		params:{...data}
  })
}

//积分详细
export function selectIntegralList(data) {
  return request({
    'url': '/wechat/user/integral/selectIntegralList',
    'method': 'get',
		params:{...data}
  })
}

//押金详细
export function selectUserDepositInfo(data) {
  return request({
    'url': '/wechat/user/deposit/selectUserDepositInfo',
    'method': 'get',
		params:{...data}
  })
}

//我的余额
export function selectUserBalance(sysUser) {
  return request({
    'url': '/wechat/user/pay/selectUserBalance',
    'method': 'get'
  })
}

//选择金额支付
export function selectPayType() {
  return request({
    'url': '/wechat/user/pay/selectPayType',
    'method': 'get'
  })
}

//获取兑换券
export function selectCouponList(data) {
  return request({
    'url': '/wechat/user/discount/list',
    'method': 'get',
	params:{...data}
  })
}


//购买优惠券
export function insertUserCoupon(data) {
  return request({
    'url': '/wechat/user/coupon/insertUserCoupon',
    'method': 'post',
		data:{...data}
  })
}

//兑换兑换券
export function assignUser(data) {
  return request({
    'url': '/wechat/user/jyb/assignUser',
    'method': 'post',
		params:{...data}
  })
}

//旧	用户所属优惠券
export function selectUserCoupon(data) {
  return request({
    'url': '/wechat/user/coupon/selectUserCoupon',
    'method': 'get',
		params:{...data}
  })
}

//新 用户所属优惠券
export function selectMyDiscountByOpenId(data) {
  return request({
    'url': '/system/userDiscount/selectMyDiscountByOpenId',
    'method': 'post',
		params:{...data}
  })
}

//获取个人信息
export function selectUserData() {
  return request({
    'url': '/wechat/user/info/selectUserData',
    'method': 'get'
  })
}

//发送验证码
export function getCode(data) {
  return request({
    'url': '/wechat/user/info/getCode',
    'method': 'post',
		params:{...data}
  })
}

//修改手机号
export function updateUserPhoneNumber(data) {
  return request({
    'url': '/wechat/user/info/updateUserPhoneNumber',
    'method': 'get',
		params:{...data}
  })
}

//关于我们
export function aboutUsList() {
  return request({
    'url': '/wechat/user/us/aboutUsList',
    'method': 'get'
  })
}

//康养知识
export function selectHealthProblemList() {
  return request({
    'url': '/wechat/user/faq/selectHealthProblemList',
    'method': 'get'
  })
}
//医疗字典
export function selectMedicalProblem() {
  return request({
    'url': '/wechat/user/faq/selectMedicalProblem',
    'method': 'get'
  })
}

//用户协议
export function compactList() {
  return request({
    'url': '/wechat/user/us/compactList',
    'method': 'get'
  })
}

//常见问题
export function selectCommonProblemList() {
  return request({
    'url': '/wechat/user/faq/selectCommonProblemList',
    'method': 'get'
  })
}

//客服电话
export function contactUsList() {
  return request({
    'url': '/wechat/user/us/contactUsList',
    'method': 'get'
  })
}

//充值预支付订单
export function payPrepaymentOrder(data) {
  return request({
    'url': '/wechat/user/order/payPrepaymentOrder',
    'method': 'post',
		params:{...data}
  })
}

//押金预支付订单
export function depositPrepaymentOrder(data) {
  return request({
    'url': '/wechat/user/order/depositPrepaymentOrder',
    'method': 'post',
		params:{...data}
  })
}

//租借预支付订单
export function paymentPrepaymentOrder(params,data) {
  return request({
    'url': '/wechat/user/order/paymentPrepaymentOrder',
    'method': 'post',
		params:{...params},
		data:{...data}
  })
}



//余额支付
export function balancePrepaymentOrder(params,data) {
  return request({
    'url': '/wechat/user/order/balancePrepaymentOrder',
    'method': 'post',
		params:{...params},
		data:{...data}
  })
}

//退押金
export function userDepositRefund() {
  return request({
    'url': '/wechat/user/refund/userDepositRefund',
    'method': 'post'
  })
}


//查看押金明细
export function selectUserDepositDetailInfo(data) {
  return request({
    'url': '/wechat/user/deposit/selectUserDepositDetailInfo',
    'method': 'get',
  params:{...data}
  })
}

//扫码开锁
export function ewmInLock(data) {
  return request({
    'url': '/wechat/user/lock/ewmInLock',
    'method': 'get',
		params:{...data},
  })
}

//故障反馈
export function insertFaultFeedback(data) {
  return request({
    'url': '/wechat/user/feedback/insertFaultFeedback',
    'method': 'post',
		data:{...data}
  })
}

//合作加盟
export function insertJoinIn(data) {
  return request({
    'url': '/wechat/user/join/insertJoinIn',
    'method': 'post',
		data:{...data}
  })
}

//加盟列表
export function selectJoinInList(data) {
  return request({
    'url': '/wechat/user/join/selectJoinInList',
    'method': 'get',
		data:{...data}
  })
}

//我的订单
export function userLeaseOrder(data) {
  return request({
    'url': '/wechat/user/lease/userLeaseOrder',
    'method': 'get',
		params:{...data}
  })
}

export function checkLeaseOrder(data){
	return request({
		'url': '/wechat/user/lease/checkLeaseOrder',
		'method': 'get',
			params:{...data}
	})
}

//新增订单
export function insertUserLeaseOrder(params,data) {
  return request({
    'url': '/wechat/user/lease/insertUserLeaseOrder',
    'method': 'post',
		params:{...params},
		data:{...data}
  })
}

//关锁还单
export function updateLeaseOrderStatus(params,data) {
  return request({
    'url': '/wechat/user/lease/updateLeaseOrderStatus',
    'method': 'post',
		params:{...params},
		data:{...data}
  })
}

//轮播图
export function selectCarouselList() {
  return request({
    'url': '/wechat/user/carousel/selectCarouselList',
    'method': 'get'
  })
}

//使用说明
export function selectInstructionsList() {
  return request({
    'url': '/wechat/user/instructions/selectInstructionsList',
    'method': 'get'
  })
}

//新增或修改我的病例
export function insertUserCase(data) {
  return request({
    'url': '/wechat/user/case/insertUserCase',
    'method': 'post',
		data:{...data}
  })
}
// wechat/user/insurance/selectByUserId
//新增或修改我的保险
export function insertUserInsurance(data) {
  return request({
    'url': '/wechat/user/insurance/insertUserInsurance',
    'method': 'post',
		data:{...data}
  })
}


// 用户密码重置
export function updateUserPwd(oldPassword, newPassword) {
  const data = {
    oldPassword,
    newPassword
  }
  return request({
    url: '/system/user/profile/updatePwd',
    method: 'put',
    params: data
  })
}

// 查询用户个人信息
export function getUserProfile() {
  return request({
    url: '/wechat/user/profile',
    method: 'get'
  })
}

// 修改用户个人信息
export function updateUserProfile(data) {
  return request({
    url: '/wechat/user/profile',
    method: 'put',
    data: data
  })
}

// 用户头像上传
export function uploadAvatar(data) {
  return upload({
    url: '/system/user/profile/avatar',
    name: data.name,
    filePath: data.filePath
  })
}
