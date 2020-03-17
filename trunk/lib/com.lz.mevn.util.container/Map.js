/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2018-07-01 19:12:55
 * @version   v1.0.0
 * filename   Map.js
 * function   双列集合
 ***************************************************************************/

const com = require('../com.lz.mevn.namespace/Namespace.js');
const _Object = require('../com.lz.mevn.base.core/Object.js');
const ArrayList = require('./ArrayList.js');
const Pair = require('./Pair.js');

com.lz.mevn.util.container.Map = com.lz.mevn.base.core.Object.extend({

    // 类名
    NAME : 'com.lz.mevn.util.container.Map',

    /**
     * @method
     * 构造函数
     *
     * @return {}
     */
    init : function () {
        this._super();
        this.data = new com.lz.mevn.util.container.ArrayList();
    },

    /**
     * @method
     * 设置键值对
     *
     * @param  {Object} key   键
     * @param  {Object} value 值
     * @return {Object}       调用者
     */
    set : function (key, value) {
        var item = null;
        this.data.each(function (i, e) {
            if(e.key === key){
                item = e;
                return false;
            }
        });
        if (item) {
            item.value = value;
            return;
        }

        var pair = new com.lz.mevn.util.container.Pair();
        pair.key = key;
        pair.value = value;
        this.data.add(pair);
        return this;
    },

    /**
     * @method
     * 获取某键的值
     *
     * @param  {Object} key 键
     * @return {Object}     值
     */
    get : function (key) {
        var item = null;
        this.data.each(function (i, e) {
            if (e.key === key) {
                item = e;
                return false;
            }
        });
        if (item) {
            return item.value;
        }
    },

    /**
     * @method
     * 删除键值对
     *
     * @param  {Object} key 键
     * @return {Object}     调用者
     */
    remove : function (key) {
        var item = null;
        this.data.each(function (i,e) {
            if (e.key === key) {
                item = e;
                return false;
            }
        });
        if (item) {
            this.data.remove(item);
        }
        return this;
    },

    /**
     * @method
     * 删除所有键值对
     *
     * @return {Object} 调用者
     */
    removeAll : function () {
        this.data.clear();
        return this;
    },

    /**
     * @method
     * 获得键值对数量
     *
     * @return {Number} 键值对数量
     */
    size : function () {
        return this.data.size();
    },

    /**
     * @method
     * each遍历
     *
     * @param  {Function} callback 回调函数
     * @return {Function}          回调函数返回值
     */
    each : function (callback) {
        if (!callback) {
            return;
        }
        this.data.each(function (i, e) {
            return callback(i, e.key, e.value);
        });
    },

    /**
     * @method
     * 克隆
     *
     * @param  {Boolean} deep true：深拷贝，false：浅拷贝
     * @return {Object}       克隆后的对象
     */
    clone: function (deep) {
       var newMap  = new com.rainier.oop.util.Map();
       newMap.setUuid(this.getUuid());
       newMap.data = this.data.clone(deep);
       return newMap;
    },

    /**
     * @method
     * 序列化
     *
     * @return {Object} Json对象
     */
    serialize : function () {
        var json     = {};
        var dataJson = this.data.serialize();
        json.clazz= this.NAME;
        json.uuid = this.getUuid();
        json.data = dataJson;
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
        this.uuid = jsonObj.uuid ? jsonObj.uuid : '';
        if (jsonObj.data) {
           this.data.deserialize(jsonObj.data);
        }
        return this;
    }
});

module.exports = com.lz.mevn.util.container.Map;