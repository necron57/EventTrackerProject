import { Book } from 'src/app/models/book';
import { BookService } from './../../services/book.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  bookList: Book[] = [];

  constructor(
    private bookService: BookService
  ){}

  ngOnInit(): void {
this.reload();
  }

  reload(){
this.bookService.index().subscribe({
next: (list)=>{
  this.bookList =list;
},
error: (somethingBad) => {
  console.error('TodoListComponet.reload: error loading todos');
  console.error(somethingBad);
}
});
  }

}
