/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-05-01 21:30:28
 * @version   v1.0.0
 * filename   handlerUpdatePasswordDefault.js
 * function   更新初始密码
 ***************************************************************************/

const ctx = require('../../../../context.js');
// 模型引入
const system_configs = require('../../models/modelSystemConfig.js');

const handler = {
    doHandler (req, res, next) {
        this.updatePasswordDefault(req, res, next);
    },

    updatePasswordDefault (req, res, next) {
        ctx.systemConfig.base.passwordDefault = req.body.data;
        system_configs.update({'index': 'default'}, { $set: ctx.systemConfig }, (err) => {});
        res.json({"process": "success"});
    }
}

module.exports = handler;