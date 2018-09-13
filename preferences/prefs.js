"use strict";

let prefs = (function() {

	// user preferences

	const PREF_DEF_DELAYED_ACTIVATION_TIMEOUT_VALUE = 8;
	const PREF_DEF_DISPOSE_TIMEOUT_VALUE = 30;

	const PREF_DELAYED_ACTIVATION_TIMEOUT_KEY = "pref_delayedActivationTimeout";
	const PREF_DISPOSE_TIMEOUT_KEY = "pref_disposeTimeout";

	//////////////////////////////////////////////////////////////////////
	function getDelayedActivationTimeout() {

		return new Promise((resolve) => {

			browser.storage.local.get(PREF_DELAYED_ACTIVATION_TIMEOUT_KEY).then((result) => {
				resolve(result[PREF_DELAYED_ACTIVATION_TIMEOUT_KEY] === undefined ? PREF_DEF_DELAYED_ACTIVATION_TIMEOUT_VALUE : result[PREF_DELAYED_ACTIVATION_TIMEOUT_KEY]);
			});
		});
	}

	//////////////////////////////////////////////////////////////////////
	function setDelayedActivationTimeout(value) {

		let obj = {};
		obj[PREF_DELAYED_ACTIVATION_TIMEOUT_KEY] = value;
		browser.storage.local.set(obj);
	}

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
		this.setDelayedActivationTimeout(PREF_DEF_DELAYED_ACTIVATION_TIMEOUT_VALUE);
		this.setDisposeTimeout(PREF_DEF_DISPOSE_TIMEOUT_VALUE);

		return {
			delayedActivationTimeout: PREF_DEF_DELAYED_ACTIVATION_TIMEOUT_VALUE,
			disposeTimeout: PREF_DEF_DISPOSE_TIMEOUT_VALUE,
		};
	}

	return {
		PREF_DEF_DELAYED_ACTIVATION_TIMEOUT_VALUE: PREF_DEF_DELAYED_ACTIVATION_TIMEOUT_VALUE,
		PREF_DEF_DISPOSE_TIMEOUT_VALUE: PREF_DEF_DISPOSE_TIMEOUT_VALUE,

		getDelayedActivationTimeout: getDelayedActivationTimeout,
		setDelayedActivationTimeout: setDelayedActivationTimeout,
		getDisposeTimeout: getDisposeTimeout,
		setDisposeTimeout: setDisposeTimeout,

		restoreDefaults: restoreDefaults,
	}

})();
