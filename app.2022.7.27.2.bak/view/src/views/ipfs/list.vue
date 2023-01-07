<template>
  <div class="ipfs">
    <c-pageBanner
      :title="bannerTitle"
      :backgroungImgUrl="bannerImg"
      :imgMap="imgMap"
    ></c-pageBanner>
    <div class="ipfs-content">
      <div v-if='loading' class='no-data'>
          <c-loading size='50' />
        </div>
      <div class="ipfs-list" v-else-if="dataList.length">
        <div
          class="ipfs-item c-4-bg"
          :key = "index"
          v-for="(item, index) in dataList">
          <div :class="statusClass(item)" class="statusLabel">{{setStatusText(item)}}</div>
          <div class="img">
            <img :src="item.logo" alt="">
          </div>
          <div class="info clearfix">
            <div class="cz">
              <h2 class="tit f-1-cl" :class="titleClass(item.status)" :style="titleStyle">
                {{item.name}}
              </h2>
              <div class="timer">
                <span class="tim">
                  <!-- 活动时间 -->
                  {{ $t('ipfs.text1') }}
                </span>
                <span class="val">
                  {{formatTimeFn(item.startTime)}}
                   ～
                  {{formatTimeFn(item.endTime)}} </span>
              </div>
              <div class="countdown Zf-1-cl">
                  <!-- 倒计时 -->
                  {{ $t('ipfs.text2') }}
                  <div class="countdown-time" v-html="item.djs"></div>
              </div>
            </div>
            <div class="op-right clearfix">
              <p class="price">
                <!-- 价格 -->
                {{ $t('ipfs.text3') }}
                <span class="b-4-cl">
                  {{item.initPriceV2}}
                  {{ item.coinSymbol | getCoinShowName(coinList) }}
                </span>
              </p>
              <p class="cny">≈ {{unitPriceTate(item)}}</p>
              <c-button type="solid"
                :disabled="submitDisabled(item)"
                height="40px"
                width="160px"
                paddingW="0px"
                marginTop= "18px"
                @click="submit(item.projectId)">
                <span> {{submitButton(item)}} </span>
              </c-button>
          </div>
          </div>
          <div class="bf-box u-8-bg">
            <div class="bf f-1-cl">
              <div>
                <span>
                  <!-- 已售 -->
                  {{ $t('ipfs.text4') }}
                </span>
                <div class="f-r">
                  <!-- 总算力 -->
                  {{ $t('ipfs.text5') }}
                  <span>
                    {{fixDFun(item.tokenAmount, item.grantSymbol)}}
                    {{item.grantSymbol | getCoinShowName(coinList)}}
                  </span>
                </div>
              </div>
              <div class="jdt d-5-bg">
                <div class="jdt-bar c-8-bg"
                :style="{'width':countScale(item.speed, 100)  + '%'}">

                  <span class="num u-16-cl"
                  v-if="countScale(item.speed, 100) < 8" style="left: 2px">
                    {{countScaleNum(item.speed ,100)}}%</span>
                  <span v-else class="num u-16-cl" style="right: 2px">
                    {{countScaleNum(item.speed ,100)}}%</span>
                </div>

              </div>
            </div>
          </div>
        </div>
        <c-pagination v-if="(pagination.count/pagination.pageSize) > 1"
                :total="pagination.count"
                classes="c-4-bd c-4-bg"
                :current-page='pagination.page'
                :display='pagination.pageSize'
                @pagechange="pagechange">
        </c-pagination>
      </div>
      <div class="no-data" v-else>
        <svg class="icon icon-50" aria-hidden="true">
          <use xlink:href="#icon-g_2"></use>
        </svg>
        <p>
          <!-- 暂无数据 -->
          {{$t('common.notData')}}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/ipfs/list/list';
import 'BlockChain-ui/PC/common-mixin/ipfs/list/list.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
