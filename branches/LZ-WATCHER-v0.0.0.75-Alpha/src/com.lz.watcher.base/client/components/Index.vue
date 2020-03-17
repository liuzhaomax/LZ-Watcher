<template>
    <div class="index">
        <Row class="row-north">
            <Col class="col-north" span="8">
                <div class="panel-north-west">
                    <PanelTitle/>
                </div>
            </Col>
            <Col class="col-north" span="16">
                <div class="panel-north-east">
                    <router-view name="index"/>
                    <router-view name="home"/>
                </div>
            </Col>
        </Row>
        <Row class="row-south">
            <Col class="col-south" span="24">
                <div class="content">
                    <AppPanel/>
                    <!-- <router-view name="indexContent"/> -->
                    <!-- <router-view name="homeContent"/> -->
                    <router-view name="realtimeData" v-show="!viewAppPanel"/>
                    <router-view name="dataTable" v-show="!viewAppPanel"/>
                    <router-view name="systemConfig" v-show="!viewAppPanel"/>
                    <router-view name="systemAdmin" v-show="!viewAppPanel"/>
                    <router-view name="userAdmin" v-show="!viewAppPanel"/>
                    <router-view name="authorityAdmin" v-show="!viewAppPanel"/>
                    <router-view name="drawingMaking" v-show="!viewAppPanel"/>
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    name: 'Index',
    components: {
        PanelTitle : require('./titleBar/PanelTitle.vue').default,
        AppPanel : require('./appPanel/AppPanel.vue').default
    },
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
        // 如果要设置过期时间以秒为单位
        setCookie: function (name, value, expireSeconds) {
            var exdate = new Date();
            exdate.setTime(exdate.getTime() + expireSeconds * 1000);
            document.cookie = name + '=' + escape(value) + ((expireSeconds == null) ? '' : ';expires=' + exdate.toGMTString());
        },

        // 函数中的参数为 要获取的cookie键的名称。
        getCookie: function (name) {
            if (document.cookie.length > 0) {
                var start = document.cookie.indexOf(name + '=');
                if (start !== -1) {
                    start = start + name.length + 1;
                    var end = document.cookie.indexOf(';', start);
                    if (end === -1) {
                        end = document.cookie.length;
                    }
                    return unescape(document.cookie.substring(start, end));
                }
            }
            return '';
        },

        // 函数中的参数为，要判断的cookie名称
        checkCookie: function (name) {
            var visitNum = this.getCookie(name);
            console.log(visitNum);
            if (!!visitNum && visitNum !== 0) {
                console.log('你在队列 ' + visitNum + '号位置！');
            } else {
                console.log('你在队列 0 号位置，马上进入');
            }
        }
    }
}
</script>

<style scoped lang="scss" type="text/css">

.index {
    height: 100%;
}

</style>
