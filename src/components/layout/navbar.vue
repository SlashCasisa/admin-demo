<template>
  <div class="navbar-container">
    <div class="admin-name">管理系统</div>
    <div class="navbar">
      <el-menu :default-active="activeMenu()" active-text-color="#ffd04b" mode="horizontal" background-color="#293D4B"
        text-color="#fff" @select="handleSelect">
        <el-menu-item :index="resolvePath(item.path)" v-for="item in routes" :key="item.path">
          <template slot="title">
            <i class="iconfont navbar-icon" :class="`${item.meta.icon}`" />
            <span v-if="item.meta && item.meta.title" slot="title">{{ item.meta.title }}</span>
          </template>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- <div>
            关于
        </div>
        <div>
            账号
    </div>-->
    <div @click="handleOut" class="exit">退出</div>
  </div>
</template>

<script>
  import path from "path";
  import {
    removeToken
  } from "@/utils/cookies/token.js";
  export default {
    name: "navbar",
    data() {
      return {};
    },
    computed: {
      routes() {
        let arr = [];
        console.log(this.$router.options.routes, 'this666888.routes')
        for (let item of this.$router.options.routes) {
          if (!item.hidden) {
            arr.push(item);
          }
        }
        // let arr = this.$router.options.routes.map((item,index)=>{
        //     if(!item.hidden){
        //     //    console.log(item)
        //         return item
        //     }else{
        //         arr.splice(index,1)
        //     }
        // })
        console.log(arr, "arr");
        return arr;
      }
    },
    created() {
      this.activeMenu();
    },
    methods: {
      activeMenu() {
        //激活当前地址的第一级菜单
        // console.log(this.$route, this.$router.options.routes, 'route@@@')
        const route = this.$route;
        const {
          meta,
          path
        } = route;

        let first_path = this.filteroneRoutes(path, this.routes, null);
        this.push_sidebar_routes(first_path);
        if (meta.activeMenu) {
          return meta.activeMenu;
        }

        return first_path;
      },
      handleSelect(key) {
        this.$router.push({
          path: key
        });
      },
      //path:要查找的路由变量路径
      //routes：路由数组
      //first_path：返回的第一个变量路由路径
      filteroneRoutes(path, routes, first_path) {
        //查找当前的首级路由
        for (let i = 0; i < routes.length; i++) {
          if (routes[i].path === path) {
            if (first_path === null) {
              //如果有first_pat有值则说明不是第一次调用递归
              first_path = routes[i].path;
              return first_path;
            } else {
              //如果first_path:undefined则说明是第一次调用
              return first_path;
            }
          } else if (routes[i].children && routes[i].children.length > 0) {
            if (first_path === null) {
              let data = this.filteroneRoutes(
                path,
                routes[i].children,
                routes[i].path
              );
              if (data) {
                return data;
              }
            } else {
              let data2 = this.filteroneRoutes(
                path,
                routes[i].children,
                first_path
              );
              if (data2) {
                return data2;
              }
            }
          }
        }
      },
      push_sidebar_routes(path) {
        for (let i = 0; i < this.routes.length; i++) {
          if (this.routes[i] && this.routes[i].path === path) {
            this.$store.commit("SET_SIDEBAR_ROUTES", this.routes[i].children);
          }
        }
      },
      resolvePath(routePath) {
        const isExternal = routePath => /^(https?:|mailto:|tel:)/.test(routePath);
        console.log(routePath, 'routePath****')
        if (isExternal(routePath)) {
          return routePath;
        }
        // console.log(routePath)
        // if (isExternal(this.basePath)) {
        //     return this.basePath
        // }
        // return path.resolve(this.basePath, routePath)
        return path.resolve(routePath);
      },
      handleOut() {
        removeToken();
        this.$router.push({
          path: "/login"
        });
      }
    }
  };
</script>
<style lang="scss">
  .navbar-container {
    background: #293d4b;
    display: flex;
    color: #fff;
    align-items: center;

    .admin-name {
      width: 200px;
    }

    .navbar {
      flex-grow: 2;

      .navbar-icon {
        padding-right: 10px;
      }
    }

    .exit {
      padding-right: 10px;

      &:hover {
        cursor: pointer;
      }
    }
  }
</style>