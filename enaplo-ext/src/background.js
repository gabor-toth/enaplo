const APP_EXTENSION_ID = 'cdkfbegjbeefnmjackelbiekgoflnkib';
//const COOKIE_DOMAIN_FULL = 'enaplo.e-epites.hu';
const COOKIE_DOMAIN_SUFFIX = '.e-epites.hu';
const COOKIE_PATH = '/enaplo_demo';
const COOKIE_NAME_HTML_ID = 'htmlid';
const COOKIE_NAME_SESSION_ID = 'session_id';
const DEBUG = false;

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

function processCookies(allCookies, callback) {
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
	if ( DEBUG ) {
		console.log(JSON.stringify(state));
	}
	if ( callback != null ) {
		callback(state);
	}
}

function determineLoggedInAndCookie(callback) {
	let selector = {
		domain : COOKIE_DOMAIN_SUFFIX
	};
	chrome.cookies.getAll(selector, function(allCookies) {
		processCookies(allCookies, callback);
	});
}

function onMessageListener(request, sender, sendResponse) {
	if ( DEBUG ) {
		console.log("onMessageExternal sender:" + JSON.stringify(sender) + " request: " + JSON.stringify(request));
	}
	if ( request.requestState ) {
		determineLoggedInAndCookie(function(state) {
			sendResponse(state);
		});
	} else {
		console.log("onMessageExternal unhandled request, sender:" + JSON.stringify(sender) + " request: " + JSON.stringify(request));
	}
	return true; // sendResponse will be called asynchronously
}

function onCookiesCollectedResponse(response) {
	if ( response == null ) {
		console.log('E-Napló app is not running');
	} else {
		if ( DEBUG ) {
			console.log(JSON.stringify(response));
		}
	}
}

function onCookiesCollected(state) {
	chrome.runtime.sendMessage(APP_EXTENSION_ID, state, onCookiesCollectedResponse);
}

function onCookiesChanged(info) {
	let cookie = info.cookie;
	if ( !cookie.domain.endsWith(COOKIE_DOMAIN_SUFFIX) || cookie.path != COOKIE_PATH ) {
		return;
	}
	if ( DEBUG ) {
		console.log("onChanged " + JSON.stringify(info));
	}
	determineLoggedInAndCookie(onCookiesCollected);
}

chrome.cookies.onChanged.addListener(onCookiesChanged);
chrome.runtime.onMessageExternal.addListener(onMessageListener);
