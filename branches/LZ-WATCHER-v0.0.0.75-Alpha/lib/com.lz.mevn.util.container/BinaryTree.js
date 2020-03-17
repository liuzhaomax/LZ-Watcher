/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2018-07-17 23:24:39
 * @version   v1.0.0
 * filename   BinaryTree.js
 * function   二叉树
 ***************************************************************************/

const com = require('../com.lz.mevn.namespace/Namespace.js');
const _Object = require('../com.lz.mevn.base.core/Object.js');
const BinaryTreeNode = require('./BinaryTreeNode.js');

com.lz.mevn.util.container.BinaryTree = com.lz.mevn.base.core.Object.extend({

    // 类名
    NAME : 'com.lz.mevn.util.container.BinaryTree',

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
     * 插入节点，位置随机
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
            if (Math.round(Math.random())) {
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
            throw "Invalid node type in BinaryTree.remove.";
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
            targetNode = null;
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
            if (Math.round(Math.random())) {
                // 右子树
                var currNode = targetNode;
                while (1) {
                    if (currNode.right === null) break;
                    currNode = currNode.right;
                }
                currNode.parent        = targetNode.parent;
                currNode.left          = targetNode.left;
                currNode.right         = (targetNode.right) ? targetNode.right : null;
                targetNode.left.parent = currNode;
                if (targetNode.parent === null) {
                    this.root = currNode;
                } else if (targetNode.parent.left === targetNode && targetNode.parent !== null) {
                    targetNode.parent.left = currNode;
                } else if (targetNode.parent.right === targetNode && targetNode.parent !== null) {
                    targetNode.parent.right = currNode;
                }
            } else {
                // 左子树
                var currNode = targetNode;
                while (1) {
                    if (currNode.left === null) break;
                    currNode = currNode.left;
                }
                currNode.parent         = targetNode.parent;
                currNode.right          = targetNode.right;
                currNode.left           = (targetNode.left) ? targetNode.left : null;
                targetNode.right.parent = currNode;
                if (targetNode.parent === null) {
                    this.root = currNode;
                } else if (targetNode.parent.left === targetNode && targetNode.parent !== null) {
                    targetNode.parent.left = currNode;
                } else if (targetNode.parent.right === targetNode && targetNode.parent !== null) {
                    targetNode.parent.right = currNode;
                }
            }
        }
        return this;
    },

    /**
     * @method
     * 中序遍历
     *
     * @param  {Object}   node     需要遍历所有子节点的节点
     * @param  {Function} callback 回调函数
     * @return {}
     */
    inOrder : function (node, callback) {
        if (!!node && !(node instanceof com.lz.mevn.util.container.BinaryTreeNode)) {
            throw "Invalid node type in BinaryTree.inOrder.";
        }

        if (node != undefined) {
            this.inOrder(node.left, callback);
            callback(node);
            this.inOrder(node.right, callback);
        }
    },

    /**
     * @method
     * 先序遍历
     *
     * @param  {Object}   node     需要遍历所有子节点的节点
     * @param  {Function} callback 回调函数
     * @return {}
     */
    preOrder : function (node, callback) {
        if (!!node && !(node instanceof com.lz.mevn.util.container.BinaryTreeNode)) {
            throw "Invalid node type in BinaryTree.preOrder.";
        }

        if (node != undefined) {
            callback(node);
            this.preOrder(node.left, callback);
            this.preOrder(node.right, callback);
        }
    },

    /**
     * @method
     * 后序遍历
     *
     * @param  {Object}   node     需要遍历所有子节点的节点
     * @param  {Function} callback 回调函数
     * @return {}
     */
    postOrder : function (node, callback) {
        if (!!node && !(node instanceof com.lz.mevn.util.container.BinaryTreeNode)) {
            throw "Invalid node type in BinaryTree.postOrder.";
        }

        if (node != undefined) {
            this.postOrder(node.left, callback);
            this.postOrder(node.right, callback);
            callback(node);
        }
    },

    /**
     * @method
     * 找到持有某数据的节点
     *
     * @param  {AnyType} data  节点数据
     * @param  {Object}  node  开始节点
     * @param  {String}  order 遍历顺序
     * @return {Object}        被找到的节点
     */
    find : function (data, node, order) {
        if (!!node && !(node instanceof com.lz.mevn.util.container.BinaryTreeNode)) {
            throw "Invalid node type in BinaryTree.find.";
        }

        var targetNode;
        if (node == undefined) {
            targetNode = this.root;
        } else {
            targetNode = node;
        }
        var result;
        switch (order) {
            case "inOrder" :
                this.inOrder(targetNode, function (node) {
                    if (data === node.data) {
                        result = node;
                    }
                });
                break;
            case "preOrder" :
                this.preOrder(targetNode, function (node) {
                    if (data === node.data) {
                        result = node;
                    }
                });
                break;
            case "postOrder" :
                this.postOrder(targetNode, function (node) {
                    if (data === node.data) {
                        result = node;
                    }
                });
                break;
            default :
                this.inOrder(targetNode, function (node) {
                    if (data === node.data) {
                        result = node;
                    }
                });
                break;
        }

        if (result != undefined) {
            return result;
        } else {
            throw "No node holds the given data by traversing the given node.";
        }
    },

    /**
     * @method
     * 获取节点个数
     *
     * @param  {Object} node 开始节点
     * @return {Number}      节点个数
     */
    getSize : function (node) {
        if (!!node && !(node instanceof com.lz.mevn.util.container.BinaryTreeNode)) {
            throw "Invalid node type in BinaryTree.getSize.";
        }

        var targetNode;
        if (node == undefined) {
            targetNode = this.root;
        } else {
            targetNode = node;
        }

        var nodeArray = new Array();
        if (!targetNode) {
            return 0;
        } else {
            this.inOrder(targetNode, function (_node) {
                if (_node != undefined) nodeArray.push(0);
            });
        }
        return nodeArray.length;
    },

    /**
     * @method
     * 获取树高
     *
     * @param  {Object} node 开始计算的节点
     * @return {Number}      树高（不算开始计算的节点层）
     */
    getHeight : function (node) {
        if (!!node && !(node instanceof com.lz.mevn.util.container.BinaryTreeNode)) {
            throw "Invalid node type in BinaryTree.getHeight.";
        }

        if (leftHeight == undefined) var leftHeight = 0;
        if (rightHeight == undefined) var rightHeight = 0;
        if (!node) {
            var node = this.root;
        }
        this.getHeight(node.getLeft());
        leftHeight++;
        this.getHeight(node.getRight());
        rightHeight++;
        return (leftHeight < rightHeight) ? (rightHeight + 1) : (leftHeight + 1);
    }
});

module.exports = com.lz.mevn.util.container.BinaryTree;
