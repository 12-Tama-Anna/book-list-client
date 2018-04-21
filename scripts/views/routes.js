'use strict';

page('/', app.bookView.initIndexPage);

page('/*', (ctx, next) => {
  $('.book-view').empty().hide();
  next();
});

page('/api/v1/books/:id', ctx => app.Book.fetchOne(ctx.params.id));


page.start();