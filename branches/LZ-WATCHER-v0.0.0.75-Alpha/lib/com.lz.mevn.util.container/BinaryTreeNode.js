/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2018-07-17 12:57:47
 * @version   v1.0.0
 * filename   BinaryTreeNode.js
 * function   二叉树
 ***************************************************************************/

const com = require('../com.lz.mevn.namespace/Namespace.js');
const _Object = require('../com.lz.mevn.base.core/Object.js');

com.lz.mevn.util.container.BinaryTreeNode = com.lz.mevn.base.core.Object.extend({

    // 类名
    NAME : 'com.lz.mevn.util.container.BinaryTreeNode',

    /**
     * @method
     * 构造函数
     *
     * @param  {AnyType} data   数据
     * @param  {Object}  parent 父节点
     * @param  {Object}  left   左子树
     * @param  {Object}  right  右子树
     * @return {}
     */
    init : function (data, parent, left, right) {
        this._super();
        if (!!parent && !(parent instanceof com.lz.mevn.base.core.Object)) {
            var parentEle = parent;
            parent = new com.lz.mevn.base.core.Object();
            parent.data = parentEle;
        }
        if (!!left && !(left instanceof com.lz.mevn.base.core.Object)) {
            var leftEle = left;
            left = new com.lz.mevn.base.core.Object();
            left.data = leftEle;
        }
        if (!!right && !(right instanceof com.lz.mevn.base.core.Object)) {
            var rightEle = right;
            right = new com.lz.mevn.base.core.Object();
            right.data = rightEle;
        }
        this.data   = (data != undefined) ? data : null;
        this.parent = (parent) ? parent : null;
        this.left   = (left) ? left : null;
        this.right  = (right) ? right : null;
    },

    /**
     * @method
     * 当前节点是否存在左子树
     *
     * @return {Boolean} true：存在，false：不存在
     */
    hasLeft : function () {
        if (this.left === null) {
            return false;
        }
        return true;
    },

    /**
     * @method
     * 当前节点是否存在右子树
     *
     * @return {Boolean} true：存在，false：不存在
     */
    hasRight : function () {
        if (this.right === null) {
            return false;
        }
        return true;
    },

    /**
     * @method
     * 当前节点是否存在父节点
     *
     * @return {Boolean} true：存在，false：不存在
     */
    hasParent : function () {
        if (this.parent === null) {
            return false;
        }
        return true;
    },

    /**
     * @method
     * 添加左子树
     *
     * @param  {Object} node 节点对象
     * @return {Object}      调用者
     */
    addLeft : function (node) {
        if (!(node instanceof com.lz.mevn.util.container.BinaryTreeNode)) {
            throw "Invalid node type.";
        }
        this.left = node;
        node.setParent(this);
        return this;
    },

    /**
     * @method
     * 添加右子树
     *
     * @param  {Object} node 节点对象
     * @return {Object}      调用者
     */
    addRight : function (node) {
        if (!(node instanceof com.lz.mevn.util.container.BinaryTreeNode)) {
            throw "Invalid node type.";
        }
        this.right = node;
        node.setParent(this);
        return this;
    },

    /**
     * @method
     * 删除左子树
     *
     * @return {Object} 调用者
     */
    removeLeft : function () {
        this.left === null;
        return this;
    },

    /**
     * @method
     * 删除右子树
     *
     * @return {Object} 调用者
     */
    removeRight : function () {
        this.right === null;
        return this;
    },

    /**
     * @method
     * 获取左子树
     *
     * @return {Object} 左子树对象
     */
    getLeft : function () {
        return this.left;
    },

    /**
     * @method
     * 获取右子树
     *
     * @return {Object} 右子树对象
     */
    getRight : function () {
        return this.right;
    },

    /**
     * @method
     * 设置当前节点的父节点
     *
     * @param  {Object} parentNode 父节点对象
     * @return {Object}            调用者
     */
    setParent : function (parentNode) {
        if (!parentNode) {
            this.parent = null;
            return;
        }

        if (!(parentNode instanceof com.lz.mevn.util.container.BinaryTreeNode)) {
            throw "Invalid node type.";
        } else {
            this.parent = parentNode;
        }
        return this;
    },

    /**
     * @method
     * 获取父节点
     *
     * @return {Object} 父节点对象
     */
    getParent : function () {
        return this.parent;
    },

    /**
     * @method
     * 设置节点数据
     *
     * @param  {Object} data 节点数据列表
     * @return {Object}      调用者
     */
    setData : function (data) {
        this.data = data;
        return this;
    },

    /**
     * @method
     * 获取节点数据
     *
     * @return {Object} 节点数据列表
     */
    getData : function () {
        return this.data;
    },

    /**
     * @method
     * 克隆
     *
     * @param  {Boolean} deep true：深拷贝，false：浅拷贝
     * @return {Object}       克隆后的结果
     */
    clone : function (deep) {
        var newNode = new com.lz.mevn.util.container.BinaryTreeNode();
        newNode.setUuid(this.getUuid());
        if (deep) {
            if (this.data instanceof com.lz.mevn.base.core.Object) {
                newNode.data = this.data.clone(deep);
            } else {
                for (var k in this.data) {
                    newNode.data[k] = this.data[k];
                }
            }
            newNode.left   = this.left.clone(deep);
            newNode.right  = this.right.clone(deep);
            newNode.parent = this.parent.clone(deep);
        } else {
            newNode.data   = this.data;
            newNode.left   = this.left;
            newNode.right  = this.right;
            newNode.parent = this.parent;
        }
        return node;
    },

    /**
     * @method
     * 序列化
     *
     * @return {Object} JSON对象
     */
    serialize : function () {
        var json    = {};
        json.clazz  = this.NAME;
        json.uuid   = this.getUuid();
        json.data   = this.data;
        json.left   = this.left.serialize();
        json.right  = this.right.serialize();
        json.parent = this.parent.serialize();
        return json;
    },

    /**
     * @method
     * 反序列化
     *
     * @param  {Object} jsonObj JSON对象
     * @return {Object}         class对象
     */
    deserialize : function (jsonObj) {
        this.NAME = jsonObj.clazz;
        this.uuid = jsonObj.uuid ? jsonObj.uuid : '';
        if (jsonObj.left) {
            this.left.deserialize(jsonObj.left);
        }
        if (jsonObj.right) {
            this.right.deserialize(jsonObj.right);
        }
        if (jsonObj.parent) {
            this.parent.deserialize(jsonObj.parent);
        }
        if (jsonObj.data){
            if (jsonObj.data.clazz) {
                this.data = jsonObj.data.deserialize(jsonObj.data);
            } else {
                this.data = jsonObj.data;
            }
        }
        return this;
    }
});

module.exports = com.lz.mevn.util.container.BinaryTreeNode;