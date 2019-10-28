<template>
  <layout :data="data" :rules="rules" @submit="submit" @reset="reset($e)">
    <template v-slot:items>
      <h2>密码设置</h2>
      <el-form-item label="请输入旧密码" prop="password">
        <el-input v-model="data.password" autocomplete="off" type="password"></el-input>
      </el-form-item>
      <el-form-item label="请输入新密码" prop="newPassword">
        <el-input v-model="data.newPassword" autocomplete="off" type="password"></el-input>
      </el-form-item>
      <el-form-item label="重新输入新密码" prop="checkPass">
        <el-input v-model="data.checkPass" autocomplete="off" type="password"></el-input>
      </el-form-item>
    </template>
  </layout>
</template>

<script>
  import layout from '@/layout/OptionsLayout.vue'
  import userApi from '@/api/user'

  export default {
    data() {
      const that = this
      return {
        data: {
          password: '',
          newPassword: '',
          checkPass: '',
        },
        rules: {
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }],
          newPassword: [
            {
              validator(rule, value, callback) {
                if (value === '') {
                  callback(new Error('请输入密码'))
                } else {
                  if (that.data.password === value) {
                    callback(new Error('新密码不能与旧密码重复'))
                  }
                  callback()
                }
              },
              trigger: 'blur',
              required: true
            }
          ],
          checkPass: [
            {
              validator: (rule, value, callback) => {
                if (value === '') {
                  callback(new Error('请再次输入密码'))
                } else if (value !== this.data.newPassword) {
                  callback(new Error('两次输入密码不一致!'))
                } else {
                  callback()
                }
              },
              trigger: 'blur',
              required: true
            }
          ],
        }
      }
    },
    components: {
      layout
    },
    methods: {
      async submit() {
        const data = (await userApi.reset(this.data)).data
        if (data.ok === 1 && data.nModified === 1) {
          this.$message.success('修改成功')
          localStorage.clear()
          this.$router.push('/login')
        }
      },
      reset() {
        for (const key of Object.keys(this.data)) {
          this.data[key] = ''
        }
      }
    }
  }
</script>

<style scoped>
  h2 {
    font-weight: 100;
    font-size: 1.3rem;
    padding-bottom: .3rem;
    border-bottom: .7px solid #eee;
    display: inline-block;
  }
</style>