/*! grafana - v4.3.2 - 2017-05-31
 * Copyright (c) 2017 Torkel Ödegaard; Licensed Apache-2.0 */

System.register(["app/core/config","lodash","../dynamic_dashboard_srv"],function(a,b){"use strict";var c,d,e,f;b&&b.id;return{setters:[function(a){c=a},function(a){d=a},function(a){e=a}],execute:function(){f=function(){function a(a){this.datasourceSrv=a}return a.prototype.makeExportable=function(a){var b=this,f=new e.DynamicDashboardSrv;f.init(a),f.process({cleanUpOnly:!0});var g=a.getSaveModelClone();g.id=null,f.process();for(var h=[],i={},j={},k=[],l={},m=0,n=g.templating.list;m<n.length;m++){var o=n[m];l[o.name]=o}for(var p=function(a){a.datasource&&0===a.datasource.indexOf("$")&&l[a.datasource.substring(1)]||k.push(b.datasourceSrv.get(a.datasource).then(function(b){if(!b.meta.builtIn){var c="DS_"+b.name.replace(" ","_").toUpperCase();j[c]={name:c,label:b.name,description:"",type:"datasource",pluginId:b.meta.id,pluginName:b.meta.name},a.datasource="${"+c+"}",i["datasource"+b.meta.id]={type:"datasource",id:b.meta.id,name:b.meta.name,version:b.meta.info.version||"1.0.0"}}}))},q=0,r=g.rows;q<r.length;q++)for(var s=r[q],t=0,u=s.panels;t<u.length;t++){var v=u[t];if(void 0!==v.datasource&&p(v),v.targets)for(var w=0,x=v.targets;w<x.length;w++){var y=x[w];void 0!==y.datasource&&p(y)}var z=c.default.panels[v.type];z&&(i["panel"+z.id]={type:"panel",id:z.id,name:z.name,version:z.info.version})}for(var A=0,B=g.templating.list;A<B.length;A++){var o=B[A];"query"===o.type&&(p(o),o.options=[],o.current={},o.refresh=1)}for(var C=0,D=g.annotations.list;C<D.length;C++){var E=D[C];p(E)}return i.grafana={type:"grafana",id:"grafana",name:"Grafana",version:c.default.buildInfo.version},Promise.all(k).then(function(){d.default.each(j,function(a,b){h.push(a)});for(var a=0,b=g.templating.list;a<b.length;a++){var c=b[a];if("constant"===c.type){var e="VAR_"+c.name.replace(" ","_").toUpperCase();h.push({name:e,type:"constant",label:c.label||c.name,value:c.current.value,description:""}),c.query="${"+e+"}",c.options[0]=c.current={value:c.query,text:c.query}}}var f={};return f.__inputs=h,f.__requires=d.default.sortBy(i,["id"]),d.default.defaults(f,g),f}).catch(function(a){return console.log("Export failed:",a),{error:a}})},a}(),a("DashboardExporter",f)}}});