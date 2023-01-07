<!-- 币币交易 24小时行情 -->
<template>
  <div
    class="newTrade-input newTrade-input-china-container"
    :class="{'disabledForm' : content.disabled}">
    <div class="input-item a-4-bg"
        @mouseover="handleMouseEvent('over')"
        @mouseout="handleMouseEvent('out')"
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
          :placeholder="placeText"
          v-model="valueData"
          type="text" />
      <p v-if="content.disabled" class="disabledText b-3-cl">{{content.disabledText}}</p>
      <span v-if="!content.disabled && content.units" class="units">
        {{content.units | getCoinShowName(coinList)}}
      </span>
    </div>
    <transition name="slide-fade">
      <div
        class="price-rate a-4-bg"
        v-if="content.subText && !content.disabled && (focusv || isHover)">
        ≈ {{content.subText}}
        <span class="arrow a-4-bd"></span>
      </div>
    </transition>
    <transition name="slide-fade">
      <div class="error-msg a-19-bg"
            v-if="content.isError">
        <p style="color:#EDF4F8">{{content.errorText}}</p>
        <span class="arrow a-19-bd"></span>
      </div>
    </transition>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/modules/newTrade/tradeForm/tradeInput/tradeInput';
import 'BlockChain-ui/PC/common-mixin/modules/newTrade/tradeForm/tradeInput/tradeInput.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};

</script>
