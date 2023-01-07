 <template>
  <div class="symbol-info">
    <div class="block-title-tab a-3-bd a-5-bg">
      <ul class="block-title-ul b-1-cl">
        <li class="block-title-item">
          <!-- 概况 -->
          {{$t('market.text1')}}
        </li>
        <li class="block-title-item marketIcon"
          @click="marketClick(dataList.name)">
          <svg v-if="mySymbolList.indexOf(dataList.name) === -1"
            class="icon icon-16" aria-hidden="true">
            <use xlink:href="#icon-c_11"></use>
          </svg>
          <svg v-else class="icon icon-16" aria-hidden="true">
            <use xlink:href="#icon-c_11_1"></use>
          </svg>
        </li>
      </ul>
    </div>
    <div class="symbol-info-main">
      <div class="symbol-info-content b-1-cl">
        <p class="symbol-name"> {{dataList.name | getCoinShowName(symbolAll)}} </p>
        <p class="symbol-price">
          <span>{{dataList.close ? dataList.close.data : ''}}</span>
          <span :class="dataList.rose && dataList.rose.class">
            {{dataList.rose ? dataList.rose.data : ''}}
          </span>
        </p>
        <p class="symbol-vol b-2-cl">
          <span class="price">≈ {{ dataList.close ? dataList.close.price : ''}}</span>
          <span>24H {{$t('market.vol')}} {{dataList.vol}}</span>
        </p>
        <p>
          <c-button paddingW="20px"
                   height="30px"
                   @click="bandLink(dataList.name)"
                   class="alert-button"
                   marginTop="16px">
                   <!-- 去交易 -->
                   {{$t('market.text2')}}
          </c-button>
        </p>
      </div>
      <charts :key="dataList.name"
        height="70px"
        :dataList = "klineDataList[dataList.name]"
        :name= "dataList.name" />
    </div>
    <div class="block-title-tab a-3-bd a-5-bg">
      <ul class="block-title-ul b-1-cl">
        <li class="block-title-item">
          <!-- 基本信息 -->
          {{$t('market.text3')}}
        </li>
      </ul>
    </div>
    <div class="s">
      <currencyNotes :coinName="symbolCurrentCoinName">
            </currencyNotes>
    </div>
  </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/market/recommend/recommend/recommend';
import 'BlockChain-ui/PC/common-mixin/market/recommend/recommend/recommend.styl';
import Charts from '../charts/china.vue';
import currencyNotes from './currencyNotes.vue';

export default {
  name: 'info',
  mixins: [mixin],
  components: {
    currencyNotes,
    Charts,
  },
  mounted() {
    this.init();
  },
};
</script>
