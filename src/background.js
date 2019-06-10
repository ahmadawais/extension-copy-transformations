// Copy again on clicking the Chrome extension icon.
chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript(null, { file: './copy.js' });
});
