<template>
  <div class="enterpriseCert v5-10-bg">
    <h2 class="enterpriseCert-title v5-5-cl">
      <svg class="icon icon-12" aria-hidden="true" @click="goBack">
        <use xlink:href="#icon-v5_36"></use>
      </svg>{{$t('enterpriseCert.title')}}
    </h2>
    <div class="enterpriseCert-process v5-9-bg">
      <ul class="process-list">
        <li
          class="process-item v5-9-bg"
          v-for="(item, index) in itemList"
          :key="index">
          <div class="process-line" :class="item.status === 1 ? 'v5-1-bg': 'v5-11-bg'"></div>
          <div class="num v5-5-cl" :class="item.status === 1 ? 'v5-1-bg': 'v5-6-bg'">
            {{index + 1}}
          </div>
          <span class="name v5-6-cl" :class="{ 'v5-5-cl': item.status === 1}">{{item.name}}</span>
        </li>
      </ul>
    </div>
    <component
      :is="temp"
      @setLoading="setLoading">
    </component>
    <div class="loading-comp">
      <c-loading
        v-show="loading"
        size="50"></c-loading>
    </div>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/enterpriseCert/index';
import 'BlockChain-ui/PC/common-mixin/enterpriseCert/index.styl';
import step1 from './components/step1.vue';
import step2 from './components/step2.vue';
import step3 from './components/step3.vue';
import step4 from './components/step4.vue';
import step5 from './components/step5.vue';

export default {
  mixins: [mixin],
  components: {
    step1,
    step2,
    step3,
    step4,
    step5,
  },
  mounted() {
    this.init();
  },
};
</script>
