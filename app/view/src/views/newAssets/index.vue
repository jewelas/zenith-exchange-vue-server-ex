<template>
  <div class="fuz-page-content" :class="{'light-theme': userSkin === '2'}">
    <div class="v5-assets fuz-full" style="flex-direction:column">
      <!-- 资产导航 -->
      <div v-if="showNav" class="nav-wrap fuz-nav">
          <c-navMenu
            class='fuz-menu'
            :width="190"
            :lineHidth1="lineHidth1"
            :subLineHidth = "subLineHidth"
            :navList="navList"
            :navListActive="navListActive"
            @listChange="listChanges"
          />
      </div>
      <div class="assets-view">
        <router-view></router-view>
      </div>
    </div>
  </div>

</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/newAssets/index/index';
import 'BlockChain-ui/PC/common-mixin/newAssets/index/index.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
