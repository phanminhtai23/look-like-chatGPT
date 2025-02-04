// import { buttonHasBeenOpended, elementWasClicked, checkFileType } from './check.js';
// import { isNavOpen, toggleNav } from './sideNav.js';
let isNavOpen = false; // Biến trạng thái xác định thanh bên đang mở hay đó

function toggleNav() {
	if (isNavOpen) {
		// ẩn togger chính và hiển thị toggle phụ
		document.getElementById('mySidenav').style.width = '0px';
		document.getElementById('main').style.marginLeft = '0px';
		document.querySelector('.top-side-main').style.display = 'flex';
	} else {
		document.querySelector('.top-side-main').style.display = 'none';
		document.getElementById('mySidenav').style.width = '250px';
		document.getElementById('main').style.marginLeft = '250px';
	}
	isNavOpen = !isNavOpen; // Đổi trạng thái
}

// xử lý trạng thái nhấn của các button
var dropdown = document.getElementsByClassName('chat-dropdown-btn');
var i;

for (i = 0; i < dropdown.length; i++) {
	dropdown[i].addEventListener('click', function () {
		// Nếu nút được nhấn đã active
		if (this.classList.contains('active')) {
			console.log(this.classList.contains('active'));
			// bỏ kích hoạt nó
			this.classList.remove('active');
			// thằng anh em sau nó
			let siblingElements =
				this.nextElementSibling.querySelectorAll('.element-chat');
			// console.log(siblingElements);
			siblingElements.forEach(function (el) {
				el.classList.remove('active');
			});
			// Thu lại dropdown
			var dropdownContent =
				this.nextElementSibling.classList.contains('open');
			if (dropdownContent) {
				this.nextElementSibling.classList.remove('open');
			}
			// Chuyển icon
			var icon = this.querySelector('i');
			if (icon) {
				icon.classList.add('fa-caret-right');
				icon.classList.remove('fa-caret-down');
			}
			return;
			//Chưa active nhưng đã có ptu dropdown
		} else if (this.nextElementSibling.classList.contains('open')) {
			this.nextElementSibling.classList.remove('open');

            var icon = this.querySelector('i');
			if (icon) {
				icon.classList.add('fa-caret-right');
				icon.classList.remove('fa-caret-down');
			}
		} else {
			// Nút clicked chưa active

			// Deactivate all buttons và các elements của nó
			for (var j = 0; j < dropdown.length; j++) {
				if (dropdown[j].classList.contains('active')) {
					// Deactivate button
					dropdown[j].classList.remove('active');
					// mấy thằng elements con của thằng em nó
					let siblingElements =
						dropdown[j].nextElementSibling.querySelectorAll(
							'.element-chat',
						);

					// nếu có em thì deactivate nó
					if (siblingElements) {
						siblingElements.forEach(function (el) {
							el.classList.remove('active');
						});
					}
				}
			}

			// Activate button
			this.classList.add('active');
			// DropDown
			var dropdownContent = this.nextElementSibling;
			if (dropdownContent) {
				dropdownContent.classList.add('open');
			}

			// Chuyển đổi class của icon
			var icon = this.querySelector('i');
			if (icon) {
				icon.classList.add('fa-caret-down');
				icon.classList.remove('fa-caret-right');
			}

			// Kích hoạt phần tử con đầu tiên dựa trên id của nút
			if (this.id === 'chat-btn') {
				let firstChild = document.querySelector(
					'#text-chat-list .element-chat',
				);
				if (firstChild) {
					firstChild.classList.add('active');
				}
			} else if (this.id === 'image-btn') {
				let firstChild = document.querySelector(
					'#image-chat-list .element-chat',
				);
				if (firstChild) {
					firstChild.classList.add('active');
				}
			}
		}
	});
}

// Hàm để thêm sự kiện click cho các phần tử .element-chat
function addElementChatClickEvent(element) {
	element.addEventListener('click', function () {
		document.querySelectorAll('.element-chat').forEach(function (el) {
			el.classList.remove('active');
		});

		//Xóa mấy button nhấn xổ
		document.querySelectorAll('.chat-dropdown-btn').forEach(function (el) {
			el.classList.remove('active');
		});

		// gán active cho element vừa click
		this.classList.add('active');

		let parentButton = this.closest('.chat-dropdown-btn');

		if (!parentButton) {
			parentButton = this.parentElement.previousElementSibling;
			while (
				parentButton &&
				!parentButton.classList.contains('chat-dropdown-btn')
			) {
				parentButton = parentButton.previousElementSibling;
			}
		}
		if (parentButton) {
			parentButton.classList.add('active');
		}
	});
}

// Thêm sự kiện click cho các phần tử .element-chat hiện có
document.querySelectorAll('.element-chat').forEach(function (element) {
	addElementChatClickEvent(element);
});

