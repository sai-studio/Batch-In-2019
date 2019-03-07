/*! grafana - v4.3.2 - 2017-05-31
 * Copyright (c) 2017 Torkel Ödegaard; Licensed Apache-2.0 */

System.register(["test/lib/common","../parser"],function(a,b){"use strict";var c,d;b&&b.id;return{setters:[function(a){c=a},function(a){d=a}],execute:function(){c.describe("when parsing",function(){c.it("simple metric expression",function(){var a=new d.Parser("metric.test.*.asd.count"),b=a.getAst();c.expect(b.type).to.be("metric"),c.expect(b.segments.length).to.be(5),c.expect(b.segments[0].value).to.be("metric")}),c.it("simple metric expression with numbers in segments",function(){var a=new d.Parser("metric.10.15_20.5"),b=a.getAst();c.expect(b.type).to.be("metric"),c.expect(b.segments.length).to.be(4),c.expect(b.segments[1].value).to.be("10"),c.expect(b.segments[2].value).to.be("15_20"),c.expect(b.segments[3].value).to.be("5")}),c.it("simple metric expression with curly braces",function(){var a=new d.Parser("metric.se1-{count, max}"),b=a.getAst();c.expect(b.type).to.be("metric"),c.expect(b.segments.length).to.be(2),c.expect(b.segments[1].value).to.be("se1-{count,max}")}),c.it("simple metric expression with curly braces at start of segment and with post chars",function(){var a=new d.Parser("metric.{count, max}-something.count"),b=a.getAst();c.expect(b.type).to.be("metric"),c.expect(b.segments.length).to.be(3),c.expect(b.segments[1].value).to.be("{count,max}-something")}),c.it("simple function",function(){var a=new d.Parser("sum(test)"),b=a.getAst();c.expect(b.type).to.be("function"),c.expect(b.params.length).to.be(1)}),c.it("simple function2",function(){var a=new d.Parser("offset(test.metric, -100)"),b=a.getAst();c.expect(b.type).to.be("function"),c.expect(b.params[0].type).to.be("metric"),c.expect(b.params[1].type).to.be("number")}),c.it("simple function with string arg",function(){var a=new d.Parser("randomWalk('test')"),b=a.getAst();c.expect(b.type).to.be("function"),c.expect(b.params.length).to.be(1),c.expect(b.params[0].type).to.be("string")}),c.it("function with multiple args",function(){var a=new d.Parser("sum(test, 1, 'test')"),b=a.getAst();c.expect(b.type).to.be("function"),c.expect(b.params.length).to.be(3),c.expect(b.params[0].type).to.be("metric"),c.expect(b.params[1].type).to.be("number"),c.expect(b.params[2].type).to.be("string")}),c.it("function with nested function",function(){var a=new d.Parser("sum(scaleToSeconds(test, 1))"),b=a.getAst();c.expect(b.type).to.be("function"),c.expect(b.params.length).to.be(1),c.expect(b.params[0].type).to.be("function"),c.expect(b.params[0].name).to.be("scaleToSeconds"),c.expect(b.params[0].params.length).to.be(2),c.expect(b.params[0].params[0].type).to.be("metric"),c.expect(b.params[0].params[1].type).to.be("number")}),c.it("function with multiple series",function(){var a=new d.Parser("sum(test.test.*.count, test.timers.*.count)"),b=a.getAst();c.expect(b.type).to.be("function"),c.expect(b.params.length).to.be(2),c.expect(b.params[0].type).to.be("metric"),c.expect(b.params[1].type).to.be("metric")}),c.it("function with templated series",function(){var a=new d.Parser("sum(test.[[server]].count)"),b=a.getAst();c.expect(b.message).to.be(void 0),c.expect(b.params[0].type).to.be("metric"),c.expect(b.params[0].segments[1].type).to.be("segment"),c.expect(b.params[0].segments[1].value).to.be("[[server]]")}),c.it("invalid metric expression",function(){var a=new d.Parser("metric.test.*.asd."),b=a.getAst();c.expect(b.message).to.be("Expected metric identifier instead found end of string"),c.expect(b.pos).to.be(19)}),c.it("invalid function expression missing closing parenthesis",function(){var a=new d.Parser("sum(test"),b=a.getAst();c.expect(b.message).to.be("Expected closing parenthesis instead found end of string"),c.expect(b.pos).to.be(9)}),c.it("unclosed string in function",function(){var a=new d.Parser("sum('test)"),b=a.getAst();c.expect(b.message).to.be("Unclosed string parameter"),c.expect(b.pos).to.be(11)}),c.it("handle issue #69",function(){var a=new d.Parser("cactiStyle(offset(scale(net.192-168-1-1.192-168-1-9.ping_value.*,0.001),-100))"),b=a.getAst();c.expect(b.type).to.be("function")}),c.it("handle float function arguments",function(){var a=new d.Parser("scale(test, 0.002)"),b=a.getAst();c.expect(b.type).to.be("function"),c.expect(b.params[1].type).to.be("number"),c.expect(b.params[1].value).to.be(.002)}),c.it("handle curly brace pattern at start",function(){var a=new d.Parser("{apps}.test"),b=a.getAst();c.expect(b.type).to.be("metric"),c.expect(b.segments[0].value).to.be("{apps}"),c.expect(b.segments[1].value).to.be("test")}),c.it("series parameters",function(){var a=new d.Parser("asPercent(#A, #B)"),b=a.getAst();c.expect(b.type).to.be("function"),c.expect(b.params[0].type).to.be("series-ref"),c.expect(b.params[0].value).to.be("#A"),c.expect(b.params[1].value).to.be("#B")}),c.it("series parameters, issue 2788",function(){var a=new d.Parser("summarize(diffSeries(#A, #B), '10m', 'sum', false)"),b=a.getAst();c.expect(b.type).to.be("function"),c.expect(b.params[0].type).to.be("function"),c.expect(b.params[1].value).to.be("10m"),c.expect(b.params[3].type).to.be("bool")}),c.it("should parse metric expression with ip number segments",function(){var a=new d.Parser("5.10.123.5"),b=a.getAst();c.expect(b.segments[0].value).to.be("5"),c.expect(b.segments[1].value).to.be("10"),c.expect(b.segments[2].value).to.be("123"),c.expect(b.segments[3].value).to.be("5")})})}}});