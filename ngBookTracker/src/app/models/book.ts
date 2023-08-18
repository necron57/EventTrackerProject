export class Book {
  id: number;
  title: string;
  description: string;
  pageCount: string;
  price: number;
  imgURL: string;
  hasRead: boolean;

  constructor(
    id: number = 0,
    title: string = '',
    description: string = '',
    pageCount: string = '',
    price: number = 0,
    imgURL: string = '',
    hasRead: boolean = false
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.pageCount = pageCount;
    this.price = price;
    this.imgURL = imgURL;
    this.hasRead = hasRead;
  }
}
