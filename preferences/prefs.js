"use strict";

let prefs = (function() {

	// user preferences

	const PREF_DEF_DISPOSE_TIMEOUT_VALUE = 30;

	const PREF_DISPOSE_TIMEOUT_KEY = "pref_disposeTimeout";

	//////////////////////////////////////////////////////////////////////
	function getDisposeTimeout() {

		return new Promise((resolve) => {

			browser.storage.local.get(PREF_DISPOSE_TIMEOUT_KEY).then((result) => {
				resolve(result[PREF_DISPOSE_TIMEOUT_KEY] === undefined ? PREF_DEF_DISPOSE_TIMEOUT_VALUE : result[PREF_DISPOSE_TIMEOUT_KEY]);
			});
		});
	}

	//////////////////////////////////////////////////////////////////////
	function setDisposeTimeout(value) {

		let obj = {};
		obj[PREF_DISPOSE_TIMEOUT_KEY] = value;
		browser.storage.local.set(obj);
	}

	//////////////////////////////////////////////////////////////////////
	function restoreDefaults() {
		this.setDisposeTimeout(PREF_DEF_DISPOSE_TIMEOUT_VALUE);

		return {
			disposeTimeout: PREF_DEF_DISPOSE_TIMEOUT_VALUE,
		};
	}

	return {
		PREF_DEF_DISPOSE_TIMEOUT_VALUE: PREF_DEF_DISPOSE_TIMEOUT_VALUE,

		getDisposeTimeout: getDisposeTimeout,
		setDisposeTimeout: setDisposeTimeout,

		restoreDefaults: restoreDefaults,
	}

})();
