/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-05-01 22:05:06
 * @version   v1.0.0
 * filename   handlerGetSystemTitle.js
 * function   获取系统名称
 ***************************************************************************/

const ctx = require('../../../../context.js');
// 模型引入
const system_configs = require('../../models/modelSystemConfig.js');

const handler = {
    doHandler (req, res, next) {
        this.getSystemTitle(req, res, next);
    },

    getSystemTitle (req, res, next) {
        system_configs.find({'index': 'default'}, (err, doc) => {
            ctx.systemConfig = doc[0]['_doc'];
            res.json({"systemTitle": ctx.systemConfig.base.systemTitle});
        });
    }
}

module.exports = handler;