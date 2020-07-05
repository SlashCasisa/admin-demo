<template>
  <div
    v-loading="loading"
    class="page-wrapper"
    element-loading-text="正在拼命加载中"
    element-loading-spinner="el-icon-loading"
  >
    <div class="modules-wrapper">
      <div class="modules-title">
        <div class="title">桌面池管理</div>
      </div>
      <div class="modules-content">
        <div class="search-content"></div>
        <div v-loading="loading_list" class="table-content" element-loading-text="拼命加载中">
          <el-table ref="multipleTable" :data="table_data" class="list-table" tooltip-effect="dark">
            <el-table-column label="序号" align="center" width="200">
              <template slot-scope="scope">
                <span>{{scope.$index+(currentPage - 1) * pageSize + 1}}</span>
              </template>
            </el-table-column>

            <el-table-column label="操作" width="80">
              <template slot-scope="scope">
                <a class="action-botton" @click="handleView(scope.row)">查看</a>
              </template>
            </el-table-column>
          </el-table>
          <div class="footer">
            <el-pagination
              :current-page.sync="currentPage"
              :page-size="pageSize"
              :total="total"
              background
              class="pagination-container"
              layout="total, prev, pager, next, jumper"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableList from "@/mixins/table_list"; // 列表公共js
import api from "@/api/index.js";

export default {
  mixins: [TableList],
  data() {
    return {};
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
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
</style>