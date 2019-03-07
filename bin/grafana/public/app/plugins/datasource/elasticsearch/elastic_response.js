/*! grafana - v4.3.2 - 2017-05-31
 * Copyright (c) 2017 Torkel Ödegaard; Licensed Apache-2.0 */

define(["lodash","./query_def"],function(a,b){"use strict";function c(a,b){this.targets=a,this.response=b}return c.prototype.processMetrics=function(a,b,c,d){var e,f,g,h,i,j;for(f=0;f<b.metrics.length;f++)if(e=b.metrics[f],!e.hide)switch(e.type){case"count":for(h={datapoints:[],metric:"count",props:d},g=0;g<a.buckets.length;g++)i=a.buckets[g],j=i.doc_count,h.datapoints.push([j,i.key]);c.push(h);break;case"percentiles":if(0===a.buckets.length)break;var k=a.buckets[0],l=k[e.id].values;for(var m in l){for(h={datapoints:[],metric:"p"+m,props:d,field:e.field},g=0;g<a.buckets.length;g++){i=a.buckets[g];var n=i[e.id].values;h.datapoints.push([n[m],i.key])}c.push(h)}break;case"extended_stats":for(var o in e.meta)if(e.meta[o]){for(h={datapoints:[],metric:o,props:d,field:e.field},g=0;g<a.buckets.length;g++){i=a.buckets[g];var p=i[e.id];p.std_deviation_bounds_upper=p.std_deviation_bounds.upper,p.std_deviation_bounds_lower=p.std_deviation_bounds.lower,h.datapoints.push([p[o],i.key])}c.push(h)}break;default:for(h={datapoints:[],metric:e.type,field:e.field,props:d},g=0;g<a.buckets.length;g++)i=a.buckets[g],j=i[e.id],void 0!==j&&(j.normalized_value?h.datapoints.push([j.normalized_value,i.key]):h.datapoints.push([j.value,i.key]));c.push(h)}},c.prototype.processAggregationDocs=function(b,c,d,e,f){var g,h,i,j,k,l;for(i=0;i<b.buckets.length;i++){for(j=b.buckets[i],l=a.defaults({},f),l[c.field]=j.key,h=0;h<d.metrics.length;h++)switch(g=d.metrics[h],g.type){case"count":k=this._getMetricName(g.type),l[k]=j.doc_count;break;case"extended_stats":for(var m in g.meta)if(g.meta[m]){var n=j[g.id];n.std_deviation_bounds_upper=n.std_deviation_bounds.upper,n.std_deviation_bounds_lower=n.std_deviation_bounds.lower,k=this._getMetricName(m),l[k]=n[m]}break;default:k=this._getMetricName(g.type);var o=a.filter(d.metrics,{type:g.type});o.length>1&&(k+=" "+g.field),l[k]=j[g.id].value}e.push(l)}},c.prototype.processBuckets=function(b,c,d,e,f,g){var h,i,j,k,l=c.bucketAggs.length-1;for(k in b)if(i=a.find(c.bucketAggs,{id:k}),j=b[k],i)if(g===l)"date_histogram"===i.type?this.processMetrics(j,c,d,f):this.processAggregationDocs(j,i,c,e,f);else for(var m in j.buckets)h=j.buckets[m],f=a.clone(f),void 0!==h.key?f[i.field]=h.key:f.filter=m,h.key_as_string&&(f[i.field]=h.key_as_string),this.processBuckets(h,c,d,e,f,g+1)},c.prototype._getMetricName=function(c){var d=a.find(b.metricAggTypes,{value:c});return d||(d=a.find(b.extendedStats,{value:c})),d?d.text:c},c.prototype._getSeriesName=function(c,d,e){var f=this._getMetricName(c.metric);if(d.alias){var g=/\{\{([\s\S]+?)\}\}/g;return d.alias.replace(g,function(a,b,d){var e=b||d;return 0===e.indexOf("term ")?c.props[e.substring(5)]:void 0!==c.props[e]?c.props[e]:"metric"===e?f:"field"===e?c.field:a})}if(c.field&&b.isPipelineAgg(c.metric)){var h=a.find(d.metrics,{id:c.field});h?f+=" "+b.describeMetric(h):f="Unset"}else c.field&&(f+=" "+c.field);var i=a.keys(c.props);if(0===i.length)return f;var j="";for(var k in c.props)j+=c.props[k]+" ";return 1===e?j.trim():j.trim()+" "+f},c.prototype.nameSeries=function(b,c){for(var d=a.uniq(a.map(b,"metric")).length,e=a.uniq(a.map(b,"field")).length,f=0;f<b.length;f++){var g=b[f];g.target=this._getSeriesName(g,c,d,e)}},c.prototype.processHits=function(a,b){var c,d,e,f,g={target:"docs",type:"docs",datapoints:[],total:a.total};for(f=0;f<a.hits.length;f++){if(d=a.hits[f],e={_id:d._id,_type:d._type,_index:d._index},d._source)for(c in d._source)e[c]=d._source[c];for(c in d.fields)e[c]=d.fields[c];g.datapoints.push(e)}b.push(g)},c.prototype.trimDatapoints=function(b,c){var d=a.find(c.bucketAggs,{type:"date_histogram"}),e=d&&d.settings&&d.settings.trimEdges;if(e){var f=d.settings.trimEdges;for(var g in b){var h=b[g];h.datapoints.length>2*f&&(h.datapoints=h.datapoints.slice(f,h.datapoints.length-f))}}},c.prototype.getErrorFromElasticResponse=function(a,b){var c={};return c.data=JSON.stringify(b,null,4),b.root_cause&&b.root_cause.length>0&&b.root_cause[0].reason?c.message=b.root_cause[0].reason:c.message=b.reason||"Unkown elatic error response",a.$$config&&(c.config=a.$$config),c},c.prototype.getTimeSeries=function(){for(var a=[],b=0;b<this.response.responses.length;b++){var c=this.response.responses[b];if(c.error)throw this.getErrorFromElasticResponse(this.response,c.error);if(c.hits&&c.hits.hits.length>0&&this.processHits(c.hits,a),c.aggregations){var d=c.aggregations,e=this.targets[b],f=[],g=[];this.processBuckets(d,e,f,g,{},0),this.trimDatapoints(f,e),this.nameSeries(f,e);for(var h=0;h<f.length;h++)a.push(f[h]);0===a.length&&g.length>0&&a.push({target:"docs",type:"docs",datapoints:g})}}return{data:a}},c});