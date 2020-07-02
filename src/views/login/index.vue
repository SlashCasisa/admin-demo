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
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          setToken("doaks99273014");
          // this.$store.dispatch('Login', this.loginForm).then((res) => {
          //   // console.log(res, 'login')
          //   this.loading = false
          //   const login_info = this.$store.state.user.login_info
          //   if (login_info.error_code === 0) {
          this.$router.push({
            path: this.redirect || "/"
          });
          //   }
          // }).catch(() => {
          this.loading = false;
          // })
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