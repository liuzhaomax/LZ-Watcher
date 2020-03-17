/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-03-15 00:52:46
 * @version   v1.0.0
 * filename   getPublicKey.js
 * function   获取RSA公钥
 ***************************************************************************/

import Vue from 'vue';

/**
 * @method
 * 利用后端API获取RSA公钥，并存入Vue全局变量
 *
 * @param  {Object} _this VueComponent对象
 * @return {}
 */
let getPublicKey = (_this) => {
    _this.$ajax({
        method: 'get',
        url: '/api/publicKey',
        timeout: 60000,
        responseType: 'text'
    }).then((res) => {
        Vue.prototype.publicKey = res.data;
    }).catch((err) => {
        console.log(err);
    });
}

export default getPublicKey;
