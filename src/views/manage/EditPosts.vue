<template>
  <el-container>
    <el-main style="width: 100%">
      <el-form ref="form" :model="model">
        <el-form-item>
          <el-input v-model="model.title" placeholder="标题"></el-input>
        </el-form-item>
        <mavonEditor
          class="md"
          ref="md"
          v-model="model.content"
          :toolbars="toolbars"
          @imgAdd="$imgAdd"
        />

        <el-collapse style="margin-top: 3rem">
          <el-collapse-item title="设置" name="1">
            <el-collapse v-model="activeNames">
              <el-collapse-item title="是否过期" name="1-1">
                <p>在这里指定该文章是否存在过期的限制, 以时间计算</p>
                <el-switch
                  v-model="model.isOutdate"
                  active-text="指定过期时间"
                  inactive-text="永不过期"
                ></el-switch>
                <el-collapse-transition>
                  <div class="picker" v-if="model.isOutdate">
                    <el-date-picker
                      v-model="dataTime"
                      type="datetime"
                      placeholder="选择日期时间"
                      :picker-options="pickerOptions"
                      @change="convertTime"
                    ></el-date-picker>
                  </div>
                </el-collapse-transition>
              </el-collapse-item>

              <el-collapse-item title="限制次数" name="1-2">
                <p>指定该文章是否存在访问限制次数, -1 为无限制</p>
                <el-slider
                  style="width: 90%; margin: auto;"
                  show-input
                  v-model="model.limitTime"
                  :min="-1"
                ></el-slider>
              </el-collapse-item>
            </el-collapse>
          </el-collapse-item>
        </el-collapse>
      </el-form>
    </el-main>

    <el-footer>
      <div class="right">
        <el-button type="primary" @click="submit">{{
          id ? '更新' : '发布'
        }}</el-button>
        <el-button @click="save">保存草稿</el-button>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import 'mavon-editor/dist/css/index.css'
import { mavonEditor } from 'mavon-editor'
import { toolbars } from '@/core/toolbar'
import pickerOptions from '@/core/picker'
import postApi from '@/api/post'
import uploadApi from '@/api/upload'
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {
        title: '',
        content: '',
        limitTime: -1,
        isOutdate: false,
        outdateTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).getTime()
      },
      toolbars,
      activeNames: ['1-1'],
      ...pickerOptions,
      dataTime: null
    }
  },
  components: {
    mavonEditor
  },
  methods: {
    async submit() {
      try {
        let response
        if (this.id || this.$route.query.id) {
          response = await postApi.edit(
            this.id || this.$route.query.id,
            this.model
          )
          if (response.data.ok !== 1) {
            this.$message.error('出错了')
          }
        } else {
          response = await postApi.create(this.model)
          this.$message({
            message: '提交成功',
            type: 'success'
          })
        }
        // const response = await postApi.create(this.model);
        this.$router.push('/manage/list')
      } catch (e) {
        this.$message.error('出错了')
      }
    },
    save() {},
    convertTime() {
      this.model.outdateTime = this.dataTime.getTime()
    },
    // async update() {
    //   try {
    //     const response = await postApi.edit(
    //       this.id || this.$route.query.id,
    //       this.model
    //     );
    //     this.$message({
    //       message: "更新成功",
    //       type: "success"
    //     });
    //     this.$router.push("/manage/list");
    //   } catch (e) {
    //     this.$message.error("出错了");
    //   }
    // }
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData()
      formdata.append('file', $file)
      uploadApi.uploadFile(formdata).then(res => {
        // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
        /**
         * $vm 指为mavonEditor实例，可以通过如下两种方式获取
         * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
         * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
         */
        this.$refs.md.$img2Url(pos, res.data.url)
      })
    }
  },
  async created() {
    if (this.id || this.$route.query.id) {
      const response = await postApi.getPost(this.id || this.$route.query.id)
      console.log(1)
      this.model = response.data
      this.dataTime = new Date(this.model.outdateTime)
    }
  }
}
</script>

<style>
.v-note-op.shadow,
.v-note-panel.shadow {
  box-shadow: none !important;
  border-radius: 4px !important;
  border: 1px solid rgb(220, 223, 230) !important;
}
.v-note-op.shadow {
  border-bottom: 0px !important;
  border-bottom-left-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
}
.v-note-panel.shadow {
  border-top-left-radius: 0px !important;
  border-top-right-radius: 0px !important;
}
</style>

<style scoped>
.md {
  min-height: 80vh;
}
.right {
  text-align: right;
}
.picker {
  padding: 0 7rem;
  display: flex;
  justify-content: flex-start;
  margin-top: 2rem;
}
</style>
