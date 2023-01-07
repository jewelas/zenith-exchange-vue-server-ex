<template>
  <div class="social-list">
    <a class="item" v-for="item in items" :key="item.name" :href="item.link" target="_blank">
      <img :src="item.img" alt="" />
    </a>
  </div>
</template>
<script>
import facebook from '@/assets/fuzionx/images/social/facebook.svg';
import instagram from '@/assets/fuzionx/images/social/instagram.svg';
import telegram from '@/assets/fuzionx/images/social/telegram.svg';
import twitter from '@/assets/fuzionx/images/social/twitter.svg';

export default {
  data() {
    return {
      items: [
        { name: 'telegram', img: telegram, link: 'https://t.me/zenithchainenglish' },
        { name: 'facebook', img: facebook, link: 'https://www.facebook.com/groups/zenithchain' },
        { name: 'twitter', img: twitter, link: 'https://twitter.com/zenithchain_co' },
        { name: 'instagram', img: instagram, link: 'https://instagram.com/zenith_chain' },
      ],
    };
  },
};
</script>
<style lang="stylus" scoped>
.social-list {
  display:grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 30px;
  position:fixed;
  left: 28px;
  top: 300px;
}
.item {
  display:flex;
  justify-content:center;
  cursor: pointer
}
.item img{
  width: 23px;
  cursor: pointer
}
</style>
