<template>
  <section class="kingHome">
    <!-- 轮播图 -->
    <SwiperVue :slideList="slideList" :slideListTitle="slideListTitle"/>
    <!-- 公告 -->
    <div class="bulletinBoard">
      <template  v-if="noticeList.length > 0">
        <div class="bull-bar">
          <template v-for="(item, index) in noticeList">
            <p
              :key="index"
              v-if="index < 1"
              class="notice-item">
              <span class="new u-8-bd u-8-cl">
                <img :src="newImg" alt="">
              </span>
              <router-link class="hoverHide x-2-cl" :to="'/noticeInfo/' + item.id">
                {{item.noticeText}}
              </router-link>
              <router-link class="hoverShow x-1-cl" :to="'/noticeInfo/' + item.id">
                {{item.noticeText}}
              </router-link>
            </p>
          </template>
          <span class="moreButton" @click="btnLink">
            <img :src="omGg" alt="">
          </span>
        </div>
      </template>
    </div>
    <!-- 推荐位 -->
    <Recommend v-if="headerSymbol.length" :dataList="recommendDataList"/>
    <div v-html="home_edit_html"></div>
    <!-- 自定义模板 -->
    <!-- <Custom :homeHtml='home_edit_html' :homeEditReady="homeEditReady"/> -->
    <!-- 自定义模板结束 -->
    <i v-if="!baseInfo"></i>
  </section>
</template>

<script>
import commonMixin from 'BlockChain-ui/PC/common-mixin/home/home/home';
import 'BlockChain-ui/PC/common-mixin/home/home/home.styl';
import mixin from 'BlockChain-ui/PC/common-mixin/home/home/king/king';
import 'BlockChain-ui/PC/common-mixin/home/home/king/king.styl';

import SwiperVue from '../swiper/king.vue';
import Recommend from '../recommend/king.vue';

export default {
  mixins: [commonMixin, mixin],
  components: {
    Recommend,
    SwiperVue,
  },
  created() {
    this.init();
  },
};
</script>
