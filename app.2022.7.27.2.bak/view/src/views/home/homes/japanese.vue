<template>
  <div class="homes japanese-home-container" style="background-color: #fff">
    <div class="japanese-header" :style="headerStyle">
      <h1>{{ slideListTitle.title }}</h1>
      <p>{{ slideListTitle.subTitle }}</p>
      <div class="register-region clearfix">
        <c-inputFind
          :promptText="$t('personal.prompt.errorEmailText')"
          :value="registerInfo"
          @onchanges="registerChange"
          :inputStyle="inputStyle"
          name="register-info"
          :iconHide=true
          className="register-info"/>
        <c-button
          @click="goRegister"
          className="go-register"
          height="44px"
          paddingW="32px"
        >{{$t('japanese.goRegister')}}</c-button>
        <c-button className="download-button"
                @click="download('ios_ipa')"
                 paddingW="24px"
                 width="140px"
                 height="44px">
          <svg class="icon icon-30" aria-hidden="true">
            <use xlink:href="#icon-b_13"></use>
          </svg>
          &nbsp;{{$t('appDownLoad.platform')[0]}}
        </c-button>
        <c-button className="download-button no-margin"
                @click="download('android')"
                 paddingW="24px"
                 width="140px"
                 height="44px">
          <svg class="icon icon-30" aria-hidden="true">
            <use xlink:href="#icon-b_14"></use>
          </svg>
          &nbsp;{{$t('appDownLoad.platform')[1]}}
        </c-button>
      </div>
      <!-- 公告 -->
      <div class="bulletinBoard">
        <template v-if="noticeList.length > 0">
          <div class="bull-bar">
            <template v-for="(item, index) in noticeList">
              <p :key="index" v-if="index < 1" class="notice-item">
                <img class="new" src="http://chaindown-oss.oss-cn-hongkong.aliyuncs.com/static/public-img/japan-new-icon.png" alt="">
                <router-link
                  class="hoverHide"
                  :to="'/noticeInfo/' + item.id"
                >
                  {{ item.noticeText }}
                </router-link>
              </p>
            </template>
            <span class="moreButton" @click="btnLink">
              <img class="right-icon" src="http://chaindown-oss.oss-cn-hongkong.aliyuncs.com/static/public-img/japan-right-icon.png" alt="">
            </span>
          </div>
        </template>
      </div>
      <div class="header-img" :style="headerImg"></div>
    </div>
    <Custom :homeHtml="home_edit_html" :homeEditReady="homeEditReady"></Custom>
    <div
      class="swipers japanese-swipers"
      style="height:768px;
         width:100%;
         background-image:linear-gradient(-196deg, #1A4A87 0%, #000000 72%);"
    >
      <c-swiper
        :slideList="slideList"
        :height="768"
        :interval="5000"
        itemStyle="background-color:transparent!important"
        activeClass="jp-active"
      />
    </div>
    <div class="qa-container">
      <div class="qa-region">
        <h1>{{ $t("japanese.qa.title") }}</h1>
        <p>{{ $t("japanese.qa.desc") }}</p>
        <ul class="qa-list" v-if="qaList">
          <li v-for="(item, inx) in qaList.q" :key="inx">
            <div class="q-region clearfix" @click="showA(inx)">
              {{ item }}
              <div class="arrow-region">
                <svg
                  class="icon icon-24"
                  aria-hidden="true"
                  v-if="
                    (qShowList[inx] && !qShowList[inx].show) || !qShowList[inx]
                  "
                  style="transform: rotateZ(180deg)"
                >
                  <use xlink:href="#icon-c_19"></use>
                </svg>
                <svg
                  class="icon icon-24"
                  aria-hidden="true"
                  v-if="qShowList[inx] && qShowList[inx].show"
                >
                  <use xlink:href="#icon-c_19"></use>
                </svg>
              </div>
            </div>
            <div class="a-region" v-if="qShowList[inx] && qShowList[inx].show">
              {{ qaList.a[inx] }}
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import commmonMixin from 'BlockChain-ui/PC/common-mixin/home/home/home';
import 'BlockChain-ui/PC/common-mixin/home/home/home.styl';
import mixin from 'BlockChain-ui/PC/common-mixin/home/home/japanese/japanese';
import 'BlockChain-ui/PC/common-mixin/home/home/japanese/japanese.styl';
import Custom from '../custom/japanese.vue';

export default {
  mixins: [commmonMixin, mixin],
  components: {
    Custom,
  },
  mounted() {
    this.init();
  },
};
</script>
