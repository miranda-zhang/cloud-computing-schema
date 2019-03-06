var speedtest=(function() {
    var z= {}
    ;
    z.callback;
    var cc=0, ct=[], cy= {}
    ;
    z._started=false;
    z.start=function(c) {
        if(z._started&&x==-2) {
            x=-1;
            z._started=false
        }
        ;
        if(!z._started) {
            z._started=true;
            for(var i in t) {
                if("g"in t[i])t[i].g=t[i].g.replace('[hostname]', window.location.hostname);
                if("h"in t[i])t[i].h=t[i].h.replace('[hostname]', window.location.hostname)
            }
        }
        ;
        if(typeof c=="object"||typeof c=="function")z.callback=c;
        if(!ct.length) {
            var lt=0;
            for(var i in t) {
                ct[i]= {}
                ;
                ct[i].concurrency=t[i].c;
                ct[i].duration=t[i].m-lt;
                cc+=ct[i].duration;
                ct[i].index=i;
                ct[i].iterations=t[i].i;
                if("e"in t[i]) {
                    ct[i].location= {}
                    ;
                    if("y"in t[i].e)ct[i].location.city=t[i].e.y;
                    if("c"in t[i].e)ct[i].location.country=t[i].e.c;
                    if("s"in t[i].e)ct[i].location.state=t[i].e.s;
                    if("l"in t[i].e)ct[i].location.lat=t[i].e.l;
                    if("o"in t[i].e)ct[i].location.long=t[i].e.o
                }
                ;
                if("x"in t[i])ct[i].max_size=t[i].x;
                if("z"in t[i])ct[i].min_size=t[i].z;
                if("p"in t[i])ct[i].provider_id=t[i].p;
                if("r"in t[i])ct[i].region=t[i].r;
                if("n"in t[i])ct[i].service=t[i].n;
                if("s"in t[i])ct[i].service_id=t[i].s;
                if("t"in t[i])ct[i].service_type=t[i].t;
                if("u"in t[i])ct[i].subregion=t[i].u;
                ct[i].type=t[i].y=="l"?"latency":(t[i].y=="u"?"uplink":(t[i].y=="d"?"downlink":t[i].y));
                if("w"in t[i])ct[i].warmup=t[i].w;
                lt=t[i].m;
                if(!(ct[i].type in cy)) {
                    cy[ct[i].type]= {}
                    ;
                    cy[ct[i].type].tests=0;
                    cy[ct[i].type].duration=0
                }
                ;
                cy[ct[i].type].tests++;
                cy[ct[i].type].duration+=ct[i].duration
            }
        }
        ;
        if(!document||!("body"in document)||!document.body) {
            setTimeout("speedtest.start()");
            return 0
        }
        ;
        if(x===-1) {
            if(cb("started", [ct, cy])===false)return 0;
            _s=function() {
                speedtest.d()
            }
            ;
            z.n();
            return 1
        }
        else return 0
    }
    ;
    z.stop=function(complete) {
        if(x!=-2) {
            x=-2;
            cb("stopped", [typeof complete=="boolean"&&complete])
        }
    }
    ;
    z.stopTest=function(i) {
        i=typeof i!=un?i: x;
        if(i in t)t[i].st=true
    }
    ;
    z.stopTestType=function(type) {
        type=type=="latency"?"l": (type=="downlink"?"d": (type=="uplink"?"u": type));
        for(var i in t)if(t[i].y==type)t[i].st=true
    }
    ;
    z.w=false;
    var un="undefined", as=function(a) {
        return a.reduce(function(b, c) {
            return b+c
        }
        , 0)
    }
    , av=function(a) {
        return as(a)/a.length
    }
    , b64=function(s) {
        var b='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=', o1, o2, o3, h1, h2, h3, h4, bs, i=0, ac=0, ec='', ta=[];
        if(!s)return s;
        s=unescape(encodeURIComponent(s));
        do {
            o1=s.charCodeAt(i++);
            o2=s.charCodeAt(i++);
            o3=s.charCodeAt(i++);
            bs=o1<<16|o2<<8|o3;
            h1=bs>>18&0x3f;
            h2=bs>>12&0x3f;
            h3=bs>>6&0x3f;
            h4=bs&0x3f;
            ta[ac++]=b.charAt(h1)+b.charAt(h2)+b.charAt(h3)+b.charAt(h4)
        }
        while(i<s.length);
        ec=ta.join('');
        var r=s.length%3;
        return(r?ec.slice(0, r-3):ec)+'==='.slice(r||3)
    };
    
    var progressHTML = $('#progress');
    var resultsHTML = $('#results');
    cb=function(method, args) {
        // console.log(method+"("+args.length+"):"+JSON.stringify(args));
        if (method=="started"){
            $("#tests").append(JSON.stringify(args));
        }else if (method=="progress"){
            progressHTML.append("<p>"+JSON.stringify(args)+"</p>");
        }else if (method=="results"){
            args.push({completion_time:new Date().toISOString()});
            resultsHTML.append("<p>"+JSON.stringify(args)+",</p>");
        }else{
            $("#status").text("Done!");
        }
        
        var c=null;
        if(z.callback&&(typeof z.callback=="object"||typeof z.callback=="function")&&method in z.callback&&typeof z.callback[method]=="function")c=z.callback[method].apply(z.callback, typeof args=="object"?args: []);
        return c
    }
    ;
    z.d=function(ul, tr, ur) {
        ul=ul&&typeof ul!==un?ul: jp.ul;
        tr=tr&&typeof tr!==un?tr: ("tr"in jp?jp.tr: 0);
        ur=ur&&typeof ur!==un?ur: null;
        if(ur&&ur!=jp.ur)return;
        if("to"in jp) {
            clearTimeout(jp.to);
            delete jp.to
        }
        ;
        if(tr&&x in t&&"ti"in jp) {
            var m=ti()-jp.ti;
            if(ur) {
                t[x].fi++;
                t[x].fl++
            }
            else {
                if(t[x].it>t[x].w)t[x].rs.push(m);
                t[x].by+=4;
                if("dn"in t[x]&&t[x].rs.length==2) {
                    var m1=t[x].rs.pop(), m2=t[x].rs.pop();
                    t[x].dn.push(Math.abs(m1-m2))
                }
            }
        }
        ;
        if("ul"in jp&&!tr&&!ur)ul=[];
        if(ul&&ul.length) {
            if(tr)p=function() {
                if(speedtest.pt)p=speedtest.pt;
                speedtest.d()
            }
            ;
            jp.ur=ul.pop();
            jp.ul=ul;
            jp.tr=tr;
            if(x in t) {
                var j=document.createElement('script');
                j.setAttribute("type", "text/javascript");
                j.setAttribute("src", jp.ur+(tr?(jp.ur.match(/\?/)?"&": "?")+("k"in t[x]&&t[x].k?t[x].k+"=": "")+r(): ""));
                jp.to=setTimeout("speedtest.d(0, 0, '"+jp.ur+"')", 1e4);
                jp.ti=ti();
                document.getElementsByTagName("head")[0].appendChild(j)
            }
        }
        else {
            jp= {}
            ;
            if(tr) {
                z.i()
            }
            else if(!z.w) {
                z.w=true;
                setTimeout("speedtest.n()", 500)
            }
        }
    }
    ;
    var e=function(s) {
        if(typeof s=="string") {
            var r= {
                ":0": "a0KA000000", ":1": "A000000", ":a": ".net/probe", ":b": "probe", ":f": "cachefly.net", ":c": "cloudharmony.com", ":g": "b.gif", ":h": "http://", ":i": "ping.js", ":j": "b.jpg", ":p": "b.png", ":r": "monitor", ":s": "https://", ":t": "test", ":u": "up.html", ":w": "http://www.", ":y": "cloudharmony"
            }
            ;
            for(var i in r)s=s.split(i).join(r[i])
        }
        ;
        return s
    }
    , g=window.location.protocol=="https:";
    z.i=function() {
        if(x==-2)return;
        if(x in t&&"st"in t[x]&&t[x].st)return z.n();
        var n=0;
        if(x in t&&"fl"in t[x]&&"rs"in t[x]&&"ur"in t[x]) {
            t[x].it++;
            t[x].fi=0;
            var c=t[x].w+t[x].i, pg= {}
            ;
            pg.bytes=Math.round(t[x].by);
            pg.failed=t[x].fl;
            pg.iteration=t[x].it-1;
            pg.iterations=c;
            pg.progress=Math.round(1e4*((t[x].it-1)/c))/100;
            pg.remaining=c-pg.iteration;
            pg.success=t[x].rs.length;
            pg.time_remaining=ct[x].duration-Math.round((pg.progress*.01)*ct[x].duration);
            pg.tests_remaining=ct.length;
            pg.tests_time_remaining=cc;
            pg.type_remaining=cy[ct[x].type].tests;
            pg.type_time_remaining=cy[ct[x].type].duration;
            for(var n=0;
            n<x;
            n++) {
                pg.tests_remaining--;
                pg.tests_time_remaining-=ct[n].duration;
                if(ct[n].type==ct[x].type) {
                    pg.type_remaining--;
                    pg.type_time_remaining-=ct[n].duration
                }
            }
            ;
            pg.tests_time_remaining-=(ct[x].duration-pg.time_remaining);
            pg.type_time_remaining-=(ct[x].duration-pg.time_remaining);
            pg.tests_progress=Math.round(1e4*(1-(pg.tests_time_remaining/cc)))/100;
            pg.type_progress=Math.round(1e4*(1-(pg.type_time_remaining/cy[ct[x].type].duration)))/100;
            pg.warmup="warmup"in ct[x]&&ct[x].warmup>0&&pg.iteration<=ct[x].warmup;
            if(cb("progress", [ct[x], pg])===false) {
                t[x].st=true;
                return z.n()
            }
            ;
            if(t[x].it<=c&&t[x].fl<3) {
                if(t[x].y=="d") {
                    n=d()?0: 1
                }
                else if(t[x].y=="l") {
                    n=l()?0: 1
                }
                else if(t[x].y=="dns")n=dns()?0:1
            }
            else {
                if("dn"in t[x])t[x].rs=t[x].dn;
                t[x].su= {}
                ;
                if("u"in t[x])t[x].su.b=t[x].u;
                if("c"in t[x])t[x].su.c=t[x].c;
                t[x].su.e=t[x].i;
                t[x].su.f="a0d:1B5aLNIAZ";
                if(t[x].fl)t[x].su.g=t[x].fl;
                t[x].su.i=id;
                t[x].su.n="speedtest";
                t[x].su.o=x+1;
                t[x].su.p=t[x].ur.match(/^http: /)?1: 0;
                if("r"in t[x])t[x].su.r=t[x].r;
                t[x].su.s=t[x].fl&&t[x].rs.length?"p": (t[x].rs.length?"s": "f");
                t[x].su.t=t[x].f;
                t[x].su.u=":y";
                t[x].su.w=t[x].w;
                t[x].su.y=t[x].y;
                if(t[x].rs.length) {
                    t[x]._rs=t[x].rs.slice(0);
                    t[x].su.m=t[x].rs.join(",");
                    t[x].su.x=Math.round(t[x].by);
                    t[x].rs.sort(function(a, b) {
                        return a-b
                    }
                    );
                    t[x].su.a=rn(av(t[x].rs));
                    t[x].su.v=rn(sd(t[x].rs));
                    var h=Math.floor(t[x].rs.length/2), tp=t[x].y=="d"||t[x].y=="u";
                    t[x].su.j=t[x].rs[tp?0:t[x].rs.length-1];
                    t[x].su.k=t[x].rs[tp?t[x].rs.length-1:0];
                    t[x].su.d=pc(t[x].rs, 50);
                    t[x].su.p1=pc(t[x].rs, tp?10:90);
                    t[x].su.p2=pc(t[x].rs, tp?25:75);
                    t[x].su.p8=pc(t[x].rs, tp?75:25);
                    t[x].su.p9=pc(t[x].rs, tp?90:10)
                }
                ;
                if(t[x].fl||t[x].rs.length) {
                    var rs= {}
                    ;
                    if(t[x].fl)rs.failed=t[x].fl;
                    rs.status=t[x].su.s=="s"?"success": (t[x].su.s=="p"?"partial": "failed");
                    rs.secure=t[x].su.p==0;
                    rs.sequence=t[x].su.o;
                    if(t[x].rs.length) {
                        rs.bytes=t[x].su.x;
                        rs.fastest=t[x].su.k;
                        rs.mean=t[x].su.a;
                        rs.median=t[x].su.d;
                        rs.metric10=t[x].su.p1;
                        rs.metric25=t[x].su.p2;
                        rs.metric75=t[x].su.p8;
                        rs.metric90=t[x].su.p9;
                        rs.metrics=t[x]._rs;
                        rs.slowest=t[x].su.j;
                        rs.stdev=t[x].su.v
                    }
                    ;
                    if(cb("results", [ct[x], rs])===false)return z.stop(false)
                }
                ;
                n=1;
                if(t[x].fl||t[x].rs.length) {
                    var su=[], bs=g?s.s: (s.p.length?s.p: s.s);
                    t[x].su.h=window.location.hostname;
                    var qs=JSON.stringify(t[x].su);
                    qs=typeof btoa==="function"?btoa(qs): b64(qs);
                    delete t[x].su;
                    for(var i in bs)su.push(bs[i]+"?"+qs);
                    if(su.length) {
                        sh(su);
                        n=0;
                        z.d(su)
                    }
                }
            }
        }
        else if(x!=-2)n=1;
        if(n)if((x+1)<t.length) {
            if(!z.w) {
                z.w=true;
                setTimeout("speedtest.n()", 500)
            }
        }
        else z.n()
    }
    ;
    var id=r(), jp= {}
    ;
    z.n=function() {
        z.w=false;
        if(x==-2)return;
        x++;
        if(x in t&&"st"in t[x]&&t[x].st)return z.n();
        if(x in t) {
            if(!("g"in t[x])&&!("h"in t[x]))return z.n();
            if(g&&!("g"in t[x]))return z.n();
            t[x].ur=e(("g"in t[x])&&(g||!("h"in t[x]))?"https://"+t[x].g: "http://"+t[x].h);
            if(t[x].ur.slice(-1)!="/")t[x].ur+="/";
            if(!("w"in t[x]))t[x].w=0;
            t[x].by=0;
            if(!("c"in t[x]))t[x].c=1;
            t[x].fi=0;
            t[x].fl=0;
            t[x].it=0;
            t[x].rs=[];
            t[x].rt=[];
            t[x].mb=1;
            z.i()
        }
        else z.stop(true)
    }
    ;
    var pc=function(a, p) {
        var i=(a.length-1)*(p/100);
        if(i<0)i=0;
        var i1=Math.floor(i), i2=Math.ceil(i), pe=i1==i2?a[i1]: rn((a[i1]+a[i2])/2);
        return pe
    }
    ;
    z.pt=typeof p!==un?p:null;
    function r() {
        return Math.floor(Math.random()*1e10).toString(36)
    }
    ;
    var rn=function(n, i) {
        var r=Math.pow(10, typeof i!=un?i: 2);
        return Math.round(n*r)/r
    }
    , s= {
        f: {
            d: {
                "974": ":t1k:j", "2076": ":t2k:j", "3085": ":t3k:j", "4088": ":t4k:j", "5243": ":t5k:j", "5726": ":t6k:j", "7172": ":t7k:j", "8513": ":t8k:j", "9591": ":t9k:j", "10043": ":t10k:j", "11951": ":t12k:j", "14165": ":t14k:j", "17187": ":t17k:j", "20293": ":t20k:j", "24345": ":t24k:j", "28891": ":t29k:j", "33897": ":t34k:j", "44262": ":t44k:j", "51445": ":t50k:j", "61856": ":t62k:j", "73492": ":t73k:j", "81520": ":t81k:j", "94394": ":t94k:j", "113255": ":t113k:j", "126731": ":t127k:j", "148544": ":t148k:j", "173072": ":t173k:j", "199715": ":t200k:j", "250386": ":t250k:j", "304134": ":t304k:j", "351810": ":t352k:j", "400298": ":t400k:j", "449581": ":t450k:j", "499536": ":t499k:j", "550773": ":t550k:j", "599832": ":t600k:j", "650082": ":t650k:j", "700211": ":t700k:j", "749303": ":t749k:j", "801628": ":t801k:j", "851388": ":t851k:j", "900933": ":t900k:j", "950380": ":t950k:j", "1047802": ":t1m:j", "2098644": ":t2m:j", "3142868": ":t3m:j", "4193637": ":t4m:j", "5242917": ":t5m:j", "6293339": ":t6m:j", "7336436": ":t7m:j", "8389597": ":t8m:j", "9438814": ":t9m:j", "10486107": ":t10m:j"
            }
            , p:":i", n:":b\/:i"
        }
        , p:[":hs.:y.net\/s.js"], s:[":s:y1.:f\/s.js"]
    }
    ;
    for(var i in s.p)s.p[i]=e(s.p[i]);
    for(var i in s.s)s.s[i]=e(s.s[i]);
    if("d"in s.f)for(var i in s.f.d)s.f.d[i]=e(s.f.d[i]);
    if("n"in s.f)s.f.n=e(s.f.n);
    if("p"in s.f)s.f.p=e(s.f.p);
    if("u"in s.f)s.f.u=e(s.f.u);
    var t=[ {
        a: 500, c: 4, f: ":0FnbYzMAJ", g: "cdn-google.:y:a", h: "cdn.google.:y:a", i: 12, l: ":scloud.google.com\/cdn\/", m: 7, n: "Google Cloud CDN", o: 5, p: "google", s: "google:cdn", t: "cdn", w: 6, x: 128, y: "d", z: 1
    }
    , {
        a: 500, c: 2, d: 4, f: ":0FnbYzMAJ", g: "cdn-google.:y:a", h: "cdn.google.:y:a", i: 6, l: ":scloud.google.com\/cdn\/", m: 44, n: "Google Cloud CDN", o: 5, p: "google", s: "google:cdn", t: "cdn", w: 3, x: 10240, y: "d", z: 256
    }
    , {
        a: 500, c: 1, f: ":0FnbYzMAJ", g: "cdn-google.:y:a", h: "cdn.google.:y:a", i: 12, l: ":scloud.google.com\/cdn\/", m: 48, n: "Google Cloud CDN", o: 5, p: "google", s: "google:cdn", t: "cdn", w: 6, y: "l"
    }
    , {
        a:500, c:1, e: {
            y: "Sydney", c: "AU", l: -33.8628, o: 151.1912
        }
        , f:":07DMBAMA4", g:"australia-southeast1-gce.:y:a", h:"australia-southeast1.gce.:y:a", i:12, l:":scloud.google.com\/compute\/", m:52, n:"Google Compute Engine", o:5, p:"google", r:"australia-southeast1", s:"google:compute", t:"compute", u:"australia-southeast1-a", w:6, y:"l"
    }
    , {
        a:500, c:4, e: {
            y: "Sydney", c: "AU", l: -33.8628, o: 151.1912
        }
        , f:":07DMBAMA4", g:"australia-southeast1-gce.:y:a", h:"australia-southeast1.gce.:y:a", i:12, l:":scloud.google.com\/compute\/", m:60, n:"Google Compute Engine", o:5, p:"google", r:"australia-southeast1", s:"google:compute", t:"compute", u:"australia-southeast1-a", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Sydney", c: "AU", l: -33.8628, o: 151.1912
        }
        , f:":07DMBAMA4", g:"australia-southeast1-gce.:y:a", h:"australia-southeast1.gce.:y:a", i:6, l:":scloud.google.com\/compute\/", m:96, n:"Google Compute Engine", o:5, p:"google", r:"australia-southeast1", s:"google:compute", t:"compute", u:"australia-southeast1-a", w:3, x:10240, y:"d", z:256
    }
    , {
        a: 500, c: 1, f: ":0B5R66MAF", h: "*.:t.gcpdns.net", i: 12, l: ":scloud.google.com\/dns\/", m: 106, n: "Google Cloud DNS", o: 5, p: "google", s: "google:dns", t: "dns", w: 6, y: "dns"
    }
    , {
        a:500, c:4, e: {
            y: "Council Bluffs", s: "IA", c: "US", l: 41.2619, o: -95.8608
        }
        , f:":07DMBAMA4", g:"us-central1-gce.:y:a", h:"us-central1.gce.:y:a", i:12, l:":scloud.google.com\/compute\/", m:113, n:"Google Compute Engine", o:5, p:"google", r:"us-central1", s:"google:compute", t:"compute", u:"us-central1-c", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:1, e: {
            y: "Council Bluffs", s: "IA", c: "US", l: 41.2619, o: -95.8608
        }
        , f:":07DMBAMA4", g:"us-central1-gce.:y:a", h:"us-central1.gce.:y:a", i:12, l:":scloud.google.com\/compute\/", m:118, n:"Google Compute Engine", o:5, p:"google", r:"us-central1", s:"google:compute", t:"compute", u:"us-central1-c", w:6, y:"l"
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Council Bluffs", s: "IA", c: "US", l: 41.2619, o: -95.8608
        }
        , f:":07DMBAMA4", g:"us-central1-gce.:y:a", h:"us-central1.gce.:y:a", i:6, l:":scloud.google.com\/compute\/", m:154, n:"Google Compute Engine", o:5, p:"google", r:"us-central1", s:"google:compute", t:"compute", u:"us-central1-c", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:4, e: {
            y: "Ashburn", s: "VA", c: "US", l: 39.0438, o: -77.4874
        }
        , f:":07DMBAMA4", g:"us-east4-gce.:y:a", h:"us-east4.gce.:y:a", i:12, l:":scloud.google.com\/compute\/", m:162, n:"Google Compute Engine", o:5, p:"google", r:"us-east4", s:"google:compute", t:"compute", u:"us-east4-a", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Ashburn", s: "VA", c: "US", l: 39.0438, o: -77.4874
        }
        , f:":07DMBAMA4", g:"us-east4-gce.:y:a", h:"us-east4.gce.:y:a", i:6, l:":scloud.google.com\/compute\/", m:198, n:"Google Compute Engine", o:5, p:"google", r:"us-east4", s:"google:compute", t:"compute", u:"us-east4-a", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:1, e: {
            y: "Ashburn", s: "VA", c: "US", l: 39.0438, o: -77.4874
        }
        , f:":07DMBAMA4", g:"us-east4-gce.:y:a", h:"us-east4.gce.:y:a", i:12, l:":scloud.google.com\/compute\/", m:202, n:"Google Compute Engine", o:5, p:"google", r:"us-east4", s:"google:compute", t:"compute", u:"us-east4-a", w:6, y:"l"
    }
    , {
        a:500, c:4, e: {
            y: "Moncks Corner", s: "SC", c: "US", l: 33.196, o: -80.0131
        }
        , f:":07DMBAMA4", g:"us-east1-gce.:y:a", h:"us-east1.gce.:y:a", i:12, l:":scloud.google.com\/compute\/", m:210, n:"Google Compute Engine", o:5, p:"google", r:"us-east1", s:"google:compute", t:"compute", u:"us-east1-c", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Moncks Corner", s: "SC", c: "US", l: 33.196, o: -80.0131
        }
        , f:":07DMBAMA4", g:"us-east1-gce.:y:a", h:"us-east1.gce.:y:a", i:6, l:":scloud.google.com\/compute\/", m:247, n:"Google Compute Engine", o:5, p:"google", r:"us-east1", s:"google:compute", t:"compute", u:"us-east1-c", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:4, e: {
            y: "Tokyo", c: "JP", l: 35.6895, o: 139.6917
        }
        , f:":07DMBAMA4", g:"asia-northeast1-gce.:y:a", h:"asia-northeast1.gce.:y:a", i:12, l:":scloud.google.com\/compute\/", m:254, n:"Google Compute Engine", o:5, p:"google", r:"asia-northeast1", s:"google:compute", t:"compute", u:"asia-northeast1-b", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Tokyo", c: "JP", l: 35.6895, o: 139.6917
        }
        , f:":07DMBAMA4", g:"asia-northeast1-gce.:y:a", h:"asia-northeast1.gce.:y:a", i:6, l:":scloud.google.com\/compute\/", m:291, n:"Google Compute Engine", o:5, p:"google", r:"asia-northeast1", s:"google:compute", t:"compute", u:"asia-northeast1-b", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:1, e: {
            y: "Moncks Corner", s: "SC", c: "US", l: 33.196, o: -80.0131
        }
        , f:":07DMBAMA4", g:"us-east1-gce.:y:a", h:"us-east1.gce.:y:a", i:12, l:":scloud.google.com\/compute\/", m:295, n:"Google Compute Engine", o:5, p:"google", r:"us-east1", s:"google:compute", t:"compute", u:"us-east1-c", w:6, y:"l"
    }
    , {
        a:500, c:1, e: {
            y: "Tokyo", c: "JP", l: 35.6895, o: 139.6917
        }
        , f:":07DMBAMA4", g:"asia-northeast1-gce.:y:a", h:"asia-northeast1.gce.:y:a", i:12, l:":scloud.google.com\/compute\/", m:299, n:"Google Compute Engine", o:5, p:"google", r:"asia-northeast1", s:"google:compute", t:"compute", u:"asia-northeast1-b", w:6, y:"l"
    }
    , {
        a:500, c:4, e: {
            y: "S\u00e3o Paulo", c: "BR", l: -23.5505, o: -46.6333
        }
        , f:":07DMBAMA4", g:"southamerica-east1-gce.:y:a", h:"southamerica-east1.gce.:y:a", i:12, l:":scloud.google.com\/compute\/", m:307, n:"Google Compute Engine", o:5, p:"google", r:"southamerica-east1", s:"google:compute", t:"compute", u:"southamerica-east1-a", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "S\u00e3o Paulo", c: "BR", l: -23.5505, o: -46.6333
        }
        , f:":07DMBAMA4", g:"southamerica-east1-gce.:y:a", h:"southamerica-east1.gce.:y:a", i:6, l:":scloud.google.com\/compute\/", m:343, n:"Google Compute Engine", o:5, p:"google", r:"southamerica-east1", s:"google:compute", t:"compute", u:"southamerica-east1-a", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:1, e: {
            y: "S\u00e3o Paulo", c: "BR", l: -23.5505, o: -46.6333
        }
        , f:":07DMBAMA4", g:"southamerica-east1-gce.:y:a", h:"southamerica-east1.gce.:y:a", i:12, l:":scloud.google.com\/compute\/", m:347, n:"Google Compute Engine", o:5, p:"google", r:"southamerica-east1", s:"google:compute", t:"compute", u:"southamerica-east1-a", w:6, y:"l"
    }
    , {
        a:500, c:1, e: {
            y: "Sydney", c: "AU", l: -33.8628, o: 151.1912
        }
        , f:":07D9zxMAC", g:"storage.googleapis.com\/australia-southeast1\/:b", h:"storage.googleapis.com\/australia-southeast1\/:b", i:12, l:":scloud.google.com\/storage\/", m:352, n:"Google Cloud Storage", o:5, p:"google", r:"australia-southeast1", s:"google:storage", t:"storage", w:6, y:"l"
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Sydney", c: "AU", l: -33.8628, o: 151.1912
        }
        , f:":07D9zxMAC", g:"storage.googleapis.com\/australia-southeast1\/:b", h:"storage.googleapis.com\/australia-southeast1\/:b", i:6, l:":scloud.google.com\/storage\/", m:388, n:"Google Cloud Storage", o:5, p:"google", r:"australia-southeast1", s:"google:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:4, e: {
            y: "Sydney", c: "AU", l: -33.8628, o: 151.1912
        }
        , f:":07D9zxMAC", g:"storage.googleapis.com\/australia-southeast1\/:b", h:"storage.googleapis.com\/australia-southeast1\/:b", i:12, l:":scloud.google.com\/storage\/", m:396, n:"Google Cloud Storage", o:5, p:"google", r:"australia-southeast1", s:"google:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:4, e: {
            y: "London", c: "GB", l: 51.5074, o: -0.1278
        }
        , f:":07DMBAMA4", g:"europe-west2-gce.:y:a", h:"europe-west2.gce.:y:a", i:12, l:":scloud.google.com\/compute\/", m:404, n:"Google Compute Engine", o:5, p:"google", r:"europe-west2", s:"google:compute", t:"compute", u:"europe-west2-a", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "London", c: "GB", l: 51.5074, o: -0.1278
        }
        , f:":07DMBAMA4", g:"europe-west2-gce.:y:a", h:"europe-west2.gce.:y:a", i:6, l:":scloud.google.com\/compute\/", m:440, n:"Google Compute Engine", o:5, p:"google", r:"europe-west2", s:"google:compute", t:"compute", u:"europe-west2-a", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:1, e: {
            y: "London", c: "GB", l: 51.5074, o: -0.1278
        }
        , f:":07DMBAMA4", g:"europe-west2-gce.:y:a", h:"europe-west2.gce.:y:a", i:12, l:":scloud.google.com\/compute\/", m:444, n:"Google Compute Engine", o:5, p:"google", r:"europe-west2", s:"google:compute", t:"compute", u:"europe-west2-a", w:6, y:"l"
    }
    , {
        a:500, c:4, e: {
            y: "Los Angeles", s: "CA", c: "US", l: 34.0522, o: -118.2437
        }
        , f:":07DMBAMA4", g:"us-west2-b-gce.:y:a", h:"us-west2-b.gce.:y:a", i:12, l:":scloud.google.com\/compute\/", m:452, n:"Google Compute Engine", o:5, p:"google", r:"us-west2", s:"google:compute", t:"compute", u:"us-west2-b", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:1, e: {
            y: "Los Angeles", s: "CA", c: "US", l: 34.0522, o: -118.2437
        }
        , f:":07DMBAMA4", g:"us-west2-b-gce.:y:a", h:"us-west2-b.gce.:y:a", i:12, l:":scloud.google.com\/compute\/", m:456, n:"Google Compute Engine", o:5, p:"google", r:"us-west2", s:"google:compute", t:"compute", u:"us-west2-b", w:6, y:"l"
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Los Angeles", s: "CA", c: "US", l: 34.0522, o: -118.2437
        }
        , f:":07DMBAMA4", g:"us-west2-b-gce.:y:a", h:"us-west2-b.gce.:y:a", i:6, l:":scloud.google.com\/compute\/", m:493, n:"Google Compute Engine", o:5, p:"google", r:"us-west2", s:"google:compute", t:"compute", u:"us-west2-b", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:1, e: {
            y: "St. Ghislain", c: "BE", l: 50.4704, o: 3.8649
        }
        , f:":07DMBAMA4", g:"europe-west1-gce.:y:a", h:"europe-west1.gce.:y:a", i:12, l:":scloud.google.com\/compute\/", m:497, n:"Google Compute Engine", o:5, p:"google", r:"europe-west1", s:"google:compute", t:"compute", u:"europe-west1-c", w:6, y:"l"
    }
    , {
        a:500, c:2, d:4, e: {
            y: "St. Ghislain", c: "BE", l: 50.4704, o: 3.8649
        }
        , f:":07DMBAMA4", g:"europe-west1-gce.:y:a", h:"europe-west1.gce.:y:a", i:6, l:":scloud.google.com\/compute\/", m:533, n:"Google Compute Engine", o:5, p:"google", r:"europe-west1", s:"google:compute", t:"compute", u:"europe-west1-c", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:4, e: {
            y: "St. Ghislain", c: "BE", l: 50.4704, o: 3.8649
        }
        , f:":07DMBAMA4", g:"europe-west1-gce.:y:a", h:"europe-west1.gce.:y:a", i:12, l:":scloud.google.com\/compute\/", m:541, n:"Google Compute Engine", o:5, p:"google", r:"europe-west1", s:"google:compute", t:"compute", u:"europe-west1-c", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:1, e: {
            y: "Hamina", c: "FI", l: 60.5715, o: 27.1877
        }
        , f:":07DMBAMA4", g:"europe-north1-gce.:y:a", h:"europe-north1.gce.:y:a", i:12, l:":scloud.google.com\/compute\/", m:545, n:"Google Compute Engine", o:5, p:"google", r:"europe-north1", s:"google:compute", t:"compute", u:"europe-north1-b", w:6, y:"l"
    }
    , {
        a:500, c:4, e: {
            y: "Hamina", c: "FI", l: 60.5715, o: 27.1877
        }
        , f:":07DMBAMA4", g:"europe-north1-gce.:y:a", h:"europe-north1.gce.:y:a", i:12, l:":scloud.google.com\/compute\/", m:553, n:"Google Compute Engine", o:5, p:"google", r:"europe-north1", s:"google:compute", t:"compute", u:"europe-north1-b", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Hamina", c: "FI", l: 60.5715, o: 27.1877
        }
        , f:":07DMBAMA4", g:"europe-north1-gce.:y:a", h:"europe-north1.gce.:y:a", i:6, l:":scloud.google.com\/compute\/", m:589, n:"Google Compute Engine", o:5, p:"google", r:"europe-north1", s:"google:compute", t:"compute", u:"europe-north1-b", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Los Angeles", s: "CA", c: "US", l: 34.0522, o: -118.2437
        }
        , f:":07DMBAMA4", g:"us-west2-a-gce.:y:a", h:"us-west2-a.gce.:y:a", i:6, l:":scloud.google.com\/compute\/", m:626, n:"Google Compute Engine", o:5, p:"google", r:"us-west2", s:"google:compute", t:"compute", u:"us-west2-a", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:4, e: {
            y: "Los Angeles", s: "CA", c: "US", l: 34.0522, o: -118.2437
        }
        , f:":07DMBAMA4", g:"us-west2-a-gce.:y:a", h:"us-west2-a.gce.:y:a", i:12, l:":scloud.google.com\/compute\/", m:634, n:"Google Compute Engine", o:5, p:"google", r:"us-west2", s:"google:compute", t:"compute", u:"us-west2-a", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:1, e: {
            y: "Los Angeles", s: "CA", c: "US", l: 34.0522, o: -118.2437
        }
        , f:":07DMBAMA4", g:"us-west2-a-gce.:y:a", h:"us-west2-a.gce.:y:a", i:12, l:":scloud.google.com\/compute\/", m:638, n:"Google Compute Engine", o:5, p:"google", r:"us-west2", s:"google:compute", t:"compute", u:"us-west2-a", w:6, y:"l"
    }
    , {
        a:500, c:4, e: {
            y: "Frankfurt", c: "DE", l: 50.1109, o: 8.6821
        }
        , f:":07DMBAMA4", g:"europe-west3-gce.:y:a", h:"europe-west3.gce.:y:a", i:12, l:":scloud.google.com\/compute\/", m:645, n:"Google Compute Engine", o:5, p:"google", r:"europe-west3", s:"google:compute", t:"compute", u:"europe-west3-c", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Frankfurt", c: "DE", l: 50.1109, o: 8.6821
        }
        , f:":07DMBAMA4", g:"europe-west3-gce.:y:a", h:"europe-west3.gce.:y:a", i:6, l:":scloud.google.com\/compute\/", m:682, n:"Google Compute Engine", o:5, p:"google", r:"europe-west3", s:"google:compute", t:"compute", u:"europe-west3-c", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:1, e: {
            y: "Frankfurt", c: "DE", l: 50.1109, o: 8.6821
        }
        , f:":07DMBAMA4", g:"europe-west3-gce.:y:a", h:"europe-west3.gce.:y:a", i:12, l:":scloud.google.com\/compute\/", m:686, n:"Google Compute Engine", o:5, p:"google", r:"europe-west3", s:"google:compute", t:"compute", u:"europe-west3-c", w:6, y:"l"
    }
    , {
        a:500, c:1, e: {
            y: "Portland", s: "OR", c: "US", l: 45.5213, o: -122.6765
        }
        , f:":07DMBAMA4", g:"us-west1-gce.:y:a", h:"us-west1.gce.:y:a", i:12, l:":scloud.google.com\/compute\/", m:690, n:"Google Compute Engine", o:5, p:"google", r:"us-west1", s:"google:compute", t:"compute", u:"us-west1-b", w:6, y:"l"
    }
    , {
        a:500, c:4, e: {
            y: "Portland", s: "OR", c: "US", l: 45.5213, o: -122.6765
        }
        , f:":07DMBAMA4", g:"us-west1-gce.:y:a", h:"us-west1.gce.:y:a", i:12, l:":scloud.google.com\/compute\/", m:698, n:"Google Compute Engine", o:5, p:"google", r:"us-west1", s:"google:compute", t:"compute", u:"us-west1-b", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Mumbai", c: "IN", l: 19.076, o: 72.8777
        }
        , f:":07DMBAMA4", g:"asia-south1-gce.:y:a", h:"asia-south1.gce.:y:a", i:6, l:":scloud.google.com\/compute\/", m:734, n:"Google Compute Engine", o:5, p:"google", r:"asia-south1", s:"google:compute", t:"compute", u:"asia-south1-a", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:4, e: {
            y: "Mumbai", c: "IN", l: 19.076, o: 72.8777
        }
        , f:":07DMBAMA4", g:"asia-south1-gce.:y:a", h:"asia-south1.gce.:y:a", i:12, l:":scloud.google.com\/compute\/", m:742, n:"Google Compute Engine", o:5, p:"google", r:"asia-south1", s:"google:compute", t:"compute", u:"asia-south1-a", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Portland", s: "OR", c: "US", l: 45.5213, o: -122.6765
        }
        , f:":07DMBAMA4", g:"us-west1-gce.:y:a", h:"us-west1.gce.:y:a", i:6, l:":scloud.google.com\/compute\/", m:779, n:"Google Compute Engine", o:5, p:"google", r:"us-west1", s:"google:compute", t:"compute", u:"us-west1-b", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Los Angeles", s: "CA", c: "US", l: 34.0522, o: -118.2437
        }
        , f:":07DMBAMA4", g:"us-west2-c-gce.:y:a", h:"us-west2-c.gce.:y:a", i:6, l:":scloud.google.com\/compute\/", m:815, n:"Google Compute Engine", o:5, p:"google", r:"us-west2", s:"google:compute", t:"compute", u:"us-west2-c", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:1, e: {
            y: "Mumbai", c: "IN", l: 19.076, o: 72.8777
        }
        , f:":07DMBAMA4", g:"asia-south1-gce.:y:a", h:"asia-south1.gce.:y:a", i:12, l:":scloud.google.com\/compute\/", m:819, n:"Google Compute Engine", o:5, p:"google", r:"asia-south1", s:"google:compute", t:"compute", u:"asia-south1-a", w:6, y:"l"
    }
    , {
        a:500, c:4, e: {
            y: "Los Angeles", s: "CA", c: "US", l: 34.0522, o: -118.2437
        }
        , f:":07DMBAMA4", g:"us-west2-c-gce.:y:a", h:"us-west2-c.gce.:y:a", i:12, l:":scloud.google.com\/compute\/", m:827, n:"Google Compute Engine", o:5, p:"google", r:"us-west2", s:"google:compute", t:"compute", u:"us-west2-c", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:1, e: {
            y: "Los Angeles", s: "CA", c: "US", l: 34.0522, o: -118.2437
        }
        , f:":07DMBAMA4", g:"us-west2-c-gce.:y:a", h:"us-west2-c.gce.:y:a", i:12, l:":scloud.google.com\/compute\/", m:831, n:"Google Compute Engine", o:5, p:"google", r:"us-west2", s:"google:compute", t:"compute", u:"us-west2-c", w:6, y:"l"
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Montreal", c: "CA", l: 45.3627, o: -73.3458
        }
        , f:":07DMBAMA4", g:"northamerica-northeast1-gce.:y:a", h:"northamerica-northeast1.gce.:y:a", i:6, l:":scloud.google.com\/compute\/", m:868, n:"Google Compute Engine", o:5, p:"google", r:"northamerica-northeast1", s:"google:compute", t:"compute", u:"northamerica-northeast1-a", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:4, e: {
            y: "Montreal", c: "CA", l: 45.3627, o: -73.3458
        }
        , f:":07DMBAMA4", g:"northamerica-northeast1-gce.:y:a", h:"northamerica-northeast1.gce.:y:a", i:12, l:":scloud.google.com\/compute\/", m:875, n:"Google Compute Engine", o:5, p:"google", r:"northamerica-northeast1", s:"google:compute", t:"compute", u:"northamerica-northeast1-a", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:1, e: {
            y: "Montreal", c: "CA", l: 45.3627, o: -73.3458
        }
        , f:":07DMBAMA4", g:"northamerica-northeast1-gce.:y:a", h:"northamerica-northeast1.gce.:y:a", i:12, l:":scloud.google.com\/compute\/", m:879, n:"Google Compute Engine", o:5, p:"google", r:"northamerica-northeast1", s:"google:compute", t:"compute", u:"northamerica-northeast1-a", w:6, y:"l"
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Hong Kong", c: "HK", l: 22.3964, o: 114.1095
        }
        , f:":07DMBAMA4", g:"asia-east2-gce.:y:a", h:"asia-east2.gce.:y:a", i:6, l:":scloud.google.com\/compute\/", m:916, n:"Google Compute Engine", o:5, p:"google", r:"asia-east2", s:"google:compute", t:"compute", u:"asia-east2-b", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:1, e: {
            y: "Hong Kong", c: "HK", l: 22.3964, o: 114.1095
        }
        , f:":07DMBAMA4", g:"asia-east2-gce.:y:a", h:"asia-east2.gce.:y:a", i:12, l:":scloud.google.com\/compute\/", m:920, n:"Google Compute Engine", o:5, p:"google", r:"asia-east2", s:"google:compute", t:"compute", u:"asia-east2-b", w:6, y:"l"
    }
    , {
        a:500, c:4, e: {
            y: "Hong Kong", c: "HK", l: 22.3964, o: 114.1095
        }
        , f:":07DMBAMA4", g:"asia-east2-gce.:y:a", h:"asia-east2.gce.:y:a", i:12, l:":scloud.google.com\/compute\/", m:928, n:"Google Compute Engine", o:5, p:"google", r:"asia-east2", s:"google:compute", t:"compute", u:"asia-east2-b", w:6, x:128, y:"d", z:1
    }
    , {
        a: 500, c: 4, f: ":07D9zxMAC", g: "ch-eu.storage.googleapis.com\/:b", h: "ch-eu.storage.googleapis.com\/:b", i: 12, l: ":scloud.google.com\/storage\/", m: 936, n: "Google Cloud Storage", o: 5, p: "google", r: "eu", s: "google:storage", t: "storage", w: 6, x: 128, y: "d", z: 1
    }
    , {
        a: 500, c: 2, d: 4, f: ":07D9zxMAC", g: "ch-eu.storage.googleapis.com\/:b", h: "ch-eu.storage.googleapis.com\/:b", i: 6, l: ":scloud.google.com\/storage\/", m: 972, n: "Google Cloud Storage", o: 5, p: "google", r: "eu", s: "google:storage", t: "storage", w: 3, x: 10240, y: "d", z: 256
    }
    , {
        a:500, c:4, e: {
            y: "Singapore", c: "SG", l: 1.3521, o: 103.8198
        }
        , f:":07DMBAMA4", g:"asia-southeast1-gce.:y:a", h:"asia-southeast1.gce.:y:a", i:12, l:":scloud.google.com\/compute\/", m:980, n:"Google Compute Engine", o:5, p:"google", r:"asia-southeast1", s:"google:compute", t:"compute", u:"asia-southeast1-b", w:6, x:128, y:"d", z:1
    }
    , {
        a: 500, c: 2, d: 4, f: ":07D9zxMAC", g: "ch-us.storage.googleapis.com\/:b", h: "ch-us.storage.googleapis.com\/:b", i: 6, l: ":scloud.google.com\/storage\/", m: 1016, n: "Google Cloud Storage", o: 5, p: "google", r: "us", s: "google:storage", t: "storage", w: 3, x: 10240, y: "d", z: 256
    }
    , {
        a:500, c:1, e: {
            y: "Singapore", c: "SG", l: 1.3521, o: 103.8198
        }
        , f:":07DMBAMA4", g:"asia-southeast1-gce.:y:a", h:"asia-southeast1.gce.:y:a", i:12, l:":scloud.google.com\/compute\/", m:1020, n:"Google Compute Engine", o:5, p:"google", r:"asia-southeast1", s:"google:compute", t:"compute", u:"asia-southeast1-b", w:6, y:"l"
    }
    , {
        a: 500, c: 4, f: ":07D9zxMAC", g: "ch-us.storage.googleapis.com\/:b", h: "ch-us.storage.googleapis.com\/:b", i: 12, l: ":scloud.google.com\/storage\/", m: 1028, n: "Google Cloud Storage", o: 5, p: "google", r: "us", s: "google:storage", t: "storage", w: 6, x: 128, y: "d", z: 1
    }
    , {
        a: 500, c: 4, f: ":07D9zxMAC", g: "ch-asia.storage.googleapis.com\/:b", h: "ch-asia.storage.googleapis.com\/:b", i: 12, l: ":scloud.google.com\/storage\/", m: 1036, n: "Google Cloud Storage", o: 5, p: "google", r: "asia", s: "google:storage", t: "storage", w: 6, x: 128, y: "d", z: 1
    }
    , {
        a: 500, c: 1, f: ":07D9zxMAC", g: "ch-us.storage.googleapis.com\/:b", h: "ch-us.storage.googleapis.com\/:b", i: 12, l: ":scloud.google.com\/storage\/", m: 1040, n: "Google Cloud Storage", o: 5, p: "google", r: "us", s: "google:storage", t: "storage", w: 6, y: "l"
    }
    , {
        a: 500, c: 1, f: ":07D9zxMAC", g: "ch-asia.storage.googleapis.com\/:b", h: "ch-asia.storage.googleapis.com\/:b", i: 12, l: ":scloud.google.com\/storage\/", m: 1044, n: "Google Cloud Storage", o: 5, p: "google", r: "asia", s: "google:storage", t: "storage", w: 6, y: "l"
    }
    , {
        a: 500, c: 2, d: 4, f: ":07D9zxMAC", g: "ch-asia.storage.googleapis.com\/:b", h: "ch-asia.storage.googleapis.com\/:b", i: 6, l: ":scloud.google.com\/storage\/", m: 1081, n: "Google Cloud Storage", o: 5, p: "google", r: "asia", s: "google:storage", t: "storage", w: 3, x: 10240, y: "d", z: 256
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Singapore", c: "SG", l: 1.3521, o: 103.8198
        }
        , f:":07DMBAMA4", g:"asia-southeast1-gce.:y:a", h:"asia-southeast1.gce.:y:a", i:6, l:":scloud.google.com\/compute\/", m:1117, n:"Google Compute Engine", o:5, p:"google", r:"asia-southeast1", s:"google:compute", t:"compute", u:"asia-southeast1-b", w:3, x:10240, y:"d", z:256
    }
    , {
        a: 500, c: 1, f: ":07D9zxMAC", g: "ch-eu.storage.googleapis.com\/:b", h: "ch-eu.storage.googleapis.com\/:b", i: 12, l: ":scloud.google.com\/storage\/", m: 1121, n: "Google Cloud Storage", o: 5, p: "google", r: "eu", s: "google:storage", t: "storage", w: 6, y: "l"
    }
    , {
        a:500, c:4, e: {
            y: "Hong Kong", c: "HK", l: 22.3964, o: 114.1095
        }
        , f:":07D9zxMAC", g:"ch-asia-east2.storage.googleapis.com\/:b", h:"ch-asia-east2.storage.googleapis.com\/:b", i:12, l:":scloud.google.com\/storage\/", m:1129, n:"Google Cloud Storage", o:5, p:"google", r:"asia-east2", s:"google:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Hong Kong", c: "HK", l: 22.3964, o: 114.1095
        }
        , f:":07D9zxMAC", g:"ch-asia-east2.storage.googleapis.com\/:b", h:"ch-asia-east2.storage.googleapis.com\/:b", i:6, l:":scloud.google.com\/storage\/", m:1165, n:"Google Cloud Storage", o:5, p:"google", r:"asia-east2", s:"google:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:1, e: {
            y: "Hong Kong", c: "HK", l: 22.3964, o: 114.1095
        }
        , f:":07D9zxMAC", g:"ch-asia-east2.storage.googleapis.com\/:b", h:"ch-asia-east2.storage.googleapis.com\/:b", i:12, l:":scloud.google.com\/storage\/", m:1170, n:"Google Cloud Storage", o:5, p:"google", r:"asia-east2", s:"google:storage", t:"storage", w:6, y:"l"
    }
    , {
        a:500, c:1, e: {
            y: "Changhua County", c: "TW", l: 23.9333, o: 120.5333
        }
        , f:":07DMBAMA4", g:"asia-east1-gce.:y:a", h:"asia-east1.gce.:y:a", i:12, l:":scloud.google.com\/compute\/", m:1174, n:"Google Compute Engine", o:5, p:"google", r:"asia-east1", s:"google:compute", t:"compute", u:"asia-east1-b", w:6, y:"l"
    }
    , {
        a:500, c:4, e: {
            y: "Changhua County", c: "TW", l: 23.9333, o: 120.5333
        }
        , f:":07DMBAMA4", g:"asia-east1-gce.:y:a", h:"asia-east1.gce.:y:a", i:12, l:":scloud.google.com\/compute\/", m:1181, n:"Google Compute Engine", o:5, p:"google", r:"asia-east1", s:"google:compute", t:"compute", u:"asia-east1-b", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Changhua County", c: "TW", l: 23.9333, o: 120.5333
        }
        , f:":07DMBAMA4", g:"asia-east1-gce.:y:a", h:"asia-east1.gce.:y:a", i:6, l:":scloud.google.com\/compute\/", m:1218, n:"Google Compute Engine", o:5, p:"google", r:"asia-east1", s:"google:compute", t:"compute", u:"asia-east1-b", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:4, e: {
            y: "Eemshaven", c: "NL", l: 53.2622, o: 6.4936
        }
        , f:":07DMBAMA4", g:"europe-west4-gce.:y:a", h:"europe-west4.gce.:y:a", i:12, l:":scloud.google.com\/compute\/", m:1226, n:"Google Compute Engine", o:5, p:"google", r:"europe-west4", s:"google:compute", t:"compute", u:"europe-west4-b", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:1, e: {
            y: "Frankfurt", c: "DE", l: 50.1109, o: 8.6821
        }
        , f:":07D9zxMAC", g:"storage.googleapis.com\/ch-europe-west3\/:b", h:"storage.googleapis.com\/ch-europe-west3\/:b", i:12, l:":scloud.google.com\/storage\/", m:1230, n:"Google Cloud Storage", o:5, p:"google", r:"europe-west3", s:"google:storage", t:"storage", w:6, y:"l"
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Eemshaven", c: "NL", l: 53.2622, o: 6.4936
        }
        , f:":07DMBAMA4", g:"europe-west4-gce.:y:a", h:"europe-west4.gce.:y:a", i:6, l:":scloud.google.com\/compute\/", m:1266, n:"Google Compute Engine", o:5, p:"google", r:"europe-west4", s:"google:compute", t:"compute", u:"europe-west4-b", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Frankfurt", c: "DE", l: 50.1109, o: 8.6821
        }
        , f:":07D9zxMAC", g:"storage.googleapis.com\/ch-europe-west3\/:b", h:"storage.googleapis.com\/ch-europe-west3\/:b", i:6, l:":scloud.google.com\/storage\/", m:1303, n:"Google Cloud Storage", o:5, p:"google", r:"europe-west3", s:"google:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:1, e: {
            y: "Eemshaven", c: "NL", l: 53.2622, o: 6.4936
        }
        , f:":07DMBAMA4", g:"europe-west4-gce.:y:a", h:"europe-west4.gce.:y:a", i:12, l:":scloud.google.com\/compute\/", m:1307, n:"Google Compute Engine", o:5, p:"google", r:"europe-west4", s:"google:compute", t:"compute", u:"europe-west4-b", w:6, y:"l"
    }
    , {
        a:500, c:4, e: {
            y: "Frankfurt", c: "DE", l: 50.1109, o: 8.6821
        }
        , f:":07D9zxMAC", g:"storage.googleapis.com\/ch-europe-west3\/:b", h:"storage.googleapis.com\/ch-europe-west3\/:b", i:12, l:":scloud.google.com\/storage\/", m:1315, n:"Google Cloud Storage", o:5, p:"google", r:"europe-west3", s:"google:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Montreal", c: "CA", l: 45.3627, o: -73.3458
        }
        , f:":07D9zxMAC", g:"storage.googleapis.com\/ch-northamerica-northeast1\/:b", h:"storage.googleapis.com\/ch-northamerica-northeast1\/:b", i:6, l:":scloud.google.com\/storage\/", m:1351, n:"Google Cloud Storage", o:5, p:"google", r:"northamerica-northeast1", s:"google:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:4, e: {
            y: "Montreal", c: "CA", l: 45.3627, o: -73.3458
        }
        , f:":07D9zxMAC", g:"storage.googleapis.com\/ch-northamerica-northeast1\/:b", h:"storage.googleapis.com\/ch-northamerica-northeast1\/:b", i:12, l:":scloud.google.com\/storage\/", m:1359, n:"Google Cloud Storage", o:5, p:"google", r:"northamerica-northeast1", s:"google:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:1, e: {
            y: "Montreal", c: "CA", l: 45.3627, o: -73.3458
        }
        , f:":07D9zxMAC", g:"storage.googleapis.com\/ch-northamerica-northeast1\/:b", h:"storage.googleapis.com\/ch-northamerica-northeast1\/:b", i:12, l:":scloud.google.com\/storage\/", m:1363, n:"Google Cloud Storage", o:5, p:"google", r:"northamerica-northeast1", s:"google:storage", t:"storage", w:6, y:"l"
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Changhua County", c: "TW", l: 23.9333, o: 120.5333
        }
        , f:":07D9zxMAC", g:"ch-asia-east1.storage.googleapis.com\/:b", h:"ch-asia-east1.storage.googleapis.com\/:b", i:6, l:":scloud.google.com\/storage\/", m:1399, n:"Google Cloud Storage", o:5, p:"google", r:"asia-east1", s:"google:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:1, e: {
            y: "Council Bluffs", s: "IA", c: "US", l: 41.2619, o: -95.8608
        }
        , f:":07D9zxMAC", g:"ch-us-central1.storage.googleapis.com\/:b", h:"ch-us-central1.storage.googleapis.com\/:b", i:12, l:":scloud.google.com\/storage\/", m:1404, n:"Google Cloud Storage", o:5, p:"google", r:"us-central1", s:"google:storage", t:"storage", w:6, y:"l"
    }
    , {
        a:500, c:1, e: {
            y: "Changhua County", c: "TW", l: 23.9333, o: 120.5333
        }
        , f:":07D9zxMAC", g:"ch-asia-east1.storage.googleapis.com\/:b", h:"ch-asia-east1.storage.googleapis.com\/:b", i:12, l:":scloud.google.com\/storage\/", m:1408, n:"Google Cloud Storage", o:5, p:"google", r:"asia-east1", s:"google:storage", t:"storage", w:6, y:"l"
    }
    , {
        a:500, c:4, e: {
            y: "Changhua County", c: "TW", l: 23.9333, o: 120.5333
        }
        , f:":07D9zxMAC", g:"ch-asia-east1.storage.googleapis.com\/:b", h:"ch-asia-east1.storage.googleapis.com\/:b", i:12, l:":scloud.google.com\/storage\/", m:1415, n:"Google Cloud Storage", o:5, p:"google", r:"asia-east1", s:"google:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:4, e: {
            y: "Council Bluffs", s: "IA", c: "US", l: 41.2619, o: -95.8608
        }
        , f:":07D9zxMAC", g:"ch-us-central1.storage.googleapis.com\/:b", h:"ch-us-central1.storage.googleapis.com\/:b", i:12, l:":scloud.google.com\/storage\/", m:1423, n:"Google Cloud Storage", o:5, p:"google", r:"us-central1", s:"google:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Council Bluffs", s: "IA", c: "US", l: 41.2619, o: -95.8608
        }
        , f:":07D9zxMAC", g:"ch-us-central1.storage.googleapis.com\/:b", h:"ch-us-central1.storage.googleapis.com\/:b", i:6, l:":scloud.google.com\/storage\/", m:1460, n:"Google Cloud Storage", o:5, p:"google", r:"us-central1", s:"google:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Mumbai", c: "IN", l: 19.076, o: 72.8777
        }
        , f:":07D9zxMAC", g:"ch-asia-south1.storage.googleapis.com\/:b", h:"ch-asia-south1.storage.googleapis.com\/:b", i:6, l:":scloud.google.com\/storage\/", m:1496, n:"Google Cloud Storage", o:5, p:"google", r:"asia-south1", s:"google:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:1, e: {
            y: "Mumbai", c: "IN", l: 19.076, o: 72.8777
        }
        , f:":07D9zxMAC", g:"ch-asia-south1.storage.googleapis.com\/:b", h:"ch-asia-south1.storage.googleapis.com\/:b", i:12, l:":scloud.google.com\/storage\/", m:1500, n:"Google Cloud Storage", o:5, p:"google", r:"asia-south1", s:"google:storage", t:"storage", w:6, y:"l"
    }
    , {
        a:500, c:4, e: {
            y: "Mumbai", c: "IN", l: 19.076, o: 72.8777
        }
        , f:":07D9zxMAC", g:"ch-asia-south1.storage.googleapis.com\/:b", h:"ch-asia-south1.storage.googleapis.com\/:b", i:12, l:":scloud.google.com\/storage\/", m:1508, n:"Google Cloud Storage", o:5, p:"google", r:"asia-south1", s:"google:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:4, e: {
            y: "Eemshaven", c: "NL", l: 53.2622, o: 6.4936
        }
        , f:":07D9zxMAC", g:"storage.googleapis.com\/ch-europe-west4\/:b", h:"storage.googleapis.com\/ch-europe-west4\/:b", i:12, l:":scloud.google.com\/storage\/", m:1516, n:"Google Cloud Storage", o:5, p:"google", r:"europe-west4", s:"google:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:1, e: {
            y: "Hamina", c: "FI", l: 60.5715, o: 27.1877
        }
        , f:":07D9zxMAC", g:"ch-europe-north1.storage.googleapis.com\/:b", h:"ch-europe-north1.storage.googleapis.com\/:b", i:12, l:":scloud.google.com\/storage\/", m:1520, n:"Google Cloud Storage", o:5, p:"google", r:"europe-north1", s:"google:storage", t:"storage", w:6, y:"l"
    }
    , {
        a:500, c:1, e: {
            y: "Eemshaven", c: "NL", l: 53.2622, o: 6.4936
        }
        , f:":07D9zxMAC", g:"storage.googleapis.com\/ch-europe-west4\/:b", h:"storage.googleapis.com\/ch-europe-west4\/:b", i:12, l:":scloud.google.com\/storage\/", m:1524, n:"Google Cloud Storage", o:5, p:"google", r:"europe-west4", s:"google:storage", t:"storage", w:6, y:"l"
    }
    , {
        a:500, c:4, e: {
            y: "Hamina", c: "FI", l: 60.5715, o: 27.1877
        }
        , f:":07D9zxMAC", g:"ch-europe-north1.storage.googleapis.com\/:b", h:"ch-europe-north1.storage.googleapis.com\/:b", i:12, l:":scloud.google.com\/storage\/", m:1532, n:"Google Cloud Storage", o:5, p:"google", r:"europe-north1", s:"google:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Hamina", c: "FI", l: 60.5715, o: 27.1877
        }
        , f:":07D9zxMAC", g:"ch-europe-north1.storage.googleapis.com\/:b", h:"ch-europe-north1.storage.googleapis.com\/:b", i:6, l:":scloud.google.com\/storage\/", m:1568, n:"Google Cloud Storage", o:5, p:"google", r:"europe-north1", s:"google:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Eemshaven", c: "NL", l: 53.2622, o: 6.4936
        }
        , f:":07D9zxMAC", g:"storage.googleapis.com\/ch-europe-west4\/:b", h:"storage.googleapis.com\/ch-europe-west4\/:b", i:6, l:":scloud.google.com\/storage\/", m:1605, n:"Google Cloud Storage", o:5, p:"google", r:"europe-west4", s:"google:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:4, e: {
            y: "London", c: "GB", l: 51.5074, o: -0.1278
        }
        , f:":07D9zxMAC", g:"storage.googleapis.com\/europe-west2\/:b", h:"storage.googleapis.com\/europe-west2\/:b", i:12, l:":scloud.google.com\/storage\/", m:1613, n:"Google Cloud Storage", o:5, p:"google", r:"europe-west2", s:"google:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:1, e: {
            y: "London", c: "GB", l: 51.5074, o: -0.1278
        }
        , f:":07D9zxMAC", g:"storage.googleapis.com\/europe-west2\/:b", h:"storage.googleapis.com\/europe-west2\/:b", i:12, l:":scloud.google.com\/storage\/", m:1617, n:"Google Cloud Storage", o:5, p:"google", r:"europe-west2", s:"google:storage", t:"storage", w:6, y:"l"
    }
    , {
        a:500, c:2, d:4, e: {
            y: "London", c: "GB", l: 51.5074, o: -0.1278
        }
        , f:":07D9zxMAC", g:"storage.googleapis.com\/europe-west2\/:b", h:"storage.googleapis.com\/europe-west2\/:b", i:6, l:":scloud.google.com\/storage\/", m:1653, n:"Google Cloud Storage", o:5, p:"google", r:"europe-west2", s:"google:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:4, e: {
            y: "S\u00e3o Paulo", c: "BR", l: -23.5505, o: -46.6333
        }
        , f:":07D9zxMAC", g:"storage.googleapis.com\/southamerica-east1\/:b", h:"storage.googleapis.com\/southamerica-east1\/:b", i:12, l:":scloud.google.com\/storage\/", m:1661, n:"Google Cloud Storage", o:5, p:"google", r:"southamerica-east1", s:"google:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:1, e: {
            y: "S\u00e3o Paulo", c: "BR", l: -23.5505, o: -46.6333
        }
        , f:":07D9zxMAC", g:"storage.googleapis.com\/southamerica-east1\/:b", h:"storage.googleapis.com\/southamerica-east1\/:b", i:12, l:":scloud.google.com\/storage\/", m:1665, n:"Google Cloud Storage", o:5, p:"google", r:"southamerica-east1", s:"google:storage", t:"storage", w:6, y:"l"
    }
    , {
        a:500, c:2, d:4, e: {
            y: "S\u00e3o Paulo", c: "BR", l: -23.5505, o: -46.6333
        }
        , f:":07D9zxMAC", g:"storage.googleapis.com\/southamerica-east1\/:b", h:"storage.googleapis.com\/southamerica-east1\/:b", i:6, l:":scloud.google.com\/storage\/", m:1701, n:"Google Cloud Storage", o:5, p:"google", r:"southamerica-east1", s:"google:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Tokyo", c: "JP", l: 35.6895, o: 139.6917
        }
        , f:":07D9zxMAC", g:"ch-asia-northeast1.storage.googleapis.com\/:b", h:"ch-asia-northeast1.storage.googleapis.com\/:b", i:6, l:":scloud.google.com\/storage\/", m:1738, n:"Google Cloud Storage", o:5, p:"google", r:"asia-northeast1", s:"google:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:1, e: {
            y: "Tokyo", c: "JP", l: 35.6895, o: 139.6917
        }
        , f:":07D9zxMAC", g:"ch-asia-northeast1.storage.googleapis.com\/:b", h:"ch-asia-northeast1.storage.googleapis.com\/:b", i:12, l:":scloud.google.com\/storage\/", m:1742, n:"Google Cloud Storage", o:5, p:"google", r:"asia-northeast1", s:"google:storage", t:"storage", w:6, y:"l"
    }
    , {
        a:500, c:4, e: {
            y: "Tokyo", c: "JP", l: 35.6895, o: 139.6917
        }
        , f:":07D9zxMAC", g:"ch-asia-northeast1.storage.googleapis.com\/:b", h:"ch-asia-northeast1.storage.googleapis.com\/:b", i:12, l:":scloud.google.com\/storage\/", m:1750, n:"Google Cloud Storage", o:5, p:"google", r:"asia-northeast1", s:"google:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Portland", s: "OR", c: "US", l: 45.5213, o: -122.6765
        }
        , f:":07D9zxMAC", g:"ch-us-west1.storage.googleapis.com\/:b", h:"ch-us-west1.storage.googleapis.com\/:b", i:6, l:":scloud.google.com\/storage\/", m:1786, n:"Google Cloud Storage", o:5, p:"google", r:"us-west1", s:"google:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:1, e: {
            y: "Portland", s: "OR", c: "US", l: 45.5213, o: -122.6765
        }
        , f:":07D9zxMAC", g:"ch-us-west1.storage.googleapis.com\/:b", h:"ch-us-west1.storage.googleapis.com\/:b", i:12, l:":scloud.google.com\/storage\/", m:1790, n:"Google Cloud Storage", o:5, p:"google", r:"us-west1", s:"google:storage", t:"storage", w:6, y:"l"
    }
    , {
        a:500, c:4, e: {
            y: "Portland", s: "OR", c: "US", l: 45.5213, o: -122.6765
        }
        , f:":07D9zxMAC", g:"ch-us-west1.storage.googleapis.com\/:b", h:"ch-us-west1.storage.googleapis.com\/:b", i:12, l:":scloud.google.com\/storage\/", m:1798, n:"Google Cloud Storage", o:5, p:"google", r:"us-west1", s:"google:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "St. Ghislain", c: "BE", l: 50.4704, o: 3.8649
        }
        , f:":07D9zxMAC", g:"ch-europe-west1.storage.googleapis.com\/:b", h:"ch-europe-west1.storage.googleapis.com\/:b", i:6, l:":scloud.google.com\/storage\/", m:1835, n:"Google Cloud Storage", o:5, p:"google", r:"europe-west1", s:"google:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:1, e: {
            y: "St. Ghislain", c: "BE", l: 50.4704, o: 3.8649
        }
        , f:":07D9zxMAC", g:"ch-europe-west1.storage.googleapis.com\/:b", h:"ch-europe-west1.storage.googleapis.com\/:b", i:12, l:":scloud.google.com\/storage\/", m:1839, n:"Google Cloud Storage", o:5, p:"google", r:"europe-west1", s:"google:storage", t:"storage", w:6, y:"l"
    }
    , {
        a:500, c:4, e: {
            y: "St. Ghislain", c: "BE", l: 50.4704, o: 3.8649
        }
        , f:":07D9zxMAC", g:"ch-europe-west1.storage.googleapis.com\/:b", h:"ch-europe-west1.storage.googleapis.com\/:b", i:12, l:":scloud.google.com\/storage\/", m:1847, n:"Google Cloud Storage", o:5, p:"google", r:"europe-west1", s:"google:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:1, e: {
            y: "Ashburn", s: "VA", c: "US", l: 39.0438, o: -77.4874
        }
        , f:":07D9zxMAC", g:"us-east4.storage.googleapis.com\/:b", h:"us-east4.storage.googleapis.com\/:b", i:12, l:":scloud.google.com\/storage\/", m:1851, n:"Google Cloud Storage", o:5, p:"google", r:"us-east4", s:"google:storage", t:"storage", w:6, y:"l"
    }
    , {
        a:500, c:4, e: {
            y: "Ashburn", s: "VA", c: "US", l: 39.0438, o: -77.4874
        }
        , f:":07D9zxMAC", g:"us-east4.storage.googleapis.com\/:b", h:"us-east4.storage.googleapis.com\/:b", i:12, l:":scloud.google.com\/storage\/", m:1858, n:"Google Cloud Storage", o:5, p:"google", r:"us-east4", s:"google:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Ashburn", s: "VA", c: "US", l: 39.0438, o: -77.4874
        }
        , f:":07D9zxMAC", g:"us-east4.storage.googleapis.com\/:b", h:"us-east4.storage.googleapis.com\/:b", i:6, l:":scloud.google.com\/storage\/", m:1895, n:"Google Cloud Storage", o:5, p:"google", r:"us-east4", s:"google:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:1, e: {
            y: "Moncks Corner", s: "SC", c: "US", l: 33.196, o: -80.0131
        }
        , f:":07D9zxMAC", g:"ch-us-east1.storage.googleapis.com\/:b", h:"ch-us-east1.storage.googleapis.com\/:b", i:12, l:":scloud.google.com\/storage\/", m:1899, n:"Google Cloud Storage", o:5, p:"google", r:"us-east1", s:"google:storage", t:"storage", w:6, y:"l"
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Moncks Corner", s: "SC", c: "US", l: 33.196, o: -80.0131
        }
        , f:":07D9zxMAC", g:"ch-us-east1.storage.googleapis.com\/:b", h:"ch-us-east1.storage.googleapis.com\/:b", i:6, l:":scloud.google.com\/storage\/", m:1935, n:"Google Cloud Storage", o:5, p:"google", r:"us-east1", s:"google:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:4, e: {
            y: "Moncks Corner", s: "SC", c: "US", l: 33.196, o: -80.0131
        }
        , f:":07D9zxMAC", g:"ch-us-east1.storage.googleapis.com\/:b", h:"ch-us-east1.storage.googleapis.com\/:b", i:12, l:":scloud.google.com\/storage\/", m:1943, n:"Google Cloud Storage", o:5, p:"google", r:"us-east1", s:"google:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:1, e: {
            y: "Singapore", c: "SG", l: 1.3521, o: 103.8198
        }
        , f:":07D9zxMAC", g:"ch-asia-southeast1.storage.googleapis.com\/:b", h:"ch-asia-southeast1.storage.googleapis.com\/:b", i:12, l:":scloud.google.com\/storage\/", m:1947, n:"Google Cloud Storage", o:5, p:"google", r:"asia-southeast1", s:"google:storage", t:"storage", w:6, y:"l"
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Singapore", c: "SG", l: 1.3521, o: 103.8198
        }
        , f:":07D9zxMAC", g:"ch-asia-southeast1.storage.googleapis.com\/:b", h:"ch-asia-southeast1.storage.googleapis.com\/:b", i:6, l:":scloud.google.com\/storage\/", m:1984, n:"Google Cloud Storage", o:5, p:"google", r:"asia-southeast1", s:"google:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:4, e: {
            y: "Singapore", c: "SG", l: 1.3521, o: 103.8198
        }
        , f:":07D9zxMAC", g:"ch-asia-southeast1.storage.googleapis.com\/:b", h:"ch-asia-southeast1.storage.googleapis.com\/:b", i:12, l:":scloud.google.com\/storage\/", m:1992, n:"Google Cloud Storage", o:5, p:"google", r:"asia-southeast1", s:"google:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:4, e: {
            y: "Los Angeles", s: "CA", c: "US", l: 34.0522, o: -118.2437
        }
        , f:":07D9zxMAC", g:"ch-us-west2.storage.googleapis.com\/:b", h:"ch-us-west2.storage.googleapis.com\/:b", i:12, l:":scloud.google.com\/storage\/", m:1999, n:"Google Cloud Storage", o:5, p:"google", r:"us-west2", s:"google:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:1, e: {
            y: "Los Angeles", s: "CA", c: "US", l: 34.0522, o: -118.2437
        }
        , f:":07D9zxMAC", g:"ch-us-west2.storage.googleapis.com\/:b", h:"ch-us-west2.storage.googleapis.com\/:b", i:12, l:":scloud.google.com\/storage\/", m:2003, n:"Google Cloud Storage", o:5, p:"google", r:"us-west2", s:"google:storage", t:"storage", w:6, y:"l"
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Los Angeles", s: "CA", c: "US", l: 34.0522, o: -118.2437
        }
        , f:":07D9zxMAC", g:"ch-us-west2.storage.googleapis.com\/:b", h:"ch-us-west2.storage.googleapis.com\/:b", i:6, l:":scloud.google.com\/storage\/", m:2040, n:"Google Cloud Storage", o:5, p:"google", r:"us-west2", s:"google:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    ], d=function() {
        if(!(x in t))return 0;
        t[x].ul=[];
        t[x].ub=[];
        t[x].ut=[];
        if(t[x].rt.length)t[x].mb=rn(av(t[x].rt), 4);
        var b= {}
        , f=[], tg=ts(), td=[], tp= {}
        ;
        for(var by in s.f.d) {
            var kb=Math.round(by/1024);
            if(kb>=t[x].z&&kb<=t[x].x) {
                f.push(s.f.d[by]);
                b[s.f.d[by]]=by;
                if(tg) {
                    var df=Math.abs(by-tg);
                    td.push(df);
                    tp[df]=by
                }
            }
        }
        ;
        if(tg) {
            f=[];
            td.sort(function(a, b) {
                return a-b
            }
            );
            for(var i=0;
            i<td.length;
            i++)f.push(s.f.d[tp[td[i]]])
        }
        ;
        for(var i=0;
        i<t[x].c;
        i++)if(f.length) {
            var fn=f[tg?0: Math.floor(Math.random()*f.length)];
            t[x].ub.push(b[fn]);
            t[x].ul.push(t[x].ur+fn)
        }
        else break;
        if(t[x].ul.length) {
            sh(t[x].ul);
            if("im"in t[x])delete t[x].im;
            t[x].im=[];
            for(var i=0;
            i<t[x].ul.length;
            i++) {
                var o=to(t[x].ub[i]), im=document.createElement('img');
                im.onload=function() {
                    clearTimeout(this._to);
                    delete this._to;
                    speedtest.tc(this._x, this._i, this._ti, !this.complete&&!this.naturalWidth&&!this.width)
                }
                ;
                im.onerror=function() {
                    clearTimeout(this._to);
                    delete this._to;
                    speedtest.tc(this._x, this._i, this._ti, 1)
                }
                ;
                im._x=x;
                im._i=i;
                im._ti=ti();
                im._to=setTimeout("speedtest.tc("+x+","+i+","+im._ti+",1,1)", o);
                im.src=t[x].ul[i]+"?"+("k"in t[x]&&t[x].k?t[x].k+"=":"")+r();
                t[x].im.push(im)
            }
            ;
            return 1
        }
        ;
        return 0
    }
    , l=function() {
        if(!(x in t))return 0;
        t[x].ul=[];
        for(var i=0;
        i<t[x].c;
        i++)t[x].ul.push(t[x].ur+s.f.p);
        if(t[x].ul.length) {
            sh(t[x].ul);
            z.d(t[x].ul, 1);
            return 1
        }
        ;
        return 0
    }
    , dns=function() {
        if(!(x in t))return 0;
        t[x].ul=[];
        if(!("dn"in t[x]))t[x].dn=[];
        t[x].rs=[];
        if(!("x"in t[x]))t[x].x=r();
        t[x].ul.push(t[x].ur.replace("*", t[x].x)+s.f.n);
        t[x].ul.push(t[x].ur.replace("*", r())+s.f.n);
        if(t[x].ul.length) {
            sh(t[x].ul);
            z.d(t[x].ul, 1);
            return 1
        }
        ;
        return 0
    }
    , sd=function(a) {
        var g=av(a), sd=a.map(function(v) {
            var d=v-g;
            return d*d
        }
        );
        g=av(sd);
        return Math.sqrt(g)
    }
    , sh=function(o) {
        for(var j, x, i=o.length;
        i;
        j=Math.floor(Math.random()*i), x=o[--i], o[i]=o[j], o[j]=x);
    }
    ;
    z.tc=function(x1, i, ti1, f, to) {
        if(x==-2)return;
        if(x1==x) {
            if(f) {
                t[x].fi++;
                t[x].fl++
            }
            else {
                var sc=(ti()-ti1)/1e3, mb=rn((t[x].ub[i]/sc)/125e3);
                t[x].by+=(t[x].ub[i]*1);
                t[x].ut.push(mb)
            }
            ;
            if((t[x].fi+t[x].ut.length)==t[x].ul.length) {
                var rt="undetermined";
                if(t[x].ut.length) {
                    var rt=rn(as(t[x].ut));
                    t[x].rt.push(rt);
                    if(t[x].it>t[x].w)t[x].rs.push(rt)
                }
                ;
                z.i()
            }
        }
    }
    ;
    var ti=function() {
        return(new Date()).getTime()
    }
    , to=function(s) {
        var o=0;
        if(s>0&&x in t&&"mb"in t[x]) {
            var r="o"in t[x]&&t[x].o>0?t[x].o: 5;
            if(!t[x].rt.length&&!t[x].fl)r*=1.5;
            var tk=(125*t[x].mb)/t[x].c, sc=rn((s/1024)/tk);
            o=Math.round((r*sc)*1e3);
            if(o<1e4)o=1e4
        }
        ;
        return o
    }
    , ts=function() {
        var tk=0;
        if(x in t&&"d"in t[x]&&t[x].d&&(t[x].y=="u"||t[x].y=="d")) {
            tk=rn(((125*t[x].mb)*t[x].d)/t[x].c);
            if("y"in t[x]&&t[x].y&&tk<t[x].y) {
                tk=t[x].y
            }
            else if("x"in t[x]&&t[x].x&&tk>t[x].x)tk=t[x].x
        }
        ;
        return tk*1024
    }
    , x=-1;
    return z
}

)();
if(typeof ch_st_loaded==="function")ch_st_loaded(speedtest)
