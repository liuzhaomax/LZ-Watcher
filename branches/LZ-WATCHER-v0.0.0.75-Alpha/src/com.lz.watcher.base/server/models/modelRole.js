/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-04-06 22:40:05
 * @version   v1.0.0
 * filename   modelRole.js
 * function   角色表
 ***************************************************************************/

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schemaRole = new Schema({
    role : {type: String, required: true, default: 'monitor_specialist', trim: true}
}, {versionKey: false});

let model = mongoose.model('roles', schemaRole);

module.exports = model;