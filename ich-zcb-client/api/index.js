import API_CONFIG from './config.js'

const getApiObj = (config) => {
	const apiObj = {}
	for(let key in config) {
		apiObj[key] = async (data,isLoading=true)=>{
			const options = {
				url:config[key][0],
				data
			}
			if(isLoading) {
				options.title = '数据加载中'
			}
			const res = await vk.callFunction(options)
			return res
		}	
	}
	return apiObj
}

export default getApiObj(API_CONFIG)