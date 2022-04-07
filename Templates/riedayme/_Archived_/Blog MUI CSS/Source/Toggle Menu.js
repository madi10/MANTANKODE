$("#togglemain").on('click', function() {
var x=document.getElementById("main-wrapper");
var y=document.getElementById("main-sidebar");
var yy=document.getElementById("website-footer-widget");
var z=document.getElementById("search-mobile");
var zz=document.getElementById("togglemain");
if(x.style.display==="none") {
x.style.display="block";
y.style.display="none";
if (document.getElementById("website-footer-widget")) {
yy.style.display="none";
}
z.style.display="none";
zz.innerHTML="<i class='fa fa-bars'/>"
}else {
x.style.display="none";
y.style.display="block";
if (document.getElementById("website-footer-widget")) {
yy.style.display="block";
}
z.style.display="block";
window.scroll(0, 0);
zz.innerHTML="<i class='fa fa-newspaper-o'/>"
}
});
// Navigation
jQuery(function(e){function o(){var o={onclose:function(){d.removeClass("active").appendTo(document.body)}},n=e(mui.overlay("on",o));d.appendTo(n),setTimeout(function(){d.addClass("active")},20)}function n(){i.toggleClass("hide-sidedrawer")}var i=e("body"),d=e("#sidedrawer");e(".js-show-sidedrawer").on("click",o),e(".js-hide-sidedrawer").on("click",n);var s=e("strong",d);s.next().hide(),s.on("click",function(){e(this).next().slideToggle(100)})});	