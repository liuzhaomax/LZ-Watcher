/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-03-17 01:02:10
 * @version   v1.0.0
 * filename   InterceptorLoginStatus.js
 * function   登录状态校验
 ***************************************************************************/

const com = require('../../../../lib/com.lz.mevn.namespace/Namespace.js');
const Aspect = require('../../../../lib/com.lz.mevn.architecture.aop/Aspect.js');
const path = require('path');
const ctx = require('../../../context.js');

com.lz.mevn.architecture.aop.InterceptorLoginStatus = com.lz.mevn.architecture.aop.Aspect.extend({

    // 类名
    NAME : 'com.lz.mevn.architecture.aop.InterceptorLoginStatus',

    /**
     * @method
     * 构造函数
     *
     * @return {}
     */
    init : function () {
        this._super();
    },

    /**
     * @method
     * 登录状态校验 ---- / 为根路径
     *
     * @return {}
     */
    doInterceptor : function () {
        return (req, res, next) => {
            if (!!req.session.userinfo && ctx.userinfo.activation) {
                ctx.session.reqTimes++;
                next();
            } else if (req.url === '/' && req.method === 'POST') {
                next(); // 只对login例外
            } else if (res.statusCode === 500) {
                req.session.destroy();
                res.clearCookie('SESSIONID');
                console.log('System crashed.');
                res.sendFile(path.join(__dirname, '../../../../', 'index.html'));
            } else {
                console.log('No permission. Need login first.');
                res.sendFile(path.join(__dirname, '../../../../', 'index.html'));
            }
        }
    }
});

module.exports = com.lz.mevn.architecture.aop.InterceptorLoginStatus;