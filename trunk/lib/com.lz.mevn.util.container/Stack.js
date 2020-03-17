/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2018-07-12 20:11:20
 * @version   v1.0.0
 * filename   Stack.js
 * function   栈，无线程问题，不用继承Vector
 ***************************************************************************/

const com = require('../com.lz.mevn.namespace/Namespace.js');
const Collection = require('./Collection.js');

com.lz.mevn.util.container.Stack = com.lz.mevn.util.container.Collection.extend({

    // 类名
    NAME : 'com.lz.mevn.util.container.Stack',

    /**
     * @method
     * 构造函数
     *
     * @param  {Object} data 数据
     * @return {}
     */
    init : function (data) {
        this._super();
        var array = new Array();
        for (var key in arguments) {
            array[key] = arguments[key];
        }
        this.data = (data) ? array : new Array();
    },

    /**
     * @method
     * 入栈
     *
     * @param  {AnyType} element 元素
     * @return {Object}          调用者
     */
    push : function (element) {
        this.insertElementAt(element, 0);
        return this;
    },

    /**
     * @method
     * 出栈
     *
     * @return {Object} 调用者
     */
    pop : function () {
        this.removeElementAt(0);
        return this;
    },

    /**
     * @method
     * 栈顶元素
     *
     * @return {AnyType} 栈顶元素
     */
    peek : function () {
        return this.data[0];
    }
});

module.exports = com.lz.mevn.util.container.Stack;