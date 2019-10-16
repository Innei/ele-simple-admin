<template>
  <div class="user">
    <h2>{{ $route.meta.title[$route.meta.title.length - 1] }}</h2>
    <el-form :model="data"
             status-icon
             :rules="rules"
             ref="data"
             :label-width="params.labelWidth ? params.labelWidth : '100px'"
             :label-position="params.pos ? params.pos : 'top'"
             class="form"
    >
      <div class="main-wrap" style="min-height: calc(100vh - 22rem)">
        <slot name="items"></slot>
      </div>
      <el-form-item style="text-align: right" v-if="!params.hideSubmit">
        <el-button type="primary" @click="submitForm('data')">提交</el-button>
        <el-button @click="resetForm('data')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    name: 'OptionsLayout',
    props: {
      rules: {
        type: Object,
        default: {}
      },
      data: {},
      params: {
        type: Object,
        default: {}
      }
    },
    methods: {
      resetForm(formName) {
        this.$emit('reset', formName)
        this.$refs[formName].validate()
      },
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
              if (valid) {
                this.$emit('submit')
              } else {
                console.log('验证字段检测到问题')
              }
            }
        )
      },
    },
    created() {
      this.$emit('create')
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