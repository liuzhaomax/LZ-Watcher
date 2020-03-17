/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2018-07-01 18:21:30
 * @version   v1.0.0
 * filename   Queue.js
 * function   队列
 ***************************************************************************/

const com = require('../com.lz.mevn.namespace/Namespace.js');
const Collection = require('./Collection.js');

com.lz.mevn.util.container.Queue = com.lz.mevn.util.container.Collection.extend({

    // 类名
    NAME : 'com.lz.mevn.util.container.Queue',

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
     * 元素入队
     *
     * @param  {AnyType} element 元素
     * @return {Object}          调用者
     */
    enqueue : function (element) {
        return this.add(element);
    },

    /**
     * @method
     * 出队
     *
     * @return {Object} 调用者
     */
    dequeue : function () {
        this.data.shift();
        return this;
    },

    /**
     * @method
     * 读取队首元素
     *
     * @return {AnyType} 队首元素
     */
    front : function () {
        return this.data[0];
    },

    /**
     * @method
     * 读取队尾元素
     *
     * @return {AnyType} 队尾元素
     */
    back : function () {
        return this.data[this.data.length - 1];
    },

    /**
     * @method
     * 队列转带换行的字符串
     *
     * @return {String} 字符串
     */
    toString : function () {
        var result = this.data.join("\n");
        return result;
    },

    /**
     * @method
     * 判断是否空队列
     *
     * @return {Boolean} true：是，false：否
     */
    isEmpty : function () {
        if (this.data.length === 0) {
            return true;
        } else {
            return false;
        }
    }
});

module.exports = com.lz.mevn.util.container.Queue;