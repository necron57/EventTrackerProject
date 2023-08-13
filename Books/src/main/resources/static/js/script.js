console.log("script.js loaded.");

window.addEventListener("load", function(e) {
	console.log("page loaded");
	init();
});

function init() {
	loadBookList();

	createBook();
}

function loadBookList() {
	let xhr = new XMLHttpRequest();
	xhr.open("GET", "api/books");
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let books = JSON.parse(xhr.responseText);
				console.log(books);
				displayBookList(books);

			}
			else {

			}

		}
	};
	xhr.send();
}


function displayBookList(bookList) {
	if (bookList && Array.isArray(bookList)) {
		let tbody = document.getElementById("bookTableBody");
		for (let book of bookList) {
			let tr = document.createElement("tr");
			let td = document.createElement("td");
			td.textContent = book.id;
			tr.appendChild(td);


			td = document.createElement("td");
			td.textContent = book.title;
			tr.appendChild(td);



			tbody.appendChild(tr);

			tr.addEventListener("click", function(e) {
				let element = e.target;
				let bookId = element.parentElement.firstElementChild.textContent;
				console.log(bookId);
				getBookDetails(bookId);
			});
		}
	}

}
function getBookDetails(bookId) {
	let xhr = new XMLHttpRequest();

	xhr.open("GET", "api/books/" + bookId);

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let data = xhr.responseText;
				let book = JSON.parse(data);
				displayBookDetails(book);
			}
		}
	}

	xhr.send();

}

function displayBookDetails(book) {

	let bookDetailDiv = document.getElementById("bookDetailDiv");
	bookDetailDiv.textContent = '';

	let br = document.createElement("br");

	let title = document.createElement("h1");
	title.textContent = "Title: " + book.title;
	bookDetailDiv.appendChild(title);

	let description = document.createElement("blockquote");
	description.textContent = "Description: " + book.description;
	bookDetailDiv.appendChild(description);

	let ul = document.createElement("ul");
	bookDetailDiv.appendChild(ul);
	let list = document.createElement("li");
	list.textContent = "Page Count: " + book.pageCount;
	ul.appendChild(list);

	list = document.createElement("li");
	list.textContent = "Price: " + book.price;
	ul.appendChild(list);

	list = document.createElement("li");
	list.textContent = book.pictureURL;
	ul.appendChild(list);

	list = document.createElement("li");
	list.textContent = "Has it been read yet?: " + book.hasRead;
	ul.appendChild(list);

	let form = document.createElement("form");
	form.name = "Update Book";
	bookDetailDiv.appendChild(form);

	let titleLabel = document.createElement("label");
	titleLabel.htmlFor = "title";
	titleLabel.innerHTML = "Enter in the new Title: "
	form.appendChild(titleLabel);

	let ftitle = document.createElement('input');
	ftitle.name = "title";
	ftitle.type = "text";
	ftitle.value = book.title;
	form.appendChild(ftitle);
	form.appendChild(br);

	let descriptionLabel = document.createElement("label");
	descriptionLabel.htmlFor = "description";
	descriptionLabel.innerHTML = "Enter in the new Description: "
	form.appendChild(descriptionLabel);

	let fdescription = document.createElement('input');
	fdescription.name = "description";
	fdescription.type = "text";
	fdescription.value = book.description;
	form.appendChild(fdescription);

	br = document.createElement("br");
	form.appendChild(br);

	let pageCountLabel = document.createElement("label");
	pageCountLabel.htmlFor = "pageCount";
	pageCountLabel.innerHTML = "Enter in the new Page Count: "
	form.appendChild(pageCountLabel);

	let fpageCount = document.createElement('input');
	fpageCount.name = "pageCount";
	fpageCount.type = "text";
	fpageCount.value = book.pageCount;
	form.appendChild(fpageCount);

	br = document.createElement("br");
	form.appendChild(br);

	let priceLabel = document.createElement("label");
	priceLabel.htmlFor = "price";
	priceLabel.innerHTML = "Enter in the new Price: "
	form.appendChild(priceLabel);

	let fprice = document.createElement('input');
	fprice.name = "price";
	fprice.type = "number";
	fprice.value = book.price;
	form.appendChild(fprice);

	br = document.createElement("br");
	form.appendChild(br);

	let pictureURLLabel = document.createElement("label");
	pictureURLLabel.htmlFor = "pictureURL";
	pictureURLLabel.innerHTML = "Enter in the new Picture URL: "
	form.appendChild(pictureURLLabel);

	let fpictureURL = document.createElement('input');
	fpictureURL.name = "pictureURL";
	fpictureURL.type = "text";
	fpictureURL.value = book.pictureURL;
	form.appendChild(fpictureURL);

	br = document.createElement("br");
	form.appendChild(br);

	let hasReadLabel = document.createElement("label");
	hasReadLabel.htmlFor = "hasRead";
	hasReadLabel.innerHTML = "Has it been read yet?: "
	form.appendChild(hasReadLabel);

	let fhasRead = document.createElement('input');
	fhasRead.name = "hasRead";
	fhasRead.type = "radio";
	fhasRead.value = "True";
	form.appendChild(fhasRead);

	fhasRead = document.createElement('input');
	fhasRead.name = "hasRead";
	fhasRead.type = "radio";
	fhasRead.value = "false";
	fhasRead.textContent = "No";
	form.appendChild(fhasRead);

	br = document.createElement("br");
	form.appendChild(br);

	let update = document.createElement('input');
	update.name = "update";
	update.type = "submit";
	update.value = "Update Book";
	form.appendChild(update);
}

function createBook() {
	document.BookCreate.submitButton.addEventListener('click', function(e) {
		e.preventDefault();
		let form = document.BookCreate;
		let title = form.title.value;
		let description = form.description.value;
		let pageCount = form.pageCount.value;
		let price = form.price.value;
		let pictureURL = form.pictureURL.value;
		let hasRead = form.hasRead.value;

		let newBook = {
			"title": title,
			"description": description,
			"pageCount": pageCount,
			"price": price,
			"pictureURL": pictureURL,
			"hasRead": hasRead,
			"author": {
				"id": 2,
			},
			"genre": {
				"id": 2,
			}
		};
		let xhr = new XMLHttpRequest();

		xhr.open("POST", "api/books");

		xhr.setRequestHeader("Content-type", "application/json");

		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4) {
				if (xhr.status === 200 || xhr.status === 201) {
					let createdBook = JSON.parse(xhr.responseText);
					console.log(createdBook);
					loadBookList();

				} else {
					console.error("POST request failed.");
					console.error(xhr.status + ': ' + xhr.responseText);
				}
			}
		}


		let newBookJson = JSON.stringify(newBook);

		xhr.send(newBookJson);
	});
}

function deleteBook(bookId) {
	let xhr = new XMLHttpRequest();
	xhr.open("DELETE", "api/books/" + bookId);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let books = JSON.parse(xhr.responseText);
				console.log(books);
				displayBookList(books);

			}
			else {

			}

		}
	};
	xhr.send();
}



