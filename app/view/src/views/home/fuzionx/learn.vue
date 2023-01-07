<template>
  <div class="fuz-section">
      <div class='fuz-title'>Learn about <i>Cryptocurrency</i></div>
      <div class='fuz-title fuz-gap'><i>and crypto</i></div>
      <FlyCoin class='fly-coin' />
      <div class='list'>
        <div class='list-item fuz-split' v-for='item in items' :key='item.title'>
          <div class='img fuz-link' @click='toView'>
            <img :src="item.thumbnail" alt="" class='img'>
          </div>
          <div class='title'>{{item.title}}</div>
          <div class='date'>{{item.pubDate}}</div>
          <div class='content'>{{item.desc}}</div>
          <div class='link  fuz-link' @click='toView'>Learn more -></div>
        </div>
      </div>
      <div class='fuz-center' @click='toView'>
        <fuz-button animation width='260'>View All</fuz-button>
      </div>
  </div>
</template>
<script>
import FlyCoin from './flyCoin.vue';
/* eslint-disable */
var JSONP = (function(win, doc) {
  var counter = Date.now();
  return function (url, callback) {
    if (url.indexOf('?') === -1) {
      url += '?';
    } else {
      url += '&';
    }

    var name = '_jsonp' + counter++;
    var script = doc.createElement('script');
    script.src = url + 'callback=' + name;
    win[name] = function(data) {
      callback.call(win, data);
      doc.body.removeChild(script);
      script = null;
      delete window[name];
    }
    doc.body.appendChild(script);
  }
})(window, document);
/* eslint-disable */


export default {
  components: { FlyCoin },
  data() {
    return {
      items: [],
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      JSONP('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@zenithchain&callback=showFeed', (resp) => {
        this.items= resp.items.map((item) => {
          const v = document.createElement('div');
          v.innerHTML = item.content;
          item.desc = v.innerText.substring(0, 150) + '...';
          return item;
        }).slice(0, 4);
      });
    },
    toView() {
      window.location.href = 'https://defi.fuzionx.io/learn';
    },
  },
};
</script>
<style lang="stylus" scoped>

.fuz-section
  position relative

.fuz-title
  text-align center

.fly-coin
  position absolute
  top: -25px
  right: 425px;

.list
  display grid
  grid-template-columns repeat(4, 1fr)
  margin-top: 50px

.list-item
  position relative
  height: 432px
  margin-bottom 50px
  line-height 1.5
  padding 0 20px

.list-item .title
  margin-top 16px
  margin-bottom 10px
  line-height: 140%
  color: #4056d8
  font-weight bold

.list-item .date
  margin-bottom 10px
  line-height 140%
  color #ffffff80

.list-item .content
  color #fff

.list-item .link
  position absolute
  bottom 0%
  color: #4056d8
.img img
  width 100%
  border-radius 5px
</style>
