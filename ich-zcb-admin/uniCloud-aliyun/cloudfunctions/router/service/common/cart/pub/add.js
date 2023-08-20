module.exports = {
  /**
   * 添加单条数据
   * @url common/cart/pub/add 前端调用的url参数地址
   * data 请求参数 说明
   * res 返回参数说明
   * @params {Number} code 错误码，0表示成功
   * @params {String} msg 详细信息
   */
  main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk , db, _ } = util;
		let { uid } = data;
		let res = { code : 0, msg : 'ok' };
    // 业务逻辑开始-----------------------------------------------------------
		let {
			productId,
			productNum
		} = data;
		if(!uid) {
			return { code : -1, msg : '用户未登录' }
		}
		if(!productId || !productNum) {
			return { code : -1, msg : '商品和商品数量有误' }
		}
		let dbName = "zcb-cart";
		let info = await vk.baseDao.findByWhereJson({
			dbName,
			whereJson:{
				uid,
				product_id: productId
			}
		})
		if(info) {
			productNum = productNum + info.product_num
			let updateInfo = await vk.baseDao.updateById({
				dbName,
				id:info._id,
				dataJson:{					
					product_num:productNum
				},
				// 去掉getUpdateData，则不会返回修改后的数据对象
				getUpdateDate: true
			})
			res.id = updateInfo._id
		} else {
			res.id = await vk.baseDao.add({
				dbName,
				dataJson:{				
					product_id: productId,
					product_num:productNum,
					uid
				}
			});
		}
    // 业务逻辑结束-----------------------------------------------------------
    return res;
  }
}
