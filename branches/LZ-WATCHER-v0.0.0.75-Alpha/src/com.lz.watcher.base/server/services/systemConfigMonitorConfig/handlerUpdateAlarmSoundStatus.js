/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-05-01 21:10:13
 * @version   v1.0.0
 * filename   handlerUpdateAlarmSoundStatus.js
 * function   更新警报铃声状态
 ***************************************************************************/

const ctx = require('../../../../context.js');
// 模型引入
const system_configs = require('../../models/modelSystemConfig.js');

const handler = {
    doHandler (req, res, next) {
        this.updateAlarmSoundStatus(req, res, next);
    },

    updateAlarmSoundStatus (req, res, next) {
        ctx.systemConfig.monitor.alarmSound = req.body.data;
        system_configs.update({'index': 'default'}, { $set: ctx.systemConfig }, (err) => {});
        res.json({"process": "success"});
    }
}

module.exports = handler;