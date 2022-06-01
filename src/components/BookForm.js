import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

const BookForm = (props) => {
  const [book, setBook] = useState({
    bookname: props.book ? props.book.bookname : '',
    author: props.book ? props.book.author : '',
    quantity: props.book ? props.book.quantity : '',
    price: props.book ? props.book.price : '',
    publish: props.book ? props.book.publish : '',
    date: props.book ? props.book.date : ''
  });

  // const [errorMsg, setErrorMsg] = useState('');
  const { bookname, author, price, quantity, publish } = book;
  const [errorName, setErrorName] = useState('');
  const [errorAuthor, setErrorAuthor] = useState('');
  const [errorQuantity, setErrorQuantity] = useState('');
  const [errorPrice, setErrorPrice] = useState('');
  const [errorPublish, setErrorPublish] = useState('');

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const values = [bookname, author, price, quantity, publish];
    // let errorMsg = '';
    let errorName = '';
    let errorAuthor = '';
    let errorQuantity = '';
    let errorPrice = '';
    let errorPublish = '';
    const allFieldsFilled = values.every((field) => {
      const value = `${field}`.trim();
      // console.log(values[values.length-1]);
      return value !== '' && value !== '0' && new Date(values[values.length-1]).getTime() < new Date().getTime();
    });

    if (allFieldsFilled) {
      const book = {
        id: uuidv4(),
        bookname,
        author,
        price,
        quantity,
        publish,
        date: new Date()
      };
      props.handleOnSubmit(book);
    } else {
      const book = {
        id: uuidv4(),
        bookname,
        author,
        price,
        quantity,
        publish,
        date: new Date()
      };
      if(book.bookname==='') {
        errorName = 'Name of book is required'
      }
      if(book.author==='') {
        errorAuthor = 'Author of book is required'
      }
      if(book.quantity==='') {
        errorQuantity = 'Quantity of book is required'
      }
      if(book.price==='') {
        errorPrice = 'Price of book is required'
      }
      if(book.publish==='') {
        errorPublish = 'Publish of book is required'
      } else if(new Date(book.publish).getTime() > book.date.getTime()) {
        errorPublish = 'Publish of book must be less than current date'
      }

    }
    setErrorName(errorName);
    setErrorAuthor(errorAuthor);
    setErrorQuantity(errorQuantity);
    setErrorPrice(errorPrice);
    setErrorPublish(errorPublish);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'quantity':
        if (value === '' || parseInt(value) === +value) {
          setBook((prevState) => ({
            ...prevState,
            [name]: value
          }));
        }
        break;
      case 'price':
        if (value === '' || value.match(/^\d{1,}(\.\d{0,2})?$/)) {
          setBook((prevState) => ({
            ...prevState,
            [name]: value
          }));
        }
        break;
      default:
        setBook((prevState) => ({
          ...prevState,
          [name]: value
        }));
    }
  };
  return (
    <div className="main-form">
      <Form onSubmit={handleOnSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Book Name</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="bookname"
            value={bookname}
            placeholder="Enter name of book"
            onChange={handleInputChange}
          />
        </Form.Group>
        {errorName && <p className="errorMsg">{errorName}</p>}
        <Form.Group controlId="author">
          <Form.Label>Book Author</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="author"
            value={author}
            placeholder="Enter name of author"
            onChange={handleInputChange}
          />
        </Form.Group>
        {errorAuthor && <p className="errorMsg">{errorAuthor}</p>}
        <Form.Group controlId="quantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            className="input-control"
            type="number"
            name="quantity"
            value={quantity}
            placeholder="Enter available quantity"
            onChange={handleInputChange}
          />
        </Form.Group>
        {errorQuantity && <p className="errorMsg">{errorQuantity}</p>}
        <Form.Group controlId="price">
          <Form.Label>Book Price</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="price"
            value={price}
            placeholder="Enter price of book"
            onChange={handleInputChange}
          />
        </Form.Group>
        {errorPrice && <p className="errorMsg">{errorPrice}</p>}
        <Form.Group controlId="publish">
          <Form.Label>Publish</Form.Label>
          <Form.Control
            className="input-control"
            type="date"
            name="publish"
            value={publish}
            placeholder="Enter price of book"
            onChange={handleInputChange}
          />
        </Form.Group>
        {errorPublish && <p className="errorMsg">{errorPublish}</p>}
        <Button variant="primary" type="submit" className="submit-btn">
          Submit
        </Button>
      </Form>
      
    </div>
  );
};

export default BookForm;