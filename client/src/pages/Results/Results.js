import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import BookBtn from "../../components/BookBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";

class Results extends Component {
  state = {
    books: [],
    target: "",
    noResults: false
  };

  componentDidMount() {
    const data = this.props.location.data
    if (data && data.results.length > 0) {

      this.setState({
        books: data.results.filter((value, index) => index < 5),
        target: "_blank"
      });
    } else {
      this.setState({
        noResults: true
      });
    }
  }

  saveBook = book => {
    API.saveBook(book)
      .then(res => {
        const currentBooks = this.state.books;
        const filterBooks = currentBooks.filter(book => book.id !== res.data.id);
        this.setState({
          books: filterBooks
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    if (this.state.noResults) {
      return (
        <div>
          <Jumbotron backgroundImage="https://martijnscheijbeler.com/wp-content/uploads/2018/01/books.jpg">
            <h1 className="title">Google Book Search</h1>
            <h2 className="lead">Create your own virtual library</h2>
            <br/>
            <br/>
            <br/>
            <p className="lead">
              <Link className="btn btn-info btn-lg" to="/" role="button">New Search</Link>
              <Link className="btn btn-info btn-lg" to="/saved" role="button">Saved Books</Link>
            </p>
          </Jumbotron>
          <Container>
            <br/>
            <br/>
            <br/>
            <Link to="/">No results - click here to search again.</Link>
          </Container>
        </div>
      )
    }
    return (
      <div>
        <Jumbotron backgroundImage="https://martijnscheijbeler.com/wp-content/uploads/2018/01/books.jpg">
          <h1 className="title">Google Book Search</h1>
          <h2 className="lead">Create your own virtual library</h2>
          <br/>
          <br/>
          <br/>
          <p className="lead">
            <Link className="btn btn-info btn-lg" to="/" role="button">New Search</Link>
            <Link className="btn btn-info btn-lg" to="/saved" role="button">Saved Books</Link>
          </p>
        </Jumbotron>
        <Container>
          <br/>
          <br/>
          <br/>
          <h2>Search Results</h2>
          <List>
            {this.state.books.map((book, index) => (
              <ListItem key={book.id}>
                <div className="date-div">
                  <a
                    key={"" + index + book.id}
                    href={book.volumeInfo.infoLink}
                    target={this.state.target}
                  >
                    {book.volumeInfo.title}
                  </a>
                    <p>Written By {book.volumeInfo.authors[0]}</p>
                  <p>
                  <img align="left" style={{paddingRight:10}}
                    src={book.volumeInfo.imageLinks.smallThumbnail} alt="new"
                  />
                    {book.volumeInfo.description}
                  </p>
                </div>
                <div className="book-btn-div">
                  <BookBtn
                    key={"" + book.id + index}
                    btntype="danger"
                    disabled={book.volumeInfo.infoLink === "/"}
                    onClick={() => this.saveBook({
                      title: book.volumeInfo.title,
                      author: book.volumeInfo.authors[0],
                      description: book.volumeInfo.description,
                      image: book.volumeInfo.imageLinks.smallThumbnail,
                      link: book.volumeInfo.infoLink,
                      _id: book.id
                    })}
                  >
                    Save
                  </BookBtn>
                </div>
              </ListItem>
            ))}
          </List>
        </Container>
      </div>
    );
  }
}

export default Results;
