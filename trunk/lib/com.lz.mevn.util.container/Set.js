/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2018-07-01 18:18:37
 * @version   v1.0.0
 * filename   Set.js
 * function   集
 ***************************************************************************/

const com = require('../com.lz.mevn.namespace/Namespace.js');
const Collection = require('./Collection.js');

com.lz.mevn.util.container.Set = com.lz.mevn.util.container.Collection.extend({

    // 类名
    NAME : 'com.lz.mevn.util.container.Set',

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
     * 向Set添加元素，Set中的元素不允许重复，重写Collection中的add
     *
     * @param  {AnyType} element 元素
     * @return {Object}          调用者
     */
    add : function (element) {
        this.data.push(element);
        this.unique();
        return this;
    },

    /**
     * @method
     * 求两集合并集
     *
     * @param  {Object} set 集合
     * @return {Object}     并集
     */
    union : function (set) {
        if (!(set instanceof com.lz.mevn.util.container.Set)) {
            throw "Unable to handle unknown object type in Set.union";
        }
        var result = new com.lz.mevn.util.container.Set();
        if (this.containsAll(set)) {
            result.data = this.data;
            return result;
        } else if (set.containsAll(this)) {
            result.data = set.data;
            return result;
        } else {
            result.data = this.data;
            result.addAll(set, true);
            return result;
        }
    },

    /**
     * @method
     * 求两集合交集
     *
     * @param  {Object} set 集合
     * @return {Object}     交集
     */
    intersect : function (set) {
        if (!(set instanceof com.lz.mevn.util.container.Set)) {
            throw "Unable to handle unknown object type in Set.intersect";
        }
        var result = new com.lz.mevn.util.container.Set();
        if (this.containsAll(set)) {
            result.data = set.data;
            return result;
        } else if (set.containsAll(this)) {
            result.data = this.data;
            return result;
        } else {
            result.data = this.data;
            result.retainAll(set);
            return result;
        }
    },

    /**
     * @method
     * 判断是否为子集
     *
     * @param  {Object}  set 某集合
     * @return {Boolean}     true：是子集，false：不是子集
     */
    subset : function (set) {
        if (!(set instanceof com.lz.mevn.util.container.Set)) {
            throw "Unable to handle unknown object type in Set.subset";
        }
        return this.containsAll(set);
    },

    /**
     * @method
     * 求补集
     *
     * @param  {Object} set 某集合
     * @return {Object}     补集
     */
    difference : function (set) {
        if (!(set instanceof com.lz.mevn.util.container.Set)) {
            throw "Unable to handle unknown object type in Set.difference";
        }
        var result = new com.lz.mevn.util.container.Set();
        var _this = this.clone();
        result.data = this.data;
        result.retainAll(set);
        _this.removeAll(result);
        result.data = _this.data;
        return result;
    }
});

module.exports = com.lz.mevn.util.container.Set;