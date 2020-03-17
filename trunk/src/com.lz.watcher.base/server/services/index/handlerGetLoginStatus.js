/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-05-01 22:01:59
 * @version   v1.0.0
 * filename   handlerGetLoginStatus.js
 * function   获取登录状态
 ***************************************************************************/

const handler = {
    doHandler (req, res, next) {
        this.getLoginStatus(req, res, next);
    },

    getLoginStatus (req, res, next) {
        if (req.session.userinfo) {
            res.json({"permission": true});
        } else {
            res.json({"permission": false});
        }
    }
}

module.exports = handler;