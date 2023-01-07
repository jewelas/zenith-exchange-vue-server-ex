<template>
  <div class='social'>
    <img src="../../../assets/fuzionx/images/logo.png" />
    <div class="social-list">
      <div class="item" v-for="item in items" :key="item.name" @click='onClick(item)'>
        <img :src="item.img" alt="" />
      </div>
    </div>
    <div class="copyright" style="border-color: #293448 !important;">
      Copyright ©️ 2022 FuzionX a product of FuzionX Chain UAB Reg Number: 305865705
    </div>
  </div>
</template>
<script>
import facebook from '../../../assets/fuzionx/images/social-outline/facebook.png';
import github from '../../../assets/fuzionx/images/social-outline/github.png';
import instagram from '../../../assets/fuzionx/images/social-outline/instagram.png';
import linkedin from '../../../assets/fuzionx/images/social-outline/linkedin.png';
import telegram from '../../../assets/fuzionx/images/social-outline/telegram.png';
import twitter from '../../../assets/fuzionx/images/social-outline/twitter.png';
// import tiktok from '../../../assets/fuzionx/images/social-outline/tiktok.png';
// import medium from '../../../assets/fuzionx/images/social-outline/medium.png';
// import discord from '../../../assets/fuzionx/images/social-outline/discord.png';
// import youbute from '../../../assets/fuzionx/images/social-outline/youtube.png';

export default {
  data() {
    return {
      items: [
        { name: 'telegram', img: telegram, link: 'https://t.me/zenithchainenglish' },
        { name: 'facebook', img: facebook, link: 'https://www.facebook.com/groups/zenithchain' },
        { name: 'twitter', img: twitter, link: 'https://twitter.com/zenithchain_co' },
        { name: 'instagram', img: instagram, link: 'https://instagram.com/zenith_chain' },
        { name: 'linkedin', img: linkedin, link: 'https://www.linkedin.com/company/zenith-chain' },
        { name: 'github', img: github, link: 'https://github.com/Zenith-Chain' },
        // { name: 'discord', img: discord },
        // { name: 'medium', img: medium },
        // { name: 'tiktok', img: tiktok },
        // { name: 'youbute', img: youbute },
      ],
    };
  },
  methods: {
    onClick(item) {
      window.location.href = item.link;
    },
  },
};
</script>
<style lang="stylus" scoped>
.social img{
  width: 208px;
}
.copyright {
  line-height: 1.4;
}
.social-list {
  display:grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  flex-wrap: wrap;
  margin: 40px 0;
  width: 208px;
}
.item {
  display:flex;
  justify-content:center;
  cursor: pointer;
}
.item img{
  width: 23px;
}
</style>
