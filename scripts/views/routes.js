// 'use strict';

// page('/', app.bookView.initIndexPage);

// page('/*', (ctx, next) => {
//   $('.book-view').empty().hide();
//   next();
// });

// page('/api/v1/books/:id', ctx => app.Book.fetchOne(ctx.params.id));


// page.start();


'use strict';



page('/*', (ctx, next) => {
  $('.container').hide()
  next()
})

page('/', () => app.Book.fetchAll(app.bookView.initIndexPage))

// page('/detailView', app.Book.fetchOne(app.bookView.viewOneBook))
// page('/createView', app.bookView.createPage);

page.start()