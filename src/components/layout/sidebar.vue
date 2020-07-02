<template>
  <div class="sidebar-container">
    <!-- <el-scrollbar wrap-class="scrollbar-wrapper"> -->
    <el-menu
      :default-active="activeMenu()"
      active-text-color="#ffd04b"
      background-color="#293D4B"
      text-color="#fff"
    >
      <sidebarItem v-for="item in routes" :key="item.path" :item="item" />
    </el-menu>
    <!-- </el-scrollbar> -->
  </div>
</template>

<script>
import sidebarItem from "@/components/layout/sidebarItem.vue";
export default {
  name: "sidebar",
  components: {
    sidebarItem
  },
  computed: {
    routes() {
      return this.$store.state.sidebar_routes;
    }
  },
  methods: {
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    }
  }
};
</script>
<style lang="scss">
.sidebar-container {
  min-width: 200px;
  max-width: 200px;
  background: #293d4b;

  .scrollbar-wrapper {
    overflow-x: hidden;
  }
}
</style>