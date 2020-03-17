/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-03-29 18:53:38
 * @version   v1.0.0
 * filename   childrenHome.js
 * function   主页子路由
 ***************************************************************************/

// 组件模块
// TitleBar
import EntrancePanelApp from '../../components/titleBar/EntrancePanelApp.vue';
// SystemConfig
import SystemConfig from '../../components/systemConfig/SystemConfig.vue';
import SystemConfigSider from '../../components/systemConfig/SystemConfigSider.vue';
import SystemConfigBaseConfig from '../../components/systemConfig/SystemConfigBaseConfig.vue';
import SystemConfigMonitorConfig from '../../components/systemConfig/SystemConfigMonitorConfig.vue';
// SystemAdmin
import SystemAdmin from '../../components/systemAdmin/SystemAdmin.vue';
import SystemAdminSider from '../../components/systemAdmin/SystemAdminSider.vue';
import SystemAdminOpLog from '../../components/systemAdmin/SystemAdminOpLog.vue';
import SystemAdminRouteMonitor from '../../components/systemAdmin/SystemAdminRouteMonitor.vue';
import SystemAdminSessionMonitor from '../../components/systemAdmin/SystemAdminSessionMonitor.vue';
// UserAdmin
import UserAdmin from '../../components/userAdmin/UserAdmin.vue';
import UserAdminSider from '../../components/userAdmin/UserAdminSider.vue';
import UserAdminAccountAdmin from '../../components/userAdmin/UserAdminAccountAdmin.vue';
import UserAdminGroupAdmin from '../../components/userAdmin/UserAdminGroupAdmin.vue';
import UserAdminAuthorityAdmin from '../../components/userAdmin/UserAdminAuthorityAdmin.vue';
// DrawingMaking
import DrawingMaking from '../../../../com.lz.watcher.topology/client/components/drawingMaking/DrawingMaking.vue';
// DataTable
import DataTable from '../../../../com.lz.watcher.topology/client/components/dataTable/DataTable.vue';
// RealtimeData
import RealtimeData from '../../../../com.lz.watcher.topology/client/components/realtimeData/RealtimeData.vue';

// 子路由
import childrenSystemConfig from './childrenSystemConfig.js';
import childrenSystemAdmin from './childrenSystemAdmin.js';
import childrenUserAdmin from './childrenUserAdmin.js';

const childrenHome = [
    {
        path: '/home/systemConfig',
        name: 'SystemConfig',
        redirect: '/home/systemConfig/baseConfig',
        components: {
            home: EntrancePanelApp,
            systemConfig: SystemConfig,
            systemConfigSider: SystemConfigSider,
            systemConfigBaseConfig: SystemConfigBaseConfig,
            systemConfigMonitorConfig: SystemConfigMonitorConfig
        },
        children: childrenSystemConfig
    }, {
        path: '/home/systemAdmin',
        name: 'SystemAdmin',
        redirect: '/home/systemAdmin/opLog',
        components: {
            home: EntrancePanelApp,
            systemAdmin: SystemAdmin,
            systemAdminSider: SystemAdminSider,
            systemAdminOpLog: SystemAdminOpLog,
            systemAdminRouteMonitor: SystemAdminRouteMonitor,
            systemAdminSessionMonitor: SystemAdminSessionMonitor
        },
        children: childrenSystemAdmin
    }, {
        path: '/home/userAdmin',
        name: 'UserAdmin',
        redirect: '/home/userAdmin/accountAdmin',
        components: {
            home: EntrancePanelApp,
            userAdmin: UserAdmin,
            userAdminSider: UserAdminSider,
            userAdminAccountAdmin: UserAdminAccountAdmin,
            userAdminGroupAdmin: UserAdminGroupAdmin,
            userAdminAuthorityAdmin: UserAdminAuthorityAdmin
        },
        children: childrenUserAdmin
    }, {
        path: '/home/drawingMaking',
        name: 'DrawingMaking',
        components: {
            home: EntrancePanelApp,
            drawingMaking: DrawingMaking
        }
    }, {
        path: '/home/dataTable',
        name: 'DataTable',
        components: {
            home: EntrancePanelApp,
            dataTable: DataTable
        }
    }, {
        path: '/home/realtimeData',
        name: 'RealtimeData',
        components: {
            home: EntrancePanelApp,
            realtimeData: RealtimeData
        }
    }
];

export default childrenHome;
