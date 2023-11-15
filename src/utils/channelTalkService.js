/** 채널 톡 유틸 함수
 *
 * @docs https://developers.channel.io/reference/web-channelio-kr
 */

class ChannelTalkService {
  constructor() {
    this.loadScript();
  }

  loadScript() {
    var w = window;
    if (w.ChannelIO) {
      return;
    }
    var ch = function () {
      ch.c(arguments);
    };
    ch.q = [];
    ch.c = function (args) {
      ch.q.push(args);
    };
    w.ChannelIO = ch;
    function l() {
      if (w.ChannelIOInitialized) {
        return;
      }
      w.ChannelIOInitialized = true;
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
      s.charset = 'UTF-8';
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
    }
    if (document.readyState === 'complete') {
      l();
    } else if (window.attachEvent) {
      window.attachEvent('onload', l);
    } else {
      window.addEventListener('DOMContentLoaded', l, false);
      window.addEventListener('load', l, false);
    }
  }

  boot(settings, callback) {
    window.ChannelIO?.('boot', settings, callback);
  }

  shutdown() {
    window.ChannelIO?.('shutdown');
  }

  /** click 이벤트의 핸들러 외부에서 openChat 메서드를 호출할 경우, 모바일 환경의 Safari 브라우저에서 제대로 동작하지 않을 수 있습니다. */
  openChat(chatId, message) {
    window.ChannelIO?.('openChat', chatId, message);
  }

  // updateUser(userInfo, callback) {
  //   window.ChannelIO('updateUser', userInfo, callback);
  // }

  hideChannelButton() {
    window.ChannelIO?.('hideChannelButton');
  }
}

export default ChannelTalkService;
