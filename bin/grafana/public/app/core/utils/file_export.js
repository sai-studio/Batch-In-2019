/*! grafana - v4.3.2 - 2017-05-31
 * Copyright (c) 2017 Torkel Ödegaard; Licensed Apache-2.0 */

System.register(["lodash"],function(a,b){"use strict";function c(a){var b="sep=;\nSeries;Time;Value\n";g.default.each(a,function(a){g.default.each(a.datapoints,function(c){b+=a.alias+";"+new Date(c[1]).toISOString()+";"+c[0]+"\n"})}),f(b,"grafana_data_export.csv")}function d(a){var b="sep=;\nTime;";g.default.each(a,function(a){b+=a.alias+";"}),b=b.substring(0,b.length-1),b+="\n";var c=[[]],d=1;g.default.each(a,function(a){var b=0;c.push([]),g.default.each(a.datapoints,function(a){c[0][b]=new Date(a[1]).toISOString(),c[d][b]=a[0],b++}),d++});for(var e=0;e<c[0].length;e++){b+=c[0][e]+";";for(var h=1;h<c.length;h++)b+=c[h][e]+";";b=b.substring(0,b.length-1),b+="\n"}f(b,"grafana_data_export.csv")}function e(a){var b="sep=;\n";g.default.each(a.columns,function(a){b+=(a.title||a.text)+";"}),b+="\n",g.default.each(a.rows,function(a){g.default.each(a,function(a){b+=a+";"}),b+="\n"}),f(b,"grafana_data_export.csv")}function f(a,b){var c=new Blob([a],{type:"text/csv;charset=utf-8"});window.saveAs(c,b)}b&&b.id;a("exportSeriesListToCsv",c),a("exportSeriesListToCsvColumns",d),a("exportTableDataToCsv",e),a("saveSaveBlob",f);var g;return{setters:[function(a){g=a}],execute:function(){}}});