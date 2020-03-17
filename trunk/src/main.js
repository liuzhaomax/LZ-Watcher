/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2018-06-24 16:51:52
 * @version   v1.0.0
 * filename   main.j
 * function   前端入口
 ***************************************************************************/

import Vue from 'vue';
import App from './com.lz.watcher.base/client/App.vue';
import Routers from './com.lz.watcher.base/client/javascripts/routers/index.js';
import States from './com.lz.watcher.base/client/javascripts/states/index.js';
import Axios from './com.lz.watcher.base/client/javascripts/interceptors/interceptorErrorStatus.js';
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.config.productionTip = false;

Vue.prototype.$ajax = Axios;

Vue.use(iView);
// 可在.babelrc文件中设置按需加载
// ["import", {
//     "libraryName": "iview",
//     "libraryDirectory": "src/com.lz.watcher.base/client/components"
// }]

// vue注入
/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<App/>',
    router: Routers,
    store: States,
    render: h => h(App)
});
