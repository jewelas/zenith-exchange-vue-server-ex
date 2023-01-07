<template>
  <div class="homes">
    <div class="home-alert" v-if="krwFlag">
      <div class="home-alert-all c-6-bg"></div>
      <div class="home-alert-content a-4-bg">
        <div class="alert-close">
          <c-iconButton @click="krwClose">
            <svg class="icon icon-16" aria-hidden="true">
              <use xlink:href="#icon-c_7"></use>
            </svg>
          </c-iconButton>
        </div>
        <div class="home-alert-bg" :style="krwBg">
          <!-- 加密货币交易所 投资注意事项 -->
          <p class="home-alert-title f-8-cl">{{ $t('krwAdd.hometitle') }}</p>
        </div>
        <div class="home-alert-body">
          <!-- BITZON用户在投资数字资产前，请熟知一下注意事项，并慎重进行交易。 -->
          <p class="home-alert-body-title">{{ $t('krwAdd.hometext1') }}</p>
          <p class="home-alert-body-text">
            {{ $t('krwAdd.hometext2') }}
          </p>
          <p class="home-alert-body-text">
            {{ $t('krwAdd.hometext3') }}
          </p>
          <p class="home-alert-body-text">
            {{ $t('krwAdd.hometext4') }}
          </p>
          <p class="home-alert-body-text">
            {{ $t('krwAdd.hometext5') }}
          </p>
          <div class="home-alert-body-warning">
            <svg class="icon icon-16" aria-hidden="true" style="marginRight: 10px">
              <use xlink:href="#icon-c_2"></use>
            </svg>
            <span class="f-7-cl">{{ $t('krwAdd.hometext6') }}</span>
          </div>
          <div class="noclick">
            <c-checkBox :value="krwCheck" @click="krwCheckClick"/>
            <span class="noclick-text" @click="krwCheckClick">{{ $t('krwAdd.hometext7') }}</span>
          </div>
          <c-button paddingW="46px"
                   class="alert-button"
                   @click="krwConfrim"
                   marginTop="20px">{{ $t('krwAdd.hometext8') }}
          </c-button>
        </div>
      </div>
    </div>
    <div class="home-bg">
      <!-- 公告 -->
      <div class="bulletinBoard">
        <template  v-if="noticeList.length > 0">
          <div class="backgrounds h-2-bg"></div>
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
            type = "text"
            :class="'more x-3-cl'"
            @click="btnLink"
          >
            <!-- 更多 -->
            {{$t('home.more')}}
          </c-button>
        </template>
      </div>
      <!-- 轮播图 -->
      <div class="swipers" :style="styles">
        <c-swiper
          :slideList="slideList"
          :height="stylesHeight"
          :interval="5000"
        />
      </div>
      <!-- 推荐位 -->
      <Recommend v-if="headerSymbol.length" :dataList="recommendDataList"/>
      <!-- 24小时行情 -->
      <Market :dataList='marketDataList' :marketCurrent='marketCurrent'/>
      <!-- 自定义模板 -->
      <Custom :homeHtml='home_edit_html' :homeEditReady="homeEditReady"></Custom>
      <!-- 自定义模板结束 -->
      <i v-if="!baseInfo"></i>
    </div>
  </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/home/home/home';
import 'BlockChain-ui/PC/common-mixin/home/home/home.styl';
import Market from '../market/china.vue';
import Recommend from '../recommend/china.vue';
import Custom from '../custom/china.vue';

export default {
  mixins: [mixin],
  components: {
    Recommend,
    Custom,
    Market,
  },
  created() {
    this.init();
  },
};
</script>
