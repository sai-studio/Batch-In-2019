/*! grafana - v4.3.2 - 2017-05-31
 * Copyright (c) 2017 Torkel Ödegaard; Licensed Apache-2.0 */

System.register(["lodash"],function(a,b){"use strict";function c(a){for(var b=[],c=0;c<a.length;c++)for(var d=a[c],e=0;e<d.data.length;e++)null!==d.data[e][1]&&b.push(d.data[e][1]);return b}function d(a,b){for(var c={},d=0;d<a.length;d++){var g=e(a[d],b);c[g]?c[g]=c[g]+1:c[g]=1}return f.default.map(c,function(a,b){return[Number(b),a]})}function e(a,b){return Math.floor(a/b)*b}b&&b.id;a("getSeriesValues",c),a("convertValuesToHistogram",d);var f;return{setters:[function(a){f=a}],execute:function(){}}});