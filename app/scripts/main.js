/*
    js公共类库
*/
;(function (w) {

  function App() {}
  App.prototype = {
    init: function () {
      this.tab();
      this.input();
      this.shareLayer();//分享
      this.showNavigation();//二级导航
      this.navigationColor();//导航着色
      this.applyUseFooter(); //申请试用
      this.getUrl();//获得网址
      this.pcJump();//根据来源跳转手机网站
      this.isMobile();//检测是否来自手机端
    },
    getUrl:function(){
      $('.common_enter_url').val(window.location.href);
    },
    showNavigation:function(){
      $(".nav-item").hover(function () {
        $(this).children('.dropbox').show();
      }, function () {
        $(this).children('.dropbox').hide();
      });
    },
    navigationColor:function(){
      var oUrl = window.location.href,
          $nav = $('.nav-box  a.nav-fir');
      if(oUrl.indexOf('product')>-1){
       $nav.eq(1).addClass('current');
      }else if(oUrl.indexOf('service')>-1){
        $nav.eq(2).addClass('current');
      }else if(oUrl.indexOf('price')>-1){
        $nav.eq(3).addClass('current');
      }else if(oUrl.indexOf('about')>-1){
        $nav.eq(4).addClass('current');
      }else{
        $nav.eq(0).addClass('current');
      }
    },
    shareLayer:function(){
      var timeOut = null;
      $('.social-share').html('<div class="bdsharebuttonbox">\
          <a href="javascript:page.share(\'sina\')" class="iconfont icon-weibo"></a>\
          <a href="javascript:page.share(\'qzone\')" class="iconfont icon-qzone"></a>\
          <a href="javascript:page.share(\'qq\')" class="iconfont icon-qq"></a>\
          <a href="javascript:page.share(\'wx\')" class="iconfont icon-wechat"></a>\
      </div>');
      var str = '<div class="my-share-box" style="display:none">\
            <div class="share-tit">分享到：</div>\
            <a href="javascript:page.share(\'sina\')" class="iconfont icon-weibo" style="background:#e5493a"></a>\
            <a href="javascript:page.share(\'qzone\')" class="iconfont icon-qzone" style="background:#ffce00"></a>\
            <a href="javascript:page.share(\'qq\')" class="iconfont icon-qq1" style="background:#38a9e5"></a>\
            <a href="javascript:page.share(\'wx\')" class="iconfont icon-weixin" style="background:#23b33d"></a>\
        </div>';
      if($('.my-share-box').length==0){
        $('body').append(str);
        var $shareBox = $('.my-share-box');
        $('[data-sharebtn]').mouseenter(function(e){
          $shareBox.css({
            display:'block',
            position:'absolute',
            left:$(this).offset().left,
            top:$(this).offset().top+$(this).height()+5
          });
        }).mouseleave(function(){
          timeOut = setTimeout(function(){
            $shareBox.hide();
          },200)
        });
        $shareBox.mouseenter(function(){
          clearTimeout(timeOut);
          console.log(2)
        }).mouseleave(function(){
          $('[data-sharebtn]').trigger('mouseout');
          console.log(3)
        });
      }
    },
    isMobile: function(){
      var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
            "SymbianOS", "Windows Phone", "iPod"
        ];
        var flag = false;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = true;
                break;
            }
        }
        return flag;
    },
    pcJump: function(){
      var _self = this;
      var url = window.location.href;
      if (_self.isMobile()) {
          location.href = url.replace('www', 'm');
      }
    },
    share: function (cmd) {
      var params = {
        title: document.title,
        url: location.href,
      }
      switch (cmd) {
        case 'sina':
          window.open('http://service.weibo.com/share/share.php?title=' + params.title + '&url=' + params.url + '&searchPic=true');
          break;
        case 'qzone':
          window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title=' + params.title + '&url=' + params.url + '&searchPic=true');
          break;
        case 'qq':
          window.open('http://connect.qq.com/widget/shareqq/index.html?title=' + params.title + '&url=' + params.url + '&searchPic=true');
          break;
        case 'wx':
          var oDiv = $('<div>');
          oDiv.append('<div>分享到微信朋友圈</div>');
          oDiv.append('<div style="height:230px;"><img src="http://qr.liantu.com/api.php?text=' + params.url + '" alt="' + params.url + '" style="width:100%" /></div>');
          oDiv.append('<div>打开微信，点击底部的“发现”，<br>使用“扫一扫”即可将网页分享至朋友圈。</div>');
          oDiv.append('<div style="position:absolute;right:10px;top:10px;font-size:16px;color:#666;cursor:pointer;font-family: unset;" onclick="$(this).parent().remove()">X</div>');
          oDiv.css({
            width: 230,
            position: 'fixed',
            zIndex: 9999,
            left: '50%',
            top: '50%',
            margin: '-150px 0 0 -115px',
            background: '#fff',
            textAlign: 'center',
            padding: 10,
            border: 'solid 1px #ddd',
            fontSize: 12,
            color: '#666'
          });
          $('body').append(oDiv);
          break;
      }
    },
    urlParams: function () {
      var query = window.location.search.substring(1);
      var param = {};
      if (query) {
        $.each(query.split('&'), function (i, d) {
          var o = d.split('=');
          param[o[0]] = o[1];
        });
      }
      return param;
    },
    tab: function () {
      $('.tab-tit').on('click', 'span', function () {
        var $this = $(this),
          n = $this.index();
        $this.addClass('active').siblings().removeClass('active');
        $this.parents('.tab-tit').siblings('.tab-layer').children('div').eq(n).siblings().hide().end().show();
        $(window).scroll()
      });
    },
    input: function () {
      var $body = $('body'),
      input = document.createElement('input');
      $body.on('focus', 'input[type=text]', function () {
        var $this = $(this);
        if ($this.val() === $this.attr('placeholder')) {
          $(this).val('');
        }
        if($this.hasClass('_password_')){
          this.type = 'password';
        }
      });
      $body.on('blur', 'input[type=text],input[type=password]', function () {
        var $this = $(this);
        if (!("placeholder" in input)) {
          if ($this.val() === '') {
            $this.val($this.attr('placeholder'));
          }
          if($this.hasClass('_password_')){
            if($this.val() === $this.attr('placeholder')){
              this.type = 'text';
            }
          }
        }
      });
      if (!("placeholder" in input)) {
        $('input[placeholder]').each(function(){
          var _type = $(this).attr('type');
          $(this).val($(this).attr('placeholder'))
          if(_type == 'password'){
            this.type = 'text';
            $(this).addClass('_password_');
          }
        })
      }
    },
    scrollFire: function (obj) {
      // obj={
      //     dom:'',
      //     active:'',
      //     offset:'',
      //     fn:,
      // }
      var $w = $(window);
      var $doms = $(obj.dom);
      var tops = [];
      $doms.each(function (i, ob) {
        tops.push($(ob).offset().top);
      });
      function action() {
        var w_top = $w.scrollTop();
        var w_h = $w.height();
        $.each(tops, function (k, v) {
          var $dom = $doms.eq(k);
          if (v - obj.offset < w_top + w_h && $dom.height() + v + obj.offset > w_top) {
            $dom.addClass(obj.active);
            if (obj.fn) {
              obj.fn($dom)
            }
          }
        })
      }
      action();
      $w.scroll(action);
      $w.resize(action);
    },
    getIeVersion: function () {
      var browser = navigator.appName;
      if (browser != 'Microsoft Internet Explorer') {
        return false;
      }
      var b_version = navigator.appVersion;
      var version = b_version.split(';');
      var trim_Version = version[1].replace(/[ ]/g, '');
      if (browser == 'Microsoft Internet Explorer' && trim_Version == 'MSIE6.0') {
        return 6;
      } else if (browser == 'Microsoft Internet Explorer' && trim_Version == 'MSIE7.0') {
        return 7;
      } else if (browser == 'Microsoft Internet Explorer' && trim_Version == 'MSIE8.0') {
        return 8;
      } else if (browser == 'Microsoft Internet Explorer' && trim_Version == 'MSIE9.0') {
        return 9;
      }
    },
    // iframe 弹层预约
    form: function (title, query,options) {
      var option = {
        type : 0,
        msg : '像定制礼服一样设计定制您家',
        img : 'alert1_03.png',
        inputs : 2,
        title : '预约设计师'
      }
      options = $.extend(option,options)
      if (query) {
        if (query.substring(0, 1) != '&') {
          query = '&' + query;
        }
      } else {
        query = '';
      }
      if(!options.type){
        layer.open({
          type: 2,
          title: false,
          // shadeClose: true,
          // shade: false,
          area: ['380px', '300px'],
          content: '/apply?title=' + title + query
        });
        return
      }
      layer.open({ //普通的预约表单
          type: 2,
          title: false,
          area: ['800px', '400px'],
          content: '/apply?options=' + encodeURI(JSON.stringify(options)) + query
      });
    },
    //只处理表单验证
    v: function (opt) {
      var id = opt.id ? opt.id : 'bottomBar';
      var $obj = $('#' + id),
        _self = this;
      $obj.submit(function (e) {
        e.preventDefault();
        var b = $(this).validate({
          isone: true,
          error: function (e, t) {
            e.addClass('input-error');
            e.one('focus', function () {
              $(this).removeClass('input-error');
            });
            var msg = e.attr('placeholder').replace('请输入', '') + t;
            if (_self.getIeVersion() === 8) {
              alert(msg)
            } else {
              layer.tips(msg, e, {
                tips: [1, '#e5493a']
              });
            }
          }
        });
        if (b) {
          opt.callback && opt.callback($obj, $obj.serializeArray());
        }
        return false;
      });
    },
    // 通用预约方法
    formSubmit: function (e, data, callback) {
      var _self = this;
      var method = e.attr('method');
      var dataType = e.attr('data-type');
      layer.load();
      $.ajax({
        url: e.eq(0).attr('action'),
        dataType: dataType || 'json',
        type: method || 'get',
        data: data,
        success: function (res) {
          var ieVersion = _self.getIeVersion()
          if (ieVersion != false && ieVersion <= 9) {
              $(e[0]).find('input').val(function (i,oldv) {
                return $(this).attr('placeholder')
              })
          }else{
              e[0].reset();
          }
          layer.closeAll('loading');
          var w = window.parent;
          if (top != self) {
            w.layer.closeAll();
            w.layer.msg(res.msg.replace('\\n',''));
          } else {
            if (_self.getIeVersion() === 8) {
              alert(res.msg)
            } else {
              layer.msg(res.msg.replace('\\n',''));
            }
          }
          callback && callback(res);
        },
        error: function () {
          layer.closeAll('loading');
          if (_self.getIeVersion() === 8) {
            alert('接口异常')
          } else {
            layer.msg('接口异常');
          }
        }
      })
    },
    //获取验证码用倒计时
    codeCountdown: function (obj) {
      var t = obj.innerHTML,
        n = 60;
      function fn() {
        if (n > 0) {
          obj.disabled = true;
          $(obj).addClass('disabled');
          obj.innerHTML = '倒计时' + (n--) + '秒';
          setTimeout(fn, 1000);
        } else {
          obj.disabled = false;
          obj.innerHTML = t;
          $(obj).removeClass('disabled');
        }
      }
      fn();
    },
    //活动倒计时
    countdown: function(opt) {
      //  1h = 3600 s
      //  1s = 1000 ms
      (function() {
          var t = null;
          var sTime = new Date(opt.date);
          var mydate = new Date();
          var T = Math.floor((sTime - mydate) / 1000);
          if (T <= 0) {
              clearTimeout(t);
              opt.obj.html(opt.txt).parents('.count').addClass('pass');
              return;
          }
          var D = Math.floor(T / (3600 * 24));
          var H = Math.floor((T - D * 24 * 3600) / 3600);
          var M = Math.floor((T / 60) - (D * 24 * 60 + H * 60));
          var S = T % 60;

          function setnum(d, t) {
              if (d === 0) {
                  return '';
              } else {
                  return d + t;
              }
          }

          var html = setnum(D, '天') + setnum(H, '小时') + setnum(M, '分') + S + '秒';
          opt.obj.html(html);
          t = setTimeout(function() {
              page.countdown(opt);
          }, 1000);
      })();
    },
    //首页底部申请
    applyUseFooter: function () {
      this.v({
        id: 'applyUse',
        callback: function (e, data) {
          // alert(JSON.stringify(data,null,2))
          page.formSubmit(e, data, function (res) {
            // layer.msg('申请成功')
          })
        }
      })
    }
  }

  w.Page = function (obj) {
    for (var i in obj) {
      App.prototype[i] = obj[i];
    }
    var app = new App();
    app.init();
    if ('onLoad' in app) {
      window.onload = function () {
        app.onLoad();
      };
    }
    if ('onReady' in app) {
      $(document).ready(function () {
        app.onReady();
      });
    }
    if ('onResize' in app) {
      var flag = null;
      $(window).on('resize', function () {
        if (flag)
          clearTimeout(flag);
        flag = setTimeout(function () {
          app.onResize()
        }, 120)
      })
    }
    if ('onScroll' in app) {
      $(window).on('scroll', function () {
        app.onScroll();
      });
    }
    return app;
  }
})(window);

