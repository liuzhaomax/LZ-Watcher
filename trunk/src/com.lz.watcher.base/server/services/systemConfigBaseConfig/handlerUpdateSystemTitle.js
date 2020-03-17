/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-05-01 21:29:30
 * @version   v1.0.0
 * filename   handlerUpdateSystemTitle.js
 * function   更新系统名称
 ***************************************************************************/

const ctx = require('../../../../context.js');
// 模型引入
const system_configs = require('../../models/modelSystemConfig.js');

const handler = {
    doHandler (req, res, next) {
        this.updateSystemTitle(req, res, next);
    },

    updateSystemTitle (req, res, next) {
        ctx.systemConfig.base.systemTitle = req.body.data;
        system_configs.update({'index': 'default'}, { $set: ctx.systemConfig }, (err) => {});
        res.json({"process": "success"});
    }
}

module.exports = handler;