<template>
    <section class="c2c">
        <div class="c2c-box">
            <div class="c2c-tabAndsearch">
                <div  class="tab-left  fuz-button-group black-background">
                    <div
                    class="tab-left-buy v5-5-cl"
                    @click="changeType('SELL')"
                    :class="{'active': this.type === 'SELL'}">{{ $t('newOtc.text16') }}</div>
                    <div
                    class="tab-left-sell v5-5-cl"
                    @click="changeType('BUY')"
                    :class="{'active': this.type === 'BUY'}">{{ $t('newOtc.text9') }}</div>
                </div>
                <div class="search-right">
                    <!-- 法币 -->
                        <c-v5-select
                        name='rate'
                        class="search-select outline"
                        :value="rate"
                        :options="rateList"
                        width="160px"
                        inputHeight="32px"
                        @onChanges="seletChange"/>
                        <!-- coin -->
                        <c-v5-select
                        name='coin'
                        class="search-select outline"
                        :value="coin"
                        :options="coinList"
                        width="160px"
                        inputHeight="32px"
                        @onChanges="seletChange"/>
                        <!-- 国家2 -->
                        <c-v5-select
                        name='country'
                        class="search-select outline"
                        :value="country"
                        :options="countryList"
                        width="160px"
                        inputHeight="32px"
                        @onChanges="seletChange"/>
                        <!-- 方式 -->
                        <c-v5-select
                        name='payment'
                        class="search-select noMargin outline"
                        :value="payment"
                        :options="paymentList"
                        width="160px"
                        inputHeight="32px"
                        @onChanges="seletChange"/>
                </div>
            </div>
            <div  class="c2c-dataTable fuz-card">
                <c-table
                    :imgMap="imgMap"
                    :colorMap="colorMap"
                    :loading ='loading'
                    :columns ="columns"
                    @elementClick='operation'
                    :dataList="dataList"
                    :classes="'v5-table'"
                    :lineClassesHover="'fuz-bg'"
                    :lineClasses ="'v5-12-bd'"
                    :headClasses = 'headClasses'
                    :bodyClasses = 'bodyClasses'
                    :cellHeight = '70'
                    :headHeight = '0'
                >
                </c-table>
                <c-v5-pagination v-show="count > 15"
                            :total="count"
                            :currentPage='page'
                            :display='pageSize'
                            @pagechange="pagechange">
                </c-v5-pagination>
            </div>
        </div>
        <div class="fuz-page-content fuz-card-padding">
          <div class="fuz-title-small fuz-gap" style='font-size:16px !important'>
            Trade statement
          </div>
          <div class='fuz-content-small'>
            1. Open trades listed on the platform are verified by MEXC.
            Trades will only proceed once it has been ascertained
            that both buyers and sellers have
            sufficient balance in their accounts.
          </div>
          <div class='fuz-content-small fuz-gap'>
            2. When transferring funds, do refrain from placing sensitive words like “BTC”,
            “USDT” and “MEXC” in the remarks field to avoid delays or transaction failures.
          </div>
          <div class='fuz-content-small fuz-gap'>
            3. Fund transfers to the listed merchants are to be performed
            with a payment mode that has been verified with your real identity.
            Otherwise, the listed merchants have the right to
            refuse your transactions and lodge complaints.
          </div>
          <div class='fuz-content-small'>
            4. MEXC reserves the right to disable user accounts,
            freeze funds and report users to the relevant authorities
            should illegal or suspicious activity be detected.
          </div>
        </div>
        <c-alert :showFlag="alertFlag"
             :buttonText="this.$t('personal.alert.buttonOpen')"
             :imgMap="imgMap"
             :colorMap="colorMap"
             @close="alertClose"
             @confirm="alertGo">
        <div class="alertText">{{tradeTypeErrorText}}</div>
      </c-alert>
    </section>
</template>


<script>
import mixin from 'BlockChain-ui/PC/common-mixin/newOtc/c2c/index';
import 'BlockChain-ui/PC/common-mixin/newOtc/c2c/index.styl';


export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
  components: {

  },
};
</script>
<style scoped>
.c2c-box {
  width: 1280px;
}
.c2c >>> .payments-ul {
  border-radius: 4px;
  padding: 4px;
}
</style>