/*!
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2015 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.9.7
 *
 */

(function ($, window, document, undefined) {
  var $window = $(window);
  $.fn.lazyload = function (options) {
    var elements = this;
    var $container;
    var settings = {
      threshold: 0,
      failure_limit: 0,
      event: 'scroll',
      effect: 'show',
      container: window,
      data_attribute: 'original',
      skip_invisible: true,
      appear: null,
      load: null
    };

    function update() {
      var counter = 0;
      elements.each(function () {
        var $this = $(this);
        if (settings.skip_invisible && !$this.is(':visible')) {
          return;
        }
        if ($.abovethetop(this, settings) || $.leftofbegin(this, settings)) {

          /* Nothing. */
        } else if (!$.belowthefold(this, settings) && !$.rightoffold(this, settings)) {
          $this.trigger('appear');
          /* if we found an image we'll load, reset the counter */
          counter = 0;
        } else {
          if (++counter > settings.failure_limit) {
            //return false;
          }
        }
      });

    }

    if (options) {
      /* Maintain BC for a couple of versions. */
      if (undefined !== options.failurelimit) {
        options.failure_limit = options.failurelimit;
        delete options.failurelimit;
      }
      if (undefined !== options.effectspeed) {
        options.effect_speed = options.effectspeed;
        delete options.effectspeed;
      }

      $.extend(settings, options);
    }

    /* Cache container as jQuery as object. */
    $container = (settings.container === undefined || settings.container === window) ?
      $window :
      $(settings.container);

    /* Fire one scroll event per scroll. Not one scroll event per image. */
    if (0 === settings.event.indexOf('scroll')) {
      $container.bind(settings.event, function (event) {
        return update();
      });
    }

    this.each(function () {
      var self = this;
      var $self = $(self);

      self.loaded = false;

      /* When appear is triggered load original image. */
      $self.one('appear', function () {
        if (!this.loaded) {
          if (settings.appear) {
            var elements_left = elements.length;
            settings.appear.call(self, elements_left, settings);
          }
          $('<img />').bind('load', function () {
            $self.hide().attr('src', $self.data(settings.data_attribute))[settings.effect](settings.effect_speed);
            self.loaded = true;

            /* Remove image from array so it is not looped next time. */
            var temp = $.grep(elements, function (element) {
              return !element.loaded;
            });
            elements = $(temp);

            if (settings.load) {
              var elements_left = elements.length;
              settings.load.call(self, this.width, this.height);
            }
          }).attr('src', $self.data(settings.data_attribute));
        }
      });

      /* When wanted event is triggered load original image */
      /* by triggering appear.                              */
      if (0 !== settings.event.indexOf('scroll')) {
        $self.bind(settings.event, function (event) {
          if (!self.loaded) {
            $self.trigger('appear');
          }
        });
      }
    });

    /* Check if something appears when window is resized. */
    $window.bind('resize', function (event) {
      update();
    });

    /* With IOS5 force loading images when navigating with back button. */
    /* Non optimal workaround. */
    if ((/iphone|ipod|ipad.*os 5/gi).test(navigator.appVersion)) {
      $window.bind('pageshow', function (event) {
        if (event.originalEvent && event.originalEvent.persisted) {
          elements.each(function () {
            $(this).trigger('appear');
          });
        }
      });
    }

    /* Force initial check if images should appear. */
    $(document).ready(function () {
      update();
    });

    return this;
  };

  /* Convenience methods in jQuery namespace.           */
  /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

  $.belowthefold = function (element, settings) {
    var fold;

    if (settings.container === undefined || settings.container === window) {
      fold = $window.height() + $window.scrollTop();
    } else {
      fold = $(settings.container).offset().top + $(settings.container).height();
    }

    return fold <= $(element).offset().top - settings.threshold;
  };

  $.rightoffold = function (element, settings) {
    var fold;

    if (settings.container === undefined || settings.container === window) {
      fold = $window.width() + $window.scrollLeft();
    } else {
      fold = $(settings.container).offset().left + $(settings.container).width();
    }

    return fold <= $(element).offset().left - settings.threshold;
  };

  $.abovethetop = function (element, settings) {
    var fold;

    if (settings.container === undefined || settings.container === window) {
      fold = $window.scrollTop();
    } else {
      fold = $(settings.container).offset().top;
    }

    return fold >= $(element).offset().top + settings.threshold + $(element).height();
  };

  $.leftofbegin = function (element, settings) {
    var fold;

    if (settings.container === undefined || settings.container === window) {
      fold = $window.scrollLeft();
    } else {
      fold = $(settings.container).offset().left;
    }

    return fold >= $(element).offset().left + settings.threshold + $(element).width();
  };

  $.inviewport = function (element, settings) {
    return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) && !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
  };

  /* Custom selectors for your convenience.   */
  /* Use as $("img:below-the-fold").something() or */
  /* $("img").filter(":below-the-fold").something() which is faster */

  $.extend($.expr[':'], {
    'below-the-fold': function (a) {
      return $.belowthefold(a, {
        threshold: 0
      });
    },
    'above-the-top': function (a) {
      return !$.belowthefold(a, {
        threshold: 0
      });
    },
    'right-of-screen': function (a) {
      return $.rightoffold(a, {
        threshold: 0
      });
    },
    'left-of-screen': function (a) {
      return !$.rightoffold(a, {
        threshold: 0
      });
    },
    'in-viewport': function (a) {
      return $.inviewport(a, {
        threshold: 0
      });
    },
    /* Maintain BC for couple of versions. */
    'above-the-fold': function (a) {
      return !$.belowthefold(a, {
        threshold: 0
      });
    },
    'right-of-fold': function (a) {
      return $.rightoffold(a, {
        threshold: 0
      });
    },
    'left-of-fold': function (a) {
      return !$.rightoffold(a, {
        threshold: 0
      });
    }
  });
})(jQuery, window, document);

