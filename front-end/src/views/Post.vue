<template lang="html">
  <div class="my-post">
    <el-row class="left-nav-wrapper">
      <el-col class="left-nav">
        <div class="section-author">
          <div class="author-info">
            <span>
              <span class="author-avatar"><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493574362238&di=0a6c453cc57c160b0d88330f90276339&imgtype=0&src=http%3A%2F%2Fwww.qqzhuangban.com%2Fuploadfile%2F2014%2F08%2F1%2F20140817072951663.jpg"/></span>
              <span class="author-text">
                <p class="main-text">nickj</p>
                <p class="sub-text">nickj</p>
              </span>
            </span>
            <span class="author-icon"><i class="el-icon-arrow-down"></i></span>
          </div>
          <div class="author-search">
            <el-input
              class="author-input"
              placeholder="Search"
              icon="search"
              v-model="input_author"
              :on-icon-click="handleIconClick">
            </el-input>
          </div>
        </div>
        <el-menu mode="vertical" default-active="1" class="el-menu-vertical-demo">
          <el-menu-item-group title="">
            <el-menu-item index="1" class="nav-item"><i class="el-icon-message"></i>New Post</el-menu-item>
            <el-menu-item index="2" class="nav-item"><i class="el-icon-message"></i>Content</el-menu-item>
            <el-menu-item index="3" class="nav-item"><i class="el-icon-message"></i>Team</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="SETTINGS">
            <el-menu-item index="4" class="nav-item"><i class="el-icon-message"></i>General</el-menu-item>
            <el-menu-item index="5" class="nav-item"><i class="el-icon-message"></i>Navigation</el-menu-item>
            <el-menu-item index="6" class="nav-item"><i class="el-icon-message"></i>Tags</el-menu-item>
            <el-menu-item index="7" class="nav-item"><i class="el-icon-message"></i>Others</el-menu-item>
          </el-menu-item-group>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        input_author: '',
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleIconClick(ev) {
        console.log(ev);
      }
    }
  }
</script>

<style lang="scss">
  .my-post {
    height: 100%;
    .left-nav-wrapper {
      height: 100%;
      .left-nav {
        width: 12em;
        height: 100%;
        border-right: 1px solid #E5E9F2;
        .section-author {
          padding: .8em 1em .5em 1em;
          background-color: #F9FAFC;
          .author-info {
            display: flex;
            justify-content: space-between;
            .author-avatar {
              img {
                width: 2em;
                height: 2em;
              }
            }
            .author-text {
              display: inline-block;
              padding: .2em;
              .main-text {
                font-size: .9em;
                font-weight: 600;
              }
              .sub-text {
                font-size: .6em;
                font-weight: 300;
              }
            }
            .author-icon {
              i {
                margin-top: 1em;
                font-size: .5em;
              }
            }
          }
          .author-search {
              margin-top: .7em;
              input {
                height: 2em;
              }
            }
        }
        .el-menu-vertical-demo {
          height: inherit;
          background-color: #F9FAFC;
          .nav-item {
            height: 2em;
            line-height: 2em;
          }
        }
      }
    }
  }
</style>
