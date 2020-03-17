<template>
    <div class="app-panel">
        <div class="app-panel-south" v-show="viewAppPanel">
            <Row class="row-south" align="middle" justify="center">
                <Col class="col-south" span="3"></Col>
                <Col class="col-south" span="6">
                    <div class="app-panel-south-block" @click="jumpToUrl('/home/realtimeData')">
                        <Icon class="appPanel-icon" ref="app_panel_icon" type="md-pulse" size="150"/>
                        <span>实时数据</span>
                    </div>
                </Col>
                <Col class="col-south" span="6">
                    <div class="app-panel-south-block" @click="jumpToUrl('/home/dataTable')">
                        <Icon class="appPanel-icon" ref="app_panel_icon" type="ios-stats" size="150"/>
                        <span>数据报表</span>
                    </div>
                </Col>
                <Col class="col-south" span="6">
                    <div class="app-panel-south-block" @click="jumpToUrl('/home/systemConfig')">
                        <Icon class="appPanel-icon" ref="app_panel_icon" type="md-settings" size="150"/>
                        <span>系统设置</span>
                    </div>
                </Col>
                <Col class="col-south" span="3"></Col>
            </Row>
            <Row class="row-south" align="middle" justify="center">
                <Col class="col-south" span="3"></Col>
                <Col class="col-south" span="6">
                    <div class="app-panel-south-block" @click="jumpToUrl('/home/userAdmin')">
                        <Icon class="appPanel-icon" ref="app_panel_icon" type="md-people" size="150"/>
                        <span>用户管理</span>
                    </div>
                </Col>
                <Col class="col-south" span="6">
                    <div class="app-panel-south-block" @click="jumpToUrl('/home/systemAdmin')">
                        <Icon class="appPanel-icon" ref="app_panel_icon" type="ios-list-box" size="150"/>
                        <span>系统管理</span>
                    </div>
                </Col>
                <Col class="col-south" span="6">
                    <div class="app-panel-south-block" @click="jumpToUrl('/home/drawingMaking')">
                        <Icon class="appPanel-icon" ref="app_panel_icon" type="md-git-compare" size="150"/>
                        <span>制图</span>
                    </div>
                </Col>
                <Col class="col-south" span="3"></Col>
            </Row>
        </div>
    </div>
</template>

<script type="text/javascript">
export default {
    name: 'PanelApp',
    components: {},
    data () {
        return {

        }
    },
    computed: {
        viewAppPanel () {
            return this.$store.getters.getViewAppPanel;
        }
    },
    methods: {
        /**
         * @method
         * 跳转链接
         *
         * @param  {String} route 路径
         * @return {}
         */
        jumpToUrl (route) {
            this.$router.push({path: route});
            this.$store.dispatch('setViewAppPanelVal', false);
        }
    }
}
</script>

<style scoped lang="scss" type="text/css">
@import '../../stylesheets/gColor.scss';
@import '../../stylesheets/gSize.scss';

.app-panel, .app-panel-south {
    height: 100%;
    color: white;
    font-size: $titleBarContent;
}

.row-south {
    margin: 25px;
}

.col-south {
    padding: 25px 50px;
}

.app-panel-south-block {
    background-color: $grayB4;
    text-align: center;
    height: 100%;
    width: 100%;
}

.app-panel-south-block:hover {
    background-color: $grayW3;
    cursor: pointer;
}

span, .appPanel-icon {
    display: block;
    padding: 15px;
}
</style>
