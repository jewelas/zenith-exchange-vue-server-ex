<template>
  <section class="internationalHome international-home-container c-2-bg">
    <!-- 轮播图 -->
    <SwiperVue :slideList="slideList" :slideListTitle="slideListTitle"/>
    <!-- 公告 -->
    <div class="bulletinBoard h-2-bg h-3-bd">
      <template  v-if="noticeList.length > 0">
        <div class="bull-bar">
          <template v-for="(item, index) in noticeList">
            <p
              :key="index"
              v-if="index < 1"
              class="notice-item">
              <span class="new u-8-bd u-8-cl">NEW</span>
              <router-link class="hoverHide x-2-cl" :to="'/noticeInfo/' + item.id">
                {{item.noticeText}}
              </router-link>
              <router-link class="hoverShow x-1-cl" :to="'/noticeInfo/' + item.id">
                {{item.noticeText}}
              </router-link>
            </p>
          </template>
          <span class="moreButton" @click="btnLink">
            <b class="hover-hide" :style="moreButtonImg2"></b>
            <b class="hover-show" :style="moreButtonImg1"></b>
          </span>
        </div>
      </template>
    </div>
    <!-- 推荐位 -->
    <Recommend v-if="headerSymbol.length" :dataList="recommendDataList"/>
    <!-- 24小时行情 -->
    <Market :dataList='marketDataList' :marketCurrent='marketCurrent'/>
    <Custom :homeHtml='home_edit_html' :homeEditReady="homeEditReady"/>
    <!-- 自定义模板结束 -->
    <i v-if="!baseInfo"></i>
  </section>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/home/home/home';
import 'BlockChain-ui/PC/common-mixin/home/home/home.styl';
import 'BlockChain-ui/PC/common-mixin/home/home/international/international.styl';
import SwiperVue from '../swiper/international.vue';
import Market from '../market/international.vue';
import Recommend from '../recommend/international.vue';
import Custom from '../custom/international.vue';

export default {
  mixins: [mixin],
  components: {
    Recommend,
    Custom,
    Market,
    SwiperVue,
  },
  created() {
    this.init();
  },
};
</script>
