<!-- 币币交易 24小时行情 -->
<template>
  <div class="trade-input trade-input-china-container trade-grid"
   :class="{'disabledForm' : content.disabled}">
    <div class="input-item"
        @click="inputFocus"
        :class="ItemClass">
            <!-- <div class="grid-input-box">
              <div class="input-item" @click="inputFocus" :class="ItemClass">
                <input type="text" class="inputs b-1-cl" placeholder="最低价">
                 <div class="unit">
                   {{symbolUnit.units | getCoinShowName(coinList)}}
                  </div>
              </div>
            </div> -->
      <input
          class="grid_inputs b-1-cl"
          v-if="!content.disabled"
          ref="inputs"
          :style="content.style"
          @input="handleInput($event.target.value)"
          @focus="handle('focus',$event.target.value)"
          @blur="handle('blur', $event.target.value)"
          v-model="valueData"
          :placeholder="placeText || content.placeHolder"
          type="text" />
      <p v-if="content.disabled" class="b-3-cl grid_name">{{content.disabledText}}</p>
      <span v-if="!content.disabled" class="units">
        {{content.units | getCoinShowName(coinList)}}
      </span>
    </div>
    <transition name="slide-fade">
      <div class="error-msg a-19-bg"
      ref="errorH"
            v-if="content.isError" :style="'top:' + content.errorHeight">
        <p style="color:#EDF4F8">{{content.errorText}}</p>
      </div>
    </transition>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/modules/newTrade/tradeForm/tradeInput/tradeInput';
import 'BlockChain-ui/PC/common-mixin/modules/newTrade/tradeForm/tradeInput/tradeInput.styl';

export default {
  mixins: [mixin],
  name: 'GridTradeInput',
  mounted() {
    this.init();
  },
  props: {
    placeText: {
      default: null,
      type: String,
    },
  },
  watch: {
    'content.isError': {
      handler(v) {
        if (v) {
          setTimeout(() => {
            this.$bus.$emit('errorMsg');
          }, 2000);
        }
      },
      deep: true,
    },
  },
};

</script>

<style lang="stylus">
  .trade-grid .trade-input.trade-grid {
    height: 50px !important;
    position: relative;
    margin-top 10px;
  }
  .trade-grid .trade-input.trade-grid .input-item {
    height 35px !important;
    padding-top 8px !important;
    box-sizing: border-box;
  }
  .trade-grid .trade-input.trade-grid .input-item .units {
    top 12px !important;
  }
  .trade-grid .trade-input.trade-grid .input-item .grid_inputs {
    width 76%;
    height: 18px;
    line-height: 18px;
    font-size: 14px;
  }
  .grid_name {
    font-size 14px;
  }
  .trade-grid.trade-input-china-container .error-msg {
    line-height: 20px;
    height: auto;
    min-height: 30px;
    display: flex;
    align-items: center;
  }
  .en_US .trade-grid .trade-input.trade-grid {
    height 45px !important;
  }
</style>
