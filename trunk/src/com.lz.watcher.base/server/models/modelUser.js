/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2018-06-20 20:24:56
 * @version   v1.0.0
 * filename   modelUser.js
 * function   用户信息数据
 ***************************************************************************/

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schemaUser = new Schema({

    // 系统信息
    username   : {type: String, required: true, min: 4, max: 32, trim: true, unique: true},
    password   : {type: String, required: true, min: 4, max: 32, default: 'e10adc3949ba59abbe56e057f20f883e', trim: true},
    activation : {type: Boolean, required: true, default: true},
    role       : {type: Schema.Types.ObjectId, ref: 'roles'},

    // 权限
    authorityFunc : {type: Schema.Types.ObjectId, ref: 'user_func_authorities'},
    authorityData : {type: Schema.Types.ObjectId, ref: 'user_data_authorities'},

    // 个人信息
    realname    : {type: String, required: true, default: 'liuzhaomax', max: 32, trim: true},
    gender      : {type: String, required: false, default: '无', trim: true},
    dateOfBirth : {type: String, required: false, default: '2000-01-01', trim: true},

    // 工作信息
    workId : {type: String, required: false, max: 32, trim: true},

    // 联系方式
    phone   : {type: String, required: false, max: 16, trim: true},
    wechat  : {type: String, required: false, max: 32, trim: true},
    email   : {type: String, required: false, max: 32, trim: true},
    address : {type: String, required: false, max: 128, trim: true}
}, {versionKey: false});

let model = mongoose.model('users', schemaUser);

module.exports = model;
