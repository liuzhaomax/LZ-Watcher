/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2018-07-14 22:56:33
 * @version   v1.0.0
 * filename   DoubleLinkedList.js
 * function   双向链表
 ***************************************************************************/

const com = require('../com.lz.mevn.namespace/Namespace.js');
const SingleLinkedList = require('./SingleLinkedList.js');
const LinkedListNode = require('./LinkedListNode.js');

com.lz.mevn.util.container.DoubleLinkedList = com.lz.mevn.util.container.SingleLinkedList.extend({

    // 类名
    NAME : 'com.lz.mevn.util.container.DoubleLinkedList',

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
        this.head = new com.lz.mevn.util.container.LinkedListNode(data, next, prev);
    },

    /**
     * @method
     * 从某个节点开始向后移动n个节点
     *
     * @param  {Number}  num  移动个数
     * @param  {AnyType} item 从某个节点开始的某个节点对象或节点对象数据
     * @return {Object}       返回指针移动后指向的节点
     */
    back : function (num, item) {
        if (!item) {
            return null;
        }

        if (!(item instanceof com.lz.mevn.util.container.LinkedListNode)) {
            targetNode = this.find(item);
        } else {
            targetNode = this.find(item.data);
        }

        var currNode = targetNode;
        var i = 0;
        while (i !== num) {
            currNode = currNode.prev;
            i++;
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
        newItem.prev = targetNode;
        if (newItem.next) {
            newItem.next.prev = newItem;
        }
        targetNode.next = newItem;
        return this;
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
        targetNode.next.prev = prevNode;
        targetNode.next = null;
        targetNode.prev = null;
        return this;
    }
});

module.exports = com.lz.mevn.util.container.DoubleLinkedList;