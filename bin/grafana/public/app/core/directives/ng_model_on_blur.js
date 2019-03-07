/*! grafana - v4.3.2 - 2017-05-31
 * Copyright (c) 2017 Torkel Ödegaard; Licensed Apache-2.0 */

define(["../core_module","app/core/utils/kbn","app/core/utils/rangeutil"],function(a,b,c){"use strict";a.default.directive("ngModelOnblur",function(){return{restrict:"A",priority:1,require:"ngModel",link:function(a,b,c,d){"radio"!==c.type&&"checkbox"!==c.type&&(b.off("input keydown change"),b.bind("blur",function(){a.$apply(function(){d.$setViewValue(b.val())})}))}}}),a.default.directive("emptyToNull",function(){return{restrict:"A",require:"ngModel",link:function(a,b,c,d){d.$parsers.push(function(a){return""===a?null:a})}}}),a.default.directive("validTimeSpan",function(){return{require:"ngModel",link:function(a,b,d,e){e.$validators.integer=function(a,b){if(e.$isEmpty(a))return!0;if(0===b.indexOf("$")||0===b.indexOf("+$"))return!0;var d=c.describeTextRange(b);return d.invalid!==!0}}}})});