var speedtest = (function() {
    var z = {};
    z.callback;
    var cc = 0,
        ct = [],
        cy = {};
    z._started = false;
    z.start = function(c, u) {
        if (typeof u != "undefined" && u) up = u;
        if (z._started && x == -2) {
            x = -1;
            z._started = false
        };
        if (!z._started) {
            z._started = true;
            for (var i in t) {
                if ("g" in t[i]) t[i].g = t[i].g.replace('[hostname]', window.location.hostname);
                if ("h" in t[i]) t[i].h = t[i].h.replace('[hostname]', window.location.hostname)
            }
        };
        if (typeof c == "object" || typeof c == "function") z.callback = c;
        if (!ct.length) {
            var lt = 0;
            for (var i in t) {
                ct[i] = {};
                ct[i].concurrency = t[i].c;
                ct[i].duration = t[i].m - lt;
                cc += ct[i].duration;
                ct[i].index = i;
                ct[i].iterations = t[i].i;
                if ("e" in t[i]) {
                    ct[i].location = {};
                    if ("y" in t[i].e) ct[i].location.city = t[i].e.y;
                    if ("c" in t[i].e) ct[i].location.country = t[i].e.c;
                    if ("s" in t[i].e) ct[i].location.state = t[i].e.s;
                    if ("l" in t[i].e) ct[i].location.lat = t[i].e.l;
                    if ("o" in t[i].e) ct[i].location.long = t[i].e.o
                };
                if ("x" in t[i]) ct[i].max_size = t[i].x;
                if ("z" in t[i]) ct[i].min_size = t[i].z;
                if ("p" in t[i]) ct[i].provider_id = t[i].p;
                if ("r" in t[i]) ct[i].region = t[i].r;
                if ("n" in t[i]) ct[i].service = t[i].n;
                if ("s" in t[i]) ct[i].service_id = t[i].s;
                if ("t" in t[i]) ct[i].service_type = t[i].t;
                if ("u" in t[i]) ct[i].subregion = t[i].u;
                ct[i].type = t[i].y == "l" ? "latency" : (t[i].y == "u" ? "uplink" : (t[i].y == "d" ? "downlink" : t[i].y));
                if ("w" in t[i]) ct[i].warmup = t[i].w;
                lt = t[i].m;
                if (!(ct[i].type in cy)) {
                    cy[ct[i].type] = {};
                    cy[ct[i].type].tests = 0;
                    cy[ct[i].type].duration = 0
                };
                cy[ct[i].type].tests++;
                cy[ct[i].type].duration += ct[i].duration
            }
        };
        if (!document || !("body" in document) || !document.body) {
            setTimeout("speedtest.start()");
            return 0
        };
        if (x === -1) {
            if (cb("started", [ct, cy]) === false) return 0;
            _s = function() {
                speedtest.d()
            };
            z.n();
            return 1
        } else return 0
    };
    z.stop = function(complete) {
        if (x != -2) {
            x = -2;
            cb("stopped", [typeof complete == "boolean" && complete])
        }
    };
    z.stopTest = function(i) {
        i = typeof i != un ? i : x;
        if (i in t) t[i].st = true
    };
    z.stopTestType = function(type) {
        type = type == "latency" ? "l" : (type == "downlink" ? "d" : (type == "uplink" ? "u" : type));
        for (var i in t)
            if (t[i].y == type) t[i].st = true
    };
    z.w = false;
    var un = "undefined",
        up = "/probe/up.html",
        as = function(a) {
            return a.reduce(function(b, c) {
                return b + c
            }, 0)
        },
        av = function(a) {
            return as(a) / a.length
        },
        b64 = function(s) {
            var b = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
                o1, o2, o3, h1, h2, h3, h4, bs, i = 0,
                ac = 0,
                ec = '',
                ta = [];
            if (!s) return s;
            s = unescape(encodeURIComponent(s));
            do {
                o1 = s.charCodeAt(i++);
                o2 = s.charCodeAt(i++);
                o3 = s.charCodeAt(i++);
                bs = o1 << 16 | o2 << 8 | o3;
                h1 = bs >> 18 & 0x3f;
                h2 = bs >> 12 & 0x3f;
                h3 = bs >> 6 & 0x3f;
                h4 = bs & 0x3f;
                ta[ac++] = b.charAt(h1) + b.charAt(h2) + b.charAt(h3) + b.charAt(h4)
            } while (i < s.length);
            ec = ta.join('');
            var r = s.length % 3;
            return (r ? ec.slice(0, r - 3) : ec) + '==='.slice(r || 3)
        };
        var progressHTML = $('#progress');
        var resultsHTML = $('#results');
        cb=function(method, args) {
            console.log(method+"("+args.length+"):"+JSON.stringify(args));
            if (method=="started"){
                $("#tests").append(JSON.stringify(args));
            }else if (method=="progress"){
                progressHTML.append("<p>"+JSON.stringify(args)+"</p>");
            }else if (method=="results"){
                args.push({completion_time:new Date().toISOString()});
                resultsHTML.append("<p>"+JSON.stringify(args)+",</p>");
            }else{
                //assume method=="stopped"
                $("#status").text("Done!");
            }
            var c = null;
            if (z.callback && (typeof z.callback == "object" || typeof z.callback == "function") && method in z.callback && typeof z.callback[method] == "function") c = z.callback[method].apply(z.callback, typeof args == "object" ? args : []);
            return c
        };
    z.d = function(ul, tr, ur) {
        ul = ul && typeof ul !== un ? ul : jp.ul;
        tr = tr && typeof tr !== un ? tr : ("tr" in jp ? jp.tr : 0);
        ur = ur && typeof ur !== un ? ur : null;
        if (ur && ur != jp.ur) return;
        if ("to" in jp) {
            clearTimeout(jp.to);
            delete jp.to
        };
        if (tr && x in t && "ti" in jp) {
            var m = ti() - jp.ti;
            if (ur) {
                t[x].fi++;
                t[x].fl++
            } else {
                if (t[x].it > t[x].w) t[x].rs.push(m);
                t[x].by += 4
            }
        };
        if ("ul" in jp && !tr && !ur) ul = [];
        if (ul && ul.length) {
            if (tr) p = function() {
                if (speedtest.pt) p = speedtest.pt;
                speedtest.d()
            };
            jp.ur = ul.pop();
            jp.ul = ul;
            jp.tr = tr;
            if (x in t) {
                var j = document.createElement('script');
                j.setAttribute("type", "text/javascript");
                j.setAttribute("src", jp.ur + (tr ? (jp.ur.match(/\?/) ? "&" : "?") + ("k" in t[x] && t[x].k ? t[x].k + "=" : "") + r() : ""));
                jp.to = setTimeout("speedtest.d(0, 0, '" + jp.ur + "')", 1e4);
                jp.ti = ti();
                document.getElementsByTagName("head")[0].appendChild(j)
            }
        } else {
            jp = {};
            if (tr) {
                z.i()
            } else if (!z.w) {
                z.w = true;
                setTimeout("speedtest.n()", 500)
            }
        }
    };
    var e = function(s) {
            if (typeof s == "string") {
                var r = {
                    ":0": "a0KA000000",
                    ":1": "A000000",
                    ":a": ".net/probe",
                    ":b": "probe",
                    ":f": "cachefly.net",
                    ":c": "cloudharmony.com",
                    ":g": "b.gif",
                    ":h": "http://",
                    ":i": "ping.js",
                    ":j": "b.jpg",
                    ":p": "b.png",
                    ":r": "monitor",
                    ":s": "https://",
                    ":t": "test",
                    ":u": "up.html",
                    ":w": "http://www.",
                    ":y": "cloudharmony"
                };
                for (var i in r) s = s.split(i).join(r[i])
            };
            return s
        },
        g = window.location.protocol == "https:";
    z.i = function() {
        if (x == -2) return;
        if (x in t && "st" in t[x] && t[x].st) return z.n();
        var n = 0;
        if (x in t && "fl" in t[x] && "rs" in t[x] && "ur" in t[x]) {
            t[x].it++;
            t[x].fi = 0;
            var c = t[x].w + t[x].i,
                pg = {};
            pg.bytes = Math.round(t[x].by);
            pg.failed = t[x].fl;
            pg.iteration = t[x].it - 1;
            pg.iterations = c;
            pg.progress = Math.round(1e4 * ((t[x].it - 1) / c)) / 100;
            pg.remaining = c - pg.iteration;
            pg.success = t[x].rs.length;
            pg.time_remaining = ct[x].duration - Math.round((pg.progress * .01) * ct[x].duration);
            pg.tests_remaining = ct.length;
            pg.tests_time_remaining = cc;
            pg.type_remaining = cy[ct[x].type].tests;
            pg.type_time_remaining = cy[ct[x].type].duration;
            for (var n = 0; n < x; n++) {
                pg.tests_remaining--;
                pg.tests_time_remaining -= ct[n].duration;
                if (ct[n].type == ct[x].type) {
                    pg.type_remaining--;
                    pg.type_time_remaining -= ct[n].duration
                }
            };
            pg.tests_time_remaining -= (ct[x].duration - pg.time_remaining);
            pg.type_time_remaining -= (ct[x].duration - pg.time_remaining);
            pg.tests_progress = Math.round(1e4 * (1 - (pg.tests_time_remaining / cc))) / 100;
            pg.type_progress = Math.round(1e4 * (1 - (pg.type_time_remaining / cy[ct[x].type].duration))) / 100;
            pg.warmup = "warmup" in ct[x] && ct[x].warmup > 0 && pg.iteration <= ct[x].warmup;
            if (cb("progress", [ct[x], pg]) === false) {
                t[x].st = true;
                return z.n()
            };
            if (t[x].it <= c && t[x].fl < 3) {
                if (t[x].y == "u") n = u() ? 0 : 1
            } else {
                t[x].su = {};
                if ("u" in t[x]) t[x].su.b = t[x].u;
                if ("c" in t[x]) t[x].su.c = t[x].c;
                t[x].su.e = t[x].i;
                t[x].su.f = "a0d:1B5aLNIAZ";
                if (t[x].fl) t[x].su.g = t[x].fl;
                t[x].su.i = id;
                t[x].su.n = "speedtest";
                t[x].su.o = x + 1;
                t[x].su.p = t[x].ur.match(/^http:/) ? 1 : 0;
                if ("r" in t[x]) t[x].su.r = t[x].r;
                t[x].su.s = t[x].fl && t[x].rs.length ? "p" : (t[x].rs.length ? "s" : "f");
                t[x].su.t = t[x].f;
                t[x].su.u = ":y";
                t[x].su.w = t[x].w;
                t[x].su.y = t[x].y;
                if (t[x].rs.length) {
                    t[x]._rs = t[x].rs.slice(0);
                    t[x].su.m = t[x].rs.join(",");
                    t[x].su.x = Math.round(t[x].by);
                    t[x].rs.sort(function(a, b) {
                        return a - b
                    });
                    t[x].su.a = rn(av(t[x].rs));
                    t[x].su.v = rn(sd(t[x].rs));
                    var h = Math.floor(t[x].rs.length / 2),
                        tp = t[x].y == "d" || t[x].y == "u";
                    t[x].su.j = t[x].rs[tp ? 0 : t[x].rs.length - 1];
                    t[x].su.k = t[x].rs[tp ? t[x].rs.length - 1 : 0];
                    t[x].su.d = pc(t[x].rs, 50);
                    t[x].su.p1 = pc(t[x].rs, tp ? 10 : 90);
                    t[x].su.p2 = pc(t[x].rs, tp ? 25 : 75);
                    t[x].su.p8 = pc(t[x].rs, tp ? 75 : 25);
                    t[x].su.p9 = pc(t[x].rs, tp ? 90 : 10)
                };
                if (t[x].fl || t[x].rs.length) {
                    var rs = {};
                    if (t[x].fl) rs.failed = t[x].fl;
                    rs.status = t[x].su.s == "s" ? "success" : (t[x].su.s == "p" ? "partial" : "failed");
                    rs.secure = t[x].su.p == 0;
                    rs.sequence = t[x].su.o;
                    if (t[x].rs.length) {
                        rs.bytes = t[x].su.x;
                        rs.fastest = t[x].su.k;
                        rs.mean = t[x].su.a;
                        rs.median = t[x].su.d;
                        rs.metric10 = t[x].su.p1;
                        rs.metric25 = t[x].su.p2;
                        rs.metric75 = t[x].su.p8;
                        rs.metric90 = t[x].su.p9;
                        rs.metrics = t[x]._rs;
                        rs.slowest = t[x].su.j;
                        rs.stdev = t[x].su.v
                    };
                    if (cb("results", [ct[x], rs]) === false) return z.stop(false)
                };
                n = 1;
                if (t[x].fl || t[x].rs.length) {
                    var su = [],
                        bs = g ? s.s : (s.p.length ? s.p : s.s);
                    t[x].su.h = window.location.hostname;
                    var qs = JSON.stringify(t[x].su);
                    qs = typeof btoa === "function" ? btoa(qs) : b64(qs);
                    delete t[x].su;
                    for (var i in bs) su.push(bs[i] + "?" + qs);
                    if (su.length) {
                        sh(su);
                        n = 0;
                        z.d(su)
                    }
                }
            }
        } else if (x != -2) n = 1;
        if (n)
            if ((x + 1) < t.length) {
                if (!z.w) {
                    z.w = true;
                    setTimeout("speedtest.n()", 500)
                }
            } else z.n()
    };
    var id = r(),
        jp = {};
    z.n = function() {
        z.w = false;
        if (x == -2) return;
        x++;
        if (x in t && "st" in t[x] && t[x].st) return z.n();
        if (x in t) {
            if (!("g" in t[x]) && !("h" in t[x])) return z.n();
            if (g && !("g" in t[x])) return z.n();
            t[x].ur = e(("g" in t[x]) && (g || !("h" in t[x])) ? "https://" + t[x].g : "http://" + t[x].h);
            if (t[x].ur.slice(-1) != "/") t[x].ur += "/";
            if (!("w" in t[x])) t[x].w = 0;
            t[x].by = 0;
            if (!("c" in t[x])) t[x].c = 1;
            t[x].fi = 0;
            t[x].fl = 0;
            t[x].it = 0;
            t[x].rs = [];
            t[x].rt = [];
            t[x].mb = 1;
            z.i()
        } else z.stop(true)
    };
    var pc = function(a, p) {
        var i = (a.length - 1) * (p / 100);
        if (i < 0) i = 0;
        var i1 = Math.floor(i),
            i2 = Math.ceil(i),
            pe = i1 == i2 ? a[i1] : rn((a[i1] + a[i2]) / 2);
        return pe
    };
    z.pt = typeof p !== un ? p : null

    function r() {
        return Math.floor(Math.random() * 1e10).toString(36)
    };
    var rn = function(n, i) {
            var r = Math.pow(10, typeof i != un ? i : 2);
            return Math.round(n * r) / r
        },
        s = {
            f: {
                u: "u.html"
            },
            p: [":hs.:y.net\/s.js"],
            s: [":s:y1.:f\/s.js"]
        };
    for (var i in s.p) s.p[i] = e(s.p[i]);
    for (var i in s.s) s.s[i] = e(s.s[i]);
    if ("d" in s.f)
        for (var i in s.f.d) s.f.d[i] = e(s.f.d[i]);
    if ("n" in s.f) s.f.n = e(s.f.n);
    if ("p" in s.f) s.f.p = e(s.f.p);
    if ("u" in s.f) s.f.u = e(s.f.u);
    var t = [{
            a: 500,
            c: 4,
            e: {
                y: "Changhua County",
                c: "TW",
                l: 23.9333,
                o: 120.5333
            },
            f: ":07DMBAMA4",
            g: "asia-east1-gce.:y:a",
            h: "asia-east1.gce.:y:a",
            i: 12,
            l: ":scloud.google.com\/compute\/",
            m: 7,
            n: "Google Compute Engine",
            o: 5,
            p: "google",
            r: "asia-east1",
            s: "google:compute",
            t: "compute",
            u: "asia-east1-b",
            w: 6,
            x: 128,
            y: "u",
            z: 1
        }, {
            a: 500,
            c: 2,
            d: 4,
            e: {
                y: "Changhua County",
                c: "TW",
                l: 23.9333,
                o: 120.5333
            },
            f: ":07DMBAMA4",
            g: "asia-east1-gce.:y:a",
            h: "asia-east1.gce.:y:a",
            i: 6,
            l: ":scloud.google.com\/compute\/",
            m: 44,
            n: "Google Compute Engine",
            o: 5,
            p: "google",
            r: "asia-east1",
            s: "google:compute",
            t: "compute",
            u: "asia-east1-b",
            w: 3,
            x: 10240,
            y: "u",
            z: 256
        }],
        u = function() {
            if (!(x in t)) return 0;
            t[x].ul = [];
            t[x].ub = [];
            t[x].ut = [];
            if (t[x].rt.length) t[x].mb = rn(av(t[x].rt), 4);
            for (var i = 0; i < t[x].c; i++) {
                var f_id = 'uf_' + i;
                t[x].ul.push(f_id);
                var i_id = 'uft_' + i,
                    f = document.getElementById(f_id);
                if (!f) {
                    f = document.createElement("form");
                    f.id = f_id;
                    f.method = "post";
                    f.target = i_id;
                    f.style.display = "none";
                    for (var n = 0; n < 20; n++) {
                        var ii = document.createElement("input");
                        ii.id = f_id + "_f" + n;
                        ii.name = "d" + n;
                        f.appendChild(ii)
                    };
                    ft = document.createElement("iframe");
                    ft.id = i_id;
                    ft.style.display = "none";
                    document.body.appendChild(ft);
                    document.body.appendChild(f);
                    window.frames[window.frames.length - 1].name = i_id
                };
                var pt = window.location.port;
                var cloudHarmonyUpHtml = "http://cloudharmony.com/probe/up.html"
                // window.location.protocol + "//" + window.location.hostname + (pt && pt != 80 && pt != 443 ? ":" + pt : "") + up;
                f.action = t[x].ur + "u.html?" + cloudHarmonyUpHtml + "#speedtest&" + i;
                f._x = x;
                if ("_to" in f) {
                    clearTimeout(f._to);
                    delete f._to
                };
                var sz = 1024 * ("x" in t[x] && "y" in t[x] ? t[x].z + (Math.random() * (t[x].x - t[x].z)) : ("x" in t[x] ? t[x].x : t[x].y)),
                    tg = ts();
                if (tg) sz = tg;
                t[x].ub.push(sz);
                var bpf = Math.round(sz / 20);
                for (var n = 0; n < 20; n++) {
                    var ii = document.getElementById(f_id + "_f" + n);
                    ii.value = Array(bpf).join('1')
                }
            };
            if (t[x].ul.length) {
                sh(t[x].ul);
                for (var i = 0; i < t[x].ul.length; i++) {
                    var o = to(t[x].ub[i]),
                        f = document.getElementById(t[x].ul[i]);
                    f._i = i;
                    f._ti = ti();
                    f._to = setTimeout("speedtest.tuc(" + i + ",0)", o);
                    f.submit()
                };
                return 1
            };
            return 0
        },
        sd = function(a) {
            var g = av(a),
                sd = a.map(function(v) {
                    var d = v - g;
                    return d * d
                });
            g = av(sd);
            return Math.sqrt(g)
        },
        sh = function(o) {
            for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        };
    z.tc = function(x1, i, ti1, f, to) {
        if (x == -2) return;
        if (x1 == x) {
            if (f) {
                t[x].fi++;
                t[x].fl++
            } else {
                var sc = (ti() - ti1) / 1e3,
                    mb = rn((t[x].ub[i] / sc) / 125e3);
                t[x].by += (t[x].ub[i] * 1);
                t[x].ut.push(mb)
            };
            if ((t[x].fi + t[x].ut.length) == t[x].ul.length) {
                var rt = "undetermined";
                if (t[x].ut.length) {
                    var rt = rn(as(t[x].ut));
                    t[x].rt.push(rt);
                    if (t[x].it > t[x].w) t[x].rs.push(rt)
                };
                z.i()
            }
        }
    };
    var ti = function() {
            return (new Date()).getTime()
        },
        to = function(s) {
            var o = 0;
            if (s > 0 && x in t && "mb" in t[x]) {
                var r = "o" in t[x] && t[x].o > 0 ? t[x].o : 5;
                if (!t[x].rt.length && !t[x].fl) r *= 1.5;
                var tk = (125 * t[x].mb) / t[x].c,
                    sc = rn((s / 1024) / tk);
                o = Math.round((r * sc) * 1e3);
                if (o < 1e4) o = 1e4
            };
            return o
        },
        ts = function() {
            var tk = 0;
            if (x in t && "d" in t[x] && t[x].d && (t[x].y == "u" || t[x].y == "d")) {
                tk = rn(((125 * t[x].mb) * t[x].d) / t[x].c);
                if ("y" in t[x] && t[x].y && tk < t[x].y) {
                    tk = t[x].y
                } else if ("x" in t[x] && t[x].x && tk > t[x].x) tk = t[x].x
            };
            return tk * 1024
        };
    z.tuc = function(i, ct) {
        if (x == -2) return;
        if (x in t && "ul" in t[x] && i in t[x].ul) {
            var f = document.getElementById(t[x].ul[i]);
            if (f && "_to" in f) {
                clearTimeout(f._to);
                delete f._to
            };
            if (f && "_ti" in f) {
                if (!ct || ct < f._ti) {
                    t[x].fi++;
                    t[x].fl++
                } else {
                    var sc = (ct - f._ti) / 1e3,
                        mb = rn((t[x].ub[i] / sc) / 125e3);
                    t[x].by += (t[x].ub[i] * 1);
                    t[x].ut.push(mb)
                };
                if ((t[x].fi + t[x].ut.length) == t[x].ul.length) {
                    var rt = "undetermined";
                    if (t[x].ut.length) {
                        rt = rn(as(t[x].ut));
                        t[x].rt.push(rt);
                        if (t[x].it > t[x].w) t[x].rs.push(rt)
                    };
                    z.i()
                }
            }
        }
    };
    var x = -1;
    return z
})();
if (typeof ch_st_loaded === "function") ch_st_loaded(speedtest)