<template>
  <div class="notice-info clearfix fuz-page-content">
    <!-- <c-pageBanner :title="$t('message.mesage')" className="d-1-bg"></c-pageBanner> -->
    <div class="main-content">
       <div class="h5-evenMenus" @click="h5ShowMenusFn" v-drag >
        <img
          src="https://saas-oss.oss-accelerate.aliyuncs.com/upload/20200710155735466.png"
          alt="">
      </div>
      <transition name="menus-fade">
        <div class="margin-left a-5-bg margin-left-h5" v-show="h5ShowMenus">

          <h3 class="menu-tit f-1-cl">
            {{$t('message.mesage')}}
            <span class="h5-evenMenus-list" @click="h5ShowMenusFn">
              <svg class='icon icon-16 market-show-button' aria-hidden='true'>
                <use xlink:href='#icon-c_7'></use>
              </svg>
            </span>
          </h3>
          <div class="margin-left-h5-body">
            <ul class="f-2-cl">
              <li
                v-for="(item, index) in sideList"
                :key="index"
                :class = "{'f-1-cl c-4-bg' : messageType === item.tid}"
                @click="switchType(item.tid, item.title)"
                class="menu-item">
                  {{item.title}}
              </li>
            </ul>
          </div>

        </div>
      </transition>
      <div class="menu h5-menu margin-left-pc fuz-card">
        <h3 class="menu-tit f-1-cl fuz-card-title">{{$t('message.mesage')}}</h3>
        <ul class="f-2-cl">
          <li
            v-for="(item, index) in sideList"
            :key="index"
            :class = "{'f-1-cl fuz-bg' : messageType === item.tid}"
            @click="switchType(item.tid, item.title)"
            class="menu-item">
              {{item.title}}
          </li>
        </ul>
      </div>
      <div class="content-box">
        <div class="content-list fuz-card">
          <h1 class="content-title fuz-card-title">{{title}}</h1>
          <ul class="message-list" v-if="notieContent.length">
            <li class="all-select fuz-border">
              <i class="status">
                <c-checkBox
                  :value="dataListId.length === selectArr.length"
                  @click="checkoutSelect('all')" />
              </i>
              <div class="message-text h5-message-text">
                <div class="main-text f-2-cl">
                  <!-- 全选 -->
                  {{$t('message.selectAll')}}
                </div>
              </div>
              <c-button
                type = 'text'
                className="delete-btn"
                marginTop = "0"
                @click="deleteMsg(selectArr, 'all')">
                <!-- 删除 -->
                {{$t('message.delete')}}
              </c-button>
              <c-button
                type = 'text'
                className="delete-btn"
                marginTop = "0"
                @click="onChangeRead(0, 'all')">
                <!-- 全部标记为已读 -->
                {{$t('message.readAll')}}
              </c-button>
            </li>
            <li class="fuz-border"
                :key="index"
                v-for="(item, index) in notieContent">
                <i class="status">
                <c-checkBox
                  :value="selectArr.indexOf(item.id) !== -1"
                  @click="checkoutSelect(item.id)"/>
              </i>
              <div class="message-text">
                <div
                  class='fuz-content-small'
                  @click="onChangeRead(item.id, index)"
                  :class="item.status === 1 ? 'f-1-cl' : 'f-2-cl'"
                  v-html ="item.messageContent">
                </div>
                <p class="time f-2-cl">{{formatTimeFn(item.ctime)}}</p>
              </div>
              <c-button
                type = 'text'
                marginTop = "5px"
                className="delete-btn"
                @click="deleteMsg(item.id, index)">
                <!-- 删除 -->
                {{$t('message.delete')}}
              </c-button>
            </li>
          </ul>
          <div v-else class="no-data f-2-cl">
            <svg class="icon icon-50" aria-hidden="true">
              <use xlink:href="#icon-g_2"></use>
            </svg>
            <p>
              <!-- 暂无数据 -->
              {{$t('common.notData')}}
            </p>
          </div>
          <transition name="fade">
            <div v-show="isshowLoading" class="loading">
              <c-loading size="50" />
            </div>
          </transition>
          <c-pagination v-if="(pagination.count/pagination.pageSize) > 1"
                :total="pagination.count"
                classes="c-3-bg"
                :current-page='pagination.page'
                :display='pagination.pageSize'
                @pagechange="pagechange">
        </c-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/message/message';
import 'BlockChain-ui/PC/common-mixin/message/message.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
  ul {
    padding: 0 !important;
  }
  ul li {
    padding: 20px 20px !important;
  }
  .fuz-content-small {

  }
</style>
