<template>
  <section class="a-4-bg b2cRecrge-even">
    <span class="key">{{title}}</span>
    <span class="value f-1-cl">{{value}}</span>
    <span class="copyTd" v-if="haveCopy">
      <input :value="value" ref='value'>
      <span class="svgs" @click="copy">
        <svg class="icon icon-14 info" aria-hidden="true">
          <use xlink:href="#icon-a_9"></use>
        </svg>
        <svg class="icon icon-14 active" aria-hidden="true">
          <use xlink:href="#icon-a_9_1"></use>
        </svg>
      </span>
    </span>
    <span class="even-tolanIcon" v-if="hover">
      <svg class="icon icon-14" aria-hidden="true">
        <use xlink:href="#icon-a_15" />
      </svg>
      <!-- 线下转账时填入该文案作为备注，可以方便工作人员更快确认您的充值 -->
      <div class="iconMark a-4-bg b-1-cl">线下转账时填入该文案作为备注，可以方便工作人员更快确认您的充值</div>
    </span>
  </section>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/assets/b2cRecrgeEven/b2cRecrgeEven';
import 'BlockChain-ui/PC/common-mixin/assets/b2cRecrgeEven/b2cRecrgeEven.styl';

export default {
  mixins: [mixin],
};
</script>
