/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-04-10 09:39:11
 * @version   v1.0.0
 * filename   childrenUserAdmin.js
 * function   用户管理子路由
 ***************************************************************************/

import EntrancePanelApp from '../../components/titleBar/EntrancePanelApp.vue';
import UserAdmin from '../../components/userAdmin/UserAdmin.vue';
import UserAdminSider from '../../components/userAdmin/UserAdminSider.vue';
import UserAdminAccountAdmin from '../../components/userAdmin/UserAdminAccountAdmin.vue';
import UserAdminGroupAdmin from '../../components/userAdmin/UserAdminGroupAdmin.vue';
import UserAdminAuthorityAdmin from '../../components/userAdmin/UserAdminAuthorityAdmin.vue';

const childrenRouterArray = [
    {
        path: '/home/userAdmin/accountAdmin',
        name: 'UserAdminAccountAdmin',
        components: {
            home: EntrancePanelApp,
            userAdmin: UserAdmin,
            userAdminSider: UserAdminSider,
            userAdminAccountAdmin: UserAdminAccountAdmin
        }
    }, {
        path: '/home/userAdmin/groupAdmin',
        name: 'UserAdminGroupAdmin',
        components: {
            home: EntrancePanelApp,
            userAdmin: UserAdmin,
            userAdminSider: UserAdminSider,
            userAdminGroupAdmin: UserAdminGroupAdmin
        }
    }, {
        path: '/home/userAdmin/authorityAdmin',
        name: 'UserAdminAuthorityAdmin',
        components: {
            home: EntrancePanelApp,
            userAdmin: UserAdmin,
            userAdminSider: UserAdminSider,
            userAdminAuthorityAdmin: UserAdminAuthorityAdmin
        }
    }
];

export default childrenRouterArray;