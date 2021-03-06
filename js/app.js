var requestResult = '';

(function() {
	ajaxGetRequest('https://jsonplaceholder.typicode.com/comments/1', true, function(result) {
		if (!result.startsWith('GET')){
			requestResult = JSON.parse(result);
			document.getElementById('result').innerHTML += '<h2>'+requestResult['id']+'. '+requestResult['name']+'</h2><p>'+requestResult['body']+'</p><br/>';
			document.getElementById('status').className = 'hidden';
		}
		else {
			console.log(result);
			document.getElementById('status').className = 'alert critical';
		}
	});

	if ('serviceWorker' in navigator) {
		navigator.serviceWorker
			.register('./service-worker.js')
			.then(function() { console.log('Registered service worker!'); });
	}
})();

function ajaxGetRequest(url, async, callback) {
	var request = new XMLHttpRequest();
	request.open('GET', url, async);
	request.onload = function() {
		if (this.status >= 200 && this.status < 400) {
			callback(this.response);
		}
		else {
			callback('GET request from '+url+' returned an error.');
		}
	};
	request.onerror = function() {
		callback('GET request from '+url+' returned an error.');
	};
	request.send();
}

function getNewRequest(requestId){
	ajaxGetRequest('https://jsonplaceholder.typicode.com/comments/'+requestId, true, function(result) {
		if (!result.startsWith('GET')){
			requestResult = JSON.parse(result);
			document.getElementById('result').innerHTML += '<h2>'+requestResult['id']+'. '+requestResult['name']+'</h2><p>'+requestResult['body']+'</p><br/>';
			document.getElementById('status').className = 'hidden';
		}
		else {
			console.log(result);
			document.getElementById('status').className = 'alert critical';
		}
	});
}

function clearResults(){
	document.getElementById('result').innerHTML='';
}