//懒加载
var var_lazy = {
  // effect: 'fadeIn',
  threshold: 400,
  load: function (w1, h1) {

    var load_this = $(this),
      _this_parent_width,
      _this_parent_height,
      _this_width,
      _this_height;
    if (!load_this.is('img')) {
      load_this.css('background-image', 'url(' + $(this).attr('data-original') + ')');
      load_this.removeAttr('src');
    }
    load_this.addClass('load-over').parents('.lazy').addClass('load-over');
    if (load_this.hasClass('auto')) {
      _this_parent_width = load_this.parents('.lazy').width();
      _this_parent_height = load_this.parents('.lazy').height();
      _this_width = w1;
      _this_height = h1;
      //              console.log(_this_width+"}"+_this_height)
      if (_this_parent_width / _this_parent_height < _this_width / _this_height) {
        load_this.css({
          width: 'auto',
          height: '100%'
        });
        _this_width = _this_parent_height * w1 / h1;
        load_this.css({
          left: -(((_this_width - _this_parent_width) / 2) / _this_parent_width) * 100 + '%',
          top: 0
        });
      } else {
        load_this.css({
          width: '100%',
          height: 'auto'
        });
        _this_height = _this_parent_width * h1 / w1;
        load_this.css({
          top: -(((_this_height - _this_parent_height) / 2) / _this_parent_height) * 100 + '%',
          left: 0
        });
      }
    } else if (load_this.hasClass('auto_height')) {
      load_this.css({
        height: 'auto',
        width: 'auto'
      });
    } else if (load_this.hasClass('height_middle')) {
      _this_parent_height = load_this.parents('.lazy').height();
      _this_parent_width = load_this.parents('.lazy').width();
      _this_height = _this_parent_width * h1 / w1;
      load_this.css({
        top: -(((_this_height - _this_parent_height) / 2) / _this_parent_height) * 100 + '%',
        left: 0
      });
    } else if (load_this.hasClass('auto_inner')) {
      _this_parent_width = load_this.parents('.lazy').width();
      _this_parent_height = load_this.parents('.lazy').height();
      _this_width = w1;
      _this_height = h1;
      //              console.log(_this_width+"}"+_this_height)
      if (_this_parent_width / _this_parent_height > _this_width / _this_height) {
        load_this.css({
          width: 'auto',
          height: '100%'
        });
        _this_width = _this_parent_height * w1 / h1;
        load_this.css({
          left: -(((_this_width - _this_parent_width) / 2) / _this_parent_width) * 100 + '%',
          top: 0
        });
      } else {
        load_this.css({
          width: '100%',
          height: 'auto'
        });
        _this_height = _this_parent_width * h1 / w1;
        load_this.css({
          top: -(((_this_height - _this_parent_height) / 2) / _this_parent_height) * 100 + '%',
          left: 0
        });
      }
    }
  }
};
setTimeout(function () {
  $('.lazy_img').lazyload(var_lazy);
  // $(window).scroll();
}, 300);



