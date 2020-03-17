/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-03-31 14:03:20
 * @version   v1.0.0
 * filename   modelSystemAdminSessionMonitor.js
 * function   系统管理会话监控模型
 ***************************************************************************/

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schemaSystemAdminSessionMonitor = new Schema({
    sessionId   : {type: String, required: true, trim: true},
    username    : {type: String, required: true, trim: true},
    ip          : {type: String, required: true, trim: true},
    createTime  : {type: String, required: true, trim: true},
    destroyTime : {type: String, required: true, trim: true},
    reqTimes    : {type: Number, required: true, trim: true},
    resTime     : {type: Number, required: true, trim: true},
    maxSimul    : {type: Number, required: true, trim: true}
}, {versionKey: false});

let model = mongoose.model('system_admin_session_monitors', schemaSystemAdminSessionMonitor)

module.exports = model;