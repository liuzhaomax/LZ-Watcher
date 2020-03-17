/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-04-26 18:32:39
 * @version   v1.0.0
 * filename   modelRoleAuthority.js
 * function   角色权限表
 ***************************************************************************/

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schemaAuthorityFunc = new Schema({
    authorityFunc : [{
        title: {type: String, require: true, default: true},
        authority: {type: Boolean, require: true, default: true},
        children: {type: Array, require: true, default: false}
    }]
}, {versionKey: false});

let model = mongoose.model('role_func_authorities', schemaAuthorityFunc);

module.exports = model;