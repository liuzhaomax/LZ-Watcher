/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-04-28 22:22:34
 * @version   v1.0.0
 * filename   handlerSearchInfo.js
 * function   处理提交的搜索信息
 ***************************************************************************/

const ctx = require('../../../../context.js');

const handler = {
    doHandler (req, res, next) {
        ctx.userAdminAccountAdminSearchItem = req.body.searchItem;
        ctx.userAdminAccountAdminSearchVal = req.body.searchVal;
        res.json({"process": "success"});
    }
}

module.exports = handler;