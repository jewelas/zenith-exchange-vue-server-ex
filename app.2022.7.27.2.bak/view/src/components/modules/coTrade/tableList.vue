<!-- 币币交易 24小时行情 -->
<template>
  <div class="tableList-box tableList-container">
    <div
      v-if="theadList && theadList.length"
      class="thead a-21-bg a-3-bd b-2-cl"
    >
      <span
        v-for="(item, index) in theadList"
        :key="'thead' + index"
        :style="{ width: cellWidth[index] + 'px' }"
      >
        {{ item }}
      </span>
    </div>
    <div
      class="tbody"
      :class="{ 'no-padding': bodyHeight === 1 }"
      :style="tbodyStyle"
    >
      <vue-scroll :ops="ops" ref="vs" @handle-resize="handleResize">
        <div class="tbodyBar" :style="tbodyStyle">
          <div :class="asksOPtion">
            <template v-if="differNUmber > 0 && type === 'asks'">
              <div
                class="symbol-item a-5-bg-h b-2-cl"
                v-for="(item, index) in differNUmber"
                :key="index + 'diff'"
              >
                <span
                  class="td-symbol"
                  :class="priceClass"
                  :style="{ width: cellWidth[0] + 'px' }"
                >
                  --
                </span>
                <span class="td-price" :style="{ width: cellWidth[1] + 'px' }">
                  --
                </span>
                <span class="td-rose" :style="{ width: cellWidth[2] + 'px' }">
                  --
                </span>
              </div>
            </template>
            <template v-for="(item, index) in dataList">
              <div
                v-if="isShow(index)"
                :class="{ 'change-item': item.diff }"
                class="symbol-item a-5-bg-h b-2-cl"
                :key="index + 'item'"
              >
                <!-- 价格 -->
                <div class="bg a-21-bg"></div>
                <span
                  class="td-symbol"
                  @click="handelPrice(item.price)"
                  :class="priceClass"
                  :style="{ width: cellWidth[0] + 'px' }"
                >
                  {{ item.price }}
                </span>
                <!-- 数量 -->
                <span class="td-price" :style="{ width: cellWidth[1] + 'px' }">
                  {{ item.vol }}
                  <div
                    v-if="flashSwitchs"
                    class="change"
                    :class="trBgClass(item.diff)"
                  ></div>
                </span>
                <!-- 累计 -->
                <span class="td-rose" :style="{ width: cellWidth[2] + 'px' }">
                  {{ item.total }}
                  <b
                    class="tr-bg"
                    :class="trBgClass_two"
                    :style="setWidth(item.total)"
                  ></b>
                </span>
              </div>
            </template>
            <template v-if="differNUmber > 0 && type === 'buy'">
              <div
                class="symbol-item a-5-bg-h b-2-cl"
                v-for="(item, index) in differNUmber"
                :key="index + 'diff'"
              >
                <span
                  class="td-symbol"
                  :class="priceClass"
                  :style="{ width: cellWidth[0] + 'px' }"
                >
                  --
                </span>
                <span class="td-price" :style="{ width: cellWidth[1] + 'px' }">
                  --
                </span>
                <span class="td-rose" :style="{ width: cellWidth[2] + 'px' }">
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
import mixin from 'BlockChain-ui/PC/common-mixin/modules/coTrade/tableList/tableList';
import 'BlockChain-ui/PC/common-mixin/modules/coTrade/tableList/tableList.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
