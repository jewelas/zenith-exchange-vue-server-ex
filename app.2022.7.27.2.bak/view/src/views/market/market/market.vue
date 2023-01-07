<template>
  <div class="market-component">
    <div class="market-tab a-3-bd a-5-bg">
      <ul class="marketUl" ref="marketUl">
        <li
          class="c-8-bd"
          :class="{'selected f-1-cl':'myMarket' === marketCurrent}"
          @click="switchMarket('myMarket')"
        >{{$t('home.marketSet')}}
        </li>
        <li
          v-for="(item, index) in marketAllList"
          :key="index"
          :class="{'selected f-1-cl': marketCurrent === item}"
          @click="switchMarket(item)"
          class="a-12-bd">
          {{item | getCoinShowName(coinList)}}
        </li>
      </ul>
      <div class="search c-4-bg a-2-bd">
        <i class="icon-serach f-2-cl">
          <svg class="icon icon-14" aria-hidden="true">
            <use xlink:href="#icon-a_12"></use>
          </svg>
        </i>
        <input
          v-model="listfilter"
          ref="serachInp"
          class="search-input b-1-cl"
          type="text"
          :placeholder="$t('home.searchSy')"
        >
      </div>
    </div>
    <div class="market-sub-tab a-5-bg a-3-bd">
      <span
        class="market-tab-item"
        :class="{'active f-1-cl a-4-bg': blockKey === 'all'}"
        @click="switchKey('all')">
        <!-- 全部行情 -->
        {{$t('market.allMarket')}}
      </span>
      <template v-for="(item, nindex) in tableData">
        <span
          class="market-tab-item"
          :class="{'active f-1-cl a-4-bg': blockKey === item.titleIndex}"
          @click="switchKey(item.titleIndex)"
          v-if="Object.keys(tableData).length > 1"
          :key="nindex">
          {{item.title}}
        </span>
      </template>
    </div>

    <div class="market-table">
      <ul class="table-thead a-3-bd a-5-bg">
        <li v-for="(item, index) in columns" :key="index">
          <span class="thead-label" :class="item.sortable ? 'sortable' : ''" @click="sort(item)">
            {{item.title}}
            <svg v-if="item.sortable" aria-hidden="true" class="icon icon-14">
              <!-- #icon-a_17 -->
              <use xlink :href="item.key | sortIcon(sortValue, sortSell)"></use>
            </svg>
          </span>
        </li>
      </ul>
      <div class="home-loading" v-if="tableLoading">
        <div class="loading-page">
          <c-loading size="45"/>
        </div>
      </div>
      <div v-else>
        <div class="home-nodata" v-if="!tableData.length">
          <svg class="icon icon-50" aria-hidden="true">
            <use xlink:href="#icon-g_2"></use>
          </svg>
          <p>
            <!-- 暂无数据 -->
            {{$t('common.notData')}}
          </p>
        </div>
        <div v-else :style="{height: tableHeight + 'px'}" class="table-tbody-box a-6-bg">
          <vue-scroll :ops="ops">
            <template v-for="(Fitem, Findex) in tableData">
            <div class="table-tbody"
              v-if="Fitem.titleIndex === blockKey || blockKey === 'all'"
              :key="Findex">
              <div>
                <div
                  class="table-tbody-title a-3-bd"
                  v-if="Object.keys(tableData).length > 1 && !listfilter"
                >
                  <span class="lable a-3-bd">{{ Fitem.title }}</span>
                </div>

                <ul class="table-tbody-list">
                  <li
                    class="table-tbody-li a-3-bd f-1-cl"
                    v-for="(item, index) in Fitem.data"
                    :class="lineClassesH(`${Findex}-${index}`)"
                    :key="index"
                    @click.stop="bandLink(item.id)"
                    @mouseenter="enter(`${Findex}-${index}`)"
                    @mouseleave="leave"
                  >
                    <!-- 币对 -->
                    <div class="even">
                      <span
                        v-html="item.data[0][0].iconSvg"
                        class="marketIcon"
                        @click.stop="marketClick(item.id)"
                      ></span>
                      <span
                        v-html="item.data[0][1].iconSvg"
                        class="evenSymbol"
                      ></span>
                      <span v-if="item.etfOpen && marketCurrent!=='ETF'"
                        class="eft-class u-8-bd u-8-cl">ETF</span>
                    </div>
                    <!-- 最新价 -->
                    <div class="even newPrice">
                      <p class="price">{{item.data[1][0].text}}</p>
                      <p class="b-2-cl">{{item.data[1][0].subContent.text}}</p>
                    </div>
                    <!-- 涨跌幅 -->
                    <div class="even">
                      <div :class="[...item.data[2][0].classes]">{{item.data[2][0].text}}</div>
                    </div>
                    <div class="even">{{item.data[3][0].text}}</div>
                    <div class="even">{{item.data[4][0].text}}</div>
                    <div class="even">{{item.data[5][0].text}}</div>
                    <div class="even">{{item.data[6][0].text}}</div>
                  </li>
                </ul>
              </div>
            </div>
            </template>
          </vue-scroll>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/market/market/market';
import 'BlockChain-ui/PC/common-mixin/market/market/market.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>

<style scoped lang="stylus">
  .common-table {
    background: none;
  }

  .search {
    position: absolute;
    top: 5px;
    right: 16px;
    height: 26px;
    line-height: 26px;
    width: 200px;
    border-radius: 2px;
    border-width: 1px;
    border-style: solid;
    .icon-serach {
      margin: 0 10px;
    }

    .search-input {
      line-height: 26px;
      border: none;
      width: 165px;
    }

    input:
    :-webkit-input-placeholder {
      color: #515A6B;
    }
  }
  .table-body td .rose-label {
    display: inline-block;
    width: 70px;
    height: 24px;
    text-align: center;
    line-height: 24px;
    padding: 0;
  }
  .table-body td .symbolName, .table-body td .icon-btn {
    padding: 0;
    vertical-align: inherit;
    margin: 0;
    display: inline-block;
  }
  .table-body td .symbolName {
    width: 80%;
    margin-left: 10px;
  }

  .fontSize14 {
    font-size: 14px;
  }

.inter-tableContent{
  width: 1180px;
  margin: 0 auto 0 auto;
}
</style>
