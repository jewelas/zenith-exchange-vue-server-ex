<template>
  <div class="coborker-container">
    <div class="coborker-banner" :style="bannerBackground"></div>
    <div class="coborker-content">
      <div class="block c-3-bg b-1-cl">
        <!-- 简单三步，佣金到账 -->
        <div class="head-tit c-5-bd">{{ $t('coBrokerWebPack.text1') }}</div>
        <div class="step-title c-5-bd">
          <div class="step-item step-item1">
            <p>{{ $t('coBrokerWebPack.text2') }}</p>
            <p>{{ $t('coBrokerWebPack.text3') }}</p>
          </div>
          <div class="step-item step-item2">
            <p>{{ $t('coBrokerWebPack.text4') }}</p>
            <p>{{ $t('coBrokerWebPack.text5') }}</p>
          </div>
          <div class="step-item step-item3">
            <p>{{ $t('coBrokerWebPack.text6') }}</p>
            <p>{{ $t('coBrokerWebPack.text7') }}</p>
          </div>
        </div>
        <div class="my-borker-info c-5-bd" v-if="isLogin">
          <div class="tit">
            <!-- 邀请用户加入XXXX，得合约交易手续费返佣 -->
            {{ $t('coBrokerWebPack.text8') }}
            {{ serverName }}
            {{ $t('coBrokerWebPack.text9') }}
            <span class="u-8-cl">
              <!-- 下载推广海报 -->
              <!-- {{ $t('coBrokerWebPack.text10') }} -->
            </span>
          </div>
          <div class="borker-info-data">
            <div class="info-item">
              <p class="b-2-cl">
                <!-- 我的邀请码 -->
                {{ $t('coBrokerWebPack.text11') }}
              </p>
              <div class="ewm a-4-bg">
                <img :src="userInfo.inviteQECode" alt="">
              </div>
              <p class="dow-ewm">
                <a download="inviteQECode" :href="userInfo.inviteQECode" class="u-8-cl">
                  <!-- 下载邀请码 -->
                  {{ $t('coBrokerWebPack.text12') }}
                </a>
              </p>
            </div>
            <div class="info-item">
              <p class="b-2-cl">
                <!-- 专属邀请码 -->
                {{ $t('coBrokerWebPack.text13') }}
              </p>
              <div class="my-code a-4-bg">
                <svg class="icon icon-14 left-info" aria-hidden="true">
                    <use xlink:href="#icon-b_16"></use>
                  </svg>
                <span class="code-val">{{userInfo.inviteCode}}</span>
                <input :value="userInfo.inviteCode" ref='inviteCode'>
                <span class="svgs" @click="copy('inviteCode')">
                  <svg class="icon icon-14 info" aria-hidden="true">
                    <use xlink:href="#icon-a_9"></use>
                  </svg>
                  <svg class="icon icon-14 active" aria-hidden="true">
                    <use xlink:href="#icon-a_9_1"></use>
                  </svg>
                </span>
              </div>
            </div>
            <div class="info-item">
              <p class="b-2-cl">
                  <!-- 推广链接 -->
                  {{ $t('coBrokerWebPack.text14') }}
              </p>
              <div class="my-code push-link a-4-bg">
                <svg class="icon icon-14 left-info" aria-hidden="true">
                    <use xlink:href="#icon-b_17"></use>
                  </svg>
                <span class="code-val">{{userInfo.inviteUrl}}</span>
                <input :value="userInfo.inviteUrl" ref='inviteUrl'>
                <span class="svgs" @click="copy('inviteUrl')">
                  <svg class="icon icon-14 info" aria-hidden="true">
                    <use xlink:href="#icon-a_9"></use>
                  </svg>
                  <svg class="icon icon-14 active" aria-hidden="true">
                    <use xlink:href="#icon-a_9_1"></use>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="my-rights c-5-bd" v-if="coAgentFlag">
          <div class="tit">
            <!-- 我的权益 -->
            {{ $t('coBrokerWebPack.text15') }}
            <span class="u-8-cl" @click="goPage('personal/brokerSystem')">
              <!-- 进入合约经纪人管理系统 -->
              {{ $t('coBrokerWebPack.text16') }}
            </span>
          </div>
          <div class="rights-list">
            <ul class="ul-1">
              <li class="rights-item">
                <span class="t-h b-2-cl">
                  <!-- 直推返佣 -->
                  {{ $t('coBrokerWebPack.text17') }}
                </span>
                <span class="t-d"> {{scale_info.scale_return}}</span>
              </li>
              <li class="rights-item">
                <span class="t-h b-2-cl">
                  <!-- 二级返佣 -->
                  {{ $t('coBrokerWebPack.text18') }}
                </span>
                <span class="t-d">{{scale_info.scale_second}}</span>
              </li>
              <li class="rights-item">
                <span class="t-h b-2-cl">
                  <!-- 子经济返佣 -->
                  {{ $t('coBrokerWebPack.text19') }}
                </span>
                <span class="t-d">{{scale_info.scale_sub}}</span>
              </li>
            </ul>
            <ul class="ul-2">
              <li class="rights-item">
                <span class="t-h b-2-cl">
                  <!-- 客户总数（人） -->
                  {{ $t('coBrokerWebPack.text20') }}
                </span>
                <span class="t-d">{{ child_info.count_total }}</span>
              </li>
              <li class="rights-item">
                <span class="t-h b-2-cl">
                  <!-- 累计佣金折合（USDT） -->
                  {{ $t('coBrokerWebPack.text21') }}
                </span>
                <span class="t-d">{{ bonus_info.amount_total }}</span>
              </li>
            </ul>
            <ul class="ul-3">
              <li class="rights-item">
                <span class="t-h b-2-cl">
                  <!-- 昨日佣金折合（USDT） -->
                  {{ $t('coBrokerWebPack.text22') }}
                </span>
                <span class="t-d">{{ bonus_info.amount_yesterday }}</span>
              </li>
              <li class="rights-item">
                <span class="t-h b-2-cl">
                  <!-- 前日佣金折合（USDT） -->
                  {{ $t('coBrokerWebPack.text23') }}
                </span>
                <span class="t-d">{{ bonus_info.amount_b_yesterday }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="main-content clearfix">
          <div class="main-text">
            <div class="tit">
              {{ $t('coBrokerWebPack.text24_1') }}
              {{ $t('coBrokerWebPack.text24') }}
              {{ serverName }}
            </div>
            <p>{{ $t('coBrokerWebPack.text25') }}</p>
            <br /><br />
            <p class="smll b-2-cl">{{ $t('coBrokerWebPack.text26') }}</p>
            <c-button width="320px" @click="goNotice">
              {{ $t('coBrokerWebPack.text27') }}
            </c-button>
          </div>
          <div class="main-img">
            <!-- 示例 1 -->
            <img v-if="baseInfo.rebateType === '0'" src="https://chaindown-oss.oss-cn-hongkong.aliyuncs.com/upload/20200522113513539.png" alt="">
            <!-- 示例 2 -->
            <img v-if="baseInfo.rebateType === '1'" src="https://chaindown-oss.oss-cn-hongkong.aliyuncs.com/upload/20200522113532860.png" alt="">
            <!-- 示例 3 -->
            <img v-else :src="baseInfo.rebateUrl" alt="">
          </div>
        </div>
      </div>
      <div class="main-data c-3-bg">
        <div class="head-tit b-1-cl c-5-bd">
            <!-- 佣金奖励总榜 -->
            {{ $t('coBrokerWebPack.text28') }}
        </div>
        <div class="my-data c-5-bd">
          <div class="my-data-item a-3-bd">
            <p class="val b-1-cl">{{myRankData.rank}}</p>
            <p class="tit">
              <!-- 我的排名 -->
              {{ $t('coBrokerWebPack.text29') }}
            </p>
          </div>
          <div class="my-data-item a-3-bd">
            <p class="val b-1-cl">{{myRankData.amount}} USDT</p>
            <p class="tit">
              <!-- 我的佣金 -->
              {{ $t('coBrokerWebPack.text30') }}
            </p>
          </div>
          <div class="my-data-item a-3-bd">
            <p class="val b-1-cl">{{myRankData.inviteNumber}} {{ $t('coBrokerWebPack.text35') }}</p>
            <p class="tit">
              <!-- 邀请总人数 -->
              {{ $t('coBrokerWebPack.text31') }}
            </p>
          </div>
          <div v-if="!isLogin" class="login-btn">
            <span class="u-8-cl" @click="goPage('login')">
                <!-- 登录查看 -->
                {{ $t('coBrokerWebPack.text32') }}
            </span>
          </div>
        </div>
        <div class="table-data">
          <c-table
            :columns='columns'
            :imgMap="imgMap"
            :colorMap="colorMap"
            :dataList='dataList'
            headClasses='c-3-bg'
            bodyClasses='c-4-bg'
            :loading = 'tableLoading'
           />
        </div>
        <div class="page-button-btn c-4-bg" v-if="!isLogin">
          <c-button
            paddingW= "10px"
            @click="goPage('login')"
            width="270px">
            <!-- 立即登录，邀请好友 -->
            {{ $t('coBrokerWebPack.text33') }}
        </c-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/coBroker/index';
import 'BlockChain-ui/PC/common-mixin/coBroker/index.styl';


export default {
  mixins: [mixin],
  components: {

  },
  mounted() {
    this.init();
  },
};

</script>
