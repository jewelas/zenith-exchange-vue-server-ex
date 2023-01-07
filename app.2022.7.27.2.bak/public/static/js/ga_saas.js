var saas = {
	"tokeneco.co": "14",
	"rongbiexchange.com": "6",
	"zdcoin.app": "20",
	"stvip.pro": "9",
	"goko.com": "7",
	"momoex.com": "13",
	"ffex.pro": "17",
	"2c.ltd": "11",
	"bbkx.com": "10",
	"Auxsto.com": "18",
	"bitsg.com": "22",
	"hayekex.com": "15",
	"imoex.top": "16",
	"ukcoin.pro": "8",
	"abby.global": "5",
	"ucex.io": "12",
	"52btc.vip": "19",
	"newtonx.vip": "23",
	"yibit.com": "21",
	"bitwind.com": "2",
}
  var script = document.createElement('script');
  script.setAttribute('type','text/javascript');
  var domain = null;
  var id = 1;
  if (window.location.host.split('.')[2]) {
      //当获取到www时
      domain = window.location.host.split('.')[1] + '.' + window.location.host.split('.')[2];
  }else {
      domain = window.location.host
  }
  for( var key in saas ) {
      if( key === domain ) {
          id = saas[key]
      }
  }
  script.src = 'https://www.googletagmanager.com/gtag/js?id=UA-149942350-' + id;
  document.body.appendChild(script);