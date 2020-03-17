/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2018-07-14 22:31:23
 * @version   v1.0.0
 * filename   SingleLinkedList.js
 * function   单向链表
 ***************************************************************************/

const com = require('../com.lz.mevn.namespace/Namespace.js');
const _Object = require('../com.lz.mevn.base.core/Object.js');
const LinkedListNode = require('./LinkedListNode.js');

com.lz.mevn.util.container.SingleLinkedList = com.lz.mevn.base.core.Object.extend({

    // 类名
    NAME : 'com.lz.mevn.util.container.SingleLinkedList',

    /**
     * @method
     * 构造函数
     *
     * @param  {Object} data 数据
     * @param  {Object} next 链
     * @return {}
     */
    init : function (data, next) {
        this._super();
        this.head = new com.lz.mevn.util.container.LinkedListNode(data, next);
    },

    /**
     * @method
     * 获取链表头节点
     *
     * @return {Object} 头节点
     */
    getFirst : function () {
        return this.head;
    },

    /**
     * @method
     * 获取链表尾节点
     *
     * @return {Object} 尾节点
     */
    getLast : function () {
        var currNode = this.head;
        while (currNode.next !== null) {
            currNode = currNode.next;
        }
        return currNode;
    },

    /**
     * @method
     * 从某个节点开始向前移动n个节点
     *
     * @param  {Number}  num  移动个数
     * @param  {AnyType} item 从某个节点开始的某个节点对象或节点对象数据
     * @return {Object}       返回指针移动后指向的节点
     */
    advance : function (num, item) {
        if (!!item && !(item instanceof com.lz.mevn.util.container.LinkedListNode)) {
            targetNode = this.find(item);
        } else if (item instanceof com.lz.mevn.util.container.LinkedListNode) {
            targetNode = this.find(item.data);
        }

        if (item) {
            var currNode = targetNode;
        } else {
            var currNode = this.head;
        }

        var i = 0;
        while (i !== num) {
            currNode = currNode.next;
            i++;
        }
        return currNode;
    },

    /**
     * @method
     * 找到当前节点后面的节点中，第一个与参数数据完全相同的节点
     *
     * @param  {AnyType} element 参数数据
     * @return {Object}          当前节点后，第一个持有与参数数据完全相同的节点
     */
    find : function (element) {
        var currNode = this.head;
        while (currNode.data !== element) {
            currNode = currNode.next;
        }
        return currNode;
    },

    /**
     * @method
     * 在目标链表节点对象或目标数据相同的链表节点对象后，插入一个新节点或具备参数新值的新节点
     *
     * @param  {AnyType} newItem 新数据或新节点
     * @param  {AnyType} item    持有此数据的节点的数据，或目标节点（在此节点后插入新节点）
     * @return {Object}          调用链表对象
     */
    insert : function (newItem, item) {
        if (!(newItem instanceof com.lz.mevn.util.container.LinkedListNode)) {
            newItem = new com.lz.mevn.util.container.LinkedListNode(newItem);
        }
        var targetNode = null;
        if (!(item instanceof com.lz.mevn.util.container.LinkedListNode)) {
            targetNode = this.find(item);
        } else {
            targetNode = item;
        }
        newItem.next = targetNode.next;
        targetNode.next = newItem;
        return this;
    },

    /**
     * @method
     * 找到与参数数据相同的节点的上一个节点
     *
     * @param  {AnyType} element 参数数据
     * @return {Object}          返回与参数数据相同的节点的上一个节点
     */
    findPrev : function (element) {
        var currNode = this.head;
        var prevNode = null;
        while (currNode.data !== element) {
            prevNode = currNode;
            currNode = currNode.next;
        }
        return prevNode;
    },

    /**
     * @method
     * 删除与参数数据相同的节点，或直接删除某节点
     *
     * @param  {AnyType} item 参数数据，或某节点
     * @return {Object}       调用链表对象
     */
    remove : function (item) {
        if (!(item instanceof com.lz.mevn.util.container.LinkedListNode)) {
            prevNode = this.findPrev(item);
            targetNode = this.find(item);
        } else {
            prevNode = this.findPrev(item.data);
            targetNode = this.find(item.data);
        }

        if (prevNode) {
            prevNode.next = targetNode.next;
        } else {
            this.head = targetNode.next;
        }
        targetNode.next = null;
        return this;
    },

    /**
     * @method
     * 在一个数组中打印每个链表的数据
     *
     * @return {Object} 链表数据数组对象
     */
    display : function () {
        var currNode = this.head;
        var printingBoard = new Array();
        while (currNode.next !== null) {
            printingBoard.push(currNode.data);
            currNode = currNode.next;
        }
        printingBoard.push(currNode.data);
        return printingBoard;
    }
});

module.exports = com.lz.mevn.util.container.SingleLinkedList;