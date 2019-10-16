<template>
  <layout :params="params">
    <template v-slot:items>
      <el-form-item label="是否开启文章评论过滤">
        <el-switch
            v-model="data.filter"
            active-color="#13ce66"
            inactive-color="#ff4949">
        </el-switch>

      </el-form-item>
      <small style="color:#606266">评论过滤用于过滤纯英文的广告信息</small>
    </template>
  </layout>
</template>

<script>
  import layout from '@/layout/OptionsLayout.vue'

  export default {
    components: {
      layout
    },
    data() {
      return {
        data: {
          filter: true
        },
        params: {
          pos: 'left',
          labelWidth: '300px',
          hideSubmit: true
        }
      }
    }
  }
</script>

<style scoped>

</style>