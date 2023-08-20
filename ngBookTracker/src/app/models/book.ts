import { Author } from "./author";
import { Genre } from "./genre";

export class Book {
  id: number;
  title: string;
  description: string;
  pageCount: string;
  price: number;
  pictureURL: string;
  hasRead: boolean;
  genre: string;
  author: string;

  constructor(
    id: number = 0,
    title: string = '',
    description: string = '',
    pageCount: string = '',
    price: number = 0,
    pictureURL: string = '',
    hasRead: boolean = false,
    author: string = '',
    genre: string = ''
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.pageCount = pageCount;
    this.price = price;
    this.pictureURL = pictureURL;
    this.hasRead = hasRead;
    this.genre = genre;
    this.author = author;
  }
}
