<template>
  <section class="internationalHome biki-home-container c-2-bg">
    <!-- 公告 -->
    <div class="bulletinBoard h-2-bg h-3-bd">
      <template v-if="noticeList.length > 0">
        <div class="bull-bar">
          <template v-for="(item, index) in noticeList">
            <p
              :key="index"
              v-if="index < 4"
              class="notice-item">
              <router-link class="hoverHide x-2-cl" :to="'/noticeInfo/' + item.id">
                {{item.noticeText}}
              </router-link>
              <router-link class="hoverShow x-1-cl" :to="'/noticeInfo/' + item.id">
                {{item.noticeText}}
              </router-link>
              <i class="x-2-cl">/</i>
            </p>
          </template>
        </div>
        <router-link class="more x-3-cl" to="noticeInfo"></router-link>
        <!-- 更多 -->
        <c-button
          class="button"
          type="text"
          :class="'more x-3-cl'"
          @click="btnLink"
        >
          <!-- 更多 -->
          {{$t('home.more')}}
        </c-button>
      </template>
    </div>
    <!-- 轮播图 -->
    <SwiperVue :slideList="slideList" :slideListTitle="slideListTitle"/>
    <!-- 推荐位 -->
    <Recommend v-if="headerSymbol.length" :dataList="recommendDataList"/>
    <!-- 24小时行情 -->
    <Market :dataList='marketDataList' :marketCurrent='marketCurrent'/>
    <Custom :homeHtml='home_edit_html'/>
    <!-- 自定义模板结束 -->
    <i v-if="!baseInfo"></i>
  </section>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/home/home/home';
import 'BlockChain-ui/PC/common-mixin/home/home/biki/biki.styl';
import SwiperVue from '../swiper/biki.vue';
import Market from '../market/international.vue';
import Recommend from '../recommend/international.vue';
import Custom from '../custom/biki.vue';

export default {
  mixins: [mixin],
  components: {
    Recommend,
    Custom,
    Market,
    SwiperVue,
  },
  mounted() {
    this.onmessageWorker();
    this.getLundata();
    // 监听 市场切换
    this.$bus.$on('SWITCH-MARKET', (data) => {
      this.marketCurrent = data;
      this.setMarketData();
    });
    this.$bus.$on('SWITCH-STORE', (data) => {
      this.setMyMarket(data);
      this.setMarketData();
    });
  },
  created() {
    if (this.coinsKrwOpen === 1 && this.storeKrwFlag) {
      if (!localStorage.krwCheck) {
        this.krwFlag = true;
      }
    }
  },
  destroyed() {
    this.$bus.$off('SWITCH-STORE');
    this.$bus.$off('SWITCH-MARKET');
  },
  beforeDestroy() {
    this.webSocketSend('Market', 'unsub', this.symbolCurrent, this.symbolList);
    window.onscroll = null;
  },
};
</script>
