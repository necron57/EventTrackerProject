package com.skilldistillery.books.services;

import java.util.List;

import com.skilldistillery.books.entities.Book;

public interface BookService {
	List<Book> listAllBooks();
	
	Book getBook(int bookId);
	
	Book create(Book book);
	
	Book update(int bookId, Book book);
	
	boolean deleteBook(int bookId);
}
