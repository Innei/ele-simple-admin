<template>
  <div class="login-container">
    <el-card :header="isLogin ? '请先登录' : '请先注册'" class="login-card">
      <el-form status-icon :model="model" :rules="rules" ref="ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" v-if="!isLogin" prop="confirmPassword">
          <el-input type="password" v-model="model.confirmPassword"></el-input>
        </el-form-item>
        <el-form-item style="text-align: center">
          <el-button type="primary" v-if="isLogin" @click="login('ruleForm')">登陆</el-button>
          <el-button type="primary" v-if="!isLogin" @click="signup('ruleForm')">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import userApi from "@/api/user";

export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (
          this.model.confirmPassword &&
          this.model.confirmPassword !== "" &&
          this.isLogin === false
        ) {
          this.$refs.ruleForm.validateField("confirmPassword");
        }
        callback();
      }
    };

    return {
      model: {
        username: "",
        password: "",
        confirmPassword: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ validator: validatePass, trigger: "blur" }]
      },
      isLogin: true
    };
  },
  methods: {
    async login(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const res = await userApi.login(this.model);
          // sessionStorage.token = res.data.token
          localStorage.token = res.data.token;
          localStorage.uid = res.data.uid;
          this.$router.push("/");
          this.$message({
            type: "success",
            message: "登录成功"
          });
        }
      });
    },
    async signup(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const res = await userApi.signup({
            username: this.model.username,
            password: this.model.password
          });

          if (res.data.ok === 1) {
            this.$message({
              type: "success",
              message: "注册成功"
            });
            this.model = { username: "", password: "" };
            this.isLogin = true;
          }
        }
      });
    }
  },
  created() {
    userApi.getInfo().then(res => {
      if (res.data.ok === 0) {
        console.log(res.data.msg);
        this.isLogin = false;
        this.rules.confirmPassword = [
          {
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请再次输入密码"));
              } else if (value !== this.model.password) {
                callback(new Error("两次输入密码不一致!"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ];
      }
    });
  }
};
</script>

<style>
.login-card {
  width: 25rem;
  margin: 5rem auto;
}
</style>