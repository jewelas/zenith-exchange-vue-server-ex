<template>
  <div class="notice-info home-bg">
    <!-- <c-pageBanner :title="$t('message.noticeInfo')" className="d-1-bg"></c-pageBanner> -->
    <div class="main-content clearfix">
      <div class="menu h5-menu" :style="{ height: menuBoxHeight }" ref="menuBox">
        <div class="menu-tit medium f-1-cl">{{ $t("message.noticeInfo") }}</div>
        <div class="search-notice-box a-2-bd" v-if="openSearch">
          <div class="iconfont-cont">
            <svg aria-hidden="true" class="icon icon-14">
              <use xlink:href="#icon-a_12"></use>
            </svg>
          </div>
          <input
            class="search-notice-input f-1-cl"
            type="text"
            :placeholder="$t('message.search')"
            @input="setNoticeSearchVal"
            v-model="noticeSearchVal"
          />
          <span class="clones b-2-cl" v-show="noticeSearchVal" @click="clearSearchVal">x</span>
        </div>

      <div class="h5-evenMenus" @click="h5ShowMenusFn" v-drag >
        <img
          src="https://saas-oss.oss-accelerate.aliyuncs.com/upload/20200710155735466.png"
          alt="">
      </div>
      <transition name="menus-fade">
        <div class="margin-left a-5-bg margin-left-h5" v-show="h5ShowMenus">
          <h3 class="menu-tit f-1-cl">
            <span class="h5-evenMenus-list" @click="h5ShowMenusFn">
              <svg class='icon icon-16 market-show-button' aria-hidden='true'>
                <use xlink:href='#icon-c_7'></use>
              </svg>
            </span>
          </h3>
          <div class="margin-left-h5-body">
            <ul ref="menuBar" class="f-2-cl">
              <li
                v-for="(item, index) in sideList"
                :key="index"
                :class="{ 'f-1-cl c-4-bg': contentId === item.id }"
                @click="writing(item.id)"
                class="menu-item"
              >
                {{ item.title | cutTextLength }}
              </li>
            </ul>
             <c-pagination
              v-if="pagination.count / pagination.pageSize > 1"
              :total="pagination.count"
              :current-page="pagination.page"
              :display="pagination.pageSize"
              @pagechange="pagechange"
              class="no-paddleft"
            >
            </c-pagination>
          </div>
        </div>
      </transition>
      <div class="menu h5-menu margin-left-pc a-5-bg">
        <ul ref="menuBar" class="f-2-cl">
          <li
            v-for="(item, index) in sideList"
            :key="index"
            :class="{ 'f-1-cl c-4-bg': contentId === item.id }"
            @click="writing(item.id)"
            class="menu-item"
          >
            {{ item.title | cutTextLength }}
          </li>
        </ul>
        <c-pagination
              v-if="pagination.count / pagination.pageSize > 1"
              :total="pagination.count"
              :current-page="pagination.page"
              :display="pagination.pageSize"
              @pagechange="pagechange"
              class="no-paddleft"
            >
            </c-pagination>
      </div>
        <div class="empty-box" v-if="!sideList.length && searchLoaded">
          <div class="home-nodata">
            <svg class="icon icon-50" aria-hidden="true">
              <use xlink:href="#icon-g_2"></use>
            </svg>
            <p class="notice-empty-text">
              <!-- 暂无数据 -->
              {{ $t("common.notData") }}
            </p>
          </div>
        </div>

      </div>
      <div class="content-box">
        <div
          class="content-text c-4-bg"
          :style="{ 'min-height': contentMinHeight }"
        >
          <h1 class="content-title f-1-cl">{{ notieContent.title }}</h1>
          <p class="time f-2-cl">{{ notieContent.ctime }}</p>
          <!-- <div class="ql-container ql-snow">
            <div class="ql-editor">
              <div class="main-text f-2-cl" v-html="notieContent.content"></div>
            </div>
          </div> -->
          <div class="ql-editor" v-html="notieContent.content"></div>
          <transition name="fade">
            <div v-show="isshowLoading" class="loading">
              <c-loading size="50" />
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/noticeInfo/noticeInfo';
import 'BlockChain-ui/PC/common-mixin/noticeInfo/noticeInfo.styl';
import 'BlockChain-ui/static/css/quill.core.styl';
import 'BlockChain-ui/static/css/quill.snow.styl';
import 'BlockChain-ui/static/css/quill.bubble.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
<style lang="stylus">
.notice-info
  position relative

  img{
    max-width: 90%;
    max-height: 90%;
  }
  .no-paddleft
    padding-left 0

  .empty-box
    margin 40px auto 0 auto
    text-align center

    .notice-empty-text
      margin-top 10px

  .main-content
    width 1180px
    margin 40px auto 0

  .menu
    width 190px
    // max-height: 860px;
    float left

    .menu-tit
      font-size 16px
      line-height 32px
      margin-bottom 14px

    .menu-item
      padding 15px 25px 15px 20px
      font-size 14px
      line-height 20px
      cursor pointer
      user-select none
      border-radius 2px

    .pagination
      background none !important
      border none !important

    .pagination-bar
      border none !important
      line-height 50px

      .num
        margin 0

      .pagination-btn
        height 30px
        width 30px
        line-height 30px

  .content-box
    padding-left 210px

  .content-text
    min-height 680px
    padding 40px 60px 60px
    position relative
    border-radius 2px

    .content-title
      font-size 22px
      font-weight normal
      line-height 30px

    .time
      width 100px
      margin-top 20px
      font-size 12px
      line-height 16px

    .main-text
      margin-top 30px
      line-height 24px
      font-size 14px
      p
        word-break break-all
    .mmd-loading-circle-right, .mmd-loading-circle-left
      border-color #1baaec

  // 页面动画
  .fade-enter-active, .fade-leave-active
    transition opacity 0.8s

  .fade-enter, .fade-leave-to
    opacity 0

  .loading
    position absolute
    top 50%
    left 50%
    z-index 999
    margin -25px 0 0 -25px

  .search-notice-box
    .clones{
      font-size 13px
      padding: 0 4px
      vertical-align middle;
      cursor: pointer;
    }
    border-width 1px
    border-style solid
    height 28px
    line-height 26px
    margin-bottom 15px

    .iconfont-cont
      text-align center
      display inline-block
      width 30px
      vertical-align middle

    .search-notice-input
      width 140px
      vertical-align middle
  .ql-editor
    white-space: pre-wrap !important;
</style>
