'use strict';

var app = app || {};

const ENV = {};

ENV.isProduction = window.location.protocol === 'https:';
ENV.productionApiUrl = 'https://tr-ab-bookapp.herokuapp.com';
ENV.developmentApiUrl = 'http://localhost:3000';
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;

(function(module) {
  function errorCallback(err) {
    console.error(err);
    module.errorView.initErrorPage(err);
  }

  function Book(rawBookObj) {
    Object.keys(rawBookObj).forEach(key => this[key] = rawBookObj[key]);
  }

  Book.prototype.toHtml = function() {
    let template = Handlebars.compile($('#book-list-template').text());
    return template(this);
  }


  Book.all = [];
  Book.loadAll = rows => Book.all = rows.sort((a, b) => b.title - a.title).map(book => new Book(book));

  Book.fetchAll = callback => {
    $.get(`${ENV.apiUrl}/api/v1/books`)
      .then(Book.loadAll)
      .then(callback)
      .catch(errorCallback);
  }

  Book.fetchOne = (result, callback) => {
    $.getJSON(`${ENV.apiUrl}/api/v1/books/${callback}`)
      .then(app.oneView.render).then(console.log('fetchOne'))
      .then(callback)
      .catch(errorCallback);
  }

  Book.prototype.create = function() {
    $.post(`${ENV.apiUrl}/api/v1/books`, {
      author: this.author,
      title: this.title,
      isbn: this.isbn,
      url: this.url,
      description: this.description
    })
      .then().then(console.log())
      .catch(errorCallback);
  }

  $('.book-create').on('submit', 'form', (event) => {
    event.preventDefault();
    let book = new Book({
      author: $('#book-create-author').val(),
      title: $('#book-create-title').val(),
      isbn: $('#book-create-isbn').val(),
      url: $('#book-create-url').val(),
      description: $('#book-create-description').val()
    });
    console.log(book);
    book.create();
    $('#book-create-author').val('');
    $('#book-create-title').val('');
    $('#book-create-isbn').val('');
    $('#book-create-url').val('');
    $('#book-create-description').val('');
  })

  module.Book = Book;
})(app)
// https://tr-ab-bookapp.herokuapp.com/api/v1/books

