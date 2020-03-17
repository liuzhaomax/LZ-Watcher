/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-05-01 21:51:15
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
        ctx.systemAdminOpLogPageNum = req.body.pageNum;
        ctx.systemAdminOpLogPageSize = req.body.pageSize;
        ctx.systemAdminOpLogSearchVal = req.body.searchVal;
        res.json({"process": "success"});
    }
}

module.exports = handler;