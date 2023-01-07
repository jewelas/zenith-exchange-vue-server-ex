<template>
  <div class="innovation fuz-page-content">
    <!-- <c-pageBanner
      :title="bannerTitle"
      :backgroungImgUrl="bannerImg"
      :imgMap="imgMap"
    ></c-pageBanner> -->
    <div class="innovation-content fuz-full">
      <c-navTab
        activeClassName="f-1-cl"
        activeColor="c-8-bg"
        class="c-5-bd pc-list fuz-menu"
        :currentTab="nowType"
        :navTab="navTab"
        lineHeight="55"
        @currentType="currentType"
      />
      <c-navTab
        activeClassName="f-1-cl"
        activeColor="c-8-bg"
        class="c-5-bd a-4-bg h5-list"
        :currentTab="nowType"
        :navTab="navTab"
        lineHeight="55"
        @currentType="currentType"
      />
      <div class="innovation-list" v-if="dataList.length">
        <div
          class="innovation-item  fuz-card-plain"
          :key = "index"
          v-for="(item, index) in dataList">
          <div class="img">
            <img :src="item.logo" alt="">
          </div>
          <div class="info">
            <h2 class="tit f-1-cl" v-if="publicInfo.msg.companyId.toString() !== '1654'">
              【{{item.grantSymbol | getCoinShowName(coinList)}}】{{item.name}}
              <label :class="statusClass(item)" class="statusLabel">{{setStatusText(item)}}</label>
            </h2>
            <h2 class="tit f-1-cl" v-else>
              <div class="no-progress">
              【{{item.grantSymbol | getCoinShowName(coinList)}}】{{item.name}}
              <label :class="statusClass(item)" class="statusLabel">{{setStatusText(item)}}</label>
              </div>
            </h2>
            <div class="bf" v-if="!isHideBar && publicInfo.msg.companyId.toString() !== '1654'">
              <p>
                <span>
                  <!-- 进度 -->
                  {{$t('innov.progress')}}
                </span>
                <span class="f-r">
                  <!-- 融资总额 -->
                  {{$t('innov.rz_total')}}
                </span>
              </p>
              <div class="jdt d-5-bg">
                <div class="jdt-bar c-8-bg"
                :style="{'width':countScale(item.speed ,100)  + '%'}">
                </div>
              </div>
              <p class="f-1-cl">
                <span>{{countScale(item.speed ,100)}}%</span>
                <span class="f-r">
                  {{fixDFun(item.money, item.coinSymbol)}}
                  {{item.coinSymbol | getCoinShowName(coinList)}}
                </span>
              </p>
            </div>
            <div class="bf" v-if="isHideBar">
                <!-- 融资总额 -->
                {{$t('innov.rz_total')}}
                <span class="f-1-cl">
                  {{fixDFun(item.money, item.coinSymbol)}}
                  {{item.coinSymbol | getCoinShowName(coinList)}}
                </span>
            </div>
            <div class="cz"
            :class="publicInfo.msg.companyId.toString() === '1654' ? 'addMargin' : ''">
              <div class="timer">
                <span class="tim">
                  <!-- 开始结束日期 -->
                  {{$t('innov.start')}}
                </span>
                <span class="val f-1-cl">
                  {{formatTimeFn(item.startTime)}}
                   ～
                  {{formatTimeFn(item.endTime)}} </span>
                <div class="djs" v-if="item.status === -1" v-html="item.djs"></div>
              </div>
              <c-button type="solid"
                v-if="item.status === -1"
                :disabled="submitDisabled(item)"
                height="40px"
                marginTop="16px"
                width="120px"
                paddingW="0px">
                <span>{{ $t('innov.notStart') }}</span>
              </c-button>
              <c-button type="solid"
                v-else
                :disabled="submitDisabled(item)"
                height="40px"
                width="120px"
                paddingW="0px"
                @click="submit(item.projectId)">
                <!-- 立即申购 -->
                <!-- <span v-if="item.status === 4">{{$t('innov.dh_end')}}</span>
                <span v-else-if="item.status === 3">{{$t('innov.dh_financing')}}</span>
                <span v-else>{{$t('innov.immediate')}}</span> -->
                <span>{{$t('innov.immediate')}}</span>
              </c-button>
            </div>
            <div class="text fuz-border">
              {{item.projectIntro}}
            </div>
          </div>
        </div>
        <c-pagination v-if="(pagination.count/pagination.pageSize) > 1"
                :total="pagination.count"
                classes="c-4-bd"
                :current-page='pagination.page'
                :display='pagination.pageSize'
                @pagechange="pagechange">
        </c-pagination>
      </div>
      <div class="no-data" v-if="!dataList.length && !loading">
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
import mixin from 'BlockChain-ui/PC/common-mixin/innovation/list/list';
import 'BlockChain-ui/PC/common-mixin/innovation/list/list.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
