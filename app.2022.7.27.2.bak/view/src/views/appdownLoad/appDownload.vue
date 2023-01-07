<template>
  <section class="app-download">
    <div class="main">
      <div class="intro">
        <!-- <p class="intro-title fuz-gap">{{ $t("appDownLoad.title") }}</p> -->
        <p class="fuz-title fuz-gap">Get the mobile app</p>
        <p class="fuz-content">Multi-Platform Terminal Trading At Anytime and Anywhere</p>
        <!-- <p class="intro-desc">{{ $t("appDownLoad.desc") }}</p> -->
        <div class="download">
          <div class="dl-link">
            <p class="dl-desc fuz-content-small">Download the mobile app</p>
            <div class="dl-btn">
              <div class="fuz-row dl-btn-item">
                <fuz-button animation width="150" ghost class="mod-btn"
                  v-if="appDownload.android_googleplay_url"
                  @click="download('android_googleplay_url')">
                  <span class="icon icon-google-play" slot="icon" style="font-size: 25px"></span>
                  <span class='fuz-text-small'>Google Play</span>
                </fuz-button>
                <fuz-button animation width="150" ghost class="mod-btn"
                  v-if="appDownload.ios_appstore_url"
                  @click="download('ios_appstore_url')">
                  <span class="icon icon-apple" slot="icon" style="font-size: 25px"></span>
                  <span class='fuz-text-small'>AppStore</span>
                </fuz-button>
              </div>
              <div class="fuz-row dl-btn-item">
                <fuz-button animation width="150" ghost class="mod-btn"
                  v-if="appDownload.android_download_url"
                  @click="download('android')">
                  <span class="icon icon-android" slot="icon" style="font-size: 25px"></span>
                  <span class='fuz-text-small'>Android</span>
                </fuz-button>
              </div>
            </div>
          </div>
          <div class="dl-qrcode">
            <p class="fuz-content dl-qrcode-desc">Scan to download the app</p>
            <p class="fuz-content dl-qrcode-desc" style="font-weight: 700">on IOS and Andriod</p>
            <div class="dl-qrcode-img">
              <img
                :src="appDownload.app_page_url"
                alt="" width="100%"
                style="border-radius: 10.56px;">
            </div>
          </div>
        </div>
      </div>
      <div class="pic">
        <img src="@/assets/fuzionx/images/appDownload/iPhone.png" alt="">
      </div>
    </div>
    <div class="card">
      <ul class="card-list clearfix">
        <li v-for="(item, index) in navList"
          :key="index"
          class="fuz-card-plain card-list-item clearfix">
          <img :src="cardImg[index]" alt=""  class="card-list-item-img">
          <p class="fuz-title card-list-item-title">{{item.title}}</p>
          <p class="fuz-content card-list-item-desc">{{item.desc}}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/appDownload/appDownload';
// import 'BlockChain-ui/PC/common-mixin/appDownload/appDownload.styl';
import img1 from '@/assets/fuzionx/images/appDownload/flash.png';
import img2 from '@/assets/fuzionx/images/appDownload/transfer.png';
import img3 from '@/assets/fuzionx/images/appDownload/panel.png';
import img4 from '@/assets/fuzionx/images/appDownload/manage.png';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
  data() {
    return {
      cardImg: [img1, img2, img3, img4],
    };
  },
};
</script>

<style lang="stylus" scoped>

.app-download{
  *{
    box-sizeing: border-box;
  }
  max-width: 1280px;
  margin:0 auto;
  padding: 105px 0;
  color: #FFFFFF;
  .main{
    display: flex;
    padding: 0 15px;
    justify-content: space-between;
    .intro{
      padding-top:40px
      .intro-title{
        font-size: 24px;
        font-weight: 900;
      }
      .intro-desc{
        font-size: 16px;
        font-weight: 400;
      }
    }
    .download{
      width: 522px;
      margin: 70px 0 0 ;
      display: flex;
      justify-content: space-between;
      .dl-desc{
        font-weight: 700;
        font-size: 14px;
        line-height: 24px;
        color: #7D7D7D;
      }
      .dl-btn{
        width: 322.5px
        height: 162px
        .dl-btn-item{
          margin: 20px 0;
          gap:20px;
        }
        .mod-btn{
          font-size: 12px;
          color: #FFFFFF;
          font-weight: 600
        }
      }
      .dl-qrcode{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 72px;
        .dl-qrcode-desc{
          text-align:center
          width:150px;
          font-size: 10px !important;
          margin-bottom: 6px
        }
        .dl-qrcode-img{
          margin-top: 15px;
          width: 110px;
          height: 110px;
          border: 2.64px solid #452dbf;
          border-radius: 8px;
        }
      }
    }
  }
  .card{
    margin-top: 60px;
    padding: 0 15px;
    .card-list{
      display: flex;
      justify-content: space-between;
      .card-list-item{
        width: 305px;
        height: 344px;
        padding: 20px;
        margin-right: 20px;
        .card-list-item-img{
          width: 75px;
          height: 75px;
          border-radius: 8px;
          margin-bottom: 50px
        }
        .card-list-item-title{
          font-size: 20px;
          font-weight: 700;
          line-height: 140%;
          margin-bottom: 10px;
        }
        .card-list-item-desc{
          font-weight: 400;
          font-size: 16px;
          line-height: 28px;
          color: #7D7D7D;
        }
      }
    }
  }
  .icon {
    font-weight: normal !important;
    line-height: 1 !important;
  }
}
</style>
