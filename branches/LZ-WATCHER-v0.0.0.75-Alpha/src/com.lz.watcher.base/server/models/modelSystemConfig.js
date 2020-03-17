/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-03-25 22:46:51
 * @version   v1.0.0
 * filename   modelSystemConfig.js
 * function   系统设置模型
 ***************************************************************************/

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schemaSystemConfig = new Schema({
    index: {type: String, required: true, default: 'default', trim: true, unique: true},
    base: {
        systemTitle: {type: String, required: true, default: 'SystemTitle', trim: true, min: 4, max: 128},
        passwordDefault: {type: String, required: true, default: '123456', trim: true, min: 4, max: 32}
    },
    monitor: {
        alarmSoundStatus: {type: Boolean, required: true, default: true}
    }
}, {versionKey: false});

let model = mongoose.model('system_configs', schemaSystemConfig)

module.exports = model;