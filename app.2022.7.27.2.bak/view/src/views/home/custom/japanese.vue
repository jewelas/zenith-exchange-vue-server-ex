<template>
  <div class="home-custom-template">
    <section v-if="homeHtml" v-html="homeHtml" class="interHome-custom"></section>
    <div class="interHome-custom japanese" v-if="!homeHtml && homeEditReady">
      <div class="navsBase">
        <h1 class="title">
          {{$t('homeTemplate.text_04')}}
        </h1>
        <p class="mess">
          {{$t('homeTemplate.text_05')}}
        </p>
        <div class="product-region" :style="productImg">
          <ul class="product-list">
            <li v-for="(item, index) in list" :key="index">
              <h1>{{item.title}}</h1>
              <p>{{item.mess}}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="exchange-top" :style="exchangeBg">
        <h1>{{$t('japanese.exchangeTop.title')}}</h1>
        <p>{{$t('japanese.exchangeTop.desc')}}</p>
        <div class="exchange-img-region">
          <div class="img-box">
            <img class="exchange-top-img" :src="imgCoin">
            <p>{{$t('japanese.exchangeTop.types')[0]}}</p>
          </div>
         <div class="img-box">
           <img class="exchange-top-img" :src="imgMarket">
           <p>{{$t('japanese.exchangeTop.types')[1]}}</p>
         </div>
        </div>
      </div>
      <div class="register-step">
        <h1>{{$t('japanese.registerStep.title')}}</h1>
        <p>{{$t('japanese.registerStep.desc')}}</p>
        <ul class="step-list clearfix">
          <template v-for="(item, inx) in registerStepList">
            <li :key="inx">
              <img :src="registerImgs[inx]">
            </li>
            <li :key="`img-` + inx">
              <h3 class="clearfix">
                <span class="medium">{{`0` + (inx + 1)}}</span>
              </h3>
              <h1>{{item.title}}</h1>
              <p>{{item.desc}}</p>
            </li>
          </template>
        </ul>
      </div>
      <div class="account-step">
        <h1>{{$t('japanese.accountStep.title')}}</h1>
        <p>{{$t('japanese.accountStep.desc')}}</p>
        <ul class="step-list clearfix">
          <template v-for="(item, inx) in accountStepList">
            <li :key="inx">
              <div class="title">
                <span>{{inx + 1}}</span>
                {{item.title}}
              </div>
              <img :src="accountImgs[inx]">
              <p> {{item.desc}}</p>
            </li>
            <li v-if="inx < 2" :key="inx + '-arrow'">
              <img :src="arrowImg" class="arrow-img"/>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import commonMixin from 'BlockChain-ui/PC/common-mixin/home/custom/custom';
import mixin from 'BlockChain-ui/PC/common-mixin/home/custom/japanese/japanese';
import 'BlockChain-ui/PC/common-mixin/home/custom/japanese/japanese.styl';

export default {
  mixins: [commonMixin, mixin],
  created() {
    this.init();
  },
};
</script>
