/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-04-28 22:34:56
 * @version   v1.0.0
 * filename   handlerUpdateActivation.js
 * function   更新激活状态
 ***************************************************************************/

// 模型引入
const users = require('../../models/modelUser.js');

const handler = {
    doHandler (req, res, next) {
        this.updateActivation(req, res, next);
    },

    updateActivation (req, res, next) {
        users.update({'username': req.body.username}, {$set: {'activation': req.body.activation}}, (err) => {
            if (err) console.log(err);
        });
        res.json({"process": "success"});
    }
}

module.exports = handler;