// jquery分页器
(function ($, window, document, undefined) {
  //定义分页类
  function Paging(element, options) {
    this.element = element;
    //传入形参
    this.options = {
      pageNo: options.pageNo || 1,
      totalPage: options.totalPage,
      totalSize: options.totalSize,
      callback: options.callback
    };
    //根据形参初始化分页html和css代码
    this.init();
  }
  //对Paging的实例对象添加公共的属性和方法
  Paging.prototype = {
    constructor: Paging,
    init: function () {
      this.creatHtml();
      this.bindEvent();
    },
    creatHtml: function () {
      var me = this;
      var content = '';
      var current = me.options.pageNo;
      var total = me.options.totalPage;
      var totalNum = me.options.totalSize;
      //总页数大于6时候
      if (total > 6) {
        //当前页数小于5时显示省略号
        if (current < 5) {
          for (var i = 1; i < 6; i++) {
            if (current == i) {
              content += '<a class=\'current\'>' + i + '</a>';
            } else {
              content += '<a>' + i + '</a>';
            }
          }
          content += '. . .';
          content += '<a>' + total + '</a>';
        } else {
          //判断页码在末尾的时候
          if (current < total - 3) {
            for (var i = current - 2; i < current + 3; i++) {
              if (current == i) {
                content += '<a class=\'current\'>' + i + '</a>';
              } else {
                content += '<a>' + i + '</a>';
              }
            }
            content += '. . .';
            content += '<a>' + total + '</a>';
            //页码在中间部分时候
          } else {
            content += '<a>1</a>';
            content += '. . .';
            for (var i = total - 4; i < total + 1; i++) {
              if (current == i) {
                content += '<a class=\'current\'>' + i + '</a>';
              } else {
                content += '<a>' + i + '</a>';
              }
            }
          }
        }
        //页面总数小于6的时候
      } else {
        for (var i = 1; i < total + 1; i++) {
          if (current == i) {
            content += '<a class=\'current\'>' + i + '</a>';
          } else {
            content += '<a>' + i + '</a>';
          }
        }
      }
      content += '<a id="firstPage">首页</a><span class=\'preNext\'><a id=\'prePage\'>&lt;</a>';
      content += '<a id=\'nextPage\'>&gt;</a></span>';
      content += '<a id="lastPage">尾页</a>';
      // content += "<span class='totalPages'> 共<span>"+total+"</span>页 </span>";
      // content += "<span class='totalSize'> 共<span>"+totalNum+"</span>条记录 </span>";
      me.element.html(content);
    },
    //添加页面操作事件
    bindEvent: function () {
      var me = this;
      me.element.off('click', 'a');
      me.element.on('click', 'a', function () {
        var num = $(this).html();
        var id = $(this).attr('id');
        if (id == 'prePage') {
          if (me.options.pageNo == 1) {
            me.options.pageNo = 1;
          } else {
            me.options.pageNo = +me.options.pageNo - 1;
          }
        } else if (id == 'nextPage') {
          if (me.options.pageNo == me.options.totalPage) {
            me.options.pageNo = me.options.totalPage
          } else {
            me.options.pageNo = +me.options.pageNo + 1;
          }

        } else if (id == 'firstPage') {
          me.options.pageNo = 1;
        } else if (id == 'lastPage') {
          me.options.pageNo = me.options.totalPage;
        } else {
          me.options.pageNo = +num;
        }
        me.creatHtml();
        if (me.options.callback) {
          me.options.callback(me.options.pageNo);
        }
      });
    }
  };
  //通过jQuery对象初始化分页对象
  $.fn.paging = function (options) {
    return new Paging($(this), options);
  }

})(jQuery, window, document);
