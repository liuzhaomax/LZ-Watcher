/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-04-27 17:29:03
 * @version   v1.0.0
 * filename   handlerDownload.js
 * function   下载用户信息模板
 ***************************************************************************/

const handler = {
    doHandler (req, res, next, filePath, fileName) {
        this.getFile(req, res, next, filePath, fileName);
    },

    getFile (req, res, next, filePath, fileName) {
        res.download(filePath, fileName, (err) => {
            if (err) console.log(err);
        });
    }
}

module.exports = handler;