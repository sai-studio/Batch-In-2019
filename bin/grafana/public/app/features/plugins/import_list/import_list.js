/*! grafana - v4.3.2 - 2017-05-31
 * Copyright (c) 2017 Torkel Ödegaard; Licensed Apache-2.0 */

System.register(["lodash","app/core/core_module","app/core/app_events"],function(a,b){"use strict";function c(){return{restrict:"E",templateUrl:"public/app/features/plugins/import_list/import_list.html",controller:g,bindToController:!0,controllerAs:"ctrl",scope:{plugin:"=",datasource:"="}}}b&&b.id;a("dashboardImportList",c);var d,e,f,g;return{setters:[function(a){d=a},function(a){e=a},function(a){f=a}],execute:function(){g=function(){function a(a,b,c,d){var e=this;this.$http=b,this.backendSrv=c,this.$rootScope=d,this.dashboards=[],c.get("/api/plugins/"+this.plugin.id+"/dashboards").then(function(a){e.dashboards=a}),f.default.on("dashboard-list-import-all",this.importAll.bind(this),a)}return a.$inject=["$scope","$http","backendSrv","$rootScope"],a.prototype.importAll=function(a){return this.importNext(0).then(function(){a.resolve("All dashboards imported")}).catch(function(b){a.reject(b)})},a.prototype.importNext=function(a){var b=this;return this.import(this.dashboards[a],!0).then(function(){if(a+1<b.dashboards.length)return new Promise(function(c){setTimeout(function(){b.importNext(a+1).then(function(){c()})},500)})})},a.prototype.import=function(a,b){var c=this,e={pluginId:this.plugin.id,path:a.path,overwrite:b,inputs:[]};return this.datasource&&e.inputs.push({name:"*",type:"datasource",pluginId:this.datasource.type,value:this.datasource.name}),this.backendSrv.post("/api/dashboards/import",e).then(function(b){c.$rootScope.appEvent("alert-success",["Dashboard Imported",a.title]),d.default.extend(a,b)})},a.prototype.remove=function(a){var b=this;this.backendSrv.delete("/api/dashboards/"+a.importedUri).then(function(){b.$rootScope.appEvent("alert-success",["Dashboard Deleted",a.title]),a.imported=!1})},a}(),a("DashImportListCtrl",g),e.default.directive("dashboardImportList",c)}}});