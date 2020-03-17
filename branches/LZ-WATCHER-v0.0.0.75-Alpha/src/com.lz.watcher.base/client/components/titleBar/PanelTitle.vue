<template>
    <Row class="row-north">
        <Col class="col-north" span="24">
            <div class="panel-north-west">
                <img class="title-logo" src="../../assets/logo.png">
                <div class="btn-login" @click="returnToIndex()">{{ systemTitle }}</div>
            </div>
        </Col>
    </Row>
</template>

<script type="text/javascript">
export default {
    name: 'PanelTitle',
    data () {
        return {
            systemTitle: 'systemTitle'
        }
    },
    mounted () {
        this.getSystemTitle();
    },
    methods: {
        /**
         * @method
         * 返回首页
         *
         * @return {}
         */
        returnToIndex () {
            this.$router.push({path: '/'});
        },

        /**
         * @method
         * 获取系统名称
         *
         * @return {}
         */
        getSystemTitle () {
            this.$ajax({
                method: 'get',
                url: '/systemTitle',
                timeout: 60000,
                responseType: 'json'
            }).then((res) => {
                this.systemTitle = res.data.systemTitle;
            }).catch((err) => {
                console.log(err);
            });
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

.panel-north-west {
    padding: $titleBarTopBottomPadding 0;
    float: left;
}

.title-logo {
    max-height: $titleBarContent;
    max-width: $titleBarContent;
    margin-left: 18px;
    margin-right: 8px;
}

.btn-login {
    display: inline;
    cursor: pointer;
}

.btn-login:hover {
    color: $LightPrimary;
}

</style>
