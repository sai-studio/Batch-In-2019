/*! grafana - v4.3.2 - 2017-05-31
 * Copyright (c) 2017 Torkel Ödegaard; Licensed Apache-2.0 */

System.register(["lodash"],function(a,b){"use strict";var c,d;b&&b.id;return{setters:[function(a){c=a}],execute:function(){d=function(){function a(a,b){this.backendSrv=a,this.$q=b}return a.$inject=["backendSrv","$q"],a.prototype.query=function(a){return this.backendSrv.get("/api/tsdb/testdata/random-walk",{from:a.range.from.valueOf(),to:a.range.to.valueOf(),intervalMs:a.intervalMs,maxDataPoints:a.maxDataPoints}).then(function(a){var b=[];return a.results&&c.default.forEach(a.results,function(a){for(var c=0,d=a.series;c<d.length;c++){var e=d[c];b.push({target:e.name,datapoints:e.points})}}),{data:b}})},a.prototype.metricFindQuery=function(a){return this.$q.when({data:[]})},a.prototype.annotationQuery=function(a){return this.backendSrv.get("/api/annotations",{from:a.range.from.valueOf(),to:a.range.to.valueOf(),limit:a.limit,type:a.type})},a}(),a("GrafanaDatasource",d)}}});