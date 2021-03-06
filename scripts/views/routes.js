'use strict';

page('/', app.bookView.initIndexPage);

page('/books/:id', ctx => app.Book.fetchOne(ctx, app.bookView.initDetailPage));

page('/new', app.bookView.initCreatePage);

page.start();

