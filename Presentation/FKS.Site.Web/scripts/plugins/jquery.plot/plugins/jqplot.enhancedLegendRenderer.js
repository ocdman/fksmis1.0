/*! fks 07-07-2014 */
!function(a){a.jqplot.EnhancedLegendRenderer=function(){a.jqplot.TableLegendRenderer.call(this)},a.jqplot.EnhancedLegendRenderer.prototype=new a.jqplot.TableLegendRenderer,a.jqplot.EnhancedLegendRenderer.prototype.constructor=a.jqplot.EnhancedLegendRenderer,a.jqplot.EnhancedLegendRenderer.prototype.init=function(b){this.numberRows=null,this.numberColumns=null,this.seriesToggle="normal",this.seriesToggleReplot=!1,this.disableIEFading=!0,a.extend(!0,this,b),this.seriesToggle&&a.jqplot.postDrawHooks.push(c)},a.jqplot.EnhancedLegendRenderer.prototype.draw=function(c,d){if(this.show){var e,f=this._series,g="position:absolute;";g+=this.background?"background:"+this.background+";":"",g+=this.border?"border:"+this.border+";":"",g+=this.fontSize?"font-size:"+this.fontSize+";":"",g+=this.fontFamily?"font-family:"+this.fontFamily+";":"",g+=this.textColor?"color:"+this.textColor+";":"",g+=null!=this.marginTop?"margin-top:"+this.marginTop+";":"",g+=null!=this.marginBottom?"margin-bottom:"+this.marginBottom+";":"",g+=null!=this.marginLeft?"margin-left:"+this.marginLeft+";":"",g+=null!=this.marginRight?"margin-right:"+this.marginRight+";":"",this._elem=a('<table class="jqplot-table-legend" style="'+g+'"></table>'),this.seriesToggle&&this._elem.css("z-index","3");var h,i,j=!1,k=!1;this.numberRows?(h=this.numberRows,i=this.numberColumns?this.numberColumns:Math.ceil(f.length/h)):this.numberColumns?(i=this.numberColumns,h=Math.ceil(f.length/this.numberColumns)):(h=f.length,i=1);var l,m,n,o,p,q,r,s,t,u=0;for(l=f.length-1;l>=0;l--)(1==i&&f[l]._stack||f[l].renderer.constructor==a.jqplot.BezierCurveRenderer)&&(k=!0);for(l=0;h>l;l++){for(n=a(document.createElement("tr")),n.addClass("jqplot-table-legend"),k?n.prependTo(this._elem):n.appendTo(this._elem),m=0;i>m;m++){if(u<f.length&&(f[u].show||f[u].showLabel)&&(e=f[u],q=this.labels[u]||e.label.toString())){var v=e.color;if(j=k?l==h-1?!1:!0:l>0?!0:!1,r=j?this.rowSpacing:"0",o=a(document.createElement("td")),o.addClass("jqplot-table-legend jqplot-table-legend-swatch"),o.css({textAlign:"center",paddingTop:r}),s=a(document.createElement("div")),s.addClass("jqplot-table-legend-swatch-outline"),t=a(document.createElement("div")),t.addClass("jqplot-table-legend-swatch"),t.css({backgroundColor:v,borderColor:v}),o.append(s.append(t)),p=a(document.createElement("td")),p.addClass("jqplot-table-legend jqplot-table-legend-label"),p.css("paddingTop",r),this.escapeHtml?p.text(q):p.html(q),k?(this.showLabels&&p.prependTo(n),this.showSwatches&&o.prependTo(n)):(this.showSwatches&&o.appendTo(n),this.showLabels&&p.appendTo(n)),this.seriesToggle){var w;("string"==typeof this.seriesToggle||"number"==typeof this.seriesToggle)&&(a.jqplot.use_excanvas&&this.disableIEFading||(w=this.seriesToggle)),this.showSwatches&&(o.bind("click",{series:e,speed:w,plot:d,replot:this.seriesToggleReplot},b),o.addClass("jqplot-seriesToggle")),this.showLabels&&(p.bind("click",{series:e,speed:w,plot:d,replot:this.seriesToggleReplot},b),p.addClass("jqplot-seriesToggle")),!e.show&&e.showLabel&&(o.addClass("jqplot-series-hidden"),p.addClass("jqplot-series-hidden"))}j=!0}u++}o=p=s=t=null}}return this._elem};var b=function(b){var c=b.data,d=c.series,e=c.replot,f=c.plot,g=c.speed,h=d.index,i=!1;(d.canvas._elem.is(":hidden")||!d.show)&&(i=!0);var j=function(){if(e){var b={};if(a.isPlainObject(e)&&a.extend(!0,b,e),f.replot(b),i&&g){var c=f.series[h];c.shadowCanvas._elem&&c.shadowCanvas._elem.hide().fadeIn(g),c.canvas._elem.hide().fadeIn(g),c.canvas._elem.nextAll(".jqplot-point-label.jqplot-series-"+c.index).hide().fadeIn(g)}}else{var c=f.series[h];c.canvas._elem.is(":hidden")||!c.show?(("undefined"==typeof f.options.legend.showSwatches||f.options.legend.showSwatches===!0)&&f.legend._elem.find("td").eq(2*h).addClass("jqplot-series-hidden"),("undefined"==typeof f.options.legend.showLabels||f.options.legend.showLabels===!0)&&f.legend._elem.find("td").eq(2*h+1).addClass("jqplot-series-hidden")):(("undefined"==typeof f.options.legend.showSwatches||f.options.legend.showSwatches===!0)&&f.legend._elem.find("td").eq(2*h).removeClass("jqplot-series-hidden"),("undefined"==typeof f.options.legend.showLabels||f.options.legend.showLabels===!0)&&f.legend._elem.find("td").eq(2*h+1).removeClass("jqplot-series-hidden"))}};d.toggleDisplay(b,j)},c=function(){if(this.legend.renderer.constructor==a.jqplot.EnhancedLegendRenderer&&this.legend.seriesToggle){var b=this.legend._elem.detach();this.eventCanvas._elem.after(b)}}}(jQuery);