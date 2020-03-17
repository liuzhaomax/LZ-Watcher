/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-05-01 21:52:21
 * @version   v1.0.0
 * filename   handlerGetOpLog.js
 * function   获取操作日志数据
 ***************************************************************************/

const ctx = require('../../../../context.js');
// 模型引入
const system_admin_op_logs = require('../../models/modelSystemAdminOpLog.js');

const handler = {
    doHandler (req, res, next) {
        this.getOpLog(req, res, next);
    },

    getOpLog (req, res, next) {
        let searchObj = {}
        if (ctx.systemAdminOpLogSearchVal) {
            searchObj = {username: ctx.systemAdminOpLogSearchVal}
        }
        system_admin_op_logs.find(searchObj)
            .sort({'_id': -1})
            .skip((ctx.systemAdminOpLogPageNum - 1) * ctx.systemAdminOpLogPageSize)
            .limit(ctx.systemAdminOpLogPageSize)
            .exec((err, doc) => {
            ctx.systemAdminOpLog = doc;
            res.json({"systemAdminOpLog": ctx.systemAdminOpLog});
        });
    }
}

module.exports = handler;