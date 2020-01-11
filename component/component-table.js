/**
 * 表格解决方案
 */
var TABLE_FONT_SIZE="14px";
var tableMap={
};

function tableComponent(){
	_table_decorate(document.querySelectorAll("table"));
	_table_oper_decorate(document.querySelectorAll("table-oper"));
}

/**
 * 给指定table添加数据
 * @param {Object} table
 * @param {Object} data
 */
function tableData(tableId,data){
	var table=document.getElementById(tableId);
	if(data==null || data.length==0) return ;
	var oper=isNotEmpty(table.getAttribute("oper")); //是否支持操作数据
	var keys=_table_keys(table);
	var keyId=table.getAttribute("key-id");
	var color=table.getAttribute("color");
	for(var i=0;i<data.length;i++){
		var tr=document.createElement("tr");
		if(oper){
			var td=document.createElement("td");
			var check=document.createElement("input");
			check.setAttribute("type","checkbox");
			td.appendChild(check);
			_table_style_td(td,color);
			tr.appendChild(td);
			//设置记录id
			if(isNotEmpty(keyId)){
				check.setAttribute("key-id",data[i][keyId]);
				tr.setAttribute("key-id",data[i][keyId]);
			} //end if
		} //end if
		//记录渲染
		for(var j=0;j<keys.length;j++){
			for(d in data[i]){
				var td=document.createElement("td");
				if(d==keys[j]){
					td.textContent=data[i][d];
					_table_style_td(td,color);
					tr.appendChild(td);
				} //end if
			} //end for
			
		} //end for
		table.appendChild(tr);
	} //end for
}


/**
 * 删除某个table下被选中的行
 * @param {Object} tableId
 */
function tableDeleteRows(tableId){
	var ids=_table_oper_selected(tableId);
	var trs=document.getElementById(tableId).getElementsByTagName("tr");
	for(var i=0;i<trs.length;i++){
		for(var j=0;j<ids.length;j++){
			if(isNotEmpty(trs[i].getAttribute("key-id")) 
				&& trs[i].getAttribute("key-id")==ids[j]){
				trs[i].remove();
			}
		} //end for
	} //end for
}
//***************************************************************************************************
/**
 * 
 * @param {Object} tables
 */
function _table_decorate(tables){
	if(tables==null || tables.length==0) return ;
	for(var i=0;i<tables.length;i++){
		if(isNotEmpty(tables[i].id))
			tableMap[tables[i].id]={}; //数据初始化
		_table_style(tables[i]);
	} //end for
}

function _table_oper_decorate(opers){
	if(opers==null || opers.length==0) return ;
	for(var i=0;i<opers.length;i++){
		var btns=opers[i].querySelectorAll("button");
		for(var j=0;j<btns.length;j++){
			if('delete'==btns[j].getAttribute("event")){
				btns[j].tableId=opers[i].getAttribute("table-id");
				btns[j].onclick=function(){
					_table_oper_delete(this.tableId);
				} //end bind
			}else if('edit'==btns[j].getAttribute("event")){
				btns[j].tableId=opers[i].getAttribute("table-id");
				btns[j].onclick=function(){
					_table_oper_edit(this.tableId);
				} //end bind
			}
		} //end for
	} //end for
}

/**
 * 样式设置
 * @param {Object} table
 */
function _table_style(table){
	table.style.borderSpacing="0";
	table.style.fontSize=TABLE_FONT_SIZE;
	var color=table.getAttribute("color");
	var tds=table.querySelectorAll("td");
	for(var i=0;i<tds.length;i++){
		_table_style_td(tds[i],color);
	} //end for
	//设置标题
	var ths=table.querySelectorAll("th");
	for(var i=0;i<ths.length;i++){
		_table_style_th(ths[i],color);
	} //end for
}


function _table_style_td(td,color){
	td.style.borderBottomStyle="solid";
	td.style.borderWidth="thin";
	if(isNotEmpty(color)){
		td.style.borderColor=analyseColor(color);
	}
}

function _table_style_th(th,color){	
	if(isNotEmpty(color)){
		th.style.backgroundColor=analyseColor(color);
	}else{
		th.style.backgroundColor=analyseColor("gray");
	}
	th.style.fontWeight="normal";
	th.style.color=analyseColor("white");
}

/**
 * 获取table定义的标题属性
 * @param {Object} table
 */
function _table_keys(table){
	var ths=table.querySelectorAll("th");
	var keys=new Array();
	for(var i=0;i<ths.length;i++){
		var key=ths[i].getAttribute("key");
		if(isNotEmpty(key)){
			//定义key为check的标题不被接受
			keys.push(key);
		}
	} //end for
	return keys;
}

/**
 * 获取选中的行key-id
 * @param {Object} tableId
 */
function _table_oper_selected(tableId){
	var table=document.getElementById(tableId);
	var cs=table.querySelectorAll("input[type='checkbox']");
	var ids=new Array();
	for(var i=0;i<cs.length;i++){
		if(cs[i].checked)
			ids.push(cs[i].getAttribute("key-id"));
	} //end for
	return ids;
}


function _table_oper_delete(tableId){
	var ids=_table_oper_selected(tableId);
	if(ids==null || ids.length==0) return;
	tableMap[tableId].remove(ids);
}


/**
 * 编辑按钮，只允许选择一个
 * @param {Object} tableId
 */
function _table_oper_edit(tableId){
	var ids=_table_oper_selected(tableId);
	if(ids==null || ids.length==0){
		return;
	}
	if(ids.length>1){
		alert("最多只能选择一行编辑！");
		return;
	}
	tableMap[tableId].edit(ids[0]);
}


tableComponent();




