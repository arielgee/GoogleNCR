"use strict";

let preferences = (function() {

	let m_elmDisposeTimeout;

	let m_elmBtnReloadExtension;
	let m_elmBtnRestoreDefaults;

	document.addEventListener("DOMContentLoaded", onDOMContentLoaded);
	window.addEventListener("unload", onUnload);

	////////////////////////////////////////////////////////////////////////////////////
	function onDOMContentLoaded() {

		m_elmDisposeTimeout = document.getElementById("disposeTimeout");

		m_elmBtnReloadExtension = document.getElementById("btnReloadExtension");
		m_elmBtnRestoreDefaults = document.getElementById("btnRestoreDefaults");

		addEventListeners();
		getSavedPreferences();
	}

	////////////////////////////////////////////////////////////////////////////////////
	function onUnload(event) {
		document.removeEventListener("DOMContentLoaded", onDOMContentLoaded);
		window.removeEventListener("unload", onUnload);

		m_elmDisposeTimeout.removeEventListener("change", onChangeDisposeTimeout);

		m_elmBtnReloadExtension.removeEventListener("click", onClickBtnReloadExtension);
		m_elmBtnRestoreDefaults.removeEventListener("click", onClickBtnRestoreDefaults);
	}

	////////////////////////////////////////////////////////////////////////////////////
	function addEventListeners() {

		// save preferences when changed
		m_elmDisposeTimeout.addEventListener("change", onChangeDisposeTimeout);

		m_elmBtnReloadExtension.addEventListener("click", onClickBtnReloadExtension);
		m_elmBtnRestoreDefaults.addEventListener("click", onClickBtnRestoreDefaults);
	}

	////////////////////////////////////////////////////////////////////////////////////
	function getSavedPreferences() {

		prefs.getDisposeTimeout().then((timeout) => {
			m_elmDisposeTimeout.value = timeout;
		});
	}

	//==================================================================================
	//=== Event Listeners
	//==================================================================================

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
	function onClickBtnReloadExtension(event) {
		setTimeout(() => {
			browser.tabs.reload({ bypassCache: true });
			browser.runtime.reload();
		}, 10);
	}

	////////////////////////////////////////////////////////////////////////////////////
	function onClickBtnRestoreDefaults(event) {
		let defPrefs = prefs.restoreDefaults();

		m_elmDisposeTimeout.value = defPrefs.disposeTimeout;
	}

})();
