<template>
  <section class="internationalHome bitsg-home-container ">
    <!-- 轮播图 -->
    <SwiperVue :slideList="slideList" :slideListTitle="slideListTitle"/>
    <!-- 公告 -->
    <div class="bulletinBoard h-2-bg h-3-bd">
      <template  v-if="noticeList.length > 0">
        <div class="bull-bar">
          <span class="new u-8-bg u-16-cl">new</span>
          <template v-for="(item, index) in noticeList">
            <p
              :key="index"
              v-if="index < 3"
              class="notice-item">
              <router-link class="hoverHide " :to="'/noticeInfo/' + item.id">
                {{item.noticeText}}
              </router-link>
              <router-link class="hoverShow x-1-cl" :to="'/noticeInfo/' + item.id">
                {{item.noticeText}}
              </router-link>
              <i class="x-2-cl">|</i>
            </p>
          </template>
          <!-- 更多 -->
          <router-link class="more x-3-cl" to="noticeInfo">{{ $t("header.more") }}</router-link>
        </div>
      </template>
    </div>
    <!-- 推荐位 -->
    <!-- <Recommend v-if="headerSymbol.length" :dataList="recommendDataList"/> -->
    <!-- 24小时行情 -->
    <Market :dataList='marketDataList' :marketCurrent='marketCurrent'/>
     <div v-html="home_edit_html"></div>
    <!-- 自定义模板结束 -->
    <i v-if="!baseInfo"></i>
  </section>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/home/home/home';
import 'BlockChain-ui/PC/common-mixin/home/home/home.styl';
import 'BlockChain-ui/PC/common-mixin/home/home/bitsg/bitsg.styl';
import SwiperVue from '../swiper/bitsg.vue';
import Market from '../market/bitsg.vue';
// import Recommend from '../recommend/international.vue';
// import Custom from '../custom/bitsg.vue';

export default {
  mixins: [mixin],
  components: {
    // Recommend,
    // Custom,
    Market,
    SwiperVue,
  },
  created() {
    this.init();
  },
};
</script>
