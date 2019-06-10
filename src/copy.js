/**
 * Fallback copy if async copy is not available.
 *
 * @param {String} text
 */
function fallbackCopyTextToClipboard(text) {
	const textArea = document.createElement('textarea');
	textArea.value = text;
	textArea.setAttribute('readonly', '');
	textArea.style.position = 'absolute';
	textArea.style.left = '-9999px';
	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();

	try {
		const successful = document.execCommand('copy');
		const msg = successful ? 'successful' : 'unsuccessful';
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

	navigator.clipboard.writeText(text).then(
		function() {
			console.log('Async: Copying to clipboard was successful!');
		},
		function(err) {
			console.error('Async: Could not copy text: ', err);
			fallbackCopyTextToClipboard(text);
		}
	);
}

const url = window.location.href;
const base = url.split('/')[2];
let start = 6;

if (base === 'cloudinary-res.cloudinary.com') {
	start = 5;
}

const transformations = url
	.split('/')
	.slice(start, -1)
	.join('/');

console.log('transformations', transformations);

Copy the CLI command.
copyTextToClipboard(transformations);
