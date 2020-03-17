/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-03-30 18:36:11
 * @version   v1.0.0
 * filename   childrenSystemAdmin.js
 * function   系统管理子路由
 ***************************************************************************/

import EntrancePanelApp from '../../components/titleBar/EntrancePanelApp.vue';
import SystemAdmin from '../../components/systemAdmin/SystemAdmin.vue';
import SystemAdminSider from '../../components/systemAdmin/SystemAdminSider.vue';
import SystemAdminOpLog from '../../components/systemAdmin/SystemAdminOpLog.vue';
import SystemAdminRouteMonitor from '../../components/systemAdmin/SystemAdminRouteMonitor.vue';
import SystemAdminSessionMonitor from '../../components/systemAdmin/SystemAdminSessionMonitor.vue';

const childrenRouterArray = [
    {
        path: '/home/systemAdmin/opLog',
        name: 'SystemAdminOpLog',
        components: {
            home: EntrancePanelApp,
            systemAdmin: SystemAdmin,
            systemAdminSider: SystemAdminSider,
            systemAdminOpLog: SystemAdminOpLog
        }
    }, {
        path: '/home/systemAdmin/routeMonitor',
        name: 'SystemAdminRouteMonitor',
        components: {
            home: EntrancePanelApp,
            systemAdmin: SystemAdmin,
            systemAdminSider: SystemAdminSider,
            systemAdminRouteMonitor: SystemAdminRouteMonitor
        }
    }, {
        path: '/home/systemAdmin/sessionMonitor',
        name: 'SystemAdminSessionMonitor',
        components: {
            home: EntrancePanelApp,
            systemAdmin: SystemAdmin,
            systemAdminSider: SystemAdminSider,
            systemAdminSessionMonitor: SystemAdminSessionMonitor
        }
    }
];

export default childrenRouterArray;