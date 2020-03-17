/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-03-30 11:06:03
 * @version   v1.0.0
 * filename   handlerSystemConfig.js
 * function   获取系统设置的基础设置
 ***************************************************************************/

import handlerAuthorityError from './handlerAuthorityError.js';

const handlerSystemConfig = {
    /**
     * @method
     * 同步获取系统设置的基础设置数据
     *
     * @param  {Object}  _this      组件对象
     * @param  {String}  childPath  子路由
     * @return {Promise}            结果promise对象
     */
    async getSystemConfig (_this, childPath) {
        let result = {};
        let childModuleName = childPath.slice(0, 2).slice(1).toUpperCase() + childPath.slice(2);
        await _this.$ajax({
            method: 'get',
            url: '/home/systemConfig' + childPath,
            timeout: 60000,
            responseType: 'json'
        }).then((res) => {
            if (res.data.permission === false) {
                handlerAuthorityError.errorRoute(_this);
            } else {
                result = res.data['systemConfig' + childModuleName];
            }
        }).catch((err) => {
            console.log(err);
        });
        return result;
    },

    /**
     * @method
     * 修改项
     *
     * @param  {Object} _this     组件对象
     * @param  {String} childPath 子路由
     * @param  {String} itemPath  项子路由
     * @param  {String} val       系统名称
     * @return {}
     */
    patchItem (_this, childPath, itemPath, val) {
        _this.$ajax({
            method: 'patch',
            url: '/home/systemConfig' + childPath + itemPath,
            timeout: 60000,
            responseType: 'json',
            data: {
                data: val
            }
        }).then((res) => {
            if (res.data.permission === false) {
                handlerAuthorityError.error(_this);
            }
        }).catch((err) => {
            console.log(err);
        });
    }
}

export default handlerSystemConfig;