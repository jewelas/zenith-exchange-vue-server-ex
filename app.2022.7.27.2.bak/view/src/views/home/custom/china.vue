<template>
  <div  class="home-custom-template" v-if="homeEditReady">
    <section v-if="homeHtml" v-html="homeHtml" class="interHome-custom"></section>
    <div class="home-container" v-else>
      <div class="home-header" style="background-color: #0E1A2E">
        <h2 class="block-title f-8-cl">
          <!-- 随时随地 多平台终端交易 -->
          {{$t('homeTemplate.text_01')}}
        </h2>
        <p class="mark f-2-cl">
          <!-- 覆盖iOS、Android、Windows、Mac多个平台，支持全业务功能 -->
          {{$t('homeTemplate.text_02')}}
        </p>
        <div class="down-btn">
          <a href="/appDownload" class="btn u-16-cl u-8-bd">
            <b class="hoverHide">{{$t('homeTemplate.text_03')}}</b>
            <b class="hoverShow u-8-cl">{{$t('homeTemplate.text_03')}}</b>
          </a>
        </div>
      </div>
      <div class="bg-img" :style="imgClass.bgImg">
        <div class="bg-img-bar" ref="photoApp">
          <p class="home_edit_imga"  :style="imgClass.homeEditImga">
          </p>
          <p class="home_edit_imgb"  :style="imgClass.homeEditImgb">
          </p>
        </div>
      </div>
      <h2 class="block-title f-1-cl">
        <!-- 产品与服务 -->
        {{$t('homeTemplate.text_04')}}
      </h2>
      <p class="mark f-2-cl">
        <!-- 为全球数百万用户提供安全、可信赖的数字资产交易及资产管理服务 -->
        {{$t('homeTemplate.text_05')}}
      </p>
      <div class="product" ref="product">
        <div class="pro-item c-4-bg">
          <div class="pro-img pro-img-1"  :style="getIconImg(1)"></div>
          <h4 class="pro-tit f-1-cl">
            <!-- 全球化布局 -->
            {{$t('homeTemplate.text_06')}}
          </h4>
          <p class="pro-text f-2-cl">
            <!-- 多个国家设立本土化交易服务中心打造多业务形态为一体 -->
            {{$t('homeTemplate.text_07')}}
          </p>
        </div>
        <div class="pro-item c-4-bg">
          <div class="pro-img pro-img-2"  :style="getIconImg(2)"></div>
          <h4 class="pro-tit f-1-cl">
            <!-- 安全体系 -->
            {{$t('homeTemplate.text_08')}}
          </h4>
          <p class="pro-text f-2-cl">
            <!-- 一流团队打造专业安全多重防御让您资产无忧 -->
            {{$t('homeTemplate.text_09')}}
          </p>
        </div>
        <div class="pro-item c-4-bg">
          <div class="pro-img pro-img-3"  :style="getIconImg(3)"></div>
          <h4 class="pro-tit f-1-cl">
            <!-- 交易系统 -->
            {{$t('homeTemplate.text_10')}}
          </h4>
          <p class="pro-text f-2-cl">
            <!-- 多个国家设立本土化交易服务中心打造多业务为一体 -->
            {{$t('homeTemplate.text_11')}}
          </p>
        </div>
        <div class="pro-item c-4-bg">
          <div class="pro-img pro-img-4"  :style="getIconImg(4)"></div>
          <h4 class="pro-tit f-1-cl">
            <!-- 高扩展性 -->
            {{$t('homeTemplate.text_12')}}
          </h4>
          <p class="pro-text f-2-cl">
            <!-- 资产流转快速交易畅通无阻 -->
            {{$t('homeTemplate.text_13')}}
          </p>
        </div>
      </div>
      <div v-if="!isLogin" class="footer-bootom y-3-bg y-2-bd">
        <h2 class="block-title z-1-cl">
          <!-- 马上开启交易之旅 -->
          {{$t('homeTemplate.text_14')}}
        </h2>
        <p class="info z-2-cl">
          <!-- 提供币币、法币、合约交易等全面数字资产业务 -->
          {{$t('homeTemplate.text_15')}}
        </p>
        <div class="button-box u-8-bg">
          <i class="button-hover-bg u-14-bg"></i>
          <a class="button u-16-cl" href="register">
            <!-- 立即注册 -->
            {{$t('homeTemplate.text_16')}}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import commonMixin from 'BlockChain-ui/PC/common-mixin/home/custom/custom';

export default {
  mixins: [commonMixin],
  created() {
    this.init();
  },
};

</script>
