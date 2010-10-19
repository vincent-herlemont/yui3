YUI.add("datatable-base",function(B){function V(Y){V.superclass.constructor.apply(this,arguments);}V.NAME="column";V.ATTRS={id:{valueFn:"_defaultId",writeOnce:true},key:{valueFn:"_defaultKey"},field:{valueFn:"_defaultField"},label:{valueFn:"_defaultLabel"},keyIndex:{readOnly:true},parent:{readOnly:true},children:{},colspan:{readOnly:true},rowspan:{readOnly:true},thNode:{readOnly:true},thLinerNode:{readOnly:true},thLabelNode:{readOnly:true},abbr:{value:null},className:{},editor:{},formatter:{},resizeable:{},sortable:{},hidden:{},width:{},minWidth:{},maxAutoWidth:{}};B.extend(V,B.Widget,{_defaultId:function(){return B.guid();},_defaultKey:function(Y){return Y||B.guid();},_defaultField:function(Y){return Y||this.get("key");},_defaultLabel:function(Y){return Y||this.get("key");},initializer:function(){},destructor:function(){},syncUI:function(){this._uiSetAbbr(this.get("abbr"));},_afterAbbrChange:function(Y){this._uiSetAbbr(Y.newVal);},_uiSetAbbr:function(Y){this._thNode.set("abbr",Y);}});B.Column=V;var J=B.Lang;function L(Y){L.superclass.constructor.apply(this,arguments);}L.NAME="columnset";L.ATTRS={columns:{setter:"_setColumns"},tree:{readOnly:true,value:[]},flat:{readOnly:true,value:[]},hash:{readOnly:true,value:{}},keys:{readOnly:true,value:[]}};B.extend(L,B.Base,{_setColumns:function(Y){return B.clone(Y);},initializer:function(){var Y=[],p=[],o={},n=[],m=this.get("columns"),k=this;function l(x,s,w){var u=0,r=s.length,t,v,q;x++;if(!Y[x]){Y[x]=[];}for(;u<r;++u){t=s[u];t=J.isString(t)?{key:t}:t;v=new B.Column(t);t.yuiColumnId=v.get("id");p.push(v);o[v.get("id")]=v;if(w){v._set("parent",w);}if(J.isArray(t.children)){q=t.children;v._set("children",q);k._setColSpans(v,t);k._cascadePropertiesToChildren(v,q);if(!Y[x+1]){Y[x+1]=[];}l(x,q,v);}else{v._set("keyIndex",n.length);v._set("colspan",1);n.push(v);}Y[x].push(v);}x--;}l(-1,m);this._set("tree",Y);this._set("flat",p);this._set("hash",o);this._set("keys",n);this._setRowSpans();this._setHeaders();},destructor:function(){},_cascadePropertiesToChildren:function(m,k){var l=0,Y=k.length,n;for(;l<Y;++l){n=k[l];if(m.get("className")&&(n.className===undefined)){n.className=m.get("className");}if(m.get("editor")&&(n.editor===undefined)){n.editor=m.get("editor");}if(m.get("formatter")&&(n.formatter===undefined)){n.formatter=m.get("formatter");}if(m.get("resizeable")&&(n.resizeable===undefined)){n.resizeable=m.get("resizeable");}if(m.get("sortable")&&(n.sortable===undefined)){n.sortable=m.get("sortable");}if(m.get("hidden")){n.hidden=true;}if(m.get("width")&&(n.width===undefined)){n.width=m.get("width");}if(m.get("minWidth")&&(n.minWidth===undefined)){n.minWidth=m.get("minWidth");}if(m.get("maxAutoWidth")&&(n.maxAutoWidth===undefined)){n.maxAutoWidth=m.get("maxAutoWidth");}}},_setColSpans:function(m,k){var l=0;function Y(p){var q=p.children,o=0,n=q.length;for(;o<n;++o){if(J.isArray(q[o].children)){Y(q[o]);}else{l++;}}}Y(k);m._set("colspan",l);},_setRowSpans:function(){function Y(l){var n=1,q,o,k,s;function r(v,u){u=u||1;var t=0,m=v.length,p;for(;t<m;++t){p=v[t];if(J.isArray(p.children)){u++;r(p.children,u);u--;}else{if(p.get&&J.isArray(p.get("children"))){u++;r(p.get("children"),u);u--;}else{if(u>n){n=u;}}}}}for(k=0;k<l.length;k++){q=l[k];r(q);for(s=0;s<q.length;s++){o=q[s];if(!J.isArray(o.get("children"))){o._set("rowspan",n);}else{o._set("rowspan",1);}}n=1;}}Y(this.get("tree"));},_setHeaders:function(){var o,m,l=this.get("keys"),k=0,Y=l.length;function n(q,p){q.push(p.get("key"));if(p.get("parent")){n(q,p.get("parent"));}}for(;k<Y;++k){o=[];m=l[k];n(o,m);m._set("headers",o.reverse().join(" "));}},getColumn:function(){}});B.Columnset=L;var C=B.Lang,T=B.Lang.substitute,f=B.Node,H=f.create,D=B.ClassNameManager.getClassName,g=B.bind,O="datatable",F="focus",E="keydown",b="mouseover",j="mouseout",M="mouseup",P="mousedown",K="click",G="doubleclick",Q=D(O,"columns"),A=D(O,"data"),I=D(O,"msg"),N=D(O,"liner"),Z=D(O,"first"),S=D(O,"last"),e="<table></table>",X="<col></col>",c='<thead class="'+Q+'"></thead>',h='<tbody class="'+A+'"></tbody>',a='<th id="{id}" rowspan="{rowspan}" colspan="{colspan}"><div class="'+N+'">{value}</div></th>',R='<tr id="{id}"></tr>',d='<td headers="{headers}"><div class="'+N+'">{value}</div></td>',U="{value}",W='<tbody class="'+I+'"></tbody>';function i(Y){i.superclass.constructor.apply(this,arguments);}i.NAME="dataTable";i.ATTRS={columnset:{setter:"_setColumnset"},recordset:{setter:"_setRecordset"},state:{value:new B.State(),readOnly:true},strings:{valueFn:function(){return B.Intl.get("datatable-base");}},thValueTemplate:{value:U},tdValueTemplate:{value:U},trTemplate:{value:R}};i.HTML_PARSER={attrA:function(Y){}};B.extend(i,B.Widget,{thTemplate:a,tdTemplate:d,_theadNode:null,_tbodyNode:null,_msgNode:null,_setColumnset:function(Y){return C.isArray(Y)?new B.Columnset({columns:Y}):Y;},_setRecordset:function(Y){if(C.isArray(Y)){Y=new B.Recordset({records:Y});}Y.addTarget(this);return Y;},initializer:function(){this.publish("theadCellClick",{defaultFn:this._defTheadCellClickFn,emitFacade:false,queuable:true});this.publish("theadRowClick",{defaultFn:this._defTheadRowClickFn,emitFacade:false,queuable:true});this.publish("theadClick",{defaultFn:this._defTheadClickFn,emitFacade:false,queuable:true});},_defTheadCellClickFn:function(Y){this.fire("theadRowClick",Y);},_defTheadRowClickFn:function(Y){this.fire("theadClick",Y);},_defTheadClickFn:function(Y){},destructor:function(){this.get("recordset").removeTarget(this);},renderUI:function(){var Y=this._addTableNode(this.get("contentBox"))&&this._addColgroupNode(this._tableNode)&&this._addTheadNode(this._tableNode)&&this._addTbodyNode(this._tableNode)&&this._addMessageNode(this._tableNode)&&this._addCaptionNode(this._tableNode);return Y;},_addTableNode:function(Y){if(!this._tableNode){this._tableNode=Y.appendChild(H(e));}return this._tableNode;},_addColgroupNode:function(l){var Y=this.get("columnset").get("keys").length,k=0,m=["<colgroup>"];for(;k<Y;++k){m.push(X);}m.push("</colgroup>");this._colgroupNode=l.insertBefore(H(m.join("")),l.get("firstChild"));
return this._colgroupNode;},_addTheadNode:function(Y){if(Y){this._theadNode=Y.insertBefore(H(c),this._colgroupNode.next());return this._theadNode;}},_addTbodyNode:function(Y){this._tbodyNode=Y.appendChild(H(h));return this._tbodyNode;},_addMessageNode:function(Y){this._msgNode=Y.insertBefore(H(W),this._tbodyNode);return this._msgNode;},_addCaptionNode:function(Y){this._captionNode=Y.invoke("createCaption");return this._captionNode;},bindUI:function(){var n=this._tableNode,k=this.get("contentBox"),l="thead."+Q+">tr>th",m="tbody."+A+">tr>td",Y="tbody."+I+">tr>td";n.delegate(F,this._onEvent,l,this,"theadCellFocus");n.delegate(E,this._onEvent,l,this,"theadCellKeydown");n.delegate(b,this._onEvent,l,this,"theadCellMousedown");n.delegate(j,this._onEvent,l,this,"theadCellMouseout");n.delegate(M,this._onEvent,l,this,"theadCellMouseup");n.delegate(P,this._onEvent,l,this,"theadCellMousedown");n.delegate(K,this._onEvent,l,this,"theadCellClick");k.delegate(G,this._onEvent,l,this,"theadCellDoubleclick");n.delegate(F,this._onEvent,l,this,"tbodyCellFocus");n.delegate(E,this._onEvent,l,this,"tbodyCellKeydown");n.delegate(b,this._onEvent,l,this,"tbodyCellMouseover");n.delegate(j,this._onEvent,l,this,"tbodyCellMouseout");n.delegate(M,this._onEvent,l,this,"tbodyCellMouseup");n.delegate(P,this._onEvent,l,this,"tbodyCellMousedown");n.delegate(K,this._onEvent,l,this,"tbodyCellClick");k.delegate(G,this._onEvent,l,this,"tbodyCellDoubleclick");n.delegate(F,this._onEvent,Y,this,"msgCellFocus");n.delegate(E,this._onEvent,Y,this,"msgCellKeydown");n.delegate(b,this._onEvent,Y,this,"msgCellMouseover");n.delegate(j,this._onEvent,Y,this,"msgCellMouseout");n.delegate(M,this._onEvent,Y,this,"msgCellMouseup");n.delegate(P,this._onEvent,Y,this,"msgCellMousedown");n.delegate(K,this._onEvent,Y,this,"msgCellClick");k.delegate(G,this._onEvent,Y,this,"msgCellDoubleclick");},_onEvent:function(k,Y){this.fire(Y,k);},syncUI:function(){this._uiSetStrings(this.get("strings"));this._uiSetColumnset(this.get("columnset"));this._uiSetRecordset(this.get("recordset"));},_afterStringsChange:function(Y){this._uiSetStrings(Y.newVal);},_uiSetStrings:function(Y){this._uiSetSummary(Y.summary);this._uiSetCaption(Y.caption);},_uiSetSummary:function(Y){this._tableNode.set("summary",Y);},_uiSetCaption:function(Y){this._captionNode.setContent(Y);},_afterColumnsetChange:function(Y){this._uiSetColumnset(Y.newVal);},_uiSetColumnset:function(m){var k=m.get("tree"),n=this._theadNode,l=0,Y=k.length;n.get("children").remove(true);for(;l<Y;++l){this._addTheadTrNode({thead:n,columns:k[l]},(l===0),(l===Y-1));}},_addTheadTrNode:function(l,Y,k){l.tr=this._createTheadTrNode(l,Y,k);this._attachTheadTrNode(l);},_createTheadTrNode:function(r,k,q){var p=H(T(this.get("trTemplate"),r)),m=0,l=r.columns,Y=l.length,n;if(k){p.addClass(Z);}if(q){p.addClass(S);}for(;m<Y;++m){n=l[m];this._addTheadThNode({value:n.get("label"),column:n,tr:p});}return p;},_attachTheadTrNode:function(Y){Y.thead.appendChild(Y.tr);},_addTheadThNode:function(Y){Y.th=this._createTheadThNode(Y);this._attachTheadThNode(Y);},_createTheadThNode:function(k){var Y=k.column;k.id=Y.get("id");k.colspan=Y.get("colspan");k.rowspan=Y.get("rowspan");k.value=T(this.get("thValueTemplate"),k);return H(T(this.thTemplate,k));},_attachTheadThNode:function(Y){Y.tr.appendChild(Y.th);},_afterRecordsetChange:function(Y){this._uiSetRecordset(Y.newVal);},_uiSetRecordset:function(k){var l=0,Y=k.getLength(),m={tbody:this._tbodyNode};for(;l<Y;++l){m.record=k.getRecord(l);m.rowindex=l;this._addTbodyTrNode(m);}},_addTbodyTrNode:function(l){var k=l.tbody,Y=l.record;l.tr=k.one("#"+Y.get("id"))||this._createTbodyTrNode(l);this._attachTbodyTrNode(l);},_createTbodyTrNode:function(p){var n=H(T(this.get("trTemplate"),{id:p.record.get("id")})),k=0,m=this.get("columnset").get("keys"),Y=m.length,l;p.tr=n;for(;k<Y;++k){p.column=m[k];this._addTbodyTdNode(p);}return n;},_attachTbodyTrNode:function(p){var l=p.tbody,n=p.tr,Y=p.record,k=p.rowindex,m=l.get("children").item(k)||null;l.insertBefore(n,m);},_addTbodyTdNode:function(Y){Y.td=this._createTbodyTdNode(Y);this._attachTbodyTdNode(Y);},_createTbodyTdNode:function(k){var Y=k.column;k.headers=Y.get("headers");k.value=this.formatDataCell(k);return H(T(this.tdTemplate,k));},_attachTbodyTdNode:function(Y){Y.tr.appendChild(Y.td);},formatDataCell:function(k){var Y=k.record;k.data=Y.get("data");k.value=Y.getValue(k.column.get("key"));return T(this.get("tdValueTemplate"),k);}});B.namespace("DataTable").Base=i;},"@VERSION@",{lang:["en"],requires:["intl","substitute","widget","recordset"]});YUI.add("datatable-sort",function(F){var A=F.ArraySort.compare,C="asc",B="desc",G=F.ClassNameManager.getClassName("datatable","sortable"),E='<a class="{link_class}" title="{link_title}" href="{link_href}">{value}</a>';function D(){D.superclass.constructor.apply(this,arguments);}F.mix(D,{NS:"sort",NAME:"dataTableSort",ATTRS:{trigger:{value:"theadCellClick",writeOnce:"initOnly"},sortedBy:{value:null}}});F.extend(D,F.Plugin.Base,{thLinkTemplate:E,initializer:function(H){var I=this.get("host");I.get("recordset").plug(F.Plugin.RecordsetSort,{dt:I});I.get("recordset").sort.addTarget(I);this.doBefore("_createTheadThNode",this._beforeCreateTheadThNode);this.doBefore("_attachTheadThNode",function(J){J.th.addClass(G);});I.on(this.get("trigger"),this._onEventSortColumn);I.after("recordsetSort:sort",function(){I._uiSetRecordset(I.get("recordset"));});I.after("sortedByChangeEvent",function(){alert("ok");});if(I.get("rendered")){I._uiSetColumnset(I.get("columnset"));}},_beforeCreateTheadThNode:function(H){if(H.column.get("sortable")){H.value=F.substitute(this.thLinkTemplate,{link_class:"foo",link_title:"bar",link_href:"bat",value:H.value});}},_onEventSortColumn:function(L){L.halt();var J=this.get("columnset").get("hash")[L.currentTarget.get("id")],K=J.get("field"),I=this.get("sortedBy"),H=(I&&I.field===K&&I.dir===C)?B:C,M=J.get("sortFn");if(J.get("sortable")){this.get("recordset").sort.sort(K,H===B,M);this.set("sortedBy",{field:K,dir:H});
}}});F.namespace("Plugin").DataTableSort=D;},"@VERSION@",{requires:["plugin","datatable-base","recordset-sort"],lang:["en"]});YUI.add("datatable-colresize",function(E){var B=E.ClassNameManager.getClassName,F="datatable",A=B(F,"liner"),D='<div class="'+A+'">{value}</div>';function C(){C.superclass.constructor.apply(this,arguments);}E.mix(C,{NS:"colresize",NAME:"dataTableColResize",ATTRS:{}});E.extend(C,E.Plugin.Base,{thLinerTemplate:D,tdLinerTemplate:D,initializer:function(G){this.get("host").thTemplate=E.substitute(this.get("host").thTemplate,{value:this.thLinerTemplate});this.get("host").tdTemplate=E.substitute(this.get("host").tdTemplate,{value:this.tdLinerTemplate});}});E.namespace("Plugin").DataTableColResize=C;},"@VERSION@",{requires:["plugin","dd","datatable-base"]});YUI.add("datatable-scroll",function(B){function A(){A.superclass.constructor.apply(this,arguments);}B.mix(A,{NS:"scroll",NAME:"dataTableScroll",ATTRS:{}});B.extend(A,B.Plugin.Base,{initializer:function(C){}});B.namespace("Plugin").DatatableScroll=A;},"@VERSION@",{requires:["plugin","datatable-base"]});YUI.add("datatable",function(A){},"@VERSION@",{use:["datatable-base","datatable-sort","datatable-colresize","datatable-scroll"]});