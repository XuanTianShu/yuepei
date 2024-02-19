import request from '@/utils/request'

// 登录
export function login(code,sysUser) {
  return request({
    'url': '/wechat/user/login',
    'method': 'post',
		params:{code},
		data:{...sysUser}
  })
}


// 获取用户详细信息
export function getInfo() {
  return request({
    'url': '/getInfo',
    'method': 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    'url': '/logout',
    'method': 'post'
  })
}

// 获取验证码
export function getCodeImg() {
  return request({
    'url': '/captchaImage',
    headers: {
      isToken: false
    },
    method: 'get',
    timeout: 20000
  })
}
