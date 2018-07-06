(function() {
    function ia() {
        function a() {}
        a.prototype = ia.prototype;
        var b = new a, e;
        for (e in va)
            b[e] = va[e];
        return b
    }
    function L(a) {
        function b() {}
        a = a || {};
        b.prototype = L.prototype;
        var e = new b;
        e._lexer = a.lexer || new ia;
        e._blankNodes = Object.create(null);
        e._blankNodeCount = 0;
        e._tripleStack = [];
        a.documentURI ? (e._baseURI = e._documentURI = a.documentURI,
        e._baseURIRoot = e._documentURIRoot = a.documentURI.replace(wa, "")) : (e._baseURI = e._documentURI = null,
        e._baseURIROOT = e._documentURIRoot = null);
        return e
    }
    typeof console == "undefined" && (console = {
        log: function() {}
    });
    window.process = {};
    process.nextTick = function(a) {
        setTimeout(a, 0)
    }
    ;
    var s = {
        "extends": function(a, b) {
            b.prototype = new a
        },
        stackCounterLimit: 1E3,
        stackCounter: 0
    };
    s.recur = function(a) {
        s.stackCounter === s.stackCounterLimit ? (s.stackCounter = 0,
        setTimeout(a, 0)) : (s.stackCounter++,
        a())
    }
    ;
    s.clone = function(a) {
        return JSON.parse(JSON.stringify(a))
    }
    ;
    s.shuffle = function(a) {
        for (var b, e, d = a.length; d; b = parseInt(Math.random() * d),
        e = a[--d],
        a[d] = a[b],
        a[b] = e)
            ;
        return a
    }
    ;
    s.include = function(a, b, e) {
        for (var d = a.length - 1; d >= 0; d--) {
            var i = !1
              , i = e == null ? a[d] === b : e(a[d], b) === 0;
            if (i === !0)
                return !0
        }
        return !1
    }
    ;
    s.remove = function(a, b) {
        for (var e = [], d = 0; d < a.length; d++)
            a[d] !== b && e.push(a[d]);
        return e
    }
    ;
    s.repeat = function(a, b, e, d, i) {
        arguments.length === 4 && (i = {});
        a < b ? (i._i = a,
        e(function(e, i) {
            s.recur(function() {
                s.repeat(a + 1, b, e, d, i)
            })
        }, i)) : d(i)
    }
    ;
    s.meanwhile = function(a, b, e, d) {
        arguments.length === 3 && (d = {});
        d._stack_counter == null && (d._stack_counter = 0);
        a === !0 ? b(function(a, b, d) {
            d._stack_counter % 40 == 39 ? (d._stack_counter += 1,
            setTimeout(function() {
                s.neanwhile(a, b, e, d)
            }, 0)) : (d._stack_counter += 1,
            s.meanwhile(a, b, e, d))
        }, d) : e(d)
    }
    ;
    s.seq = function() {
        var a = arguments;
        return function(b) {
            s.repeat(0, a.length, function(e, b) {
                var i = arguments.callee;
                a[b._i](function() {
                    e(i, b)
                })
            }, function() {
                b()
            })
        }
    }
    ;
    s.partition = function(a, b) {
        for (var e = a.length % b, d = [], i = 0; i < e; i++)
            d.push(null);
        e = [];
        for (i = 0; i < a.length; i++)
            d.push(a[i]),
            d.length % b == 0 && (e.push(d),
            d = []);
        return e
    }
    ;
    s.keys = function(a) {
        var b = [], e;
        for (e in a)
            b.push(e);
        return b
    }
    ;
    s.iso8601 = function(a) {
        function b(a) {
            return a < 10 ? "0" + a : a
        }
        return a.getUTCFullYear() + "-" + b(a.getUTCMonth() + 1) + "-" + b(a.getUTCDate()) + "T" + b(a.getUTCHours()) + ":" + b(a.getUTCMinutes()) + ":" + b(a.getUTCSeconds()) + "Z"
    }
    ;
    s.parseStrictISO8601 = function(a) {
        var b = a.match(RegExp("([0-9]{4})(-([0-9]{2})(-([0-9]{2})(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(.([0-9]+))?)?(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?"))
          , a = 0
          , e = new Date(b[1],0,1);
        if (b[3])
            e.setMonth(b[3] - 1);
        else
            throw "missing ISO8061 component";
        if (b[5])
            e.setDate(b[5]);
        else
            throw "missing ISO8061 component";
        if (b[7])
            e.setHours(b[7]);
        else
            throw "missing ISO8061 component";
        if (b[8])
            e.setMinutes(b[8]);
        else
            throw "missing ISO8061 component";
        if (b[10])
            e.setSeconds(b[10]);
        else
            throw "missing ISO8061 component";
        b[12] && e.setMilliseconds(Number("0." + b[12]) * 1E3);
        b[14] && (a = Number(b[16]) * 60 + Number(b[17]),
        a *= b[15] == "-" ? 1 : -1);
        a -= e.getTimezoneOffset();
        b = new Date;
        b.setTime(Number(Number(e) + a * 6E4));
        return b
    }
    ;
    s.parseISO8601 = function(a) {
        var b = a.match(RegExp("([0-9]{4})(-([0-9]{2})(-([0-9]{2})(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(.([0-9]+))?)?(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?"))
          , a = 0
          , e = new Date(b[1],0,1);
        b[3] && e.setMonth(b[3] - 1);
        b[5] && e.setDate(b[5]);
        b[7] && e.setHours(b[7]);
        b[8] && e.setMinutes(b[8]);
        b[10] && e.setSeconds(b[10]);
        b[12] && e.setMilliseconds(Number("0." + b[12]) * 1E3);
        b[14] && (a = Number(b[16]) * 60 + Number(b[17]),
        a *= b[15] == "-" ? 1 : -1);
        a -= e.getTimezoneOffset();
        b = new Date;
        b.setTime(Number(Number(e) + a * 6E4));
        return b
    }
    ;
    s.parseISO8601Components = function(a) {
        var a = a.match(RegExp("([0-9]{4})(-([0-9]{2}))(-([0-9]{2}))(T([0-9]{2}):([0-9]{2})(:([0-9]{2}))?(.([0-9]+))?)?(Z|([-+])([0-9]{2})(:([0-9]{2}))?)?")), b, e, d, i, h, f, g, n;
        b = Number(a[1]);
        e = a[3] - 1;
        d = Number(a[5]);
        i = Number(a[7]);
        h = Number(a[8]);
        f = Number(a[10]);
        a[12] && (g = Number("0." + a[12]) * 1E3);
        a[13] === "Z" ? n = 0 : a[14] ? (n = 0,
        a[17] && (n = Number(a[17])),
        n += Number(a[15]) * 60,
        n *= a[14] == "-" ? -1 : 1) : a[14] == null && a[11] && (n = Number(a[12]) * 60);
        return {
            year: isNaN(b) ? null : b,
            month: isNaN(e) ? null : e,
            date: isNaN(d) ? null : d,
            hours: isNaN(i) ? null : i,
            minutes: isNaN(h) ? null : h,
            seconds: isNaN(f) ? null : f,
            millisecs: isNaN(g) ? null : g,
            timezone: isNaN(n) ? null : n
        }
    }
    ;
    s.compareDateComponents = function(a, b) {
        var e = s.parseISO8601Components(a)
          , d = s.parseISO8601Components(b);
        if (e.timezone == null && d.timezone == null || e.timezone != null && d.timezone != null)
            return e = s.parseISO8601(a),
            d = s.parseISO8601(b),
            e.getTime() == d.getTime() ? 0 : e.getTime() < d.getTime() ? -1 : 1;
        else if (e.timezone != null && d.timezone == null) {
            var e = s.parseISO8601(a)
              , d = s.parseISO8601(b)
              , e = e.getTime()
              , d = d.getTime()
              , i = 50400;
            return e < d && e < d + i ? -1 : e > d && e > d - i ? 1 : null
        } else
            return e = s.parseISO8601(a),
            d = s.parseISO8601(b),
            e = e.getTime(),
            d = d.getTime(),
            i = 50400,
            e < d && e + i < d ? -1 : e > d && e + i > d ? 1 : null
    }
    ;
    s.lexicalFormLiteral = function(a, b) {
        var e = a.value
          , d = a.lang
          , i = a.type
          , h = null;
        if (e != null && i != null && typeof i != "string") {
            e = i.value;
            if (e == null)
                e = i.suffix,
                i = b.namespaces[i.prefix],
                a.type = i + e,
                e = i + e;
            h = e.indexOf("hexBinary") != -1 ? '"' + a.value.toLowerCase() + '"^^<' + e + ">" : '"' + a.value + '"^^<' + e + ">"
        } else
            h = d == null && i == null ? '"' + e + '"' : i == null ? '"' + e + '"@' + d : i.indexOf("hexBinary") != -1 ? '"' + a.value.toLowerCase() + '"^^<' + i + ">" : '"' + a.value + '"^^<' + i + ">";
        return h
    }
    ;
    s.lexicalFormBaseUri = function(a, b) {
        var e = null
          , b = b || {};
        if (a.value == null)
            var e = a.prefix
              , d = a.suffix
              , i = b.namespaces[e]
              , e = i != null ? i + d : e + ":" + d;
        else
            e = a.value;
        if (e === null)
            return null;
        else
            e.indexOf(":") == -1 && (e = (b.base || "") + e);
        return e
    }
    ;
    s.lexicalFormTerm = function(a, b) {
        if (a.token === "uri")
            return {
                uri: s.lexicalFormBaseUri(a, b)
            };
        else if (a.token === "literal")
            return {
                literal: s.lexicalFormLiteral(a, b)
            };
        else if (a.token === "blank")
            return {
                blank: "_:" + a.value
            };
        else
            throw "Error, cannot get lexical form of unknown token: " + a.token;
    }
    ;
    s.normalizeUnicodeLiterals = function(a) {
        for (var b = a.match(/\\u[0-9abcdefABCDEF]{4,4}/g) || [], e = {}, d = 0; d < b.length; d++)
            e[b[d]] == null && (e[b[d]] = !0,
            a = a.replace(RegExp("\\" + b[d], "g"), eval("'" + b[d] + "'")));
        return a
    }
    ;
    s.hashTerm = function(a) {
        try {
            if (a == null)
                return "";
            if (a.token === "uri")
                return "u" + a.value;
            else if (a.token === "blank")
                return "b" + a.value;
            else if (a.token === "literal") {
                var b = "l" + a.value;
                b += a.type || "";
                b += a.lang || "";
                return b
            }
        } catch (e) {
            if (typeof a === "object") {
                b = "";
                for (p in a)
                    b = b + p + a[p];
                return b
            }
            return a
        }
    }
    ;
    var E = {
        Tree: function(a) {
            if (arguments.length != 0)
                this.order = a,
                this.root = this._allocateNode(),
                this.root.isLeaf = !0,
                this.root.level = 0,
                this._diskWrite(this.root),
                this._updateRootNode(this.root),
                this.comparator = function(a, e) {
                    return a < e ? -1 : a > e ? 1 : 0
                }
                ,
                this.merger = null
        }
    };
    E.Tree.prototype._allocateNode = function() {
        return new E.Node
    }
    ;
    E.Tree.prototype._diskWrite = function() {}
    ;
    E.Tree.prototype._diskRead = function(a) {
        return a
    }
    ;
    E.Tree.prototype._diskDelete = function() {}
    ;
    E.Tree.prototype._updateRootNode = function(a) {
        return a
    }
    ;
    E.Tree.prototype.clear = function() {
        this.root = this._allocateNode();
        this.root.isLeaf = !0;
        this.root.level = 0;
        this._updateRootNode(this.root)
    }
    ;
    E.Tree.prototype.search = function(a, b) {
        for (var e = !0, d = this.root; e; ) {
            for (var i = 0; i < d.numberActives && this.comparator(a, d.keys[i].key) === 1; )
                i++;
            if (i < d.numberActives && this.comparator(d.keys[i].key, a) === 0)
                return b != null && b == !0 ? !0 : d.keys[i].data;
            else
                d.isLeaf === !0 ? e = !1 : d = this._diskRead(d.children[i])
        }
        return null
    }
    ;
    E.Tree.prototype.walk = function(a) {
        this._walk(a, this.root)
    }
    ;
    E.Tree.prototype._walk = function(a, b) {
        if (b.isLeaf)
            for (var e = 0; e < b.numberActives; e++)
                a(b.keys[e]);
        else {
            for (e = 0; e < b.numberActives; e++)
                this._walk(a, this._diskRead(b.children[e])),
                a(b.keys[e]);
            this._walk(a, this._diskRead(b.children[b.numberActives]))
        }
    }
    ;
    E.Tree.prototype.walkNodes = function(a) {
        this._walkNodes(a, this.root)
    }
    ;
    E.Tree.prototype._walkNodes = function(a, b) {
        if (b.isLeaf)
            a(b);
        else {
            a(b);
            for (var e = 0; e < b.numberActives; e++)
                this._walkNodes(a, this._diskRead(b.children[e]));
            this._walkNodes(a, this._diskRead(b.children[b.numberActives]))
        }
    }
    ;
    E.Tree.prototype._splitChild = function(a, b, e) {
        var d = this._allocateNode();
        d.isLeaf = e.isLeaf;
        d.level = e.level;
        d.numberActives = this.order - 1;
        var i = e.keys[this.order - 1];
        e.keys[this.order - 1] = null;
        for (var h = 0; h < this.order - 1; h++)
            d.keys[h] = e.keys[h + this.order],
            e.keys[h + this.order] = null,
            e.isLeaf || (d.children[h] = e.children[h + this.order],
            e.children[h + this.order] = null);
        e.isLeaf || (d.children[h] = e.children[h + this.order],
        e.children[h + this.order] = null);
        e.numberActives = this.order - 1;
        for (h = a.numberActives + 1; h > b + 1; h--)
            a.children[h] = a.children[h - 1];
        a.children[b + 1] = d;
        for (h = a.numberActives; h > b; h--)
            a.keys[h] = a.keys[h - 1];
        a.keys[b] = i;
        a.numberActives++;
        this._diskWrite(d);
        this._diskWrite(a);
        this._diskWrite(e)
    }
    ;
    E.Tree.prototype.insert = function(a, b) {
        if (this.root.numberActives === 2 * this.order - 1) {
            var e = this._allocateNode();
            e.isLeaf = !1;
            e.level = this.root.level + 1;
            e.numberActives = 0;
            e.children[0] = this.root;
            this._splitChild(e, 0, this.root);
            this.root = e;
            this._updateRootNode(this.root);
            this._insertNonFull(e, a, b)
        } else
            this._insertNonFull(this.root, a, b)
    }
    ;
    E.Tree.prototype._insertNonFull = function(a, b, e) {
        for (var d = a.numberActives - 1; !a.isLeaf; ) {
            for (; d >= 0 && this.comparator(b, a.keys[d].key) === -1; )
                d--;
            d++;
            var i = this._diskRead(a.children[d]);
            i.numberActives === 2 * this.order - 1 && (this._splitChild(a, d, i),
            this.comparator(b, a.keys[d].key) === 1 && d++);
            a = this._diskRead(a.children[d]);
            d = a.numberActives - 1
        }
        for (; d >= 0 && this.comparator(b, a.keys[d].key) === -1; )
            a.keys[d + 1] = a.keys[d],
            d--;
        a.keys[d + 1] = {
            key: b,
            data: e
        };
        a.numberActives++;
        this._diskWrite(a)
    }
    ;
    E.Tree.prototype["delete"] = function(a) {
        for (var b = this.root, e = null, d = !0, i = null, h = null, f = null, g = !0; g === !0; ) {
            for (g = !1; d === !0; ) {
                n = 0;
                if (b.numberActives === 0)
                    return !1;
                for (; n < b.numberActives && this.comparator(a, b.keys[n].key) === 1; )
                    n++;
                i = n;
                n < b.numberActives && this.comparator(a, b.keys[n].key) === 0 && (d = !1);
                if (d === !0) {
                    if (b.isLeaf === !0)
                        return !1;
                    e = b;
                    b = this._diskRead(b.children[n]);
                    if (b === null)
                        return !1;
                    i === e.numberActives ? (h = this._diskRead(e.children[i - 1]),
                    f = null) : i === 0 ? (h = null,
                    f = this._diskRead(e.children[1])) : (h = this._diskRead(e.children[i - 1]),
                    f = this._diskRead(e.children[i + 1]));
                    b.numberActives === this.order - 1 && e != null && (f != null && f.numberActives > this.order - 1 ? this._moveKey(e, n, -1) : h != null && h.numberActives > this.order - 1 ? this._moveKey(e, n, 1) : h != null && h.numberActives === this.order - 1 ? b = this._mergeSiblings(e, n, -1) : f != null && f.numberActives === this.order - 1 && (b = this._mergeSiblings(e, n, 1)))
                }
            }
            if (b.isLeaf && b.numberActives > this.order - 1)
                return this._deleteKeyFromNode(b, i),
                !0;
            if (b.isLeaf && b === this.root)
                return this._deleteKeyFromNode(b, i),
                !0;
            if (b.isLeaf === !1)
                if (e = n = null,
                (n = this._diskRead(b.children[i])).numberActives > this.order - 1)
                    a = this._getMaxKeyPos(n),
                    a = a.node.keys[a.index],
                    b.keys[i] = a,
                    this._diskWrite(b),
                    b = n,
                    a = a.key,
                    d = g = !0;
                else if ((n = this._diskRead(b.children[i + 1])).numberActives > this.order - 1)
                    a = this._getMinKeyPos(n),
                    a = a.node.keys[a.index],
                    b.keys[i] = a,
                    this._diskWrite(b),
                    b = n,
                    a = a.key,
                    d = g = !0;
                else if ((n = this._diskRead(b.children[i])).numberActives === this.order - 1 && (e = this._diskRead(b.children[i + 1])).numberActives === this.order - 1) {
                    d = this._mergeNodes(n, b.keys[i], e);
                    b.children[i] = d;
                    i++;
                    for (var n = i; n < b.numberActives; n++)
                        b.children[n] = b.children[n + 1],
                        b.keys[n - 1] = b.keys[n];
                    b.children[n] = null;
                    b.keys[n - 1] = null;
                    b.numberActives--;
                    if (b.numberActives === 0 && this.root === b)
                        this.root = d;
                    this._diskWrite(b);
                    b = d;
                    d = g = !0
                }
            b.isLeaf && b.numberActives > this.order - 1 && d === !1 && this._deleteKeyFromNode(b, i);
            if (g === !1)
                return !0
        }
    }
    ;
    E.Tree.prototype._moveKey = function(a, b, e) {
        e === 1 && b--;
        var d = this._diskRead(a.children[b])
          , i = this._diskRead(a.children[b + 1]);
        if (e == -1) {
            d.keys[d.numberActives] = a.keys[b];
            d.children[d.numberActives + 1] = i.children[0];
            i.children[0] = null;
            d.numberActives++;
            a.keys[b] = i.keys[0];
            for (e = 1; e < i.numberActives; e++)
                i.keys[e - 1] = i.keys[e],
                i.children[e - 1] = i.children[e];
            i.children[i.numberActives - 1] = i.children[i.numberActives];
            i.numberActives--
        } else {
            i.children[i.numberActives + 1] = i.children[i.numberActives];
            for (e = i.numberActives; e > 0; e--)
                i.children[e] = i.children[e - 1],
                i.keys[e] = i.keys[e - 1];
            i.keys[0] = null;
            i.children[0] = null;
            i.children[0] = d.children[d.numberActives];
            i.keys[0] = a.keys[b];
            i.numberActives++;
            d.children[d.numberActives] = null;
            a.keys[b] = d.keys[d.numberActives - 1];
            d.keys[d.numberActives - 1] = null;
            d.numberActives--
        }
        this._diskWrite(d);
        this._diskWrite(i);
        this._diskWrite(a)
    }
    ;
    E.Tree.prototype._mergeSiblings = function(a, b) {
        var e, d, i;
        b === a.numberActives ? (b--,
        d = this._diskRead(a.children[a.numberActives - 1]),
        i = this._diskRead(a.children[a.numberActives])) : (d = this._diskRead(a.children[b]),
        i = this._diskRead(a.children[b + 1]));
        var h = this._allocateNode();
        h.isLeaf = d.isLeaf;
        h.level = d.level;
        for (e = 0; e < this.order - 1; e++)
            h.keys[e] = d.keys[e],
            h.children[e] = d.children[e];
        h.keys[this.order - 1] = a.keys[b];
        h.children[this.order - 1] = d.children[this.order - 1];
        for (e = 0; e < this.order - 1; e++)
            h.keys[e + this.order] = i.keys[e],
            h.children[e + this.order] = i.children[e];
        h.children[2 * this.order - 1] = i.children[this.order - 1];
        a.children[b] = h;
        for (e = b; e < a.numberActives; e++)
            a.keys[e] = a.keys[e + 1],
            a.children[e + 1] = a.children[e + 2];
        h.numberActives = d.numberActives + i.numberActives + 1;
        a.numberActives--;
        for (e = a.numberActives; e < 2 * this.order - 1; e++)
            a.keys[e] = null;
        if (a.numberActives === 0 && this.root === a)
            this.root = h,
            h.isLeaf = h.level ? !1 : !0;
        this._diskWrite(h);
        this.root === h && this._updateRootNode(this.root);
        this._diskWrite(a);
        this._diskDelete(d);
        this._diskDelete(i);
        return h
    }
    ;
    E.Tree.prototype._deleteKeyFromNode = function(a, b) {
        var e = 2 * this.order - 1;
        if (a.numberActives < e)
            e = a.numberActives;
        var d;
        if (a.isLeaf === !1)
            return !1;
        for (d = b; d < e - 1; d++)
            a.keys[d] = a.keys[d + 1];
        a.keys.pop();
        a.numberActives--;
        this._diskWrite(a);
        return !0
    }
    ;
    E.Tree.prototype._mergeNodes = function(a, b, e) {
        var d, i;
        d = this._allocateNode();
        d.isLeaf = !0;
        for (i = 0; i < a.numberActives; i++)
            d.keys[i] = a.keys[i],
            d.children[i] = a.children[i];
        d.children[a.numberActives] = a.children[a.numberActives];
        d.keys[a.numberActives] = b;
        for (i = 0; i < e.numberActives; i++)
            d.keys[i + a.numberActives + 1] = e.keys[i],
            d.children[i + a.numberActives + 1] = e.children[i];
        d.children[2 * this.order - 1] = e.children[e.numberActives];
        d.numberActives = a.numberActives + e.numberActives + 1;
        d.isLeaf = a.isLeaf;
        d.level = a.level;
        this._diskWrite(d);
        return d
    }
    ;
    E.Tree.prototype.audit = function(a) {
        var b = []
          , e = []
          , d = this
          , i = function(i) {
            for (var h = 0; h < e.length; h++)
                if (d.comparator(e[h], i) === 0) {
                    var g = " !!! duplicated key " + i;
                    a === !0 && console.log(g);
                    b.push(g)
                }
        }
          , h = null
          , d = this;
        this.walkNodes(function(f) {
            a === !0 && (console.log("--- Node at " + f.level + " level"),
            console.log(" - leaf? " + f.isLeaf),
            console.log(" - num actives? " + f.numberActives),
            console.log(" - keys: "));
            for (var g = f.numberActives; g < f.keys.length; g++)
                f.keys[g] != null && a === !0 && (console.log(" * warning : redundant key data"),
                b.push(" * warning : redundant key data"));
            for (g = f.numberActives + 1; g < f.children.length; g++)
                f.children[g] != null && a === !0 && (console.log(" * warning : redundant children data"),
                b.push(" * warning : redundant key data"));
            if (f.isLeaf === !1)
                for (g = 0; g < f.numberActives; g++) {
                    var n = d._diskRead(f.children[g]).keys[d._diskRead(f.children[g]).numberActives - 1].key
                      , q = d._diskRead(f.children[g + 1]).keys[0].key;
                    a === !0 && console.log("   " + f.keys[g].key + "(" + n + "," + q + ")");
                    if (d.comparator(f.keys[g].key, n) === -1) {
                        var o = " !!! value max left " + n + " > key " + f.keys[g].key;
                        a === !0 && console.log(o);
                        b.push(o)
                    }
                    d.comparator(f.keys[g].key, q) === 1 && (o = " !!! value min right " + q + " < key " + f.keys[g].key,
                    a === !0 && console.log(o),
                    b.push(o));
                    i(f.keys[g].key);
                    e.push(f.keys[g].key)
                }
            else {
                h === null ? h = f.level : h != f.level && (o = " !!! Leaf node with wrong level value",
                a === !0 && console.log(o),
                b.push(o));
                for (g = 0; g < f.numberActives; g++)
                    a === !0 && console.log(" " + f.keys[g].key),
                    i(f.keys[g].key),
                    e.push(f.keys[g].key)
            }
            f != d.root && (f.numberActives > 2 * d.order - 1 && (a === !0 && (o = " !!!! MAX num keys restriction violated "),
            console.log(o),
            b.push(o)),
            f.numberActives < d.order - 1 && (a === !0 && (o = " !!!! MIN num keys restriction violated "),
            console.log(o),
            b.push(o)))
        });
        return b
    }
    ;
    E.Tree.prototype._getMaxKeyPos = function(a) {
        for (var b = {}; ; ) {
            if (a === null)
                break;
            if (a.isLeaf === !0) {
                b.node = a;
                b.index = a.numberActives - 1;
                break
            } else
                b.node = a,
                b.index = a.numberActives - 1,
                a = this._diskRead(a.children[a.numberActives])
        }
        return b
    }
    ;
    E.Tree.prototype._getMinKeyPos = function(a) {
        for (var b = {}; ; ) {
            if (a === null)
                break;
            if (a.isLeaf === !0) {
                b.node = a;
                b.index = 0;
                break
            } else
                b.node = a,
                b.index = 0,
                a = this._diskRead(a.children[0])
        }
        return b
    }
    ;
    E.Node = function() {
        this.numberActives = 0;
        this.isLeaf = null;
        this.keys = [];
        this.children = [];
        this.level = 0
    }
    ;
    var U = {
        NodeKey: function(a, b) {
            this.subject = a.subject;
            this.predicate = a.predicate;
            this.object = a.object;
            this.graph = a.graph;
            this.order = b
        }
    };
    U.NodeKey.prototype.comparator = function(a) {
        for (var b = 0; b < this.order.length; b++) {
            var e = this.order[b];
            if (a[e] == null)
                break;
            else if (this[e] < a[e])
                return -1;
            else if (this[e] > a[e])
                return 1
        }
        return 0
    }
    ;
    U.Pattern = function(a) {
        this.subject = a.subject;
        this.predicate = a.predicate;
        this.object = a.object;
        this.graph = a.graph;
        this.indexKey = [];
        this.keyComponents = {};
        for (var b = [], e = [], a = ["subject", "predicate", "object", "graph"], d = 0; d < a.length; d++)
            typeof this[a[d]] === "string" ? (e.push(a[d]),
            this.keyComponents[a[d]] = null) : (b.push(a[d]),
            this.keyComponents[a[d]] = this[a[d]],
            this.indexKey.push(a[d]));
        this.order = b.concat(e);
        this.key = new U.NodeKey(this.keyComponents,this.order)
    }
    ;
    var V = {
        Tree: function(a, b) {
            if (arguments != 0)
                this.componentOrder = a.componentOrder,
                E.Tree.call(this, a.order, a.name, a.persistent, a.cacheMaxSize),
                this.comparator = function(a, b) {
                    for (var i = 0; i < this.componentOrder.length; i++) {
                        var h = this.componentOrder[i]
                          , f = a[h]
                          , h = b[h];
                        if (f < h)
                            return -1;
                        else if (f > h)
                            return 1
                    }
                    return 0
                }
                ,
                this.rangeComparator = function(a, b) {
                    for (var i = 0; i < this.componentOrder.length; i++) {
                        var h = this.componentOrder[i];
                        if (b[h] == null || a[h] == null)
                            break;
                        else if (a[h] < b[h])
                            return -1;
                        else if (a[h] > b[h])
                            return 1
                    }
                    return 0
                }
                ,
                b != null && b(this)
        }
    };
    s["extends"](E.Tree, V.Tree);
    V.Tree.prototype.insert = function(a, b) {
        E.Tree.prototype.insert.call(this, a, null);
        b && b(!0);
        return !0
    }
    ;
    V.Tree.prototype.search = function(a, b) {
        var e = E.Tree.prototype.search.call(this, a, !0);
        b && b(e);
        return e
    }
    ;
    V.Tree.prototype.range = function(a, b) {
        var e = null
          , e = typeof this.root === "string" ? this._rangeTraverse(this, this._diskRead(this.root), a) : this._rangeTraverse(this, this.root, a);
        b && b(e);
        return e
    }
    ;
    V.Tree.prototype._rangeTraverse = function(a, b, e) {
        for (var e = e.key, d = [], i = [b], h; i.length > 0; ) {
            b = i.shift();
            for (h = 0; h < b.numberActives && a.rangeComparator(b.keys[h].key, e) === -1; )
                h++;
            if (b.isLeaf === !0)
                for (; h < b.numberActives && a.rangeComparator(b.keys[h].key, e) === 0; )
                    d.push(b.keys[h].key),
                    h++;
            else {
                var f = a._diskRead(b.children[h]);
                for (i.push(f); ; )
                    if (h < b.numberActives && a.rangeComparator(b.keys[h].key, e) === 0)
                        d.push(b.keys[h].key),
                        h++,
                        f = a._diskRead(b.children[h]),
                        i.push(f);
                    else
                        break
            }
        }
        return d
    }
    ;
    var W = {
        QuadBackend: function(a, b) {
            if (arguments != 0) {
                this.indexMap = {};
                this.treeOrder = a.treeOrder;
                this.indices = ["SPOG", "GP", "OGS", "POG", "GSP", "OS"];
                this.componentOrders = {
                    SPOG: ["subject", "predicate", "object", "graph"],
                    GP: ["graph", "predicate", "subject", "object"],
                    OGS: ["object", "graph", "subject", "predicate"],
                    POG: ["predicate", "object", "graph", "subject"],
                    GSP: ["graph", "subject", "predicate", "object"],
                    OS: ["object", "subject", "predicate", "graph"]
                };
                for (var e = 0; e < this.indices.length; e++) {
                    var d = this.indices[e];
                    this.indexMap[d] = new V.Tree({
                        order: this.treeOrder,
                        componentOrder: this.componentOrders[d],
                        persistent: a.persistent,
                        name: (a.name || "") + d,
                        cacheMaxSize: a.cacheMaxSize
                    })
                }
                b && b(this)
            }
        }
    };
    W.QuadBackend.prototype.clear = function() {
        for (var a = 0; a < this.indices.length; a++)
            this.indexMap[this.indices[a]].clear()
    }
    ;
    W.QuadBackend.prototype._indexForPattern = function(a) {
        for (var a = a.indexKey, b = this.indices, e = 0; e < b.length; e++)
            for (var d = b[e], i = this.componentOrders[d], h = 0; h < i.length; h++) {
                if (s.include(a, i[h]) === !1)
                    break;
                if (h == a.length - 1)
                    return d
            }
        return "SPOG"
    }
    ;
    W.QuadBackend.prototype.index = function(a, b) {
        for (var e = 0; e < this.indices.length; e++)
            this.indexMap[this.indices[e]].insert(a);
        b && b(!0);
        return !0
    }
    ;
    W.QuadBackend.prototype.range = function(a, b) {
        var e = this.indexMap[this._indexForPattern(a)].range(a);
        b && b(e);
        return e
    }
    ;
    W.QuadBackend.prototype.search = function(a, b) {
        var e = this.indexMap[this.indices[0]].search(a);
        b && b(e != null);
        return e != null
    }
    ;
    W.QuadBackend.prototype["delete"] = function(a, b) {
        for (var e, d = 0; d < this.indices.length; d++)
            e = this.indices[d],
            e = this.indexMap[e],
            e["delete"](a);
        b && b(!0);
        return !0
    }
    ;
    var I = {
        Lexicon: function(a) {
            this.uriToOID = {};
            this.OIDToUri = {};
            this.literalToOID = {};
            this.OIDToLiteral = {};
            this.blankToOID = {};
            this.OIDToBlank = {};
            this.defaultGraphOid = 0;
            this.defaultGraphUri = "https://github.com/antoniogarrote/rdfstore-js#default_graph";
            this.defaultGraphUriTerm = {
                token: "uri",
                prefix: null,
                suffix: null,
                value: this.defaultGraphUri,
                oid: this.defaultGraphOid
            };
            this.oidCounter = 1;
            this.knownGraphs = {};
            a != null && a(this)
        }
    };
    I.Lexicon.prototype.registerGraph = function(a) {
        a != this.defaultGraphOid && (this.knownGraphs[a] = !0);
        return !0
    }
    ;
    I.Lexicon.prototype.registeredGraphs = function(a) {
        var b = [], e;
        for (e in this.knownGraphs)
            a === !0 ? b.push(this.OIDToUri["u" + e]) : b.push(e);
        return b
    }
    ;
    I.Lexicon.prototype.registerUri = function(a) {
        if (a === this.defaultGraphUri)
            return this.defaultGraphOid;
        else {
            if (this.uriToOID[a] == null) {
                var b = this.oidCounter;
                this.oidCounter++;
                this.uriToOID[a] = [b, 0];
                this.OIDToUri["u" + b] = a
            } else {
                var e = this.uriToOID[a]
                  , b = e[0];
                this.uriToOID[a] = [b, e[1] + 1]
            }
            return b
        }
    }
    ;
    I.Lexicon.prototype.resolveUri = function(a) {
        return a === this.defaultGraphUri ? this.defaultGraphOid : (a = this.uriToOID[a],
        a != null ? a[0] : -1)
    }
    ;
    I.Lexicon.prototype.resolveUriCost = function(a) {
        return a === this.defaultGraphUri ? this.defaultGraphOid : (a = this.uriToOID[a],
        a != null ? a[1] : -1)
    }
    ;
    I.Lexicon.prototype.registerBlank = function() {
        var a = this.oidCounter;
        this.oidCounter++;
        a = "" + a;
        this.OIDToBlank[a] = !0;
        return a
    }
    ;
    I.Lexicon.prototype.resolveBlank = function() {
        var a = this.oidCounter;
        this.oidCounter++;
        return "" + a
    }
    ;
    I.Lexicon.prototype.resolveBlankCost = function() {
        return 0
    }
    ;
    I.Lexicon.prototype.registerLiteral = function(a) {
        if (this.literalToOID[a] == null) {
            var b = this.oidCounter;
            this.oidCounter++;
            this.literalToOID[a] = [b, 0];
            this.OIDToLiteral["l" + b] = a
        } else {
            var e = this.literalToOID[a]
              , b = e[0];
            this.literalToOID[a] = [b, e[1] + 1]
        }
        return b
    }
    ;
    I.Lexicon.prototype.resolveLiteral = function(a) {
        a = this.literalToOID[a];
        return a != null ? a[0] : -1
    }
    ;
    I.Lexicon.prototype.resolveLiteralCost = function(a) {
        a = this.literalToOID[a];
        return a != null ? a[1] : 0
    }
    ;
    I.Lexicon.prototype.parseLiteral = function(a) {
        var b = a.lastIndexOf("@");
        if (b != -1 && a[b - 1] === '"' && a.substring(b, a.length).match(/^@[a-zA-Z\-]+$/g) != null) {
            var e = a.substring(1, b - 1)
              , a = a.substring(b + 1, a.length);
            return {
                token: "literal",
                value: e,
                lang: a
            }
        }
        b = a.lastIndexOf("^^");
        if (b != -1 && a[b - 1] === '"' && a[b + 2] === "<" && a[a.length - 1] === ">")
            return e = a.substring(1, b - 1),
            a = a.substring(b + 3, a.length - 1),
            {
                token: "literal",
                value: e,
                type: a
            };
        e = a.substring(1, a.length - 1);
        return {
            token: "literal",
            value: e
        }
    }
    ;
    I.Lexicon.prototype.parseUri = function(a) {
        return {
            token: "uri",
            value: a
        }
    }
    ;
    I.Lexicon.prototype.retrieve = function(a) {
        try {
            if (a === this.defaultGraphOid)
                return {
                    token: "uri",
                    value: this.defaultGraphUri,
                    prefix: null,
                    suffix: null,
                    defaultGraph: !0
                };
            else {
                var b = this.OIDToUri["u" + a];
                if (b != null)
                    return this.parseUri(b);
                else {
                    var e = this.OIDToLiteral["l" + a];
                    if (e != null)
                        return this.parseLiteral(e);
                    else if (this.OIDToBlank["" + a] != null)
                        return {
                            token: "blank",
                            value: "_:" + a
                        };
                    else
                        throw "Null value for OID";
                }
            }
        } catch (d) {
            throw console.log("error in lexicon retrieving OID:"),
            console.log(a),
            d.message || d.stack ? (d.message && console.log(d.message),
            d.stack && console.log(d.stack)) : console.log(d),
            Error("Unknown retrieving OID in lexicon:" + a);
        }
    }
    ;
    I.Lexicon.prototype.clear = function() {
        this.uriToOID = {};
        this.OIDToUri = {};
        this.literalToOID = {};
        this.OIDToLiteral = {};
        this.blankToOID = {};
        this.OIDToBlank = {}
    }
    ;
    I.Lexicon.prototype.unregister = function(a, b) {
        try {
            return this.unregisterTerm(a.subject.token, b.subject),
            this.unregisterTerm(a.predicate.token, b.predicate),
            this.unregisterTerm(a.object.token, b.object),
            a.graph != null && this.unregisterTerm(a.graph.token, b.graph),
            !0
        } catch (e) {
            return console.log("Error unregistering quad"),
            console.log(e.message),
            !1
        }
    }
    ;
    I.Lexicon.prototype.unregisterTerm = function(a, b) {
        if (a === "uri") {
            if (b != this.defaultGraphOid) {
                var e = "u" + b
                  , d = this.OIDToUri[e]
                  , i = this.uriToOID[d]
                  , h = i[1];
                if ("" + i[0] === "" + b)
                    h === 0 ? (delete this.OIDToUri[e],
                    delete this.uriToOID[d],
                    delete this.knownGraphs[b]) : this.uriToOID[d] = [b, h - 1];
                else
                    throw "Not matching OID : " + b + " vs " + i[0];
            }
        } else if (a === "literal")
            if (this.oidCounter++,
            e = "l" + b,
            d = this.OIDToLiteral[e],
            i = this.literalToOID[d],
            h = i[1],
            "" + i[0] === "" + b)
                h === 0 ? (delete this.OIDToLiteral[e],
                delete this.literalToOID[d]) : this.literalToOID[d] = [b, h - 1];
            else
                throw "Not matching OID : " + b + " vs " + i[0];
        else
            a === "blank" && delete this.OIDToBlank["" + b]
    }
    ;
    var Q = {};
    Q.load = function(a, b, e) {
        jQuery.ajax({
            url: a,
            headers: {
                Accept: b
            },
            success: function(a, b, h) {
                if (("" + h.status)[0] == "2") {
                    for (var b = h.getAllResponseHeaders().split("\n"), h = {}, f = 0; f < b.length; f++) {
                        var g = b[f].split(":");
                        h[g[0]] = g[1]
                    }
                    e(!0, {
                        headers: h,
                        data: a
                    })
                }
            },
            error: function(a) {
                ("" + a.status)[0] == "3" ? redirection == 0 ? e(!1, 500) : (a = a.getAllResponseHeaders().Location || a.getAllResponseHeaders().location,
                a != null ? Q.load(a, b, e, redirection - 1) : e(!1, 500)) : e(!1, a.statusCode())
            }
        })
    }
    ;
    var xa = null;
    (function() {
        var a = function(a, e) {
            a.stack = "";
            for (var b in e)
                a[b] = e[b]
        };
        if (typeof window !== "undefined") {
            var b = window.jsonld = window.jsonld || {};
            Exception = function(e) {
                a(this, e)
            }
            ;
            if (!Object.keys)
                Object.keys = function(a) {
                    if (a !== Object(a))
                        throw new TypeError("Object.keys called on non-object");
                    var e = [], b;
                    for (b in a)
                        Object.prototype.hasOwnProperty.call(a, b) && e.push(b);
                    return e
                }
                ;
            if (!Array.prototype.filter)
                Array.prototype.filter = function(a, e) {
                    if (this == null)
                        throw new TypeError;
                    var b = Object(this)
                      , i = b.length >>> 0;
                    if (typeof a != "function")
                        throw new TypeError;
                    for (var d = [], f = 0; f < i; f++)
                        if (f in b) {
                            var h = b[f];
                            a.call(e, h, f, b) && d.push(h)
                        }
                    return d
                }
        } else
            typeof module !== "undefined" && module.exports && (b = {},
            Exception = function(e) {
                a(this, e);
                this.stack = Error().stack
            }
            );
        xa = b;
        var e = {
            rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
            rdfs: "http://www.w3.org/2000/01/rdf-schema#",
            owl: "http://www.w3.org/2002/07/owl#",
            xsd: "http://www.w3.org/2001/XMLSchema#",
            dcterms: "http://purl.org/dc/terms/",
            foaf: "http://xmlns.com/foaf/0.1/",
            cal: "http://www.w3.org/2002/12/cal/ical#",
            vcard: "http://www.w3.org/2006/vcard/ns# ",
            geo: "http://www.w3.org/2003/01/geo/wgs84_pos#",
            cc: "http://creativecommons.org/ns#",
            sioc: "http://rdfs.org/sioc/ns#",
            doap: "http://usefulinc.com/ns/doap#",
            com: "http://purl.org/commerce#",
            ps: "http://purl.org/payswarm#",
            gr: "http://purl.org/goodrelations/v1#",
            sig: "http://purl.org/signature#",
            ccard: "http://purl.org/commerce/creditcard#"
        }
          , d = {
            xsd: "http://www.w3.org/2001/XMLSchema#"
        }
          , i = {
            "boolean": d.xsd + "boolean",
            "double": d.xsd + "double",
            integer: d.xsd + "integer"
        }
          , h = function(a, e, b) {
            e in a ? a[e].constructor === Array ? a[e].push(b) : a[e] = [a[e], b] : a[e] = b
        }
          , f = function(a) {
            var e;
            if (a.constructor === Object) {
                e = {};
                var b = Object.keys(a).sort(), i;
                for (i in b) {
                    var d = b[i];
                    e[d] = f(a[d])
                }
            } else if (a.constructor === Array)
                for (i in e = [],
                a)
                    e[i] = f(a[i]);
            else
                e = a;
            return e
        }
          , g = function(a) {
            var e = {
                "@id": "@id",
                "@language": "@language",
                "@literal": "@literal",
                "@type": "@type"
            };
            if (a) {
                var b = {}, i;
                for (i in a)
                    a[i].constructor === String && a[i]in e && (b[a[i]] = i);
                for (i in b)
                    e[i] = b[i]
            }
            return e
        }
          , n = function(a, e) {
            var b = null;
            e in a && (a[e].constructor === String ? b = a[e] : a[e].constructor === Object && "@id"in a[e] && (b = a[e]["@id"]));
            return b
        }
          , q = function(a, e, b) {
            var i = null, d;
            for (d in a)
                if (d.length > 0 && d[0] !== "@" && e === n(a, d)) {
                    i = d;
                    b !== null && (b[d] = f(a[d]));
                    break
                }
            i === null && e === "@type" && (i = g(a)["@type"]);
            if (i === null)
                for (d in a)
                    if (d.length > 0 && d[0] !== "@") {
                        var h = n(a, d);
                        if (h !== null && e.indexOf(h) === 0 && e.length > h.length) {
                            i = d + ":" + e.substr(h.length);
                            b !== null && (b[d] = f(a[d]));
                            break
                        }
                    }
            i === null && (i = e);
            return i
        }
          , o = function(a, e, b) {
            var i = e
              , d = g(a)
              , h = e.indexOf(":");
            if (h !== -1)
                d = e.substr(0, h),
                d in a && (i = n(a, d) + e.substr(h + 1),
                b !== null && (b[d] = f(a[d])));
            else if (e in a)
                i = n(a, e),
                b !== null && (b[e] = f(a[e]));
            else
                for (var o in d)
                    if (e === d[o]) {
                        i = o;
                        break
                    }
            return i
        }
          , r = function(a) {
            var e = !1;
            a !== null && a.constructor === Object && !("@literal"in a) && (e = Object.keys(a).length > 1 || !("@id"in a));
            return e
        };
        b.normalize = function(a) {
            return (new B).normalize(a)
        }
        ;
        b.expand = function(a) {
            return (new B).expand({}, null, a)
        }
        ;
        b.compact = function(a, e) {
            var i = null;
            if (e !== null) {
                var e = b.expand(e), d;
                e.constructor === Array ? (i = [],
                d = e) : d = [e];
                a.constructor === Array && (a = b.mergeContexts({}, a));
                for (var h in d) {
                    var g = {}
                      , m = (new B).compact(f(a), null, d[h], g);
                    if (Object.keys(g).length > 0) {
                        var o = g
                          , g = {}
                          , n = Object.keys(o).sort()
                          , q = void 0;
                        for (q in n) {
                            var r = n[q];
                            g[r] = o[r]
                        }
                        o = Object.keys(m);
                        o.sort();
                        o.unshift("@context");
                        m["@context"] = g;
                        var g = {}, s;
                        for (s in o)
                            n = o[s],
                            g[n] = m[n];
                        m = g
                    }
                    i === null ? i = m : i.push(m)
                }
            }
            return i
        }
        ;
        b.mergeContexts = function(a, e) {
            a.constructor === Array && (a = b.mergeContexts({}, a));
            var i = f(a);
            if (e.constructor === Array)
                for (var d in e)
                    i = b.mergeContexts(i, e[d]);
            else {
                for (var h in e)
                    if (h.indexOf("@") !== 0)
                        for (var g in i)
                            if (i[g] === e[h]) {
                                delete i[g];
                                break
                            }
                for (h in e)
                    i[h] = f(e[h])
            }
            return i
        }
        ;
        b.expandTerm = o;
        b.compactIri = function(a, e) {
            return q(a, e, null)
        }
        ;
        b.frame = function(a, e, b) {
            return (new B).frame(a, e, b)
        }
        ;
        b.toTriples = function(a, e, i) {
            var d = null
              , a = b.normalize(a)
              , i = i || null;
            i === null && (d = [],
            i = function(a, b, i) {
                d.push({
                    subject: s.lexicalFormTerm(a),
                    predicate: s.lexicalFormTerm(b),
                    object: s.lexicalFormTerm(i),
                    graph: e
                })
            }
            );
            var f = !1, h;
            for (h in a) {
                var g = a[h], m = g["@id"], m = m[0] == "_" ? {
                    token: "blank",
                    value: m.split(":")[1]
                } : {
                    token: "uri",
                    value: m
                }, o;
                for (o in g)
                    if (o !== "@id") {
                        var n = g[o];
                        n.constructor !== Array && (n = [n]);
                        for (var q in n)
                            if (f = n[q],
                            o === "@type" || o === "http://www.w3.org/1999/02/22-rdf-syntax-ns#type" ? (o = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
                            f = {
                                token: "uri",
                                value: f
                            }) : typeof f === "string" ? f = {
                                token: "literal",
                                value: f
                            } : f["@id"] != null ? f = f["@id"][0] == "_" ? {
                                token: "blank",
                                value: f["@id"].split(":")[1]
                            } : {
                                token: "uri",
                                value: f["@id"]
                            } : f["@type"] != null ? f = {
                                token: "literal",
                                value: f["@literal"],
                                type: f["@type"]
                            } : f["@language"] != null && (f = {
                                token: "literal",
                                value: f["@literal"],
                                lang: f["@language"]
                            }),
                            f = i(m, {
                                token: "uri",
                                value: o
                            }, f) === !1)
                                break;
                        if (f)
                            break
                    }
                if (f)
                    break
            }
            return d
        }
        ;
        b.resolve = function(a, e, b) {
            var i = {}
              , d = function(a, e) {
                if (a.constructor === Array)
                    for (var b in a)
                        d(a[b]);
                else if (a.constructor === Object)
                    for (var f in a)
                        if (f === "@context")
                            if (a[f].constructor === Array) {
                                var h = a[f];
                                for (b in h)
                                    h[b].constructor === String && (e ? h[b] = i[h[b]] : i[h[b]] = {})
                            } else
                                a[f].constructor === String && (e ? a[f] = i[a[f]] : i[a[f]] = {})
            };
            d(a, !1);
            var f = Object.keys(i).length
              , h = null;
            if (f === 0)
                b(a, h);
            else
                for (var g in i)
                    e(g, function(e, m) {
                        --f;
                        if (e === null)
                            h = h || [],
                            h.push({
                                url: g,
                                error: m
                            });
                        else
                            try {
                                i[g] = e.constructor === String ? JSON.parse(e)["@context"] : e["@context"]
                            } catch (o) {
                                h = h || [],
                                h.push({
                                    url: g,
                                    error: o
                                })
                            }
                        f === 0 && (h === null && d(a, !0),
                        b(a, h))
                    })
        }
        ;
        var B = function() {};
        B.prototype.compact = function(a, e, b, d) {
            var h, o = g(a);
            if (b === null)
                h = null,
                this.getCoerceType(a, e, d);
            else if (b.constructor === Array) {
                h = [];
                for (var n in b)
                    h.push(this.compact(a, e, b[n], d))
            } else if (b.constructor === Object && "@id"in b && b["@id"].constructor === Array)
                h = {},
                h[o["@id"]] = this.compact(a, e, b["@id"], d);
            else if (r(b)) {
                h = {};
                for (var s in b)
                    if (b[s] !== "@context" && (o = q(a, s, d),
                    o !== s || !(o in h)))
                        h[o] = this.compact(a, s, b[s], d)
            } else {
                e = this.getCoerceType(a, e, d);
                n = null;
                b.constructor === Object ? "@language"in b || (n = "@type"in b ? b["@type"] : "@id"in b ? "@id" : e) : b.constructor === String && (n = e);
                if (e === null && (n === i["boolean"] || n === i.integer || n === i["double"]))
                    e = n;
                if (e !== null)
                    if (n === null)
                        throw {
                            message: "Cannot coerce type when a language is specified. The language information would be lost."
                        };
                    else if (n !== e)
                        throw new Exception({
                            message: "Cannot coerce type because the type does not match.",
                            type: n,
                            expected: e
                        });
                    else
                        b.constructor === Object ? "@id"in b ? h = b["@id"] : "@literal"in b && (h = b["@literal"]) : h = b,
                        e === i["boolean"] ? h = h === "true" || h != 0 : e === i["double"] ? h = parseFloat(h) : e === i.integer && (h = parseInt(h));
                else if (b.constructor === Object)
                    for (s in h = {},
                    b)
                        h[o[s]] = b[s];
                else
                    h = f(b);
                n === "@id" && (h.constructor === Object ? h[o["@id"]] = q(a, h[o["@id"]], d) : h = q(a, h, d))
            }
            return h
        }
        ;
        B.prototype.expand = function(a, e, d) {
            var n;
            if (d === null)
                n = null;
            else if (e === null && d.constructor === String)
                n = o(a, d, null);
            else if (d.constructor === Array) {
                n = [];
                for (var q in d)
                    n.push(this.expand(a, e, d[q]))
            } else if (d.constructor === Object) {
                "@context"in d && (a = b.mergeContexts(a, d["@context"]));
                n = {};
                for (var r in d)
                    r === "@embed" || r === "@explicit" || r === "@default" || r === "@omitDefault" ? h(n, r, f(d[r])) : r !== "@context" && h(n, o(a, r, null), this.expand(a, r, d[r]))
            } else {
                q = this.getCoerceType(a, e, null);
                n = g(a);
                if (q === null && (d.constructor === Number || d.constructor === Boolean))
                    q = d.constructor === Boolean ? i["boolean"] : ("" + d).indexOf(".") == -1 ? i.integer : i["double"];
                e === n["@id"] || e === n["@type"] ? n = o(a, d, null) : q !== null ? (n = {},
                q === "@id" ? n["@id"] = o(a, d, null) : (n["@type"] = q,
                q === i["double"] && (d = d.toExponential(6).replace(/(e(?:\+|-))([0-9])$/, "$10$2")),
                n["@literal"] = "" + d)) : n = "" + d
            }
            return n
        }
        ;
        B.prototype.normalize = function(a) {
            var b = [];
            if (a !== null) {
                this.ng = {
                    tmp: null,
                    c14n: null
                };
                var i = this.expand(e, null, a);
                this.nameBlankNodes(i);
                a = {};
                Ga(null, null, i, a);
                for (var d in a) {
                    var i = a[d], f = {}, h = Object.keys(i).sort(), g;
                    for (g in h) {
                        var m = h[g];
                        f[m] = i[m]
                    }
                    b.push(f)
                }
                this.canonicalizeBlankNodes(b);
                b.sort(function(a, e) {
                    return t(a["@id"], e["@id"])
                })
            }
            return b
        }
        ;
        B.prototype.getCoerceType = function(a, e, b) {
            var i = null
              , e = o(a, e, null);
            e === "@id" || e === "@type" ? i = "@id" : (e = q(a, e, null),
            e in a && a[e].constructor === Object && "@type"in a[e] && (i = o(a, a[e]["@type"], b),
            b !== null && (b[e] = f(a[e]))));
            return i
        }
        ;
        var x = function(a) {
            return a.indexOf("_:") === 0
        }
          , z = function(a) {
            return a.constructor === Object && "@id"in a && x(a["@id"])
        }
          , t = function(a, e) {
            var b = 0;
            if (a.constructor === Array && e.constructor === Array)
                for (var i = 0; i < a.length && b === 0; ++i)
                    b = t(a[i], e[i]);
            else
                b = a < e ? -1 : a > e ? 1 : 0;
            return b
        }
          , C = function(a, e, b) {
            var i = 0;
            b in a ? i = b in e ? t(a[b], e[b]) : -1 : b in e && (i = 1);
            return i
        }
          , A = function(a, e) {
            var b = 0;
            a.constructor === String ? b = e.constructor !== String ? -1 : t(a, e) : e.constructor === String ? b = 1 : (b = C(a, e, "@literal"),
            b === 0 && ("@literal"in a ? (b = C(a, e, "@type"),
            b === 0 && (b = C(a, e, "@language"))) : b = t(a["@id"], e["@id"])));
            return b
        }
          , D = function(a, e) {
            var b = 0, i;
            for (i in a)
                if (i !== "@id") {
                    b = t(a[i].constructor === Array ? a[i].length : 1, e[i].constructor === Array ? e[i].length : 1);
                    if (b === 0) {
                        var d = a[i]
                          , f = e[i];
                        d.constructor !== Array && (d = [d],
                        f = [f]);
                        d = d.filter(function(a) {
                            return !z(a)
                        });
                        f = f.filter(function(a) {
                            return !z(a)
                        });
                        b = t(d.length, f.length)
                    }
                    if (b === 0) {
                        d.sort(A);
                        f.sort(A);
                        for (var h = 0; h < d.length && b === 0; ++h)
                            b = A(d[h], f[h])
                    }
                    if (b !== 0)
                        break
                }
            return b
        }
          , E = function(a) {
            var e = -1
              , b = {
                next: function() {
                    ++e;
                    return b.current()
                },
                current: function() {
                    return "_:" + a + e
                },
                inNamespace: function(e) {
                    return e.indexOf("_:" + a) === 0
                }
            };
            return b
        }
          , K = function(a, e, b) {
            if (a !== null)
                if (a.constructor === Array)
                    for (var i in a)
                        K(a[i], e, b);
                else if (a.constructor === Object) {
                    "@id"in a ? a["@id"].constructor == Array ? K(a["@id"], e, b) : r(a) && (e[a["@id"]] = a) : r(a) && (!("@id"in a) || z(a)) && b.push(a);
                    for (var d in a)
                        K(a[d], e, b)
                }
        }
          , Ga = function(a, e, b, i) {
            var d = null;
            if (b !== null)
                if (b.constructor === Array)
                    for (var h in b)
                        Ga(a, e, b[h], i);
                else if (b.constructor === Object)
                    if ("@literal"in b || e === "@type")
                        d = f(b);
                    else if (b["@id"].constructor === Array) {
                        if (a !== null)
                            throw {
                                message: "Embedded graph literals cannot be flattened."
                            };
                        for (var g in b["@id"])
                            Ga(a, e, b["@id"][g], i)
                    } else {
                        b["@id"]in i ? h = i[b["@id"]] : (h = {
                            "@id": b["@id"]
                        },
                        i[b["@id"]] = h);
                        var d = {
                            "@id": h["@id"]
                        }, m;
                        for (m in b)
                            g = b[m],
                            g !== null && m !== "@id" && (m in h ? h[m].constructor !== Array && (h[m] = [h[m]]) : h[m] = [],
                            Ga(h[m], m, g, i),
                            h[m].length === 1 && (h[m] = h[m][0]))
                    }
                else
                    d = b;
            d !== null && a !== null && (a.constructor === Array ? (e = !1,
            d.constructor === Object && "@id"in d && (e = a.filter(function(a) {
                return a.constructor === Object && "@id"in a && a["@id"] === d["@id"]
            }).length > 0),
            e || a.push(d)) : a[e] = d)
        };
        B.prototype.nameBlankNodes = function(a) {
            var e = this.ng.tmp = E("tmp")
              , b = {}
              , i = [];
            K(a, b, i);
            for (var d in i)
                if (a = i[d],
                !("@id"in a)) {
                    for (; e.next()in b; )
                        ;
                    a["@id"] = e.current();
                    b[e.current()] = a
                }
        }
        ;
        B.prototype.renameBlankNode = function(a, e) {
            var b = a["@id"];
            a["@id"] = e;
            var i = this.subjects;
            i[e] = i[b];
            delete i[b];
            this.edges.refs[e] = this.edges.refs[b];
            this.edges.props[e] = this.edges.props[b];
            delete this.edges.refs[b];
            delete this.edges.props[b];
            var d = this.edges.refs[e].all, f;
            for (f in d) {
                var h = d[f].s;
                h === b && (h = e);
                var g = i[h], m = this.edges.props[h].all, n;
                for (n in m)
                    if (m[n].s === b) {
                        m[n].s = e;
                        var h = m[n].p, h = g[h].constructor === Object ? [g[h]] : g[h].constructor === Array ? g[h] : [], o;
                        for (o in h)
                            h[o].constructor === Object && "@id"in h[o] && h[o]["@id"] === b && (h[o]["@id"] = e)
                    }
            }
            m = this.edges.props[e].all;
            for (f in m) {
                var h = m[f].s, d = this.edges.refs[h].all, q;
                for (q in d)
                    if (d[q].s === b)
                        d[q].s = e
            }
        }
        ;
        B.prototype.canonicalizeBlankNodes = function(a) {
            this.renamed = {};
            this.mappings = {};
            this.serializations = {};
            var e = this.edges = {
                refs: {},
                props: {}
            }, b = this.subjects = {}, i = [], d;
            for (d in a) {
                var f = a[d]["@id"];
                b[f] = a[d];
                e.refs[f] = {
                    all: [],
                    bnodes: []
                };
                e.props[f] = {
                    all: [],
                    bnodes: []
                };
                x(f) && i.push(a[d])
            }
            this.collectEdges();
            var a = this.ng.c14n = E("c14n")
              , h = this.ng.tmp;
            for (d in i) {
                var g = i[d]
                  , f = g["@id"];
                if (a.inNamespace(f)) {
                    for (; h.next()in b; )
                        ;
                    this.renameBlankNode(g, h.current());
                    f = g["@id"]
                }
                this.serializations[f] = {
                    props: null,
                    refs: null
                }
            }
            for (var h = !0, m = this; i.length > 0; ) {
                h && (h = !1,
                i.sort(function(a, e) {
                    return m.deepCompareBlankNodes(a, e)
                }));
                var g = i.shift(), f = g["@id"], g = ["props", "refs"], n;
                for (n in g) {
                    var o = g[n];
                    if (this.serializations[f][o] === null) {
                        var q = {};
                        q[f] = "s1"
                    } else
                        q = this.serializations[f][o].m;
                    var r = Object.keys(q);
                    r.sort(function(a, e) {
                        return t(q[a], q[e])
                    });
                    var s = [];
                    for (d in r) {
                        var B = r[d];
                        !a.inNamespace(f) && B in b && (this.renameBlankNode(b[B], a.next()),
                        s.push(B))
                    }
                    r = i;
                    i = [];
                    for (d in r) {
                        var B = r[d]
                          , Z = B["@id"];
                        if (!a.inNamespace(Z)) {
                            for (var z in s)
                                this.markSerializationDirty(Z, s[z], o) && (h = !0);
                            i.push(B)
                        }
                    }
                }
            }
            for (var C in e.props)
                if (e.props[C].bnodes.length > 0) {
                    var g = b[C], D;
                    for (D in g)
                        D.indexOf("@") !== 0 && g[D].constructor === Array && g[D].sort(A)
                }
        }
        ;
        MappingBuilder = function() {
            this.count = 1;
            this.processed = {};
            this.mapping = {};
            this.adj = {};
            this.keyStack = [{
                keys: ["s1"],
                idx: 0
            }];
            this.done = {};
            this.s = ""
        }
        ;
        MappingBuilder.prototype.copy = function() {
            var a = new MappingBuilder;
            a.count = this.count;
            a.processed = f(this.processed);
            a.mapping = f(this.mapping);
            a.adj = f(this.adj);
            a.keyStack = f(this.keyStack);
            a.done = f(this.done);
            a.s = this.s;
            return a
        }
        ;
        MappingBuilder.prototype.mapNode = function(a) {
            a in this.mapping || (this.mapping[a] = a.indexOf("_:c14n") === 0 ? "c" + a.substr(6) : "s" + this.count++);
            return this.mapping[a]
        }
        ;
        MappingBuilder.prototype.serialize = function(a, e) {
            if (this.keyStack.length > 0)
                for (var b = this.keyStack.pop(); b.idx < b.keys.length; ++b.idx) {
                    var i = b.keys[b.idx];
                    if (!(i in this.adj)) {
                        this.keyStack.push(b);
                        break
                    }
                    if (i in this.done)
                        this.s += "_" + i;
                    else {
                        this.done[i] = !0;
                        var d = i
                          , i = this.adj[i]
                          , f = i.i;
                        if (f in a) {
                            var h = a[f]
                              , g = ""
                              , m = !0
                              , n = void 0;
                            for (n in h)
                                if (n !== "@id") {
                                    m ? m = !1 : g += "|";
                                    g += "<" + n + ">";
                                    var o = h[n].constructor === Array ? h[n] : [h[n]], q;
                                    for (q in o) {
                                        var r = o[q];
                                        r.constructor === Object ? "@id"in r ? g += x(r["@id"]) ? "_:" : "<" + r["@id"] + ">" : (g += '"' + r["@literal"] + '"',
                                        "@type"in r ? g += "^^<" + r["@type"] + ">" : "@language"in r && (g += "@" + r["@language"])) : g += '"' + r + '"'
                                    }
                                }
                            d += "[" + g + "]";
                            h = !0;
                            d += "[";
                            var f = e.refs[f].all, s;
                            for (s in f)
                                h ? h = !1 : d += "|",
                                d += "<" + f[s].p + ">",
                                d += x(f[s].s) ? "_:" : "<" + f[s].s + ">";
                            d += "]"
                        }
                        d += i.k.join("");
                        this.s += d;
                        this.keyStack.push({
                            keys: i.k,
                            idx: 0
                        });
                        this.serialize(a, e)
                    }
                }
        }
        ;
        B.prototype.markSerializationDirty = function(a, e, b) {
            var i = !1
              , a = this.serializations[a];
            a[b] !== null && e in a[b].m && (a[b] = null,
            i = !0);
            return i
        }
        ;
        var F = function(a, e) {
            var b = 0;
            return b = a.length == e.length ? t(a, e) : a.length > e.length ? t(a.substr(0, e.length), e) : t(a, e.substr(0, a.length))
        };
        B.prototype.serializeCombos = function(a, e, b, i, d, h, g) {
            if (g.length > 0) {
                h = f(h);
                h[i.mapNode(g[0].s)] = g[0].s;
                for (var m = i.copy(), g = g.slice(1), n = Math.max(1, g.length), o = 0; o < n; ++o) {
                    var q = o === 0 ? i : m.copy();
                    this.serializeCombos(a, e, b, q, d, h, g);
                    g.unshift.apply(g, g.splice(1, g.length))
                }
            } else if (g = Object.keys(h).sort(),
            i.adj[b] = {
                i: e,
                k: g,
                m: h
            },
            i.serialize(this.subjects, this.edges),
            a[d] === null || F(i.s, a[d].s) <= 0) {
                for (m in g)
                    this.serializeBlankNode(a, h[g[m]], i, d);
                i.serialize(this.subjects, this.edges);
                if (a[d] === null || F(i.s, a[d].s) <= 0 && i.s.length >= a[d].s.length)
                    a[d] = {
                        s: i.s,
                        m: i.mapping
                    }
            }
        }
        ;
        B.prototype.serializeBlankNode = function(a, e, b, i) {
            if (!(e in b.processed)) {
                b.processed[e] = !0;
                var d = b.mapNode(e), f = b.copy(), h = this.edges[i][e].bnodes, g = {}, m = [], n;
                for (n in h)
                    h[n].s in b.mapping ? g[b.mapping[h[n].s]] = h[n].s : m.push(h[n]);
                h = Math.max(1, m.length);
                for (n = 0; n < h; ++n) {
                    var o = n === 0 ? b : f.copy();
                    this.serializeCombos(a, e, d, o, i, g, m)
                }
            }
        }
        ;
        B.prototype.deepCompareBlankNodes = function(a, e) {
            var b = 0
              , i = a["@id"]
              , d = e["@id"];
            if (i === d)
                b = 0;
            else if (b = this.shallowCompareBlankNodes(a, e),
            b === 0)
                for (var h = ["props", "refs"], g = 0; b === 0 && g < h.length; ++g) {
                    var b = h[g]
                      , m = this.serializations[i]
                      , n = this.serializations[d];
                    if (m[b] === null) {
                        var o = new MappingBuilder;
                        if (b === "refs")
                            o.mapping = f(m.props.m),
                            o.count = Object.keys(o.mapping).length + 1;
                        this.serializeBlankNode(m, i, o, b)
                    }
                    if (n[b] === null) {
                        o = new MappingBuilder;
                        if (b === "refs")
                            o.mapping = f(n.props.m),
                            o.count = Object.keys(o.mapping).length + 1;
                        this.serializeBlankNode(n, d, o, b)
                    }
                    b = t(m[b].s, n[b].s)
                }
            return b
        }
        ;
        B.prototype.shallowCompareBlankNodes = function(a, e) {
            var b = 0
              , i = Object.keys(a)
              , d = Object.keys(e)
              , b = t(i.length, d.length);
            b === 0 && (b = t(i.sort(), d.sort()));
            b === 0 && (b = D(a, e));
            if (b === 0)
                var f = this.edges.refs[a["@id"]].all
                  , h = this.edges.refs[e["@id"]].all
                  , b = t(f.length, h.length);
            if (b === 0)
                for (i = 0; i < f.length && b === 0; ++i)
                    b = this.compareEdges(f[i], h[i]);
            return b
        }
        ;
        B.prototype.compareEdges = function(a, e) {
            var b = 0
              , i = x(a.s)
              , d = x(e.s)
              , f = this.ng.c14n;
            i != d ? b = i ? 1 : -1 : (i || (b = t(a.s, e.s)),
            b === 0 && (b = t(a.p, e.p)),
            b === 0 && f !== null && (i = f.inNamespace(a.s),
            f = f.inNamespace(e.s),
            i != f ? b = i ? 1 : -1 : i && (b = t(a.s, e.s))));
            return b
        }
        ;
        B.prototype.collectEdges = function() {
            var a = this.edges.refs, e = this.edges.props, b;
            for (b in this.subjects) {
                var i = this.subjects[b], d;
                for (d in i)
                    if (d !== "@id") {
                        var f = i[d], f = f.constructor !== Array ? [f] : f, h;
                        for (h in f) {
                            var g = f[h];
                            g.constructor === Object && "@id"in g && g["@id"]in this.subjects && (g = g["@id"],
                            a[g].all.push({
                                s: b,
                                p: d
                            }),
                            e[b].all.push({
                                s: g,
                                p: d
                            }))
                        }
                    }
            }
            var m = this;
            for (b in a)
                a[b].all.sort(function(a, e) {
                    return m.compareEdges(a, e)
                }),
                a[b].bnodes = a[b].all.filter(function(a) {
                    return x(a.s)
                });
            for (b in e)
                e[b].all.sort(function(a, e) {
                    return m.compareEdges(a, e)
                }),
                e[b].bnodes = e[b].all.filter(function(a) {
                    return x(a.s)
                })
        }
        ;
        var I = function(a, e) {
            var b = !1;
            if (!("@type"in e)) {
                var i = Object.keys(e).filter(function(a) {
                    return a.indexOf("@") !== 0
                });
                if (i.length === 0)
                    b = !0;
                else if (a.constructor === Object && "@id"in a) {
                    var b = !0, d;
                    for (d in i)
                        if (!(i[d]in a)) {
                            b = !1;
                            break
                        }
                }
            }
            return b
        }
          , L = function(a, e, b, i, d, f, h, g) {
            var m = e["@id"]
              , n = m in i ? i[m] : null;
            if (("@embed"in b && b["@embed"] || !("@embed"in b) && g.defaults.embedOn) && (n === null || n.autoembed && !d)) {
                if (n === null)
                    n = {},
                    i[m] = n;
                else if (n.parent !== null) {
                    if (n.parent[n.key].constructor === Array) {
                        var o = n.parent[n.key], q;
                        for (q in o)
                            if (o[q].constructor === Object && "@id"in o[q] && o[q]["@id"] === m) {
                                o[q] = {
                                    "@id": e["@id"]
                                };
                                break
                            }
                    } else
                        n.parent[n.key] = {
                            "@id": e["@id"]
                        };
                    var r = function(a) {
                        var e = Object.keys(i), b;
                        for (b in e)
                            b = e[b],
                            b in i && i[b].parent !== null && i[b].parent["@id"] === a && (delete i[b],
                            r(b))
                    };
                    r(m)
                }
                n.autoembed = d;
                n.parent = f;
                n.key = h;
                if (b["@explicit"] === !0 || g.defaults.explicitOn)
                    for (s in e)
                        s !== "@id" && !(s in b) && delete e[s];
                d = Object.keys(e);
                for (q in d) {
                    var s = d[q];
                    if (s.indexOf("@") !== 0) {
                        s in b ? (f = b[s],
                        h = !1) : (f = e[s].constructor === Array ? [] : {},
                        h = !0);
                        var m = e[s], m = m.constructor === Array ? m : [m], B;
                        for (B in m)
                            m[B].constructor === Object && "@id"in m[B] && m[B]["@id"]in a && (m[B] = a[m[B]["@id"]]);
                        e[s] = Q(a, m, f, i, h, e, s, g)
                    }
                }
                for (s in b)
                    if (s.indexOf("@") !== 0 && (!(s in e) || e[s] === null))
                        f = b[s],
                        f.constructor === Array ? e[s] = [] : (f.constructor === Array && (f = f.length > 0 ? f[0] : {}),
                        f["@omitDefault"] === !0 || g.defaults.omitDefaultOn || (e[s] = "@default"in f ? f["@default"] : null))
            } else
                e = {
                    "@id": e["@id"]
                };
            return e
        }
          , Q = function(a, e, b, i, d, f, h, g) {
            var m = null, n = -1, o;
            b.constructor === Array ? (m = [],
            o = b,
            o.length === 0 && o.push({})) : (o = [b],
            n = 1);
            for (var q = [], s = 0; s < o.length && n !== 0; ++s) {
                b = o[s];
                if (b.constructor !== Object)
                    throw {
                        message: "Invalid JSON-LD frame. Frame must be an object or an array.",
                        frame: b
                    };
                q[s] = [];
                for (var B = 0; B < e.length && n !== 0; ++B) {
                    var x = e[B]
                      , t = !1
                      , z = "@type";
                    if ("@type"in b && x.constructor === Object && z in x)
                        for (var C = x[z].constructor === Array ? x[z] : [x[z]], D = b[z].constructor === Array ? b[z] : [b[z]], A = 0; A < D.length && !t; ++A) {
                            var z = D[A], ub;
                            for (ub in C)
                                if (C[ub] === z) {
                                    t = !0;
                                    break
                                }
                        }
                    if (t || I(x, b))
                        q[s].push(x),
                        --n
                }
            }
            for (var E in q)
                for (var qc in q[E])
                    b = o[E],
                    e = q[E][qc],
                    r(e) && (e = L(a, e, b, i, d, f, h, g)),
                    m === null ? m = e : (b = e !== null && e.constructor === Object && "@id"in e && Object.keys(e).length === 1 && e["@id"]in i,
                    f === null && b || m.push(e));
            return m
        };
        B.prototype.frame = function(a, e, i) {
            var a = b.normalize(a)
              , d = null;
            if ("@context"in e)
                d = f(e["@context"]),
                e = b.expand(e);
            else if (e.constructor === Array) {
                e.length > 0 && "@context"in e[0] && (d = f(e[0]["@context"]));
                var i = [], h;
                for (h in e)
                    i.push(b.expand(e[h]));
                e = i
            }
            var i = {
                defaults: {
                    embedOn: !0,
                    explicitOn: !1,
                    omitDefaultOn: !1
                }
            }
              , g = {};
            for (h in a)
                g[a[h]["@id"]] = a[h];
            a = Q(g, a, e, {}, !1, null, null, i);
            d !== null && a !== null && (a = b.compact(d, a));
            return a
        }
    }
    )();
    var na = {
        parser: {}
    };
    na.parser.parse = function(a, b) {
        typeof a === "string" && (a = JSON.parse(a));
        return xa.toTriples(a, b)
    }
    ;
    var va = {
        _explicituri: /^<((?:[^\x00-\x20<>\\"\{\}\|\^\`]|\\[uU])*)>/,
        _string: /^"[^"\\]*(?:\\.[^"\\]*)*"(?=[^"\\])|^'[^'\\]*(?:\\.[^'\\]*)*'(?=[^'\\])/,
        _tripleQuotedString: /^""("[^"\\]*(?:(?:\\.|"(?!""))[^"\\]*)*")""|^''('[^'\\]*(?:(?:\\.|'(?!''))[^'\\]*)*')''/,
        _langcode: /^@([a-z]+(?:-[a-z0-9]+)*)(?=[^a-z0-9\-])/i,
        _prefix: /^((?:[A-Za-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:[\.\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)?:(?=\s)/,
        _qname: /^((?:[A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:[\.\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)?:((?:(?:[0-:A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~])(?:(?:[\.\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~])*(?:[\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~]))?)?)(?=[\s\.;,)])/,
        _number: /^[\-+]?(?:\d+\.?\d*([eE](?:[\-\+])?\d+)|\d+\.\d+|\.\d+|\d+)(?=\s*[\s\.;,)])/,
        _boolean: /^(?:true|false)(?=\s+)/,
        _punctuation: /^\.(?!\d)|^;|^,|^\[|^\]|^\(|^\)/,
        _fastString: /^"[^"\\]+"(?=[^"\\])/,
        _keyword: /^(?:@[a-z]+|[Pp][Rr][Ee][Ff][Ii][Xx]|[Bb][Aa][Ss][Ee])(?=\s)/,
        _type: /^\^\^(?:<([^>]*)>|([A-Z_a-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c-\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd][\-0-9A-Z_a-z\u00b7\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u037d\u037f-\u1fff\u200c-\u200d\u203f-\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]*)?:([A-Z_a-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c-\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd][\-0-9A-Z_a-z\u00b7\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u037d\u037f-\u1fff\u200c-\u200d\u203f-\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]*)(?=[\s\.;,)]))/,
        _shortPredicates: /^a(?=\s+|<)/,
        _newline: /^[ \t]*(?:#[^\n\r]*)?(?:\r\n|\n|\r)[ \t]*/,
        _whitespace: /^[ \t]+|^#[^\n\r]*/,
        _nonwhitespace: /^\S*/
    }
      , gb = /\\u([a-fA-F0-9]{4})|\\U([a-fA-F0-9]{8})|\\[uU]|\\(.)/g
      , hb = {
        "\\": "\\",
        "'": "'",
        '"': '"',
        n: "\n",
        r: "\r",
        t: "\t",
        f: "\u000c",
        b: "\u0008",
        _: "_",
        "~": "~",
        ".": ".",
        "-": "-",
        "!": "!",
        $: "$",
        "&": "&",
        "(": "(",
        ")": ")",
        "*": "*",
        "+": "+",
        ",": ",",
        ";": ";",
        "=": "=",
        "/": "/",
        "?": "?",
        "#": "#",
        "@": "@",
        "%": "%"
    }
      , ib = /[\x00-\x20<>\\"\{\}\|\^\`]/
      , rc = {
        ".": "dot",
        ";": "semicolon",
        ",": "comma",
        "[": "bracketopen",
        "]": "bracketclose",
        "(": "liststart",
        ")": "listend"
    }
      , sc = {
        a: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
    };
    ia.prototype = {
        constructor: ia,
        _next: function(a) {
            function b(b) {
                e = b._nonwhitespace.exec(b._input);
                delete b._input;
                a('Syntax error: unexpected "' + e[0] + '" on line ' + b._line + ".");
                return !1
            }
            if (this._input === void 0)
                return !1;
            for (var e; e = this._newline.exec(this._input); )
                this._line++,
                this._input = this._input.substr(e[0].length);
            if (e = this._whitespace.exec(this._input))
                this._input = this._input.substr(e[0].length);
            var d = {
                line: this._line,
                type: "",
                value: "",
                prefix: ""
            }, i;
            if (!this._input.length) {
                if (!this._inputComplete)
                    return !1;
                delete this._input;
                d.type = "eof";
                a(null, d);
                return !0
            }
            if (e = this._explicituri.exec(this._input)) {
                i = this._unescape(e[1]);
                if (i === null || ib.test(i))
                    return b(this);
                d.type = "explicituri";
                d.value = i
            } else if (e = this._punctuation.exec(this._input))
                d.type = rc[e[0]];
            else if (this._prevTokenType === "literal" && (e = this._langcode.exec(this._input)))
                d.type = "langcode",
                d.value = e[1];
            else if (e = this._fastString.exec(this._input))
                d.type = "literal",
                d.value = e[0];
            else if (e = this._string.exec(this._input)) {
                i = this._unescape(e[0]);
                if (i === null)
                    return b(this);
                d.type = "literal";
                d.value = i.replace(/^'|'$/g, '"')
            } else if (e = this._tripleQuotedString.exec(this._input)) {
                i = e[1] || e[2];
                this._line += i.split(/\r\n|\r|\n/).length - 1;
                i = this._unescape(i);
                if (i === null)
                    return b(this);
                d.type = "literal";
                d.value = i.replace(/^'|'$/g, '"')
            } else if (e = this._number.exec(this._input))
                d.type = "literal",
                d.value = '"' + e[0] + '"^^<http://www.w3.org/2001/XMLSchema#' + (e[1] ? "double>" : /^[+\-]?\d+$/.test(e[0]) ? "integer>" : "decimal>");
            else if (e = this._boolean.exec(this._input))
                d.type = "literal",
                d.value = '"' + e[0] + '"^^<http://www.w3.org/2001/XMLSchema#boolean>';
            else if (this._prevTokenType === "literal" && (e = this._type.exec(this._input)))
                d.type = "type",
                e[2] ? (d.prefix = e[2],
                d.value = e[3]) : d.value = e[1];
            else if (e = this._keyword.exec(this._input))
                i = e[0],
                d.type = i[0] === "@" ? i : i.toUpperCase();
            else if ((this._prevTokenType === "@prefix" || this._prevTokenType === "PREFIX") && (e = this._prefix.exec(this._input)))
                d.type = "prefix",
                d.value = e[1] || "";
            else if (e = this._qname.exec(this._input)) {
                i = this._unescape(e[2]);
                if (i === null)
                    return b(this);
                d.type = "qname";
                d.prefix = e[1] || "";
                d.value = i
            } else if (e = this._shortPredicates.exec(this._input))
                d.type = "abbreviation",
                d.value = sc[e[0]];
            else
                return this._inputComplete && b(this),
                !1;
            this._prevTokenType = d.type;
            this._input = this._input.substr(e[0].length);
            a(null, d);
            return !0
        },
        _unescape: function(a) {
            try {
                return a.replace(gb, function(a, b, i, h) {
                    if (b) {
                        a = parseInt(b, 16);
                        if (isNaN(a))
                            throw "invalid character code";
                        return String.fromCharCode(a)
                    } else if (i) {
                        a = parseInt(i, 16);
                        if (isNaN(a))
                            throw "invalid character code";
                        return a < 65535 ? String.fromCharCode(a) : String.fromCharCode(Math.floor((a - 65536) / 1024) + 55296) + String.fromCharCode((a - 65536) % 1024 + 56320)
                    } else {
                        a = hb[h];
                        if (!a)
                            throw "invalid escape sequence";
                        return a
                    }
                })
            } catch (b) {
                return null
            }
        },
        tokenize: function(a, b) {
            var e = this;
            this._line = 1;
            typeof a === "string" ? (this._input = a,
            this._inputComplete = !0,
            process.nextTick(function() {
                for (; e._next(b); )
                    ;
            })) : (this._input = "",
            this._inputComplete = !1,
            a.setEncoding("utf8"),
            a.on("data", function(a) {
                for (e._input += a; e._next(b); )
                    ;
            }),
            a.on("end", function() {
                for (e._inputComplete = !0; e._next(b); )
                    ;
            }))
        }
    };
    var X = {
        token: "uri",
        value: "http://www.w3.org/1999/02/22-rdf-syntax-ns#nil",
        prefix: null,
        suffix: null
    }
      , oa = {
        token: "uri",
        value: "http://www.w3.org/1999/02/22-rdf-syntax-ns#first",
        prefix: null,
        suffix: null
    }
      , tc = {
        token: "uri",
        value: "http://www.w3.org/1999/02/22-rdf-syntax-ns#rest",
        prefix: null,
        suffix: null
    }
      , ga = /^[a-z]+:/
      , ha = /^#/
      , wa = /[^\/]*$/;
    L.prototype = {
        defaultGraph: null,
        constructor: L,
        _readInTopContext: function(a) {
            switch (a.type) {
            case "eof":
                return this._callback(null, null);
            case "@prefix":
                return this._sparqlStyle = !1,
                this._readPrefix;
            case "PREFIX":
                return this._sparqlStyle = !0,
                this._readPrefix;
            case "@base":
                return this._sparqlStyle = !1,
                this._readBaseURI;
            case "BASE":
                return this._sparqlStyle = !0,
                this._readBaseURI;
            default:
                return this._readSubject(a)
            }
        },
        _readSubject: function(a) {
            switch (a.type) {
            case "explicituri":
                this._subject = this._baseURI === null || ga.test(a.value) ? {
                    token: "uri",
                    value: a.value,
                    prefix: null,
                    suffix: null
                } : {
                    token: "uri",
                    value: (ha.test(a.value) ? this._baseURI : this._baseURIRoot) + a.value,
                    prefix: null,
                    suffix: null
                };
                break;
            case "qname":
                if (a.prefix === "_")
                    this._subject = this._blankNodes[a.value] !== void 0 ? {
                        blank: this._blankNodes[a.value]
                    } : {
                        blank: this._blankNodes[a.value] = "_:" + this._blankNodeCount++
                    };
                else {
                    var b = this._prefixes[a.prefix];
                    if (b === void 0)
                        return this._error('Undefined prefix "' + a.prefix + ':"', a);
                    this._subject = {
                        token: "uri",
                        value: b + a.value,
                        prefix: null,
                        suffix: null
                    }
                }
                break;
            case "bracketopen":
                return this._subject = {
                    blank: "_:" + this._blankNodeCount++
                },
                this._tripleStack.push({
                    subject: this._subject,
                    predicate: null,
                    object: null,
                    type: "blank"
                }),
                this._readBlankNodeHead;
            case "liststart":
                return this._tripleStack.push({
                    subject: X,
                    predicate: null,
                    object: null,
                    type: "list"
                }),
                this._subject = null,
                this._readListItem;
            default:
                return this._error('Unexpected token type "' + a.type, a)
            }
            this._subjectHasPredicate = !1;
            return this._readPredicate
        },
        _readPredicate: function(a) {
            switch (a.type) {
            case "explicituri":
            case "abbreviation":
                this._predicate = this._baseURI === null || ga.test(a.value) ? {
                    token: "uri",
                    value: a.value,
                    prefix: null,
                    suffix: null
                } : {
                    token: "uri",
                    value: (ha.test(a.value) ? this._baseURI : this._baseURIRoot) + a.value,
                    prefix: null,
                    suffix: null
                };
                break;
            case "qname":
                if (a.prefix === "_")
                    return this._error("Disallowed blank node as predicate", a);
                else {
                    var b = this._prefixes[a.prefix];
                    if (b === void 0)
                        return this._error('Undefined prefix "' + a.prefix + ':"', a);
                    this._predicate = {
                        token: "uri",
                        value: b + a.value,
                        prefix: null,
                        suffix: null
                    }
                }
                break;
            case "bracketclose":
                return this._readBlankNodeTail(a, !0);
            case "dot":
                return !this._subjectHasPredicate ? this._error("Unexpected dot", a) : this._readPunctuation(a, !0);
            case "semicolon":
                return this._readPredicate;
            default:
                return this._error('Expected predicate to follow "' + this._subject + '"', a)
            }
            this._subjectHasPredicate = !0;
            return this._readObject
        },
        _readObject: function(a) {
            switch (a.type) {
            case "explicituri":
                this._object = this._baseURI === null || ga.test(a.value) ? {
                    token: "uri",
                    value: a.value,
                    prefix: null,
                    suffix: null
                } : {
                    token: "uri",
                    value: (ha.test(a.value) ? this._baseURI : this._baseURIRoot) + a.value,
                    prefix: null,
                    suffix: null
                };
                break;
            case "qname":
                if (a.prefix === "_")
                    this._object = this._blankNodes[a.value] !== void 0 ? {
                        blank: this._blankNodes[a.value]
                    } : {
                        blank: this._blankNodes[a.value] = "_:" + this._blankNodeCount++
                    };
                else {
                    var b = this._prefixes[a.prefix];
                    if (b === void 0)
                        return this._error('Undefined prefix "' + a.prefix + ':"', a);
                    this._object = {
                        token: "uri",
                        value: b + a.value,
                        prefix: null,
                        suffix: null
                    }
                }
                break;
            case "literal":
                return this._object = {
                    literal: a.value
                },
                this._readDataTypeOrLang;
            case "bracketopen":
                return a = {
                    blank: "_:" + this._blankNodeCount++
                },
                this._tripleStack.push({
                    subject: this._subject,
                    predicate: this._predicate,
                    object: a,
                    type: "blank"
                }),
                this._subject = a,
                this._readBlankNodeHead;
            case "liststart":
                return this._tripleStack.push({
                    subject: this._subject,
                    predicate: this._predicate,
                    object: X,
                    type: "list"
                }),
                this._subject = null,
                this._readListItem;
            default:
                return this._error('Expected object to follow "' + this._predicate + '"', a)
            }
            return this._getNextReader()
        },
        _readBlankNodeHead: function(a) {
            return a.type === "bracketclose" ? this._readBlankNodeTail(a, !0) : this._readPredicate(a)
        },
        _readBlankNodeTail: function(a, b) {
            if (a.type !== "bracketclose")
                return this._readPunctuation(a);
            b !== !0 && this._callback(null, {
                subject: this._subject,
                predicate: this._predicate,
                object: this._object,
                graph: L.prototype.defaultGraph
            });
            var e = this._tripleStack.pop();
            this._subject = e.subject;
            return e.object !== null ? (this._predicate = e.predicate,
            this._object = e.object,
            this._getNextReader()) : this._readPredicate
        },
        _readDataTypeOrLang: function(a) {
            switch (a.type) {
            case "type":
                if (a.prefix === "")
                    a = a.value;
                else {
                    var b = this._prefixes[a.prefix];
                    if (b === void 0)
                        return this._error('Undefined prefix "' + a.prefix + ':"', a);
                    a = b + a.value
                }
                this._object.literal ? this._object.literal += "^^<" + a + ">" : (this._object += "^^<" + a + ">",
                this._object = {
                    literal: this._object
                });
                return this._readPunctuation;
            case "langcode":
                return this._object.literal ? this._object.literal += "@" + a.value.toLowerCase() : (this._object += "@" + a.value.toLowerCase(),
                this._object = {
                    literal: this._object
                }),
                this._getNextReader();
            default:
                return this._getNextReader().call(this, a)
            }
        },
        _readListItem: function(a) {
            var b = null
              , e = null
              , d = this._subject
              , i = this._tripleStack
              , h = i[i.length - 1]
              , f = this._readListItem;
            switch (a.type) {
            case "explicituri":
                b = {
                    token: "uri",
                    value: a.value,
                    prefix: null,
                    suffix: null
                };
                break;
            case "qname":
                if (a.prefix === "_")
                    b = this._blankNodes[a.value] || (this._blankNodes[a.value] = {
                        blank: "_:" + this._blankNodeCount++
                    });
                else {
                    b = this._prefixes[a.prefix];
                    if (b === void 0)
                        return this._error('Undefined prefix "' + a.prefix + ':"', a);
                    b = {
                        token: "uri",
                        value: b + a.value,
                        prefix: null,
                        suffix: null
                    }
                }
                break;
            case "literal":
                b = {
                    literal: a.value
                };
                f = this._readDataTypeOrLang;
                break;
            case "bracketopen":
                e = {
                    blank: "_:" + this._blankNodeCount++
                };
                b = {
                    blank: "_:" + this._blankNodeCount++
                };
                i.push({
                    subject: e,
                    predicate: oa,
                    object: b,
                    type: "blank"
                });
                this._subject = b;
                f = this._readBlankNodeHead;
                break;
            case "liststart":
                e = {
                    blank: "_:" + this._blankNodeCount++
                };
                i.push({
                    subject: e,
                    predicate: oa,
                    object: X,
                    type: "list"
                });
                this._subject = null;
                f = this._readListItem;
                break;
            case "listend":
                i.pop();
                i.length !== 0 && i[i.length - 1].type === "list" && this._callback(null, {
                    subject: h.subject,
                    predicate: h.predicate,
                    object: h.object,
                    graph: L.prototype.defaultGraph
                });
                this._subject = typeof h.subject === "string" ? {
                    token: "uri",
                    value: h.subject,
                    prefix: null,
                    suffix: null
                } : h.subject;
                if (h.predicate === null) {
                    if (f = this._readPredicate,
                    h.subject === X)
                        return f
                } else if (this._predicate = typeof h.predicate === "string" ? {
                    token: "uri",
                    value: h.predicate,
                    prefix: null,
                    suffix: null
                } : h.predicate,
                this._object = typeof h.object === "string" ? {
                    token: "uri",
                    value: h.object,
                    prefix: null,
                    suffix: null
                } : h.object,
                f = this._getNextReader(),
                h.object === X)
                    return f;
                e = X;
                break;
            default:
                return this._error('Expected list item instead of "' + a.type + '"', a)
            }
            if (e === null)
                this._subject = e = {
                    blank: "_:" + this._blankNodeCount++
                };
            d === null ? h.object === X ? h.object = e : h.subject = e : this._callback(null, {
                subject: d,
                predicate: tc,
                object: e,
                graph: L.prototype.defaultGraph
            });
            b !== null && this._callback(null, {
                subject: e,
                predicate: oa,
                object: b,
                graph: L.prototype.defaultGraph
            });
            return f
        },
        _readPunctuation: function(a, b) {
            var e;
            switch (a.type) {
            case "dot":
                e = this._readInTopContext;
                break;
            case "semicolon":
                e = this._readPredicate;
                break;
            case "comma":
                e = this._readObject;
                break;
            default:
                return this._error('Expected punctuation to follow "' + this._object + '"', a)
            }
            b || this._callback(null, {
                subject: this._subject,
                predicate: this._predicate,
                object: this._object,
                graph: L.prototype.defaultGraph
            });
            return e
        },
        _readPrefix: function(a) {
            if (a.type !== "prefix")
                return this._error("Expected prefix to follow @prefix", a);
            this._prefix = a.value;
            return this._readPrefixURI
        },
        _readPrefixURI: function(a) {
            if (a.type !== "explicituri")
                return this._error('Expected explicituri to follow prefix "' + this.prefix + '"', a);
            this._prefixes[this._prefix] = this._baseURI === null || ga.test(a.value) ? a.value : (ha.test(a.value) ? this._baseURI : this._baseURIRoot) + a.value;
            return this._readDeclarationPunctuation
        },
        _readBaseURI: function(a) {
            if (a.type !== "explicituri")
                return this._error("Expected explicituri to follow base declaration", a);
            this._baseURI = this._baseURI === null || ga.test(a.value) ? a.value : (ha.test(a.value) ? this._baseURI : this._baseURIRoot) + a.value;
            this._baseURIRoot = this._baseURI.replace(wa, "");
            return this._readDeclarationPunctuation
        },
        _readDeclarationPunctuation: function(a) {
            return this._sparqlStyle ? this._readInTopContext(a) : a.type !== "dot" ? this._error("Expected declaration to end with a dot", a) : this._readInTopContext
        },
        _getNextReader: function() {
            var a = this._tripleStack;
            if (a.length === 0)
                return this._readPunctuation;
            switch (a[a.length - 1].type) {
            case "blank":
                return this._readBlankNodeTail;
            case "list":
                return this._readListItem
            }
        },
        _error: function(a, b) {
            this._callback(a + " at line " + b.line + ".")
        },
        parse: function(a, b) {
            var e = this;
            this._prefixes = Object.create(null);
            this._callback = b;
            this._readCallback = this._readInTopContext;
            this._lexer.tokenize(a, function(a, b) {
                if (a !== null && e._readCallback === void 0)
                    e._callback(a);
                else if (e._readCallback !== void 0)
                    a !== null ? e._callback(a) : e._readCallback = e._readCallback(b)
            })
        }
    };
    var ja = {
        parser: {}
    };
    ja.parser.async = !0;
    ja.parser.parse = function() {
        var a = new L
          , b = arguments[0]
          , e = arguments[1]
          , d = arguments[2];
        arguments.length === 2 ? (e = null,
        d = arguments[1]) : arguments.length !== 3 && d(!1, "Wrong number of arguments, 2, 3 args required");
        e && typeof e === "string" && (e = {
            token: "uri",
            value: e,
            prefix: null,
            suffix: null
        });
        L.prototype.defaultGraph = e;
        var i = [];
        a.parse(b, function(a, e) {
            a ? d(!1, a) : e ? i.push(e) : d(!0, i)
        })
    }
    ;
    var $ = {
        RDFLoader: function(a) {
            this.precedences = ["text/turtle", "text/n3", "application/ld+json", "application/json"];
            this.parsers = {
                "text/turtle": ja.parser,
                "text/n3": ja.parser,
                "application/ld+json": na.parser,
                "application/json": na.parser
            };
            if (a != null)
                for (var b in a.parsers)
                    this.parsers[b] = a.parsers[b];
            if (a && a.precedences != null)
                for (b in this.precedences = a.precedences,
                a.parsers)
                    s.include(this.precedences, b) || this.precedences.push(b);
            this.acceptHeaderValue = "";
            for (a = 0; a < this.precedences.length; a++)
                a != 0 ? this.acceptHeaderValue = this.acceptHeaderValue + "," + this.precedences[a] : this.acceptHeaderValue += this.precedences[a]
        }
    };
    $.RDFLoader.prototype.registerParser = function(a, b) {
        this.parsers[a] = b;
        this.precedences.push(a)
    }
    ;
    $.RDFLoader.prototype.unregisterParser = function(a) {
        delete this.parsers[a];
        for (var b = [], e = 0; e < this.precedences.length; e++)
            this.precedences[e] != a && b.push(this.precedences[e]);
        this.precedences = b
    }
    ;
    $.RDFLoader.prototype.setAcceptHeaderPrecedence = function(a) {
        this.precedences = a
    }
    ;
    $.RDFLoader.prototype.load = function(a, b, e) {
        var d = this;
        Q.load(a, this.acceptHeaderValue, function(i, h) {
            if (i == !0) {
                var f = h.headers["Content-Type"] || h.headers["content-type"]
                  , g = h.data;
                if (f != null) {
                    var f = f.split(";")[0], n;
                    for (n in d.parsers)
                        if (n.indexOf("/") != -1) {
                            var q = n.split("/");
                            if (q[1] === "*") {
                                if (f.indexOf(q[0]) != -1)
                                    return d.tryToParse(d.parsers[n], b, g, e)
                            } else if (f.indexOf(n) != -1)
                                return d.tryToParse(d.parsers[n], b, g, e);
                            else if (f.indexOf(q[1]) != -1)
                                return d.tryToParse(d.parsers[n], b, g, e)
                        } else if (f.indexOf(n) != -1)
                            return d.tryToParse(d.parsers[n], a, b, e);
                    e(!1, "Unknown media type : " + f)
                } else
                    console.log("Unknown media type"),
                    console.log(h.headers),
                    e(!1, "Uknown media type")
            } else
                e(!1, "Network error: " + h)
        })
    }
    ;
    $.RDFLoader.prototype.loadFromFile = function(a, b, e, d) {
        try {
            var i = this;
            require("fs").readFile(e.split("file:/")[1], function(e, h) {
                if (e)
                    throw e;
                h = h.toString("utf8");
                i.tryToParse(a, b, h, d)
            })
        } catch (h) {
            d(!1, h)
        }
    }
    ;
    $.RDFLoader.prototype.tryToParse = function(a, b, e, d) {
        try {
            if (typeof e === "string" && (e = s.normalizeUnicodeLiterals(e)),
            a.async)
                a.parse(e, b, d);
            else {
                var i = a.parse(e, b);
                i != null ? d(!0, i) : d(!1, "parsing error")
            }
        } catch (h) {
            console.log(h.message),
            console.log(h.stack),
            d(!1, "parsing error with mime type : " + h)
        }
    }
    ;
    var F = {
        AbstractQueryTree: function() {}
    };
    F.AbstractQueryTree.prototype.parseQueryString = function(a) {
        return ya.parser.parse(a)
    }
    ;
    F.AbstractQueryTree.prototype.parseExecutableUnit = function(a) {
        if (a.kind === "select")
            return this.parseSelect(a);
        else if (a.kind === "ask")
            return this.parseSelect(a);
        else if (a.kind === "modify")
            return this.parseSelect(a);
        else if (a.kind === "construct")
            return this.parseSelect(a);
        else if (a.kind === "insertdata")
            return this.parseInsertData(a);
        else if (a.kind === "deletedata")
            return this.parseInsertData(a);
        else if (a.kind === "load")
            return a;
        else if (a.kind === "clear")
            return a;
        else if (a.kind === "drop")
            return a;
        else if (a.kind === "create")
            return a;
        else
            throw Error("unknown executable unit: " + a.kind);
    }
    ;
    F.AbstractQueryTree.prototype.parseSelect = function(a) {
        return a == null ? (console.log("error parsing query"),
        null) : (a.pattern = this.build(a.pattern, {
            freshCounter: 0
        }),
        a)
    }
    ;
    F.AbstractQueryTree.prototype.parseInsertData = function(a) {
        return a == null ? (console.log("error parsing query"),
        null) : a
    }
    ;
    F.AbstractQueryTree.prototype.build = function(a, b) {
        if (a.token === "groupgraphpattern")
            return this._buildGroupGraphPattern(a, b);
        else if (a.token === "basicgraphpattern") {
            var e = {
                kind: "BGP",
                value: a.triplesContext
            };
            return e = F.translatePathExpressionsInBGP(e, b)
        } else if (a.token === "graphunionpattern") {
            var e = this.build(a.value[0], b)
              , d = this.build(a.value[1], b);
            return {
                kind: "UNION",
                value: [e, d]
            }
        } else if (a.token === "graphgraphpattern")
            return {
                kind: "GRAPH",
                value: this.build(a.value, b),
                graph: a.graph
            };
        else
            throw Error("not supported token in query:" + a.token);
    }
    ;
    F.translatePathExpressionsInBGP = function(a, b) {
        var e, d = [], i, h;
        for (h = 0; h < a.value.length; h++)
            if (a.value[h].predicate && a.value[h].predicate.token === "path") {
                e = a.value[h];
                i = a.value.slice(h + 1);
                var f = F.translatePathExpression(e, b);
                e = null;
                if (f.kind === "BGP")
                    d = d.concat(f.value);
                else if (f.kind === "ZERO_OR_MORE_PATH" || f.kind === "ONE_OR_MORE_PATH") {
                    h = d.length > 0 ? {
                        kind: "JOIN",
                        lvalue: {
                            kind: "BGP",
                            value: d
                        },
                        rvalue: f
                    } : f;
                    if (f.kind === "ZERO_OR_MORE_PATH")
                        if (f.y.token === "var" && f.y.value.indexOf("fresh:") === 0 && f.x.token === "var" && f.x.value.indexOf("fresh:") === 0)
                            for (var g = 0; g < a.value.length; g++) {
                                if (a.value[g].object && a.value[g].object.token === "var" && a.value[g].object.value === f.x.value)
                                    e = s.clone(a.value[g]),
                                    e.object = f.y
                            }
                        else if (f.y.token === "var" && f.y.value.indexOf("fresh:") === 0)
                            for (g = 0; g < a.value.length; g++)
                                if (a.value[g].subject && a.value[g].subject.token === "var" && a.value[g].subject.value === f.y.value)
                                    e = s.clone(a.value[g]),
                                    e.subject = f.x;
                    return i.length > 0 ? (f = F.translatePathExpressionsInBGP({
                        kind: "BGP",
                        value: i
                    }, b),
                    e != null ? (d = d.concat([e]).concat(i),
                    {
                        kind: "UNION",
                        value: [{
                            kind: "JOIN",
                            lvalue: h,
                            rvalue: f
                        }, {
                            kind: "BGP",
                            value: d
                        }]
                    }) : {
                        kind: "JOIN",
                        lvalue: h,
                        rvalue: f
                    }) : h
                } else
                    return f
            } else
                d.push(a.value[h]);
        a.value = d;
        return a
    }
    ;
    F.translatePathExpression = function(a, b) {
        if (a.predicate.kind === "element")
            if (a.predicate.modifier === "+") {
                a.predicate.modifier = null;
                var e = F.translatePathExpression(a, b);
                return {
                    kind: "ONE_OR_MORE_PATH",
                    path: e,
                    x: a.subject,
                    y: a.object
                }
            } else
                return a.predicate.modifier === "*" ? (a.predicate.modifier = null,
                e = F.translatePathExpression(a, b),
                {
                    kind: "ZERO_OR_MORE_PATH",
                    path: e,
                    x: a.subject,
                    y: a.object
                }) : (a.predicate = a.predicate.value,
                {
                    kind: "BGP",
                    value: [a]
                });
        else if (a.predicate.kind === "sequence") {
            for (var e = a.subject, d = a.object, i = a.graph, h, f, g = [], n = 0; n < a.predicate.value.length; n++) {
                n != a.predicate.value.length - 1 ? (h = {
                    token: "var",
                    value: "fresh:" + b.freshCounter
                },
                b.freshCounter++) : h = d;
                f = {
                    subject: e,
                    predicate: a.predicate.value[n],
                    object: h
                };
                if (i != null)
                    f.graph = s.clone(i);
                g.push(f);
                n != a.predicate.value.length - 1 && (e = s.clone(h))
            }
            return F.translatePathExpressionsInBGP({
                kind: "BGP",
                value: g
            }, b)
        }
    }
    ;
    F.AbstractQueryTree.prototype._buildGroupGraphPattern = function(a, b) {
        for (var e = a.filters || [], d = {
            kind: "EMPTY_PATTERN"
        }, i = 0; i < a.patterns.length; i++) {
            var h = a.patterns[i];
            h.token === "optionalgraphpattern" ? (h = this.build(h.value, b),
            d = h.kind === "FILTER" ? {
                kind: "LEFT_JOIN",
                lvalue: d,
                rvalue: h.value,
                filter: h.filter
            } : {
                kind: "LEFT_JOIN",
                lvalue: d,
                rvalue: h,
                filter: !0
            }) : (h = this.build(h, b),
            d = d.kind == "EMPTY_PATTERN" ? h : {
                kind: "JOIN",
                lvalue: d,
                rvalue: h
            })
        }
        if (e.length != 0)
            if (d.kind === "EMPTY_PATTERN")
                return {
                    kind: "FILTER",
                    filter: e,
                    value: d
                };
            else if (d.kind === "LEFT_JOIN" && d.filter === !0)
                return {
                    kind: "FILTER",
                    filter: e,
                    value: d
                };
            else if (d.kind === "LEFT_JOIN")
                return {
                    kind: "FILTER",
                    filter: e,
                    value: d
                };
            else if (d.kind === "JOIN")
                return {
                    kind: "FILTER",
                    filter: e,
                    value: d
                };
            else if (d.kind === "UNION")
                return {
                    kind: "FILTER",
                    filter: e,
                    value: d
                };
            else if (d.kind === "GRAPH")
                return {
                    kind: "FILTER",
                    filter: e,
                    value: d
                };
            else if (d.kind === "BGP")
                return {
                    kind: "FILTER",
                    filter: e,
                    value: d
                };
            else
                throw Error("Unknow kind of algebra expression: " + d.kind);
        else
            return d
    }
    ;
    F.AbstractQueryTree.prototype.collectBasicTriples = function(a, b) {
        b == null && (b = []);
        if (a.kind === "select")
            b = this.collectBasicTriples(a.pattern, b);
        else if (a.kind === "BGP")
            b = b.concat(a.value);
        else if (a.kind === "ZERO_OR_MORE_PATH")
            b = this.collectBasicTriples(a.path);
        else if (a.kind === "UNION")
            b = this.collectBasicTriples(a.value[0], b),
            b = this.collectBasicTriples(a.value[1], b);
        else if (a.kind === "GRAPH")
            b = this.collectBasicTriples(a.value, b);
        else if (a.kind === "LEFT_JOIN" || a.kind === "JOIN")
            b = this.collectBasicTriples(a.lvalue, b),
            b = this.collectBasicTriples(a.rvalue, b);
        else if (a.kind === "FILTER")
            b = this.collectBasicTriples(a.value, b);
        else if (a.kind === "construct")
            b = this.collectBasicTriples(a.pattern, b);
        else if (a.kind !== "EMPTY_PATTERN")
            throw "Unknown pattern: " + a.kind;
        return b
    }
    ;
    F.AbstractQueryTree.prototype.bind = function(a, b) {
        if (a.graph != null && a.graph.token && a.graph.token === "var" && b[a.graph.value] != null)
            a.graph = b[a.graph.value];
        if (a.filter != null) {
            for (var e = [], d = 0; d < a.filter.length; d++)
                a.filter[d].value = this._bindFilter(a.filter[d].value, b),
                e.push(a.filter[d]);
            a.filter = e
        }
        if (a.kind === "select")
            a.pattern = this.bind(a.pattern, b);
        else if (a.kind === "BGP")
            a.value = this._bindTripleContext(a.value, b);
        else if (a.kind === "ZERO_OR_MORE_PATH") {
            a.path = this._bindTripleContext(a.path, b);
            if (a.x && a.x.token === "var" && b[a.x.value] != null)
                a.x = b[a.x.value];
            if (a.y && a.y.token === "var" && b[a.y.value] != null)
                a.y = b[a.y.value]
        } else if (a.kind === "UNION")
            a.value[0] = this.bind(a.value[0], b),
            a.value[1] = this.bind(a.value[1], b);
        else if (a.kind === "GRAPH")
            a.value = this.bind(a.value, b);
        else if (a.kind === "LEFT_JOIN" || a.kind === "JOIN")
            a.lvalue = this.bind(a.lvalue, b),
            a.rvalue = this.bind(a.rvalue, b);
        else if (a.kind === "FILTER")
            a.filter = this._bindFilter(a.filter[d].value, b);
        else if (a.kind !== "EMPTY_PATTERN")
            throw "Unknown pattern: " + a.kind;
        return a
    }
    ;
    F.AbstractQueryTree.prototype._bindTripleContext = function(a, b) {
        for (var e = 0; e < a.length; e++) {
            delete a[e].graph;
            delete a[e].variables;
            for (var d in a[e]) {
                var i = a[e][d];
                i.token === "var" && b[i.value] != null && (a[e][d] = b[i.value])
            }
        }
        return a
    }
    ;
    F.AbstractQueryTree.prototype._bindFilter = function(a, b) {
        if (a.expressionType != null) {
            var e = a.expressionType;
            if (e == "relationalexpression")
                a.op1 = this._bindFilter(a.op1, b),
                a.op2 = this._bindFilter(a.op2, b);
            else if (e == "conditionalor" || e == "conditionaland")
                for (e = 0; e < a.operands.length; e++)
                    a.operands[e] = this._bindFilter(a.operands[e], b);
            else if (e == "additiveexpression") {
                a.summand = this._bindFilter(a.summand, b);
                for (e = 0; e < a.summands.length; e++)
                    a.summands[e].expression = this._bindFilter(a.summands[e].expression, b)
            } else if (e == "builtincall")
                for (e = 0; e < a.args.length; e++)
                    a.args[e] = this._bindFilter(a.args[e], b);
            else if (e == "multiplicativeexpression") {
                a.factor = this._bindFilter(a.factor, b);
                for (e = 0; e < a.factors.length; e++)
                    a.factors[e].expression = this._bindFilter(a.factors[e].expression, b)
            } else if (e == "unaryexpression")
                a.expression = this._bindFilter(a.expression, b);
            else if (e == "irireforfunction")
                for (e = 0; e < a.factors.args; e++)
                    a.args[e] = this._bindFilter(a.args[e], b);
            else if (e == "atomic" && a.primaryexpression == "var" && b[a.value.value] != null)
                e = b[a.value.value],
                a.primaryexpression = e.token === "uri" ? "iri" : "literal",
                a.value = e
        }
        return a
    }
    ;
    F.AbstractQueryTree.prototype.replace = function(a, b, e, d) {
        if (a.graph != null && a.graph.token && a.graph.token === b.token && a.graph.value == b.value)
            a.graph = s.clone(e);
        if (a.filter != null) {
            for (var i = [], h = 0; h < a.filter.length; h++)
                a.filter[h].value = this._replaceFilter(a.filter[h].value, b, e, d),
                i.push(a.filter[h]);
            a.filter = i
        }
        if (a.kind === "select")
            a.pattern = this.replace(a.pattern, b, e, d);
        else if (a.kind === "BGP")
            a.value = this._replaceTripleContext(a.value, b, e, d);
        else if (a.kind === "ZERO_OR_MORE_PATH") {
            a.path = this._replaceTripleContext(a.path, b, e, d);
            if (a.x && a.x.token === b.token && a.value === b.value)
                a.x = s.clone(e);
            if (a.y && a.y.token === b.token && a.value === b.value)
                a.y = s.clone(e)
        } else if (a.kind === "UNION")
            a.value[0] = this.replace(a.value[0], b, e, d),
            a.value[1] = this.replace(a.value[1], b, e, d);
        else if (a.kind === "GRAPH")
            a.value = this.replace(a.value, b, e);
        else if (a.kind === "LEFT_JOIN" || a.kind === "JOIN")
            a.lvalue = this.replace(a.lvalue, b, e, d),
            a.rvalue = this.replace(a.rvalue, b, e, d);
        else if (a.kind === "FILTER")
            a.value = this._replaceFilter(a.value, b, e, d);
        else if (a.kind !== "EMPTY_PATTERN")
            throw "Unknown pattern: " + a.kind;
        return a
    }
    ;
    F.AbstractQueryTree.prototype._replaceTripleContext = function(a, b, e, d) {
        for (var i = 0; i < a.length; i++)
            for (var h in a[i]) {
                var f = a[i][h];
                if (f.token === "var" && b.token === "var" && f.value === b.value)
                    a[i][h] = e;
                else if (f.token === "blank" && b.token === "blank" && f.value === b.value)
                    a[i][h] = e;
                else if ((f.token === "literal" || f.token === "uri") && (b.token === "literal" || b.token === "uri") && f.token === b.token && s.lexicalFormTerm(f, d)[f.token] === s.lexicalFormTerm(b, d)[f.token])
                    a[i][h] = e
            }
        return a
    }
    ;
    F.AbstractQueryTree.prototype._replaceFilter = function(a, b, e, d) {
        if (a.expressionType != null) {
            var i = a.expressionType;
            if (i == "relationalexpression")
                a.op1 = this._replaceFilter(a.op1, b, e, d),
                a.op2 = this._replaceFilter(a.op2, b, e, d);
            else if (i == "conditionalor" || i == "conditionaland")
                for (i = 0; i < a.operands.length; i++)
                    a.operands[i] = this._replaceFilter(a.operands[i], b, e, d);
            else if (i == "additiveexpression") {
                a.summand = this._replaceFilter(a.summand, b, e, d);
                for (i = 0; i < a.summands.length; i++)
                    a.summands[i].expression = this._replaceFilter(a.summands[i].expression, b, e, d)
            } else if (i == "builtincall")
                for (i = 0; i < a.args.length; i++)
                    a.args[i] = this._replaceFilter(a.args[i], b, e, d);
            else if (i == "multiplicativeexpression") {
                a.factor = this._replaceFilter(a.factor, b, e, d);
                for (i = 0; i < a.factors.length; i++)
                    a.factors[i].expression = this._replaceFilter(a.factors[i].expression, b, e, d)
            } else if (i == "unaryexpression")
                a.expression = this._replaceFilter(a.expression, b, e, d);
            else if (i == "irireforfunction")
                for (i = 0; i < a.factors.args; i++)
                    a.args[i] = this._replaceFilter(a.args[i], b, e, d);
            else if (i == "atomic") {
                d = null;
                if (a.primaryexpression == b.token && a.value == b.value)
                    d = e.value;
                else if (a.primaryexpression == "iri" && b.token == "uri" && a.value == b.value)
                    d = e.value;
                if (d != null)
                    a.primaryexpression = e.token === "uri" ? "iri" : e.token,
                    a.value = d
            }
        }
        return a
    }
    ;
    F.AbstractQueryTree.prototype.treeWithUnion = function(a) {
        if (a == null)
            return !1;
        if (a.kind == null)
            return !1;
        if (a.kind === "select")
            return this.treeWithUnion(a.pattern);
        else if (a.kind === "BGP")
            return this.treeWithUnion(a.value);
        else if (a.kind === "ZERO_OR_MORE_PATH")
            return !1;
        else if (a.kind === "UNION")
            if (a.value[0].value != null && a.value[0].value.variables != null && a.value[1].value != null && a.value[1].value.variables != null) {
                if (a.value[0].variables.join("/") === a.values[1].variables.join("/"))
                    return this.treeWithUnion(a.value[0]) ? !0 : this.treeWithUnion(a.value[1])
            } else
                return !0;
        else if (a.kind === "GRAPH")
            return !1;
        else if (a.kind === "LEFT_JOIN" || a.kind === "JOIN")
            if (this.treeWithUnion(a.lvalue))
                return !0;
            else
                this.treeWithUnion(a.rvalue);
        else
            return !1
    }
    ;
    var ya = {};
    ya.parser = function() {
        function a(a) {
            return '"' + a.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\x08/g, "\\b").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\f/g, "\\f").replace(/\r/g, "\\r").replace(/[\x00-\x07\x0B\x0E-\x1F\x80-\uFFFF]/g, escape) + '"'
        }
        var b = {
            parse: function(e, b) {
                function i(k) {
                    c < za || (c > za && (za = c,
                    jb = []),
                    jb.push(k))
                }
                function h() {
                    var k, a, e, b;
                    j++;
                    b = e = c;
                    k = f();
                    k !== null ? (a = q(),
                    a === null && (a = s(),
                    a === null && (a = x(),
                    a === null && (a = z()))),
                    a !== null ? k = [k, a] : (k = null,
                    c = b)) : (k = null,
                    c = b);
                    k !== null && (k = {
                        token: "query",
                        kind: "query",
                        prologue: k[0],
                        units: [k[1]]
                    });
                    k === null && (c = e);
                    j--;
                    j === 0 && k === null && i("[2] Query");
                    return k
                }
                function f() {
                    var k, a, e, b, d, H;
                    j++;
                    H = d = c;
                    k = g();
                    k = k !== null ? k : "";
                    if (k !== null) {
                        a = [];
                        for (e = l(); e !== null; )
                            a.push(e),
                            e = l();
                        if (a !== null) {
                            e = [];
                            for (b = n(); b !== null; )
                                e.push(b),
                                b = n();
                            e !== null ? k = [k, a, e] : (k = null,
                            c = H)
                        } else
                            k = null,
                            c = H
                    } else
                        k = null,
                        c = H;
                    k !== null && (k = {
                        token: "prologue",
                        base: k[0],
                        prefixes: k[2]
                    });
                    k === null && (c = d);
                    j--;
                    j === 0 && k === null && i("[3] Prologue");
                    return k
                }
                function g() {
                    var k, a, b, w, d, H;
                    j++;
                    H = d = c;
                    k = [];
                    for (a = l(); a !== null; )
                        k.push(a),
                        a = l();
                    if (k !== null)
                        if (e.substr(c, 4) === "BASE" ? (a = "BASE",
                        c += 4) : (a = null,
                        j === 0 && i('"BASE"')),
                        a === null && (e.substr(c, 4) === "base" ? (a = "base",
                        c += 4) : (a = null,
                        j === 0 && i('"base"'))),
                        a !== null) {
                            b = [];
                            for (w = l(); w !== null; )
                                b.push(w),
                                w = l();
                            b !== null ? (w = Ia(),
                            w !== null ? k = [k, a, b, w] : (k = null,
                            c = H)) : (k = null,
                            c = H)
                        } else
                            k = null,
                            c = H;
                    else
                        k = null,
                        c = H;
                    k !== null && (k = function(k, a) {
                        var c = {
                            token: "base"
                        };
                        c.value = a;
                        return c
                    }(d, k[3]));
                    k === null && (c = d);
                    j--;
                    j === 0 && k === null && i("[4] BaseDecl");
                    return k
                }
                function n() {
                    var k, a, b, w, d, H, f, h;
                    j++;
                    h = f = c;
                    k = [];
                    for (a = l(); a !== null; )
                        k.push(a),
                        a = l();
                    if (k !== null)
                        if (e.substr(c, 6) === "PREFIX" ? (a = "PREFIX",
                        c += 6) : (a = null,
                        j === 0 && i('"PREFIX"')),
                        a === null && (e.substr(c, 6) === "prefix" ? (a = "prefix",
                        c += 6) : (a = null,
                        j === 0 && i('"prefix"'))),
                        a !== null) {
                            b = [];
                            for (w = l(); w !== null; )
                                b.push(w),
                                w = l();
                            if (b !== null)
                                if (w = Ja(),
                                w !== null) {
                                    d = [];
                                    for (H = l(); H !== null; )
                                        d.push(H),
                                        H = l();
                                    d !== null ? (H = Ia(),
                                    H !== null ? k = [k, a, b, w, d, H] : (k = null,
                                    c = h)) : (k = null,
                                    c = h)
                                } else
                                    k = null,
                                    c = h;
                            else
                                k = null,
                                c = h
                        } else
                            k = null,
                            c = h;
                    else
                        k = null,
                        c = h;
                    k !== null && (k = function(k, a, c) {
                        k = {
                            token: "prefix"
                        };
                        k.prefix = a;
                        k.local = c;
                        return k
                    }(f, k[3], k[5]));
                    k === null && (c = f);
                    j--;
                    j === 0 && k === null && i("[5] PrefixDecl");
                    return k
                }
                function q() {
                    var k, a, e, b, d, H, f, h, g, m, n;
                    j++;
                    n = m = c;
                    k = r();
                    if (k !== null) {
                        a = [];
                        for (e = l(); e !== null; )
                            a.push(e),
                            e = l();
                        if (a !== null) {
                            e = [];
                            for (b = t(); b !== null; )
                                e.push(b),
                                b = t();
                            if (e !== null) {
                                b = [];
                                for (d = l(); d !== null; )
                                    b.push(d),
                                    d = l();
                                if (b !== null)
                                    if (d = A(),
                                    d !== null) {
                                        H = [];
                                        for (f = l(); f !== null; )
                                            H.push(f),
                                            f = l();
                                        if (H !== null)
                                            if (f = E(),
                                            f !== null) {
                                                h = [];
                                                for (g = l(); g !== null; )
                                                    h.push(g),
                                                    g = l();
                                                h !== null ? (g = $(),
                                                g !== null ? k = [k, a, e, b, d, H, f, h, g] : (k = null,
                                                c = n)) : (k = null,
                                                c = n)
                                            } else
                                                k = null,
                                                c = n;
                                        else
                                            k = null,
                                            c = n
                                    } else
                                        k = null,
                                        c = n;
                                else
                                    k = null,
                                    c = n
                            } else
                                k = null,
                                c = n
                        } else
                            k = null,
                            c = n
                    } else
                        k = null,
                        c = n;
                    k !== null && (k = function(k, a, c, e, b) {
                        for (var k = {
                            named: [],
                            implicit: []
                        }, i = 0; i < c.length; i++) {
                            var y = c[i];
                            y.kind === "default" ? k.implicit.push(y.graph) : k.named.push(y.graph)
                        }
                        k.named.length === 0 && k.implicit.length === 0 && k.implicit.push({
                            token: "uri",
                            prefix: null,
                            suffix: null,
                            value: "https://github.com/antoniogarrote/rdfstore-js#default_graph"
                        });
                        c = {
                            kind: "select",
                            token: "executableunit"
                        };
                        c.dataset = k;
                        c.projection = a.vars;
                        c.modifier = a.modifier;
                        c.pattern = e;
                        if (b != null && b.limit != null)
                            c.limit = b.limit;
                        if (b != null && b.offset != null)
                            c.offset = b.offset;
                        if (b != null && b.order != null && b.order != "")
                            c.order = b.order;
                        if (b != null && b.group != null)
                            c.group = b.group;
                        return c
                    }(m, k[0], k[2], k[4], k[6]));
                    k === null && (c = m);
                    j--;
                    j === 0 && k === null && i("[6] SelectQuery");
                    return k
                }
                function o() {
                    var k, a, e, b;
                    j++;
                    b = c;
                    k = r();
                    k !== null ? (a = A(),
                    a !== null ? (e = E(),
                    e !== null ? k = [k, a, e] : (k = null,
                    c = b)) : (k = null,
                    c = b)) : (k = null,
                    c = b);
                    j--;
                    j === 0 && k === null && i("[7] SubSelect");
                    return k
                }
                function r() {
                    var k, a, b, w, d, H, f, h, g, m, n, o, q, v, s, R, u, B, x, Z, t;
                    j++;
                    Z = x = c;
                    k = [];
                    for (a = l(); a !== null; )
                        k.push(a),
                        a = l();
                    if (k !== null)
                        if (e.substr(c, 6) === "SELECT" ? (a = "SELECT",
                        c += 6) : (a = null,
                        j === 0 && i('"SELECT"')),
                        a === null && (e.substr(c, 6) === "select" ? (a = "select",
                        c += 6) : (a = null,
                        j === 0 && i('"select"'))),
                        a !== null) {
                            b = [];
                            for (w = l(); w !== null; )
                                b.push(w),
                                w = l();
                            if (b !== null)
                                if (e.substr(c, 8) === "DISTINCT" ? (w = "DISTINCT",
                                c += 8) : (w = null,
                                j === 0 && i('"DISTINCT"')),
                                w === null && (e.substr(c, 8) === "distinct" ? (w = "distinct",
                                c += 8) : (w = null,
                                j === 0 && i('"distinct"'))),
                                w === null && (e.substr(c, 7) === "REDUCED" ? (w = "REDUCED",
                                c += 7) : (w = null,
                                j === 0 && i('"REDUCED"')),
                                w === null && (e.substr(c, 7) === "reduced" ? (w = "reduced",
                                c += 7) : (w = null,
                                j === 0 && i('"reduced"')))),
                                w = w !== null ? w : "",
                                w !== null) {
                                    d = [];
                                    for (H = l(); H !== null; )
                                        d.push(H),
                                        H = l();
                                    if (d !== null) {
                                        t = c;
                                        f = [];
                                        for (h = l(); h !== null; )
                                            f.push(h),
                                            h = l();
                                        if (f !== null)
                                            if (h = O(),
                                            h !== null) {
                                                g = [];
                                                for (m = l(); m !== null; )
                                                    g.push(m),
                                                    m = l();
                                                g !== null ? f = [f, h, g] : (f = null,
                                                c = t)
                                            } else
                                                f = null,
                                                c = t;
                                        else
                                            f = null,
                                            c = t;
                                        if (f === null) {
                                            t = c;
                                            f = [];
                                            for (h = l(); h !== null; )
                                                f.push(h),
                                                h = l();
                                            if (f !== null)
                                                if (e.charCodeAt(c) === 40 ? (h = "(",
                                                c++) : (h = null,
                                                j === 0 && i('"("')),
                                                h !== null) {
                                                    g = [];
                                                    for (m = l(); m !== null; )
                                                        g.push(m),
                                                        m = l();
                                                    if (g !== null)
                                                        if (m = J(),
                                                        m !== null) {
                                                            n = [];
                                                            for (o = l(); o !== null; )
                                                                n.push(o),
                                                                o = l();
                                                            if (n !== null)
                                                                if (e.substr(c, 2) === "AS" ? (o = "AS",
                                                                c += 2) : (o = null,
                                                                j === 0 && i('"AS"')),
                                                                o === null && (e.substr(c, 2) === "as" ? (o = "as",
                                                                c += 2) : (o = null,
                                                                j === 0 && i('"as"'))),
                                                                o !== null) {
                                                                    q = [];
                                                                    for (v = l(); v !== null; )
                                                                        q.push(v),
                                                                        v = l();
                                                                    if (q !== null)
                                                                        if (v = O(),
                                                                        v !== null) {
                                                                            s = [];
                                                                            for (R = l(); R !== null; )
                                                                                s.push(R),
                                                                                R = l();
                                                                            if (s !== null)
                                                                                if (e.charCodeAt(c) === 41 ? (R = ")",
                                                                                c++) : (R = null,
                                                                                j === 0 && i('")"')),
                                                                                R !== null) {
                                                                                    u = [];
                                                                                    for (B = l(); B !== null; )
                                                                                        u.push(B),
                                                                                        B = l();
                                                                                    u !== null ? f = [f, h, g, m, n, o, q, v, s, R, u] : (f = null,
                                                                                    c = t)
                                                                                } else
                                                                                    f = null,
                                                                                    c = t;
                                                                            else
                                                                                f = null,
                                                                                c = t
                                                                        } else
                                                                            f = null,
                                                                            c = t;
                                                                    else
                                                                        f = null,
                                                                        c = t
                                                                } else
                                                                    f = null,
                                                                    c = t;
                                                            else
                                                                f = null,
                                                                c = t
                                                        } else
                                                            f = null,
                                                            c = t;
                                                    else
                                                        f = null,
                                                        c = t
                                                } else
                                                    f = null,
                                                    c = t;
                                            else
                                                f = null,
                                                c = t
                                        }
                                        if (f !== null)
                                            for (H = []; f !== null; ) {
                                                H.push(f);
                                                t = c;
                                                f = [];
                                                for (h = l(); h !== null; )
                                                    f.push(h),
                                                    h = l();
                                                if (f !== null)
                                                    if (h = O(),
                                                    h !== null) {
                                                        g = [];
                                                        for (m = l(); m !== null; )
                                                            g.push(m),
                                                            m = l();
                                                        g !== null ? f = [f, h, g] : (f = null,
                                                        c = t)
                                                    } else
                                                        f = null,
                                                        c = t;
                                                else
                                                    f = null,
                                                    c = t;
                                                if (f === null) {
                                                    t = c;
                                                    f = [];
                                                    for (h = l(); h !== null; )
                                                        f.push(h),
                                                        h = l();
                                                    if (f !== null)
                                                        if (e.charCodeAt(c) === 40 ? (h = "(",
                                                        c++) : (h = null,
                                                        j === 0 && i('"("')),
                                                        h !== null) {
                                                            g = [];
                                                            for (m = l(); m !== null; )
                                                                g.push(m),
                                                                m = l();
                                                            if (g !== null)
                                                                if (m = J(),
                                                                m !== null) {
                                                                    n = [];
                                                                    for (o = l(); o !== null; )
                                                                        n.push(o),
                                                                        o = l();
                                                                    if (n !== null)
                                                                        if (e.substr(c, 2) === "AS" ? (o = "AS",
                                                                        c += 2) : (o = null,
                                                                        j === 0 && i('"AS"')),
                                                                        o === null && (e.substr(c, 2) === "as" ? (o = "as",
                                                                        c += 2) : (o = null,
                                                                        j === 0 && i('"as"'))),
                                                                        o !== null) {
                                                                            q = [];
                                                                            for (v = l(); v !== null; )
                                                                                q.push(v),
                                                                                v = l();
                                                                            if (q !== null)
                                                                                if (v = O(),
                                                                                v !== null) {
                                                                                    s = [];
                                                                                    for (R = l(); R !== null; )
                                                                                        s.push(R),
                                                                                        R = l();
                                                                                    if (s !== null)
                                                                                        if (e.charCodeAt(c) === 41 ? (R = ")",
                                                                                        c++) : (R = null,
                                                                                        j === 0 && i('")"')),
                                                                                        R !== null) {
                                                                                            u = [];
                                                                                            for (B = l(); B !== null; )
                                                                                                u.push(B),
                                                                                                B = l();
                                                                                            u !== null ? f = [f, h, g, m, n, o, q, v, s, R, u] : (f = null,
                                                                                            c = t)
                                                                                        } else
                                                                                            f = null,
                                                                                            c = t;
                                                                                    else
                                                                                        f = null,
                                                                                        c = t
                                                                                } else
                                                                                    f = null,
                                                                                    c = t;
                                                                            else
                                                                                f = null,
                                                                                c = t
                                                                        } else
                                                                            f = null,
                                                                            c = t;
                                                                    else
                                                                        f = null,
                                                                        c = t
                                                                } else
                                                                    f = null,
                                                                    c = t;
                                                            else
                                                                f = null,
                                                                c = t
                                                        } else
                                                            f = null,
                                                            c = t;
                                                    else
                                                        f = null,
                                                        c = t
                                                }
                                            }
                                        else
                                            H = null;
                                        if (H === null) {
                                            t = c;
                                            H = [];
                                            for (f = l(); f !== null; )
                                                H.push(f),
                                                f = l();
                                            if (H !== null)
                                                if (e.charCodeAt(c) === 42 ? (f = "*",
                                                c++) : (f = null,
                                                j === 0 && i('"*"')),
                                                f !== null) {
                                                    h = [];
                                                    for (g = l(); g !== null; )
                                                        h.push(g),
                                                        g = l();
                                                    h !== null ? H = [H, f, h] : (H = null,
                                                    c = t)
                                                } else
                                                    H = null,
                                                    c = t;
                                            else
                                                H = null,
                                                c = t
                                        }
                                        H !== null ? k = [k, a, b, w, d, H] : (k = null,
                                        c = Z)
                                    } else
                                        k = null,
                                        c = Z
                                } else
                                    k = null,
                                    c = Z;
                            else
                                k = null,
                                c = Z
                        } else
                            k = null,
                            c = Z;
                    else
                        k = null,
                        c = Z;
                    k !== null && (k = function(k, a, c) {
                        k = [];
                        if (c.length === 3 && c[1] === "*")
                            return {
                                vars: [{
                                    token: "variable",
                                    kind: "*"
                                }],
                                modifier: vb(a)
                            };
                        for (var e = 0; e < c.length; e++) {
                            var b = c[e];
                            b.length === 3 ? k.push({
                                token: "variable",
                                kind: "var",
                                value: b[1]
                            }) : k.push({
                                token: "variable",
                                kind: "aliased",
                                expression: b[3],
                                alias: b[7]
                            })
                        }
                        return {
                            vars: k,
                            modifier: vb(a)
                        }
                    }(x, k[3], k[5]));
                    k === null && (c = x);
                    j--;
                    j === 0 && k === null && i("[8] SelectClause");
                    return k
                }
                function s() {
                    var k, a, b, w, d, f, h, g, m, n, o, q;
                    j++;
                    q = o = c;
                    k = [];
                    for (a = l(); a !== null; )
                        k.push(a),
                        a = l();
                    if (k !== null)
                        if (e.substr(c, 9) === "CONSTRUCT" ? (a = "CONSTRUCT",
                        c += 9) : (a = null,
                        j === 0 && i('"CONSTRUCT"')),
                        a === null && (e.substr(c, 9) === "construct" ? (a = "construct",
                        c += 9) : (a = null,
                        j === 0 && i('"construct"'))),
                        a !== null) {
                            b = [];
                            for (w = l(); w !== null; )
                                b.push(w),
                                w = l();
                            if (b !== null)
                                if (w = wb(),
                                w !== null) {
                                    d = [];
                                    for (f = l(); f !== null; )
                                        d.push(f),
                                        f = l();
                                    if (d !== null) {
                                        f = [];
                                        for (h = t(); h !== null; )
                                            f.push(h),
                                            h = t();
                                        if (f !== null) {
                                            h = [];
                                            for (g = l(); g !== null; )
                                                h.push(g),
                                                g = l();
                                            if (h !== null)
                                                if (g = A(),
                                                g !== null) {
                                                    m = [];
                                                    for (n = l(); n !== null; )
                                                        m.push(n),
                                                        n = l();
                                                    m !== null ? (n = E(),
                                                    n !== null ? k = [k, a, b, w, d, f, h, g, m, n] : (k = null,
                                                    c = q)) : (k = null,
                                                    c = q)
                                                } else
                                                    k = null,
                                                    c = q;
                                            else
                                                k = null,
                                                c = q
                                        } else
                                            k = null,
                                            c = q
                                    } else
                                        k = null,
                                        c = q
                                } else
                                    k = null,
                                    c = q;
                            else
                                k = null,
                                c = q
                        } else
                            k = null,
                            c = q;
                    else
                        k = null,
                        c = q;
                    k !== null && (k = function(k, a, c, e, b) {
                        for (var k = {
                            named: [],
                            implicit: []
                        }, i = 0; i < c.length; i++) {
                            var y = c[i];
                            y.kind === "default" ? k.implicit.push(y.graph) : k.named.push(y.graph)
                        }
                        k.named.length === 0 && k.implicit.length === 0 && k.implicit.push({
                            token: "uri",
                            prefix: null,
                            suffix: null,
                            value: "https://github.com/antoniogarrote/rdfstore-js#default_graph"
                        });
                        c = {
                            kind: "construct",
                            token: "executableunit"
                        };
                        c.dataset = k;
                        c.template = a;
                        c.pattern = e;
                        if (b != null && b.limit != null)
                            c.limit = b.limit;
                        if (b != null && b.offset != null)
                            c.offset = b.offset;
                        if (b != null && b.order != null && b.order != "")
                            c.order = b.order;
                        return c
                    }(o, k[3], k[5], k[7], k[9]));
                    k === null && (c = o);
                    j--;
                    j === 0 && k === null && i("[9] ConstructQuery");
                    return k
                }
                function x() {
                    var k, a, b, w, d, f;
                    j++;
                    f = c;
                    e.substr(c, 8) === "DESCRIBE" ? (k = "DESCRIBE",
                    c += 8) : (k = null,
                    j === 0 && i('"DESCRIBE"'));
                    if (k !== null) {
                        b = ka();
                        if (b !== null)
                            for (a = []; b !== null; )
                                a.push(b),
                                b = ka();
                        else
                            a = null;
                        a === null && (e.charCodeAt(c) === 42 ? (a = "*",
                        c++) : (a = null,
                        j === 0 && i('"*"')));
                        if (a !== null) {
                            b = [];
                            for (w = t(); w !== null; )
                                b.push(w),
                                w = t();
                            b !== null ? (w = A(),
                            w = w !== null ? w : "",
                            w !== null ? (d = E(),
                            d !== null ? k = [k, a, b, w, d] : (k = null,
                            c = f)) : (k = null,
                            c = f)) : (k = null,
                            c = f)
                        } else
                            k = null,
                            c = f
                    } else
                        k = null,
                        c = f;
                    j--;
                    j === 0 && k === null && i("[10] DescribeQuery");
                    return k
                }
                function z() {
                    var k, a, b, w, d, f, h, g;
                    j++;
                    g = h = c;
                    k = [];
                    for (a = l(); a !== null; )
                        k.push(a),
                        a = l();
                    if (k !== null)
                        if (e.substr(c, 3) === "ASK" ? (a = "ASK",
                        c += 3) : (a = null,
                        j === 0 && i('"ASK"')),
                        a === null && (e.substr(c, 3) === "ask" ? (a = "ask",
                        c += 3) : (a = null,
                        j === 0 && i('"ask"'))),
                        a !== null) {
                            b = [];
                            for (w = l(); w !== null; )
                                b.push(w),
                                w = l();
                            if (b !== null) {
                                w = [];
                                for (d = t(); d !== null; )
                                    w.push(d),
                                    d = t();
                                if (w !== null) {
                                    d = [];
                                    for (f = l(); f !== null; )
                                        d.push(f),
                                        f = l();
                                    d !== null ? (f = A(),
                                    f !== null ? k = [k, a, b, w, d, f] : (k = null,
                                    c = g)) : (k = null,
                                    c = g)
                                } else
                                    k = null,
                                    c = g
                            } else
                                k = null,
                                c = g
                        } else
                            k = null,
                            c = g;
                    else
                        k = null,
                        c = g;
                    k !== null && (k = function(k, a, c) {
                        for (var k = {
                            named: [],
                            implicit: []
                        }, e = 0; e < a.length; e++) {
                            var b = a[e];
                            b.kind === "implicit" ? k.implicit.push(b.graph) : k.named.push(b.graph)
                        }
                        k.named.length === 0 && k.implicit.length === 0 && k.implicit.push({
                            token: "uri",
                            prefix: null,
                            suffix: null,
                            value: "https://github.com/antoniogarrote/rdfstore-js#default_graph"
                        });
                        a = {
                            kind: "ask",
                            token: "executableunit"
                        };
                        a.dataset = k;
                        a.pattern = c;
                        return a
                    }(h, k[3], k[5]));
                    k === null && (c = h);
                    j--;
                    j === 0 && k === null && i("[11] AskQuery");
                    return k
                }
                function t() {
                    var k, a, b, w, d, f, h;
                    j++;
                    h = f = c;
                    e.substr(c, 4) === "FROM" ? (k = "FROM",
                    c += 4) : (k = null,
                    j === 0 && i('"FROM"'));
                    k === null && (e.substr(c, 4) === "from" ? (k = "from",
                    c += 4) : (k = null,
                    j === 0 && i('"from"')));
                    if (k !== null) {
                        a = [];
                        for (b = l(); b !== null; )
                            a.push(b),
                            b = l();
                        if (a !== null)
                            if (b = C(),
                            b === null && (b = D()),
                            b !== null) {
                                w = [];
                                for (d = l(); d !== null; )
                                    w.push(d),
                                    d = l();
                                w !== null ? k = [k, a, b, w] : (k = null,
                                c = h)
                            } else
                                k = null,
                                c = h;
                        else
                            k = null,
                            c = h
                    } else
                        k = null,
                        c = h;
                    k !== null && (k = k[2]);
                    k === null && (c = f);
                    j--;
                    j === 0 && k === null && i("[12] DatasetClause");
                    return k
                }
                function C() {
                    var k, a, e, b;
                    j++;
                    b = e = c;
                    k = [];
                    for (a = l(); a !== null; )
                        k.push(a),
                        a = l();
                    k !== null ? (a = P(),
                    a !== null ? k = [k, a] : (k = null,
                    c = b)) : (k = null,
                    c = b);
                    k !== null && (k = {
                        graph: k[1],
                        kind: "default",
                        token: "graphClause"
                    });
                    k === null && (c = e);
                    j--;
                    j === 0 && k === null && i("[13] DefaultGraphClause");
                    return k
                }
                function D() {
                    var k, a, b, w, d;
                    j++;
                    d = w = c;
                    e.substr(c, 5) === "NAMED" ? (k = "NAMED",
                    c += 5) : (k = null,
                    j === 0 && i('"NAMED"'));
                    k === null && (e.substr(c, 5) === "named" ? (k = "named",
                    c += 5) : (k = null,
                    j === 0 && i('"named"')));
                    if (k !== null) {
                        a = [];
                        for (b = l(); b !== null; )
                            a.push(b),
                            b = l();
                        a !== null ? (b = P(),
                        b !== null ? k = [k, a, b] : (k = null,
                        c = d)) : (k = null,
                        c = d)
                    } else
                        k = null,
                        c = d;
                    k !== null && (k = {
                        graph: k[2],
                        kind: "named",
                        token: "graphCluase"
                    });
                    k === null && (c = w);
                    j--;
                    j === 0 && k === null && i("[14] NamedGraphClause");
                    return k
                }
                function A() {
                    var k, a, b, w, d, f, h;
                    j++;
                    h = f = c;
                    e.substr(c, 5) === "WHERE" ? (k = "WHERE",
                    c += 5) : (k = null,
                    j === 0 && i('"WHERE"'));
                    k === null && (e.substr(c, 5) === "where" ? (k = "where",
                    c += 5) : (k = null,
                    j === 0 && i('"where"')));
                    k = k !== null ? k : "";
                    if (k !== null) {
                        a = [];
                        for (b = l(); b !== null; )
                            a.push(b),
                            b = l();
                        if (a !== null)
                            if (b = T(),
                            b !== null) {
                                w = [];
                                for (d = l(); d !== null; )
                                    w.push(d),
                                    d = l();
                                w !== null ? k = [k, a, b, w] : (k = null,
                                c = h)
                            } else
                                k = null,
                                c = h;
                        else
                            k = null,
                            c = h
                    } else
                        k = null,
                        c = h;
                    k !== null && (k = k[2]);
                    k === null && (c = f);
                    j--;
                    j === 0 && k === null && i("[16] WhereClause");
                    return k
                }
                function E() {
                    var k, a, e, b, d, f;
                    j++;
                    f = d = c;
                    k = K();
                    k = k !== null ? k : "";
                    k !== null ? (a = I(),
                    a = a !== null ? a : "",
                    a !== null ? (e = Q(),
                    e = e !== null ? e : "",
                    e !== null ? (b = U(),
                    b = b !== null ? b : "",
                    b !== null ? k = [k, a, e, b] : (k = null,
                    c = f)) : (k = null,
                    c = f)) : (k = null,
                    c = f)) : (k = null,
                    c = f);
                    k !== null && (k = function(k, a, c, e) {
                        k = {};
                        if (e != null) {
                            if (e.limit != null)
                                k.limit = e.limit;
                            if (e.offset != null)
                                k.offset = e.offset
                        }
                        if (a != null)
                            k.group = a;
                        k.order = c;
                        return k
                    }(d, k[0], k[2], k[3]));
                    k === null && (c = d);
                    j--;
                    j === 0 && k === null && i("[17] SolutionModifier");
                    return k
                }
                function K() {
                    var k, a, b, w, d, f, h, g;
                    j++;
                    g = h = c;
                    e.substr(c, 5) === "GROUP" ? (k = "GROUP",
                    c += 5) : (k = null,
                    j === 0 && i('"GROUP"'));
                    k === null && (e.substr(c, 5) === "group" ? (k = "group",
                    c += 5) : (k = null,
                    j === 0 && i('"group"')));
                    if (k !== null) {
                        a = [];
                        for (b = l(); b !== null; )
                            a.push(b),
                            b = l();
                        if (a !== null)
                            if (e.substr(c, 2) === "BY" ? (b = "BY",
                            c += 2) : (b = null,
                            j === 0 && i('"BY"')),
                            b === null && (e.substr(c, 2) === "by" ? (b = "by",
                            c += 2) : (b = null,
                            j === 0 && i('"by"'))),
                            b !== null) {
                                w = [];
                                for (d = l(); d !== null; )
                                    w.push(d),
                                    d = l();
                                if (w !== null) {
                                    f = F();
                                    if (f !== null)
                                        for (d = []; f !== null; )
                                            d.push(f),
                                            f = F();
                                    else
                                        d = null;
                                    d !== null ? k = [k, a, b, w, d] : (k = null,
                                    c = g)
                                } else
                                    k = null,
                                    c = g
                            } else
                                k = null,
                                c = g;
                        else
                            k = null,
                            c = g
                    } else
                        k = null,
                        c = g;
                    k !== null && (k = k[4]);
                    k === null && (c = h);
                    j--;
                    j === 0 && k === null && i("[18] GroupClause");
                    return k
                }
                function F() {
                    var k, a, b, w, d, f, h, g, m, n, o, q;
                    j++;
                    q = o = c;
                    k = [];
                    for (a = l(); a !== null; )
                        k.push(a),
                        a = l();
                    if (k !== null)
                        if (a = Ka(),
                        a !== null) {
                            b = [];
                            for (w = l(); w !== null; )
                                b.push(w),
                                w = l();
                            b !== null ? k = [k, a, b] : (k = null,
                            c = q)
                        } else
                            k = null,
                            c = q;
                    else
                        k = null,
                        c = q;
                    k !== null && (k = k[1]);
                    k === null && (c = o);
                    if (k === null) {
                        q = o = c;
                        k = [];
                        for (a = l(); a !== null; )
                            k.push(a),
                            a = l();
                        if (k !== null)
                            if (a = kb(),
                            a !== null) {
                                b = [];
                                for (w = l(); w !== null; )
                                    b.push(w),
                                    w = l();
                                b !== null ? k = [k, a, b] : (k = null,
                                c = q)
                            } else
                                k = null,
                                c = q;
                        else
                            k = null,
                            c = q;
                        k !== null && (k = k[1]);
                        k === null && (c = o);
                        if (k === null) {
                            q = o = c;
                            k = [];
                            for (a = l(); a !== null; )
                                k.push(a),
                                a = l();
                            if (k !== null)
                                if (e.charCodeAt(c) === 40 ? (a = "(",
                                c++) : (a = null,
                                j === 0 && i('"("')),
                                a !== null) {
                                    b = [];
                                    for (w = l(); w !== null; )
                                        b.push(w),
                                        w = l();
                                    if (b !== null)
                                        if (w = J(),
                                        w !== null) {
                                            d = [];
                                            for (f = l(); f !== null; )
                                                d.push(f),
                                                f = l();
                                            if (d !== null) {
                                                m = c;
                                                e.substr(c, 2) === "AS" ? (f = "AS",
                                                c += 2) : (f = null,
                                                j === 0 && i('"AS"'));
                                                f === null && (e.substr(c, 2) === "as" ? (f = "as",
                                                c += 2) : (f = null,
                                                j === 0 && i('"as"')));
                                                if (f !== null) {
                                                    h = [];
                                                    for (g = l(); g !== null; )
                                                        h.push(g),
                                                        g = l();
                                                    h !== null ? (g = O(),
                                                    g !== null ? f = [f, h, g] : (f = null,
                                                    c = m)) : (f = null,
                                                    c = m)
                                                } else
                                                    f = null,
                                                    c = m;
                                                f = f !== null ? f : "";
                                                if (f !== null) {
                                                    h = [];
                                                    for (g = l(); g !== null; )
                                                        h.push(g),
                                                        g = l();
                                                    if (h !== null)
                                                        if (e.charCodeAt(c) === 41 ? (g = ")",
                                                        c++) : (g = null,
                                                        j === 0 && i('")"')),
                                                        g !== null) {
                                                            m = [];
                                                            for (n = l(); n !== null; )
                                                                m.push(n),
                                                                n = l();
                                                            m !== null ? k = [k, a, b, w, d, f, h, g, m] : (k = null,
                                                            c = q)
                                                        } else
                                                            k = null,
                                                            c = q;
                                                    else
                                                        k = null,
                                                        c = q
                                                } else
                                                    k = null,
                                                    c = q
                                            } else
                                                k = null,
                                                c = q
                                        } else
                                            k = null,
                                            c = q;
                                    else
                                        k = null,
                                        c = q
                                } else
                                    k = null,
                                    c = q;
                            else
                                k = null,
                                c = q;
                            k !== null && (k = k[5].length != 0 ? {
                                token: "aliased_expression",
                                expression: k[3],
                                alias: k[5][2]
                            } : k[3]);
                            k === null && (c = o);
                            if (k === null) {
                                q = o = c;
                                k = [];
                                for (a = l(); a !== null; )
                                    k.push(a),
                                    a = l();
                                if (k !== null)
                                    if (a = O(),
                                    a !== null) {
                                        b = [];
                                        for (w = l(); w !== null; )
                                            b.push(w),
                                            w = l();
                                        b !== null ? k = [k, a, b] : (k = null,
                                        c = q)
                                    } else
                                        k = null,
                                        c = q;
                                else
                                    k = null,
                                    c = q;
                                k !== null && (k = k[1]);
                                k === null && (c = o)
                            }
                        }
                    }
                    j--;
                    j === 0 && k === null && i("[19] GroupCondition");
                    return k
                }
                function I() {
                    var k, a, b, d;
                    j++;
                    d = c;
                    e.substr(c, 6) === "HAVING" ? (k = "HAVING",
                    c += 6) : (k = null,
                    j === 0 && i('"HAVING"'));
                    if (k !== null) {
                        b = Aa();
                        if (b !== null)
                            for (a = []; b !== null; )
                                a.push(b),
                                b = Aa();
                        else
                            a = null;
                        a !== null ? k = [k, a] : (k = null,
                        c = d)
                    } else
                        k = null,
                        c = d;
                    j--;
                    j === 0 && k === null && i("[20] HavingClause");
                    return k
                }
                function Q() {
                    var k, a, b, d, f, h, g, m, n;
                    j++;
                    n = m = c;
                    e.substr(c, 5) === "ORDER" ? (k = "ORDER",
                    c += 5) : (k = null,
                    j === 0 && i('"ORDER"'));
                    k === null && (e.substr(c, 5) === "order" ? (k = "order",
                    c += 5) : (k = null,
                    j === 0 && i('"order"')));
                    if (k !== null) {
                        a = [];
                        for (b = l(); b !== null; )
                            a.push(b),
                            b = l();
                        if (a !== null)
                            if (e.substr(c, 2) === "BY" ? (b = "BY",
                            c += 2) : (b = null,
                            j === 0 && i('"BY"')),
                            b === null && (e.substr(c, 2) === "by" ? (b = "by",
                            c += 2) : (b = null,
                            j === 0 && i('"by"'))),
                            b !== null) {
                                d = [];
                                for (f = l(); f !== null; )
                                    d.push(f),
                                    f = l();
                                if (d !== null) {
                                    h = L();
                                    if (h !== null)
                                        for (f = []; h !== null; )
                                            f.push(h),
                                            h = L();
                                    else
                                        f = null;
                                    if (f !== null) {
                                        h = [];
                                        for (g = l(); g !== null; )
                                            h.push(g),
                                            g = l();
                                        h !== null ? k = [k, a, b, d, f, h] : (k = null,
                                        c = n)
                                    } else
                                        k = null,
                                        c = n
                                } else
                                    k = null,
                                    c = n
                            } else
                                k = null,
                                c = n;
                        else
                            k = null,
                            c = n
                    } else
                        k = null,
                        c = n;
                    k !== null && (k = k[4]);
                    k === null && (c = m);
                    j--;
                    j === 0 && k === null && i("[22] OrderClause");
                    return k
                }
                function L() {
                    var k, a, b, d, f, h, g;
                    j++;
                    g = h = c;
                    e.substr(c, 3) === "ASC" ? (k = "ASC",
                    c += 3) : (k = null,
                    j === 0 && i('"ASC"'));
                    k === null && (e.substr(c, 3) === "asc" ? (k = "asc",
                    c += 3) : (k = null,
                    j === 0 && i('"asc"')),
                    k === null && (e.substr(c, 4) === "DESC" ? (k = "DESC",
                    c += 4) : (k = null,
                    j === 0 && i('"DESC"')),
                    k === null && (e.substr(c, 4) === "desc" ? (k = "desc",
                    c += 4) : (k = null,
                    j === 0 && i('"desc"')))));
                    if (k !== null) {
                        a = [];
                        for (b = l(); b !== null; )
                            a.push(b),
                            b = l();
                        if (a !== null)
                            if (b = La(),
                            b !== null) {
                                d = [];
                                for (f = l(); f !== null; )
                                    d.push(f),
                                    f = l();
                                d !== null ? k = [k, a, b, d] : (k = null,
                                c = g)
                            } else
                                k = null,
                                c = g;
                        else
                            k = null,
                            c = g
                    } else
                        k = null,
                        c = g;
                    k !== null && (k = {
                        direction: k[0].toUpperCase(),
                        expression: k[2]
                    });
                    k === null && (c = h);
                    if (k === null) {
                        g = h = c;
                        k = Aa();
                        k === null && (k = O());
                        if (k !== null) {
                            a = [];
                            for (b = l(); b !== null; )
                                a.push(b),
                                b = l();
                            a !== null ? k = [k, a] : (k = null,
                            c = g)
                        } else
                            k = null,
                            c = g;
                        k !== null && (k = function(k, a) {
                            a.token === "var" && (a = {
                                token: "expression",
                                expressionType: "atomic",
                                primaryexpression: "var",
                                value: a
                            });
                            return {
                                direction: "ASC",
                                expression: a
                            }
                        }(h, k[0]));
                        k === null && (c = h)
                    }
                    j--;
                    j === 0 && k === null && i("[23] OrderCondition");
                    return k
                }
                function U() {
                    var k, a, e, b;
                    j++;
                    b = e = c;
                    k = W();
                    k !== null ? (a = X(),
                    a = a !== null ? a : "",
                    a !== null ? k = [k, a] : (k = null,
                    c = b)) : (k = null,
                    c = b);
                    k === null && (b = c,
                    k = X(),
                    k !== null ? (a = W(),
                    a = a !== null ? a : "",
                    a !== null ? k = [k, a] : (k = null,
                    c = b)) : (k = null,
                    c = b));
                    k !== null && (k = function(k, a) {
                        for (var c = {}, e = 0; e < a.length; e++) {
                            var b = a[e];
                            if (b.limit != null)
                                c.limit = b.limit;
                            else if (b.offset != null)
                                c.offset = b.offset
                        }
                        return c
                    }(e, k));
                    k === null && (c = e);
                    j--;
                    j === 0 && k === null && i("[24] LimitOffsetClauses");
                    return k
                }
                function W() {
                    var k, a, b, d, f, h, g;
                    j++;
                    g = h = c;
                    e.substr(c, 5) === "LIMIT" ? (k = "LIMIT",
                    c += 5) : (k = null,
                    j === 0 && i('"LIMIT"'));
                    k === null && (e.substr(c, 5) === "limit" ? (k = "limit",
                    c += 5) : (k = null,
                    j === 0 && i('"limit"')));
                    if (k !== null) {
                        a = [];
                        for (b = l(); b !== null; )
                            a.push(b),
                            b = l();
                        if (a !== null)
                            if (b = ca(),
                            b !== null) {
                                d = [];
                                for (f = l(); f !== null; )
                                    d.push(f),
                                    f = l();
                                d !== null ? k = [k, a, b, d] : (k = null,
                                c = g)
                            } else
                                k = null,
                                c = g;
                        else
                            k = null,
                            c = g
                    } else
                        k = null,
                        c = g;
                    k !== null && (k = {
                        limit: parseInt(k[2].value)
                    });
                    k === null && (c = h);
                    j--;
                    j === 0 && k === null && i("[25] LimitClause");
                    return k
                }
                function X() {
                    var k, a, b, d, f, h, g;
                    j++;
                    g = h = c;
                    e.substr(c, 6) === "OFFSET" ? (k = "OFFSET",
                    c += 6) : (k = null,
                    j === 0 && i('"OFFSET"'));
                    k === null && (e.substr(c, 6) === "offset" ? (k = "offset",
                    c += 6) : (k = null,
                    j === 0 && i('"offset"')));
                    if (k !== null) {
                        a = [];
                        for (b = l(); b !== null; )
                            a.push(b),
                            b = l();
                        if (a !== null)
                            if (b = ca(),
                            b !== null) {
                                d = [];
                                for (f = l(); f !== null; )
                                    d.push(f),
                                    f = l();
                                d !== null ? k = [k, a, b, d] : (k = null,
                                c = g)
                            } else
                                k = null,
                                c = g;
                        else
                            k = null,
                            c = g
                    } else
                        k = null,
                        c = g;
                    k !== null && (k = {
                        offset: parseInt(k[2].value)
                    });
                    k === null && (c = h);
                    j--;
                    j === 0 && k === null && i("[26] OffsetClause");
                    return k
                }
                function $() {
                    var k, a, b, d, f, h, g, l, m;
                    j++;
                    l = c;
                    e.substr(c, 8) === "BINDINGS" ? (k = "BINDINGS",
                    c += 8) : (k = null,
                    j === 0 && i('"BINDINGS"'));
                    if (k !== null) {
                        a = [];
                        for (b = O(); b !== null; )
                            a.push(b),
                            b = O();
                        if (a !== null)
                            if (e.charCodeAt(c) === 123 ? (b = "{",
                            c++) : (b = null,
                            j === 0 && i('"{"')),
                            b !== null) {
                                d = [];
                                m = c;
                                e.charCodeAt(c) === 40 ? (f = "(",
                                c++) : (f = null,
                                j === 0 && i('"("'));
                                if (f !== null) {
                                    g = V();
                                    if (g !== null)
                                        for (h = []; g !== null; )
                                            h.push(g),
                                            g = V();
                                    else
                                        h = null;
                                    h !== null ? (e.charCodeAt(c) === 41 ? (g = ")",
                                    c++) : (g = null,
                                    j === 0 && i('")"')),
                                    g !== null ? f = [f, h, g] : (f = null,
                                    c = m)) : (f = null,
                                    c = m)
                                } else
                                    f = null,
                                    c = m;
                                for (f === null && (f = la()); f !== null; ) {
                                    d.push(f);
                                    m = c;
                                    e.charCodeAt(c) === 40 ? (f = "(",
                                    c++) : (f = null,
                                    j === 0 && i('"("'));
                                    if (f !== null) {
                                        g = V();
                                        if (g !== null)
                                            for (h = []; g !== null; )
                                                h.push(g),
                                                g = V();
                                        else
                                            h = null;
                                        h !== null ? (e.charCodeAt(c) === 41 ? (g = ")",
                                        c++) : (g = null,
                                        j === 0 && i('")"')),
                                        g !== null ? f = [f, h, g] : (f = null,
                                        c = m)) : (f = null,
                                        c = m)
                                    } else
                                        f = null,
                                        c = m;
                                    f === null && (f = la())
                                }
                                d !== null ? (e.charCodeAt(c) === 125 ? (f = "}",
                                c++) : (f = null,
                                j === 0 && i('"}"')),
                                f !== null ? k = [k, a, b, d, f] : (k = null,
                                c = l)) : (k = null,
                                c = l)
                            } else
                                k = null,
                                c = l;
                        else
                            k = null,
                            c = l
                    } else
                        k = null,
                        c = l;
                    k = k !== null ? k : "";
                    j--;
                    j === 0 && k === null && i("[27] BindingsClause");
                    return k
                }
                function V() {
                    var k;
                    j++;
                    k = P();
                    k === null && (k = Ma(),
                    k === null && (k = Na(),
                    k === null && (k = Oa(),
                    k === null && (e.substr(c, 5) === "UNDEF" ? (k = "UNDEF",
                    c += 5) : (k = null,
                    j === 0 && i('"UNDEF"'))))));
                    j--;
                    j === 0 && k === null && i("[28] BindingValue");
                    return k
                }
                function ba() {
                    var k, a, b, d, h, g, M, m, n, o;
                    j++;
                    n = m = c;
                    k = f();
                    if (k !== null) {
                        a = [];
                        for (b = l(); b !== null; )
                            a.push(b),
                            b = l();
                        if (a !== null)
                            if (b = ga(),
                            b !== null) {
                                o = c;
                                d = [];
                                for (h = l(); h !== null; )
                                    d.push(h),
                                    h = l();
                                if (d !== null)
                                    if (e.charCodeAt(c) === 59 ? (h = ";",
                                    c++) : (h = null,
                                    j === 0 && i('";"')),
                                    h !== null) {
                                        g = [];
                                        for (M = l(); M !== null; )
                                            g.push(M),
                                            M = l();
                                        g !== null ? (M = ba(),
                                        M = M !== null ? M : "",
                                        M !== null ? d = [d, h, g, M] : (d = null,
                                        c = o)) : (d = null,
                                        c = o)
                                    } else
                                        d = null,
                                        c = o;
                                else
                                    d = null,
                                    c = o;
                                d = d !== null ? d : "";
                                d !== null ? k = [k, a, b, d] : (k = null,
                                c = n)
                            } else
                                k = null,
                                c = n;
                        else
                            k = null,
                            c = n
                    } else
                        k = null,
                        c = n;
                    k !== null && (k = function(k, a, c, e) {
                        k = {
                            token: "query",
                            kind: "update"
                        };
                        k.prologue = a;
                        a = [c];
                        e.length != null && e[3] != null && e[3].units != null && (a = a.concat(e[3].units));
                        k.units = a;
                        return k
                    }(m, k[0], k[2], k[3]));
                    k === null && (c = m);
                    j--;
                    j === 0 && k === null && i("[30] Update");
                    return k
                }
                function ga() {
                    var k;
                    j++;
                    k = ha();
                    k === null && (k = ia(),
                    k === null && (k = ja(),
                    k === null && (k = na(),
                    k === null && (k = oa(),
                    k === null && (k = va(),
                    k === null && (k = wa(),
                    k === null && (k = xa())))))));
                    j--;
                    j === 0 && k === null && i("[31] Update1");
                    return k
                }
                function ha() {
                    var k, a, b, d, f, h, g, m, n, o;
                    j++;
                    n = m = c;
                    e.substr(c, 4) === "LOAD" ? (k = "LOAD",
                    c += 4) : (k = null,
                    j === 0 && i('"LOAD"'));
                    k === null && (e.substr(c, 4) === "load" ? (k = "load",
                    c += 4) : (k = null,
                    j === 0 && i('"load"')));
                    if (k !== null) {
                        a = [];
                        for (b = l(); b !== null; )
                            a.push(b),
                            b = l();
                        if (a !== null)
                            if (b = P(),
                            b !== null) {
                                d = [];
                                for (f = l(); f !== null; )
                                    d.push(f),
                                    f = l();
                                if (d !== null) {
                                    o = c;
                                    e.substr(c, 4) === "INTO" ? (f = "INTO",
                                    c += 4) : (f = null,
                                    j === 0 && i('"INTO"'));
                                    f === null && (e.substr(c, 4) === "into" ? (f = "into",
                                    c += 4) : (f = null,
                                    j === 0 && i('"into"')));
                                    if (f !== null) {
                                        h = [];
                                        for (g = l(); g !== null; )
                                            h.push(g),
                                            g = l();
                                        h !== null ? (g = Ha(),
                                        g !== null ? f = [f, h, g] : (f = null,
                                        c = o)) : (f = null,
                                        c = o)
                                    } else
                                        f = null,
                                        c = o;
                                    f = f !== null ? f : "";
                                    f !== null ? k = [k, a, b, d, f] : (k = null,
                                    c = n)
                                } else
                                    k = null,
                                    c = n
                            } else
                                k = null,
                                c = n;
                        else
                            k = null,
                            c = n
                    } else
                        k = null,
                        c = n;
                    k !== null && (k = function(k, a, c) {
                        k = {
                            kind: "load",
                            token: "executableunit"
                        };
                        k.sourceGraph = a;
                        k.destinyGraph = c[2];
                        return k
                    }(m, k[2], k[4]));
                    k === null && (c = m);
                    j--;
                    j === 0 && k === null && i("[32] Load");
                    return k
                }
                function ia() {
                    var k, a, b, d, f, h, g;
                    j++;
                    g = h = c;
                    e.substr(c, 5) === "CLEAR" ? (k = "CLEAR",
                    c += 5) : (k = null,
                    j === 0 && i('"CLEAR"'));
                    k === null && (e.substr(c, 5) === "clear" ? (k = "clear",
                    c += 5) : (k = null,
                    j === 0 && i('"clear"')));
                    if (k !== null) {
                        a = [];
                        for (b = l(); b !== null; )
                            a.push(b),
                            b = l();
                        if (a !== null)
                            if (e.substr(c, 6) === "SILENT" ? (b = "SILENT",
                            c += 6) : (b = null,
                            j === 0 && i('"SILENT"')),
                            b === null && (e.substr(c, 6) === "silent" ? (b = "silent",
                            c += 6) : (b = null,
                            j === 0 && i('"silent"'))),
                            b = b !== null ? b : "",
                            b !== null) {
                                d = [];
                                for (f = l(); f !== null; )
                                    d.push(f),
                                    f = l();
                                d !== null ? (f = db(),
                                f !== null ? k = [k, a, b, d, f] : (k = null,
                                c = g)) : (k = null,
                                c = g)
                            } else
                                k = null,
                                c = g;
                        else
                            k = null,
                            c = g
                    } else
                        k = null,
                        c = g;
                    k !== null && (k = function(k, a) {
                        var c = {
                            kind: "clear",
                            token: "executableunit"
                        };
                        c.destinyGraph = a;
                        return c
                    }(h, k[4]));
                    k === null && (c = h);
                    j--;
                    j === 0 && k === null && i("[33] Clear");
                    return k
                }
                function ja() {
                    var k, a, b, d, f, h, g;
                    j++;
                    g = h = c;
                    e.substr(c, 4) === "DROP" ? (k = "DROP",
                    c += 4) : (k = null,
                    j === 0 && i('"DROP"'));
                    k === null && (e.substr(c, 4) === "drop" ? (k = "drop",
                    c += 4) : (k = null,
                    j === 0 && i('"drop"')));
                    if (k !== null) {
                        a = [];
                        for (b = l(); b !== null; )
                            a.push(b),
                            b = l();
                        if (a !== null)
                            if (e.substr(c, 6) === "SILENT" ? (b = "SILENT",
                            c += 6) : (b = null,
                            j === 0 && i('"SILENT"')),
                            b === null && (e.substr(c, 6) === "silent" ? (b = "silent",
                            c += 6) : (b = null,
                            j === 0 && i('"silent"'))),
                            b = b !== null ? b : "",
                            b !== null) {
                                d = [];
                                for (f = l(); f !== null; )
                                    d.push(f),
                                    f = l();
                                d !== null ? (f = db(),
                                f !== null ? k = [k, a, b, d, f] : (k = null,
                                c = g)) : (k = null,
                                c = g)
                            } else
                                k = null,
                                c = g;
                        else
                            k = null,
                            c = g
                    } else
                        k = null,
                        c = g;
                    k !== null && (k = function(k, a) {
                        var c = {
                            kind: "drop",
                            token: "executableunit"
                        };
                        c.destinyGraph = a;
                        return c
                    }(h, k[4]));
                    k === null && (c = h);
                    j--;
                    j === 0 && k === null && i("[34] Drop");
                    return k
                }
                function na() {
                    var a, b, y, d, f, h, g;
                    j++;
                    g = h = c;
                    e.substr(c, 6) === "CREATE" ? (a = "CREATE",
                    c += 6) : (a = null,
                    j === 0 && i('"CREATE"'));
                    a === null && (e.substr(c, 6) === "create" ? (a = "create",
                    c += 6) : (a = null,
                    j === 0 && i('"create"')));
                    if (a !== null) {
                        b = [];
                        for (y = l(); y !== null; )
                            b.push(y),
                            y = l();
                        if (b !== null)
                            if (e.substr(c, 6) === "SILENT" ? (y = "SILENT",
                            c += 6) : (y = null,
                            j === 0 && i('"SILENT"')),
                            y === null && (e.substr(c, 6) === "silent" ? (y = "silent",
                            c += 6) : (y = null,
                            j === 0 && i('"silent"'))),
                            y = y !== null ? y : "",
                            y !== null) {
                                d = [];
                                for (f = l(); f !== null; )
                                    d.push(f),
                                    f = l();
                                d !== null ? (f = Ha(),
                                f !== null ? a = [a, b, y, d, f] : (a = null,
                                c = g)) : (a = null,
                                c = g)
                            } else
                                a = null,
                                c = g;
                        else
                            a = null,
                            c = g
                    } else
                        a = null,
                        c = g;
                    a !== null && (a = function(a, k) {
                        var c = {
                            kind: "create",
                            token: "executableunit"
                        };
                        c.destinyGraph = k;
                        return c
                    }(h, a[4]));
                    a === null && (c = h);
                    j--;
                    j === 0 && a === null && i("[35] Create");
                    return a
                }
                function oa() {
                    var a, b, y, d, f, h, g;
                    j++;
                    g = h = c;
                    e.substr(c, 6) === "INSERT" ? (a = "INSERT",
                    c += 6) : (a = null,
                    j === 0 && i('"INSERT"'));
                    a === null && (e.substr(c, 6) === "insert" ? (a = "insert",
                    c += 6) : (a = null,
                    j === 0 && i('"insert"')));
                    if (a !== null) {
                        b = [];
                        for (y = l(); y !== null; )
                            b.push(y),
                            y = l();
                        if (b !== null)
                            if (e.substr(c, 4) === "DATA" ? (y = "DATA",
                            c += 4) : (y = null,
                            j === 0 && i('"DATA"')),
                            y === null && (e.substr(c, 4) === "data" ? (y = "data",
                            c += 4) : (y = null,
                            j === 0 && i('"data"'))),
                            y !== null) {
                                d = [];
                                for (f = l(); f !== null; )
                                    d.push(f),
                                    f = l();
                                d !== null ? (f = ab(),
                                f !== null ? a = [a, b, y, d, f] : (a = null,
                                c = g)) : (a = null,
                                c = g)
                            } else
                                a = null,
                                c = g;
                        else
                            a = null,
                            c = g
                    } else
                        a = null,
                        c = g;
                    a !== null && (a = function(a, k) {
                        var c = {
                            kind: "insertdata",
                            token: "executableunit"
                        };
                        c.quads = k;
                        return c
                    }(h, a[4]));
                    a === null && (c = h);
                    j--;
                    j === 0 && a === null && i("[36] InsertData");
                    return a
                }
                function va() {
                    var a, b, y, d, f, h;
                    j++;
                    h = f = c;
                    e.substr(c, 6) === "DELETE" ? (a = "DELETE",
                    c += 6) : (a = null,
                    j === 0 && i('"DELETE"'));
                    a === null && (e.substr(c, 6) === "delete" ? (a = "delete",
                    c += 6) : (a = null,
                    j === 0 && i('"delete"')));
                    if (a !== null) {
                        b = [];
                        for (y = l(); y !== null; )
                            b.push(y),
                            y = l();
                        b !== null ? (e.substr(c, 4) === "DATA" ? (y = "DATA",
                        c += 4) : (y = null,
                        j === 0 && i('"DATA"')),
                        y === null && (e.substr(c, 4) === "data" ? (y = "data",
                        c += 4) : (y = null,
                        j === 0 && i('"data"'))),
                        y !== null ? (d = ab(),
                        d !== null ? a = [a, b, y, d] : (a = null,
                        c = h)) : (a = null,
                        c = h)) : (a = null,
                        c = h)
                    } else
                        a = null,
                        c = h;
                    a !== null && (a = function(a, k) {
                        var c = {
                            kind: "deletedata",
                            token: "executableunit"
                        };
                        c.quads = k;
                        return c
                    }(f, a[3]));
                    a === null && (c = f);
                    j--;
                    j === 0 && a === null && i("[37] DeleteData");
                    return a
                }
                function wa() {
                    var a, b, y, d, f, h, g;
                    j++;
                    g = h = c;
                    e.substr(c, 6) === "DELETE" ? (a = "DELETE",
                    c += 6) : (a = null,
                    j === 0 && i('"DELETE"'));
                    a === null && (e.substr(c, 6) === "delete" ? (a = "delete",
                    c += 6) : (a = null,
                    j === 0 && i('"delete"')));
                    if (a !== null) {
                        b = [];
                        for (y = l(); y !== null; )
                            b.push(y),
                            y = l();
                        if (b !== null)
                            if (e.substr(c, 5) === "WHERE" ? (y = "WHERE",
                            c += 5) : (y = null,
                            j === 0 && i('"WHERE"')),
                            y === null && (e.substr(c, 5) === "where" ? (y = "where",
                            c += 5) : (y = null,
                            j === 0 && i('"where"'))),
                            y !== null) {
                                d = [];
                                for (f = l(); f !== null; )
                                    d.push(f),
                                    f = l();
                                d !== null ? (f = T(),
                                f !== null ? a = [a, b, y, d, f] : (a = null,
                                c = g)) : (a = null,
                                c = g)
                            } else
                                a = null,
                                c = g;
                        else
                            a = null,
                            c = g
                    } else
                        a = null,
                        c = g;
                    a !== null && (a = function(a, k) {
                        var c = {
                            kind: "modify"
                        };
                        c.pattern = k;
                        c["with"] = null;
                        c.using = null;
                        for (var b = [], e = k.patterns[0], e = e.triplesContext == null && e.patterns != null ? e.patterns[0].triplesContext : e.triplesContext, i = 0; i < e.length; i++) {
                            var y = {}
                              , d = e[i];
                            y.subject = d.subject;
                            y.predicate = d.predicate;
                            y.object = d.object;
                            y.graph = d.graph;
                            b.push(y)
                        }
                        c["delete"] = b;
                        return c
                    }(h, a[4]));
                    a === null && (c = h);
                    j--;
                    j === 0 && a === null && i("[38] DeleteWhere");
                    return a
                }
                function xa() {
                    var a, b, y, d, f, h, g, m, n, o, q, r, G;
                    j++;
                    h = G = r = c;
                    e.substr(c, 4) === "WITH" ? (a = "WITH",
                    c += 4) : (a = null,
                    j === 0 && i('"WITH"'));
                    a === null && (e.substr(c, 4) === "with" ? (a = "with",
                    c += 4) : (a = null,
                    j === 0 && i('"with"')));
                    if (a !== null) {
                        b = [];
                        for (y = l(); y !== null; )
                            b.push(y),
                            y = l();
                        b !== null ? (y = P(),
                        y !== null ? a = [a, b, y] : (a = null,
                        c = h)) : (a = null,
                        c = h)
                    } else
                        a = null,
                        c = h;
                    a = a !== null ? a : "";
                    if (a !== null) {
                        b = [];
                        for (y = l(); y !== null; )
                            b.push(y),
                            y = l();
                        if (b !== null) {
                            h = c;
                            y = ya();
                            if (y !== null) {
                                d = [];
                                for (f = l(); f !== null; )
                                    d.push(f),
                                    f = l();
                                d !== null ? (f = bb(),
                                f = f !== null ? f : "",
                                f !== null ? y = [y, d, f] : (y = null,
                                c = h)) : (y = null,
                                c = h)
                            } else
                                y = null,
                                c = h;
                            y === null && (y = bb());
                            if (y !== null) {
                                d = [];
                                for (f = l(); f !== null; )
                                    d.push(f),
                                    f = l();
                                if (d !== null) {
                                    f = [];
                                    for (h = cb(); h !== null; )
                                        f.push(h),
                                        h = cb();
                                    if (f !== null) {
                                        h = [];
                                        for (g = l(); g !== null; )
                                            h.push(g),
                                            g = l();
                                        if (h !== null)
                                            if (e.substr(c, 5) === "WHERE" ? (g = "WHERE",
                                            c += 5) : (g = null,
                                            j === 0 && i('"WHERE"')),
                                            g === null && (e.substr(c, 5) === "where" ? (g = "where",
                                            c += 5) : (g = null,
                                            j === 0 && i('"where"'))),
                                            g !== null) {
                                                m = [];
                                                for (n = l(); n !== null; )
                                                    m.push(n),
                                                    n = l();
                                                if (m !== null)
                                                    if (n = T(),
                                                    n !== null) {
                                                        o = [];
                                                        for (q = l(); q !== null; )
                                                            o.push(q),
                                                            q = l();
                                                        o !== null ? a = [a, b, y, d, f, h, g, m, n, o] : (a = null,
                                                        c = G)
                                                    } else
                                                        a = null,
                                                        c = G;
                                                else
                                                    a = null,
                                                    c = G
                                            } else
                                                a = null,
                                                c = G;
                                        else
                                            a = null,
                                            c = G
                                    } else
                                        a = null,
                                        c = G
                                } else
                                    a = null,
                                    c = G
                            } else
                                a = null,
                                c = G
                        } else
                            a = null,
                            c = G
                    } else
                        a = null,
                        c = G;
                    a !== null && (a = function(a, k, c, b, e) {
                        a = {
                            kind: "modify"
                        };
                        a["with"] = k != "" ? k[2] : null;
                        c.length === 3 && c[2] === "" ? (a["delete"] = c[0],
                        a.insert = null) : c.length === 3 && c[0].length != null && c[1].length != null && c[2].length != null ? (a["delete"] = c[0],
                        a.insert = c[2]) : (a.insert = c,
                        a["delete"] = null);
                        b != "" && (a.using = b);
                        a.pattern = e;
                        return a
                    }(r, a[0], a[2], a[4], a[8]));
                    a === null && (c = r);
                    j--;
                    j === 0 && a === null && i("[39] Modify");
                    return a
                }
                function ya() {
                    var a, b, y, d;
                    j++;
                    d = y = c;
                    e.substr(c, 6) === "DELETE" ? (a = "DELETE",
                    c += 6) : (a = null,
                    j === 0 && i('"DELETE"'));
                    a === null && (e.substr(c, 6) === "delete" ? (a = "delete",
                    c += 6) : (a = null,
                    j === 0 && i('"delete"')));
                    a !== null ? (b = $a(),
                    b !== null ? a = [a, b] : (a = null,
                    c = d)) : (a = null,
                    c = d);
                    a !== null && (a = a[1]);
                    a === null && (c = y);
                    j--;
                    j === 0 && a === null && i("[40] DeleteClause");
                    return a
                }
                function bb() {
                    var a, b, d, f;
                    j++;
                    f = d = c;
                    e.substr(c, 6) === "INSERT" ? (a = "INSERT",
                    c += 6) : (a = null,
                    j === 0 && i('"INSERT"'));
                    a === null && (e.substr(c, 6) === "insert" ? (a = "insert",
                    c += 6) : (a = null,
                    j === 0 && i('"insert"')));
                    a !== null ? (b = $a(),
                    b !== null ? a = [a, b] : (a = null,
                    c = f)) : (a = null,
                    c = f);
                    a !== null && (a = a[1]);
                    a === null && (c = d);
                    j--;
                    j === 0 && a === null && i("[41] InsertClause");
                    return a
                }
                function cb() {
                    var a, b, d, f, h, g, M, m, n;
                    j++;
                    m = M = c;
                    a = [];
                    for (b = l(); b !== null; )
                        a.push(b),
                        b = l();
                    if (a !== null)
                        if (e.substr(c, 5) === "USING" ? (b = "USING",
                        c += 5) : (b = null,
                        j === 0 && i('"USING"')),
                        b === null && (e.substr(c, 5) === "using" ? (b = "using",
                        c += 5) : (b = null,
                        j === 0 && i('"using"'))),
                        b !== null) {
                            d = [];
                            for (f = l(); f !== null; )
                                d.push(f),
                                f = l();
                            if (d !== null) {
                                f = P();
                                if (f === null)
                                    if (n = c,
                                    e.substr(c, 5) === "NAMED" ? (f = "NAMED",
                                    c += 5) : (f = null,
                                    j === 0 && i('"NAMED"')),
                                    f === null && (e.substr(c, 5) === "named" ? (f = "named",
                                    c += 5) : (f = null,
                                    j === 0 && i('"named"'))),
                                    f !== null) {
                                        h = [];
                                        for (g = l(); g !== null; )
                                            h.push(g),
                                            g = l();
                                        h !== null ? (g = P(),
                                        g !== null ? f = [f, h, g] : (f = null,
                                        c = n)) : (f = null,
                                        c = n)
                                    } else
                                        f = null,
                                        c = n;
                                f !== null ? a = [a, b, d, f] : (a = null,
                                c = m)
                            } else
                                a = null,
                                c = m
                        } else
                            a = null,
                            c = m;
                    else
                        a = null,
                        c = m;
                    a !== null && (a = a[3].length != null ? {
                        kind: "named",
                        uri: a[3][2]
                    } : {
                        kind: "default",
                        uri: a[3]
                    });
                    a === null && (c = M);
                    j--;
                    j === 0 && a === null && i("[42] UsingClause");
                    return a
                }
                function Ha() {
                    var a, b, d, f, h;
                    j++;
                    h = f = c;
                    e.substr(c, 5) === "GRAPH" ? (a = "GRAPH",
                    c += 5) : (a = null,
                    j === 0 && i('"GRAPH"'));
                    a === null && (e.substr(c, 5) === "graph" ? (a = "graph",
                    c += 5) : (a = null,
                    j === 0 && i('"graph"')));
                    if (a !== null) {
                        b = [];
                        for (d = l(); d !== null; )
                            b.push(d),
                            d = l();
                        b !== null ? (d = P(),
                        d !== null ? a = [a, b, d] : (a = null,
                        c = h)) : (a = null,
                        c = h)
                    } else
                        a = null,
                        c = h;
                    a !== null && (a = a[2]);
                    a === null && (c = f);
                    j--;
                    j === 0 && a === null && i("[43] GraphRef");
                    return a
                }
                function db() {
                    var a, b;
                    j++;
                    b = c;
                    a = Ha();
                    a === null && (c = b);
                    a === null && (b = c,
                    e.substr(c, 7) === "DEFAULT" ? (a = "DEFAULT",
                    c += 7) : (a = null,
                    j === 0 && i('"DEFAULT"')),
                    a === null && (e.substr(c, 7) === "default" ? (a = "default",
                    c += 7) : (a = null,
                    j === 0 && i('"default"'))),
                    a !== null && (a = "default"),
                    a === null && (c = b),
                    a === null && (b = c,
                    e.substr(c, 5) === "NAMED" ? (a = "NAMED",
                    c += 5) : (a = null,
                    j === 0 && i('"NAMED"')),
                    a === null && (e.substr(c, 5) === "named" ? (a = "named",
                    c += 5) : (a = null,
                    j === 0 && i('"named"'))),
                    a !== null && (a = "named"),
                    a === null && (c = b),
                    a === null && (b = c,
                    e.substr(c, 3) === "ALL" ? (a = "ALL",
                    c += 3) : (a = null,
                    j === 0 && i('"ALL"')),
                    a === null && (e.substr(c, 3) === "all" ? (a = "all",
                    c += 3) : (a = null,
                    j === 0 && i('"all"'))),
                    a !== null && (a = "all"),
                    a === null && (c = b))));
                    j--;
                    j === 0 && a === null && i("[44] GraphRefAll");
                    return a
                }
                function $a() {
                    var a, b, d, f, h, g, M, m, n, o;
                    j++;
                    o = n = c;
                    a = [];
                    for (b = l(); b !== null; )
                        a.push(b),
                        b = l();
                    if (a !== null)
                        if (e.charCodeAt(c) === 123 ? (b = "{",
                        c++) : (b = null,
                        j === 0 && i('"{"')),
                        b !== null) {
                            d = [];
                            for (f = l(); f !== null; )
                                d.push(f),
                                f = l();
                            if (d !== null)
                                if (f = eb(),
                                f !== null) {
                                    h = [];
                                    for (g = l(); g !== null; )
                                        h.push(g),
                                        g = l();
                                    if (h !== null)
                                        if (e.charCodeAt(c) === 125 ? (g = "}",
                                        c++) : (g = null,
                                        j === 0 && i('"}"')),
                                        g !== null) {
                                            M = [];
                                            for (m = l(); m !== null; )
                                                M.push(m),
                                                m = l();
                                            M !== null ? a = [a, b, d, f, h, g, M] : (a = null,
                                            c = o)
                                        } else
                                            a = null,
                                            c = o;
                                    else
                                        a = null,
                                        c = o
                                } else
                                    a = null,
                                    c = o;
                            else
                                a = null,
                                c = o
                        } else
                            a = null,
                            c = o;
                    else
                        a = null,
                        c = o;
                    a !== null && (a = a[3].quadsContext);
                    a === null && (c = n);
                    j--;
                    j === 0 && a === null && i("[45] QuadPattern");
                    return a
                }
                function ab() {
                    var a, b, d, f, h, g, m, n, o, q;
                    j++;
                    q = o = c;
                    a = [];
                    for (b = l(); b !== null; )
                        a.push(b),
                        b = l();
                    if (a !== null)
                        if (e.charCodeAt(c) === 123 ? (b = "{",
                        c++) : (b = null,
                        j === 0 && i('"{"')),
                        b !== null) {
                            d = [];
                            for (f = l(); f !== null; )
                                d.push(f),
                                f = l();
                            if (d !== null)
                                if (f = eb(),
                                f !== null) {
                                    h = [];
                                    for (g = l(); g !== null; )
                                        h.push(g),
                                        g = l();
                                    if (h !== null)
                                        if (e.charCodeAt(c) === 125 ? (g = "}",
                                        c++) : (g = null,
                                        j === 0 && i('"}"')),
                                        g !== null) {
                                            m = [];
                                            for (n = l(); n !== null; )
                                                m.push(n),
                                                n = l();
                                            m !== null ? a = [a, b, d, f, h, g, m] : (a = null,
                                            c = q)
                                        } else
                                            a = null,
                                            c = q;
                                    else
                                        a = null,
                                        c = q
                                } else
                                    a = null,
                                    c = q;
                            else
                                a = null,
                                c = q
                        } else
                            a = null,
                            c = q;
                    else
                        a = null,
                        c = q;
                    a !== null && (a = a[3].quadsContext);
                    a === null && (c = o);
                    j--;
                    j === 0 && a === null && i("[46] QuadData");
                    return a
                }
                function eb() {
                    var a, b, d, f, h, g, l, m;
                    j++;
                    l = g = c;
                    a = pa();
                    a = a !== null ? a : "";
                    if (a !== null) {
                        b = [];
                        m = c;
                        d = fb();
                        d !== null ? (e.charCodeAt(c) === 46 ? (f = ".",
                        c++) : (f = null,
                        j === 0 && i('"."')),
                        f = f !== null ? f : "",
                        f !== null ? (h = pa(),
                        h = h !== null ? h : "",
                        h !== null ? d = [d, f, h] : (d = null,
                        c = m)) : (d = null,
                        c = m)) : (d = null,
                        c = m);
                        for (; d !== null; )
                            b.push(d),
                            m = c,
                            d = fb(),
                            d !== null ? (e.charCodeAt(c) === 46 ? (f = ".",
                            c++) : (f = null,
                            j === 0 && i('"."')),
                            f = f !== null ? f : "",
                            f !== null ? (h = pa(),
                            h = h !== null ? h : "",
                            h !== null ? d = [d, f, h] : (d = null,
                            c = m)) : (d = null,
                            c = m)) : (d = null,
                            c = m);
                        b !== null ? a = [a, b] : (a = null,
                        c = l)
                    } else
                        a = null,
                        c = l;
                    a !== null && (a = function(a, k, c) {
                        a = [];
                        if (k.triplesContext != null && k.triplesContext != null)
                            for (var b = 0; b < k.triplesContext.length; b++) {
                                var e = k.triplesContext[b];
                                e.graph = null;
                                a.push(e)
                            }
                        if (c && c.length > 0 && c[0].length > 0 && (a = a.concat(c[0][0].quadsContext),
                        c[0][2] != null && c[0][2].triplesContext != null))
                            for (b = 0; b < c[0][2].triplesContext.length; b++)
                                e = c[0][2].triplesContext[b],
                                e.graph = null,
                                a.push(e);
                        return {
                            token: "quads",
                            quadsContext: a
                        }
                    }(g, a[0], a[1]));
                    a === null && (c = g);
                    j--;
                    j === 0 && a === null && i("[47] Quads");
                    return a
                }
                function fb() {
                    var a, b, d, f, h, g, m, n, o, q, N, r, G, v;
                    j++;
                    v = G = c;
                    a = [];
                    for (b = l(); b !== null; )
                        a.push(b),
                        b = l();
                    if (a !== null)
                        if (e.substr(c, 5) === "GRAPH" ? (b = "GRAPH",
                        c += 5) : (b = null,
                        j === 0 && i('"GRAPH"')),
                        b === null && (e.substr(c, 5) === "graph" ? (b = "graph",
                        c += 5) : (b = null,
                        j === 0 && i('"graph"'))),
                        b !== null) {
                            d = [];
                            for (f = l(); f !== null; )
                                d.push(f),
                                f = l();
                            if (d !== null)
                                if (f = ka(),
                                f !== null) {
                                    h = [];
                                    for (g = l(); g !== null; )
                                        h.push(g),
                                        g = l();
                                    if (h !== null)
                                        if (e.charCodeAt(c) === 123 ? (g = "{",
                                        c++) : (g = null,
                                        j === 0 && i('"{"')),
                                        g !== null) {
                                            m = [];
                                            for (n = l(); n !== null; )
                                                m.push(n),
                                                n = l();
                                            if (m !== null)
                                                if (n = pa(),
                                                n = n !== null ? n : "",
                                                n !== null) {
                                                    o = [];
                                                    for (q = l(); q !== null; )
                                                        o.push(q),
                                                        q = l();
                                                    if (o !== null)
                                                        if (e.charCodeAt(c) === 125 ? (q = "}",
                                                        c++) : (q = null,
                                                        j === 0 && i('"}"')),
                                                        q !== null) {
                                                            N = [];
                                                            for (r = l(); r !== null; )
                                                                N.push(r),
                                                                r = l();
                                                            N !== null ? a = [a, b, d, f, h, g, m, n, o, q, N] : (a = null,
                                                            c = v)
                                                        } else
                                                            a = null,
                                                            c = v;
                                                    else
                                                        a = null,
                                                        c = v
                                                } else
                                                    a = null,
                                                    c = v;
                                            else
                                                a = null,
                                                c = v
                                        } else
                                            a = null,
                                            c = v;
                                    else
                                        a = null,
                                        c = v
                                } else
                                    a = null,
                                    c = v;
                            else
                                a = null,
                                c = v
                        } else
                            a = null,
                            c = v;
                    else
                        a = null,
                        c = v;
                    a !== null && (a = function(a, k, c) {
                        for (var a = [], b = 0; b < c.triplesContext.length; b++) {
                            var e = c.triplesContext[b];
                            e.graph = k;
                            a.push(e)
                        }
                        return {
                            token: "quadsnottriples",
                            quadsContext: a
                        }
                    }(G, a[3], a[7]));
                    a === null && (c = G);
                    j--;
                    j === 0 && a === null && i("[48] QuadsNotTriples");
                    return a
                }
                function pa() {
                    var a, b, d, f, h, g, m, n;
                    j++;
                    m = g = c;
                    a = lb();
                    if (a !== null) {
                        n = c;
                        b = [];
                        for (d = l(); d !== null; )
                            b.push(d),
                            d = l();
                        if (b !== null)
                            if (e.charCodeAt(c) === 46 ? (d = ".",
                            c++) : (d = null,
                            j === 0 && i('"."')),
                            d !== null) {
                                f = [];
                                for (h = l(); h !== null; )
                                    f.push(h),
                                    h = l();
                                f !== null ? (h = pa(),
                                h = h !== null ? h : "",
                                h !== null ? b = [b, d, f, h] : (b = null,
                                c = n)) : (b = null,
                                c = n)
                            } else
                                b = null,
                                c = n;
                        else
                            b = null,
                            c = n;
                        b = b !== null ? b : "";
                        b !== null ? a = [a, b] : (a = null,
                        c = m)
                    } else
                        a = null,
                        c = m;
                    a !== null && (a = function(a, k, c) {
                        a = k.triplesContext;
                        typeof c === "object" && c.length != null && c[3].triplesContext != null && (a = a.concat(c[3].triplesContext));
                        return {
                            token: "triplestemplate",
                            triplesContext: a
                        }
                    }(g, a[0], a[1]));
                    a === null && (c = g);
                    j--;
                    j === 0 && a === null && i("[49] TriplesTemplate");
                    return a
                }
                function T() {
                    var a, b, d, f, h, g, m;
                    j++;
                    m = g = c;
                    e.charCodeAt(c) === 123 ? (a = "{",
                    c++) : (a = null,
                    j === 0 && i('"{"'));
                    if (a !== null) {
                        b = [];
                        for (d = l(); d !== null; )
                            b.push(d),
                            d = l();
                        if (b !== null)
                            if (d = o(),
                            d !== null) {
                                f = [];
                                for (h = l(); h !== null; )
                                    f.push(h),
                                    h = l();
                                f !== null ? (e.charCodeAt(c) === 125 ? (h = "}",
                                c++) : (h = null,
                                j === 0 && i('"}"')),
                                h !== null ? a = [a, b, d, f, h] : (a = null,
                                c = m)) : (a = null,
                                c = m)
                            } else
                                a = null,
                                c = m;
                        else
                            a = null,
                            c = m
                    } else
                        a = null,
                        c = m;
                    a !== null && (a = a[2]);
                    a === null && (c = g);
                    if (a === null) {
                        m = g = c;
                        e.charCodeAt(c) === 123 ? (a = "{",
                        c++) : (a = null,
                        j === 0 && i('"{"'));
                        if (a !== null) {
                            b = [];
                            for (d = l(); d !== null; )
                                b.push(d),
                                d = l();
                            if (b !== null)
                                if (d = xb(),
                                d !== null) {
                                    f = [];
                                    for (h = l(); h !== null; )
                                        f.push(h),
                                        h = l();
                                    f !== null ? (e.charCodeAt(c) === 125 ? (h = "}",
                                    c++) : (h = null,
                                    j === 0 && i('"}"')),
                                    h !== null ? a = [a, b, d, f, h] : (a = null,
                                    c = m)) : (a = null,
                                    c = m)
                                } else
                                    a = null,
                                    c = m;
                            else
                                a = null,
                                c = m
                        } else
                            a = null,
                            c = m;
                        a !== null && (a = a[2]);
                        a === null && (c = g)
                    }
                    j--;
                    j === 0 && a === null && i("[50] GroupGraphPattern");
                    return a
                }
                function xb() {
                    var a, b, d, f, h, g, m, n, o, q, N;
                    j++;
                    q = o = c;
                    a = Ba();
                    a = a !== null ? a : "";
                    if (a !== null) {
                        b = [];
                        for (d = l(); d !== null; )
                            b.push(d),
                            d = l();
                        if (b !== null) {
                            d = [];
                            N = c;
                            f = mb();
                            if (f !== null) {
                                h = [];
                                for (g = l(); g !== null; )
                                    h.push(g),
                                    g = l();
                                if (h !== null)
                                    if (e.charCodeAt(c) === 46 ? (g = ".",
                                    c++) : (g = null,
                                    j === 0 && i('"."')),
                                    g = g !== null ? g : "",
                                    g !== null) {
                                        m = [];
                                        for (n = l(); n !== null; )
                                            m.push(n),
                                            n = l();
                                        m !== null ? (n = Ba(),
                                        n = n !== null ? n : "",
                                        n !== null ? f = [f, h, g, m, n] : (f = null,
                                        c = N)) : (f = null,
                                        c = N)
                                    } else
                                        f = null,
                                        c = N;
                                else
                                    f = null,
                                    c = N
                            } else
                                f = null,
                                c = N;
                            for (; f !== null; )
                                if (d.push(f),
                                N = c,
                                f = mb(),
                                f !== null) {
                                    h = [];
                                    for (g = l(); g !== null; )
                                        h.push(g),
                                        g = l();
                                    if (h !== null)
                                        if (e.charCodeAt(c) === 46 ? (g = ".",
                                        c++) : (g = null,
                                        j === 0 && i('"."')),
                                        g = g !== null ? g : "",
                                        g !== null) {
                                            m = [];
                                            for (n = l(); n !== null; )
                                                m.push(n),
                                                n = l();
                                            m !== null ? (n = Ba(),
                                            n = n !== null ? n : "",
                                            n !== null ? f = [f, h, g, m, n] : (f = null,
                                            c = N)) : (f = null,
                                            c = N)
                                        } else
                                            f = null,
                                            c = N;
                                    else
                                        f = null,
                                        c = N
                                } else
                                    f = null,
                                    c = N;
                            d !== null ? a = [a, b, d] : (a = null,
                            c = q)
                        } else
                            a = null,
                            c = q
                    } else
                        a = null,
                        c = q;
                    a !== null && (a = function(a, k, c) {
                        a = [];
                        k != null && k != [] && a.push(k);
                        for (k = 0; k < c.length; k++)
                            for (var b = 0; b < c[k].length; b++)
                                c[k][b].token != null && a.push(c[k][b]);
                        for (var c = [], e = [], i = [], k = 0; k < a.length; k++)
                            if (a[k].token != "triplespattern" && a[k].token != "filter") {
                                if (e.length != 0 || i.length != 0) {
                                    for (var d = [], b = 0; b < e.length; b++)
                                        d = d.concat(e[b].triplesContext);
                                    d.length > 0 && c.push({
                                        token: "basicgraphpattern",
                                        triplesContext: d
                                    });
                                    e = []
                                }
                                c.push(a[k])
                            } else
                                a[k].token === "triplespattern" ? e.push(a[k]) : i.push(a[k]);
                        if (e.length != 0 || i.length != 0) {
                            d = [];
                            for (b = 0; b < e.length; b++)
                                d = d.concat(e[b].triplesContext);
                            d.length > 0 && c.push({
                                token: "basicgraphpattern",
                                triplesContext: d
                            })
                        }
                        return {
                            token: "groupgraphpattern",
                            patterns: c,
                            filters: i
                        }
                    }(o, a[0], a[2]));
                    a === null && (c = o);
                    j--;
                    j === 0 && a === null && i("[51] GroupGraphPatternSub");
                    return a
                }
                function Ba() {
                    var a, b, d, f, h, g, m;
                    j++;
                    g = h = c;
                    a = yb();
                    if (a !== null) {
                        m = c;
                        b = [];
                        for (d = l(); d !== null; )
                            b.push(d),
                            d = l();
                        b !== null ? (e.charCodeAt(c) === 46 ? (d = ".",
                        c++) : (d = null,
                        j === 0 && i('"."')),
                        d !== null ? (f = Ba(),
                        f = f !== null ? f : "",
                        f !== null ? b = [b, d, f] : (b = null,
                        c = m)) : (b = null,
                        c = m)) : (b = null,
                        c = m);
                        b = b !== null ? b : "";
                        b !== null ? a = [a, b] : (a = null,
                        c = g)
                    } else
                        a = null,
                        c = g;
                    a !== null && (a = function(a, k, c) {
                        a = k.triplesContext;
                        typeof c === "object" && c.length != null && c[2].triplesContext != null && (a = a.concat(c[2].triplesContext));
                        return {
                            token: "triplespattern",
                            triplesContext: a
                        }
                    }(h, a[0], a[1]));
                    a === null && (c = h);
                    j--;
                    j === 0 && a === null && i("[54] TriplesBlock");
                    return a
                }
                function mb() {
                    var a;
                    j++;
                    a = zb();
                    a === null && (a = Ab(),
                    a === null && (a = Bb(),
                    a === null && (a = Cb(),
                    a === null && (a = Db(),
                    a === null && (a = Eb())))));
                    j--;
                    j === 0 && a === null && i("[53] GraphPatternNotTriples");
                    return a
                }
                function Ab() {
                    var a, b, d, f, h, g;
                    j++;
                    g = h = c;
                    a = [];
                    for (b = l(); b !== null; )
                        a.push(b),
                        b = l();
                    if (a !== null)
                        if (e.substr(c, 8) === "OPTIONAL" ? (b = "OPTIONAL",
                        c += 8) : (b = null,
                        j === 0 && i('"OPTIONAL"')),
                        b === null && (e.substr(c, 8) === "optional" ? (b = "optional",
                        c += 8) : (b = null,
                        j === 0 && i('"optional"'))),
                        b !== null) {
                            d = [];
                            for (f = l(); f !== null; )
                                d.push(f),
                                f = l();
                            d !== null ? (f = T(),
                            f !== null ? a = [a, b, d, f] : (a = null,
                            c = g)) : (a = null,
                            c = g)
                        } else
                            a = null,
                            c = g;
                    else
                        a = null,
                        c = g;
                    a !== null && (a = {
                        token: "optionalgraphpattern",
                        value: a[3]
                    });
                    a === null && (c = h);
                    j--;
                    j === 0 && a === null && i("[54] OptionalGraphPattern");
                    return a
                }
                function Cb() {
                    var a, b, d, f, h, g, m, n;
                    j++;
                    n = m = c;
                    a = [];
                    for (b = l(); b !== null; )
                        a.push(b),
                        b = l();
                    if (a !== null)
                        if (e.substr(c, 5) === "GRAPH" ? (b = "GRAPH",
                        c += 5) : (b = null,
                        j === 0 && i('"GRAPH"')),
                        b === null && (e.substr(c, 5) === "graph" ? (b = "graph",
                        c += 5) : (b = null,
                        j === 0 && i('"graph"'))),
                        b !== null) {
                            d = [];
                            for (f = l(); f !== null; )
                                d.push(f),
                                f = l();
                            if (d !== null)
                                if (f = ka(),
                                f !== null) {
                                    h = [];
                                    for (g = l(); g !== null; )
                                        h.push(g),
                                        g = l();
                                    h !== null ? (g = T(),
                                    g !== null ? a = [a, b, d, f, h, g] : (a = null,
                                    c = n)) : (a = null,
                                    c = n)
                                } else
                                    a = null,
                                    c = n;
                            else
                                a = null,
                                c = n
                        } else
                            a = null,
                            c = n;
                    else
                        a = null,
                        c = n;
                    a !== null && (a = function(a, k, c) {
                        for (a = 0; a < c.patterns.length; a++)
                            for (var b = c.patterns[a], e = 0; e < b.triplesContext.length; e++)
                                b.triplesContext[e].graph = k;
                        c.token = "groupgraphpattern";
                        return c
                    }(m, a[3], a[5]));
                    a === null && (c = m);
                    j--;
                    j === 0 && a === null && i("[55] GraphGraphPattern");
                    return a
                }
                function Db() {
                    var a, b, d, f, h;
                    j++;
                    h = f = c;
                    e.substr(c, 7) === "SERVICE" ? (a = "SERVICE",
                    c += 7) : (a = null,
                    j === 0 && i('"SERVICE"'));
                    a !== null ? (b = ka(),
                    b !== null ? (d = T(),
                    d !== null ? a = [a, b, d] : (a = null,
                    c = h)) : (a = null,
                    c = h)) : (a = null,
                    c = h);
                    a !== null && (a = {
                        token: "servicegraphpattern",
                        status: "todo",
                        value: [a[1], a[2]]
                    });
                    a === null && (c = f);
                    j--;
                    j === 0 && a === null && i("[56] ServiceGraphPattern");
                    return a
                }
                function Bb() {
                    var a, b, d, f;
                    j++;
                    f = d = c;
                    e.substr(c, 5) === "MINUS" ? (a = "MINUS",
                    c += 5) : (a = null,
                    j === 0 && i('"MINUS"'));
                    a !== null ? (b = T(),
                    b !== null ? a = [a, b] : (a = null,
                    c = f)) : (a = null,
                    c = f);
                    a !== null && (a = {
                        token: "minusgraphpattern",
                        status: "todo",
                        value: a[1]
                    });
                    a === null && (c = d);
                    j--;
                    j === 0 && a === null && i("[57] MinusGraphPattern");
                    return a
                }
                function zb() {
                    var a, b, d, f, h, g, m, n, o;
                    j++;
                    n = m = c;
                    a = T();
                    if (a !== null) {
                        b = [];
                        o = c;
                        d = [];
                        for (f = l(); f !== null; )
                            d.push(f),
                            f = l();
                        if (d !== null)
                            if (e.substr(c, 5) === "UNION" ? (f = "UNION",
                            c += 5) : (f = null,
                            j === 0 && i('"UNION"')),
                            f === null && (e.substr(c, 5) === "union" ? (f = "union",
                            c += 5) : (f = null,
                            j === 0 && i('"union"'))),
                            f !== null) {
                                h = [];
                                for (g = l(); g !== null; )
                                    h.push(g),
                                    g = l();
                                h !== null ? (g = T(),
                                g !== null ? d = [d, f, h, g] : (d = null,
                                c = o)) : (d = null,
                                c = o)
                            } else
                                d = null,
                                c = o;
                        else
                            d = null,
                            c = o;
                        for (; d !== null; ) {
                            b.push(d);
                            o = c;
                            d = [];
                            for (f = l(); f !== null; )
                                d.push(f),
                                f = l();
                            if (d !== null)
                                if (e.substr(c, 5) === "UNION" ? (f = "UNION",
                                c += 5) : (f = null,
                                j === 0 && i('"UNION"')),
                                f === null && (e.substr(c, 5) === "union" ? (f = "union",
                                c += 5) : (f = null,
                                j === 0 && i('"union"'))),
                                f !== null) {
                                    h = [];
                                    for (g = l(); g !== null; )
                                        h.push(g),
                                        g = l();
                                    h !== null ? (g = T(),
                                    g !== null ? d = [d, f, h, g] : (d = null,
                                    c = o)) : (d = null,
                                    c = o)
                                } else
                                    d = null,
                                    c = o;
                            else
                                d = null,
                                c = o
                        }
                        b !== null ? a = [a, b] : (a = null,
                        c = n)
                    } else
                        a = null,
                        c = n;
                    a !== null && (a = function(a, k, c) {
                        if (c.length === 0)
                            return k;
                        else {
                            a = {
                                token: "graphunionpattern",
                                value: [k]
                            };
                            for (k = 0; k < c.length; k++)
                                k == c.length - 1 ? a.value.push(c[k][3]) : (a.value.push(c[k][3]),
                                a = {
                                    token: "graphunionpattern",
                                    value: [a]
                                });
                            return a
                        }
                    }(m, a[0], a[1]));
                    a === null && (c = m);
                    j--;
                    j === 0 && a === null && i("[58] GroupOrUnionGraphPattern");
                    return a
                }
                function Eb() {
                    var a, b, d, f, h, g;
                    j++;
                    g = h = c;
                    a = [];
                    for (b = l(); b !== null; )
                        a.push(b),
                        b = l();
                    if (a !== null)
                        if (e.substr(c, 6) === "FILTER" ? (b = "FILTER",
                        c += 6) : (b = null,
                        j === 0 && i('"FILTER"')),
                        b === null && (e.substr(c, 6) === "filter" ? (b = "filter",
                        c += 6) : (b = null,
                        j === 0 && i('"filter"'))),
                        b !== null) {
                            d = [];
                            for (f = l(); f !== null; )
                                d.push(f),
                                f = l();
                            d !== null ? (f = Aa(),
                            f !== null ? a = [a, b, d, f] : (a = null,
                            c = g)) : (a = null,
                            c = g)
                        } else
                            a = null,
                            c = g;
                    else
                        a = null,
                        c = g;
                    a !== null && (a = {
                        token: "filter",
                        value: a[3]
                    });
                    a === null && (c = h);
                    j--;
                    j === 0 && a === null && i("[59] Filter");
                    return a
                }
                function Aa() {
                    var a;
                    j++;
                    a = La();
                    a === null && (a = Ka(),
                    a === null && (a = kb()));
                    j--;
                    j === 0 && a === null && i("[60] Constraint");
                    return a
                }
                function kb() {
                    var a, b, e, d;
                    j++;
                    d = e = c;
                    a = P();
                    a !== null ? (b = nb(),
                    b !== null ? a = [a, b] : (a = null,
                    c = d)) : (a = null,
                    c = d);
                    a !== null && (a = function(a, k, c) {
                        a = {
                            token: "expression",
                            expressionType: "irireforfunction"
                        };
                        a.iriref = k;
                        a.args = c.value;
                        return a
                    }(e, a[0], a[1]));
                    a === null && (c = e);
                    j--;
                    j === 0 && a === null && i("[61] FunctionCall");
                    return a
                }
                function nb() {
                    var a, b, d, f, h, g, l, m, n;
                    j++;
                    l = c;
                    a = la();
                    a !== null && (a = {
                        token: "args",
                        value: []
                    });
                    a === null && (c = l);
                    if (a === null) {
                        m = l = c;
                        e.charCodeAt(c) === 40 ? (a = "(",
                        c++) : (a = null,
                        j === 0 && i('"("'));
                        if (a !== null)
                            if (e.substr(c, 8) === "DISTINCT" ? (b = "DISTINCT",
                            c += 8) : (b = null,
                            j === 0 && i('"DISTINCT"')),
                            b === null && (e.substr(c, 8) === "distinct" ? (b = "distinct",
                            c += 8) : (b = null,
                            j === 0 && i('"distinct"'))),
                            b = b !== null ? b : "",
                            b !== null)
                                if (d = J(),
                                d !== null) {
                                    f = [];
                                    n = c;
                                    e.charCodeAt(c) === 44 ? (h = ",",
                                    c++) : (h = null,
                                    j === 0 && i('","'));
                                    h !== null ? (g = J(),
                                    g !== null ? h = [h, g] : (h = null,
                                    c = n)) : (h = null,
                                    c = n);
                                    for (; h !== null; )
                                        f.push(h),
                                        n = c,
                                        e.charCodeAt(c) === 44 ? (h = ",",
                                        c++) : (h = null,
                                        j === 0 && i('","')),
                                        h !== null ? (g = J(),
                                        g !== null ? h = [h, g] : (h = null,
                                        c = n)) : (h = null,
                                        c = n);
                                    f !== null ? (e.charCodeAt(c) === 41 ? (h = ")",
                                    c++) : (h = null,
                                    j === 0 && i('")"')),
                                    h !== null ? a = [a, b, d, f, h] : (a = null,
                                    c = m)) : (a = null,
                                    c = m)
                                } else
                                    a = null,
                                    c = m;
                            else
                                a = null,
                                c = m;
                        else
                            a = null,
                            c = m;
                        a !== null && (a = function(a, k, c, b) {
                            for (var a = [], e = 0; e < b.length; e++)
                                a.push(b[e][1]);
                            b = {
                                token: "args"
                            };
                            b.value = [c].concat(a);
                            b.distinct = k != null && k.toUpperCase() === "DISTINCT" ? !0 : !1;
                            return b
                        }(l, a[1], a[2], a[3]));
                        a === null && (c = l)
                    }
                    j--;
                    j === 0 && a === null && i("[62] ArgList");
                    return a
                }
                function qa() {
                    var a, b, d, f, h, g, m, n, o, q;
                    j++;
                    n = c;
                    a = la();
                    a !== null && (a = {
                        token: "args",
                        value: []
                    });
                    a === null && (c = n);
                    if (a === null) {
                        o = n = c;
                        e.charCodeAt(c) === 40 ? (a = "(",
                        c++) : (a = null,
                        j === 0 && i('"("'));
                        if (a !== null)
                            if (b = J(),
                            b !== null) {
                                d = [];
                                q = c;
                                f = [];
                                for (h = l(); h !== null; )
                                    f.push(h),
                                    h = l();
                                if (f !== null)
                                    if (e.charCodeAt(c) === 44 ? (h = ",",
                                    c++) : (h = null,
                                    j === 0 && i('","')),
                                    h !== null) {
                                        g = [];
                                        for (m = l(); m !== null; )
                                            g.push(m),
                                            m = l();
                                        g !== null ? (m = J(),
                                        m !== null ? f = [f, h, g, m] : (f = null,
                                        c = q)) : (f = null,
                                        c = q)
                                    } else
                                        f = null,
                                        c = q;
                                else
                                    f = null,
                                    c = q;
                                for (; f !== null; ) {
                                    d.push(f);
                                    q = c;
                                    f = [];
                                    for (h = l(); h !== null; )
                                        f.push(h),
                                        h = l();
                                    if (f !== null)
                                        if (e.charCodeAt(c) === 44 ? (h = ",",
                                        c++) : (h = null,
                                        j === 0 && i('","')),
                                        h !== null) {
                                            g = [];
                                            for (m = l(); m !== null; )
                                                g.push(m),
                                                m = l();
                                            g !== null ? (m = J(),
                                            m !== null ? f = [f, h, g, m] : (f = null,
                                            c = q)) : (f = null,
                                            c = q)
                                        } else
                                            f = null,
                                            c = q;
                                    else
                                        f = null,
                                        c = q
                                }
                                d !== null ? (e.charCodeAt(c) === 41 ? (f = ")",
                                c++) : (f = null,
                                j === 0 && i('")"')),
                                f !== null ? a = [a, b, d, f] : (a = null,
                                c = o)) : (a = null,
                                c = o)
                            } else
                                a = null,
                                c = o;
                        else
                            a = null,
                            c = o;
                        a !== null && (a = function(a, k, c) {
                            for (var a = [], b = 0; b < c.length; b++)
                                a.push(c[b][3]);
                            c = {
                                token: "args"
                            };
                            c.value = [k].concat(a);
                            return c
                        }(n, a[1], a[2]));
                        a === null && (c = n)
                    }
                    j--;
                    j === 0 && a === null && i("[63] ExpressionList");
                    return a
                }
                function wb() {
                    var a, b, d, f, h, g, m;
                    j++;
                    m = g = c;
                    e.charCodeAt(c) === 123 ? (a = "{",
                    c++) : (a = null,
                    j === 0 && i('"{"'));
                    if (a !== null) {
                        b = [];
                        for (d = l(); d !== null; )
                            b.push(d),
                            d = l();
                        if (b !== null)
                            if (d = ob(),
                            d = d !== null ? d : "",
                            d !== null) {
                                f = [];
                                for (h = l(); h !== null; )
                                    f.push(h),
                                    h = l();
                                f !== null ? (e.charCodeAt(c) === 125 ? (h = "}",
                                c++) : (h = null,
                                j === 0 && i('"}"')),
                                h !== null ? a = [a, b, d, f, h] : (a = null,
                                c = m)) : (a = null,
                                c = m)
                            } else
                                a = null,
                                c = m;
                        else
                            a = null,
                            c = m
                    } else
                        a = null,
                        c = m;
                    a !== null && (a = a[2]);
                    a === null && (c = g);
                    j--;
                    j === 0 && a === null && i("[64] ConstructTemplate");
                    return a
                }
                function ob() {
                    var a, b, d, f, h, g, m, n;
                    j++;
                    m = g = c;
                    a = lb();
                    if (a !== null) {
                        n = c;
                        b = [];
                        for (d = l(); d !== null; )
                            b.push(d),
                            d = l();
                        if (b !== null)
                            if (e.charCodeAt(c) === 46 ? (d = ".",
                            c++) : (d = null,
                            j === 0 && i('"."')),
                            d !== null) {
                                f = [];
                                for (h = l(); h !== null; )
                                    f.push(h),
                                    h = l();
                                f !== null ? (h = ob(),
                                h = h !== null ? h : "",
                                h !== null ? b = [b, d, f, h] : (b = null,
                                c = n)) : (b = null,
                                c = n)
                            } else
                                b = null,
                                c = n;
                        else
                            b = null,
                            c = n;
                        b = b !== null ? b : "";
                        b !== null ? a = [a, b] : (a = null,
                        c = m)
                    } else
                        a = null,
                        c = m;
                    a !== null && (a = function(a, c, k) {
                        a = c.triplesContext;
                        typeof k === "object" && k.length != null && k[3].triplesContext != null && (a = a.concat(k[3].triplesContext));
                        return {
                            token: "triplestemplate",
                            triplesContext: a
                        }
                    }(g, a[0], a[1]));
                    a === null && (c = g);
                    j--;
                    j === 0 && a === null && i("[65] ConstructTriples");
                    return a
                }
                function lb() {
                    var a, b, e, d, f, h;
                    j++;
                    h = f = c;
                    a = [];
                    for (b = l(); b !== null; )
                        a.push(b),
                        b = l();
                    if (a !== null)
                        if (b = Pa(),
                        b !== null) {
                            e = [];
                            for (d = l(); d !== null; )
                                e.push(d),
                                d = l();
                            e !== null ? (d = Ca(),
                            d !== null ? a = [a, b, e, d] : (a = null,
                            c = h)) : (a = null,
                            c = h)
                        } else
                            a = null,
                            c = h;
                    else
                        a = null,
                        c = h;
                    a !== null && (a = function(a, c, k) {
                        a = k.triplesContext;
                        if (k.pairs)
                            for (var b = 0; b < k.pairs.length; b++) {
                                var e = k.pairs[b]
                                  , i = null;
                                e[1].length != null && (e[1] = e[1][0]);
                                c.token && c.token === "triplesnodecollection" ? (i = {
                                    subject: c.chainSubject[0],
                                    predicate: e[0],
                                    object: e[1]
                                },
                                a.push(i),
                                a = a.concat(c.triplesContext)) : (i = {
                                    subject: c,
                                    predicate: e[0],
                                    object: e[1]
                                },
                                a.push(i))
                            }
                        k = {
                            token: "triplessamesubject"
                        };
                        k.triplesContext = a;
                        k.chainSubject = c;
                        return k
                    }(f, a[1], a[3]));
                    a === null && (c = f);
                    if (a === null) {
                        h = f = c;
                        a = [];
                        for (b = l(); b !== null; )
                            a.push(b),
                            b = l();
                        if (a !== null)
                            if (b = Qa(),
                            b !== null) {
                                e = [];
                                for (d = l(); d !== null; )
                                    e.push(d),
                                    d = l();
                                e !== null ? (d = Fb(),
                                d !== null ? a = [a, b, e, d] : (a = null,
                                c = h)) : (a = null,
                                c = h)
                            } else
                                a = null,
                                c = h;
                        else
                            a = null,
                            c = h;
                        a !== null && (a = function(a, c, k) {
                            var a = c.triplesContext
                              , b = c.chainSubject;
                            if (k.pairs)
                                for (var e = 0; e < k.pairs.length; e++) {
                                    var i = k.pairs[e];
                                    i[1].length != null && (i[1] = i[1][0]);
                                    if (c.token === "triplesnodecollection")
                                        for (var d = 0; d < b.length; d++) {
                                            var f = b[d];
                                            if (f.triplesContext != null) {
                                                var h = {
                                                    subject: f.chainSubject,
                                                    predicate: i[0],
                                                    object: i[1]
                                                };
                                                a.concat(f.triplesContext)
                                            } else
                                                h = {
                                                    subject: b[d],
                                                    predicate: i[0],
                                                    object: i[1]
                                                },
                                                a.push(h)
                                        }
                                    else
                                        h = {
                                            subject: b,
                                            predicate: i[0],
                                            object: i[1]
                                        },
                                        a.push(h)
                                }
                            c = {
                                token: "triplessamesubject"
                            };
                            c.triplesContext = a;
                            c.chainSubject = b;
                            return c
                        }(f, a[1], a[3]));
                        a === null && (c = f)
                    }
                    j--;
                    j === 0 && a === null && i("[66] TriplesSameSubject");
                    return a
                }
                function Ca() {
                    var a, b, d, f, h, g, m, n, o, q, r, s, G, v;
                    j++;
                    s = r = c;
                    a = Ra();
                    if (a !== null) {
                        b = [];
                        for (d = l(); d !== null; )
                            b.push(d),
                            d = l();
                        if (b !== null)
                            if (d = ma(),
                            d !== null) {
                                f = [];
                                G = c;
                                h = [];
                                for (g = l(); g !== null; )
                                    h.push(g),
                                    g = l();
                                if (h !== null)
                                    if (e.charCodeAt(c) === 59 ? (g = ";",
                                    c++) : (g = null,
                                    j === 0 && i('";"')),
                                    g !== null) {
                                        m = [];
                                        for (n = l(); n !== null; )
                                            m.push(n),
                                            n = l();
                                        if (m !== null) {
                                            v = c;
                                            n = Ra();
                                            if (n !== null) {
                                                o = [];
                                                for (q = l(); q !== null; )
                                                    o.push(q),
                                                    q = l();
                                                o !== null ? (q = ma(),
                                                q !== null ? n = [n, o, q] : (n = null,
                                                c = v)) : (n = null,
                                                c = v)
                                            } else
                                                n = null,
                                                c = v;
                                            n = n !== null ? n : "";
                                            n !== null ? h = [h, g, m, n] : (h = null,
                                            c = G)
                                        } else
                                            h = null,
                                            c = G
                                    } else
                                        h = null,
                                        c = G;
                                else
                                    h = null,
                                    c = G;
                                for (; h !== null; ) {
                                    f.push(h);
                                    G = c;
                                    h = [];
                                    for (g = l(); g !== null; )
                                        h.push(g),
                                        g = l();
                                    if (h !== null)
                                        if (e.charCodeAt(c) === 59 ? (g = ";",
                                        c++) : (g = null,
                                        j === 0 && i('";"')),
                                        g !== null) {
                                            m = [];
                                            for (n = l(); n !== null; )
                                                m.push(n),
                                                n = l();
                                            if (m !== null) {
                                                v = c;
                                                n = Ra();
                                                if (n !== null) {
                                                    o = [];
                                                    for (q = l(); q !== null; )
                                                        o.push(q),
                                                        q = l();
                                                    o !== null ? (q = ma(),
                                                    q !== null ? n = [n, o, q] : (n = null,
                                                    c = v)) : (n = null,
                                                    c = v)
                                                } else
                                                    n = null,
                                                    c = v;
                                                n = n !== null ? n : "";
                                                n !== null ? h = [h, g, m, n] : (h = null,
                                                c = G)
                                            } else
                                                h = null,
                                                c = G
                                        } else
                                            h = null,
                                            c = G;
                                    else
                                        h = null,
                                        c = G
                                }
                                f !== null ? a = [a, b, d, f] : (a = null,
                                c = s)
                            } else
                                a = null,
                                c = s;
                        else
                            a = null,
                            c = s
                    } else
                        a = null,
                        c = s;
                    a !== null && (a = function(a, c, k, b) {
                        for (var a = {
                            token: "propertylist"
                        }, e = [], i = [], d = 0; d < k.length; d++)
                            k[d].triplesContext != null ? (e = e.concat(k[d].triplesContext),
                            k[d].token === "triplesnodecollection" && k[d].chainSubject.length != null ? i.push([c, k[d].chainSubject[0]]) : i.push([c, k[d].chainSubject])) : i.push([c, k[d]]);
                        for (d = 0; d < b.length; d++)
                            for (var k = b[d][3], c = k[0], k = k[2] || [], f = 0; f < k.length; f++)
                                k[f].triplesContext != null ? (e = e.concat(k[f].triplesContext),
                                i.push([c, k[f].chainSubject])) : i.push([c, k[f]]);
                        a.pairs = i;
                        a.triplesContext = e;
                        return a
                    }(r, a[0], a[2], a[3]));
                    a === null && (c = r);
                    j--;
                    j === 0 && a === null && i("[67] PropertyListNotEmpty");
                    return a
                }
                function Fb() {
                    var a;
                    j++;
                    a = Ca();
                    a = a !== null ? a : "";
                    j--;
                    j === 0 && a === null && i("[68] PropertyList");
                    return a
                }
                function ma() {
                    var a, b, d, f, h, g, m, n, o;
                    j++;
                    n = m = c;
                    a = ra();
                    if (a !== null) {
                        b = [];
                        for (d = l(); d !== null; )
                            b.push(d),
                            d = l();
                        if (b !== null) {
                            d = [];
                            o = c;
                            e.charCodeAt(c) === 44 ? (f = ",",
                            c++) : (f = null,
                            j === 0 && i('","'));
                            if (f !== null) {
                                h = [];
                                for (g = l(); g !== null; )
                                    h.push(g),
                                    g = l();
                                h !== null ? (g = ra(),
                                g !== null ? f = [f, h, g] : (f = null,
                                c = o)) : (f = null,
                                c = o)
                            } else
                                f = null,
                                c = o;
                            for (; f !== null; )
                                if (d.push(f),
                                o = c,
                                e.charCodeAt(c) === 44 ? (f = ",",
                                c++) : (f = null,
                                j === 0 && i('","')),
                                f !== null) {
                                    h = [];
                                    for (g = l(); g !== null; )
                                        h.push(g),
                                        g = l();
                                    h !== null ? (g = ra(),
                                    g !== null ? f = [f, h, g] : (f = null,
                                    c = o)) : (f = null,
                                    c = o)
                                } else
                                    f = null,
                                    c = o;
                            d !== null ? a = [a, b, d] : (a = null,
                            c = n)
                        } else
                            a = null,
                            c = n
                    } else
                        a = null,
                        c = n;
                    a !== null && (a = function(a, c, k) {
                        a = [];
                        a.push(c);
                        for (c = 0; c < k.length; c++)
                            for (var b = 0; b < k[c].length; b++)
                                typeof k[c][b] == "object" && k[c][b].token != null && a.push(k[c][b]);
                        return a
                    }(m, a[0], a[2]));
                    a === null && (c = m);
                    j--;
                    j === 0 && a === null && i("[69] ObjectList");
                    return a
                }
                function Ra() {
                    var a, b;
                    j++;
                    a = ka();
                    a === null && (b = c,
                    e.charCodeAt(c) === 97 ? (a = "a",
                    c++) : (a = null,
                    j === 0 && i('"a"')),
                    a !== null && (a = {
                        token: "uri",
                        prefix: null,
                        suffix: null,
                        value: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
                    }),
                    a === null && (c = b));
                    j--;
                    j === 0 && a === null && i("[71] Verb");
                    return a
                }
                function yb() {
                    var a, b, e, d, f, h;
                    j++;
                    h = f = c;
                    a = [];
                    for (b = l(); b !== null; )
                        a.push(b),
                        b = l();
                    if (a !== null)
                        if (b = Pa(),
                        b !== null) {
                            e = [];
                            for (d = l(); d !== null; )
                                e.push(d),
                                d = l();
                            e !== null ? (d = Gb(),
                            d !== null ? a = [a, b, e, d] : (a = null,
                            c = h)) : (a = null,
                            c = h)
                        } else
                            a = null,
                            c = h;
                    else
                        a = null,
                        c = h;
                    a !== null && (a = function(a, c, b) {
                        a = b.triplesContext;
                        if (b.pairs)
                            for (var k = 0; k < b.pairs.length; k++) {
                                var e = b.pairs[k]
                                  , i = null;
                                e[1].length != null && (e[1] = e[1][0]);
                                c.token && c.token === "triplesnodecollection" ? (i = {
                                    subject: c.chainSubject[0],
                                    predicate: e[0],
                                    object: e[1]
                                },
                                a.push(i),
                                a = a.concat(c.triplesContext)) : (i = {
                                    subject: c,
                                    predicate: e[0],
                                    object: e[1]
                                },
                                a.push(i))
                            }
                        b = {
                            token: "triplessamesubject"
                        };
                        b.triplesContext = a;
                        b.chainSubject = c;
                        return b
                    }(f, a[1], a[3]));
                    a === null && (c = f);
                    if (a === null) {
                        h = f = c;
                        a = [];
                        for (b = l(); b !== null; )
                            a.push(b),
                            b = l();
                        if (a !== null)
                            if (b = Qa(),
                            b !== null) {
                                e = [];
                                for (d = l(); d !== null; )
                                    e.push(d),
                                    d = l();
                                e !== null ? (d = Hb(),
                                d !== null ? a = [a, b, e, d] : (a = null,
                                c = h)) : (a = null,
                                c = h)
                            } else
                                a = null,
                                c = h;
                        else
                            a = null,
                            c = h;
                        a !== null && (a = function(a, c, b) {
                            var a = c.triplesContext
                              , k = c.chainSubject;
                            if (b.pairs)
                                for (var e = 0; e < b.pairs.length; e++) {
                                    var i = b.pairs[e];
                                    i[1].length != null && (i[1] = i[1][0]);
                                    if (c.token === "triplesnodecollection")
                                        for (var d = 0; d < k.length; d++) {
                                            var f = k[d];
                                            if (f.triplesContext != null) {
                                                var h = {
                                                    subject: f.chainSubject,
                                                    predicate: i[0],
                                                    object: i[1]
                                                };
                                                a.concat(f.triplesContext)
                                            } else
                                                h = {
                                                    subject: k[d],
                                                    predicate: i[0],
                                                    object: i[1]
                                                },
                                                a.push(h)
                                        }
                                    else
                                        h = {
                                            subject: k,
                                            predicate: i[0],
                                            object: i[1]
                                        },
                                        a.push(h)
                                }
                            c = {
                                token: "triplessamesubject"
                            };
                            c.triplesContext = a;
                            c.chainSubject = k;
                            return c
                        }(f, a[1], a[3]));
                        a === null && (c = f)
                    }
                    j--;
                    j === 0 && a === null && i("[72] TriplesSameSubjectPath");
                    return a
                }
                function Gb() {
                    var a, b, d, f, h, g, m, n, o, q, r, s, G;
                    j++;
                    r = q = c;
                    a = Sa();
                    a === null && (a = O());
                    if (a !== null) {
                        b = [];
                        for (d = l(); d !== null; )
                            b.push(d),
                            d = l();
                        if (b !== null)
                            if (d = ma(),
                            d !== null) {
                                f = [];
                                s = c;
                                h = [];
                                for (g = l(); g !== null; )
                                    h.push(g),
                                    g = l();
                                if (h !== null)
                                    if (e.charCodeAt(c) === 59 ? (g = ";",
                                    c++) : (g = null,
                                    j === 0 && i('";"')),
                                    g !== null) {
                                        m = [];
                                        for (n = l(); n !== null; )
                                            m.push(n),
                                            n = l();
                                        m !== null ? (G = c,
                                        n = Sa(),
                                        n === null && (n = O()),
                                        n !== null ? (o = ma(),
                                        o !== null ? n = [n, o] : (n = null,
                                        c = G)) : (n = null,
                                        c = G),
                                        n = n !== null ? n : "",
                                        n !== null ? h = [h, g, m, n] : (h = null,
                                        c = s)) : (h = null,
                                        c = s)
                                    } else
                                        h = null,
                                        c = s;
                                else
                                    h = null,
                                    c = s;
                                for (; h !== null; ) {
                                    f.push(h);
                                    s = c;
                                    h = [];
                                    for (g = l(); g !== null; )
                                        h.push(g),
                                        g = l();
                                    if (h !== null)
                                        if (e.charCodeAt(c) === 59 ? (g = ";",
                                        c++) : (g = null,
                                        j === 0 && i('";"')),
                                        g !== null) {
                                            m = [];
                                            for (n = l(); n !== null; )
                                                m.push(n),
                                                n = l();
                                            m !== null ? (G = c,
                                            n = Sa(),
                                            n === null && (n = O()),
                                            n !== null ? (o = ma(),
                                            o !== null ? n = [n, o] : (n = null,
                                            c = G)) : (n = null,
                                            c = G),
                                            n = n !== null ? n : "",
                                            n !== null ? h = [h, g, m, n] : (h = null,
                                            c = s)) : (h = null,
                                            c = s)
                                        } else
                                            h = null,
                                            c = s;
                                    else
                                        h = null,
                                        c = s
                                }
                                f !== null ? a = [a, b, d, f] : (a = null,
                                c = r)
                            } else
                                a = null,
                                c = r;
                        else
                            a = null,
                            c = r
                    } else
                        a = null,
                        c = r;
                    a !== null && (a = function(a, c, b, k) {
                        token = {
                            token: "propertylist"
                        };
                        for (var a = [], e = [], i = 0; i < b.length; i++)
                            b[i].triplesContext != null ? (a = a.concat(b[i].triplesContext),
                            b[i].token === "triplesnodecollection" && b[i].chainSubject.length != null ? e.push([c, b[i].chainSubject[0]]) : e.push([c, b[i].chainSubject])) : e.push([c, b[i]]);
                        for (i = 0; i < k.length; i++)
                            for (var b = k[i][3], c = b[0], b = b[1] || [], d = 0; d < b.length; d++)
                                b[d].triplesContext != null ? (a = a.concat(b[d].triplesContext),
                                e.push([c, b[d].chainSubject])) : e.push([c, b[d]]);
                        token.pairs = e;
                        token.triplesContext = a;
                        return token
                    }(q, a[0], a[2], a[3]));
                    a === null && (c = q);
                    j--;
                    j === 0 && a === null && i("[73] PropertyListNotEmptyPath");
                    return a
                }
                function Hb() {
                    var a;
                    j++;
                    a = Ca();
                    a = a !== null ? a : "";
                    j--;
                    j === 0 && a === null && i("[74] PropertyListPath");
                    return a
                }
                function Sa() {
                    var a, b;
                    j++;
                    b = c;
                    a = pb();
                    a === null && (c = b);
                    j--;
                    j === 0 && a === null && i("[75]");
                    return a
                }
                function pb() {
                    var a, b, d, f, h, g, l;
                    j++;
                    g = h = c;
                    a = Ta();
                    if (a !== null) {
                        b = [];
                        l = c;
                        e.charCodeAt(c) === 124 ? (d = "|",
                        c++) : (d = null,
                        j === 0 && i('"|"'));
                        d !== null ? (f = Ta(),
                        f !== null ? d = [d, f] : (d = null,
                        c = l)) : (d = null,
                        c = l);
                        for (; d !== null; )
                            b.push(d),
                            l = c,
                            e.charCodeAt(c) === 124 ? (d = "|",
                            c++) : (d = null,
                            j === 0 && i('"|"')),
                            d !== null ? (f = Ta(),
                            f !== null ? d = [d, f] : (d = null,
                            c = l)) : (d = null,
                            c = l);
                        b !== null ? a = [a, b] : (a = null,
                        c = g)
                    } else
                        a = null,
                        c = g;
                    a !== null && (a = function(a, c, b) {
                        if (b == null || b.length === 0)
                            return c;
                        else {
                            a = [];
                            for (c = 0; c < b.length; c++)
                                a.push(b[1]);
                            b = {
                                token: "path",
                                kind: "alternative"
                            };
                            b.value = a;
                            return b
                        }
                    }(h, a[0], a[1]));
                    a === null && (c = h);
                    j--;
                    j === 0 && a === null && i("[78] PathAlternative");
                    return a
                }
                function Ta() {
                    var a, b, d, f, h, g, l;
                    j++;
                    g = h = c;
                    a = Ua();
                    if (a !== null) {
                        b = [];
                        l = c;
                        e.charCodeAt(c) === 47 ? (d = "/",
                        c++) : (d = null,
                        j === 0 && i('"/"'));
                        d !== null ? (f = Ua(),
                        f !== null ? d = [d, f] : (d = null,
                        c = l)) : (d = null,
                        c = l);
                        for (; d !== null; )
                            b.push(d),
                            l = c,
                            e.charCodeAt(c) === 47 ? (d = "/",
                            c++) : (d = null,
                            j === 0 && i('"/"')),
                            d !== null ? (f = Ua(),
                            f !== null ? d = [d, f] : (d = null,
                            c = l)) : (d = null,
                            c = l);
                        b !== null ? a = [a, b] : (a = null,
                        c = g)
                    } else
                        a = null,
                        c = g;
                    a !== null && (a = function(a, c, b) {
                        if (b == null || b.length === 0)
                            return c;
                        else {
                            a = [c];
                            for (c = 0; c < b.length; c++)
                                a.push(b[c][1]);
                            b = {
                                token: "path",
                                kind: "sequence"
                            };
                            b.value = a;
                            return b
                        }
                    }(h, a[0], a[1]));
                    a === null && (c = h);
                    j--;
                    j === 0 && a === null && i("[79] PathSequence");
                    return a
                }
                function qb() {
                    var a, b, e, d;
                    j++;
                    d = e = c;
                    a = Ib();
                    a !== null ? (b = Jb(),
                    b = b !== null ? b : "",
                    b !== null ? a = [a, b] : (a = null,
                    c = d)) : (a = null,
                    c = d);
                    a !== null && (a = function(a, c, b) {
                        if (c.token && c.token != "path" && b == "")
                            return c;
                        else if (c.token && c.token != k && b != "") {
                            var k = {
                                token: "path",
                                kind: "element"
                            };
                            k.value = c;
                            k.modifier = b;
                            return k
                        } else
                            return c.modifier = b,
                            c
                    }(e, a[0], a[1]));
                    a === null && (c = e);
                    j--;
                    j === 0 && a === null && i("[88] PathElt");
                    return a
                }
                function Ua() {
                    var a, b, d, f;
                    j++;
                    a = qb();
                    a === null && (f = d = c,
                    e.charCodeAt(c) === 94 ? (a = "^",
                    c++) : (a = null,
                    j === 0 && i('"^"')),
                    a !== null ? (b = qb(),
                    b !== null ? a = [a, b] : (a = null,
                    c = f)) : (a = null,
                    c = f),
                    a !== null && (a = function(a, c) {
                        var b = {
                            token: "path",
                            kind: "inversePath"
                        };
                        b.value = c;
                        return b
                    }(d, a[1])),
                    a === null && (c = d));
                    j--;
                    j === 0 && a === null && i("[81] PathEltOrInverse");
                    return a
                }
                function Jb() {
                    var a, b, d, f, h, g, l, m, n;
                    j++;
                    e.charCodeAt(c) === 42 ? (a = "*",
                    c++) : (a = null,
                    j === 0 && i('"*"'));
                    a === null && (e.charCodeAt(c) === 63 ? (a = "?",
                    c++) : (a = null,
                    j === 0 && i('"?"')),
                    a === null && (e.charCodeAt(c) === 43 ? (a = "+",
                    c++) : (a = null,
                    j === 0 && i('"+"')),
                    a === null && (g = c,
                    e.charCodeAt(c) === 123 ? (a = "{",
                    c++) : (a = null,
                    j === 0 && i('"{"')),
                    a !== null ? (l = c,
                    b = ca(),
                    b !== null ? (m = c,
                    e.charCodeAt(c) === 44 ? (d = ",",
                    c++) : (d = null,
                    j === 0 && i('","')),
                    d !== null ? (e.charCodeAt(c) === 125 ? (f = "}",
                    c++) : (f = null,
                    j === 0 && i('"}"')),
                    f === null && (n = c,
                    f = ca(),
                    f !== null ? (e.charCodeAt(c) === 125 ? (h = "}",
                    c++) : (h = null,
                    j === 0 && i('"}"')),
                    h !== null ? f = [f, h] : (f = null,
                    c = n)) : (f = null,
                    c = n)),
                    f !== null ? d = [d, f] : (d = null,
                    c = m)) : (d = null,
                    c = m),
                    d === null && (e.charCodeAt(c) === 125 ? (d = "}",
                    c++) : (d = null,
                    j === 0 && i('"}"'))),
                    d !== null ? b = [b, d] : (b = null,
                    c = l)) : (b = null,
                    c = l),
                    b === null && (l = c,
                    e.charCodeAt(c) === 44 ? (b = ",",
                    c++) : (b = null,
                    j === 0 && i('","')),
                    b !== null ? (d = ca(),
                    d !== null ? (e.charCodeAt(c) === 125 ? (f = "}",
                    c++) : (f = null,
                    j === 0 && i('"}"')),
                    f !== null ? b = [b, d, f] : (b = null,
                    c = l)) : (b = null,
                    c = l)) : (b = null,
                    c = l)),
                    b !== null ? a = [a, b] : (a = null,
                    c = g)) : (a = null,
                    c = g))));
                    j--;
                    j === 0 && a === null && i("[82] PathMod");
                    return a
                }
                function Ib() {
                    var a, b, d, f, h;
                    j++;
                    a = P();
                    a === null && (f = c,
                    e.charCodeAt(c) === 97 ? (a = "a",
                    c++) : (a = null,
                    j === 0 && i('"a"')),
                    a !== null && (a = {
                        token: "uri",
                        prefix: null,
                        suffix: null,
                        value: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
                    }),
                    a === null && (c = f),
                    a === null && (f = c,
                    e.charCodeAt(c) === 33 ? (a = "!",
                    c++) : (a = null,
                    j === 0 && i('"!"')),
                    a !== null ? (b = Kb(),
                    b !== null ? a = [a, b] : (a = null,
                    c = f)) : (a = null,
                    c = f),
                    a === null && (h = f = c,
                    e.charCodeAt(c) === 40 ? (a = "(",
                    c++) : (a = null,
                    j === 0 && i('"("')),
                    a !== null ? (b = pb(),
                    b !== null ? (e.charCodeAt(c) === 41 ? (d = ")",
                    c++) : (d = null,
                    j === 0 && i('")"')),
                    d !== null ? a = [a, b, d] : (a = null,
                    c = h)) : (a = null,
                    c = h)) : (a = null,
                    c = h),
                    a !== null && (a = a[1]),
                    a === null && (c = f))));
                    j--;
                    j === 0 && a === null && i("[83] PathPrimary");
                    return a
                }
                function Kb() {
                    var a, b, d, f, h, g, l, m;
                    a = Da();
                    if (a === null)
                        if (g = c,
                        e.charCodeAt(c) === 40 ? (a = "(",
                        c++) : (a = null,
                        j === 0 && i('"("')),
                        a !== null) {
                            l = c;
                            b = Da();
                            if (b !== null) {
                                d = [];
                                m = c;
                                e.charCodeAt(c) === 124 ? (f = "|",
                                c++) : (f = null,
                                j === 0 && i('"|"'));
                                f !== null ? (h = Da(),
                                h !== null ? f = [f, h] : (f = null,
                                c = m)) : (f = null,
                                c = m);
                                for (; f !== null; )
                                    d.push(f),
                                    m = c,
                                    e.charCodeAt(c) === 124 ? (f = "|",
                                    c++) : (f = null,
                                    j === 0 && i('"|"')),
                                    f !== null ? (h = Da(),
                                    h !== null ? f = [f, h] : (f = null,
                                    c = m)) : (f = null,
                                    c = m);
                                d !== null ? b = [b, d] : (b = null,
                                c = l)
                            } else
                                b = null,
                                c = l;
                            b = b !== null ? b : "";
                            b !== null ? (e.charCodeAt(c) === 41 ? (d = ")",
                            c++) : (d = null,
                            j === 0 && i('")"')),
                            d !== null ? a = [a, b, d] : (a = null,
                            c = g)) : (a = null,
                            c = g)
                        } else
                            a = null,
                            c = g;
                    return a
                }
                function Da() {
                    var a, b, d;
                    j++;
                    a = P();
                    a === null && (e.charCodeAt(c) === 97 ? (a = "a",
                    c++) : (a = null,
                    j === 0 && i('"a"')),
                    a === null && (d = c,
                    e.charCodeAt(c) === 94 ? (a = "^",
                    c++) : (a = null,
                    j === 0 && i('"^"')),
                    a !== null ? (b = P(),
                    b === null && (e.charCodeAt(c) === 97 ? (b = "a",
                    c++) : (b = null,
                    j === 0 && i('"a"'))),
                    b !== null ? a = [a, b] : (a = null,
                    c = d)) : (a = null,
                    c = d)));
                    j--;
                    j === 0 && a === null && i("[85] PathOneInPropertySet");
                    return a
                }
                function Qa() {
                    var a, b;
                    j++;
                    b = c;
                    a = Lb();
                    a !== null && (a = function(a, c) {
                        for (var b = [], k = [], e = null, i = 0; i < c.length; i++)
                            da++,
                            e = null,
                            c[i].chainSubject == null && c[i].triplesContext == null ? e = c[i] : (e = c[i].chainSubject,
                            b = b.concat(nextSubject.triplesContext)),
                            e = {
                                subject: {
                                    token: "blank",
                                    value: "_:" + da
                                },
                                predicate: {
                                    token: "uri",
                                    prefix: null,
                                    suffix: null,
                                    value: "http://www.w3.org/1999/02/22-rdf-syntax-ns#first"
                                },
                                object: e
                            },
                            i == 0 && k.push(e.subject),
                            b.push(e),
                            e = i === c.length - 1 ? {
                                subject: {
                                    token: "blank",
                                    value: "_:" + da
                                },
                                predicate: {
                                    token: "uri",
                                    prefix: null,
                                    suffix: null,
                                    value: "http://www.w3.org/1999/02/22-rdf-syntax-ns#rest"
                                },
                                object: {
                                    token: "uri",
                                    prefix: null,
                                    suffix: null,
                                    value: "http://www.w3.org/1999/02/22-rdf-syntax-ns#nil"
                                }
                            } : {
                                subject: {
                                    token: "blank",
                                    value: "_:" + da
                                },
                                predicate: {
                                    token: "uri",
                                    prefix: null,
                                    suffix: null,
                                    value: "http://www.w3.org/1999/02/22-rdf-syntax-ns#rest"
                                },
                                object: {
                                    token: "blank",
                                    value: "_:" + (da + 1)
                                }
                            },
                            b.push(e);
                        return {
                            token: "triplesnodecollection",
                            triplesContext: b,
                            chainSubject: k
                        }
                    }(b, a));
                    a === null && (c = b);
                    a === null && (a = Mb());
                    j--;
                    j === 0 && a === null && i("[87] TriplesNode");
                    return a
                }
                function Mb() {
                    var a, b, d, f, h, g, m, n, o, q;
                    j++;
                    q = o = c;
                    a = [];
                    for (b = l(); b !== null; )
                        a.push(b),
                        b = l();
                    if (a !== null)
                        if (e.charCodeAt(c) === 91 ? (b = "[",
                        c++) : (b = null,
                        j === 0 && i('"["')),
                        b !== null) {
                            d = [];
                            for (f = l(); f !== null; )
                                d.push(f),
                                f = l();
                            if (d !== null)
                                if (f = Ca(),
                                f !== null) {
                                    h = [];
                                    for (g = l(); g !== null; )
                                        h.push(g),
                                        g = l();
                                    if (h !== null)
                                        if (e.charCodeAt(c) === 93 ? (g = "]",
                                        c++) : (g = null,
                                        j === 0 && i('"]"')),
                                        g !== null) {
                                            m = [];
                                            for (n = l(); n !== null; )
                                                m.push(n),
                                                n = l();
                                            m !== null ? a = [a, b, d, f, h, g, m] : (a = null,
                                            c = q)
                                        } else
                                            a = null,
                                            c = q;
                                    else
                                        a = null,
                                        c = q
                                } else
                                    a = null,
                                    c = q;
                            else
                                a = null,
                                c = q
                        } else
                            a = null,
                            c = q;
                    else
                        a = null,
                        c = q;
                    a !== null && (a = function(a, b) {
                        da++;
                        for (var c = {
                            token: "blank",
                            value: "_:" + da
                        }, k = [], e = 0; e < b.pairs.length; e++) {
                            var i = b.pairs[e]
                              , d = {};
                            d.subject = c;
                            d.predicate = i[0];
                            i[1].length != null && (i[1] = i[1][0]);
                            d.object = i[1];
                            k.push(d)
                        }
                        return {
                            token: "triplesnode",
                            kind: "blanknodepropertylist",
                            triplesContext: b.triplesContext.concat(k),
                            chainSubject: c
                        }
                    }(o, a[3]));
                    a === null && (c = o);
                    j--;
                    j === 0 && a === null && i("[88] BlankNodePropertyList");
                    return a
                }
                function Lb() {
                    var a, b, d, f, h, g, m, n, o, q;
                    j++;
                    q = o = c;
                    a = [];
                    for (b = l(); b !== null; )
                        a.push(b),
                        b = l();
                    if (a !== null)
                        if (e.charCodeAt(c) === 40 ? (b = "(",
                        c++) : (b = null,
                        j === 0 && i('"("')),
                        b !== null) {
                            d = [];
                            for (f = l(); f !== null; )
                                d.push(f),
                                f = l();
                            if (d !== null) {
                                h = ra();
                                if (h !== null)
                                    for (f = []; h !== null; )
                                        f.push(h),
                                        h = ra();
                                else
                                    f = null;
                                if (f !== null) {
                                    h = [];
                                    for (g = l(); g !== null; )
                                        h.push(g),
                                        g = l();
                                    if (h !== null)
                                        if (e.charCodeAt(c) === 41 ? (g = ")",
                                        c++) : (g = null,
                                        j === 0 && i('")"')),
                                        g !== null) {
                                            m = [];
                                            for (n = l(); n !== null; )
                                                m.push(n),
                                                n = l();
                                            m !== null ? a = [a, b, d, f, h, g, m] : (a = null,
                                            c = q)
                                        } else
                                            a = null,
                                            c = q;
                                    else
                                        a = null,
                                        c = q
                                } else
                                    a = null,
                                    c = q
                            } else
                                a = null,
                                c = q
                        } else
                            a = null,
                            c = q;
                    else
                        a = null,
                        c = q;
                    a !== null && (a = a[3]);
                    a === null && (c = o);
                    j--;
                    j === 0 && a === null && i("[89] Collection");
                    return a
                }
                function ra() {
                    var a, b, e, d, f, h;
                    j++;
                    h = f = c;
                    a = [];
                    for (b = l(); b !== null; )
                        a.push(b),
                        b = l();
                    if (a !== null)
                        if (b = Pa(),
                        b !== null) {
                            e = [];
                            for (d = l(); d !== null; )
                                e.push(d),
                                d = l();
                            e !== null ? a = [a, b, e] : (a = null,
                            c = h)
                        } else
                            a = null,
                            c = h;
                    else
                        a = null,
                        c = h;
                    if (a === null) {
                        h = c;
                        a = [];
                        for (b = l(); b !== null; )
                            a.push(b),
                            b = l();
                        if (a !== null)
                            if (b = Qa(),
                            b !== null) {
                                e = [];
                                for (d = l(); d !== null; )
                                    e.push(d),
                                    d = l();
                                e !== null ? a = [a, b, e] : (a = null,
                                c = h)
                            } else
                                a = null,
                                c = h;
                        else
                            a = null,
                            c = h
                    }
                    a !== null && (a = a[1]);
                    a === null && (c = f);
                    j--;
                    j === 0 && a === null && i("[90] GraphNode");
                    return a
                }
                function Pa() {
                    var a;
                    j++;
                    a = O();
                    a === null && (a = Nb());
                    j--;
                    j === 0 && a === null && i("[91] VarOrTerm");
                    return a
                }
                function ka() {
                    var a;
                    j++;
                    a = O();
                    a === null && (a = P());
                    j--;
                    j === 0 && a === null && i("[92] VarOrIRIref");
                    return a
                }
                function O() {
                    var a, b;
                    j++;
                    b = c;
                    a = Ob();
                    a === null && (a = Pb());
                    a !== null && (a = function(a, b) {
                        var c = {
                            token: "var"
                        };
                        c.value = b;
                        return c
                    }(b, a));
                    a === null && (c = b);
                    j--;
                    j === 0 && a === null && i("[93] Var");
                    return a
                }
                function Nb() {
                    var a;
                    j++;
                    a = P();
                    a === null && (a = Ma(),
                    a === null && (a = Na(),
                    a === null && (a = Oa(),
                    a === null && (a = Qb(),
                    a === null && (a = la())))));
                    j--;
                    j === 0 && a === null && i("[94] GraphTerm");
                    return a
                }
                function J() {
                    var a, b, d, f, h, g, m, n, o;
                    j++;
                    n = m = c;
                    a = Va();
                    if (a !== null) {
                        b = [];
                        o = c;
                        d = [];
                        for (f = l(); f !== null; )
                            d.push(f),
                            f = l();
                        if (d !== null)
                            if (e.substr(c, 2) === "||" ? (f = "||",
                            c += 2) : (f = null,
                            j === 0 && i('"||"')),
                            f !== null) {
                                h = [];
                                for (g = l(); g !== null; )
                                    h.push(g),
                                    g = l();
                                h !== null ? (g = Va(),
                                g !== null ? d = [d, f, h, g] : (d = null,
                                c = o)) : (d = null,
                                c = o)
                            } else
                                d = null,
                                c = o;
                        else
                            d = null,
                            c = o;
                        for (; d !== null; ) {
                            b.push(d);
                            o = c;
                            d = [];
                            for (f = l(); f !== null; )
                                d.push(f),
                                f = l();
                            if (d !== null)
                                if (e.substr(c, 2) === "||" ? (f = "||",
                                c += 2) : (f = null,
                                j === 0 && i('"||"')),
                                f !== null) {
                                    h = [];
                                    for (g = l(); g !== null; )
                                        h.push(g),
                                        g = l();
                                    h !== null ? (g = Va(),
                                    g !== null ? d = [d, f, h, g] : (d = null,
                                    c = o)) : (d = null,
                                    c = o)
                                } else
                                    d = null,
                                    c = o;
                            else
                                d = null,
                                c = o
                        }
                        b !== null ? a = [a, b] : (a = null,
                        c = n)
                    } else
                        a = null,
                        c = n;
                    a !== null && (a = function(a, b, c) {
                        if (c.length === 0)
                            return b;
                        for (var a = {
                            token: "expression",
                            expressionType: "conditionalor"
                        }, b = [b], e = 0; e < c.length; e++)
                            b.push(c[e][3]);
                        a.operands = b;
                        return a
                    }(m, a[0], a[1]));
                    a === null && (c = m);
                    j--;
                    j === 0 && a === null && i("[96] ConditionalOrExpression");
                    return a
                }
                function Va() {
                    var a, b, d, f, h, g, m, n, o;
                    j++;
                    n = m = c;
                    a = Wa();
                    if (a !== null) {
                        b = [];
                        o = c;
                        d = [];
                        for (f = l(); f !== null; )
                            d.push(f),
                            f = l();
                        if (d !== null)
                            if (e.substr(c, 2) === "&&" ? (f = "&&",
                            c += 2) : (f = null,
                            j === 0 && i('"&&"')),
                            f !== null) {
                                h = [];
                                for (g = l(); g !== null; )
                                    h.push(g),
                                    g = l();
                                h !== null ? (g = Wa(),
                                g !== null ? d = [d, f, h, g] : (d = null,
                                c = o)) : (d = null,
                                c = o)
                            } else
                                d = null,
                                c = o;
                        else
                            d = null,
                            c = o;
                        for (; d !== null; ) {
                            b.push(d);
                            o = c;
                            d = [];
                            for (f = l(); f !== null; )
                                d.push(f),
                                f = l();
                            if (d !== null)
                                if (e.substr(c, 2) === "&&" ? (f = "&&",
                                c += 2) : (f = null,
                                j === 0 && i('"&&"')),
                                f !== null) {
                                    h = [];
                                    for (g = l(); g !== null; )
                                        h.push(g),
                                        g = l();
                                    h !== null ? (g = Wa(),
                                    g !== null ? d = [d, f, h, g] : (d = null,
                                    c = o)) : (d = null,
                                    c = o)
                                } else
                                    d = null,
                                    c = o;
                            else
                                d = null,
                                c = o
                        }
                        b !== null ? a = [a, b] : (a = null,
                        c = n)
                    } else
                        a = null,
                        c = n;
                    a !== null && (a = function(a, b, c) {
                        if (c.length === 0)
                            return b;
                        for (var a = {
                            token: "expression",
                            expressionType: "conditionaland"
                        }, b = [b], e = 0; e < c.length; e++)
                            b.push(c[e][3]);
                        a.operands = b;
                        return a
                    }(m, a[0], a[1]));
                    a === null && (c = m);
                    j--;
                    j === 0 && a === null && i("[97] ConditionalAndExpression");
                    return a
                }
                function Wa() {
                    var a, b, d, f, h, g, m, n, o, q, r, s, G, v;
                    j++;
                    G = s = c;
                    a = S();
                    if (a !== null) {
                        b = [];
                        v = c;
                        d = [];
                        for (f = l(); f !== null; )
                            d.push(f),
                            f = l();
                        if (d !== null)
                            if (e.charCodeAt(c) === 61 ? (f = "=",
                            c++) : (f = null,
                            j === 0 && i('"="')),
                            f !== null) {
                                h = [];
                                for (g = l(); g !== null; )
                                    h.push(g),
                                    g = l();
                                h !== null ? (g = S(),
                                g !== null ? d = [d, f, h, g] : (d = null,
                                c = v)) : (d = null,
                                c = v)
                            } else
                                d = null,
                                c = v;
                        else
                            d = null,
                            c = v;
                        if (d === null) {
                            v = c;
                            d = [];
                            for (f = l(); f !== null; )
                                d.push(f),
                                f = l();
                            if (d !== null)
                                if (e.substr(c, 2) === "!=" ? (f = "!=",
                                c += 2) : (f = null,
                                j === 0 && i('"!="')),
                                f !== null) {
                                    h = [];
                                    for (g = l(); g !== null; )
                                        h.push(g),
                                        g = l();
                                    h !== null ? (g = S(),
                                    g !== null ? d = [d, f, h, g] : (d = null,
                                    c = v)) : (d = null,
                                    c = v)
                                } else
                                    d = null,
                                    c = v;
                            else
                                d = null,
                                c = v;
                            if (d === null) {
                                v = c;
                                d = [];
                                for (f = l(); f !== null; )
                                    d.push(f),
                                    f = l();
                                if (d !== null)
                                    if (e.charCodeAt(c) === 60 ? (f = "<",
                                    c++) : (f = null,
                                    j === 0 && i('"<"')),
                                    f !== null) {
                                        h = [];
                                        for (g = l(); g !== null; )
                                            h.push(g),
                                            g = l();
                                        h !== null ? (g = S(),
                                        g !== null ? d = [d, f, h, g] : (d = null,
                                        c = v)) : (d = null,
                                        c = v)
                                    } else
                                        d = null,
                                        c = v;
                                else
                                    d = null,
                                    c = v;
                                if (d === null) {
                                    v = c;
                                    d = [];
                                    for (f = l(); f !== null; )
                                        d.push(f),
                                        f = l();
                                    if (d !== null)
                                        if (e.charCodeAt(c) === 62 ? (f = ">",
                                        c++) : (f = null,
                                        j === 0 && i('">"')),
                                        f !== null) {
                                            h = [];
                                            for (g = l(); g !== null; )
                                                h.push(g),
                                                g = l();
                                            h !== null ? (g = S(),
                                            g !== null ? d = [d, f, h, g] : (d = null,
                                            c = v)) : (d = null,
                                            c = v)
                                        } else
                                            d = null,
                                            c = v;
                                    else
                                        d = null,
                                        c = v;
                                    if (d === null) {
                                        v = c;
                                        d = [];
                                        for (f = l(); f !== null; )
                                            d.push(f),
                                            f = l();
                                        if (d !== null)
                                            if (e.substr(c, 2) === "<=" ? (f = "<=",
                                            c += 2) : (f = null,
                                            j === 0 && i('"<="')),
                                            f !== null) {
                                                h = [];
                                                for (g = l(); g !== null; )
                                                    h.push(g),
                                                    g = l();
                                                h !== null ? (g = S(),
                                                g !== null ? d = [d, f, h, g] : (d = null,
                                                c = v)) : (d = null,
                                                c = v)
                                            } else
                                                d = null,
                                                c = v;
                                        else
                                            d = null,
                                            c = v;
                                        if (d === null) {
                                            v = c;
                                            d = [];
                                            for (f = l(); f !== null; )
                                                d.push(f),
                                                f = l();
                                            if (d !== null)
                                                if (e.substr(c, 2) === ">=" ? (f = ">=",
                                                c += 2) : (f = null,
                                                j === 0 && i('">="')),
                                                f !== null) {
                                                    h = [];
                                                    for (g = l(); g !== null; )
                                                        h.push(g),
                                                        g = l();
                                                    h !== null ? (g = S(),
                                                    g !== null ? d = [d, f, h, g] : (d = null,
                                                    c = v)) : (d = null,
                                                    c = v)
                                                } else
                                                    d = null,
                                                    c = v;
                                            else
                                                d = null,
                                                c = v;
                                            if (d === null) {
                                                v = c;
                                                d = [];
                                                for (f = l(); f !== null; )
                                                    d.push(f),
                                                    f = l();
                                                if (d !== null)
                                                    if (e.charCodeAt(c) === 73 ? (f = "I",
                                                    c++) : (f = null,
                                                    j === 0 && i('"I"')),
                                                    f === null && (e.charCodeAt(c) === 105 ? (f = "i",
                                                    c++) : (f = null,
                                                    j === 0 && i('"i"'))),
                                                    f !== null)
                                                        if (e.charCodeAt(c) === 78 ? (h = "N",
                                                        c++) : (h = null,
                                                        j === 0 && i('"N"')),
                                                        h === null && (e.charCodeAt(c) === 110 ? (h = "n",
                                                        c++) : (h = null,
                                                        j === 0 && i('"n"'))),
                                                        h !== null) {
                                                            g = [];
                                                            for (m = l(); m !== null; )
                                                                g.push(m),
                                                                m = l();
                                                            g !== null ? (m = qa(),
                                                            m !== null ? d = [d, f, h, g, m] : (d = null,
                                                            c = v)) : (d = null,
                                                            c = v)
                                                        } else
                                                            d = null,
                                                            c = v;
                                                    else
                                                        d = null,
                                                        c = v;
                                                else
                                                    d = null,
                                                    c = v;
                                                if (d === null) {
                                                    v = c;
                                                    d = [];
                                                    for (f = l(); f !== null; )
                                                        d.push(f),
                                                        f = l();
                                                    if (d !== null)
                                                        if (e.charCodeAt(c) === 78 ? (f = "N",
                                                        c++) : (f = null,
                                                        j === 0 && i('"N"')),
                                                        f === null && (e.charCodeAt(c) === 110 ? (f = "n",
                                                        c++) : (f = null,
                                                        j === 0 && i('"n"'))),
                                                        f !== null)
                                                            if (e.charCodeAt(c) === 79 ? (h = "O",
                                                            c++) : (h = null,
                                                            j === 0 && i('"O"')),
                                                            h === null && (e.charCodeAt(c) === 111 ? (h = "o",
                                                            c++) : (h = null,
                                                            j === 0 && i('"o"'))),
                                                            h !== null)
                                                                if (e.charCodeAt(c) === 84 ? (g = "T",
                                                                c++) : (g = null,
                                                                j === 0 && i('"T"')),
                                                                g === null && (e.charCodeAt(c) === 116 ? (g = "t",
                                                                c++) : (g = null,
                                                                j === 0 && i('"t"'))),
                                                                g !== null) {
                                                                    m = [];
                                                                    for (n = l(); n !== null; )
                                                                        m.push(n),
                                                                        n = l();
                                                                    if (m !== null)
                                                                        if (e.charCodeAt(c) === 73 ? (n = "I",
                                                                        c++) : (n = null,
                                                                        j === 0 && i('"I"')),
                                                                        n === null && (e.charCodeAt(c) === 105 ? (n = "i",
                                                                        c++) : (n = null,
                                                                        j === 0 && i('"i"'))),
                                                                        n !== null)
                                                                            if (e.charCodeAt(c) === 78 ? (o = "N",
                                                                            c++) : (o = null,
                                                                            j === 0 && i('"N"')),
                                                                            o === null && (e.charCodeAt(c) === 110 ? (o = "n",
                                                                            c++) : (o = null,
                                                                            j === 0 && i('"n"'))),
                                                                            o !== null) {
                                                                                q = [];
                                                                                for (r = l(); r !== null; )
                                                                                    q.push(r),
                                                                                    r = l();
                                                                                q !== null ? (r = qa(),
                                                                                r !== null ? d = [d, f, h, g, m, n, o, q, r] : (d = null,
                                                                                c = v)) : (d = null,
                                                                                c = v)
                                                                            } else
                                                                                d = null,
                                                                                c = v;
                                                                        else
                                                                            d = null,
                                                                            c = v;
                                                                    else
                                                                        d = null,
                                                                        c = v
                                                                } else
                                                                    d = null,
                                                                    c = v;
                                                            else
                                                                d = null,
                                                                c = v;
                                                        else
                                                            d = null,
                                                            c = v;
                                                    else
                                                        d = null,
                                                        c = v
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        for (; d !== null; ) {
                            b.push(d);
                            v = c;
                            d = [];
                            for (f = l(); f !== null; )
                                d.push(f),
                                f = l();
                            if (d !== null)
                                if (e.charCodeAt(c) === 61 ? (f = "=",
                                c++) : (f = null,
                                j === 0 && i('"="')),
                                f !== null) {
                                    h = [];
                                    for (g = l(); g !== null; )
                                        h.push(g),
                                        g = l();
                                    h !== null ? (g = S(),
                                    g !== null ? d = [d, f, h, g] : (d = null,
                                    c = v)) : (d = null,
                                    c = v)
                                } else
                                    d = null,
                                    c = v;
                            else
                                d = null,
                                c = v;
                            if (d === null) {
                                v = c;
                                d = [];
                                for (f = l(); f !== null; )
                                    d.push(f),
                                    f = l();
                                if (d !== null)
                                    if (e.substr(c, 2) === "!=" ? (f = "!=",
                                    c += 2) : (f = null,
                                    j === 0 && i('"!="')),
                                    f !== null) {
                                        h = [];
                                        for (g = l(); g !== null; )
                                            h.push(g),
                                            g = l();
                                        h !== null ? (g = S(),
                                        g !== null ? d = [d, f, h, g] : (d = null,
                                        c = v)) : (d = null,
                                        c = v)
                                    } else
                                        d = null,
                                        c = v;
                                else
                                    d = null,
                                    c = v;
                                if (d === null) {
                                    v = c;
                                    d = [];
                                    for (f = l(); f !== null; )
                                        d.push(f),
                                        f = l();
                                    if (d !== null)
                                        if (e.charCodeAt(c) === 60 ? (f = "<",
                                        c++) : (f = null,
                                        j === 0 && i('"<"')),
                                        f !== null) {
                                            h = [];
                                            for (g = l(); g !== null; )
                                                h.push(g),
                                                g = l();
                                            h !== null ? (g = S(),
                                            g !== null ? d = [d, f, h, g] : (d = null,
                                            c = v)) : (d = null,
                                            c = v)
                                        } else
                                            d = null,
                                            c = v;
                                    else
                                        d = null,
                                        c = v;
                                    if (d === null) {
                                        v = c;
                                        d = [];
                                        for (f = l(); f !== null; )
                                            d.push(f),
                                            f = l();
                                        if (d !== null)
                                            if (e.charCodeAt(c) === 62 ? (f = ">",
                                            c++) : (f = null,
                                            j === 0 && i('">"')),
                                            f !== null) {
                                                h = [];
                                                for (g = l(); g !== null; )
                                                    h.push(g),
                                                    g = l();
                                                h !== null ? (g = S(),
                                                g !== null ? d = [d, f, h, g] : (d = null,
                                                c = v)) : (d = null,
                                                c = v)
                                            } else
                                                d = null,
                                                c = v;
                                        else
                                            d = null,
                                            c = v;
                                        if (d === null) {
                                            v = c;
                                            d = [];
                                            for (f = l(); f !== null; )
                                                d.push(f),
                                                f = l();
                                            if (d !== null)
                                                if (e.substr(c, 2) === "<=" ? (f = "<=",
                                                c += 2) : (f = null,
                                                j === 0 && i('"<="')),
                                                f !== null) {
                                                    h = [];
                                                    for (g = l(); g !== null; )
                                                        h.push(g),
                                                        g = l();
                                                    h !== null ? (g = S(),
                                                    g !== null ? d = [d, f, h, g] : (d = null,
                                                    c = v)) : (d = null,
                                                    c = v)
                                                } else
                                                    d = null,
                                                    c = v;
                                            else
                                                d = null,
                                                c = v;
                                            if (d === null) {
                                                v = c;
                                                d = [];
                                                for (f = l(); f !== null; )
                                                    d.push(f),
                                                    f = l();
                                                if (d !== null)
                                                    if (e.substr(c, 2) === ">=" ? (f = ">=",
                                                    c += 2) : (f = null,
                                                    j === 0 && i('">="')),
                                                    f !== null) {
                                                        h = [];
                                                        for (g = l(); g !== null; )
                                                            h.push(g),
                                                            g = l();
                                                        h !== null ? (g = S(),
                                                        g !== null ? d = [d, f, h, g] : (d = null,
                                                        c = v)) : (d = null,
                                                        c = v)
                                                    } else
                                                        d = null,
                                                        c = v;
                                                else
                                                    d = null,
                                                    c = v;
                                                if (d === null) {
                                                    v = c;
                                                    d = [];
                                                    for (f = l(); f !== null; )
                                                        d.push(f),
                                                        f = l();
                                                    if (d !== null)
                                                        if (e.charCodeAt(c) === 73 ? (f = "I",
                                                        c++) : (f = null,
                                                        j === 0 && i('"I"')),
                                                        f === null && (e.charCodeAt(c) === 105 ? (f = "i",
                                                        c++) : (f = null,
                                                        j === 0 && i('"i"'))),
                                                        f !== null)
                                                            if (e.charCodeAt(c) === 78 ? (h = "N",
                                                            c++) : (h = null,
                                                            j === 0 && i('"N"')),
                                                            h === null && (e.charCodeAt(c) === 110 ? (h = "n",
                                                            c++) : (h = null,
                                                            j === 0 && i('"n"'))),
                                                            h !== null) {
                                                                g = [];
                                                                for (m = l(); m !== null; )
                                                                    g.push(m),
                                                                    m = l();
                                                                g !== null ? (m = qa(),
                                                                m !== null ? d = [d, f, h, g, m] : (d = null,
                                                                c = v)) : (d = null,
                                                                c = v)
                                                            } else
                                                                d = null,
                                                                c = v;
                                                        else
                                                            d = null,
                                                            c = v;
                                                    else
                                                        d = null,
                                                        c = v;
                                                    if (d === null) {
                                                        v = c;
                                                        d = [];
                                                        for (f = l(); f !== null; )
                                                            d.push(f),
                                                            f = l();
                                                        if (d !== null)
                                                            if (e.charCodeAt(c) === 78 ? (f = "N",
                                                            c++) : (f = null,
                                                            j === 0 && i('"N"')),
                                                            f === null && (e.charCodeAt(c) === 110 ? (f = "n",
                                                            c++) : (f = null,
                                                            j === 0 && i('"n"'))),
                                                            f !== null)
                                                                if (e.charCodeAt(c) === 79 ? (h = "O",
                                                                c++) : (h = null,
                                                                j === 0 && i('"O"')),
                                                                h === null && (e.charCodeAt(c) === 111 ? (h = "o",
                                                                c++) : (h = null,
                                                                j === 0 && i('"o"'))),
                                                                h !== null)
                                                                    if (e.charCodeAt(c) === 84 ? (g = "T",
                                                                    c++) : (g = null,
                                                                    j === 0 && i('"T"')),
                                                                    g === null && (e.charCodeAt(c) === 116 ? (g = "t",
                                                                    c++) : (g = null,
                                                                    j === 0 && i('"t"'))),
                                                                    g !== null) {
                                                                        m = [];
                                                                        for (n = l(); n !== null; )
                                                                            m.push(n),
                                                                            n = l();
                                                                        if (m !== null)
                                                                            if (e.charCodeAt(c) === 73 ? (n = "I",
                                                                            c++) : (n = null,
                                                                            j === 0 && i('"I"')),
                                                                            n === null && (e.charCodeAt(c) === 105 ? (n = "i",
                                                                            c++) : (n = null,
                                                                            j === 0 && i('"i"'))),
                                                                            n !== null)
                                                                                if (e.charCodeAt(c) === 78 ? (o = "N",
                                                                                c++) : (o = null,
                                                                                j === 0 && i('"N"')),
                                                                                o === null && (e.charCodeAt(c) === 110 ? (o = "n",
                                                                                c++) : (o = null,
                                                                                j === 0 && i('"n"'))),
                                                                                o !== null) {
                                                                                    q = [];
                                                                                    for (r = l(); r !== null; )
                                                                                        q.push(r),
                                                                                        r = l();
                                                                                    q !== null ? (r = qa(),
                                                                                    r !== null ? d = [d, f, h, g, m, n, o, q, r] : (d = null,
                                                                                    c = v)) : (d = null,
                                                                                    c = v)
                                                                                } else
                                                                                    d = null,
                                                                                    c = v;
                                                                            else
                                                                                d = null,
                                                                                c = v;
                                                                        else
                                                                            d = null,
                                                                            c = v
                                                                    } else
                                                                        d = null,
                                                                        c = v;
                                                                else
                                                                    d = null,
                                                                    c = v;
                                                            else
                                                                d = null,
                                                                c = v;
                                                        else
                                                            d = null,
                                                            c = v
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        b !== null ? a = [a, b] : (a = null,
                        c = G)
                    } else
                        a = null,
                        c = G;
                    a !== null && (a = function(a, b, c) {
                        if (c.length === 0)
                            return b;
                        else {
                            if (c[0][1] === "i" || c[0][1] === "I" || c[0][1] === "n" || c[0][1] === "N") {
                                a = {};
                                if (c[0][1] === "i" || c[0][1] === "I") {
                                    var e = "=";
                                    a.expressionType = "conditionalor"
                                } else
                                    e = "!=",
                                    a.expressionType = "conditionaland";
                                for (var k = [], d = 0; d < c[0].length; d++)
                                    if (c[0][d].token === "args") {
                                        k = c[0][d].value;
                                        break
                                    }
                                a.token = "expression";
                                a.operands = [];
                                for (c = 0; c < k.length; c++)
                                    d = {
                                        token: "expression",
                                        expressionType: "relationalexpression"
                                    },
                                    d.operator = e,
                                    d.op1 = b,
                                    d.op2 = k[c],
                                    a.operands.push(d)
                            } else
                                a = {
                                    expressionType: "relationalexpression"
                                },
                                a.operator = c[0][1],
                                a.op1 = b,
                                a.op2 = c[0][3],
                                a.token = "expression";
                            return a
                        }
                    }(s, a[0], a[1]));
                    a === null && (c = s);
                    j--;
                    j === 0 && a === null && i("[99] RelationalExpression");
                    return a
                }
                function S() {
                    var a, b, d, f, h, g, m, n, o, q, r;
                    j++;
                    o = n = c;
                    a = sa();
                    if (a !== null) {
                        b = [];
                        q = c;
                        d = [];
                        for (f = l(); f !== null; )
                            d.push(f),
                            f = l();
                        if (d !== null)
                            if (e.charCodeAt(c) === 43 ? (f = "+",
                            c++) : (f = null,
                            j === 0 && i('"+"')),
                            f !== null) {
                                h = [];
                                for (g = l(); g !== null; )
                                    h.push(g),
                                    g = l();
                                h !== null ? (g = sa(),
                                g !== null ? d = [d, f, h, g] : (d = null,
                                c = q)) : (d = null,
                                c = q)
                            } else
                                d = null,
                                c = q;
                        else
                            d = null,
                            c = q;
                        if (d === null) {
                            q = c;
                            d = [];
                            for (f = l(); f !== null; )
                                d.push(f),
                                f = l();
                            if (d !== null)
                                if (e.charCodeAt(c) === 45 ? (f = "-",
                                c++) : (f = null,
                                j === 0 && i('"-"')),
                                f !== null) {
                                    h = [];
                                    for (g = l(); g !== null; )
                                        h.push(g),
                                        g = l();
                                    h !== null ? (g = sa(),
                                    g !== null ? d = [d, f, h, g] : (d = null,
                                    c = q)) : (d = null,
                                    c = q)
                                } else
                                    d = null,
                                    c = q;
                            else
                                d = null,
                                c = q;
                            if (d === null)
                                if (q = c,
                                d = ta(),
                                d === null && (d = ta()),
                                d !== null) {
                                    r = c;
                                    f = [];
                                    for (h = l(); h !== null; )
                                        f.push(h),
                                        h = l();
                                    if (f !== null)
                                        if (e.charCodeAt(c) === 42 ? (h = "*",
                                        c++) : (h = null,
                                        j === 0 && i('"*"')),
                                        h !== null) {
                                            g = [];
                                            for (m = l(); m !== null; )
                                                g.push(m),
                                                m = l();
                                            g !== null ? (m = aa(),
                                            m !== null ? f = [f, h, g, m] : (f = null,
                                            c = r)) : (f = null,
                                            c = r)
                                        } else
                                            f = null,
                                            c = r;
                                    else
                                        f = null,
                                        c = r;
                                    if (f === null) {
                                        r = c;
                                        f = [];
                                        for (h = l(); h !== null; )
                                            f.push(h),
                                            h = l();
                                        if (f !== null)
                                            if (e.charCodeAt(c) === 47 ? (h = "/",
                                            c++) : (h = null,
                                            j === 0 && i('"/"')),
                                            h !== null) {
                                                g = [];
                                                for (m = l(); m !== null; )
                                                    g.push(m),
                                                    m = l();
                                                g !== null ? (m = aa(),
                                                m !== null ? f = [f, h, g, m] : (f = null,
                                                c = r)) : (f = null,
                                                c = r)
                                            } else
                                                f = null,
                                                c = r;
                                        else
                                            f = null,
                                            c = r
                                    }
                                    f = f !== null ? f : "";
                                    f !== null ? d = [d, f] : (d = null,
                                    c = q)
                                } else
                                    d = null,
                                    c = q
                        }
                        for (; d !== null; ) {
                            b.push(d);
                            q = c;
                            d = [];
                            for (f = l(); f !== null; )
                                d.push(f),
                                f = l();
                            if (d !== null)
                                if (e.charCodeAt(c) === 43 ? (f = "+",
                                c++) : (f = null,
                                j === 0 && i('"+"')),
                                f !== null) {
                                    h = [];
                                    for (g = l(); g !== null; )
                                        h.push(g),
                                        g = l();
                                    h !== null ? (g = sa(),
                                    g !== null ? d = [d, f, h, g] : (d = null,
                                    c = q)) : (d = null,
                                    c = q)
                                } else
                                    d = null,
                                    c = q;
                            else
                                d = null,
                                c = q;
                            if (d === null) {
                                q = c;
                                d = [];
                                for (f = l(); f !== null; )
                                    d.push(f),
                                    f = l();
                                if (d !== null)
                                    if (e.charCodeAt(c) === 45 ? (f = "-",
                                    c++) : (f = null,
                                    j === 0 && i('"-"')),
                                    f !== null) {
                                        h = [];
                                        for (g = l(); g !== null; )
                                            h.push(g),
                                            g = l();
                                        h !== null ? (g = sa(),
                                        g !== null ? d = [d, f, h, g] : (d = null,
                                        c = q)) : (d = null,
                                        c = q)
                                    } else
                                        d = null,
                                        c = q;
                                else
                                    d = null,
                                    c = q;
                                if (d === null)
                                    if (q = c,
                                    d = ta(),
                                    d === null && (d = ta()),
                                    d !== null) {
                                        r = c;
                                        f = [];
                                        for (h = l(); h !== null; )
                                            f.push(h),
                                            h = l();
                                        if (f !== null)
                                            if (e.charCodeAt(c) === 42 ? (h = "*",
                                            c++) : (h = null,
                                            j === 0 && i('"*"')),
                                            h !== null) {
                                                g = [];
                                                for (m = l(); m !== null; )
                                                    g.push(m),
                                                    m = l();
                                                g !== null ? (m = aa(),
                                                m !== null ? f = [f, h, g, m] : (f = null,
                                                c = r)) : (f = null,
                                                c = r)
                                            } else
                                                f = null,
                                                c = r;
                                        else
                                            f = null,
                                            c = r;
                                        if (f === null) {
                                            r = c;
                                            f = [];
                                            for (h = l(); h !== null; )
                                                f.push(h),
                                                h = l();
                                            if (f !== null)
                                                if (e.charCodeAt(c) === 47 ? (h = "/",
                                                c++) : (h = null,
                                                j === 0 && i('"/"')),
                                                h !== null) {
                                                    g = [];
                                                    for (m = l(); m !== null; )
                                                        g.push(m),
                                                        m = l();
                                                    g !== null ? (m = aa(),
                                                    m !== null ? f = [f, h, g, m] : (f = null,
                                                    c = r)) : (f = null,
                                                    c = r)
                                                } else
                                                    f = null,
                                                    c = r;
                                            else
                                                f = null,
                                                c = r
                                        }
                                        f = f !== null ? f : "";
                                        f !== null ? d = [d, f] : (d = null,
                                        c = q)
                                    } else
                                        d = null,
                                        c = q
                            }
                        }
                        b !== null ? a = [a, b] : (a = null,
                        c = o)
                    } else
                        a = null,
                        c = o;
                    a !== null && (a = function(a, b, c) {
                        if (c.length === 0)
                            return b;
                        a = {
                            token: "expression",
                            expressionType: "additiveexpression"
                        };
                        a.summand = b;
                        a.summands = [];
                        for (b = 0; b < c.length; b++) {
                            var e = c[b]
                              , k = {};
                            if (e.length == 4 && typeof e[1] === "string")
                                k.operator = e[1],
                                k.expression = e[3];
                            else {
                                var e = {}
                                  , d = k[0]
                                  , f = k[1][1]
                                  , i = k[1][3]
                                  , f = null;
                                d.value < 0 ? (k.operator = "-",
                                d.value = -d.value) : k.operator = "+";
                                e.token = "expression";
                                e.expressionType = "multiplicativeexpression";
                                e.operator = d;
                                e.factors = [{
                                    operator: f,
                                    expression: i
                                }];
                                k.expression = e
                            }
                            a.summands.push(k)
                        }
                        return a
                    }(n, a[0], a[1]));
                    a === null && (c = n);
                    j--;
                    j === 0 && a === null && i("[101] AdditiveExpression");
                    return a
                }
                function sa() {
                    var a, b, d, f, h, g, m, n, o;
                    j++;
                    n = m = c;
                    a = aa();
                    if (a !== null) {
                        b = [];
                        o = c;
                        d = [];
                        for (f = l(); f !== null; )
                            d.push(f),
                            f = l();
                        if (d !== null)
                            if (e.charCodeAt(c) === 42 ? (f = "*",
                            c++) : (f = null,
                            j === 0 && i('"*"')),
                            f !== null) {
                                h = [];
                                for (g = l(); g !== null; )
                                    h.push(g),
                                    g = l();
                                h !== null ? (g = aa(),
                                g !== null ? d = [d, f, h, g] : (d = null,
                                c = o)) : (d = null,
                                c = o)
                            } else
                                d = null,
                                c = o;
                        else
                            d = null,
                            c = o;
                        if (d === null) {
                            o = c;
                            d = [];
                            for (f = l(); f !== null; )
                                d.push(f),
                                f = l();
                            if (d !== null)
                                if (e.charCodeAt(c) === 47 ? (f = "/",
                                c++) : (f = null,
                                j === 0 && i('"/"')),
                                f !== null) {
                                    h = [];
                                    for (g = l(); g !== null; )
                                        h.push(g),
                                        g = l();
                                    h !== null ? (g = aa(),
                                    g !== null ? d = [d, f, h, g] : (d = null,
                                    c = o)) : (d = null,
                                    c = o)
                                } else
                                    d = null,
                                    c = o;
                            else
                                d = null,
                                c = o
                        }
                        for (; d !== null; ) {
                            b.push(d);
                            o = c;
                            d = [];
                            for (f = l(); f !== null; )
                                d.push(f),
                                f = l();
                            if (d !== null)
                                if (e.charCodeAt(c) === 42 ? (f = "*",
                                c++) : (f = null,
                                j === 0 && i('"*"')),
                                f !== null) {
                                    h = [];
                                    for (g = l(); g !== null; )
                                        h.push(g),
                                        g = l();
                                    h !== null ? (g = aa(),
                                    g !== null ? d = [d, f, h, g] : (d = null,
                                    c = o)) : (d = null,
                                    c = o)
                                } else
                                    d = null,
                                    c = o;
                            else
                                d = null,
                                c = o;
                            if (d === null) {
                                o = c;
                                d = [];
                                for (f = l(); f !== null; )
                                    d.push(f),
                                    f = l();
                                if (d !== null)
                                    if (e.charCodeAt(c) === 47 ? (f = "/",
                                    c++) : (f = null,
                                    j === 0 && i('"/"')),
                                    f !== null) {
                                        h = [];
                                        for (g = l(); g !== null; )
                                            h.push(g),
                                            g = l();
                                        h !== null ? (g = aa(),
                                        g !== null ? d = [d, f, h, g] : (d = null,
                                        c = o)) : (d = null,
                                        c = o)
                                    } else
                                        d = null,
                                        c = o;
                                else
                                    d = null,
                                    c = o
                            }
                        }
                        b !== null ? a = [a, b] : (a = null,
                        c = n)
                    } else
                        a = null,
                        c = n;
                    a !== null && (a = function(a, b, c) {
                        if (c.length === 0)
                            return b;
                        a = {
                            token: "expression",
                            expressionType: "multiplicativeexpression"
                        };
                        a.factor = b;
                        a.factors = [];
                        for (b = 0; b < c.length; b++) {
                            var e = c[b]
                              , k = {};
                            k.operator = e[1];
                            k.expression = e[3];
                            a.factors.push(k)
                        }
                        return a
                    }(m, a[0], a[1]));
                    a === null && (c = m);
                    j--;
                    j === 0 && a === null && i("[102] MultiplicativeExpression");
                    return a
                }
                function aa() {
                    var a, b, d, f, h;
                    j++;
                    h = f = c;
                    e.charCodeAt(c) === 33 ? (a = "!",
                    c++) : (a = null,
                    j === 0 && i('"!"'));
                    if (a !== null) {
                        b = [];
                        for (d = l(); d !== null; )
                            b.push(d),
                            d = l();
                        b !== null ? (d = Ea(),
                        d !== null ? a = [a, b, d] : (a = null,
                        c = h)) : (a = null,
                        c = h)
                    } else
                        a = null,
                        c = h;
                    a !== null && (a = function(a, b) {
                        var c = {
                            token: "expression",
                            expressionType: "unaryexpression",
                            unaryexpression: "!"
                        };
                        c.expression = b;
                        return c
                    }(f, a[2]));
                    a === null && (c = f);
                    if (a === null) {
                        h = f = c;
                        e.charCodeAt(c) === 43 ? (a = "+",
                        c++) : (a = null,
                        j === 0 && i('"+"'));
                        if (a !== null) {
                            b = [];
                            for (d = l(); d !== null; )
                                b.push(d),
                                d = l();
                            b !== null ? (d = Ea(),
                            d !== null ? a = [a, b, d] : (a = null,
                            c = h)) : (a = null,
                            c = h)
                        } else
                            a = null,
                            c = h;
                        a !== null && (a = function(a, b) {
                            var c = {
                                token: "expression",
                                expressionType: "unaryexpression",
                                unaryexpression: "+"
                            };
                            c.expression = b;
                            return c
                        }(f, a[2]));
                        a === null && (c = f);
                        if (a === null) {
                            h = f = c;
                            e.charCodeAt(c) === 45 ? (a = "-",
                            c++) : (a = null,
                            j === 0 && i('"-"'));
                            if (a !== null) {
                                b = [];
                                for (d = l(); d !== null; )
                                    b.push(d),
                                    d = l();
                                b !== null ? (d = Ea(),
                                d !== null ? a = [a, b, d] : (a = null,
                                c = h)) : (a = null,
                                c = h)
                            } else
                                a = null,
                                c = h;
                            a !== null && (a = function(a, b) {
                                var c = {
                                    token: "expression",
                                    expressionType: "unaryexpression",
                                    unaryexpression: "-"
                                };
                                c.expression = b;
                                return c
                            }(f, a[2]));
                            a === null && (c = f);
                            a === null && (a = Ea())
                        }
                    }
                    j--;
                    j === 0 && a === null && i("[103] UnaryExpression");
                    return a
                }
                function Ea() {
                    var a, b;
                    j++;
                    a = La();
                    a === null && (a = Ka(),
                    a === null && (a = Rb(),
                    a === null && (b = c,
                    a = Ma(),
                    a !== null && (a = function(a, b) {
                        var c = {
                            token: "expression",
                            expressionType: "atomic",
                            primaryexpression: "rdfliteral"
                        };
                        c.value = b;
                        return c
                    }(b, a)),
                    a === null && (c = b),
                    a === null && (b = c,
                    a = Na(),
                    a !== null && (a = function(a, b) {
                        var c = {
                            token: "expression",
                            expressionType: "atomic",
                            primaryexpression: "numericliteral"
                        };
                        c.value = b;
                        return c
                    }(b, a)),
                    a === null && (c = b),
                    a === null && (b = c,
                    a = Oa(),
                    a !== null && (a = function(a, b) {
                        var c = {
                            token: "expression",
                            expressionType: "atomic",
                            primaryexpression: "booleanliteral"
                        };
                        c.value = b;
                        return c
                    }(b, a)),
                    a === null && (c = b),
                    a === null && (a = Sb(),
                    a === null && (b = c,
                    a = O(),
                    a !== null && (a = function(a, b) {
                        var c = {
                            token: "expression",
                            expressionType: "atomic",
                            primaryexpression: "var"
                        };
                        c.value = b;
                        return c
                    }(b, a)),
                    a === null && (c = b))))))));
                    j--;
                    j === 0 && a === null && i("[104] PrimaryExpression");
                    return a
                }
                function La() {
                    var a, b, d, f, h, g, m;
                    j++;
                    m = g = c;
                    e.charCodeAt(c) === 40 ? (a = "(",
                    c++) : (a = null,
                    j === 0 && i('"("'));
                    if (a !== null) {
                        b = [];
                        for (d = l(); d !== null; )
                            b.push(d),
                            d = l();
                        if (b !== null)
                            if (d = J(),
                            d !== null) {
                                f = [];
                                for (h = l(); h !== null; )
                                    f.push(h),
                                    h = l();
                                f !== null ? (e.charCodeAt(c) === 41 ? (h = ")",
                                c++) : (h = null,
                                j === 0 && i('")"')),
                                h !== null ? a = [a, b, d, f, h] : (a = null,
                                c = m)) : (a = null,
                                c = m)
                            } else
                                a = null,
                                c = m;
                        else
                            a = null,
                            c = m
                    } else
                        a = null,
                        c = m;
                    a !== null && (a = a[2]);
                    a === null && (c = g);
                    j--;
                    j === 0 && a === null && i("[105] BrackettedExpression");
                    return a
                }
                function Ka() {
                    var a, b, d, f, h, g, m, n, o, q, r, s, G, v, B, t, u;
                    j++;
                    u = t = c;
                    e.substr(c, 3) === "STR" ? (a = "STR",
                    c += 3) : (a = null,
                    j === 0 && i('"STR"'));
                    a === null && (e.substr(c, 3) === "str" ? (a = "str",
                    c += 3) : (a = null,
                    j === 0 && i('"str"')));
                    if (a !== null) {
                        b = [];
                        for (d = l(); d !== null; )
                            b.push(d),
                            d = l();
                        if (b !== null)
                            if (e.charCodeAt(c) === 40 ? (d = "(",
                            c++) : (d = null,
                            j === 0 && i('"("')),
                            d !== null) {
                                f = [];
                                for (h = l(); h !== null; )
                                    f.push(h),
                                    h = l();
                                if (f !== null)
                                    if (h = J(),
                                    h !== null) {
                                        g = [];
                                        for (m = l(); m !== null; )
                                            g.push(m),
                                            m = l();
                                        g !== null ? (e.charCodeAt(c) === 41 ? (m = ")",
                                        c++) : (m = null,
                                        j === 0 && i('")"')),
                                        m !== null ? a = [a, b, d, f, h, g, m] : (a = null,
                                        c = u)) : (a = null,
                                        c = u)
                                    } else
                                        a = null,
                                        c = u;
                                else
                                    a = null,
                                    c = u
                            } else
                                a = null,
                                c = u;
                        else
                            a = null,
                            c = u
                    } else
                        a = null,
                        c = u;
                    a !== null && (a = function(a, b) {
                        var c = {
                            token: "expression",
                            expressionType: "builtincall",
                            builtincall: "str"
                        };
                        c.args = [b];
                        return c
                    }(t, a[4]));
                    a === null && (c = t);
                    if (a === null) {
                        u = t = c;
                        e.substr(c, 4) === "LANG" ? (a = "LANG",
                        c += 4) : (a = null,
                        j === 0 && i('"LANG"'));
                        a === null && (e.substr(c, 4) === "lang" ? (a = "lang",
                        c += 4) : (a = null,
                        j === 0 && i('"lang"')));
                        if (a !== null) {
                            b = [];
                            for (d = l(); d !== null; )
                                b.push(d),
                                d = l();
                            if (b !== null)
                                if (e.charCodeAt(c) === 40 ? (d = "(",
                                c++) : (d = null,
                                j === 0 && i('"("')),
                                d !== null) {
                                    f = [];
                                    for (h = l(); h !== null; )
                                        f.push(h),
                                        h = l();
                                    if (f !== null)
                                        if (h = J(),
                                        h !== null) {
                                            g = [];
                                            for (m = l(); m !== null; )
                                                g.push(m),
                                                m = l();
                                            g !== null ? (e.charCodeAt(c) === 41 ? (m = ")",
                                            c++) : (m = null,
                                            j === 0 && i('")"')),
                                            m !== null ? a = [a, b, d, f, h, g, m] : (a = null,
                                            c = u)) : (a = null,
                                            c = u)
                                        } else
                                            a = null,
                                            c = u;
                                    else
                                        a = null,
                                        c = u
                                } else
                                    a = null,
                                    c = u;
                            else
                                a = null,
                                c = u
                        } else
                            a = null,
                            c = u;
                        a !== null && (a = function(a, b) {
                            var c = {
                                token: "expression",
                                expressionType: "builtincall",
                                builtincall: "lang"
                            };
                            c.args = [b];
                            return c
                        }(t, a[4]));
                        a === null && (c = t);
                        if (a === null) {
                            u = t = c;
                            e.substr(c, 11) === "LANGMATCHES" ? (a = "LANGMATCHES",
                            c += 11) : (a = null,
                            j === 0 && i('"LANGMATCHES"'));
                            a === null && (e.substr(c, 11) === "langmatches" ? (a = "langmatches",
                            c += 11) : (a = null,
                            j === 0 && i('"langmatches"')));
                            if (a !== null) {
                                b = [];
                                for (d = l(); d !== null; )
                                    b.push(d),
                                    d = l();
                                if (b !== null)
                                    if (e.charCodeAt(c) === 40 ? (d = "(",
                                    c++) : (d = null,
                                    j === 0 && i('"("')),
                                    d !== null) {
                                        f = [];
                                        for (h = l(); h !== null; )
                                            f.push(h),
                                            h = l();
                                        if (f !== null)
                                            if (h = J(),
                                            h !== null) {
                                                g = [];
                                                for (m = l(); m !== null; )
                                                    g.push(m),
                                                    m = l();
                                                if (g !== null)
                                                    if (e.charCodeAt(c) === 44 ? (m = ",",
                                                    c++) : (m = null,
                                                    j === 0 && i('","')),
                                                    m !== null) {
                                                        n = [];
                                                        for (o = l(); o !== null; )
                                                            n.push(o),
                                                            o = l();
                                                        if (n !== null)
                                                            if (o = J(),
                                                            o !== null) {
                                                                q = [];
                                                                for (r = l(); r !== null; )
                                                                    q.push(r),
                                                                    r = l();
                                                                q !== null ? (e.charCodeAt(c) === 41 ? (r = ")",
                                                                c++) : (r = null,
                                                                j === 0 && i('")"')),
                                                                r !== null ? a = [a, b, d, f, h, g, m, n, o, q, r] : (a = null,
                                                                c = u)) : (a = null,
                                                                c = u)
                                                            } else
                                                                a = null,
                                                                c = u;
                                                        else
                                                            a = null,
                                                            c = u
                                                    } else
                                                        a = null,
                                                        c = u;
                                                else
                                                    a = null,
                                                    c = u
                                            } else
                                                a = null,
                                                c = u;
                                        else
                                            a = null,
                                            c = u
                                    } else
                                        a = null,
                                        c = u;
                                else
                                    a = null,
                                    c = u
                            } else
                                a = null,
                                c = u;
                            a !== null && (a = function(a, b, c) {
                                a = {
                                    token: "expression",
                                    expressionType: "builtincall",
                                    builtincall: "langmatches"
                                };
                                a.args = [b, c];
                                return a
                            }(t, a[4], a[8]));
                            a === null && (c = t);
                            if (a === null) {
                                u = t = c;
                                e.substr(c, 8) === "DATATYPE" ? (a = "DATATYPE",
                                c += 8) : (a = null,
                                j === 0 && i('"DATATYPE"'));
                                a === null && (e.substr(c, 8) === "datatype" ? (a = "datatype",
                                c += 8) : (a = null,
                                j === 0 && i('"datatype"')));
                                if (a !== null) {
                                    b = [];
                                    for (d = l(); d !== null; )
                                        b.push(d),
                                        d = l();
                                    if (b !== null)
                                        if (e.charCodeAt(c) === 40 ? (d = "(",
                                        c++) : (d = null,
                                        j === 0 && i('"("')),
                                        d !== null) {
                                            f = [];
                                            for (h = l(); h !== null; )
                                                f.push(h),
                                                h = l();
                                            if (f !== null)
                                                if (h = J(),
                                                h !== null) {
                                                    g = [];
                                                    for (m = l(); m !== null; )
                                                        g.push(m),
                                                        m = l();
                                                    g !== null ? (e.charCodeAt(c) === 41 ? (m = ")",
                                                    c++) : (m = null,
                                                    j === 0 && i('")"')),
                                                    m !== null ? a = [a, b, d, f, h, g, m] : (a = null,
                                                    c = u)) : (a = null,
                                                    c = u)
                                                } else
                                                    a = null,
                                                    c = u;
                                            else
                                                a = null,
                                                c = u
                                        } else
                                            a = null,
                                            c = u;
                                    else
                                        a = null,
                                        c = u
                                } else
                                    a = null,
                                    c = u;
                                a !== null && (a = function(a, b) {
                                    var c = {
                                        token: "expression",
                                        expressionType: "builtincall",
                                        builtincall: "datatype"
                                    };
                                    c.args = [b];
                                    return c
                                }(t, a[4]));
                                a === null && (c = t);
                                if (a === null) {
                                    u = t = c;
                                    e.substr(c, 5) === "BOUND" ? (a = "BOUND",
                                    c += 5) : (a = null,
                                    j === 0 && i('"BOUND"'));
                                    a === null && (e.substr(c, 5) === "bound" ? (a = "bound",
                                    c += 5) : (a = null,
                                    j === 0 && i('"bound"')));
                                    if (a !== null) {
                                        b = [];
                                        for (d = l(); d !== null; )
                                            b.push(d),
                                            d = l();
                                        if (b !== null)
                                            if (e.charCodeAt(c) === 40 ? (d = "(",
                                            c++) : (d = null,
                                            j === 0 && i('"("')),
                                            d !== null) {
                                                f = [];
                                                for (h = l(); h !== null; )
                                                    f.push(h),
                                                    h = l();
                                                if (f !== null)
                                                    if (h = O(),
                                                    h !== null) {
                                                        g = [];
                                                        for (m = l(); m !== null; )
                                                            g.push(m),
                                                            m = l();
                                                        g !== null ? (e.charCodeAt(c) === 41 ? (m = ")",
                                                        c++) : (m = null,
                                                        j === 0 && i('")"')),
                                                        m !== null ? a = [a, b, d, f, h, g, m] : (a = null,
                                                        c = u)) : (a = null,
                                                        c = u)
                                                    } else
                                                        a = null,
                                                        c = u;
                                                else
                                                    a = null,
                                                    c = u
                                            } else
                                                a = null,
                                                c = u;
                                        else
                                            a = null,
                                            c = u
                                    } else
                                        a = null,
                                        c = u;
                                    a !== null && (a = function(a, b) {
                                        var c = {
                                            token: "expression",
                                            expressionType: "builtincall",
                                            builtincall: "bound"
                                        };
                                        c.args = [b];
                                        return c
                                    }(t, a[4]));
                                    a === null && (c = t);
                                    if (a === null) {
                                        u = t = c;
                                        e.substr(c, 3) === "IRI" ? (a = "IRI",
                                        c += 3) : (a = null,
                                        j === 0 && i('"IRI"'));
                                        a === null && (e.substr(c, 3) === "iri" ? (a = "iri",
                                        c += 3) : (a = null,
                                        j === 0 && i('"iri"')));
                                        if (a !== null) {
                                            b = [];
                                            for (d = l(); d !== null; )
                                                b.push(d),
                                                d = l();
                                            if (b !== null)
                                                if (e.charCodeAt(c) === 40 ? (d = "(",
                                                c++) : (d = null,
                                                j === 0 && i('"("')),
                                                d !== null) {
                                                    f = [];
                                                    for (h = l(); h !== null; )
                                                        f.push(h),
                                                        h = l();
                                                    if (f !== null)
                                                        if (h = J(),
                                                        h !== null) {
                                                            g = [];
                                                            for (m = l(); m !== null; )
                                                                g.push(m),
                                                                m = l();
                                                            g !== null ? (e.charCodeAt(c) === 41 ? (m = ")",
                                                            c++) : (m = null,
                                                            j === 0 && i('")"')),
                                                            m !== null ? a = [a, b, d, f, h, g, m] : (a = null,
                                                            c = u)) : (a = null,
                                                            c = u)
                                                        } else
                                                            a = null,
                                                            c = u;
                                                    else
                                                        a = null,
                                                        c = u
                                                } else
                                                    a = null,
                                                    c = u;
                                            else
                                                a = null,
                                                c = u
                                        } else
                                            a = null,
                                            c = u;
                                        a !== null && (a = function(a, b) {
                                            var c = {
                                                token: "expression",
                                                expressionType: "builtincall",
                                                builtincall: "iri"
                                            };
                                            c.args = [b];
                                            return c
                                        }(t, a[4]));
                                        a === null && (c = t);
                                        if (a === null) {
                                            u = t = c;
                                            e.substr(c, 3) === "URI" ? (a = "URI",
                                            c += 3) : (a = null,
                                            j === 0 && i('"URI"'));
                                            a === null && (e.substr(c, 3) === "uri" ? (a = "uri",
                                            c += 3) : (a = null,
                                            j === 0 && i('"uri"')));
                                            if (a !== null) {
                                                b = [];
                                                for (d = l(); d !== null; )
                                                    b.push(d),
                                                    d = l();
                                                if (b !== null)
                                                    if (e.charCodeAt(c) === 40 ? (d = "(",
                                                    c++) : (d = null,
                                                    j === 0 && i('"("')),
                                                    d !== null) {
                                                        f = [];
                                                        for (h = l(); h !== null; )
                                                            f.push(h),
                                                            h = l();
                                                        if (f !== null)
                                                            if (h = J(),
                                                            h !== null) {
                                                                g = [];
                                                                for (m = l(); m !== null; )
                                                                    g.push(m),
                                                                    m = l();
                                                                g !== null ? (e.charCodeAt(c) === 41 ? (m = ")",
                                                                c++) : (m = null,
                                                                j === 0 && i('")"')),
                                                                m !== null ? a = [a, b, d, f, h, g, m] : (a = null,
                                                                c = u)) : (a = null,
                                                                c = u)
                                                            } else
                                                                a = null,
                                                                c = u;
                                                        else
                                                            a = null,
                                                            c = u
                                                    } else
                                                        a = null,
                                                        c = u;
                                                else
                                                    a = null,
                                                    c = u
                                            } else
                                                a = null,
                                                c = u;
                                            a !== null && (a = function(a, b) {
                                                var c = {
                                                    token: "expression",
                                                    expressionType: "builtincall",
                                                    builtincall: "uri"
                                                };
                                                c.args = [b];
                                                return c
                                            }(t, a[4]));
                                            a === null && (c = t);
                                            if (a === null) {
                                                u = t = c;
                                                e.substr(c, 5) === "BNODE" ? (a = "BNODE",
                                                c += 5) : (a = null,
                                                j === 0 && i('"BNODE"'));
                                                a === null && (e.substr(c, 5) === "bnode" ? (a = "bnode",
                                                c += 5) : (a = null,
                                                j === 0 && i('"bnode"')));
                                                if (a !== null) {
                                                    b = [];
                                                    for (d = l(); d !== null; )
                                                        b.push(d),
                                                        d = l();
                                                    if (b !== null) {
                                                        o = c;
                                                        e.charCodeAt(c) === 40 ? (d = "(",
                                                        c++) : (d = null,
                                                        j === 0 && i('"("'));
                                                        if (d !== null) {
                                                            f = [];
                                                            for (h = l(); h !== null; )
                                                                f.push(h),
                                                                h = l();
                                                            if (f !== null)
                                                                if (h = J(),
                                                                h !== null) {
                                                                    g = [];
                                                                    for (m = l(); m !== null; )
                                                                        g.push(m),
                                                                        m = l();
                                                                    g !== null ? (e.charCodeAt(c) === 41 ? (m = ")",
                                                                    c++) : (m = null,
                                                                    j === 0 && i('")"')),
                                                                    m !== null ? d = [d, f, h, g, m] : (d = null,
                                                                    c = o)) : (d = null,
                                                                    c = o)
                                                                } else
                                                                    d = null,
                                                                    c = o;
                                                            else
                                                                d = null,
                                                                c = o
                                                        } else
                                                            d = null,
                                                            c = o;
                                                        d === null && (d = la());
                                                        d !== null ? a = [a, b, d] : (a = null,
                                                        c = u)
                                                    } else
                                                        a = null,
                                                        c = u
                                                } else
                                                    a = null,
                                                    c = u;
                                                a !== null && (a = function(a, b) {
                                                    var c = {
                                                        token: "expression",
                                                        expressionType: "builtincall",
                                                        builtincall: "bnode"
                                                    };
                                                    c.args = b.length === 5 ? [b[2]] : null;
                                                    return c
                                                }(t, a[2]));
                                                a === null && (c = t);
                                                if (a === null) {
                                                    u = t = c;
                                                    e.substr(c, 8) === "COALESCE" ? (a = "COALESCE",
                                                    c += 8) : (a = null,
                                                    j === 0 && i('"COALESCE"'));
                                                    a === null && (e.substr(c, 8) === "coalesce" ? (a = "coalesce",
                                                    c += 8) : (a = null,
                                                    j === 0 && i('"coalesce"')));
                                                    if (a !== null) {
                                                        b = [];
                                                        for (d = l(); d !== null; )
                                                            b.push(d),
                                                            d = l();
                                                        b !== null ? (d = qa(),
                                                        d !== null ? a = [a, b, d] : (a = null,
                                                        c = u)) : (a = null,
                                                        c = u)
                                                    } else
                                                        a = null,
                                                        c = u;
                                                    a !== null && (a = function(a, b) {
                                                        var c = {
                                                            token: "expression",
                                                            expressionType: "builtincall",
                                                            builtincall: "coalesce"
                                                        };
                                                        c.args = b;
                                                        return c
                                                    }(t, a[2]));
                                                    a === null && (c = t);
                                                    if (a === null) {
                                                        u = t = c;
                                                        e.substr(c, 2) === "IF" ? (a = "IF",
                                                        c += 2) : (a = null,
                                                        j === 0 && i('"IF"'));
                                                        a === null && (e.substr(c, 2) === "if" ? (a = "if",
                                                        c += 2) : (a = null,
                                                        j === 0 && i('"if"')));
                                                        if (a !== null) {
                                                            b = [];
                                                            for (d = l(); d !== null; )
                                                                b.push(d),
                                                                d = l();
                                                            if (b !== null)
                                                                if (e.charCodeAt(c) === 40 ? (d = "(",
                                                                c++) : (d = null,
                                                                j === 0 && i('"("')),
                                                                d !== null) {
                                                                    f = [];
                                                                    for (h = l(); h !== null; )
                                                                        f.push(h),
                                                                        h = l();
                                                                    if (f !== null)
                                                                        if (h = J(),
                                                                        h !== null) {
                                                                            g = [];
                                                                            for (m = l(); m !== null; )
                                                                                g.push(m),
                                                                                m = l();
                                                                            if (g !== null)
                                                                                if (e.charCodeAt(c) === 44 ? (m = ",",
                                                                                c++) : (m = null,
                                                                                j === 0 && i('","')),
                                                                                m !== null) {
                                                                                    n = [];
                                                                                    for (o = l(); o !== null; )
                                                                                        n.push(o),
                                                                                        o = l();
                                                                                    if (n !== null)
                                                                                        if (o = J(),
                                                                                        o !== null) {
                                                                                            q = [];
                                                                                            for (r = l(); r !== null; )
                                                                                                q.push(r),
                                                                                                r = l();
                                                                                            if (q !== null)
                                                                                                if (e.charCodeAt(c) === 44 ? (r = ",",
                                                                                                c++) : (r = null,
                                                                                                j === 0 && i('","')),
                                                                                                r !== null) {
                                                                                                    s = [];
                                                                                                    for (G = l(); G !== null; )
                                                                                                        s.push(G),
                                                                                                        G = l();
                                                                                                    if (s !== null)
                                                                                                        if (G = J(),
                                                                                                        G !== null) {
                                                                                                            v = [];
                                                                                                            for (B = l(); B !== null; )
                                                                                                                v.push(B),
                                                                                                                B = l();
                                                                                                            v !== null ? (e.charCodeAt(c) === 41 ? (B = ")",
                                                                                                            c++) : (B = null,
                                                                                                            j === 0 && i('")"')),
                                                                                                            B !== null ? a = [a, b, d, f, h, g, m, n, o, q, r, s, G, v, B] : (a = null,
                                                                                                            c = u)) : (a = null,
                                                                                                            c = u)
                                                                                                        } else
                                                                                                            a = null,
                                                                                                            c = u;
                                                                                                    else
                                                                                                        a = null,
                                                                                                        c = u
                                                                                                } else
                                                                                                    a = null,
                                                                                                    c = u;
                                                                                            else
                                                                                                a = null,
                                                                                                c = u
                                                                                        } else
                                                                                            a = null,
                                                                                            c = u;
                                                                                    else
                                                                                        a = null,
                                                                                        c = u
                                                                                } else
                                                                                    a = null,
                                                                                    c = u;
                                                                            else
                                                                                a = null,
                                                                                c = u
                                                                        } else
                                                                            a = null,
                                                                            c = u;
                                                                    else
                                                                        a = null,
                                                                        c = u
                                                                } else
                                                                    a = null,
                                                                    c = u;
                                                            else
                                                                a = null,
                                                                c = u
                                                        } else
                                                            a = null,
                                                            c = u;
                                                        a !== null && (a = function(a, b, c, e) {
                                                            a = {
                                                                token: "expression",
                                                                expressionType: "builtincall",
                                                                builtincall: "if"
                                                            };
                                                            a.args = [b, c, e];
                                                            return a
                                                        }(t, a[4], a[8], a[12]));
                                                        a === null && (c = t);
                                                        if (a === null) {
                                                            u = t = c;
                                                            e.substr(c, 9) === "ISLITERAL" ? (a = "ISLITERAL",
                                                            c += 9) : (a = null,
                                                            j === 0 && i('"ISLITERAL"'));
                                                            a === null && (e.substr(c, 9) === "isliteral" ? (a = "isliteral",
                                                            c += 9) : (a = null,
                                                            j === 0 && i('"isliteral"')));
                                                            if (a !== null) {
                                                                b = [];
                                                                for (d = l(); d !== null; )
                                                                    b.push(d),
                                                                    d = l();
                                                                if (b !== null)
                                                                    if (e.charCodeAt(c) === 40 ? (d = "(",
                                                                    c++) : (d = null,
                                                                    j === 0 && i('"("')),
                                                                    d !== null) {
                                                                        f = [];
                                                                        for (h = l(); h !== null; )
                                                                            f.push(h),
                                                                            h = l();
                                                                        if (f !== null)
                                                                            if (h = J(),
                                                                            h !== null) {
                                                                                g = [];
                                                                                for (m = l(); m !== null; )
                                                                                    g.push(m),
                                                                                    m = l();
                                                                                g !== null ? (e.charCodeAt(c) === 41 ? (m = ")",
                                                                                c++) : (m = null,
                                                                                j === 0 && i('")"')),
                                                                                m !== null ? a = [a, b, d, f, h, g, m] : (a = null,
                                                                                c = u)) : (a = null,
                                                                                c = u)
                                                                            } else
                                                                                a = null,
                                                                                c = u;
                                                                        else
                                                                            a = null,
                                                                            c = u
                                                                    } else
                                                                        a = null,
                                                                        c = u;
                                                                else
                                                                    a = null,
                                                                    c = u
                                                            } else
                                                                a = null,
                                                                c = u;
                                                            a !== null && (a = function(a, b) {
                                                                var c = {
                                                                    token: "expression",
                                                                    expressionType: "builtincall",
                                                                    builtincall: "isliteral"
                                                                };
                                                                c.args = [b];
                                                                return c
                                                            }(t, a[4]));
                                                            a === null && (c = t);
                                                            if (a === null) {
                                                                u = t = c;
                                                                e.substr(c, 7) === "ISBLANK" ? (a = "ISBLANK",
                                                                c += 7) : (a = null,
                                                                j === 0 && i('"ISBLANK"'));
                                                                a === null && (e.substr(c, 7) === "isblank" ? (a = "isblank",
                                                                c += 7) : (a = null,
                                                                j === 0 && i('"isblank"')));
                                                                if (a !== null) {
                                                                    b = [];
                                                                    for (d = l(); d !== null; )
                                                                        b.push(d),
                                                                        d = l();
                                                                    if (b !== null)
                                                                        if (e.charCodeAt(c) === 40 ? (d = "(",
                                                                        c++) : (d = null,
                                                                        j === 0 && i('"("')),
                                                                        d !== null) {
                                                                            f = [];
                                                                            for (h = l(); h !== null; )
                                                                                f.push(h),
                                                                                h = l();
                                                                            if (f !== null)
                                                                                if (h = J(),
                                                                                h !== null) {
                                                                                    g = [];
                                                                                    for (m = l(); m !== null; )
                                                                                        g.push(m),
                                                                                        m = l();
                                                                                    g !== null ? (e.charCodeAt(c) === 41 ? (m = ")",
                                                                                    c++) : (m = null,
                                                                                    j === 0 && i('")"')),
                                                                                    m !== null ? a = [a, b, d, f, h, g, m] : (a = null,
                                                                                    c = u)) : (a = null,
                                                                                    c = u)
                                                                                } else
                                                                                    a = null,
                                                                                    c = u;
                                                                            else
                                                                                a = null,
                                                                                c = u
                                                                        } else
                                                                            a = null,
                                                                            c = u;
                                                                    else
                                                                        a = null,
                                                                        c = u
                                                                } else
                                                                    a = null,
                                                                    c = u;
                                                                a !== null && (a = function(a, b) {
                                                                    var c = {
                                                                        token: "expression",
                                                                        expressionType: "builtincall",
                                                                        builtincall: "isblank"
                                                                    };
                                                                    c.args = [b];
                                                                    return c
                                                                }(t, a[4]));
                                                                a === null && (c = t);
                                                                if (a === null) {
                                                                    u = t = c;
                                                                    e.substr(c, 8) === "SAMETERM" ? (a = "SAMETERM",
                                                                    c += 8) : (a = null,
                                                                    j === 0 && i('"SAMETERM"'));
                                                                    a === null && (e.substr(c, 8) === "sameterm" ? (a = "sameterm",
                                                                    c += 8) : (a = null,
                                                                    j === 0 && i('"sameterm"')));
                                                                    if (a !== null) {
                                                                        b = [];
                                                                        for (d = l(); d !== null; )
                                                                            b.push(d),
                                                                            d = l();
                                                                        if (b !== null)
                                                                            if (e.charCodeAt(c) === 40 ? (d = "(",
                                                                            c++) : (d = null,
                                                                            j === 0 && i('"("')),
                                                                            d !== null) {
                                                                                f = [];
                                                                                for (h = l(); h !== null; )
                                                                                    f.push(h),
                                                                                    h = l();
                                                                                if (f !== null)
                                                                                    if (h = J(),
                                                                                    h !== null) {
                                                                                        g = [];
                                                                                        for (m = l(); m !== null; )
                                                                                            g.push(m),
                                                                                            m = l();
                                                                                        if (g !== null)
                                                                                            if (e.charCodeAt(c) === 44 ? (m = ",",
                                                                                            c++) : (m = null,
                                                                                            j === 0 && i('","')),
                                                                                            m !== null) {
                                                                                                n = [];
                                                                                                for (o = l(); o !== null; )
                                                                                                    n.push(o),
                                                                                                    o = l();
                                                                                                if (n !== null)
                                                                                                    if (o = J(),
                                                                                                    o !== null) {
                                                                                                        q = [];
                                                                                                        for (r = l(); r !== null; )
                                                                                                            q.push(r),
                                                                                                            r = l();
                                                                                                        q !== null ? (e.charCodeAt(c) === 41 ? (r = ")",
                                                                                                        c++) : (r = null,
                                                                                                        j === 0 && i('")"')),
                                                                                                        r !== null ? a = [a, b, d, f, h, g, m, n, o, q, r] : (a = null,
                                                                                                        c = u)) : (a = null,
                                                                                                        c = u)
                                                                                                    } else
                                                                                                        a = null,
                                                                                                        c = u;
                                                                                                else
                                                                                                    a = null,
                                                                                                    c = u
                                                                                            } else
                                                                                                a = null,
                                                                                                c = u;
                                                                                        else
                                                                                            a = null,
                                                                                            c = u
                                                                                    } else
                                                                                        a = null,
                                                                                        c = u;
                                                                                else
                                                                                    a = null,
                                                                                    c = u
                                                                            } else
                                                                                a = null,
                                                                                c = u;
                                                                        else
                                                                            a = null,
                                                                            c = u
                                                                    } else
                                                                        a = null,
                                                                        c = u;
                                                                    a !== null && (a = function(a, b, c) {
                                                                        a = {
                                                                            token: "expression",
                                                                            expressionType: "builtincall",
                                                                            builtincall: "sameterm"
                                                                        };
                                                                        a.args = [b, c];
                                                                        return a
                                                                    }(t, a[4], a[8]));
                                                                    a === null && (c = t);
                                                                    if (a === null) {
                                                                        u = t = c;
                                                                        e.substr(c, 5) === "ISURI" ? (a = "ISURI",
                                                                        c += 5) : (a = null,
                                                                        j === 0 && i('"ISURI"'));
                                                                        a === null && (e.substr(c, 5) === "isuri" ? (a = "isuri",
                                                                        c += 5) : (a = null,
                                                                        j === 0 && i('"isuri"')),
                                                                        a === null && (e.substr(c, 5) === "ISIRI" ? (a = "ISIRI",
                                                                        c += 5) : (a = null,
                                                                        j === 0 && i('"ISIRI"')),
                                                                        a === null && (e.substr(c, 5) === "isiri" ? (a = "isiri",
                                                                        c += 5) : (a = null,
                                                                        j === 0 && i('"isiri"')))));
                                                                        if (a !== null) {
                                                                            b = [];
                                                                            for (d = l(); d !== null; )
                                                                                b.push(d),
                                                                                d = l();
                                                                            if (b !== null)
                                                                                if (e.charCodeAt(c) === 40 ? (d = "(",
                                                                                c++) : (d = null,
                                                                                j === 0 && i('"("')),
                                                                                d !== null) {
                                                                                    f = [];
                                                                                    for (h = l(); h !== null; )
                                                                                        f.push(h),
                                                                                        h = l();
                                                                                    if (f !== null)
                                                                                        if (h = J(),
                                                                                        h !== null) {
                                                                                            g = [];
                                                                                            for (m = l(); m !== null; )
                                                                                                g.push(m),
                                                                                                m = l();
                                                                                            g !== null ? (e.charCodeAt(c) === 41 ? (m = ")",
                                                                                            c++) : (m = null,
                                                                                            j === 0 && i('")"')),
                                                                                            m !== null ? a = [a, b, d, f, h, g, m] : (a = null,
                                                                                            c = u)) : (a = null,
                                                                                            c = u)
                                                                                        } else
                                                                                            a = null,
                                                                                            c = u;
                                                                                    else
                                                                                        a = null,
                                                                                        c = u
                                                                                } else
                                                                                    a = null,
                                                                                    c = u;
                                                                            else
                                                                                a = null,
                                                                                c = u
                                                                        } else
                                                                            a = null,
                                                                            c = u;
                                                                        a !== null && (a = function(a, b) {
                                                                            var c = {
                                                                                token: "expression",
                                                                                expressionType: "builtincall",
                                                                                builtincall: "isuri"
                                                                            };
                                                                            c.args = [b];
                                                                            return c
                                                                        }(t, a[4]));
                                                                        a === null && (c = t);
                                                                        if (a === null) {
                                                                            u = t = c;
                                                                            e.substr(c, 7) === "custom:" ? (a = "custom:",
                                                                            c += 7) : (a = null,
                                                                            j === 0 && i('"custom:"'));
                                                                            a === null && (e.substr(c, 7) === "CUSTOM:" ? (a = "CUSTOM:",
                                                                            c += 7) : (a = null,
                                                                            j === 0 && i('"CUSTOM:"')));
                                                                            if (a !== null) {
                                                                                /^[a-zA-Z0-9_]/.test(e.charAt(c)) ? (d = e.charAt(c),
                                                                                c++) : (d = null,
                                                                                j === 0 && i("[a-zA-Z0-9_]"));
                                                                                if (d !== null)
                                                                                    for (b = []; d !== null; )
                                                                                        b.push(d),
                                                                                        /^[a-zA-Z0-9_]/.test(e.charAt(c)) ? (d = e.charAt(c),
                                                                                        c++) : (d = null,
                                                                                        j === 0 && i("[a-zA-Z0-9_]"));
                                                                                else
                                                                                    b = null;
                                                                                if (b !== null) {
                                                                                    d = [];
                                                                                    for (f = l(); f !== null; )
                                                                                        d.push(f),
                                                                                        f = l();
                                                                                    if (d !== null)
                                                                                        if (e.charCodeAt(c) === 40 ? (f = "(",
                                                                                        c++) : (f = null,
                                                                                        j === 0 && i('"("')),
                                                                                        f !== null) {
                                                                                            h = [];
                                                                                            o = c;
                                                                                            g = [];
                                                                                            for (m = l(); m !== null; )
                                                                                                g.push(m),
                                                                                                m = l();
                                                                                            g !== null ? (m = J(),
                                                                                            m !== null ? (e.charCodeAt(c) === 44 ? (n = ",",
                                                                                            c++) : (n = null,
                                                                                            j === 0 && i('","')),
                                                                                            n !== null ? g = [g, m, n] : (g = null,
                                                                                            c = o)) : (g = null,
                                                                                            c = o)) : (g = null,
                                                                                            c = o);
                                                                                            for (; g !== null; ) {
                                                                                                h.push(g);
                                                                                                o = c;
                                                                                                g = [];
                                                                                                for (m = l(); m !== null; )
                                                                                                    g.push(m),
                                                                                                    m = l();
                                                                                                g !== null ? (m = J(),
                                                                                                m !== null ? (e.charCodeAt(c) === 44 ? (n = ",",
                                                                                                c++) : (n = null,
                                                                                                j === 0 && i('","')),
                                                                                                n !== null ? g = [g, m, n] : (g = null,
                                                                                                c = o)) : (g = null,
                                                                                                c = o)) : (g = null,
                                                                                                c = o)
                                                                                            }
                                                                                            if (h !== null) {
                                                                                                g = [];
                                                                                                for (m = l(); m !== null; )
                                                                                                    g.push(m),
                                                                                                    m = l();
                                                                                                if (g !== null)
                                                                                                    if (m = J(),
                                                                                                    m !== null) {
                                                                                                        n = [];
                                                                                                        for (o = l(); o !== null; )
                                                                                                            n.push(o),
                                                                                                            o = l();
                                                                                                        n !== null ? (e.charCodeAt(c) === 41 ? (o = ")",
                                                                                                        c++) : (o = null,
                                                                                                        j === 0 && i('")"')),
                                                                                                        o !== null ? a = [a, b, d, f, h, g, m, n, o] : (a = null,
                                                                                                        c = u)) : (a = null,
                                                                                                        c = u)
                                                                                                    } else
                                                                                                        a = null,
                                                                                                        c = u;
                                                                                                else
                                                                                                    a = null,
                                                                                                    c = u
                                                                                            } else
                                                                                                a = null,
                                                                                                c = u
                                                                                        } else
                                                                                            a = null,
                                                                                            c = u;
                                                                                    else
                                                                                        a = null,
                                                                                        c = u
                                                                                } else
                                                                                    a = null,
                                                                                    c = u
                                                                            } else
                                                                                a = null,
                                                                                c = u;
                                                                            a !== null && (a = function(a, b, c, e) {
                                                                                a = {
                                                                                    token: "expression",
                                                                                    expressionType: "custom"
                                                                                };
                                                                                a.name = b.join("");
                                                                                for (var b = [], d = 0; d < c.length; d++)
                                                                                    b.push(c[d][1]);
                                                                                b.push(e);
                                                                                a.args = b;
                                                                                return a
                                                                            }(t, a[1], a[4], a[6]));
                                                                            a === null && (c = t);
                                                                            a === null && (a = Tb(),
                                                                            a === null && (a = Ub(),
                                                                            a === null && (a = Vb())))
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    j--;
                    j === 0 && a === null && i("[106] BuiltInCall");
                    return a
                }
                function Tb() {
                    var a, b, d, f, h, g, m, n, o, q, r, s, t, v, B, x;
                    j++;
                    B = v = c;
                    e.substr(c, 5) === "REGEX" ? (a = "REGEX",
                    c += 5) : (a = null,
                    j === 0 && i('"REGEX"'));
                    a === null && (e.substr(c, 5) === "regex" ? (a = "regex",
                    c += 5) : (a = null,
                    j === 0 && i('"regex"')));
                    if (a !== null) {
                        b = [];
                        for (d = l(); d !== null; )
                            b.push(d),
                            d = l();
                        if (b !== null)
                            if (e.charCodeAt(c) === 40 ? (d = "(",
                            c++) : (d = null,
                            j === 0 && i('"("')),
                            d !== null) {
                                f = [];
                                for (h = l(); h !== null; )
                                    f.push(h),
                                    h = l();
                                if (f !== null)
                                    if (h = J(),
                                    h !== null) {
                                        g = [];
                                        for (m = l(); m !== null; )
                                            g.push(m),
                                            m = l();
                                        if (g !== null)
                                            if (e.charCodeAt(c) === 44 ? (m = ",",
                                            c++) : (m = null,
                                            j === 0 && i('","')),
                                            m !== null) {
                                                n = [];
                                                for (o = l(); o !== null; )
                                                    n.push(o),
                                                    o = l();
                                                if (n !== null)
                                                    if (o = J(),
                                                    o !== null) {
                                                        q = [];
                                                        for (r = l(); r !== null; )
                                                            q.push(r),
                                                            r = l();
                                                        if (q !== null) {
                                                            x = c;
                                                            e.charCodeAt(c) === 44 ? (r = ",",
                                                            c++) : (r = null,
                                                            j === 0 && i('","'));
                                                            if (r !== null) {
                                                                s = [];
                                                                for (t = l(); t !== null; )
                                                                    s.push(t),
                                                                    t = l();
                                                                s !== null ? (t = J(),
                                                                t !== null ? r = [r, s, t] : (r = null,
                                                                c = x)) : (r = null,
                                                                c = x)
                                                            } else
                                                                r = null,
                                                                c = x;
                                                            r = r !== null ? r : "";
                                                            if (r !== null) {
                                                                s = [];
                                                                for (t = l(); t !== null; )
                                                                    s.push(t),
                                                                    t = l();
                                                                s !== null ? (e.charCodeAt(c) === 41 ? (t = ")",
                                                                c++) : (t = null,
                                                                j === 0 && i('")"')),
                                                                t !== null ? a = [a, b, d, f, h, g, m, n, o, q, r, s, t] : (a = null,
                                                                c = B)) : (a = null,
                                                                c = B)
                                                            } else
                                                                a = null,
                                                                c = B
                                                        } else
                                                            a = null,
                                                            c = B
                                                    } else
                                                        a = null,
                                                        c = B;
                                                else
                                                    a = null,
                                                    c = B
                                            } else
                                                a = null,
                                                c = B;
                                        else
                                            a = null,
                                            c = B
                                    } else
                                        a = null,
                                        c = B;
                                else
                                    a = null,
                                    c = B
                            } else
                                a = null,
                                c = B;
                        else
                            a = null,
                            c = B
                    } else
                        a = null,
                        c = B;
                    a !== null && (a = function(a, b, c, e) {
                        a = {
                            token: "expression",
                            expressionType: "regex"
                        };
                        a.text = b;
                        a.pattern = c;
                        a.flags = e[2];
                        return a
                    }(v, a[4], a[8], a[10]));
                    a === null && (c = v);
                    j--;
                    j === 0 && a === null && i("[107] RegexExpression");
                    return a
                }
                function Ub() {
                    var a, b, d, f, h;
                    j++;
                    h = f = c;
                    e.substr(c, 6) === "EXISTS" ? (a = "EXISTS",
                    c += 6) : (a = null,
                    j === 0 && i('"EXISTS"'));
                    a === null && (e.substr(c, 6) === "exists" ? (a = "exists",
                    c += 6) : (a = null,
                    j === 0 && i('"exists"')));
                    if (a !== null) {
                        b = [];
                        for (d = l(); d !== null; )
                            b.push(d),
                            d = l();
                        b !== null ? (d = T(),
                        d !== null ? a = [a, b, d] : (a = null,
                        c = h)) : (a = null,
                        c = h)
                    } else
                        a = null,
                        c = h;
                    a !== null && (a = function(a, b) {
                        var c = {
                            token: "expression",
                            expressionType: "builtincall",
                            builtincall: "exists"
                        };
                        c.args = [b];
                        return c
                    }(f, a[2]));
                    a === null && (c = f);
                    j--;
                    j === 0 && a === null && i("[108] ExistsFunc");
                    return a
                }
                function Vb() {
                    var a, b, d, f, h, g, m;
                    j++;
                    m = g = c;
                    e.substr(c, 3) === "NOT" ? (a = "NOT",
                    c += 3) : (a = null,
                    j === 0 && i('"NOT"'));
                    a === null && (e.substr(c, 3) === "not" ? (a = "not",
                    c += 3) : (a = null,
                    j === 0 && i('"not"')));
                    if (a !== null) {
                        b = [];
                        for (d = l(); d !== null; )
                            b.push(d),
                            d = l();
                        if (b !== null)
                            if (e.substr(c, 6) === "EXISTS" ? (d = "EXISTS",
                            c += 6) : (d = null,
                            j === 0 && i('"EXISTS"')),
                            d === null && (e.substr(c, 6) === "exists" ? (d = "exists",
                            c += 6) : (d = null,
                            j === 0 && i('"exists"'))),
                            d !== null) {
                                f = [];
                                for (h = l(); h !== null; )
                                    f.push(h),
                                    h = l();
                                f !== null ? (h = T(),
                                h !== null ? a = [a, b, d, f, h] : (a = null,
                                c = m)) : (a = null,
                                c = m)
                            } else
                                a = null,
                                c = m;
                        else
                            a = null,
                            c = m
                    } else
                        a = null,
                        c = m;
                    a !== null && (a = function(a, b) {
                        var c = {
                            token: "expression",
                            expressionType: "builtincall",
                            builtincall: "notexists"
                        };
                        c.args = [b];
                        return c
                    }(g, a[4]));
                    a === null && (c = g);
                    j--;
                    j === 0 && a === null && i("[109] NotExistsFunc");
                    return a
                }
                function Sb() {
                    var a, b, d, f, h, g, m, n, o, q, r, s, t;
                    j++;
                    t = s = c;
                    e.substr(c, 5) === "COUNT" ? (a = "COUNT",
                    c += 5) : (a = null,
                    j === 0 && i('"COUNT"'));
                    a === null && (e.substr(c, 5) === "count" ? (a = "count",
                    c += 5) : (a = null,
                    j === 0 && i('"count"')));
                    if (a !== null) {
                        b = [];
                        for (d = l(); d !== null; )
                            b.push(d),
                            d = l();
                        if (b !== null)
                            if (e.charCodeAt(c) === 40 ? (d = "(",
                            c++) : (d = null,
                            j === 0 && i('"("')),
                            d !== null) {
                                f = [];
                                for (h = l(); h !== null; )
                                    f.push(h),
                                    h = l();
                                if (f !== null)
                                    if (e.substr(c, 8) === "DISTINCT" ? (h = "DISTINCT",
                                    c += 8) : (h = null,
                                    j === 0 && i('"DISTINCT"')),
                                    h === null && (e.substr(c, 8) === "distinct" ? (h = "distinct",
                                    c += 8) : (h = null,
                                    j === 0 && i('"distinct"'))),
                                    h = h !== null ? h : "",
                                    h !== null) {
                                        g = [];
                                        for (m = l(); m !== null; )
                                            g.push(m),
                                            m = l();
                                        if (g !== null)
                                            if (e.charCodeAt(c) === 42 ? (m = "*",
                                            c++) : (m = null,
                                            j === 0 && i('"*"')),
                                            m === null && (m = J()),
                                            m !== null) {
                                                n = [];
                                                for (o = l(); o !== null; )
                                                    n.push(o),
                                                    o = l();
                                                if (n !== null)
                                                    if (e.charCodeAt(c) === 41 ? (o = ")",
                                                    c++) : (o = null,
                                                    j === 0 && i('")"')),
                                                    o !== null) {
                                                        q = [];
                                                        for (r = l(); r !== null; )
                                                            q.push(r),
                                                            r = l();
                                                        q !== null ? a = [a, b, d, f, h, g, m, n, o, q] : (a = null,
                                                        c = t)
                                                    } else
                                                        a = null,
                                                        c = t;
                                                else
                                                    a = null,
                                                    c = t
                                            } else
                                                a = null,
                                                c = t;
                                        else
                                            a = null,
                                            c = t
                                    } else
                                        a = null,
                                        c = t;
                                else
                                    a = null,
                                    c = t
                            } else
                                a = null,
                                c = t;
                        else
                            a = null,
                            c = t
                    } else
                        a = null,
                        c = t;
                    a !== null && (a = function(a, b, c) {
                        a = {
                            token: "expression",
                            expressionType: "aggregate",
                            aggregateType: "count"
                        };
                        a.distinct = b != "" ? "DISTINCT" : b;
                        a.expression = c;
                        return a
                    }(s, a[4], a[6]));
                    a === null && (c = s);
                    if (a === null) {
                        t = s = c;
                        e.substr(c, 3) === "SUM" ? (a = "SUM",
                        c += 3) : (a = null,
                        j === 0 && i('"SUM"'));
                        a === null && (e.substr(c, 3) === "sum" ? (a = "sum",
                        c += 3) : (a = null,
                        j === 0 && i('"sum"')));
                        if (a !== null) {
                            b = [];
                            for (d = l(); d !== null; )
                                b.push(d),
                                d = l();
                            if (b !== null)
                                if (e.charCodeAt(c) === 40 ? (d = "(",
                                c++) : (d = null,
                                j === 0 && i('"("')),
                                d !== null) {
                                    f = [];
                                    for (h = l(); h !== null; )
                                        f.push(h),
                                        h = l();
                                    if (f !== null)
                                        if (e.substr(c, 8) === "DISTINCT" ? (h = "DISTINCT",
                                        c += 8) : (h = null,
                                        j === 0 && i('"DISTINCT"')),
                                        h === null && (e.substr(c, 8) === "distinct" ? (h = "distinct",
                                        c += 8) : (h = null,
                                        j === 0 && i('"distinct"'))),
                                        h = h !== null ? h : "",
                                        h !== null) {
                                            g = [];
                                            for (m = l(); m !== null; )
                                                g.push(m),
                                                m = l();
                                            if (g !== null)
                                                if (m = J(),
                                                m !== null) {
                                                    n = [];
                                                    for (o = l(); o !== null; )
                                                        n.push(o),
                                                        o = l();
                                                    if (n !== null)
                                                        if (e.charCodeAt(c) === 41 ? (o = ")",
                                                        c++) : (o = null,
                                                        j === 0 && i('")"')),
                                                        o !== null) {
                                                            q = [];
                                                            for (r = l(); r !== null; )
                                                                q.push(r),
                                                                r = l();
                                                            q !== null ? a = [a, b, d, f, h, g, m, n, o, q] : (a = null,
                                                            c = t)
                                                        } else
                                                            a = null,
                                                            c = t;
                                                    else
                                                        a = null,
                                                        c = t
                                                } else
                                                    a = null,
                                                    c = t;
                                            else
                                                a = null,
                                                c = t
                                        } else
                                            a = null,
                                            c = t;
                                    else
                                        a = null,
                                        c = t
                                } else
                                    a = null,
                                    c = t;
                            else
                                a = null,
                                c = t
                        } else
                            a = null,
                            c = t;
                        a !== null && (a = function(a, b, c) {
                            a = {
                                token: "expression",
                                expressionType: "aggregate",
                                aggregateType: "sum"
                            };
                            a.distinct = b != "" ? "DISTINCT" : b;
                            a.expression = c;
                            return a
                        }(s, a[4], a[6]));
                        a === null && (c = s);
                        if (a === null) {
                            t = s = c;
                            e.substr(c, 3) === "MIN" ? (a = "MIN",
                            c += 3) : (a = null,
                            j === 0 && i('"MIN"'));
                            a === null && (e.substr(c, 3) === "min" ? (a = "min",
                            c += 3) : (a = null,
                            j === 0 && i('"min"')));
                            if (a !== null) {
                                b = [];
                                for (d = l(); d !== null; )
                                    b.push(d),
                                    d = l();
                                if (b !== null)
                                    if (e.charCodeAt(c) === 40 ? (d = "(",
                                    c++) : (d = null,
                                    j === 0 && i('"("')),
                                    d !== null) {
                                        f = [];
                                        for (h = l(); h !== null; )
                                            f.push(h),
                                            h = l();
                                        if (f !== null)
                                            if (e.substr(c, 8) === "DISTINCT" ? (h = "DISTINCT",
                                            c += 8) : (h = null,
                                            j === 0 && i('"DISTINCT"')),
                                            h === null && (e.substr(c, 8) === "distinct" ? (h = "distinct",
                                            c += 8) : (h = null,
                                            j === 0 && i('"distinct"'))),
                                            h = h !== null ? h : "",
                                            h !== null) {
                                                g = [];
                                                for (m = l(); m !== null; )
                                                    g.push(m),
                                                    m = l();
                                                if (g !== null)
                                                    if (m = J(),
                                                    m !== null) {
                                                        n = [];
                                                        for (o = l(); o !== null; )
                                                            n.push(o),
                                                            o = l();
                                                        if (n !== null)
                                                            if (e.charCodeAt(c) === 41 ? (o = ")",
                                                            c++) : (o = null,
                                                            j === 0 && i('")"')),
                                                            o !== null) {
                                                                q = [];
                                                                for (r = l(); r !== null; )
                                                                    q.push(r),
                                                                    r = l();
                                                                q !== null ? a = [a, b, d, f, h, g, m, n, o, q] : (a = null,
                                                                c = t)
                                                            } else
                                                                a = null,
                                                                c = t;
                                                        else
                                                            a = null,
                                                            c = t
                                                    } else
                                                        a = null,
                                                        c = t;
                                                else
                                                    a = null,
                                                    c = t
                                            } else
                                                a = null,
                                                c = t;
                                        else
                                            a = null,
                                            c = t
                                    } else
                                        a = null,
                                        c = t;
                                else
                                    a = null,
                                    c = t
                            } else
                                a = null,
                                c = t;
                            a !== null && (a = function(a, b, c) {
                                a = {
                                    token: "expression",
                                    expressionType: "aggregate",
                                    aggregateType: "min"
                                };
                                a.distinct = b != "" ? "DISTINCT" : b;
                                a.expression = c;
                                return a
                            }(s, a[4], a[6]));
                            a === null && (c = s);
                            if (a === null) {
                                t = s = c;
                                e.substr(c, 3) === "MAX" ? (a = "MAX",
                                c += 3) : (a = null,
                                j === 0 && i('"MAX"'));
                                a === null && (e.substr(c, 3) === "max" ? (a = "max",
                                c += 3) : (a = null,
                                j === 0 && i('"max"')));
                                if (a !== null) {
                                    b = [];
                                    for (d = l(); d !== null; )
                                        b.push(d),
                                        d = l();
                                    if (b !== null)
                                        if (e.charCodeAt(c) === 40 ? (d = "(",
                                        c++) : (d = null,
                                        j === 0 && i('"("')),
                                        d !== null) {
                                            f = [];
                                            for (h = l(); h !== null; )
                                                f.push(h),
                                                h = l();
                                            if (f !== null)
                                                if (e.substr(c, 8) === "DISTINCT" ? (h = "DISTINCT",
                                                c += 8) : (h = null,
                                                j === 0 && i('"DISTINCT"')),
                                                h === null && (e.substr(c, 8) === "distinct" ? (h = "distinct",
                                                c += 8) : (h = null,
                                                j === 0 && i('"distinct"'))),
                                                h = h !== null ? h : "",
                                                h !== null) {
                                                    g = [];
                                                    for (m = l(); m !== null; )
                                                        g.push(m),
                                                        m = l();
                                                    if (g !== null)
                                                        if (m = J(),
                                                        m !== null) {
                                                            n = [];
                                                            for (o = l(); o !== null; )
                                                                n.push(o),
                                                                o = l();
                                                            if (n !== null)
                                                                if (e.charCodeAt(c) === 41 ? (o = ")",
                                                                c++) : (o = null,
                                                                j === 0 && i('")"')),
                                                                o !== null) {
                                                                    q = [];
                                                                    for (r = l(); r !== null; )
                                                                        q.push(r),
                                                                        r = l();
                                                                    q !== null ? a = [a, b, d, f, h, g, m, n, o, q] : (a = null,
                                                                    c = t)
                                                                } else
                                                                    a = null,
                                                                    c = t;
                                                            else
                                                                a = null,
                                                                c = t
                                                        } else
                                                            a = null,
                                                            c = t;
                                                    else
                                                        a = null,
                                                        c = t
                                                } else
                                                    a = null,
                                                    c = t;
                                            else
                                                a = null,
                                                c = t
                                        } else
                                            a = null,
                                            c = t;
                                    else
                                        a = null,
                                        c = t
                                } else
                                    a = null,
                                    c = t;
                                a !== null && (a = function(a, b, c) {
                                    a = {
                                        token: "expression",
                                        expressionType: "aggregate",
                                        aggregateType: "max"
                                    };
                                    a.distinct = b != "" ? "DISTINCT" : b;
                                    a.expression = c;
                                    return a
                                }(s, a[4], a[6]));
                                a === null && (c = s);
                                if (a === null) {
                                    t = s = c;
                                    e.substr(c, 3) === "AVG" ? (a = "AVG",
                                    c += 3) : (a = null,
                                    j === 0 && i('"AVG"'));
                                    a === null && (e.substr(c, 3) === "avg" ? (a = "avg",
                                    c += 3) : (a = null,
                                    j === 0 && i('"avg"')));
                                    if (a !== null) {
                                        b = [];
                                        for (d = l(); d !== null; )
                                            b.push(d),
                                            d = l();
                                        if (b !== null)
                                            if (e.charCodeAt(c) === 40 ? (d = "(",
                                            c++) : (d = null,
                                            j === 0 && i('"("')),
                                            d !== null) {
                                                f = [];
                                                for (h = l(); h !== null; )
                                                    f.push(h),
                                                    h = l();
                                                if (f !== null)
                                                    if (e.substr(c, 8) === "DISTINCT" ? (h = "DISTINCT",
                                                    c += 8) : (h = null,
                                                    j === 0 && i('"DISTINCT"')),
                                                    h === null && (e.substr(c, 8) === "distinct" ? (h = "distinct",
                                                    c += 8) : (h = null,
                                                    j === 0 && i('"distinct"'))),
                                                    h = h !== null ? h : "",
                                                    h !== null) {
                                                        g = [];
                                                        for (m = l(); m !== null; )
                                                            g.push(m),
                                                            m = l();
                                                        if (g !== null)
                                                            if (m = J(),
                                                            m !== null) {
                                                                n = [];
                                                                for (o = l(); o !== null; )
                                                                    n.push(o),
                                                                    o = l();
                                                                if (n !== null)
                                                                    if (e.charCodeAt(c) === 41 ? (o = ")",
                                                                    c++) : (o = null,
                                                                    j === 0 && i('")"')),
                                                                    o !== null) {
                                                                        q = [];
                                                                        for (r = l(); r !== null; )
                                                                            q.push(r),
                                                                            r = l();
                                                                        q !== null ? a = [a, b, d, f, h, g, m, n, o, q] : (a = null,
                                                                        c = t)
                                                                    } else
                                                                        a = null,
                                                                        c = t;
                                                                else
                                                                    a = null,
                                                                    c = t
                                                            } else
                                                                a = null,
                                                                c = t;
                                                        else
                                                            a = null,
                                                            c = t
                                                    } else
                                                        a = null,
                                                        c = t;
                                                else
                                                    a = null,
                                                    c = t
                                            } else
                                                a = null,
                                                c = t;
                                        else
                                            a = null,
                                            c = t
                                    } else
                                        a = null,
                                        c = t;
                                    a !== null && (a = function(a, b, c) {
                                        a = {
                                            token: "expression",
                                            expressionType: "aggregate",
                                            aggregateType: "avg"
                                        };
                                        a.distinct = b != "" ? "DISTINCT" : b;
                                        a.expression = c;
                                        return a
                                    }(s, a[4], a[6]));
                                    a === null && (c = s)
                                }
                            }
                        }
                    }
                    j--;
                    j === 0 && a === null && i("[110] Aggregate");
                    return a
                }
                function Rb() {
                    var a, b, e, d;
                    j++;
                    d = e = c;
                    a = P();
                    a !== null ? (b = nb(),
                    b = b !== null ? b : "",
                    b !== null ? a = [a, b] : (a = null,
                    c = d)) : (a = null,
                    c = d);
                    a !== null && (a = function(a, b, c) {
                        a = {
                            token: "expression",
                            expressionType: "irireforfunction"
                        };
                        a.iriref = b;
                        a.args = c.value;
                        return a
                    }(e, a[0], a[1]));
                    a === null && (c = e);
                    j--;
                    j === 0 && a === null && i("[117] IRIrefOrFunction");
                    return a
                }
                function Ma() {
                    var a, b, d, f, h, g;
                    j++;
                    h = f = c;
                    a = Wb();
                    a !== null ? (b = Xb(),
                    b === null && (g = c,
                    e.substr(c, 2) === "^^" ? (b = "^^",
                    c += 2) : (b = null,
                    j === 0 && i('"^^"')),
                    b !== null ? (d = P(),
                    d !== null ? b = [b, d] : (b = null,
                    c = g)) : (b = null,
                    c = g)),
                    b = b !== null ? b : "",
                    b !== null ? a = [a, b] : (a = null,
                    c = h)) : (a = null,
                    c = h);
                    a !== null && (a = function(a, b, c) {
                        return typeof c === "string" && c.length > 0 ? {
                            token: "literal",
                            value: b.value,
                            lang: c.slice(1),
                            type: null
                        } : typeof c === "object" ? (c.shift(),
                        {
                            token: "literal",
                            value: b.value,
                            lang: null,
                            type: c[0]
                        }) : {
                            token: "literal",
                            value: b.value,
                            lang: null,
                            type: null
                        }
                    }(f, a[0], a[1]));
                    a === null && (c = f);
                    j--;
                    j === 0 && a === null && i("[112] RDFLiteral");
                    return a
                }
                function Na() {
                    var a;
                    j++;
                    a = Yb();
                    a === null && (a = Zb(),
                    a === null && (a = ta()));
                    j--;
                    j === 0 && a === null && i("[113] NumericLiteral");
                    return a
                }
                function Yb() {
                    var a;
                    j++;
                    a = Xa();
                    a === null && (a = Ya(),
                    a === null && (a = ca()));
                    j--;
                    j === 0 && a === null && i("[114] NumericLiteralUnsigned");
                    return a
                }
                function Zb() {
                    var a;
                    j++;
                    a = $b();
                    a === null && (a = ac(),
                    a === null && (a = bc()));
                    j--;
                    j === 0 && a === null && i("[115] NumericLiteralPositive");
                    return a
                }
                function ta() {
                    var a;
                    j++;
                    a = cc();
                    a === null && (a = dc(),
                    a === null && (a = ec()));
                    j--;
                    j === 0 && a === null && i("[116] NumericLiteralNegative");
                    return a
                }
                function Oa() {
                    var a, b;
                    j++;
                    b = c;
                    e.substr(c, 4) === "TRUE" ? (a = "TRUE",
                    c += 4) : (a = null,
                    j === 0 && i('"TRUE"'));
                    a === null && (e.substr(c, 4) === "true" ? (a = "true",
                    c += 4) : (a = null,
                    j === 0 && i('"true"')));
                    a !== null && (a = {
                        token: "literal",
                        lang: null,
                        type: "http://www.w3.org/2001/XMLSchema#boolean",
                        value: !0
                    });
                    a === null && (c = b);
                    a === null && (b = c,
                    e.substr(c, 5) === "FALSE" ? (a = "FALSE",
                    c += 5) : (a = null,
                    j === 0 && i('"FALSE"')),
                    a === null && (e.substr(c, 5) === "false" ? (a = "false",
                    c += 5) : (a = null,
                    j === 0 && i('"false"'))),
                    a !== null && (a = {
                        token: "literal",
                        lang: null,
                        type: "http://www.w3.org/2001/XMLSchema#boolean",
                        value: !1
                    }),
                    a === null && (c = b));
                    j--;
                    j === 0 && a === null && i("[117] BooleanLiteral");
                    return a
                }
                function Wb() {
                    var a, b;
                    j++;
                    b = c;
                    a = fc();
                    a !== null && (a = {
                        token: "string",
                        value: a
                    });
                    a === null && (c = b);
                    a === null && (b = c,
                    a = gc(),
                    a !== null && (a = {
                        token: "string",
                        value: a
                    }),
                    a === null && (c = b),
                    a === null && (b = c,
                    a = hc(),
                    a !== null && (a = {
                        token: "string",
                        value: a
                    }),
                    a === null && (c = b),
                    a === null && (b = c,
                    a = ic(),
                    a !== null && (a = {
                        token: "string",
                        value: a
                    }),
                    a === null && (c = b))));
                    j--;
                    j === 0 && a === null && i("[118] String");
                    return a
                }
                function P() {
                    var a, b;
                    j++;
                    b = c;
                    a = Ia();
                    a !== null && (a = {
                        token: "uri",
                        prefix: null,
                        suffix: null,
                        value: a
                    });
                    a === null && (c = b);
                    a === null && (b = c,
                    a = jc(),
                    a === null && (c = b));
                    j--;
                    j === 0 && a === null && i("[119] IRIref");
                    return a
                }
                function jc() {
                    var a, b;
                    j++;
                    b = c;
                    a = kc();
                    a !== null && (a = {
                        token: "uri",
                        prefix: a[0],
                        suffix: a[1],
                        value: null
                    });
                    a === null && (c = b);
                    a === null && (b = c,
                    a = Ja(),
                    a !== null && (a = {
                        token: "uri",
                        prefix: a,
                        suffix: "",
                        value: null
                    }),
                    a === null && (c = b));
                    j--;
                    j === 0 && a === null && i("[120] PrefixedName");
                    return a
                }
                function Qb() {
                    var a, b;
                    j++;
                    b = c;
                    a = lc();
                    a !== null && (a = {
                        token: "blank",
                        value: a
                    });
                    a === null && (c = b);
                    a === null && (b = c,
                    a = mc(),
                    a !== null && (da++,
                    a = {
                        token: "blank",
                        value: "_:" + da
                    }),
                    a === null && (c = b));
                    j--;
                    j === 0 && a === null && i("[121] BlankNode");
                    return a
                }
                function Ia() {
                    var a, b, d, f, h;
                    j++;
                    h = f = c;
                    e.charCodeAt(c) === 60 ? (a = "<",
                    c++) : (a = null,
                    j === 0 && i('"<"'));
                    if (a !== null) {
                        b = [];
                        /^[^<>"{}|^`\\]/.test(e.charAt(c)) ? (d = e.charAt(c),
                        c++) : (d = null,
                        j === 0 && i('[^<>"{}|^`\\\\]'));
                        for (; d !== null; )
                            b.push(d),
                            /^[^<>"{}|^`\\]/.test(e.charAt(c)) ? (d = e.charAt(c),
                            c++) : (d = null,
                            j === 0 && i('[^<>"{}|^`\\\\]'));
                        b !== null ? (e.charCodeAt(c) === 62 ? (d = ">",
                        c++) : (d = null,
                        j === 0 && i('">"')),
                        d !== null ? a = [a, b, d] : (a = null,
                        c = h)) : (a = null,
                        c = h)
                    } else
                        a = null,
                        c = h;
                    a !== null && (a = a[1].join(""));
                    a === null && (c = f);
                    j--;
                    j === 0 && a === null && i("[122] IRI_REF");
                    return a
                }
                function Ja() {
                    var a, b, d, f;
                    j++;
                    f = d = c;
                    a = nc();
                    a = a !== null ? a : "";
                    a !== null ? (e.charCodeAt(c) === 58 ? (b = ":",
                    c++) : (b = null,
                    j === 0 && i('":"')),
                    b !== null ? a = [a, b] : (a = null,
                    c = f)) : (a = null,
                    c = f);
                    a !== null && (a = a[0]);
                    a === null && (c = d);
                    j--;
                    j === 0 && a === null && i("[123] PNAME_NS");
                    return a
                }
                function kc() {
                    var a, b, e, d;
                    j++;
                    d = e = c;
                    a = Ja();
                    a !== null ? (b = rb(),
                    b !== null ? a = [a, b] : (a = null,
                    c = d)) : (a = null,
                    c = d);
                    a !== null && (a = [a[0], a[1]]);
                    a === null && (c = e);
                    j--;
                    j === 0 && a === null && i("[124] PNAME_LN");
                    return a
                }
                function lc() {
                    var a, b, d, f;
                    j++;
                    f = d = c;
                    e.substr(c, 2) === "_:" ? (a = "_:",
                    c += 2) : (a = null,
                    j === 0 && i('"_:"'));
                    a !== null ? (b = rb(),
                    b !== null ? a = [a, b] : (a = null,
                    c = f)) : (a = null,
                    c = f);
                    a !== null && (a = a[1]);
                    a === null && (c = d);
                    j--;
                    j === 0 && a === null && i("[125] BLANK_NODE_LABEL");
                    return a
                }
                function Ob() {
                    var a, b, d, f;
                    j++;
                    f = d = c;
                    e.charCodeAt(c) === 63 ? (a = "?",
                    c++) : (a = null,
                    j === 0 && i('"?"'));
                    a !== null ? (b = sb(),
                    b !== null ? a = [a, b] : (a = null,
                    c = f)) : (a = null,
                    c = f);
                    a !== null && (a = a[1]);
                    a === null && (c = d);
                    j--;
                    j === 0 && a === null && i("[126] VAR1");
                    return a
                }
                function Pb() {
                    var a, b, d, f;
                    j++;
                    f = d = c;
                    e.charCodeAt(c) === 36 ? (a = "$",
                    c++) : (a = null,
                    j === 0 && i('"$"'));
                    a !== null ? (b = sb(),
                    b !== null ? a = [a, b] : (a = null,
                    c = f)) : (a = null,
                    c = f);
                    a !== null && (a = a[1]);
                    a === null && (c = d);
                    j--;
                    j === 0 && a === null && i("[127] VAR2");
                    return a
                }
                function Xb() {
                    var a, b, d, f, h, g, m, l, n;
                    j++;
                    l = m = c;
                    e.charCodeAt(c) === 64 ? (a = "@",
                    c++) : (a = null,
                    j === 0 && i('"@"'));
                    if (a !== null) {
                        /^[a-zA-Z]/.test(e.charAt(c)) ? (d = e.charAt(c),
                        c++) : (d = null,
                        j === 0 && i("[a-zA-Z]"));
                        if (d !== null)
                            for (b = []; d !== null; )
                                b.push(d),
                                /^[a-zA-Z]/.test(e.charAt(c)) ? (d = e.charAt(c),
                                c++) : (d = null,
                                j === 0 && i("[a-zA-Z]"));
                        else
                            b = null;
                        if (b !== null) {
                            d = [];
                            n = c;
                            e.charCodeAt(c) === 45 ? (f = "-",
                            c++) : (f = null,
                            j === 0 && i('"-"'));
                            if (f !== null) {
                                /^[a-zA-Z0-9]/.test(e.charAt(c)) ? (g = e.charAt(c),
                                c++) : (g = null,
                                j === 0 && i("[a-zA-Z0-9]"));
                                if (g !== null)
                                    for (h = []; g !== null; )
                                        h.push(g),
                                        /^[a-zA-Z0-9]/.test(e.charAt(c)) ? (g = e.charAt(c),
                                        c++) : (g = null,
                                        j === 0 && i("[a-zA-Z0-9]"));
                                else
                                    h = null;
                                h !== null ? f = [f, h] : (f = null,
                                c = n)
                            } else
                                f = null,
                                c = n;
                            for (; f !== null; )
                                if (d.push(f),
                                n = c,
                                e.charCodeAt(c) === 45 ? (f = "-",
                                c++) : (f = null,
                                j === 0 && i('"-"')),
                                f !== null) {
                                    /^[a-zA-Z0-9]/.test(e.charAt(c)) ? (g = e.charAt(c),
                                    c++) : (g = null,
                                    j === 0 && i("[a-zA-Z0-9]"));
                                    if (g !== null)
                                        for (h = []; g !== null; )
                                            h.push(g),
                                            /^[a-zA-Z0-9]/.test(e.charAt(c)) ? (g = e.charAt(c),
                                            c++) : (g = null,
                                            j === 0 && i("[a-zA-Z0-9]"));
                                    else
                                        h = null;
                                    h !== null ? f = [f, h] : (f = null,
                                    c = n)
                                } else
                                    f = null,
                                    c = n;
                            d !== null ? a = [a, b, d] : (a = null,
                            c = l)
                        } else
                            a = null,
                            c = l
                    } else
                        a = null,
                        c = l;
                    a !== null && (a = a[2].length === 0 ? ("@" + a[1].join("")).toLowerCase() : ("@" + a[1].join("") + "-" + a[2][0][1].join("")).toLowerCase());
                    a === null && (c = m);
                    j--;
                    j === 0 && a === null && i("[128] LANGTAG");
                    return a
                }
                function ca() {
                    var a, b, d;
                    j++;
                    d = c;
                    /^[0-9]/.test(e.charAt(c)) ? (b = e.charAt(c),
                    c++) : (b = null,
                    j === 0 && i("[0-9]"));
                    if (b !== null)
                        for (a = []; b !== null; )
                            a.push(b),
                            /^[0-9]/.test(e.charAt(c)) ? (b = e.charAt(c),
                            c++) : (b = null,
                            j === 0 && i("[0-9]"));
                    else
                        a = null;
                    a !== null && (a = function(a, b) {
                        var c = {
                            token: "literal",
                            lang: null,
                            type: "http://www.w3.org/2001/XMLSchema#integer"
                        };
                        c.value = Y(b);
                        return c
                    }(d, a));
                    a === null && (c = d);
                    j--;
                    j === 0 && a === null && i("[129] INTEGER");
                    return a
                }
                function Ya() {
                    var a, b, d, f, h, g;
                    j++;
                    g = h = c;
                    /^[0-9]/.test(e.charAt(c)) ? (b = e.charAt(c),
                    c++) : (b = null,
                    j === 0 && i("[0-9]"));
                    if (b !== null)
                        for (a = []; b !== null; )
                            a.push(b),
                            /^[0-9]/.test(e.charAt(c)) ? (b = e.charAt(c),
                            c++) : (b = null,
                            j === 0 && i("[0-9]"));
                    else
                        a = null;
                    if (a !== null)
                        if (e.charCodeAt(c) === 46 ? (b = ".",
                        c++) : (b = null,
                        j === 0 && i('"."')),
                        b !== null) {
                            d = [];
                            /^[0-9]/.test(e.charAt(c)) ? (f = e.charAt(c),
                            c++) : (f = null,
                            j === 0 && i("[0-9]"));
                            for (; f !== null; )
                                d.push(f),
                                /^[0-9]/.test(e.charAt(c)) ? (f = e.charAt(c),
                                c++) : (f = null,
                                j === 0 && i("[0-9]"));
                            d !== null ? a = [a, b, d] : (a = null,
                            c = g)
                        } else
                            a = null,
                            c = g;
                    else
                        a = null,
                        c = g;
                    a !== null && (a = function(a, b, c, e) {
                        a = {
                            token: "literal",
                            lang: null,
                            type: "http://www.w3.org/2001/XMLSchema#decimal"
                        };
                        a.value = Y([b, c, e]);
                        return a
                    }(h, a[0], a[1], a[2]));
                    a === null && (c = h);
                    if (a === null) {
                        g = h = c;
                        e.charCodeAt(c) === 46 ? (a = ".",
                        c++) : (a = null,
                        j === 0 && i('"."'));
                        if (a !== null) {
                            /^[0-9]/.test(e.charAt(c)) ? (d = e.charAt(c),
                            c++) : (d = null,
                            j === 0 && i("[0-9]"));
                            if (d !== null)
                                for (b = []; d !== null; )
                                    b.push(d),
                                    /^[0-9]/.test(e.charAt(c)) ? (d = e.charAt(c),
                                    c++) : (d = null,
                                    j === 0 && i("[0-9]"));
                            else
                                b = null;
                            b !== null ? a = [a, b] : (a = null,
                            c = g)
                        } else
                            a = null,
                            c = g;
                        a !== null && (a = function(a, b, c) {
                            a = {
                                token: "literal",
                                lang: null,
                                type: "http://www.w3.org/2001/XMLSchema#decimal"
                            };
                            a.value = Y([b, c]);
                            return a
                        }(h, a[0], a[1]));
                        a === null && (c = h)
                    }
                    j--;
                    j === 0 && a === null && i("[130] DECIMAL");
                    return a
                }
                function Xa() {
                    var a, b, d, f, h, g;
                    j++;
                    g = h = c;
                    /^[0-9]/.test(e.charAt(c)) ? (b = e.charAt(c),
                    c++) : (b = null,
                    j === 0 && i("[0-9]"));
                    if (b !== null)
                        for (a = []; b !== null; )
                            a.push(b),
                            /^[0-9]/.test(e.charAt(c)) ? (b = e.charAt(c),
                            c++) : (b = null,
                            j === 0 && i("[0-9]"));
                    else
                        a = null;
                    if (a !== null)
                        if (e.charCodeAt(c) === 46 ? (b = ".",
                        c++) : (b = null,
                        j === 0 && i('"."')),
                        b !== null) {
                            d = [];
                            /^[0-9]/.test(e.charAt(c)) ? (f = e.charAt(c),
                            c++) : (f = null,
                            j === 0 && i("[0-9]"));
                            for (; f !== null; )
                                d.push(f),
                                /^[0-9]/.test(e.charAt(c)) ? (f = e.charAt(c),
                                c++) : (f = null,
                                j === 0 && i("[0-9]"));
                            d !== null ? (f = Za(),
                            f !== null ? a = [a, b, d, f] : (a = null,
                            c = g)) : (a = null,
                            c = g)
                        } else
                            a = null,
                            c = g;
                    else
                        a = null,
                        c = g;
                    a !== null && (a = function(a, b, c, e, d) {
                        a = {
                            token: "literal",
                            lang: null,
                            type: "http://www.w3.org/2001/XMLSchema#double"
                        };
                        a.value = Y([b, c, e, d]);
                        return a
                    }(h, a[0], a[1], a[2], a[3]));
                    a === null && (c = h);
                    if (a === null) {
                        g = h = c;
                        e.charCodeAt(c) === 46 ? (a = ".",
                        c++) : (a = null,
                        j === 0 && i('"."'));
                        if (a !== null) {
                            /^[0-9]/.test(e.charAt(c)) ? (d = e.charAt(c),
                            c++) : (d = null,
                            j === 0 && i("[0-9]"));
                            if (d !== null)
                                for (b = []; d !== null; )
                                    b.push(d),
                                    /^[0-9]/.test(e.charAt(c)) ? (d = e.charAt(c),
                                    c++) : (d = null,
                                    j === 0 && i("[0-9]"));
                            else
                                b = null;
                            b !== null ? (d = Za(),
                            d !== null ? a = [a, b, d] : (a = null,
                            c = g)) : (a = null,
                            c = g)
                        } else
                            a = null,
                            c = g;
                        a !== null && (a = function(a, b, c, e) {
                            a = {
                                token: "literal",
                                lang: null,
                                type: "http://www.w3.org/2001/XMLSchema#double"
                            };
                            a.value = Y([b, c, e]);
                            return a
                        }(h, a[0], a[1], a[2]));
                        a === null && (c = h);
                        if (a === null) {
                            g = h = c;
                            /^[0-9]/.test(e.charAt(c)) ? (b = e.charAt(c),
                            c++) : (b = null,
                            j === 0 && i("[0-9]"));
                            if (b !== null)
                                for (a = []; b !== null; )
                                    a.push(b),
                                    /^[0-9]/.test(e.charAt(c)) ? (b = e.charAt(c),
                                    c++) : (b = null,
                                    j === 0 && i("[0-9]"));
                            else
                                a = null;
                            a !== null ? (b = Za(),
                            b !== null ? a = [a, b] : (a = null,
                            c = g)) : (a = null,
                            c = g);
                            a !== null && (a = function(a, b, c) {
                                a = {
                                    token: "literal",
                                    lang: null,
                                    type: "http://www.w3.org/2001/XMLSchema#double"
                                };
                                a.value = Y([b, c]);
                                return a
                            }(h, a[0], a[1]));
                            a === null && (c = h)
                        }
                    }
                    j--;
                    j === 0 && a === null && i("[131] DOUBLE");
                    return a
                }
                function bc() {
                    var a, b, d, f;
                    j++;
                    f = d = c;
                    e.charCodeAt(c) === 43 ? (a = "+",
                    c++) : (a = null,
                    j === 0 && i('"+"'));
                    a !== null ? (b = ca(),
                    b !== null ? a = [a, b] : (a = null,
                    c = f)) : (a = null,
                    c = f);
                    a !== null && (a = function(a, b) {
                        b.value = "+" + b.value;
                        return b
                    }(d, a[1]));
                    a === null && (c = d);
                    j--;
                    j === 0 && a === null && i("[132] INTEGER_POSITIVE");
                    return a
                }
                function ac() {
                    var a, b, d, f;
                    j++;
                    f = d = c;
                    e.charCodeAt(c) === 43 ? (a = "+",
                    c++) : (a = null,
                    j === 0 && i('"+"'));
                    a !== null ? (b = Ya(),
                    b !== null ? a = [a, b] : (a = null,
                    c = f)) : (a = null,
                    c = f);
                    a !== null && (a = function(a, b) {
                        b.value = "+" + b.value;
                        return b
                    }(d, a[1]));
                    a === null && (c = d);
                    j--;
                    j === 0 && a === null && i("[133] DECIMAL_POSITIVE");
                    return a
                }
                function $b() {
                    var a, b, d, f;
                    j++;
                    f = d = c;
                    e.charCodeAt(c) === 43 ? (a = "+",
                    c++) : (a = null,
                    j === 0 && i('"+"'));
                    a !== null ? (b = Xa(),
                    b !== null ? a = [a, b] : (a = null,
                    c = f)) : (a = null,
                    c = f);
                    a !== null && (a = function(a, b) {
                        b.value = "+" + b.value;
                        return b
                    }(d, a[1]));
                    a === null && (c = d);
                    j--;
                    j === 0 && a === null && i("[134] DOUBLE_POSITIVE");
                    return a
                }
                function ec() {
                    var a, b, d, f;
                    j++;
                    f = d = c;
                    e.charCodeAt(c) === 45 ? (a = "-",
                    c++) : (a = null,
                    j === 0 && i('"-"'));
                    a !== null ? (b = ca(),
                    b !== null ? a = [a, b] : (a = null,
                    c = f)) : (a = null,
                    c = f);
                    a !== null && (a = function(a, b) {
                        b.value = "-" + b.value;
                        return b
                    }(d, a[1]));
                    a === null && (c = d);
                    j--;
                    j === 0 && a === null && i("[135] INTEGER_NEGATIVE");
                    return a
                }
                function dc() {
                    var a, b, d, f;
                    j++;
                    f = d = c;
                    e.charCodeAt(c) === 45 ? (a = "-",
                    c++) : (a = null,
                    j === 0 && i('"-"'));
                    a !== null ? (b = Ya(),
                    b !== null ? a = [a, b] : (a = null,
                    c = f)) : (a = null,
                    c = f);
                    a !== null && (a = function(a, b) {
                        b.value = "-" + b.value;
                        return b
                    }(d, a[1]));
                    a === null && (c = d);
                    j--;
                    j === 0 && a === null && i("[136] DECIMAL_NEGATIVE");
                    return a
                }
                function cc() {
                    var a, b, d, f;
                    j++;
                    f = d = c;
                    e.charCodeAt(c) === 45 ? (a = "-",
                    c++) : (a = null,
                    j === 0 && i('"-"'));
                    a !== null ? (b = Xa(),
                    b !== null ? a = [a, b] : (a = null,
                    c = f)) : (a = null,
                    c = f);
                    a !== null && (a = function(a, b) {
                        b.value = "-" + b.value;
                        return b
                    }(d, a[1]));
                    a === null && (c = d);
                    j--;
                    j === 0 && a === null && i("[137] DOUBLE_NEGATIVE");
                    return a
                }
                function Za() {
                    var a, b, d, f, h, g;
                    j++;
                    g = h = c;
                    /^[eE]/.test(e.charAt(c)) ? (a = e.charAt(c),
                    c++) : (a = null,
                    j === 0 && i("[eE]"));
                    if (a !== null)
                        if (/^[+\-]/.test(e.charAt(c)) ? (b = e.charAt(c),
                        c++) : (b = null,
                        j === 0 && i("[+\\-]")),
                        b = b !== null ? b : "",
                        b !== null) {
                            /^[0-9]/.test(e.charAt(c)) ? (f = e.charAt(c),
                            c++) : (f = null,
                            j === 0 && i("[0-9]"));
                            if (f !== null)
                                for (d = []; f !== null; )
                                    d.push(f),
                                    /^[0-9]/.test(e.charAt(c)) ? (f = e.charAt(c),
                                    c++) : (f = null,
                                    j === 0 && i("[0-9]"));
                            else
                                d = null;
                            d !== null ? a = [a, b, d] : (a = null,
                            c = g)
                        } else
                            a = null,
                            c = g;
                    else
                        a = null,
                        c = g;
                    a !== null && (a = Y([a[0], a[1], a[2]]));
                    a === null && (c = h);
                    j--;
                    j === 0 && a === null && i("[138] EXPONENT");
                    return a
                }
                function hc() {
                    var a, b, d, f, h;
                    j++;
                    h = f = c;
                    e.charCodeAt(c) === 39 ? (a = "'",
                    c++) : (a = null,
                    j === 0 && i('"\'"'));
                    if (a !== null) {
                        b = [];
                        /^[^'\\\n\r]/.test(e.charAt(c)) ? (d = e.charAt(c),
                        c++) : (d = null,
                        j === 0 && i("[^'\\\\\\n\\r]"));
                        for (d === null && (d = ea()); d !== null; )
                            b.push(d),
                            /^[^'\\\n\r]/.test(e.charAt(c)) ? (d = e.charAt(c),
                            c++) : (d = null,
                            j === 0 && i("[^'\\\\\\n\\r]")),
                            d === null && (d = ea());
                        b !== null ? (e.charCodeAt(c) === 39 ? (d = "'",
                        c++) : (d = null,
                        j === 0 && i('"\'"')),
                        d !== null ? a = [a, b, d] : (a = null,
                        c = h)) : (a = null,
                        c = h)
                    } else
                        a = null,
                        c = h;
                    a !== null && (a = Y(a[1]));
                    a === null && (c = f);
                    j--;
                    j === 0 && a === null && i("[139] STRING_LITERAL1");
                    return a
                }
                function ic() {
                    var a, b, d, f, h;
                    j++;
                    h = f = c;
                    e.charCodeAt(c) === 34 ? (a = '"',
                    c++) : (a = null,
                    j === 0 && i('"\\""'));
                    if (a !== null) {
                        b = [];
                        /^[^"\\\n\r]/.test(e.charAt(c)) ? (d = e.charAt(c),
                        c++) : (d = null,
                        j === 0 && i('[^"\\\\\\n\\r]'));
                        for (d === null && (d = ea()); d !== null; )
                            b.push(d),
                            /^[^"\\\n\r]/.test(e.charAt(c)) ? (d = e.charAt(c),
                            c++) : (d = null,
                            j === 0 && i('[^"\\\\\\n\\r]')),
                            d === null && (d = ea());
                        b !== null ? (e.charCodeAt(c) === 34 ? (d = '"',
                        c++) : (d = null,
                        j === 0 && i('"\\""')),
                        d !== null ? a = [a, b, d] : (a = null,
                        c = h)) : (a = null,
                        c = h)
                    } else
                        a = null,
                        c = h;
                    a !== null && (a = Y(a[1]));
                    a === null && (c = f);
                    j--;
                    j === 0 && a === null && i("[140] STRING_LITERAL2");
                    return a
                }
                function fc() {
                    var a, b, d, f, h;
                    j++;
                    h = f = c;
                    e.substr(c, 3) === "'''" ? (a = "'''",
                    c += 3) : (a = null,
                    j === 0 && i("\"'''\""));
                    if (a !== null) {
                        b = [];
                        /^[^'\\]/.test(e.charAt(c)) ? (d = e.charAt(c),
                        c++) : (d = null,
                        j === 0 && i("[^'\\\\]"));
                        for (d === null && (d = ea()); d !== null; )
                            b.push(d),
                            /^[^'\\]/.test(e.charAt(c)) ? (d = e.charAt(c),
                            c++) : (d = null,
                            j === 0 && i("[^'\\\\]")),
                            d === null && (d = ea());
                        b !== null ? (e.substr(c, 3) === "'''" ? (d = "'''",
                        c += 3) : (d = null,
                        j === 0 && i("\"'''\"")),
                        d !== null ? a = [a, b, d] : (a = null,
                        c = h)) : (a = null,
                        c = h)
                    } else
                        a = null,
                        c = h;
                    a !== null && (a = Y(a[1]));
                    a === null && (c = f);
                    j--;
                    j === 0 && a === null && i("[141] STRING_LITERAL_LONG1");
                    return a
                }
                function gc() {
                    var a, b, d, f, h;
                    j++;
                    h = f = c;
                    e.substr(c, 3) === '"""' ? (a = '"""',
                    c += 3) : (a = null,
                    j === 0 && i('"\\"\\"\\""'));
                    if (a !== null) {
                        b = [];
                        /^[^"\\]/.test(e.charAt(c)) ? (d = e.charAt(c),
                        c++) : (d = null,
                        j === 0 && i('[^"\\\\]'));
                        for (d === null && (d = ea()); d !== null; )
                            b.push(d),
                            /^[^"\\]/.test(e.charAt(c)) ? (d = e.charAt(c),
                            c++) : (d = null,
                            j === 0 && i('[^"\\\\]')),
                            d === null && (d = ea());
                        b !== null ? (e.substr(c, 3) === '"""' ? (d = '"""',
                        c += 3) : (d = null,
                        j === 0 && i('"\\"\\"\\""')),
                        d !== null ? a = [a, b, d] : (a = null,
                        c = h)) : (a = null,
                        c = h)
                    } else
                        a = null,
                        c = h;
                    a !== null && (a = Y(a[1]));
                    a === null && (c = f);
                    j--;
                    j === 0 && a === null && i("[142] STRING_LITERAL_LONG2");
                    return a
                }
                function ea() {
                    var a, b, d;
                    j++;
                    d = c;
                    e.charCodeAt(c) === 92 ? (a = "\\",
                    c++) : (a = null,
                    j === 0 && i('"\\\\"'));
                    a !== null ? (/^[tbnrf"']/.test(e.charAt(c)) ? (b = e.charAt(c),
                    c++) : (b = null,
                    j === 0 && i("[tbnrf\"']")),
                    b !== null ? a = [a, b] : (a = null,
                    c = d)) : (a = null,
                    c = d);
                    j--;
                    j === 0 && a === null && i("[143] ECHAR");
                    return a
                }
                function la() {
                    var a, b, d, f, h;
                    j++;
                    h = f = c;
                    e.charCodeAt(c) === 40 ? (a = "(",
                    c++) : (a = null,
                    j === 0 && i('"("'));
                    if (a !== null) {
                        b = [];
                        for (d = l(); d !== null; )
                            b.push(d),
                            d = l();
                        b !== null ? (e.charCodeAt(c) === 41 ? (d = ")",
                        c++) : (d = null,
                        j === 0 && i('")"')),
                        d !== null ? a = [a, b, d] : (a = null,
                        c = h)) : (a = null,
                        c = h)
                    } else
                        a = null,
                        c = h;
                    a !== null && (a = {
                        token: "triplesnodecollection",
                        triplesContext: [],
                        chainSubject: [{
                            token: "uri",
                            value: "http://www.w3.org/1999/02/22-rdf-syntax-ns#nil"
                        }]
                    });
                    a === null && (c = f);
                    j--;
                    j === 0 && a === null && i("[144] NIL");
                    return a
                }
                function l() {
                    var a;
                    j++;
                    /^[ ]/.test(e.charAt(c)) ? (a = e.charAt(c),
                    c++) : (a = null,
                    j === 0 && i("[ ]"));
                    a === null && (/^[\t]/.test(e.charAt(c)) ? (a = e.charAt(c),
                    c++) : (a = null,
                    j === 0 && i("[\\t]")),
                    a === null && (/^[\r]/.test(e.charAt(c)) ? (a = e.charAt(c),
                    c++) : (a = null,
                    j === 0 && i("[\\r]")),
                    a === null && (/^[\n]/.test(e.charAt(c)) ? (a = e.charAt(c),
                    c++) : (a = null,
                    j === 0 && i("[\\n]")),
                    a === null && (a = oc()))));
                    j--;
                    j === 0 && a === null && i("[145] WS");
                    return a
                }
                function oc() {
                    var a, b, d, f;
                    j++;
                    f = c;
                    e.charCodeAt(c) === 35 ? (a = "#",
                    c++) : (a = null,
                    j === 0 && i('"#"'));
                    if (a !== null) {
                        b = [];
                        /^[^\n\r]/.test(e.charAt(c)) ? (d = e.charAt(c),
                        c++) : (d = null,
                        j === 0 && i("[^\\n\\r]"));
                        for (; d !== null; )
                            b.push(d),
                            /^[^\n\r]/.test(e.charAt(c)) ? (d = e.charAt(c),
                            c++) : (d = null,
                            j === 0 && i("[^\\n\\r]"));
                        b !== null ? a = [a, b] : (a = null,
                        c = f)
                    } else
                        a = null,
                        c = f;
                    j--;
                    j === 0 && a === null && i(" COMMENT");
                    return a
                }
                function mc() {
                    var a, b, d, f;
                    j++;
                    f = c;
                    e.charCodeAt(c) === 91 ? (a = "[",
                    c++) : (a = null,
                    j === 0 && i('"["'));
                    if (a !== null) {
                        b = [];
                        for (d = l(); d !== null; )
                            b.push(d),
                            d = l();
                        b !== null ? (e.charCodeAt(c) === 93 ? (d = "]",
                        c++) : (d = null,
                        j === 0 && i('"]"')),
                        d !== null ? a = [a, b, d] : (a = null,
                        c = f)) : (a = null,
                        c = f)
                    } else
                        a = null,
                        c = f;
                    j--;
                    j === 0 && a === null && i("[146] ANON");
                    return a
                }
                function tb() {
                    var a;
                    j++;
                    /^[A-Z]/.test(e.charAt(c)) ? (a = e.charAt(c),
                    c++) : (a = null,
                    j === 0 && i("[A-Z]"));
                    a === null && (/^[a-z]/.test(e.charAt(c)) ? (a = e.charAt(c),
                    c++) : (a = null,
                    j === 0 && i("[a-z]")),
                    a === null && (/^[\xC0-\xD6]/.test(e.charAt(c)) ? (a = e.charAt(c),
                    c++) : (a = null,
                    j === 0 && i("[\\xC0-\\xD6]")),
                    a === null && (/^[\xD8-\xF6]/.test(e.charAt(c)) ? (a = e.charAt(c),
                    c++) : (a = null,
                    j === 0 && i("[\\xD8-\\xF6]")),
                    a === null && (/^[\xF8-\u02FF]/.test(e.charAt(c)) ? (a = e.charAt(c),
                    c++) : (a = null,
                    j === 0 && i("[\\xF8-\\u02FF]")),
                    a === null && (/^[\u0370-\u037D]/.test(e.charAt(c)) ? (a = e.charAt(c),
                    c++) : (a = null,
                    j === 0 && i("[\\u0370-\\u037D]")),
                    a === null && (/^[\u037F-\u1FFF]/.test(e.charAt(c)) ? (a = e.charAt(c),
                    c++) : (a = null,
                    j === 0 && i("[\\u037F-\\u1FFF]")),
                    a === null && (/^[\u200C-\u200D]/.test(e.charAt(c)) ? (a = e.charAt(c),
                    c++) : (a = null,
                    j === 0 && i("[\\u200C-\\u200D]")),
                    a === null && (/^[\u2070-\u218F]/.test(e.charAt(c)) ? (a = e.charAt(c),
                    c++) : (a = null,
                    j === 0 && i("[\\u2070-\\u218F]")),
                    a === null && (/^[\u2C00-\u2FEF]/.test(e.charAt(c)) ? (a = e.charAt(c),
                    c++) : (a = null,
                    j === 0 && i("[\\u2C00-\\u2FEF]")),
                    a === null && (/^[\u3001-\uD7FF]/.test(e.charAt(c)) ? (a = e.charAt(c),
                    c++) : (a = null,
                    j === 0 && i("[\\u3001-\\uD7FF]")),
                    a === null && (/^[\uF900-\uFDCF]/.test(e.charAt(c)) ? (a = e.charAt(c),
                    c++) : (a = null,
                    j === 0 && i("[\\uF900-\\uFDCF]")),
                    a === null && (/^[\uFDF0-\uFFFD]/.test(e.charAt(c)) ? (a = e.charAt(c),
                    c++) : (a = null,
                    j === 0 && i("[\\uFDF0-\\uFFFD]")),
                    a === null && (/^[\u1000-\uEFFF]/.test(e.charAt(c)) ? (a = e.charAt(c),
                    c++) : (a = null,
                    j === 0 && i("[\\u1000-\\uEFFF]")))))))))))))));
                    j--;
                    j === 0 && a === null && i("[147] PN_CHARS_BASE");
                    return a
                }
                function ua() {
                    var a;
                    j++;
                    a = tb();
                    a === null && (e.charCodeAt(c) === 95 ? (a = "_",
                    c++) : (a = null,
                    j === 0 && i('"_"')));
                    j--;
                    j === 0 && a === null && i("[148] PN_CHARS_U");
                    return a
                }
                function sb() {
                    var a, b, d, f, h;
                    j++;
                    h = f = c;
                    a = ua();
                    a === null && (/^[0-9]/.test(e.charAt(c)) ? (a = e.charAt(c),
                    c++) : (a = null,
                    j === 0 && i("[0-9]")));
                    if (a !== null) {
                        b = [];
                        d = ua();
                        d === null && (/^[0-9]/.test(e.charAt(c)) ? (d = e.charAt(c),
                        c++) : (d = null,
                        j === 0 && i("[0-9]")),
                        d === null && (/^[\xB7]/.test(e.charAt(c)) ? (d = e.charAt(c),
                        c++) : (d = null,
                        j === 0 && i("[\\xB7]")),
                        d === null && (/^[\u0300-\u036F]/.test(e.charAt(c)) ? (d = e.charAt(c),
                        c++) : (d = null,
                        j === 0 && i("[\\u0300-\\u036F]")),
                        d === null && (/^[\u203F-\u2040]/.test(e.charAt(c)) ? (d = e.charAt(c),
                        c++) : (d = null,
                        j === 0 && i("[\\u203F-\\u2040]"))))));
                        for (; d !== null; )
                            b.push(d),
                            d = ua(),
                            d === null && (/^[0-9]/.test(e.charAt(c)) ? (d = e.charAt(c),
                            c++) : (d = null,
                            j === 0 && i("[0-9]")),
                            d === null && (/^[\xB7]/.test(e.charAt(c)) ? (d = e.charAt(c),
                            c++) : (d = null,
                            j === 0 && i("[\\xB7]")),
                            d === null && (/^[\u0300-\u036F]/.test(e.charAt(c)) ? (d = e.charAt(c),
                            c++) : (d = null,
                            j === 0 && i("[\\u0300-\\u036F]")),
                            d === null && (/^[\u203F-\u2040]/.test(e.charAt(c)) ? (d = e.charAt(c),
                            c++) : (d = null,
                            j === 0 && i("[\\u203F-\\u2040]"))))));
                        b !== null ? a = [a, b] : (a = null,
                        c = h)
                    } else
                        a = null,
                        c = h;
                    a !== null && (a = a[0] + a[1].join(""));
                    a === null && (c = f);
                    j--;
                    j === 0 && a === null && i("[149] VARNAME");
                    return a
                }
                function Fa() {
                    var a;
                    j++;
                    a = ua();
                    a === null && (e.charCodeAt(c) === 45 ? (a = "-",
                    c++) : (a = null,
                    j === 0 && i('"-"')),
                    a === null && (/^[0-9]/.test(e.charAt(c)) ? (a = e.charAt(c),
                    c++) : (a = null,
                    j === 0 && i("[0-9]")),
                    a === null && (/^[\xB7]/.test(e.charAt(c)) ? (a = e.charAt(c),
                    c++) : (a = null,
                    j === 0 && i("[\\xB7]")),
                    a === null && (/^[\u0300-\u036F]/.test(e.charAt(c)) ? (a = e.charAt(c),
                    c++) : (a = null,
                    j === 0 && i("[\\u0300-\\u036F]")),
                    a === null && (/^[\u203F-\u2040]/.test(e.charAt(c)) ? (a = e.charAt(c),
                    c++) : (a = null,
                    j === 0 && i("[\\u203F-\\u2040]")))))));
                    j--;
                    j === 0 && a === null && i("[150] PN_CHARS");
                    return a
                }
                function nc() {
                    var a, b, d, f, h;
                    j++;
                    h = f = c;
                    a = tb();
                    if (a !== null) {
                        b = [];
                        d = Fa();
                        d === null && (e.charCodeAt(c) === 46 ? (d = ".",
                        c++) : (d = null,
                        j === 0 && i('"."')));
                        for (; d !== null; )
                            b.push(d),
                            d = Fa(),
                            d === null && (e.charCodeAt(c) === 46 ? (d = ".",
                            c++) : (d = null,
                            j === 0 && i('"."')));
                        b !== null ? a = [a, b] : (a = null,
                        c = h)
                    } else
                        a = null,
                        c = h;
                    a !== null && (a = function(a, b, c) {
                        if (c[c.length - 1] == ".")
                            throw Error("Wrong PN_PREFIX, cannot finish with '.'");
                        else
                            return b + c.join("")
                    }(f, a[0], a[1]));
                    a === null && (c = f);
                    j--;
                    j === 0 && a === null && i("[151] PN_PREFIX");
                    return a
                }
                function rb() {
                    var a, b, d, f, h;
                    j++;
                    h = f = c;
                    a = ua();
                    a === null && (/^[0-9]/.test(e.charAt(c)) ? (a = e.charAt(c),
                    c++) : (a = null,
                    j === 0 && i("[0-9]")));
                    if (a !== null) {
                        b = [];
                        for (d = Fa(); d !== null; )
                            b.push(d),
                            d = Fa();
                        b !== null ? a = [a, b] : (a = null,
                        c = h)
                    } else
                        a = null,
                        c = h;
                    a !== null && (a = a[0] + a[1].join(""));
                    a === null && (c = f);
                    j--;
                    j === 0 && a === null && i("[152] PN_LOCAL");
                    return a
                }
                function gb(a) {
                    a.sort();
                    for (var b = null, c = [], d = 0; d < a.length; d++)
                        a[d] !== b && (c.push(a[d]),
                        b = a[d]);
                    return c
                }
                function hb() {
                    for (var a = 1, b = 1, d = !1, f = 0; f < Math.max(c, za); f++) {
                        var h = e.charAt(f);
                        h === "\n" ? (d || a++,
                        b = 1,
                        d = !1) : h === "\r" || h === "\u2028" || h === "\u2029" ? (a++,
                        b = 1,
                        d = !0) : (b++,
                        d = !1)
                    }
                    return {
                        line: a,
                        column: b
                    }
                }
                var fa = {
                    SPARQL: function() {
                        var a;
                        a = h();
                        a === null && (a = ba());
                        return a
                    },
                    Query: h,
                    Prologue: f,
                    BaseDecl: g,
                    PrefixDecl: n,
                    SelectQuery: q,
                    SubSelect: o,
                    SelectClause: r,
                    ConstructQuery: s,
                    DescribeQuery: x,
                    AskQuery: z,
                    DatasetClause: t,
                    DefaultGraphClause: C,
                    NamedGraphClause: D,
                    WhereClause: A,
                    SolutionModifier: E,
                    GroupClause: K,
                    GroupCondition: F,
                    HavingClause: I,
                    OrderClause: Q,
                    OrderCondition: L,
                    LimitOffsetClauses: U,
                    LimitClause: W,
                    OffsetClause: X,
                    BindingsClause: $,
                    BindingValue: V,
                    Update: ba,
                    Update1: ga,
                    Load: ha,
                    Clear: ia,
                    Drop: ja,
                    Create: na,
                    InsertData: oa,
                    DeleteData: va,
                    DeleteWhere: wa,
                    Modify: xa,
                    DeleteClause: ya,
                    InsertClause: bb,
                    UsingClause: cb,
                    GraphRef: Ha,
                    GraphRefAll: db,
                    QuadPattern: $a,
                    QuadData: ab,
                    Quads: eb,
                    QuadsNotTriples: fb,
                    TriplesTemplate: pa,
                    GroupGraphPattern: T,
                    GroupGraphPatternSub: xb,
                    TriplesBlock: Ba,
                    GraphPatternNotTriples: mb,
                    OptionalGraphPattern: Ab,
                    GraphGraphPattern: Cb,
                    ServiceGraphPattern: Db,
                    MinusGraphPattern: Bb,
                    GroupOrUnionGraphPattern: zb,
                    Filter: Eb,
                    Constraint: Aa,
                    FunctionCall: kb,
                    ArgList: nb,
                    ExpressionList: qa,
                    ConstructTemplate: wb,
                    ConstructTriples: ob,
                    TriplesSameSubject: lb,
                    PropertyListNotEmpty: Ca,
                    PropertyList: Fb,
                    ObjectList: ma,
                    Verb: Ra,
                    TriplesSameSubjectPath: yb,
                    PropertyListNotEmptyPath: Gb,
                    PropertyListPath: Hb,
                    VerbPath: Sa,
                    PathAlternative: pb,
                    PathSequence: Ta,
                    PathElt: qb,
                    PathEltOrInverse: Ua,
                    PathMod: Jb,
                    PathPrimary: Ib,
                    PathNegatedPropertySet: Kb,
                    PathOneInPropertySet: Da,
                    TriplesNode: Qa,
                    BlankNodePropertyList: Mb,
                    Collection: Lb,
                    GraphNode: ra,
                    VarOrTerm: Pa,
                    VarOrIRIref: ka,
                    Var: O,
                    GraphTerm: Nb,
                    ConditionalOrExpression: J,
                    ConditionalAndExpression: Va,
                    RelationalExpression: Wa,
                    AdditiveExpression: S,
                    MultiplicativeExpression: sa,
                    UnaryExpression: aa,
                    PrimaryExpression: Ea,
                    BrackettedExpression: La,
                    BuiltInCall: Ka,
                    RegexExpression: Tb,
                    ExistsFunc: Ub,
                    NotExistsFunc: Vb,
                    Aggregate: Sb,
                    IRIrefOrFunction: Rb,
                    RDFLiteral: Ma,
                    NumericLiteral: Na,
                    NumericLiteralUnsigned: Yb,
                    NumericLiteralPositive: Zb,
                    NumericLiteralNegative: ta,
                    BooleanLiteral: Oa,
                    String: Wb,
                    IRIref: P,
                    PrefixedName: jc,
                    BlankNode: Qb,
                    IRI_REF: Ia,
                    PNAME_NS: Ja,
                    PNAME_LN: kc,
                    BLANK_NODE_LABEL: lc,
                    VAR1: Ob,
                    VAR2: Pb,
                    LANGTAG: Xb,
                    INTEGER: ca,
                    DECIMAL: Ya,
                    DOUBLE: Xa,
                    INTEGER_POSITIVE: bc,
                    DECIMAL_POSITIVE: ac,
                    DOUBLE_POSITIVE: $b,
                    INTEGER_NEGATIVE: ec,
                    DECIMAL_NEGATIVE: dc,
                    DOUBLE_NEGATIVE: cc,
                    EXPONENT: Za,
                    STRING_LITERAL1: hc,
                    STRING_LITERAL2: ic,
                    STRING_LITERAL_LONG1: fc,
                    STRING_LITERAL_LONG2: gc,
                    ECHAR: ea,
                    NIL: la,
                    WS: l,
                    COMMENT: oc,
                    ANON: mc,
                    PN_CHARS_BASE: tb,
                    PN_CHARS_U: ua,
                    VARNAME: sb,
                    PN_CHARS: Fa,
                    PN_PREFIX: nc,
                    PN_LOCAL: rb
                };
                if (b !== void 0) {
                    if (fa[b] === void 0)
                        throw Error("Invalid rule name: " + a(b) + ".");
                } else
                    b = "SPARQL";
                var c = 0
                  , j = 0
                  , za = 0
                  , jb = []
                  , Y = function(a) {
                    for (var b = "", c = 0; c < a.length; c++)
                        b += typeof a[c] === "string" ? a[c] : a[c].join("");
                    return b
                }
                  , da = 0
                  , vb = function(a) {
                    for (var b = "", c = 0; c < a.length; c++)
                        b += a[c];
                    return b.toUpperCase()
                }
                  , fa = fa[b]();
                if (fa === null || c !== e.length) {
                    var fa = Math.max(c, za)
                      , ib = fa < e.length ? e.charAt(fa) : null
                      , pc = hb();
                    throw new this.SyntaxError(gb(jb),ib,fa,pc.line,pc.column);
                }
                return fa
            },
            toSource: function() {
                return this._source
            },
            SyntaxError: function(b, d, i, h, f) {
                this.name = "SyntaxError";
                this.expected = b;
                this.found = d;
                this.message = function(b, d) {
                    var e, f;
                    switch (b.length) {
                    case 0:
                        e = "end of input";
                        break;
                    case 1:
                        e = b[0];
                        break;
                    default:
                        e = b.slice(0, b.length - 1).join(", ") + " or " + b[b.length - 1]
                    }
                    f = d ? a(d) : "end of input";
                    return "Expected " + e + " but " + f + " found."
                }(b, d);
                this.offset = i;
                this.line = h;
                this.column = f
            }
        };
        b.SyntaxError.prototype = Error.prototype;
        return b
    }();
    var r = {
        defaultContext: {
            rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
            rdfs: "http://www.w3.org/2000/01/rdf-schema#",
            owl: "http://www.w3.org/2002/07/owl#",
            xsd: "http://www.w3.org/2001/XMLSchema#",
            dcterms: "http://purl.org/dc/terms/",
            foaf: "http://xmlns.com/foaf/0.1/",
            cal: "http://www.w3.org/2002/12/cal/ical#",
            vcard: "http://www.w3.org/2006/vcard/ns# ",
            geo: "http://www.w3.org/2003/01/geo/wgs84_pos#",
            cc: "http://creativecommons.org/ns#",
            sioc: "http://rdfs.org/sioc/ns#",
            doap: "http://usefulinc.com/ns/doap#",
            com: "http://purl.org/commerce#",
            ps: "http://purl.org/payswarm#",
            gr: "http://purl.org/goodrelations/v1#",
            sig: "http://purl.org/signature#",
            ccard: "http://purl.org/commerce/creditcard#"
        },
        UrisMap: function() {
            this.defaultNs = "";
            this.interfaceProperties = ["get", "remove", "set", "setDefault", "addAll", "resolve", "shrink"]
        }
    };
    r.UrisMap.prototype.values = function() {
        var a = {}, b;
        for (b in this)
            !s.include(this.interfaceProperties, b) && typeof this[b] !== "function" && b !== "defaultNs" && b !== "interfaceProperties" && (a[b] = this[b]);
        return a
    }
    ;
    r.UrisMap.prototype.get = function(a) {
        if (a.indexOf(" ") != -1)
            throw "Prefix must not contain any whitespaces";
        return this[a]
    }
    ;
    r.UrisMap.prototype.remove = function(a) {
        if (a.indexOf(" ") != -1)
            throw "Prefix must not contain any whitespaces";
        delete this[a];
        return null
    }
    ;
    r.UrisMap.prototype.set = function(a, b) {
        if (a.indexOf(" ") != -1)
            throw "Prefix must not contain any whitespaces";
        this[a] = b
    }
    ;
    r.UrisMap.prototype.setDefault = function(a) {
        this.defaultNs = a
    }
    ;
    r.UrisMap.prototype.addAll = function(a, b) {
        for (var e in a)
            s.include(this.interfaceProperties, e) || (this[e] != null ? b === !0 && (this[e] = a[e]) : this[e] = a[e]);
        return this
    }
    ;
    r.UrisMap.prototype.resolve = function(a) {
        var b = a.split(":")
          , a = b[0]
          , b = b[1];
        return a === "" ? this.defaultNs == null ? null : this.defaultNs + b : this[a] != null ? this[a] + b : null
    }
    ;
    r.UrisMap.prototype.shrink = function(a) {
        for (var b in this) {
            var e = this[b];
            if (a.indexOf(e) === 0 && e !== "" && b != "defaultNs")
                return a = a.split(e)[1],
                b + ":" + a
        }
        return a
    }
    ;
    r.Profile = function() {
        this.prefixes = new r.UrisMap;
        this.terms = new r.UrisMap
    }
    ;
    r.Profile.prototype.importProfile = function(a, b) {
        this.prefixes.addAll(a.prefixes, b);
        this.terms.addAll(a.terms, b)
    }
    ;
    r.Profile.prototype.resolve = function(a) {
        return a.indexOf(":") != -1 ? this.prefixes.resolve(a) : this.terms[a] != null ? this.terms.resolve(a) : null
    }
    ;
    r.Profile.prototype.setDefaultPrefix = function(a) {
        this.prefixes.setDefault(a)
    }
    ;
    r.Profile.prototype.setDefaultVocabulary = function(a) {
        this.terms.setDefault(a)
    }
    ;
    r.Profile.prototype.setPrefix = function(a, b) {
        this.prefixes.set(a, b)
    }
    ;
    r.Profile.prototype.setTerm = function(a, b) {
        this.terms.set(a, b)
    }
    ;
    r.RDFEnvironment = function() {
        this.blankNodeCounter = 0;
        var a = this;
        this.filters = {
            s: function(a) {
                return function(b) {
                    return b.subject.equals(a)
                }
            },
            p: function(a) {
                return function(b) {
                    return b.predicate.equals(a)
                }
            },
            o: function(a) {
                return function(b) {
                    return b.object.equals(a)
                }
            },
            sp: function(a, b) {
                return function(i) {
                    return i.subject.equals(a) && i.predicate.equals(b)
                }
            },
            so: function(a, b) {
                return function(i) {
                    return i.subject.equals(a) && i.object.equals(b)
                }
            },
            po: function(a, b) {
                return function(i) {
                    return i.predicate.equals(a) && i.object.equals(b)
                }
            },
            spo: function(a, b, i) {
                return function(h) {
                    return h.subject.equals(a) && h.predicate.equals(b) && h.object.equals(i)
                }
            },
            describes: function(a) {
                return function(b) {
                    return b.subject.equals(a) || b.object.equals(a)
                }
            },
            type: function(b) {
                var d = a.resolve("rdf:type");
                return function(a) {
                    return a.predicate.equals(d) && a.object.equals(b)
                }
            }
        };
        for (var b in r.defaultContext)
            this.prefixes.set(b, r.defaultContext[b])
    }
    ;
    s["extends"](r.Profile, r.RDFEnvironment);
    r.RDFEnvironment.prototype.createBlankNode = function() {
        var a = new r.BlankNode(this.blankNodeCounter);
        this.blankNodeCounter++;
        return a
    }
    ;
    r.RDFEnvironment.prototype.createNamedNode = function(a) {
        var b = this.resolve(a);
        return b != null ? new r.NamedNode(b) : new r.NamedNode(a)
    }
    ;
    r.RDFEnvironment.prototype.createLiteral = function(a, b, e) {
        return e != null ? new r.Literal(a,b,e.toString()) : new r.Literal(a,b,e)
    }
    ;
    r.RDFEnvironment.prototype.createTriple = function(a, b, e) {
        return new r.Triple(a,b,e)
    }
    ;
    r.RDFEnvironment.prototype.createGraph = function(a) {
        var b = new r.Graph;
        if (a != null)
            for (var e = 0; e < a.length; e++)
                b.add(a[e]);
        return b
    }
    ;
    r.RDFEnvironment.prototype.createAction = function(a, b) {
        return function(e) {
            return a(e) ? b(e) : e
        }
    }
    ;
    r.RDFEnvironment.prototype.createProfile = function(a) {
        return a === !0 ? new r.RDFEnvironment.Profile : (a = new r.RDFEnvironment.Profile,
        a.importProfile(this),
        a)
    }
    ;
    r.RDFEnvironment.prototype.createTermMap = function(a) {
        if (a === !0)
            return new r.UrisMap;
        else {
            var a = this.terms.values(), b = new r.UrisMap, e;
            for (e in a)
                b[e] = a[e];
            return b
        }
    }
    ;
    r.RDFEnvironment.prototype.createPrefixMap = function(a) {
        if (a === !0)
            return new r.UrisMap;
        else {
            var a = this.prefixes.values(), b = new r.UrisMap, e;
            for (e in a)
                b[e] = a[e];
            return b
        }
    }
    ;
    r.RDFNode = function(a) {
        this.interfaceName = a;
        this.attributes = ["interfaceName", "nominalValue"]
    }
    ;
    r.RDFNode.prototype.equals = function(a) {
        if (a.interfaceName == null)
            return this.valueOf() == a;
        else {
            for (var b in this.attributes) {
                var e = this.attributes[b];
                if (this[e] != a[e])
                    return !1
            }
            return !0
        }
    }
    ;
    r.BlankNode = function(a) {
        r.RDFNode.call(this, "BlankNode");
        this.nominalValue = "_:" + a;
        this.bnodeId = a
    }
    ;
    s["extends"](r.RDFNode, r.BlankNode);
    r.BlankNode.prototype.toString = function() {
        return this.nominalValue
    }
    ;
    r.BlankNode.prototype.toNT = function() {
        return this.nominalValue
    }
    ;
    r.BlankNode.prototype.valueOf = function() {
        return this.nominalValue
    }
    ;
    r.Literal = function(a, b, e) {
        r.RDFNode.call(this, "Literal");
        this.nominalValue = a;
        if (b != null)
            this.language = b;
        else if (e != null)
            this.datatype = e
    }
    ;
    s["extends"](r.RDFNode, r.Literal);
    r.Literal.prototype.toString = function() {
        var a = '"' + this.nominalValue + '"';
        if (this.language != null)
            a = a + "@" + this.language;
        else if (this.datatype != null || this.type)
            a = a + "^^<" + (this.datatype || this.type) + ">";
        return a
    }
    ;
    r.Literal.prototype.toNT = function() {
        return this.toString()
    }
    ;
    r.Literal.prototype.valueOf = function() {
        return g.effectiveTypeValue({
            token: "literal",
            type: this.type || this.datatype,
            value: this.nominalValue,
            language: this.language
        })
    }
    ;
    r.NamedNode = function(a) {
        r.RDFNode.call(this, "NamedNode");
        this.nominalValue = a.value != null ? a.value : a
    }
    ;
    s["extends"](r.RDFNode, r.NamedNode);
    r.NamedNode.prototype.toString = function() {
        return this.nominalValue
    }
    ;
    r.NamedNode.prototype.toNT = function() {
        return "<" + this.toString() + ">"
    }
    ;
    r.NamedNode.prototype.valueOf = function() {
        return this.nominalValue
    }
    ;
    r.Triple = function(a, b, e) {
        this.subject = a;
        this.predicate = b;
        this.object = e
    }
    ;
    r.Triple.prototype.equals = function(a) {
        return this.subject.equals(a.subject) && this.predicate.equals(a.predicate) && this.object.equals(a.object)
    }
    ;
    r.Triple.prototype.toString = function() {
        return this.subject.toNT() + " " + this.predicate.toNT() + " " + this.object.toNT() + " . \r\n"
    }
    ;
    r.Graph = function() {
        this.triples = [];
        this.duplicates = {};
        this.actions = [];
        this.length = 0
    }
    ;
    r.Graph.prototype.add = function(a) {
        for (var b = 0; b < this.actions.length; b++)
            a = this.actions[b](a);
        b = a.subject.toString() + a.predicate.toString() + a.object.toString();
        this.duplicates[b] || (this.duplicates[b] = !0,
        this.triples.push(a));
        this.length = this.triples.length;
        return this
    }
    ;
    r.Graph.prototype.addAction = function(a, b) {
        this.actions.push(a);
        if (b == !0)
            for (var e = 0; e < this.triples.length; e++)
                this.triples[e] = a(this.triples[e]);
        return this
    }
    ;
    r.Graph.prototype.addAll = function(a) {
        for (var a = a.toArray(), b = 0; b < a.length; b++)
            this.add(a[b]);
        this.length = this.triples.length;
        return this
    }
    ;
    r.Graph.prototype.remove = function(a) {
        for (var b = null, e = 0; e < this.triples.length; e++)
            if (this.triples[e].equals(a)) {
                delete this.duplicates[a.subject.toString() + a.predicate.toString() + a.object.toString()];
                b = e;
                break
            }
        b != null && this.triples.splice(b, 1);
        this.length = this.triples.length;
        return this
    }
    ;
    r.Graph.prototype.toArray = function() {
        return this.triples
    }
    ;
    r.Graph.prototype.some = function(a) {
        for (var b = 0; b < this.triples.length; b++)
            if (a(this.triples[b], this) === !0)
                return !0;
        return !1
    }
    ;
    r.Graph.prototype.every = function(a) {
        for (var b = 0; b < this.triples.length; b++)
            if (a(this.triples[b], this) === !1)
                return !1;
        return !0
    }
    ;
    r.Graph.prototype.filter = function(a) {
        for (var b = new r.Graph, e = 0; e < this.triples.length; e++)
            a(this.triples[e], this) === !0 && b.add(this.triples[e]);
        return b
    }
    ;
    r.Graph.prototype.forEach = function(a) {
        for (var b = 0; b < this.triples.length; b++)
            a(this.triples[b], this)
    }
    ;
    r.Graph.prototype.merge = function() {
        for (var a = new r.Graph, b = 0; b < this.triples.length; b++)
            a.add(this.triples[b]);
        return a
    }
    ;
    r.Graph.prototype.match = function(a, b, e, d) {
        for (var i = new r.Graph, h = 0, f = 0; f < this.triples.length; f++) {
            var g = this.triples[f];
            if (a == null || g.subject.equals(a))
                if (b == null || g.predicate.equals(b))
                    if (e == null || g.object.equals(e))
                        if (d == null || h < d)
                            h++,
                            i.add(g);
                        else
                            break
        }
        return i
    }
    ;
    r.Graph.prototype.removeMatches = function(a, b, e) {
        for (var d = [], i = 0; i < this.triples.length; i++) {
            var h = this.triples[i];
            if (a == null || h.subject.equals(a))
                if (b == null || h.predicate.equals(b))
                    (e == null || h.object.equals(e)) && d.push(h)
        }
        for (i = 0; i < d.length; i++)
            this.remove(d[i]);
        return this
    }
    ;
    r.Graph.prototype.toNT = function() {
        var a = "";
        this.forEach(function(b) {
            a += b.toString()
        });
        return a
    }
    ;
    r.buildRDFResource = function(a, b, e, d) {
        return a.token === "blank" ? r.buildBlankNode(a, b, e, d) : a.token === "literal" ? r.buildLiteral(a, b, e, d) : a.token === "uri" ? r.buildNamedNode(a, b, e, d) : a.token === "var" ? (a = b[a.value],
        a != null ? r.buildRDFResource(a, b, e, d) : null) : null
    }
    ;
    r.buildBlankNode = function(a) {
        if (a.valuetmp != null)
            a.value = a.valuetmp;
        if (a.value.indexOf("_:") === 0)
            a.value = a.value.split("_:")[1];
        return new r.BlankNode(a.value)
    }
    ;
    r.buildLiteral = function(a) {
        return new r.Literal(a.value,a.lang,a.type)
    }
    ;
    r.buildNamedNode = function(a, b, e, d) {
        if (a.value == null && a.prefix != null)
            b = e.resolveNsInEnvironment(a.prefix, d),
            a.value = b + a.suffix;
        return new r.NamedNode(a)
    }
    ;
    r.rdf = new r.RDFEnvironment;
    var g = {
        checkFilters: function(a, b, e, d, i, h) {
            var f = a.filter
              , m = [];
            if (f == null || a.length != null)
                return b;
            for (a = 0; a < f.length; a++) {
                for (var b = g.run(f[a].value, b, e, d, i, h), n = [], q = 0; q < b.length; q++)
                    b[q].__nullify__ != null ? m.push(b[q]) : n.push(b[q]);
                b = n
            }
            return b.concat(m)
        }
    };
    g.boundVars = function(a) {
        if (a.expressionType != null) {
            var b = a.expressionType;
            if (b == "relationalexpression")
                return b = a.op2,
                g.boundVars(a.op1) + g.boundVars(b);
            else if (b == "conditionalor" || b == "conditionaland") {
                for (var e = [], b = 0; b < a.operands; b++)
                    e = e.concat(g.boundVars(a.operands[b]));
                return e
            } else if (b == "builtincall")
                if (a.args == null)
                    return [];
                else {
                    e = [];
                    for (b = 0; b < a.args.length; b++)
                        e = e.concat(g.boundVars(a.args[b]));
                    return e
                }
            else if (b == "multiplicativeexpression") {
                e = g.boundVars(a.factor);
                for (b = 0; b < a.factors.length; b++)
                    e = e.concat(g.boundVars(a.factors[b].expression));
                return e
            } else if (b == "additiveexpression") {
                e = g.boundVars(a.summand);
                for (b = 0; b < a.summands.length; b++)
                    e = e.concat(g.boundVars(a.summands[b].expression));
                return e
            } else if (b == "regex")
                return e = g.boundVars(a.expression1),
                e.concat(g.boundVars(a.expression2));
            else if (b == "unaryexpression")
                return g.boundVars(a.expression);
            else if (b == "atomic")
                return a.primaryexpression == "var" ? [a.value] : []
        } else
            throw console.log("ERROR"),
            console.log(a),
            "Cannot find bound expressions in a no expression token";
    }
    ;
    g.run = function(a, b, e, d, i, h) {
        for (var f = h.copyDenormalizedBindings(b, i.outCache), m = [], n = 0; n < b.length; n++) {
            var q = g.runFilter(a, f[n], h, d, i)
              , q = g.ebv(q);
            g.isEbvError(q) ? e && (q = {
                __nullify__: !0,
                bindings: b[n]
            },
            m.push(q)) : q === !0 ? m.push(b[n]) : e && (q = {
                __nullify__: !0,
                bindings: b[n]
            },
            m.push(q))
        }
        return m
    }
    ;
    g.collect = function(a, b, e, d, i) {
        for (var h = i.copyDenormalizedBindings(b, d.outCache), f = [], m = 0; m < h.length; m++) {
            var n = g.runFilter(a, h[m], i, e, d);
            f.push({
                binding: b[m],
                value: n
            })
        }
        return f
    }
    ;
    g.runDistinct = function() {}
    ;
    g.runAggregator = function(a, b, e, d, i) {
        if (b == null || b.length === 0)
            return g.ebvError();
        else if (a.token === "variable" && a.kind == "var")
            return b[0][a.value.value];
        else if (a.token === "variable" && a.kind === "aliased")
            if (a.expression.expressionType === "atomic" && a.expression.primaryexpression === "var")
                return b[0][a.expression.value.value];
            else if (a.expression.expressionType === "aggregate")
                if (a.expression.aggregateType === "max") {
                    for (var h = null, f = 0; f < b.length; f++) {
                        var m = b[f]
                          , m = g.runFilter(a.expression.expression, m, e, d, i);
                        g.isEbvError(m) || (h === null ? h = m : g.runLtFunction(h, m).value === !0 && (h = m))
                    }
                    return h === null ? g.ebvError() : h
                } else if (a.expression.aggregateType === "min") {
                    h = null;
                    for (f = 0; f < b.length; f++)
                        m = b[f],
                        m = g.runFilter(a.expression.expression, m, e, d, i),
                        g.isEbvError(m) || (h === null ? h = m : g.runGtFunction(h, m).value === !0 && (h = m));
                    return h === null ? g.ebvError() : h
                } else if (a.expression.aggregateType === "count") {
                    var h = {}
                      , n = 0;
                    if (a.expression.expression === "*")
                        if (a.expression.distinct != null && a.expression.distinct != "")
                            for (f = 0; f < b.length; f++) {
                                var m = b[f]
                                  , q = s.hashTerm(m);
                                h[q] == null && (h[q] = !0,
                                n++)
                            }
                        else
                            n = b.length;
                    else
                        for (f = 0; f < b.length; f++)
                            m = b[f],
                            m = g.runFilter(a.expression.expression, m, e, d, i),
                            g.isEbvError(m) || (a.expression.distinct != null && a.expression.distinct != "" ? (q = s.hashTerm(m),
                            h[q] == null && (h[q] = !0,
                            n++)) : n++);
                    return {
                        token: "literal",
                        type: "http://www.w3.org/2001/XMLSchema#integer",
                        value: "" + n
                    }
                } else if (a.expression.aggregateType === "avg") {
                    for (var h = {}, o = {
                        token: "literal",
                        type: "http://www.w3.org/2001/XMLSchema#integer",
                        value: "0"
                    }, f = n = 0; f < b.length; f++)
                        m = b[f],
                        m = g.runFilter(a.expression.expression, m, e, d, i),
                        g.isEbvError(m) || (a.expression.distinct != null && a.expression.distinct != "" ? (q = s.hashTerm(m),
                        h[q] == null && (h[q] = !0,
                        g.isNumeric(m) && (o = g.runSumFunction(o, m),
                        n++))) : g.isNumeric(m) && (o = g.runSumFunction(o, m),
                        n++));
                    a = g.runDivFunction(o, {
                        token: "literal",
                        type: "http://www.w3.org/2001/XMLSchema#integer",
                        value: "" + n
                    });
                    a.value = "" + a.value;
                    return a
                } else if (a.expression.aggregateType === "sum") {
                    h = {};
                    o = {
                        token: "literal",
                        type: "http://www.w3.org/2001/XMLSchema#integer",
                        value: "0"
                    };
                    for (f = 0; f < b.length; f++)
                        m = b[f],
                        m = g.runFilter(a.expression.expression, m, e, d, i),
                        g.isEbvError(m) || (a.expression.distinct != null && a.expression.distinct != "" ? (q = s.hashTerm(m),
                        h[q] == null && (h[q] = !0,
                        g.isNumeric(m) && (o = g.runSumFunction(o, m)))) : g.isNumeric(m) && (o = g.runSumFunction(o, m)));
                    o.value = "" + o.value;
                    return o
                } else
                    return m = g.runFilter(aggregate.expression, b[0], d, {
                        blanks: {},
                        outCache: {}
                    })
    }
    ;
    g.runFilter = function(a, b, e, d, i) {
        if (a.expressionType != null) {
            var h = a.expressionType;
            if (h == "relationalexpression") {
                var h = g.runFilter(a.op1, b, e, d, i)
                  , f = g.runFilter(a.op2, b, e, d, i);
                return g.runRelationalFilter(a, h, f, b, e, d, i)
            } else if (h == "conditionalor")
                return g.runOrFunction(a, b, e, d, i);
            else if (h == "conditionaland")
                return g.runAndFunction(a, b, e, d, i);
            else if (h == "additiveexpression")
                return g.runAddition(a.summand, a.summands, b, e, d, i);
            else if (h == "builtincall")
                return g.runBuiltInCall(a.builtincall, a.args, b, e, d, i);
            else if (h == "multiplicativeexpression")
                return g.runMultiplication(a.factor, a.factors, b, e, d, i);
            else if (h == "unaryexpression")
                return g.runUnaryExpression(a.unaryexpression, a.expression, b, e, d, i);
            else if (h == "irireforfunction")
                return g.runIriRefOrFunction(a.iriref, a.args, b, e, d, i);
            else if (h == "regex")
                return g.runRegex(a.text, a.pattern, a.flags, b, e, d, i);
            else if (h == "custom")
                return g.runBuiltInCall(a.name, a.args, b, e, d, i);
            else if (h == "atomic")
                if (a.primaryexpression == "var")
                    return b[a.value.value];
                else {
                    if (typeof a.value == "object" && !(a.value.type == null || typeof a.value.type != "object"))
                        a.value.type = s.lexicalFormBaseUri(a.value.type, i);
                    return a.value
                }
            else
                throw "Unknown filter expression type";
        } else
            throw "Cannot find bound expressions in a no expression token";
    }
    ;
    g.isRDFTerm = function(a) {
        return a == null ? !1 : a.token && a.token == "literal" || a.token && a.token == "uri" || a.token && a.token == "blank" ? !0 : !1
    }
    ;
    g.RDFTermEquality = function(a, b, e, d) {
        return a.token === "literal" && b.token === "literal" ? a.lang == b.lang && a.type == b.type && a.value == b.value ? !0 : a.type != null && b.type != null ? g.ebvError() : g.isSimpleLiteral(a) && b.type != null ? g.ebvError() : g.isSimpleLiteral(b) && a.type != null ? g.ebvError() : !1 : a.token === "uri" && b.token === "uri" ? s.lexicalFormBaseUri(a, d) == s.lexicalFormBaseUri(b, d) : a.token === "blank" && b.token === "blank" ? a.value == b.value : !1
    }
    ;
    g.isInteger = function(a) {
        return a == null ? !1 : a.token === "literal" ? a.type == "http://www.w3.org/2001/XMLSchema#integer" || a.type == "http://www.w3.org/2001/XMLSchema#decimal" || a.type == "http://www.w3.org/2001/XMLSchema#double" || a.type == "http://www.w3.org/2001/XMLSchema#nonPositiveInteger" || a.type == "http://www.w3.org/2001/XMLSchema#negativeInteger" || a.type == "http://www.w3.org/2001/XMLSchema#long" || a.type == "http://www.w3.org/2001/XMLSchema#int" || a.type == "http://www.w3.org/2001/XMLSchema#short" || a.type == "http://www.w3.org/2001/XMLSchema#byte" || a.type == "http://www.w3.org/2001/XMLSchema#nonNegativeInteger" || a.type == "http://www.w3.org/2001/XMLSchema#unsignedLong" || a.type == "http://www.w3.org/2001/XMLSchema#unsignedInt" || a.type == "http://www.w3.org/2001/XMLSchema#unsignedShort" || a.type == "http://www.w3.org/2001/XMLSchema#unsignedByte" || a.type == "http://www.w3.org/2001/XMLSchema#positiveInteger" ? !0 : !1 : !1
    }
    ;
    g.isFloat = function(a) {
        return a == null ? !1 : a.token === "literal" ? a.type == "http://www.w3.org/2001/XMLSchema#float" ? !0 : !1 : !1
    }
    ;
    g.isDecimal = function(a) {
        return a == null ? !1 : a.token === "literal" ? a.type == "http://www.w3.org/2001/XMLSchema#decimal" ? !0 : !1 : !1
    }
    ;
    g.isDouble = function(a) {
        return a == null ? !1 : a.token === "literal" ? a.type == "http://www.w3.org/2001/XMLSchema#double" ? !0 : !1 : !1
    }
    ;
    g.isNumeric = function(a) {
        return a == null ? !1 : a.token === "literal" ? a.type == "http://www.w3.org/2001/XMLSchema#integer" || a.type == "http://www.w3.org/2001/XMLSchema#decimal" || a.type == "http://www.w3.org/2001/XMLSchema#float" || a.type == "http://www.w3.org/2001/XMLSchema#double" || a.type == "http://www.w3.org/2001/XMLSchema#nonPositiveInteger" || a.type == "http://www.w3.org/2001/XMLSchema#negativeInteger" || a.type == "http://www.w3.org/2001/XMLSchema#long" || a.type == "http://www.w3.org/2001/XMLSchema#int" || a.type == "http://www.w3.org/2001/XMLSchema#short" || a.type == "http://www.w3.org/2001/XMLSchema#byte" || a.type == "http://www.w3.org/2001/XMLSchema#nonNegativeInteger" || a.type == "http://www.w3.org/2001/XMLSchema#unsignedLong" || a.type == "http://www.w3.org/2001/XMLSchema#unsignedInt" || a.type == "http://www.w3.org/2001/XMLSchema#unsignedShort" || a.type == "http://www.w3.org/2001/XMLSchema#unsignedByte" || a.type == "http://www.w3.org/2001/XMLSchema#positiveInteger" ? !0 : !1 : !1
    }
    ;
    g.isSimpleLiteral = function(a) {
        return a && a.token == "literal" ? a.type == null && a.lang == null ? !0 : !1 : !1
    }
    ;
    g.isXsdType = function(a, b) {
        return b && b.token == "literal" ? b.type == "http://www.w3.org/2001/XMLSchema#" + a : !1
    }
    ;
    g.ebv = function(a) {
        if (a == null || g.isEbvError(a))
            return g.ebvError();
        else if (a.token && a.token === "literal")
            if (a.type == "http://www.w3.org/2001/XMLSchema#integer" || a.type == "http://www.w3.org/2001/XMLSchema#decimal" || a.type == "http://www.w3.org/2001/XMLSchema#double" || a.type == "http://www.w3.org/2001/XMLSchema#nonPositiveInteger" || a.type == "http://www.w3.org/2001/XMLSchema#negativeInteger" || a.type == "http://www.w3.org/2001/XMLSchema#long" || a.type == "http://www.w3.org/2001/XMLSchema#int" || a.type == "http://www.w3.org/2001/XMLSchema#short" || a.type == "http://www.w3.org/2001/XMLSchema#byte" || a.type == "http://www.w3.org/2001/XMLSchema#nonNegativeInteger" || a.type == "http://www.w3.org/2001/XMLSchema#unsignedLong" || a.type == "http://www.w3.org/2001/XMLSchema#unsignedInt" || a.type == "http://www.w3.org/2001/XMLSchema#unsignedShort" || a.type == "http://www.w3.org/2001/XMLSchema#unsignedByte" || a.type == "http://www.w3.org/2001/XMLSchema#positiveInteger") {
                var b = parseFloat(a.value);
                return isNaN(b) ? !1 : parseFloat(a.value) != 0
            } else
                return a.type === "http://www.w3.org/2001/XMLSchema#boolean" ? a.value === "true" || a.value === !0 || a.value === "True" : a.type === "http://www.w3.org/2001/XMLSchema#string" ? a.value != "" : a.type === "http://www.w3.org/2001/XMLSchema#dateTime" ? new Date(a.value) != null : g.isEbvError(a) ? a : a.type == null ? a.value != "" ? !0 : !1 : g.ebvError();
        else
            return a.value === !0
    }
    ;
    g.effectiveBooleanValue = g.ebv;
    g.ebvTrue = function() {
        return {
            token: "literal",
            type: "http://www.w3.org/2001/XMLSchema#boolean",
            value: !0
        }
    }
    ;
    g.ebvFalse = function() {
        return {
            token: "literal",
            type: "http://www.w3.org/2001/XMLSchema#boolean",
            value: !1
        }
    }
    ;
    g.ebvError = function() {
        return {
            token: "literal",
            type: "https://github.com/antoniogarrote/js-tools/types#error",
            value: null
        }
    }
    ;
    g.isEbvError = function(a) {
        return typeof a == "object" && a != null ? a.type === "https://github.com/antoniogarrote/js-tools/types#error" : !1
    }
    ;
    g.ebvBoolean = function(a) {
        return g.isEbvError(a) ? a : a === !0 ? g.ebvTrue() : g.ebvFalse()
    }
    ;
    g.runRelationalFilter = function(a, b, e, d, i, h, f) {
        a = a.operator;
        if (a === "=")
            return g.runEqualityFunction(b, e, d, i, h, f);
        else if (a === "!=") {
            b = g.runEqualityFunction(b, e, d, i, h, f);
            if (!g.isEbvError(b))
                b.value = !b.value;
            return b
        } else if (a === "<")
            return g.runLtFunction(b, e, d);
        else if (a === ">")
            return g.runGtFunction(b, e, d);
        else if (a === "<=")
            return g.runLtEqFunction(b, e, d);
        else if (a === ">=")
            return g.runGtEqFunction(b, e, d);
        else
            throw "Error applying relational filter, unknown operator";
    }
    ;
    g.effectiveTypeValue = function(a) {
        if (a.token == "literal")
            if (a.type == "http://www.w3.org/2001/XMLSchema#integer")
                return a = parseInt(a.value);
            else if (a.type == "http://www.w3.org/2001/XMLSchema#decimal")
                return a = parseFloat(a.value);
            else if (a.type == "http://www.w3.org/2001/XMLSchema#float")
                return a = parseFloat(a.value);
            else if (a.type == "http://www.w3.org/2001/XMLSchema#double")
                return a = parseFloat(a.value);
            else if (a.type == "http://www.w3.org/2001/XMLSchema#nonPositiveInteger")
                return a = parseFloat(a.value);
            else if (a.type == "http://www.w3.org/2001/XMLSchema#negativeInteger")
                return a = parseInt(a.value);
            else if (a.type == "http://www.w3.org/2001/XMLSchema#long")
                return a = parseInt(a.value);
            else if (a.type == "http://www.w3.org/2001/XMLSchema#int")
                return a = parseInt(a.value);
            else if (a.type == "http://www.w3.org/2001/XMLSchema#short")
                return a = parseInt(a.value);
            else if (a.type == "http://www.w3.org/2001/XMLSchema#byte")
                return a = parseInt(a.value);
            else if (a.type == "http://www.w3.org/2001/XMLSchema#nonNegativeInteger")
                return a = parseInt(a.value);
            else if (a.type == "http://www.w3.org/2001/XMLSchema#unsignedLong")
                return a = parseInt(a.value);
            else if (a.type == "http://www.w3.org/2001/XMLSchema#unsignedInt")
                return a = parseInt(a.value);
            else if (a.type == "http://www.w3.org/2001/XMLSchema#unsignedShort")
                return a = parseInt(a.value);
            else if (a.type == "http://www.w3.org/2001/XMLSchema#unsignedByte")
                return a = parseInt(a.value);
            else if (a.type == "http://www.w3.org/2001/XMLSchema#positiveInteger")
                return a = parseInt(a.value);
            else if (a.type == "http://www.w3.org/2001/XMLSchema#date" || a.type == "http://www.w3.org/2001/XMLSchema#dateTime")
                try {
                    return s.parseISO8601(a.value)
                } catch (b) {
                    return null
                }
            else
                return a.type == "http://www.w3.org/2001/XMLSchema#boolean" ? a.value === !0 || a.value === "true" || a.value === "1" || a.value === 1 || a.value === !0 ? !0 : a.value === !1 || a.value === "false" || a.value === "0" || a.value === 0 || a.value === !1 ? !1 : void 0 : a.type == "http://www.w3.org/2001/XMLSchema#string" ? a.value === null || a.value === void 0 ? void 0 : "" + a.value : a.value;
        else
            throw console.log("not implemented yet"),
            console.log(a),
            "value not supported in operations yet";
    }
    ;
    g.runOrFunction = function(a, b, e, d, i) {
        for (var h = null, f = 0; f < a.operands.length; f++) {
            var m = g.runFilter(a.operands[f], b, e, d, i);
            g.isEbvError(m) == !1 && (m = g.ebv(m));
            h == null ? h = m : g.isEbvError(m) ? h = g.isEbvError(h) ? g.ebvError() : h === !0 ? !0 : g.ebvError() : m === !0 ? h = !0 : g.isEbvError(h) && (h = g.ebvError())
        }
        return g.ebvBoolean(h)
    }
    ;
    g.runAndFunction = function(a, b, e, d, i) {
        for (var h = null, f = 0; f < a.operands.length; f++) {
            var m = g.runFilter(a.operands[f], b, e, d, i);
            g.isEbvError(m) == !1 && (m = g.ebv(m));
            h == null ? h = m : g.isEbvError(m) ? h = g.isEbvError(h) ? g.ebvError() : h === !0 ? g.ebvError() : !1 : m === !0 ? g.isEbvError(h) && (h = g.ebvError()) : h = !1
        }
        return g.ebvBoolean(h)
    }
    ;
    g.runEqualityFunction = function(a, b, e, d, i, h) {
        if (g.isEbvError(a) || g.isEbvError(b))
            return g.ebvError();
        if (g.isNumeric(a) && g.isNumeric(b))
            return e = g.effectiveTypeValue(a),
            i = g.effectiveTypeValue(b),
            isNaN(e) || isNaN(i) ? g.ebvBoolean(g.RDFTermEquality(a, b, d, h)) : g.ebvBoolean(e == i);
        else if ((g.isSimpleLiteral(a) || g.isXsdType("string", a)) && (g.isSimpleLiteral(b) || g.isXsdType("string", b)))
            return g.ebvBoolean(g.effectiveTypeValue(a) == g.effectiveTypeValue(b));
        else if (g.isXsdType("boolean", a) && g.isXsdType("boolean", b))
            return g.ebvBoolean(g.effectiveTypeValue(a) == g.effectiveTypeValue(b));
        else if ((g.isXsdType("dateTime", a) || g.isXsdType("date", a)) && (g.isXsdType("dateTime", b) || g.isXsdType("date", b))) {
            if (g.isXsdType("dateTime", a) && g.isXsdType("date", b))
                return g.ebvFalse();
            if (g.isXsdType("date", a) && g.isXsdType("dateTime", b))
                return g.ebvFalse();
            a = s.compareDateComponents(a.value, b.value);
            return a != null ? a == 0 ? g.ebvTrue() : g.ebvFalse() : g.ebvError()
        } else
            return g.isRDFTerm(a) && g.isRDFTerm(b) ? g.ebvBoolean(g.RDFTermEquality(a, b, d, h)) : g.ebvFalse()
    }
    ;
    g.runGtFunction = function(a, b) {
        if (g.isEbvError(a) || g.isEbvError(b))
            return g.ebvError();
        if (g.isNumeric(a) && g.isNumeric(b))
            return g.ebvBoolean(g.effectiveTypeValue(a) > g.effectiveTypeValue(b));
        else if (g.isSimpleLiteral(a) && g.isSimpleLiteral(b))
            return g.ebvBoolean(g.effectiveTypeValue(a) > g.effectiveTypeValue(b));
        else if (g.isXsdType("string", a) && g.isXsdType("string", b))
            return g.ebvBoolean(g.effectiveTypeValue(a) > g.effectiveTypeValue(b));
        else if (g.isXsdType("boolean", a) && g.isXsdType("boolean", b))
            return g.ebvBoolean(g.effectiveTypeValue(a) > g.effectiveTypeValue(b));
        else if ((g.isXsdType("dateTime", a) || g.isXsdType("date", a)) && (g.isXsdType("dateTime", b) || g.isXsdType("date", b))) {
            if (g.isXsdType("dateTime", a) && g.isXsdType("date", b))
                return g.ebvFalse();
            if (g.isXsdType("date", a) && g.isXsdType("dateTime", b))
                return g.ebvFalse();
            var e = s.compareDateComponents(a.value, b.value);
            return e != null ? e == 1 ? g.ebvTrue() : g.ebvFalse() : g.ebvError()
        } else
            return g.ebvFalse()
    }
    ;
    g.runTotalGtFunction = function(a, b) {
        return g.isEbvError(a) || g.isEbvError(b) ? g.ebvError() : g.isNumeric(a) && g.isNumeric(b) || g.isSimpleLiteral(a) && g.isSimpleLiteral(b) || g.isXsdType("string", a) && g.isSimpleLiteral("string", b) || g.isXsdType("boolean", a) && g.isSimpleLiteral("boolean", b) || g.isXsdType("dateTime", a) && g.isSimpleLiteral("dateTime", b) ? g.runGtFunction(a, b, []) : a.token && a.token === "uri" && b.token && b.token === "uri" ? g.ebvBoolean(a.value > b.value) : a.token && a.token === "literal" && b.token && b.token === "literal" ? g.ebvBoolean("" + a.value + a.type + a.lang > "" + b.value + b.type + b.lang) : a.token && a.token === "blank" && b.token && b.token === "blank" ? g.ebvBoolean(a.value > b.value) : a.value && b.value ? g.ebvBoolean(a.value > b.value) : g.ebvTrue()
    }
    ;
    g.runLtFunction = function(a, b) {
        if (g.isEbvError(a) || g.isEbvError(b))
            return g.ebvError();
        if (g.isNumeric(a) && g.isNumeric(b))
            return g.ebvBoolean(g.effectiveTypeValue(a) < g.effectiveTypeValue(b));
        else if (g.isSimpleLiteral(a) && g.isSimpleLiteral(b))
            return g.ebvBoolean(g.effectiveTypeValue(a) < g.effectiveTypeValue(b));
        else if (g.isXsdType("string", a) && g.isXsdType("string", b))
            return g.ebvBoolean(g.effectiveTypeValue(a) < g.effectiveTypeValue(b));
        else if (g.isXsdType("boolean", a) && g.isXsdType("boolean", b))
            return g.ebvBoolean(g.effectiveTypeValue(a) < g.effectiveTypeValue(b));
        else if ((g.isXsdType("dateTime", a) || g.isXsdType("date", a)) && (g.isXsdType("dateTime", b) || g.isXsdType("date", b))) {
            if (g.isXsdType("dateTime", a) && g.isXsdType("date", b))
                return g.ebvFalse();
            if (g.isXsdType("date", a) && g.isXsdType("dateTime", b))
                return g.ebvFalse();
            var e = s.compareDateComponents(a.value, b.value);
            return e != null ? e == -1 ? g.ebvTrue() : g.ebvFalse() : g.ebvError()
        } else
            return g.ebvFalse()
    }
    ;
    g.runGtEqFunction = function(a, b) {
        if (g.isEbvError(a) || g.isEbvError(b))
            return g.ebvError();
        if (g.isNumeric(a) && g.isNumeric(b))
            return g.ebvBoolean(g.effectiveTypeValue(a) >= g.effectiveTypeValue(b));
        else if (g.isSimpleLiteral(a) && g.isSimpleLiteral(b))
            return g.ebvBoolean(g.effectiveTypeValue(a) >= g.effectiveTypeValue(b));
        else if (g.isXsdType("string", a) && g.isXsdType("string", b))
            return g.ebvBoolean(g.effectiveTypeValue(a) >= g.effectiveTypeValue(b));
        else if (g.isXsdType("boolean", a) && g.isXsdType("boolean", b))
            return g.ebvBoolean(g.effectiveTypeValue(a) >= g.effectiveTypeValue(b));
        else if ((g.isXsdType("dateTime", a) || g.isXsdType("date", a)) && (g.isXsdType("dateTime", b) || g.isXsdType("date", b))) {
            if (g.isXsdType("dateTime", a) && g.isXsdType("date", b))
                return g.ebvFalse();
            if (g.isXsdType("date", a) && g.isXsdType("dateTime", b))
                return g.ebvFalse();
            var e = s.compareDateComponents(a.value, b.value);
            return e != null ? e != -1 ? g.ebvTrue() : g.ebvFalse() : g.ebvError()
        } else
            return g.ebvFalse()
    }
    ;
    g.runLtEqFunction = function(a, b) {
        if (g.isEbvError(a) || g.isEbvError(b))
            return g.ebvError();
        if (g.isNumeric(a) && g.isNumeric(b))
            return g.ebvBoolean(g.effectiveTypeValue(a) <= g.effectiveTypeValue(b));
        else if (g.isSimpleLiteral(a) && g.isSimpleLiteral(b))
            return g.ebvBoolean(g.effectiveTypeValue(a) <= g.effectiveTypeValue(b));
        else if (g.isXsdType("string", a) && g.isXsdType("string", b))
            return g.ebvBoolean(g.effectiveTypeValue(a) <= g.effectiveTypeValue(b));
        else if (g.isXsdType("boolean", a) && g.isXsdType("boolean", b))
            return g.ebvBoolean(g.effectiveTypeValue(a) <= g.effectiveTypeValue(b));
        else if ((g.isXsdType("dateTime", a) || g.isXsdType("date", a)) && (g.isXsdType("dateTime", b) || g.isXsdType("date", b))) {
            if (g.isXsdType("dateTime", a) && g.isXsdType("date", b))
                return g.ebvFalse();
            if (g.isXsdType("date", a) && g.isXsdType("dateTime", b))
                return g.ebvFalse();
            var e = s.compareDateComponents(a.value, b.value);
            return e != null ? e != 1 ? g.ebvTrue() : g.ebvFalse() : g.ebvError()
        } else
            return g.ebvFalse()
    }
    ;
    g.runAddition = function(a, b, e, d, i, h) {
        var f = g.runFilter(a, e, d, i, h);
        if (g.isEbvError(f))
            return g.ebvError();
        a = f;
        if (g.isNumeric(f)) {
            for (f = 0; f < b.length; f++) {
                var m = g.runFilter(b[f].expression, e, d, i, h);
                if (g.isNumeric(m))
                    b[f].operator === "+" ? a = g.runSumFunction(a, m) : b[f].operator === "-" && (a = g.runSubFunction(a, m));
                else
                    return g.ebvFalse()
            }
            return a
        } else
            return g.ebvFalse()
    }
    ;
    g.runSumFunction = function(a, b) {
        if (g.isEbvError(a) || g.isEbvError(b))
            return g.ebvError();
        var e = g.effectiveTypeValue(a) + g.effectiveTypeValue(b);
        return g.isDouble(a) || g.isDouble(b) ? {
            token: "literal",
            type: "http://www.w3.org/2001/XMLSchema#double",
            value: e
        } : g.isFloat(a) || g.isFloat(b) ? {
            token: "literal",
            type: "http://www.w3.org/2001/XMLSchema#float",
            value: e
        } : g.isDecimal(a) || g.isDecimal(b) ? {
            token: "literal",
            type: "http://www.w3.org/2001/XMLSchema#decimal",
            value: e
        } : {
            token: "literal",
            type: "http://www.w3.org/2001/XMLSchema#integer",
            value: e
        }
    }
    ;
    g.runSubFunction = function(a, b) {
        if (g.isEbvError(a) || g.isEbvError(b))
            return g.ebvError();
        var e = g.effectiveTypeValue(a) - g.effectiveTypeValue(b);
        return g.isDouble(a) || g.isDouble(b) ? {
            token: "literal",
            type: "http://www.w3.org/2001/XMLSchema#double",
            value: e
        } : g.isFloat(a) || g.isFloat(b) ? {
            token: "literal",
            type: "http://www.w3.org/2001/XMLSchema#float",
            value: e
        } : g.isDecimal(a) || g.isDecimal(b) ? {
            token: "literal",
            type: "http://www.w3.org/2001/XMLSchema#decimal",
            value: e
        } : {
            token: "literal",
            type: "http://www.w3.org/2001/XMLSchema#integer",
            value: e
        }
    }
    ;
    g.runMultiplication = function(a, b, e, d, i, h) {
        a = g.runFilter(a, e, d, i, h);
        if (g.isEbvError(a))
            return a;
        var f = a;
        if (g.isNumeric(a)) {
            for (var m = 0; m < b.length; m++) {
                var n = g.runFilter(b[m].expression, e, d, i, h);
                if (g.isEbvError(n))
                    return a;
                if (g.isNumeric(n))
                    b[m].operator === "*" ? f = g.runMulFunction(f, n) : b[m].operator === "/" && (f = g.runDivFunction(f, n));
                else
                    return g.ebvFalse()
            }
            return f
        } else
            return g.ebvFalse()
    }
    ;
    g.runMulFunction = function(a, b) {
        if (g.isEbvError(a) || g.isEbvError(b))
            return g.ebvError();
        var e = g.effectiveTypeValue(a) * g.effectiveTypeValue(b);
        return g.isDouble(a) || g.isDouble(b) ? {
            token: "literal",
            type: "http://www.w3.org/2001/XMLSchema#double",
            value: e
        } : g.isFloat(a) || g.isFloat(b) ? {
            token: "literal",
            type: "http://www.w3.org/2001/XMLSchema#float",
            value: e
        } : g.isDecimal(a) || g.isDecimal(b) ? {
            token: "literal",
            type: "http://www.w3.org/2001/XMLSchema#decimal",
            value: e
        } : {
            token: "literal",
            type: "http://www.w3.org/2001/XMLSchema#integer",
            value: e
        }
    }
    ;
    g.runDivFunction = function(a, b) {
        if (g.isEbvError(a) || g.isEbvError(b))
            return g.ebvError();
        var e = g.effectiveTypeValue(a) / g.effectiveTypeValue(b);
        return g.isDouble(a) || g.isDouble(b) ? {
            token: "literal",
            type: "http://www.w3.org/2001/XMLSchema#double",
            value: e
        } : g.isFloat(a) || g.isFloat(b) ? {
            token: "literal",
            type: "http://www.w3.org/2001/XMLSchema#float",
            value: e
        } : g.isDecimal(a) || g.isDecimal(b) ? {
            token: "literal",
            type: "http://www.w3.org/2001/XMLSchema#decimal",
            value: e
        } : {
            token: "literal",
            type: "http://www.w3.org/2001/XMLSchema#integer",
            value: e
        }
    }
    ;
    g.runBuiltInCall = function(a, b, e, d, i, h) {
        if (a === "notexists" || a === "exists") {
            var f = JSON.parse(JSON.stringify(b[0]))
              , f = d.abstractQueryTree.parseSelect({
                pattern: f
            }, e)
              , f = d.abstractQueryTree.bind(f.pattern, e)
              , e = d.executeSelectUnit([{
                kind: "*"
            }], i, f, h);
            return a === "exists" ? g.ebvBoolean(e.length !== 0) : g.ebvBoolean(e.length === 0)
        } else {
            for (var f = [], m = 0; m < b.length; m++)
                if (b[m].token === "var")
                    f.push(b[m]);
                else {
                    var n = g.runFilter(b[m], e, d, i, h);
                    if (g.isEbvError(n))
                        return n;
                    f.push(n)
                }
            if (a === "str")
                return f[0].token === "literal" ? {
                    token: "literal",
                    type: null,
                    value: "" + f[0].value
                } : f[0].token === "uri" ? {
                    token: "literal",
                    type: null,
                    value: f[0].value
                } : g.ebvFalse();
            else if (a === "lang")
                return f[0].token === "literal" ? f[0].lang != null ? {
                    token: "literal",
                    value: "" + f[0].lang
                } : {
                    token: "literal",
                    value: ""
                } : g.ebvError();
            else if (a === "datatype")
                return f[0].token === "literal" ? (a = f[0],
                a.type != null ? typeof a.type === "string" ? {
                    token: "uri",
                    value: a.type,
                    prefix: null,
                    suffix: null
                } : a.type : a.lang == null ? {
                    token: "uri",
                    value: "http://www.w3.org/2001/XMLSchema#string",
                    prefix: null,
                    suffix: null
                } : g.ebvError()) : g.ebvError();
            else if (a === "isliteral")
                return f[0].token === "literal" ? g.ebvTrue() : g.ebvFalse();
            else if (a === "isblank")
                return f[0].token === "blank" ? g.ebvTrue() : g.ebvFalse();
            else if (a === "isuri" || a === "isiri")
                return f[0].token === "uri" ? g.ebvTrue() : g.ebvFalse();
            else if (a === "sameterm")
                return a = g.RDFTermEquality(f[0], f[1], d, h),
                g.isEbvError(a) && (a = !1),
                g.ebvBoolean(a);
            else if (a === "langmatches")
                return a = f[0],
                e = f[1],
                a.token === "literal" && e.token === "literal" ? e.value === "*" && a.value != "" ? g.ebvTrue() : g.ebvBoolean(a.value.toLowerCase().indexOf(e.value.toLowerCase()) === 0) : g.ebvError();
            else if (a === "bound")
                return a = f[0].value,
                a == null ? g.ebvError() : e[a] != null ? g.ebvTrue() : g.ebvFalse();
            else if (d.customFns[a] != null)
                return d.customFns[a](g, f);
            else
                throw "Builtin call " + a + " not implemented yet";
        }
    }
    ;
    g.runUnaryExpression = function(a, b, e, d, i, h) {
        b = g.runFilter(b, e, d, i, h);
        if (g.isEbvError(b))
            return b;
        if (a === "!") {
            var f = g.ebv(b);
            return g.isEbvError(f) ? g.ebvFalse() : g.ebvBoolean(!f)
        } else if (a === "+")
            return g.isNumeric(b) ? b : g.ebvError();
        else if (a === "-")
            if (g.isNumeric(b)) {
                a = {};
                for (f in b)
                    a[f] = b[f];
                a.value = -a.value;
                return a
            } else
                return g.ebvError()
    }
    ;
    g.runRegex = function(a, b, e, d, i, h, f) {
        if (a != null)
            a = g.runFilter(a, d, i, h, f);
        else
            return g.ebvError();
        if (b != null)
            b = g.runFilter(b, d, i, h, f);
        else
            return g.ebvError();
        e != null && (e = g.runFilter(e, d, i, h, f));
        if (b != null && b.token === "literal" && (e == null || e.token === "literal"))
            b = b.value,
            e = e == null ? null : e.value;
        else
            return g.ebvError();
        if (a != null && a.token == "var")
            if (d[a.value] != null)
                a = d[a.value];
            else
                return g.ebvError();
        else if (a != null && a.token === "literal")
            if (a.type == null || g.isXsdType("string", a))
                a = a.value;
            else
                return g.ebvError();
        else
            return g.ebvError();
        return (e == null ? RegExp(b) : RegExp(b, e.toLowerCase())).exec(a) ? g.ebvTrue() : g.ebvFalse()
    }
    ;
    g.normalizeLiteralDatatype = function(a, b, e) {
        if (!(a.value.type == null || typeof a.value.type != "object"))
            a.value.type = s.lexicalFormBaseUri(a.value.type, e);
        return a
    }
    ;
    g.runIriRefOrFunction = function(a, b, e, d, i, h) {
        if (b == null)
            return a;
        else {
            for (var f = [], m = 0; m < b.length; m++)
                f.push(g.runFilter(b[m], e, d, i, h));
            a = s.lexicalFormBaseUri(a, h);
            if (a == "http://www.w3.org/2001/XMLSchema#integer" || a == "http://www.w3.org/2001/XMLSchema#decimal" || a == "http://www.w3.org/2001/XMLSchema#double" || a == "http://www.w3.org/2001/XMLSchema#nonPositiveInteger" || a == "http://www.w3.org/2001/XMLSchema#negativeInteger" || a == "http://www.w3.org/2001/XMLSchema#long" || a == "http://www.w3.org/2001/XMLSchema#int" || a == "http://www.w3.org/2001/XMLSchema#short" || a == "http://www.w3.org/2001/XMLSchema#byte" || a == "http://www.w3.org/2001/XMLSchema#nonNegativeInteger" || a == "http://www.w3.org/2001/XMLSchema#unsignedLong" || a == "http://www.w3.org/2001/XMLSchema#unsignedInt" || a == "http://www.w3.org/2001/XMLSchema#unsignedShort" || a == "http://www.w3.org/2001/XMLSchema#unsignedByte" || a == "http://www.w3.org/2001/XMLSchema#positiveInteger")
                if (f = f[0],
                f.token === "literal")
                    if (f = g.normalizeLiteralDatatype(f, d, h),
                    f.type == "http://www.w3.org/2001/XMLSchema#integer" || f.type == "http://www.w3.org/2001/XMLSchema#decimal" || f.type == "http://www.w3.org/2001/XMLSchema#double" || f.type == "http://www.w3.org/2001/XMLSchema#nonPositiveInteger" || f.type == "http://www.w3.org/2001/XMLSchema#negativeInteger" || f.type == "http://www.w3.org/2001/XMLSchema#long" || f.type == "http://www.w3.org/2001/XMLSchema#int" || f.type == "http://www.w3.org/2001/XMLSchema#short" || f.type == "http://www.w3.org/2001/XMLSchema#byte" || f.type == "http://www.w3.org/2001/XMLSchema#nonNegativeInteger" || f.type == "http://www.w3.org/2001/XMLSchema#unsignedLong" || f.type == "http://www.w3.org/2001/XMLSchema#unsignedInt" || f.type == "http://www.w3.org/2001/XMLSchema#unsignedShort" || f.type == "http://www.w3.org/2001/XMLSchema#unsignedByte" || f.type == "http://www.w3.org/2001/XMLSchema#positiveInteger")
                        return f.type = a,
                        f;
                    else if (f.type == "http://www.w3.org/2001/XMLSchema#boolean")
                        return g.ebv(f) == !0 ? (f.type = a,
                        f.value = 1) : (f.type = a,
                        f.value = 0),
                        f;
                    else if (f.type == "http://www.w3.org/2001/XMLSchema#float" || f.type == "http://www.w3.org/2001/XMLSchema#double")
                        return f.type = a,
                        f.value = parseInt(f.value),
                        f;
                    else if (f.type == "http://www.w3.org/2001/XMLSchema#string" || f.type == null) {
                        if (f.value.split(".").length > 2)
                            return g.ebvError();
                        else if (f.value.split("-").length > 2)
                            return g.ebvError();
                        else if (f.value.split("/").length > 2)
                            return g.ebvError();
                        else if (f.value.split("+").length > 2)
                            return g.ebvError();
                        if (a == "http://www.w3.org/2001/XMLSchema#decimal" && (f.value.indexOf("e") != -1 || f.value.indexOf("E") != -1))
                            return g.ebvError();
                        if (a == "http://www.w3.org/2001/XMLSchema#int" || a == "http://www.w3.org/2001/XMLSchema#integer")
                            if (f.value.indexOf("e") != -1 || f.value.indexOf("E") != -1 || f.value.indexOf(".") != -1)
                                return g.ebvError();
                        try {
                            return f.value = parseInt(parseFloat(f.value)),
                            isNaN(f.value) ? g.ebvError() : (f.type = a,
                            f)
                        } catch (n) {
                            return g.ebvError()
                        }
                    } else
                        return g.ebvError();
                else
                    return g.ebvError();
            else if (a == "http://www.w3.org/2001/XMLSchema#boolean")
                return f = f[0],
                f.token === "literal" && f.type == null ? f.value === "true" || f.value === "1" ? g.ebvTrue() : f.value === "false" || f.value === "0" ? g.ebvFalse() : g.ebvError() : f.token === "literal" ? g.isEbvError(f) ? f : g.ebvBoolean(f) : g.ebvError();
            else if (a == "http://www.w3.org/2001/XMLSchema#string")
                if (f = f[0],
                f.token === "literal")
                    if (f = g.normalizeLiteralDatatype(f, d, h),
                    f.type == "http://www.w3.org/2001/XMLSchema#integer" || f.type == "http://www.w3.org/2001/XMLSchema#decimal" || f.type == "http://www.w3.org/2001/XMLSchema#double" || f.type == "http://www.w3.org/2001/XMLSchema#nonPositiveInteger" || f.type == "http://www.w3.org/2001/XMLSchema#negativeInteger" || f.type == "http://www.w3.org/2001/XMLSchema#long" || f.type == "http://www.w3.org/2001/XMLSchema#int" || f.type == "http://www.w3.org/2001/XMLSchema#short" || f.type == "http://www.w3.org/2001/XMLSchema#byte" || f.type == "http://www.w3.org/2001/XMLSchema#nonNegativeInteger" || f.type == "http://www.w3.org/2001/XMLSchema#unsignedLong" || f.type == "http://www.w3.org/2001/XMLSchema#unsignedInt" || f.type == "http://www.w3.org/2001/XMLSchema#unsignedShort" || f.type == "http://www.w3.org/2001/XMLSchema#unsignedByte" || f.type == "http://www.w3.org/2001/XMLSchema#positiveInteger" || f.type == "http://www.w3.org/2001/XMLSchema#float")
                        return f.type = a,
                        f.value = "" + f.value,
                        f;
                    else if (f.type == "http://www.w3.org/2001/XMLSchema#string")
                        return f;
                    else if (f.type == "http://www.w3.org/2001/XMLSchema#boolean")
                        return g.ebv(f) ? (f.type = a,
                        f.value = "true") : (f.type = a,
                        f.value = "false"),
                        f;
                    else if (f.type == "http://www.w3.org/2001/XMLSchema#dateTime" || f.type == "http://www.w3.org/2001/XMLSchema#date") {
                        f.type = a;
                        if (typeof f.value != "string")
                            f.value = s.iso8601(f.value);
                        return f
                    } else
                        return f.type == null ? (f.value = "" + f.value,
                        f.type = a,
                        f) : g.ebvError();
                else
                    return f.token === "uri" ? {
                        token: "literal",
                        value: s.lexicalFormBaseUri(f, h),
                        type: a,
                        lang: null
                    } : g.ebvError();
            else if (a == "http://www.w3.org/2001/XMLSchema#dateTime" || a == "http://www.w3.org/2001/XMLSchema#date")
                if (f = f[0],
                f.type == "http://www.w3.org/2001/XMLSchema#dateTime" || f.type == "http://www.w3.org/2001/XMLSchema#date")
                    return f;
                else if (f.type == "http://www.w3.org/2001/XMLSchema#string" || f.type == null)
                    try {
                        return f.value = s.iso8601(s.parseStrictISO8601(f.value)),
                        f.type = a,
                        f
                    } catch (q) {
                        return g.ebvError()
                    }
                else
                    return g.ebvError();
            else if (a == "http://www.w3.org/2001/XMLSchema#float")
                if (f = f[0],
                f.token === "literal")
                    if (f = g.normalizeLiteralDatatype(f, d, h),
                    f.type == "http://www.w3.org/2001/XMLSchema#decimal" || f.type == "http://www.w3.org/2001/XMLSchema#int")
                        return f.type = a,
                        f.value = parseFloat(f.value),
                        f;
                    else if (f.type == "http://www.w3.org/2001/XMLSchema#boolean")
                        return g.ebv(f) == !0 ? (f.type = a,
                        f.value = 1) : (f.type = a,
                        f.value = 0),
                        f;
                    else if (f.type == "http://www.w3.org/2001/XMLSchema#float" || f.type == "http://www.w3.org/2001/XMLSchema#double")
                        return f.type = a,
                        f.value = parseFloat(f.value),
                        f;
                    else if (f.type == "http://www.w3.org/2001/XMLSchema#string")
                        try {
                            return f.value = parseFloat(f.value),
                            isNaN(f.value) ? g.ebvError() : (f.type = a,
                            f)
                        } catch (o) {
                            return g.ebvError()
                        }
                    else if (f.type == null) {
                        if (f.value.split(".").length > 2)
                            return g.ebvError();
                        else if (f.value.split("-").length > 2)
                            return g.ebvError();
                        else if (f.value.split("/").length > 2)
                            return g.ebvError();
                        else if (f.value.split("+").length > 2)
                            return g.ebvError();
                        try {
                            return f.value = parseFloat(f.value),
                            isNaN(f.value) ? g.ebvError() : (f.type = a,
                            f)
                        } catch (r) {
                            return g.ebvError()
                        }
                    } else
                        return g.ebvError();
                else
                    return g.ebvError();
            else
                return g.ebvError()
        }
    }
    ;
    var z = {
        variablesInBGP: function(a) {
            var b = a.variables;
            if (b)
                return b;
            var e = a.value || a, b = [], d;
            for (d in e)
                e[d] && e[d].token === "var" ? b.push(e[d].value) : e[d] && e[d].token === "blank" && b.push("blank:" + e[d].value);
            return a.variables = b
        },
        connected: function(a, b) {
            for (var e = "/" + a.vars.join("/") + "/", d = 0; d < b.vars.length; d++)
                if (e.indexOf("/" + b.vars[d] + "/") != -1)
                    return !0;
            return !1
        },
        variablesIntersectionBGP: function(a, b) {
            for (var e = z.variablesInBGP(a).sort(), d = z.variablesInBGP(b).sort(), i = 0, h = 0, f = []; i < e.length && h < d.length; )
                e[i] === d[h] ? (f.push(e[i]),
                i++,
                h++) : e[i] < d[h] ? i++ : h++;
            return f
        },
        executeAndBGPsGroups: function(a) {
            for (var b = {}, e = {}, d = 0, i = 0; i < a.length; i++) {
                var h = a[i], f = {}, g = {}, n = [], q;
                for (q in h)
                    q != "_cost" && (h[q].token === "var" ? n.push(h[q].value) : h[q].token === "blank" && n.push(h[q].value));
                var o = !1, r = {}, s;
                for (s in e) {
                    for (var x = e[s], o = !1, z = 0; z < n.length; z++)
                        if (x.indexOf("/" + n[z] + "/") != -1) {
                            o = !0;
                            break
                        }
                    o ? r[s] = !0 : (f[s] = b[s],
                    g[s] = e[s])
                }
                if (o) {
                    var o = [], z = x = "", t;
                    for (t in r)
                        x += t,
                        o = o.concat(b[t]),
                        z = e[t];
                    z = z + n.join("/") + "/";
                    o.push(h);
                    f[x] = o;
                    g[x] = z
                } else
                    f[d] = [h],
                    g[d] = "/" + n.join("/") + "/",
                    d++;
                b = f;
                e = g
            }
            a = [];
            for (d in b)
                a.push(b[d]);
            return a
        },
        intersectionSize: function(a, b) {
            for (var e = b.i.split("_"), d = 0; d < e.length; d++)
                if (e[d] != "" && a.i.indexOf("_" + e[d] + "_") != -1)
                    return 1;
            return 0
        },
        createJoinTree: function(a, b) {
            for (var e = "/" + a.vars.join("/") + "/", d = a.vars.concat([]), i = [], h = 0; h < b.vars.length; h++)
                e.indexOf("/" + b.vars[h] + "/") != -1 ? b.vars[h].indexOf("_:") == 0 ? i.push("blank:" + b.vars[h]) : i.push(b.vars[h]) : d.push(b.vars[h]);
            for (var f = b.i.split("_"), g = a.i.split("_"), e = {}, h = 0; h < f.length; h++)
                f[h] != "" && (e[f[h]] = !0);
            for (h = 0; h < g.length; h++)
                g[h] != "" && (e[g[h]] = !0);
            var h = [], n;
            for (n in e)
                h.push(n);
            return {
                left: a,
                right: b,
                cost: a.cost + b.cost,
                i: "_" + h.sort().join("_") + "_",
                vars: d,
                join: i
            }
        }
    };
    z.executeBushyTree = function(a, b, e, d) {
        if (a.left == null)
            return z.executeEmptyJoinBGP(a.right, b, e, d);
        else if (a.right == null)
            return z.executeEmptyJoinBGP(a.left, b, e, d);
        else {
            var i = z.executeBushyTree(a.left, b, e, d);
            if (i != null)
                return b = z.executeBushyTree(a.right, b, e, d),
                b != null ? z.joinBindings2(a.join, i, b) : null
        }
    }
    ;
    z.executeAndBGPsDPSize = function(a, b, e, d) {
        for (var i = z.executeAndBGPsGroups(a), a = [], h = 0; h < i.length; h++) {
            var f = i[h];
            e.computeCosts(f, d);
            var g = {}
              , n = {}
              , q = {}
              , o = 1
              , r = null
              , s = {};
            q["1"] = [];
            for (var x = 0; x < f.length; x++) {
                var o = [], A;
                for (A in f[x])
                    A != "_cost" && (f[x][A].token === "var" ? o.push(f[x][A].value) : f[x][A].token === "blank" && o.push(f[x][A].value));
                n["_" + x + "_"] = {
                    left: f[x],
                    right: null,
                    cost: f[x]._cost,
                    i: "_" + x + "_",
                    vars: o
                };
                o = {
                    left: f[x],
                    right: null,
                    cost: f[x]._cost,
                    i: "_" + x + "_",
                    vars: o
                };
                g["_" + x + "_"] = o;
                delete f[x]._cost;
                s["_" + x + "_"] = !0;
                q["1"].push("_" + x + "_");
                if (r == null || r.cost > o.cost)
                    r = o
            }
            for (var t = 2; t <= f.length; t++)
                for (var C = 1; C < t; C++)
                    for (var D = q["" + C] || [], E = q["" + (t - C)] || [], x = 0; x < D.length; x++)
                        for (var K = 0; K < E.length; K++)
                            if (D[x] !== E[K]) {
                                var F = n[D[x]]
                                  , I = n[E[K]];
                                if (z.intersectionSize(F, I) == 0 && z.connected(F, I) && (o = t,
                                I = z.createJoinTree(g[F.i], g[I.i]),
                                !s[I.i])) {
                                    s[I.i] = !0;
                                    var L = I.cost + 1;
                                    if (g[I.i] != null)
                                        L = g[I.i].cost;
                                    F = q[t] || [];
                                    F.push(I.i);
                                    n[I.i] = I;
                                    q[t] = F;
                                    L > I.cost && (o === t && (r = I),
                                    g[I.i] = I)
                                }
                            }
            a.push(r)
        }
        F = null;
        for (h = 0; h < a.length; h++)
            A = z.executeBushyTree(a[h], b, e, d),
            F = F == null ? A : z.crossProductBindings(F, A);
        return F
    }
    ;
    z.executeEmptyJoinBGP = function(a, b, e, d) {
        return z.executeBGPDatasets(a, b, e, d)
    }
    ;
    z.executeBGPDatasets = function(a, b, e, d) {
        var i = {};
        if (a.graph == null) {
            for (var h = [], f = 0; f < b.implicit.length; f++)
                if (i[b.implicit[f].oid] == null) {
                    i[b.implicit[f].oid] = !0;
                    a.graph = b.implicit[f];
                    var g = e.rangeQuery(a, d)
                      , g = z.buildBindingsFromRange(g, a);
                    h.push(g)
                }
            return a = z.unionManyBindings(h)
        } else if (a.graph.token === "var") {
            for (var n = a.graph.value, h = [], f = 0; f < b.named.length; f++)
                if (i[b.named[f].oid] == null)
                    if (i[b.named[f].oid] = !0,
                    a.graph = b.named[f],
                    g = e.rangeQuery(a, d),
                    g != null) {
                        for (var g = z.buildBindingsFromRange(g, a), q = 0; q < g.length; q++)
                            g[q][n] = b.named[f].oid;
                        h.push(g)
                    } else
                        return null;
            return a = z.unionManyBindings(h || [])
        } else
            return g = e.rangeQuery(a, d),
            g != null ? g = z.buildBindingsFromRange(g, a) : null
    }
    ;
    z.buildBindingsFromRange = function(a, b) {
        z.variablesInBGP(b);
        var e = {}
          , d = b.value || b
          , e = {};
        for (n in d)
            d[n] && d[n].token === "var" ? e[n] = d[n].value : d[n] && d[n].token === "blank" && (e[n] = "blank:" + d[n].value);
        d = [];
        if (a != null)
            for (var i = 0; i < a.length; i++) {
                var h = {}, f = a[i], g = !1, n;
                for (n in e) {
                    var q = f[n];
                    if (h[e[n]] == null || h[e[n]] === q)
                        h[e[n]] = q;
                    else {
                        g = !0;
                        break
                    }
                }
                g || d.push(h)
            }
        return d
    }
    ;
    z.areCompatibleBindings = function(a, b) {
        for (var e in a)
            if (b[e] != null && b[e] != a[e])
                return !1;
        return !0
    }
    ;
    z.mergeBindings = function(a, b) {
        var e = {}, d;
        for (d in a)
            e[d] = a[d];
        for (d in b)
            e[d] = b[d];
        return e
    }
    ;
    z.joinBindings2 = function(a, b, e) {
        for (var d = {}, i, h, f, g, n = [], q = 0; q < b.length; q++) {
            i = b[q];
            g = d;
            for (var o = 0; o < a.length; o++)
                h = a[o],
                h = i[h],
                o == a.length - 1 ? (f = g[h] || [],
                f.push(i),
                g[h] = f) : (f = g[h] || {},
                g = g[h] = f)
        }
        for (q = 0; q < e.length; q++) {
            i = e[q];
            g = d;
            for (o = 0; o < a.length; o++)
                if (h = a[o],
                h = i[h],
                g[h] != null)
                    if (o == a.length - 1)
                        for (b = 0; b < g[h].length; b++)
                            n.push(z.mergeBindings(g[h][b], i));
                    else
                        g = g[h]
        }
        return n
    }
    ;
    z.joinBindings = function(a, b) {
        for (var e = [], d = 0; d < a.length; d++)
            for (var i = a[d], h = 0; h < b.length; h++) {
                var f = b[h];
                z.areCompatibleBindings(i, f) && e.push(z.mergeBindings(i, f))
            }
        return e
    }
    ;
    z.augmentMissingBindings = function(a, b) {
        for (var e in b)
            a[e] == null && (a[e] = null);
        return a
    }
    ;
    z.leftOuterJoinBindings = function(a, b) {
        for (var e = [], d = 0; d < a.length; d++) {
            for (var i = a[d], h = !1, f = 0; f < b.length; f++) {
                var g = b[f];
                z.areCompatibleBindings(i, g) && (h = !0,
                e.push(z.mergeBindings(i, g)))
            }
            h === !1 && (z.augmentMissingBindings(i, g),
            e.push(i))
        }
        return e
    }
    ;
    z.crossProductBindings = function(a, b) {
        for (var e = [], d = 0; d < a.length; d++)
            for (var i = a[d], h = 0; h < b.length; h++)
                e.push(z.mergeBindings(i, b[h]));
        return e
    }
    ;
    z.unionBindings = function(a, b) {
        return a.concat(b)
    }
    ;
    z.unionManyBindings = function(a) {
        for (var b = [], e = 0; e < a.length; e++)
            b = z.unionBindings(b, a[e]);
        return b
    }
    ;
    var C = {}
      , ba = z;
    C.QueryEngine = function(a) {
        if (arguments.length != 0)
            this.backend = a.backend,
            this.lexicon = a.lexicon,
            this.eventsOnBatchLoad = a.eventsOnBatchLoad || !1,
            this.defaultPrefixes = {},
            this.abstractQueryTree = new F.AbstractQueryTree,
            this.rdfLoader = new $.RDFLoader(a.communication),
            this.callbacksBackend = new D.CallbacksBackend(this),
            this.customFns = a.customFns || {}
    }
    ;
    C.QueryEngine.prototype.setCustomFunctions = function(a) {
        this.customFns = a
    }
    ;
    C.QueryEngine.prototype.registerNsInEnvironment = function(a, b) {
        var e = [];
        if (a != null && a.prefixes != null)
            e = a.prefixes;
        var d = {}, i;
        for (i in this.defaultPrefixes)
            d[i] = this.defaultPrefixes[i];
        for (i = 0; i < e.length; i++) {
            var h = e[i];
            if (h.token === "prefix")
                d[h.prefix] = h.local
        }
        b.namespaces = d;
        b.base = a != null && a.base && typeof a.base === "object" ? a.base.value : null
    }
    ;
    C.QueryEngine.prototype.applyModifier = function(a, b) {
        if (a == "DISTINCT") {
            for (var e = {}, d = [], i = 0; i < b.length; i++) {
                var h = b[i], f = "", g;
                for (g in h) {
                    var n = h[g];
                    n == null ? f = f + g + "null" : n.token == "literal" ? (n.value != null && (f += n.value),
                    n.lang != null && (f += n.lang),
                    n.type != null && (f += n.type)) : f = n.value ? f + g + n.value : f + g + n
                }
                e[f] == null && (d.push(h),
                e[f] = !0)
            }
            return d
        } else
            return b
    }
    ;
    C.QueryEngine.prototype.applyLimitOffset = function(a, b, e) {
        if (b == null && a == null)
            return e;
        a == null && (a = 0);
        b = b == null ? e.length : a + b;
        return e.slice(a, b)
    }
    ;
    C.QueryEngine.prototype.applySingleOrderBy = function(a, b, e, d) {
        for (var i = [], h = 0; h < a.length; h++) {
            var f = g.collect(a[h].expression, [b], e, d, this);
            i.push(f[0].value)
        }
        return {
            binding: b,
            value: i
        }
    }
    ;
    C.QueryEngine.prototype.applyOrderBy = function(a, b, e, d) {
        var i = this
          , h = [];
        if (a != null && a.length > 0) {
            for (var f = 0; f < b.length; f++) {
                var g = i.applySingleOrderBy(a, b[f], e, d);
                h.push(g)
            }
            h.sort(function(b, e) {
                return i.compareFilteredBindings(b, e, a, d)
            });
            b = [];
            for (f = 0; f < h.length; f++)
                b.push(h[f].binding)
        }
        return b
    }
    ;
    C.QueryEngine.prototype.compareFilteredBindings = function(a, b, e, d) {
        for (var i = 0; ; ) {
            if (i == a.value.length)
                return 0;
            var h = e[i].direction;
            if (a.value[i] == null && b.value[i] == null)
                i++;
            else {
                if (a.value[i] == null)
                    a = {
                        value: !1
                    };
                else if (b.value[i] == null)
                    a = {
                        value: !0
                    };
                else if (a.value[i].token === "blank" && b.value[i].token === "blank") {
                    i++;
                    continue
                } else if (a.value[i].token === "blank")
                    a = {
                        value: !1
                    };
                else if (b.value[i].token === "blank")
                    a = {
                        value: !0
                    };
                else if (a.value[i].token === "uri" && b.value[i].token === "uri")
                    if (g.runEqualityFunction(a.value[i], b.value[i], [], this, d).value == !0) {
                        i++;
                        continue
                    } else
                        a = g.runTotalGtFunction(a.value[i], b.value[i], []);
                else if (a.value[i].token === "uri")
                    a = {
                        value: !1
                    };
                else if (b.value[i].token === "uri")
                    a = {
                        value: !0
                    };
                else if (a.value[i].token === "literal" && b.value[i].token === "literal" && a.value[i].type == null && b.value[i].type == null)
                    if (g.runEqualityFunction(a.value[i], b.value[i], [], this, d).value == !0) {
                        i++;
                        continue
                    } else
                        a = g.runTotalGtFunction(a.value[i], b.value[i], []);
                else if (a.value[i].token === "literal" && a.value[i].type == null)
                    a = {
                        value: !1
                    };
                else if (b.value[i].token === "literal" && b.value[i].type == null)
                    a = {
                        value: !0
                    };
                else if (g.runEqualityFunction(a.value[i], b.value[i], [], this, d).value == !0) {
                    i++;
                    continue
                } else
                    a = g.runTotalGtFunction(a.value[i], b.value[i], []);
                return a.value == !0 ? h === "ASC" ? 1 : -1 : h === "ASC" ? -1 : 1
            }
        }
    }
    ;
    C.QueryEngine.prototype.removeDefaultGraphBindings = function(a, b) {
        for (var e = [], d = {}, i = 0; i < b.named.length; i++)
            d[b.named[i].oid] = !0;
        for (i = 0; i < b.implicit.length; i++)
            d[b.implicit[i].oid] == null && e.push(b.implicit[i].oid);
        e = [];
        for (i = 0; i < a.length; i++) {
            var h = a[i], f = !1, g;
            for (g in h) {
                for (var n = 0; n < d.length; n++)
                    if (h[g] === d[n]) {
                        f = !0;
                        break
                    }
                if (f)
                    break
            }
            f || e.push(h)
        }
        return e
    }
    ;
    C.QueryEngine.prototype.aggregateBindings = function(a, b, e, d) {
        for (var b = this.copyDenormalizedBindings(b, d.outCache), i = {}, h = 0; h < a.length; h++) {
            var f = g.runAggregator(a[h], b, this, e, d);
            a[h].alias ? i[a[h].alias.value] = f : i[a[h].value.value] = f
        }
        return i
    }
    ;
    C.QueryEngine.prototype.projectBindings = function(a, b, e) {
        if (a[0].kind === "*")
            return b;
        else {
            for (var d = [], i = 0; i < b.length; i++) {
                for (var h = b[i], f = {}, m = !0, n = 0; n < a.length; n++)
                    if (a[n].token == "variable" && a[n].kind != "aliased")
                        f[a[n].value.value] = h[a[n].value.value];
                    else if (a[n].token == "variable" && a[n].kind == "aliased") {
                        var q = g.runFilter(a[n].expression, h, this, e, {
                            blanks: {},
                            outCache: {}
                        });
                        if (g.isEbvError(q)) {
                            m = !1;
                            break
                        } else
                            f[a[n].alias.value] = q
                    }
                m === !0 && d.push(f)
            }
            return d
        }
    }
    ;
    C.QueryEngine.prototype.resolveNsInEnvironment = function(a, b) {
        return b.namespaces[a]
    }
    ;
    C.QueryEngine.prototype.termCost = function(a, b) {
        if (a.token === "uri") {
            var e = s.lexicalFormBaseUri(a, b);
            return e == null ? 0 : this.lexicon.resolveUriCost(e)
        } else
            return a.token === "literal" ? this.lexicon.resolveLiteralCost(s.lexicalFormLiteral(a, b)) : a.token === "blank" ? this.lexicon.resolveBlankCost(a.value) : a.token === "var" ? this.lexicon.oidCounter / 3 : null
    }
    ;
    C.QueryEngine.prototype.normalizeTerm = function(a, b, e) {
        if (a.token === "uri")
            return b = s.lexicalFormBaseUri(a, b),
            b == null ? null : e ? this.lexicon.registerUri(b) : this.lexicon.resolveUri(b);
        else if (a.token === "literal")
            return b = s.lexicalFormLiteral(a, b),
            a = e ? this.lexicon.registerLiteral(b) : this.lexicon.resolveLiteral(b);
        else if (a.token === "blank") {
            var d = a.value
              , a = b.blanks[d];
            a == null && (a = e ? this.lexicon.registerBlank(d) : this.lexicon.resolveBlank(d),
            b.blanks[d] = a);
            return a
        } else
            return a.token === "var" ? a.value : null
    }
    ;
    C.QueryEngine.prototype.normalizeDatasets = function(a, b) {
        for (var e = 0; e < a.length; e++) {
            var d = a[e];
            if (d.value === this.lexicon.defaultGraphUri)
                d.oid = this.lexicon.defaultGraphOid;
            else {
                var i = this.normalizeTerm(d, b, !1);
                if (i != null)
                    d.oid = i;
                else
                    return null
            }
        }
        return !0
    }
    ;
    C.QueryEngine.prototype.normalizeQuad = function(a, b, e) {
        var d = null, i = null, h = d = null, f;
        if (a.graph == null)
            h = 0;
        else if (f = this.normalizeTerm(a.graph, b, e),
        f != null)
            h = f,
            e === !0 && a.graph.token != "var" && this.lexicon.registerGraph(f);
        else
            return null;
        f = this.normalizeTerm(a.subject, b, e);
        if (f != null)
            d = f;
        else
            return null;
        f = this.normalizeTerm(a.predicate, b, e);
        if (f != null)
            i = f;
        else
            return null;
        f = this.normalizeTerm(a.object, b, e);
        return f == null ? null : {
            subject: d,
            predicate: i,
            object: f,
            graph: h
        }
    }
    ;
    C.QueryEngine.prototype.quadCost = function(a, b) {
        var e = null
          , d = null
          , i = null
          , h = null
          , h = a.graph == null ? this.lexicon.oidCounter / 4 : this.termCost(a.graph, b)
          , e = this.termCost(a.subject, b)
          , d = this.termCost(a.predicate, b)
          , i = this.termCost(a.object, b);
        return h + e + d + i
    }
    ;
    C.QueryEngine.prototype.denormalizeBindingsList = function(a, b) {
        for (var e = [], d = 0; d < a.length; d++) {
            var i = this.denormalizeBindings(a[d], b);
            e.push(i)
        }
        return e
    }
    ;
    C.QueryEngine.prototype.copyDenormalizedBindings = function(a, b) {
        for (var e = [], d = 0; d < a.length; d++) {
            for (var i = {}, h = a[d], f = s.keys(h), g = 0; g < f.length; g++) {
                var n = h[f[g]];
                if (n == null)
                    i[f[g]] = null;
                else if (typeof n === "object")
                    i[f[g]] = n;
                else {
                    var q = b[n];
                    q == null && (q = this.lexicon.retrieve(n),
                    b[n] = q);
                    i[f[g]] = q
                }
            }
            e.push(i)
        }
        return e
    }
    ;
    C.QueryEngine.prototype.denormalizeBindings = function(a, b) {
        for (var e = s.keys(a), d = b.outCache, i = 0; i < e.length; i++) {
            var h = a[e[i]];
            if (h == null)
                a[e[i]] = null;
            else if (d[h] != null)
                a[e[i]] = d[h];
            else {
                var f = this.lexicon.retrieve(h);
                a[e[i]] = f;
                f.token === "blank" && (b.blanks[f.value] = h)
            }
        }
        return a
    }
    ;
    C.QueryEngine.prototype.execute = function(a, b, e, d) {
        a = s.normalizeUnicodeLiterals(a);
        a = this.abstractQueryTree.parseQueryString(a);
        if (a == null)
            b(!1, "Error parsing query string");
        else if (a.token === "query" && a.kind == "update") {
            this.callbacksBackend.startGraphModification();
            var i = this;
            this.executeUpdate(a, function(a, d) {
                i.lexicon.updateAfterWrite && i.lexicon.updateAfterWrite();
                a ? i.callbacksBackend.endGraphModification(function() {
                    b(a, d)
                }) : (i.callbacksBackend.cancelGraphModification(),
                b(a, d))
            })
        } else
            a.token === "query" && a.kind == "query" && this.executeQuery(a, b, e, d)
    }
    ;
    C.QueryEngine.prototype.executeQuery = function(a, b, e, d) {
        var i = a.units
          , h = this
          , f = {
            blanks: {},
            outCache: {}
        };
        this.registerNsInEnvironment(a.prologue, f);
        var g = h.abstractQueryTree.parseExecutableUnit(i[0]);
        if (g.kind === "select")
            this.executeSelect(g, f, e, d, function(a, d) {
                a ? typeof d === "object" && d.denorm === !0 ? b(!0, d.bindings) : (d = h.denormalizeBindingsList(d, f),
                d != null ? b(!0, d) : b(!1, d)) : b(!1, d)
            });
        else if (g.kind === "ask")
            g.projection = [{
                token: "variable",
                kind: "*"
            }],
            this.executeSelect(g, f, e, d, function(a, d) {
                a ? a ? d.length > 0 ? b(!0, !0) : b(!0, !1) : b(!1, d) : b(!1, d)
            });
        else if (g.kind === "construct")
            g.projection = [{
                token: "variable",
                kind: "*"
            }],
            h = this,
            this.executeSelect(g, f, e, d, function(a, d) {
                if (a)
                    if (a)
                        if (d = h.denormalizeBindingsList(d, f),
                        d != null) {
                            var e = new r.Graph;
                            if (g.template == null)
                                g.template = {
                                    triplesContext: g.pattern
                                };
                            for (var i = 1, s = [], x = 0; x < d.length; x++) {
                                for (var z = d[x], t = 0; t < s.length; t++)
                                    delete s[t].valuetmp;
                                for (t = 0; t < g.template.triplesContext.length; t++) {
                                    for (var A = ["subject", "predicate", "object"], C = g.template.triplesContext[t], D = 0; D < A.length; D++) {
                                        var E = A[D];
                                        if (C[E].token === "blank" && !(C[E].valuetmp && C[E].valuetmp != null)) {
                                            var F = "_:b" + i;
                                            i++;
                                            C[E].valuetmp = F;
                                            s.push(C[E])
                                        }
                                    }
                                    A = r.buildRDFResource(C.subject, z, h, f);
                                    D = r.buildRDFResource(C.predicate, z, h, f);
                                    C = r.buildRDFResource(C.object, z, h, f);
                                    A != null && D != null && C != null && (D = new r.Triple(A,D,C),
                                    e.add(D))
                                }
                            }
                            b(!0, e)
                        } else
                            b(!1, d);
                    else
                        b(!1, d);
                else
                    b(!1, d)
            })
    }
    ;
    C.QueryEngine.prototype.executeSelect = function(a, b, e, d, i) {
        if (a.kind === "select" || a.kind === "ask" || a.kind === "construct" || a.kind === "modify") {
            var h = a.projection
              , f = a.dataset
              , g = a.modifier
              , n = a.limit
              , q = a.offset
              , o = a.order;
            if (e != null || d != null)
                f.implicit = e || [],
                f.named = d || [];
            f.implicit != null && f.implicit.length === 0 && f.named != null && f.named.length === 0 && f.implicit.push(this.lexicon.defaultGraphUriTerm);
            if (this.normalizeDatasets(f.implicit.concat(f.named), b) != null)
                if (d = this.executeSelectUnit(h, f, a.pattern, b),
                d != null) {
                    if (a.group != null && a.group === "") {
                        for (var r = !1, e = 0; e < a.projection.length; e++)
                            if (a.projection[e].expression != null && a.projection[e].expression.expressionType === "aggregate") {
                                r = !0;
                                break
                            }
                        if (r === !0)
                            a.group = "singleGroup"
                    }
                    if (a.group && a.group != "")
                        if (this.checkGroupSemantics(a.group, h)) {
                            n = this.groupSolution(d, a.group, f, b);
                            q = [];
                            for (e = 0; e < n.length; e++)
                                g = this.aggregateBindings(h, n[e], f, b),
                                q.push(g);
                            i(!0, {
                                bindings: q,
                                denorm: !0
                            })
                        } else
                            i(!1, "Incompatible Group and Projection variables");
                    else
                        b = this.applyOrderBy(o, d, f, b),
                        h = this.projectBindings(h, b, f),
                        h = this.applyModifier(g, h),
                        f = this.removeDefaultGraphBindings(this.applyLimitOffset(q, n, h), f),
                        i(!0, f)
                } else
                    i(!1, d);
            else
                i(!1, "Error normalizing datasets")
        } else
            i(!1, "Cannot execute " + a.kind + " query as a select query")
    }
    ;
    C.QueryEngine.prototype.groupSolution = function(a, b, e, d) {
        var i = []
          , h = []
          , f = !1;
        if (b === "singleGroup")
            return [a];
        else {
            for (var m = 0; m < a.length; m++) {
                for (var n = a[m], q = !0, o = 0; o < b.length; o++) {
                    var r = b[o]
                      , s = null;
                    if (r.token === "var")
                        s = r.value,
                        f == !1 && i.push(s);
                    else if (r.token === "aliased_expression")
                        if (s = r.alias.value,
                        f == !1 && i.push(s),
                        r.expression.primaryexpression === "var")
                            n[r.alias.value] = n[r.expression.value.value];
                        else if (s = this.copyDenormalizedBindings([n], d.outCache),
                        s = g.runFilter(r.expression, s[0], this, e, d),
                        g.isEbvError(s))
                            q = !1;
                        else {
                            if (s.value != null)
                                s.value = "" + s.value;
                            n[r.alias.value] = s
                        }
                    else
                        s = this.copyDenormalizedBindings([n], d.outCache),
                        s = g.runFilter(r, s[0], this, d),
                        g.isEbvError(s) ? q = !1 : (n["groupCondition" + env._i] = s,
                        s = "groupCondition" + env._i,
                        f == !1 && i.push(s))
                }
                f == !1 && (f = !0);
                q === !0 && h.push(n)
            }
            a = {};
            for (m = 0; m < h.length; m++) {
                b = h[m];
                e = "";
                for (o = 0; o < i.length; o++)
                    d = b[i[o]],
                    e += typeof d === "object" ? d.value : d;
                a[e] == null ? a[e] = [b] : a[e].push(b)
            }
            var i = [], x;
            for (x in a)
                i.push(a[x]);
            return i
        }
    }
    ;
    C.QueryEngine.prototype.executeSelectUnit = function(a, b, e, d) {
        return e.kind === "BGP" ? this.executeAndBGP(a, b, e, d) : e.kind === "UNION" ? this.executeUNION(a, b, e.value, d) : e.kind === "JOIN" ? this.executeJOIN(a, b, e, d) : e.kind === "LEFT_JOIN" ? this.executeLEFT_JOIN(a, b, e, d) : e.kind === "FILTER" ? (a = this.executeSelectUnit(a, b, e.value, d),
        a != null ? a = g.checkFilters(e, a, !1, b, d, this) : []) : e.kind === "EMPTY_PATTERN" ? [] : e.kind === "ZERO_OR_MORE_PATH" || e.kind === "ONE_OR_MORE_PATH" ? this.executeZeroOrMorePath(e, b, d) : (console.log("Cannot execute query pattern " + e.kind + ". Not implemented yet."),
        null)
    }
    ;
    C.QueryEngine.prototype.executeZeroOrMorePath = function(a, b, e) {
        var d = [];
        a.x.token === "var" && d.push({
            token: "variable",
            kind: "var",
            value: a.x.value
        });
        a.y.token === "var" && d.push({
            token: "variable",
            kind: "var",
            value: a.y.value
        });
        d.length === 0 && d.push({
            token: "variable",
            kind: "*"
        });
        if (a.x.token === "var" && a.y.token === "var") {
            var i = this.executeAndBGP(d, b, a.path, e), h = {}, d = [], f, g, n, q, o = a.x.value;
            g = a.x;
            for (var r = a.path, B = 0; B < i.length; B++)
                if (f = i[B][o],
                h[f] == null) {
                    q = this.lexicon.retrieve(f);
                    a.x = q;
                    a.path = this.abstractQueryTree.replace(r, g, q, e);
                    r = s.clone(a.path);
                    g = this.executeZeroOrMorePath(a, b, e);
                    for (var x = 0; x < g.length; x++)
                        n = g[x],
                        n[o] = f,
                        d.push(n);
                    g = q
                }
            return d
        } else if (a.x.token !== "var" && a.y.token === "var") {
            h = {};
            f = !0;
            q = [];
            for (o = []; f == !0 || q.length !== 0; ) {
                f === !0 ? (i = this.executeAndBGP(d, b, a.path, e),
                g = a.x,
                f = !1) : (r = this.lexicon.retrieve(q.pop()),
                i = a.path,
                i = this.abstractQueryTree.replace(i, g, r, e),
                i = this.executeAndBGP(d, b, i, e),
                g = r);
                for (B = 0; B < i.length; B++)
                    r = i[B][a.y.value],
                    h[r] !== !0 && (n = {},
                    n[a.y.value] = r,
                    o.push(n),
                    h[r] = !0,
                    q.push(r))
            }
            return o
        } else
            throw "Kind of path not supported!";
    }
    ;
    C.QueryEngine.prototype.executeUNION = function(a, b, e, d) {
        var i = e[0]
          , h = e[1]
          , f = null
          , m = null;
        if (e.length != 2)
            throw "SPARQL algebra UNION with more than two components";
        f = this.executeSelectUnit(a, b, i, d);
        if (f == null)
            return null;
        m = this.executeSelectUnit(a, b, h, d);
        if (m == null)
            return null;
        a = ba.unionBindings(f, m);
        return a = g.checkFilters(e, a, !1, b, d, this)
    }
    ;
    C.QueryEngine.prototype.executeAndBGP = function(a, b, e, d) {
        a = ba.executeAndBGPsDPSize(e.value, b, this, d);
        return a != null ? g.checkFilters(e, a, !1, b, d, this) : null
    }
    ;
    C.QueryEngine.prototype.executeLEFT_JOIN = function(a, b, e, d) {
        var i = e.rvalue
          , h = null
          , f = null
          , h = this.executeSelectUnit(a, b, e.lvalue, d);
        if (h == null)
            return null;
        f = this.executeSelectUnit(a, b, i, d);
        if (f == null)
            return null;
        a = ba.leftOuterJoinBindings(h, f);
        b = g.checkFilters(e, a, !0, b, d, this);
        if (h.length > 1 && f.length > 1) {
            var e = [], d = {}, m;
            for (m in h[0])
                d[m] = !0;
            for (m in f[0])
                d[m] != !0 && e.push(m);
            h = [];
            f = {};
            for (d = 0; d < b.length; d++)
                if (b[d].__nullify__ === !0) {
                    for (i = 0; i < e.length; i++)
                        b[d].bindings[e[i]] = null;
                    i = [];
                    a = [];
                    for (m in b[d].bindings)
                        b[d].bindings[m] != null && (i.push(m + b[d].bindings[m]),
                        i.sort(),
                        a.push(i.join("")));
                    if (f[i.join("")] == null) {
                        for (i = 0; i < a.length; i++)
                            f[a[i]] = !0;
                        h.push(b[d].bindings)
                    }
                } else
                    for (m in h.push(b[d]),
                    i = [],
                    b[d])
                        i.push(m + b[d][m]),
                        i.sort(),
                        f[i.join("")] = !0;
            return h
        } else
            return b
    }
    ;
    C.QueryEngine.prototype.executeJOIN = function(a, b, e, d) {
        var i = e.lvalue
          , h = e.rvalue
          , f = null
          , m = null
          , f = this.executeSelectUnit(a, b, i, d);
        if (f == null)
            return null;
        m = this.executeSelectUnit(a, b, h, d);
        if (m == null)
            return null;
        a = null;
        if (f.length === 0 || m.length === 0)
            a = [];
        else {
            var a = {}, n = [], q;
            for (q in f[0])
                a[q] = !1;
            for (q in m[0])
                a[q] === !1 && n.push(q);
            a = n.length == 0 ? ba.joinBindings(f, m) : this.abstractQueryTree.treeWithUnion(i) || this.abstractQueryTree.treeWithUnion(h) ? ba.joinBindings(f, m) : ba.joinBindings2(n, f, m)
        }
        return a = g.checkFilters(e, a, !1, b, d, this)
    }
    ;
    C.QueryEngine.prototype.rangeQuery = function(a, b) {
        var e = this.normalizeQuad(a, b, !1);
        return e != null ? (e = this.backend.range(new U.Pattern(e)),
        e == null || e.length == 0 ? [] : e) : (console.log("ERROR normalizing quad"),
        null)
    }
    ;
    C.QueryEngine.prototype.executeUpdate = function(a, b) {
        var e = a.units
          , d = this
          , i = {
            blanks: {},
            outCache: {}
        };
        this.registerNsInEnvironment(a.prologue, i);
        for (var h = 0; h < e.length; h++) {
            var f = d.abstractQueryTree.parseExecutableUnit(e[h]);
            if (f.kind === "insertdata") {
                for (var g = 0; g < f.quads.length; g++) {
                    var n = f.quads[g];
                    if (d._executeQuadInsert(n, i) !== !0)
                        return b(!1, error)
                }
                b(!0)
            } else if (f.kind === "deletedata") {
                for (g = 0; g < f.quads.length; g++)
                    n = f.quads[g],
                    this._executeQuadDelete(n, i);
                b(!0)
            } else if (f.kind === "modify")
                this._executeModifyQuery(f, i, b);
            else if (f.kind === "create")
                b(!0);
            else if (f.kind === "load")
                g = {
                    uri: s.lexicalFormBaseUri(f.sourceGraph, i)
                },
                f.destinyGraph != null && (g = {
                    uri: s.lexicalFormBaseUri(f.destinyGraph, i)
                }),
                d = this,
                this.rdfLoader.load(f.sourceGraph.value, g, function(a, e) {
                    a == !1 ? (console.log("Error loading graph"),
                    console.log(e),
                    b(!1, "error batch loading quads")) : (e = d.batchLoad(e),
                    b(e != null, e || "error batch loading quads"))
                });
            else if (f.kind === "drop")
                this._executeClearGraph(f.destinyGraph, i, b);
            else if (f.kind === "clear")
                this._executeClearGraph(f.destinyGraph, i, b);
            else
                throw Error("not supported execution unit");
        }
    }
    ;
    C.QueryEngine.prototype.batchLoad = function(a, b) {
        var e = null, d = null, i = null, h = null, f = 0, g = !0, n = {}, q, o;
        this.eventsOnBatchLoad && this.callbacksBackend.startGraphModification();
        for (var r = 0; r < a.length; r++) {
            o = a[r];
            if (o.subject.uri || o.subject.token === "uri") {
                if (q = this.lexicon.registerUri(o.subject.uri || o.subject.value),
                o.subject.uri != null)
                    o.subject = {
                        token: "uri",
                        value: o.subject.uri
                    },
                    delete o.subject.uri
            } else if (o.subject.literal || o.subject.token === "literal") {
                if (q = this.lexicon.registerLiteral(o.subject.literal || o.subject.value),
                o.subject.literal != null)
                    o.subject = this.lexicon.parseLiteral(o.subject.literal),
                    delete o.subject.literal
            } else if (q = n[o.subject.blank || o.subject.value],
            q == null && (q = this.lexicon.registerBlank(o.subject.blank || o.subject.value),
            n[o.subject.blank || o.subject.value] = q),
            o.subject.token == null)
                o.subject.token = "blank",
                o.subject.value = o.subject.blank,
                delete o.subject.blank;
            e = q;
            if (o.predicate.uri || o.predicate.token === "uri") {
                if (q = this.lexicon.registerUri(o.predicate.uri || o.predicate.value),
                o.predicate.uri != null)
                    o.predicate = {
                        token: "uri",
                        value: o.predicate.uri
                    },
                    delete o.subject.uri
            } else if (o.predicate.literal || o.predicate.token === "literal") {
                if (q = this.lexicon.registerLiteral(o.predicate.literal || o.predicate.value),
                o.predicate.literal != null)
                    o.predicate = this.lexicon.parseLiteral(o.predicate.literal),
                    delete o.predicate.literal
            } else if (q = n[o.predicate.blank || o.predicate.value],
            q == null && (q = this.lexicon.registerBlank(o.predicate.blank || o.predicate.value),
            n[o.predicate.blank || o.predicate.value] = q),
            o.predicate.token == null)
                o.predicate.token = "blank",
                o.predicate.value = o.predicate.blank,
                delete o.predicate.blank;
            d = q;
            if (o.object.uri || o.object.token === "uri") {
                if (q = this.lexicon.registerUri(o.object.uri || o.object.value),
                o.object.uri != null)
                    o.object = {
                        token: "uri",
                        value: o.object.uri
                    },
                    delete o.subject.uri
            } else if (o.object.literal || o.object.token === "literal") {
                if (o.object.token === "literal")
                    o.object.value = o.object.type != null ? '"' + o.object.value + '"^^<' + o.object.type + ">" : o.object.lang != null ? '"' + o.object.value + '"@' + o.object.lang : '"' + o.object.value + '"';
                q = this.lexicon.registerLiteral(o.object.literal || o.object.value);
                if (o.object.literal != null)
                    o.object = this.lexicon.parseLiteral(o.object.literal),
                    delete o.object.literal
            } else if (q = n[o.object.blank || o.object.value],
            q == null && (q = this.lexicon.registerBlank(o.object.blank || o.object.value),
            n[o.object.blank || o.object.value] = q),
            o.object.token == null)
                o.object.token = "blank",
                o.object.value = o.object.blank,
                delete o.object.blank;
            i = q;
            if (o.graph.uri || o.graph.token === "uri") {
                q = this.lexicon.registerUri(o.graph.uri || o.graph.value);
                if (o.graph.uri != null)
                    o.graph = {
                        token: "uri",
                        value: o.graph.uri
                    },
                    delete o.subject.uri;
                this.lexicon.registerGraph(q)
            } else if (o.graph.literal || o.graph.token === "literal") {
                if (q = this.lexicon.registerLiteral(o.graph.literal || o.graph.value),
                o.predicate.literal != null)
                    o.predicate = this.lexicon.parseLiteral(o.predicate.literal),
                    delete o.predicate.literal
            } else if (q = n[o.graph.blank || o.graph.value],
            q == null && (q = this.lexicon.registerBlank(o.graph.blank || o.graph.value),
            n[o.graph.blank || o.graph.value] = q),
            o.graph.token == null)
                o.graph.token = "blank",
                o.graph.value = o.graph.blank,
                delete o.graph.blank;
            h = q;
            q = o;
            o = {
                subject: e,
                predicate: d,
                object: i,
                graph: h
            };
            e = new U.NodeKey(o);
            d = this.backend.search(e);
            if (!d)
                if (d = this.backend.index(e),
                d == !0)
                    this.eventsOnBatchLoad && this.callbacksBackend.nextGraphModification(D.added, [q, o]),
                    f += 1;
                else {
                    g = !1;
                    break
                }
        }
        this.lexicon.updateAfterWrite != null && this.lexicon.updateAfterWrite();
        var s = function() {
            g ? b && b(!0, f) : b && b(!1, null)
        };
        this.eventsOnBatchLoad ? this.callbacksBackend.endGraphModification(function() {
            s()
        }) : s();
        return g ? f : null
    }
    ;
    C.QueryEngine.prototype.computeCosts = function(a, b) {
        for (var e = 0; e < a.length; e++)
            a[e]._cost = this.quadCost(a[e], b);
        return a
    }
    ;
    C.QueryEngine.prototype._executeModifyQuery = function(a, b, e) {
        var d = this
          , i = !0
          , h = null
          , f = ["subject", "predicate", "object", "graph"];
        a.insert = a.insert == null ? [] : a.insert;
        a["delete"] = a["delete"] == null ? [] : a["delete"];
        s.seq(function(e) {
            var f = []
              , g = [];
            a["with"] != null && f.push(a["with"]);
            if (a.using != null)
                for (var g = [], o = 0; o < a.using.length; o++) {
                    var r = a.using[o];
                    r.kind === "named" ? g.push(r.uri) : f.push(r.uri)
                }
            a.dataset = {};
            a.projection = [{
                token: "variable",
                kind: "*"
            }];
            d.executeSelect(a, b, f, g, function(a, f) {
                a ? (f = d.denormalizeBindingsList(f, b),
                f != null ? h = f : i = !1) : i = !1;
                return e()
            })
        }, function(e) {
            var g = a["with"];
            if (i) {
                for (var q = [], o = 0; o < a["delete"].length; o++)
                    for (var r = a["delete"][o], s = 0; s < h.length; s++) {
                        for (var x = {}, z = h[s], t = 0; t < f.length; t++) {
                            var A = f[t];
                            A == "graph" && r[A] == null ? x.graph = g : x[A] = r[A].token === "var" ? z[r[A].value] : r[A]
                        }
                        q.push(x)
                    }
                for (s = 0; s < q.length; s++)
                    x = q[s],
                    d._executeQuadDelete(x, b)
            }
            e()
        }, function(e) {
            var g = a["with"];
            if (i) {
                for (var q = [], o = 0; o < a.insert.length; o++)
                    for (var r = a.insert[o], s = 0; s < h.length; s++) {
                        for (var x = {}, A = h[s], t = 0; t < f.length; t++) {
                            var z = f[t];
                            z == "graph" && r[z] == null ? x.graph = g : x[z] = r[z].token === "var" ? A[r[z].value] : r[z]
                        }
                        q.push(x)
                    }
                for (o = 0; o < q.length; o++)
                    x = q[o],
                    d._executeQuadInsert(x, b)
            }
            e()
        })(function() {
            e(i)
        })
    }
    ;
    C.QueryEngine.prototype._executeQuadInsert = function(a, b) {
        var e = this.normalizeQuad(a, b, !0);
        if (e != null) {
            var d = new U.NodeKey(e)
              , i = this.backend.search(d);
            return i ? i : (i = this.backend.index(d),
            i == !0 ? (this.callbacksBackend.nextGraphModification(D.added, [a, e]),
            !0) : (console.log("ERROR inserting quad"),
            !1))
        } else
            return console.log("ERROR normalizing quad"),
            !1
    }
    ;
    C.QueryEngine.prototype._executeQuadDelete = function(a, b) {
        var e = this.normalizeQuad(a, b, !1);
        if (e != null) {
            var d = new U.NodeKey(e);
            this.backend["delete"](d);
            return this.lexicon.unregister(a, d) == !0 ? (this.callbacksBackend.nextGraphModification(D.deleted, [a, e]),
            !0) : (console.log("ERROR unregistering quad"),
            !1)
        } else
            return console.log("ERROR normalizing quad"),
            !1
    }
    ;
    C.QueryEngine.prototype._executeClearGraph = function(a, b, e) {
        if (a === "default")
            this.execute("DELETE { ?s ?p ?o } WHERE { ?s ?p ?o }", e);
        else if (a === "named") {
            var d = this
              , i = this.lexicon.registeredGraphs(!0);
            if (i != null) {
                var h = !1;
                s.repeat(0, i.length, function(a, b) {
                    var e = i[b._i]
                      , g = arguments.callee;
                    h ? a(g, b) : d.execute("DELETE { GRAPH <" + e + "> { ?s ?p ?o } } WHERE { GRAPH <" + e + "> { ?s ?p ?o } }", function(d) {
                        h = !d;
                        a(g, b)
                    })
                }, function() {
                    e(!h)
                })
            } else
                e(!1, "Error deleting named graphs")
        } else
            a === "all" ? (d = this,
            this.execute("CLEAR DEFAULT", function(a, b) {
                a ? d.execute("CLEAR NAMED", e) : e(!1, b)
            })) : a.token == "uri" ? (a = s.lexicalFormBaseUri(a, b),
            a != null ? this.execute("DELETE { GRAPH <" + a + "> { ?s ?p ?o } } WHERE { GRAPH <" + a + "> { ?s ?p ?o } }", e) : e(!1, "wrong graph URI")) : e(!1, "wrong graph URI")
    }
    ;
    C.QueryEngine.prototype.checkGroupSemantics = function(a, b) {
        if (a === "singleGroup")
            return !0;
        for (var e = {}, d = 0; d < a.length; d++) {
            var i = a[d];
            i.token === "var" ? e[i.value] = !0 : i.token === "aliased_expression" && (e[i.alias.value] = !0)
        }
        for (d = 0; d < b.length; d++)
            if (i = b[d],
            i.kind === "var") {
                if (e[i.value.value] == null)
                    return !1
            } else if (i.kind === "aliased" && i.expression && i.expression.primaryexpression === "var" && e[i.expression.value.value] == null)
                return !1;
        return !0
    }
    ;
    C.QueryEngine.prototype.registerDefaultNamespace = function(a, b) {
        this.defaultPrefixes[a] = b
    }
    ;
    var D = {
        ANYTHING: {
            token: "var",
            value: "_"
        },
        added: "added",
        deleted: "deleted",
        eventsFlushed: "eventsFlushed",
        CallbacksBackend: function(a) {
            this.aqt = new F.AbstractQueryTree;
            this.engine = a;
            this.indexMap = {};
            this.observersMap = {};
            this.queriesIndexMap = {};
            this.emptyNotificationsMap = {};
            this.queriesList = [];
            this.pendingQueries = [];
            this.matchedQueries = [];
            this.updateInProgress = null;
            this.indices = ["SPOG", "GP", "OGS", "POG", "GSP", "OS"];
            this.componentOrders = {
                SPOG: ["subject", "predicate", "object", "graph"],
                GP: ["graph", "predicate", "subject", "object"],
                OGS: ["object", "graph", "subject", "predicate"],
                POG: ["predicate", "object", "graph", "subject"],
                GSP: ["graph", "subject", "predicate", "object"],
                OS: ["object", "subject", "predicate", "graph"]
            };
            this.callbackCounter = 0;
            this.callbacksMap = {};
            this.callbacksInverseMap = {};
            this.queryCounter = 0;
            this.queriesMap = {};
            this.queriesCallbacksMap = {};
            this.queriesInverseMap = {};
            for (a = 0; a < this.indices.length; a++) {
                var b = this.indices[a];
                this.indexMap[b] = {};
                this.queriesIndexMap[b] = {}
            }
        }
    };
    D.CallbacksBackend.prototype.startGraphModification = function() {
        this.pendingQueries = [].concat(this.queriesList);
        this.matchedQueries = [];
        if (this.updateInProgress == null)
            this.updateInProgress = {
                added: [],
                deleted: []
            }
    }
    ;
    D.CallbacksBackend.prototype.nextGraphModification = function(a, b) {
        this.updateInProgress[a].push(b)
    }
    ;
    D.CallbacksBackend.prototype.endGraphModification = function(a) {
        var b = this;
        if (this.updateInProgress != null) {
            var e = b.updateInProgress;
            b.updateInProgress = null;
            this.sendNotification(D.deleted, e[D.deleted], function() {
                b.sendNotification(D.added, e[D.added], function() {
                    b.sendEmptyNotification(D.eventsFlushed, null, function() {
                        b.dispatchQueries(function() {
                            a(!0)
                        })
                    })
                })
            })
        } else
            a(!0)
    }
    ;
    D.CallbacksBackend.prototype.cancelGraphModification = function() {
        this.updateInProgress = null
    }
    ;
    D.CallbacksBackend.prototype.sendNotification = function(a, b, e) {
        for (var d = {}, i = 0; i < b.length; i++) {
            var h = b[i], f;
            for (f in this.indexMap) {
                var g = this.indexMap[f]
                  , n = this.componentOrders[f];
                this._searchCallbacksInIndex(g, n, a, h, d);
                this.pendingQueries.length != 0 && (g = this.queriesIndexMap[f],
                this._searchQueriesInIndex(g, n, h))
            }
        }
        this.dispatchNotifications(d);
        e != null && e(!0)
    }
    ;
    D.CallbacksBackend.prototype.sendEmptyNotification = function(a, b, e) {
        for (var d = this.emptyNotificationsMap[a] || [], i = 0; i < d.length; i++)
            d[i](a, b);
        e()
    }
    ;
    D.CallbacksBackend.prototype.dispatchNotifications = function(a) {
        for (var b in a) {
            var e = this.callbacksMap[b]
              , d = a[b][D.deleted];
            if (d != null)
                try {
                    e(D.deleted, d)
                } catch (i) {}
            for (var h in a[b])
                if (h != D.deleted)
                    try {
                        e(h, a[b][h])
                    } catch (f) {}
        }
    }
    ;
    D.CallbacksBackend.prototype._searchCallbacksInIndex = function(a, b, e, d, i) {
        for (var h = d[1], d = d[0], f = 0; f < b.length + 1; f++) {
            for (var g = a._ || [], n = [], q = 0; q < g.length; q++) {
                var o = g[q];
                this.callbacksMap[o] != null && (i[o] = i[o] || {},
                i[o][e] = i[o][e] || [],
                i[o][e].push(d),
                n.push(o))
            }
            a._ = n;
            g = b[f];
            if (a["" + h[g]] != null)
                a = a["" + h[g]];
            else
                break
        }
    }
    ;
    D.CallbacksBackend.prototype.subscribeEmpty = function(a, b) {
        var e = this.emptyNotificationsMap[a] || [];
        e.push(b);
        this.emptyNotificationsMap[a] = e
    }
    ;
    D.CallbacksBackend.prototype.unsubscribeEmpty = function(a, b) {
        var e = this.emptyNotificationsMap[a];
        e != null && (e = s.remove(e, b));
        this.emptyNotificationsMap[a] = e
    }
    ;
    D.CallbacksBackend.prototype.subscribe = function(a, b, e, d, i, h) {
        a = this._tokenizeComponents(a, b, e, d);
        b = {
            blanks: {},
            outCache: {}
        };
        this.engine.registerNsInEnvironment(null, b);
        a = this.engine.normalizeQuad(a, b, !0);
        e = this._indexForPattern(new U.Pattern(a));
        b = this.componentOrders[e];
        e = this.indexMap[e];
        for (d = 0; d < b.length; d++) {
            var f = a[b[d]];
            if (f === "_") {
                e._ == null && (e._ = []);
                this.callbackCounter++;
                e._.push(this.callbackCounter);
                this.callbacksMap[this.callbackCounter] = i;
                this.callbacksInverseMap[i] = this.callbackCounter;
                break
            } else
                d === b.length - 1 ? (e[f] = e[f] || {
                    _: []
                },
                this.callbackCounter++,
                e[f]._.push(this.callbackCounter),
                this.callbacksMap[this.callbackCounter] = i,
                this.callbacksInverseMap[i] = this.callbackCounter) : (e[f] = e[f] || {},
                e = e[f])
        }
        h != null && h(!0)
    }
    ;
    D.CallbacksBackend.prototype.unsubscribe = function(a) {
        var b = this.callbacksInverseMap[a];
        b != null && (delete this.callbacksInverseMap[a],
        delete this.callbacksMap[b])
    }
    ;
    D.CallbacksBackend.prototype._tokenizeComponents = function(a, b, e, d) {
        var i = {};
        i.subject = a == null ? D.ANYTHING : a.indexOf("_:") == 0 ? {
            token: "blank",
            value: a
        } : {
            token: "uri",
            value: a
        };
        i.predicate = b == null ? D.ANYTHING : {
            token: "uri",
            value: b
        };
        i.object = e == null ? D.ANYTHING : {
            token: "uri",
            value: e
        };
        i.graph = d == null ? D.ANYTHING : {
            token: "uri",
            value: d
        };
        return i
    }
    ;
    D.CallbacksBackend.prototype._indexForPattern = function(a) {
        for (var a = a.indexKey, b = this.indices, e = 0; e < b.length; e++)
            for (var d = b[e], i = this.componentOrders[d], h = 0; h < i.length; h++) {
                if (s.include(a, i[h]) === !1)
                    break;
                if (h == a.length - 1)
                    return d
            }
        return "SPOG"
    }
    ;
    D.CallbacksBackend.prototype.observeNode = function() {
        var a, b, e, d;
        arguments.length === 4 ? (a = arguments[0],
        b = arguments[1],
        e = arguments[2],
        d = arguments[3]) : (a = arguments[0],
        b = this.engine.lexicon.defaultGraphUri,
        e = arguments[1],
        d = arguments[2]);
        b = "CONSTRUCT { <" + a + "> ?p ?o } WHERE { GRAPH <" + b + "> { <" + a + "> ?p ?o } }";
        var i = this
          , h = {
            blanks: {},
            outCache: {}
        };
        this.engine.registerNsInEnvironment(null, h);
        var f = [];
        this.engine.execute(b, function(b, g) {
            if (b) {
                var q = !1
                  , o = function(a, b) {
                    if (a === "eventsFlushed" && q) {
                        q = !1;
                        try {
                            e(g)
                        } catch (d) {}
                    } else if (a !== "eventsFlushed") {
                        q = !0;
                        for (var m = 0; m < b.length; m++) {
                            var o = b[m]
                              , s = r.buildRDFResource(o.subject, f, i.engine, h)
                              , z = r.buildRDFResource(o.predicate, f, i.engine, h)
                              , o = r.buildRDFResource(o.object, f, i.engine, h);
                            s != null && z != null && o != null && (o = new r.Triple(s,z,o),
                            a === D.added ? g.add(o) : a === D.deleted && g.remove(o))
                        }
                    }
                };
                i.observersMap[e] = o;
                i.subscribeEmpty(D.eventsFlushed, o);
                i.subscribe(a, null, null, null, o, function() {
                    try {
                        e(g)
                    } catch (a) {}
                    d && d(!0)
                })
            } else
                d && d(!1)
        })
    }
    ;
    D.CallbacksBackend.prototype.stopObservingNode = function(a) {
        return (a = this.observersMap[a]) ? (this.unsubscribe(a),
        this.unsubscribeEmpty(D.eventsFlushed, a),
        !0) : !1
    }
    ;
    D.CallbacksBackend.prototype.observeQuery = function(a, b, e) {
        var d = this.aqt.collectBasicTriples(this.aqt.parseSelect(this.aqt.parseQueryString(a).units[0]))
          , i = {
            blanks: {},
            outCache: {}
        };
        this.engine.registerNsInEnvironment(null, i);
        var h, f, g, n = this.queryCounter;
        this.queryCounter++;
        this.queriesMap[n] = a;
        this.queriesInverseMap[a] = n;
        this.queriesList.push(n);
        this.queriesCallbacksMap[n] = b;
        for (var q = 0; q < d.length; q++) {
            f = d[q];
            if (f.graph == null)
                f.graph = this.engine.lexicon.defaultGraphUriTerm;
            f = this.engine.normalizeQuad(f, i, !0);
            h = new U.Pattern(f);
            g = this._indexForPattern(h);
            h = this.componentOrders[g];
            g = this.queriesIndexMap[g];
            for (var o = 0; o < h.length; o++) {
                var r = f[h[o]];
                if (typeof r === "string") {
                    g._ == null && (g._ = []);
                    g._.push(n);
                    break
                } else
                    o === h.length - 1 ? (g[r] = g[r] || {
                        _: []
                    },
                    g[r]._.push(n)) : (g[r] = g[r] || {},
                    g = g[r])
            }
        }
        this.engine.execute(a, function(a, d) {
            a ? b(d) : console.log("ERROR in query callback " + d)
        });
        e != null && e()
    }
    ;
    D.CallbacksBackend.prototype.stopObservingQuery = function(a) {
        var b = this.queriesInverseMap[a];
        if (b != null)
            delete this.queriesInverseMap[a],
            delete this.queriesMap[b],
            this.queriesList = s.remove(this.queriesList, b)
    }
    ;
    D.CallbacksBackend.prototype._searchQueriesInIndex = function(a, b, e) {
        for (var e = e[1], d = 0; d < b.length + 1; d++) {
            for (var i = a._ || [], h = [], f = 0; f < i.length; f++) {
                var g = i[f];
                s.include(this.pendingQueries, g) && (s.remove(this.pendingQueries, g),
                this.matchedQueries.push(g));
                this.queriesMap[g] != null && h.push(g)
            }
            a._ = h;
            i = b[d];
            if (a["" + e[i]] != null)
                a = a["" + e[i]];
            else
                break
        }
    }
    ;
    D.CallbacksBackend.prototype.dispatchQueries = function(a) {
        var b = this, e, d, i, h, f = {};
        s.repeat(0, this.matchedQueries.length, function(a, g) {
            e = arguments.callee;
            i = b.matchedQueries[g._i];
            f[i] == null ? (f[i] = !0,
            d = b.queriesMap[i],
            h = b.queriesCallbacksMap[i],
            s.recur(function() {
                b.engine.execute(d, function(b, d) {
                    if (b)
                        try {
                            h(d)
                        } catch (f) {}
                    a(e, g)
                })
            })) : a(e, g)
        }, function() {
            a()
        })
    }
    ;
    var K = {};
    try {
        typeof Worker == "undefined" && (Worker = null)
    } catch (vc) {
        Worker = null
    }
    if (Worker)
        K.RDFStoreClient = function(a, b, e) {
            console.log("trying to load " + a);
            this.connection = Worker.Worker ? new Worker.Worker(a) : new Worker(a);
            this.callbacksCounter = 1;
            var d = this;
            this.rdf = r.rdf;
            console.log("The worker");
            console.log(this.connection);
            d = this;
            this.connection.onmessage = function(a) {
                d.receive(a)
            }
            ;
            this.observingCallbacks = {};
            this.callbacks = {
                0: {
                    cb: function(a, b) {
                        a === !0 ? e(!0, d) : e(!1, b)
                    },
                    fn: "create"
                }
            };
            this.connection.postMessage({
                fn: "create",
                args: b,
                callback: "0"
            })
        }
        ,
        K.RDFStoreClient.prototype.receive = function(a) {
            a = a.data || a;
            if (a.fn === "workerRequest:NetworkTransport:load") {
                var b = this
                  , e = a.callback
                  , a = a.arguments.concat(function(a, d) {
                    b.connection.postMessage({
                        fn: "workerRequestResponse",
                        results: [a, d],
                        callback: e
                    })
                });
                Q.load.apply(Q, a)
            } else {
                var d = this.callbacks[a.callback];
                d && (d.fn === "create" || d.fn === "execute" || d.fn === "insert" || d.fn == "graph" || d.fn === "node" || d.fn === "insert" || d.fn === "delete" || d.fn === "clear" || d.fn === "load" || d.fn === "startObservingQueryEndCb" || d.fn === "registeredGraphs" ? (delete this.callbacks[a.callback],
                d.cb(a.success, a.result)) : d.fn === "startObservingQuery" ? d.cb(a.result) : d.fn === "startObservingNode" ? d.cb(a.result) : d.fn === "subscribe" && d.cb(a.event, a.result))
            }
        }
        ,
        K.RDFStoreClient.prototype.registerCallback = function(a, b) {
            var e = "" + this.callbacksCounter;
            this.callbacks[e] = {
                fn: a,
                cb: b
            };
            this.callbacksCounter++;
            return e
        }
        ,
        K.RDFStoreClient.prototype.execute = function() {
            if (arguments.length === 3)
                this.executeWithEnvironment(arguments[0], arguments[1], arguments[2]);
            else if (arguments.length === 4)
                this.executeWithEnvironment(arguments[0], arguments[1], arguments[2], arguments[3]);
            else {
                var a, b;
                arguments.length === 1 ? (a = arguments[0],
                b = function() {}
                ) : arguments.length === 2 && (a = arguments[0],
                b = arguments[1]);
                b = this.registerCallback("execute", b);
                this.connection.postMessage({
                    fn: "execute",
                    args: [a],
                    callback: b
                })
            }
        }
        ,
        K.RDFStoreClient.prototype.insert = function() {
            var a, b, e;
            if (arguments.length === 1)
                b = arguments[0],
                this.connection.postMessage({
                    fn: "insert",
                    args: [b]
                });
            else if (arguments.length === 2)
                b = arguments[0],
                e = arguments[1] || function() {}
                ,
                e = this.registerCallback("insert", e),
                this.connection.postMessage({
                    fn: "insert",
                    args: [b],
                    callback: e
                });
            else if (arguments.length === 3)
                b = arguments[0],
                a = arguments[1],
                e = arguments[2] || function() {}
                ,
                e = this.registerCallback("insert", e),
                this.connection.postMessage({
                    fn: "insert",
                    args: [b, a],
                    callback: e
                });
            else
                throw "The triples to insert, an optional graph and callback must be provided";
        }
        ,
        K.RDFStoreClient.prototype.graph = function() {
            var a = null
              , b = null;
            if (arguments.length === 1)
                b = arguments[0] || function() {}
                ;
            else if (arguments.length === 2)
                b = arguments[1] || function() {}
                ,
                a = arguments[0];
            else
                throw "An optional graph URI and a callback function must be provided";
            var e = this
              , d = this.registerCallback("insert", function(a, d) {
                if (a) {
                    for (var f, g = 0; g < d.triples.length; g++)
                        f = d.triples[g],
                        d.triples[g] = new r.Triple(e.adaptJSInterface(f.subject),e.adaptJSInterface(f.predicate),e.adaptJSInterface(f.object));
                    b(a, e.rdf.createGraph(d.triples))
                } else
                    b(a, d)
            });
            a == null ? this.connection.postMessage({
                fn: "graph",
                args: [],
                callback: d
            }) : this.connection.postMessage({
                fn: "graph",
                args: [a],
                callback: d
            })
        }
        ,
        K.RDFStoreClient.prototype.node = function() {
            var a = null
              , b = null
              , e = null;
            if (arguments.length === 2)
                e = arguments[0],
                b = arguments[1] || function() {}
                ;
            else if (arguments.length === 3)
                e = arguments[0],
                a = arguments[1],
                b = arguments[2] || function() {}
                ;
            else
                throw "An optional graph URI and a callback function must be provided";
            var d = this
              , g = this.registerCallback("insert", function(a, e) {
                if (a) {
                    for (var g, i = 0; i < e.triples.length; i++)
                        g = e.triples[i],
                        e.triples[i] = new r.Triple(d.adaptJSInterface(g.subject),d.adaptJSInterface(g.predicate),d.adaptJSInterface(g.object));
                    b(a, d.rdf.createGraph(e.triples))
                } else
                    b(a, e)
            });
            a == null ? this.connection.postMessage({
                fn: "node",
                args: [e],
                callback: g
            }) : this.connection.postMessage({
                fn: "node",
                args: [e, a],
                callback: g
            })
        }
        ,
        K.RDFStoreClient.prototype.setPrefix = function(a, b) {
            this.rdf.setPrefix(a, b);
            this.connection.postMessage({
                fn: "rdf/setPrefix",
                args: [a, b],
                callback: null
            })
        }
        ,
        K.RDFStoreClient.prototype.setDefaultPrefix = function(a) {
            this.rdf.setDefaultPrefix(a);
            this.connection.postMessage({
                fn: "rdf/setDefaultPrefix",
                args: [a],
                callback: null
            })
        }
        ,
        K.RDFStoreClient.prototype["delete"] = function() {
            var a, b, e;
            if (arguments.length === 1)
                b = arguments[0],
                this.connection.postMessage({
                    fn: "delete",
                    args: [b]
                });
            else if (arguments.length === 2)
                b = arguments[0],
                e = arguments[1] || function() {}
                ,
                e = this.registerCallback("delete", e),
                this.connection.postMessage({
                    fn: "delete",
                    args: [b],
                    callback: e
                });
            else if (arguments.length === 3)
                b = arguments[0],
                a = arguments[1],
                e = arguments[2] || function() {}
                ,
                e = this.registerCallback("delete", e),
                this.connection.postMessage({
                    fn: "delete",
                    args: [b, a],
                    callback: e
                });
            else
                throw "The triples to delete, an optional graph and callback must be provided";
        }
        ,
        K.RDFStoreClient.prototype.clear = function() {
            var a, b;
            if (arguments.length === 1)
                b = arguments[0] || function() {}
                ,
                b = this.registerCallback("clear", b),
                this.connection.postMessage({
                    fn: "clear",
                    args: [],
                    callback: b
                });
            else if (arguments.length === 2)
                a = arguments[0],
                b = arguments[1] || function() {}
                ,
                b = this.registerCallback("clear", b),
                this.connection.postMessage({
                    fn: "clear",
                    args: [a],
                    callback: b
                });
            else
                throw "The optional graph and a callback must be provided";
        }
        ,
        K.RDFStoreClient.prototype.setBatchLoadEvents = function(a) {
            this.connection.postMessage({
                fn: "setBatchLoadEvents",
                args: [a]
            })
        }
        ,
        K.RDFStoreClient.prototype.registerDefaultNamespace = function(a, b) {
            this.connection.postMessage({
                fn: "registerDefaultNamespace",
                args: [a, b]
            })
        }
        ,
        K.RDFStoreClient.prototype.registerDefaultProfileNamespaces = function() {
            this.connection.postMessage({
                fn: "registerDefaultProfileNamespaces",
                args: []
            })
        }
        ,
        K.RDFStoreClient.prototype.load = function() {
            var a, b, e, d;
            if (arguments.length === 3)
                a = arguments[0],
                b = arguments[1],
                d = arguments[2] || function() {}
                ,
                d = this.registerCallback("load", d),
                this.connection.postMessage({
                    fn: "load",
                    args: [a, b],
                    callback: d
                });
            else if (arguments.length === 4)
                a = arguments[0],
                b = arguments[1],
                e = arguments[2],
                d = arguments[3] || function() {}
                ,
                d = this.registerCallback("load", d),
                this.connection.postMessage({
                    fn: "load",
                    args: [a, b, e],
                    callback: d
                });
            else if (arguments.length === 2)
                throw "The mediaType of the parser, the data a callback and an optional graph must be provided";
        }
        ,
        K.RDFStoreClient.prototype.startObservingQuery = function(a, b, e) {
            e != null ? (b = this.registerCallback("startObservingQuery", b),
            this.observingCallbacks[a] = b,
            e = this.registerCallback("startObservingQueryEndCb", e),
            this.connection.postMessage({
                fn: "startObservingQuery",
                args: [a],
                callback: [b, e]
            })) : (b = this.registerCallback("startObservingQuery", b),
            this.observingCallbacks[a] = b,
            this.connection.postMessage({
                fn: "startObservingQuery",
                args: [a],
                callback: [b]
            }))
        }
        ,
        K.RDFStoreClient.prototype.stopObservingQuery = function(a) {
            var b = this.observingCallbacks[a];
            delete this.observingCallbacks[a];
            delete this.callbacks[b];
            this.connection.postMessage({
                fn: "stopObservingQuery",
                args: [a],
                callback: []
            })
        }
        ,
        K.RDFStoreClient.prototype.startObservingNode = function() {
            var a, b, e;
            if (arguments.length === 2) {
                a = arguments[0];
                e = arguments[1];
                var d = this
                  , g = this.registerCallback("startObservingNode", function(a) {
                    for (var b, g = 0; g < a.triples.length; g++)
                        b = a.triples[g],
                        a.triples[g] = new r.Triple(d.adaptJSInterface(b.subject),d.adaptJSInterface(b.predicate),d.adaptJSInterface(b.object));
                    e(d.rdf.createGraph(a.triples))
                });
                this.observingCallbacks[e] = g;
                this.connection.postMessage({
                    fn: "startObservingNode",
                    args: [a],
                    callback: g
                })
            } else
                arguments.length === 3 && (a = arguments[0],
                b = arguments[1],
                e = arguments[2],
                d = this,
                g = this.registerCallback("startObservingNode", function(a) {
                    for (var b, g = 0; g < a.triples.length; g++)
                        b = a.triples[g],
                        a.triples[g] = new r.Triple(d.adaptJSInterface(b.subject),d.adaptJSInterface(b.predicate),d.adaptJSInterface(b.object));
                    e(d.rdf.createGraph(a.triples))
                }),
                this.observingCallbacks[e] = g,
                this.connection.postMessage({
                    fn: "startObservingNode",
                    args: [a, b],
                    callback: g
                }))
        }
        ,
        K.RDFStoreClient.prototype.stopObservingNode = function(a) {
            var b = this.observingCallbacks[a];
            delete this.observingCallbacks[a];
            delete this.callbacks[b];
            this.connection.postMessage({
                fn: "stopObservingNode",
                args: [b],
                callback: []
            })
        }
        ,
        K.RDFStoreClient.prototype.subscribe = function(a, b, e, d, g) {
            var h = this
              , f = this.registerCallback("subscribe", function(a, b) {
                for (var d, e = 0; e < b.length; e++)
                    d = b[e],
                    b[e] = new r.Triple(h.adaptJSInterface(d.subject),h.adaptJSInterface(d.predicate),h.adaptJSInterface(d.object));
                g(a, b)
            });
            this.observingCallbacks[g] = f;
            this.connection.postMessage({
                fn: "subscribe",
                args: [a, b, e, d],
                callback: f
            })
        }
        ,
        K.RDFStoreClient.prototype.unsubscribe = function(a) {
            var b = this.observingCallbacks[a];
            delete this.observingCallbacks[a];
            delete this.callbacks[b];
            this.connection.postMessage({
                fn: "unsubscribe",
                args: [b],
                callback: []
            })
        }
        ,
        K.RDFStoreClient.prototype.registeredGraphs = function(a) {
            var b = this;
            this.connection.postMessage({
                fn: "registeredGraphs",
                args: [],
                callback: this.registerCallback("registeredGraphs", function(e, d) {
                    if (e)
                        for (var g = 0; g < d.length; g++)
                            d[g] = b.adaptJSInterface(d[g]);
                    a(e, d)
                })
            })
        }
        ,
        K.RDFStoreClient.prototype.adaptJSInterface = function(a) {
            if (a.interfaceName === "BlankNode")
                return new r.BlankNode(a.bnodeId);
            else if (a.interfaceName === "Literal")
                return new r.Literal(a.nominalValue,a.language,a.datatype);
            else if (a.interfaceName === "NamedNode")
                return new r.NamedNode(a.nominalValue)
        }
        ,
        K.RDFStoreClient.prototype.isWebWorkerConnection = !0;
    var A = {}
      , uc = {
        MongodbQueryEngine: function() {
            throw "MongoDB backend not supported in the browser version";
        }
    };
    A.VERSION = "0.8.1";
    A.connect = function() {
        var a, b, e;
        arguments.length == 1 && (a = __dirname,
        b = {},
        e = arguments[0]);
        arguments.length == 2 ? (typeof arguments[0] === "string" ? (a = arguments[0],
        b = {}) : (a = __dirname + "/index.js",
        b = arguments[0]),
        e = arguments[1]) : (a = arguments[0],
        b = arguments[1],
        e = arguments[2]);
        try {
            Worker ? new K.RDFStoreClient(a,b,function(a, b) {
                e(a, b)
            }
            ) : A.create(b, function(a) {
                e(!1, a)
            })
        } catch (d) {
            A.create(b, function(a) {
                e(!1, a)
            })
        }
    }
    ;
    A.create = function() {
        return arguments.length == 1 ? new A.Store(arguments[0]) : arguments.length == 2 ? new A.Store(arguments[0],arguments[1]) : new A.Store
    }
    ;
    A.Store = function(a, b) {
        var e = null
          , d = null;
        if (arguments.length == 0)
            d = {};
        else if (arguments.length == 1)
            d = {},
            e = a;
        else if (arguments.length > 1)
            d = a,
            e = b;
        else
            throw "An optional argument map and a callback must be provided";
        d.treeOrder == null && (d.treeOrder = 15);
        this.functionMap = {};
        var g = this;
        this.customFns = {};
        d.engine === "mongodb" ? (this.isMongodb = !0,
        this.engine = new uc.MongodbQueryEngine(d),
        this.engine.readConfiguration(function() {
            d.overwrite === !0 ? g.engine.clean(function() {
                e(g)
            }) : e(g)
        })) : new I.Lexicon(function(a) {
            d.overwrite === !0 && a.clear();
            new W.QuadBackend(d,function(b) {
                d.overwrite === !0 && b.clear();
                d.backend = b;
                d.lexicon = a;
                g.engine = new C.QueryEngine(d);
                e && e(g)
            }
            )
        }
        ,d.name)
    }
    ;
    A.Store.prototype.rdf = r.rdf;
    A.Store.prototype.rdf.api = r;
    A.Store.prototype.registerCustomFunction = function(a, b) {
        this.customFns[a] = b;
        this.engine.setCustomFunctions(this.customFns)
    }
    ;
    A.Store.prototype.execute = function() {
        if (arguments.length === 3)
            this.executeWithEnvironment(arguments[0], arguments[1], arguments[2]);
        else if (arguments.length === 4)
            this.executeWithEnvironment(arguments[0], arguments[1], arguments[2], arguments[3]);
        else {
            var a, b;
            arguments.length === 1 ? (a = arguments[0],
            b = function() {}
            ) : arguments.length === 2 && (a = arguments[0],
            b = arguments[1]);
            this.engine.execute(a, b)
        }
    }
    ;
    A.Store.prototype.executeWithEnvironment = function() {
        var a, b, e;
        if (arguments.length === 3) {
            a = arguments[0];
            var d = function() {};
            b = arguments[1];
            e = arguments[2]
        } else
            arguments.length === 4 && (a = arguments[0],
            d = arguments[3],
            b = arguments[1],
            e = arguments[2]);
        for (var g = [], h = [], f = 0; f < b.length; f++)
            g.push({
                token: "uri",
                value: b[f]
            });
        for (f = 0; f < e.length; f++)
            h.push({
                token: "uri",
                value: e[f]
            });
        this.engine.execute(a, d, g, h)
    }
    ;
    A.Store.prototype.graph = function() {
        var a = null
          , b = null;
        if (arguments.length === 1)
            b = arguments[0] || function() {}
            ,
            a = this.engine.lexicon.defaultGraphUri;
        else if (arguments.length === 2)
            b = arguments[1] || function() {}
            ,
            a = arguments[0];
        else
            throw "An optional graph URI and a callback function must be provided";
        this.rdf.resolve(a) != null && (a = this.rdf.resolve(a));
        this.engine.execute("CONSTRUCT { ?s ?p ?o } WHERE { GRAPH <" + a + "> { ?s ?p ?o } }", b)
    }
    ;
    A.Store.prototype.node = function() {
        var a = null
          , b = null
          , e = null;
        if (arguments.length === 2)
            e = arguments[0],
            b = arguments[1] || function() {}
            ,
            a = this.engine.lexicon.defaultGraphUri;
        else if (arguments.length === 3)
            e = arguments[0],
            a = arguments[1],
            b = arguments[2] || function() {}
            ;
        else
            throw "An optional graph URI, node URI and a callback function must be provided";
        this.rdf.resolve(a) != null && (a = this.rdf.resolve(a));
        this.rdf.resolve(e) != null && (e = this.rdf.resolve(e));
        this.engine.execute("CONSTRUCT { <" + e + "> ?p ?o } WHERE { GRAPH <" + a + "> { <" + e + "> ?p ?o } }", b)
    }
    ;
    A.Store.prototype.startObservingNode = function() {
        var a, b, e;
        arguments.length === 2 ? (a = arguments[0],
        e = arguments[1],
        this.engine.callbacksBackend.observeNode(a, e, function() {})) : arguments.length === 3 && (a = arguments[0],
        b = arguments[1],
        e = arguments[2],
        this.engine.callbacksBackend.observeNode(a, b, e, function() {}))
    }
    ;
    A.Store.prototype.stopObservingNode = function(a) {
        this.engine.callbacksBackend.stopObservingNode(a)
    }
    ;
    A.Store.prototype.startObservingQuery = function(a, b, e) {
        e != null ? this.engine.callbacksBackend.observeQuery(a, b, e) : this.engine.callbacksBackend.observeQuery(a, b, function() {})
    }
    ;
    A.Store.prototype.stopObservingQuery = function(a) {
        this.engine.callbacksBackend.stopObservingQuery(a)
    }
    ;
    A.Store.prototype.subscribe = function(a, b, e, d, g) {
        var h = this
          , f = function(a, b) {
            for (var d = [], e = {
                blanks: {},
                outCache: {}
            }, f = [], s = 0; s < b.length; s++) {
                var x = b[s]
                  , z = r.buildRDFResource(x.subject, f, h.engine, e)
                  , t = r.buildRDFResource(x.predicate, f, h.engine, e)
                  , x = r.buildRDFResource(x.object, f, h.engine, e);
                z != null && t != null && x != null && (x = new r.Triple(z,t,x),
                d.push(x))
            }
            g(a, d)
        };
        this.functionMap[g] = f;
        this.engine.callbacksBackend.subscribe(a, b, e, d, f, function() {})
    }
    ;
    A.Store.prototype.unsubscribe = function(a) {
        this.engine.callbacksBackend.unsubscribe(this.functionMap[a]);
        delete this.functionMap[a]
    }
    ;
    A.Store.prototype.setPrefix = function(a, b) {
        this.rdf.setPrefix(a, b)
    }
    ;
    A.Store.prototype.setDefaultPrefix = function(a) {
        this.rdf.setDefaultPrefix(a)
    }
    ;
    A.Store.prototype.insert = function() {
        var a, b, e;
        if (arguments.length === 1)
            b = arguments[0];
        else if (arguments.length === 2)
            a = this.rdf.createNamedNode(this.engine.lexicon.defaultGraphUri),
            b = arguments[0],
            e = arguments[1] || function() {}
            ;
        else if (arguments.length === 3)
            b = arguments[0],
            a = this.rdf.createNamedNode(arguments[1]),
            e = arguments[2] || function() {}
            ;
        else
            throw "The triples to insert, an optional graph and callback must be provided";
        var d = ""
          , g = this;
        b.forEach(function(a) {
            d = d + g._nodeToQuery(a.subject) + g._nodeToQuery(a.predicate) + g._nodeToQuery(a.object) + "."
        });
        d = a != null ? "INSERT DATA { GRAPH " + this._nodeToQuery(a) + " { " + d + " } }" : "INSERT DATA { " + this._nodeToQuery(a) + " { " + d + " }";
        this.engine.execute(d, e)
    }
    ;
    A.Store.prototype._nodeToQuery = function(a) {
        if (a.interfaceName === "NamedNode") {
            var b = this.rdf.resolve(a.valueOf());
            return b != null ? "<" + b + ">" : "<" + a.valueOf() + ">"
        } else {
            if (a.interfaceName !== "")
                if (a.lang != null)
                    return '"' + a.valueOf() + '"@' + a.lang;
                else if (a.datatype != null)
                    return '"' + a.valueOf() + '"^^<' + a.datatype + ">";
            return a.toString()
        }
    }
    ;
    A.Store.prototype["delete"] = function() {
        var a, b, e;
        if (arguments.length === 1)
            b = arguments[0];
        else if (arguments.length === 2)
            a = this.rdf.createNamedNode(this.engine.lexicon.defaultGraphUri),
            b = arguments[0],
            e = arguments[1] || function() {}
            ;
        else if (arguments.length === 3)
            b = arguments[0],
            a = this.rdf.createNamedNode(arguments[1]),
            e = arguments[2] || function() {}
            ;
        else
            throw "The triples to delete, an optional graph and callback must be provided";
        var d = ""
          , g = this;
        b.forEach(function(a) {
            d = d + g._nodeToQuery(a.subject) + g._nodeToQuery(a.predicate) + g._nodeToQuery(a.object) + "."
        });
        d = a != null ? "DELETE DATA { GRAPH " + this._nodeToQuery(a) + " { " + d + " } }" : "DELETE DATA { " + this._nodeToQuery(a) + " { " + d + " }";
        this.engine.execute(d, e)
    }
    ;
    A.Store.prototype.clear = function() {
        var a, b;
        if (arguments.length === 0)
            a = this.rdf.createNamedNode(this.engine.lexicon.defaultGraphUri),
            b = function() {}
            ;
        else if (arguments.length === 1)
            a = this.rdf.createNamedNode(this.engine.lexicon.defaultGraphUri),
            b = arguments[0] || function() {}
            ;
        else if (arguments.length === 2)
            a = this.rdf.createNamedNode(arguments[0]),
            b = arguments[1] || function() {}
            ;
        else
            throw "The optional graph and a callback must be provided";
        this.engine.execute("CLEAR GRAPH " + this._nodeToQuery(a), b)
    }
    ;
    A.Store.prototype.setBatchLoadEvents = function(a) {
        this.engine.eventsOnBatchLoad = a
    }
    ;
    A.Store.prototype.registerDefaultNamespace = function(a, b) {
        this.rdf.prefixes.set(a, b);
        this.engine.registerDefaultNamespace(a, b)
    }
    ;
    A.Store.prototype.registerDefaultProfileNamespaces = function() {
        var a = this.rdf.prefixes.values(), b;
        for (b in a)
            this.registerDefaultNamespace(b, a[b])
    }
    ;
    A.Store.prototype.load = function() {
        var a, b, e, d;
        if (arguments.length === 3)
            e = this.rdf.createNamedNode(this.engine.lexicon.defaultGraphUri),
            a = arguments[0],
            b = arguments[1],
            d = arguments[2] || function() {}
            ;
        else if (arguments.length === 4)
            a = arguments[0],
            b = arguments[1],
            e = this.rdf.createNamedNode(arguments[2]),
            d = arguments[3] || function() {}
            ;
        else if (arguments.length === 2)
            throw "The mediaType of the parser, the data a callback and an optional graph must be provided";
        if (a === "remote")
            b = this.rdf.createNamedNode(b),
            this.engine.execute("LOAD <" + b.valueOf() + "> INTO GRAPH <" + e.valueOf() + ">", d);
        else if (b && typeof b === "string" && b.indexOf("file://") === 0) {
            a = this.engine.rdfLoader.parsers[a];
            var g = this;
            this.engine.rdfLoader.loadFromFile(a, {
                token: "uri",
                value: e.valueOf()
            }, b, function(a, b) {
                a ? g.engine.batchLoad(b, d) : d(a, b)
            })
        } else
            a = this.engine.rdfLoader.parsers[a],
            g = this,
            this.engine.rdfLoader.tryToParse(a, {
                token: "uri",
                value: e.valueOf()
            }, b, function(a, b) {
                a ? g.engine.batchLoad(b, d) : d(a, b)
            })
    }
    ;
    A.Store.prototype.registerParser = function(a, b) {
        this.engine.rdfLoader.registerParser(a, b)
    }
    ;
    A.Store.prototype.registeredGraphs = function(a) {
        if (this.isMongodb)
            this.engine.registeredGraphs(!0, function(b) {
                for (var d = [], e = 0; e < b.length; e++) {
                    var g = new r.NamedNode(b[e]);
                    d.push(g)
                }
                return a(!0, d)
            });
        else {
            for (var b = this.engine.lexicon.registeredGraphs(!0), e = [], d = 0; d < b.length; d++) {
                var g = new r.NamedNode(b[d]);
                e.push(g)
            }
            return a(!0, e)
        }
    }
    ;
    A.Store.prototype._nodeToQuery = function(a) {
        if (a.interfaceName === "NamedNode") {
            var b = this.rdf.resolve(a.valueOf());
            return b != null ? "<" + b + ">" : "<" + a.valueOf() + ">"
        } else
            return a.toString()
    }
    ;
    A.Store.prototype.getNetworkTransport = function() {
        return Q
    }
    ;
    A.Store.prototype.setNetworkTransport = function(a) {
        Q = a
    }
    ;
    A.Store.prototype.close = function(a) {
        a == null && (a = function() {}
        );
        this.engine.close ? this.engine.close(a) : a()
    }
    ;
    RDFStoreWorker = {
        observingCallbacks: {},
        workerCallbacksCounter: 0,
        workerCallbacks: {}
    };
    RDFStoreWorker.registerCallback = function(a) {
        var b = "" + RDFStoreWorker.workerCallbacksCounter;
        RDFStoreWorker.workerCallbacksCounter++;
        RDFStoreWorker.workerCallbacks[b] = a;
        return b
    }
    ;
    RDFStoreWorker.handleCreate = function(a, b) {
        typeof Q != "undefined" && Q != null && (Q = {
            load: function(a, b, e) {
                var f = RDFStoreWorker.registerCallback(function(a) {
                    e.apply(e, a)
                });
                postMessage({
                    fn: "workerRequest:NetworkTransport:load",
                    callback: f,
                    arguments: [a, b]
                })
            },
            loadFromFile: function() {}
        });
        var e = [a];
        e.push(function(a) {
            RDFStoreWorker.store = a;
            postMessage({
                callback: b,
                result: "created",
                success: !0
            })
        });
        A.create.apply(A, e)
    }
    ;
    RDFStoreWorker.receive = function(a) {
        var b = a.data || a;
        if (b.fn === "workerRequestResponse") {
            var e = b.callback
              , d = RDFStoreWorker.workerCallbacks[e];
            d != null && (delete RDFStoreWorker.workerCallbacks[e],
            d(b.results))
        } else if (b.fn === "create" && b.args != null)
            RDFStoreWorker.handleCreate(b.args, b.callback);
        else if (b.fn === "setBatchLoadEvents")
            RDFStoreWorker.store[b.fn].apply(RDFStoreWorker.store, b.args);
        else if (b.fn === "registerDefaultNamespace")
            RDFStoreWorker.store[b.fn].apply(RDFStoreWorker.store, b.args);
        else if (b.fn === "registerDefaultProfileNamespaces")
            RDFStoreWorker.store[b.fn].apply(RDFStoreWorker.store, b.args);
        else if ((b.fn === "execute" || b.fn === "executeWithEnvironment" || b.fn === "graph" || b.fn === "node" || b.fn === "clear" || b.fn === "load") && b.args != null) {
            b.args.push(function(a, d) {
                b.callback != null && postMessage({
                    callback: b.callback,
                    result: d,
                    success: a
                })
            });
            try {
                RDFStoreWorker.store[b.fn].apply(RDFStoreWorker.store, b.args)
            } catch (g) {
                console.log("Error executing method through connection"),
                console.log(g)
            }
        } else if ((b.fn === "insert" || b.fn === "delete") && b.args != null)
            try {
                b.args.push(function(a, d) {
                    b.callback != null && postMessage({
                        callback: b.callback,
                        result: d,
                        success: a
                    })
                });
                d = b.args[0];
                for (a = 0; a < d.triples.length; a++)
                    e = d.triples[a],
                    d.triples[a] = new r.Triple(RDFStoreWorker.adaptJSInterface(e.subject),RDFStoreWorker.adaptJSInterface(e.predicate),RDFStoreWorker.adaptJSInterface(e.object));
                b.args[1].interfaceName != null && (b.args[1] = RDFStoreWorker.adaptJSInterface(b.args[1]));
                b.args[0] = RDFStoreWorker.store.rdf.createGraph(d.triples);
                RDFStoreWorker.store[b.fn].apply(RDFStoreWorker.store, b.args)
            } catch (h) {
                console.log("Error executing method through connection"),
                console.log(h)
            }
        else
            b.fn === "rdf/setPrefix" && b.args != null ? RDFStoreWorker.store.rdf.setPrefix(b.args[0], b.args[1]) : b.fn === "rdf/setDefaultPrefix" && b.args != null ? RDFStoreWorker.store.rdf.setDefaultPrefix(b.args[0]) : b.fn === "startObservingQuery" && b.args != null ? (e = function(a, d) {
                postMessage({
                    callback: b.callback[0],
                    result: d,
                    success: a
                })
            }
            ,
            RDFStoreWorker.observingCallbacks[b.args[0]] = e,
            b.args.push(e),
            b.args.push(function(a, d) {
                b.callback && b.callback[1] != null && postMessage({
                    callback: b.callback[1],
                    result: d,
                    success: a
                })
            }),
            RDFStoreWorker.store[b.fn].apply(RDFStoreWorker.store, b.args)) : b.fn === "stopObservingQuery" ? ((e = RDFStoreWorker.observingCallbacks[b.args[0]]) && RDFStoreWorker.store[b.fn].apply(RDFStoreWorker.store, [e]),
            delete RDFStoreWorker.observingCallbacks[b.args[0]]) : b.fn === "startObservingNode" && b.args != null ? (e = function(a) {
                postMessage({
                    callback: b.callback,
                    result: a
                })
            }
            ,
            RDFStoreWorker.observingCallbacks[b.callback] = e,
            b.args.push(e),
            RDFStoreWorker.store[b.fn].apply(RDFStoreWorker.store, b.args)) : b.fn === "stopObservingNode" && b.args != null ? ((e = RDFStoreWorker.observingCallbacks[b.args[0]]) && RDFStoreWorker.store[b.fn].apply(RDFStoreWorker.store, [e]),
            delete RDFStoreWorker.observingCallbacks[b.args[0]]) : b.fn === "subscribe" && b.args != null ? (e = function(a, d) {
                postMessage({
                    callback: b.callback,
                    event: a,
                    result: d
                })
            }
            ,
            RDFStoreWorker.observingCallbacks[b.callback] = e,
            b.args.push(e),
            RDFStoreWorker.store[b.fn].apply(RDFStoreWorker.store, b.args)) : b.fn === "stopObservingNode" && b.args != null ? ((e = RDFStoreWorker.observingCallbacks[b.args[0]]) && RDFStoreWorker.store[b.fn].apply(RDFStoreWorker.store, [e]),
            delete RDFStoreWorker.observingCallbacks[b.args[0]]) : b.fn === "registeredGraphs" && b.args != null && RDFStoreWorker.store[b.fn].apply(RDFStoreWorker.store, [function(a, d) {
                b.callback != null && postMessage({
                    callback: b.callback,
                    result: d,
                    success: a
                })
            }
            ])
    }
    ;
    RDFStoreWorker.adaptJSInterface = function(a) {
        if (a.interfaceName === "BlankNode")
            return new r.BlankNode(a.bnodeId);
        else if (a.interfaceName === "Literal")
            return new r.Literal(a.nominalValue,a.language,a.datatype);
        else if (a.interfaceName === "NamedNode")
            return new r.NamedNode(a.nominalValue)
    }
    ;
    onmessage = RDFStoreWorker.receive;
    try {
        window.rdfstore = A
    } catch (wc) {}
}
)();
