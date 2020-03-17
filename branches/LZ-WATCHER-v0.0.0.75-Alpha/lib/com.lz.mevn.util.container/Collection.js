/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2018-06-30 22:00:42
 * @version   v1.0.0
 * filename   Collection.js
 * function   单列集合
 ***************************************************************************/

const com = require('../com.lz.mevn.namespace/Namespace.js');
const _Object = require('../com.lz.mevn.base.core/Object.js');

com.lz.mevn.util.container.Collection = com.lz.mevn.base.core.Object.extend({

    // 类名
    NAME : 'com.lz.mevn.util.container.Collection',

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
     * 是否为空集
     *
     * @return {Boolean} true：是，false，不是
     */
    isEmpty : function () {
        return this.size() === 0;
    },

    /**
     * @method
     * 是否包含某元素
     *
     * @param  {AnyType} element 元素
     * @return {Boolean}         true：包含，false：不包含
     */
    contains : function (element) {
        return this.indexOf(element) !== -1;
    },

    /**
     * @method
     * 子集判断，含互为子集情况，忽略元素顺序
     *
     * @param  {Object}  collection 被判断是否为其他集合的子集
     * @return {Boolean}            true：是，false：不是
     */
    containsAll : function (collection) {
        if (!(collection instanceof com.lz.mevn.util.container.Collection)) {
            throw "Unable to handle unknown object type in Collection.containsAll";
        }
        var result = this.data.length >= collection.data.length;
        var _this = this.clone();
        var _that = collection.clone();
        result = result && _this.removeAll(collection).isEmpty();
        result = result || _that.removeAll(this).isEmpty();
        return result;
    },

    /**
     * @method
     * 清除元素
     *
     * @return {Object} 空集
     */
    clear : function () {
        this.data = [];
        return this;
    },

    /**
     * @method
     * 获得集合容量
     *
     * @return {Number} 容量
     */
    size : function () {
        return this.data.length;
    },

    /**
     * @method
     * 集合内元素顺序反转
     *
     * @return {Object} 调用者
     */
    reverse : function () {
        this.data.reverse();
        return this;
    },

    /**
     * @method
     * 转为纯数组
     *
     * @return {Object} 数组
     */
    asArray : function () {
        return this.data;
    },

    /**
     * @method
     * 求索引
     *
     * @param  {AnyType} element 集合中的元素
     * @return {Number}          索引
     */
    indexOf : function (element) {
        return this.data.indexOf(element);
    },

    /**
     * @method
     * 在索引处添加元素
     *
     * @param  {AnyType} element 需要添加的元素
     * @param  {Number}  index   索引
     * @return {Object}          调用者
     */
    insertElementAt : function (element, index) {
        this.data.splice(index, 0, element);
        return this;
    },

    /**
     * @method
     * 在索引处移除元素
     *
     * @param  {Number} index 索引
     * @return {Object}       调用者
     */
    removeElementAt : function (index) {
        var element = this.data[index];
        this.data.splice(index, 1);
        return this;
    },

    /**
     * @method
     * 添加元素
     *
     * @param {AnyType} element 被添加元素
     */
    add : function (element) {
        this.data.push(element);
        return this;
    },

    /**
     * @method
     * 添加整个collection中的元素到目标collection中
     *
     * @param {Object}  collection      源collection
     * @param {Boolean} avoidDuplicates 避免副本（true：无重复元素，false：有重复）
     */
    addAll : function (collection, avoidDuplicates) {
        if (!(collection instanceof com.lz.mevn.util.container.Collection)) {
            throw "Unable to handle unknown object type in Collection.addAll";
        }
        this.data = this.data.concat(collection.data);
        if (avoidDuplicates) {
            this.unique();
        }
        return this;
    },

    /**
     * @method
     * 删除元素
     *
     * @param  {AnyType} element 被删除元素
     * @return {Object}          null
     */
    remove : function (element) {
        var index = this.indexOf(element);
        if (index >= 0) {
            return this.removeElementAt(index);
        }
        return null;
    },

    /**
     * @method
     * 删除集合中与参数集合相同的元素
     *
     * @param  {Object} collection 需删除的元素的集合
     * @return {Object}            调用者
     */
    removeAll : function (collection) {
        if (!(collection instanceof com.lz.mevn.util.container.Collection)) {
            throw "Unable to handle unknown object type in Collection.removeAll";
        }
        var _this = this;
        collection.each(function (i, e) {
            _this.each(function () {
                _this.remove(e);
            });
        });
        return this;
    },

    /**
     * @method
     * 求两集合交集
     *
     * @param  {Object} collection 目标集合对象
     * @return {Object}            交集结果对象
     */
    retainAll : function (collection) {
        if (!(collection instanceof com.lz.mevn.util.container.Collection)) {
            throw "Unable to handle unknown object type in Collection.removeAll";
        }
        var interimCollection = this.clone();
        interimCollection.removeAll(collection);
        this.removeAll(interimCollection);
        return this;
    },

    /**
     * @method
     * 数组元素唯一化 三种思路：1、不重即存；2、排序；3、对象键值
     *
     * @return {Object} 调用者
     */
    unique : function () {
        var result = new com.lz.mevn.util.container.Collection();
        var repeat;
        this.each(function (i, e) {
            repeat = false;
            result.each(function (j, m) {
                if (e === m) {
                    repeat = true;
                }
            });
            if (!repeat) {
                result.add(e);
            }
        });
        this.data = result.data;
        return this;
    },

    /**
     * @method
     * 排序
     *
     * @param  {Function} func 排序顺序
     * @return {Object}        调用者
     */
    sort : function (func) {
        if (typeof func === "function") {
            this.data.sort(func);
        } else {
            this.data.sort();
        }
        return this;
    },

    /**
     * @method
     * 克隆
     *
     * @param  {Boolean} deep true：深拷贝，false，浅拷贝
     * @return {Object}       克隆后的结果
     */
    clone : function (deep) {
        var newCollection = new com.lz.mevn.util.container.Collection();
        newCollection.setUuid(this.getUuid());
        if (deep) {
            for (var i = 0; i < this.data.length; i++) {
                if (this.data[i] instanceof com.lz.mevn.base.core.Object) {
                    newCollection.add(this.data[i].clone(deep));
                } else {
                    newCollection.data[i] = this.data[i];
                }
            }
        } else {
            newCollection.data = this.data;
        }
        return newCollection;
    },

    /**
     * @method
     * each遍历
     *
     * @param  {Function} callback 回调函数
     * @param  {Boolean}  reverse  true：反向，false/undefined：正向
     * @return {Object}            调用者
     */
    each: function (callback, reverse) {
        if (typeof reverse !== "undefined" && reverse === true) {
            for (var i = this.data.length - 1; i >= 0; i--) {
                if (callback(i, this.data[i]) === false)
                    break;
            }
        } else {
            for (var i = 0; i < this.data.length; i++) {
                if (callback(i, this.data[i]) === false)
                    break;
            }
        }
        return this;
    },

    /**
     * @method
     * 序列化对象为JSON对象
     *
     * @return {Object} JSON对象
     */
    serialize : function () {
        var json   = {};
        json.clazz = this.NAME;
        json.uuid  = this.getUuid();
        json.data  = [];
        this.each(function(i, e) {
            if (e instanceof com.lz.mevn.base.core.Object) {
                var objJson = e.serialize();
                json.data.push(objJson);
            } else {
                json.data.push(e);
            }
        });
        return json;
    },

    /**
     * @method
     * 反序列化JSON对象
     *
     * @param  {Object} jsonObj JSON对象
     * @return {Object}         class对象
     */
    deserialize : function (jsonObj) {
        this.NAME = jsonObj.clazz;
        this.uuid = jsonObj.uuid ? jsonObj.uuid : '';
        if (jsonObj.data) {
            for (var i = 0; i < jsonObj.data.length; i++) {
                var json   = jsonObj.data[i];
                var newObj = null;
                if (json.clazz) {
                    newObj = eval("new " + json.clazz + ";");
                    if (newObj instanceof com.lz.mevn.base.core.Object) {
                        newObj.deserialize(json);
                    }
                } else {
                    newObj = json;
                }
                this.add(newObj);
            }
        }
        return this;
    }
});

module.exports = com.lz.mevn.util.container.Collection;