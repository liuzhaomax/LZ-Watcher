/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2018-07-14 13:34:19
 * @version   v1.0.0
 * filename   TreeNode.js
 * function   树节点，节点类型必须是class对象
 ***************************************************************************/

const com = require('../com.lz.mevn.namespace/Namespace.js');
const _Object = require('../com.lz.mevn.base.core/Object.js');
const ArrayList = require('./ArrayList.js');

com.lz.mevn.util.container.TreeNode = com.lz.mevn.base.core.Object.extend({

    // 类名
    NAME : 'com.lz.mevn.util.container.TreeNode',

    /**
     * @method
     * 构造函数
     *
     * @param  {AnyType} data     数据
     * @param  {Object}  children 子节点
     * @param  {Object}  parent   父节点
     * @return {}
     */
    init : function (data, children, parent) {
        this._super();
        if (!!children && !(children instanceof com.lz.mevn.base.core.Object)) {
            var childEle = children;
            children = new com.lz.mevn.base.core.Object();
            children.data = childEle;
        }
        if (!!parent && !(parent instanceof com.lz.mevn.base.core.Object)) {
            var parentEle = parent;
            parent = new com.lz.mevn.base.core.Object();
            parent.data = parentEle;
        }
        this.data     = (data != undefined) ? data : null;
        this.children = (children) ? children : new com.lz.mevn.util.container.ArrayList();
        this.parent   = (parent) ? parent : null;
    },

    /**
     * @method
     * 当前节点是否存在子节点
     *
     * @return {Boolean} true：存在，false：不存在
     */
    hasChild : function () {
        if (this.children.size() === 0) {
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
        if (this.parent.size() === 0) {
            return false;
        }
        return true;
    },

    /**
     * @method
     * 添加子节点
     *
     * @param  {Object} node 节点对象
     * @return {Object}      调用者
     */
    addChild : function (node) {
        if (!(node instanceof com.lz.mevn.util.container.TreeNode)) {
            throw "Invalid node type.";
        }
        this.children.add(node);
        node.setParent(this);
        return this;
    },

    /**
     * @method
     * 删除子节点
     *
     * @param  {Object} node 节点对象
     * @return {Object}      调用者
     */
    removeChild : function (node) {
        this.children === null;
        return this;
    },

    /**
     * @method
     * 获取子节点列表对象
     *
     * @return {Object} 子节点列表对象
     */
    getChildren : function () {
        return this.children;
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

        if (!(parentNode instanceof com.lz.mevn.util.container.TreeNode)) {
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
     * 遍历树，返回flase遍历结束，无返回值或返回true遍历继续
     *
     * @param  {Function} callback 回调函数
     * @return {Boolean}           遍历进行状态
     */
    each : function (callback) {
        var flag = callback(this);
        if (flag === false) {
            return false;
        }

        this.children.each(function(i, child) {
            flag = child.each(callback);
            if (flag === false) {
                return false;
            }
        });

        if (flag === false) {
            return false;
        }
        return true;
    },

    /**
     * @method
     * 克隆
     *
     * @param  {Boolean} deep true：深拷贝，false：浅拷贝
     * @return {Object}       克隆后的结果
     */
    clone : function (deep) {
        var newNode = new com.lz.mevn.util.container.TreeNode();
        newNode.setUuid(this.getUuid());
        if (deep) {
            if (this.data instanceof com.lz.mevn.base.core.Object) {
                newNode.data = this.data.clone(deep);
            } else {
                for (var k in this.data) {
                    newNode.data[k] = this.data[k];
                }
            }
            newNode.children = this.children.clone(deep);
            newNode.children.each(function (i, child) {
                child.setParent(newNode);
            });
            newNode.parent = this.parent.clone(deep);
        } else {
            newNode.data     = this.data;
            newNode.children = this.children;
            newNode.parent   = this.parent;
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
        var json  = {};
        json.clazz= this.NAME;
        json.uuid = this.getUuid();
        json.data = this.data;
        json.children = this.children.serialize();
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
        if (jsonObj.children) {
            this.children.deserialize(jsonObj.children);
        }
        if (jsonObj.data){
            if (jsonObj.data.clazz) {
                this.data = jsonObj.data.deserialize(jsonObj.data);
            } else {
                this.data = jsonObj.data;
            }
        }

        this.each(function (tmp) {
            tmp.getChildren().each(function (i, ch) {
                ch.setParent(tmp);
            });
        });
        return this;
    }
});

module.exports = com.lz.mevn.util.container.TreeNode;