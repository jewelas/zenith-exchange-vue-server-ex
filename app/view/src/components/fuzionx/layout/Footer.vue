<template>
  <div id="footer-box" class="footer-box">
    <section>
      <div class="footer-bar footer-default">
        <div class="footer-menu clearfix">
          <div class="footer-logo">
            <SocialList />
          </div>
          <div class="footer-template" style="width: 1000px">
            <ul class="menu-ul-column" v-for='group in menus' :key='group.name'>
                <li class='name'>{{group.name}}</li>
                <li class='item' v-for='m in group.children' :key='m.name'>
                  <span  @click='showOther(m)'>{{m.name}}</span>
                </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/modules/footer/footer';
import 'BlockChain-ui/PC/common-mixin/modules/footer/footer.styl';
import SocialList from './Social.vue';

export default {
  components: { SocialList },
  mixins: [mixin],
  created() {
    this.getData();
  },
  data() {
    return {
      menus: [
        {
          name: 'About us',
          children: [
            { name: 'About', link: '/about' },
            { name: 'User Agreement', link: '/userAgreement' },
            { name: 'Privacy Policy', link: '/userAgreement#policy' },
            { name: 'Announcements', link: 'https://support.fuzionx.io/hc/en-us/sections/5610537836573-ANNOUNCEMENTS' },
            { name: 'Risk Disclosure', link: '/riskDisclosure' },
          ],
        },
        {
          name: 'Ecosystem',
          children: [
            { name: 'FuzionX launchpad', link: '/launchpad' },
            { name: 'Margin trading', link: '/margin/BTC_USDT' },
            { name: 'Features - (coming soon)', link: '' },
            { name: 'FuzionX Zone - (coming soon)', link: '' },
            { name: 'FuzionX venture - (coming soon)', link: '' },
            { name: 'FuzionX staking', link: '/freeStaking' },
            { name: 'FuzionX star - (coming soon)', link: '' },
            { name: 'FuzionX pay - (coming soon)', link: '' },
            { name: 'FuzionX dex', link: 'https://defi.fuzionx.io/' },
            { name: 'Zenith Scan', link: 'https://scan.zenithchain.co/ ' },
            { name: 'FuzionX explorer', link: 'https://scan.zenithchain.co/ ' },
            { name: 'NFT Marketplace - (coming soon)', link: '' },
          ],
        },
        {
          name: 'Services',
          children: [
            { name: 'App Download', link: '/appDownload' },
            { name: 'Fees structure', link: 'https://support.fuzionx.io/hc/en-us/articles/6170402755357' },
            { name: 'Referral - (coming soon)', link: '' },
            { name: 'Listing Application', link: 'https://forms.monday.com/forms/1386970047fd63184a46d7375769db79?r=use1' },
            { name: 'P2P Merchant application', link: '' },
          ],
        },
        {
          name: 'Support',
          children: [
            { name: 'Institutional Services', link: 'https://zenithchainuabhelp.zendesk.com/hc/en-us/requests/new' },
            { name: 'API Document', link: 'https://zenith-chain.github.io/fuzionx-api-documentation/#initiate-a-request' },
            { name: 'Help Center', link: 'https://support.fuzionx.io/' },
            { name: 'Let’s Collaborate', link: 'https://support.fuzionx.io/hc/en-us/requests/new' },
            { name: 'Media Collaborate', link: 'https://support.fuzionx.io/hc/en-us/requests/new' },
            { name: 'Submit a Request', link: 'https://support.fuzionx.io/hc/en-us/requests/new' },
            { name: 'Complaints and Suggestions', link: 'https://support.fuzionx.io/hc/en-us/requests/new' },
            { name: 'Product Suggestion', link: 'https://support.fuzionx.io/hc/en-us/requests/new' },
          ],
        },
      ],
    };
  },
  methods: {
    showOther(item) {
      if (!item.link) {
        this.$router.push({ path: '/coming' });
      } else if (item.link.startsWith('http')) {
        window.location.href = item.link;
      } else {
        this.$router.push({ path: item.link });
      }
    },
  },
};
</script>
<style lang="stylus" scoped>
.footer-bar{
  width:1280px !important;
}
.footer-menu {
  width: 100% !important;
  display:flex;
}
.footer-box {
  border-top:1px solid #35363f !important;
  padding-top: 60px;
  padding-bottom: 80px;
}
.footer-logo {
  width:208px !important;
  padding-left:10px !important;
  float:none;
}
.footer-default{
  padding-top:0 !important;
}
.footer-template {
  display: flex;
  gap: 60px;
  white-space: nowrap;
  float:none;
  margin-left: 60px;
}
</style>
<style lang='stylus'>
.menu-ul-column, .menu-ul-default {
  .name {
    font-size: 16px !important;
    margin-bottom: 16px !important;
    color: #4056d8 !important;
    font-weight: bold;
  }
  .item{
    font-size: 16px !important;
    margin-bottom: 16px !important;
    color: rgba(255,255,255, 0.5) !important;
    cursor: pointer
  }
  .item:hover > * {
    color:#4056d8;
  }
}
</style>
