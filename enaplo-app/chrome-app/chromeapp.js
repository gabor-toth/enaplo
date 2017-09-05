const extExtensionId = 'eldaofnbiaopigaahkmacaonfpokngce';

function showMainWindow() {
	chrome.app.window.create('index.html', {
		'outerBounds' : {
			'width' : 800,
			'height' : 600
		}
	});
}

function requestLoggedInAndCookie() {
	console.log('requestLoggedInAndCookie');
	chrome.runtime.sendMessage(extExtensionId, {requestState:true}, function(state){
		if ( state == null ) {
			console.log('E-Napló extension is not installed or is not enabled, please check it.');
		} else {
			console.log(JSON.stringify(state));
		}
	} );
}

chrome.app.runtime.onLaunched.addListener(function() {
	requestLoggedInAndCookie();
	showMainWindow();
});
