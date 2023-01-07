<template>
<!-- <div id="footer-box" class="footer-box" v-if="true">
  <section v-html="index"></section>
</div> -->
  <div id="footer-box" class="footer-box" v-if="footerTemplateReceived">
    <!-- 自定义 -->
    <template  v-if="footerTemplate && configFooterOpen === '1'">
      <div v-if="footerTemplate.indexOf('foot-min-top') !== -1">
        <section v-html="footerTemplate" v-if="footerTemplate"></section>
      </div>
      <div v-else class="footer-bar" >
        <div class="footer-menu clearfix">
          <div class="footer-logo">
            <img :src="logoUrl" alt="">
          </div>
          <!-- 自定义 -->
          <div
          class="footer-template"
          v-if="footerTemplate && configFooterOpen === '1'"
          v-html="footerTemplate"></div>
        </div>
      </div>
    </template>
    <section v-else-if="templateLayoutType === '2'">
    <div class="int-footer-bar">
        <div class="int-footer-left">
          <div class="int-footer-logo">
            <img :src="logoUrl" alt="">
          </div>
        </div>
        <div class="int-footer-template">
          <ul class="menu-ul-int">
            <li
              class="item"
              v-for="(item, index) in sideList"
              :key="index">
              <router-link :to="'/cms/' + item.fileName">
                <span class="z-2-cl hoverHide" >{{item.title}}</span>
                <span class="z-1-cl hoverShow" >{{item.title}}</span>
              </router-link>
            </li>
          </ul>
        </div>
        <br style="clear: both">
      </div>
      <!-- 底部区域 -->
      <div class="int-copy z-2-cl"
          style="border-color: #293448 !important;" v-if="footerTemplateReceived">
        Copyright © 2021 {{companyName}}. All rights reserved
      </div>
    </section>
    <!-- 默认 -->
    <section v-if="footerTemplateReceived
      && configFooterOpen !== '1'
       && templateLayoutType !=='2'">
      <!-- 内容区域 -->
      <div class="footer-bar footer-default">
          <div class="footer-menu clearfix">
            <div class="footer-logo">
              <img :src="logoUrl" alt="">
            </div>
            <div class="footer-template">
              <ul class="menu-ul-default">
                <li
                  class="item"
                  v-for="(item, index) in sideList"
                  :key="index">
                  <router-link :to="'/cms/' + item.fileName">
                    <span class="z-2-cl hoverHide" >{{item.title}}</span>
                    <span class="z-1-cl hoverShow" >{{item.title}}</span>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
      </div>
      <!-- 底部区域 -->
      <div class="copy z-2-cl"
          style="border-color: #293448 !important;" v-if="footerTemplateReceived">
        Copyright © 2021 {{companyName}}. All rights reserved
      </div>
    </section>

  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/modules/footer/footer';
import 'BlockChain-ui/PC/common-mixin/modules/footer/footer.styl';

export default {
  mixins: [mixin],
  created() {
    this.getData();
  },
};
</script>
