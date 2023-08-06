package com.skilldistillery.books.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.books.entities.Author;
import com.skilldistillery.books.entities.Book;
import com.skilldistillery.books.entities.Genre;
import com.skilldistillery.books.repositories.BookRepository;

@Service
public class BookServiceImpl implements BookService {
	
	@Autowired
	private BookRepository bookRepo;

	@Override
	public List<Book> listAllBooks() {
		return bookRepo.findAll();
	}

	@Override
	public Book getBook(int bookId) {
		Optional<Book> bookOpt = bookRepo.findById(bookId);
		Book book = null;
		if(bookOpt.isPresent()) {
			book = bookOpt.get();
		}
		return book;
	}

	@Override
	public Book create(Book book) {
		if(book.getAuthor() == null && book.getGenre() == null) {
			Author auth = new Author();
			Genre genre = new Genre();
			book.setAuthor(auth);
			book.setGenre(genre);
		}
		return bookRepo.saveAndFlush(book);
	}

	@Override
	public Book update(int bookId, Book book) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean deleteBook(int bookId) {
		// TODO Auto-generated method stub
		return false;
	}

}
