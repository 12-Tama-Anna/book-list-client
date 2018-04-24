'use strict';

var app = app || {};

const ENV = {};

ENV.isProduction = window.location.protocol === 'https:';
ENV.productionApiUrl = 'https://tr-ab-bookapp.herokuapp.com';
ENV.developmentApiUrl = 'http://localhost:3001';
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;

(function(module) {

  function errorCallback(err) {
    console.error(err);
    module.errorView.initErrorPage(err);
  }


  Book.all = [];

  function Book(rawBookObj) {
    Object.keys(rawBookObj).forEach(key => this[key] = rawBookObj[key]);
  }

  Book.prototype.toHtml = function() {
    let template = Handlebars.compile($('#book-list-template').text());
    return template(this);
  }


  Book.loadAll = rows => Book.all = rows.sort((a, b) => b.title - a.title).map(book => new Book(book));

  Book.fetchAll = callback => {
    $.get(`${ENV.apiUrl}/api/v1/books`)
      .then(Book.loadAll)
      .then(callback)
      .catch(errorCallback);
  }


  Book.fetchOne = (id,callback) => {
    $.get(`${ENV.apiUrl}/api/v1/books/${id.params.id}`)
      .then(results => {
        console.log('heloooo');
        app.showBook = Book.loadAll(results);
        console.log(Book.loadAll(results));
      })
      .then(callback)
      .catch(errorCallback);
  };



  module.Book = Book;
})(app)
// https://tr-ab-bookapp.herokuapp.com/api/v1/books

