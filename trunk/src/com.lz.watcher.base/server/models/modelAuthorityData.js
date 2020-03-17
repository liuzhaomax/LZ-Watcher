/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-04-07 13:30:40
 * @version   v1.0.0
 * filename   modelAuthorityData.js
 * function   数据权限模型
 ***************************************************************************/

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schemaAuthorityData = new Schema({
    username: {type: String, require: false, default: 'none', unique: true},
    authorityData: {
        group    : {type: Array, require: false, default: []},
        duty     : {type: Array, require: false, default: []},
        jobLevel : {type: Array, require: false, default: []}
    }
}, {versionKey: false});

let model = mongoose.model('user_data_authorities', schemaAuthorityData);

module.exports = model;