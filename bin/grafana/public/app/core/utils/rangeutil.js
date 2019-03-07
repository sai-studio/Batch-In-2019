/*! grafana - v4.3.2 - 2017-05-31
 * Copyright (c) 2017 Torkel Ödegaard; Licensed Apache-2.0 */

System.register(["lodash","moment","./datemath"],function(a,b){"use strict";function c(a,b){var c=g.default.groupBy(k,function(a){return a.active=a.display===b,a.section});return c}function d(a){return a.format(l)}function e(a){var b=0!==a.indexOf("+");a.indexOf("now")===-1&&(a=(b?"now-":"now")+a);var c=m[a+" to now"];if(c)return c;c=b?{from:a,to:"now"}:{from:"now",to:a};var d=/^now([-+])(\d+)(\w)/.exec(a);if(d){var e=d[3],f=parseInt(d[2]),g=j[e];g&&(c.display=b?"Last ":"Next ",c.display+=f+" "+g.display,c.section=g.section,f>1&&(c.display+="s"))}else c.display=c.from+" to "+c.to,c.invalid=!0;return c}function f(a){var b=m[a.from.toString()+" to "+a.to.toString()];if(b)return b.display;if(h.default.isMoment(a.from)&&h.default.isMoment(a.to))return d(a.from)+" to "+d(a.to);if(h.default.isMoment(a.from)){var c=i.parse(a.to,!0);return d(a.from)+" to "+c.fromNow()}if(h.default.isMoment(a.to)){var f=i.parse(a.from,!1);return f.fromNow()+" to "+d(a.to)}if("now"===a.to.toString()){var g=e(a.from);return g.display}return a.from.toString()+" to "+a.to.toString()}b&&b.id;a("getRelativeTimesList",c),a("describeTextRange",e),a("describeTimeRange",f);var g,h,i,j,k,l,m;return{setters:[function(a){g=a},function(a){h=a},function(a){i=a}],execute:function(){j={s:{display:"second"},m:{display:"minute"},h:{display:"hour"},d:{display:"day"},w:{display:"week"},M:{display:"month"},y:{display:"year"}},k=[{from:"now/d",to:"now/d",display:"Today",section:2},{from:"now/d",to:"now",display:"Today so far",section:2},{from:"now/w",to:"now/w",display:"This week",section:2},{from:"now/w",to:"now",display:"This week so far",section:2},{from:"now/M",to:"now/M",display:"This month",section:2},{from:"now/M",to:"now",display:"This month so far",section:2},{from:"now/y",to:"now/y",display:"This year",section:2},{from:"now/y",to:"now",display:"This year so far",section:2},{from:"now-1d/d",to:"now-1d/d",display:"Yesterday",section:1},{from:"now-2d/d",to:"now-2d/d",display:"Day before yesterday",section:1},{from:"now-7d/d",to:"now-7d/d",display:"This day last week",section:1},{from:"now-1w/w",to:"now-1w/w",display:"Previous week",section:1},{from:"now-1M/M",to:"now-1M/M",display:"Previous month",section:1},{from:"now-1y/y",to:"now-1y/y",display:"Previous year",section:1},{from:"now-5m",to:"now",display:"Last 5 minutes",section:3},{from:"now-15m",to:"now",display:"Last 15 minutes",section:3},{from:"now-30m",to:"now",display:"Last 30 minutes",section:3},{from:"now-1h",to:"now",display:"Last 1 hour",section:3},{from:"now-3h",to:"now",display:"Last 3 hours",section:3},{from:"now-6h",to:"now",display:"Last 6 hours",section:3},{from:"now-12h",to:"now",display:"Last 12 hours",section:3},{from:"now-24h",to:"now",display:"Last 24 hours",section:3},{from:"now-2d",to:"now",display:"Last 2 days",section:0},{from:"now-7d",to:"now",display:"Last 7 days",section:0},{from:"now-30d",to:"now",display:"Last 30 days",section:0},{from:"now-90d",to:"now",display:"Last 90 days",section:0},{from:"now-6M",to:"now",display:"Last 6 months",section:0},{from:"now-1y",to:"now",display:"Last 1 year",section:0},{from:"now-2y",to:"now",display:"Last 2 years",section:0},{from:"now-5y",to:"now",display:"Last 5 years",section:0}],l="MMM D, YYYY HH:mm:ss",m={},g.default.each(k,function(a){m[a.from+" to "+a.to]=a})}}});