# EventTrackerProject


# Description
This app is designed to track books that you own and have either read or not that book. 

# Rest Endpoints
| HTTP Verb | URI                      | Request Body | Response Body |
|-----------|--------------------------|--------------|---------------|
| GET       | `/api/books`          |              | List of books |
| GET       | `/api/books/{id}` |              | Single book   | 
| POST      | `/api/books`          | Representation of a book| Created book |
| PUT       | `/api/books/{bookId}` | Representation of a new version of a book | Updated book|
| DELETE    | `/api/books/{bookId}` |              |                | 

# Technologies used
Postman, Eclipse, Java, Spring boot, Spring Rest API

# Lessons learned
Started to learn how to use Spring Data REST and realized how much more simpler it is to get most of the connections to the Data Base up and running with so little code compared to non Spring Data REST usage. I look forward to seeing how not only this project turns out but future ones as well.