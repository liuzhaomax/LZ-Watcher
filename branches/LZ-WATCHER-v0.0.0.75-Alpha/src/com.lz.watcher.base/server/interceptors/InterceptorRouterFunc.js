/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-04-09 21:17:38
 * @version   v1.0.0
 * filename   InterceptorRouterFunc.js
 * function   路由方法拦截器
 ***************************************************************************/

const com    = require('../../../../lib/com.lz.mevn.namespace/Namespace.js');
const Aspect = require('../../../../lib/com.lz.mevn.architecture.aop/Aspect.js');
const ctx    = require('../../../context.js');
const Utils  = require('../../../../lib/com.lz.mevn.util.utils/Utils.js');

com.lz.mevn.architecture.aop.InterceptorRouterFunc = com.lz.mevn.architecture.aop.Aspect.extend({

    // 类名
    NAME : 'com.lz.mevn.architecture.aop.InterceptorRouterFunc',

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
     * 路由方法权限校验
     *
     * @param  {String} authorityFuncModuleName 功能权限模块名称
     * @return {}
     */
    doInterceptor : function (authorityFuncModuleName) {
        return (req, res, next) => {
            let authorityFuncName = '';
            switch (req.method) {
                case 'GET':
                    authorityFuncName = 'read';
                    break;
                case 'POST':
                    authorityFuncName = 'create';
                    break;
                case 'PUT':
                    authorityFuncName = 'update';
                    break;
                case 'PATCH':
                    authorityFuncName = 'update';
                    break;
                case 'DELETE':
                    authorityFuncName = 'delete';
                    break;
                default:
                    authorityFuncName = 'read';
            }

            let permission;
            this.utils.traverseTree(ctx.userinfo.authorityFunc, 'children', (el) => {
                if (el.title === authorityFuncModuleName) {
                    this.utils.traverseTree(el.children, 'children', (ele) => {
                        if (ele.title === authorityFuncName) {
                            permission = ele.authority;
                        }
                    });
                }
            });
            let passAuthNoneExist = (permission, callback) => {
                (callback)(permission);
            }
            passAuthNoneExist(permission, () => {
                if (permission === true) {
                    next();
                } else {
                    console.log('No permission. Need authority.');
                    res.json({"permission": false});
                }
            });
        }
    }
});

module.exports = com.lz.mevn.architecture.aop.InterceptorRouterFunc;