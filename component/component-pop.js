/**
 * 弹窗解决方案
 * 
 */

/**
 * 
 * @param {String} id pop的id
 * @param int z 
 */
function popComponent(id,z){
	if(isNaN(z)) z=1;
	_pop_decorate(id,z);
}

/**
 * 
 * @param {String} id
 */
function popCenter(id){
	var pop=document.getElementById(id);
	var popW=pop.offsetWidth;
	var popH=pop.offsetHeight;
	var body=document.getElementsByTagName("body")[0];
	pop.style.left=(body.offsetWidth-popW)/2+"px";
	if(window.innerHeight>popH){
		pop.style.top=(body.offsetHeight-popH)/2+"px";
	}
}


/**
 * 样式
 * @param {Object} pl
 */
function _pop_decorate(id,z){
	var pop=document.getElementById(id);
	var lay=document.querySelector("lay[pop='"+id+"']");
	
	var width=window.innerWidth+"px";
	var height=window.innerHeight+"px";
	lay.style.width=width;
	lay.style.height=height;
	lay.style.zindex=z;
	pop.style.zindex=z;
	
	//设置pop居中
	popCenter(id);
}







