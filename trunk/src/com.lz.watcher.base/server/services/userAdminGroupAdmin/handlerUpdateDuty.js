/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-05-01 20:44:29
 * @version   v1.0.0
 * filename   handlerUpdateDuty.js
 * function   更新职位
 ***************************************************************************/

// 模型引入
const group_data_authorities = require('../../models/modelGroupAuthority.js');

const handler = {
    doHandler (req, res, next) {
        this.updateDuty(req, res, next);
    },

    updateDuty (req, res, next) {
        group_data_authorities.find().exec((err, doc) => {
            doc[0]['_doc'].authorityData.duty = req.body.authority;
            let result = doc[0]['_doc'];
            group_data_authorities.update({}, {$set: result}, (err) => { if (err) console.log(err); });
        });
        res.json({"process": "success"});
    }
}

module.exports = handler;