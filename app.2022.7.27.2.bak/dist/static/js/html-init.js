if (!String.prototype.padEnd) {
  String.prototype.padEnd = function padEnd(targetLength,padString) {
    targetLength = targetLength>>0; //floor if number or convert non-number to 0;
    padString = String((typeof padString !== 'undefined' ? padString: ''));
    if (this.length > targetLength) {
      return String(this);
    }
    else {
      targetLength = targetLength-this.length;
      if (targetLength > padString.length) {
        padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
      }
      return String(this) + padString.slice(0,targetLength);
    }
  };
}
window.previewSkin = null;
try {
  previewSkin = JSON.parse(window.name).skin;
} catch (e) {

}
(function (window, document) {
  try {
    JSON.parse(localStorage.myStorage);
  } catch (e) {
    localStorage.clear();
    localStorage.myStorage = '{}';
  }
  function xssCheck(str, reg) {
    return str ? str.replace(reg || /[&<">'](?:(amp|lt|quot|gt|#39|nbsp|#\d+);)?/g, function (a, b) {
      if (b) {
        return a;
      } else {
        return {
          '<': '&lt;',
          '&': '&amp;',
          '"': '&quot;',
          '>': '&gt;',
          "'": '&#39;',
        }[a]
      }
    }) : '';
  }

  var setCookie = function(name, value) {
    var exp = new Date();
    exp.setTime(exp.getTime() + 36500 * 24 * 60 * 60 * 1000);
    var domain = ".".concat(location.host.split('.')[1], ".").concat(location.host.split('.')[2]);

    if (location.host.split('.')[3]) {
      document.cookie = "".concat(name, "=").concat(escape(value), ";expires=").concat(exp.toGMTString(), ";path=").concat(escape('/'));
    } else if (location.host.split('.')[2]) {
      document.cookie = "".concat(name, "=").concat(escape(value), ";expires=").concat(exp.toGMTString(), ";domain=").concat(domain, ";path=").concat(escape('/'));
    } else if (!location.host.split('.')[2] && !location.host.split('.')[1]) {
      // 本地环境存储
      document.cookie = "".concat(name, "=").concat(escape(value), ";expires=").concat(exp.toGMTString(), ";path=").concat(escape('/'));
    } else {
      // 当线上读取不到www时
      document.cookie = "".concat(name, "=").concat(escape(value), ";expires=").concat(exp.toGMTString(), ";domain=.").concat(location.host, ";path=").concat(escape('/'));
    }
  };

  var getCookie = function (name) {
    var arrd = null;
    var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    if (document.cookie.match(reg)) {
      arrd = document.cookie.match(reg);
      return unescape(arrd[2]);
    }
    return null;
  };
  var lan = window.location.href.match(/[a-z]+_[A-Z]+/)[0];
  setCookie('lan', lan);
  //函数：获取尺寸
  function findDimensions() {
    var winWidth = 0;
    var winHeight = 0;
    //获取窗口宽度
    if (window.innerWidth) {
      winWidth = window.innerWidth;
    } else if ((document.body) && (document.body.clientWidth)) {
      winWidth = document.body.clientWidth;
    }

    //获取窗口高度
    if (window.innerHeight) {
      winHeight = window.innerHeight;
    } else if ((document.body) && (document.body.clientHeight)) {
      winHeight = document.body.clientHeight;
    }

    //通过深入Document内部对body进行检测，获取窗口大小
    if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
      winHeight = document.documentElement.clientHeight;
      winWidth = document.documentElement.clientWidth;
    }
    return {
      winHeight: winHeight,
      winWidth: winWidth
    }
  }

  var locales = {
    'zh_CN': '您当前的浏览器版本过低，可能导致网站不能正常访问！<br/><br/><br/>推荐下载最新版Google Chrome浏览器。',
    'en_US': 'Your current browser version is too low, which may result in the website not being accessed properly! <br/><br/><br/>Recommend to download the latest version of Google Chrome.\n',
    'ja_JP': '現在のブラウザのバージョンが低すぎるため、Webサイトが正しくアクセスされていない可能性があります。 <br/><br/><br/>最新バージョンのGoogle Chromeをダウンロードすることをお勧めします。',
    'ko_KR': '현재 브라우저 버전이 너무 낮아서 웹 사이트가 제대로 액세스되지 않을 수 있습니다! <br/><br/><br/>Chrome 최신 버전을 다운로드하는 것이 좋습니다.',
    'el_GR': '您當前的瀏覽器版本過低，可能導致網站不能正常訪問！<br/><br/><br/>推薦下載最新版Google Chrome瀏覽器。',
  };
  var browserTip = document.getElementById('browser-tip');
  var browserDesc = document.getElementById('browser-desc');
  var browserMp = document.getElementById('browser-mp');
  var winSize = findDimensions();
  var browser = navigator.userAgent.toLowerCase();
  // IE
  var IE_DEFAULT = 11.0;
  if (browser.match(/msie ([\d.]+)/) !== null && browserTip) {
    if (browser.indexOf('msie') > -1) {
      var isIE = parseInt(browser.match(/msie ([\d.]+)/)[1])
      if (isIE < IE_DEFAULT) {
        browserTip.style.display = 'block';
        browserMp.style.display = 'block';
        var avWidth = (winSize.winWidth - browserTip.offsetWidth) / 2;
        browserTip.style.left = avWidth + 'px';
        browserDesc.innerHTML = locales[lan];
      }
    }
  }
  // Chrome
  var CHROM_DEFAULT = 49;
  if (browser.indexOf('chrome') > -1 && browserTip) {
    var chrome = parseInt(browser.match(/chrome\/([\d.]+)/))
    if (chrome < CHROM_DEFAULT) {
      browserTip.style.display = 'block';
      browserMp.style.display = 'block';
      var avWidth = (winSize.winWidth - browserTip.offsetWidth) / 2;
      browserTip.style.left = avWidth + 'px';
      browserDesc.innerHTML = locales[lan];
    }
  }
  // Firefox
  var FIREFOX_DEFAULT = 61;
  if (browser.indexOf('firefox') > -1 && browserTip) {
    var Firefox = parseInt(browser.match(/firefox\/([\d.]+)/)[1])
    if (Firefox < FIREFOX_DEFAULT) {
      browserTip.style.display = 'block';
      browserMp.style.display = 'block';
      var avWidth = (winSize.winWidth - browserTip.offsetWidth) / 2;
      browserTip.style.left = avWidth + 'px';
      browserDesc.innerHTML = locales[lan];
    }
  }
  // Safari
  var SAFARI_DEFAULT = 11.1;
  if (browser.indexOf('safari') > -1 && browser.indexOf('chrome') < 0 && browserTip) {
    var Safari = parseInt(browser.match(/version\/([\d.]+)/)[1])
    if (Safari < SAFARI_DEFAULT) {
      browserTip.style.display = 'block';
      browserMp.style.display = 'block';
      var avWidth = (winSize.winWidth - browserTip.offsetWidth) / 2;
      browserTip.style.left = avWidth + 'px';
      browserDesc.innerHTML = locales[lan];
    }
  }
  var publicInfo = window.publicInfo;
  var setLan = function setLan() {
    var body = document.querySelector('html');
    var bodyClass = body.className;
    if (className) {
      bodyClass = bodyClass + " " + lan
    }else{
      bodyClass = lan;
    }
    body.className = bodyClass;
    window.htmlInitLan = true;
  };
  if (lan) {
    setLan();
  }
  var themeList = null;
  var theme = null;
  var createTheme = function createTheme(skinData) {
    var createStyle = function createStyle(theme) {
      if(!theme){
        return;
      }
      var colorList = theme.colorList;
      var style = "";
      var colorsMap = {};
      for (var i = 0, len = colorList.length; i < len; i++) {
        var li = colorList[i];
        var colors = li.rgba;
        for (var j = 0, jlen = colors.length; j < jlen; j++) {
          var color = xssCheck(colors[j]);
          colorsMap[li.type + '-' + (j + 1) + '-bg'] = 'rgba(' + color + ')';
          colorsMap[li.type + '-' + (j + 1) + '-bd'] = 'rgba(' + color + ')';
          colorsMap[li.type + '-' + (j + 1) + '-cl'] = 'rgba(' + color + ')';
          style += '.' + li.type + '-' + (j + 1) + '-' + 'bg{background-color:rgba(' + color + ') !important;}';
          style += '.' + li.type + '-' + (j + 1) + '-' + 'bd{border-color:rgba(' + color + ') !important;}';
          style += '.' + li.type + '-' + (j + 1) + '-' + 'cl{color:rgba(' + color + ') !important;}';
          style += '.' + li.type + '-' + (j + 1) + '-' + 'cl-h:hover{background-color:rgba(' + color + ') !important;}';
          style += '.' + li.type + '-' + (j + 1) + '-' + 'f-h:hover{color:rgba(' + color + ') !important;}';
        }
      }
      if (previewSkin) {
        window.previewColorsMap = colorsMap;
      } else {
        window.colorMap = colorsMap;
      }
      var imgList = theme.imgList;
      for (var key in imgList) {
        imgList[key] = xssCheck(imgList[key]);
        const result = /^(https|http)/.test(imgList[key])
        imgList[key] = result ? imgList[key] : theme.imgPath + imgList[key];
      }
      if (previewSkin) {
        window.previewImgMap = imgList;
      } else {
        window.imgMap = theme.imgList;
      }
      var iconUrl = xssCheck(theme.iconUrl);
      if (iconUrl) {
        var oldIconfont = document.querySelector('#iconfont');
        var head = document.querySelector('head');
        head.removeChild(oldIconfont);
        var iconfont = document.createElement('script');
        iconfont.src = iconUrl;
        head.appendChild(iconfont);
      }
      var styleEle = document.createElement('style');
      var head = document.querySelector('head');
      styleEle.innerHTML = style;
      head.appendChild(styleEle);
    };
    if (previewSkin) {
      createStyle(skinData);
      if(skinData.othersCss){
        createCss(skinData.othersCss)
      }
    } else {
      if (skinData) {
        themeList = skinData.listist;
        if (Object.prototype.toString.call(themeList) === '[object Array]') {
          for (var i = 0, len = themeList.length; i < len; i++) {
            if (themeList[i].skinId === defSkin) {
              theme = themeList[i];
            }
          }
          createStyle(theme);
          if(theme.othersCss){
            createCss(theme.othersCss)
          }
        }
      }
    }
  };
  var createCss = function createCss(url) {
    var cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.type = 'text/css';
    cssLink.href = url;
    var headDom = document.getElementsByTagName('head')[0]
    headDom.appendChild(cssLink);
  }
  if (previewSkin) {
    createTheme(previewSkin);

    if (previewSkin.othersCss) {
      createCss(previewSkin.othersCss)
    }
  } else {
    if (publicInfo) {
      var skin = publicInfo.skin || {};
      var className = lan;
      var defSkin = skin.default || '1';
      var cusSkin = getCookie('cusSkin');
      if (cusSkin) {
        defSkin = cusSkin;
      }
      createTheme(skin);
    }
  }

})(window, document);
