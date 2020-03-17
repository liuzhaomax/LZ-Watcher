/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-05-01 22:03:25
 * @version   v1.0.0
 * filename   handlerDeleteLoginStatus.js
 * function   注销登录状态
 ***************************************************************************/

const ctx   = require('../../../../context.js');
const Utils = require('../../../../../lib/com.lz.mevn.util.utils/Utils.js');
const utils = new Utils();

const handler = {
    doHandler (req, res, next) {
        this.deleteLoginStatus(req, res, next);
    },

    deleteLoginStatus (req, res, next) {
        req.session.destroy();
        res.clearCookie('SESSIONID');
        let date = new Date();
        ctx.session.destroyTime = utils.formatDateTime(date);
        res.json({"permission": false});
    }
}

module.exports = handler;