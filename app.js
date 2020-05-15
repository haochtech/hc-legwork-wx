function _defineProperty(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e;
}

App({
    onLaunch: function(e) {
        var t = wx.getStorageSync("logs") || [];
        t.unshift(Date.now()), wx.setStorageSync("logs", t);
    },
    getUrl: function(t) {
        var e = this.globalData.url;
        t.setData({
            url: e
        });
        var n = this;
        e || n.util.request({
            url: "entry/wxapp/Attachurl",
            success: function(e) {
                n.globalData.url = e.data, n.getUrl(t);
            }
        });
    },
    request: function(o) {
        var e;
        wx.request((_defineProperty(e = {
            url: "https://hl.zhycms.com/app/index.php?i=92&t=0&v=1.0&from=wxapp&c=entry&a=wxapp&do=Attachurl&&m=zh_cjpt&sign=22b14012f0fd2039ae4a3ececb7dbdef",
            data: o.data ? o.data : {},
            header: o.header ? o.header : {},
            method: o.method ? o.method : "GET"
        }, "header", {
            "content-type": "application/x-www-form-urlencoded"
        }), _defineProperty(e, "success", function(e) {
            if (e.data.errno) {
                if ("41009" == e.data.errno) return wx.setStorageSync("userInfo", ""), void util.getUserInfo(function() {
                    util.request(o);
                });
                if (o.fail && "function" == typeof o.fail) o.fail(e); else if (e.data.message) {
                    if (null != e.data.data && e.data.data.redirect) var t = e.data.data.redirect; else t = "";
                    app.util.message(e.data.message, t, "error");
                }
            } else if (o.success && "function" == typeof o.success && o.success(e), o.cachetime) {
                var n = {
                    data: e.data,
                    expire: timestamp + 1e3 * o.cachetime
                };
                wx.setStorageSync(cachekey, n);
            }
        }), _defineProperty(e, "fail", function(e) {
            wx.hideNavigationBarLoading(), wx.hideLoading();
            var t = require("md5.js")(url), n = wx.getStorageSync(t);
            if (n && n.data) return o.success && "function" == typeof o.success && o.success(n), 
            console.log("failreadcache:" + url), !0;
            o.fail && "function" == typeof o.fail && o.fail(e);
        }), _defineProperty(e, "complete", function(e) {
            o.complete && "function" == typeof o.complete && o.complete(e);
        }), e));
    },
    ifArrVal: function(n) {
        function e(e, t) {
            return n.apply(this, arguments);
        }
        return e.toString = function() {
            return n.toString();
        }, e;
    }(function(e, t) {
        for (var n = 0; n < e.length; n++) {
            if (e[n] instanceof Array) return ifArrVal(e[n].url, t);
            if (e[n].url == t) return e[n].active = !0, e;
        }
        return !1;
    }),
    repeat: function(e) {
        var n = {};
        return e.reduce(function(e, t) {
            return !n[t.url] && (n[t.url] = e.push(t)), e;
        }, []);
    },
    bottom_menu: function(e) {
        var t = this;
        console.log(t);
        var n = [ {
            img: "../img/qiang.png",
            sele_img: "../img/z_qiang.png",
            name: "任务大厅",
            color: "#999",
            active: !1,
            url: "/zh_cjpt/pages/index/index"
        }, {
            img: "../img/index.png",
            sele_img: "../img/z_index.png",
            name: "我的",
            color: "#999",
            active: !1,
            sele_color: "#89f7fe",
            url: "/zh_cjpt/pages/logs/logs"
        } ];
        console.log(this.route);
        var o = e, a = t.ifArrVal(n, o);
        return 0 != a && t.repeat(a);
    },
    g_t: function(n) {
        wx.getLocation({
            type: "wgs84",
            success: function(e) {
                console.log(e);
                var t = e.latitude + "," + e.longitude;
                location = t, n(t), console.log(t), wx.setStorageSync("loacation", t);
            },
            fail: function(e) {
                console.log(e), wx.hideLoading(), location = 1, wx.showModal({
                    title: "授权提示",
                    content: "您取消了位置授权，小程序将无法正常使用，如需再次授权，请在我的-授权管理中进行授权，再次进入小程序即可",
                    showCancel: !0,
                    cancelText: "取消",
                    cancelColor: "#333",
                    confirmText: "确定",
                    confirmColor: "#333",
                    success: function(e) {},
                    fail: function(e) {},
                    complete: function(e) {}
                });
            }
        });
    },
    onShow: function(e) {
        console.log("这是显示");
    },
    onHide: function(e) {
        console.log("这是小程序从前台进入后台"), this.globalData.sign_out = !0;
    },
    today_time: function(e) {
        var t = new Date(), n = t.getMonth() + 1, o = t.getDate();
        return 1 <= n && n <= 9 && (n = "0" + n), 0 <= o && o <= 9 && (o = "0" + o), t.getFullYear() + "-" + n + "-" + o;
    },
    today_month: function(e) {
        var t = new Date(), n = t.getMonth() + 1, o = t.getDate();
        return 1 <= n && n <= 9 && (n = "0" + n), 0 <= o && o <= 9 && (o = "0" + o), t.getFullYear() + "-" + n;
    },
    ormatDate: function(e) {
        var t = new Date(1e3 * e);
        return t.getFullYear() + "-" + n(t.getMonth() + 1, 2) + "-" + n(t.getDate(), 2) + " " + n(t.getHours(), 2) + ":" + n(t.getMinutes(), 2) + ":" + n(t.getSeconds(), 2);
        function n(e, t) {
            for (var n = "" + e, o = n.length, a = "", r = t; r-- > o; ) a += "0";
            return a + n;
        }
    },
    location: function(e, t, n, o) {
        var a = e * Math.PI / 180, r = t * Math.PI / 180, i = a - r, c = n * Math.PI / 180 - o * Math.PI / 180, u = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(i / 2), 2) + Math.cos(a) * Math.cos(r) * Math.pow(Math.sin(c / 2), 2)));
        return u *= 6378.137, u = (u = Math.round(u)).toFixed(2);
    },
    util: require("we7/resource/js/util.js"),
    siteInfo: require("siteinfo.js"),
    getUserInfo: function(t) {
        var n = this;
        wx.login({
            success: function(e) {
                console.log(e), n.util.request({
                    url: "entry/wxapp/Openid",
                    cachetime: "0",
                    data: {
                        code: e.code
                    },
                    success: function(e) {
                        console.log(e), t(e.data);
                    }
                });
            }
        });
    },
    getSystem: function(t) {
        this.util.request({
            url: "entry/wxapp/GetSystem",
            cachetime: "0",
            success: function(e) {
                console.log(e), t(e.data);
            }
        });
    },
    succ_t: function(e, t) {
        wx.showToast({
            title: e
        }), 0 == t && setTimeout(function() {
            wx.navigateBack({
                delta: 1
            });
        }, 1500);
    },
    succ_m: function(e, t) {
        wx.showModal({
            title: "温馨提示",
            content: e,
            success: function(e) {
                return !!e.confirm;
            }
        });
    },
    isTelCode: function(e) {
        var t = /^1[3|4|5|7|8|9][0-9]\d{4,8}$/;
        return t.test(e);
    },
    list: function(e) {},
    globalData: {
        userInfo: null,
        mid: 0,
        refresh: !1
    }
});