'use strict';

page('/', ctx => app.Book.fetchAll(app.bookView.initIndexPage));
page('/api/v1/books/:id', ctx => app.Book.fetchOne(ctx, app.bookView.initIndexPage));


page.start();