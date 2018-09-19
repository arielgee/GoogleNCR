"use strict";

let prefs = (function() {

	// user preferences

	const PREF_DEF_DELAYED_ACTIVATION_TIMEOUT_VALUE = 3;
	const PREF_DEF_DISPOSE_TIMEOUT_VALUE = 30;
	const PREF_DEF_SHOW_NOTIFICATION_ON_SUCCESS_VALUE = true;

	const PREF_DELAYED_ACTIVATION_TIMEOUT_KEY = "pref_delayedActivationTimeout";
	const PREF_DISPOSE_TIMEOUT_KEY = "pref_disposeTimeout";
	const PREF_SHOW_NOTIFICATION_ON_SUCCESS_KEY = "pref_showNotificationOnSuccess";

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
	function getShowNotificationOnSuccess() {

		return new Promise((resolve) => {

			browser.storage.local.get(PREF_SHOW_NOTIFICATION_ON_SUCCESS_KEY).then((result) => {
				resolve(result[PREF_SHOW_NOTIFICATION_ON_SUCCESS_KEY] === undefined ? PREF_DEF_SHOW_NOTIFICATION_ON_SUCCESS_VALUE : result[PREF_SHOW_NOTIFICATION_ON_SUCCESS_KEY]);
			});
		});
	}

	//////////////////////////////////////////////////////////////////////
	function setShowNotificationOnSuccess(value) {

		let obj = {};
		obj[PREF_SHOW_NOTIFICATION_ON_SUCCESS_KEY] = value;
		browser.storage.local.set(obj);
	}

	//////////////////////////////////////////////////////////////////////
	function restoreDefaults() {
		this.setDelayedActivationTimeout(PREF_DEF_DELAYED_ACTIVATION_TIMEOUT_VALUE);
		this.setDisposeTimeout(PREF_DEF_DISPOSE_TIMEOUT_VALUE);
		this.setShowNotificationOnSuccess(PREF_DEF_SHOW_NOTIFICATION_ON_SUCCESS_VALUE)

		return {
			delayedActivationTimeout: PREF_DEF_DELAYED_ACTIVATION_TIMEOUT_VALUE,
			disposeTimeout: PREF_DEF_DISPOSE_TIMEOUT_VALUE,
			showNotificationOnSuccess: PREF_DEF_SHOW_NOTIFICATION_ON_SUCCESS_VALUE,
		};
	}

	return {
		PREF_DEF_DELAYED_ACTIVATION_TIMEOUT_VALUE: PREF_DEF_DELAYED_ACTIVATION_TIMEOUT_VALUE,
		PREF_DEF_DISPOSE_TIMEOUT_VALUE: PREF_DEF_DISPOSE_TIMEOUT_VALUE,
		PREF_DEF_SHOW_NOTIFICATION_ON_SUCCESS_VALUE: PREF_DEF_SHOW_NOTIFICATION_ON_SUCCESS_VALUE,

		getDelayedActivationTimeout: getDelayedActivationTimeout,
		setDelayedActivationTimeout: setDelayedActivationTimeout,
		getDisposeTimeout: getDisposeTimeout,
		setDisposeTimeout: setDisposeTimeout,
		getShowNotificationOnSuccess: getShowNotificationOnSuccess,
		setShowNotificationOnSuccess: setShowNotificationOnSuccess,

		restoreDefaults: restoreDefaults,
	}

})();
