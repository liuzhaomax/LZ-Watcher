/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-03-24 04:26:30
 * @version   v1.0.0
 * filename   Utils.js
 * function   一些方法
 ***************************************************************************/

const com = require('../com.lz.mevn.namespace/Namespace.js');
const _Object = require('../com.lz.mevn.base.core/Object.js');

com.lz.mevn.util.utils.Utils = com.lz.mevn.base.core.Object.extend({

    // 类名
    NAME : 'com.lz.mevn.util.utils.Utils',

    /**
     * @method
     * 构造函数
     *
     * @param  {String} password 处理目标
     * @return {}
     */
    init : function (password) {
        this._super();
    },

    /**
     * @method
     * 深拷贝
     *
     * @param  {AnyType} target 拷贝目标
     * @return {AnyType}        复制对象
     */
    clone : function (target) {
        if (typeof target == "object" && target instanceof Array === false) {
            var ret = {};
        }else if (typeof target == "object" && target instanceof Array === true) {
            var ret = [];
        }
        for (var k in target) {
            if (typeof target[k] == "number" || "boolean" || "string") {
                ret[k] = target[k];
            }else if (typeof target[k] == "object" || "array") {
                ret[k] = clone(target[k]);
            }else {
                ret[k] = target[k];
            }
        }
        return ret;
    },

    /**
     * @method
     * yyyy-mm-dd
     *
     * @param  {Object} date 日期对象
     * @return {String}      yyyy-mm-dd
     */
    formatDate : function (date) {
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        let d = date.getDate();
        m = m < 10 ? ('0' + m) : m;
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
    },

    /**
     * @method
     * yyyy-mm-dd hh:mm:ss
     *
     * @param  {Object} date 日期对象
     * @return {String}      yyyy-mm-dd hh:mm:ss
     */
    formatDateTime : function (date) {
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        let d = date.getDate();
        let h = date.getHours();
        let mm = date.getMinutes();
        let s = date.getSeconds();
        m = m < 10 ? ('0' + m) : m;
        d = d < 10 ? ('0' + d) : d;
        h = h < 10 ? ('0' + h) : h;
        mm = mm < 10 ? ('0' + mm) : mm;
        s = s < 10 ? ('0' + s) : s;
        return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
    },

    /**
     * @method
     * 遍历Tree
     *
     * @param  {Objcet}   target   Tree数组
     * @param  {String}   children Tree数组元素对象中，子Tree的键名
     * @param  {Function} callback 回调操作
     * @return {}
     */
    traverseTree : function (target, children, callback) {
        if (!target instanceof Array) return;
        let _this = this;
        target.forEach(function (e) {
            (callback)(e);
            if (e[children]) {
                _this.traverseTree(e[children], children, callback);
            }
        });
    }
});

module.exports = com.lz.mevn.util.utils.Utils;