import store from '@/store'
import config from '@/config'
import { getToken } from '@/utils/auth'
import errorCode from '@/utils/errorCode'
import { toast, showConfirm, tansParams } from '@/utils/common'

let timeout = 10000
const baseUrl = config.baseUrl
const regChina = /^[\u4e00-\u9fa5\s\·\~\！\@\#\￥\%\……\&\*\（\）\——\-\+\=\【\】\{\}\、\|\；\‘\’\：\“\”\《\》\？\，\。\、]+$/;
const request = config => {
	// console.log('config：',config)
  // 是否需要设置 token
  const isToken = (config.headers || {}).isToken === false
  config.header = config.header || {}
  if (getToken() && !isToken) {
    config.header['Authorization'] = 'Bearer ' + getToken()
  }
  // get请求映射params参数
  if (config.params) {
    let url = config.url + '?' + tansParams(config.params)
    url = url.slice(0, -1)
    config.url = url
	
  }
  return new Promise((resolve, reject) => {
    uni.request({
        method: config.method || 'get',
        timeout: config.timeout ||  timeout,
        url: config.baseUrl || baseUrl + config.url,
        data: config.data,
        header: config.header,
        dataType: 'json'
      }).then(response => {
        let [error, res] = response
        if (error) {
          toast('后端接口连接异常')
          reject('后端接口连接异常')
          return
        }
        const code = res.data.code || 200
        const msg = errorCode[code] || res.data.msg || errorCode['default']
        if (code === 401) {
          // showConfirm('登录状态已过期，您可以继续留在该页面，或者重新登录?').then(res => {
          showConfirm('无权访问，您可以继续留在该页面，或者回到登录页').then(res => {
            if (res.confirm) {
              store.dispatch('LogOut').then(res => {
                uni.reLaunch({ url: '/pages/nursingBed/login/login' })
              })
            }
          })
          reject('无效的会话，或者会话已过期，请重新登录。')
        } else if (code === 500) {
			 
			 if(regChina.test(msg)){
				 toast(msg)
			 }else{
				 toast('状态异常,'+code)
				 reject(code)
			 }
		  console.log('接口报500,',response)
        } else if (code !== 200) {
			if(regChina.test(msg)){
				toast(msg)
			}else{
				toast('状态异常,'+code)
			}
		  console.log('异常状态返回',code,msg)
          reject(code)
        }
        resolve(res.data)
      })
      .catch(error => {
        let { message } = error
        if (message === 'Network Error') {
					////console.log('后端接口连接异常',res.data.code)
          message = '后端接口连接异常'
        } else if (message.includes('timeout')) {
					////console.log('系统接口请求超时',res.data.code)
          message = '系统接口请求超时'
        } else if (message.includes('Request failed with status code')) {
					////console.log('系统接口'+ message.substr(message.length - 3) + '异常')
          message = '系统接口' + message.substr(message.length - 3) + '异常'
        }
        toast('程序正在维护')
				console.log('error',error)
        reject(error)
      })
  })
}

export default request
