/*! fks 07-07-2014 */
!function(a){a.jqplot.BlockRenderer=function(){a.jqplot.LineRenderer.call(this)},a.jqplot.BlockRenderer.prototype=new a.jqplot.LineRenderer,a.jqplot.BlockRenderer.prototype.constructor=a.jqplot.BlockRenderer,a.jqplot.BlockRenderer.prototype.init=function(b){this.css={padding:"2px",border:"1px solid #999",textAlign:"center"},this.escapeHtml=!1,this.insertBreaks=!0,this.varyBlockColors=!1,a.extend(!0,this,b),this.css.backgroundColor?this.color=this.css.backgroundColor:this.css.background?this.color=this.css.background:this.varyBlockColors||(this.css.background=this.color),this.canvas=new a.jqplot.BlockCanvas,this.shadowCanvas=new a.jqplot.BlockCanvas,this.canvas._plotDimensions=this._plotDimensions,this.shadowCanvas._plotDimensions=this._plotDimensions,this._type="block",this.moveBlock=function(a,b,c,d){var e=this.canvas._elem.children(":eq("+a+")");this.data[a][0]=b,this.data[a][1]=c,this._plotData[a][0]=b,this._plotData[a][1]=c,this._stackData[a][0]=b,this._stackData[a][1]=c,this.gridData[a][0]=this._xaxis.series_u2p(b),this.gridData[a][1]=this._yaxis.series_u2p(c);var f=e.outerWidth(),g=e.outerHeight(),h=this.gridData[a][0]-f/2+"px",i=this.gridData[a][1]-g/2+"px";d?(parseInt(d,10)&&(d=parseInt(d,10)),e.animate({left:h,top:i},d)):e.css({left:h,top:i}),e=null}},a.jqplot.BlockRenderer.prototype.draw=function(b,c,d){this.plugins.pointLabels&&(this.plugins.pointLabels.show=!1);var e,f,g,c,h,i,j,k,l,m,n=new a.jqplot.ColorGenerator(this.seriesColors);for(this.canvas._elem.empty(),e=0;e<this.gridData.length;e++)g=this.data[e],c=this.gridData[e],h="",i={},"string"==typeof g[2]?h=g[2]:"object"==typeof g[2]&&(i=g[2]),"object"==typeof g[3]&&(i=g[3]),this.insertBreaks&&(h=h.replace(/ /g,"<br />")),i=a.extend(!0,{},this.css,i),f=a('<div style="position:absolute;margin-left:auto;margin-right:auto;"></div>'),this.canvas._elem.append(f),this.escapeHtml?f.text(h):f.html(h),delete i.position,delete i.marginRight,delete i.marginLeft,i.background||i.backgroundColor||i.backgroundImage||(i.background=n.next()),f.css(i),j=f.outerWidth(),k=f.outerHeight(),l=c[0]-j/2+"px",m=c[1]-k/2+"px",f.css({left:l,top:m}),f=null},a.jqplot.BlockCanvas=function(){a.jqplot.ElemContainer.call(this),this._ctx},a.jqplot.BlockCanvas.prototype=new a.jqplot.ElemContainer,a.jqplot.BlockCanvas.prototype.constructor=a.jqplot.BlockCanvas,a.jqplot.BlockCanvas.prototype.createElement=function(b,c,d){this._offsets=b;var e="jqplot-blockCanvas";void 0!=c&&(e=c);var f;f=this._elem?this._elem.get(0):document.createElement("div"),void 0!=d&&(this._plotDimensions=d);var g=this._plotDimensions.width-this._offsets.left-this._offsets.right+"px",h=this._plotDimensions.height-this._offsets.top-this._offsets.bottom+"px";return this._elem=a(f),this._elem.css({position:"absolute",width:g,height:h,left:this._offsets.left,top:this._offsets.top}),this._elem.addClass(e),this._elem},a.jqplot.BlockCanvas.prototype.setContext=function(){return this._ctx={canvas:{width:0,height:0},clearRect:function(){return null}},this._ctx}}(jQuery);