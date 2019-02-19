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
        console.log(method+"("+args.length+"):"+JSON.stringify(args));
        if (method=="started"){
            $("#tests").append(JSON.stringify(args));
        }else if (method=="progress"){
            progressHTML.append("<p>"+JSON.stringify(args)+"</p>");
        }else if (method=="results"){
            resultsHTML.append("<p>"+JSON.stringify(args)+",</p>");
        }else{
            $("#status").text("Done!");
        }
        
        var c=null;
        if(z.callback&&(typeof z.callback=="object"||typeof z.callback=="function")&&method in z.callback&&typeof z.callback[method]=="function")c=z.callback[method].apply(z.callback, typeof args=="object"?args: []);
        return c
    };

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
                if(t[x].y=="dns") {
                    n=dns()?0: 1
                }
                else if(t[x].y=="d") {
                    n=d()?0: 1
                }
                else if(t[x].y=="l")n=l()?0:1
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
            n:":b\/:i", d: {
                "974": ":t1k:j", "2076": ":t2k:j", "3085": ":t3k:j", "4088": ":t4k:j", "5243": ":t5k:j", "5726": ":t6k:j", "7172": ":t7k:j", "8513": ":t8k:j", "9591": ":t9k:j", "10043": ":t10k:j", "11951": ":t12k:j", "14165": ":t14k:j", "17187": ":t17k:j", "20293": ":t20k:j", "24345": ":t24k:j", "28891": ":t29k:j", "33897": ":t34k:j", "44262": ":t44k:j", "51445": ":t50k:j", "61856": ":t62k:j", "73492": ":t73k:j", "81520": ":t81k:j", "94394": ":t94k:j", "113255": ":t113k:j", "126731": ":t127k:j", "148544": ":t148k:j", "173072": ":t173k:j", "199715": ":t200k:j", "250386": ":t250k:j", "304134": ":t304k:j", "351810": ":t352k:j", "400298": ":t400k:j", "449581": ":t450k:j", "499536": ":t499k:j", "550773": ":t550k:j", "599832": ":t600k:j", "650082": ":t650k:j", "700211": ":t700k:j", "749303": ":t749k:j", "801628": ":t801k:j", "851388": ":t851k:j", "900933": ":t900k:j", "950380": ":t950k:j", "1047802": ":t1m:j", "2098644": ":t2m:j", "3142868": ":t3m:j", "4193637": ":t4m:j", "5242917": ":t5m:j", "6293339": ":t6m:j", "7336436": ":t7m:j", "8389597": ":t8m:j", "9438814": ":t9m:j", "10486107": ":t10m:j"
            }
            , p:":i"
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
        a: 500, c: 1, f: ":0CS3IgMAL", h: "*.:t.balancecloud.com", i: 12, l: ":sazure.microsoft.com\/en-us\/services\/dns\/", m: 9, n: "Microsoft Azure DNS", o: 5, p: "azure", s: "azure:dns", t: "dns", w: 6, y: "dns"
    }
    , {
        a:500, c:4, e: {
            y: "Canberra", c: "AU", l: -35.27603, o: 149.13435
        }
        , f:":07DA2SMAW", g:"australia-central-azure.:y:a", h:"australia-central.azure.:y:a", i:12, l:":hazure.microsoft.com", m:17, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"australia-central", s:"azure:compute", t:"compute", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Canberra", c: "AU", l: -35.27603, o: 149.13435
        }
        , f:":07DA2SMAW", g:"australia-central-azure.:y:a", h:"australia-central.azure.:y:a", i:6, l:":hazure.microsoft.com", m:53, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"australia-central", s:"azure:compute", t:"compute", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:1, e: {
            y: "Canberra", c: "AU", l: -35.27603, o: 149.13435
        }
        , f:":07DA2SMAW", g:"australia-central-azure.:y:a", h:"australia-central.azure.:y:a", i:12, l:":hazure.microsoft.com", m:57, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"australia-central", s:"azure:compute", t:"compute", w:6, y:"l"
    }
    , {
        a: 500, c: 4, f: ":07DA0IMAW", g: "ch.azureedge:a", h: "ch.azureedge:a", i: 12, l: ":sazure.microsoft.com\/en-us\/pricing\/details\/cdn\/", m: 65, n: "Azure CDN from Verizon", o: 5, p: "azure", s: "azure:cdn", t: "cdn", w: 6, x: 128, y: "d", z: 1
    }
    , {
        a: 500, c: 1, f: ":07DA0IMAW", g: "ch.azureedge:a", h: "ch.azureedge:a", i: 12, l: ":sazure.microsoft.com\/en-us\/pricing\/details\/cdn\/", m: 69, n: "Azure CDN from Verizon", o: 5, p: "azure", s: "azure:cdn", t: "cdn", w: 6, y: "l"
    }
    , {
        a: 500, c: 2, d: 4, f: ":07DA0IMAW", g: "ch.azureedge:a", h: "ch.azureedge:a", i: 6, l: ":sazure.microsoft.com\/en-us\/pricing\/details\/cdn\/", m: 106, n: "Azure CDN from Verizon", o: 5, p: "azure", s: "azure:cdn", t: "cdn", w: 3, x: 10240, y: "d", z: 256
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Ashburn", s: "VA", c: "US", l: 39.0708333, o: -77.48
        }
        , f:":07DA2SMAW", g:"us-east-azure.:y:a", h:"us-east.azure.:y:a", i:6, l:":hazure.microsoft.com", m:142, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"us-east", s:"azure:compute", t:"compute", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:4, e: {
            y: "Ashburn", s: "VA", c: "US", l: 39.0708333, o: -77.48
        }
        , f:":07DA2SMAW", g:"us-east-azure.:y:a", h:"us-east.azure.:y:a", i:12, l:":hazure.microsoft.com", m:150, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"us-east", s:"azure:compute", t:"compute", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:1, e: {
            y: "Ashburn", s: "VA", c: "US", l: 39.0708333, o: -77.48
        }
        , f:":07DA2SMAW", g:"us-east-azure.:y:a", h:"us-east.azure.:y:a", i:12, l:":hazure.microsoft.com", m:154, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"us-east", s:"azure:compute", t:"compute", w:6, y:"l"
    }
    , {
        a:500, c:1, e: {
            y: "Melbourne", c: "AU", l: -37.813938, o: 144.963425
        }
        , f:":07DA2SMAW", g:"australia-southeast-azure.:y:a", h:"australia-southeast.azure.:y:a", i:12, l:":hazure.microsoft.com", m:158, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"australia-southeast", s:"azure:compute", t:"compute", w:6, y:"l"
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Melbourne", c: "AU", l: -37.813938, o: 144.963425
        }
        , f:":07DA2SMAW", g:"australia-southeast-azure.:y:a", h:"australia-southeast.azure.:y:a", i:6, l:":hazure.microsoft.com", m:195, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"australia-southeast", s:"azure:compute", t:"compute", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:4, e: {
            y: "Melbourne", c: "AU", l: -37.813938, o: 144.963425
        }
        , f:":07DA2SMAW", g:"australia-southeast-azure.:y:a", h:"australia-southeast.azure.:y:a", i:12, l:":hazure.microsoft.com", m:202, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"australia-southeast", s:"azure:compute", t:"compute", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:1, e: {
            y: "Melbourne", c: "AU", l: -37.813938, o: 144.963425
        }
        , f:":07DA2wMAG", g:"avaustraliasoutheast.blob.core.windows:a", h:"avaustraliasoutheast.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:207, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"australia-southeast", s:"azure:storage", t:"storage", w:6, y:"l"
    }
    , {
        a:500, c:4, e: {
            y: "Canberra", c: "AU", l: -35.27603, o: 149.13435
        }
        , f:":07DA2SMAW", g:"australia-central2-azure.:y:a", h:"australia-central2.azure.:y:a", i:12, l:":hazure.microsoft.com", m:214, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"australia-central2", s:"azure:compute", t:"compute", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:4, e: {
            y: "Melbourne", c: "AU", l: -37.813938, o: 144.963425
        }
        , f:":07DA2wMAG", g:"avaustraliasoutheast.blob.core.windows:a", h:"avaustraliasoutheast.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:222, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"australia-southeast", s:"azure:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:1, e: {
            y: "Canberra", c: "AU", l: -35.27603, o: 149.13435
        }
        , f:":07DA2SMAW", g:"australia-central2-azure.:y:a", h:"australia-central2.azure.:y:a", i:12, l:":hazure.microsoft.com", m:226, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"australia-central2", s:"azure:compute", t:"compute", w:6, y:"l"
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Melbourne", c: "AU", l: -37.813938, o: 144.963425
        }
        , f:":07DA2wMAG", g:"avaustraliasoutheast.blob.core.windows:a", h:"avaustraliasoutheast.blob.core.windows:a", i:6, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:263, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"australia-southeast", s:"azure:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Canberra", c: "AU", l: -35.27603, o: 149.13435
        }
        , f:":07DA2SMAW", g:"australia-central2-azure.:y:a", h:"australia-central2.azure.:y:a", i:6, l:":hazure.microsoft.com", m:299, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"australia-central2", s:"azure:compute", t:"compute", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Mumbai", c: "IN", l: 18.975, o: 72.825833
        }
        , f:":07DA2SMAW", g:"india-west-azure.:y:a", h:"india-west.azure.:y:a", i:6, l:":hazure.microsoft.com", m:336, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"india-west", s:"azure:compute", t:"compute", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:4, e: {
            y: "Mumbai", c: "IN", l: 18.975, o: 72.825833
        }
        , f:":07DA2SMAW", g:"india-west-azure.:y:a", h:"india-west.azure.:y:a", i:12, l:":hazure.microsoft.com", m:343, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"india-west", s:"azure:compute", t:"compute", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:1, e: {
            y: "Mumbai", c: "IN", l: 18.975, o: 72.825833
        }
        , f:":07DA2SMAW", g:"india-west-azure.:y:a", h:"india-west.azure.:y:a", i:12, l:":hazure.microsoft.com", m:347, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"india-west", s:"azure:compute", t:"compute", w:6, y:"l"
    }
    , {
        a:500, c:1, e: {
            y: "Pune", c: "IN", l: 18.533333, o: 73.866667
        }
        , f:":07DA2SMAW", g:"india-central-azure.:y:a", h:"india-central.azure.:y:a", i:12, l:":hazure.microsoft.com", m:352, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"india-central", s:"azure:compute", t:"compute", w:6, y:"l"
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Pune", c: "IN", l: 18.533333, o: 73.866667
        }
        , f:":07DA2SMAW", g:"india-central-azure.:y:a", h:"india-central.azure.:y:a", i:6, l:":hazure.microsoft.com", m:388, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"india-central", s:"azure:compute", t:"compute", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:4, e: {
            y: "Dublin", c: "IE", l: 53.3330556, o: -6.2488889
        }
        , f:":07DA2SMAW", g:"eu-north-azure.:y:a", h:"eu-north.azure.:y:a", i:12, l:":hazure.microsoft.com", m:396, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"eu-north", s:"azure:compute", t:"compute", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Dublin", c: "IE", l: 53.3330556, o: -6.2488889
        }
        , f:":07DA2SMAW", g:"eu-north-azure.:y:a", h:"eu-north.azure.:y:a", i:6, l:":hazure.microsoft.com", m:432, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"eu-north", s:"azure:compute", t:"compute", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:1, e: {
            y: "Dublin", c: "IE", l: 53.3330556, o: -6.2488889
        }
        , f:":07DA2SMAW", g:"eu-north-azure.:y:a", h:"eu-north.azure.:y:a", i:12, l:":hazure.microsoft.com", m:436, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"eu-north", s:"azure:compute", t:"compute", w:6, y:"l"
    }
    , {
        a:500, c:4, e: {
            y: "Pune", c: "IN", l: 18.533333, o: 73.866667
        }
        , f:":07DA2SMAW", g:"india-central-azure.:y:a", h:"india-central.azure.:y:a", i:12, l:":hazure.microsoft.com", m:444, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"india-central", s:"azure:compute", t:"compute", w:6, x:128, y:"d", z:1
    }
    , {
        a: 500, c: 4, f: ":0HidDnMAJ", g: "aka.azureedge:a", h: "aka.azureedge:a", i: 12, l: ":sazure.microsoft.com\/en-us\/pricing\/details\/cdn\/", m: 452, n: "Azure CDN from Akamai", o: 5, p: "azure", s: "azure:akamai", t: "cdn", w: 6, x: 128, y: "d", z: 1
    }
    , {
        a: 500, c: 1, f: ":0HidDnMAJ", g: "aka.azureedge:a", h: "aka.azureedge:a", i: 12, l: ":sazure.microsoft.com\/en-us\/pricing\/details\/cdn\/", m: 456, n: "Azure CDN from Akamai", o: 5, p: "azure", s: "azure:akamai", t: "cdn", w: 6, y: "l"
    }
    , {
        a: 500, c: 2, d: 4, f: ":0HidDnMAJ", g: "aka.azureedge:a", h: "aka.azureedge:a", i: 6, l: ":sazure.microsoft.com\/en-us\/pricing\/details\/cdn\/", m: 493, n: "Azure CDN from Akamai", o: 5, p: "azure", s: "azure:akamai", t: "cdn", w: 3, x: 10240, y: "d", z: 256
    }
    , {
        a:500, c:1, e: {
            y: "Beijing", c: "CN", l: 30.822638, o: 114.047944
        }
        , f:":07DA2SMAW", h:"avchinanorth.azure.:y:a", i:12, l:":hazure.microsoft.com", m:497, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"china-north", s:"azure:compute", t:"compute", w:6, y:"l"
    }
    , {
        a:500, c:4, e: {
            y: "Beijing", c: "CN", l: 30.822638, o: 114.047944
        }
        , f:":07DA2SMAW", h:"avchinanorth.azure.:y:a", i:12, l:":hazure.microsoft.com", m:504, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"china-north", s:"azure:compute", t:"compute", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Beijing", c: "CN", l: 30.822638, o: 114.047944
        }
        , f:":07DA2SMAW", h:"avchinanorth.azure.:y:a", i:6, l:":hazure.microsoft.com", m:541, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"china-north", s:"azure:compute", t:"compute", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:1, e: {
            y: "Saitama", c: "JP", l: 35.895534, o: 139.67747
        }
        , f:":07DA2SMAW", g:"japan-east-azure.:y:a", h:"japan-east.azure.:y:a", i:12, l:":hazure.microsoft.com", m:545, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"japan-east", s:"azure:compute", t:"compute", w:6, y:"l"
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Toronto", c: "CA", l: 43.666667, o: -79.416667
        }
        , f:":07DA2SMAW", g:"canada-central-azure.:y:a", h:"canada-central.azure.:y:a", i:6, l:":hazure.microsoft.com", m:582, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"canada-central", s:"azure:compute", t:"compute", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:4, e: {
            y: "Toronto", c: "CA", l: 43.666667, o: -79.416667
        }
        , f:":07DA2SMAW", g:"canada-central-azure.:y:a", h:"canada-central.azure.:y:a", i:12, l:":hazure.microsoft.com", m:589, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"canada-central", s:"azure:compute", t:"compute", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:1, e: {
            y: "Toronto", c: "CA", l: 43.666667, o: -79.416667
        }
        , f:":07DA2SMAW", g:"canada-central-azure.:y:a", h:"canada-central.azure.:y:a", i:12, l:":hazure.microsoft.com", m:593, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"canada-central", s:"azure:compute", t:"compute", w:6, y:"l"
    }
    , {
        a:500, c:4, e: {
            y: "Saitama", c: "JP", l: 35.895534, o: 139.67747
        }
        , f:":07DA2SMAW", g:"japan-east-azure.:y:a", h:"japan-east.azure.:y:a", i:12, l:":hazure.microsoft.com", m:601, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"japan-east", s:"azure:compute", t:"compute", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Saitama", c: "JP", l: 35.895534, o: 139.67747
        }
        , f:":07DA2SMAW", g:"japan-east-azure.:y:a", h:"japan-east.azure.:y:a", i:6, l:":hazure.microsoft.com", m:638, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"japan-east", s:"azure:compute", t:"compute", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Amsterdam", c: "NL", l: 52.35, o: 4.916667
        }
        , f:":07DA2SMAW", g:"eu-west-azure.:y:a", h:"eu-west.azure.:y:a", i:6, l:":hazure.microsoft.com", m:674, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"eu-west", s:"azure:compute", t:"compute", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:1, e: {
            y: "Amsterdam", c: "NL", l: 52.35, o: 4.916667
        }
        , f:":07DA2SMAW", g:"eu-west-azure.:y:a", h:"eu-west.azure.:y:a", i:12, l:":hazure.microsoft.com", m:678, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"eu-west", s:"azure:compute", t:"compute", w:6, y:"l"
    }
    , {
        a:500, c:4, e: {
            y: "Amsterdam", c: "NL", l: 52.35, o: 4.916667
        }
        , f:":07DA2SMAW", g:"eu-west-azure.:y:a", h:"eu-west.azure.:y:a", i:12, l:":hazure.microsoft.com", m:686, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"eu-west", s:"azure:compute", t:"compute", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:1, e: {
            y: "Sydney", c: "AU", l: -33.861481, o: 151.205475
        }
        , f:":07DA2SMAW", g:"australia-east-azure.:y:a", h:"australia-east.azure.:y:a", i:12, l:":hazure.microsoft.com", m:690, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"australia-east", s:"azure:compute", t:"compute", w:6, y:"l"
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Sydney", c: "AU", l: -33.861481, o: 151.205475
        }
        , f:":07DA2SMAW", g:"australia-east-azure.:y:a", h:"australia-east.azure.:y:a", i:6, l:":hazure.microsoft.com", m:727, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"australia-east", s:"azure:compute", t:"compute", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Quincy", s: "WA", c: "US", l: 47.2344444, o: -119.8513889
        }
        , f:":07DA2SMAW", g:"us-west2-1-azure.:y:a", h:"us-west2-1.azure.:y:a", i:6, l:":hazure.microsoft.com", m:763, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"us-west2", s:"azure:compute", t:"compute", u:"us-west2-1", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:4, e: {
            y: "Quincy", s: "WA", c: "US", l: 47.2344444, o: -119.8513889
        }
        , f:":07DA2SMAW", g:"us-west2-1-azure.:y:a", h:"us-west2-1.azure.:y:a", i:12, l:":hazure.microsoft.com", m:771, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"us-west2", s:"azure:compute", t:"compute", u:"us-west2-1", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:4, e: {
            y: "Sydney", c: "AU", l: -33.861481, o: 151.205475
        }
        , f:":07DA2SMAW", g:"australia-east-azure.:y:a", h:"australia-east.azure.:y:a", i:12, l:":hazure.microsoft.com", m:779, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"australia-east", s:"azure:compute", t:"compute", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:1, e: {
            y: "Quincy", s: "WA", c: "US", l: 47.2344444, o: -119.8513889
        }
        , f:":07DA2SMAW", g:"us-west2-1-azure.:y:a", h:"us-west2-1.azure.:y:a", i:12, l:":hazure.microsoft.com", m:783, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"us-west2", s:"azure:compute", t:"compute", u:"us-west2-1", w:6, y:"l"
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Chicago", s: "IL", c: "US", l: 41.85, o: -87.65
        }
        , f:":07DA2SMAW", g:"us-northcentral-azure.:y:a", h:"us-northcentral.azure.:y:a", i:6, l:":hazure.microsoft.com", m:819, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"us-northcentral", s:"azure:compute", t:"compute", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:4, e: {
            y: "Singapore", c: "SG", l: 1.2930556, o: 103.8558333
        }
        , f:":07DA2SMAW", g:"asia-southeast-azure.:y:a", h:"asia-southeast.azure.:y:a", i:12, l:":hazure.microsoft.com", m:827, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"asia-southeast", s:"azure:compute", t:"compute", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Singapore", c: "SG", l: 1.2930556, o: 103.8558333
        }
        , f:":07DA2SMAW", g:"asia-southeast-azure.:y:a", h:"asia-southeast.azure.:y:a", i:6, l:":hazure.microsoft.com", m:863, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"asia-southeast", s:"azure:compute", t:"compute", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:1, e: {
            y: "Chicago", s: "IL", c: "US", l: 41.85, o: -87.65
        }
        , f:":07DA2SMAW", g:"us-northcentral-azure.:y:a", h:"us-northcentral.azure.:y:a", i:12, l:":hazure.microsoft.com", m:868, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"us-northcentral", s:"azure:compute", t:"compute", w:6, y:"l"
    }
    , {
        a:500, c:4, e: {
            y: "Chicago", s: "IL", c: "US", l: 41.85, o: -87.65
        }
        , f:":07DA2SMAW", g:"us-northcentral-azure.:y:a", h:"us-northcentral.azure.:y:a", i:12, l:":hazure.microsoft.com", m:875, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"us-northcentral", s:"azure:compute", t:"compute", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:1, e: {
            y: "Singapore", c: "SG", l: 1.2930556, o: 103.8558333
        }
        , f:":07DA2SMAW", g:"asia-southeast-azure.:y:a", h:"asia-southeast.azure.:y:a", i:12, l:":hazure.microsoft.com", m:879, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"asia-southeast", s:"azure:compute", t:"compute", w:6, y:"l"
    }
    , {
        a:500, c:1, e: {
            y: "Canberra", c: "AU", l: -35.27603, o: 149.13435
        }
        , f:":07DA2wMAG", g:"avaustraliacentral2.blob.core.windows:a", h:"avaustraliacentral2.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:884, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"australia-central2", s:"azure:storage", t:"storage", w:6, y:"l"
    }
    , {
        a:500, c:4, e: {
            y: "Canberra", c: "AU", l: -35.27603, o: 149.13435
        }
        , f:":07DA2wMAG", g:"avaustraliacentral2.blob.core.windows:a", h:"avaustraliacentral2.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:891, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"australia-central2", s:"azure:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Canberra", c: "AU", l: -35.27603, o: 149.13435
        }
        , f:":07DA2wMAG", g:"avaustraliacentral2.blob.core.windows:a", h:"avaustraliacentral2.blob.core.windows:a", i:6, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:928, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"australia-central2", s:"azure:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:1, e: {
            y: "Sao Paulo", c: "BR", l: -23.53, o: -46.63
        }
        , f:":07DA2SMAW", g:"brazil-south-azure.:y:a", h:"brazil-south.azure.:y:a", i:12, l:":hazure.microsoft.com", m:932, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"brazil-south", s:"azure:compute", t:"compute", w:6, y:"l"
    }
    , {
        a:500, c:4, e: {
            y: "Quebec City", c: "CA", l: 46.8167, o: -71.2167
        }
        , f:":07DA2SMAW", g:"canada-east-azure.:y:a", h:"canada-east.azure.:y:a", i:12, l:":hazure.microsoft.com", m:940, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"canada-east", s:"azure:compute", t:"compute", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Quebec City", c: "CA", l: 46.8167, o: -71.2167
        }
        , f:":07DA2SMAW", g:"canada-east-azure.:y:a", h:"canada-east.azure.:y:a", i:6, l:":hazure.microsoft.com", m:976, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"canada-east", s:"azure:compute", t:"compute", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Sao Paulo", c: "BR", l: -23.53, o: -46.63
        }
        , f:":07DA2SMAW", g:"brazil-south-azure.:y:a", h:"brazil-south.azure.:y:a", i:6, l:":hazure.microsoft.com", m:1013, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"brazil-south", s:"azure:compute", t:"compute", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:1, e: {
            y: "Quebec City", c: "CA", l: 46.8167, o: -71.2167
        }
        , f:":07DA2SMAW", g:"canada-east-azure.:y:a", h:"canada-east.azure.:y:a", i:12, l:":hazure.microsoft.com", m:1017, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"canada-east", s:"azure:compute", t:"compute", w:6, y:"l"
    }
    , {
        a:500, c:4, e: {
            y: "Sao Paulo", c: "BR", l: -23.53, o: -46.63
        }
        , f:":07DA2SMAW", g:"brazil-south-azure.:y:a", h:"brazil-south.azure.:y:a", i:12, l:":hazure.microsoft.com", m:1024, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"brazil-south", s:"azure:compute", t:"compute", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:4, e: {
            y: "Beijing", c: "CN", l: 30.822638, o: 114.047944
        }
        , f:":07DA2SMAW", h:"avchinanorth2.azure.:y:a", i:12, l:":hazure.microsoft.com", m:1032, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"china-north2", s:"azure:compute", t:"compute", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:1, e: {
            y: "Busan", c: "KR", l: 37.1525, o: 127.095
        }
        , f:":07DA2SMAW", g:"korea-south-azure.:y:a", h:"korea-south.azure.:y:a", i:12, l:":hazure.microsoft.com", m:1036, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"korea-south", s:"azure:compute", t:"compute", w:6, y:"l"
    }
    , {
        a:500, c:1, e: {
            y: "Beijing", c: "CN", l: 30.822638, o: 114.047944
        }
        , f:":07DA2SMAW", h:"avchinanorth2.azure.:y:a", i:12, l:":hazure.microsoft.com", m:1040, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"china-north2", s:"azure:compute", t:"compute", w:6, y:"l"
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Beijing", c: "CN", l: 30.822638, o: 114.047944
        }
        , f:":07DA2SMAW", h:"avchinanorth2.azure.:y:a", i:6, l:":hazure.microsoft.com", m:1077, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"china-north2", s:"azure:compute", t:"compute", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Busan", c: "KR", l: 37.1525, o: 127.095
        }
        , f:":07DA2SMAW", g:"korea-south-azure.:y:a", h:"korea-south.azure.:y:a", i:6, l:":hazure.microsoft.com", m:1113, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"korea-south", s:"azure:compute", t:"compute", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:4, e: {
            y: "Busan", c: "KR", l: 37.1525, o: 127.095
        }
        , f:":07DA2SMAW", g:"korea-south-azure.:y:a", h:"korea-south.azure.:y:a", i:12, l:":hazure.microsoft.com", m:1121, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"korea-south", s:"azure:compute", t:"compute", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Cardiff", c: "GB", l: 51.5, o: -3.2
        }
        , f:":07DA2SMAW", g:"uk-west-azure.:y:a", h:"uk-west.azure.:y:a", i:6, l:":hazure.microsoft.com", m:1158, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"uk-west", s:"azure:compute", t:"compute", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:1, e: {
            y: "Cardiff", c: "GB", l: 51.5, o: -3.2
        }
        , f:":07DA2SMAW", g:"uk-west-azure.:y:a", h:"uk-west.azure.:y:a", i:12, l:":hazure.microsoft.com", m:1162, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"uk-west", s:"azure:compute", t:"compute", w:6, y:"l"
    }
    , {
        a:500, c:4, e: {
            y: "Cardiff", c: "GB", l: 51.5, o: -3.2
        }
        , f:":07DA2SMAW", g:"uk-west-azure.:y:a", h:"uk-west.azure.:y:a", i:12, l:":hazure.microsoft.com", m:1170, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"uk-west", s:"azure:compute", t:"compute", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:4, e: {
            y: "Cheyenne", s: "WY", c: "US", l: 41.14, o: -104.8197222
        }
        , f:":07DA2SMAW", g:"us-westcentral-azure.:y:a", h:"us-westcentral.azure.:y:a", i:12, l:":hazure.microsoft.com", m:1177, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"us-westcentral", s:"azure:compute", t:"compute", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:1, e: {
            y: "Cheyenne", s: "WY", c: "US", l: 41.14, o: -104.8197222
        }
        , f:":07DA2SMAW", g:"us-westcentral-azure.:y:a", h:"us-westcentral.azure.:y:a", i:12, l:":hazure.microsoft.com", m:1181, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"us-westcentral", s:"azure:compute", t:"compute", w:6, y:"l"
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Cheyenne", s: "WY", c: "US", l: 41.14, o: -104.8197222
        }
        , f:":07DA2SMAW", g:"us-westcentral-azure.:y:a", h:"us-westcentral.azure.:y:a", i:6, l:":hazure.microsoft.com", m:1218, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"us-westcentral", s:"azure:compute", t:"compute", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:4, e: {
            y: "San Antonio", s: "TX", c: "US", l: 29.4238889, o: -98.4933333
        }
        , f:":07DA2SMAW", g:"us-southcentral-azure.:y:a", h:"us-southcentral.azure.:y:a", i:12, l:":hazure.microsoft.com", m:1226, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"us-southcentral", s:"azure:compute", t:"compute", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "San Antonio", s: "TX", c: "US", l: 29.4238889, o: -98.4933333
        }
        , f:":07DA2SMAW", g:"us-southcentral-azure.:y:a", h:"us-southcentral.azure.:y:a", i:6, l:":hazure.microsoft.com", m:1262, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"us-southcentral", s:"azure:compute", t:"compute", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:1, e: {
            y: "San Antonio", s: "TX", c: "US", l: 29.4238889, o: -98.4933333
        }
        , f:":07DA2SMAW", g:"us-southcentral-azure.:y:a", h:"us-southcentral.azure.:y:a", i:12, l:":hazure.microsoft.com", m:1266, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"us-southcentral", s:"azure:compute", t:"compute", w:6, y:"l"
    }
    , {
        a:500, c:1, e: {
            y: "San Francisco", s: "CA", c: "US", l: 37.775, o: -122.4183333
        }
        , f:":07DA2SMAW", g:"us-west-azure.:y:a", h:"us-west.azure.:y:a", i:12, l:":hazure.microsoft.com", m:1270, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"us-west", s:"azure:compute", t:"compute", w:6, y:"l"
    }
    , {
        a:500, c:4, e: {
            y: "San Francisco", s: "CA", c: "US", l: 37.775, o: -122.4183333
        }
        , f:":07DA2SMAW", g:"us-west-azure.:y:a", h:"us-west.azure.:y:a", i:12, l:":hazure.microsoft.com", m:1278, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"us-west", s:"azure:compute", t:"compute", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "London", c: "GB", l: 51.514125, o: -0.093689
        }
        , f:":07DA2SMAW", g:"uk-south-azure.:y:a", h:"uk-south.azure.:y:a", i:6, l:":hazure.microsoft.com", m:1315, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"uk-south", s:"azure:compute", t:"compute", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:1, e: {
            y: "London", c: "GB", l: 51.514125, o: -0.093689
        }
        , f:":07DA2SMAW", g:"uk-south-azure.:y:a", h:"uk-south.azure.:y:a", i:12, l:":hazure.microsoft.com", m:1319, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"uk-south", s:"azure:compute", t:"compute", w:6, y:"l"
    }
    , {
        a:500, c:2, d:4, e: {
            y: "San Francisco", s: "CA", c: "US", l: 37.775, o: -122.4183333
        }
        , f:":07DA2SMAW", g:"us-west-azure.:y:a", h:"us-west.azure.:y:a", i:6, l:":hazure.microsoft.com", m:1355, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"us-west", s:"azure:compute", t:"compute", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:4, e: {
            y: "London", c: "GB", l: 51.514125, o: -0.093689
        }
        , f:":07DA2SMAW", g:"uk-south-azure.:y:a", h:"uk-south.azure.:y:a", i:12, l:":hazure.microsoft.com", m:1363, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"uk-south", s:"azure:compute", t:"compute", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:4, e: {
            y: "Quincy", s: "WA", c: "US", l: 47.2344444, o: -119.8513889
        }
        , f:":07DA2SMAW", g:"us-west2-3-azure.:y:a", h:"us-west2-3.azure.:y:a", i:12, l:":hazure.microsoft.com", m:1371, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"us-west2", s:"azure:compute", t:"compute", u:"us-west2-3", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:1, e: {
            y: "Quincy", s: "WA", c: "US", l: 47.2344444, o: -119.8513889
        }
        , f:":07DA2SMAW", g:"us-west2-3-azure.:y:a", h:"us-west2-3.azure.:y:a", i:12, l:":hazure.microsoft.com", m:1375, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"us-west2", s:"azure:compute", t:"compute", u:"us-west2-3", w:6, y:"l"
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Quincy", s: "WA", c: "US", l: 47.2344444, o: -119.8513889
        }
        , f:":07DA2SMAW", g:"us-west2-3-azure.:y:a", h:"us-west2-3.azure.:y:a", i:6, l:":hazure.microsoft.com", m:1411, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"us-west2", s:"azure:compute", t:"compute", u:"us-west2-3", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Marseille", c: "FR", l: 43.285413, o: 5.37606
        }
        , f:":07DA2SMAW", g:"france-south-azure.:y:a", h:"france-south.azure.:y:a", i:6, l:":hazure.microsoft.com", m:1448, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"france-south", s:"azure:compute", t:"compute", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:4, e: {
            y: "Marseille", c: "FR", l: 43.285413, o: 5.37606
        }
        , f:":07DA2SMAW", g:"france-south-azure.:y:a", h:"france-south.azure.:y:a", i:12, l:":hazure.microsoft.com", m:1456, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"france-south", s:"azure:compute", t:"compute", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:1, e: {
            y: "Marseille", c: "FR", l: 43.285413, o: 5.37606
        }
        , f:":07DA2SMAW", g:"france-south-azure.:y:a", h:"france-south.azure.:y:a", i:12, l:":hazure.microsoft.com", m:1460, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"france-south", s:"azure:compute", t:"compute", w:6, y:"l"
    }
    , {
        a:500, c:4, e: {
            y: "Osaka", c: "JP", l: 34.516855, o: 135.562978
        }
        , f:":07DA2SMAW", g:"japan-west-azure.:y:a", h:"japan-west.azure.:y:a", i:12, l:":hazure.microsoft.com", m:1467, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"japan-west", s:"azure:compute", t:"compute", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Osaka", c: "JP", l: 34.516855, o: 135.562978
        }
        , f:":07DA2SMAW", g:"japan-west-azure.:y:a", h:"japan-west.azure.:y:a", i:6, l:":hazure.microsoft.com", m:1504, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"japan-west", s:"azure:compute", t:"compute", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:1, e: {
            y: "Osaka", c: "JP", l: 34.516855, o: 135.562978
        }
        , f:":07DA2SMAW", g:"japan-west-azure.:y:a", h:"japan-west.azure.:y:a", i:12, l:":hazure.microsoft.com", m:1508, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"japan-west", s:"azure:compute", t:"compute", w:6, y:"l"
    }
    , {
        a:500, c:4, e: {
            y: "Canberra", c: "AU", l: -35.27603, o: 149.13435
        }
        , f:":07DA2wMAG", g:"avaustraliacentral.blob.core.windows:a", h:"avaustraliacentral.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:1516, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"australia-central", s:"azure:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:1, e: {
            y: "Canberra", c: "AU", l: -35.27603, o: 149.13435
        }
        , f:":07DA2wMAG", g:"avaustraliacentral.blob.core.windows:a", h:"avaustraliacentral.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:1520, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"australia-central", s:"azure:storage", t:"storage", w:6, y:"l"
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Canberra", c: "AU", l: -35.27603, o: 149.13435
        }
        , f:":07DA2wMAG", g:"avaustraliacentral.blob.core.windows:a", h:"avaustraliacentral.blob.core.windows:a", i:6, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:1556, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"australia-central", s:"azure:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:1, e: {
            y: "Sydney", c: "AU", l: -33.861481, o: 151.205475
        }
        , f:":07DA2wMAG", g:"avaustraliaeast.blob.core.windows:a", h:"avaustraliaeast.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:1561, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"australia-east", s:"azure:storage", t:"storage", w:6, y:"l"
    }
    , {
        a:500, c:1, e: {
            y: "West Des Moines", s: "IA", c: "US", l: 41.5772222, o: -93.7111111
        }
        , f:":07DA2SMAW", g:"us-central-azure.:y:a", h:"us-central.azure.:y:a", i:12, l:":hazure.microsoft.com", m:1565, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"us-central", s:"azure:compute", t:"compute", w:6, y:"l"
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Sydney", c: "AU", l: -33.861481, o: 151.205475
        }
        , f:":07DA2wMAG", g:"avaustraliaeast.blob.core.windows:a", h:"avaustraliaeast.blob.core.windows:a", i:6, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:1601, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"australia-east", s:"azure:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:4, e: {
            y: "West Des Moines", s: "IA", c: "US", l: 41.5772222, o: -93.7111111
        }
        , f:":07DA2SMAW", g:"us-central-azure.:y:a", h:"us-central.azure.:y:a", i:12, l:":hazure.microsoft.com", m:1609, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"us-central", s:"azure:compute", t:"compute", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:4, e: {
            y: "Sydney", c: "AU", l: -33.861481, o: 151.205475
        }
        , f:":07DA2wMAG", g:"avaustraliaeast.blob.core.windows:a", h:"avaustraliaeast.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:1617, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"australia-east", s:"azure:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "West Des Moines", s: "IA", c: "US", l: 41.5772222, o: -93.7111111
        }
        , f:":07DA2SMAW", g:"us-central-azure.:y:a", h:"us-central.azure.:y:a", i:6, l:":hazure.microsoft.com", m:1653, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"us-central", s:"azure:compute", t:"compute", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:1, e: {
            y: "Hong Kong", c: "HK", l: 22.2833333, o: 114.15
        }
        , f:":07DA2SMAW", g:"asia-east-azure.:y:a", h:"asia-east.azure.:y:a", i:12, l:":hazure.microsoft.com", m:1657, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"asia-east", s:"azure:compute", t:"compute", w:6, y:"l"
    }
    , {
        a:500, c:4, e: {
            y: "Hong Kong", c: "HK", l: 22.2833333, o: 114.15
        }
        , f:":07DA2SMAW", g:"asia-east-azure.:y:a", h:"asia-east.azure.:y:a", i:12, l:":hazure.microsoft.com", m:1665, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"asia-east", s:"azure:compute", t:"compute", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Hong Kong", c: "HK", l: 22.2833333, o: 114.15
        }
        , f:":07DA2SMAW", g:"asia-east-azure.:y:a", h:"asia-east.azure.:y:a", i:6, l:":hazure.microsoft.com", m:1701, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"asia-east", s:"azure:compute", t:"compute", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:1, e: {
            y: "Paris", c: "FR", l: 48.866667, o: 2.333333
        }
        , f:":07DA2SMAW", g:"france-central-azure.:y:a", h:"france-central.azure.:y:a", i:12, l:":hazure.microsoft.com", m:1706, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"france-central", s:"azure:compute", t:"compute", w:6, y:"l"
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Paris", c: "FR", l: 48.866667, o: 2.333333
        }
        , f:":07DA2SMAW", g:"france-central-azure.:y:a", h:"france-central.azure.:y:a", i:6, l:":hazure.microsoft.com", m:1742, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"france-central", s:"azure:compute", t:"compute", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:4, e: {
            y: "Paris", c: "FR", l: 48.866667, o: 2.333333
        }
        , f:":07DA2SMAW", g:"france-central-azure.:y:a", h:"france-central.azure.:y:a", i:12, l:":hazure.microsoft.com", m:1750, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"france-central", s:"azure:compute", t:"compute", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Quincy", s: "WA", c: "US", l: 47.2344444, o: -119.8513889
        }
        , f:":07DA2SMAW", g:"us-west2-2-azure.:y:a", h:"us-west2-2.azure.:y:a", i:6, l:":hazure.microsoft.com", m:1786, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"us-west2", s:"azure:compute", t:"compute", u:"us-west2-2", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:1, e: {
            y: "Quincy", s: "WA", c: "US", l: 47.2344444, o: -119.8513889
        }
        , f:":07DA2SMAW", g:"us-west2-2-azure.:y:a", h:"us-west2-2.azure.:y:a", i:12, l:":hazure.microsoft.com", m:1790, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"us-west2", s:"azure:compute", t:"compute", u:"us-west2-2", w:6, y:"l"
    }
    , {
        a:500, c:4, e: {
            y: "Quincy", s: "WA", c: "US", l: 47.2344444, o: -119.8513889
        }
        , f:":07DA2SMAW", g:"us-west2-2-azure.:y:a", h:"us-west2-2.azure.:y:a", i:12, l:":hazure.microsoft.com", m:1798, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"us-west2", s:"azure:compute", t:"compute", u:"us-west2-2", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:4, e: {
            y: "Chennai", c: "IN", l: 13.083333, o: 80.283333
        }
        , f:":07DA2SMAW", g:"india-south-azure.:y:a", h:"india-south.azure.:y:a", i:12, l:":hazure.microsoft.com", m:1806, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"india-south", s:"azure:compute", t:"compute", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:1, e: {
            y: "Seoul", c: "KR", l: 37.5985, o: 126.9783
        }
        , f:":07DA2wMAG", g:"avkoreacentral.blob.core.windows:a", h:"avkoreacentral.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:1810, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"korea-central", s:"azure:storage", t:"storage", w:6, y:"l"
    }
    , {
        a:500, c:1, e: {
            y: "Chennai", c: "IN", l: 13.083333, o: 80.283333
        }
        , f:":07DA2SMAW", g:"india-south-azure.:y:a", h:"india-south.azure.:y:a", i:12, l:":hazure.microsoft.com", m:1814, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"india-south", s:"azure:compute", t:"compute", w:6, y:"l"
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Chennai", c: "IN", l: 13.083333, o: 80.283333
        }
        , f:":07DA2SMAW", g:"india-south-azure.:y:a", h:"india-south.azure.:y:a", i:6, l:":hazure.microsoft.com", m:1851, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"india-south", s:"azure:compute", t:"compute", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:4, e: {
            y: "Seoul", c: "KR", l: 37.5985, o: 126.9783
        }
        , f:":07DA2wMAG", g:"avkoreacentral.blob.core.windows:a", h:"avkoreacentral.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:1858, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"korea-central", s:"azure:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Seoul", c: "KR", l: 37.5985, o: 126.9783
        }
        , f:":07DA2wMAG", g:"avkoreacentral.blob.core.windows:a", h:"avkoreacentral.blob.core.windows:a", i:6, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:1895, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"korea-central", s:"azure:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:1, e: {
            y: "Singapore", c: "SG", l: 1.2930556, o: 103.8558333
        }
        , f:":07DA2wMAG", g:"avsoutheastasia.blob.core.windows:a", h:"avsoutheastasia.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:1899, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"asia-southeast", s:"azure:storage", t:"storage", w:6, y:"l"
    }
    , {
        a:500, c:4, e: {
            y: "Singapore", c: "SG", l: 1.2930556, o: 103.8558333
        }
        , f:":07DA2wMAG", g:"avsoutheastasia.blob.core.windows:a", h:"avsoutheastasia.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:1907, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"asia-southeast", s:"azure:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Singapore", c: "SG", l: 1.2930556, o: 103.8558333
        }
        , f:":07DA2wMAG", g:"avsoutheastasia.blob.core.windows:a", h:"avsoutheastasia.blob.core.windows:a", i:6, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:1943, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"asia-southeast", s:"azure:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:4, e: {
            y: "Seoul", c: "KR", l: 37.5985, o: 126.9783
        }
        , f:":07DA2SMAW", g:"korea-central-azure.:y:a", h:"korea-central.azure.:y:a", i:12, l:":hazure.microsoft.com", m:1951, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"korea-central", s:"azure:compute", t:"compute", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Seoul", c: "KR", l: 37.5985, o: 126.9783
        }
        , f:":07DA2SMAW", g:"korea-central-azure.:y:a", h:"korea-central.azure.:y:a", i:6, l:":hazure.microsoft.com", m:1988, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"korea-central", s:"azure:compute", t:"compute", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:1, e: {
            y: "Seoul", c: "KR", l: 37.5985, o: 126.9783
        }
        , f:":07DA2SMAW", g:"korea-central-azure.:y:a", h:"korea-central.azure.:y:a", i:12, l:":hazure.microsoft.com", m:1992, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"korea-central", s:"azure:compute", t:"compute", w:6, y:"l"
    }
    , {
        a:500, c:1, e: {
            y: "San Antonio", s: "TX", c: "US", l: 29.4238889, o: -98.4933333
        }
        , f:":07DA2wMAG", g:"avsouthcentralus.blob.core.windows:a", h:"avsouthcentralus.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:1996, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"us-southcentral", s:"azure:storage", t:"storage", w:6, y:"l"
    }
    , {
        a:500, c:2, d:4, e: {
            y: "San Antonio", s: "TX", c: "US", l: 29.4238889, o: -98.4933333
        }
        , f:":07DA2wMAG", g:"avsouthcentralus.blob.core.windows:a", h:"avsouthcentralus.blob.core.windows:a", i:6, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2032, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"us-southcentral", s:"azure:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:4, e: {
            y: "San Antonio", s: "TX", c: "US", l: 29.4238889, o: -98.4933333
        }
        , f:":07DA2wMAG", g:"avsouthcentralus.blob.core.windows:a", h:"avsouthcentralus.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2040, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"us-southcentral", s:"azure:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Beijing", c: "CN", l: 30.822638, o: 114.047944
        }
        , f:":07DA2wMAG", g:"avchinanorth.blob.core.chinacloudapi.cn\/:b", h:"avchinanorth.blob.core.chinacloudapi.cn\/:b", i:6, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2076, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"china-north", s:"azure:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:4, e: {
            y: "Beijing", c: "CN", l: 30.822638, o: 114.047944
        }
        , f:":07DA2wMAG", g:"avchinanorth.blob.core.chinacloudapi.cn\/:b", h:"avchinanorth.blob.core.chinacloudapi.cn\/:b", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2084, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"china-north", s:"azure:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:1, e: {
            y: "Beijing", c: "CN", l: 30.822638, o: 114.047944
        }
        , f:":07DA2wMAG", g:"avchinanorth.blob.core.chinacloudapi.cn\/:b", h:"avchinanorth.blob.core.chinacloudapi.cn\/:b", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2088, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"china-north", s:"azure:storage", t:"storage", w:6, y:"l"
    }
    , {
        a:500, c:4, e: {
            y: "London", c: "GB", l: 51.514125, o: -0.093689
        }
        , f:":07DA2wMAG", g:"avuksouth.blob.core.windows:a", h:"avuksouth.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2096, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"uk-south", s:"azure:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "London", c: "GB", l: 51.514125, o: -0.093689
        }
        , f:":07DA2wMAG", g:"avuksouth.blob.core.windows:a", h:"avuksouth.blob.core.windows:a", i:6, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2133, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"uk-south", s:"azure:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:1, e: {
            y: "London", c: "GB", l: 51.514125, o: -0.093689
        }
        , f:":07DA2wMAG", g:"avuksouth.blob.core.windows:a", h:"avuksouth.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2137, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"uk-south", s:"azure:storage", t:"storage", w:6, y:"l"
    }
    , {
        a:500, c:4, e: {
            y: "Saitama", c: "JP", l: 35.895534, o: 139.67747
        }
        , f:":07DA2wMAG", g:"avjapaneast.blob.core.windows:a", h:"avjapaneast.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2144, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"japan-east", s:"azure:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:1, e: {
            y: "Saitama", c: "JP", l: 35.895534, o: 139.67747
        }
        , f:":07DA2wMAG", g:"avjapaneast.blob.core.windows:a", h:"avjapaneast.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2149, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"japan-east", s:"azure:storage", t:"storage", w:6, y:"l"
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Saitama", c: "JP", l: 35.895534, o: 139.67747
        }
        , f:":07DA2wMAG", g:"avjapaneast.blob.core.windows:a", h:"avjapaneast.blob.core.windows:a", i:6, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2185, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"japan-east", s:"azure:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:1, e: {
            y: "Busan", c: "KR", l: 37.1525, o: 127.095
        }
        , f:":07DA2wMAG", g:"avkoreasouth.blob.core.windows:a", h:"avkoreasouth.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2189, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"korea-south", s:"azure:storage", t:"storage", w:6, y:"l"
    }
    , {
        a:500, c:4, e: {
            y: "Busan", c: "KR", l: 37.1525, o: 127.095
        }
        , f:":07DA2wMAG", g:"avkoreasouth.blob.core.windows:a", h:"avkoreasouth.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2197, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"korea-south", s:"azure:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Busan", c: "KR", l: 37.1525, o: 127.095
        }
        , f:":07DA2wMAG", g:"avkoreasouth.blob.core.windows:a", h:"avkoreasouth.blob.core.windows:a", i:6, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2233, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"korea-south", s:"azure:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:1, e: {
            y: "Ashburn", s: "VA", c: "US", l: 39.0708333, o: -77.48
        }
        , f:":07DA2SMAW", g:"us-east2-azure.:y:a", h:"us-east2.azure.:y:a", i:12, l:":hazure.microsoft.com", m:2237, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"us-east2", s:"azure:compute", t:"compute", w:6, y:"l"
    }
    , {
        a:500, c:4, e: {
            y: "Ashburn", s: "VA", c: "US", l: 39.0708333, o: -77.48
        }
        , f:":07DA2SMAW", g:"us-east2-azure.:y:a", h:"us-east2.azure.:y:a", i:12, l:":hazure.microsoft.com", m:2245, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"us-east2", s:"azure:compute", t:"compute", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Ashburn", s: "VA", c: "US", l: 39.0708333, o: -77.48
        }
        , f:":07DA2SMAW", g:"us-east2-azure.:y:a", h:"us-east2.azure.:y:a", i:6, l:":hazure.microsoft.com", m:2282, n:"Microsoft Azure Virtual Machines", o:5, p:"azure", r:"us-east2", s:"azure:compute", t:"compute", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:1, e: {
            y: "Cardiff", c: "GB", l: 51.5, o: -3.2
        }
        , f:":07DA2wMAG", g:"avukwest.blob.core.windows:a", h:"avukwest.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2286, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"uk-west", s:"azure:storage", t:"storage", w:6, y:"l"
    }
    , {
        a:500, c:4, e: {
            y: "Cardiff", c: "GB", l: 51.5, o: -3.2
        }
        , f:":07DA2wMAG", g:"avukwest.blob.core.windows:a", h:"avukwest.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2294, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"uk-west", s:"azure:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Cardiff", c: "GB", l: 51.5, o: -3.2
        }
        , f:":07DA2wMAG", g:"avukwest.blob.core.windows:a", h:"avukwest.blob.core.windows:a", i:6, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2330, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"uk-west", s:"azure:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:1, e: {
            y: "Hong Kong", c: "HK", l: 22.2833333, o: 114.15
        }
        , f:":07DA2wMAG", g:"aveastasia.blob.core.windows:a", h:"aveastasia.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2334, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"asia-east", s:"azure:storage", t:"storage", w:6, y:"l"
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Hong Kong", c: "HK", l: 22.2833333, o: 114.15
        }
        , f:":07DA2wMAG", g:"aveastasia.blob.core.windows:a", h:"aveastasia.blob.core.windows:a", i:6, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2371, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"asia-east", s:"azure:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:1, e: {
            y: "Marseille", c: "FR", l: 43.285413, o: 5.37606
        }
        , f:":07DA2wMAG", g:"avfrancesouth.blob.core.windows:a", h:"avfrancesouth.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2375, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"france-south", s:"azure:storage", t:"storage", w:6, y:"l"
    }
    , {
        a:500, c:1, e: {
            y: "Amsterdam", c: "NL", l: 52.35, o: 4.916667
        }
        , f:":07DA2wMAG", g:"avwesteurope.blob.core.windows:a", h:"avwesteurope.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2379, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"eu-west", s:"azure:storage", t:"storage", w:6, y:"l"
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Amsterdam", c: "NL", l: 52.35, o: 4.916667
        }
        , f:":07DA2wMAG", g:"avwesteurope.blob.core.windows:a", h:"avwesteurope.blob.core.windows:a", i:6, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2415, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"eu-west", s:"azure:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:4, e: {
            y: "Marseille", c: "FR", l: 43.285413, o: 5.37606
        }
        , f:":07DA2wMAG", g:"avfrancesouth.blob.core.windows:a", h:"avfrancesouth.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2423, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"france-south", s:"azure:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Marseille", c: "FR", l: 43.285413, o: 5.37606
        }
        , f:":07DA2wMAG", g:"avfrancesouth.blob.core.windows:a", h:"avfrancesouth.blob.core.windows:a", i:6, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2460, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"france-south", s:"azure:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:4, e: {
            y: "Hong Kong", c: "HK", l: 22.2833333, o: 114.15
        }
        , f:":07DA2wMAG", g:"aveastasia.blob.core.windows:a", h:"aveastasia.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2467, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"asia-east", s:"azure:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:4, e: {
            y: "Amsterdam", c: "NL", l: 52.35, o: 4.916667
        }
        , f:":07DA2wMAG", g:"avwesteurope.blob.core.windows:a", h:"avwesteurope.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2475, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"eu-west", s:"azure:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "West Des Moines", s: "IA", c: "US", l: 41.5772222, o: -93.7111111
        }
        , f:":07DA2wMAG", g:"avcentralus.blob.core.windows:a", h:"avcentralus.blob.core.windows:a", i:6, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2512, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"us-central", s:"azure:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:1, e: {
            y: "West Des Moines", s: "IA", c: "US", l: 41.5772222, o: -93.7111111
        }
        , f:":07DA2wMAG", g:"avcentralus.blob.core.windows:a", h:"avcentralus.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2516, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"us-central", s:"azure:storage", t:"storage", w:6, y:"l"
    }
    , {
        a:500, c:4, e: {
            y: "West Des Moines", s: "IA", c: "US", l: 41.5772222, o: -93.7111111
        }
        , f:":07DA2wMAG", g:"avcentralus.blob.core.windows:a", h:"avcentralus.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2524, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"us-central", s:"azure:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Beijing", c: "CN", l: 30.822638, o: 114.047944
        }
        , f:":07DA2wMAG", g:"avchinanorth2.blob.core.chinacloudapi.cn\/:b", h:"avchinanorth2.blob.core.chinacloudapi.cn\/:b", i:6, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2560, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"china-north2", s:"azure:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:4, e: {
            y: "Beijing", c: "CN", l: 30.822638, o: 114.047944
        }
        , f:":07DA2wMAG", g:"avchinanorth2.blob.core.chinacloudapi.cn\/:b", h:"avchinanorth2.blob.core.chinacloudapi.cn\/:b", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2568, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"china-north2", s:"azure:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:1, e: {
            y: "Beijing", c: "CN", l: 30.822638, o: 114.047944
        }
        , f:":07DA2wMAG", g:"avchinanorth2.blob.core.chinacloudapi.cn\/:b", h:"avchinanorth2.blob.core.chinacloudapi.cn\/:b", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2572, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"china-north2", s:"azure:storage", t:"storage", w:6, y:"l"
    }
    , {
        a:500, c:1, e: {
            y: "Paris", c: "FR", l: 48.866667, o: 2.333333
        }
        , f:":07DA2wMAG", g:"avfrancecentral.blob.core.windows:a", h:"avfrancecentral.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2576, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"france-central", s:"azure:storage", t:"storage", w:6, y:"l"
    }
    , {
        a:500, c:4, e: {
            y: "Paris", c: "FR", l: 48.866667, o: 2.333333
        }
        , f:":07DA2wMAG", g:"avfrancecentral.blob.core.windows:a", h:"avfrancecentral.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2584, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"france-central", s:"azure:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Paris", c: "FR", l: 48.866667, o: 2.333333
        }
        , f:":07DA2wMAG", g:"avfrancecentral.blob.core.windows:a", h:"avfrancecentral.blob.core.windows:a", i:6, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2620, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"france-central", s:"azure:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:4, e: {
            y: "Toronto", c: "CA", l: 43.666667, o: -79.416667
        }
        , f:":07DA2wMAG", g:"avcanadacentral.blob.core.windows:a", h:"avcanadacentral.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2628, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"canada-central", s:"azure:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:1, e: {
            y: "Toronto", c: "CA", l: 43.666667, o: -79.416667
        }
        , f:":07DA2wMAG", g:"avcanadacentral.blob.core.windows:a", h:"avcanadacentral.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2632, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"canada-central", s:"azure:storage", t:"storage", w:6, y:"l"
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Toronto", c: "CA", l: 43.666667, o: -79.416667
        }
        , f:":07DA2wMAG", g:"avcanadacentral.blob.core.windows:a", h:"avcanadacentral.blob.core.windows:a", i:6, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2669, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"canada-central", s:"azure:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Cheyenne", s: "WY", c: "US", l: 41.14, o: -104.8197222
        }
        , f:":07DA2wMAG", g:"avwestcentralus.blob.core.windows:a", h:"avwestcentralus.blob.core.windows:a", i:6, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2705, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"us-westcentral", s:"azure:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:1, e: {
            y: "Cheyenne", s: "WY", c: "US", l: 41.14, o: -104.8197222
        }
        , f:":07DA2wMAG", g:"avwestcentralus.blob.core.windows:a", h:"avwestcentralus.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2709, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"us-westcentral", s:"azure:storage", t:"storage", w:6, y:"l"
    }
    , {
        a:500, c:4, e: {
            y: "Cheyenne", s: "WY", c: "US", l: 41.14, o: -104.8197222
        }
        , f:":07DA2wMAG", g:"avwestcentralus.blob.core.windows:a", h:"avwestcentralus.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2717, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"us-westcentral", s:"azure:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Quebec City", c: "CA", l: 46.8167, o: -71.2167
        }
        , f:":07DA2wMAG", g:"avcanadaeast.blob.core.windows:a", h:"avcanadaeast.blob.core.windows:a", i:6, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2753, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"canada-east", s:"azure:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:1, e: {
            y: "Quebec City", c: "CA", l: 46.8167, o: -71.2167
        }
        , f:":07DA2wMAG", g:"avcanadaeast.blob.core.windows:a", h:"avcanadaeast.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2758, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"canada-east", s:"azure:storage", t:"storage", w:6, y:"l"
    }
    , {
        a:500, c:4, e: {
            y: "Quebec City", c: "CA", l: 46.8167, o: -71.2167
        }
        , f:":07DA2wMAG", g:"avcanadaeast.blob.core.windows:a", h:"avcanadaeast.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2765, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"canada-east", s:"azure:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Quincy", s: "WA", c: "US", l: 47.2344444, o: -119.8513889
        }
        , f:":07DA2wMAG", g:"avwestus2.blob.core.windows:a", h:"avwestus2.blob.core.windows:a", i:6, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2802, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"us-west2", s:"azure:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:4, e: {
            y: "Quincy", s: "WA", c: "US", l: 47.2344444, o: -119.8513889
        }
        , f:":07DA2wMAG", g:"avwestus2.blob.core.windows:a", h:"avwestus2.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2810, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"us-west2", s:"azure:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:1, e: {
            y: "Quincy", s: "WA", c: "US", l: 47.2344444, o: -119.8513889
        }
        , f:":07DA2wMAG", g:"avwestus2.blob.core.windows:a", h:"avwestus2.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2814, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"us-west2", s:"azure:storage", t:"storage", w:6, y:"l"
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Mumbai", c: "IN", l: 18.975, o: 72.825833
        }
        , f:":07DA2wMAG", g:"avindiawest9835.blob.core.windows:a", h:"avindiawest9835.blob.core.windows:a", i:6, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2850, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"india-west", s:"azure:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Dublin", c: "IE", l: 53.3330556, o: -6.2488889
        }
        , f:":07DA2wMAG", g:"avnortheurope.blob.core.windows:a", h:"avnortheurope.blob.core.windows:a", i:6, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2887, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"eu-north", s:"azure:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:4, e: {
            y: "Dublin", c: "IE", l: 53.3330556, o: -6.2488889
        }
        , f:":07DA2wMAG", g:"avnortheurope.blob.core.windows:a", h:"avnortheurope.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2894, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"eu-north", s:"azure:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:1, e: {
            y: "Mumbai", c: "IN", l: 18.975, o: 72.825833
        }
        , f:":07DA2wMAG", g:"avindiawest9835.blob.core.windows:a", h:"avindiawest9835.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2899, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"india-west", s:"azure:storage", t:"storage", w:6, y:"l"
    }
    , {
        a:500, c:1, e: {
            y: "Dublin", c: "IE", l: 53.3330556, o: -6.2488889
        }
        , f:":07DA2wMAG", g:"avnortheurope.blob.core.windows:a", h:"avnortheurope.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2903, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"eu-north", s:"azure:storage", t:"storage", w:6, y:"l"
    }
    , {
        a:500, c:4, e: {
            y: "Mumbai", c: "IN", l: 18.975, o: 72.825833
        }
        , f:":07DA2wMAG", g:"avindiawest9835.blob.core.windows:a", h:"avindiawest9835.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2910, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"india-west", s:"azure:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:4, e: {
            y: "Ashburn", s: "VA", c: "US", l: 39.0708333, o: -77.48
        }
        , f:":07DA2wMAG", g:"aveastus.blob.core.windows:a", h:"aveastus.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2918, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"us-east", s:"azure:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:1, e: {
            y: "Ashburn", s: "VA", c: "US", l: 39.0708333, o: -77.48
        }
        , f:":07DA2wMAG", g:"aveastus.blob.core.windows:a", h:"aveastus.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2922, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"us-east", s:"azure:storage", t:"storage", w:6, y:"l"
    }
    , {
        a:500, c:4, e: {
            y: "San Francisco", s: "CA", c: "US", l: 37.775, o: -122.4183333
        }
        , f:":07DA2wMAG", g:"avwestus.blob.core.windows:a", h:"avwestus.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2930, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"us-west", s:"azure:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "San Francisco", s: "CA", c: "US", l: 37.775, o: -122.4183333
        }
        , f:":07DA2wMAG", g:"avwestus.blob.core.windows:a", h:"avwestus.blob.core.windows:a", i:6, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2966, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"us-west", s:"azure:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:1, e: {
            y: "San Francisco", s: "CA", c: "US", l: 37.775, o: -122.4183333
        }
        , f:":07DA2wMAG", g:"avwestus.blob.core.windows:a", h:"avwestus.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:2971, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"us-west", s:"azure:storage", t:"storage", w:6, y:"l"
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Ashburn", s: "VA", c: "US", l: 39.0708333, o: -77.48
        }
        , f:":07DA2wMAG", g:"aveastus.blob.core.windows:a", h:"aveastus.blob.core.windows:a", i:6, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:3007, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"us-east", s:"azure:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:1, e: {
            y: "Chennai", c: "IN", l: 13.083333, o: 80.283333
        }
        , f:":07DA2wMAG", g:"avsouthindia.blob.core.windows:a", h:"avsouthindia.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:3011, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"india-south", s:"azure:storage", t:"storage", w:6, y:"l"
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Chennai", c: "IN", l: 13.083333, o: 80.283333
        }
        , f:":07DA2wMAG", g:"avsouthindia.blob.core.windows:a", h:"avsouthindia.blob.core.windows:a", i:6, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:3048, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"india-south", s:"azure:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:4, e: {
            y: "Chennai", c: "IN", l: 13.083333, o: 80.283333
        }
        , f:":07DA2wMAG", g:"avsouthindia.blob.core.windows:a", h:"avsouthindia.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:3055, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"india-south", s:"azure:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Ashburn", s: "VA", c: "US", l: 39.0708333, o: -77.48
        }
        , f:":07DA2wMAG", g:"aveastus2.blob.core.windows:a", h:"aveastus2.blob.core.windows:a", i:6, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:3092, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"us-east2", s:"azure:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:1, e: {
            y: "Ashburn", s: "VA", c: "US", l: 39.0708333, o: -77.48
        }
        , f:":07DA2wMAG", g:"aveastus2.blob.core.windows:a", h:"aveastus2.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:3096, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"us-east2", s:"azure:storage", t:"storage", w:6, y:"l"
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Chicago", s: "IL", c: "US", l: 41.85, o: -87.65
        }
        , f:":07DA2wMAG", g:"avnorthcentralus.blob.core.windows:a", h:"avnorthcentralus.blob.core.windows:a", i:6, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:3133, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"us-northcentral", s:"azure:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:4, e: {
            y: "Chicago", s: "IL", c: "US", l: 41.85, o: -87.65
        }
        , f:":07DA2wMAG", g:"avnorthcentralus.blob.core.windows:a", h:"avnorthcentralus.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:3140, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"us-northcentral", s:"azure:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Pune", c: "IN", l: 18.533333, o: 73.866667
        }
        , f:":07DA2wMAG", g:"avcentralindia.blob.core.windows:a", h:"avcentralindia.blob.core.windows:a", i:6, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:3177, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"india-central", s:"azure:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:1, e: {
            y: "Chicago", s: "IL", c: "US", l: 41.85, o: -87.65
        }
        , f:":07DA2wMAG", g:"avnorthcentralus.blob.core.windows:a", h:"avnorthcentralus.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:3181, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"us-northcentral", s:"azure:storage", t:"storage", w:6, y:"l"
    }
    , {
        a:500, c:4, e: {
            y: "Pune", c: "IN", l: 18.533333, o: 73.866667
        }
        , f:":07DA2wMAG", g:"avcentralindia.blob.core.windows:a", h:"avcentralindia.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:3189, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"india-central", s:"azure:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:4, e: {
            y: "Ashburn", s: "VA", c: "US", l: 39.0708333, o: -77.48
        }
        , f:":07DA2wMAG", g:"aveastus2.blob.core.windows:a", h:"aveastus2.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:3196, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"us-east2", s:"azure:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:1, e: {
            y: "Pune", c: "IN", l: 18.533333, o: 73.866667
        }
        , f:":07DA2wMAG", g:"avcentralindia.blob.core.windows:a", h:"avcentralindia.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:3201, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"india-central", s:"azure:storage", t:"storage", w:6, y:"l"
    }
    , {
        a:500, c:1, e: {
            y: "Osaka", c: "JP", l: 34.516855, o: 135.562978
        }
        , f:":07DA2wMAG", g:"avjapanwest.blob.core.windows:a", h:"avjapanwest.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:3205, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"japan-west", s:"azure:storage", t:"storage", w:6, y:"l"
    }
    , {
        a:500, c:4, e: {
            y: "Osaka", c: "JP", l: 34.516855, o: 135.562978
        }
        , f:":07DA2wMAG", g:"avjapanwest.blob.core.windows:a", h:"avjapanwest.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:3212, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"japan-west", s:"azure:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Sao Paulo", c: "BR", l: -23.53, o: -46.63
        }
        , f:":07DA2wMAG", g:"avbrazilsouth.blob.core.windows:a", h:"avbrazilsouth.blob.core.windows:a", i:6, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:3249, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"brazil-south", s:"azure:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:4, e: {
            y: "Shanghai", c: "CN", l: 31.045556, o: 121.399722
        }
        , f:":07DA2wMAG", g:"avchinaeast.blob.core.chinacloudapi.cn\/:b", h:"avchinaeast.blob.core.chinacloudapi.cn\/:b", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:3257, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"china-east", s:"azure:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:1, e: {
            y: "Shanghai", c: "CN", l: 31.045556, o: 121.399722
        }
        , f:":07DA2wMAG", g:"avchinaeast.blob.core.chinacloudapi.cn\/:b", h:"avchinaeast.blob.core.chinacloudapi.cn\/:b", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:3261, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"china-east", s:"azure:storage", t:"storage", w:6, y:"l"
    }
    , {
        a:500, c:4, e: {
            y: "Sao Paulo", c: "BR", l: -23.53, o: -46.63
        }
        , f:":07DA2wMAG", g:"avbrazilsouth.blob.core.windows:a", h:"avbrazilsouth.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:3268, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"brazil-south", s:"azure:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Osaka", c: "JP", l: 34.516855, o: 135.562978
        }
        , f:":07DA2wMAG", g:"avjapanwest.blob.core.windows:a", h:"avjapanwest.blob.core.windows:a", i:6, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:3305, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"japan-west", s:"azure:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:1, e: {
            y: "Sao Paulo", c: "BR", l: -23.53, o: -46.63
        }
        , f:":07DA2wMAG", g:"avbrazilsouth.blob.core.windows:a", h:"avbrazilsouth.blob.core.windows:a", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:3309, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"brazil-south", s:"azure:storage", t:"storage", w:6, y:"l"
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Shanghai", c: "CN", l: 31.045556, o: 121.399722
        }
        , f:":07DA2wMAG", g:"avchinaeast.blob.core.chinacloudapi.cn\/:b", h:"avchinaeast.blob.core.chinacloudapi.cn\/:b", i:6, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:3346, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"china-east", s:"azure:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:4, e: {
            y: "Shanghai", c: "CN", l: 31.045556, o: 121.399722
        }
        , f:":07DA2wMAG", g:"avchinaeast2.blob.core.chinacloudapi.cn\/:b", h:"avchinaeast2.blob.core.chinacloudapi.cn\/:b", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:3353, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"china-east2", s:"azure:storage", t:"storage", w:6, x:128, y:"d", z:1
    }
    , {
        a:500, c:2, d:4, e: {
            y: "Shanghai", c: "CN", l: 31.045556, o: 121.399722
        }
        , f:":07DA2wMAG", g:"avchinaeast2.blob.core.chinacloudapi.cn\/:b", h:"avchinaeast2.blob.core.chinacloudapi.cn\/:b", i:6, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:3390, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"china-east2", s:"azure:storage", t:"storage", w:3, x:10240, y:"d", z:256
    }
    , {
        a:500, c:1, e: {
            y: "Shanghai", c: "CN", l: 31.045556, o: 121.399722
        }
        , f:":07DA2wMAG", g:"avchinaeast2.blob.core.chinacloudapi.cn\/:b", h:"avchinaeast2.blob.core.chinacloudapi.cn\/:b", i:12, l:":sazure.microsoft.com\/en-us\/services\/storage\/", m:3394, n:"Microsoft Azure Cloud Storage", o:5, p:"azure", r:"china-east2", s:"azure:storage", t:"storage", w:6, y:"l"
    }
    ], dns=function() {
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
    , d=function() {
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