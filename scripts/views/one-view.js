
var app = app || {};


(function(module){

  const oneView = {};

  const template = Handlebars.compile($('#detail-template').text());

  oneView.initPage = function() {
    $('.detail-view').show();
    console.log('oneView');
  }

  oneView.render = (book) => $('.detail-view').append($(template(book[0])), (console.log(book)));

  module.oneView = oneView;

}(app));
