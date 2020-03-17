<template>
    <Row class="row-north">
        <Col class="col-north" span="12">
            <div class="panel-north-east-west">
                <div class="appPanel" ref="app_panel" @click="toggleViewAppPanel()">
                    <span class="appPanel-name">{{ appPanelName }}</span>
                    <Icon class="appPanel-icon" ref="app_panel_icon" type="md-arrow-dropdown" size="24" v-if="viewAppPanel"/>
                    <Icon class="appPanel-icon" ref="app_panel_icon" type="md-arrow-dropup" size="24" v-if="!(viewAppPanel)"/>
                </div>
            </div>
        </Col>
        <Col class="col-north" span="12">
            <div class="panel-north-east-east">
                <span class="btn-userinfo" @click="showUserinfo()">{{ btnUserinfo }}</span>
                <span class="btn-logout" @click="logout()">{{ btnLogout }}</span>
                <Userinfo :view-userinfo="viewUserinfo" :userinfo="userinfo" @on-close="hideUserinfo()"/>
            </div>
        </Col>
    </Row>
</template>

<script type="text/javascript">
export default {
    name: 'EntrancePanelApp',
    components: {
        Userinfo: require('../userinfo/Userinfo.vue').default
    },
    data () {
        return {
            appPanelName : '应用面板',
            btnLogout    : '退出',
            btnUserinfo  : '个人资料',
            viewUserinfo : false,
            userinfo     : {}
        }
    },
    computed: {
        viewAppPanel () {
            return this.$store.getters.getViewAppPanel;
        }
    },
    mounted () {
        this.getNickname();
    },
    methods: {
        /**
         * @method
         * 退出登录，清除session
         *
         * @return {}
         */
        logout () {
            this.$ajax({
                method: 'delete',
                url: '/loginStatus',
                timeout: 60000,
                responseType: 'json'
            }).then((res) => {
                this.$Notice.success({ title: '退出登录成功！' });
                this.$router.push({path: '/'});
            }).catch((err) => {
                console.log(err);
            });
            // 收起应用面板
            this.$store.dispatch('setViewAppPanelVal', false);
        },

        /**
         * @method
         * 获取昵称
         *
         * @return {}
         */
        getNickname () {
            this.$ajax({
                method: 'get',
                url: '/home/realname',
                timeout: 60000,
                responseType: 'json'
            }).then((res) => {
                this.btnUserinfo = res.data.realname;
            }).catch((err) => {
                console.log(err);
            });
        },

        /**
         * @method
         * 打开userinfo抽屉
         *
         * @return {}
         */
        showUserinfo () {
            this.viewUserinfo = true;
            this.$ajax({
                method: 'get',
                url: '/home/userinfo',
                timeout: 60000,
                responseType: 'json'
            }).then((res) => {
                this.userinfo = res.data.userinfo;
            }).catch((err) => {
                console.log(err);
            });
        },

        /**
         * @method
         * 关闭userinfo抽屉
         *
         * @return {}
         */
        hideUserinfo () {
            this.viewUserinfo = false;
        },

        /**
         * @method
         * 改变应用面板显示状态
         *
         * @return {}
         */
        toggleViewAppPanel () {
            this.$store.dispatch('setViewAppPanelVal', !this.viewAppPanel);
        }
    }
}
</script>

<style scoped lang="scss" type="text/css">
@import '../../stylesheets/gColor.scss';
@import '../../stylesheets/gSize.scss';

.row-north {
    color: white;
    font-size: $titleBarContent;
}

.col-north {
    background-color: $grayB4;
}

.panel-north-east-east {
    padding: $titleBarTopBottomPadding 18px $titleBarTopBottomPadding 0;
    float: right;
}

.appPanel {
    padding: $titleBarTopBottomPadding 0;
    text-align: center;
}

.appPanel:hover {
    background-color: $grayW3;
    cursor: pointer;
}

.btn-logout, .btn-userinfo {
    cursor: pointer;
    padding: 0 8px;
}

.btn-logout:hover, .btn-userinfo:hover {
    color: $LightPrimary;
}

</style>
