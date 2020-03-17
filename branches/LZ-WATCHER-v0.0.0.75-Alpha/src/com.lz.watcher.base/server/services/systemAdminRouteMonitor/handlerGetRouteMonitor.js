/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-05-01 21:48:53
 * @version   v1.0.0
 * filename   handlerGetRouteMonitor.js
 * function   获取路径监控数据
 ***************************************************************************/

const ctx = require('../../../../context.js');
// 模型引入
const system_admin_route_monitors = require('../../models/modelSystemAdminRouteMonitor.js');

const handler = {
    doHandler (req, res, next) {
        this.getRouteMonitor(req, res, next);
    },

    getRouteMonitor (req, res, next) {
        let searchObj = {}
        if (ctx.systemAdminRouteMonitorSearchVal) {
            searchObj = {uri: ctx.systemAdminRouteMonitorSearchVal}
        }
        system_admin_route_monitors.find(searchObj)
            .sort({'_id': -1})
            .skip((ctx.systemAdminRouteMonitorPageNum - 1) * ctx.systemAdminRouteMonitorPageSize)
            .limit(ctx.systemAdminRouteMonitorPageSize)
            .exec((err, doc) => {
            ctx.systemAdminRouteMonitor = doc;
            res.json({"systemAdminRouteMonitor": ctx.systemAdminRouteMonitor});
        });
    }
}

module.exports = handler;