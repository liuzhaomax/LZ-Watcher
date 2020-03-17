<template>
    <div class="userAdmin">
        <router-view name="userAdminSider" v-show="viewUserAdminSider"/>
        <router-view name="userAdminAccountAdmin" v-show="viewUserAdminAccountAdmin"/>
        <router-view name="userAdminGroupAdmin" v-show="viewUserAdminGroupAdmin"/>
        <router-view name="userAdminAuthorityAdmin" v-show="viewUserAdminAuthorityAdmin"/>
    </div>
</template>

<script type="text/javascript">
export default {
    name: 'userAdmin',
    components: {},
    data () {
        return {

        }
    },
    computed: {
        viewUserAdminSider () {
            return this.$store.getters.getViewUserAdminSider;
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
         * 初始化组件，直接刷新路由的初始化状态机调整
         *
         * @return {}
         */
        init () {
            let component = this.$el.baseURI.split('/');
            component = component[component.length - 1];
            component = 'userAdmin' + component.slice(0, 1).toUpperCase() + component.slice(1);
            this.$store.dispatch('setActiveNameUserAdminVal', component);
            if (component === 'UserAdminAccountAdmin') {
                this.$store.dispatch('setViewUserAdminAccountAdminVal', true);
                this.$store.dispatch('setViewUserAdminGroupAdminVal', false);
                this.$store.dispatch('setViewUserAdminAuthorityAdminVal', false);
            }
            if (component === 'userAdminGroupAdmin') {
                this.$store.dispatch('setViewUserAdminAccountAdminVal', false);
                this.$store.dispatch('setViewUserAdminGroupAdminVal', true);
                this.$store.dispatch('setViewUserAdminAuthorityAdminVal', false);
            }
            if (component === 'userAdminAuthorityAdmin') {
                this.$store.dispatch('setViewUserAdminAccountAdminVal', false);
                this.$store.dispatch('setViewUserAdminGroupAdminVal', false);
                this.$store.dispatch('setViewUserAdminAuthorityAdminVal', true);
            }
        }
    }
}
</script>

<style scoped lang="scss" type="text/css">
@import '../../stylesheets/gColor.scss';
.userAdmin {
    background: #f5f7f9;
    position: relative;
    overflow: hidden;
    height: 100%;
    width: 100%;
}

</style>
