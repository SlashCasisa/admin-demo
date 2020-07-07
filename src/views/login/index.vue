<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" class="login-form" :rules="rules">
      <h3 class="title">管理后台</h3>
      <div class="label">账号：</div>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" name="username" type="text" placeholder="账户" />
      </el-form-item>
      <div class="label">密码：</div>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          name="password"
          placeholder="密码"
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          style="width:100%;"
          @click.native.prevent="handleLogin"
        >Sign in</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { setToken } from "@/utils/cookies/token.js";
import api from "@/api/index.js";
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      },
      loading: false,
      redirect: undefined
    };
  },
  mounted() {
    console.log(this.$store, "$$$store");
  },
  watch: {
    // $route: {
    //   handler: function(route) {
    //     this.redirect = route.query && route.query.redirect;
    //     console.log("login_route", this.redirect);
    //   },
    //   immediate: true
    // }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          this.loading = true;
          try {
            let res = await api.login(this.loginForm);
            this.loading = false;
            // this.$store.commit("SET_MENUS", res.menus);
            localStorage.setItem("menus", JSON.stringify(res.menus));
            // setMenu(res.menus);
            setToken("doaks99273014");
            this.$message({
              type: "success",
              message: "登录成功"
            });
            // this.$router.push({
            //   path: this.redirect || "/"
            // });
            this.$router.push({
              path: "/"
            });
          } catch (err) {
            this.loading = false;
            this.$message({
              type: "error",
              message: err
            });
          }
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #293d4b;

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  .login-form {
    width: 30%;
    min-width: 400px;
    border: 1px solid #cccc;
    padding: 10px;
    border-radius: 10px;
  }

  .label {
    text-align: left;
    padding-bottom: 10px;
  }
}
</style>