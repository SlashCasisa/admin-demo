<template>
    <div v-if="showDialog">
        <el-dialog :visible.sync="showDialog" :close-on-click-modal="false" :title="title">
            <div class="dialog-all-container">
                <el-form ref="Form" :model="form" :rules="rules">
                    <el-form-item label="类型">
                        通知
                    </el-form-item>
                </el-form>
                <div class="dialog-all-footer">
                    <el-button type="primary" class="dialog-cancel" @click="shoDialog = false">取 消</el-button>
                    <el-button v-loading.fullscreen.lock="loading_sumbit" type="primary"
                        element-loading-text="正在处理中，请稍后" element-loading-spinner="el-icon-loading"
                        @click="handleComfirm">确认
                    </el-button>
                </div>

            </div>
        </el-dialog>
    </div>
</template>

<script>
    // import { mapGetters } from 'vuex'
    export default {
        props: {
            type: {
                required: true,
                type: String
            },
            detail: {
                required: true,
                type: Object
            }
        },
        data() {
            return {
                showDialog: false, // 查看通知弹出框
                loading_sumbit: false, // 编辑提交加载
                form: {
                    title: '',
                    content: ''
                },
                // 添加验证
                rules: {
                    title: [{
                        required: true,
                        message: '请输入标题',
                        trigger: 'blur',
                        type: 'string'
                    }],
                    content: [{
                        required: true,
                        message: '请输入内容',
                        trigger: 'blur',
                        type: 'string'
                    }]
                },
            }
        },
        computed: {
            // ...mapGetters({
            //   notice_create: 'info_center/notice_create',
            //   notice_file: 'info_center/notice_file'
            // })
            title() {
                if (this.type === "add") {
                    return '新增'
                } else {
                    return '编辑'
                }
            }
        },
        watch: {},
        mounted() {},
        methods: {
            openDialog() { // 打开弹框
                this.showDialog = true
            },
            async handleComfirm() { // 提交
                // 验证内容不能为空
                const sumbit_form = {
                    type: 1,
                    title: this.form.title,
                    content: this.form.content,
                    startTime: this.beginDate,
                    endTime: this.endDate,
                    annex: this.uploadata[0] ? this.notice_file.data : ''
                }
                console.log(sumbit_form)
                // 验证不能为空
                this.$refs['Form'].validate(async (valid) => {
                    if (valid) {
                        this.loading_sumbit = true
                        // 发请求
                        await this.$store.dispatch('info_center/notice_create', sumbit_form)
                        this.loading_sumbit = false
                        if (this.notice_create.error_code === 0) {
                            this.$message({
                                type: 'success',
                                message: this.notice_create.data
                            })
                        }
                        // this.$emit('closeAddDialog') // 刷新父组件列表
                        this.showDialog = false
                        this.form = {
                            title: '',
                            content: '' // 内容解析
                        }
                        this.data_value = ''
                        this.beginDate = ''
                        this.endDate = ''
                        this.uploadata = [] // 清除数组
                        this.$refs.newupload.clearFiles() // 清空上传组件列表
                    }
                })
            }
        }

    }
</script>