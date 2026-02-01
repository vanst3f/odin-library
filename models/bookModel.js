export { Book };

function Book(id, title, author, pages, haveRead) {
  if (!new.target)
    throw Error("You must use the 'new' operator to call the constructor");

  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;
}

Book.prototype.toggleRead = function () {
  this.haveRead = !this.haveRead;
};
