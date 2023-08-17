const apiObj = {
	//方法名：具体的方法
	//获取轮播图的api
	getSwipperList: async (data,isLoading=true)=>{
		const options = {
			url:'common/swipper/pub/getList',
			data
		}
		if(isLoading) {
			options.title = '数据加载中'
		}
		const res = await vk.callFunction(options)
		return res
	}	
}
export default apiObj