<template>
  <div v-loading="loading" class="page-wrapper" element-loading-text="正在拼命加载中"
    element-loading-spinner="el-icon-loading">
    <div class="modules-wrapper">
      <div class="modules-title">
        <div class="title">桌面池管理</div>
      </div>
      <div class="modules-content">
        <div class="search-content">
          <el-button @click="handleDialog('add')">新增</el-button>
        </div>
        <div v-loading="loading_list" class="table-content" element-loading-text="拼命加载中">
          <el-table ref="multipleTable" :data="table_data" class="list-table" tooltip-effect="dark">
            <el-table-column label="序号" align="center" width="200">
              <template slot-scope="scope">
                <span>{{scope.$index+(currentPage - 1) * pageSize + 1}}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="date" label="日期" width="180"> -->
            <el-table-column v-for="item in filterTableColumn" :key="item.prop" :prop="item.prop" :label="item.label">
              <template slot-scope="scope">
                <tableTemplate :scope="scope" :item="item"></tableTemplate>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80">
              <template slot-scope="scope">
                <a class="action-botton" @click="handleDialog('edit',scope.row)">查看</a>
                <a class="action-botton" @click="handleDelete(scope.row.id)">删除</a>
              </template>
            </el-table-column>
          </el-table>
          <div class="footer">
            <el-pagination :current-page.sync="currentPage" :page-size="pageSize" :total="total" background
              class="pagination-container" layout="total, prev, pager, next, jumper"
              @current-change="handleCurrentChange" />
          </div>
        </div>
      </div>
    </div>
    <tableDialog ref="tableDialog" :detail="detail" :type="type" @closeDialog="handleCurrentChange" />
  </div>
</template>

<script>
  import TableList from "@/mixins/table_list"; // 列表公共js
  import api from "@/api/index.js";
  import tableTemplate from "@/components/common/tableTemplate.vue"; // 列表table.vue
  import tableDialog from "@/components/desktopPoolManagementDialog.vue"; // 弹出框页面
  export default {
    mixins: [TableList],
    components: {
      tableTemplate,
      tableDialog
    },
    data() {
      return {
        // label：列表上的header表头内容
        // prop：数据库字段
        filterTableColumn: [{
            label: "ID",
            prop: "id"
          },
          {
            label: "名称",
            prop: "name"
          },
          {
            label: "日期",
            prop: "deadline"
          },
          {
            label: "内容",
            prop: "content"
          },
          {
            label: "状态",
            prop: "status"
          }
        ],

      };
    },
    computed: {
      list_api() {
        return api.getList;
      },
      list_params() {
        return {
          status: -1,
          page: this.currentPage
        };
      },
      delete_api() {
        return api.deleteList;
      },
    },
    watch: {},
    mounted() {},
    methods: {}
  };
</script>
<style lang="scss" scoped>
</style>