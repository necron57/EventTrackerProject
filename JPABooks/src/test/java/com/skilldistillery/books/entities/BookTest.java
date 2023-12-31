package com.skilldistillery.books.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.fail;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class BookTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Book book;
	
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("JPABooks");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		book = em.find(Book.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		book = null;
	}

	@Test
	void test_Basic_mapping() {
		assertNotNull(book);
		assertEquals("The Wolf Never Sleeps Vol 1.", book.getTitle());
		assertEquals("ShienBishop", book.getAuthor());
		assertEquals("https://d1466nnw0ex81e.cloudfront.net/n_iv/600/6320274.jpg", book.getPictureURL());
		
	}
	
//	@Test
//	void test_Book_to_Author() {
//		assertNotNull(book);
//		assertNotNull(book.getAuthor());
//		assertEquals("ShienBishop", book.getAuthor().getName());
//		
//	}
//	@Test
//	void test_Book_to_Genre() {
//		assertNotNull(book);
//		assertNotNull(book.getGenre());
//		assertEquals("Fantasy", book.getGenre().getName());
//		
//	}

}
