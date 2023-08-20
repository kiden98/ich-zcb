import api from '@/api'
export function pageTo(path){
	vk.navigateTo(path);
}

//异步的方法
export async function addCart(productId,productNum) {
	//没有登录的话，需要跳转到登录页面
	if(!vk.checkToken()) {
		vk.navigateTo('/pages/me/me')
		return
	} else {
		await api.addCart({
			productId,
			productNum
		})
		vk.toast("添加成功","success")
	}
}