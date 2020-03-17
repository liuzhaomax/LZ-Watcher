/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-05-01 21:38:20
 * @version   v1.0.0
 * filename   handlerGetSessionMonitor.js
 * function   获取会话监控数据
 ***************************************************************************/

const ctx = require('../../../../context.js');
// 模型引入
const system_admin_session_monitors = require('../../models/modelSystemAdminSessionMonitor.js');

const handler = {
    doHandler (req, res, next) {
        this.getSessionMonitor(req, res, next);
    },

    getSessionMonitor (req, res, next) {
        let searchObj = {}
        if (ctx.systemAdminSessionMonitorSearchVal) {
            searchObj = {username: ctx.systemAdminSessionMonitorSearchVal}
        }
        system_admin_session_monitors.find(searchObj)
            .sort({'_id': -1})
            .skip((ctx.systemAdminSessionMonitorPageNum - 1) * ctx.systemAdminSessionMonitorPageSize)
            .limit(ctx.systemAdminSessionMonitorPageSize)
            .exec((err, doc) => {
            ctx.systemAdminSessionMonitor = doc;
            res.json({"systemAdminSessionMonitor": ctx.systemAdminSessionMonitor});
        });
    }
}

module.exports = handler;