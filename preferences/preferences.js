"use strict";

let preferences = (function() {

	let m_elmDelayedActivationTimeout;
	let m_elmDisposeTimeout;
	let m_elmShowNotificationOnSuccess;

	let m_elmBtnReloadExtension;
	let m_elmBtnRestoreDefaults;

	document.addEventListener("DOMContentLoaded", onDOMContentLoaded);
	window.addEventListener("unload", onUnload);

	////////////////////////////////////////////////////////////////////////////////////
	function onDOMContentLoaded() {

		m_elmDelayedActivationTimeout = document.getElementById("delayedActivationTimeout");
		m_elmDisposeTimeout = document.getElementById("disposeTimeout");
		m_elmShowNotificationOnSuccess = document.getElementById("showNotificationOnSuccess");

		m_elmBtnReloadExtension = document.getElementById("btnReloadExtension");
		m_elmBtnRestoreDefaults = document.getElementById("btnRestoreDefaults");

		addEventListeners();
		getSavedPreferences();
	}

	////////////////////////////////////////////////////////////////////////////////////
	function onUnload(event) {
		document.removeEventListener("DOMContentLoaded", onDOMContentLoaded);
		window.removeEventListener("unload", onUnload);

		m_elmDelayedActivationTimeout.removeEventListener("change", onChangeDelayedActivationTimeout);
		m_elmDisposeTimeout.removeEventListener("change", onChangeDisposeTimeout);
		m_elmShowNotificationOnSuccess.removeEventListener("change", onChangeShowNotificationOnSuccess);

		m_elmBtnReloadExtension.removeEventListener("click", onClickBtnReloadExtension);
		m_elmBtnRestoreDefaults.removeEventListener("click", onClickBtnRestoreDefaults);
	}

	////////////////////////////////////////////////////////////////////////////////////
	function addEventListeners() {

		// save preferences when changed
		m_elmDelayedActivationTimeout.addEventListener("change", onChangeDelayedActivationTimeout);
		m_elmDisposeTimeout.addEventListener("change", onChangeDisposeTimeout);
		m_elmShowNotificationOnSuccess.addEventListener("change", onChangeShowNotificationOnSuccess);

		m_elmBtnReloadExtension.addEventListener("click", onClickBtnReloadExtension);
		m_elmBtnRestoreDefaults.addEventListener("click", onClickBtnRestoreDefaults);
	}

	////////////////////////////////////////////////////////////////////////////////////
	function getSavedPreferences() {

		prefs.getDelayedActivationTimeout().then((timeout) => {
			m_elmDelayedActivationTimeout.value = timeout;
		});

		prefs.getDisposeTimeout().then((timeout) => {
			m_elmDisposeTimeout.value = timeout;
		});

		prefs.getShowNotificationOnSuccess().then((checked) => {
			m_elmShowNotificationOnSuccess.checked = checked;
		});
	}

	//==================================================================================
	//=== Event Listeners
	//==================================================================================

	////////////////////////////////////////////////////////////////////////////////////
	function onChangeDelayedActivationTimeout(event) {
		if(m_elmDelayedActivationTimeout.value.match(m_elmDelayedActivationTimeout.pattern) === null) {
			prefs.getDelayedActivationTimeout().then((timeout) => {
				m_elmDelayedActivationTimeout.value = timeout;
			});
		} else {
			prefs.setDelayedActivationTimeout(m_elmDelayedActivationTimeout.value);
		}
	}

	////////////////////////////////////////////////////////////////////////////////////
	function onChangeDisposeTimeout(event) {
		if(m_elmDisposeTimeout.value.match(m_elmDisposeTimeout.pattern) === null) {
			prefs.getDisposeTimeout().then((timeout) => {
				m_elmDisposeTimeout.value = timeout;
			});
		} else {
			prefs.setDisposeTimeout(m_elmDisposeTimeout.value);
		}
	}

	////////////////////////////////////////////////////////////////////////////////////
	function onChangeShowNotificationOnSuccess(event) {
		prefs.setShowNotificationOnSuccess(m_elmShowNotificationOnSuccess.checked);
	}

	////////////////////////////////////////////////////////////////////////////////////
	function onClickBtnReloadExtension(event) {
		setTimeout(() => {
			browser.tabs.reload({ bypassCache: true });
			browser.runtime.reload();
		}, 10);
	}

	////////////////////////////////////////////////////////////////////////////////////
	function onClickBtnRestoreDefaults(event) {
		let defPrefs = prefs.restoreDefaults();

		m_elmDelayedActivationTimeout.value = defPrefs.delayedActivationTimeout;
		m_elmDisposeTimeout.value = defPrefs.disposeTimeout;
		m_elmShowNotificationOnSuccess.checked = defPrefs.showNotificationOnSuccess;
	}

})();
