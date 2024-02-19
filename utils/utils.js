import config from '@/config.js'

function disabledClick(methods,data){
	let that =this
	if(that.noClick){
		that.noClick=false
		if(data){
			methods(data)
		}else{
			methods()
		}
		setTimeout(()=>{
			that.noClick= true;
		},2000)
	}
}



async function uploadImg(path,callback){
			wx.uploadFile({
			header:{
				'content-type':'multipart/form-data'
			},
			method: 'POST',
			url: config.baseUrl+'/common/upload', 
			filePath: path,
			name: 'file',
			success: await function(res){
				let  data=JSON.parse(res.data)
				console.log('上传图片成功',data.url)
				return data.url
			},
			fail: await function(realut){
				console.log('uploadFile fail',realut);
				that.$modal.msgError("图片上传失败");
			},
		})
}


export default{
	disabledClick,
	uploadImg
}