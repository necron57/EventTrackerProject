package com.skilldistillery.books.services;

import java.util.List;

import com.skilldistillery.books.entities.Author;

public interface AuthorService {
	List<Author> listAllAuthors();
	
	Author getAuthor(int authorId);
	
	Author create(Author author);
	
	Author update(int authorId, Author author);
	
	boolean deleteAuthor(int authorId);
}
