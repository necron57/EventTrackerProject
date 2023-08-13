package com.skilldistillery.books.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.books.entities.Author;
import com.skilldistillery.books.repositories.AuthorRepository;

@Service
public class AuthorServiceImpl implements AuthorService {
	
	@Autowired
	private AuthorRepository authorRepo;

	@Override
	public List<Author> listAllAuthors() {
		return authorRepo.findAll();
	}

	@Override
	public Author getAuthor(int authorId) {
		Optional<Author> authorOpt = authorRepo.findById(authorId);
		Author author = null;
		if(authorOpt.isPresent()) {
			author = authorOpt.get();
		}
		
		
		return author;
	}

	@Override
	public Author create(Author author) {

		
		return authorRepo.saveAndFlush(author);
	}

	@Override
	public Author update(int authorId, Author author) {

		
		return null;
	}

	@Override
	public boolean deleteAuthor(int authorId) {

		
		return false;
	}

}
