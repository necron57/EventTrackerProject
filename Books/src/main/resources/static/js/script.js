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

	let title = document.createElement("h1");
	title.textContent = book.title;
	bookDetailDiv.appendChild(title);

	let description = document.createElement("blockquote");
	description.textContent = book.description;
	bookDetailDiv.appendChild(description);

	let ul = document.createElement("ul");
	bookDetailDiv.appendChild(ul);
	let list = document.createElement("li");
	list.textContent = book.pageCount;
	ul.appendChild(list);

	list = document.createElement("li");
	list.textContent = book.price;
	ul.appendChild(list);

	list = document.createElement("li");
	list.textContent = book.pictureURL;
	ul.appendChild(list);

	list = document.createElement("li");
	list.textContent = book.hasRead;
	ul.appendChild(list);

	
}

function createBook(){
	document.BookCreate.submitButton.addEventListener('click', function(e){
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
			
			xhr.onreadystatechange = function(){
				if(xhr.readyState === 4){
					if(xhr.status === 200 || xhr.status === 201){
						let createdBook = JSON.parse(xhr.responseText);
						console.log(createdBook);
						displayBookList(createdBook);
					}else{
						console.error("POST request failed.");
						console.error(xhr.status + ': ' + xhr.responseText);
					}
				}
			}
		
		
		let newBookJson = JSON.stringify(newBook);
		
		xhr.send(newBookJson);
	});
}




