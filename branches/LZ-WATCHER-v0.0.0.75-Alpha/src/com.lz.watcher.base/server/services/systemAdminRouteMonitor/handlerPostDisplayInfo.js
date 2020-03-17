/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-05-01 21:46:59
 * @version   v1.0.0
 * filename   handlerPostDisplayInfo.js
 * function   提交分页页数和分页项数和搜索值
 ***************************************************************************/

const ctx = require('../../../../context.js');

const handler = {
    doHandler (req, res, next) {
        this.postDisplayInfo(req, res, next);
    },

    postDisplayInfo (req, res, next) {
        ctx.systemAdminRouteMonitorPageNum = req.body.pageNum;
        ctx.systemAdminRouteMonitorPageSize = req.body.pageSize;
        ctx.systemAdminRouteMonitorSearchVal = req.body.searchVal;
        res.json({"process": "success"});
    }
}

module.exports = handler;