/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2018-07-19 01:25:26
 * @version   v1.0.0
 * filename   BinarySearchTree.js
 * function   二叉搜索树
 ***************************************************************************/

// lztodo 字典，散列，AVL，Red Black Tree，SBT，Treap，Splay Tree，图

const com = require('../com.lz.mevn.namespace/Namespace.js');
const BinaryTree = require('./BinaryTree.js');
const BinaryTreeNode = require('./BinaryTreeNode.js');

com.lz.mevn.util.container.BinarySearchTree = com.lz.mevn.util.container.BinaryTree.extend({

    // 类名
    NAME : 'com.lz.mevn.util.container.BinarySearchTree',

    /**
     * @method
     * 构造函数
     *
     * @param  {AnyType} data   数据
     * @return {}
     */
    init : function (data) {
        this._super();
        this.root = new com.lz.mevn.util.container.BinaryTreeNode(data);
    },

    /**
     * @method
     * 插入节点
     *
     * @param  {AnyType} data 节点数据
     * @return {Object}       调用者
     */
    insert : function (data) {
        var newNode = new com.lz.mevn.util.container.BinaryTreeNode(data);
        if (!this.root) {
            this.root = newNode;
            return this;
        }

        var currNode = this.root;
        var parent;
        while (1) {
            parent = currNode;
            if (data < currNode.data) {
                currNode = currNode.left;
                if (!currNode) {
                    parent.left = newNode;
                    newNode.parent = parent;
                    break;
                }
            } else {
                currNode = currNode.right;
                if (!currNode) {
                    parent.right = newNode;
                    newNode.parent = parent;
                    break;
                }
            }
        }
        return this;
    },

    /**
     * @method
     * 删除某节点下第一个在中序遍历中找到的持有完全相同数据的节点
     *
     * @param  {AnyType} data 节点数据
     * @param  {Object}  node 开始节点
     * @return {Object}       调用者
     */
    remove : function (data, node) {
        if (!!node && !(node instanceof com.lz.mevn.util.container.BinaryTreeNode)) {
            throw "Invalid node type in BinarySearchTree.remove.";
        }

        var interimNode;
        if (node == undefined) {
            interimNode = this.root;
        } else {
            interimNode = node;
        }

        var targetNode = this.find(data, interimNode);
        if (targetNode.left === null && targetNode.right === null) {
            if (targetNode.parent === null) this.root = null;
            else if (targetNode.parent.left === targetNode) targetNode.parent.left = null;
            else if (targetNode.parent.right === targetNode) targetNode.parent.right = null;
        } else if (targetNode.left === null) {
            if (targetNode.parent === null) this.root = targetNode.right;
            else if (targetNode.parent.left === targetNode) targetNode.parent.left = targetNode.right;
            else if (targetNode.parent.right === targetNode) targetNode.parent.right = targetNode.right;
            targetNode.right.parent = targetNode.parent;
            targetNode = targetNode.right;
        } else if (targetNode.right === null) {
            if (targetNode.parent === null) this.root = targetNode.left;
            else if (targetNode.parent.left === targetNode) targetNode.parent.left = targetNode.left;
            else if (targetNode.parent.right === targetNode) targetNode.parent.right = targetNode.left;
            targetNode.left.parent = targetNode.parent;
            targetNode = targetNode.left;
        } else {
            var currNode = this.getMin(targetNode.right);
            currNode.left          = targetNode.left;
            currNode.parent        = targetNode.parent;
            targetNode.left.parent = currNode;
            if (targetNode.parent === null) {
                this.root = currNode;
            } else if (targetNode.parent.left === targetNode && targetNode.parent !== null) {
                targetNode.parent.left = currNode;
            } else if (targetNode.parent.right === targetNode && targetNode.parent !== null) {
                targetNode.parent.right = currNode;
            }
        }
        return this;
    },

    /**
     * @method
     * 查找数据
     *
     * @param  {AnyType} data 节点数据
     * @param  {Object}  node 开始节点
     * @return {Object}       调用者
     */
    find : function (data, node) {
        if (!!node && !(node instanceof com.lz.mevn.util.container.BinaryTreeNode)) {
            throw "Invalid node type in BinarySearchTree.find.";
        }

        var currNode;
        if (node == undefined) {
            currNode = this.root;
        } else {
            currNode = node;
        }
        while (!!currNode) {
            if (data === currNode.data) {
                return currNode;
            } else if (data < currNode.data) {
                return currNode.left;
            } else {
                return currNode.right;
            }
        }
        return this;
    },

    /**
     * @method
     * 查找指定节点下持有最小值的节点
     *
     * @param  {Object}  node 指定节点
     * @return {Object}       持有最小值的节点
     */
    getMin : function (node) {
        if (!!node && !(node instanceof com.lz.mevn.util.container.BinaryTreeNode)) {
            throw "Invalid node type in BinarySearchTree.getMin.";
        }

        var currNode;
        if (node == undefined) {
            currNode = this.root;
        } else {
            currNode = node;
        }

        while (!!currNode.left) {
            currNode = currNode.left;
        }
        return currNode;
    },

    /**
     * @method
     * 查找指定节点下持有最大值的节点
     *
     * @param  {Object}  node 指定节点
     * @return {Object}       持有最大值的节点
     */
    getMax : function (node) {
        if (!!node && !(node instanceof com.lz.mevn.util.container.BinaryTreeNode)) {
            throw "Invalid node type in BinarySearchTree.getMax.";
        }

        var currNode;
        if (node == undefined) {
            currNode = this.root;
        } else {
            currNode = node;
        }

        while (!!currNode.right) {
            currNode = currNode.right;
        }
        return currNode;
    }
});

module.exports = com.lz.mevn.util.container.BinarySearchTree;