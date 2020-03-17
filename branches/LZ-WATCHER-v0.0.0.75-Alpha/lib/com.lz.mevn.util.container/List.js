/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2018-07-01 18:17:43
 * @version   v1.0.0
 * filename   List.js
 * function   列表
 ***************************************************************************/

const com = require('../com.lz.mevn.namespace/Namespace.js');
const Collection = require('./Collection.js');

com.lz.mevn.util.container.List = com.lz.mevn.util.container.Collection.extend({

    // 类名
    NAME : 'com.lz.mevn.util.container.List',

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
     * 转字符串
     *
     * @return {String} 字符串
     */
    toString : function () {
        var result = this.data.join("");
        return result;
    },

    /**
     * @method
     * 替换索引位置元素
     *
     * @param  {Number}  index   索引
     * @param  {AnyType} element 元素
     */
    set : function (index, element) {
        this.data[index] = element;
        return this;
    },

    /**
     * @method
     * 获取索引位置元素
     *
     * @param  {Number}  index 索引
     * @return {AnyType}       元素
     */
    get : function (index) {
        return this.data[index];
    },

    /**
     * @method
     * 将索引位置元素放置到List的首位
     *
     * @param  {Number} index 索引
     * @return {Object}       调用者
     */
    front : function (index) {
        this.insertElementAt(this.data[index], 0);
        this.removeElementAt(index + 1);
        return this;
    },

    /**
     * @method
     * 将索引位置元素放置到List的末位
     *
     * @param  {Number} index 索引
     * @return {Object}       调用者
     */
    end : function (index) {
        this.insertElementAt(this.data[index], this.data.length);
        this.removeElementAt(index);
        return this;
    },

    /**
     * @method
     * 将当前索引位置元素前移一位
     *
     * @param  {Number} index 索引
     * @return {Object}       调用者
     */
    prev : function (index) {
        this.insertElementAt(this.data[index], index - 1);
        this.removeElementAt(index + 1);
        return this;
    },

    /**
     * @method
     * 将当前索引位置元素后移一位
     *
     * @param  {Number}   index 索引
     * @return {Object}         调用者
     */
    next : function (index) {
        this.insertElementAt(this.data[index], index + 2);
        this.removeElementAt(index);
        return this;
    },

    /**
     * @method
     * 某元素前置位是否有元素
     *
     * @param  {AnyType} element 元素
     * @return {Boolean}         true：有，false：无
     */
    hasPrev : function (element) {
        var index = this.indexOf(element);
        if (index === -1) {
            throw "The element does not exsit in the List."
        } else if (index === 0) {
            return false;
        } else {
            return true;
        }
    },

    /**
     * @method
     * 某元素后置位是否有元素
     *
     * @param  {AnyType} element 元素
     * @return {Boolean}         true：有，false：无
     */
    hasNext : function (element) {
        var index = this.indexOf(element);
        if (index === -1) {
            throw "The element does not exsit in the List."
        } else if (index === this.data.length - 1) {
            return false;
        } else {
            return true;
        }
    },

    /**
     * @method
     * 将某元素移动到指定索引位置
     *
     * @param  {AnyType} element     元素
     * @param  {Number}  targetIndex 目标索引位置
     * @return {Object}              调用者
     */
    moveTo : function (element, targetIndex) {
        var index = this.indexOf(element);
        if (index === -1) {
            throw "The element does not exsit in the List."
        } else {
            this.insertElementAt(element, targetIndex + 1);
            this.removeElementAt(index);
        }
        return this;
    }
});

module.exports = com.lz.mevn.util.container.List;