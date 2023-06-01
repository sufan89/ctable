var w=Object.defineProperty;var c=Object.getOwnPropertySymbols;var y=Object.prototype.hasOwnProperty,F=Object.prototype.propertyIsEnumerable;var a=(i,e,t)=>e in i?w(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t,h=(i,e)=>{for(var t in e||(e={}))y.call(e,t)&&a(i,t,e[t]);if(c)for(var t of c(e))F.call(e,t)&&a(i,t,e[t]);return i};var l=(i,e,t)=>(a(i,typeof e!="symbol"?e+"":e,t),t);import{G as d,d as f,o as p,a as u,c as m,b as S,e as x}from"./vendor.b50446ce.js";const b=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function t(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerpolicy&&(s.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?s.credentials="include":n.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(n){if(n.ep)return;n.ep=!0;const s=t(n);fetch(n.href,s)}};b();function g(i,e){if(!i)return 0;let t=0;return typeof i=="string"?t=i.indexOf(e)>0?Number(i.slice(0,i.indexOf(e))):Number(i):t=i,t}class C{constructor(e,t){l(this,"cellBorder");l(this,"cellFill");l(this,"cellFont");l(this,"cellKey");l(this,"cellPadding");e?(this.cellBorder=h({},e.rowBorder),this.cellFill=h({},e.rowFill),this.cellFont=h({},e.rowFont),this.cellPadding=h({},e.rowPadding)):(this.cellBorder={width:1,color:"#dfe6ec"},this.cellFill={color:"#F5F7FA"},this.cellFont={textBaseline:"middle",textAlign:"left",fontStyle:"normal",fontVariant:"normal",fontWeight:500,fontSize:"24px",lineHeight:1.15,fontFamily:"Microsoft YaHei",fontColor:"#606266"},this.cellPadding={top:10,bottom:10,right:10,left:10}),t&&(this.cellFont.textAlign=t.align||"left"),this.cellKey=d.create().toString()}getFont(){let e="";return this.cellFont.fontStyle&&(e=this.cellFont.fontStyle),this.cellFont.fontVariant&&(e=`${e} ${this.cellFont.fontVariant}`),this.cellFont.fontWeight&&(e=`${e} ${this.cellFont.fontWeight}`),this.cellFont.fontSize&&(e=`${e} ${this.cellFont.fontSize}`),this.cellFont.fontFamily&&(e=`${e} ${this.cellFont.fontFamily}`),e}}class H{constructor(e,t,o){l(this,"cellPosition");l(this,"cellStyle");l(this,"cellKey");l(this,"cellHeight");l(this,"cellWidth");l(this,"contentHeight");l(this,"contentWidth");l(this,"cellType");l(this,"children");l(this,"realVal");l(this,"realHeight");l(this,"realWidth");l(this,"columnInfo");l(this,"ctx");this.cellStyle=new C(e,o),this.cellKey=d.create().toString(),this.ctx=t,this.cellPosition={x:0,y:0},this.cellHeight=0,this.cellWidth=0,this.contentWidth=0,this.contentHeight=0,this.cellType="text",this.children=new Array,this.realVal="",this.realWidth=0,this.realHeight=0,this.columnInfo=o}renderCell(e,t){this.renderCellBody(),this.cellType==="text"&&this.renderTextCell(e,t)}calcCellSize(e){if(this.ctx){this.ctx.font=this.cellStyle.getFont(),this.ctx.textAlign=this.cellStyle.cellFont.textAlign,this.ctx.textBaseline=this.cellStyle.cellFont.textBaseline;const t=this.ctx.measureText(e);this.contentWidth=t.width,this.contentHeight=g(this.cellStyle.cellFont.fontSize,"px")}this.cellWidth=this.contentWidth+this.cellStyle.cellPadding.right+this.cellStyle.cellPadding.left,this.cellHeight=this.contentHeight+this.cellStyle.cellPadding.top+this.cellStyle.cellPadding.bottom}renderTextCell(e,t){if(this.ctx){this.ctx.font=this.cellStyle.getFont(),this.ctx.textAlign=this.cellStyle.cellFont.textAlign,this.ctx.textBaseline=this.cellStyle.cellFont.textBaseline,this.ctx.fillStyle=this.cellStyle.cellFont.fontColor;const o=this.getContentPosition();this.ctx.fillText(t,this.cellPosition.x+o.x,this.cellPosition.y+o.y,this.realWidth)}}renderCellBody(){this.ctx&&(this.ctx.fillStyle=this.cellStyle.cellFill.color,this.ctx.fillRect(this.cellPosition.x-this.cellStyle.cellBorder.width,this.cellPosition.y-this.cellStyle.cellBorder.width,this.realWidth-this.cellStyle.cellBorder.width,this.realHeight-this.cellStyle.cellBorder.width),this.ctx.fillStyle=this.cellStyle.cellBorder.color,this.ctx.lineWidth=this.cellStyle.cellBorder.width,this.ctx.strokeRect(this.cellPosition.x,this.cellPosition.y,this.realWidth,this.realHeight))}getContentPosition(){const e={x:0,y:0};switch(e.y=this.realHeight-this.contentHeight,this.cellStyle.cellFont.textAlign){case"left":case"start":e.x=this.cellStyle.cellPadding.left;break;case"right":case"end":e.x=this.realWidth-this.cellStyle.cellPadding.right;break;case"center":e.x=this.realWidth/2;break}return e}}class P extends H{constructor(e,t,o){super(e,t,o);this.cellType="text"}renderCell(e){super.renderCell(e,this.columnInfo.label),this.children&&this.children.length>0&&this.children.forEach(t=>{t.renderCell(e,t.columnInfo.label)})}calcCellSize(){this.cellType==="text"?super.calcCellSize(this.columnInfo.label):super.calcCellSize("");const{width:e,height:t}=this.getRealCellSize();this.realWidth=e,this.realHeight=t}getRealCellSize(){let e=0,t=this.cellHeight;return this.children&&this.children.length>0?this.children.forEach(o=>{o.calcCellSize(),e=e+o.realWidth,t=t+o.realHeight}):this.columnInfo.width?e=g(this.columnInfo.width,"px")||this.cellWidth:e=this.cellWidth,{width:e,height:t}}}class B{constructor(e,t,o){l(this,"rowCells");l(this,"ctx");l(this,"headerConfigInfo");l(this,"rowHeight");l(this,"headStyleInfo");this.ctx=e,this.headerConfigInfo=t,this.rowCells=new Array,this.rowHeight=0,this.headStyleInfo=o,this.initHeader(),this.calcRowSize()}initHeader(){this.headerConfigInfo&&this.headerConfigInfo.length>0&&(this.rowCells=this.generateHeadCells(this.headerConfigInfo))}getHeadCell(e){return new P(this.headStyleInfo,this.ctx,e)}generateHeadCells(e){const t=new Array;return e&&e.length>0&&e.forEach(o=>{var s;const n=this.getHeadCell(o);o.children&&o.children.length>0&&((s=n.children)==null||s.push(...this.generateHeadCells(o.children))),t.push(n)}),t}renderRow(e){console.log(e,"context"),this.calcRowCellPosition({x:0,y:0,width:e.canvasSize[0],height:e.canvasSize[1]},this.rowCells),this.rowCells&&this.rowCells.length>0&&this.rowCells.forEach(t=>{t.renderCell(e)})}getHeaderInfo(){return this.rowCells}calcRowSize(){this.rowHeight=0,this.rowCells&&this.rowCells.length>0&&this.rowCells.forEach(e=>{e.calcCellSize(),this.rowHeight<e.realHeight&&(this.rowHeight=e.realHeight)})}calcRowCellPosition(e,t){let{x:o,y:n,width:s}=e;t&&t.length>0&&t.forEach(r=>{r.columnInfo.fixed&&r.columnInfo.fixed==="right"?(r.cellPosition={x:s,y:n},s=s-r.realWidth):(r.cellPosition={x:o,y:n},o=o+r.realWidth),r.children&&r.children.length>0&&this.calcRowCellPosition({x:r.cellPosition.x,y:r.realHeight,width:r.realWidth,height:r.realHeight},r.children)})}}class _{constructor(e,t){l(this,"rowBorder");l(this,"rowFill");l(this,"rowFont");l(this,"rowPadding");l(this,"rowType");l(this,"currentTableConfig");this.currentTableConfig=e,this.rowBorder={width:1,color:"#dfe6ec"},this.rowFill={color:"#F5F7FA"},t?this.rowFont=t.baseFont:e.baseFont?this.rowFont=e.baseFont:this.rowFont={textBaseline:"middle",textAlign:"left",fontStyle:"normal",fontVariant:"normal",fontWeight:500,fontSize:"24px",lineHeight:1.15,fontFamily:"Microsoft YaHei",fontColor:"#606266"},this.rowPadding={top:10,bottom:10,right:10,left:10},this.rowType="headerRow"}getRowStyle(){return{rowBorder:this.rowBorder,rowFill:this.rowFill,rowPadding:this.rowPadding,rowFont:this.rowFont}}}class T{constructor(e,t){l(this,"cellStyle");l(this,"rowBorder");l(this,"rowFill");l(this,"rowFont");l(this,"rowPadding");l(this,"rowType");l(this,"currentTableConfig");this.cellStyle=new Array,this.currentTableConfig=e,this.rowBorder={width:1,color:"#dfe6ec"},this.rowFill={color:"#F5F7FA"},this.rowFont=t.baseFont,this.rowPadding={top:10,bottom:10,right:10,left:10},this.rowType="tableRow"}getRowStyle(){return{rowBorder:this.rowBorder,rowFill:this.rowFill,rowPadding:this.rowPadding,rowFont:this.rowFont}}}class E{constructor(e){l(this,"baseFont");l(this,"headerRowStyle");l(this,"tableRowStyle");e.baseFont?this.baseFont=e.baseFont:this.baseFont={textBaseline:"middle",textAlign:"left",fontStyle:"normal",fontVariant:"normal",fontWeight:500,fontSize:"12px",lineHeight:1.15,fontFamily:"Microsoft YaHei",fontColor:"#606266"},this.headerRowStyle=new _(e,this),this.tableRowStyle=new T(e,this)}}class W{constructor(e,t){l(this,"parentElement");l(this,"tableElement");l(this,"ctx");l(this,"tableConfig");l(this,"canvasSize");l(this,"viewSize");l(this,"tableHeader");l(this,"tableStyle");!e&&e===""&&console.error("root element is not define"),this.parentElement=document.getElementById(e),this.tableElement=document.createElement("canvas"),this.tableElement.setAttribute("class","table-main"),this.parentElement!==null&&this.parentElement.appendChild(this.tableElement),this.tableConfig=t,this.ctx=this.tableElement.getContext("2d"),this.canvasSize=[0,0],this.viewSize=[0,0],this.changeCanvasSize(),this.tableStyle=new E(t),this.ctx?this.tableHeader=new B(this.ctx,t.Columns,this.tableStyle.headerRowStyle):this.tableHeader=void 0,this.init()}init(){this.tableHeader&&this.tableHeader.renderRow(this),console.log(this.tableStyle,this.tableHeader,"this.tableStyle")}changeCanvasSize(){var t;const e=(t=this.parentElement)==null?void 0:t.getBoundingClientRect();this.tableElement.width=e?e.width:200,this.tableElement.height=e?e.height:200,this.canvasSize=[this.tableElement.width,this.tableElement.height]}reRender(){}setTableData(e){console.log(e)}drawTableHeader(){}}var v=(i,e)=>{const t=i.__vccOpts||i;for(const[o,n]of e)t[o]=n;return t};const A={id:"myTable"},z=f({setup(i){let e=null;const t={Columns:[{label:"\u6CE8\u518C\u540D\u79F0",prop:"companyName",align:"left"},{label:"\u516C\u53F8\u7F16\u7801",prop:"companyCode",align:"left"},{label:"\u8BC1\u4EF6\u53F7\u7801",width:"200",prop:"accountId",align:"left"},{label:"\u5F00\u901A\u7535\u5B50\u5408\u540C\u670D\u52A1\u72B6\u6001",width:"180",prop:"openStatus",align:"center"},{label:"\u7A0E\u52A1\u7F16\u7801",prop:"taxIdentifyNo",align:"left"},{label:"\u5F00\u901A\u65F6\u95F4",prop:"openTime",align:"center"},{label:"\u521B\u5EFA\u65F6\u95F4",prop:"createdTime",align:"right"},{label:"\u66F4\u65B0\u65F6\u95F4",prop:"updatedTime",align:"right"}]};return p(()=>{e=new W("myTable",t),e.setTableData([])}),(o,n)=>(u(),m("div",A))}});var R=v(z,[["__scopeId","data-v-4d9fb91f"]]);const I=f({setup(i){return(e,t)=>(u(),S(R))}});x(I).mount("#app");