// Xử lý sự kiện click cho nút .togglebtn-plus
document
	.querySelector('.togglebtn-plus')
	.addEventListener('click', function () {
		// Kiểm tra nếu cả hai nút chat-btn và image-btn đều không active thì hiển thị alert
		if (
			!document.getElementById('chat-btn').classList.contains('active') &&
			!document.getElementById('image-btn').classList.contains('active')
		) {
			alert('Không có nút chat hoặc hình ảnh nào đang hoạt động');
			newElement.textContent = 'Chat ' + parentDiv.children.length;
			return;
		}

		// Nếu nút chat-btn đang active, tạo phần tử mới và chèn vào đầu text-chat-list
		if (document.getElementById('chat-btn').classList.contains('active')) {
			let parentDiv = document.getElementById('text-chat-list');
			let newElement = document.createElement('div');
			newElement.id = 'element-chat' + (parentDiv.children.length + 1);
			newElement.className = 'element-chat';

			let span = document.createElement('span');
			span.textContent = 'Chat ' + (parentDiv.children.length + 1);
			newElement.appendChild(span);

			let icon = document.createElement('i');
			icon.className = 'fa-solid fa-ellipsis';
			newElement.appendChild(icon);

			document.querySelectorAll('.element-chat').forEach(function (el) {
				el.classList.remove('active');
			});
			newElement.classList.add('active');
			addElementChatClickEvent(newElement);

			parentDiv.insertBefore(newElement, parentDiv.firstChild);
		}

		// Nếu nút image-btn đang active, tạo phần tử mới và chèn vào đầu image-chat-list
		if (document.getElementById('image-btn').classList.contains('active')) {
			let parentDiv = document.getElementById('image-chat-list');
			let newElement = document.createElement('div');
			newElement.id = 'element-chat' + (parentDiv.children.length + 1);
			newElement.className = 'element-chat';

			let span = document.createElement('span');
			span.textContent = 'Image ' + (parentDiv.children.length + 1);
			newElement.appendChild(span);

			let icon = document.createElement('i');
			icon.className = 'fa-solid fa-ellipsis';
			newElement.appendChild(icon);

			document.querySelectorAll('.element-chat').forEach(function (el) {
				el.classList.remove('active');
			});
			newElement.classList.add('active');
			addElementChatClickEvent(newElement);

			parentDiv.insertBefore(newElement, parentDiv.firstChild);
		}
	});

// Hiệu ứng mail
const textElement = document.getElementById('animatedText');
const text = textElement.textContent;
let index = 0;

function typeEffect() {
	if (index < text.length) {
		textElement.textContent = text.substring(0, index + 1);
		index++;
		setTimeout(typeEffect, 100);
	} else {
		setTimeout(deleteEffect, 2000);
	}
}

function deleteEffect() {
	if (index > 0) {
		textElement.textContent = text.substring(0, index - 1);
		index--;
		setTimeout(deleteEffect, 100);
	} else {
		setTimeout(typeEffect, 2000);
	}
}

document.addEventListener('DOMContentLoaded', (event) => {
	textElement.textContent = '';
	typeEffect();
});


// click hiển thị user name
document.querySelectorAll('.user i').forEach(function (icon) {
	icon.addEventListener('click', function () {
		var userInfo = this.parentElement.querySelector('.user-info');
		if (userInfo) {
			userInfo.style.display =
				userInfo.style.display === 'none' ||
				userInfo.style.display === ''
					? 'block'
					: 'none';
		}
	});
});

// upload_widget image or documents
const myWidget = cloudinary.createUploadWidget(
	{
		cloudName: 'dwdplk5xq',
		uploadPreset: 'look-like-ChatGPT',
		// cropping: true, //add a cropping step
		// showAdvancedOptions: true,  //add advanced options (public_id and tag)
		// sources: [ "local", "url"], // restrict the upload sources to URL and local files
		multiple: false, //restrict upload to a single file
		// folder: "user_images", //upload files to the specified folder
		// tags: ["users", "profile"], //add the given tags to the uploaded files
		// context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
		// clientAllowedFormats: ["images"], //restrict uploading to image files only
		// maxImageFileSize: 2000000,  //restrict file size to less than 2MB
		// maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
		// theme: "purple", //change to a purple theme
	},
	(error, result) => {
		if (!error && result && result.event === 'success') {
			// console.log('Done! Here is the image info: ', result.info);
			previewImage(result);
		}
	},
);

document.getElementById('upload_widget').addEventListener(
	'click',
	function () {
		// console.log('okkk');
		myWidget.open();
	},
	false,
);

// enter thì gửi tin nhắn
// document
// 	.getElementById('messageInput')
// 	.addEventListener('keypress', function (event) {
// 		if (event.key === 'Enter') {
// 			sendMessage();
// 		}
// 	});

function previewImage(result) {
	deletePreview();
	var format = result.info.secure_url.split('.').pop().toLowerCase();
	const previewSpace = document.getElementById('preview-imgs');

	if (checkFileType(format) === 'image') {

		// tạo container img
		const imgContainer = document.createElement('div');
		imgContainer.className = 'img-container';

		// tạo img
		const image = document.createElement('img');
		image.src = result.info.secure_url;
		image.alt = result.info.original_filename;
		image.className = 'image';

		// tạo nút xóa
		const deleteBtn = document.createElement('i');
		deleteBtn.className = 'image-close-btn fa-solid fa-xmark fa-2xs';
		deleteBtn.addEventListener('click', deletePreview);

		imgContainer.appendChild(image);
		imgContainer.appendChild(deleteBtn);

		previewSpace.appendChild(imgContainer);
		// // set global link image
		// global_InforImage = result.info;
		// preview.classList.add('previewImage');
	} else if (checkFileType(format) === 'document') {
		// File is a document
		const docElement = document.createElement('p');
		docElement.className = 'preview-document';
		docElement.textContent = result.info.original_filename + '.' + format;

		previewSpace.appendChild(docElement);
		// global_InforDocument = result.info;
		// preview.classList.add('previewLink');
	} else {
		alert('Không hỗ trợ file này!');
		return;
	}

}

// Kiểm tra document gửi vào
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



function deletePreview() {
	const imgContainer = document.querySelector('.img-container');
	const previewDocument = document.querySelector('.preview-document');
	if (imgContainer) {
		imgContainer.remove();
	} else if (previewDocument) {
		previewDocument.remove();
	}
}

