import { Book } from 'src/app/models/book';
import { BookService } from './../../services/book.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  bookList: Book[] = [];
  newBook: Book = new Book();
  editBook: Book | null = null;
  selected: Book | null = null;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.reload();
  }

  reload() {
    this.bookService.index().subscribe({
      next: (list) => {
        this.bookList = list;
      },
      error: (somethingBad) => {
        console.error('TodoListComponet.reload: error loading book');
        console.error(somethingBad);
      },
    });
  }
  displayBook(Book: any) {
    this.selected = Book;
  }
  displayTable() {
    this.selected = null;
  }
  addBook(book: Book) {
    this.bookService.create(book).subscribe({
      next: () => {
        this.newBook = new Book();
        this.reload();
      },
      error: (somethingBad) => {
        console.error('TodoListComponet.addTodo: error creating book');
        console.error(somethingBad);
      },
    });
  }

  setEditBook(){
    this.editBook = Object.assign({}, this.selected);
  }

  updateBook(book: Book, setSeleected: boolean = true){
    this.bookService.update(book).subscribe({
      next: (updatedBook) => {
        if (setSeleected) {
          this.selected = updatedBook;
        }
        this.editBook = null;
        this.reload();
      },
      error: (somethingBad) => {
        console.error('TodoListComponet.updateTodo: error updating todo');
        console.error(somethingBad);
      },
    });
  }









}
