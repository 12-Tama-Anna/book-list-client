'use strict';

var app = app || {};

(function(module) {
  
  const bookView = {};

  bookView.initIndexPage = function() {
    $('.container').hide();
    $('.book-view').show();
    module.Book.all.map(book => $('#book-list').append(book.toHtml()));
  }

  bookView.initDetailPage = (ctx) => {
    $('.container').hide();
    $('.detail-view').show();
    let selected = app.Book.all.filter(el => el.book_id = ctx.params.book_id);
    $('#detail-view').append(selected[0].toHtml('#detail-view'));
  }
  

  




  module.bookView = bookView;
})(app)

$(function() {
  app.Book.fetchAll(app.bookView.initIndexPage);
})