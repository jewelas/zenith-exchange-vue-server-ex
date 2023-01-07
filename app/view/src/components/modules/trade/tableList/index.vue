<!-- 币币交易 24小时行情 -->
<template>
  <div class="trade-table-list-container" :class="type">
    <div
      v-if="theadList && theadList.length"
      class="thead a-21-bg a-3-bd b-2-cl">
      <span v-for="(item, index) in theadList"
            :key="'thead' +index"
            :class="'td-symbol' + index"
            :style="{'width': cellWidth[index] + 'px'}">
        {{item}}
      </span>
    </div>
    <div
      class="tbody"
      :class="{'no-padding' : bodyHeight === 0}"
      :style="tbodyStyle">
      <vue-scroll :ops="ops" ref="vs" @handle-resize="handleResize">
        <div class="tbodyBar" :style="tbodyStyle">
          <div :class="asksOPtion">
            <template v-if="differNUmber > 0 && type === 'asks'">
              <div
                class="symbol-item a-7-bg-h b-2-cl"
                v-for="(item, index) in differNUmber"
                :key="index + 'diff'">
                  <span class="td-symbol"
                        :class="priceClass"
                        :style="{'width': cellWidth[0] + 'px'}">
                    --
                  </span>
                  <span class="td-price"
                        :style="{'width': cellWidth[1] + 'px'}">
                    --
                  </span>
                  <span class="td-rose"
                        :style="{'width': cellWidth[2] + 'px'}">
                    --
                  </span>
              </div>
            </template>
            <template v-for="(item, index) in dataList">
              <div
                v-if="isShow(index)"
                :class="{'change-item' : item.diff}"
                class="symbol-item a-7-bg-h b-2-cl"
                :key="index">
                <!-- 价格 -->
                <div class="bg a-4-bg"></div>
                <span class="td-symbol"
                      @click="handelPrice(item.price)"
                      :class="priceClass"
                      :style="{'width': cellWidth[0] + 'px'}">
                  <b class="hover_hide">{{item.price}}</b>
                  <b class="hover_show">{{item.rate}}</b>
                </span>
                <!-- 数量 -->
                <span class="td-price"
                      :style="{'width': cellWidth[1] + 'px'}">
                  {{item.vol}}
                  <i v-if="flashSwitchs" class="change" :class="trBgClass(item.diff)"></i>
                </span>
                <!-- 累计 -->
                <span class="td-rose"
                      :style="{'width': cellWidth[2] + 'px'}">
                  {{item.total}}
                </span>
                <b
                class="tr-bg"
                :class="trBgClass_two"
                :style="setWidth(item.vol)"></b>
              </div>
            </template>
            <template v-if="differNUmber > 0 && type === 'buy'">
              <div
                class="symbol-item a-7-bg-h b-2-cl"
                v-for="(item, index) in differNUmber"
                :key="index + 'diff'">
                <span class="td-symbol"
                      :class="priceClass"
                      :style="{'width': cellWidth[0] + 'px'}">
                  --
                </span>
                <span class="td-price"
                      :style="{'width': cellWidth[1] + 'px'}">
                  --
                </span>
                <span class="td-rose"
                      :style="{'width': cellWidth[2] + 'px'}">
                  --
                </span>
              </div>
            </template>
          </div>
        </div>
      </vue-scroll>
    </div>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/modules/trade/tableList/tableList';
import 'BlockChain-ui/PC/common-mixin/modules/trade/tableList/tableList.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.scrollTo();
  },
};

</script>
