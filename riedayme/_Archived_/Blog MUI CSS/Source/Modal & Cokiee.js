(function(){this.Modal=function(){this.closeButton=null;this.modal=null;this.overlay=null;this.transitionEnd=transitionSelect();var defaults={autoOpen:!1,className:'fade-and-drop',closeButton:!0,content:"",maxWidth:600,minWidth:280,overlay:!0}
	if(arguments[0]&&typeof arguments[0]==="object"){this.options=extendDefaults(defaults,arguments[0])}
		if(this.options.autoOpen===!0)this.open()}
			Modal.prototype.close=function(){var _=this;this.modal.className=this.modal.className.replace(" scotch-open","");this.overlay.className=this.overlay.className.replace(" scotch-open","");this.modal.addEventListener(this.transitionEnd,function(){_.modal.parentNode.removeChild(_.modal)});this.overlay.addEventListener(this.transitionEnd,function(){if(_.overlay.parentNode)_.overlay.parentNode.removeChild(_.overlay)})}
		Modal.prototype.open=function(){buildOut.call(this);initializeEvents.call(this);window.getComputedStyle(this.modal).height;this.modal.className=this.modal.className+(this.modal.offsetHeight>window.innerHeight?" scotch-open scotch-anchored":" scotch-open");this.overlay.className=this.overlay.className+" scotch-open"}
		function buildOut(){var content,contentHolder,docFrag;if(typeof this.options.content==="string"){content=this.options.content}else{content=this.options.content.innerHTML}
		docFrag=document.createDocumentFragment();this.modal=document.createElement("div");this.modal.className="scotch-modal "+this.options.className;this.modal.style.minWidth=this.options.minWidth+"px";this.modal.style.maxWidth=this.options.maxWidth+"px";if(this.options.closeButton===!0){this.closeButton=document.createElement("button");this.closeButton.className="scotch-close close-button";this.closeButton.innerHTML="&times;";this.modal.appendChild(this.closeButton)}
		if(this.options.overlay===!0){this.overlay=document.createElement("div");this.overlay.className="scotch-overlay "+this.options.className;docFrag.appendChild(this.overlay)}
		contentHolder=document.createElement("div");contentHolder.className="scotch-content";contentHolder.innerHTML=content;this.modal.appendChild(contentHolder);docFrag.appendChild(this.modal);document.body.appendChild(docFrag)}
		function extendDefaults(source,properties){var property;for(property in properties){if(properties.hasOwnProperty(property)){source[property]=properties[property]}}
		return source}
		function initializeEvents(){if(this.closeButton){this.closeButton.addEventListener('click',this.close.bind(this))}
		if(this.overlay){this.overlay.addEventListener('click',this.close.bind(this))}}
			function transitionSelect(){var el=document.createElement("div");if(el.style.WebkitTransition)return "webkitTransitionEnd";if(el.style.OTransition)return "oTransitionEnd";return 'transitionend'}}())
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
function eraseCookie(name) {
	createCookie(name,"",-1);
}
function setExpiryDate() {
	var d = new Date();
	d.setDate(d.getDate() + 1);
	return d.toGMTString();
}						
function createAcceptCookie() {
	if (readCookie("kodeinblogger_modal") == "hide") {											
		eraseCookie('kodeinblogger_modal');
	}else {
		createCookie('kodeinblogger_modal','hide',1);
	}
}	