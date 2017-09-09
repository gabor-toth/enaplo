//console.log('webRequest.js');

const WEBREQUEST_URLS_TO_MATCH = "https://enaplo.e-epites.hu/enaplo_demo/ajax*";
const WEBREQUEST_REFERER = "https://enaplo.e-epites.hu/enaplo_demo/ugyfelmenu.jsp";

(function() {
	const DEBUG_ACTION = 1;
	const DEBUG_METHOD_CALL = 2;

	const DEBUG = DEBUG_ACTION;

	function isIntercepted(details) {
		return tabsIntercepted.hasOwnProperty(details.tabId);
	}

	function shouldBeRedirected(details) {
		return details.url.includes('_htmlid_');
	//return !details.url.includes('&htmlid=');
	}

	function setHeader(headers, setHeaderName, setHeaderValue) {
		let got = false;
		let setHeaderNameLowerCase = setHeaderName.toLowerCase();
		for ( let n = 0; n < headers.length; n++ ) {
			let header = headers[ n ];
			let headerName = header.name;
			let headerValue = header.value;
			if ( headerName.toLowerCase() == setHeaderNameLowerCase ) {
				if ( setHeaderValue == headerValue ) {
					got = true;
					if ( DEBUG & DEBUG_ACTION ) {
						console.log('Left ' + headerName + ' as ' + headerValue);
					}
				} else {
					if ( DEBUG & DEBUG_ACTION ) {
						console.log('Removed ' + headerName + ' ' + headerValue);
					}
					headers.splice(n, 1);
				}
				break;
			}
		}
		if ( !got && setHeaderValue != null ) {
			if ( DEBUG & DEBUG_ACTION ) {
				console.log('Added ' + setHeaderName + ' ' + setHeaderValue);
			}
			headers.push({
				name : setHeaderName,
				value : setHeaderValue
			});
		}
	}

	function onBeforeRequestCallback(details) {
		if ( !isIntercepted(details) || !shouldBeRedirected(details) ) {
			return;
		}
		if ( DEBUG & DEBUG_METHOD_CALL ) {
			console.log('onBeforeRequest ' + JSON.stringify(details, null, 1));
		}
		if ( !isLoggedIn ) {
			if ( DEBUG & DEBUG_ACTION ) {
				console.log('onBeforeRequest not logged in, cancelling');
			}
			return {
				cancel : true
			};
		}
		let redirectUrl = details.url.replace('_htmlid_', htmlidToBeAdded);
		if ( DEBUG & DEBUG_ACTION ) {
			console.log('onBeforeRequest redirect to ' + redirectUrl);
		}
		return {
			redirectUrl : redirectUrl
		}
	}

	function onBeforeSendHeaders(details) {
		if ( !isIntercepted(details) ) {
			return;
		}
		if ( DEBUG & DEBUG_METHOD_CALL ) {
			console.log('onBeforeSendHeaders ' + JSON.stringify(details, null, 1));
		}
		let headers = details.requestHeaders;
		setHeader(headers, 'Referer', WEBREQUEST_REFERER);
		setHeader(headers, 'Origin', null);
		setHeader(headers, 'Cookie', cookiesToBeAdded);
		setHeader(headers, 'X-Requested-With', 'XMLHttpRequest');
		setHeader(headers, 'Accept', 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, * /*; q=0.01');

		if ( DEBUG & DEBUG_METHOD_CALL ) {
			console.log('onBeforeSendHeaders new headers: ' + JSON.stringify(headers, null, 1));
		}
		return {
			requestHeaders : headers
		};
	}

	function onHeadersReceivedCallback(details) {
		if ( !isIntercepted(details) ) {
			return;
		}
		if ( DEBUG & DEBUG_METHOD_CALL ) {
			console.log('onHeadersReceived ' + JSON.stringify(details, null, 1));
		}
		let responseHeaders = details.responseHeaders;
		responseHeaders.push({
			name : 'Access-Control-Allow-Origin',
			value : '*'
		});
		responseHeaders.push({
			name : 'Access-Control-Allow-Headers',
			value : 'Origin, X-Requested-With, Content-Type, Accept'
		});
		if ( DEBUG & DEBUG_ACTION ) {
			console.log('Added Access-Control-Allow-Origin and Access-Control-Allow-Headers');
		}
		return {
			responseHeaders : responseHeaders
		};
	}

	// @see https://developer.chrome.com/extensions/webRequest#event-onBeforeSendHeaders

	chrome.webRequest.onBeforeRequest.addListener(onBeforeRequestCallback, {
		urls : [ WEBREQUEST_URLS_TO_MATCH ]
	}, [
		"blocking"
	]);

	chrome.webRequest.onBeforeSendHeaders.addListener(onBeforeSendHeaders, {
		urls : [ WEBREQUEST_URLS_TO_MATCH ]
	}, [
		"blocking", "requestHeaders"
	]);

	chrome.webRequest.onHeadersReceived.addListener(onHeadersReceivedCallback, {
		urls : [ WEBREQUEST_URLS_TO_MATCH ]
	}, [
		"blocking", "responseHeaders"
	]);

})();
