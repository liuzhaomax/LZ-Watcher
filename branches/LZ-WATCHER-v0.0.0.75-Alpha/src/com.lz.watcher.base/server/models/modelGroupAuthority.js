/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-04-26 18:40:56
 * @version   v1.0.0
 * filename   modelGroupAuthority.js
 * function   分组表
 ***************************************************************************/

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schemaAuthorityData = new Schema({
    authorityData: {
        group    : {type: Array, require: false, default: []},
        duty     : {type: Array, require: false, default: []},
        jobLevel : {type: Array, require: false, default: []}
    }
}, {versionKey: false});

let model = mongoose.model('group_data_authorities', schemaAuthorityData);

module.exports = model;