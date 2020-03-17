/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-04-09 20:38:34
 * @version   v1.0.0
 * filename   InterceptorRouteEnter.js
 * function   路径进入拦截器
 ***************************************************************************/

const com    = require('../../../../lib/com.lz.mevn.namespace/Namespace.js');
const Aspect = require('../../../../lib/com.lz.mevn.architecture.aop/Aspect.js');
const ctx    = require('../../../context.js');
const Utils  = require('../../../../lib/com.lz.mevn.util.utils/Utils.js');

com.lz.mevn.architecture.aop.InterceptorRouterEnter = com.lz.mevn.architecture.aop.Aspect.extend({

    // 类名
    NAME : 'com.lz.mevn.architecture.aop.InterceptorRouterEnter',

    /**
     * @method
     * 构造函数
     *
     * @return {}
     */
    init : function () {
        this._super();
        this.utils = new Utils();
    },

    /**
     * @method
     * home后的全路径进入权限校验
     *
     * @return {}
     */
    doInterceptor : function () {
        return (req, res, next) => {
            // '/home/xxxYyy/wwwUuu'
            let authorityFuncModuleNameArray = req.originalUrl.split('/').slice(2);
            let authorityFuncModuleName = '';
            for (var i = 1; i < authorityFuncModuleNameArray.length; i++) {
                authorityFuncModuleNameArray[i] = authorityFuncModuleNameArray[i].slice(0, 1).toUpperCase() + authorityFuncModuleNameArray[i].slice(1);
            } // 从1号位开始把每个元素首字母变大写
            for (var i = 0; i < authorityFuncModuleNameArray.length; i++) {
                authorityFuncModuleName = authorityFuncModuleName + authorityFuncModuleNameArray[i];
            }
            let permission;
            this.utils.traverseTree(ctx.userinfo.authorityFunc, 'children', (el) => {
                if (el.title === authorityFuncModuleName) {
                    permission = el.authority;
                }
            });
            let passAuthNoneExist = (permission, callback) => {
                (callback)(permission);
            }
            passAuthNoneExist(permission, () => {
                if (permission === undefined || permission === true) {
                    next();
                } else {
                    console.log('No permission. Need higher authority.');
                    res.json({"permission": false});
                }
            });
        }
    }
});

module.exports = com.lz.mevn.architecture.aop.InterceptorRouterEnter;