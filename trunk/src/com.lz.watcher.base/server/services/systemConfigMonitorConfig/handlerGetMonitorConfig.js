/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-05-01 21:07:54
 * @version   v1.0.0
 * filename   handlerGetMonitorConfig.js
 * function   获取监控设置数据
 ***************************************************************************/

const ctx = require('../../../../context.js');
// 模型引入
const system_configs = require('../../models/modelSystemConfig.js');

const handler = {
    doHandler (req, res, next) {
        this.getMonitorConfig(req, res, next);
    },

    getMonitorConfig (req, res, next) {
        system_configs.find({'index': 'default'}, (err, doc) => {
            ctx.systemConfig = doc[0]['_doc'];
            res.json({"systemConfigMonitorConfig": ctx.systemConfig.monitor});
        });
    }
}

module.exports = handler;