/*! grafana - v4.3.2 - 2017-05-31
 * Copyright (c) 2017 Torkel Ödegaard; Licensed Apache-2.0 */

define(["./helpers","app/features/dashboard/shareModalCtrl","app/features/panellinks/linkSrv","app/core/config"],function(a,b,c,d){"use strict";describe("ShareModalCtrl",function(){function b(a){c.timeSrv.timeRange=sinon.stub().returns(a)}var c=new a.ControllerTestContext;beforeEach(function(){d.bootData={user:{orgId:1}}}),b({from:new Date(1e3),to:new Date(2e3)}),beforeEach(module("grafana.controllers")),beforeEach(module("grafana.services")),beforeEach(module(function(a){a.preAssignBindingsEnabled(!0)})),beforeEach(c.providePhase()),beforeEach(c.createControllerPhase("ShareModalCtrl")),describe("shareUrl with current time range and panel",function(){it("should generate share url absolute time",function(){c.$location.path("/test"),c.scope.panel={id:22},c.scope.init(),expect(c.scope.shareUrl).to.be("http://server/#!/test?from=1000&to=2000&orgId=1&panelId=22&fullscreen")}),it("should generate render url",function(){c.$location.$$absUrl="http://dashboards.grafana.com/dashboard/db/my-dash",c.scope.panel={id:22},c.scope.init();var a="http://dashboards.grafana.com/render/dashboard-solo/db/my-dash",b="?from=1000&to=2000&orgId=1&panelId=22&width=1000&height=500&tz=UTC";expect(c.scope.imageUrl).to.contain(a+b)}),it("should remove panel id when no panel in scope",function(){c.$location.path("/test"),c.scope.options.forCurrent=!0,c.scope.panel=null,c.scope.init(),expect(c.scope.shareUrl).to.be("http://server/#!/test?from=1000&to=2000&orgId=1")}),it("should add theme when specified",function(){c.$location.path("/test"),c.scope.options.theme="light",c.scope.panel=null,c.scope.init(),expect(c.scope.shareUrl).to.be("http://server/#!/test?from=1000&to=2000&orgId=1&theme=light")}),it("should remove fullscreen from image url when is first param in querystring and modeSharePanel is true",function(){c.$location.url("/test?fullscreen&edit"),c.scope.modeSharePanel=!0,c.scope.panel={id:1},c.scope.buildUrl(),expect(c.scope.shareUrl).to.contain("?fullscreen&edit&from=1000&to=2000&orgId=1&panelId=1"),expect(c.scope.imageUrl).to.contain("?from=1000&to=2000&orgId=1&panelId=1&width=1000&height=500&tz=UTC")}),it("should remove edit from image url when is first param in querystring and modeSharePanel is true",function(){c.$location.url("/test?edit&fullscreen"),c.scope.modeSharePanel=!0,c.scope.panel={id:1},c.scope.buildUrl(),expect(c.scope.shareUrl).to.contain("?edit&fullscreen&from=1000&to=2000&orgId=1&panelId=1"),expect(c.scope.imageUrl).to.contain("?from=1000&to=2000&orgId=1&panelId=1&width=1000&height=500&tz=UTC")}),it("should include template variables in url",function(){c.$location.path("/test"),c.scope.options.includeTemplateVars=!0,c.templateSrv.fillVariableValuesForUrl=function(a){a["var-app"]="mupp",a["var-server"]="srv-01"},c.scope.buildUrl(),expect(c.scope.shareUrl).to.be("http://server/#!/test?from=1000&to=2000&orgId=1&var-app=mupp&var-server=srv-01")})})})});