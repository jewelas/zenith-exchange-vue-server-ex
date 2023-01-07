<!-- 币币交易 24小时行情 -->
<template>
  <div class="trade-input trade-input-container" :class="{'disabledForm' : content.disabled}">
    <div class="input-item"
        @click="inputFocus"
        :class="ItemClass">
      <div class="tit">{{content.title}}</div>
      <input
          class="inputs b-1-cl"
          v-if="!content.disabled"
          ref="inputs"
          @input="handleInput($event.target.value)"
          @focus="handle('focus',$event.target.value)"
          @blur="handle('blur', $event.target.value)"
          v-model="valueData"
          :disabled= 'isDisabled'
          type="text" />
      <p v-if="content.disabled" class="disabledText e-3-cl">{{content.disabledText}}</p>
      <span v-if="!content.disabled" class="units">{{content.units}}</span>
    </div>
    <div class="price-rate b-3-bg"
          v-if="content.subText && !content.disabled">
          ≈ {{content.subText}}
    </div>
    <transition name="slide-fade">
      <div class="error-msg c-3-bg"
            v-if="content.isError">
        <p class="b-1-cl">{{content.errorText}}</p>
        <em></em>
      </div>
    </transition>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/modules/coTrade/tradeInput/tradeInput';
import 'BlockChain-ui/PC/common-mixin/modules/coTrade/tradeInput/tradeInput.styl';

export default {
  mixins: [mixin],
  // 关闭交易
  data() {
    return {
      isDisabled: true,
    };
  },
  mounted() {
    this.init();
  },
};

</script>
