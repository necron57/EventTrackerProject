import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Book } from '../models/book';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
private url = environment.baseURL + "api/books"
  constructor(
    private http: HttpClient
  ) { }
  index(): Observable<Book[]> {
    return this.http.get<Book[]>(this.url).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('BookService.index(): error retrieving todos: ' + err)
        );
      })
    );
  }

  create(book: Book): Observable<Book>{

    return this.http.post<Book>(this.url, book).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('TodoService.create(): error creating todo: ' + err)
        );
      })
    );
  }

  update(updatedBook: Book): Observable<Book> {
    return this.http
      .put<Book>(this.url + '/' + updatedBook.id, updatedBook)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(
            () => new Error('TodoService.update(): error updating todo: ' + err)
          );
        })
      );
  }

  delete(bookId: number){
    return this.http.delete<void>(this.url + '/' + bookId).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('TodoService.destroy(): error deleting todo: ' + err)
        );
      })
    );
  }

}
