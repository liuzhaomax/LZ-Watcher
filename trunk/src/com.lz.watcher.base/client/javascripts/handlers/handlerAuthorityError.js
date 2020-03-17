/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-04-09 22:19:57
 * @version   v1.0.0
 * filename   handlerAuthorityError.js
 * function   权限错误处理
 ***************************************************************************/

const handlerAuthorityError = {
    /**
     * @method
     * 无权限错误处理
     *
     * @param  {Object} vc VueComponent对象
     * @return {}
     */
    errorRoute (vc) {
        this.error(vc);
        vc.$router.back(-1);
    },

    /**
     * @method
     * 无权限错误处理
     *
     * @param  {Object} vc VueComponent对象
     * @return {}
     */
    error (vc) {
        vc.$Modal.error({
            title: '错误信息',
            content: '对不起，您的操作未经授权！本次操作数据将被重置，请刷新页面重新加载数据！'
        });
    }
}

export default handlerAuthorityError;