module.exports = {
  /**
   * 根据id获取记录
   * @url common/product/pub/getDetail 前端调用的url参数地址
   * data 请求参数 说明
   * res 返回参数说明
   * @params {Number} code 错误码，0表示成功
   * @params {String} msg 详细信息
   */
  main: async (event) => {
		let { data = {}, userInfo, util, originalParam } = event;
		let { uniID, pubFun, vk , db, _ } = util;
		let { uid } = data;
		let res = { code : 0, msg : 'ok' };
    // 业务逻辑开始-----------------------------------------------------------
		res.item = await vk.baseDao.findById({
			dbName:"zcb-product",
			id:data._id,
		});
    // 业务逻辑结束-----------------------------------------------------------
    return res;
  }

}
