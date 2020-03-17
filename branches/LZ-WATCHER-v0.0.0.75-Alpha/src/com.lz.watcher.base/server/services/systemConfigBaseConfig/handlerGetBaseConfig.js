/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-05-01 21:27:31
 * @version   v1.0.0
 * filename   handlerGetBaseConfig.js
 * function   获取基础设置
 ***************************************************************************/

const ctx = require('../../../../context.js');
// 模型引入
const system_configs = require('../../models/modelSystemConfig.js');

const handler = {
    doHandler (req, res, next) {
        this.getBaseConfig(req, res, next);
    },

    getBaseConfig (req, res, next) {
        system_configs.find({'index': 'default'}, (err, doc) => {
            ctx.systemConfig = doc[0]['_doc'];
            res.json({"systemConfigBaseConfig": ctx.systemConfig.base});
        });
    }
}

module.exports = handler;