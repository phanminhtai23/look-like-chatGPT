function buttonHasBeenOpended(element) {
    console.log(element.classList.contains('activate'));
    return element.classList.contains('activate');
}

function elementWasClicked(element) {
    console.log(element.classList.contains('activate'));
	return element.classList.contains('activate');
}


function checkFileType(url) {
	// Lấy phần mở rộng của file từ URL
	var extension = url.split('.').pop().toLowerCase();

	// Danh sách các phần mở rộng của ảnh
	var imageExtensions = ['jpg', 'jpeg', 'png', 'heif', 'heic', 'webp'];
	var documentExtensions = [
		'pdf',
		'html',
		'txt',
		'js',
		'py',
		'css',
		'md',
		'csv',
		'xml',
		'rtf',
	];

	// Kiểm tra nếu phần mở rộng nằm trong danh sách các phần mở rộng của ảnh
	if (imageExtensions.includes(extension)) {
		return 'image';
	} else if (documentExtensions.includes(extension)) {
		return 'document';
	}
	return 'other';
}


export { buttonHasBeenOpended, elementWasClicked, checkFileType };