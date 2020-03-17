/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-04-06 22:40:40
 * @version   v1.0.0
 * filename   modelAuthorityFunc.js
 * function   功能权限模型
 ***************************************************************************/

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schemaAuthorityFunc = new Schema({
    username: {type: String, require: false, default: 'none', unique: true},
    authorityFunc : [{
        title: {type: String, require: true, default: true},
        authority: {type: Boolean, require: true, default: true},
        children: {type: Array, require: true, default: false}
    }]
}, {versionKey: false});

let model = mongoose.model('user_func_authorities', schemaAuthorityFunc);

module.exports = model;