/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-03-30 16:46:15
 * @version   v1.0.0
 * filename   modelSystemAdminOpLog.js
 * function   系统管理操作日志模型
 ***************************************************************************/

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schemaSystemAdminOpLog = new Schema({
    username   : {type: String, required: true, trim: true},
    realname   : {type: String, required: true, trim: true},
    method     : {type: String, required: true, trim: true},
    path       : {type: String, required: true, trim: true},
    sessionId  : {type: String, required: true, trim: true},
    resTime    : {type: Number, required: true, trim: true},
    dataLength : {type: String, required: true, trim: true},
    ip         : {type: String, required: true, trim: true},
    opTime     : {type: String, required: true, trim: true}
}, {versionKey: false});

let model = mongoose.model('system_admin_op_logs', schemaSystemAdminOpLog)

module.exports = model;