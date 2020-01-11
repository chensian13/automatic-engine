/**
 * 分页解决方案
 * 
 * 按钮渲染方案：
 * 按钮分页，针对按钮类型有两种：上一页和下一页按钮，代表页数的按钮
 * 按钮的状态：选择，未选择
 * 
 * 按钮生成方案：
 * 当按钮索引超过一列按钮数量百分之60时，所有页数按钮数字加上（按钮数量的百分之40）
 * 
 * 数据结构：
 * 按钮对象是在dom中获取，是父节点下的兄弟子节点，一个数组结构
 */
var PAGE_BTN_NUM=10;
var pageMap={};

/**
 * 
 */
function pageComponent(){
	_page_btnsGenerate(document.querySelectorAll("page-button"));
}

/**
 * page css属性
 * 1）nowPage：当前页
 * 2)最大页: max
 * @param {Object} pages
 */
function _page_btn_decorate(btn,isNum,isActive){
	if(isNum){
		btn.style.marginRight="5px";
		var page=parseInt(btn.textContent);
		if(page%PAGE_BTN_NUM==1){
			btn.style.marginLeft="5px";
		} //end if
		if(isActive){
			btn.setAttribute("class","bg-purple text-whilte");
		}else{
			btn.setAttribute("class","bg-light text-black");
		}
	}else{
		//上一页或者下一页
		btn.setAttribute("class","bg-purple text-whilte");
	} //and else
}

//********************************************算法升级*******************************************
/**
 * 创建按钮
 */
function _page_btn_create(text){
	var btn=document.createElement("button");;
	btn.textContent=text;
	return btn;
}

/**
 * 分页按钮渲染，不做分页合理性安排
 * @param {Object} btns
 * @param {Object} nowPage
 * @param {Object} isInit
 */
function _page_btns_decorate(page,nowPage,isInit){
	var btns=page.querySelectorAll("button");
	if(isInit){
		_page_btn_decorate(btns[0],false,false);
		_page_btn_decorate(btns[btns.length-1],false,false);
	}
	//页数按钮方案
	var pageNumberDivide=parseInt(PAGE_BTN_NUM/2)+2; //增页分水岭
	var pageNumberOffset=PAGE_BTN_NUM-pageNumberDivide; //页码增量
	var minPage=parseInt(btns[1].textContent);
	var maxPage=parseInt(btns[btns.length-2].textContent);
	var nowIndex=nowPage-minPage+1; //当前选择的索引（从1开始）
	var max=parseInt(page.getAttribute("max"));
	
	if(nowPage>page.nowPage 
		&& (max-nowPage)<pageNumberOffset){
		pageNumberOffset=max-nowPage;
	}else if(nowPage>page.nowPage
		&& (minPage-pageNumberOffset)<1){
		pageNumberOffset=minPage-1;
	}else if(minPage==1 || maxPage==max){
		pageNumberOffset=0;
	}
	
	//alert(nowPage)
	for(var i=1;i<btns.length-1;i++){
		//需要重新渲染按钮和业务页数
		if(nowIndex>pageNumberDivide){
			btns[i].textContent=parseInt(btns[i].textContent)+pageNumberOffset;
		}else if(nowIndex<=pageNumberDivide){
			btns[i].textContent=parseInt(btns[i].textContent)-pageNumberOffset;
		}
		//选择和未选择样式
		if(btns[i].textContent==nowPage){
			_page_btn_decorate(btns[i],true,true);
		}else{
			_page_btn_decorate(btns[i],true,false);
		}
	} //end for
} //end fn

/**
 * 按钮设置点击事件
 * @param {Object} btn
 */
function _page_btn_click(btn,page,btnType){
	if(btnType==1){
		//下一页
		if(page.nowPage<page.max) {
			page.nowPage++;
		}else{
			return;
		}
	}else if(btnType==-1){
		//上一页
		if(page.nowPage>1){
			page.nowPage--;
		}else{
			return;
		}
	}
	btn.onclick=function(){
		_page_btns_decorate(page,this.textContent,false);
	}
}


/**
 * 生成按钮
 */
function _page_btnsGenerate(pages){
	if(isEmpty(pages) || pages.length==0) return ;
	for(var i=0;i<pages.length;i++){
		if(isNotEmpty(pages[i].id))
			pageMap[pages[i].id]={}; //数据初始化
		pages[i].nowPage=1;
		var pre=_page_btn_create('pre');
		_page_btn_click(pre,pages[i],-1);
		var next=_page_btn_create('next');
		_page_btn_click(pre,pages[i],1);
		
		pages[i].appendChild(pre);
		
		for(var j=0;j<PAGE_BTN_NUM;j++){
			var btn=_page_btn_create(j+1);
			_page_btn_click(btn,pages[i]);
			pages[i].appendChild(btn);
		} //end for
		pages[i].appendChild(next);
		
		_page_btns_decorate(pages[i],1,true);
	} //end for
}


pageComponent();

