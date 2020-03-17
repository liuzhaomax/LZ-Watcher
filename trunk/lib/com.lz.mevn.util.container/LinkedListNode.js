/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2018-07-15 00:25:37
 * @version   v1.0.0
 * filename   LinkedListNode.js
 * function   链表节点
 ***************************************************************************/

const com = require('../com.lz.mevn.namespace/Namespace.js');
const _Object = require('../com.lz.mevn.base.core/Object.js');

com.lz.mevn.util.container.LinkedListNode = com.lz.mevn.base.core.Object.extend({

    // 类名
    NAME : 'com.lz.mevn.util.container.LinkedListNode',

    /**
     * @method
     * 构造函数
     *
     * @param  {Object} data 数据
     * @param  {Object} next 后链
     * @param  {Object} prev 前链
     * @return {}
     */
    init : function (data, next, prev) {
        this._super();
        if (!!next && !(next instanceof com.lz.mevn.util.container.LinkedListNode)) {
            throw "Invalid type of parameter next.";
        }
        if (!!prev && !(prev instanceof com.lz.mevn.util.container.LinkedListNode)) {
            throw "Invalid type of parameter prev.";
        }
        this.data = (data) ? data : undefined;
        this.next = (next) ? next : null;
        this.prev = (prev) ? prev : null;
    },

    /**
     * @method
     * 获取当前节点数据
     *
     * @return {AnyType} 当前节点数据
     */
    getData : function () {
        return this.data;
    },

    /**
     * @method
     * 获取下一个节点
     *
     * @return {Object} 返回下一个节点
     */
    getNext : function () {
        return this.next;
    },

    /**
     * @method
     * 获取上一个节点
     *
     * @return {Object} 返回上一个节点
     */
    getPrev : function () {
        return this.prev;
    },

    /**
     * @method
     * 向前移动n个节点
     *
     * @param  {Number} num 移动个数
     * @return {Object}     返回指针移动后指向的节点
     */
    advance : function (num) {
        var currNode = this;
        var i = 0;
        while (i !== num) {
            currNode = currNode.next;
            i++;
        }
        return currNode;
    },

    /**
     * @method
     * 向后移动n个节点
     *
     * @param  {Number} num 移动个数
     * @return {Object}     返回指针移动后指向的节点
     */
    back : function (num) {
        var currNode = this;
        var i = 0;
        while (i !== num) {
            currNode = currNode.prev;
            i++;
        }
        return currNode;
    }
});

module.exports = com.lz.mevn.util.container.LinkedListNode;