<template>
    <el-container>
        <el-main>
            <el-row :gutter="20" class="info">
                <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                    <loading v-if="!userData.options"/>
                    <el-card shadow="hover" v-else>
                        <small class="meta">欢迎</small>

                        <div>{{userData.username}}</div>
                    </el-card>
                </el-col>
                <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                    <loading v-if="!userData.options"/>
                    <el-card shadow="hover" v-else>
                        <small class="meta">评论</small>
                        <router-link :to="{name: 'comments'}">
                            <i class="el-icon-link"></i>
                        </router-link>
                        <div>{{userData.options.comments_nums ? userData.options.comments_nums : 0}}</div>
                    </el-card>
                </el-col>
                <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                    <loading v-if="!userData.options"/>
                    <el-card shadow="hover" v-else>
                        <small class="meta">文章</small>
                        <router-link :to="{name: 'list'}">
                            <i class="el-icon-link"></i>
                        </router-link>
                        <div>{{userData.options.publish_nums}}</div>
                    </el-card>
                </el-col>
                <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                    <loading v-if="!userData.options"/>
                    <el-card shadow="hover" v-else>
                        <small class="meta">建立天数</small>
                        <el-tooltip
                                class="item"
                                effect="dark"
                                :content="'博客建立于 '+createDate.year + ' 年 ' + createDate.month + ' 月 ' + createDate.day  + ' 日'"
                                placement="top"
                        >
                            <a href="javascript:;">
                                <i class="el-icon-info"></i>
                            </a>
                        </el-tooltip>
                        <div>{{ commemorationDay }}</div>
                    </el-card>
                </el-col>
            </el-row>
            <el-row :gutter="20" v-if="userData.options">
                <el-col :xs="12" :sm="12" :md="8" :lg="8" :xl="8">
                    <el-card shadow="never">
                        <h3>最近文章</h3>
                        <li v-for="item in userData.recentlyPosts" :key="item._id">
              <span class="item-date">
                {{ convertDate(item.createTime).month }}/{{
                convertDate(item.createTime).day
                }}
              </span>
                            <a :href="'http://' + baseUrl + '/posts/' + item._id" target="_blank">{{ item.title }}</a>
                        </li>
                    </el-card>
                </el-col>
                <el-col :xs="12" :sm="12" :md="8" :lg="8" :xl="8">
                    <el-card shadow="never">
                        <h3>最近评论</h3>
                        <li v-for="item in userData.recentlyComments" :key="item._id">
              <span class="item-date">
                {{ convertDate(item.createTime).month }}/{{
                convertDate(item.createTime).day
                }}
              </span>
                            {{item.author}}: {{ (item.content).length > 30 ? item.content.slice(0, 30) + ' ...' :
                            item.content }}
                        </li>
                    </el-card>
                </el-col>
                <el-col :xs="12" :sm="12" :md="8" :lg="8" :xl="8">
                    <el-card shadow="never">
                        <h3>操作日志</h3>
                    </el-card>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
  export default {
    data() {
      return {
        userData: {
          options: null
        }
      }
    },
    components: {
      loading: () => import('@/components/Skeleton')
    },
    created() {
      this.$http.get('/user/get_info/1').then(res => {
        this.userData = res.data

        // = this.convertDate(res.data.create_time)
      })
    },
    methods: {
      convertDate(date) {
        var date = new Date(Number(date))
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()

        return {
          year,
          month,
          day
        }
      }
    },
    computed: {
      baseUrl() {
        return this.$store.state.siteOptions.baseUrl
      },
      createDate() {
        const date = new Date(Number(this.userData.create_time))

        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()

        return {
          year,
          month,
          day
        }
      },
      commemorationDay() {
        return Math.floor(
            (Date.now() - this.userData.create_time) / (1000 * 60 * 60 * 24)
        )
      }
    }
  }
</script>

<style>
    h2 {
        font-weight: 100;
    }

    .container > header {
        color: #909399;
        font-weight: 100;
    }

    .container main {
        margin-top: 1.5rem;
    }

    .container {
        margin-top: 1.5rem;
    }
</style>
<style scoped>
    .meta {
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
        line-height: 22px;
    }

    .meta ~ div {
        margin: 0.8rem auto;
        font-size: 32px;
        line-height: 38px;
    }

    .meta ~ a {
        float: right;
    }

    .info {
        margin-bottom: 3rem;
    }

    li {
        list-style: none;
        margin-left: 0.6rem;
    }

    .item-date {
        margin-right: 0.8rem;
    }

    h3 {
        margin: 0.5rem auto;
    }
</style>