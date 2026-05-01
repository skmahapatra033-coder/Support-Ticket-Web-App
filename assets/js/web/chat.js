/*! For license information please see chat.js.LICENSE.txt */
(() => {
    var t = {
            3177: (t, e, n) => {
                "use strict";

                function r(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function i(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var r = e[n];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                    }
                }

                function o(t, e, n) {
                    return e && i(t.prototype, e), n && i(t, n), Object.defineProperty(t, "prototype", {
                        writable: !1
                    }), t
                }

                function s() {
                    return s = Object.assign || function(t) {
                        for (var e = 1; e < arguments.length; e++) {
                            var n = arguments[e];
                            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
                        }
                        return t
                    }, s.apply(this, arguments)
                }

                function a(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            writable: !0,
                            configurable: !0
                        }
                    }), Object.defineProperty(t, "prototype", {
                        writable: !1
                    }), e && u(t, e)
                }

                function c(t) {
                    return c = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
                        return t.__proto__ || Object.getPrototypeOf(t)
                    }, c(t)
                }

                function u(t, e) {
                    return u = Object.setPrototypeOf || function(t, e) {
                        return t.__proto__ = e, t
                    }, u(t, e)
                }

                function h(t, e) {
                    if (e && ("object" == typeof e || "function" == typeof e)) return e;
                    if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
                    return function(t) {
                        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return t
                    }(t)
                }

                function f(t) {
                    var e = function() {
                        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                        if (Reflect.construct.sham) return !1;
                        if ("function" == typeof Proxy) return !0;
                        try {
                            return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
                        } catch (t) {
                            return !1
                        }
                    }();
                    return function() {
                        var n, r = c(t);
                        if (e) {
                            var i = c(this).constructor;
                            n = Reflect.construct(r, arguments, i)
                        } else n = r.apply(this, arguments);
                        return h(this, n)
                    }
                }
                n.r(e);
                var l = function() {
                        function t() {
                            r(this, t)
                        }
                        return o(t, [{
                            key: "listenForWhisper",
                            value: function(t, e) {
                                return this.listen(".client-" + t, e)
                            }
                        }, {
                            key: "notification",
                            value: function(t) {
                                return this.listen(".Illuminate\\Notifications\\Events\\BroadcastNotificationCreated", t)
                            }
                        }, {
                            key: "stopListeningForWhisper",
                            value: function(t, e) {
                                return this.stopListening(".client-" + t, e)
                            }
                        }]), t
                    }(),
                    p = function() {
                        function t(e) {
                            r(this, t), this.setNamespace(e)
                        }
                        return o(t, [{
                            key: "format",
                            value: function(t) {
                                return "." === t.charAt(0) || "\\" === t.charAt(0) ? t.substr(1) : (this.namespace && (t = this.namespace + "." + t), t.replace(/\./g, "\\"))
                            }
                        }, {
                            key: "setNamespace",
                            value: function(t) {
                                this.namespace = t
                            }
                        }]), t
                    }(),
                    d = function(t) {
                        a(n, t);
                        var e = f(n);

                        function n(t, i, o) {
                            var s;
                            return r(this, n), (s = e.call(this)).name = i, s.pusher = t, s.options = o, s.eventFormatter = new p(s.options.namespace), s.subscribe(), s
                        }
                        return o(n, [{
                            key: "subscribe",
                            value: function() {
                                this.subscription = this.pusher.subscribe(this.name)
                            }
                        }, {
                            key: "unsubscribe",
                            value: function() {
                                this.pusher.unsubscribe(this.name)
                            }
                        }, {
                            key: "listen",
                            value: function(t, e) {
                                return this.on(this.eventFormatter.format(t), e), this
                            }
                        }, {
                            key: "listenToAll",
                            value: function(t) {
                                var e = this;
                                return this.subscription.bind_global((function(n, r) {
                                    if (!n.startsWith("pusher:")) {
                                        var i = e.options.namespace.replace(/\./g, "\\"),
                                            o = n.startsWith(i) ? n.substring(i.length + 1) : "." + n;
                                        t(o, r)
                                    }
                                })), this
                            }
                        }, {
                            key: "stopListening",
                            value: function(t, e) {
                                return e ? this.subscription.unbind(this.eventFormatter.format(t), e) : this.subscription.unbind(this.eventFormatter.format(t)), this
                            }
                        }, {
                            key: "stopListeningToAll",
                            value: function(t) {
                                return t ? this.subscription.unbind_global(t) : this.subscription.unbind_global(), this
                            }
                        }, {
                            key: "subscribed",
                            value: function(t) {
                                return this.on("pusher:subscription_succeeded", (function() {
                                    t()
                                })), this
                            }
                        }, {
                            key: "error",
                            value: function(t) {
                                return this.on("pusher:subscription_error", (function(e) {
                                    t(e)
                                })), this
                            }
                        }, {
                            key: "on",
                            value: function(t, e) {
                                return this.subscription.bind(t, e), this
                            }
                        }]), n
                    }(l),
                    g = function(t) {
                        a(n, t);
                        var e = f(n);

                        function n() {
                            return r(this, n), e.apply(this, arguments)
                        }
                        return o(n, [{
                            key: "whisper",
                            value: function(t, e) {
                                return this.pusher.channels.channels[this.name].trigger("client-".concat(t), e), this
                            }
                        }]), n
                    }(d),
                    y = function(t) {
                        a(n, t);
                        var e = f(n);

                        function n() {
                            return r(this, n), e.apply(this, arguments)
                        }
                        return o(n, [{
                            key: "whisper",
                            value: function(t, e) {
                                return this.pusher.channels.channels[this.name].trigger("client-".concat(t), e), this
                            }
                        }]), n
                    }(d),
                    m = function(t) {
                        a(n, t);
                        var e = f(n);

                        function n() {
                            return r(this, n), e.apply(this, arguments)
                        }
                        return o(n, [{
                            key: "here",
                            value: function(t) {
                                return this.on("pusher:subscription_succeeded", (function(e) {
                                    t(Object.keys(e.members).map((function(t) {
                                        return e.members[t]
                                    })))
                                })), this
                            }
                        }, {
                            key: "joining",
                            value: function(t) {
                                return this.on("pusher:member_added", (function(e) {
                                    t(e.info)
                                })), this
                            }
                        }, {
                            key: "leaving",
                            value: function(t) {
                                return this.on("pusher:member_removed", (function(e) {
                                    t(e.info)
                                })), this
                            }
                        }, {
                            key: "whisper",
                            value: function(t, e) {
                                return this.pusher.channels.channels[this.name].trigger("client-".concat(t), e), this
                            }
                        }]), n
                    }(d),
                    b = function(t) {
                        a(n, t);
                        var e = f(n);

                        function n(t, i, o) {
                            var s;
                            return r(this, n), (s = e.call(this)).events = {}, s.listeners = {}, s.name = i, s.socket = t, s.options = o, s.eventFormatter = new p(s.options.namespace), s.subscribe(), s
                        }
                        return o(n, [{
                            key: "subscribe",
                            value: function() {
                                this.socket.emit("subscribe", {
                                    channel: this.name,
                                    auth: this.options.auth || {}
                                })
                            }
                        }, {
                            key: "unsubscribe",
                            value: function() {
                                this.unbind(), this.socket.emit("unsubscribe", {
                                    channel: this.name,
                                    auth: this.options.auth || {}
                                })
                            }
                        }, {
                            key: "listen",
                            value: function(t, e) {
                                return this.on(this.eventFormatter.format(t), e), this
                            }
                        }, {
                            key: "stopListening",
                            value: function(t, e) {
                                return this.unbindEvent(this.eventFormatter.format(t), e), this
                            }
                        }, {
                            key: "subscribed",
                            value: function(t) {
                                return this.on("connect", (function(e) {
                                    t(e)
                                })), this
                            }
                        }, {
                            key: "error",
                            value: function(t) {
                                return this
                            }
                        }, {
                            key: "on",
                            value: function(t, e) {
                                var n = this;
                                return this.listeners[t] = this.listeners[t] || [], this.events[t] || (this.events[t] = function(e, r) {
                                    n.name === e && n.listeners[t] && n.listeners[t].forEach((function(t) {
                                        return t(r)
                                    }))
                                }, this.socket.on(t, this.events[t])), this.listeners[t].push(e), this
                            }
                        }, {
                            key: "unbind",
                            value: function() {
                                var t = this;
                                Object.keys(this.events).forEach((function(e) {
                                    t.unbindEvent(e)
                                }))
                            }
                        }, {
                            key: "unbindEvent",
                            value: function(t, e) {
                                this.listeners[t] = this.listeners[t] || [], e && (this.listeners[t] = this.listeners[t].filter((function(t) {
                                    return t !== e
                                }))), e && 0 !== this.listeners[t].length || (this.events[t] && (this.socket.removeListener(t, this.events[t]), delete this.events[t]), delete this.listeners[t])
                            }
                        }]), n
                    }(l),
                    k = function(t) {
                        a(n, t);
                        var e = f(n);

                        function n() {
                            return r(this, n), e.apply(this, arguments)
                        }
                        return o(n, [{
                            key: "whisper",
                            value: function(t, e) {
                                return this.socket.emit("client event", {
                                    channel: this.name,
                                    event: "client-".concat(t),
                                    data: e
                                }), this
                            }
                        }]), n
                    }(b),
                    v = function(t) {
                        a(n, t);
                        var e = f(n);

                        function n() {
                            return r(this, n), e.apply(this, arguments)
                        }
                        return o(n, [{
                            key: "here",
                            value: function(t) {
                                return this.on("presence:subscribed", (function(e) {
                                    t(e.map((function(t) {
                                        return t.user_info
                                    })))
                                })), this
                            }
                        }, {
                            key: "joining",
                            value: function(t) {
                                return this.on("presence:joining", (function(e) {
                                    return t(e.user_info)
                                })), this
                            }
                        }, {
                            key: "leaving",
                            value: function(t) {
                                return this.on("presence:leaving", (function(e) {
                                    return t(e.user_info)
                                })), this
                            }
                        }]), n
                    }(k),
                    w = function(t) {
                        a(n, t);
                        var e = f(n);

                        function n() {
                            return r(this, n), e.apply(this, arguments)
                        }
                        return o(n, [{
                            key: "subscribe",
                            value: function() {}
                        }, {
                            key: "unsubscribe",
                            value: function() {}
                        }, {
                            key: "listen",
                            value: function(t, e) {
                                return this
                            }
                        }, {
                            key: "stopListening",
                            value: function(t, e) {
                                return this
                            }
                        }, {
                            key: "subscribed",
                            value: function(t) {
                                return this
                            }
                        }, {
                            key: "error",
                            value: function(t) {
                                return this
                            }
                        }, {
                            key: "on",
                            value: function(t, e) {
                                return this
                            }
                        }]), n
                    }(l),
                    _ = function(t) {
                        a(n, t);
                        var e = f(n);

                        function n() {
                            return r(this, n), e.apply(this, arguments)
                        }
                        return o(n, [{
                            key: "whisper",
                            value: function(t, e) {
                                return this
                            }
                        }]), n
                    }(w),
                    S = function(t) {
                        a(n, t);
                        var e = f(n);

                        function n() {
                            return r(this, n), e.apply(this, arguments)
                        }
                        return o(n, [{
                            key: "here",
                            value: function(t) {
                                return this
                            }
                        }, {
                            key: "joining",
                            value: function(t) {
                                return this
                            }
                        }, {
                            key: "leaving",
                            value: function(t) {
                                return this
                            }
                        }, {
                            key: "whisper",
                            value: function(t, e) {
                                return this
                            }
                        }]), n
                    }(w),
                    x = function() {
                        function t(e) {
                            r(this, t), this._defaultOptions = {
                                auth: {
                                    headers: {}
                                },
                                authEndpoint: "/broadcasting/auth",
                                broadcaster: "pusher",
                                csrfToken: null,
                                host: null,
                                key: null,
                                namespace: "App.Events"
                            }, this.setOptions(e), this.connect()
                        }
                        return o(t, [{
                            key: "setOptions",
                            value: function(t) {
                                return this.options = s(this._defaultOptions, t), this.csrfToken() && (this.options.auth.headers["X-CSRF-TOKEN"] = this.csrfToken()), t
                            }
                        }, {
                            key: "csrfToken",
                            value: function() {
                                var t;
                                return "undefined" != typeof window && window.Laravel && window.Laravel.csrfToken ? window.Laravel.csrfToken : this.options.csrfToken ? this.options.csrfToken : "undefined" != typeof document && "function" == typeof document.querySelector && (t = document.querySelector('meta[name="csrf-token"]')) ? t.getAttribute("content") : null
                            }
                        }]), t
                    }(),
                    C = function(t) {
                        a(n, t);
                        var e = f(n);

                        function n() {
                            var t;
                            return r(this, n), (t = e.apply(this, arguments)).channels = {}, t
                        }
                        return o(n, [{
                            key: "connect",
                            value: function() {
                                void 0 !== this.options.client ? this.pusher = this.options.client : this.pusher = new Pusher(this.options.key, this.options)
                            }
                        }, {
                            key: "listen",
                            value: function(t, e, n) {
                                return this.channel(t).listen(e, n)
                            }
                        }, {
                            key: "channel",
                            value: function(t) {
                                return this.channels[t] || (this.channels[t] = new d(this.pusher, t, this.options)), this.channels[t]
                            }
                        }, {
                            key: "privateChannel",
                            value: function(t) {
                                return this.channels["private-" + t] || (this.channels["private-" + t] = new g(this.pusher, "private-" + t, this.options)), this.channels["private-" + t]
                            }
                        }, {
                            key: "encryptedPrivateChannel",
                            value: function(t) {
                                return this.channels["private-encrypted-" + t] || (this.channels["private-encrypted-" + t] = new y(this.pusher, "private-encrypted-" + t, this.options)), this.channels["private-encrypted-" + t]
                            }
                        }, {
                            key: "presenceChannel",
                            value: function(t) {
                                return this.channels["presence-" + t] || (this.channels["presence-" + t] = new m(this.pusher, "presence-" + t, this.options)), this.channels["presence-" + t]
                            }
                        }, {
                            key: "leave",
                            value: function(t) {
                                var e = this;
                                [t, "private-" + t, "presence-" + t].forEach((function(t, n) {
                                    e.leaveChannel(t)
                                }))
                            }
                        }, {
                            key: "leaveChannel",
                            value: function(t) {
                                this.channels[t] && (this.channels[t].unsubscribe(), delete this.channels[t])
                            }
                        }, {
                            key: "socketId",
                            value: function() {
                                return this.pusher.connection.socket_id
                            }
                        }, {
                            key: "disconnect",
                            value: function() {
                                this.pusher.disconnect()
                            }
                        }]), n
                    }(x),
                    T = function(t) {
                        a(n, t);
                        var e = f(n);

                        function n() {
                            var t;
                            return r(this, n), (t = e.apply(this, arguments)).channels = {}, t
                        }
                        return o(n, [{
                            key: "connect",
                            value: function() {
                                var t = this,
                                    e = this.getSocketIO();
                                return this.socket = e(this.options.host, this.options), this.socket.on("reconnect", (function() {
                                    Object.values(t.channels).forEach((function(t) {
                                        t.subscribe()
                                    }))
                                })), this.socket
                            }
                        }, {
                            key: "getSocketIO",
                            value: function() {
                                if (void 0 !== this.options.client) return this.options.client;
                                if ("undefined" != typeof io) return io;
                                throw new Error("Socket.io client not found. Should be globally available or passed via options.client")
                            }
                        }, {
                            key: "listen",
                            value: function(t, e, n) {
                                return this.channel(t).listen(e, n)
                            }
                        }, {
                            key: "channel",
                            value: function(t) {
                                return this.channels[t] || (this.channels[t] = new b(this.socket, t, this.options)), this.channels[t]
                            }
                        }, {
                            key: "privateChannel",
                            value: function(t) {
                                return this.channels["private-" + t] || (this.channels["private-" + t] = new k(this.socket, "private-" + t, this.options)), this.channels["private-" + t]
                            }
                        }, {
                            key: "presenceChannel",
                            value: function(t) {
                                return this.channels["presence-" + t] || (this.channels["presence-" + t] = new v(this.socket, "presence-" + t, this.options)), this.channels["presence-" + t]
                            }
                        }, {
                            key: "leave",
                            value: function(t) {
                                var e = this;
                                [t, "private-" + t, "presence-" + t].forEach((function(t) {
                                    e.leaveChannel(t)
                                }))
                            }
                        }, {
                            key: "leaveChannel",
                            value: function(t) {
                                this.channels[t] && (this.channels[t].unsubscribe(), delete this.channels[t])
                            }
                        }, {
                            key: "socketId",
                            value: function() {
                                return this.socket.id
                            }
                        }, {
                            key: "disconnect",
                            value: function() {
                                this.socket.disconnect()
                            }
                        }]), n
                    }(x),
                    E = function(t) {
                        a(n, t);
                        var e = f(n);

                        function n() {
                            var t;
                            return r(this, n), (t = e.apply(this, arguments)).channels = {}, t
                        }
                        return o(n, [{
                            key: "connect",
                            value: function() {}
                        }, {
                            key: "listen",
                            value: function(t, e, n) {
                                return new w
                            }
                        }, {
                            key: "channel",
                            value: function(t) {
                                return new w
                            }
                        }, {
                            key: "privateChannel",
                            value: function(t) {
                                return new _
                            }
                        }, {
                            key: "presenceChannel",
                            value: function(t) {
                                return new S
                            }
                        }, {
                            key: "leave",
                            value: function(t) {}
                        }, {
                            key: "leaveChannel",
                            value: function(t) {}
                        }, {
                            key: "socketId",
                            value: function() {
                                return "fake-socket-id"
                            }
                        }, {
                            key: "disconnect",
                            value: function() {}
                        }]), n
                    }(x),
                    A = function() {
                        function t(e) {
                            r(this, t), this.options = e, this.connect(), this.options.withoutInterceptors || this.registerInterceptors()
                        }
                        return o(t, [{
                            key: "channel",
                            value: function(t) {
                                return this.connector.channel(t)
                            }
                        }, {
                            key: "connect",
                            value: function() {
                                "pusher" == this.options.broadcaster ? this.connector = new C(this.options) : "socket.io" == this.options.broadcaster ? this.connector = new T(this.options) : "null" == this.options.broadcaster ? this.connector = new E(this.options) : "function" == typeof this.options.broadcaster && (this.connector = new this.options.broadcaster(this.options))
                            }
                        }, {
                            key: "disconnect",
                            value: function() {
                                this.connector.disconnect()
                            }
                        }, {
                            key: "join",
                            value: function(t) {
                                return this.connector.presenceChannel(t)
                            }
                        }, {
                            key: "leave",
                            value: function(t) {
                                this.connector.leave(t)
                            }
                        }, {
                            key: "leaveChannel",
                            value: function(t) {
                                this.connector.leaveChannel(t)
                            }
                        }, {
                            key: "listen",
                            value: function(t, e, n) {
                                return this.connector.listen(t, e, n)
                            }
                        }, {
                            key: "private",
                            value: function(t) {
                                return this.connector.privateChannel(t)
                            }
                        }, {
                            key: "encryptedPrivate",
                            value: function(t) {
                                return this.connector.encryptedPrivateChannel(t)
                            }
                        }, {
                            key: "socketId",
                            value: function() {
                                return this.connector.socketId()
                            }
                        }, {
                            key: "registerInterceptors",
                            value: function() {
                                "function" == typeof Vue && Vue.http && this.registerVueRequestInterceptor(), "function" == typeof axios && this.registerAxiosRequestInterceptor(), "function" == typeof jQuery && this.registerjQueryAjaxSetup()
                            }
                        }, {
                            key: "registerVueRequestInterceptor",
                            value: function() {
                                var t = this;
                                Vue.http.interceptors.push((function(e, n) {
                                    t.socketId() && e.headers.set("X-Socket-ID", t.socketId()), n()
                                }))
                            }
                        }, {
                            key: "registerAxiosRequestInterceptor",
                            value: function() {
                                var t = this;
                                axios.interceptors.request.use((function(e) {
                                    return t.socketId() && (e.headers["X-Socket-Id"] = t.socketId()), e
                                }))
                            }
                        }, {
                            key: "registerjQueryAjaxSetup",
                            value: function() {
                                var t = this;
                                void 0 !== jQuery.ajax && jQuery.ajaxPrefilter((function(e, n, r) {
                                    t.socketId() && r.setRequestHeader("X-Socket-Id", t.socketId())
                                }))
                            }
                        }]), t
                    }();
                n(933), window.Pusher = n(6606), window.Echo = new A({
                    broadcaster: "pusher",
                    key: pusherKey,
                    cluster: pusherCluster,
                    encrypted: !0,
                    auth: {
                        headers: {
                            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
                        }
                    }
                })
            },
            933: () => {},
            2238: (t, e, n) => {
                const r = n(9602).z,
                    i = n(4593).array;
                t.exports = class {
                    constructor(t = {}) {
                        Object.assign(this, {
                            list: t.emptyList && [] || Array.prototype.concat.apply(r, [i, t.list || []]),
                            exclude: t.exclude || [],
                            splitRegex: t.splitRegex || /\b/,
                            placeHolder: t.placeHolder || "*",
                            regex: t.regex || /[^a-zA-Z0-9|\$|\@]|\^/g,
                            replaceRegex: t.replaceRegex || /\w/g
                        })
                    }
                    isProfane(t) {
                        return this.list.filter((e => {
                            const n = new RegExp(`\\b${e.replace(/(\W)/g,"\\$1")}\\b`, "gi");
                            return !this.exclude.includes(e.toLowerCase()) && n.test(t)
                        })).length > 0 || !1
                    }
                    replaceWord(t) {
                        return t.replace(this.regex, "").replace(this.replaceRegex, this.placeHolder)
                    }
                    clean(t) {
                        return t.split(this.splitRegex).map((t => this.isProfane(t) ? this.replaceWord(t) : t)).join(this.splitRegex.exec(t)[0])
                    }
                    addWords() {
                        let t = Array.from(arguments);
                        this.list.push(...t), t.map((t => t.toLowerCase())).forEach((t => {
                            this.exclude.includes(t) && this.exclude.splice(this.exclude.indexOf(t), 1)
                        }))
                    }
                    removeWords() {
                        this.exclude.push(...Array.from(arguments).map((t => t.toLowerCase())))
                    }
                }
            },
            8738: t => {
                t.exports = ["4r5e", "5h1t", "5hit", "a55", "anal", "anus", "ar5e", "arrse", "arse", "ass", "ass-fucker", "asses", "assfucker", "assfukka", "asshole", "assholes", "asswhole", "a_s_s", "b!tch", "b00bs", "b17ch", "b1tch", "ballbag", "balls", "ballsack", "bastard", "beastial", "beastiality", "bellend", "bestial", "bestiality", "bi+ch", "biatch", "bitch", "bitcher", "bitchers", "bitches", "bitchin", "bitching", "bloody", "blow job", "blowjob", "blowjobs", "boiolas", "bollock", "bollok", "boner", "boob", "boobs", "booobs", "boooobs", "booooobs", "booooooobs", "breasts", "buceta", "bugger", "bum", "bunny fucker", "butt", "butthole", "buttmuch", "buttplug", "c0ck", "c0cksucker", "carpet muncher", "cawk", "chink", "cipa", "cl1t", "clit", "clitoris", "clits", "cnut", "cock", "cock-sucker", "cockface", "cockhead", "cockmunch", "cockmuncher", "cocks", "cocksuck", "cocksucked", "cocksucker", "cocksucking", "cocksucks", "cocksuka", "cocksukka", "cok", "cokmuncher", "coksucka", "coon", "cox", "crap", "cum", "cummer", "cumming", "cums", "cumshot", "cunilingus", "cunillingus", "cunnilingus", "cunt", "cuntlick", "cuntlicker", "cuntlicking", "cunts", "cyalis", "cyberfuc", "cyberfuck", "cyberfucked", "cyberfucker", "cyberfuckers", "cyberfucking", "d1ck", "damn", "dick", "dickhead", "dildo", "dildos", "dink", "dinks", "dirsa", "dlck", "dog-fucker", "doggin", "dogging", "donkeyribber", "doosh", "duche", "dyke", "ejaculate", "ejaculated", "ejaculates", "ejaculating", "ejaculatings", "ejaculation", "ejakulate", "f u c k", "f u c k e r", "f4nny", "fag", "fagging", "faggitt", "faggot", "faggs", "fagot", "fagots", "fags", "fanny", "fannyflaps", "fannyfucker", "fanyy", "fatass", "fcuk", "fcuker", "fcuking", "feck", "fecker", "felching", "fellate", "fellatio", "fingerfuck", "fingerfucked", "fingerfucker", "fingerfuckers", "fingerfucking", "fingerfucks", "fistfuck", "fistfucked", "fistfucker", "fistfuckers", "fistfucking", "fistfuckings", "fistfucks", "flange", "fook", "fooker", "fuck", "fucka", "fucked", "fucker", "fuckers", "fuckhead", "fuckheads", "fuckin", "fucking", "fuckings", "fuckingshitmotherfucker", "fuckme", "fucks", "fuckwhit", "fuckwit", "fudge packer", "fudgepacker", "fuk", "fuker", "fukker", "fukkin", "fuks", "fukwhit", "fukwit", "fux", "fux0r", "f_u_c_k", "gangbang", "gangbanged", "gangbangs", "gaylord", "gaysex", "goatse", "God", "god-dam", "god-damned", "goddamn", "goddamned", "hardcoresex", "hell", "heshe", "hoar", "hoare", "hoer", "homo", "hore", "horniest", "horny", "hotsex", "jack-off", "jackoff", "jap", "jerk-off", "jism", "jiz", "jizm", "jizz", "kawk", "knob", "knobead", "knobed", "knobend", "knobhead", "knobjocky", "knobjokey", "kock", "kondum", "kondums", "kum", "kummer", "kumming", "kums", "kunilingus", "l3i+ch", "l3itch", "labia", "lust", "lusting", "m0f0", "m0fo", "m45terbate", "ma5terb8", "ma5terbate", "masochist", "master-bate", "masterb8", "masterbat*", "masterbat3", "masterbate", "masterbation", "masterbations", "masturbate", "mo-fo", "mof0", "mofo", "mothafuck", "mothafucka", "mothafuckas", "mothafuckaz", "mothafucked", "mothafucker", "mothafuckers", "mothafuckin", "mothafucking", "mothafuckings", "mothafucks", "mother fucker", "motherfuck", "motherfucked", "motherfucker", "motherfuckers", "motherfuckin", "motherfucking", "motherfuckings", "motherfuckka", "motherfucks", "muff", "mutha", "muthafecker", "muthafuckker", "muther", "mutherfucker", "n1gga", "n1gger", "nazi", "nigg3r", "nigg4h", "nigga", "niggah", "niggas", "niggaz", "nigger", "niggers", "nob", "nob jokey", "nobhead", "nobjocky", "nobjokey", "numbnuts", "nutsack", "orgasim", "orgasims", "orgasm", "orgasms", "p0rn", "pawn", "pecker", "penis", "penisfucker", "phonesex", "phuck", "phuk", "phuked", "phuking", "phukked", "phukking", "phuks", "phuq", "pigfucker", "pimpis", "piss", "pissed", "pisser", "pissers", "pisses", "pissflaps", "pissin", "pissing", "pissoff", "poop", "porn", "porno", "pornography", "pornos", "prick", "pricks", "pron", "pube", "pusse", "pussi", "pussies", "pussy", "pussys", "rectum", "retard", "rimjaw", "rimming", "s hit", "s.o.b.", "sadist", "schlong", "screwing", "scroat", "scrote", "scrotum", "semen", "sex", "sh!+", "sh!t", "sh1t", "shag", "shagger", "shaggin", "shagging", "shemale", "shi+", "shit", "shitdick", "shite", "shited", "shitey", "shitfuck", "shitfull", "shithead", "shiting", "shitings", "shits", "shitted", "shitter", "shitters", "shitting", "shittings", "shitty", "skank", "slut", "sluts", "smegma", "smut", "snatch", "son-of-a-bitch", "spac", "spunk", "s_h_i_t", "t1tt1e5", "t1tties", "teets", "teez", "testical", "testicle", "tit", "titfuck", "tits", "titt", "tittie5", "tittiefucker", "titties", "tittyfuck", "tittywank", "titwank", "tosser", "turd", "tw4t", "twat", "twathead", "twatty", "twunt", "twunter", "v14gra", "v1gra", "vagina", "viagra", "vulva", "w00se", "wang", "wank", "wanker", "wanky", "whoar", "whore", "willies", "willy", "xrated", "xxx"]
            },
            4593: (t, e, n) => {
                t.exports = {
                    object: n(7658),
                    array: n(8738),
                    regex: n(7519)
                }
            },
            7658: t => {
                t.exports = {
                    "4r5e": 1,
                    "5h1t": 1,
                    "5hit": 1,
                    a55: 1,
                    anal: 1,
                    anus: 1,
                    ar5e: 1,
                    arrse: 1,
                    arse: 1,
                    ass: 1,
                    "ass-fucker": 1,
                    asses: 1,
                    assfucker: 1,
                    assfukka: 1,
                    asshole: 1,
                    assholes: 1,
                    asswhole: 1,
                    a_s_s: 1,
                    "b!tch": 1,
                    b00bs: 1,
                    b17ch: 1,
                    b1tch: 1,
                    ballbag: 1,
                    balls: 1,
                    ballsack: 1,
                    bastard: 1,
                    beastial: 1,
                    beastiality: 1,
                    bellend: 1,
                    bestial: 1,
                    bestiality: 1,
                    "bi+ch": 1,
                    biatch: 1,
                    bitch: 1,
                    bitcher: 1,
                    bitchers: 1,
                    bitches: 1,
                    bitchin: 1,
                    bitching: 1,
                    bloody: 1,
                    "blow job": 1,
                    blowjob: 1,
                    blowjobs: 1,
                    boiolas: 1,
                    bollock: 1,
                    bollok: 1,
                    boner: 1,
                    boob: 1,
                    boobs: 1,
                    booobs: 1,
                    boooobs: 1,
                    booooobs: 1,
                    booooooobs: 1,
                    breasts: 1,
                    buceta: 1,
                    bugger: 1,
                    bum: 1,
                    "bunny fucker": 1,
                    butt: 1,
                    butthole: 1,
                    buttmuch: 1,
                    buttplug: 1,
                    c0ck: 1,
                    c0cksucker: 1,
                    "carpet muncher": 1,
                    cawk: 1,
                    chink: 1,
                    cipa: 1,
                    cl1t: 1,
                    clit: 1,
                    clitoris: 1,
                    clits: 1,
                    cnut: 1,
                    cock: 1,
                    "cock-sucker": 1,
                    cockface: 1,
                    cockhead: 1,
                    cockmunch: 1,
                    cockmuncher: 1,
                    cocks: 1,
                    cocksuck: 1,
                    cocksucked: 1,
                    cocksucker: 1,
                    cocksucking: 1,
                    cocksucks: 1,
                    cocksuka: 1,
                    cocksukka: 1,
                    cok: 1,
                    cokmuncher: 1,
                    coksucka: 1,
                    coon: 1,
                    cox: 1,
                    crap: 1,
                    cum: 1,
                    cummer: 1,
                    cumming: 1,
                    cums: 1,
                    cumshot: 1,
                    cunilingus: 1,
                    cunillingus: 1,
                    cunnilingus: 1,
                    cunt: 1,
                    cuntlick: 1,
                    cuntlicker: 1,
                    cuntlicking: 1,
                    cunts: 1,
                    cyalis: 1,
                    cyberfuc: 1,
                    cyberfuck: 1,
                    cyberfucked: 1,
                    cyberfucker: 1,
                    cyberfuckers: 1,
                    cyberfucking: 1,
                    d1ck: 1,
                    damn: 1,
                    dick: 1,
                    dickhead: 1,
                    dildo: 1,
                    dildos: 1,
                    dink: 1,
                    dinks: 1,
                    dirsa: 1,
                    dlck: 1,
                    "dog-fucker": 1,
                    doggin: 1,
                    dogging: 1,
                    donkeyribber: 1,
                    doosh: 1,
                    duche: 1,
                    dyke: 1,
                    ejaculate: 1,
                    ejaculated: 1,
                    ejaculates: 1,
                    ejaculating: 1,
                    ejaculatings: 1,
                    ejaculation: 1,
                    ejakulate: 1,
                    "f u c k": 1,
                    "f u c k e r": 1,
                    f4nny: 1,
                    fag: 1,
                    fagging: 1,
                    faggitt: 1,
                    faggot: 1,
                    faggs: 1,
                    fagot: 1,
                    fagots: 1,
                    fags: 1,
                    fanny: 1,
                    fannyflaps: 1,
                    fannyfucker: 1,
                    fanyy: 1,
                    fatass: 1,
                    fcuk: 1,
                    fcuker: 1,
                    fcuking: 1,
                    feck: 1,
                    fecker: 1,
                    felching: 1,
                    fellate: 1,
                    fellatio: 1,
                    fingerfuck: 1,
                    fingerfucked: 1,
                    fingerfucker: 1,
                    fingerfuckers: 1,
                    fingerfucking: 1,
                    fingerfucks: 1,
                    fistfuck: 1,
                    fistfucked: 1,
                    fistfucker: 1,
                    fistfuckers: 1,
                    fistfucking: 1,
                    fistfuckings: 1,
                    fistfucks: 1,
                    flange: 1,
                    fook: 1,
                    fooker: 1,
                    fuck: 1,
                    fucka: 1,
                    fucked: 1,
                    fucker: 1,
                    fuckers: 1,
                    fuckhead: 1,
                    fuckheads: 1,
                    fuckin: 1,
                    fucking: 1,
                    fuckings: 1,
                    fuckingshitmotherfucker: 1,
                    fuckme: 1,
                    fucks: 1,
                    fuckwhit: 1,
                    fuckwit: 1,
                    "fudge packer": 1,
                    fudgepacker: 1,
                    fuk: 1,
                    fuker: 1,
                    fukker: 1,
                    fukkin: 1,
                    fuks: 1,
                    fukwhit: 1,
                    fukwit: 1,
                    fux: 1,
                    fux0r: 1,
                    f_u_c_k: 1,
                    gangbang: 1,
                    gangbanged: 1,
                    gangbangs: 1,
                    gaylord: 1,
                    gaysex: 1,
                    goatse: 1,
                    God: 1,
                    "god-dam": 1,
                    "god-damned": 1,
                    goddamn: 1,
                    goddamned: 1,
                    hardcoresex: 1,
                    hell: 1,
                    heshe: 1,
                    hoar: 1,
                    hoare: 1,
                    hoer: 1,
                    homo: 1,
                    hore: 1,
                    horniest: 1,
                    horny: 1,
                    hotsex: 1,
                    "jack-off": 1,
                    jackoff: 1,
                    jap: 1,
                    "jerk-off": 1,
                    jism: 1,
                    jiz: 1,
                    jizm: 1,
                    jizz: 1,
                    kawk: 1,
                    knob: 1,
                    knobead: 1,
                    knobed: 1,
                    knobend: 1,
                    knobhead: 1,
                    knobjocky: 1,
                    knobjokey: 1,
                    kock: 1,
                    kondum: 1,
                    kondums: 1,
                    kum: 1,
                    kummer: 1,
                    kumming: 1,
                    kums: 1,
                    kunilingus: 1,
                    "l3i+ch": 1,
                    l3itch: 1,
                    labia: 1,
                    lust: 1,
                    lusting: 1,
                    m0f0: 1,
                    m0fo: 1,
                    m45terbate: 1,
                    ma5terb8: 1,
                    ma5terbate: 1,
                    masochist: 1,
                    "master-bate": 1,
                    masterb8: 1,
                    "masterbat*": 1,
                    masterbat3: 1,
                    masterbate: 1,
                    masterbation: 1,
                    masterbations: 1,
                    masturbate: 1,
                    "mo-fo": 1,
                    mof0: 1,
                    mofo: 1,
                    mothafuck: 1,
                    mothafucka: 1,
                    mothafuckas: 1,
                    mothafuckaz: 1,
                    mothafucked: 1,
                    mothafucker: 1,
                    mothafuckers: 1,
                    mothafuckin: 1,
                    mothafucking: 1,
                    mothafuckings: 1,
                    mothafucks: 1,
                    "mother fucker": 1,
                    motherfuck: 1,
                    motherfucked: 1,
                    motherfucker: 1,
                    motherfuckers: 1,
                    motherfuckin: 1,
                    motherfucking: 1,
                    motherfuckings: 1,
                    motherfuckka: 1,
                    motherfucks: 1,
                    muff: 1,
                    mutha: 1,
                    muthafecker: 1,
                    muthafuckker: 1,
                    muther: 1,
                    mutherfucker: 1,
                    n1gga: 1,
                    n1gger: 1,
                    nazi: 1,
                    nigg3r: 1,
                    nigg4h: 1,
                    nigga: 1,
                    niggah: 1,
                    niggas: 1,
                    niggaz: 1,
                    nigger: 1,
                    niggers: 1,
                    nob: 1,
                    "nob jokey": 1,
                    nobhead: 1,
                    nobjocky: 1,
                    nobjokey: 1,
                    numbnuts: 1,
                    nutsack: 1,
                    orgasim: 1,
                    orgasims: 1,
                    orgasm: 1,
                    orgasms: 1,
                    p0rn: 1,
                    pawn: 1,
                    pecker: 1,
                    penis: 1,
                    penisfucker: 1,
                    phonesex: 1,
                    phuck: 1,
                    phuk: 1,
                    phuked: 1,
                    phuking: 1,
                    phukked: 1,
                    phukking: 1,
                    phuks: 1,
                    phuq: 1,
                    pigfucker: 1,
                    pimpis: 1,
                    piss: 1,
                    pissed: 1,
                    pisser: 1,
                    pissers: 1,
                    pisses: 1,
                    pissflaps: 1,
                    pissin: 1,
                    pissing: 1,
                    pissoff: 1,
                    poop: 1,
                    porn: 1,
                    porno: 1,
                    pornography: 1,
                    pornos: 1,
                    prick: 1,
                    pricks: 1,
                    pron: 1,
                    pube: 1,
                    pusse: 1,
                    pussi: 1,
                    pussies: 1,
                    pussy: 1,
                    pussys: 1,
                    rectum: 1,
                    retard: 1,
                    rimjaw: 1,
                    rimming: 1,
                    "s hit": 1,
                    "s.o.b.": 1,
                    sadist: 1,
                    schlong: 1,
                    screwing: 1,
                    scroat: 1,
                    scrote: 1,
                    scrotum: 1,
                    semen: 1,
                    sex: 1,
                    "sh!+": 1,
                    "sh!t": 1,
                    sh1t: 1,
                    shag: 1,
                    shagger: 1,
                    shaggin: 1,
                    shagging: 1,
                    shemale: 1,
                    "shi+": 1,
                    shit: 1,
                    shitdick: 1,
                    shite: 1,
                    shited: 1,
                    shitey: 1,
                    shitfuck: 1,
                    shitfull: 1,
                    shithead: 1,
                    shiting: 1,
                    shitings: 1,
                    shits: 1,
                    shitted: 1,
                    shitter: 1,
                    shitters: 1,
                    shitting: 1,
                    shittings: 1,
                    shitty: 1,
                    skank: 1,
                    slut: 1,
                    sluts: 1,
                    smegma: 1,
                    smut: 1,
                    snatch: 1,
                    "son-of-a-bitch": 1,
                    spac: 1,
                    spunk: 1,
                    s_h_i_t: 1,
                    t1tt1e5: 1,
                    t1tties: 1,
                    teets: 1,
                    teez: 1,
                    testical: 1,
                    testicle: 1,
                    tit: 1,
                    titfuck: 1,
                    tits: 1,
                    titt: 1,
                    tittie5: 1,
                    tittiefucker: 1,
                    titties: 1,
                    tittyfuck: 1,
                    tittywank: 1,
                    titwank: 1,
                    tosser: 1,
                    turd: 1,
                    tw4t: 1,
                    twat: 1,
                    twathead: 1,
                    twatty: 1,
                    twunt: 1,
                    twunter: 1,
                    v14gra: 1,
                    v1gra: 1,
                    vagina: 1,
                    viagra: 1,
                    vulva: 1,
                    w00se: 1,
                    wang: 1,
                    wank: 1,
                    wanker: 1,
                    wanky: 1,
                    whoar: 1,
                    whore: 1,
                    willies: 1,
                    willy: 1,
                    xrated: 1,
                    xxx: 1
                }
            },
            7519: t => {
                t.exports = /\b(4r5e|5h1t|5hit|a55|anal|anus|ar5e|arrse|arse|ass|ass-fucker|asses|assfucker|assfukka|asshole|assholes|asswhole|a_s_s|b!tch|b00bs|b17ch|b1tch|ballbag|balls|ballsack|bastard|beastial|beastiality|bellend|bestial|bestiality|bi\+ch|biatch|bitch|bitcher|bitchers|bitches|bitchin|bitching|bloody|blow job|blowjob|blowjobs|boiolas|bollock|bollok|boner|boob|boobs|booobs|boooobs|booooobs|booooooobs|breasts|buceta|bugger|bum|bunny fucker|butt|butthole|buttmuch|buttplug|c0ck|c0cksucker|carpet muncher|cawk|chink|cipa|cl1t|clit|clitoris|clits|cnut|cock|cock-sucker|cockface|cockhead|cockmunch|cockmuncher|cocks|cocksuck|cocksucked|cocksucker|cocksucking|cocksucks|cocksuka|cocksukka|cok|cokmuncher|coksucka|coon|cox|crap|cum|cummer|cumming|cums|cumshot|cunilingus|cunillingus|cunnilingus|cunt|cuntlick|cuntlicker|cuntlicking|cunts|cyalis|cyberfuc|cyberfuck|cyberfucked|cyberfucker|cyberfuckers|cyberfucking|d1ck|damn|dick|dickhead|dildo|dildos|dink|dinks|dirsa|dlck|dog-fucker|doggin|dogging|donkeyribber|doosh|duche|dyke|ejaculate|ejaculated|ejaculates|ejaculating|ejaculatings|ejaculation|ejakulate|f u c k|f u c k e r|f4nny|fag|fagging|faggitt|faggot|faggs|fagot|fagots|fags|fanny|fannyflaps|fannyfucker|fanyy|fatass|fcuk|fcuker|fcuking|feck|fecker|felching|fellate|fellatio|fingerfuck|fingerfucked|fingerfucker|fingerfuckers|fingerfucking|fingerfucks|fistfuck|fistfucked|fistfucker|fistfuckers|fistfucking|fistfuckings|fistfucks|flange|fook|fooker|fuck|fucka|fucked|fucker|fuckers|fuckhead|fuckheads|fuckin|fucking|fuckings|fuckingshitmotherfucker|fuckme|fucks|fuckwhit|fuckwit|fudge packer|fudgepacker|fuk|fuker|fukker|fukkin|fuks|fukwhit|fukwit|fux|fux0r|f_u_c_k|gangbang|gangbanged|gangbangs|gaylord|gaysex|goatse|God|god-dam|god-damned|goddamn|goddamned|hardcoresex|hell|heshe|hoar|hoare|hoer|homo|hore|horniest|horny|hotsex|jack-off|jackoff|jap|jerk-off|jism|jiz|jizm|jizz|kawk|knob|knobead|knobed|knobend|knobhead|knobjocky|knobjokey|kock|kondum|kondums|kum|kummer|kumming|kums|kunilingus|l3i\+ch|l3itch|labia|lust|lusting|m0f0|m0fo|m45terbate|ma5terb8|ma5terbate|masochist|master-bate|masterb8|masterbat*|masterbat3|masterbate|masterbation|masterbations|masturbate|mo-fo|mof0|mofo|mothafuck|mothafucka|mothafuckas|mothafuckaz|mothafucked|mothafucker|mothafuckers|mothafuckin|mothafucking|mothafuckings|mothafucks|mother fucker|motherfuck|motherfucked|motherfucker|motherfuckers|motherfuckin|motherfucking|motherfuckings|motherfuckka|motherfucks|muff|mutha|muthafecker|muthafuckker|muther|mutherfucker|n1gga|n1gger|nazi|nigg3r|nigg4h|nigga|niggah|niggas|niggaz|nigger|niggers|nob|nob jokey|nobhead|nobjocky|nobjokey|numbnuts|nutsack|orgasim|orgasims|orgasm|orgasms|p0rn|pawn|pecker|penis|penisfucker|phonesex|phuck|phuk|phuked|phuking|phukked|phukking|phuks|phuq|pigfucker|pimpis|piss|pissed|pisser|pissers|pisses|pissflaps|pissin|pissing|pissoff|poop|porn|porno|pornography|pornos|prick|pricks|pron|pube|pusse|pussi|pussies|pussy|pussys|rectum|retard|rimjaw|rimming|s hit|s.o.b.|sadist|schlong|screwing|scroat|scrote|scrotum|semen|sex|sh!\+|sh!t|sh1t|shag|shagger|shaggin|shagging|shemale|shi\+|shit|shitdick|shite|shited|shitey|shitfuck|shitfull|shithead|shiting|shitings|shits|shitted|shitter|shitters|shitting|shittings|shitty|skank|slut|sluts|smegma|smut|snatch|son-of-a-bitch|spac|spunk|s_h_i_t|t1tt1e5|t1tties|teets|teez|testical|testicle|tit|titfuck|tits|titt|tittie5|tittiefucker|titties|tittyfuck|tittywank|titwank|tosser|turd|tw4t|twat|twathead|twatty|twunt|twunter|v14gra|v1gra|vagina|viagra|vulva|w00se|wang|wank|wanker|wanky|whoar|whore|willies|willy|xrated|xxx)\b/gi
            },
            9742: (t, e) => {
                "use strict";
                e.byteLength = function(t) {
                    var e = c(t),
                        n = e[0],
                        r = e[1];
                    return 3 * (n + r) / 4 - r
                }, e.toByteArray = function(t) {
                    var e, n, o = c(t),
                        s = o[0],
                        a = o[1],
                        u = new i(function(t, e, n) {
                            return 3 * (e + n) / 4 - n
                        }(0, s, a)),
                        h = 0,
                        f = a > 0 ? s - 4 : s;
                    for (n = 0; n < f; n += 4) e = r[t.charCodeAt(n)] << 18 | r[t.charCodeAt(n + 1)] << 12 | r[t.charCodeAt(n + 2)] << 6 | r[t.charCodeAt(n + 3)], u[h++] = e >> 16 & 255, u[h++] = e >> 8 & 255, u[h++] = 255 & e;
                    2 === a && (e = r[t.charCodeAt(n)] << 2 | r[t.charCodeAt(n + 1)] >> 4, u[h++] = 255 & e);
                    1 === a && (e = r[t.charCodeAt(n)] << 10 | r[t.charCodeAt(n + 1)] << 4 | r[t.charCodeAt(n + 2)] >> 2, u[h++] = e >> 8 & 255, u[h++] = 255 & e);
                    return u
                }, e.fromByteArray = function(t) {
                    for (var e, r = t.length, i = r % 3, o = [], s = 16383, a = 0, c = r - i; a < c; a += s) o.push(u(t, a, a + s > c ? c : a + s));
                    1 === i ? (e = t[r - 1], o.push(n[e >> 2] + n[e << 4 & 63] + "==")) : 2 === i && (e = (t[r - 2] << 8) + t[r - 1], o.push(n[e >> 10] + n[e >> 4 & 63] + n[e << 2 & 63] + "="));
                    return o.join("")
                };
                for (var n = [], r = [], i = "undefined" != typeof Uint8Array ? Uint8Array : Array, o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s = 0, a = o.length; s < a; ++s) n[s] = o[s], r[o.charCodeAt(s)] = s;

                function c(t) {
                    var e = t.length;
                    if (e % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
                    var n = t.indexOf("=");
                    return -1 === n && (n = e), [n, n === e ? 0 : 4 - n % 4]
                }

                function u(t, e, r) {
                    for (var i, o, s = [], a = e; a < r; a += 3) i = (t[a] << 16 & 16711680) + (t[a + 1] << 8 & 65280) + (255 & t[a + 2]), s.push(n[(o = i) >> 18 & 63] + n[o >> 12 & 63] + n[o >> 6 & 63] + n[63 & o]);
                    return s.join("")
                }
                r["-".charCodeAt(0)] = 62, r["_".charCodeAt(0)] = 63
            },
            8764: (t, e, n) => {
                "use strict";
                var r = n(9742),
                    i = n(645),
                    o = n(5826);

                function s() {
                    return c.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
                }

                function a(t, e) {
                    if (s() < e) throw new RangeError("Invalid typed array length");
                    return c.TYPED_ARRAY_SUPPORT ? (t = new Uint8Array(e)).__proto__ = c.prototype : (null === t && (t = new c(e)), t.length = e), t
                }

                function c(t, e, n) {
                    if (!(c.TYPED_ARRAY_SUPPORT || this instanceof c)) return new c(t, e, n);
                    if ("number" == typeof t) {
                        if ("string" == typeof e) throw new Error("If encoding is specified then the first argument must be a string");
                        return f(this, t)
                    }
                    return u(this, t, e, n)
                }

                function u(t, e, n, r) {
                    if ("number" == typeof e) throw new TypeError('"value" argument must not be a number');
                    return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer ? function(t, e, n, r) {
                        if (e.byteLength, n < 0 || e.byteLength < n) throw new RangeError("'offset' is out of bounds");
                        if (e.byteLength < n + (r || 0)) throw new RangeError("'length' is out of bounds");
                        e = void 0 === n && void 0 === r ? new Uint8Array(e) : void 0 === r ? new Uint8Array(e, n) : new Uint8Array(e, n, r);
                        c.TYPED_ARRAY_SUPPORT ? (t = e).__proto__ = c.prototype : t = l(t, e);
                        return t
                    }(t, e, n, r) : "string" == typeof e ? function(t, e, n) {
                        "string" == typeof n && "" !== n || (n = "utf8");
                        if (!c.isEncoding(n)) throw new TypeError('"encoding" must be a valid string encoding');
                        var r = 0 | d(e, n),
                            i = (t = a(t, r)).write(e, n);
                        i !== r && (t = t.slice(0, i));
                        return t
                    }(t, e, n) : function(t, e) {
                        if (c.isBuffer(e)) {
                            var n = 0 | p(e.length);
                            return 0 === (t = a(t, n)).length || e.copy(t, 0, 0, n), t
                        }
                        if (e) {
                            if ("undefined" != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer || "length" in e) return "number" != typeof e.length || (r = e.length) != r ? a(t, 0) : l(t, e);
                            if ("Buffer" === e.type && o(e.data)) return l(t, e.data)
                        }
                        var r;
                        throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
                    }(t, e)
                }

                function h(t) {
                    if ("number" != typeof t) throw new TypeError('"size" argument must be a number');
                    if (t < 0) throw new RangeError('"size" argument must not be negative')
                }

                function f(t, e) {
                    if (h(e), t = a(t, e < 0 ? 0 : 0 | p(e)), !c.TYPED_ARRAY_SUPPORT)
                        for (var n = 0; n < e; ++n) t[n] = 0;
                    return t
                }

                function l(t, e) {
                    var n = e.length < 0 ? 0 : 0 | p(e.length);
                    t = a(t, n);
                    for (var r = 0; r < n; r += 1) t[r] = 255 & e[r];
                    return t
                }

                function p(t) {
                    if (t >= s()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + s().toString(16) + " bytes");
                    return 0 | t
                }

                function d(t, e) {
                    if (c.isBuffer(t)) return t.length;
                    if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)) return t.byteLength;
                    "string" != typeof t && (t = "" + t);
                    var n = t.length;
                    if (0 === n) return 0;
                    for (var r = !1;;) switch (e) {
                        case "ascii":
                        case "latin1":
                        case "binary":
                            return n;
                        case "utf8":
                        case "utf-8":
                        case void 0:
                            return N(t).length;
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return 2 * n;
                        case "hex":
                            return n >>> 1;
                        case "base64":
                            return F(t).length;
                        default:
                            if (r) return N(t).length;
                            e = ("" + e).toLowerCase(), r = !0
                    }
                }

                function g(t, e, n) {
                    var r = !1;
                    if ((void 0 === e || e < 0) && (e = 0), e > this.length) return "";
                    if ((void 0 === n || n > this.length) && (n = this.length), n <= 0) return "";
                    if ((n >>>= 0) <= (e >>>= 0)) return "";
                    for (t || (t = "utf8");;) switch (t) {
                        case "hex":
                            return O(this, e, n);
                        case "utf8":
                        case "utf-8":
                            return T(this, e, n);
                        case "ascii":
                            return A(this, e, n);
                        case "latin1":
                        case "binary":
                            return P(this, e, n);
                        case "base64":
                            return C(this, e, n);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return R(this, e, n);
                        default:
                            if (r) throw new TypeError("Unknown encoding: " + t);
                            t = (t + "").toLowerCase(), r = !0
                    }
                }

                function y(t, e, n) {
                    var r = t[e];
                    t[e] = t[n], t[n] = r
                }

                function m(t, e, n, r, i) {
                    if (0 === t.length) return -1;
                    if ("string" == typeof n ? (r = n, n = 0) : n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648), n = +n, isNaN(n) && (n = i ? 0 : t.length - 1), n < 0 && (n = t.length + n), n >= t.length) {
                        if (i) return -1;
                        n = t.length - 1
                    } else if (n < 0) {
                        if (!i) return -1;
                        n = 0
                    }
                    if ("string" == typeof e && (e = c.from(e, r)), c.isBuffer(e)) return 0 === e.length ? -1 : b(t, e, n, r, i);
                    if ("number" == typeof e) return e &= 255, c.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? i ? Uint8Array.prototype.indexOf.call(t, e, n) : Uint8Array.prototype.lastIndexOf.call(t, e, n) : b(t, [e], n, r, i);
                    throw new TypeError("val must be string, number or Buffer")
                }

                function b(t, e, n, r, i) {
                    var o, s = 1,
                        a = t.length,
                        c = e.length;
                    if (void 0 !== r && ("ucs2" === (r = String(r).toLowerCase()) || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
                        if (t.length < 2 || e.length < 2) return -1;
                        s = 2, a /= 2, c /= 2, n /= 2
                    }

                    function u(t, e) {
                        return 1 === s ? t[e] : t.readUInt16BE(e * s)
                    }
                    if (i) {
                        var h = -1;
                        for (o = n; o < a; o++)
                            if (u(t, o) === u(e, -1 === h ? 0 : o - h)) {
                                if (-1 === h && (h = o), o - h + 1 === c) return h * s
                            } else -1 !== h && (o -= o - h), h = -1
                    } else
                        for (n + c > a && (n = a - c), o = n; o >= 0; o--) {
                            for (var f = !0, l = 0; l < c; l++)
                                if (u(t, o + l) !== u(e, l)) {
                                    f = !1;
                                    break
                                }
                            if (f) return o
                        }
                    return -1
                }

                function k(t, e, n, r) {
                    n = Number(n) || 0;
                    var i = t.length - n;
                    r ? (r = Number(r)) > i && (r = i) : r = i;
                    var o = e.length;
                    if (o % 2 != 0) throw new TypeError("Invalid hex string");
                    r > o / 2 && (r = o / 2);
                    for (var s = 0; s < r; ++s) {
                        var a = parseInt(e.substr(2 * s, 2), 16);
                        if (isNaN(a)) return s;
                        t[n + s] = a
                    }
                    return s
                }

                function v(t, e, n, r) {
                    return Y(N(e, t.length - n), t, n, r)
                }

                function w(t, e, n, r) {
                    return Y(function(t) {
                        for (var e = [], n = 0; n < t.length; ++n) e.push(255 & t.charCodeAt(n));
                        return e
                    }(e), t, n, r)
                }

                function _(t, e, n, r) {
                    return w(t, e, n, r)
                }

                function S(t, e, n, r) {
                    return Y(F(e), t, n, r)
                }

                function x(t, e, n, r) {
                    return Y(function(t, e) {
                        for (var n, r, i, o = [], s = 0; s < t.length && !((e -= 2) < 0); ++s) r = (n = t.charCodeAt(s)) >> 8, i = n % 256, o.push(i), o.push(r);
                        return o
                    }(e, t.length - n), t, n, r)
                }

                function C(t, e, n) {
                    return 0 === e && n === t.length ? r.fromByteArray(t) : r.fromByteArray(t.slice(e, n))
                }

                function T(t, e, n) {
                    n = Math.min(t.length, n);
                    for (var r = [], i = e; i < n;) {
                        var o, s, a, c, u = t[i],
                            h = null,
                            f = u > 239 ? 4 : u > 223 ? 3 : u > 191 ? 2 : 1;
                        if (i + f <= n) switch (f) {
                            case 1:
                                u < 128 && (h = u);
                                break;
                            case 2:
                                128 == (192 & (o = t[i + 1])) && (c = (31 & u) << 6 | 63 & o) > 127 && (h = c);
                                break;
                            case 3:
                                o = t[i + 1], s = t[i + 2], 128 == (192 & o) && 128 == (192 & s) && (c = (15 & u) << 12 | (63 & o) << 6 | 63 & s) > 2047 && (c < 55296 || c > 57343) && (h = c);
                                break;
                            case 4:
                                o = t[i + 1], s = t[i + 2], a = t[i + 3], 128 == (192 & o) && 128 == (192 & s) && 128 == (192 & a) && (c = (15 & u) << 18 | (63 & o) << 12 | (63 & s) << 6 | 63 & a) > 65535 && c < 1114112 && (h = c)
                        }
                        null === h ? (h = 65533, f = 1) : h > 65535 && (h -= 65536, r.push(h >>> 10 & 1023 | 55296), h = 56320 | 1023 & h), r.push(h), i += f
                    }
                    return function(t) {
                        var e = t.length;
                        if (e <= E) return String.fromCharCode.apply(String, t);
                        var n = "",
                            r = 0;
                        for (; r < e;) n += String.fromCharCode.apply(String, t.slice(r, r += E));
                        return n
                    }(r)
                }
                e.Buffer = c, e.SlowBuffer = function(t) {
                    +t != t && (t = 0);
                    return c.alloc(+t)
                }, e.INSPECT_MAX_BYTES = 50, c.TYPED_ARRAY_SUPPORT = void 0 !== n.g.TYPED_ARRAY_SUPPORT ? n.g.TYPED_ARRAY_SUPPORT : function() {
                    try {
                        var t = new Uint8Array(1);
                        return t.__proto__ = {
                            __proto__: Uint8Array.prototype,
                            foo: function() {
                                return 42
                            }
                        }, 42 === t.foo() && "function" == typeof t.subarray && 0 === t.subarray(1, 1).byteLength
                    } catch (t) {
                        return !1
                    }
                }(), e.kMaxLength = s(), c.poolSize = 8192, c._augment = function(t) {
                    return t.__proto__ = c.prototype, t
                }, c.from = function(t, e, n) {
                    return u(null, t, e, n)
                }, c.TYPED_ARRAY_SUPPORT && (c.prototype.__proto__ = Uint8Array.prototype, c.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && c[Symbol.species] === c && Object.defineProperty(c, Symbol.species, {
                    value: null,
                    configurable: !0
                })), c.alloc = function(t, e, n) {
                    return function(t, e, n, r) {
                        return h(e), e <= 0 ? a(t, e) : void 0 !== n ? "string" == typeof r ? a(t, e).fill(n, r) : a(t, e).fill(n) : a(t, e)
                    }(null, t, e, n)
                }, c.allocUnsafe = function(t) {
                    return f(null, t)
                }, c.allocUnsafeSlow = function(t) {
                    return f(null, t)
                }, c.isBuffer = function(t) {
                    return !(null == t || !t._isBuffer)
                }, c.compare = function(t, e) {
                    if (!c.isBuffer(t) || !c.isBuffer(e)) throw new TypeError("Arguments must be Buffers");
                    if (t === e) return 0;
                    for (var n = t.length, r = e.length, i = 0, o = Math.min(n, r); i < o; ++i)
                        if (t[i] !== e[i]) {
                            n = t[i], r = e[i];
                            break
                        }
                    return n < r ? -1 : r < n ? 1 : 0
                }, c.isEncoding = function(t) {
                    switch (String(t).toLowerCase()) {
                        case "hex":
                        case "utf8":
                        case "utf-8":
                        case "ascii":
                        case "latin1":
                        case "binary":
                        case "base64":
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return !0;
                        default:
                            return !1
                    }
                }, c.concat = function(t, e) {
                    if (!o(t)) throw new TypeError('"list" argument must be an Array of Buffers');
                    if (0 === t.length) return c.alloc(0);
                    var n;
                    if (void 0 === e)
                        for (e = 0, n = 0; n < t.length; ++n) e += t[n].length;
                    var r = c.allocUnsafe(e),
                        i = 0;
                    for (n = 0; n < t.length; ++n) {
                        var s = t[n];
                        if (!c.isBuffer(s)) throw new TypeError('"list" argument must be an Array of Buffers');
                        s.copy(r, i), i += s.length
                    }
                    return r
                }, c.byteLength = d, c.prototype._isBuffer = !0, c.prototype.swap16 = function() {
                    var t = this.length;
                    if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
                    for (var e = 0; e < t; e += 2) y(this, e, e + 1);
                    return this
                }, c.prototype.swap32 = function() {
                    var t = this.length;
                    if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
                    for (var e = 0; e < t; e += 4) y(this, e, e + 3), y(this, e + 1, e + 2);
                    return this
                }, c.prototype.swap64 = function() {
                    var t = this.length;
                    if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
                    for (var e = 0; e < t; e += 8) y(this, e, e + 7), y(this, e + 1, e + 6), y(this, e + 2, e + 5), y(this, e + 3, e + 4);
                    return this
                }, c.prototype.toString = function() {
                    var t = 0 | this.length;
                    return 0 === t ? "" : 0 === arguments.length ? T(this, 0, t) : g.apply(this, arguments)
                }, c.prototype.equals = function(t) {
                    if (!c.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                    return this === t || 0 === c.compare(this, t)
                }, c.prototype.inspect = function() {
                    var t = "",
                        n = e.INSPECT_MAX_BYTES;
                    return this.length > 0 && (t = this.toString("hex", 0, n).match(/.{2}/g).join(" "), this.length > n && (t += " ... ")), "<Buffer " + t + ">"
                }, c.prototype.compare = function(t, e, n, r, i) {
                    if (!c.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                    if (void 0 === e && (e = 0), void 0 === n && (n = t ? t.length : 0), void 0 === r && (r = 0), void 0 === i && (i = this.length), e < 0 || n > t.length || r < 0 || i > this.length) throw new RangeError("out of range index");
                    if (r >= i && e >= n) return 0;
                    if (r >= i) return -1;
                    if (e >= n) return 1;
                    if (this === t) return 0;
                    for (var o = (i >>>= 0) - (r >>>= 0), s = (n >>>= 0) - (e >>>= 0), a = Math.min(o, s), u = this.slice(r, i), h = t.slice(e, n), f = 0; f < a; ++f)
                        if (u[f] !== h[f]) {
                            o = u[f], s = h[f];
                            break
                        }
                    return o < s ? -1 : s < o ? 1 : 0
                }, c.prototype.includes = function(t, e, n) {
                    return -1 !== this.indexOf(t, e, n)
                }, c.prototype.indexOf = function(t, e, n) {
                    return m(this, t, e, n, !0)
                }, c.prototype.lastIndexOf = function(t, e, n) {
                    return m(this, t, e, n, !1)
                }, c.prototype.write = function(t, e, n, r) {
                    if (void 0 === e) r = "utf8", n = this.length, e = 0;
                    else if (void 0 === n && "string" == typeof e) r = e, n = this.length, e = 0;
                    else {
                        if (!isFinite(e)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                        e |= 0, isFinite(n) ? (n |= 0, void 0 === r && (r = "utf8")) : (r = n, n = void 0)
                    }
                    var i = this.length - e;
                    if ((void 0 === n || n > i) && (n = i), t.length > 0 && (n < 0 || e < 0) || e > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                    r || (r = "utf8");
                    for (var o = !1;;) switch (r) {
                        case "hex":
                            return k(this, t, e, n);
                        case "utf8":
                        case "utf-8":
                            return v(this, t, e, n);
                        case "ascii":
                            return w(this, t, e, n);
                        case "latin1":
                        case "binary":
                            return _(this, t, e, n);
                        case "base64":
                            return S(this, t, e, n);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return x(this, t, e, n);
                        default:
                            if (o) throw new TypeError("Unknown encoding: " + r);
                            r = ("" + r).toLowerCase(), o = !0
                    }
                }, c.prototype.toJSON = function() {
                    return {
                        type: "Buffer",
                        data: Array.prototype.slice.call(this._arr || this, 0)
                    }
                };
                var E = 4096;

                function A(t, e, n) {
                    var r = "";
                    n = Math.min(t.length, n);
                    for (var i = e; i < n; ++i) r += String.fromCharCode(127 & t[i]);
                    return r
                }

                function P(t, e, n) {
                    var r = "";
                    n = Math.min(t.length, n);
                    for (var i = e; i < n; ++i) r += String.fromCharCode(t[i]);
                    return r
                }

                function O(t, e, n) {
                    var r = t.length;
                    (!e || e < 0) && (e = 0), (!n || n < 0 || n > r) && (n = r);
                    for (var i = "", o = e; o < n; ++o) i += D(t[o]);
                    return i
                }

                function R(t, e, n) {
                    for (var r = t.slice(e, n), i = "", o = 0; o < r.length; o += 2) i += String.fromCharCode(r[o] + 256 * r[o + 1]);
                    return i
                }

                function j(t, e, n) {
                    if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
                    if (t + e > n) throw new RangeError("Trying to access beyond buffer length")
                }

                function U(t, e, n, r, i, o) {
                    if (!c.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
                    if (e > i || e < o) throw new RangeError('"value" argument is out of bounds');
                    if (n + r > t.length) throw new RangeError("Index out of range")
                }

                function L(t, e, n, r) {
                    e < 0 && (e = 65535 + e + 1);
                    for (var i = 0, o = Math.min(t.length - n, 2); i < o; ++i) t[n + i] = (e & 255 << 8 * (r ? i : 1 - i)) >>> 8 * (r ? i : 1 - i)
                }

                function M(t, e, n, r) {
                    e < 0 && (e = 4294967295 + e + 1);
                    for (var i = 0, o = Math.min(t.length - n, 4); i < o; ++i) t[n + i] = e >>> 8 * (r ? i : 3 - i) & 255
                }

                function I(t, e, n, r, i, o) {
                    if (n + r > t.length) throw new RangeError("Index out of range");
                    if (n < 0) throw new RangeError("Index out of range")
                }

                function B(t, e, n, r, o) {
                    return o || I(t, 0, n, 4), i.write(t, e, n, r, 23, 4), n + 4
                }

                function z(t, e, n, r, o) {
                    return o || I(t, 0, n, 8), i.write(t, e, n, r, 52, 8), n + 8
                }
                c.prototype.slice = function(t, e) {
                    var n, r = this.length;
                    if ((t = ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), (e = void 0 === e ? r : ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), e < t && (e = t), c.TYPED_ARRAY_SUPPORT)(n = this.subarray(t, e)).__proto__ = c.prototype;
                    else {
                        var i = e - t;
                        n = new c(i, void 0);
                        for (var o = 0; o < i; ++o) n[o] = this[o + t]
                    }
                    return n
                }, c.prototype.readUIntLE = function(t, e, n) {
                    t |= 0, e |= 0, n || j(t, e, this.length);
                    for (var r = this[t], i = 1, o = 0; ++o < e && (i *= 256);) r += this[t + o] * i;
                    return r
                }, c.prototype.readUIntBE = function(t, e, n) {
                    t |= 0, e |= 0, n || j(t, e, this.length);
                    for (var r = this[t + --e], i = 1; e > 0 && (i *= 256);) r += this[t + --e] * i;
                    return r
                }, c.prototype.readUInt8 = function(t, e) {
                    return e || j(t, 1, this.length), this[t]
                }, c.prototype.readUInt16LE = function(t, e) {
                    return e || j(t, 2, this.length), this[t] | this[t + 1] << 8
                }, c.prototype.readUInt16BE = function(t, e) {
                    return e || j(t, 2, this.length), this[t] << 8 | this[t + 1]
                }, c.prototype.readUInt32LE = function(t, e) {
                    return e || j(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
                }, c.prototype.readUInt32BE = function(t, e) {
                    return e || j(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
                }, c.prototype.readIntLE = function(t, e, n) {
                    t |= 0, e |= 0, n || j(t, e, this.length);
                    for (var r = this[t], i = 1, o = 0; ++o < e && (i *= 256);) r += this[t + o] * i;
                    return r >= (i *= 128) && (r -= Math.pow(2, 8 * e)), r
                }, c.prototype.readIntBE = function(t, e, n) {
                    t |= 0, e |= 0, n || j(t, e, this.length);
                    for (var r = e, i = 1, o = this[t + --r]; r > 0 && (i *= 256);) o += this[t + --r] * i;
                    return o >= (i *= 128) && (o -= Math.pow(2, 8 * e)), o
                }, c.prototype.readInt8 = function(t, e) {
                    return e || j(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
                }, c.prototype.readInt16LE = function(t, e) {
                    e || j(t, 2, this.length);
                    var n = this[t] | this[t + 1] << 8;
                    return 32768 & n ? 4294901760 | n : n
                }, c.prototype.readInt16BE = function(t, e) {
                    e || j(t, 2, this.length);
                    var n = this[t + 1] | this[t] << 8;
                    return 32768 & n ? 4294901760 | n : n
                }, c.prototype.readInt32LE = function(t, e) {
                    return e || j(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
                }, c.prototype.readInt32BE = function(t, e) {
                    return e || j(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
                }, c.prototype.readFloatLE = function(t, e) {
                    return e || j(t, 4, this.length), i.read(this, t, !0, 23, 4)
                }, c.prototype.readFloatBE = function(t, e) {
                    return e || j(t, 4, this.length), i.read(this, t, !1, 23, 4)
                }, c.prototype.readDoubleLE = function(t, e) {
                    return e || j(t, 8, this.length), i.read(this, t, !0, 52, 8)
                }, c.prototype.readDoubleBE = function(t, e) {
                    return e || j(t, 8, this.length), i.read(this, t, !1, 52, 8)
                }, c.prototype.writeUIntLE = function(t, e, n, r) {
                    (t = +t, e |= 0, n |= 0, r) || U(this, t, e, n, Math.pow(2, 8 * n) - 1, 0);
                    var i = 1,
                        o = 0;
                    for (this[e] = 255 & t; ++o < n && (i *= 256);) this[e + o] = t / i & 255;
                    return e + n
                }, c.prototype.writeUIntBE = function(t, e, n, r) {
                    (t = +t, e |= 0, n |= 0, r) || U(this, t, e, n, Math.pow(2, 8 * n) - 1, 0);
                    var i = n - 1,
                        o = 1;
                    for (this[e + i] = 255 & t; --i >= 0 && (o *= 256);) this[e + i] = t / o & 255;
                    return e + n
                }, c.prototype.writeUInt8 = function(t, e, n) {
                    return t = +t, e |= 0, n || U(this, t, e, 1, 255, 0), c.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), this[e] = 255 & t, e + 1
                }, c.prototype.writeUInt16LE = function(t, e, n) {
                    return t = +t, e |= 0, n || U(this, t, e, 2, 65535, 0), c.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : L(this, t, e, !0), e + 2
                }, c.prototype.writeUInt16BE = function(t, e, n) {
                    return t = +t, e |= 0, n || U(this, t, e, 2, 65535, 0), c.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : L(this, t, e, !1), e + 2
                }, c.prototype.writeUInt32LE = function(t, e, n) {
                    return t = +t, e |= 0, n || U(this, t, e, 4, 4294967295, 0), c.TYPED_ARRAY_SUPPORT ? (this[e + 3] = t >>> 24, this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, this[e] = 255 & t) : M(this, t, e, !0), e + 4
                }, c.prototype.writeUInt32BE = function(t, e, n) {
                    return t = +t, e |= 0, n || U(this, t, e, 4, 4294967295, 0), c.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : M(this, t, e, !1), e + 4
                }, c.prototype.writeIntLE = function(t, e, n, r) {
                    if (t = +t, e |= 0, !r) {
                        var i = Math.pow(2, 8 * n - 1);
                        U(this, t, e, n, i - 1, -i)
                    }
                    var o = 0,
                        s = 1,
                        a = 0;
                    for (this[e] = 255 & t; ++o < n && (s *= 256);) t < 0 && 0 === a && 0 !== this[e + o - 1] && (a = 1), this[e + o] = (t / s >> 0) - a & 255;
                    return e + n
                }, c.prototype.writeIntBE = function(t, e, n, r) {
                    if (t = +t, e |= 0, !r) {
                        var i = Math.pow(2, 8 * n - 1);
                        U(this, t, e, n, i - 1, -i)
                    }
                    var o = n - 1,
                        s = 1,
                        a = 0;
                    for (this[e + o] = 255 & t; --o >= 0 && (s *= 256);) t < 0 && 0 === a && 0 !== this[e + o + 1] && (a = 1), this[e + o] = (t / s >> 0) - a & 255;
                    return e + n
                }, c.prototype.writeInt8 = function(t, e, n) {
                    return t = +t, e |= 0, n || U(this, t, e, 1, 127, -128), c.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), t < 0 && (t = 255 + t + 1), this[e] = 255 & t, e + 1
                }, c.prototype.writeInt16LE = function(t, e, n) {
                    return t = +t, e |= 0, n || U(this, t, e, 2, 32767, -32768), c.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : L(this, t, e, !0), e + 2
                }, c.prototype.writeInt16BE = function(t, e, n) {
                    return t = +t, e |= 0, n || U(this, t, e, 2, 32767, -32768), c.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : L(this, t, e, !1), e + 2
                }, c.prototype.writeInt32LE = function(t, e, n) {
                    return t = +t, e |= 0, n || U(this, t, e, 4, 2147483647, -2147483648), c.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24) : M(this, t, e, !0), e + 4
                }, c.prototype.writeInt32BE = function(t, e, n) {
                    return t = +t, e |= 0, n || U(this, t, e, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), c.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : M(this, t, e, !1), e + 4
                }, c.prototype.writeFloatLE = function(t, e, n) {
                    return B(this, t, e, !0, n)
                }, c.prototype.writeFloatBE = function(t, e, n) {
                    return B(this, t, e, !1, n)
                }, c.prototype.writeDoubleLE = function(t, e, n) {
                    return z(this, t, e, !0, n)
                }, c.prototype.writeDoubleBE = function(t, e, n) {
                    return z(this, t, e, !1, n)
                }, c.prototype.copy = function(t, e, n, r) {
                    if (n || (n = 0), r || 0 === r || (r = this.length), e >= t.length && (e = t.length), e || (e = 0), r > 0 && r < n && (r = n), r === n) return 0;
                    if (0 === t.length || 0 === this.length) return 0;
                    if (e < 0) throw new RangeError("targetStart out of bounds");
                    if (n < 0 || n >= this.length) throw new RangeError("sourceStart out of bounds");
                    if (r < 0) throw new RangeError("sourceEnd out of bounds");
                    r > this.length && (r = this.length), t.length - e < r - n && (r = t.length - e + n);
                    var i, o = r - n;
                    if (this === t && n < e && e < r)
                        for (i = o - 1; i >= 0; --i) t[i + e] = this[i + n];
                    else if (o < 1e3 || !c.TYPED_ARRAY_SUPPORT)
                        for (i = 0; i < o; ++i) t[i + e] = this[i + n];
                    else Uint8Array.prototype.set.call(t, this.subarray(n, n + o), e);
                    return o
                }, c.prototype.fill = function(t, e, n, r) {
                    if ("string" == typeof t) {
                        if ("string" == typeof e ? (r = e, e = 0, n = this.length) : "string" == typeof n && (r = n, n = this.length), 1 === t.length) {
                            var i = t.charCodeAt(0);
                            i < 256 && (t = i)
                        }
                        if (void 0 !== r && "string" != typeof r) throw new TypeError("encoding must be a string");
                        if ("string" == typeof r && !c.isEncoding(r)) throw new TypeError("Unknown encoding: " + r)
                    } else "number" == typeof t && (t &= 255);
                    if (e < 0 || this.length < e || this.length < n) throw new RangeError("Out of range index");
                    if (n <= e) return this;
                    var o;
                    if (e >>>= 0, n = void 0 === n ? this.length : n >>> 0, t || (t = 0), "number" == typeof t)
                        for (o = e; o < n; ++o) this[o] = t;
                    else {
                        var s = c.isBuffer(t) ? t : N(new c(t, r).toString()),
                            a = s.length;
                        for (o = 0; o < n - e; ++o) this[o + e] = s[o % a]
                    }
                    return this
                };
                var $ = /[^+\/0-9A-Za-z-_]/g;

                function D(t) {
                    return t < 16 ? "0" + t.toString(16) : t.toString(16)
                }

                function N(t, e) {
                    var n;
                    e = e || 1 / 0;
                    for (var r = t.length, i = null, o = [], s = 0; s < r; ++s) {
                        if ((n = t.charCodeAt(s)) > 55295 && n < 57344) {
                            if (!i) {
                                if (n > 56319) {
                                    (e -= 3) > -1 && o.push(239, 191, 189);
                                    continue
                                }
                                if (s + 1 === r) {
                                    (e -= 3) > -1 && o.push(239, 191, 189);
                                    continue
                                }
                                i = n;
                                continue
                            }
                            if (n < 56320) {
                                (e -= 3) > -1 && o.push(239, 191, 189), i = n;
                                continue
                            }
                            n = 65536 + (i - 55296 << 10 | n - 56320)
                        } else i && (e -= 3) > -1 && o.push(239, 191, 189);
                        if (i = null, n < 128) {
                            if ((e -= 1) < 0) break;
                            o.push(n)
                        } else if (n < 2048) {
                            if ((e -= 2) < 0) break;
                            o.push(n >> 6 | 192, 63 & n | 128)
                        } else if (n < 65536) {
                            if ((e -= 3) < 0) break;
                            o.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128)
                        } else {
                            if (!(n < 1114112)) throw new Error("Invalid code point");
                            if ((e -= 4) < 0) break;
                            o.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128)
                        }
                    }
                    return o
                }

                function F(t) {
                    return r.toByteArray(function(t) {
                        if ((t = function(t) {
                                return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
                            }(t).replace($, "")).length < 2) return "";
                        for (; t.length % 4 != 0;) t += "=";
                        return t
                    }(t))
                }

                function Y(t, e, n, r) {
                    for (var i = 0; i < r && !(i + n >= e.length || i >= t.length); ++i) e[i + n] = t[i];
                    return i
                }
            },
            645: (t, e) => {
                e.read = function(t, e, n, r, i) {
                    var o, s, a = 8 * i - r - 1,
                        c = (1 << a) - 1,
                        u = c >> 1,
                        h = -7,
                        f = n ? i - 1 : 0,
                        l = n ? -1 : 1,
                        p = t[e + f];
                    for (f += l, o = p & (1 << -h) - 1, p >>= -h, h += a; h > 0; o = 256 * o + t[e + f], f += l, h -= 8);
                    for (s = o & (1 << -h) - 1, o >>= -h, h += r; h > 0; s = 256 * s + t[e + f], f += l, h -= 8);
                    if (0 === o) o = 1 - u;
                    else {
                        if (o === c) return s ? NaN : 1 / 0 * (p ? -1 : 1);
                        s += Math.pow(2, r), o -= u
                    }
                    return (p ? -1 : 1) * s * Math.pow(2, o - r)
                }, e.write = function(t, e, n, r, i, o) {
                    var s, a, c, u = 8 * o - i - 1,
                        h = (1 << u) - 1,
                        f = h >> 1,
                        l = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                        p = r ? 0 : o - 1,
                        d = r ? 1 : -1,
                        g = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
                    for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (a = isNaN(e) ? 1 : 0, s = h) : (s = Math.floor(Math.log(e) / Math.LN2), e * (c = Math.pow(2, -s)) < 1 && (s--, c *= 2), (e += s + f >= 1 ? l / c : l * Math.pow(2, 1 - f)) * c >= 2 && (s++, c /= 2), s + f >= h ? (a = 0, s = h) : s + f >= 1 ? (a = (e * c - 1) * Math.pow(2, i), s += f) : (a = e * Math.pow(2, f - 1) * Math.pow(2, i), s = 0)); i >= 8; t[n + p] = 255 & a, p += d, a /= 256, i -= 8);
                    for (s = s << i | a, u += i; u > 0; t[n + p] = 255 & s, p += d, s /= 256, u -= 8);
                    t[n + p - d] |= 128 * g
                }
            },
            5826: t => {
                var e = {}.toString;
                t.exports = Array.isArray || function(t) {
                    return "[object Array]" == e.call(t)
                }
            },
            6606: (t, e, n) => {
                var r, i = n(8764).Buffer;
                window, r = function() {
                    return function(t) {
                        var e = {};

                        function n(r) {
                            if (e[r]) return e[r].exports;
                            var i = e[r] = {
                                i: r,
                                l: !1,
                                exports: {}
                            };
                            return t[r].call(i.exports, i, i.exports, n), i.l = !0, i.exports
                        }
                        return n.m = t, n.c = e, n.d = function(t, e, r) {
                            n.o(t, e) || Object.defineProperty(t, e, {
                                enumerable: !0,
                                get: r
                            })
                        }, n.r = function(t) {
                            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                                value: "Module"
                            }), Object.defineProperty(t, "__esModule", {
                                value: !0
                            })
                        }, n.t = function(t, e) {
                            if (1 & e && (t = n(t)), 8 & e) return t;
                            if (4 & e && "object" == typeof t && t && t.__esModule) return t;
                            var r = Object.create(null);
                            if (n.r(r), Object.defineProperty(r, "default", {
                                    enumerable: !0,
                                    value: t
                                }), 2 & e && "string" != typeof t)
                                for (var i in t) n.d(r, i, function(e) {
                                    return t[e]
                                }.bind(null, i));
                            return r
                        }, n.n = function(t) {
                            var e = t && t.__esModule ? function() {
                                return t.default
                            } : function() {
                                return t
                            };
                            return n.d(e, "a", e), e
                        }, n.o = function(t, e) {
                            return Object.prototype.hasOwnProperty.call(t, e)
                        }, n.p = "", n(n.s = 2)
                    }([function(t, e, n) {
                        ! function(t) {
                            "use strict";
                            var e = function(t) {
                                    var e, n = new Float64Array(16);
                                    if (t)
                                        for (e = 0; e < t.length; e++) n[e] = t[e];
                                    return n
                                },
                                r = function() {
                                    throw new Error("no PRNG")
                                },
                                i = new Uint8Array(16),
                                o = new Uint8Array(32);
                            o[0] = 9;
                            var s = e(),
                                a = e([1]),
                                c = e([56129, 1]),
                                u = e([30883, 4953, 19914, 30187, 55467, 16705, 2637, 112, 59544, 30585, 16505, 36039, 65139, 11119, 27886, 20995]),
                                h = e([61785, 9906, 39828, 60374, 45398, 33411, 5274, 224, 53552, 61171, 33010, 6542, 64743, 22239, 55772, 9222]),
                                f = e([54554, 36645, 11616, 51542, 42930, 38181, 51040, 26924, 56412, 64982, 57905, 49316, 21502, 52590, 14035, 8553]),
                                l = e([26200, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214]),
                                p = e([41136, 18958, 6951, 50414, 58488, 44335, 6150, 12099, 55207, 15867, 153, 11085, 57099, 20417, 9344, 11139]);

                            function d(t, e, n, r) {
                                t[e] = n >> 24 & 255, t[e + 1] = n >> 16 & 255, t[e + 2] = n >> 8 & 255, t[e + 3] = 255 & n, t[e + 4] = r >> 24 & 255, t[e + 5] = r >> 16 & 255, t[e + 6] = r >> 8 & 255, t[e + 7] = 255 & r
                            }

                            function g(t, e, n, r, i) {
                                var o, s = 0;
                                for (o = 0; o < i; o++) s |= t[e + o] ^ n[r + o];
                                return (1 & s - 1 >>> 8) - 1
                            }

                            function y(t, e, n, r) {
                                return g(t, e, n, r, 16)
                            }

                            function m(t, e, n, r) {
                                return g(t, e, n, r, 32)
                            }

                            function b(t, e, n, r) {
                                ! function(t, e, n, r) {
                                    for (var i, o = 255 & r[0] | (255 & r[1]) << 8 | (255 & r[2]) << 16 | (255 & r[3]) << 24, s = 255 & n[0] | (255 & n[1]) << 8 | (255 & n[2]) << 16 | (255 & n[3]) << 24, a = 255 & n[4] | (255 & n[5]) << 8 | (255 & n[6]) << 16 | (255 & n[7]) << 24, c = 255 & n[8] | (255 & n[9]) << 8 | (255 & n[10]) << 16 | (255 & n[11]) << 24, u = 255 & n[12] | (255 & n[13]) << 8 | (255 & n[14]) << 16 | (255 & n[15]) << 24, h = 255 & r[4] | (255 & r[5]) << 8 | (255 & r[6]) << 16 | (255 & r[7]) << 24, f = 255 & e[0] | (255 & e[1]) << 8 | (255 & e[2]) << 16 | (255 & e[3]) << 24, l = 255 & e[4] | (255 & e[5]) << 8 | (255 & e[6]) << 16 | (255 & e[7]) << 24, p = 255 & e[8] | (255 & e[9]) << 8 | (255 & e[10]) << 16 | (255 & e[11]) << 24, d = 255 & e[12] | (255 & e[13]) << 8 | (255 & e[14]) << 16 | (255 & e[15]) << 24, g = 255 & r[8] | (255 & r[9]) << 8 | (255 & r[10]) << 16 | (255 & r[11]) << 24, y = 255 & n[16] | (255 & n[17]) << 8 | (255 & n[18]) << 16 | (255 & n[19]) << 24, m = 255 & n[20] | (255 & n[21]) << 8 | (255 & n[22]) << 16 | (255 & n[23]) << 24, b = 255 & n[24] | (255 & n[25]) << 8 | (255 & n[26]) << 16 | (255 & n[27]) << 24, k = 255 & n[28] | (255 & n[29]) << 8 | (255 & n[30]) << 16 | (255 & n[31]) << 24, v = 255 & r[12] | (255 & r[13]) << 8 | (255 & r[14]) << 16 | (255 & r[15]) << 24, w = o, _ = s, S = a, x = c, C = u, T = h, E = f, A = l, P = p, O = d, R = g, j = y, U = m, L = b, M = k, I = v, B = 0; B < 20; B += 2) w ^= (i = (U ^= (i = (P ^= (i = (C ^= (i = w + U | 0) << 7 | i >>> 25) + w | 0) << 9 | i >>> 23) + C | 0) << 13 | i >>> 19) + P | 0) << 18 | i >>> 14, T ^= (i = (_ ^= (i = (L ^= (i = (O ^= (i = T + _ | 0) << 7 | i >>> 25) + T | 0) << 9 | i >>> 23) + O | 0) << 13 | i >>> 19) + L | 0) << 18 | i >>> 14, R ^= (i = (E ^= (i = (S ^= (i = (M ^= (i = R + E | 0) << 7 | i >>> 25) + R | 0) << 9 | i >>> 23) + M | 0) << 13 | i >>> 19) + S | 0) << 18 | i >>> 14, I ^= (i = (j ^= (i = (A ^= (i = (x ^= (i = I + j | 0) << 7 | i >>> 25) + I | 0) << 9 | i >>> 23) + x | 0) << 13 | i >>> 19) + A | 0) << 18 | i >>> 14, w ^= (i = (x ^= (i = (S ^= (i = (_ ^= (i = w + x | 0) << 7 | i >>> 25) + w | 0) << 9 | i >>> 23) + _ | 0) << 13 | i >>> 19) + S | 0) << 18 | i >>> 14, T ^= (i = (C ^= (i = (A ^= (i = (E ^= (i = T + C | 0) << 7 | i >>> 25) + T | 0) << 9 | i >>> 23) + E | 0) << 13 | i >>> 19) + A | 0) << 18 | i >>> 14, R ^= (i = (O ^= (i = (P ^= (i = (j ^= (i = R + O | 0) << 7 | i >>> 25) + R | 0) << 9 | i >>> 23) + j | 0) << 13 | i >>> 19) + P | 0) << 18 | i >>> 14, I ^= (i = (M ^= (i = (L ^= (i = (U ^= (i = I + M | 0) << 7 | i >>> 25) + I | 0) << 9 | i >>> 23) + U | 0) << 13 | i >>> 19) + L | 0) << 18 | i >>> 14;
                                    w = w + o | 0, _ = _ + s | 0, S = S + a | 0, x = x + c | 0, C = C + u | 0, T = T + h | 0, E = E + f | 0, A = A + l | 0, P = P + p | 0, O = O + d | 0, R = R + g | 0, j = j + y | 0, U = U + m | 0, L = L + b | 0, M = M + k | 0, I = I + v | 0, t[0] = w >>> 0 & 255, t[1] = w >>> 8 & 255, t[2] = w >>> 16 & 255, t[3] = w >>> 24 & 255, t[4] = _ >>> 0 & 255, t[5] = _ >>> 8 & 255, t[6] = _ >>> 16 & 255, t[7] = _ >>> 24 & 255, t[8] = S >>> 0 & 255, t[9] = S >>> 8 & 255, t[10] = S >>> 16 & 255, t[11] = S >>> 24 & 255, t[12] = x >>> 0 & 255, t[13] = x >>> 8 & 255, t[14] = x >>> 16 & 255, t[15] = x >>> 24 & 255, t[16] = C >>> 0 & 255, t[17] = C >>> 8 & 255, t[18] = C >>> 16 & 255, t[19] = C >>> 24 & 255, t[20] = T >>> 0 & 255, t[21] = T >>> 8 & 255, t[22] = T >>> 16 & 255, t[23] = T >>> 24 & 255, t[24] = E >>> 0 & 255, t[25] = E >>> 8 & 255, t[26] = E >>> 16 & 255, t[27] = E >>> 24 & 255, t[28] = A >>> 0 & 255, t[29] = A >>> 8 & 255, t[30] = A >>> 16 & 255, t[31] = A >>> 24 & 255, t[32] = P >>> 0 & 255, t[33] = P >>> 8 & 255, t[34] = P >>> 16 & 255, t[35] = P >>> 24 & 255, t[36] = O >>> 0 & 255, t[37] = O >>> 8 & 255, t[38] = O >>> 16 & 255, t[39] = O >>> 24 & 255, t[40] = R >>> 0 & 255, t[41] = R >>> 8 & 255, t[42] = R >>> 16 & 255, t[43] = R >>> 24 & 255, t[44] = j >>> 0 & 255, t[45] = j >>> 8 & 255, t[46] = j >>> 16 & 255, t[47] = j >>> 24 & 255, t[48] = U >>> 0 & 255, t[49] = U >>> 8 & 255, t[50] = U >>> 16 & 255, t[51] = U >>> 24 & 255, t[52] = L >>> 0 & 255, t[53] = L >>> 8 & 255, t[54] = L >>> 16 & 255, t[55] = L >>> 24 & 255, t[56] = M >>> 0 & 255, t[57] = M >>> 8 & 255, t[58] = M >>> 16 & 255, t[59] = M >>> 24 & 255, t[60] = I >>> 0 & 255, t[61] = I >>> 8 & 255, t[62] = I >>> 16 & 255, t[63] = I >>> 24 & 255
                                }(t, e, n, r)
                            }

                            function k(t, e, n, r) {
                                ! function(t, e, n, r) {
                                    for (var i, o = 255 & r[0] | (255 & r[1]) << 8 | (255 & r[2]) << 16 | (255 & r[3]) << 24, s = 255 & n[0] | (255 & n[1]) << 8 | (255 & n[2]) << 16 | (255 & n[3]) << 24, a = 255 & n[4] | (255 & n[5]) << 8 | (255 & n[6]) << 16 | (255 & n[7]) << 24, c = 255 & n[8] | (255 & n[9]) << 8 | (255 & n[10]) << 16 | (255 & n[11]) << 24, u = 255 & n[12] | (255 & n[13]) << 8 | (255 & n[14]) << 16 | (255 & n[15]) << 24, h = 255 & r[4] | (255 & r[5]) << 8 | (255 & r[6]) << 16 | (255 & r[7]) << 24, f = 255 & e[0] | (255 & e[1]) << 8 | (255 & e[2]) << 16 | (255 & e[3]) << 24, l = 255 & e[4] | (255 & e[5]) << 8 | (255 & e[6]) << 16 | (255 & e[7]) << 24, p = 255 & e[8] | (255 & e[9]) << 8 | (255 & e[10]) << 16 | (255 & e[11]) << 24, d = 255 & e[12] | (255 & e[13]) << 8 | (255 & e[14]) << 16 | (255 & e[15]) << 24, g = 255 & r[8] | (255 & r[9]) << 8 | (255 & r[10]) << 16 | (255 & r[11]) << 24, y = 255 & n[16] | (255 & n[17]) << 8 | (255 & n[18]) << 16 | (255 & n[19]) << 24, m = 255 & n[20] | (255 & n[21]) << 8 | (255 & n[22]) << 16 | (255 & n[23]) << 24, b = 255 & n[24] | (255 & n[25]) << 8 | (255 & n[26]) << 16 | (255 & n[27]) << 24, k = 255 & n[28] | (255 & n[29]) << 8 | (255 & n[30]) << 16 | (255 & n[31]) << 24, v = 255 & r[12] | (255 & r[13]) << 8 | (255 & r[14]) << 16 | (255 & r[15]) << 24, w = 0; w < 20; w += 2) o ^= (i = (m ^= (i = (p ^= (i = (u ^= (i = o + m | 0) << 7 | i >>> 25) + o | 0) << 9 | i >>> 23) + u | 0) << 13 | i >>> 19) + p | 0) << 18 | i >>> 14, h ^= (i = (s ^= (i = (b ^= (i = (d ^= (i = h + s | 0) << 7 | i >>> 25) + h | 0) << 9 | i >>> 23) + d | 0) << 13 | i >>> 19) + b | 0) << 18 | i >>> 14, g ^= (i = (f ^= (i = (a ^= (i = (k ^= (i = g + f | 0) << 7 | i >>> 25) + g | 0) << 9 | i >>> 23) + k | 0) << 13 | i >>> 19) + a | 0) << 18 | i >>> 14, v ^= (i = (y ^= (i = (l ^= (i = (c ^= (i = v + y | 0) << 7 | i >>> 25) + v | 0) << 9 | i >>> 23) + c | 0) << 13 | i >>> 19) + l | 0) << 18 | i >>> 14, o ^= (i = (c ^= (i = (a ^= (i = (s ^= (i = o + c | 0) << 7 | i >>> 25) + o | 0) << 9 | i >>> 23) + s | 0) << 13 | i >>> 19) + a | 0) << 18 | i >>> 14, h ^= (i = (u ^= (i = (l ^= (i = (f ^= (i = h + u | 0) << 7 | i >>> 25) + h | 0) << 9 | i >>> 23) + f | 0) << 13 | i >>> 19) + l | 0) << 18 | i >>> 14, g ^= (i = (d ^= (i = (p ^= (i = (y ^= (i = g + d | 0) << 7 | i >>> 25) + g | 0) << 9 | i >>> 23) + y | 0) << 13 | i >>> 19) + p | 0) << 18 | i >>> 14, v ^= (i = (k ^= (i = (b ^= (i = (m ^= (i = v + k | 0) << 7 | i >>> 25) + v | 0) << 9 | i >>> 23) + m | 0) << 13 | i >>> 19) + b | 0) << 18 | i >>> 14;
                                    t[0] = o >>> 0 & 255, t[1] = o >>> 8 & 255, t[2] = o >>> 16 & 255, t[3] = o >>> 24 & 255, t[4] = h >>> 0 & 255, t[5] = h >>> 8 & 255, t[6] = h >>> 16 & 255, t[7] = h >>> 24 & 255, t[8] = g >>> 0 & 255, t[9] = g >>> 8 & 255, t[10] = g >>> 16 & 255, t[11] = g >>> 24 & 255, t[12] = v >>> 0 & 255, t[13] = v >>> 8 & 255, t[14] = v >>> 16 & 255, t[15] = v >>> 24 & 255, t[16] = f >>> 0 & 255, t[17] = f >>> 8 & 255, t[18] = f >>> 16 & 255, t[19] = f >>> 24 & 255, t[20] = l >>> 0 & 255, t[21] = l >>> 8 & 255, t[22] = l >>> 16 & 255, t[23] = l >>> 24 & 255, t[24] = p >>> 0 & 255, t[25] = p >>> 8 & 255, t[26] = p >>> 16 & 255, t[27] = p >>> 24 & 255, t[28] = d >>> 0 & 255, t[29] = d >>> 8 & 255, t[30] = d >>> 16 & 255, t[31] = d >>> 24 & 255
                                }(t, e, n, r)
                            }
                            var v = new Uint8Array([101, 120, 112, 97, 110, 100, 32, 51, 50, 45, 98, 121, 116, 101, 32, 107]);

                            function w(t, e, n, r, i, o, s) {
                                var a, c, u = new Uint8Array(16),
                                    h = new Uint8Array(64);
                                for (c = 0; c < 16; c++) u[c] = 0;
                                for (c = 0; c < 8; c++) u[c] = o[c];
                                for (; i >= 64;) {
                                    for (b(h, u, s, v), c = 0; c < 64; c++) t[e + c] = n[r + c] ^ h[c];
                                    for (a = 1, c = 8; c < 16; c++) a = a + (255 & u[c]) | 0, u[c] = 255 & a, a >>>= 8;
                                    i -= 64, e += 64, r += 64
                                }
                                if (i > 0)
                                    for (b(h, u, s, v), c = 0; c < i; c++) t[e + c] = n[r + c] ^ h[c];
                                return 0
                            }

                            function _(t, e, n, r, i) {
                                var o, s, a = new Uint8Array(16),
                                    c = new Uint8Array(64);
                                for (s = 0; s < 16; s++) a[s] = 0;
                                for (s = 0; s < 8; s++) a[s] = r[s];
                                for (; n >= 64;) {
                                    for (b(c, a, i, v), s = 0; s < 64; s++) t[e + s] = c[s];
                                    for (o = 1, s = 8; s < 16; s++) o = o + (255 & a[s]) | 0, a[s] = 255 & o, o >>>= 8;
                                    n -= 64, e += 64
                                }
                                if (n > 0)
                                    for (b(c, a, i, v), s = 0; s < n; s++) t[e + s] = c[s];
                                return 0
                            }

                            function S(t, e, n, r, i) {
                                var o = new Uint8Array(32);
                                k(o, r, i, v);
                                for (var s = new Uint8Array(8), a = 0; a < 8; a++) s[a] = r[a + 16];
                                return _(t, e, n, s, o)
                            }

                            function x(t, e, n, r, i, o, s) {
                                var a = new Uint8Array(32);
                                k(a, o, s, v);
                                for (var c = new Uint8Array(8), u = 0; u < 8; u++) c[u] = o[u + 16];
                                return w(t, e, n, r, i, c, a)
                            }
                            var C = function(t) {
                                var e, n, r, i, o, s, a, c;
                                this.buffer = new Uint8Array(16), this.r = new Uint16Array(10), this.h = new Uint16Array(10), this.pad = new Uint16Array(8), this.leftover = 0, this.fin = 0, e = 255 & t[0] | (255 & t[1]) << 8, this.r[0] = 8191 & e, n = 255 & t[2] | (255 & t[3]) << 8, this.r[1] = 8191 & (e >>> 13 | n << 3), r = 255 & t[4] | (255 & t[5]) << 8, this.r[2] = 7939 & (n >>> 10 | r << 6), i = 255 & t[6] | (255 & t[7]) << 8, this.r[3] = 8191 & (r >>> 7 | i << 9), o = 255 & t[8] | (255 & t[9]) << 8, this.r[4] = 255 & (i >>> 4 | o << 12), this.r[5] = o >>> 1 & 8190, s = 255 & t[10] | (255 & t[11]) << 8, this.r[6] = 8191 & (o >>> 14 | s << 2), a = 255 & t[12] | (255 & t[13]) << 8, this.r[7] = 8065 & (s >>> 11 | a << 5), c = 255 & t[14] | (255 & t[15]) << 8, this.r[8] = 8191 & (a >>> 8 | c << 8), this.r[9] = c >>> 5 & 127, this.pad[0] = 255 & t[16] | (255 & t[17]) << 8, this.pad[1] = 255 & t[18] | (255 & t[19]) << 8, this.pad[2] = 255 & t[20] | (255 & t[21]) << 8, this.pad[3] = 255 & t[22] | (255 & t[23]) << 8, this.pad[4] = 255 & t[24] | (255 & t[25]) << 8, this.pad[5] = 255 & t[26] | (255 & t[27]) << 8, this.pad[6] = 255 & t[28] | (255 & t[29]) << 8, this.pad[7] = 255 & t[30] | (255 & t[31]) << 8
                            };

                            function T(t, e, n, r, i, o) {
                                var s = new C(o);
                                return s.update(n, r, i), s.finish(t, e), 0
                            }

                            function E(t, e, n, r, i, o) {
                                var s = new Uint8Array(16);
                                return T(s, 0, n, r, i, o), y(t, e, s, 0)
                            }

                            function A(t, e, n, r, i) {
                                var o;
                                if (n < 32) return -1;
                                for (x(t, 0, e, 0, n, r, i), T(t, 16, t, 32, n - 32, t), o = 0; o < 16; o++) t[o] = 0;
                                return 0
                            }

                            function P(t, e, n, r, i) {
                                var o, s = new Uint8Array(32);
                                if (n < 32) return -1;
                                if (S(s, 0, 32, r, i), 0 !== E(e, 16, e, 32, n - 32, s)) return -1;
                                for (x(t, 0, e, 0, n, r, i), o = 0; o < 32; o++) t[o] = 0;
                                return 0
                            }

                            function O(t, e) {
                                var n;
                                for (n = 0; n < 16; n++) t[n] = 0 | e[n]
                            }

                            function R(t) {
                                var e, n, r = 1;
                                for (e = 0; e < 16; e++) n = t[e] + r + 65535, r = Math.floor(n / 65536), t[e] = n - 65536 * r;
                                t[0] += r - 1 + 37 * (r - 1)
                            }

                            function j(t, e, n) {
                                for (var r, i = ~(n - 1), o = 0; o < 16; o++) r = i & (t[o] ^ e[o]), t[o] ^= r, e[o] ^= r
                            }

                            function U(t, n) {
                                var r, i, o, s = e(),
                                    a = e();
                                for (r = 0; r < 16; r++) a[r] = n[r];
                                for (R(a), R(a), R(a), i = 0; i < 2; i++) {
                                    for (s[0] = a[0] - 65517, r = 1; r < 15; r++) s[r] = a[r] - 65535 - (s[r - 1] >> 16 & 1), s[r - 1] &= 65535;
                                    s[15] = a[15] - 32767 - (s[14] >> 16 & 1), o = s[15] >> 16 & 1, s[14] &= 65535, j(a, s, 1 - o)
                                }
                                for (r = 0; r < 16; r++) t[2 * r] = 255 & a[r], t[2 * r + 1] = a[r] >> 8
                            }

                            function L(t, e) {
                                var n = new Uint8Array(32),
                                    r = new Uint8Array(32);
                                return U(n, t), U(r, e), m(n, 0, r, 0)
                            }

                            function M(t) {
                                var e = new Uint8Array(32);
                                return U(e, t), 1 & e[0]
                            }

                            function I(t, e) {
                                var n;
                                for (n = 0; n < 16; n++) t[n] = e[2 * n] + (e[2 * n + 1] << 8);
                                t[15] &= 32767
                            }

                            function B(t, e, n) {
                                for (var r = 0; r < 16; r++) t[r] = e[r] + n[r]
                            }

                            function z(t, e, n) {
                                for (var r = 0; r < 16; r++) t[r] = e[r] - n[r]
                            }

                            function $(t, e, n) {
                                var r, i, o = 0,
                                    s = 0,
                                    a = 0,
                                    c = 0,
                                    u = 0,
                                    h = 0,
                                    f = 0,
                                    l = 0,
                                    p = 0,
                                    d = 0,
                                    g = 0,
                                    y = 0,
                                    m = 0,
                                    b = 0,
                                    k = 0,
                                    v = 0,
                                    w = 0,
                                    _ = 0,
                                    S = 0,
                                    x = 0,
                                    C = 0,
                                    T = 0,
                                    E = 0,
                                    A = 0,
                                    P = 0,
                                    O = 0,
                                    R = 0,
                                    j = 0,
                                    U = 0,
                                    L = 0,
                                    M = 0,
                                    I = n[0],
                                    B = n[1],
                                    z = n[2],
                                    $ = n[3],
                                    D = n[4],
                                    N = n[5],
                                    F = n[6],
                                    Y = n[7],
                                    H = n[8],
                                    q = n[9],
                                    J = n[10],
                                    X = n[11],
                                    W = n[12],
                                    K = n[13],
                                    G = n[14],
                                    V = n[15];
                                o += (r = e[0]) * I, s += r * B, a += r * z, c += r * $, u += r * D, h += r * N, f += r * F, l += r * Y, p += r * H, d += r * q, g += r * J, y += r * X, m += r * W, b += r * K, k += r * G, v += r * V, s += (r = e[1]) * I, a += r * B, c += r * z, u += r * $, h += r * D, f += r * N, l += r * F, p += r * Y, d += r * H, g += r * q, y += r * J, m += r * X, b += r * W, k += r * K, v += r * G, w += r * V, a += (r = e[2]) * I, c += r * B, u += r * z, h += r * $, f += r * D, l += r * N, p += r * F, d += r * Y, g += r * H, y += r * q, m += r * J, b += r * X, k += r * W, v += r * K, w += r * G, _ += r * V, c += (r = e[3]) * I, u += r * B, h += r * z, f += r * $, l += r * D, p += r * N, d += r * F, g += r * Y, y += r * H, m += r * q, b += r * J, k += r * X, v += r * W, w += r * K, _ += r * G, S += r * V, u += (r = e[4]) * I, h += r * B, f += r * z, l += r * $, p += r * D, d += r * N, g += r * F, y += r * Y, m += r * H, b += r * q, k += r * J, v += r * X, w += r * W, _ += r * K, S += r * G, x += r * V, h += (r = e[5]) * I, f += r * B, l += r * z, p += r * $, d += r * D, g += r * N, y += r * F, m += r * Y, b += r * H, k += r * q, v += r * J, w += r * X, _ += r * W, S += r * K, x += r * G, C += r * V, f += (r = e[6]) * I, l += r * B, p += r * z, d += r * $, g += r * D, y += r * N, m += r * F, b += r * Y, k += r * H, v += r * q, w += r * J, _ += r * X, S += r * W, x += r * K, C += r * G, T += r * V, l += (r = e[7]) * I, p += r * B, d += r * z, g += r * $, y += r * D, m += r * N, b += r * F, k += r * Y, v += r * H, w += r * q, _ += r * J, S += r * X, x += r * W, C += r * K, T += r * G, E += r * V, p += (r = e[8]) * I, d += r * B, g += r * z, y += r * $, m += r * D, b += r * N, k += r * F, v += r * Y, w += r * H, _ += r * q, S += r * J, x += r * X, C += r * W, T += r * K, E += r * G, A += r * V, d += (r = e[9]) * I, g += r * B, y += r * z, m += r * $, b += r * D, k += r * N, v += r * F, w += r * Y, _ += r * H, S += r * q, x += r * J, C += r * X, T += r * W, E += r * K, A += r * G, P += r * V, g += (r = e[10]) * I, y += r * B, m += r * z, b += r * $, k += r * D, v += r * N, w += r * F, _ += r * Y, S += r * H, x += r * q, C += r * J, T += r * X, E += r * W, A += r * K, P += r * G, O += r * V, y += (r = e[11]) * I, m += r * B, b += r * z, k += r * $, v += r * D, w += r * N, _ += r * F, S += r * Y, x += r * H, C += r * q, T += r * J, E += r * X, A += r * W, P += r * K, O += r * G, R += r * V, m += (r = e[12]) * I, b += r * B, k += r * z, v += r * $, w += r * D, _ += r * N, S += r * F, x += r * Y, C += r * H, T += r * q, E += r * J, A += r * X, P += r * W, O += r * K, R += r * G, j += r * V, b += (r = e[13]) * I, k += r * B, v += r * z, w += r * $, _ += r * D, S += r * N, x += r * F, C += r * Y, T += r * H, E += r * q, A += r * J, P += r * X, O += r * W, R += r * K, j += r * G, U += r * V, k += (r = e[14]) * I, v += r * B, w += r * z, _ += r * $, S += r * D, x += r * N, C += r * F, T += r * Y, E += r * H, A += r * q, P += r * J, O += r * X, R += r * W, j += r * K, U += r * G, L += r * V, v += (r = e[15]) * I, s += 38 * (_ += r * z), a += 38 * (S += r * $), c += 38 * (x += r * D), u += 38 * (C += r * N), h += 38 * (T += r * F), f += 38 * (E += r * Y), l += 38 * (A += r * H), p += 38 * (P += r * q), d += 38 * (O += r * J), g += 38 * (R += r * X), y += 38 * (j += r * W), m += 38 * (U += r * K), b += 38 * (L += r * G), k += 38 * (M += r * V), o = (r = (o += 38 * (w += r * B)) + (i = 1) + 65535) - 65536 * (i = Math.floor(r / 65536)), s = (r = s + i + 65535) - 65536 * (i = Math.floor(r / 65536)), a = (r = a + i + 65535) - 65536 * (i = Math.floor(r / 65536)), c = (r = c + i + 65535) - 65536 * (i = Math.floor(r / 65536)), u = (r = u + i + 65535) - 65536 * (i = Math.floor(r / 65536)), h = (r = h + i + 65535) - 65536 * (i = Math.floor(r / 65536)), f = (r = f + i + 65535) - 65536 * (i = Math.floor(r / 65536)), l = (r = l + i + 65535) - 65536 * (i = Math.floor(r / 65536)), p = (r = p + i + 65535) - 65536 * (i = Math.floor(r / 65536)), d = (r = d + i + 65535) - 65536 * (i = Math.floor(r / 65536)), g = (r = g + i + 65535) - 65536 * (i = Math.floor(r / 65536)), y = (r = y + i + 65535) - 65536 * (i = Math.floor(r / 65536)), m = (r = m + i + 65535) - 65536 * (i = Math.floor(r / 65536)), b = (r = b + i + 65535) - 65536 * (i = Math.floor(r / 65536)), k = (r = k + i + 65535) - 65536 * (i = Math.floor(r / 65536)), v = (r = v + i + 65535) - 65536 * (i = Math.floor(r / 65536)), o = (r = (o += i - 1 + 37 * (i - 1)) + (i = 1) + 65535) - 65536 * (i = Math.floor(r / 65536)), s = (r = s + i + 65535) - 65536 * (i = Math.floor(r / 65536)), a = (r = a + i + 65535) - 65536 * (i = Math.floor(r / 65536)), c = (r = c + i + 65535) - 65536 * (i = Math.floor(r / 65536)), u = (r = u + i + 65535) - 65536 * (i = Math.floor(r / 65536)), h = (r = h + i + 65535) - 65536 * (i = Math.floor(r / 65536)), f = (r = f + i + 65535) - 65536 * (i = Math.floor(r / 65536)), l = (r = l + i + 65535) - 65536 * (i = Math.floor(r / 65536)), p = (r = p + i + 65535) - 65536 * (i = Math.floor(r / 65536)), d = (r = d + i + 65535) - 65536 * (i = Math.floor(r / 65536)), g = (r = g + i + 65535) - 65536 * (i = Math.floor(r / 65536)), y = (r = y + i + 65535) - 65536 * (i = Math.floor(r / 65536)), m = (r = m + i + 65535) - 65536 * (i = Math.floor(r / 65536)), b = (r = b + i + 65535) - 65536 * (i = Math.floor(r / 65536)), k = (r = k + i + 65535) - 65536 * (i = Math.floor(r / 65536)), v = (r = v + i + 65535) - 65536 * (i = Math.floor(r / 65536)), o += i - 1 + 37 * (i - 1), t[0] = o, t[1] = s, t[2] = a, t[3] = c, t[4] = u, t[5] = h, t[6] = f, t[7] = l, t[8] = p, t[9] = d, t[10] = g, t[11] = y, t[12] = m, t[13] = b, t[14] = k, t[15] = v
                            }

                            function D(t, e) {
                                $(t, e, e)
                            }

                            function N(t, n) {
                                var r, i = e();
                                for (r = 0; r < 16; r++) i[r] = n[r];
                                for (r = 253; r >= 0; r--) D(i, i), 2 !== r && 4 !== r && $(i, i, n);
                                for (r = 0; r < 16; r++) t[r] = i[r]
                            }

                            function F(t, n) {
                                var r, i = e();
                                for (r = 0; r < 16; r++) i[r] = n[r];
                                for (r = 250; r >= 0; r--) D(i, i), 1 !== r && $(i, i, n);
                                for (r = 0; r < 16; r++) t[r] = i[r]
                            }

                            function Y(t, n, r) {
                                var i, o, s = new Uint8Array(32),
                                    a = new Float64Array(80),
                                    u = e(),
                                    h = e(),
                                    f = e(),
                                    l = e(),
                                    p = e(),
                                    d = e();
                                for (o = 0; o < 31; o++) s[o] = n[o];
                                for (s[31] = 127 & n[31] | 64, s[0] &= 248, I(a, r), o = 0; o < 16; o++) h[o] = a[o], l[o] = u[o] = f[o] = 0;
                                for (u[0] = l[0] = 1, o = 254; o >= 0; --o) j(u, h, i = s[o >>> 3] >>> (7 & o) & 1), j(f, l, i), B(p, u, f), z(u, u, f), B(f, h, l), z(h, h, l), D(l, p), D(d, u), $(u, f, u), $(f, h, p), B(p, u, f), z(u, u, f), D(h, u), z(f, l, d), $(u, f, c), B(u, u, l), $(f, f, u), $(u, l, d), $(l, h, a), D(h, p), j(u, h, i), j(f, l, i);
                                for (o = 0; o < 16; o++) a[o + 16] = u[o], a[o + 32] = f[o], a[o + 48] = h[o], a[o + 64] = l[o];
                                var g = a.subarray(32),
                                    y = a.subarray(16);
                                return N(g, g), $(y, y, g), U(t, y), 0
                            }

                            function H(t, e) {
                                return Y(t, e, o)
                            }

                            function q(t, e) {
                                return r(e, 32), H(t, e)
                            }

                            function J(t, e, n) {
                                var r = new Uint8Array(32);
                                return Y(r, n, e), k(t, i, r, v)
                            }
                            C.prototype.blocks = function(t, e, n) {
                                for (var r, i, o, s, a, c, u, h, f, l, p, d, g, y, m, b, k, v, w, _ = this.fin ? 0 : 2048, S = this.h[0], x = this.h[1], C = this.h[2], T = this.h[3], E = this.h[4], A = this.h[5], P = this.h[6], O = this.h[7], R = this.h[8], j = this.h[9], U = this.r[0], L = this.r[1], M = this.r[2], I = this.r[3], B = this.r[4], z = this.r[5], $ = this.r[6], D = this.r[7], N = this.r[8], F = this.r[9]; n >= 16;) l = f = 0, l += (S += 8191 & (r = 255 & t[e + 0] | (255 & t[e + 1]) << 8)) * U, l += (x += 8191 & (r >>> 13 | (i = 255 & t[e + 2] | (255 & t[e + 3]) << 8) << 3)) * (5 * F), l += (C += 8191 & (i >>> 10 | (o = 255 & t[e + 4] | (255 & t[e + 5]) << 8) << 6)) * (5 * N), l += (T += 8191 & (o >>> 7 | (s = 255 & t[e + 6] | (255 & t[e + 7]) << 8) << 9)) * (5 * D), f = (l += (E += 8191 & (s >>> 4 | (a = 255 & t[e + 8] | (255 & t[e + 9]) << 8) << 12)) * (5 * $)) >>> 13, l &= 8191, l += (A += a >>> 1 & 8191) * (5 * z), l += (P += 8191 & (a >>> 14 | (c = 255 & t[e + 10] | (255 & t[e + 11]) << 8) << 2)) * (5 * B), l += (O += 8191 & (c >>> 11 | (u = 255 & t[e + 12] | (255 & t[e + 13]) << 8) << 5)) * (5 * I), l += (R += 8191 & (u >>> 8 | (h = 255 & t[e + 14] | (255 & t[e + 15]) << 8) << 8)) * (5 * M), p = f += (l += (j += h >>> 5 | _) * (5 * L)) >>> 13, p += S * L, p += x * U, p += C * (5 * F), p += T * (5 * N), f = (p += E * (5 * D)) >>> 13, p &= 8191, p += A * (5 * $), p += P * (5 * z), p += O * (5 * B), p += R * (5 * I), f += (p += j * (5 * M)) >>> 13, p &= 8191, d = f, d += S * M, d += x * L, d += C * U, d += T * (5 * F), f = (d += E * (5 * N)) >>> 13, d &= 8191, d += A * (5 * D), d += P * (5 * $), d += O * (5 * z), d += R * (5 * B), g = f += (d += j * (5 * I)) >>> 13, g += S * I, g += x * M, g += C * L, g += T * U, f = (g += E * (5 * F)) >>> 13, g &= 8191, g += A * (5 * N), g += P * (5 * D), g += O * (5 * $), g += R * (5 * z), y = f += (g += j * (5 * B)) >>> 13, y += S * B, y += x * I, y += C * M, y += T * L, f = (y += E * U) >>> 13, y &= 8191, y += A * (5 * F), y += P * (5 * N), y += O * (5 * D), y += R * (5 * $), m = f += (y += j * (5 * z)) >>> 13, m += S * z, m += x * B, m += C * I, m += T * M, f = (m += E * L) >>> 13, m &= 8191, m += A * U, m += P * (5 * F), m += O * (5 * N), m += R * (5 * D), b = f += (m += j * (5 * $)) >>> 13, b += S * $, b += x * z, b += C * B, b += T * I, f = (b += E * M) >>> 13, b &= 8191, b += A * L, b += P * U, b += O * (5 * F), b += R * (5 * N), k = f += (b += j * (5 * D)) >>> 13, k += S * D, k += x * $, k += C * z, k += T * B, f = (k += E * I) >>> 13, k &= 8191, k += A * M, k += P * L, k += O * U, k += R * (5 * F), v = f += (k += j * (5 * N)) >>> 13, v += S * N, v += x * D, v += C * $, v += T * z, f = (v += E * B) >>> 13, v &= 8191, v += A * I, v += P * M, v += O * L, v += R * U, w = f += (v += j * (5 * F)) >>> 13, w += S * F, w += x * N, w += C * D, w += T * $, f = (w += E * z) >>> 13, w &= 8191, w += A * B, w += P * I, w += O * M, w += R * L, S = l = 8191 & (f = (f = ((f += (w += j * U) >>> 13) << 2) + f | 0) + (l &= 8191) | 0), x = p += f >>>= 13, C = d &= 8191, T = g &= 8191, E = y &= 8191, A = m &= 8191, P = b &= 8191, O = k &= 8191, R = v &= 8191, j = w &= 8191, e += 16, n -= 16;
                                this.h[0] = S, this.h[1] = x, this.h[2] = C, this.h[3] = T, this.h[4] = E, this.h[5] = A, this.h[6] = P, this.h[7] = O, this.h[8] = R, this.h[9] = j
                            }, C.prototype.finish = function(t, e) {
                                var n, r, i, o, s = new Uint16Array(10);
                                if (this.leftover) {
                                    for (o = this.leftover, this.buffer[o++] = 1; o < 16; o++) this.buffer[o] = 0;
                                    this.fin = 1, this.blocks(this.buffer, 0, 16)
                                }
                                for (n = this.h[1] >>> 13, this.h[1] &= 8191, o = 2; o < 10; o++) this.h[o] += n, n = this.h[o] >>> 13, this.h[o] &= 8191;
                                for (this.h[0] += 5 * n, n = this.h[0] >>> 13, this.h[0] &= 8191, this.h[1] += n, n = this.h[1] >>> 13, this.h[1] &= 8191, this.h[2] += n, s[0] = this.h[0] + 5, n = s[0] >>> 13, s[0] &= 8191, o = 1; o < 10; o++) s[o] = this.h[o] + n, n = s[o] >>> 13, s[o] &= 8191;
                                for (s[9] -= 8192, r = (1 ^ n) - 1, o = 0; o < 10; o++) s[o] &= r;
                                for (r = ~r, o = 0; o < 10; o++) this.h[o] = this.h[o] & r | s[o];
                                for (this.h[0] = 65535 & (this.h[0] | this.h[1] << 13), this.h[1] = 65535 & (this.h[1] >>> 3 | this.h[2] << 10), this.h[2] = 65535 & (this.h[2] >>> 6 | this.h[3] << 7), this.h[3] = 65535 & (this.h[3] >>> 9 | this.h[4] << 4), this.h[4] = 65535 & (this.h[4] >>> 12 | this.h[5] << 1 | this.h[6] << 14), this.h[5] = 65535 & (this.h[6] >>> 2 | this.h[7] << 11), this.h[6] = 65535 & (this.h[7] >>> 5 | this.h[8] << 8), this.h[7] = 65535 & (this.h[8] >>> 8 | this.h[9] << 5), i = this.h[0] + this.pad[0], this.h[0] = 65535 & i, o = 1; o < 8; o++) i = (this.h[o] + this.pad[o] | 0) + (i >>> 16) | 0, this.h[o] = 65535 & i;
                                t[e + 0] = this.h[0] >>> 0 & 255, t[e + 1] = this.h[0] >>> 8 & 255, t[e + 2] = this.h[1] >>> 0 & 255, t[e + 3] = this.h[1] >>> 8 & 255, t[e + 4] = this.h[2] >>> 0 & 255, t[e + 5] = this.h[2] >>> 8 & 255, t[e + 6] = this.h[3] >>> 0 & 255, t[e + 7] = this.h[3] >>> 8 & 255, t[e + 8] = this.h[4] >>> 0 & 255, t[e + 9] = this.h[4] >>> 8 & 255, t[e + 10] = this.h[5] >>> 0 & 255, t[e + 11] = this.h[5] >>> 8 & 255, t[e + 12] = this.h[6] >>> 0 & 255, t[e + 13] = this.h[6] >>> 8 & 255, t[e + 14] = this.h[7] >>> 0 & 255, t[e + 15] = this.h[7] >>> 8 & 255
                            }, C.prototype.update = function(t, e, n) {
                                var r, i;
                                if (this.leftover) {
                                    for ((i = 16 - this.leftover) > n && (i = n), r = 0; r < i; r++) this.buffer[this.leftover + r] = t[e + r];
                                    if (n -= i, e += i, this.leftover += i, this.leftover < 16) return;
                                    this.blocks(this.buffer, 0, 16), this.leftover = 0
                                }
                                if (n >= 16 && (i = n - n % 16, this.blocks(t, e, i), e += i, n -= i), n) {
                                    for (r = 0; r < n; r++) this.buffer[this.leftover + r] = t[e + r];
                                    this.leftover += n
                                }
                            };
                            var X = A,
                                W = P,
                                K = [1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591];

                            function G(t, e, n, r) {
                                for (var i, o, s, a, c, u, h, f, l, p, d, g, y, m, b, k, v, w, _, S, x, C, T, E, A, P, O = new Int32Array(16), R = new Int32Array(16), j = t[0], U = t[1], L = t[2], M = t[3], I = t[4], B = t[5], z = t[6], $ = t[7], D = e[0], N = e[1], F = e[2], Y = e[3], H = e[4], q = e[5], J = e[6], X = e[7], W = 0; r >= 128;) {
                                    for (_ = 0; _ < 16; _++) S = 8 * _ + W, O[_] = n[S + 0] << 24 | n[S + 1] << 16 | n[S + 2] << 8 | n[S + 3], R[_] = n[S + 4] << 24 | n[S + 5] << 16 | n[S + 6] << 8 | n[S + 7];
                                    for (_ = 0; _ < 80; _++)
                                        if (i = j, o = U, s = L, a = M, c = I, u = B, h = z, l = D, p = N, d = F, g = Y, y = H, m = q, b = J, T = 65535 & (C = X), E = C >>> 16, A = 65535 & (x = $), P = x >>> 16, T += 65535 & (C = (H >>> 14 | I << 18) ^ (H >>> 18 | I << 14) ^ (I >>> 9 | H << 23)), E += C >>> 16, A += 65535 & (x = (I >>> 14 | H << 18) ^ (I >>> 18 | H << 14) ^ (H >>> 9 | I << 23)), P += x >>> 16, T += 65535 & (C = H & q ^ ~H & J), E += C >>> 16, A += 65535 & (x = I & B ^ ~I & z), P += x >>> 16, T += 65535 & (C = K[2 * _ + 1]), E += C >>> 16, A += 65535 & (x = K[2 * _]), P += x >>> 16, x = O[_ % 16], E += (C = R[_ % 16]) >>> 16, A += 65535 & x, P += x >>> 16, A += (E += (T += 65535 & C) >>> 16) >>> 16, T = 65535 & (C = w = 65535 & T | E << 16), E = C >>> 16, A = 65535 & (x = v = 65535 & A | (P += A >>> 16) << 16), P = x >>> 16, T += 65535 & (C = (D >>> 28 | j << 4) ^ (j >>> 2 | D << 30) ^ (j >>> 7 | D << 25)), E += C >>> 16, A += 65535 & (x = (j >>> 28 | D << 4) ^ (D >>> 2 | j << 30) ^ (D >>> 7 | j << 25)), P += x >>> 16, E += (C = D & N ^ D & F ^ N & F) >>> 16, A += 65535 & (x = j & U ^ j & L ^ U & L), P += x >>> 16, f = 65535 & (A += (E += (T += 65535 & C) >>> 16) >>> 16) | (P += A >>> 16) << 16, k = 65535 & T | E << 16, T = 65535 & (C = g), E = C >>> 16, A = 65535 & (x = a), P = x >>> 16, E += (C = w) >>> 16, A += 65535 & (x = v), P += x >>> 16, U = i, L = o, M = s, I = a = 65535 & (A += (E += (T += 65535 & C) >>> 16) >>> 16) | (P += A >>> 16) << 16, B = c, z = u, $ = h, j = f, N = l, F = p, Y = d, H = g = 65535 & T | E << 16, q = y, J = m, X = b, D = k, _ % 16 == 15)
                                            for (S = 0; S < 16; S++) x = O[S], T = 65535 & (C = R[S]), E = C >>> 16, A = 65535 & x, P = x >>> 16, x = O[(S + 9) % 16], T += 65535 & (C = R[(S + 9) % 16]), E += C >>> 16, A += 65535 & x, P += x >>> 16, v = O[(S + 1) % 16], T += 65535 & (C = ((w = R[(S + 1) % 16]) >>> 1 | v << 31) ^ (w >>> 8 | v << 24) ^ (w >>> 7 | v << 25)), E += C >>> 16, A += 65535 & (x = (v >>> 1 | w << 31) ^ (v >>> 8 | w << 24) ^ v >>> 7), P += x >>> 16, v = O[(S + 14) % 16], E += (C = ((w = R[(S + 14) % 16]) >>> 19 | v << 13) ^ (v >>> 29 | w << 3) ^ (w >>> 6 | v << 26)) >>> 16, A += 65535 & (x = (v >>> 19 | w << 13) ^ (w >>> 29 | v << 3) ^ v >>> 6), P += x >>> 16, P += (A += (E += (T += 65535 & C) >>> 16) >>> 16) >>> 16, O[S] = 65535 & A | P << 16, R[S] = 65535 & T | E << 16;
                                    T = 65535 & (C = D), E = C >>> 16, A = 65535 & (x = j), P = x >>> 16, x = t[0], E += (C = e[0]) >>> 16, A += 65535 & x, P += x >>> 16, P += (A += (E += (T += 65535 & C) >>> 16) >>> 16) >>> 16, t[0] = j = 65535 & A | P << 16, e[0] = D = 65535 & T | E << 16, T = 65535 & (C = N), E = C >>> 16, A = 65535 & (x = U), P = x >>> 16, x = t[1], E += (C = e[1]) >>> 16, A += 65535 & x, P += x >>> 16, P += (A += (E += (T += 65535 & C) >>> 16) >>> 16) >>> 16, t[1] = U = 65535 & A | P << 16, e[1] = N = 65535 & T | E << 16, T = 65535 & (C = F), E = C >>> 16, A = 65535 & (x = L), P = x >>> 16, x = t[2], E += (C = e[2]) >>> 16, A += 65535 & x, P += x >>> 16, P += (A += (E += (T += 65535 & C) >>> 16) >>> 16) >>> 16, t[2] = L = 65535 & A | P << 16, e[2] = F = 65535 & T | E << 16, T = 65535 & (C = Y), E = C >>> 16, A = 65535 & (x = M), P = x >>> 16, x = t[3], E += (C = e[3]) >>> 16, A += 65535 & x, P += x >>> 16, P += (A += (E += (T += 65535 & C) >>> 16) >>> 16) >>> 16, t[3] = M = 65535 & A | P << 16, e[3] = Y = 65535 & T | E << 16, T = 65535 & (C = H), E = C >>> 16, A = 65535 & (x = I), P = x >>> 16, x = t[4], E += (C = e[4]) >>> 16, A += 65535 & x, P += x >>> 16, P += (A += (E += (T += 65535 & C) >>> 16) >>> 16) >>> 16, t[4] = I = 65535 & A | P << 16, e[4] = H = 65535 & T | E << 16, T = 65535 & (C = q), E = C >>> 16, A = 65535 & (x = B), P = x >>> 16, x = t[5], E += (C = e[5]) >>> 16, A += 65535 & x, P += x >>> 16, P += (A += (E += (T += 65535 & C) >>> 16) >>> 16) >>> 16, t[5] = B = 65535 & A | P << 16, e[5] = q = 65535 & T | E << 16, T = 65535 & (C = J), E = C >>> 16, A = 65535 & (x = z), P = x >>> 16, x = t[6], E += (C = e[6]) >>> 16, A += 65535 & x, P += x >>> 16, P += (A += (E += (T += 65535 & C) >>> 16) >>> 16) >>> 16, t[6] = z = 65535 & A | P << 16, e[6] = J = 65535 & T | E << 16, T = 65535 & (C = X), E = C >>> 16, A = 65535 & (x = $), P = x >>> 16, x = t[7], E += (C = e[7]) >>> 16, A += 65535 & x, P += x >>> 16, P += (A += (E += (T += 65535 & C) >>> 16) >>> 16) >>> 16, t[7] = $ = 65535 & A | P << 16, e[7] = X = 65535 & T | E << 16, W += 128, r -= 128
                                }
                                return r
                            }

                            function V(t, e, n) {
                                var r, i = new Int32Array(8),
                                    o = new Int32Array(8),
                                    s = new Uint8Array(256),
                                    a = n;
                                for (i[0] = 1779033703, i[1] = 3144134277, i[2] = 1013904242, i[3] = 2773480762, i[4] = 1359893119, i[5] = 2600822924, i[6] = 528734635, i[7] = 1541459225, o[0] = 4089235720, o[1] = 2227873595, o[2] = 4271175723, o[3] = 1595750129, o[4] = 2917565137, o[5] = 725511199, o[6] = 4215389547, o[7] = 327033209, G(i, o, e, n), n %= 128, r = 0; r < n; r++) s[r] = e[a - n + r];
                                for (s[n] = 128, s[(n = 256 - 128 * (n < 112 ? 1 : 0)) - 9] = 0, d(s, n - 8, a / 536870912 | 0, a << 3), G(i, o, s, n), r = 0; r < 8; r++) d(t, 8 * r, i[r], o[r]);
                                return 0
                            }

                            function Z(t, n) {
                                var r = e(),
                                    i = e(),
                                    o = e(),
                                    s = e(),
                                    a = e(),
                                    c = e(),
                                    u = e(),
                                    f = e(),
                                    l = e();
                                z(r, t[1], t[0]), z(l, n[1], n[0]), $(r, r, l), B(i, t[0], t[1]), B(l, n[0], n[1]), $(i, i, l), $(o, t[3], n[3]), $(o, o, h), $(s, t[2], n[2]), B(s, s, s), z(a, i, r), z(c, s, o), B(u, s, o), B(f, i, r), $(t[0], a, c), $(t[1], f, u), $(t[2], u, c), $(t[3], a, f)
                            }

                            function Q(t, e, n) {
                                var r;
                                for (r = 0; r < 4; r++) j(t[r], e[r], n)
                            }

                            function tt(t, n) {
                                var r = e(),
                                    i = e(),
                                    o = e();
                                N(o, n[2]), $(r, n[0], o), $(i, n[1], o), U(t, i), t[31] ^= M(r) << 7
                            }

                            function et(t, e, n) {
                                var r, i;
                                for (O(t[0], s), O(t[1], a), O(t[2], a), O(t[3], s), i = 255; i >= 0; --i) Q(t, e, r = n[i / 8 | 0] >> (7 & i) & 1), Z(e, t), Z(t, t), Q(t, e, r)
                            }

                            function nt(t, n) {
                                var r = [e(), e(), e(), e()];
                                O(r[0], f), O(r[1], l), O(r[2], a), $(r[3], f, l), et(t, r, n)
                            }

                            function rt(t, n, i) {
                                var o, s = new Uint8Array(64),
                                    a = [e(), e(), e(), e()];
                                for (i || r(n, 32), V(s, n, 32), s[0] &= 248, s[31] &= 127, s[31] |= 64, nt(a, s), tt(t, a), o = 0; o < 32; o++) n[o + 32] = t[o];
                                return 0
                            }
                            var it = new Float64Array([237, 211, 245, 92, 26, 99, 18, 88, 214, 156, 247, 162, 222, 249, 222, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16]);

                            function ot(t, e) {
                                var n, r, i, o;
                                for (r = 63; r >= 32; --r) {
                                    for (n = 0, i = r - 32, o = r - 12; i < o; ++i) e[i] += n - 16 * e[r] * it[i - (r - 32)], n = e[i] + 128 >> 8, e[i] -= 256 * n;
                                    e[i] += n, e[r] = 0
                                }
                                for (n = 0, i = 0; i < 32; i++) e[i] += n - (e[31] >> 4) * it[i], n = e[i] >> 8, e[i] &= 255;
                                for (i = 0; i < 32; i++) e[i] -= n * it[i];
                                for (r = 0; r < 32; r++) e[r + 1] += e[r] >> 8, t[r] = 255 & e[r]
                            }

                            function st(t) {
                                var e, n = new Float64Array(64);
                                for (e = 0; e < 64; e++) n[e] = t[e];
                                for (e = 0; e < 64; e++) t[e] = 0;
                                ot(t, n)
                            }

                            function at(t, n, r, i) {
                                var o, s, a = new Uint8Array(64),
                                    c = new Uint8Array(64),
                                    u = new Uint8Array(64),
                                    h = new Float64Array(64),
                                    f = [e(), e(), e(), e()];
                                V(a, i, 32), a[0] &= 248, a[31] &= 127, a[31] |= 64;
                                var l = r + 64;
                                for (o = 0; o < r; o++) t[64 + o] = n[o];
                                for (o = 0; o < 32; o++) t[32 + o] = a[32 + o];
                                for (V(u, t.subarray(32), r + 32), st(u), nt(f, u), tt(t, f), o = 32; o < 64; o++) t[o] = i[o];
                                for (V(c, t, r + 64), st(c), o = 0; o < 64; o++) h[o] = 0;
                                for (o = 0; o < 32; o++) h[o] = u[o];
                                for (o = 0; o < 32; o++)
                                    for (s = 0; s < 32; s++) h[o + s] += c[o] * a[s];
                                return ot(t.subarray(32), h), l
                            }

                            function ct(t, n, r, i) {
                                var o, c = new Uint8Array(32),
                                    h = new Uint8Array(64),
                                    f = [e(), e(), e(), e()],
                                    l = [e(), e(), e(), e()];
                                if (r < 64) return -1;
                                if (function(t, n) {
                                        var r = e(),
                                            i = e(),
                                            o = e(),
                                            c = e(),
                                            h = e(),
                                            f = e(),
                                            l = e();
                                        return O(t[2], a), I(t[1], n), D(o, t[1]), $(c, o, u), z(o, o, t[2]), B(c, t[2], c), D(h, c), D(f, h), $(l, f, h), $(r, l, o), $(r, r, c), F(r, r), $(r, r, o), $(r, r, c), $(r, r, c), $(t[0], r, c), D(i, t[0]), $(i, i, c), L(i, o) && $(t[0], t[0], p), D(i, t[0]), $(i, i, c), L(i, o) ? -1 : (M(t[0]) === n[31] >> 7 && z(t[0], s, t[0]), $(t[3], t[0], t[1]), 0)
                                    }(l, i)) return -1;
                                for (o = 0; o < r; o++) t[o] = n[o];
                                for (o = 0; o < 32; o++) t[o + 32] = i[o];
                                if (V(h, t, r), st(h), et(f, l, h), nt(l, n.subarray(32)), Z(f, l), tt(c, f), r -= 64, m(n, 0, c, 0)) {
                                    for (o = 0; o < r; o++) t[o] = 0;
                                    return -1
                                }
                                for (o = 0; o < r; o++) t[o] = n[o + 64];
                                return r
                            }
                            var ut, ht = 16,
                                ft = 64,
                                lt = 32,
                                pt = 64;

                            function dt(t, e) {
                                if (32 !== t.length) throw new Error("bad key size");
                                if (24 !== e.length) throw new Error("bad nonce size")
                            }

                            function gt() {
                                for (var t = 0; t < arguments.length; t++)
                                    if (!(arguments[t] instanceof Uint8Array)) throw new TypeError("unexpected type, use Uint8Array")
                            }

                            function yt(t) {
                                for (var e = 0; e < t.length; e++) t[e] = 0
                            }
                            t.lowlevel = {
                                crypto_core_hsalsa20: k,
                                crypto_stream_xor: x,
                                crypto_stream: S,
                                crypto_stream_salsa20_xor: w,
                                crypto_stream_salsa20: _,
                                crypto_onetimeauth: T,
                                crypto_onetimeauth_verify: E,
                                crypto_verify_16: y,
                                crypto_verify_32: m,
                                crypto_secretbox: A,
                                crypto_secretbox_open: P,
                                crypto_scalarmult: Y,
                                crypto_scalarmult_base: H,
                                crypto_box_beforenm: J,
                                crypto_box_afternm: X,
                                crypto_box: function(t, e, n, r, i, o) {
                                    var s = new Uint8Array(32);
                                    return J(s, i, o), X(t, e, n, r, s)
                                },
                                crypto_box_open: function(t, e, n, r, i, o) {
                                    var s = new Uint8Array(32);
                                    return J(s, i, o), W(t, e, n, r, s)
                                },
                                crypto_box_keypair: q,
                                crypto_hash: V,
                                crypto_sign: at,
                                crypto_sign_keypair: rt,
                                crypto_sign_open: ct,
                                crypto_secretbox_KEYBYTES: 32,
                                crypto_secretbox_NONCEBYTES: 24,
                                crypto_secretbox_ZEROBYTES: 32,
                                crypto_secretbox_BOXZEROBYTES: ht,
                                crypto_scalarmult_BYTES: 32,
                                crypto_scalarmult_SCALARBYTES: 32,
                                crypto_box_PUBLICKEYBYTES: 32,
                                crypto_box_SECRETKEYBYTES: 32,
                                crypto_box_BEFORENMBYTES: 32,
                                crypto_box_NONCEBYTES: 24,
                                crypto_box_ZEROBYTES: 32,
                                crypto_box_BOXZEROBYTES: 16,
                                crypto_sign_BYTES: ft,
                                crypto_sign_PUBLICKEYBYTES: lt,
                                crypto_sign_SECRETKEYBYTES: pt,
                                crypto_sign_SEEDBYTES: 32,
                                crypto_hash_BYTES: 64,
                                gf: e,
                                D: u,
                                L: it,
                                pack25519: U,
                                unpack25519: I,
                                M: $,
                                A: B,
                                S: D,
                                Z: z,
                                pow2523: F,
                                add: Z,
                                set25519: O,
                                modL: ot,
                                scalarmult: et,
                                scalarbase: nt
                            }, t.randomBytes = function(t) {
                                var e = new Uint8Array(t);
                                return r(e, t), e
                            }, t.secretbox = function(t, e, n) {
                                gt(t, e, n), dt(n, e);
                                for (var r = new Uint8Array(32 + t.length), i = new Uint8Array(r.length), o = 0; o < t.length; o++) r[o + 32] = t[o];
                                return A(i, r, r.length, e, n), i.subarray(ht)
                            }, t.secretbox.open = function(t, e, n) {
                                gt(t, e, n), dt(n, e);
                                for (var r = new Uint8Array(ht + t.length), i = new Uint8Array(r.length), o = 0; o < t.length; o++) r[o + ht] = t[o];
                                return r.length < 32 || 0 !== P(i, r, r.length, e, n) ? null : i.subarray(32)
                            }, t.secretbox.keyLength = 32, t.secretbox.nonceLength = 24, t.secretbox.overheadLength = ht, t.scalarMult = function(t, e) {
                                if (gt(t, e), 32 !== t.length) throw new Error("bad n size");
                                if (32 !== e.length) throw new Error("bad p size");
                                var n = new Uint8Array(32);
                                return Y(n, t, e), n
                            }, t.scalarMult.base = function(t) {
                                if (gt(t), 32 !== t.length) throw new Error("bad n size");
                                var e = new Uint8Array(32);
                                return H(e, t), e
                            }, t.scalarMult.scalarLength = 32, t.scalarMult.groupElementLength = 32, t.box = function(e, n, r, i) {
                                var o = t.box.before(r, i);
                                return t.secretbox(e, n, o)
                            }, t.box.before = function(t, e) {
                                gt(t, e),
                                    function(t, e) {
                                        if (32 !== t.length) throw new Error("bad public key size");
                                        if (32 !== e.length) throw new Error("bad secret key size")
                                    }(t, e);
                                var n = new Uint8Array(32);
                                return J(n, t, e), n
                            }, t.box.after = t.secretbox, t.box.open = function(e, n, r, i) {
                                var o = t.box.before(r, i);
                                return t.secretbox.open(e, n, o)
                            }, t.box.open.after = t.secretbox.open, t.box.keyPair = function() {
                                var t = new Uint8Array(32),
                                    e = new Uint8Array(32);
                                return q(t, e), {
                                    publicKey: t,
                                    secretKey: e
                                }
                            }, t.box.keyPair.fromSecretKey = function(t) {
                                if (gt(t), 32 !== t.length) throw new Error("bad secret key size");
                                var e = new Uint8Array(32);
                                return H(e, t), {
                                    publicKey: e,
                                    secretKey: new Uint8Array(t)
                                }
                            }, t.box.publicKeyLength = 32, t.box.secretKeyLength = 32, t.box.sharedKeyLength = 32, t.box.nonceLength = 24, t.box.overheadLength = t.secretbox.overheadLength, t.sign = function(t, e) {
                                if (gt(t, e), e.length !== pt) throw new Error("bad secret key size");
                                var n = new Uint8Array(ft + t.length);
                                return at(n, t, t.length, e), n
                            }, t.sign.open = function(t, e) {
                                if (gt(t, e), e.length !== lt) throw new Error("bad public key size");
                                var n = new Uint8Array(t.length),
                                    r = ct(n, t, t.length, e);
                                if (r < 0) return null;
                                for (var i = new Uint8Array(r), o = 0; o < i.length; o++) i[o] = n[o];
                                return i
                            }, t.sign.detached = function(e, n) {
                                for (var r = t.sign(e, n), i = new Uint8Array(ft), o = 0; o < i.length; o++) i[o] = r[o];
                                return i
                            }, t.sign.detached.verify = function(t, e, n) {
                                if (gt(t, e, n), e.length !== ft) throw new Error("bad signature size");
                                if (n.length !== lt) throw new Error("bad public key size");
                                var r, i = new Uint8Array(ft + t.length),
                                    o = new Uint8Array(ft + t.length);
                                for (r = 0; r < ft; r++) i[r] = e[r];
                                for (r = 0; r < t.length; r++) i[r + ft] = t[r];
                                return ct(o, i, i.length, n) >= 0
                            }, t.sign.keyPair = function() {
                                var t = new Uint8Array(lt),
                                    e = new Uint8Array(pt);
                                return rt(t, e), {
                                    publicKey: t,
                                    secretKey: e
                                }
                            }, t.sign.keyPair.fromSecretKey = function(t) {
                                if (gt(t), t.length !== pt) throw new Error("bad secret key size");
                                for (var e = new Uint8Array(lt), n = 0; n < e.length; n++) e[n] = t[32 + n];
                                return {
                                    publicKey: e,
                                    secretKey: new Uint8Array(t)
                                }
                            }, t.sign.keyPair.fromSeed = function(t) {
                                if (gt(t), 32 !== t.length) throw new Error("bad seed size");
                                for (var e = new Uint8Array(lt), n = new Uint8Array(pt), r = 0; r < 32; r++) n[r] = t[r];
                                return rt(e, n, !0), {
                                    publicKey: e,
                                    secretKey: n
                                }
                            }, t.sign.publicKeyLength = lt, t.sign.secretKeyLength = pt, t.sign.seedLength = 32, t.sign.signatureLength = ft, t.hash = function(t) {
                                gt(t);
                                var e = new Uint8Array(64);
                                return V(e, t, t.length), e
                            }, t.hash.hashLength = 64, t.verify = function(t, e) {
                                return gt(t, e), 0 !== t.length && 0 !== e.length && t.length === e.length && 0 === g(t, 0, e, 0, t.length)
                            }, t.setPRNG = function(t) {
                                r = t
                            }, (ut = "undefined" != typeof self ? self.crypto || self.msCrypto : null) && ut.getRandomValues ? t.setPRNG((function(t, e) {
                                var n, r = new Uint8Array(e);
                                for (n = 0; n < e; n += 65536) ut.getRandomValues(r.subarray(n, n + Math.min(e - n, 65536)));
                                for (n = 0; n < e; n++) t[n] = r[n];
                                yt(r)
                            })) : (ut = n(3)) && ut.randomBytes && t.setPRNG((function(t, e) {
                                var n, r = ut.randomBytes(e);
                                for (n = 0; n < e; n++) t[n] = r[n];
                                yt(r)
                            }))
                        }(t.exports ? t.exports : self.nacl = self.nacl || {})
                    }, function(t, e, n) {
                        ! function(e, n) {
                            "use strict";
                            t.exports ? t.exports = n() : (e.nacl || (e.nacl = {}), e.nacl.util = n())
                        }(this, (function() {
                            "use strict";
                            var t = {};

                            function e(t) {
                                if (!/^(?:[A-Za-z0-9+\/]{2}[A-Za-z0-9+\/]{2})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/.test(t)) throw new TypeError("invalid encoding")
                            }
                            return t.decodeUTF8 = function(t) {
                                if ("string" != typeof t) throw new TypeError("expected string");
                                var e, n = unescape(encodeURIComponent(t)),
                                    r = new Uint8Array(n.length);
                                for (e = 0; e < n.length; e++) r[e] = n.charCodeAt(e);
                                return r
                            }, t.encodeUTF8 = function(t) {
                                var e, n = [];
                                for (e = 0; e < t.length; e++) n.push(String.fromCharCode(t[e]));
                                return decodeURIComponent(escape(n.join("")))
                            }, "undefined" == typeof atob ? void 0 !== i.from ? (t.encodeBase64 = function(t) {
                                return i.from(t).toString("base64")
                            }, t.decodeBase64 = function(t) {
                                return e(t), new Uint8Array(Array.prototype.slice.call(i.from(t, "base64"), 0))
                            }) : (t.encodeBase64 = function(t) {
                                return new i(t).toString("base64")
                            }, t.decodeBase64 = function(t) {
                                return e(t), new Uint8Array(Array.prototype.slice.call(new i(t, "base64"), 0))
                            }) : (t.encodeBase64 = function(t) {
                                var e, n = [],
                                    r = t.length;
                                for (e = 0; e < r; e++) n.push(String.fromCharCode(t[e]));
                                return btoa(n.join(""))
                            }, t.decodeBase64 = function(t) {
                                e(t);
                                var n, r = atob(t),
                                    i = new Uint8Array(r.length);
                                for (n = 0; n < r.length; n++) i[n] = r.charCodeAt(n);
                                return i
                            }), t
                        }))
                    }, function(t, e, n) {
                        t.exports = n(4).default
                    }, function(t, e) {}, function(t, e, n) {
                        "use strict";
                        n.r(e);
                        for (var r = function() {
                                function t(t, e) {
                                    this.lastId = 0, this.prefix = t, this.name = e
                                }
                                return t.prototype.create = function(t) {
                                    this.lastId++;
                                    var e = this.lastId,
                                        n = this.prefix + e,
                                        r = this.name + "[" + e + "]",
                                        i = !1,
                                        o = function() {
                                            i || (t.apply(null, arguments), i = !0)
                                        };
                                    return this[e] = o, {
                                        number: e,
                                        id: n,
                                        name: r,
                                        callback: o
                                    }
                                }, t.prototype.remove = function(t) {
                                    delete this[t.number]
                                }, t
                            }(), i = new r("_pusher_script_", "Pusher.ScriptReceivers"), o = {
                                VERSION: "5.1.1",
                                PROTOCOL: 7,
                                host: "ws.pusherapp.com",
                                ws_port: 80,
                                wss_port: 443,
                                ws_path: "",
                                sockjs_host: "sockjs.pusher.com",
                                sockjs_http_port: 80,
                                sockjs_https_port: 443,
                                sockjs_path: "/pusher",
                                stats_host: "stats.pusher.com",
                                channel_auth_endpoint: "/pusher/auth",
                                channel_auth_transport: "ajax",
                                activity_timeout: 12e4,
                                pong_timeout: 3e4,
                                unavailable_timeout: 1e4,
                                cdn_http: "http://js.pusher.com",
                                cdn_https: "https://js.pusher.com",
                                dependency_suffix: ""
                            }, s = function() {
                                function t(t) {
                                    this.options = t, this.receivers = t.receivers || i, this.loading = {}
                                }
                                return t.prototype.load = function(t, e, n) {
                                    var r = this;
                                    if (r.loading[t] && r.loading[t].length > 0) r.loading[t].push(n);
                                    else {
                                        r.loading[t] = [n];
                                        var i = Ee.createScriptRequest(r.getPath(t, e)),
                                            o = r.receivers.create((function(e) {
                                                if (r.receivers.remove(o), r.loading[t]) {
                                                    var n = r.loading[t];
                                                    delete r.loading[t];
                                                    for (var s = function(t) {
                                                            t || i.cleanup()
                                                        }, a = 0; a < n.length; a++) n[a](e, s)
                                                }
                                            }));
                                        i.send(o)
                                    }
                                }, t.prototype.getRoot = function(t) {
                                    var e = Ee.getDocument().location.protocol;
                                    return (t && t.useTLS || "https:" === e ? this.options.cdn_https : this.options.cdn_http).replace(/\/*$/, "") + "/" + this.options.version
                                }, t.prototype.getPath = function(t, e) {
                                    return this.getRoot(e) + "/" + t + this.options.suffix + ".js"
                                }, t
                            }(), a = new r("_pusher_dependencies", "Pusher.DependenciesReceivers"), c = new s({
                                cdn_http: o.cdn_http,
                                cdn_https: o.cdn_https,
                                version: o.VERSION,
                                suffix: o.dependency_suffix,
                                receivers: a
                            }), u = String.fromCharCode, h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", f = {}, l = 0, p = h.length; l < p; l++) f[h.charAt(l)] = l;
                        var d, g = function(t) {
                                var e = t.charCodeAt(0);
                                return e < 128 ? t : e < 2048 ? u(192 | e >>> 6) + u(128 | 63 & e) : u(224 | e >>> 12 & 15) + u(128 | e >>> 6 & 63) + u(128 | 63 & e)
                            },
                            y = function(t) {
                                return t.replace(/[^\x00-\x7F]/g, g)
                            },
                            m = function(t) {
                                var e = [0, 2, 1][t.length % 3],
                                    n = t.charCodeAt(0) << 16 | (t.length > 1 ? t.charCodeAt(1) : 0) << 8 | (t.length > 2 ? t.charCodeAt(2) : 0);
                                return [h.charAt(n >>> 18), h.charAt(n >>> 12 & 63), e >= 2 ? "=" : h.charAt(n >>> 6 & 63), e >= 1 ? "=" : h.charAt(63 & n)].join("")
                            },
                            b = window.btoa || function(t) {
                                return t.replace(/[\s\S]{1,3}/g, m)
                            },
                            k = function() {
                                function t(t, e, n, r) {
                                    var i = this;
                                    this.clear = e, this.timer = t((function() {
                                        i.timer && (i.timer = r(i.timer))
                                    }), n)
                                }
                                return t.prototype.isRunning = function() {
                                    return null !== this.timer
                                }, t.prototype.ensureAborted = function() {
                                    this.timer && (this.clear(this.timer), this.timer = null)
                                }, t
                            }(),
                            v = (d = function(t, e) {
                                return d = Object.setPrototypeOf || {
                                    __proto__: []
                                }
                                instanceof Array && function(t, e) {
                                    t.__proto__ = e
                                } || function(t, e) {
                                    for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                                }, d(t, e)
                            }, function(t, e) {
                                function n() {
                                    this.constructor = t
                                }
                                d(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n)
                            });

                        function w(t) {
                            window.clearTimeout(t)
                        }

                        function _(t) {
                            window.clearInterval(t)
                        }
                        var S = function(t) {
                                function e(e, n) {
                                    return t.call(this, setTimeout, w, e, (function(t) {
                                        return n(), null
                                    })) || this
                                }
                                return v(e, t), e
                            }(k),
                            x = function(t) {
                                function e(e, n) {
                                    return t.call(this, setInterval, _, e, (function(t) {
                                        return n(), t
                                    })) || this
                                }
                                return v(e, t), e
                            }(k),
                            C = {
                                now: function() {
                                    return Date.now ? Date.now() : (new Date).valueOf()
                                },
                                defer: function(t) {
                                    return new S(0, t)
                                },
                                method: function(t) {
                                    for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
                                    var r = Array.prototype.slice.call(arguments, 1);
                                    return function(e) {
                                        return e[t].apply(e, r.concat(arguments))
                                    }
                                }
                            },
                            T = C;

                        function E(t) {
                            for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
                            for (var r = 0; r < e.length; r++) {
                                var i = e[r];
                                for (var o in i) i[o] && i[o].constructor && i[o].constructor === Object ? t[o] = E(t[o] || {}, i[o]) : t[o] = i[o]
                            }
                            return t
                        }

                        function A() {
                            for (var t = ["Pusher"], e = 0; e < arguments.length; e++) "string" == typeof arguments[e] ? t.push(arguments[e]) : t.push($(arguments[e]));
                            return t.join(" : ")
                        }

                        function P(t, e) {
                            var n = Array.prototype.indexOf;
                            if (null === t) return -1;
                            if (n && t.indexOf === n) return t.indexOf(e);
                            for (var r = 0, i = t.length; r < i; r++)
                                if (t[r] === e) return r;
                            return -1
                        }

                        function O(t, e) {
                            for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e(t[n], n, t)
                        }

                        function R(t) {
                            var e = [];
                            return O(t, (function(t, n) {
                                e.push(n)
                            })), e
                        }

                        function j(t, e, n) {
                            for (var r = 0; r < t.length; r++) e.call(n || window, t[r], r, t)
                        }

                        function U(t, e) {
                            for (var n = [], r = 0; r < t.length; r++) n.push(e(t[r], r, t, n));
                            return n
                        }

                        function L(t, e) {
                            e = e || function(t) {
                                return !!t
                            };
                            for (var n = [], r = 0; r < t.length; r++) e(t[r], r, t, n) && n.push(t[r]);
                            return n
                        }

                        function M(t, e) {
                            var n = {};
                            return O(t, (function(r, i) {
                                (e && e(r, i, t, n) || Boolean(r)) && (n[i] = r)
                            })), n
                        }

                        function I(t, e) {
                            for (var n = 0; n < t.length; n++)
                                if (e(t[n], n, t)) return !0;
                            return !1
                        }

                        function B(t) {
                            return e = function(t) {
                                return "object" == typeof t && (t = $(t)), encodeURIComponent((e = t.toString(), b(y(e))));
                                var e
                            }, n = {}, O(t, (function(t, r) {
                                n[r] = e(t)
                            })), n;
                            var e, n
                        }

                        function z(t) {
                            var e, n, r = M(t, (function(t) {
                                return void 0 !== t
                            }));
                            return U((e = B(r), n = [], O(e, (function(t, e) {
                                n.push([e, t])
                            })), n), T.method("join", "=")).join("&")
                        }

                        function $(t) {
                            try {
                                return JSON.stringify(t)
                            } catch (r) {
                                return JSON.stringify((e = [], n = [], function t(r, i) {
                                    var o, s, a;
                                    switch (typeof r) {
                                        case "object":
                                            if (!r) return null;
                                            for (o = 0; o < e.length; o += 1)
                                                if (e[o] === r) return {
                                                    $ref: n[o]
                                                };
                                            if (e.push(r), n.push(i), "[object Array]" === Object.prototype.toString.apply(r))
                                                for (a = [], o = 0; o < r.length; o += 1) a[o] = t(r[o], i + "[" + o + "]");
                                            else
                                                for (s in a = {}, r) Object.prototype.hasOwnProperty.call(r, s) && (a[s] = t(r[s], i + "[" + JSON.stringify(s) + "]"));
                                            return a;
                                        case "number":
                                        case "string":
                                        case "boolean":
                                            return r
                                    }
                                }(t, "$")))
                            }
                            var e, n
                        }
                        var D = function() {
                                function t() {
                                    this.globalLog = function(t) {
                                        window.console && window.console.log && window.console.log(t)
                                    }
                                }
                                return t.prototype.debug = function() {
                                    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                                    this.log(this.globalLog, t)
                                }, t.prototype.warn = function() {
                                    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                                    this.log(this.globalLogWarn, t)
                                }, t.prototype.error = function() {
                                    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                                    this.log(this.globalLogError, t)
                                }, t.prototype.globalLogWarn = function(t) {
                                    window.console && window.console.warn ? window.console.warn(t) : this.globalLog(t)
                                }, t.prototype.globalLogError = function(t) {
                                    window.console && window.console.error ? window.console.error(t) : this.globalLogWarn(t)
                                }, t.prototype.log = function(t) {
                                    for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
                                    var r = A.apply(this, arguments);
                                    if (Ie.log) Ie.log(r);
                                    else if (Ie.logToConsole) {
                                        var i = t.bind(this);
                                        i(r)
                                    }
                                }, t
                            }(),
                            N = new D,
                            F = {
                                baseUrl: "https://pusher.com",
                                urls: {
                                    authenticationEndpoint: {
                                        path: "/docs/authenticating_users"
                                    },
                                    javascriptQuickStart: {
                                        path: "/docs/javascript_quick_start"
                                    },
                                    triggeringClientEvents: {
                                        path: "/docs/client_api_guide/client_events#trigger-events"
                                    }
                                }
                            },
                            Y = function(t) {
                                var e, n = F.urls[t];
                                return n ? (n.fullUrl ? e = n.fullUrl : n.path && (e = F.baseUrl + n.path), e ? "See: " + e : "") : ""
                            },
                            H = function(t, e, n) {
                                var r, i = this;
                                for (var o in (r = Ee.createXHR()).open("POST", i.options.authEndpoint, !0), r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), this.authOptions.headers) r.setRequestHeader(o, this.authOptions.headers[o]);
                                return r.onreadystatechange = function() {
                                    if (4 === r.readyState)
                                        if (200 === r.status) {
                                            var t, e = !1;
                                            try {
                                                t = JSON.parse(r.responseText), e = !0
                                            } catch (t) {
                                                n(!0, "JSON returned from auth endpoint was invalid, yet status code was 200. Data was: " + r.responseText)
                                            }
                                            e && n(!1, t)
                                        } else {
                                            var o = Y("authenticationEndpoint");
                                            N.error("Unable to retrieve auth string from auth endpoint - received status " + r.status + " from " + i.options.authEndpoint + ". Clients must be authenticated to join private or presence channels. " + o), n(!0, r.status)
                                        }
                                }, r.send(this.composeQuery(e)), r
                            },
                            q = function(t, e, n) {
                                void 0 !== this.authOptions.headers && N.warn("To send headers with the auth request, you must use AJAX, rather than JSONP.");
                                var r = t.nextAuthCallbackID.toString();
                                t.nextAuthCallbackID++;
                                var i = t.getDocument(),
                                    o = i.createElement("script");
                                t.auth_callbacks[r] = function(t) {
                                    n(!1, t)
                                };
                                var s = "Pusher.auth_callbacks['" + r + "']";
                                o.src = this.options.authEndpoint + "?callback=" + encodeURIComponent(s) + "&" + this.composeQuery(e);
                                var a = i.getElementsByTagName("head")[0] || i.documentElement;
                                a.insertBefore(o, a.firstChild)
                            },
                            J = function() {
                                function t(t) {
                                    this.src = t
                                }
                                return t.prototype.send = function(t) {
                                    var e = this,
                                        n = "Error loading " + e.src;
                                    e.script = document.createElement("script"), e.script.id = t.id, e.script.src = e.src, e.script.type = "text/javascript", e.script.charset = "UTF-8", e.script.addEventListener ? (e.script.onerror = function() {
                                        t.callback(n)
                                    }, e.script.onload = function() {
                                        t.callback(null)
                                    }) : e.script.onreadystatechange = function() {
                                        "loaded" !== e.script.readyState && "complete" !== e.script.readyState || t.callback(null)
                                    }, void 0 === e.script.async && document.attachEvent && /opera/i.test(navigator.userAgent) ? (e.errorScript = document.createElement("script"), e.errorScript.id = t.id + "_error", e.errorScript.text = t.name + "('" + n + "');", e.script.async = e.errorScript.async = !1) : e.script.async = !0;
                                    var r = document.getElementsByTagName("head")[0];
                                    r.insertBefore(e.script, r.firstChild), e.errorScript && r.insertBefore(e.errorScript, e.script.nextSibling)
                                }, t.prototype.cleanup = function() {
                                    this.script && (this.script.onload = this.script.onerror = null, this.script.onreadystatechange = null), this.script && this.script.parentNode && this.script.parentNode.removeChild(this.script), this.errorScript && this.errorScript.parentNode && this.errorScript.parentNode.removeChild(this.errorScript), this.script = null, this.errorScript = null
                                }, t
                            }(),
                            X = function() {
                                function t(t, e) {
                                    this.url = t, this.data = e
                                }
                                return t.prototype.send = function(t) {
                                    if (!this.request) {
                                        var e = z(this.data),
                                            n = this.url + "/" + t.number + "?" + e;
                                        this.request = Ee.createScriptRequest(n), this.request.send(t)
                                    }
                                }, t.prototype.cleanup = function() {
                                    this.request && this.request.cleanup()
                                }, t
                            }(),
                            W = {
                                name: "jsonp",
                                getAgent: function(t, e) {
                                    return function(n, r) {
                                        var o = "http" + (e ? "s" : "") + "://" + (t.host || t.options.host) + t.options.path,
                                            s = Ee.createJSONPRequest(o, n),
                                            a = Ee.ScriptReceivers.create((function(e, n) {
                                                i.remove(a), s.cleanup(), n && n.host && (t.host = n.host), r && r(e, n)
                                            }));
                                        s.send(a)
                                    }
                                }
                            };

                        function K(t, e, n) {
                            return t + (e.useTLS ? "s" : "") + "://" + (e.useTLS ? e.hostTLS : e.hostNonTLS) + n
                        }

                        function G(t, e) {
                            return "/app/" + t + "?protocol=" + o.PROTOCOL + "&client=js&version=" + o.VERSION + (e ? "&" + e : "")
                        }
                        var V = {
                                getInitial: function(t, e) {
                                    return K("ws", e, (e.httpPath || "") + G(t, "flash=false"))
                                }
                            },
                            Z = {
                                getInitial: function(t, e) {
                                    return K("http", e, (e.httpPath || "/pusher") + G(t))
                                }
                            },
                            Q = {
                                getInitial: function(t, e) {
                                    return K("http", e, e.httpPath || "/pusher")
                                },
                                getPath: function(t, e) {
                                    return G(t)
                                }
                            },
                            tt = function() {
                                function t() {
                                    this._callbacks = {}
                                }
                                return t.prototype.get = function(t) {
                                    return this._callbacks[et(t)]
                                }, t.prototype.add = function(t, e, n) {
                                    var r = et(t);
                                    this._callbacks[r] = this._callbacks[r] || [], this._callbacks[r].push({
                                        fn: e,
                                        context: n
                                    })
                                }, t.prototype.remove = function(t, e, n) {
                                    if (t || e || n) {
                                        var r = t ? [et(t)] : R(this._callbacks);
                                        e || n ? this.removeCallback(r, e, n) : this.removeAllCallbacks(r)
                                    } else this._callbacks = {}
                                }, t.prototype.removeCallback = function(t, e, n) {
                                    j(t, (function(t) {
                                        this._callbacks[t] = L(this._callbacks[t] || [], (function(t) {
                                            return e && e !== t.fn || n && n !== t.context
                                        })), 0 === this._callbacks[t].length && delete this._callbacks[t]
                                    }), this)
                                }, t.prototype.removeAllCallbacks = function(t) {
                                    j(t, (function(t) {
                                        delete this._callbacks[t]
                                    }), this)
                                }, t
                            }();

                        function et(t) {
                            return "_" + t
                        }
                        var nt = function() {
                                function t(t) {
                                    this.callbacks = new tt, this.global_callbacks = [], this.failThrough = t
                                }
                                return t.prototype.bind = function(t, e, n) {
                                    return this.callbacks.add(t, e, n), this
                                }, t.prototype.bind_global = function(t) {
                                    return this.global_callbacks.push(t), this
                                }, t.prototype.unbind = function(t, e, n) {
                                    return this.callbacks.remove(t, e, n), this
                                }, t.prototype.unbind_global = function(t) {
                                    return t ? (this.global_callbacks = L(this.global_callbacks || [], (function(e) {
                                        return e !== t
                                    })), this) : (this.global_callbacks = [], this)
                                }, t.prototype.unbind_all = function() {
                                    return this.unbind(), this.unbind_global(), this
                                }, t.prototype.emit = function(t, e, n) {
                                    for (var r = 0; r < this.global_callbacks.length; r++) this.global_callbacks[r](t, e);
                                    var i = this.callbacks.get(t),
                                        o = [];
                                    if (n ? o.push(e, n) : e && o.push(e), i && i.length > 0)
                                        for (r = 0; r < i.length; r++) i[r].fn.apply(i[r].context || window, o);
                                    else this.failThrough && this.failThrough(t, e);
                                    return this
                                }, t
                            }(),
                            rt = function() {
                                var t = function(e, n) {
                                    return t = Object.setPrototypeOf || {
                                        __proto__: []
                                    }
                                    instanceof Array && function(t, e) {
                                        t.__proto__ = e
                                    } || function(t, e) {
                                        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                                    }, t(e, n)
                                };
                                return function(e, n) {
                                    function r() {
                                        this.constructor = e
                                    }
                                    t(e, n), e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                                }
                            }(),
                            it = function(t) {
                                function e(e, n, r, i, o) {
                                    var s = t.call(this) || this;
                                    return s.initialize = Ee.transportConnectionInitializer, s.hooks = e, s.name = n, s.priority = r, s.key = i, s.options = o, s.state = "new", s.timeline = o.timeline, s.activityTimeout = o.activityTimeout, s.id = s.timeline.generateUniqueID(), s
                                }
                                return rt(e, t), e.prototype.handlesActivityChecks = function() {
                                    return Boolean(this.hooks.handlesActivityChecks)
                                }, e.prototype.supportsPing = function() {
                                    return Boolean(this.hooks.supportsPing)
                                }, e.prototype.connect = function() {
                                    var t = this;
                                    if (this.socket || "initialized" !== this.state) return !1;
                                    var e = this.hooks.urls.getInitial(this.key, this.options);
                                    try {
                                        this.socket = this.hooks.getSocket(e, this.options)
                                    } catch (e) {
                                        return T.defer((function() {
                                            t.onError(e), t.changeState("closed")
                                        })), !1
                                    }
                                    return this.bindListeners(), N.debug("Connecting", {
                                        transport: this.name,
                                        url: e
                                    }), this.changeState("connecting"), !0
                                }, e.prototype.close = function() {
                                    return !!this.socket && (this.socket.close(), !0)
                                }, e.prototype.send = function(t) {
                                    var e = this;
                                    return "open" === this.state && (T.defer((function() {
                                        e.socket && e.socket.send(t)
                                    })), !0)
                                }, e.prototype.ping = function() {
                                    "open" === this.state && this.supportsPing() && this.socket.ping()
                                }, e.prototype.onOpen = function() {
                                    this.hooks.beforeOpen && this.hooks.beforeOpen(this.socket, this.hooks.urls.getPath(this.key, this.options)), this.changeState("open"), this.socket.onopen = void 0
                                }, e.prototype.onError = function(t) {
                                    this.emit("error", {
                                        type: "WebSocketError",
                                        error: t
                                    }), this.timeline.error(this.buildTimelineMessage({
                                        error: t.toString()
                                    }))
                                }, e.prototype.onClose = function(t) {
                                    t ? this.changeState("closed", {
                                        code: t.code,
                                        reason: t.reason,
                                        wasClean: t.wasClean
                                    }) : this.changeState("closed"), this.unbindListeners(), this.socket = void 0
                                }, e.prototype.onMessage = function(t) {
                                    this.emit("message", t)
                                }, e.prototype.onActivity = function() {
                                    this.emit("activity")
                                }, e.prototype.bindListeners = function() {
                                    var t = this;
                                    this.socket.onopen = function() {
                                        t.onOpen()
                                    }, this.socket.onerror = function(e) {
                                        t.onError(e)
                                    }, this.socket.onclose = function(e) {
                                        t.onClose(e)
                                    }, this.socket.onmessage = function(e) {
                                        t.onMessage(e)
                                    }, this.supportsPing() && (this.socket.onactivity = function() {
                                        t.onActivity()
                                    })
                                }, e.prototype.unbindListeners = function() {
                                    this.socket && (this.socket.onopen = void 0, this.socket.onerror = void 0, this.socket.onclose = void 0, this.socket.onmessage = void 0, this.supportsPing() && (this.socket.onactivity = void 0))
                                }, e.prototype.changeState = function(t, e) {
                                    this.state = t, this.timeline.info(this.buildTimelineMessage({
                                        state: t,
                                        params: e
                                    })), this.emit(t, e)
                                }, e.prototype.buildTimelineMessage = function(t) {
                                    return E({
                                        cid: this.id
                                    }, t)
                                }, e
                            }(nt),
                            ot = it,
                            st = function() {
                                function t(t) {
                                    this.hooks = t
                                }
                                return t.prototype.isSupported = function(t) {
                                    return this.hooks.isSupported(t)
                                }, t.prototype.createConnection = function(t, e, n, r) {
                                    return new ot(this.hooks, t, e, n, r)
                                }, t
                            }(),
                            at = new st({
                                urls: V,
                                handlesActivityChecks: !1,
                                supportsPing: !1,
                                isInitialized: function() {
                                    return Boolean(Ee.getWebSocketAPI())
                                },
                                isSupported: function() {
                                    return Boolean(Ee.getWebSocketAPI())
                                },
                                getSocket: function(t) {
                                    return Ee.createWebSocket(t)
                                }
                            }),
                            ct = {
                                urls: Z,
                                handlesActivityChecks: !1,
                                supportsPing: !0,
                                isInitialized: function() {
                                    return !0
                                }
                            },
                            ut = E({
                                getSocket: function(t) {
                                    return Ee.HTTPFactory.createStreamingSocket(t)
                                }
                            }, ct),
                            ht = E({
                                getSocket: function(t) {
                                    return Ee.HTTPFactory.createPollingSocket(t)
                                }
                            }, ct),
                            ft = {
                                isSupported: function() {
                                    return Ee.isXHRSupported()
                                }
                            },
                            lt = {
                                ws: at,
                                xhr_streaming: new st(E({}, ut, ft)),
                                xhr_polling: new st(E({}, ht, ft))
                            },
                            pt = new st({
                                file: "sockjs",
                                urls: Q,
                                handlesActivityChecks: !0,
                                supportsPing: !1,
                                isSupported: function() {
                                    return !0
                                },
                                isInitialized: function() {
                                    return void 0 !== window.SockJS
                                },
                                getSocket: function(t, e) {
                                    return new window.SockJS(t, null, {
                                        js_path: c.getPath("sockjs", {
                                            useTLS: e.useTLS
                                        }),
                                        ignore_null_origin: e.ignoreNullOrigin
                                    })
                                },
                                beforeOpen: function(t, e) {
                                    t.send(JSON.stringify({
                                        path: e
                                    }))
                                }
                            }),
                            dt = {
                                isSupported: function(t) {
                                    return Ee.isXDRSupported(t.useTLS)
                                }
                            },
                            gt = new st(E({}, ut, dt)),
                            yt = new st(E({}, ht, dt));
                        lt.xdr_streaming = gt, lt.xdr_polling = yt, lt.sockjs = pt;
                        var mt = lt,
                            bt = function() {
                                var t = function(e, n) {
                                    return t = Object.setPrototypeOf || {
                                        __proto__: []
                                    }
                                    instanceof Array && function(t, e) {
                                        t.__proto__ = e
                                    } || function(t, e) {
                                        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                                    }, t(e, n)
                                };
                                return function(e, n) {
                                    function r() {
                                        this.constructor = e
                                    }
                                    t(e, n), e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                                }
                            }(),
                            kt = new(function(t) {
                                function e() {
                                    var e = t.call(this) || this,
                                        n = e;
                                    return void 0 !== window.addEventListener && (window.addEventListener("online", (function() {
                                        n.emit("online")
                                    }), !1), window.addEventListener("offline", (function() {
                                        n.emit("offline")
                                    }), !1)), e
                                }
                                return bt(e, t), e.prototype.isOnline = function() {
                                    return void 0 === window.navigator.onLine || window.navigator.onLine
                                }, e
                            }(nt)),
                            vt = function() {
                                function t(t, e, n) {
                                    this.manager = t, this.transport = e, this.minPingDelay = n.minPingDelay, this.maxPingDelay = n.maxPingDelay, this.pingDelay = void 0
                                }
                                return t.prototype.createConnection = function(t, e, n, r) {
                                    var i = this;
                                    r = E({}, r, {
                                        activityTimeout: this.pingDelay
                                    });
                                    var o = this.transport.createConnection(t, e, n, r),
                                        s = null,
                                        a = function() {
                                            o.unbind("open", a), o.bind("closed", c), s = T.now()
                                        },
                                        c = function(t) {
                                            if (o.unbind("closed", c), 1002 === t.code || 1003 === t.code) i.manager.reportDeath();
                                            else if (!t.wasClean && s) {
                                                var e = T.now() - s;
                                                e < 2 * i.maxPingDelay && (i.manager.reportDeath(), i.pingDelay = Math.max(e / 2, i.minPingDelay))
                                            }
                                        };
                                    return o.bind("open", a), o
                                }, t.prototype.isSupported = function(t) {
                                    return this.manager.isAlive() && this.transport.isSupported(t)
                                }, t
                            }(),
                            wt = {
                                decodeMessage: function(t) {
                                    try {
                                        var e = JSON.parse(t.data),
                                            n = e.data;
                                        if ("string" == typeof n) try {
                                            n = JSON.parse(e.data)
                                        } catch (t) {}
                                        var r = {
                                            event: e.event,
                                            channel: e.channel,
                                            data: n
                                        };
                                        return e.user_id && (r.user_id = e.user_id), r
                                    } catch (e) {
                                        throw {
                                            type: "MessageParseError",
                                            error: e,
                                            data: t.data
                                        }
                                    }
                                },
                                encodeMessage: function(t) {
                                    return JSON.stringify(t)
                                },
                                processHandshake: function(t) {
                                    var e = wt.decodeMessage(t);
                                    if ("pusher:connection_established" === e.event) {
                                        if (!e.data.activity_timeout) throw "No activity timeout specified in handshake";
                                        return {
                                            action: "connected",
                                            id: e.data.socket_id,
                                            activityTimeout: 1e3 * e.data.activity_timeout
                                        }
                                    }
                                    if ("pusher:error" === e.event) return {
                                        action: this.getCloseAction(e.data),
                                        error: this.getCloseError(e.data)
                                    };
                                    throw "Invalid handshake"
                                },
                                getCloseAction: function(t) {
                                    return t.code < 4e3 ? t.code >= 1002 && t.code <= 1004 ? "backoff" : null : 4e3 === t.code ? "tls_only" : t.code < 4100 ? "refused" : t.code < 4200 ? "backoff" : t.code < 4300 ? "retry" : "refused"
                                },
                                getCloseError: function(t) {
                                    return 1e3 !== t.code && 1001 !== t.code ? {
                                        type: "PusherError",
                                        data: {
                                            code: t.code,
                                            message: t.reason || t.message
                                        }
                                    } : null
                                }
                            },
                            _t = wt,
                            St = function() {
                                var t = function(e, n) {
                                    return t = Object.setPrototypeOf || {
                                        __proto__: []
                                    }
                                    instanceof Array && function(t, e) {
                                        t.__proto__ = e
                                    } || function(t, e) {
                                        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                                    }, t(e, n)
                                };
                                return function(e, n) {
                                    function r() {
                                        this.constructor = e
                                    }
                                    t(e, n), e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                                }
                            }(),
                            xt = function(t) {
                                function e(e, n) {
                                    var r = t.call(this) || this;
                                    return r.id = e, r.transport = n, r.activityTimeout = n.activityTimeout, r.bindListeners(), r
                                }
                                return St(e, t), e.prototype.handlesActivityChecks = function() {
                                    return this.transport.handlesActivityChecks()
                                }, e.prototype.send = function(t) {
                                    return this.transport.send(t)
                                }, e.prototype.send_event = function(t, e, n) {
                                    var r = {
                                        event: t,
                                        data: e
                                    };
                                    return n && (r.channel = n), N.debug("Event sent", r), this.send(_t.encodeMessage(r))
                                }, e.prototype.ping = function() {
                                    this.transport.supportsPing() ? this.transport.ping() : this.send_event("pusher:ping", {})
                                }, e.prototype.close = function() {
                                    this.transport.close()
                                }, e.prototype.bindListeners = function() {
                                    var t = this,
                                        e = {
                                            message: function(e) {
                                                var n;
                                                try {
                                                    n = _t.decodeMessage(e)
                                                } catch (n) {
                                                    t.emit("error", {
                                                        type: "MessageParseError",
                                                        error: n,
                                                        data: e.data
                                                    })
                                                }
                                                if (void 0 !== n) {
                                                    switch (N.debug("Event recd", n), n.event) {
                                                        case "pusher:error":
                                                            t.emit("error", {
                                                                type: "PusherError",
                                                                data: n.data
                                                            });
                                                            break;
                                                        case "pusher:ping":
                                                            t.emit("ping");
                                                            break;
                                                        case "pusher:pong":
                                                            t.emit("pong")
                                                    }
                                                    t.emit("message", n)
                                                }
                                            },
                                            activity: function() {
                                                t.emit("activity")
                                            },
                                            error: function(e) {
                                                t.emit("error", {
                                                    type: "WebSocketError",
                                                    error: e
                                                })
                                            },
                                            closed: function(e) {
                                                n(), e && e.code && t.handleCloseEvent(e), t.transport = null, t.emit("closed")
                                            }
                                        },
                                        n = function() {
                                            O(e, (function(e, n) {
                                                t.transport.unbind(n, e)
                                            }))
                                        };
                                    O(e, (function(e, n) {
                                        t.transport.bind(n, e)
                                    }))
                                }, e.prototype.handleCloseEvent = function(t) {
                                    var e = _t.getCloseAction(t),
                                        n = _t.getCloseError(t);
                                    n && this.emit("error", n), e && this.emit(e, {
                                        action: e,
                                        error: n
                                    })
                                }, e
                            }(nt),
                            Ct = function() {
                                function t(t, e) {
                                    this.transport = t, this.callback = e, this.bindListeners()
                                }
                                return t.prototype.close = function() {
                                    this.unbindListeners(), this.transport.close()
                                }, t.prototype.bindListeners = function() {
                                    var t = this;
                                    this.onMessage = function(e) {
                                        var n;
                                        t.unbindListeners();
                                        try {
                                            n = _t.processHandshake(e)
                                        } catch (e) {
                                            return t.finish("error", {
                                                error: e
                                            }), void t.transport.close()
                                        }
                                        "connected" === n.action ? t.finish("connected", {
                                            connection: new xt(n.id, t.transport),
                                            activityTimeout: n.activityTimeout
                                        }) : (t.finish(n.action, {
                                            error: n.error
                                        }), t.transport.close())
                                    }, this.onClosed = function(e) {
                                        t.unbindListeners();
                                        var n = _t.getCloseAction(e) || "backoff",
                                            r = _t.getCloseError(e);
                                        t.finish(n, {
                                            error: r
                                        })
                                    }, this.transport.bind("message", this.onMessage), this.transport.bind("closed", this.onClosed)
                                }, t.prototype.unbindListeners = function() {
                                    this.transport.unbind("message", this.onMessage), this.transport.unbind("closed", this.onClosed)
                                }, t.prototype.finish = function(t, e) {
                                    this.callback(E({
                                        transport: this.transport,
                                        action: t
                                    }, e))
                                }, t
                            }(),
                            Tt = function() {
                                function t(t, e) {
                                    this.channel = t;
                                    var n = e.authTransport;
                                    if (void 0 === Ee.getAuthorizers()[n]) throw "'" + n + "' is not a recognized auth transport";
                                    this.type = n, this.options = e, this.authOptions = (e || {}).auth || {}
                                }
                                return t.prototype.composeQuery = function(t) {
                                    var e = "socket_id=" + encodeURIComponent(t) + "&channel_name=" + encodeURIComponent(this.channel.name);
                                    for (var n in this.authOptions.params) e += "&" + encodeURIComponent(n) + "=" + encodeURIComponent(this.authOptions.params[n]);
                                    return e
                                }, t.prototype.authorize = function(e, n) {
                                    t.authorizers = t.authorizers || Ee.getAuthorizers(), t.authorizers[this.type].call(this, Ee, e, n)
                                }, t
                            }(),
                            Et = function() {
                                function t(t, e) {
                                    this.timeline = t, this.options = e || {}
                                }
                                return t.prototype.send = function(t, e) {
                                    this.timeline.isEmpty() || this.timeline.send(Ee.TimelineTransport.getAgent(this, t), e)
                                }, t
                            }(),
                            At = function() {
                                var t = function(e, n) {
                                    return t = Object.setPrototypeOf || {
                                        __proto__: []
                                    }
                                    instanceof Array && function(t, e) {
                                        t.__proto__ = e
                                    } || function(t, e) {
                                        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                                    }, t(e, n)
                                };
                                return function(e, n) {
                                    function r() {
                                        this.constructor = e
                                    }
                                    t(e, n), e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                                }
                            }(),
                            Pt = function(t) {
                                function e(e) {
                                    var n = this.constructor,
                                        r = t.call(this, e) || this;
                                    return Object.setPrototypeOf(r, n.prototype), r
                                }
                                return At(e, t), e
                            }(Error),
                            Ot = function(t) {
                                function e(e) {
                                    var n = this.constructor,
                                        r = t.call(this, e) || this;
                                    return Object.setPrototypeOf(r, n.prototype), r
                                }
                                return At(e, t), e
                            }(Error),
                            Rt = function(t) {
                                function e(e) {
                                    var n = this.constructor,
                                        r = t.call(this, e) || this;
                                    return Object.setPrototypeOf(r, n.prototype), r
                                }
                                return At(e, t), e
                            }(Error),
                            jt = function(t) {
                                function e(e) {
                                    var n = this.constructor,
                                        r = t.call(this, e) || this;
                                    return Object.setPrototypeOf(r, n.prototype), r
                                }
                                return At(e, t), e
                            }(Error),
                            Ut = function(t) {
                                function e(e) {
                                    var n = this.constructor,
                                        r = t.call(this, e) || this;
                                    return Object.setPrototypeOf(r, n.prototype), r
                                }
                                return At(e, t), e
                            }(Error),
                            Lt = function(t) {
                                function e(e) {
                                    var n = this.constructor,
                                        r = t.call(this, e) || this;
                                    return Object.setPrototypeOf(r, n.prototype), r
                                }
                                return At(e, t), e
                            }(Error),
                            Mt = function(t) {
                                function e(e) {
                                    var n = this.constructor,
                                        r = t.call(this, e) || this;
                                    return Object.setPrototypeOf(r, n.prototype), r
                                }
                                return At(e, t), e
                            }(Error),
                            It = function() {
                                var t = function(e, n) {
                                    return t = Object.setPrototypeOf || {
                                        __proto__: []
                                    }
                                    instanceof Array && function(t, e) {
                                        t.__proto__ = e
                                    } || function(t, e) {
                                        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                                    }, t(e, n)
                                };
                                return function(e, n) {
                                    function r() {
                                        this.constructor = e
                                    }
                                    t(e, n), e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                                }
                            }(),
                            Bt = function(t) {
                                function e(e, n) {
                                    var r = t.call(this, (function(t, n) {
                                        N.debug("No callbacks on " + e + " for " + t)
                                    })) || this;
                                    return r.name = e, r.pusher = n, r.subscribed = !1, r.subscriptionPending = !1, r.subscriptionCancelled = !1, r
                                }
                                return It(e, t), e.prototype.authorize = function(t, e) {
                                    return e(!1, {
                                        auth: ""
                                    })
                                }, e.prototype.trigger = function(t, e) {
                                    if (0 !== t.indexOf("client-")) throw new Pt("Event '" + t + "' does not start with 'client-'");
                                    if (!this.subscribed) {
                                        var n = Y("triggeringClientEvents");
                                        N.warn("Client event triggered before channel 'subscription_succeeded' event . " + n)
                                    }
                                    return this.pusher.send_event(t, e, this.name)
                                }, e.prototype.disconnect = function() {
                                    this.subscribed = !1, this.subscriptionPending = !1
                                }, e.prototype.handleEvent = function(t) {
                                    var e = t.event,
                                        n = t.data;
                                    "pusher_internal:subscription_succeeded" === e ? this.handleSubscriptionSucceededEvent(t) : 0 !== e.indexOf("pusher_internal:") && this.emit(e, n, {})
                                }, e.prototype.handleSubscriptionSucceededEvent = function(t) {
                                    this.subscriptionPending = !1, this.subscribed = !0, this.subscriptionCancelled ? this.pusher.unsubscribe(this.name) : this.emit("pusher:subscription_succeeded", t.data)
                                }, e.prototype.subscribe = function() {
                                    var t = this;
                                    this.subscribed || (this.subscriptionPending = !0, this.subscriptionCancelled = !1, this.authorize(this.pusher.connection.socket_id, (function(e, n) {
                                        e ? (N.error(n), t.emit("pusher:subscription_error", n)) : t.pusher.send_event("pusher:subscribe", {
                                            auth: n.auth,
                                            channel_data: n.channel_data,
                                            channel: t.name
                                        })
                                    })))
                                }, e.prototype.unsubscribe = function() {
                                    this.subscribed = !1, this.pusher.send_event("pusher:unsubscribe", {
                                        channel: this.name
                                    })
                                }, e.prototype.cancelSubscription = function() {
                                    this.subscriptionCancelled = !0
                                }, e.prototype.reinstateSubscription = function() {
                                    this.subscriptionCancelled = !1
                                }, e
                            }(nt),
                            zt = function() {
                                var t = function(e, n) {
                                    return t = Object.setPrototypeOf || {
                                        __proto__: []
                                    }
                                    instanceof Array && function(t, e) {
                                        t.__proto__ = e
                                    } || function(t, e) {
                                        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                                    }, t(e, n)
                                };
                                return function(e, n) {
                                    function r() {
                                        this.constructor = e
                                    }
                                    t(e, n), e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                                }
                            }(),
                            $t = function(t) {
                                function e() {
                                    return null !== t && t.apply(this, arguments) || this
                                }
                                return zt(e, t), e.prototype.authorize = function(t, e) {
                                    return Qt.createAuthorizer(this, this.pusher.config).authorize(t, e)
                                }, e
                            }(Bt),
                            Dt = $t,
                            Nt = function() {
                                function t() {
                                    this.reset()
                                }
                                return t.prototype.get = function(t) {
                                    return Object.prototype.hasOwnProperty.call(this.members, t) ? {
                                        id: t,
                                        info: this.members[t]
                                    } : null
                                }, t.prototype.each = function(t) {
                                    var e = this;
                                    O(this.members, (function(n, r) {
                                        t(e.get(r))
                                    }))
                                }, t.prototype.setMyID = function(t) {
                                    this.myID = t
                                }, t.prototype.onSubscription = function(t) {
                                    this.members = t.presence.hash, this.count = t.presence.count, this.me = this.get(this.myID)
                                }, t.prototype.addMember = function(t) {
                                    return null === this.get(t.user_id) && this.count++, this.members[t.user_id] = t.user_info, this.get(t.user_id)
                                }, t.prototype.removeMember = function(t) {
                                    var e = this.get(t.user_id);
                                    return e && (delete this.members[t.user_id], this.count--), e
                                }, t.prototype.reset = function() {
                                    this.members = {}, this.count = 0, this.myID = null, this.me = null
                                }, t
                            }(),
                            Ft = function() {
                                var t = function(e, n) {
                                    return t = Object.setPrototypeOf || {
                                        __proto__: []
                                    }
                                    instanceof Array && function(t, e) {
                                        t.__proto__ = e
                                    } || function(t, e) {
                                        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                                    }, t(e, n)
                                };
                                return function(e, n) {
                                    function r() {
                                        this.constructor = e
                                    }
                                    t(e, n), e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                                }
                            }(),
                            Yt = function(t) {
                                function e(e, n) {
                                    var r = t.call(this, e, n) || this;
                                    return r.members = new Nt, r
                                }
                                return Ft(e, t), e.prototype.authorize = function(e, n) {
                                    var r = this;
                                    t.prototype.authorize.call(this, e, (function(t, e) {
                                        if (!t) {
                                            if (void 0 === e.channel_data) {
                                                var i = Y("authenticationEndpoint");
                                                return N.error("Invalid auth response for channel '" + r.name + "',expected 'channel_data' field. " + i), void n("Invalid auth response")
                                            }
                                            var o = JSON.parse(e.channel_data);
                                            r.members.setMyID(o.user_id)
                                        }
                                        n(t, e)
                                    }))
                                }, e.prototype.handleEvent = function(t) {
                                    var e = t.event;
                                    if (0 === e.indexOf("pusher_internal:")) this.handleInternalEvent(t);
                                    else {
                                        var n = t.data,
                                            r = {};
                                        t.user_id && (r.user_id = t.user_id), this.emit(e, n, r)
                                    }
                                }, e.prototype.handleInternalEvent = function(t) {
                                    var e = t.event,
                                        n = t.data;
                                    switch (e) {
                                        case "pusher_internal:subscription_succeeded":
                                            this.handleSubscriptionSucceededEvent(t);
                                            break;
                                        case "pusher_internal:member_added":
                                            var r = this.members.addMember(n);
                                            this.emit("pusher:member_added", r);
                                            break;
                                        case "pusher_internal:member_removed":
                                            var i = this.members.removeMember(n);
                                            i && this.emit("pusher:member_removed", i)
                                    }
                                }, e.prototype.handleSubscriptionSucceededEvent = function(t) {
                                    this.subscriptionPending = !1, this.subscribed = !0, this.subscriptionCancelled ? this.pusher.unsubscribe(this.name) : (this.members.onSubscription(t.data), this.emit("pusher:subscription_succeeded", this.members))
                                }, e.prototype.disconnect = function() {
                                    this.members.reset(), t.prototype.disconnect.call(this)
                                }, e
                            }(Dt),
                            Ht = n(0),
                            qt = n(1),
                            Jt = function() {
                                var t = function(e, n) {
                                    return t = Object.setPrototypeOf || {
                                        __proto__: []
                                    }
                                    instanceof Array && function(t, e) {
                                        t.__proto__ = e
                                    } || function(t, e) {
                                        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                                    }, t(e, n)
                                };
                                return function(e, n) {
                                    function r() {
                                        this.constructor = e
                                    }
                                    t(e, n), e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                                }
                            }(),
                            Xt = function(t) {
                                function e() {
                                    var e = null !== t && t.apply(this, arguments) || this;
                                    return e.key = null, e
                                }
                                return Jt(e, t), e.prototype.authorize = function(e, n) {
                                    var r = this;
                                    t.prototype.authorize.call(this, e, (function(t, e) {
                                        if (t) n(!0, e);
                                        else {
                                            var i = e.shared_secret;
                                            if (i) r.key = Object(qt.decodeBase64)(i), delete e.shared_secret, n(!1, e);
                                            else {
                                                var o = "No shared_secret key in auth payload for encrypted channel: " + r.name;
                                                n(!0, o)
                                            }
                                        }
                                    }))
                                }, e.prototype.trigger = function(t, e) {
                                    throw new Ut("Client events are not currently supported for encrypted channels")
                                }, e.prototype.handleEvent = function(e) {
                                    var n = e.event,
                                        r = e.data;
                                    0 !== n.indexOf("pusher_internal:") && 0 !== n.indexOf("pusher:") ? this.handleEncryptedEvent(n, r) : t.prototype.handleEvent.call(this, e)
                                }, e.prototype.handleEncryptedEvent = function(t, e) {
                                    var n = this;
                                    if (this.key)
                                        if (e.ciphertext && e.nonce) {
                                            var r = Object(qt.decodeBase64)(e.ciphertext);
                                            if (r.length < Ht.secretbox.overheadLength) N.error("Expected encrypted event ciphertext length to be " + Ht.secretbox.overheadLength + ", got: " + r.length);
                                            else {
                                                var i = Object(qt.decodeBase64)(e.nonce);
                                                if (i.length < Ht.secretbox.nonceLength) N.error("Expected encrypted event nonce length to be " + Ht.secretbox.nonceLength + ", got: " + i.length);
                                                else {
                                                    var o = Ht.secretbox.open(r, i, this.key);
                                                    if (null === o) return N.debug("Failed to decrypt an event, probably because it was encrypted with a different key. Fetching a new key from the authEndpoint..."), void this.authorize(this.pusher.connection.socket_id, (function(e, s) {
                                                        e ? N.error("Failed to make a request to the authEndpoint: " + s + ". Unable to fetch new key, so dropping encrypted event") : null !== (o = Ht.secretbox.open(r, i, n.key)) ? n.emitJSON(t, Object(qt.encodeUTF8)(o)) : N.error("Failed to decrypt event with new key. Dropping encrypted event")
                                                    }));
                                                    this.emitJSON(t, Object(qt.encodeUTF8)(o))
                                                }
                                            }
                                        } else N.error("Unexpected format for encrypted event, expected object with `ciphertext` and `nonce` fields, got: " + e);
                                    else N.debug("Received encrypted event before key has been retrieved from the authEndpoint")
                                }, e.prototype.emitJSON = function(t, e) {
                                    try {
                                        this.emit(t, JSON.parse(e))
                                    } catch (n) {
                                        this.emit(t, e)
                                    }
                                    return this
                                }, e
                            }(Dt),
                            Wt = Xt,
                            Kt = function() {
                                var t = function(e, n) {
                                    return t = Object.setPrototypeOf || {
                                        __proto__: []
                                    }
                                    instanceof Array && function(t, e) {
                                        t.__proto__ = e
                                    } || function(t, e) {
                                        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                                    }, t(e, n)
                                };
                                return function(e, n) {
                                    function r() {
                                        this.constructor = e
                                    }
                                    t(e, n), e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                                }
                            }(),
                            Gt = function(t) {
                                function e(e, n) {
                                    var r = t.call(this) || this;
                                    r.key = e, r.options = n || {}, r.state = "initialized", r.connection = null, r.usingTLS = !!n.useTLS, r.timeline = r.options.timeline, r.errorCallbacks = r.buildErrorCallbacks(), r.connectionCallbacks = r.buildConnectionCallbacks(r.errorCallbacks), r.handshakeCallbacks = r.buildHandshakeCallbacks(r.errorCallbacks);
                                    var i = Ee.getNetwork();
                                    return i.bind("online", (function() {
                                        r.timeline.info({
                                            netinfo: "online"
                                        }), "connecting" !== r.state && "unavailable" !== r.state || r.retryIn(0)
                                    })), i.bind("offline", (function() {
                                        r.timeline.info({
                                            netinfo: "offline"
                                        }), r.connection && r.sendActivityCheck()
                                    })), r.updateStrategy(), r
                                }
                                return Kt(e, t), e.prototype.connect = function() {
                                    this.connection || this.runner || (this.strategy.isSupported() ? (this.updateState("connecting"), this.startConnecting(), this.setUnavailableTimer()) : this.updateState("failed"))
                                }, e.prototype.send = function(t) {
                                    return !!this.connection && this.connection.send(t)
                                }, e.prototype.send_event = function(t, e, n) {
                                    return !!this.connection && this.connection.send_event(t, e, n)
                                }, e.prototype.disconnect = function() {
                                    this.disconnectInternally(), this.updateState("disconnected")
                                }, e.prototype.isUsingTLS = function() {
                                    return this.usingTLS
                                }, e.prototype.startConnecting = function() {
                                    var t = this,
                                        e = function(n, r) {
                                            n ? t.runner = t.strategy.connect(0, e) : "error" === r.action ? (t.emit("error", {
                                                type: "HandshakeError",
                                                error: r.error
                                            }), t.timeline.error({
                                                handshakeError: r.error
                                            })) : (t.abortConnecting(), t.handshakeCallbacks[r.action](r))
                                        };
                                    this.runner = this.strategy.connect(0, e)
                                }, e.prototype.abortConnecting = function() {
                                    this.runner && (this.runner.abort(), this.runner = null)
                                }, e.prototype.disconnectInternally = function() {
                                    this.abortConnecting(), this.clearRetryTimer(), this.clearUnavailableTimer(), this.connection && this.abandonConnection().close()
                                }, e.prototype.updateStrategy = function() {
                                    this.strategy = this.options.getStrategy({
                                        key: this.key,
                                        timeline: this.timeline,
                                        useTLS: this.usingTLS
                                    })
                                }, e.prototype.retryIn = function(t) {
                                    var e = this;
                                    this.timeline.info({
                                        action: "retry",
                                        delay: t
                                    }), t > 0 && this.emit("connecting_in", Math.round(t / 1e3)), this.retryTimer = new S(t || 0, (function() {
                                        e.disconnectInternally(), e.connect()
                                    }))
                                }, e.prototype.clearRetryTimer = function() {
                                    this.retryTimer && (this.retryTimer.ensureAborted(), this.retryTimer = null)
                                }, e.prototype.setUnavailableTimer = function() {
                                    var t = this;
                                    this.unavailableTimer = new S(this.options.unavailableTimeout, (function() {
                                        t.updateState("unavailable")
                                    }))
                                }, e.prototype.clearUnavailableTimer = function() {
                                    this.unavailableTimer && this.unavailableTimer.ensureAborted()
                                }, e.prototype.sendActivityCheck = function() {
                                    var t = this;
                                    this.stopActivityCheck(), this.connection.ping(), this.activityTimer = new S(this.options.pongTimeout, (function() {
                                        t.timeline.error({
                                            pong_timed_out: t.options.pongTimeout
                                        }), t.retryIn(0)
                                    }))
                                }, e.prototype.resetActivityCheck = function() {
                                    var t = this;
                                    this.stopActivityCheck(), this.connection && !this.connection.handlesActivityChecks() && (this.activityTimer = new S(this.activityTimeout, (function() {
                                        t.sendActivityCheck()
                                    })))
                                }, e.prototype.stopActivityCheck = function() {
                                    this.activityTimer && this.activityTimer.ensureAborted()
                                }, e.prototype.buildConnectionCallbacks = function(t) {
                                    var e = this;
                                    return E({}, t, {
                                        message: function(t) {
                                            e.resetActivityCheck(), e.emit("message", t)
                                        },
                                        ping: function() {
                                            e.send_event("pusher:pong", {})
                                        },
                                        activity: function() {
                                            e.resetActivityCheck()
                                        },
                                        error: function(t) {
                                            e.emit("error", {
                                                type: "WebSocketError",
                                                error: t
                                            })
                                        },
                                        closed: function() {
                                            e.abandonConnection(), e.shouldRetry() && e.retryIn(1e3)
                                        }
                                    })
                                }, e.prototype.buildHandshakeCallbacks = function(t) {
                                    var e = this;
                                    return E({}, t, {
                                        connected: function(t) {
                                            e.activityTimeout = Math.min(e.options.activityTimeout, t.activityTimeout, t.connection.activityTimeout || 1 / 0), e.clearUnavailableTimer(), e.setConnection(t.connection), e.socket_id = e.connection.id, e.updateState("connected", {
                                                socket_id: e.socket_id
                                            })
                                        }
                                    })
                                }, e.prototype.buildErrorCallbacks = function() {
                                    var t = this,
                                        e = function(e) {
                                            return function(n) {
                                                n.error && t.emit("error", {
                                                    type: "WebSocketError",
                                                    error: n.error
                                                }), e(n)
                                            }
                                        };
                                    return {
                                        tls_only: e((function() {
                                            t.usingTLS = !0, t.updateStrategy(), t.retryIn(0)
                                        })),
                                        refused: e((function() {
                                            t.disconnect()
                                        })),
                                        backoff: e((function() {
                                            t.retryIn(1e3)
                                        })),
                                        retry: e((function() {
                                            t.retryIn(0)
                                        }))
                                    }
                                }, e.prototype.setConnection = function(t) {
                                    for (var e in this.connection = t, this.connectionCallbacks) this.connection.bind(e, this.connectionCallbacks[e]);
                                    this.resetActivityCheck()
                                }, e.prototype.abandonConnection = function() {
                                    if (this.connection) {
                                        for (var t in this.stopActivityCheck(), this.connectionCallbacks) this.connection.unbind(t, this.connectionCallbacks[t]);
                                        var e = this.connection;
                                        return this.connection = null, e
                                    }
                                }, e.prototype.updateState = function(t, e) {
                                    var n = this.state;
                                    if (this.state = t, n !== t) {
                                        var r = t;
                                        "connected" === r && (r += " with new socket ID " + e.socket_id), N.debug("State changed", n + " -> " + r), this.timeline.info({
                                            state: t,
                                            params: e
                                        }), this.emit("state_change", {
                                            previous: n,
                                            current: t
                                        }), this.emit(t, e)
                                    }
                                }, e.prototype.shouldRetry = function() {
                                    return "connecting" === this.state || "connected" === this.state
                                }, e
                            }(nt),
                            Vt = function() {
                                function t() {
                                    this.channels = {}
                                }
                                return t.prototype.add = function(t, e) {
                                    return this.channels[t] || (this.channels[t] = function(t, e) {
                                        return 0 === t.indexOf("private-encrypted-") ? Qt.createEncryptedChannel(t, e) : 0 === t.indexOf("private-") ? Qt.createPrivateChannel(t, e) : 0 === t.indexOf("presence-") ? Qt.createPresenceChannel(t, e) : Qt.createChannel(t, e)
                                    }(t, e)), this.channels[t]
                                }, t.prototype.all = function() {
                                    return function(t) {
                                        var e = [];
                                        return O(t, (function(t) {
                                            e.push(t)
                                        })), e
                                    }(this.channels)
                                }, t.prototype.find = function(t) {
                                    return this.channels[t]
                                }, t.prototype.remove = function(t) {
                                    var e = this.channels[t];
                                    return delete this.channels[t], e
                                }, t.prototype.disconnect = function() {
                                    O(this.channels, (function(t) {
                                        t.disconnect()
                                    }))
                                }, t
                            }(),
                            Zt = Vt,
                            Qt = {
                                createChannels: function() {
                                    return new Zt
                                },
                                createConnectionManager: function(t, e) {
                                    return new Gt(t, e)
                                },
                                createChannel: function(t, e) {
                                    return new Bt(t, e)
                                },
                                createPrivateChannel: function(t, e) {
                                    return new Dt(t, e)
                                },
                                createPresenceChannel: function(t, e) {
                                    return new Yt(t, e)
                                },
                                createEncryptedChannel: function(t, e) {
                                    return new Wt(t, e)
                                },
                                createTimelineSender: function(t, e) {
                                    return new Et(t, e)
                                },
                                createAuthorizer: function(t, e) {
                                    return e.authorizer ? e.authorizer(t, e) : new Tt(t, e)
                                },
                                createHandshake: function(t, e) {
                                    return new Ct(t, e)
                                },
                                createAssistantToTheTransportManager: function(t, e, n) {
                                    return new vt(t, e, n)
                                }
                            },
                            te = function() {
                                function t(t) {
                                    this.options = t || {}, this.livesLeft = this.options.lives || 1 / 0
                                }
                                return t.prototype.getAssistant = function(t) {
                                    return Qt.createAssistantToTheTransportManager(this, t, {
                                        minPingDelay: this.options.minPingDelay,
                                        maxPingDelay: this.options.maxPingDelay
                                    })
                                }, t.prototype.isAlive = function() {
                                    return this.livesLeft > 0
                                }, t.prototype.reportDeath = function() {
                                    this.livesLeft -= 1
                                }, t
                            }(),
                            ee = function() {
                                function t(t, e) {
                                    this.strategies = t, this.loop = Boolean(e.loop), this.failFast = Boolean(e.failFast), this.timeout = e.timeout, this.timeoutLimit = e.timeoutLimit
                                }
                                return t.prototype.isSupported = function() {
                                    return I(this.strategies, T.method("isSupported"))
                                }, t.prototype.connect = function(t, e) {
                                    var n = this,
                                        r = this.strategies,
                                        i = 0,
                                        o = this.timeout,
                                        s = null,
                                        a = function(c, u) {
                                            u ? e(null, u) : (i += 1, n.loop && (i %= r.length), i < r.length ? (o && (o *= 2, n.timeoutLimit && (o = Math.min(o, n.timeoutLimit))), s = n.tryStrategy(r[i], t, {
                                                timeout: o,
                                                failFast: n.failFast
                                            }, a)) : e(!0))
                                        };
                                    return s = this.tryStrategy(r[i], t, {
                                        timeout: o,
                                        failFast: this.failFast
                                    }, a), {
                                        abort: function() {
                                            s.abort()
                                        },
                                        forceMinPriority: function(e) {
                                            t = e, s && s.forceMinPriority(e)
                                        }
                                    }
                                }, t.prototype.tryStrategy = function(t, e, n, r) {
                                    var i = null,
                                        o = null;
                                    return n.timeout > 0 && (i = new S(n.timeout, (function() {
                                        o.abort(), r(!0)
                                    }))), o = t.connect(e, (function(t, e) {
                                        t && i && i.isRunning() && !n.failFast || (i && i.ensureAborted(), r(t, e))
                                    })), {
                                        abort: function() {
                                            i && i.ensureAborted(), o.abort()
                                        },
                                        forceMinPriority: function(t) {
                                            o.forceMinPriority(t)
                                        }
                                    }
                                }, t
                            }(),
                            ne = function() {
                                function t(t) {
                                    this.strategies = t
                                }
                                return t.prototype.isSupported = function() {
                                    return I(this.strategies, T.method("isSupported"))
                                }, t.prototype.connect = function(t, e) {
                                    return function(t, e, n) {
                                        var r = U(t, (function(t, r, i, o) {
                                            return t.connect(e, n(r, o))
                                        }));
                                        return {
                                            abort: function() {
                                                j(r, re)
                                            },
                                            forceMinPriority: function(t) {
                                                j(r, (function(e) {
                                                    e.forceMinPriority(t)
                                                }))
                                            }
                                        }
                                    }(this.strategies, t, (function(t, n) {
                                        return function(r, i) {
                                            n[t].error = r, r ? function(t) {
                                                return function(t, e) {
                                                    for (var n = 0; n < t.length; n++)
                                                        if (!e(t[n], n, t)) return !1;
                                                    return !0
                                                }(t, (function(t) {
                                                    return Boolean(t.error)
                                                }))
                                            }(n) && e(!0) : (j(n, (function(t) {
                                                t.forceMinPriority(i.transport.priority)
                                            })), e(null, i))
                                        }
                                    }))
                                }, t
                            }();

                        function re(t) {
                            t.error || t.aborted || (t.abort(), t.aborted = !0)
                        }
                        var ie = function() {
                                function t(t, e, n) {
                                    this.strategy = t, this.transports = e, this.ttl = n.ttl || 18e5, this.usingTLS = n.useTLS, this.timeline = n.timeline
                                }
                                return t.prototype.isSupported = function() {
                                    return this.strategy.isSupported()
                                }, t.prototype.connect = function(t, e) {
                                    var n = this.usingTLS,
                                        r = function(t) {
                                            var e = Ee.getLocalStorage();
                                            if (e) try {
                                                var n = e[se(t)];
                                                if (n) return JSON.parse(n)
                                            } catch (e) {
                                                ae(t)
                                            }
                                            return null
                                        }(n),
                                        i = [this.strategy];
                                    if (r && r.timestamp + this.ttl >= T.now()) {
                                        var o = this.transports[r.transport];
                                        o && (this.timeline.info({
                                            cached: !0,
                                            transport: r.transport,
                                            latency: r.latency
                                        }), i.push(new ee([o], {
                                            timeout: 2 * r.latency + 1e3,
                                            failFast: !0
                                        })))
                                    }
                                    var s = T.now(),
                                        a = i.pop().connect(t, (function r(o, c) {
                                            o ? (ae(n), i.length > 0 ? (s = T.now(), a = i.pop().connect(t, r)) : e(o)) : (function(t, e, n) {
                                                var r = Ee.getLocalStorage();
                                                if (r) try {
                                                    r[se(t)] = $({
                                                        timestamp: T.now(),
                                                        transport: e,
                                                        latency: n
                                                    })
                                                } catch (t) {}
                                            }(n, c.transport.name, T.now() - s), e(null, c))
                                        }));
                                    return {
                                        abort: function() {
                                            a.abort()
                                        },
                                        forceMinPriority: function(e) {
                                            t = e, a && a.forceMinPriority(e)
                                        }
                                    }
                                }, t
                            }(),
                            oe = ie;

                        function se(t) {
                            return "pusherTransport" + (t ? "TLS" : "NonTLS")
                        }

                        function ae(t) {
                            var e = Ee.getLocalStorage();
                            if (e) try {
                                delete e[se(t)]
                            } catch (t) {}
                        }
                        var ce = function() {
                                function t(t, e) {
                                    var n = e.delay;
                                    this.strategy = t, this.options = {
                                        delay: n
                                    }
                                }
                                return t.prototype.isSupported = function() {
                                    return this.strategy.isSupported()
                                }, t.prototype.connect = function(t, e) {
                                    var n, r = this.strategy,
                                        i = new S(this.options.delay, (function() {
                                            n = r.connect(t, e)
                                        }));
                                    return {
                                        abort: function() {
                                            i.ensureAborted(), n && n.abort()
                                        },
                                        forceMinPriority: function(e) {
                                            t = e, n && n.forceMinPriority(e)
                                        }
                                    }
                                }, t
                            }(),
                            ue = function() {
                                function t(t, e, n) {
                                    this.test = t, this.trueBranch = e, this.falseBranch = n
                                }
                                return t.prototype.isSupported = function() {
                                    return (this.test() ? this.trueBranch : this.falseBranch).isSupported()
                                }, t.prototype.connect = function(t, e) {
                                    return (this.test() ? this.trueBranch : this.falseBranch).connect(t, e)
                                }, t
                            }(),
                            he = function() {
                                function t(t) {
                                    this.strategy = t
                                }
                                return t.prototype.isSupported = function() {
                                    return this.strategy.isSupported()
                                }, t.prototype.connect = function(t, e) {
                                    var n = this.strategy.connect(t, (function(t, r) {
                                        r && n.abort(), e(t, r)
                                    }));
                                    return n
                                }, t
                            }();

                        function fe(t) {
                            return function() {
                                return t.isSupported()
                            }
                        }
                        var le, pe = function(t, e) {
                                var n = {};

                                function r(r, i, o, s, a) {
                                    var c = e(t, r, i, o, s, a);
                                    return n[r] = c, c
                                }
                                var i, o = {
                                        hostNonTLS: t.wsHost + ":" + t.wsPort,
                                        hostTLS: t.wsHost + ":" + t.wssPort,
                                        httpPath: t.wsPath
                                    },
                                    s = E({}, o, {
                                        useTLS: !0
                                    }),
                                    a = {
                                        hostNonTLS: t.httpHost + ":" + t.httpPort,
                                        hostTLS: t.httpHost + ":" + t.httpsPort,
                                        httpPath: t.httpPath
                                    },
                                    c = {
                                        loop: !0,
                                        timeout: 15e3,
                                        timeoutLimit: 6e4
                                    },
                                    u = new te({
                                        lives: 2,
                                        minPingDelay: 1e4,
                                        maxPingDelay: t.activity_timeout
                                    }),
                                    h = new te({
                                        lives: 2,
                                        minPingDelay: 1e4,
                                        maxPingDelay: t.activity_timeout
                                    }),
                                    f = r("ws", "ws", 3, o, u),
                                    l = r("wss", "ws", 3, s, u),
                                    p = r("sockjs", "sockjs", 1, a),
                                    d = r("xhr_streaming", "xhr_streaming", 1, a, h),
                                    g = r("xdr_streaming", "xdr_streaming", 1, a, h),
                                    y = r("xhr_polling", "xhr_polling", 1, a),
                                    m = r("xdr_polling", "xdr_polling", 1, a),
                                    b = new ee([f], c),
                                    k = new ee([l], c),
                                    v = new ee([p], c),
                                    w = new ee([new ue(fe(d), d, g)], c),
                                    _ = new ee([new ue(fe(y), y, m)], c),
                                    S = new ee([new ue(fe(w), new ne([w, new ce(_, {
                                        delay: 4e3
                                    })]), _)], c),
                                    x = new ue(fe(S), S, v);
                                return i = t.useTLS ? new ne([b, new ce(x, {
                                    delay: 2e3
                                })]) : new ne([b, new ce(k, {
                                    delay: 2e3
                                }), new ce(x, {
                                    delay: 5e3
                                })]), new oe(new he(new ue(fe(f), i, x)), n, {
                                    ttl: 18e5,
                                    timeline: t.timeline,
                                    useTLS: t.useTLS
                                })
                            },
                            de = {
                                getRequest: function(t) {
                                    var e = new window.XDomainRequest;
                                    return e.ontimeout = function() {
                                        t.emit("error", new Ot), t.close()
                                    }, e.onerror = function(e) {
                                        t.emit("error", e), t.close()
                                    }, e.onprogress = function() {
                                        e.responseText && e.responseText.length > 0 && t.onChunk(200, e.responseText)
                                    }, e.onload = function() {
                                        e.responseText && e.responseText.length > 0 && t.onChunk(200, e.responseText), t.emit("finished", 200), t.close()
                                    }, e
                                },
                                abortRequest: function(t) {
                                    t.ontimeout = t.onerror = t.onprogress = t.onload = null, t.abort()
                                }
                            },
                            ge = function() {
                                var t = function(e, n) {
                                    return t = Object.setPrototypeOf || {
                                        __proto__: []
                                    }
                                    instanceof Array && function(t, e) {
                                        t.__proto__ = e
                                    } || function(t, e) {
                                        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                                    }, t(e, n)
                                };
                                return function(e, n) {
                                    function r() {
                                        this.constructor = e
                                    }
                                    t(e, n), e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
                                }
                            }(),
                            ye = function(t) {
                                function e(e, n, r) {
                                    var i = t.call(this) || this;
                                    return i.hooks = e, i.method = n, i.url = r, i
                                }
                                return ge(e, t), e.prototype.start = function(t) {
                                    var e = this;
                                    this.position = 0, this.xhr = this.hooks.getRequest(this), this.unloader = function() {
                                        e.close()
                                    }, Ee.addUnloadListener(this.unloader), this.xhr.open(this.method, this.url, !0), this.xhr.setRequestHeader && this.xhr.setRequestHeader("Content-Type", "application/json"), this.xhr.send(t)
                                }, e.prototype.close = function() {
                                    this.unloader && (Ee.removeUnloadListener(this.unloader), this.unloader = null), this.xhr && (this.hooks.abortRequest(this.xhr), this.xhr = null)
                                }, e.prototype.onChunk = function(t, e) {
                                    for (;;) {
                                        var n = this.advanceBuffer(e);
                                        if (!n) break;
                                        this.emit("chunk", {
                                            status: t,
                                            data: n
                                        })
                                    }
                                    this.isBufferTooLong(e) && this.emit("buffer_too_long")
                                }, e.prototype.advanceBuffer = function(t) {
                                    var e = t.slice(this.position),
                                        n = e.indexOf("\n");
                                    return -1 !== n ? (this.position += n + 1, e.slice(0, n)) : null
                                }, e.prototype.isBufferTooLong = function(t) {
                                    return this.position === t.length && t.length > 262144
                                }, e
                            }(nt);
                        ! function(t) {
                            t[t.CONNECTING = 0] = "CONNECTING", t[t.OPEN = 1] = "OPEN", t[t.CLOSED = 3] = "CLOSED"
                        }(le || (le = {}));
                        var me = le,
                            be = 1;

                        function ke(t) {
                            var e = -1 === t.indexOf("?") ? "?" : "&";
                            return t + e + "t=" + +new Date + "&n=" + be++
                        }

                        function ve(t) {
                            return Math.floor(Math.random() * t)
                        }
                        var we, _e = function() {
                                function t(t, e) {
                                    this.hooks = t, this.session = ve(1e3) + "/" + function(t) {
                                        for (var e = [], n = 0; n < t; n++) e.push(ve(32).toString(32));
                                        return e.join("")
                                    }(8), this.location = function(t) {
                                        var e = /([^\?]*)\/*(\??.*)/.exec(t);
                                        return {
                                            base: e[1],
                                            queryString: e[2]
                                        }
                                    }(e), this.readyState = me.CONNECTING, this.openStream()
                                }
                                return t.prototype.send = function(t) {
                                    return this.sendRaw(JSON.stringify([t]))
                                }, t.prototype.ping = function() {
                                    this.hooks.sendHeartbeat(this)
                                }, t.prototype.close = function(t, e) {
                                    this.onClose(t, e, !0)
                                }, t.prototype.sendRaw = function(t) {
                                    if (this.readyState !== me.OPEN) return !1;
                                    try {
                                        return Ee.createSocketRequest("POST", ke((e = this.location, n = this.session, e.base + "/" + n + "/xhr_send"))).start(t), !0
                                    } catch (t) {
                                        return !1
                                    }
                                    var e, n
                                }, t.prototype.reconnect = function() {
                                    this.closeStream(), this.openStream()
                                }, t.prototype.onClose = function(t, e, n) {
                                    this.closeStream(), this.readyState = me.CLOSED, this.onclose && this.onclose({
                                        code: t,
                                        reason: e,
                                        wasClean: n
                                    })
                                }, t.prototype.onChunk = function(t) {
                                    var e;
                                    if (200 === t.status) switch (this.readyState === me.OPEN && this.onActivity(), t.data.slice(0, 1)) {
                                        case "o":
                                            e = JSON.parse(t.data.slice(1) || "{}"), this.onOpen(e);
                                            break;
                                        case "a":
                                            e = JSON.parse(t.data.slice(1) || "[]");
                                            for (var n = 0; n < e.length; n++) this.onEvent(e[n]);
                                            break;
                                        case "m":
                                            e = JSON.parse(t.data.slice(1) || "null"), this.onEvent(e);
                                            break;
                                        case "h":
                                            this.hooks.onHeartbeat(this);
                                            break;
                                        case "c":
                                            e = JSON.parse(t.data.slice(1) || "[]"), this.onClose(e[0], e[1], !0)
                                    }
                                }, t.prototype.onOpen = function(t) {
                                    var e, n, r;
                                    this.readyState === me.CONNECTING ? (t && t.hostname && (this.location.base = (e = this.location.base, n = t.hostname, (r = /(https?:\/\/)([^\/:]+)((\/|:)?.*)/.exec(e))[1] + n + r[3])), this.readyState = me.OPEN, this.onopen && this.onopen()) : this.onClose(1006, "Server lost session", !0)
                                }, t.prototype.onEvent = function(t) {
                                    this.readyState === me.OPEN && this.onmessage && this.onmessage({
                                        data: t
                                    })
                                }, t.prototype.onActivity = function() {
                                    this.onactivity && this.onactivity()
                                }, t.prototype.onError = function(t) {
                                    this.onerror && this.onerror(t)
                                }, t.prototype.openStream = function() {
                                    var t = this;
                                    this.stream = Ee.createSocketRequest("POST", ke(this.hooks.getReceiveURL(this.location, this.session))), this.stream.bind("chunk", (function(e) {
                                        t.onChunk(e)
                                    })), this.stream.bind("finished", (function(e) {
                                        t.hooks.onFinished(t, e)
                                    })), this.stream.bind("buffer_too_long", (function() {
                                        t.reconnect()
                                    }));
                                    try {
                                        this.stream.start()
                                    } catch (e) {
                                        T.defer((function() {
                                            t.onError(e), t.onClose(1006, "Could not start streaming", !1)
                                        }))
                                    }
                                }, t.prototype.closeStream = function() {
                                    this.stream && (this.stream.unbind_all(), this.stream.close(), this.stream = null)
                                }, t
                            }(),
                            Se = {
                                getReceiveURL: function(t, e) {
                                    return t.base + "/" + e + "/xhr_streaming" + t.queryString
                                },
                                onHeartbeat: function(t) {
                                    t.sendRaw("[]")
                                },
                                sendHeartbeat: function(t) {
                                    t.sendRaw("[]")
                                },
                                onFinished: function(t, e) {
                                    t.onClose(1006, "Connection interrupted (" + e + ")", !1)
                                }
                            },
                            xe = {
                                getReceiveURL: function(t, e) {
                                    return t.base + "/" + e + "/xhr" + t.queryString
                                },
                                onHeartbeat: function() {},
                                sendHeartbeat: function(t) {
                                    t.sendRaw("[]")
                                },
                                onFinished: function(t, e) {
                                    200 === e ? t.reconnect() : t.onClose(1006, "Connection interrupted (" + e + ")", !1)
                                }
                            },
                            Ce = {
                                getRequest: function(t) {
                                    var e = new(Ee.getXHRAPI());
                                    return e.onreadystatechange = e.onprogress = function() {
                                        switch (e.readyState) {
                                            case 3:
                                                e.responseText && e.responseText.length > 0 && t.onChunk(e.status, e.responseText);
                                                break;
                                            case 4:
                                                e.responseText && e.responseText.length > 0 && t.onChunk(e.status, e.responseText), t.emit("finished", e.status), t.close()
                                        }
                                    }, e
                                },
                                abortRequest: function(t) {
                                    t.onreadystatechange = null, t.abort()
                                }
                            },
                            Te = {
                                createStreamingSocket: function(t) {
                                    return this.createSocket(Se, t)
                                },
                                createPollingSocket: function(t) {
                                    return this.createSocket(xe, t)
                                },
                                createSocket: function(t, e) {
                                    return new _e(t, e)
                                },
                                createXHR: function(t, e) {
                                    return this.createRequest(Ce, t, e)
                                },
                                createRequest: function(t, e, n) {
                                    return new ye(t, e, n)
                                },
                                createXDR: function(t, e) {
                                    return this.createRequest(de, t, e)
                                }
                            },
                            Ee = {
                                nextAuthCallbackID: 1,
                                auth_callbacks: {},
                                ScriptReceivers: i,
                                DependenciesReceivers: a,
                                getDefaultStrategy: pe,
                                Transports: mt,
                                transportConnectionInitializer: function() {
                                    var t = this;
                                    t.timeline.info(t.buildTimelineMessage({
                                        transport: t.name + (t.options.useTLS ? "s" : "")
                                    })), t.hooks.isInitialized() ? t.changeState("initialized") : t.hooks.file ? (t.changeState("initializing"), c.load(t.hooks.file, {
                                        useTLS: t.options.useTLS
                                    }, (function(e, n) {
                                        t.hooks.isInitialized() ? (t.changeState("initialized"), n(!0)) : (e && t.onError(e), t.onClose(), n(!1))
                                    }))) : t.onClose()
                                },
                                HTTPFactory: Te,
                                TimelineTransport: W,
                                getXHRAPI: function() {
                                    return window.XMLHttpRequest
                                },
                                getWebSocketAPI: function() {
                                    return window.WebSocket || window.MozWebSocket
                                },
                                setup: function(t) {
                                    var e = this;
                                    window.Pusher = t;
                                    var n = function() {
                                        e.onDocumentBody(t.ready)
                                    };
                                    window.JSON ? n() : c.load("json2", {}, n)
                                },
                                getDocument: function() {
                                    return document
                                },
                                getProtocol: function() {
                                    return this.getDocument().location.protocol
                                },
                                getAuthorizers: function() {
                                    return {
                                        ajax: H,
                                        jsonp: q
                                    }
                                },
                                onDocumentBody: function(t) {
                                    var e = this;
                                    document.body ? t() : setTimeout((function() {
                                        e.onDocumentBody(t)
                                    }), 0)
                                },
                                createJSONPRequest: function(t, e) {
                                    return new X(t, e)
                                },
                                createScriptRequest: function(t) {
                                    return new J(t)
                                },
                                getLocalStorage: function() {
                                    try {
                                        return window.localStorage
                                    } catch (t) {
                                        return
                                    }
                                },
                                createXHR: function() {
                                    return this.getXHRAPI() ? this.createXMLHttpRequest() : this.createMicrosoftXHR()
                                },
                                createXMLHttpRequest: function() {
                                    return new(this.getXHRAPI())
                                },
                                createMicrosoftXHR: function() {
                                    return new ActiveXObject("Microsoft.XMLHTTP")
                                },
                                getNetwork: function() {
                                    return kt
                                },
                                createWebSocket: function(t) {
                                    return new(this.getWebSocketAPI())(t)
                                },
                                createSocketRequest: function(t, e) {
                                    if (this.isXHRSupported()) return this.HTTPFactory.createXHR(t, e);
                                    if (this.isXDRSupported(0 === e.indexOf("https:"))) return this.HTTPFactory.createXDR(t, e);
                                    throw "Cross-origin HTTP requests are not supported"
                                },
                                isXHRSupported: function() {
                                    var t = this.getXHRAPI();
                                    return Boolean(t) && void 0 !== (new t).withCredentials
                                },
                                isXDRSupported: function(t) {
                                    var e = t ? "https:" : "http:",
                                        n = this.getProtocol();
                                    return Boolean(window.XDomainRequest) && n === e
                                },
                                addUnloadListener: function(t) {
                                    void 0 !== window.addEventListener ? window.addEventListener("unload", t, !1) : void 0 !== window.attachEvent && window.attachEvent("onunload", t)
                                },
                                removeUnloadListener: function(t) {
                                    void 0 !== window.addEventListener ? window.removeEventListener("unload", t, !1) : void 0 !== window.detachEvent && window.detachEvent("onunload", t)
                                }
                            };
                        ! function(t) {
                            t[t.ERROR = 3] = "ERROR", t[t.INFO = 6] = "INFO", t[t.DEBUG = 7] = "DEBUG"
                        }(we || (we = {}));
                        var Ae = we,
                            Pe = function() {
                                function t(t, e, n) {
                                    this.key = t, this.session = e, this.events = [], this.options = n || {}, this.sent = 0, this.uniqueID = 0
                                }
                                return t.prototype.log = function(t, e) {
                                    t <= this.options.level && (this.events.push(E({}, e, {
                                        timestamp: T.now()
                                    })), this.options.limit && this.events.length > this.options.limit && this.events.shift())
                                }, t.prototype.error = function(t) {
                                    this.log(Ae.ERROR, t)
                                }, t.prototype.info = function(t) {
                                    this.log(Ae.INFO, t)
                                }, t.prototype.debug = function(t) {
                                    this.log(Ae.DEBUG, t)
                                }, t.prototype.isEmpty = function() {
                                    return 0 === this.events.length
                                }, t.prototype.send = function(t, e) {
                                    var n = this,
                                        r = E({
                                            session: this.session,
                                            bundle: this.sent + 1,
                                            key: this.key,
                                            lib: "js",
                                            version: this.options.version,
                                            cluster: this.options.cluster,
                                            features: this.options.features,
                                            timeline: this.events
                                        }, this.options.params);
                                    return this.events = [], t(r, (function(t, r) {
                                        t || n.sent++, e && e(t, r)
                                    })), !0
                                }, t.prototype.generateUniqueID = function() {
                                    return this.uniqueID++, this.uniqueID
                                }, t
                            }(),
                            Oe = function() {
                                function t(t, e, n, r) {
                                    this.name = t, this.priority = e, this.transport = n, this.options = r || {}
                                }
                                return t.prototype.isSupported = function() {
                                    return this.transport.isSupported({
                                        useTLS: this.options.useTLS
                                    })
                                }, t.prototype.connect = function(t, e) {
                                    var n = this;
                                    if (!this.isSupported()) return Re(new Mt, e);
                                    if (this.priority < t) return Re(new Rt, e);
                                    var r = !1,
                                        i = this.transport.createConnection(this.name, this.priority, this.options.key, this.options),
                                        o = null,
                                        s = function() {
                                            i.unbind("initialized", s), i.connect()
                                        },
                                        a = function() {
                                            o = Qt.createHandshake(i, (function(t) {
                                                r = !0, h(), e(null, t)
                                            }))
                                        },
                                        c = function(t) {
                                            h(), e(t)
                                        },
                                        u = function() {
                                            var t;
                                            h(), t = $(i), e(new jt(t))
                                        },
                                        h = function() {
                                            i.unbind("initialized", s), i.unbind("open", a), i.unbind("error", c), i.unbind("closed", u)
                                        };
                                    return i.bind("initialized", s), i.bind("open", a), i.bind("error", c), i.bind("closed", u), i.initialize(), {
                                        abort: function() {
                                            r || (h(), o ? o.close() : i.close())
                                        },
                                        forceMinPriority: function(t) {
                                            r || n.priority < t && (o ? o.close() : i.close())
                                        }
                                    }
                                }, t
                            }();

                        function Re(t, e) {
                            return T.defer((function() {
                                e(t)
                            })), {
                                abort: function() {},
                                forceMinPriority: function() {}
                            }
                        }
                        var je = Ee.Transports,
                            Ue = function(t, e, n, r, i, o) {
                                var s = je[n];
                                if (!s) throw new Lt(n);
                                return t.enabledTransports && -1 === P(t.enabledTransports, e) || t.disabledTransports && -1 !== P(t.disabledTransports, e) ? Le : new Oe(e, r, o ? o.getAssistant(s) : s, E({
                                    key: t.key,
                                    useTLS: t.useTLS,
                                    timeline: t.timeline,
                                    ignoreNullOrigin: t.ignoreNullOrigin
                                }, i))
                            },
                            Le = {
                                isSupported: function() {
                                    return !1
                                },
                                connect: function(t, e) {
                                    var n = T.defer((function() {
                                        e(new Mt)
                                    }));
                                    return {
                                        abort: function() {
                                            n.ensureAborted()
                                        },
                                        forceMinPriority: function() {}
                                    }
                                }
                            },
                            Me = function() {
                                function t(e, n) {
                                    var r, i = this;
                                    if (function(t) {
                                            if (null == t) throw "You must pass your app key when you instantiate Pusher."
                                        }(e), !(n = n || {}).cluster && !n.wsHost && !n.httpHost) {
                                        var s = Y("javascriptQuickStart");
                                        N.warn("You should always specify a cluster when connecting. " + s)
                                    }
                                    "disableStats" in n && (N.warn("The disableStats option is deprecated in favor of enableStats"), "enableStats" in n || (n.enableStats = !n.disableStats)), this.key = e, this.config = E({
                                        wsHost: o.host,
                                        wsPort: o.ws_port,
                                        wssPort: o.wss_port,
                                        wsPath: o.ws_path,
                                        httpHost: o.sockjs_host,
                                        httpPort: o.sockjs_http_port,
                                        httpsPort: o.sockjs_https_port,
                                        httpPath: o.sockjs_path,
                                        statsHost: o.stats_host,
                                        authEndpoint: o.channel_auth_endpoint,
                                        authTransport: o.channel_auth_transport,
                                        activity_timeout: o.activity_timeout,
                                        pong_timeout: o.pong_timeout,
                                        unavailable_timeout: o.unavailable_timeout
                                    }, n.cluster ? {
                                        wsHost: "ws-" + (r = n.cluster) + ".pusher.com",
                                        httpHost: "sockjs-" + r + ".pusher.com"
                                    } : {}, n), this.channels = Qt.createChannels(), this.global_emitter = new nt, this.sessionID = Math.floor(1e9 * Math.random()), this.timeline = new Pe(this.key, this.sessionID, {
                                        cluster: this.config.cluster,
                                        features: t.getClientFeatures(),
                                        params: this.config.timelineParams || {},
                                        limit: 50,
                                        level: Ae.INFO,
                                        version: o.VERSION
                                    }), this.config.enableStats && (this.timelineSender = Qt.createTimelineSender(this.timeline, {
                                        host: this.config.statsHost,
                                        path: "/timeline/v2/" + Ee.TimelineTransport.name
                                    })), this.connection = Qt.createConnectionManager(this.key, E({
                                        getStrategy: function(t) {
                                            var e = E({}, i.config, t);
                                            return Ee.getDefaultStrategy(e, Ue)
                                        },
                                        timeline: this.timeline,
                                        activityTimeout: this.config.activity_timeout,
                                        pongTimeout: this.config.pong_timeout,
                                        unavailableTimeout: this.config.unavailable_timeout
                                    }, this.config, {
                                        useTLS: this.shouldUseTLS()
                                    })), this.connection.bind("connected", (function() {
                                        i.subscribeAll(), i.timelineSender && i.timelineSender.send(i.connection.isUsingTLS())
                                    })), this.connection.bind("message", (function(t) {
                                        var e = 0 === t.event.indexOf("pusher_internal:");
                                        if (t.channel) {
                                            var n = i.channel(t.channel);
                                            n && n.handleEvent(t)
                                        }
                                        e || i.global_emitter.emit(t.event, t.data)
                                    })), this.connection.bind("connecting", (function() {
                                        i.channels.disconnect()
                                    })), this.connection.bind("disconnected", (function() {
                                        i.channels.disconnect()
                                    })), this.connection.bind("error", (function(t) {
                                        N.warn(t)
                                    })), t.instances.push(this), this.timeline.info({
                                        instances: t.instances.length
                                    }), t.isReady && this.connect()
                                }
                                return t.ready = function() {
                                    t.isReady = !0;
                                    for (var e = 0, n = t.instances.length; e < n; e++) t.instances[e].connect()
                                }, t.getClientFeatures = function() {
                                    return R(M({
                                        ws: Ee.Transports.ws
                                    }, (function(t) {
                                        return t.isSupported({})
                                    })))
                                }, t.prototype.channel = function(t) {
                                    return this.channels.find(t)
                                }, t.prototype.allChannels = function() {
                                    return this.channels.all()
                                }, t.prototype.connect = function() {
                                    if (this.connection.connect(), this.timelineSender && !this.timelineSenderTimer) {
                                        var t = this.connection.isUsingTLS(),
                                            e = this.timelineSender;
                                        this.timelineSenderTimer = new x(6e4, (function() {
                                            e.send(t)
                                        }))
                                    }
                                }, t.prototype.disconnect = function() {
                                    this.connection.disconnect(), this.timelineSenderTimer && (this.timelineSenderTimer.ensureAborted(), this.timelineSenderTimer = null)
                                }, t.prototype.bind = function(t, e, n) {
                                    return this.global_emitter.bind(t, e, n), this
                                }, t.prototype.unbind = function(t, e, n) {
                                    return this.global_emitter.unbind(t, e, n), this
                                }, t.prototype.bind_global = function(t) {
                                    return this.global_emitter.bind_global(t), this
                                }, t.prototype.unbind_global = function(t) {
                                    return this.global_emitter.unbind_global(t), this
                                }, t.prototype.unbind_all = function(t) {
                                    return this.global_emitter.unbind_all(), this
                                }, t.prototype.subscribeAll = function() {
                                    var t;
                                    for (t in this.channels.channels) this.channels.channels.hasOwnProperty(t) && this.subscribe(t)
                                }, t.prototype.subscribe = function(t) {
                                    var e = this.channels.add(t, this);
                                    return e.subscriptionPending && e.subscriptionCancelled ? e.reinstateSubscription() : e.subscriptionPending || "connected" !== this.connection.state || e.subscribe(), e
                                }, t.prototype.unsubscribe = function(t) {
                                    var e = this.channels.find(t);
                                    e && e.subscriptionPending ? e.cancelSubscription() : (e = this.channels.remove(t)) && "connected" === this.connection.state && e.unsubscribe()
                                }, t.prototype.send_event = function(t, e, n) {
                                    return this.connection.send_event(t, e, n)
                                }, t.prototype.shouldUseTLS = function() {
                                    return "https:" === Ee.getProtocol() || !0 === this.config.forceTLS || Boolean(this.config.encrypted)
                                }, t.instances = [], t.isReady = !1, t.logToConsole = !1, t.Runtime = Ee, t.ScriptReceivers = Ee.ScriptReceivers, t.DependenciesReceivers = Ee.DependenciesReceivers, t.auth_callbacks = Ee.auth_callbacks, t
                            }(),
                            Ie = e.default = Me;
                        Ee.setup(Me)
                    }])
                }, t.exports = r()
            },
            9602: t => {
                "use strict";
                t.exports = JSON.parse('{"z":["ahole","anus","ash0le","ash0les","asholes","ass","Ass Monkey","Assface","assh0le","assh0lez","asshole","assholes","assholz","asswipe","azzhole","bassterds","bastard","bastards","bastardz","basterds","basterdz","Biatch","bitch","bitches","Blow Job","boffing","butthole","buttwipe","c0ck","c0cks","c0k","Carpet Muncher","cawk","cawks","Clit","cnts","cntz","cock","cockhead","cock-head","cocks","CockSucker","cock-sucker","crap","cum","cunt","cunts","cuntz","dick","dild0","dild0s","dildo","dildos","dilld0","dilld0s","dominatricks","dominatrics","dominatrix","dyke","enema","f u c k","f u c k e r","fag","fag1t","faget","fagg1t","faggit","faggot","fagg0t","fagit","fags","fagz","faig","faigs","fart","flipping the bird","fuck","fucker","fuckin","fucking","fucks","Fudge Packer","fuk","Fukah","Fuken","fuker","Fukin","Fukk","Fukkah","Fukken","Fukker","Fukkin","g00k","God-damned","h00r","h0ar","h0re","hells","hoar","hoor","hoore","jackoff","jap","japs","jerk-off","jisim","jiss","jizm","jizz","knob","knobs","knobz","kunt","kunts","kuntz","Lezzian","Lipshits","Lipshitz","masochist","masokist","massterbait","masstrbait","masstrbate","masterbaiter","masterbate","masterbates","Motha Fucker","Motha Fuker","Motha Fukkah","Motha Fukker","Mother Fucker","Mother Fukah","Mother Fuker","Mother Fukkah","Mother Fukker","mother-fucker","Mutha Fucker","Mutha Fukah","Mutha Fuker","Mutha Fukkah","Mutha Fukker","n1gr","nastt","nigger;","nigur;","niiger;","niigr;","orafis","orgasim;","orgasm","orgasum","oriface","orifice","orifiss","packi","packie","packy","paki","pakie","paky","pecker","peeenus","peeenusss","peenus","peinus","pen1s","penas","penis","penis-breath","penus","penuus","Phuc","Phuck","Phuk","Phuker","Phukker","polac","polack","polak","Poonani","pr1c","pr1ck","pr1k","pusse","pussee","pussy","puuke","puuker","qweir","recktum","rectum","retard","sadist","scank","schlong","screwing","semen","sex","sexy","Sh!t","sh1t","sh1ter","sh1ts","sh1tter","sh1tz","shit","shits","shitter","Shitty","Shity","shitz","Shyt","Shyte","Shytty","Shyty","skanck","skank","skankee","skankey","skanks","Skanky","slag","slut","sluts","Slutty","slutz","son-of-a-bitch","tit","turd","va1jina","vag1na","vagiina","vagina","vaj1na","vajina","vullva","vulva","w0p","wh00r","wh0re","whore","xrated","xxx","b!+ch","bitch","blowjob","clit","arschloch","fuck","shit","ass","asshole","b!tch","b17ch","b1tch","bastard","bi+ch","boiolas","buceta","c0ck","cawk","chink","cipa","clits","cock","cum","cunt","dildo","dirsa","ejakulate","fatass","fcuk","fuk","fux0r","hoer","hore","jism","kawk","l3itch","l3i+ch","masturbate","masterbat*","masterbat3","motherfucker","s.o.b.","mofo","nazi","nigga","nigger","nutsack","phuck","pimpis","pusse","pussy","scrotum","sh!t","shemale","shi+","sh!+","slut","smut","teets","tits","boobs","b00bs","teez","testical","testicle","titt","w00se","jackoff","wank","whoar","whore","*damn","*dyke","*fuck*","*shit*","@$$","amcik","andskota","arse*","assrammer","ayir","bi7ch","bitch*","bollock*","breasts","butt-pirate","cabron","cazzo","chraa","chuj","Cock*","cunt*","d4mn","daygo","dego","dick*","dike*","dupa","dziwka","ejackulate","Ekrem*","Ekto","enculer","faen","fag*","fanculo","fanny","feces","feg","Felcher","ficken","fitt*","Flikker","foreskin","Fotze","Fu(*","fuk*","futkretzn","gook","guiena","h0r","h4x0r","hell","helvete","hoer*","honkey","Huevon","hui","injun","jizz","kanker*","kike","klootzak","kraut","knulle","kuk","kuksuger","Kurac","kurwa","kusi*","kyrpa*","lesbo","mamhoon","masturbat*","merd*","mibun","monkleigh","mouliewop","muie","mulkku","muschi","nazis","nepesaurio","nigger*","orospu","paska*","perse","picka","pierdol*","pillu*","pimmel","piss*","pizda","poontsee","poop","porn","p0rn","pr0n","preteen","pula","pule","puta","puto","qahbeh","queef*","rautenberg","schaffer","scheiss*","schlampe","schmuck","screw","sh!t*","sharmuta","sharmute","shipal","shiz","skribz","skurwysyn","sphencter","spic","spierdalaj","splooge","suka","b00b*","testicle*","titt*","twat","vittu","wank*","wetback*","wichser","wop*","yed","zabourah"]}')
            }
        },
        e = {};

    function n(r) {
        var i = e[r];
        if (void 0 !== i) return i.exports;
        var o = e[r] = {
            exports: {}
        };
        return t[r](o, o.exports, n), o.exports
    }
    n.g = function() {
        if ("object" == typeof globalThis) return globalThis;
        try {
            return this || new Function("return this")()
        } catch (t) {
            if ("object" == typeof window) return window
        }
    }(), n.r = t => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, (() => {
        function t(e) {
            return t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            }, t(e)
        }
        n(3177);
        var e, r, i = getCookie("chat_user"),
            o = "",
            s = $("#chatSend"),
            a = [],
            c = "",
            u = !1,
            h = !0,
            f = [],
            l = !1,
            p = [],
            d = $("#chat_fullscreen");

        function g() {
            s.emojioneArea({
                recentEmojis: !1,
                pickerPosition: "top",
                filtersPosition: "bottom",
                tones: !1,
                saveEmojisAs: "shortname",
                autocomplete: !1,
                inline: !0,
                hidePickerOnBlur: !1,
                events: {
                    keyup: function(t, e) {
                        var n = this.getText();
                        13 == e.keyCode && "" != n && storeMessage({
                            message: n,
                            to_id: r,
                            from_id: o
                        })
                    }
                }
            })
        }

        function y() {
            $.ajax({
                type: "GET",
                url: "/user/" + o + "/conversation",
                success: function(t) {
                    var e = t.data.conversations;
                    null !== e.length && (fireReadMessageEvent(e), $("#chat_fullscreen").html(e.reverse().map(prepareChatConversation).join(""))), m()
                },
                error: function(t) {
                    displayErrorMessage(t.responseJSON.message), (t.responseJSON.message = "User not found.") && (b("chat_user"), $(".msg_chat").removeClass("d-block"), $(".msg_form").removeClass("d-none"), $(".msg_chat").addClass("d-none"), $(".msg_form").addClass("d-block"))
                },
                complete: function() {}
            })
        }

        function m() {
            $("#chat_fullscreen").animate({
                scrollTop: $("#chat_fullscreen").get(0).scrollHeight
            }, 10)
        }

        function b(t) {
            document.cookie = t + "=;expires=" + new Date(0).toUTCString()
        }

        function k() {
            var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
            u = !0;
            var e = $(".chat-conversation"),
                n = e.prop("scrollHeight");
            t || (n /= 2), e.scrollTop(n)
        }

        function v() {
            var t = [];
            if ($.each(f, (function(e, n) {
                    -1 === $.inArray(n, t) && -1 === $.inArray(n, p) && t.push(n)
                })), p = $.merge(p, t), !(t.length <= 0)) {
                f = [];
                $(".chat__person-box--active").data("id");
                $.ajax({
                    type: "post",
                    url: readMessageURL,
                    data: {
                        ids: t,
                        _token: csrfToken
                    },
                    success: function(e) {
                        $.each(t, (function(t, e) {
                            $(".message-" + e).removeClass("unread")
                        }))
                    }
                })
            }
        }
        $(document).ready((function() {
            "use strict";
            if (isLogin) $(".chat-conversation").html("<h6>You Are Already Login</h6>");
            else {
                if ("" == i) return $(".msg_chat").removeClass("d-block"), $(".msg_form").removeClass("d-none"), $(".msg_chat").addClass("d-none"), void $(".msg_form").addClass("d-block");
                o = JSON.parse(getCookie("chat_user")).id, e = JSON.parse(getCookie("chat_user")).name, loadAssignedChatUserId(), listenForEvents(o), $(".msg_chat").removeClass("d-none"), $(".msg_form").removeClass("d-block"), $(".msg_chat").addClass("d-block"), $(".msg_form").addClass("d-none"), g(), y()
            }
        })), $("#prime").click((function() {
            $(".chat").toggleClass("is-visible"), $(".fab").toggleClass("is-visible"), localStorage.removeItem("chat-visible"), $(".chat").hasClass("is-visible") ? localStorage.setItem("chat-visible", "1") : localStorage.setItem("chat-visible", "0")
        })), $(document).on("keydown", (function(t) {
            27 === t.keyCode && (localStorage.removeItem("chat-visible"), $("#chatDivision").removeClass("is-visible"))
        })), $(".close-chat").click((function() {
            localStorage.removeItem("chat-visible"), $("#chatDivision").removeClass("is-visible")
        })), window.listenForEvents = function(t) {
            window.Echo.channel("user-updates." + t).listen("PublicUserEvent", (function(t) {
                var e, n, i;
                1 == t.type ? (fireReadMessageEventUsingIds([t.id]), $("#chat_fullscreen").append(prepareChatConversation(t)), m()) : 2 == t.type ? (r = t.assignedTo, loadAssignedChatUserId()) : 4 === t.type ? (e = t, n = "chat-container__read-status--read", i = "chat-container__read-status--unread", $.each(e.ids, (function(t, e) {
                    $(".message-" + e).find(".chat-container__read-status").removeClass(i).addClass(n)
                }))) : 5 === t.type && function(t) {
                    d.find(".message-" + t.id).length && $(".message-" + t.id).remove()
                }(t)
            }))
        }, $(document).on("click", "#endChatButton", (function() {
            var t = $("#chat_head").text();
            swal({
                title: Lang.get("messages.chats.end_chat") + " !",
                text: Lang.get("messages.chats.are_you_sure_end_chat_with") + ' "' + t + '" ?',
                type: "warning",
                showCancelButton: !0,
                closeOnConfirm: !1,
                showLoaderOnConfirm: !0,
                confirmButtonColor: "#00b074",
                cancelButtonColor: "#d33",
                cancelButtonText: Lang.get("messages.common.no"),
                confirmButtonText: Lang.get("messages.common.yes")
            }, (function() {
                setLastSeenOfUser(0), b("chat_user"), setTimeout((function() {
                    location.reload()
                }), 1500)
            }))
        })), $(document).on("submit", "#chatForm", (function(t) {
            t.preventDefault(), processingBtn("#chatForm", "#chat_frm_submit", "loading"), $.ajax({
                type: "POST",
                url: chatUserStoreUrl,
                data: $(this).serialize(),
                success: function(t) {
                    setCookie("chat_user", JSON.stringify(t.data), 180), o = t.data.id, $(".msg_chat").removeClass("d-none"), $(".msg_form").removeClass("d-block"), $(".msg_form").addClass("d-none"), $(".msg_chat").addClass("d-block"), g(), listenForEvents(o), y(), loadAssignedChatUserId()
                },
                error: function(t) {
                    displayErrorMessage(t.responseJSON.message)
                },
                complete: function() {
                    processingBtn("#chatForm", "#chat_frm_submit")
                }
            })
        })), window.loadAssignedChatUserId = function() {
            $.ajax({
                type: "GET",
                url: "/get-assign-agent",
                data: {
                    id: o
                },
                success: function(e) {
                    if ("object" === t(e.data)) {
                        var n = e.data.agent,
                            i = n.id,
                            o = n.photo_url,
                            s = n.name;
                        $("#chat_head").text(s), $(".chat_header .header_img img").attr("src", o), r = i
                    } else r = e.data
                }
            })
        }, window.storeMessage = function(t) {
            if ("" === t.message.trim()) return !1;
            var e = new(n(2238));
            t.message = e.clean(t.message);
            var r = 0;
            $(".chat__text-preview").length > 0 && (r = $(".chat__text-preview").data("message-type"));
            var i = null;
            0 != r || t.file_name || (i = function(t) {
                var e = t;
                e.message = t.message.replace(/(<([^>]+)>)/gi, "");
                var n = moment().tz(timeZone).format("hh:mma");
                "1" == isUTCTimezone && (n = getLocalDate(moment().utc()));
                e.time = n, e.message = getMessageByItsTypeForChatList(e.message, 0);
                var r = Math.floor(6 * Math.random()) + Date.now();
                e.randomMsgId = r, $(".chat__text-preview").length > 0 ? e.receiverName = $(".chat__text-preview").find(".reply-to-user").text() : e.receiverName = "";
                var i = $.templates("#tmplSingleMessage").render(e);
                return $("#no_chat_msg").hide(), $(".chat-conversation").append(i), k(),
                    function() {
                        s[0].emojioneArea.setText("")
                    }(), r
            }(t)), $.ajax({
                type: "POST",
                url: conversationsStoreUrl,
                data: t,
                success: function(e) {
                    if (t.reply_to = "", !0 === e.success) {
                        var n = e.data.message;
                        setSentOrReceivedMessage(n), 0 === n.message_type ? ($(".chat-conversation").find("[data-message_id=" + i + "]").addClass("message-" + n.id).attr("data-message_id", n.id), n.url_details && ($(".message-" + n.id).find(".message").empty(), $(".message-" + n.id).find(".chat-conversation__bubble.clearfix").addClass("max-width-35"), $(".message-" + n.id).find(".message").append(displayMessage(n)))) : (6 === n.message_type && $(".chat-conversation").find("[data-message_id=" + i + "]").remove(), msgSetInWindow || setSentOrReceivedMessage(n))
                    }
                },
                error: function(e) {
                    t.reply_to = "", displayToastr(Lang.get("messages.error_message.error"), "error", e.responseJSON.message), $("#btnSend").removeClass("chat__area-send-btn--disable")
                }
            })
        }, window.scrollTop = function() {
            $(".chat-conversation").scrollTop(50)
        }, window.getLocalDate = function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "hh:mma";
            if ("0" == isUTCTimezone) return moment(t).format(e);
            var n = moment(t).utc(t).local();
            return n.calendar(null, {
                sameDay: e,
                lastDay: "[Yesterday]",
                lastWeek: "M/D/YY",
                sameElse: "M/D/YY"
            })
        }, window.getMessageByItsTypeForChatList = function(t, e) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
            return 1 === e ? '<i class="fa fa-camera" aria-hidden="true"></i> Photo' : 2 === e ? '<i class="fa fa-file-pdf-o" aria-hidden="true"></i> ' + n : 3 === e ? '<i class="fa fa-file-word-o" aria-hidden="true"></i> ' + n : 4 === e ? '<i class="fa fa-file-audio-o" aria-hidden="true"></i> ' + n : 5 === e ? '<i class="fa fa-file-video-o" aria-hidden="true"></i> ' + n : 7 === e ? '<i class="fa fa-file-text-o" aria-hidden="true"></i> ' + n : 8 === e ? '<i class="fa fa-file-excel-o" aria-hidden="true"></i> ' + n : emojione.shortnameToImage(t)
        }, window.setSentOrReceivedMessage = function(t) {
            var e = prepareChatConversation(t, !1),
                n = $(".chat-conversation"),
                r = !1;
            if (t.from_id == o) k();
            else if (appendGroupMessagesAtLast)
                if (r = !!(add(n.scrollTop(), n.innerHeight()) >= n[0].scrollHeight - 3), n.append(e), r) k();
                else {
                    var i = $("#user-" + latestSelectedUser).find(".chat__person-box-count"),
                        s = i.text();
                    if (s = add(s, 1), i.text(s), i.removeClass("d-none"), 0 === n.find(".chat__msg-day-new-msg").length) $(".message-" + t.id).before(newMessageIndicator)
                }
        }, window.fireReadMessageEvent = function(t) {
            var e = getUnreadMessageIds(t);
            fireReadMessageEventUsingIds(e)
        }, window.getUnreadMessageIds = function(t) {
            var e = [];
            return $.each(t, (function(t, n) {
                n.to_id != o || n.status || e.push(n.id)
            })), e
        }, window.fireReadMessageEventUsingIds = function(t) {
            if (t.length > 0 && (f = $.merge(f, t), !l)) {
                setInterval(v, 5e3);
                l = !0
            }
        }, window.prepareChatConversation = function(t) {
            var n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
            if (9 === t.message_type) {
                var r = addTimeLineEle(t.created_at, n),
                    i = $.templates("#tmplMessageBadges"),
                    s = {
                        getLocalDate
                    };
                return r + i.render(t, s)
            } - 1 === $.inArray(n, [!0, !1]) && (n = !0);
            var a = addTimeLineEle(t.created_at, n),
                c = !1,
                u = t.from_id == o ? "chat-conversation__sender" : t.status ? "chat-conversation__receiver" : "chat-conversation__receiver unread",
                h = 1 == t.status || t.hasOwnProperty("read_by_all_count") && 0 === t.read_by_all_count ? "chat-container__read-status--read" : "chat-container__read-status--unread";
            u.includes("chat-conversation__receiver") && (c = !0);
            var f = !1,
                l = !1,
                p = {},
                d = {
                    displayMessage,
                    getChatMagTimeInConversation
                },
                g = $.templates("#tmplMessage");
            return p.data = t, p.isReceiver = c, p.loggedInUserId = o, p.authUserName = e, p.needToRemoveOldTimeline = n, p.className = u, p.readUnread = h, p.allowToDelete = f, p.deleteMsgForEveryone = l, a + g.render(p, d)
        }, window.displayMessage = function(t) {
            if (1 === t.message_type) return imageRenderer(t.message);
            if (2 === t.message_type) return fileRenderer(t.message, t.file_name, pdfURL);
            if (3 === t.message_type) return fileRenderer(t.message, t.file_name, docsURL);
            if (5 === t.message_type) return videoRenderer(t.message);
            if (6 === t.message_type) return renderYoutubeURL(t.message);
            if (7 === t.message_type) return fileRenderer(t.message, t.file_name, textURL);
            if (8 === t.message_type) return fileRenderer(t.message, t.file_name, xlsURL);
            if (4 === t.message_type) return voiceRenderer(t.message, t.file_name);
            if (6 === checkYoutubeUrl(t.message)) return renderMultipleYouTubeUrl(t);
            if (t.url_details) {
                var e = {
                    urlDetails: t.url_details,
                    message: t.message
                };
                return $.templates("#tmplLinkPreview").render(e)
            }
            return emojione.shortnameToImage(detectUrlFromTextMessage(t.message))
        }, window.imageRenderer = function(t) {
            return '<a href="'.concat(t, '" target="blank" data-fancybox="gallery" data-toggle="lightbox" data-gallery="example-gallery" data-src="').concat(t, '"><img src="').concat(t, '"></a>')
        }, window.pdfRenderer = function(t, e) {
            return '<div class="media-wrapper d-flex align-items-center"><i class="fa fa-file-pdf-o" aria-hidden="true"></i><a href= "'.concat(t, '"  target="blank" class="item"> ').concat(e, "</a></div>")
        }, window.voiceRenderer = function(t, e) {
            return '<div class="media-wrapper d-flex align-items-center p-0"><audio controls><source src="'.concat(t, '" type="audio/mp3">\n            Your browser does not support the audio element.\n        </audio></div>')
        }, window.docRenderer = function(t, e) {
            return '<div class="media-wrapper d-flex align-items-center"><i class="fa fa-file-word-o" aria-hidden="true"></i><a href="'.concat(t, '"\n    target="_blank">').concat(e, "</a></div>")
        }, window.txtRenderer = function(t, e) {
            return '<div class="media-wrapper d-flex align-items-center"><i class="fa fa-file-text-o" aria-hidden="true"></i><a href="'.concat(t, '"\n    target="_blank">').concat(e, "</a></div>")
        }, window.xlsRenderer = function(t, e) {
            return '<div class="media-wrapper d-flex align-items-center"><img class="chat-file-preview" src="'.concat(xlsURL, '" /><a href="').concat(t, '"\n    target="_blank">').concat(e, "</a></div>")
        }, window.fileRenderer = function(t, e, n) {
            return e.length > 15 && (e = e.substring(0, 15) + "..."), n ? '<div class="media-wrapper d-flex align-items-center"><img class="chat-file-preview" src="'.concat(n, '" /><a href= "').concat(t, '"  target="blank" class="item"> ').concat(e, "</a></div>") : '<div class="media-wrapper d-flex align-items-center"><i class="fa '.concat(n, '" aria-hidden="true"></i><a href= "').concat(t, '"  target="blank" class="item"> ').concat(e, "</a></div>")
        }, window.videoRenderer = function(t) {
            return '<div class="chat-media">\n                     <video id="my-video" class="video-js" controls preload="auto" width="640" height="264" data-setup=\'\'>\n                            <source src="'.concat(t, '" type="video/mp4">\n                            <source src="').concat(t, '" type="video/webm">\n                            <p class="vjs-no-js">\n                                To view this video please enable JavaScript, and consider upgrading to a web browser that\n                                <a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>\n                            </p>\n                      </video>\n                </div>')
        }, window.renderYoutubeURL = function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
                n = getYoutubeEmbedURL(t);
            return '<iframe width="246" height="246" style="border-radius:8px;" class="' + e + '" src="'.concat(n, '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>\n            </iframe>')
        }, window.checkYoutubeUrl = function(t) {
            return -1 != t.indexOf("youtube.com/watch?v=") ? 6 : 0
        }, window.findUrls = function(t) {
            for (var e, n = (t || "").toString(), r = [], i = /(((ftp|https?):\/\/)[\-\w@:%_\+.~#?,&\/\/=]+)|((mailto:)?[_.\w-]+@([\w][\w\-]+\.)+[a-zA-Z]{2,3})/g; null !== (e = i.exec(n));) {
                var o = e[0];
                r.push(o)
            }
            return r
        }, window.renderMultipleYouTubeUrl = function(t) {
            var e = t.from_id != o ? "float-right" : "float-left",
                n = t.from_id != o ? "mr-2" : "float-right ml-2",
                r = findUrls(t.message),
                i = "";
            return $.each(r, (function(t, e) {
                i += renderYoutubeURL(e, n)
            })), i + '<div class="d-inline-block ' + e + ' mx-1" style="max-width: 500px;">' + t.message + "</div>"
        }, window.renderYoutubeURL = function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
                n = getYoutubeEmbedURL(t);
            return '<iframe width="246" height="246" style="border-radius:8px;" class="' + e + '" src="'.concat(n, '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>\n            </iframe>')
        }, window.addTimeLineEle = function(t) {
            var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
                n = getCalenderFormatForTimeLine(t),
                r = n.split(" ").join("_").replace(",", ""),
                i = "",
                o = '<div class="chat__msg-day-divider d-flex justify-content-center ' + r + '">\n               <span class="chat__msg-day-title">' + n + "</span>\n          </div>";
            if ("Today" == n && "Today" == $(".chat-conversation").find($(".chat__msg-day-title")).text()) return "";
            if (-1 === $.inArray(n, a)) i = o, a.push(n);
            else if (e) {
                var s = $(".chat-conversation").find("." + r);
                s.length && ($("." + r).remove(), i = o)
            }
            return i
        }, window.getCalenderFormatForTimeLine = function(t) {
            return moment(t).utc(t).local().calendar(null, {
                sameDay: "[Today]",
                lastDay: "[Yesterday]",
                lastWeek: "dddd, MMM Do",
                sameElse: function() {
                    return moment().year() === moment(t).year() ? "dddd, MMM Do" : "dddd, MMM Do YYYY"
                }
            })
        }, window.getChatMagTimeInConversation = function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "h:mma";
            return "0" == isUTCTimezone ? moment(t).format(e) : moment.utc(t).local().format(e)
        }, window.getMessageByScroll = function() {
            $(".chat-conversation").on("scroll", (function() {
                if (0 === $(this).scrollTop()) !0 === !!callBeforeAPI && getOldOrNewConversation({
                    before: c
                }, 1, 0);
                else if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight - 1) {
                    var t = [];
                    $(".chat-conversation .unread").each((function() {
                        t.push($(this).data("message_id"))
                    })), t.length > 0 && fireReadMessageEventUsingIds(t);
                    var e = $(".chat__person-box--active").find(".chat__person-box-count").text();
                    if ((e = isNaN(e) || "" === e ? 0 : e) > 0 && (h = !!callAfterAPI), !0 === h) {
                        var n = $(".chat-conversation").children().last().attr("data-message_id");
                        if ($(".message-" + n).next().length > 0) return;
                        callAfterAPI = !1, getOldOrNewConversation({
                            after: n
                        }, 0, 1)
                    }
                }
            }))
        }, window.getOldOrNewConversation = function(t, e, n) {
            $(".loading-message").removeClass("d-none");
            var r = userURL + selectedContactId + "/conversation";
            $.ajax({
                type: "GET",
                url: r,
                data: t,
                success: function(r) {
                    var i = r.data.user;
                    if (r.success && latestSelectedUser === i.id) {
                        var o = r.data.conversations;
                        if ($.merge(conversationMessages, o), o.length > 0) {
                            if (e) {
                                var s = r.data.conversations[r.data.conversations.length - 1];
                                c = s.id, $.each(o, (function(t, e) {
                                    $(".chat-conversation").prepend(prepareChatConversation(e))
                                }));
                                var a = $(".message-" + t.before);
                                scrollAtEle(a), setOpenMsgInfoEvent()
                            }
                            n && ($.each(o, (function(t, e) {
                                $(".chat-conversation").append(prepareChatConversation(e, !1))
                            })), setOpenMsgInfoEvent(), fireReadMessageEvent(o))
                        } else e && !1, n && (h = !1);
                        u && n && k(), $(".loading-message").addClass("d-none")
                    }
                },
                error: function(t) {
                    console.log(t)
                }
            })
        }, window.getYoutubeEmbedURL = function(t) {
            var e = t,
                n = t.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
            return n && 11 === n[2].length && (e = "https://www.youtube.com/embed/" + n[2]), e
        }, window.detectUrlFromTextMessage = function(t) {
            return t.replace(/((http|https|ftp):\/\/[a-zа-я0-9\w?=&.\/-;#~%-]+(?![a-zа-я0-9\w\s?&.\/;#~%"=-]*>))/g, "<a href='$1' target='_blank'>$1</a>")
        }, window.updateUserStatus = function(t, e) {
            var n = d.find("#user-" + t.id),
                r = $(".user-" + t.id),
                i = $(".chat-user-" + t.id);
            if (-1 == $.inArray(t.id, blockedUsersList))
                if (1 == e) n.find(".chat__person-box-status").removeClass("chat__person-box-status--offline").addClass("chat__person-box-status--online"), $("#toId").val() == t.id && ($(".typing").html("online"), $(".chat-profile__person-status").show().text("online"), $(".chat-profile__person-last-seen").hide()), r.find(".chat__person-box-status").removeClass("chat__person-box-status--offline").addClass("chat__person-box-status--online"), r.attr("data-status", 1), i.removeClass("online").removeClass("offline").addClass("online");
                else {
                    n.find(".chat__person-box-status").removeClass("chat__person-box-status--online").addClass("chat__person-box-status--offline"), r.find(".chat__person-box-status").removeClass("chat__person-box-status--online").addClass("chat__person-box-status--offline"), r.attr("data-status", 0), i.removeClass("online").removeClass("offline").addClass("offline");
                    var o = "last seen at: " + getCalenderFormatForLastSeen(Date(), "hh:mm a", 0);
                    $(".typing").html(o), $(".chat-profile__person-last-seen").show().text(o), $(".chat-profile__person-status").hide()
                }
        }
    })()
})();