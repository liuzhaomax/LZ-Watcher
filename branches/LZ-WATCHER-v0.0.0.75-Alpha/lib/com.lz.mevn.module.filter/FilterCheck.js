/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-03-03 19:35:10
 * @version   v1.0.0
 * filename   FilterCheck
 * function   校验过滤器
 ***************************************************************************/

const com = require('../com.lz.mevn.namespace/Namespace.js');
const FilterBase = require('../com.lz.mevn.module.filter/FilterBase.js');

com.lz.mevn.module.filter.FilterCheck = com.lz.mevn.module.filter.FilterBase.extend({

    // 类名
    NAME : 'com.lz.mevn.module.filter.FilterCheck',

    /**
     * @method
     * 构造函数
     *
     * @param  {AnyType} target 处理目标
     * @return {}
     */
    init : function (target) {
        this._super();
        this.target = target;
        this.pass = true;
    },

    /**
     * @method
     * 被校验的长度必须小于设定长度
     *
     * @param  {Number} setLength 设定长度
     * @return {Object}           原对象
     */
    limitMaxLength : function (setLength) {
        if (setLenght) {
            switch (typeof this.target) {
                case 'string':
                    if (this.target.length > setLength) {
                        this.pass = false;
                    }
                    break;
            }
        }
        return this;
    },

    /**
     * @method
     * 被校验的长度必须大于设定长度
     *
     * @param  {Number} setLength 设定长度
     * @return {Object}           原对象
     */
    limitMinLength : function (setLength) {
        if (setLenght) {
            switch (typeof this.target) {
                case 'string':
                    if (this.target.length < setLength) {
                        this.pass = false;
                    }
                    break;
            }
        }
        return this;
    },

    /**
     * @method
     * 至少N个字母
     *
     * @param  {Number} setQuantity 至少有的字母数量
     * @return {Object}             原对象
     */
    atLeastLetters : function (setQuantity) {
        if (setQuantity) {
            switch (typeof this.target) {
                case 'string':
                    let _target = this.traget.toLowerCase();
                    let reg = /[a-z]/ig;
                    if (_target.match(/[a-z]/ig).length < setQuantity) {
                        this.pass = false;
                    }
                    break;
            }
        }
        return this;
    }
});

module.exports = com.lz.mevn.module.filter.FilterCheck;