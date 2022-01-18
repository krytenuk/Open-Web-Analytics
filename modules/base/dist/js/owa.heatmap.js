"use strict";(self.webpackChunkowa=self.webpackChunkowa||[]).push([[18],{804:(t,e,s)=>{s.r(e),s.d(e,{Heatmap:()=>a});var o=s(755);
/**
 * Javascript Heatmap Library
 * 
 * @author      Peter Adams <peter@openwebanalytics.com>
 * @web            <a href="http://www.openwebanalytcs.com">Open Web Analytics</a>
 * @copyright   Copyright &copy; 2006-2010 Peter Adams <peter@openwebanalytics.com>
 * @license     http://www.gnu.org/copyleft/gpl.html GPL v2.0
 */
class a{constructor(t,e){this.docDimensions=this.getDim(document),t=t||this.docDimensions.w,e=e||this.docDimensions.h,OWA_instance.debug("Canvas size: %s by %s",t,e),this.createCanvas(t,e),this.canvas=document.getElementById("owa_heatmap"),this.context=this.canvas.getContext("2d"),this.options={dotSize:12,numRegions:40,alphaIncrement:50,demoMode:!1,liveMode:!0,mapInterval:1e3,randomDataCount:200,rowsPerFetch:100,strokeRegions:!1,svgUrl:OWA_instance.getSetting("baseUrl")+"/modules/base/i/test.svg#f1",baseUrl:"",apiUrl:""},this.regions=[],this.regionsMap=[],this.regionWidth=null,this.regionHeight=null,this.dirtyRegions={},this.timer="",this.clicks="",this.nextPage=1,this.more=!0,this.lock=!1}markRegionDirty(t){t>=0?(this.dirtyRegions[t]=!0,OWA_instance.debug("marking region dirty: %s",t)):OWA_instance.debug("no region to mark dirty!")}showControlPanel(){var t=this;o("body").append('<div id="owa_overlay"></div>'),o("#owa_overlay").append('<div id="owa_overlay_logo"></div>'),o("#owa_overlay").append('<div class="owa_overlay_control" id="owa_overlay_start">Start</div>'),o("#owa_overlay_start").toggleClass("active"),o("#owa_overlay").append('<div class="owa_overlay_control" id="owa_overlay_stop">Stop</div>'),o("#owa_overlay").append('<div class="owa_overlay_control" id="owa_overlay_end">X</div>'),o("#owa_overlay_start").click((function(){t.startTimer()})),o("#owa_overlay_stop").click((function(){t.stopTimer()})),o(".owa_overlay_control").bind("click",(function(){o(".owa_overlay_control").removeClass("active"),o(this).addClass("active")})),o("#owa_overlay_end").click((function(){t.endSession()})),o(window).on("unload",(function(){OWA_instance.endOverlaySession()}))}generate(){this.showControlPanel(),this.applyBlur(),!0===this.options.liveMode?this.startTimer():this.map()}endSession(){Util.eraseCookie(OWA_instance.getSetting("ns")+"overlay",document.domain),window.close()}startTimer(){var t=this;this.timer=setInterval((function(){t.map()}),this.options.mapInterval)}stopTimer(){if(!this.timer)return!1;clearInterval(this.timer)}map(){if(1!=this.lock)if(this.lock=!0,!0===this.options.liveMode)if(!0===this.checkForMoreClicks()){OWA_instance.debug("there are more clicks to fetch.");this.getData()}else OWA_instance.debug("there are no more clicks to fetch."),this.stopTimer();else this.getData();else OWA_instance.debug("skipping data fetch due to lock.")}getData(){if(!0===this.options.demoMode)return this.getRandomData(this.options.randomDataCount);this.fetchData(this.getNextPage())}checkForMoreClicks(){return this.more}getNextPage(){return this.nextPage}setNextPage(t){OWA_instance.debug("setNextpage received page as %d",t),this.nextPage++,OWA_instance.debug("setNextpage is setting page as %d",this.nextPage)}setMore(t){this.more=t}fetchData(t){if(OWA_instance.debug("fetchData will fetch page %s",t),1!=t)var e=this.clicks.next;else{var i=unescape(OWA_instance.state.getStateFromCookie("overlay"));e=JSON.parse(i).api_url}OWA_instance.debug("fetch data using api url: "+e);var s=this;o.ajax({url:e,dataType:"jsonp",jsonp:"owa_jsonpCallback",success:function(t){s.plotClickData(t)}})}plotClickData(t){return!!t&&(this.clicks=t.data,!0===t.data.more&&null!=t.data.more?(OWA_instance.debug("plotClickData says more flag was set to true"),this.setMore(!0),this.setNextPage(t.data.page)):(OWA_instance.debug("plotClickData says more flag was set to false"),this.setMore(!1)),this.plotDotsRound(this.getClicks()),this.lock=!1,!0)}getClicks(){return this.clicks.resultsRows}getRegion(t){return this.regions[t]}setColor(t){OWA_instance.debug("About to set color for region %s",t);var e=this.getRegion(t);OWA_instance.debug("set color coords %s %s",e.x,e.y);for(var i=this.context.getImageData(e.x,e.y,this.regionWidth,this.regionHeight),s=i.data,o=0,n=s.length;o<n;o+=4){var a=this.getRgbFromAlpha(s[o+3]);s[o]=Math.round(parseInt(a.r)),s[o+1]=Math.round(parseInt(a.g)),s[o+2]=Math.round(parseInt(a.b))}this.context.putImageData(i,e.x,e.y)}getRgbFromAlpha(t){var e={r:null,g:null,b:null};return t<=255&&t>=235?(tmp=255-t,e.r=255-tmp,e.g=12*tmp):t<=234&&t>=200?(tmp=234-t,e.r=255-8*tmp,e.g=255):t<=199&&t>=150?(tmp=199-t,e.g=255,e.b=5*tmp):t<=149&&t>=100?(tmp=149-t,e.g=255-5*tmp,e.b=255):e.b=255,e}fillRegion(t){this.fillRectangle(this.regions[t].x,this.regions[t].y,this.regionWidth,this.regionHeight,"rgba(0,0,0, 0.5)")}strokeRegion(t){this.context.strokeRect(this.regions[t].x,this.regions[t].y,this.regionWidth,this.regionHeight)}fillRectangle(t,e,i,s,o){this.context.fillStyle=o,this.context.fillRect(t,e,i,s)}fillAllRegions(){for(var t=0,e=this.regions.length;t<e;t++)this.fillRegion(t)}findRegion(t,e){for(i in t=parseFloat(t),e=parseFloat(e),OWA_instance.debug("finding region for %s",t,e),this.regionsMap)if(this.regionsMap.hasOwnProperty(i)&&(OWA_instance.debug("regionmap i: %s",i),t<=i))for(n in OWA_instance.debug("regionmap x chosen: %s. x was: %s",i,t),this.regionsMap[i])if(this.regionsMap[i].hasOwnProperty(n)&&e<=n)return OWA_instance.debug("stopping on regionmap y: %s",n),OWA_instance.debug("regionmap y: %s",n),OWA_instance.debug("region chosen: %s (i = %s, n = %s)",this.regionsMap[i][n],i,n),this.regionsMap[i][n]}calcRegions(){this.regionWidth=Math.round(this.docDimensions.w/this.options.numRegions*100)/100,this.regionHeight=Math.round(this.docDimensions.h/this.options.numRegions*100)/100,OWA_instance.debug("Region dims: %s %s",this.regionWidth,this.regionHeight);for(var t=0,e=this.regionHeight,i=this.docDimensions.h;e<=i;e+=this.regionHeight){e=Math.round(100*e)/100-0,OWA_instance.debug("calcregions y value",e);for(var s=this.regionWidth,o=this.docDimensions.w;s<=o;s+=this.regionWidth)s=Math.round(100*s)/100-0,this.regions[t]={x:s-this.regionWidth,y:e-this.regionHeight},this.regionsMap[s]||(this.regionsMap[s]=Array()),this.regionsMap[s][e]=t,!0===this.options.strokeRegions&&this.strokeRegion(t),t++}}getRandomData(t){for(var e=Array(),i=0;i<t;i++){var s=Math.round(Math.floor(Math.random()*(this.docDimensions.w-this.options.dotSize))),o=Math.round(Math.floor(Math.random()*(this.docDimensions.h-this.options.dotSize)));e.push({x:s,y:o})}return e}plotDotsRound(t){for(var e=0;e<t.length;e++)if(t[e].x+this.options.dotSize>this.docDimensions.w&&(t[e].x=t[e].x-this.options.dotSize),t[e].y+this.options.dotSize>this.docDimensions.h&&(t[e].y=t[e].y-this.options.dotSize),t[e].x<=this.docDimensions.w&&t[e].y<=this.docDimensions.h)if(OWA_instance.debug("plotting %s %s",t[e].x,t[e].y),t[e].x>=0&&t[e].y>=0){OWA_instance.debug("plotting %s %s",t[e].x,t[e].y);var i=this.context.createRadialGradient(t[e].x,t[e].y,7,t[e].x,t[e].y,this.options.dotSize);i.addColorStop(0,"rgba(0,0,0,0.1)"),i.addColorStop(1,"rgba(0,0,0,0)"),this.context.fillStyle=i,this.context.fillRect(t[e].x-this.options.dotSize,t[e].y-this.options.dotSize,2*this.options.dotSize,2*this.options.dotSize),this.setColorForDot(t[e].x,t[e].y)}else OWA_instance.debug("not getting image data. coordinates %s %s less than zero.",t[e].x,t[e].y);else OWA_instance.debug("not getting image data. coordinates %s %s are outside the canvas",t[e].x,t[e].y)}setColorForDot(t,e){OWA_instance.debug("About to set color for %s, %s",t,e);var i=1.3*this.options.dotSize;t-=i,e-=i;var s=this.docDimensions.w,o=this.docDimensions.h,n=2*this.options.dotSize;t+n>s&&(t=s-n),t<0&&(t=0),e<0&&(e=0),e+n>o&&(e=o-n);for(var a=this.context.getImageData(t,e,n,n),r=a.data,h=0,g=r.length;h<g;h+=4){var d=this.getRgbFromAlpha(r[h+3]);r[h]=Math.round(parseInt(d.r)),r[h+1]=Math.round(parseInt(d.g)),r[h+2]=Math.round(parseInt(d.b))}this.context.putImageData(a,t,e)}processDirtyRegions(){for(i in this.dirtyRegions)this.dirtyRegions.hasOwnProperty(i)&&this.setColor(i);this.dirtyRegions=new Array}applyBlur(){this.canvas.className="owa_blur"}getDocHeight(){var t=document;return Math.max(Math.max(t.body.scrollHeight,t.documentElement.scrollHeight),Math.max(t.body.offsetHeight,t.documentElement.offsetHeight),Math.max(t.body.clientHeight,t.documentElement.clientHeight))}getDim(t){var e,i,s=200,o=200;return t.height,t.body&&(t.body.scrollHeight&&(o=e=t.body.scrollHeight,s=t.body.scrollWidth),t.body.offsetHeight&&(o=i=t.body.offsetHeight,s=t.body.offsetWidth),e&&i&&(o=Math.max(e,i))),o=this.getDocHeight(),OWA_instance.debug("doc dims %s %s",s,o),{w:s,h:o}}createCanvas(t,e){o("body").append('<canvas id="owa_heatmap" width="'+t+'px" height="'+e+'px" style="position:absolute; top:0px; left:0px; z-index:999999;padding:0; margin:0;background: rgba(127, 127, 127, 0.5);"></canvas>')}getDataPoints(){}}}}]);