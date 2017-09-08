var EnaploChromeApp = (function() {
	const EXT_EXTENSION_ID = 'eldaofnbiaopigaahkmacaonfpokngce';
	const DEBUG = false;

	function showMainWindow() {
		chrome.app.window.create('index.html', {
			'outerBounds' : {
				'width' : 800,
				'height' : 600
			}
		});
	}

	function requestStatusCallback(cookiesState) {
		if ( cookiesState == null ) {
			console.log('E-Napló extension is not installed or is not enabled, please check it.');
		} else {
			onMessageCookies(cookiesState);
		}
	}

	function requestStatus() {
		let request = {
			requestState : true
		};
		chrome.runtime.sendMessage(EXT_EXTENSION_ID, request, requestStatusCallback);
	}

	function onMessageCookies(cookiesState) {
		if ( window.angularCookieComponentRef ) {
			window.angularCookieComponentRef.onCookiesChange(cookiesState);
		} else {
			console.warn('No angularCookieComponentRef registered');
		}
	}

	function messageListenerCallback(request, sender, sendResponse) {
		if ( DEBUG ) {
			console.log("onMessageExternal sender:" + JSON.stringify(sender) + " request: " + JSON.stringify(request));
		}
		if ( request.cookies ) {
			onMessageCookies(request);
			let response = {
				processed : true
			};
			sendResponse(response);
		} else {
			console.log("onMessageExternal unhandled request, sender:" + JSON.stringify(sender) + " request: " + JSON.stringify(request));
		}
		return true; // sendResponse will be called asynchronously
	}

	function registerMessageListener() {
		chrome.runtime.onMessageExternal.addListener(messageListenerCallback);
	}

	function onLaunchedCallback() {
		registerMessageListener();
		requestStatus();
		showMainWindow();
	}

	return {
		init : function() {
			chrome.app.runtime.onLaunched.addListener(onLaunchedCallback);
		}
	};
})();

EnaploChromeApp.init();
