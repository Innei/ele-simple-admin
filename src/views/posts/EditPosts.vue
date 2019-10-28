<template>
  <el-container>
    <el-main>
      <el-form ref="form" :model="model">
        <el-form-item>
          <el-input v-model="model.title" :autofocus="id ? false : true" placeholder="标题"></el-input>
        </el-form-item>
        <mavonEditor
          :boxShadow="false"
          :autofocus="false"
          @change="autoSavePost()"
          @save="save(false)"
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
                <el-switch v-model="model.isOutdate" active-text="指定过期时间" inactive-text="永不过期"></el-switch>
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

    <el-footer
      class="footer"
      @mouseover.native="mouseOverOpacity"
      @mouseleave.native="mouseLeaveOpacity"
    >
      <div class="right" style="transition: opacity .5s;opacity: .3">
        <el-button v-if="hasDraft" @click="goToDraftConfirm">跳转草稿</el-button>
        <el-button type="primary" @click="submit()">
          {{
          id ? draft ? '发布' : '更新' : '发布'
          }}
        </el-button>
        <el-button @click="save">保存草稿</el-button>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import "mavon-editor/dist/css/index.css";
import { mavonEditor } from "mavon-editor";
import { toolbars } from "@/core/toolbar";
import pickerOptions from "@/core/picker";
import postApi from "@/api/post";
import uploadApi from "@/api/upload";
import moment from "moment";
moment.locale("zh-cn");

export default {
  props: {
    id: {},
    draft: {},
    pid: {}
  },
  data() {
    return {
      model: {
        title: "",
        content: "",
        limitTime: -1,
        isOutdate: false,
        outdateTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).getTime()
      },
      toolbars,
      activeNames: ["1-1"],
      ...pickerOptions,
      dataTime: null,
      hasDraft: false,
      Interval: null,
      originBody: ""
    };
  },
  components: {
    mavonEditor
  },
  methods: {
    async submit() {
      try {
        if (this.id || this.$route.query.id) {
          if (this.draft) {
            if (!this.pid) {
              await postApi.create(this.model);
            } else {
              await postApi.edit(this.id, this.model, {
                update: 1,
                pid: this.pid
              });
            }
          } else {
            await postApi.edit(this.id || this.$route.query.id, this.model);
          }

          // if (response.data.ok !== 1) {
          //   this.$message.error("出错了");
          // }
        } else {
          await postApi.create(this.model);
          this.$message({
            message: "提交成功",
            type: "success"
          });
        }
        // const response = await postApi.create(this.model);
        this.$router.push("/posts/list");
      } catch (e) {
        console.log(e);
        this.$message.error("出错了");
      }
    },
    async save(push = true, showMsg = true) {
      const response = await postApi.save(this.id, this.draft, this.model);
      if (response.data.ok) {
        if (showMsg) {
          this.$message({
            message: "保存成功",
            type: "success"
          });
        }

        if (push) {
          this.$router.push("/posts/list");
        }
      } else {
        this.$message.error("出错了");
      }
    },
    convertTime() {
      this.model.outdateTime = this.dataTime.getTime();
    },

    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append("file", $file);
      uploadApi.uploadFile(formdata).then(res => {
        // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
        /**
         * $vm 指为mavonEditor实例，可以通过如下两种方式获取
         * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
         * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
         */
        this.$refs.md.$img2Url(pos, res.data.url);
      });
    },
    goToDraftConfirm() {
      this.$confirm("该文章存在草稿, 是否跳转?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          this.$router.push({
            name: "edit",
            query: {
              id: this.model.draftId
            },
            params: {
              id: this.model.draftId,
              draft: 1,
              pid: this.model.pid
            }
          });
        })
        .catch(() => {});
    },
    async getPostInfo() {
      if (this.id || this.$route.query.id) {
        const response = await postApi.getPost(this.id || this.$route.query.id);
        this.model = response.data;
        this.dataTime = new Date(this.model.outdateTime);

        if (response.data.hasDraft) {
          this.hasDraft = true;
          this.goToDraftConfirm();
        } else {
          this.hasDraft = false;
        }
      }

      this.originBody = this.model.content;
    },
    mouseOverOpacity() {
      const btn = document.querySelector(".footer > .right");

      btn.style.opacity = 1;
      // console.log("overed.");
    },
    mouseLeaveOpacity() {
      const btn = document.querySelector(".footer > .right");

      btn.style.opacity = 0.3;
      // console.log("leaved.");
    },
    autoSavePost() {
      // 已发布的文章 自动保存草稿方法

      if (this.model.state === 1 && this.Interval === null) {
        // 5000 毫秒执行一次方法

        this.Interval = setInterval(() => {
          if (this.model.content !== this.originBody) {
            this.save(false, false);
            this.originBody = this.model.content;

            const h = this.$createElement;

            this.$notify({
              title: "自动保存成功",
              message: h(
                "i",
                `${moment(Date.now()).format("YYYY年MM月DD日 HH:mm:ss")}`
              )
            });
          }
        }, 5000);
        console.log("Interval start.");
      }
    }
  },
  created() {
    this.getPostInfo();
  },
  destroyed() {
    clearInterval(this.Interval);
    console.log("Interval cleared.");
  },
  watch: {
    $route() {
      this.getPostInfo();
      this.Interval = clearInterval(this.Interval);
      console.log("Interval cleared.");
    }
  }
};
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
.footer {
  position: sticky;
  bottom: 0;
  transform: translateX(95%);
  width: 50%;
  z-index: 999999;
}
@media (max-width: 600px) {
  .footer {
    transform: none;
    width: 100%;
    z-index: 999999;
  }
}
</style>
