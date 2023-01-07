<template>
  <Layout>
    <div id="app" class="b-2-cl" style="position: relative; min-height: 800px">
      <c-tip/>
      <c-securityAlert/>
      <Header v-if="!hideheade" />
      <div
        class="page-content"
        :class="{'page-content-chain' : hideheade || navigationType === '1'}"
        style="position: relative; min-height: 710px">
        <transition
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
          mode="out-in"
          duration="200"
        >
          <router-view />
        </transition>
      </div>
      <Footer :class="footerClass" v-if="!hideFooter"/>
    </div>
  </Layout>
</template>

<script>
import commonMixin from 'BlockChain-ui/PC/pages/pages';
import mixin from 'BlockChain-ui/PC/pages/co-home/co-home';
import 'BlockChain-ui/PC/pages/co-home/co-home.styl';
import Layout from '../../components/fuzionx/layout/Layout.vue';
import Header from '../../components/fuzionx/layout/Header.vue';
import Footer from '../../components/fuzionx/layout/Footer.vue';

export default {
  components: { Layout, Header, Footer },
  mixins: [commonMixin, mixin],
  mounted() {
    this.init();
  },
};
</script>
