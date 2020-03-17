/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2018-07-14 22:03:38
 * @version   v1.0.0
 * filename   MultiValueMap.js
 * function   多值Map
 ***************************************************************************/

const com = require('../com.lz.mevn.namespace/Namespace.js');
const _Map = require('./Map.js');
const Pair = require('./Pair.js');
const ArrayList = require('./ArrayList.js');

com.lz.mevn.util.container.MultiValueMap = com.lz.mevn.util.container.Map.extend({

    //定义类名称
    NAME : 'com.lz.mevn.util.container.MultiValueMap',

    /**
     * @constructor
     * 构造函数
     */
    init : function(){
        this._super();
    },

    /**
     * @method
     * 设置键值对，重写set方法
     *
     * @param  {Object} key   键
     * @param  {Object} value 值数组class对象
     * @return {Object}       调用者
     */
    set : function (key, value) {
        var item = null;
        this.data.each(function (i, e) {
            if (e.key === key) {
                item = e;
                return false;
            }
        });
        if (item) {
            item.value.add(value);
            return;
        }
        var pair = new com.lz.mevn.util.container.Pair();
        pair.key   = key;
        pair.value = new com.lz.mevn.util.container.ArrayList();
        pair.value.add(value);
        this.data.add(pair);
        return this;
    },

    /**
     * @method
     * 克隆
     *
     * @param  {Boolean} deep true：深拷贝，false：浅拷贝
     * @return {Object}       克隆后的对象
     */
    clone : function (deep) {
       var newMap  = new com.lz.mevn.util.container.MultiValueMap();
       newMap.setUuid(this.getUuid());
       newMap.data = this.data.clone(deep);
       return newMap;
    },

    /**
     * @method
     * 删除某键的某值
     *
     * @param  {Object} key   键
     * @param  {Object} value 值数组
     * @return {Object}       调用者
     */
    removeValue : function (key, value) {
        var list = this.get(key);
        if (list) {
            list.remove(value);
        }
        return this;
    }
});

module.exports = com.lz.mevn.util.container.MultiValueMap;