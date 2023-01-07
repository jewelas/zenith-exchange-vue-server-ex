<template>
  <div
    class="inter-tableContentBase bitsg-market-container inter-tableContent"
  >
    <div class='bitsg-market-top'>
       <!-- <div class='bitsg-market-topL'>
         <div class='market-topLT'>
           <span class="b-4-bg market-topLTspan"></span>
           {{ $t("home.bitsgtitle1") }}
         </div>
         <div class='market-topLB'>{{ $t("home.bitsgtitle2") }}</div>
       </div>
       <div class='bitsg-market-topR'>
          <button  class="common-button common-button-solid b-4-bd b-4-cl"
          @click="goTrade">{{ $t("home.bitsgtitle3") }}</button>
       </div> -->
    </div>
    <div class="market-table">
      <div class="market-title-box ">
        <ul class="market-title f-2-cl" ref="marketUl">
          <li
            class="borderRadius "
            :class="{ 'selected u-16-cl c-8-bg': 'myMarket' === marketCurrent }"
            @click="switchMarket('myMarket')"
          >
            {{ $t("home.marketSet") }}
          </li>
          <li
            v-for="(item, index) in marketAllList"
            :key="index"
            :class="{ 'selected u-16-cl c-8-bg': marketCurrent === item }"
            @click="switchMarket(item)"
          >
            {{ item | getCoinShowName(coinList) }}
          </li>
        </ul>
        <div class="search ">
          <i class="icon-serach f-2-cl">
            <svg class="icon icon-14" aria-hidden="true">
              <use xlink:href="#icon-a_12"></use>
            </svg>
          </i>
          <input
            v-model="listfilter"
            ref="serachInp"
            class="search-input f-2-cl"
            type="text"
            :placeholder="$t('home.searchSy')"
          />
        </div>
      </div>
      <div class="home-table">
        <ul class="home-thead">
          <li v-for="(item, index) in columns" :key="index">
            <span
              class="thead-label"
              :class="item.sortable ? 'sortable' : ''"
              @click="sort(item)"
            >
              {{ item.title }}
              <svg v-if="item.sortable" aria-hidden="true" class="icon icon-14">
                <!-- #icon-a_17 -->
                <use xlink :href="item.key | sortIcon(sortValue, sortSell)"></use>
              </svg>
            </span>
          </li>
        </ul>
        <div class="home-loading" v-if="tableLoading">
          <div class="loading-page">
            <c-loading size="45" />
          </div>
        </div>
        <div v-else>
          <div class="home-nodata" v-if="!tableData.length">
            <svg class="icon icon-50" aria-hidden="true">
              <use xlink:href="#icon-g_2"></use>
            </svg>
            <p>
              <!-- 暂无数据 -->
              {{ $t("common.notData") }}
            </p>
          </div>
          <div
            v-else
            :style="{ height: tableHeight + 'px' }"
            class="home-tbody-box"
          >
            <vue-scroll :ops="ops">
              <div
                class="home-tbody"
                v-for="(Fitem, Findex) in tableData"
                :key="Findex"
              >
                <div>
                  <div
                    class="home-tbody-title "
                    v-if="Object.keys(tableData).length > 1 && !listfilter"
                  >
                    <span class="lable c-5-bd">{{ Fitem.title }}</span>
                  </div>
                  <ul class="home-tbody-list">
                    <li
                      class="home-tbody-li  f-2-cl "
                      v-for="(item, index) in Fitem.data"
                      :class="lineClassesH(`${Findex}-${index}`)"
                      :key="index"
                      @mouseenter="enter(`${Findex}-${index}`)"
                      @mouseleave="leave"
                    >
                      <!-- 币对 -->
                      <div class="even">
                        <span
                          v-html="item.data[0][0].iconSvg"
                          class="marketIcon"
                          @click="marketClick(item.id)"
                        ></span>
                        <span
                          v-html="item.data[0][1].iconSvg"
                          class="evenSymbol"
                          @click="bandLink(item.id, item.etfOpen)"
                        ></span>
                        <span v-if="item.etfOpen && marketCurrent!=='ETF'"
                          class="eft-class u-8-bd u-8-cl">ETF</span>
                      </div>
                      <!-- 最新价 -->
                      <div class="even newPrice">
                        <p class="price">{{ item.data[1][0].text }}</p>
                        <p class="b-2-cl">
                          {{ item.data[1][0].subContent.text }}
                        </p>
                      </div>
                      <!-- 涨跌幅 -->
                      <div class="even">
                        <div :class="[...item.data[2][0].classes]">
                          {{ item.data[2][0].text }}
                        </div>
                      </div>
                      <div class="even">{{ item.data[3][0].text }}</div>
                      <div class="even">{{ item.data[4][0].text }}</div>
                      <div class="even">{{ item.data[5][0].text }}</div>
                      <div class="even">{{ item.data[6][0].text }}</div>
                    </li>
                  </ul>
                </div>
              </div>
            </vue-scroll>
          </div>
        </div>
      </div>
      <div class="home-tbody  f-2-cl checkAll" @click="goTrade">
        <span>{{ $t("home.moreMarket")}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import commonMixin from 'BlockChain-ui/PC/common-mixin/home/market/market';
import mixin from 'BlockChain-ui/PC/common-mixin/home/market/bitsg/bitsg';
import 'BlockChain-ui/PC/common-mixin/home/market/bitsg/bitsg.styl';

export default {
  mixins: [commonMixin, mixin],
  created() {
    this.init();
  },
};
</script>

<style lang="stylus" scoped>

</style>
