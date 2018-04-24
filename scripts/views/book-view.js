'use strict';

var app = app || {};

(function(module) {
  
  const bookView = {};

  bookView.initIndexPage = function() {
    $('.container').hide();
    $('.book-view').show();
    module.Book.all.map(book => $('#book-list').append(book.toHtml()));
  }

  bookView.initDetailPage = () => {
    $('.container').hide();
    $('#view-details').empty();
    let template = Handlebars.compile($('#detail-view-template').text());
    console.log(app.showBook);
    $('#view-details').append(template(app.showBook[0]));
    $('.detail-view').show();
    // let selected = app.Book.all.filter(ele => ele.book_id = ctx.params.book_id);
    // $('#detail-view').append(selected[0].toHtml('#detail-view'));
  };


  module.bookView = bookView;
})(app)

$(function() {
  app.Book.fetchAll(app.bookView.initIndexPage);
})