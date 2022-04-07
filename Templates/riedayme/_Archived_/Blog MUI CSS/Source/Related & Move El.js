function kodein_removehtmltag(string, longlength) {
	var identtag = string.split("<");
	for (var f = 0; f < identtag.length; f++) {
		if (identtag[f].indexOf(">") != -1) {
			identtag[f] = identtag[f].substring(identtag[f].indexOf(">") + 1, identtag[f].length);
		}
	}
	identtag = identtag.join("");
	identtag = identtag.substring(0, longlength - 1);
	return identtag;
}	


function kodein_relatedpostfeed(kodein) {

	var feedentry = kodein.feed.entry,
	maxpost = feedentry.length;

	for(i = 0; i < maxpost; i++){

		title_arr[no_arr] = feedentry[i].title.$t;

		var snippet;
		if ("summary" in feedentry[i]) {
			snippet = feedentry[i].summary.$t;
		}else if ("content" in feedentry[i]) {
			snippet = feedentry[i].content.$t;
		}
		snippet_arr[no_arr] = kodein_removehtmltag(snippet,maxsnippet);

		if ("media$thumbnail" in feedentry[i]) {				
			var images = feedentry[i].media$thumbnail.url;
			images = images.replace('/s72-c/', '/w250-h200-c/');
		}else {
			var images = images_notfound;
		}
		images_arr[no_arr] = images

		var link;
		for(var h=0; h < feedentry[i].link.length; h++){
			if (feedentry[i].link[h].rel == "alternate") {
				link_arr[no_arr] = feedentry[i].link[h].href;
				break;
			}
		}	
		no_arr++;
	}		
}

Array.prototype.kodein_removesamearray = function (){
	var temp=new Array();
	label:for(i=0;i<this.length;i++){
		for(var j=0; j<temp.length;j++ ){
			if(temp[j]==this[i]) 
				continue label;      
		}
		temp[temp.length] = this[i];
	}
	return temp;
} 

window.addEventListener("DOMContentLoaded", function() {

// Remove Same Data
var title_arr_unique = title_arr.kodein_removesamearray();
var snippet_arr_unique = snippet_arr.kodein_removesamearray();
var images_arr_unique = images_arr.kodein_removesamearray();
var link_arr_unique = link_arr.kodein_removesamearray();

// Random Data
for (var u = 0; u < link_arr_unique.length; u++) {
	var randindex = Math.floor((link_arr_unique.length - 1) * Math.random());
	var link_arr_unique_rand = link_arr_unique[u];
	var title_arr_unique_rand = title_arr_unique[u];
	var snippet_arr_unique_rand = snippet_arr_unique[u];
	var images_arr_unique_rand = images_arr_unique[u];
	link_arr_unique[u] = link_arr_unique[randindex];
	title_arr_unique[u] = title_arr_unique[randindex];
	snippet_arr_unique[u] = snippet_arr_unique[randindex];
	images_arr_unique[u] = images_arr_unique[randindex];
	link_arr_unique[randindex] = link_arr_unique_rand;
	title_arr_unique[randindex] = title_arr_unique_rand;
	snippet_arr_unique[randindex] = snippet_arr_unique_rand;
	images_arr_unique[randindex] = images_arr_unique_rand;
}

var no = 0;
var html = "",
htmlmove = "";
var url_path = location.protocol + '//' + location.host + location.pathname;
url_path = url_path.replace(/^https?:\/\//, '//');
url_path = url_path.replace('blogspot.co.id', 'blogspot.com');
while (no < maxrelated) {
	if (link_arr_unique[no] !== undefined) {
		var new_link_arr_unique = link_arr_unique[no].replace(/^https?:\/\//, '//');
		if (images_arr_unique[no] !== undefined) {			
			var new_images_arr_unique = images_arr_unique[no].replace(/^https?:\/\//, '//');
		}
	}
	if (link_arr_unique[no] !== undefined && new_link_arr_unique !== url_path) {
		if (new_images_arr_unique == undefined) {
			new_images_arr_unique = images_notfound;
		}
		document.getElementById("related-post").style.display = "block";
		html += "<li class='news-title'>";
		html += "<div><a class='related-post-title' title='" + title_arr_unique[no] + "' href='" + new_link_arr_unique + "' target='_top'>" + title_arr_unique[no] + "</a></div>";
		html += "<span class='related-post-snippet'>" + snippet_arr_unique[no] + "</span>";
		html += "<a class='related-post-img' href='" + new_link_arr_unique + "' rel='nofollow' target='_top' title='" + title_arr_unique[no] + "'><img src='" + new_images_arr_unique + "' /></a>";
		html += "</li>";
		htmlmove += "<li>";
		htmlmove += "<a class='related-post-img' href='" + new_link_arr_unique + "' rel='nofollow' target='_top' title='" + title_arr_unique[no] + "'>" + title_arr_unique[no] + "</a>";
		htmlmove += "</li>";
	}
	if (link_arr_unique[1] === undefined) {
		document.getElementById("related-post").style.display = "none";
		document.getElementById("postrelatedmove").style.display = "none";
	}
	if (no == maxrelated) {
		break;
	}else {					
		no++;		
	}
}			
// Go Write
var element = document.getElementById('related-summary');
element.innerHTML += html;
if(kodein_checkelement('related-content')){			
	var element = document.getElementById('related-content');
	element.innerHTML += htmlmove;
}

}, false);