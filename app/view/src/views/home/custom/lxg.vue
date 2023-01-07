<template>
  <div class="home-custom-template">
    <div class="lxgHome-custom">
      <div class="products" :style="productImg">
          <div class="main-content">
              <div class="products-text">
                <h2>ChainUP Products And Services</h2>
                <h4>Providing secure and reliable digital asset trading and asset
                  <br /> management services to millions of users worldwide</h4>
                <ul>
                  <li class="item item1">
                    Globalization Layout
                  </li>
                  <li class="item item2">
                    Trading system
                  </li>
                  <li class="item item3">
                    Security system
                  </li>
                  <li class="item item4">
                    High scalability
                  </li>
                </ul>
              </div>
          </div>
      </div>
      <div class="lxgHome-custom-appdown">
        <div class="lxgHome-custom-appdown-box clearfix">
          <div class="lxgHome-custom-appdown-img">
            <img src="https://saas-oss.oss-accelerate.aliyuncs.com/upload/20200422234620649.png" alt="">
          </div>
          <div class="lxgHome-custom-appdown-op">
            <div class="lxgHome-custom-appdown-t1">
              TRADE <br />
              ANYTIME, ANYWHERE
            </div>
            <div class="lxgHome-custom-appdown-t2">
              Multiple Advantages, Best Trading Platform
            </div>
            <div class="lxgHome-custom-appdown-options clearfix">
              <a class="lxgHome-custom-appdown-imgUrl" href="/appDownload">
                <span class="down-btn down-btn-ios">ios 下载</span>
              </a>
              <a class="lxgHome-custom-appdown-imgUrl" href="/appDownload">
                <span class="down-btn down-btn-Android">Android 下载</span>
              </a>
              <div class="lxgHome-custom-appdown-em">
                <span class="small-ewm"></span>
                <div class="lxgHome-custom-appdown-emer">
                  <div class="lxgHome-custom-appdown-sp">
                    <img src="https://saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20200218183746568.png" alt="">
                  </div>
                  <div class="lxgHome-custom-appdown-mt">扫码下载</div>
                </div>
              </div>
            </div>
            <div class="lxgHome-ink-t">
              <a href="##">API Official document</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import commonMixin from 'BlockChain-ui/PC/common-mixin/home/home/home';
// import 'BlockChain-ui/PC/common-mixin/home/home/home.styl';
import mixin from 'BlockChain-ui/PC/common-mixin/home/custom/lxg/lxg';
import 'BlockChain-ui/PC/common-mixin/home/custom/lxg/lxg.styl';

export default {
  mixins: [mixin],
  created() {
    // this.init();
  },
};
</script>
