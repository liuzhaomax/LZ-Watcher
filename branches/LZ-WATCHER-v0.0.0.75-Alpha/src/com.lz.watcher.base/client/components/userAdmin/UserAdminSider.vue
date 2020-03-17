<template>
    <div class="userAdminSider">
        <Sider class="userAdminSider">
            <Menu class="menu" :active-name="activeNameUserAdmin" theme="light" width="auto">
                <MenuItem name="userAdminAccountAdmin" to="/home/userAdmin/accountAdmin" @click.native="showViewUserAdminAccountAdmin()">
                    <Icon type="md-people" />
                    <span>帐户管理</span>
                </MenuItem>
                <MenuItem name="userAdminGroupAdmin" to="/home/userAdmin/groupAdmin" @click.native="showViewUserAdminGroupAdmin()">
                    <Icon type="md-grid" />
                    <span>分组管理</span>
                </MenuItem>
                <MenuItem name="userAdminAuthorityAdmin" to="/home/userAdmin/authorityAdmin" @click.native="showViewUserAdminAuthorityAdmin()">
                    <Icon type="ios-key" />
                    <span>权限管理</span>
                </MenuItem>
            </Menu>
        </Sider>
    </div>
</template>

<script type="text/javascript">
export default {
    name: 'UserAdminSider',
    components: {},
    data () {
        return {

        }
    },
    computed: {
        activeNameUserAdmin () {
            return this.$store.getters.getActiveNameUserAdmin;
        },
        viewUserAdminAccountAdmin () {
            return this.$store.getters.getViewUserAdminAccountAdmin;
        },
        viewUserAdminGroupAdmin () {
            return this.$store.getters.getViewUserAdminGroupAdmin;
        },
        viewUserAdminAuthorityAdmin () {
            return this.$store.getters.getViewUserAdminAuthorityAdmin;
        }
    },
    mounted () {
        this.init();
    },
    methods: {
        /**
         * @method
         * 初始化组件
         *
         * @return {}
         */
        init () {
            if (this.viewUserAdminAccountAdmin) {
                this.$store.dispatch('setActiveNameUserAdminVal', 'userAdminAccountAdmin');
            }
            if (this.viewUserAdminGroupAdmin) {
                this.$store.dispatch('setActiveNameUserAdminVal', 'userAdminGroupAdmin');
            }
            if (this.viewUserAdminAuthorityAdmin) {
                this.$store.dispatch('setActiveNameUserAdminVal', 'userAdminAuthorityAdmin');
            }
        },

        /**
         * @method
         * 将帐户管理MenuItem对应上其页面
         *
         * @return {}
         */
        showViewUserAdminAccountAdmin () {
            this.$store.dispatch('setActiveNameUserAdminVal', 'userAdminAccountAdmin');
            this.$store.dispatch('setViewUserAdminAccountAdminVal', true);
            this.$store.dispatch('setViewUserAdminGroupAdminVal', false);
            this.$store.dispatch('setViewUserAdminAuthorityAdminVal', false);
        },

        /**
         * @method
         * 将分组管理MenuItem对应上其页面
         *
         * @return {}
         */
        showViewUserAdminGroupAdmin () {
            this.$store.dispatch('setActiveNameUserAdminVal', 'userAdminGroupAdmin');
            this.$store.dispatch('setViewUserAdminAccountAdminVal', false);
            this.$store.dispatch('setViewUserAdminGroupAdminVal', true);
            this.$store.dispatch('setViewUserAdminAuthorityAdminVal', false);
        },

        /**
         * @method
         * 将权限管理MenuItem对应上其页面
         *
         * @return {}
         */
        showViewUserAdminAuthorityAdmin () {
            this.$store.dispatch('setActiveNameUserAdminVal', 'userAdminAuthorityAdmin');
            this.$store.dispatch('setViewUserAdminAccountAdminVal', false);
            this.$store.dispatch('setViewUserAdminGroupAdminVal', false);
            this.$store.dispatch('setViewUserAdminAuthorityAdminVal', true);
        }
    }
}
</script>

<style scoped lang="scss" type="text/css">
.userAdminSider {
    position: fixed;
    height: 100vh;
    left: 0;
    overflow: auto;
}

.menu {
    width: auto;
}
</style>
