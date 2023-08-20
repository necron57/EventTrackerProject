package com.skilldistillery.books.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.books.entities.Author;
import com.skilldistillery.books.entities.Book;
import com.skilldistillery.books.entities.Genre;
import com.skilldistillery.books.repositories.AuthorRepository;
import com.skilldistillery.books.repositories.BookRepository;
import com.skilldistillery.books.repositories.GenreRepository;

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
		if (bookOpt.isPresent()) {
			book = bookOpt.get();
		}
		return book;
	}

	@Override
	public Book create(Book book) {
		
		return bookRepo.saveAndFlush(book);
//		if(book.getAuthor() != null && book.getGenre() != null) {
//		}
//		return null;
	}

	@Override
	public Book update(int bookId, Book book) {
		Book managedBook = null;
		Optional<Book> bookOpt = bookRepo.findById(bookId);
		if (bookOpt.isPresent()) {
			managedBook = bookOpt.get();
			managedBook.setTitle(book.getTitle());
			managedBook.setDescription(book.getDescription());
			managedBook.setPageCount(book.getPageCount());
			managedBook.setPrice(book.getPrice());
			managedBook.setPictureURL(book.getPictureURL());
			if (book.getAuthor() != null) {
				managedBook.setAuthor(book.getAuthor());
			}
			if (book.getGenre() != null) {
				managedBook.setGenre(book.getGenre());
			}
			managedBook.setHasRead(book.isHasRead());
			bookRepo.saveAndFlush(managedBook);
		}

		return managedBook;
	}

	@Override
	public boolean deleteBook(int bookId) {
		boolean deleted = false;

		Optional<Book> toDeleteBookOpt = bookRepo.findById(bookId);

		if (toDeleteBookOpt.isPresent()) {
			bookRepo.delete(toDeleteBookOpt.get());
			deleted = true;
		}

		return deleted;
	}

}
