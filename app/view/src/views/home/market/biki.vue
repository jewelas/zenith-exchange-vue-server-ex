<template>
  <div class="market biki-mater-container">
    <div class="market-title-box">
      <ul class="market-title" ref="marketUl">
        <li
          :class="{'selected b-4-cl b-4-bd':'24hours' === marketCurrent}"
          @click="switchMarket('24hours')">{{$t('biki.home.increaseList')}}
        </li>
        <li
          :class="{'selected  b-4-cl b-4-bd':'myMarket' === marketCurrent}"
          @click="switchMarket('myMarket')">{{$t('biki.home.optional')}}
        </li>
        <li
          v-for="(item, index) in marketAllList"
          :key="index"
          :class="{'selected  b-4-cl b-4-bd': marketCurrent === item}"
          @click="switchMarket(item)">
          {{item | getCoinShowName(coinList)}}
        </li>
      </ul>
      <div class="search b-2-cl a-2-bd">
        <i class="icon-serach">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-a_12"></use>
          </svg>
        </i>
        <input
          v-model="listfilter"
          ref="serachInp"
          class="search-input b-2-cl"
          type="text"
          :placeholder="$t('home.searchSy')"
        >
      </div>
    </div>
    <div class="market-list-box a-2-bd">
      <ul class="market-list-thead">
        <li v-for="(item, index) in columns" :key="index">
          <span class="market-list-thead-label">{{item.title}}</span>
        </li>
      </ul>
      <div class="market-loading" v-if="tableLoading">
        <div class="market-page">
          <c-loading size="45"/>
        </div>
      </div>
      <div v-else>
        <div class="market-nodata" v-if="!tableData.length">
          <svg class="icon icon-50" aria-hidden="true">
            <use xlink:href="#icon-g_2"></use>
          </svg>
          <!-- 暂无数据 -->
          <p>{{$t('common.notData')}}</p>
        </div>
        <div v-else class="market-tbody-box">
          <!-- <vue-scroll :ops="ops"> -->
            <div class="market-tbody" v-for="(Fitem, Findex) in tableData" :key="Findex">
              <div>
                <div
                  class="market-tbody-title"
                  v-if="Object.keys(tableData).length > 1
                  && !listfilter
                  && marketCurrent !== '24hours'"
                >
                  <span class="lable a-2-bd">{{ Fitem.title }}</span>
                  <i class="a-2-bd"></i>
                </div>
                <ul class="market-tbody-list">
                  <template v-for="(item, index) in Fitem.data">
                    <li
                      v-if="marketCurrent !== '24hours'
                      ? true
                      : index < 14 ? true : false"
                      class="market-tbody-li b-1-cl"
                      :key="index"
                      @mouseenter="enter(`${Findex}-${index}`,$event)"
                      @mouseleave="leave($event)"
                    >
                      <!-- 币对 -->
                      <div class="even">
                        <span
                          v-if="marketCurrent !== '24hours'"
                          v-html="item.data[0][0].iconSvg"
                          class="marketIcon"
                          @click="marketClick(item.id)"
                        ></span>
                        <span v-else>{{++index}}</span>
                        <span
                          v-html="item.data[0][1].iconSvg"
                          class="evenSymbol"
                        ></span>
                      </div>
                      <!-- 最新价 -->
                      <div class="even newPrice">
                        <p class="price">{{item.data[1][0].text}}</p>
                      </div>
                      <!-- 涨跌幅 -->
                      <div class="even">
                        <div :class="[...item.data[2][0].classes]">{{item.data[2][0].text}}</div>
                      </div>
                      <div class="even">{{item.data[5][0].text}}</div>
                      <div class="even b-4-cl" @click="bandLink(item.id)">
                        {{$t('biki.home.trade')}}
                      </div>
                    </li>
                  </template>

                </ul>
              </div>
            </div>
          <!-- </vue-scroll> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import commonMixin from 'BlockChain-ui/PC/common-mixin/home/market/market';
import mixin from 'BlockChain-ui/PC/common-mixin/home/market/biki/biki';
import 'BlockChain-ui/PC/common-mixin/home/market/biki/biki.styl';


export default {
  mixins: [commonMixin, mixin],
  created() {
    this.init();
  },
};
</script>
