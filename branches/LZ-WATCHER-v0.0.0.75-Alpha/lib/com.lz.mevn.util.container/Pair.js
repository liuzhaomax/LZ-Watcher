/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2018-07-14 20:06:37
 * @version   v1.0.0
 * filename   Pair.js
 * function   键值对
 ***************************************************************************/

const com = require('../com.lz.mevn.namespace/Namespace.js');
const _Object = require('../com.lz.mevn.base.core/Object.js');

com.lz.mevn.util.container.Pair = com.lz.mevn.base.core.Object.extend({

    //定义类名称
    NAME : 'com.lz.mevn.util.container.Pair',

    /**
     * @method
     * 构造函数
     *
     * @return {}
     */
    init : function () {
        this._super();
        this.key   = null;
        this.value = null;
    },

    /**
     * @method
     * 设置键值对
     *
     * @param  {Object} first  键
     * @param  {Object} second 值
     * @return {Object}        调用者
     */
    set : function (first, second) {
        this.key   = first;
        this.value = second;
        return this;
    },

    /**
     * @method
     * 设置键
     *
     * @param  {Object} first 键
     * @return {Object}       调用者
     */
    setFirst : function (first) {
        this.key = first;
        return this;
    },

    /**
     * @method
     * 设置值
     *
     * @param  {Object} second 值
     * @return {Object}       调用者
     */
    setSecond : function (second) {
        this.value = second;
        return this;
    },

    /**
     * @method
     * 获取键
     *
     * @return {Object} 键
     */
    first : function () {
        return this.key;
    },

    /**
     * @method
     * 获取值
     *
     * @return {Object} 值
     */
    second : function () {
        return this.value;
    },

    /**
     * @method
     * 克隆
     *
     * @param  {Boolean} deep true：深拷贝，false：浅拷贝
     * @return {Object}       克隆后的对象
     */
    clone : function (deep) {
        var newPair  = new com.lz.mevn.util.container.Pair();
        newPair.setUuid(this.getUuid());
        if (deep) {
            newPair.key   = (this.key instanceof com.lz.mevn.base.core.Object) ? this.key.clone(deep) : this.key;
            newPair.value = (this.value instanceof com.lz.mevn.base.core.Object) ? this.value.clone(deep) : this.value;
        } else {
            newPair.key   = this.key;
            newPair.value = this.value;
        }
        return newPair;
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
        json.first  = null;
        json.second = null;
        if (this.key instanceof com.lz.mevn.base.core.Object) {
            json.first = this.key.serialize();
        } else {
            json.first = this.key;
        }
        if (this.value instanceof com.lz.mevn.base.core.Object) {
            json.second = this.value.serialize();
        } else {
            json.second = this.value;
        }
        return json;
    },

    /**
     * @method
     * 反序列化
     *
     * @param  {Object} jsonObj Json对象
     * @return {Object}         调用者
     */
    deserialize : function (jsonObj) {
        this.NAME = jsonObj.clazz;
        this.uuid = jsonObj.uuid;
        if (jsonObj.first.clazz) {
            var obj = eval('new ' + jsonObj.first.clazz + "();");
            obj.deserialize(jsonObj.first);
            this.key = obj;
        } else {
            this.key = jsonObj.first;
        }

        if (jsonObj.second.clazz) {
            var obj = eval('new ' + jsonObj.second.clazz + "();");
            obj.deserialize(jsonObj.second);
            this.value = obj;
        } else {
            this.value = jsonObj.second;
        }
        return this;
    }
});

module.exports = com.lz.mevn.util.container.Pair;