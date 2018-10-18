// When the DOM is ready it'll execute fn().
function ready(fn) {
	if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}

ready(function() {
	function renderJSON(json) {

		var app = new Vue({
			el: '#container',
			data: {
				spreads: json
			}
		});
	}

	var getFile = function(url, cb) {
		var request = new XMLHttpRequest();
		request.open('GET', url, true);
		request.onload = function() {
			if (this.status >= 200 && this.status < 400) {
				// Success!
				cb(JSON.parse(this.response));
			} else {
				console.log("We reached our target server, but it returned an error");
			}
		};
		request.onerror = function() {
			console.log("There was a connection error of some sort");
		};
		request.send();
	};
	var data = getFile('/data.json', renderJSON);
});
