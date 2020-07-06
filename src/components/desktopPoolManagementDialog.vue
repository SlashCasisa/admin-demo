<template>
  <div v-if="showDialog">
    <el-dialog :visible.sync="showDialog" :close-on-click-modal="false" :title="title">
      <div class="dialog-all-container">
        <el-form ref="dialogForm" :model="dialogForm" :rules="dialogRules">
          <el-form-item
            v-for="item in dialogFormColumn"
            :key="item.prop"
            :prop="item.prop"
            :label="item.label"
          >
            <template v-if="item.type === 'dead'">
              <el-date-picker
                value-format="yyyy-MM-dd"
                v-model="dialogForm[item.prop]"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </template>
            <template v-else>
              <el-input v-model="dialogForm[item.prop]" @keyup.enter.native="handleSumbit"></el-input>
            </template>
          </el-form-item>
        </el-form>
        <div class="dialog-all-footer">
          <el-button type="primary" class="dialog-cancel" @click="showDialog = false">取 消</el-button>
          <el-button
            v-loading.fullscreen.lock="loadingSumbit"
            type="primary"
            element-loading-text="正在处理中，请稍后"
            element-loading-spinner="el-icon-loading"
            @click="handleSumbit"
          >确认</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from "@/api/index.js";
// import { mapGetters } from 'vuex'
export default {
  props: {
    dialogForm: {
      required: true,
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      showDialog: false, // 查看通知弹出框
      loadingSumbit: false, // 提交表单加载

      dialogFormColumn: [
        { label: "名称", prop: "name", type: "input" },
        { label: "时间", prop: "deadline", type: "dead" },
        { label: "内容", prop: "content", type: "input" }
      ],
      // 添加验证
      dialogRules: {
        name: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur",
            type: "string"
          }
        ],
        deadline: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change",
            type: "string"
            // type: "date"
          }
        ],
        content: [
          {
            required: true,
            message: "请输入内容",
            trigger: "change",
            type: "string"
          }
        ]
      }
    };
  },
  computed: {
    // ...mapGetters({
    //   notice_create: 'info_center/notice_create',
    //   notice_file: 'info_center/notice_file'
    // })
    title() {
      if (this.$parent.type === "add") {
        return "新增";
      } else {
        return "编辑";
      }
    },
    addApi() {
      return api.addList;
    },
    editApi() {
      return api.editList;
    }
  },
  created() {},
  watch: {},
  mounted() {},
  methods: {
    openDialog() {
      // 打开弹框
      this.showDialog = true;
    },
    async handleSumbit() {
      console.log(this.dialogForm, "dialogForm");
      // 提交
      // 验证内容不能为空
      // 验证不能为空
      this.$refs["dialogForm"].validate(async valid => {
        if (valid) {
          this.loadingSumbit = true;
          let api = {};
          let page = 1;
          if (this.$parent.type === "add") {
            api = this.addApi;
          } else {
            // this.dialogForm.id = this.$parent.detail.id;
            // this.dialogForm.status = this.$parent.detail.status;
            page = this.$parent.currentPage;
            api = this.editApi;
          }
          // 发请求
          try {
            let res = await api(this.dialogForm);

            this.$message({
              type: "success",
              message: res.message
            });
            if (res) {
              await this.$parent.handleCurrentChange(page); // 刷新父组件列表
              this.showDialog = false;
            }

            this.$refs["dialogForm"].resetFields();
            this.$parent.detail = {};
          } catch (err) {
            this.$message({
              type: "error",
              message: err
            });
          } finally {
            this.loadingSumbit = false;
          }
        }
      });
    }
  }
};
</script>
<style lang="scss">
.el-form-item {
  display: flex;
}
</style>