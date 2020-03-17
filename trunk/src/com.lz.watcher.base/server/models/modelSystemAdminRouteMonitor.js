/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-03-31 13:55:32
 * @version   v1.0.0
 * filename   modelSystemAdminRouteMonitor.js
 * function   系统管理路径监控模型
 ***************************************************************************/

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schemaSystemAdminRouteMonitor = new Schema({
    uri      : {type: String, required: true, trim: true, unique: true},
    reqTimes : {type: Number, required: true, trim: true},
    resTime  : {type: Number, required: true, trim: true},
    maxSimul : {type: Number, required: true, trim: true}
}, {versionKey: false});

let model = mongoose.model('system_admin_route_monitors', schemaSystemAdminRouteMonitor)

module.exports = model;