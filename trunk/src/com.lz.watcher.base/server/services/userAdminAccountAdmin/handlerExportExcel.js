/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-04-28 17:01:48
 * @version   v1.0.0
 * filename   handlerExportExcel.js
 * function   导出Excel
 ***************************************************************************/

const ctx  = require('../../../../context.js');
const xlsx = require('node-xlsx');
// 模型引入
const users = require('../../models/modelUser.js');

const handler = {
    doHandler (req, res, next) {
        this.getAllUsers(req, res, next);
    },

    getAllUsers (req, res, next) {
        users.find()
            .populate({path: 'role', select: {role: 1}})
            .populate({path: 'authorityFunc', select: {authorityFunc: 1}})
            .populate({path: 'authorityData', select: {authorityData: 1}})
            .exec((err, doc) => {
            // excel数据是个二位数组，一维对应行，二维对应列
            // 例子：[[1,2],[3,4]]
            // [1  2
            //  3  4]
            let data = [];
            let data0 = [];
            for (let i = 0; i < ctx.userinfoExcelHeaderArray.length; i++) {
                data0.push(ctx.userinfoExcelHeader[ctx.userinfoExcelHeaderArray[i]]);
            }
            data.push(data0);
            let dataN = [];
            for (let i = 0; i < doc.length; i++) {
                dataN = [];
                for (let j = 0; j < ctx.userinfoExcelHeaderArray.length; j++) {
                    if (ctx.userinfoExcelHeaderArray[j] === 'role') {
                        dataN.push(doc[i]['_doc'].role[ctx.userinfoExcelHeaderArray[j]]);
                    } else if (ctx.userinfoExcelHeaderArray[j] === 'group') {
                        let result1 = '';
                        for (let m = 1; m < doc[i]['_doc'].authorityData.authorityData[ctx.userinfoExcelHeaderArray[j]].length; m++) {
                            if (m === 1) {
                                result1 = doc[i]['_doc'].authorityData.authorityData[ctx.userinfoExcelHeaderArray[j]][m];
                            } else {
                                result1 = result1 + '-' + doc[i]['_doc'].authorityData.authorityData[ctx.userinfoExcelHeaderArray[j]][m];
                            }
                        }
                        dataN.push(result1);
                    } else if (ctx.userinfoExcelHeaderArray[j] === 'duty') {
                        let result2 = '';
                        for (let n = 0; n < doc[i]['_doc'].authorityData.authorityData[ctx.userinfoExcelHeaderArray[j]].length; n++) {
                            if (n === 0) {
                                result2 = doc[i]['_doc'].authorityData.authorityData[ctx.userinfoExcelHeaderArray[j]][n];
                            } else {
                                result2 = result2 + '兼' + doc[i]['_doc'].authorityData.authorityData[ctx.userinfoExcelHeaderArray[j]][n];
                            }
                        }
                        dataN.push(result2);
                    } else if (ctx.userinfoExcelHeaderArray[j] === 'jobLevel') {
                        dataN.push(doc[i]['_doc'].authorityData.authorityData[ctx.userinfoExcelHeaderArray[j]][0]);
                    } else {
                        dataN.push(doc[i]['_doc'][ctx.userinfoExcelHeaderArray[j]]);
                    }
                }
                if (dataN[0] !== 'admin') {
                    data.push(dataN);
                }
            }
            let buffer = xlsx.build([{name: '用户信息', data: data}]);
            res.send(buffer);
        });
    }
}

module.exports = handler;