<template>
  <div class="admin-wrapper">
    <!-- 头部 -->
    <navbar />
    <div class="main-container">
      <!-- 左侧菜单 -->
      <sidebar />
      <!-- 右侧内容 -->
      <adminMain />
    </div>
  </div>
</template>
<script>
import Sidebar from "@/components/layout/sidebar.vue";
import Navbar from "@/components/layout/navbar.vue";
import adminMain from "@/components/layout/adminMain.vue";
export default {
  name: "admin",
  components: {
    Navbar,
    Sidebar,
    adminMain
  }
};
</script>
<style lang="scss">
.admin-wrapper {
  height: calc(100% - 61px);
}
.main-container {
  display: flex;
  height: 100%;
}
</style>