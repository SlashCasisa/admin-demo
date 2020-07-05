<template lang="html">
    <el-dialog :title="title" :visible="visible" custom-class="dialog-option" :before-close="beforeClose">
        <el-form ref="form" v-loading="loading_detail || loading_submit" :model="form" :rules="rules"
            :label-position="labelPosition">
            <el-form-item v-if="item.prop !== 'pid'" v-for="item in formColumn" :key="item.prop" :prop="item.prop"
                :label="item.label" :label-width="labelWidth">
                <template v-if="item.inputType === 'radio'">
                    <el-radio-group v-model="form[item.prop]">
                        <el-radio-button v-for="radio in item.radio_list" :key="radio.label" :label="radio.label">
                            {{radio.title}}</el-radio-button>
                    </el-radio-group>
                </template>
                <template v-else-if="item.inputType === 'sort'">
                    <el-input-number v-model="form[item.prop]"></el-input-number>
                </template>
                <template v-else>
                    <el-input v-model="form[item.prop]"></el-input>
                </template>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="hide">取 消</el-button>
            <el-button v-show="!loading_detail" type="primary" @click="btnConfirm" :loading="loading_submit">确 定
            </el-button>
        </div>
    </el-dialog>
</template>

<script>
    import mOption from '@components/mixins/option.js'

    export default {
        name: 'CreditsColumn_option',
        mixins: [mOption],
        props: {
            pid: {
                required: true,
            }
        },
        data() {
            return {
                formColumn: [{
                    required: true,
                    type: 'string',
                    inputType: 'default',
                    prop: 'name',
                    label: '分类名',
                    rules_message: '请输入支部名称',
                }, {
                    required: true,
                    type: 'string',
                    inputType: 'none',
                    prop: 'pid',
                    label: '父分类id',
                    default_value: this.pid,
                }, {
                    required: true,
                    type: 'number',
                    inputType: 'sort',
                    prop: 'sort',
                    label: '排序',
                    rules_message: '请输入排序数字',
                }, {
                    required: true,
                    type: 'number',
                    inputType: 'radio',
                    prop: 'status',
                    label: '状态',
                    default_value: 1,
                    rules_message: '请选择状态',
                    radio_list: [{
                        label: 1,
                        title: '启用'
                    }, {
                        label: 0,
                        title: '禁用'
                    }]
                }],
                groupList: [],
            }
        },
        watch: {
            pid(val) {
                if (this.form) {
                    this.form['pid'] = val;
                }
            }
        },
    }
</script>

<style lang="css">
</style>