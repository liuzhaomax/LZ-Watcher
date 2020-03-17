/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-05-01 22:21:24
 * @version   v1.0.0
 * filename   handlerGetRealName.js
 * function   获取真实姓名
 ***************************************************************************/

const ctx = require('../../../../context.js');

const handler = {
    doHandler (req, res, next) {
        this.getRealName(req, res, next);
    },

    getRealName (req, res, next) {
        res.json({"realname": ctx.userinfo.realname});
    }
}

module.exports = handler;