import copyTextToClipboard from './copyTextToClipboard';
const url = window.location.href;
const base = url.split('/')[2];
let start = 6;

if (base === 'cloudinary-res.cloudinary.com') {
	start = 5;
}

console.clear();
const transformations = url
	.split('/')
	.slice(start, -1)
	.join('/');

console.log('transformations', transformations);

// Copy the CLI command.
copyTextToClipboard(transformations);
