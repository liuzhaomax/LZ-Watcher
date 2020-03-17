/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2018-07-09 19:50:28
 * @version   v1.0.0
 * filename   Deque.js
 * function   双端队列
 ***************************************************************************/

const com = require('../com.lz.mevn.namespace/Namespace.js');
const Queue = require('./Queue.js');

com.lz.mevn.util.container.Deque = com.lz.mevn.util.container.Queue.extend({

    // 类名
    NAME : 'com.lz.mevn.util.container.Deque',

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
     * 从队首入队
     *
     * @param  {AnyType} element 元素
     * @return {Object}          调用者
     */
    enqueueFront : function (element) {
        return this.insertElementAt(element, 0);
    },

    /**
     * @method
     * 从队尾入队
     *
     * @param  {AnyType} element 元素
     * @return {Object}          调用者
     */
    enqueueBack : function (element) {
        return this.enqueue(element);
    },

    /**
     * @method
     * 从队首出队
     *
     * @return {Object} 调用者
     */
    dequeueFront : function () {
        return this.dequeue();
    },

    /**
     * @method
     * 从队尾出队
     *
     * @return {Object} 调用者
     */
    dequeueBack : function () {
        return this.removeElementAt(this.data.length - 1);
    }
});

module.exports = com.lz.mevn.util.container.Deque;