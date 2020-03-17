/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2018-07-12 21:57:25
 * @version   v1.0.0
 * filename   ArrayList.js
 * function   ArrayList容器，无线程问题
 ***************************************************************************/

const com = require('../com.lz.mevn.namespace/Namespace.js');
const Collection = require('./Collection.js');
const List = require('./List.js');

com.lz.mevn.util.container.ArrayList = com.lz.mevn.util.container.List.extend({

    // 类名
    NAME : 'com.lz.mevn.util.container.ArrayList',

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
     * 在索引处添加元素，与原数组列表元素类型一致
     *
     * @param  {AnyType} element 需要添加的元素
     * @param  {Number}  index   索引
     * @return {Object}          调用者
     */
    insertElementAt : function (element, index) {
        if (!!this.data[0] && typeof this.data[0] === typeof element) {
            this.data.splice(index, 0, element);
        } else if (!this.data[0]) {
            this.data.splice(index, 0, element);
        } else {
            throw "Unable to handle different object type in Collection.insertElementAt";
        }
        return this;
    },

    /**
     * @method
     * 添加元素，与原数组列表元素类型一致
     *
     * @param {AnyType} element 被添加元素
     */
    add : function (element) {
        if (!!this.data[0] && typeof this.data[0] === typeof element) {
            this.data.push(element);
        } else if (!this.data[0]) {
            this.data.push(element);
        } else {
            throw "Unable to handle different object type in Collection.add";
        }
        return this;
    },

    /**
     * @method
     * 添加整个collection中的元素到目标collection中，两集合元素类型必须完全相同
     *
     * @param {Object}  collection      源collection
     * @param {Boolean} avoidDuplicates 避免副本（true：无重复元素，false：有重复）
     */
    addAll : function (collection, avoidDuplicates) {
        if (!(collection instanceof com.lz.mevn.util.container.Collection)) {
            throw "Unable to handle unknown object type in Collection.addAll";
        }

        if (!!this.data[0] && typeof this.data[0] === typeof collection.data[0]) {
            this.data = this.data.concat(collection.data);
        } else if (!this.data[0]) {
            this.data = this.data.concat(collection.data);
        } else {
            throw "Unable to handle different object type in Collection.addAll";
        }

        if (avoidDuplicates) {
            this.unique();
        }
        return this;
    },

    /**
     * @method
     * 求两集合交集，两集合元素类型必须完全相同
     *
     * @param  {Object} collection 目标集合对象
     * @return {Object}            交集结果对象
     */
    retainAll : function (collection) {
        if (!(collection instanceof com.lz.mevn.util.container.Collection)) {
            throw "Unable to handle unknown object type in Collection.removeAll";
        }

        if (!!this.data[0] && typeof this.data[0] === typeof collection.data[0]) {
            var interimCollection = this.clone();
            interimCollection.removeAll(collection);
            this.removeAll(interimCollection);
        } else if (!this.data[0]) {
            var interimCollection = this.clone();
            interimCollection.removeAll(collection);
            this.removeAll(interimCollection);
        } else {
            throw "Unable to handle different object type in Collection.retainAll";
        }

        return this;
    },

    /**
     * @method
     * 过滤数组列表，返回数组新列表
     *
     * @param  {Function} callback 过滤函数
     * @return {Object}            过滤后的数组列表
     */
    grep : function (callback) {
        var result = new com.lz.mevn.util.container.ArrayList();
        this.each(function(i, e) {
            result.add(callback(e));
        });
        return result;
    },

    /**
     * @method
     * 找到过滤后的index最小的元素
     *
     * @param  {Function} callback 过滤函数
     * @return {AnyType}           过滤函数过滤后的元素
     */
    find : function (callback) {
        var result = this.grep(this.data, callback);
        if (result.length === 0) {
            return null;
        }
        return result[0];
    },

    /**
     * @method
     * 过滤数组列表，过滤后的元素覆盖原元素，返回具有新data的原数组列表
     *
     * @param  {Function} callback 过滤函数
     * @return {Object}            具有新data的原数组列表
     */
    map : function (callback) {
        var _this = this;
        this.each(function(i, e) {
            _this.data[i] = callback(e);
        });
        this.data = _this.data;
        return this;
    }
});

module.exports = com.lz.mevn.util.container.ArrayList;