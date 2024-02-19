<script>
  import config from './config'
  import store from '@/store'
  import { getToken } from '@/utils/auth'

  export default {
    onLaunch: function() {
      this.initApp()
    },
    methods: {
      // 初始化应用
      initApp() {
        // 初始化应用配置
        this.initConfig()
        // 检查用户登录状态
        //#ifdef MP-WEIXIN
        this.checkLogin()
        //#endif
      },
      initConfig() {
        this.globalData.config = config
      },
      checkLogin() {
        if (!getToken()) {
					let _this = this
					setTimeout(()=>{
						_this.$tab.reLaunch('/pages/nursingBed/login/login') 
					},500)
        }
      }
    }
  }
</script>

<style lang="scss">
	@import "@/uni_modules/uview-ui/index.scss";
  @import '@/static/scss/index.scss';
	uni-page-body,html,body{  
	            height: 100%;  
	        }
	
</style>
