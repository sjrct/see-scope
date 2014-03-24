
chrome.browserAction.onClicked.addListener(function(tab) {
	console.log('clicked');
	// FIXME injecting js/css twice
	chrome.tabs.executeScript({ file: "seescope.js" });
	chrome.tabs.insertCSS({ file: "seescope.css" });
});
