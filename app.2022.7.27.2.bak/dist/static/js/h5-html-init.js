window.previewSkin = null;
try {
  previewSkin = JSON.parse(window.name).skin;
} catch (e) {

}
(function (window, document) {
  if (window.location.href.indexOf('isapp=1') !== -1) {
    window.isApp = true
  } else {
    window.isApp = false
  }
  try {
    JSON.parse(localStorage.myStorage);
  } catch (e) {
    localStorage.clear();
    localStorage.myStorage = '{}';
  }
  var getCookie = function (name) {
    var arrd = null;
    var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    if (document.cookie.match(reg)) {
      arrd = document.cookie.match(reg);
      return unescape(arrd[2]);
    }
    return null;
  };
  var defLan = '';
  if (window.publicInfo) {
    defLan = window.publicInfo.lan.defLan;
  }
  var lan = getCookie('lan') || defLan || 'zh_CN';
  var className = window.location.href.match(/[a-z]+_[A-Z]+/)[0];
  //函数：获取尺寸

  var setLan = function setLan() {
    var body = document.querySelector('body');
    var bodyClass = body.className;
    if (className) {
      bodyClass = bodyClass + ' ' + className;
    }
    body.className = bodyClass;
    window.htmlInitLan = true;
  };
  if (lan) {
    setLan();
  }
})(window, document);
