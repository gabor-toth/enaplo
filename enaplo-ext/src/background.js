const APP_EXTENSION_ID = 'cdkfbegjbeefnmjackelbiekgoflnkib';
//const COOKIE_DOMAIN_FULL = 'enaplo.e-epites.hu';
const COOKIE_DOMAIN_SUFFIX = '.e-epites.hu';
const COOKIE_PATH = '/enaplo_demo';
const COOKIE_NAME_HTML_ID = 'htmlid';
const COOKIE_NAME_SESSION_ID = 'session_id';

function debugLogAllCookies() {
	let selector = {
		domain : 'e-epites.hu'
	};
	console.log("cookies.getAll " + JSON.stringify(selector));
	chrome.cookies.getAll(selector, function(cookies) {
		console.log("cookies.getAll callback");
		for ( let i in cookies ) {
			console.log(cookies[ i ].domain + ' ' + cookies[ i ].name + ' ' + cookies[ i ].value);
		}
	});
}

function determineLoggedInAndCookie(callback) {
	let selector = {
		domain : COOKIE_DOMAIN_SUFFIX
	};
	chrome.cookies.getAll(selector, function(allCookies) {
		let domainCookies = {},
			cookiesHtmlid = null,
			cookieSessionid = null;
		for ( let i in allCookies ) {
			let cookie = allCookies[ i ];
			if ( !cookie.domain.endsWith(COOKIE_DOMAIN_SUFFIX) ) {
				continue;
			}
			if ( cookie.name == COOKIE_NAME_SESSION_ID ) {
				cookieSessionid = cookie.value;
			} else if ( cookie.name == COOKIE_NAME_HTML_ID ) {
				cookieHtmlid = cookie.value;
			}
			domainCookies[ cookie.name ] = cookie.value;
		}
		let isLoggedIn = cookieSessionid != null && cookieSessionid.length != 0 && (cookieHtmlid == null || cookieHtmlid.length == 0);
		if ( !isLoggedIn ) {
			cookieSessionid = null;
		}
		let state = {
			cookies : domainCookies,
			loggedIn : isLoggedIn
		};
		//console.log(JSON.stringify(state));
		if ( callback != null ) {
			callback(state);
		}
	});
}

chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
	//console.log("onMessageExternal sender:" + JSON.stringify(sender) + " request: " + JSON.stringify(request));
	if ( request.requestState ) {
		determineLoggedInAndCookie(function(state) {
			sendResponse(state);
		});
	} else {
		console.log("onMessageExternal unhandled request, sender:" + JSON.stringify(sender) + " request: " + JSON.stringify(request));
	}
	return true; // sendResponse will be called asynchronously
});

chrome.cookies.onChanged.addListener(function(info) {
	let cookie = info.cookie;
	if ( !cookie.domain.endsWith(COOKIE_DOMAIN_SUFFIX) || cookie.path != COOKIE_PATH ) {
		return;
	}
	//console.log("onChanged " + JSON.stringify(info));
	determineLoggedInAndCookie(function(state) {
		chrome.runtime.sendMessage(APP_EXTENSION_ID, state, null);
	});
});
