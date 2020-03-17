/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2018-06-24 16:52:56
 * @version   v1.0.0
 * filename   index.js
 * function   路由入口
 ***************************************************************************/

// lztodo 按需引用组件
import Vue from 'vue';
import VueRouter from 'vue-router';
import iView from 'iview';
// import axios from '../interceptors/interceptorErrorStatus.js';

// 组件模块
import Index from '../../components/Index.vue';
import EntrancePanelApp from '../../components/titleBar/EntrancePanelApp.vue';
import EntrancePanelNone from '../../components/titleBar/EntrancePanelNone.vue';
import SystemConfig from '../../components/systemConfig/SystemConfig.vue';
import SystemAdmin from '../../components/systemAdmin/SystemAdmin.vue';
import UserAdmin from '../../components/userAdmin/UserAdmin.vue';
import DrawingMaking from '../../../../com.lz.watcher.topology/client/components/drawingMaking/DrawingMaking.vue';
// import DataTable from '../../../../com.lz.watcher.topology/client/components/dataTable/DataTable.vue';
// import RealtimeData from '../../../../com.lz.watcher.topology/client/components/realtimeData/RealtimeData.vue';

// 子路由模块
import childrenHome from './childrenHome.js';

Vue.use(VueRouter);
Vue.use(iView);

let permission;

const router = new VueRouter({
    // history模式，区别于hash模式
    mode: 'history',
    routes: [
        {
            path: '',
            component: Index,
            rediect: '/',
            children: [
                {
                    path: '/',
                    name: 'EntrancePanelNone',
                    components: {
                        index: EntrancePanelNone
                    },
                    beforeEnter: (to, from, next) => {
                        if (permission) {
                            router.push({path: '/home'});
                        } else {
                            next();
                        }
                    }
                }, {
                    path: '/home',
                    name: 'EntrancePanelApp',
                    components: {
                        home: EntrancePanelApp,
                        systemConfig: SystemConfig,
                        systemAdmin: SystemAdmin,
                        userAdmin: UserAdmin,
                        drawingMaking: DrawingMaking
                        // dataTable: DataTable,
                        // realtimeData: RealtimeData
                    },
                    // beforeEnter: (to, from, next) => {
                    //     if (permission) {
                    //         next();
                    //     } else {
                    //         router.push({path: '/'});
                    //     }
                    // },
                    children: childrenHome
                }
            ]
        }, {
            path: '*', // 页面不存在的情况下会跳到404页面
            name: 'NotFound',
            hidden: true,
            beforeEnter: (to, from, next) => {
                if (permission) {
                    router.push({path: '/home'});
                } else {
                    router.push({path: '/'});
                }
            }
        }
    ]
});

// // 前置守卫，验证登录状态
// router.beforeEach(async (to, from, next) => {
//     iView.LoadingBar.start();
//     await axios({
//         method: 'get',
//         url: '/loginStatus',
//         timeout: 60000,
//         responseType: 'json'
//     }).then((res) => {
//         permission = res.data.permission;
//     }).catch((err) => {
//         console.log(err);
//     });
//     next();
// });

// // 后置钩子，重启服务后进行的路由切换都会被强制跳转到index页
// router.afterEach((to, from) => {
//     iView.LoadingBar.finish();
//     if (!permission) {
//         router.push({path: '/'});
//     }
// });

export default router;
