/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-03-13 10:36:49
 * @version   v1.0.0
 * filename   FilterBase
 * function   过滤器基类
 ***************************************************************************/

const com = require('../com.lz.mevn.namespace/Namespace.js');
const _Object = require('../com.lz.mevn.base.core/Object.js');

com.lz.mevn.module.filter.FilterBase = com.lz.mevn.base.core.Object.extend({

    // 类名
    NAME : 'com.lz.mevn.module.filter.FilterBase',

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

module.exports = com.lz.mevn.module.filter.FilterBase;