/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2018-06-30 01:40:47
 * @version   v1.0.0
 * filename   Object.js
 * function   基类，所有对象的根继承类
 ***************************************************************************/

const com = require('../com.lz.mevn.namespace/Namespace.js');
const Class = require('./Class.js');
const Uuid = require('./Uuid.js');

com.lz.mevn.base.core.Object = com.lz.mevn.base.core.Class.extend({

    // 类名
    NAME : 'com.lz.mevn.base.core.Object',

    /**
     * @method
     * 构造函数
     *
     * @return {}
     */
    init : function () {
        if (typeof this.init === 'function') {
            this.uuid = this.generateUuid();
        }
    },

    /**
     * @method
     * 克隆方法
     *
     * @param  {Boolean} deep 克隆对象
     * @return {Object}       克隆后对象
     */
    clone : function (deep) {
        var obj = new com.lz.mevn.base.core.Object();
        obj.setUuid(this.uuid);
        return obj;
    },

    /**
     * @method
     * 生成UUID
     *
     * @return {String} uuid
     */
    generateUuid : function () {
        var uuidObj = com.lz.mevn.base.core.Uuid.create();
        return uuidObj.hex;
    },

    /**
     * @method
     * 获取UUID
     *
     * @return {String} uuid
     */
    getUuid : function () {
        return this.uuid;
    },

    /**
     * @method
     * 设置UUID
     *
     * @param {String} strUuid 改写uuid
     */
    setUuid : function (strUuid) {
        this.uuid = strUuid;
    },

    /**
     * @method
     * 序列化对象为JSON对象
     *
     * @return {Object} json对象
     */
    serialize : function () {
        var json  = {};
        json.clazz= this.NAME;
        json.uuid = this.getUuid();
        return json;
    },

    /**
     * @method
     * 反序列化
     *
     * @param  {Object} jsonObj json对象
     * @return {}
     */
    deserialize : function (jsonObj) {
        this.NAME = jsonObj.clazz;
        this.uuid = jsonObj.uuid;
    },

    /**
     * @method
     * 序列化对象为JSON字符串
     *
     * @return {String} json字符串
     */
    toString : function () {
        var obj = this.serialize();
        var objStr = JSON.stringify(obj, null, '    ');
        return objStr;
    },

    /**
     * @method
     * 反序列化字符串为JSON对象
     *
     * @param  {String} jsonString JSON字符串
     * @return {}
     */
    parseString : function (jsonString) {
        var obj = JSON.parse(jsonString);
        this.deserialize(obj);
    }
});

module.exports = com.lz.mevn.base.core.Object;