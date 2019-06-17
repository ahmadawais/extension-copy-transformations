(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _copyTextToClipboard = require('./copyTextToClipboard');

var _copyTextToClipboard2 = _interopRequireDefault(_copyTextToClipboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var url = window.location.href;
var base = url.split('/')[2];
var start = 6;

if (base === 'cloudinary-res.cloudinary.com') {
	start = 5;
}

console.clear();
var transformations = url.split('/').slice(start, -1).join('/');

console.log('transformations', transformations);

// Copy the CLI command.
(0, _copyTextToClipboard2.default)(transformations);

},{"./copyTextToClipboard":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = copyTextToClipboard;
/**
 * Fallback copy if async copy is not available.
 *
 * @param {String} text
 */
function fallbackCopyTextToClipboard(text) {
	var textArea = document.createElement('textarea');
	textArea.value = text;
	textArea.setAttribute('readonly', '');
	textArea.style.position = 'absolute';
	textArea.style.left = '-9999px';
	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();

	try {
		var successful = document.execCommand('copy');
		var msg = successful ? 'successful' : 'unsuccessful';
		console.log('Fallback: Copying text command was ' + msg);
	} catch (err) {
		console.error('Fallback: Oops, unable to copy', err);
	}

	document.body.removeChild(textArea);
}

/**
 * Async copy.
 *
 * @param {String} text
 */
function copyTextToClipboard(text) {
	if (!navigator.clipboard) {
		fallbackCopyTextToClipboard(text);
		return;
	}

	navigator.clipboard.writeText(text).then(function () {
		console.log('Async: Copying to clipboard was successful!');
	}, function (err) {
		console.error('Async: Could not copy text: ', err);
		fallbackCopyTextToClipboard(text);
	});
}

},{}]},{},[1]);
