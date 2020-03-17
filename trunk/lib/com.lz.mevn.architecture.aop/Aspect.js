/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2018-09-16 17:58:21
 * @version   v1.0.0
 * filename   Aspect.js
 * function   AOP方法
 ***************************************************************************/

const com = require('../com.lz.mevn.namespace/Namespace.js');
const _Object = require('../com.lz.mevn.base.core/Object.js');

com.lz.mevn.architecture.aop.Aspect = com.lz.mevn.base.core.Object.extend({

    // 类名
    NAME : 'com.lz.mevn.architecture.aop.Aspect',

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
     * 在方法调用前执行回调函数
     *
     * @param  {Object}   target 切点对象
     * @param  {String}   method 切点方法
     * @param  {Function} advice 回调函数
     * @return {Object}          切点对象
     */
    before : function (target, method, advice) {
        if (!!target[method]) {
            var origin = target[method];
            target[method] = function () {
                (advice)();
                origin.apply(target, arguments);
            }
        } else {
            throw "No given method in given target object.";
        }
        return target;
    },

    /**
     * @method
     * 在方法调用后执行回调函数
     *
     * @param  {Object}   target 切点对象
     * @param  {String}   method 切点方法
     * @param  {Function} advice 回调函数
     * @return {Object}          切点对象
     */
    after : function (target, method, advice) {
        if (!!target[method]) {
            var origin = target[method];
            target[method] = function () {
                origin.apply(target, arguments);
                (advice)();
            }
        } else {
            throw "No given method in given target object.";
        }
        return target;
    },

    /**
     * @method
     * 在方法调用前后执行回调函数
     *
     * @param  {Object}   target 切点对象
     * @param  {String}   method 切点方法
     * @param  {Function} advice 回调函数
     * @return {Object}          切点对象
     */
    around : function (target, method, advice) {
        if (!!target[method]) {
            var origin = target[method];
            target[method] = function () {
                (advice)();
                origin.apply(target, arguments);
                (advice)();
            }
        } else {
            throw "No given method in given target object.";
        }
        return target;
    }
});

module.exports = com.lz.mevn.architecture.aop.Aspect;