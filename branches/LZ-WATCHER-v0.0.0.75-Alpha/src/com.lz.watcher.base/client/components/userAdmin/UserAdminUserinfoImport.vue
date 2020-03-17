<template>
    <div class="userinfo-import">
        <Modal class="modal-userinfo-import"
            :value="viewUserinfoImportModal"
            title="用户批量导入"
            width=600
            @on-ok="ok()"
            @on-cancel="cancel()">
            <div class="sub-title">上传注意事项：</div>
            <div class="content">
                <p>1、请使用模板上传；</p>
                <p>2、请确保文件扩展名为“.xlsx”；</p>
                <p>3、“用户名”为必填项，且至少为4个字符，至多为32个字符，若与系统已有用户名重复，将不被录入；</p>
                <p>4、“姓名”未填，系统将自动设置姓名；</p>
                <p>5、“角色”未填，将被默认为“访客”角色；</p>
                <p>6、“分组”、“职位”、“职级”未填，将被默认为没有数据权限，某些数据将不能显示；</p>
                <p>7、请确保“角色”、“分组”、“职位”、“职级”所填内容系统已设置，若与设置不符，将显示为空；</p>
                <p>8、“分组”从最高组至所属组均要填写，使用“-”拼接；“职位”不止一个，使用“兼”字拼接；</p>
                <p>9、“激活状态”未填，将被默认为“激活”状态，“TRUE”为激活，“FALSE”为禁用。</p>
            </div>
            <Upload class="upload" ref="upload" name="userAdminUserinfoImport" type="drag" :max-size="10240" :action="fileAddress" :before-upload="beforeUpload" :format="['xlsx']" :on-success="uploadSuccess" :on-error="uploadError" :on-format-error="uploadFormatError">
                <div class="upload-content">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>点击 或 将文件拖动至虚线框内上传</p>
                </div>
            </Upload>
            <div slot="footer">
                <Button type="text" @click="cancel()">取消</Button>
                <Button type="primary" @click="ok()">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script type="text/javascript">
export default {
    name: 'UserAdminUserinfoImport',
    components: {},
    data () {
        return {
            fileAddress: '/home/userAdmin/accountAdmin/excelUserinfoImport',
            uploadFinished: false,
            uploadList: []
        }
    },
    props: {
        viewUserinfoImportModal: Boolean
    },
    methods: {
        /**
         * @method
         * 上传前操作
         *
         * @return {}
         */
        beforeUpload (file) {
            this.uploadClearing();
            this.uploadFinished = false;
            // // 创建一个 FileReader 对象
            // let reader = new FileReader()
            // // readAsDataURL 方法用于读取指定 Blob 或 File 的内容
            // // 当读操作完成，readyState 变为 DONE，loadend 被触发，此时 result 属性包含数据：URL（以 base64 编码的字符串表示文件的数据）
            // // 读取文件作为 URL 可访问地址
            // reader.readAsDataURL(file);
            // console.log(reader);
            // let _this = this
            // reader.onloadend = function (e) {
            //     file.url = reader.result
            //     _this.uploadList.push(file)
            // }
        },

        /**
         * @method
         * 上传成功响应
         *
         * @return {}
         */
        uploadSuccess (response, file, fileList) {
            this.$Notice.success({ title: '上传成功！请点击“确定”刷新数据！' });
            this.uploadFinished = true;
        },

        /**
         * @method
         * 上传失败响应
         *
         * @return {}
         */
        uploadError () {
            this.$Notice.error({
                title: '错误信息',
                desc: '系统错误，请重新上传。'
            });
            this.uploadClearing();
        },

        /**
         * @method
         * 上传文件扩展名错误响应
         *
         * @return {}
         */
        uploadFormatError () {
            this.$Notice.error({
                title: '错误信息',
                desc: '请确保上传文件的扩展名为“.xlsx”且为模板提供的表头格式。'
            });
            this.uploadClearing();
        },

        /**
         * @method
         * 清除上传列表
         *
         * @return {}
         */
        uploadClearing () {
            this.$refs.upload.clearFiles();
        },

        /**
         * @method
         * 确定按钮
         *
         * @return {}
         */
        ok () {
            this.$Message.info('点击了确定');
            if (this.uploadFinished) {
                this.$Notice.success({ title: '上传数据刷新成功！' });
                this.$emit('on-close', false);
                this.$emit('on-fresh');
                this.uploadFinished = false;
                this.uploadClearing();
            } else {
                this.$Notice.warning({
                    title: '警告',
                    desc: '上传未完成，尚不能解析数据。'
                });
            }
        },

        /**
         * @method
         * 取消按钮
         *
         * @return {}
         */
        cancel () {
            this.$Message.info('点击了取消');
            this.$emit('on-close', false);
        }
    }
}
</script>

<style scoped lang="scss" type="text/css">
.sub-title {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 8px;
}

.content {
    line-height: 24px;
    margin-bottom: 16px;
}

.upload {
    margin-bottom: 8px;
}

.upload-content {
    padding: 20px 0;
}
</style>
