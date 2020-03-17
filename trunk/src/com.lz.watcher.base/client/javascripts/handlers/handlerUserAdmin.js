/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-04-10 10:25:48
 * @version   v1.0.0
 * filename   handlerUserAdmin.js
 * function   用户管理数据处理器
 ***************************************************************************/

import handlerAuthorityError from './handlerAuthorityError.js';

const handlerUserAdmin = {
    /**
     * @method
     * 同步获取用户管理数据
     *
     * @param  {Object}  _this      组件对象
     * @param  {String}  childPath  子路由
     * @param  {String}  itemPath   项子路由
     * @return {Promise}            结果promise对象
     */
    async getUserAdmin (_this, childPath, itemPath) {
        let result = {};
        let childModuleName = childPath.slice(0, 2).slice(1).toUpperCase() + childPath.slice(2);
        let itemName;
        if (itemPath) {
            itemName = itemPath.slice(0, 2).slice(1).toUpperCase() + itemPath.slice(2);
        }
        await _this.$ajax({
            method: 'get',
            url: itemPath ? '/home/userAdmin' + childPath + itemPath : '/home/userAdmin' + childPath,
            timeout: 60000,
            responseType: 'json'
        }).then((res) => {
            if (res.data.permission === false) {
                handlerAuthorityError.errorRoute(_this);
            } else {
                result = itemPath ? res.data['userAdmin' + childModuleName + itemName] : res.data['userAdmin' + childModuleName];
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
     * @param  {Object} _this      组件对象
     * @param  {String} childPath  子路由
     * @param  {String} searchItem 搜索项
     * @param  {String} searchVal  搜素值
     * @return {}
     */
    async postAccountAdmin (_this, childPath, searchItem, searchVal) {
        await _this.$ajax({
            method: 'post',
            url: '/home/userAdmin' + childPath,
            timeout: 60000,
            responseType: 'json',
            data: {
                searchItem: searchItem,
                searchVal: searchVal
            }
        }).then((res) => {
            if (res.data.permission === false) {
                handlerAuthorityError.error(_this);
            }
        }).catch((err) => {
            console.log(err);
        });
    },

    /**
     * @method
     * 修改帐户激活状态
     *
     * @param  {Object}  _this      组件对象
     * @param  {String}  childPath  子路由
     * @param  {String}  itemPath   项子路由
     * @param  {String}  username   用户名
     * @param  {Boolean} activation 激活状态
     * @return {}
     */
    patchAccountActivation (_this, childPath, itemPath, username, activation) {
        _this.$ajax({
            method: 'patch',
            url: '/home/userAdmin' + childPath + itemPath,
            timeout: 60000,
            responseType: 'json',
            data: {
                username: username,
                activation: activation
            }
        }).then((res) => {
            if (res.data.permission === false) {
                handlerAuthorityError.error(_this);
            }
        }).catch((err) => {
            console.log(err);
        });
    },

    /**
     * @method
     * 修改用户信息
     *
     * @param  {Object} _this     组件对象
     * @param  {String} childPath 子路由
     * @param  {String} itemPath  项子路由
     * @param  {String} params    用户基本信息
     * @return {}
     */
    patchUserinfo (_this, childPath, itemPath, params) {
        _this.$ajax({
            method: 'patch',
            url: '/home/userAdmin' + childPath + itemPath,
            timeout: 60000,
            responseType: 'json',
            data: params
        }).then((res) => {
            if (res.data.permission === false) {
                handlerAuthorityError.error(_this);
            }
        }).catch((err) => {
            console.log(err);
        });
    },

    /**
     * @method
     * 删除用户
     *
     * @param  {Object} _this     组件对象
     * @param  {String} childPath 子路由
     * @param  {String} itemPath  项子路由
     * @param  {String} username  用户名
     * @return {}
     */
    deleteAccount (_this, childPath, itemPath, username) {
        _this.$ajax({
            method: 'delete',
            url: '/home/userAdmin' + childPath + itemPath,
            timeout: 60000,
            responseType: 'json',
            data: {
                username: username
            }
        }).then((res) => {
            if (res.data.permission === false) {
                handlerAuthorityError.error(_this);
            }
        }).catch((err) => {
            console.log(err);
        });
    },

    /**
     * @method
     * 修改用户信息中的数据权限和功能权限
     *
     * @param  {Object} _this     组件对象
     * @param  {String} childPath 子路由
     * @param  {String} itemPath  项子路由
     * @param  {String} authority 数据权限或功能权限
     * @return {}
     */
    putUserAdmin (_this, childPath, itemPath, authority) {
        _this.$ajax({
            method: 'put',
            url: '/home/userAdmin' + childPath + itemPath,
            timeout: 60000,
            responseType: 'json',
            data: {
                authority: authority
            }
        }).then((res) => {
            if (res.data.permission === false) {
                handlerAuthorityError.error(_this);
            }
        }).catch((err) => {
            console.log(err);
        });
    },

    /**
     * @method
     * 在改变分组名称后，修改所有用户的分组数据信息
     *
     * @param  {Object} _this     组件对象
     * @param  {String} childPath 子路由
     * @param  {String} itemPath  项子路由
     * @param  {String} oldTitle  旧组名
     * @param  {String} newTitle  新组名
     * @return {}
     */
    patchTitle (_this, childPath, itemPath, oldTitle, newTitle) {
        _this.$ajax({
            method: 'patch',
            url: '/home/userAdmin' + childPath + itemPath,
            timeout: 60000,
            responseType: 'json',
            data: {
                oldTitle: oldTitle,
                newTitle: newTitle
            }
        }).then((res) => {
            if (res.data.permission === false) {
                handlerAuthorityError.error(_this);
            }
        }).catch((err) => {
            console.log(err);
        });
    },

    /**
     * @method
     * 新增用户
     *
     * @param  {Object} _this     组件对象
     * @param  {String} childPath 子路由
     * @param  {String} itemPath  项子路由
     * @param  {Object} newUser   新用户对象
     * @return {}
     */
    async postUserinfo (_this, childPath, itemPath, newUser) {
        let result = {};
        await _this.$ajax({
            method: 'post',
            url: '/home/userAdmin' + childPath + itemPath,
            timeout: 60000,
            responseType: 'json',
            data: {
                newUser: newUser
            }
        }).then((res) => {
            if (res.data.permission === false) {
                handlerAuthorityError.error(_this);
            } else {
                result = res.data;
            }
        }).catch((err) => {
            console.log(err);
        });
        return result;
    },

    /**
     * @method
     * 批量重置密码
     *
     * @param  {Object} _this       组件对象
     * @param  {String} childPath   子路由
     * @param  {String} itemPath    项子路由
     * @param  {String} arrUsername 用户名数组
     * @return {}
     */
    patchUserPassword (_this, childPath, itemPath, arrUsername) {
        _this.$ajax({
            method: 'patch',
            url: '/home/userAdmin' + childPath + itemPath,
            timeout: 60000,
            responseType: 'json',
            data: {
                arrUsername: arrUsername
            }
        }).then((res) => {
            if (res.data.permission === false) {
                handlerAuthorityError.error(_this);
            }
        }).catch((err) => {
            console.log(err);
        });
    },

    /**
     * @method
     * 批量修改帐户激活状态
     *
     * @param  {Object}  _this       组件对象
     * @param  {String}  childPath   子路由
     * @param  {String}  itemPath    项子路由
     * @param  {String}  arrUsername 用户名数组
     * @param  {Boolean} activation  激活状态
     * @return {}
     */
    patchAccountsActivation (_this, childPath, itemPath, arrUsername, activation) {
        _this.$ajax({
            method: 'patch',
            url: '/home/userAdmin' + childPath + itemPath,
            timeout: 60000,
            responseType: 'json',
            data: {
                arrUsername: arrUsername,
                activation: activation
            }
        }).then((res) => {
            if (res.data.permission === false) {
                handlerAuthorityError.error(_this);
            }
        }).catch((err) => {
            console.log(err);
        });
    },

    /**
     * @method
     * 下载文件
     *
     * @param  {Object}  _this       组件对象
     * @param  {String}  childPath   子路由
     * @param  {String}  itemPath    项子路由
     * @return {}
     */
    async getFile (_this, childPath, itemPath) {
        let result;
        await _this.$ajax({
            method: 'get',
            url: '/home/userAdmin' + childPath + itemPath,
            timeout: 60000,
            responseType: 'arraybuffer'
        }).then((res) => {
            if (res.data.permission === false) {
                handlerAuthorityError.error(_this);
            } else {
                result = res.data;
            }
        }).catch((err) => {
            console.log(err);
        });
        return result;
    },

    /**
     * @method
     * 上传文件
     *
     * @param  {Object}  _this       组件对象
     * @param  {String}  childPath   子路由
     * @param  {String}  itemPath    项子路由
     * @param  {String}  buffer      二进制数据流
     * @return {}
     */
    postFile (_this, childPath, itemPath, buffer) {
        _this.$ajax({
            method: 'post',
            url: '/home/userAdmin' + childPath + itemPath,
            timeout: 60000,
            responseType: 'arraybuffer',
            data: {
                buffer: buffer
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

export default handlerUserAdmin;