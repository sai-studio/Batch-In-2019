/*! grafana - v4.3.2 - 2017-05-31
 * Copyright (c) 2017 Torkel Ödegaard; Licensed Apache-2.0 */

System.register(["angular"],function(a,b){"use strict";var c,d;b&&b.id;return{setters:[function(a){c=a}],execute:function(){d=function(){function a(a,b){var c=this;this.backendSrv=a,this.tabIndex=0;var d=b.search().type||"panel";switch(d){case"datasource":this.tabIndex=1;break;case"app":this.tabIndex=2;break;case"panel":default:this.tabIndex=0}this.backendSrv.get("api/plugins",{embedded:0,type:d}).then(function(a){c.plugins=a})}return a.$inject=["backendSrv","$location"],a}(),a("PluginListCtrl",d),c.default.module("grafana.controllers").controller("PluginListCtrl",d)}}});