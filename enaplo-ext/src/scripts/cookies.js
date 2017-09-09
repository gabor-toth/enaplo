//console.log('cookies.js');

const COOKIE_DOMAIN_SUFFIX = '.e-epites.hu';
const COOKIE_PATH = '/enaplo_demo';
const COOKIE_NAME_HTML_ID = 'htmlid';
const COOKIE_NAME_SESSION_ID = 'session_id';

(function() {
	const DEBUG_ACTION = 1;
	const DEBUG_METHOD_CALL = 2;

	const DEBUG = DEBUG_ACTION;

	function debugLogAllCookies() {
		let selector = {
			domain : 'e-epites.hu'
		};
		console.log('cookies.getAll ' + JSON.stringify(selector, null, 1));
		chrome.cookies.getAll(selector, function(cookies) {
			console.log('cookies.getAll callback');
			for ( let i in cookies ) {
				console.log(cookies[ i ].domain + ' ' + cookies[ i ].name + ' ' + cookies[ i ].value);
			}
		});
	}

	function setCookiesAndLoggedInState(cookies, loggedInState) {
		if ( DEBUG & DEBUG_METHOD_CALL ) {
			console.log('setCookiesAndLoggedInState state: ' + loggedInState + ' cookies: ' + JSON.stringify(loggedInState, null, 1));
		}
		isLoggedIn = loggedInState;
		let cookieHeader = '';
		let first = true;
		for ( let cookieName in cookies ) {
			let cookieValue = cookies[ cookieName ];
			if ( first ) {
				first = false;
			} else {
				cookieHeader += '; ';
			}
			cookieHeader += cookieName + '=' + cookieValue;
		}
		if ( DEBUG & DEBUG_ACTION ) {
			console.log('setCookiesAndLoggedInState htmlid: ' + htmlidToBeAdded + ' cookieHeader: ' + cookieHeader);
		}
		cookiesToBeAdded = cookieHeader;
	}

	function setHtmlidToBeAdded(cookieValue) {
		if ( htmlidToBeAdded == null && cookieValue != null && cookieValue.length != 0 ) {
			htmlidToBeAdded = cookieValue;
		}
	}

	function processCookies(allCookies) {
		if ( DEBUG & DEBUG_METHOD_CALL ) {
			console.log('processCookies allCookies: ' + JSON.stringify(allCookies, null, 1));
		}
		let domainCookies = {},
			cookiesHtmlid = null,
			cookieSessionid = null;
		htmlidToBeAdded = null;
		for ( let i in allCookies ) {
			let cookie = allCookies[ i ];
			if ( !cookie.domain.endsWith(COOKIE_DOMAIN_SUFFIX) ) {
				continue;
			}
			if ( cookie.name == COOKIE_NAME_SESSION_ID ) {
				cookieSessionid = cookie.value;
				setHtmlidToBeAdded(cookie.value);
			} else if ( cookie.name == COOKIE_NAME_HTML_ID ) {
				cookieHtmlid = cookie.value;
				setHtmlidToBeAdded(cookie.value);
			}
			domainCookies[ cookie.name ] = cookie.value;
		}
		let isLoggedIn = cookieSessionid != null && cookieSessionid.length != 0 && (cookieHtmlid == null || cookieHtmlid.length == 0);
		if ( !isLoggedIn ) {
			cookieSessionid = null;
		}
		setCookiesAndLoggedInState(domainCookies, isLoggedIn);
	}

	function collectCookies() {
		let selector = {
			domain : COOKIE_DOMAIN_SUFFIX
		};
		if ( DEBUG & DEBUG_METHOD_CALL ) {
			console.log('collectCookies selector: ' + JSON.stringify(selector, null, 1));
		}
		chrome.cookies.getAll(selector, processCookies);
	}

	function onCookiesChanged(info) {
		let cookie = info.cookie;
		if ( !cookie.domain.endsWith(COOKIE_DOMAIN_SUFFIX) || cookie.path != COOKIE_PATH ) {
			return;
		}
		if ( DEBUG & DEBUG_METHOD_CALL ) {
			console.log('onChanged ' + JSON.stringify(info, null, 1));
		}
		collectCookies();
	}

	collectCookies();
	chrome.cookies.onChanged.addListener(onCookiesChanged);
})();
