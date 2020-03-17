/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2018-07-14 23:07:51
 * @version   v1.0.0
 * filename   CircularLinkedList.js
 * function   循环链表
 ***************************************************************************/

const com = require('../com.lz.mevn.namespace/Namespace.js');
const SingleLinkedList = require('./SingleLinkedList.js');
const LinkedListNode = require('./LinkedListNode.js');

com.lz.mevn.util.container.CircularLinkedList = com.lz.mevn.util.container.SingleLinkedList.extend({

    // 类名
    NAME : 'com.lz.mevn.util.container.CircularLinkedList',

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
        this.head = new com.lz.mevn.util.container.LinkedListNode(data);
        this.head.next = this.head;
    },

    /**
     * @method
     * 在一个数组中打印每个链表的数据
     *
     * @return {Object} 链表数据数组对象
     */
    display : function () {
        var currNode = this.head;
        var headUuid = this.head.getUuid();
        var printingBoard = new Array();
        while (currNode.next.uuid !== headUuid) {
            printingBoard.push(currNode.data);
            currNode = currNode.next;
        }
        printingBoard.push(currNode.data);
        return printingBoard;
    }
});

module.exports = com.lz.mevn.util.container.CircularLinkedList;