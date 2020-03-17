/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-03-03 19:40:29
 * @version   v1.0.0
 * filename   FilterTransformation
 * function   变形过滤器
 ***************************************************************************/

const com = require('../com.lz.mevn.namespace/Namespace.js');
const FilterBase = require('../com.lz.mevn.module.filter/FilterBase.js');

com.lz.mevn.module.filter.FilterTransformation = com.lz.mevn.module.filter.FilterBase.extend({

    // 类名
    NAME : 'com.lz.mevn.module.filter.FilterTransformation',

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
    }
});

module.exports = com.lz.mevn.module.filter.FilterTransformation;