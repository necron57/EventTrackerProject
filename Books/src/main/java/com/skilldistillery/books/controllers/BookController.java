package com.skilldistillery.books.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.books.entities.Book;
import com.skilldistillery.books.services.BookService;

@RestController
@RequestMapping("api")
public class BookController {

	@Autowired
	private BookService bookService;

	@GetMapping("books")
	public List<Book> listBooks() {
		return bookService.listAllBooks();
	}

	@GetMapping("books/{id}")
	public Book show(@PathVariable Integer id, HttpServletResponse res) {
		Book book = bookService.getBook(id);
		if (book == null) {
			res.setStatus(404);
		}
		return book;
	}

	@PostMapping("books")
	public Book addBook(@RequestBody Book book, HttpServletResponse res, HttpServletRequest req) {

		try {
			book = bookService.create(book);
			res.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(book.getId());
			res.setHeader("Location", url.toString());
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			book = null;
		}

		return book;
	}
}
