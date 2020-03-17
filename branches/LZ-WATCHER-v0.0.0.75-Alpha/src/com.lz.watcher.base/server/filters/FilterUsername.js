/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-03-03 15:58:28
 * @version   v1.0.0
 * filename   FilterUsername
 * function   用户名过滤器
 ***************************************************************************/

const com = require('../../../../lib/com.lz.mevn.namespace/Namespace.js');
const FilterBase = require('../../../../lib/com.lz.mevn.module.filter/FilterBase.js');
const FilterCheck = require('../../../../lib/com.lz.mevn.module.filter/FilterCheck.js');
const FilterSanitisation = require('../../../../lib/com.lz.mevn.module.filter/FilterSanitisation.js');

com.lz.mevn.module.filter.FilterUsername = com.lz.mevn.module.filter.FilterBase.extend({

    // 类名
    NAME : 'com.lz.mevn.module.filter.FilterUsername',

    /**
     * @method
     * 构造函数
     *
     * @param  {String} username 处理目标
     * @return {}
     */
    init : function (username) {
        this._super();
        this.username = username;
        this.permission = true;
    },

    /**
     * @method
     * 过滤器执行
     * options: {
     *     sanitisation: 除杂标准,
     *     transformation: 变形标准,
     *     check: 校验标准
     * }
     *
     * @param  {Object} options 过滤标准
     * @return {Object}         原对象
     */
    doFilter : function (options) {
        this.username = this.sanitise(options.sanitisation).username;
        // this.permission = this.check(options.check);
        return this;
    },

    /**
     * @method
     * 校验用户名
     * options: {
     *     maxLength: 最大长度
     *     minLength: 最小长度
     * }
     *
     * @param  {Object}  options 校验标准
     * @return {Boolean}         true：校验通过；false：校验失败
     */
    check : function (options) {
        let filterCheck = new com.lz.mevn.module.filter.FilterCheck(this.username);
        filterCheck.limitMaxLength(options.maxLength)
            .limitMinLength(options.minLength);
        return filterCheck.pass;
    },

    /**
     * @method
     * 除杂用户名
     * 动态时使用（未完善）options: {
     *     offAllSpaces: true  去除所有空格
     * }
     *
     * @param  {Object} options 除杂标准
     * @return {Object}         原对象
     */
    sanitise : function (options) {
        let filterSanitisation = new com.lz.mevn.module.filter.FilterSanitisation(this.username);
        this.username = filterSanitisation.offAllSpaces().target;
        return this;
    },

    transform : function (options) {
        return this;
    }
});

module.exports = com.lz.mevn.module.filter.FilterUsername;