<template>
  <div class="user">
    <h2>{{ $route.meta.title[$route.meta.title.length - 1] }}</h2>
    <el-form :model="userData"
             status-icon
             :rules="rules"
             ref="userData"
             label-width="100px"
             label-position="top"
             class="form"
    >
      <div class="main-wrap" style="min-height: calc(100vh - 22rem)">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userData.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userData.email"></el-input>
        </el-form-item>
      </div>

      <el-form-item style="text-align: right">
        <el-button type="primary" @click="submitForm('userData')">提交</el-button>
        <el-button @click="resetForm('userData')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import UserApi from '../../../api/user.js'

  const checkEmail = (rule, value, callback) => {
    const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
    if (!value) {
      return callback(new Error('邮箱不能为空'))
    }
    setTimeout(() => {
      if (mailReg.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的邮箱格式'))
      }
    }, 100)
  }

  export default {
    data() {
      return {
        userData: {},
        rules: {
          username: [
            {
              required: true,
              message: '请输入用户名',
              trigger: 'blur'
            },
          ],
          email: [
            {
              validator: checkEmail,
              trigger: 'blur',
              required: true,
            }
          ]
        }
      }
    },
    methods: {
      async getUserInfo() {
        const data = await UserApi.getUserData({ id: localStorage.uid })
        this.userData = data.data
      },
      resetForm(formName) {
        this.getUserInfo()
        this.$refs[formName].validate()
      },
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const data = (await UserApi.update({
              username: this.userData.username,
              email: this.userData.email
            })).data
            if (data.ok === 1) {
              this.$message.success('保存成功')
            }
          } else {
            return false
          }
        })
      },
    },
    created() {
      this.getUserInfo()
    }
  }
</script>

<style>
  .user .el-form-item__content {
    max-width: 400px
  }
  body > main > div.wrap > section > section > main > div > form > div.el-form-item.el-form-item--feedback > div {
    max-width: none;
  }
</style>
<style scoped>
  h2 {
    margin: 1rem;
    padding-bottom: .3rem;
    font-weight: 100;
    border-bottom: 1px #eee solid;
  }

  .form {
    margin-left: 2rem;
  }


</style>