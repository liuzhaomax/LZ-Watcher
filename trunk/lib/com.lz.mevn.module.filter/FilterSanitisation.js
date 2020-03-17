/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-03-03 19:37:51
 * @version   v1.0.0
 * filename   FilterSanitisation
 * function   除杂过滤器
 ***************************************************************************/

const com = require('../com.lz.mevn.namespace/Namespace.js');
const FilterBase = require('../com.lz.mevn.module.filter/FilterBase.js');

com.lz.mevn.module.filter.FilterSanitisation = com.lz.mevn.module.filter.FilterBase.extend({

    // 类名
    NAME : 'com.lz.mevn.module.filter.FilterSanitisation',

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
    },

    /**
     * @method
     * 去除所有空格
     *
     * @return {Object} this
     */
    offAllSpaces : function () {
        switch (typeof this.target) {
            case 'string':
                this.target = this.target.replace(/\s*/g,"");
                break;
        }
        return this;
    }
});

module.exports = com.lz.mevn.module.filter.FilterSanitisation;