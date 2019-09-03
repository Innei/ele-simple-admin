<template>
  <el-container>
    <el-main style="width: 100%">
      <el-form ref="form" :model="model">
        <el-form-item>
          <el-input v-model="model.title" placeholder="标题"></el-input>
        </el-form-item>
        <mavonEditor class="md" v-model="model.content" :toolbars="toolbars" />

        <el-collapse v-model="activeNames">
          <el-collapse-item title="设置" name="1"></el-collapse-item>
        </el-collapse>
      </el-form>
    </el-main>

    <el-footer>
      <div class="right">
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import "mavon-editor/dist/css/index.css";
import { mavonEditor } from "mavon-editor";
import { toolbars } from "./../core/toolbar";
export default {
  data() {
    return {
      model: {
        title: "",
        content: ""
      },
      toolbars,
      activeNames: ["1"]
    };
  },
  components: {
    mavonEditor
  },
  methods: {
    submit() {},
    cancel() {}
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
</style>