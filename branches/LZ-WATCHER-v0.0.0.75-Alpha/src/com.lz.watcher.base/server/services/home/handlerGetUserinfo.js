/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-05-01 22:23:24
 * @version   v1.0.0
 * filename   handlerGetUserinfo.js
 * function   获取个人资料
 ***************************************************************************/

const ctx = require('../../../../context.js');
// 模型引入
const Utils = require('../../../../../lib/com.lz.mevn.util.utils/Utils.js');
const utils = new Utils();

const handler = {
    doHandler (req, res, next) {
        this.getUserinfo(req, res, next);
    },

    getUserinfo (req, res, next) {
        let userinfo = utils.clone(ctx.userinfo);
        res.json({"userinfo": userinfo});
    }
}

module.exports = handler;