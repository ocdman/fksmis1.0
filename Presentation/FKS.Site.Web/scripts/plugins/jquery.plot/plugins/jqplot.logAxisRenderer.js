/*! fks 07-07-2014 */
!function(a){a.jqplot.LogAxisRenderer=function(){a.jqplot.LinearAxisRenderer.call(this),this.axisDefaults={base:10,tickDistribution:"power"}},a.jqplot.LogAxisRenderer.prototype=new a.jqplot.LinearAxisRenderer,a.jqplot.LogAxisRenderer.prototype.constructor=a.jqplot.LogAxisRenderer,a.jqplot.LogAxisRenderer.prototype.init=function(b){this.drawBaseline=!0,this.minorTicks="auto",this._scalefact=1,a.extend(!0,this,b),this._autoFormatString="%d",this._overrideFormatString=!1;for(var c in this.renderer.axisDefaults)null==this[c]&&(this[c]=this.renderer.axisDefaults[c]);this.resetDataBounds()},a.jqplot.LogAxisRenderer.prototype.createTicks=function(){var b,c,d,e,f,g=(this._ticks,this.ticks),h=(this.name,this._dataBounds),i="x"===this.name.charAt(0)?this._plotDimensions.width:this._plotDimensions.height,j=30;if(this._scalefact=(Math.max(i,j+1)-j)/300,g.length){for(f=0;f<g.length;f++){var k=g[f],l=new this.tickRenderer(this.tickOptions);k.constructor==Array?(l.value=k[0],l.label=k[1],this.showTicks?this.showTickMarks||(l.showMark=!1):(l.showLabel=!1,l.showMark=!1),l.setTick(k[0],this.name),this._ticks.push(l)):a.isPlainObject(k)?(a.extend(!0,l,k),l.axis=this.name,this._ticks.push(l)):(l.value=k,this.showTicks?this.showTickMarks||(l.showMark=!1):(l.showLabel=!1,l.showMark=!1),l.setTick(k,this.name),this._ticks.push(l))}this.numberTicks=g.length,this.min=this._ticks[0].value,this.max=this._ticks[this.numberTicks-1].value}else if(null==this.min&&null==this.max){if(c=h.min*(2-this.padMin),d=h.max*this.padMax,c==d){var m=.05;c*=1-m,d*=1+m}if(null!=this.min&&this.min<=0)throw new Error("Log axis minimum must be greater than 0");if(null!=this.max&&this.max<=0)throw new Error("Log axis maximum must be greater than 0");var n,o;n=Math.pow(this.base,Math.floor(Math.log(c)/Math.log(this.base))),o=Math.pow(this.base,Math.ceil(Math.log(d)/Math.log(this.base))),0===n&&(n=1);var p=Math.round(Math.log(n)/Math.LN10);null!=this.tickOptions&&this.tickOptions.formatString||(this._overrideFormatString=!0),this.min=n,this.max=o;var q,r=(this.max-this.min,"auto"===this.minorTicks?0:this.minorTicks);if(null==this.numberTicks)if(i>140){if(q=Math.round(Math.log(this.max/this.min)/Math.log(this.base)+1),2>q&&(q=2),0===r){var s=i/(q-1);r=100>s?0:190>s?1:250>s?3:600>s?4:9}}else q=2,0===r&&(r=1),r=0;else q=this.numberTicks;if(p>=0&&3!==r)this._autoFormatString="%d";else if(0>=p&&3===r){var s=-(p-1);this._autoFormatString="%."+Math.abs(p-1)+"f"}else if(0>p){var s=-p;this._autoFormatString="%."+Math.abs(p)+"f"}else this._autoFormatString="%d";for(var l,t,u,v,b,f=0;q>f;f++)if(e=Math.pow(this.base,f-q+1)*this.max,l=new this.tickRenderer(this.tickOptions),this._overrideFormatString&&(l.formatString=this._autoFormatString),this.showTicks?this.showTickMarks||(l.showMark=!1):(l.showLabel=!1,l.showMark=!1),l.setTick(e,this.name),this._ticks.push(l),r&&q-1>f){u=Math.pow(this.base,f-q+2)*this.max,v=u-e,b=u/(r+1);for(var w=r-1;w>=0;w--)t=u-b*(w+1),l=new this.tickRenderer(this.tickOptions),this._overrideFormatString&&""!=this._autoFormatString&&(l.formatString=this._autoFormatString),this.showTicks?this.showTickMarks||(l.showMark=!1):(l.showLabel=!1,l.showMark=!1),l.setTick(t,this.name),this._ticks.push(l)}}else if(null!=this.min&&null!=this.max){var x,y,z=a.extend(!0,{},this.tickOptions,{name:this.name,value:null});if(null==this.numberTicks&&null==this.tickInterval){var A=Math.max(i,j+1),B=Math.ceil((A-j)/35+1),C=a.jqplot.LinearTickGenerator.bestConstrainedInterval(this.min,this.max,B);this._autoFormatString=C[3],x=C[2],y=C[4];for(var f=0;x>f;f++)z.value=this.min+f*y,l=new this.tickRenderer(z),this._overrideFormatString&&""!=this._autoFormatString&&(l.formatString=this._autoFormatString),this.showTicks?this.showTickMarks||(l.showMark=!1):(l.showLabel=!1,l.showMark=!1),this._ticks.push(l)}else if(null!=this.numberTicks&&null!=this.tickInterval){x=this.numberTicks;for(var f=0;x>f;f++)z.value=this.min+f*this.tickInterval,l=new this.tickRenderer(z),this._overrideFormatString&&""!=this._autoFormatString&&(l.formatString=this._autoFormatString),this.showTicks?this.showTickMarks||(l.showMark=!1):(l.showLabel=!1,l.showMark=!1),this._ticks.push(l)}}},a.jqplot.LogAxisRenderer.prototype.pack=function(b,c){var d=parseInt(this.base,10),e=this._ticks,f=function(a){return Math.log(a)/Math.log(d)},g=function(a){return Math.pow(Math.E,Math.log(d)*a)},h=f(this.max),i=f(this.min),j=c.max,k=c.min,l=null==this._label?!1:this._label.show;for(var m in b)this._elem.css(m,b[m]);this._offsets=c;var n=j-k,o=h-i;if(this.p2u=function(a){return g((a-k)*o/n+i)},this.u2p=function(a){return(f(a)-i)*n/o+k},"xaxis"==this.name||"x2axis"==this.name?(this.series_u2p=function(a){return(f(a)-i)*n/o},this.series_p2u=function(a){return g(a*o/n+i)}):(this.series_u2p=function(a){return(f(a)-h)*n/o},this.series_p2u=function(a){return g(a*o/n+h)}),this.show)if("xaxis"==this.name||"x2axis"==this.name){for(var p=0;p<e.length;p++){var q=e[p];if(q.show&&q.showLabel){var r;if(q.constructor==a.jqplot.CanvasAxisTickRenderer&&q.angle)switch(q.labelPosition){case"auto":r=q.angle<0?-q.getWidth()+q._textRenderer.height*Math.sin(-q._textRenderer.angle)/2:-q._textRenderer.height*Math.sin(q._textRenderer.angle)/2;break;case"end":r=-q.getWidth()+q._textRenderer.height*Math.sin(-q._textRenderer.angle)/2;break;case"start":r=-q._textRenderer.height*Math.sin(q._textRenderer.angle)/2;break;case"middle":r=-q.getWidth()/2+q._textRenderer.height*Math.sin(-q._textRenderer.angle)/2;break;default:r=-q.getWidth()/2+q._textRenderer.height*Math.sin(-q._textRenderer.angle)/2}else r=-q.getWidth()/2;var s=this.u2p(q.value)+r+"px";q._elem.css("left",s),q.pack()}}if(l){var t=this._label._elem.outerWidth(!0);this._label._elem.css("left",k+n/2-t/2+"px"),"xaxis"==this.name?this._label._elem.css("bottom","0px"):this._label._elem.css("top","0px"),this._label.pack()}}else{for(var p=0;p<e.length;p++){var q=e[p];if(q.show&&q.showLabel){var r;if(q.constructor==a.jqplot.CanvasAxisTickRenderer&&q.angle)switch(q.labelPosition){case"auto":case"end":r=q.angle<0?-q._textRenderer.height*Math.cos(-q._textRenderer.angle)/2:-q.getHeight()+q._textRenderer.height*Math.cos(q._textRenderer.angle)/2;break;case"start":r=q.angle>0?-q._textRenderer.height*Math.cos(-q._textRenderer.angle)/2:-q.getHeight()+q._textRenderer.height*Math.cos(q._textRenderer.angle)/2;break;case"middle":r=-q.getHeight()/2;break;default:r=-q.getHeight()/2}else r=-q.getHeight()/2;var s=this.u2p(q.value)+r+"px";q._elem.css("top",s),q.pack()}}if(l){var u=this._label._elem.outerHeight(!0);this._label._elem.css("top",j-n/2-u/2+"px"),"yaxis"==this.name?this._label._elem.css("left","0px"):this._label._elem.css("right","0px"),this._label.pack()}}}}(jQuery);