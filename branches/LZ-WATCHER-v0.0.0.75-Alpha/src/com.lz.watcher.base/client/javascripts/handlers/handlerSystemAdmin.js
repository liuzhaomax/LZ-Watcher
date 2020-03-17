/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-04-04 00:18:12
 * @version   v1.0.0
 * filename   handlerSystemAdmin.js
 * function   系统管理数据处理器
 ***************************************************************************/

import handlerAuthorityError from './handlerAuthorityError.js';

const handlerSystemAdmin = {
    /**
     * @method
     * 同步获取系统管理的操作日志数据
     *
     * @param  {Object}  _this      组件对象
     * @param  {String}  childPath  子路由
     * @return {Promise}            结果promise对象
     */
    async getSystemAdmin (_this, childPath) {
        let result = {};
        let childModuleName = childPath.slice(0, 2).slice(1).toUpperCase() + childPath.slice(2);
        await _this.$ajax({
            method: 'get',
            url: '/home/systemAdmin' + childPath,
            timeout: 60000,
            responseType: 'json'
        }).then((res) => {
            if (res.data.permission === false) {
                handlerAuthorityError.errorRoute(_this);
            } else {
                result = res.data['systemAdmin' + childModuleName];
            }
        }).catch((err) => {
            console.log(err);
        });
        return result;
    },

    /**
     * @method
     * 同步提交分页页码和分页数据长度
     *
     * @param  {Object} _this     组件对象
     * @param  {String} childPath 子路由
     * @param  {Number} pageNum   分页页码
     * @param  {Number} pageSize  分页数据长度
     * @param  {String} searchVal 搜素值
     * @return {}
     */
    async postSystemAdmin (_this, childPath, pageNum, pageSize, searchVal) {
        await _this.$ajax({
            method: 'post',
            url: '/home/systemAdmin' + childPath,
            timeout: 60000,
            responseType: 'json',
            data: {
                pageNum: pageNum,
                pageSize: pageSize,
                searchVal: searchVal
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

export default handlerSystemAdmin;