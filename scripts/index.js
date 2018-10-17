// When the DOM is ready it'll execute fn().
function ready(fn) {
	if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}

ready(function() {
	var getFile = function(url, cb) {
		var request = new XMLHttpRequest();
		request.open('GET', url, false);
		request.onload = function() {
			if (this.status >= 200 && this.status < 400) {
				// Success!
				var json = JSON.parse(this.response);
				var app = new Vue({
					el: '#container',
					data: {
						menu: json
					}
				});
			} else {
				console.log("We reached our target server, but it returned an error");
			}
		};
		request.onerror = function() {
			console.log("There was a connection error of some sort");
		};
		request.send();
	};
	var data = getFile('/data.json');
});
