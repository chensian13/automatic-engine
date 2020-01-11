/**
 * 表单解决方案
 */
var FILE_TEXT_SIZE="14px";
var DEFAULT_IMG_HEIGHT="140px";

/**
 * 属性：
 * 1）头像高度 head
 * 2）支持文件类型
 * 3）按钮颜色
 * 4）按钮大小：普通，大型按钮
 */
function fileInputComponent(){
	_file_decorate(document.querySelectorAll("file-input"));
}


function _file_decorate(files){
	if(isEmpty(files) || files.length==0) return;
	for(var i=0;i<files.length;i++){
		_file_createComponents(files[i]);
		_file_input(files[i]);
		_file_Btn(files[i]);
		_file_span(files[i]);
		_file_img(files[i]);
	} //end for
}


function _file_createComponents(fi){
	var btn=document.createElement("button");
	var ip=document.createElement("input");
	var span=document.createElement("span");
	//是否支持头像显示
	if(isNotEmpty(fi.getAttribute("head"))){
		var img=document.createElement("img");
		fi.appendChild(img);
	}
	
	fi.appendChild(btn);
	fi.appendChild(span);
	fi.appendChild(ip);
}


/**
 * 创建按钮
 */
function _file_Btn(fi){
	var btn=fi.querySelector("button");
	var ip=fi.querySelector("input");
	var span=fi.querySelector("span");
	
	btn.setAttribute("big","");
	btn.setAttribute("color",fi.getAttribute("color"));
	btn.textContent=fi.getAttribute("value");
	btn.onclick=function(){
		ip.click();
	}
}

/**
 * 创建图片
 */
function _file_img(fi){
	var img=fi.querySelector("img");
	if(isEmpty(img)) return ;
	
	img.style.display="none";
	var h=fi.getAttribute("height");
	if(isNotEmpty(h)){
		img.style.height=h+"px";
	}else{
		img.style.height=DEFAULT_IMG_HEIGHT;
	}
	img.style.marginBottom="10px";
	img.style.borderStyle="solid";
	img.style.borderWidth="thin";
}

/**
 * 创建按钮
 */
function _file_span(fi){
	var span=fi.querySelector("span");
	
	span.style.fontSize=FILE_TEXT_SIZE;
	span.style.marginLeft="10px";
}

/**
 * 创建按钮
 */
function _file_input(fi){
	var ip=fi.querySelector("input");
	var span=fi.querySelector("span");
	var img=fi.querySelector("img");
	
	ip.style.display="none";
	ip.setAttribute("type","file");
	ip.setAttribute("multiple",fi.getAttribute("multiple"));
	ip.setAttribute("accept",fi.getAttribute("accept"));
	ip.onchange=function(){
		if(isNotEmpty(ip.files[0]) 
			&& ip.files.length>0){
			fi.files=ip.files;
			span.textContent=fi.files[0].name;
			
			//是否显示图片
			if(isNotEmpty(img)){
				var windowURL = window.URL || window.webkitURL;
				img.setAttribute("src",windowURL.createObjectURL(fi.files[0]));
				img.style.display="block";
			}
		}else{
			//取消选择
			fi.files=null;
			span.textContent="";
			if(isNotEmpty(img)){
				img.style.display="none";
			}
		} //end else
	} //end bind
}


fileInputComponent();
btnComponent();