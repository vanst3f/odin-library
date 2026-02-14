import { Book } from "../models/bookModel.js";

const array = [];
const headers = ["ID:", "Title:", "Author:", "Pages:", "Have read:", "", ""];

function addBook(id, title, author, pages, haveRead) {
  array.push(new Book(id, title, author, pages, haveRead));
}

const button = document.getElementById("addBook");

const bookFactory = () => {
  let formCreated = false;

  const api = {
    displayBooks() {
      const table = document.createElement("table");
      table.style.border = "1px solid #111827";
      table.style.borderSpacing = "4px";
      table.style.textAlign = "left";

      const headerRow = document.createElement("tr");

      headers.forEach((header) => {
        const th = document.createElement("th");
        th.style.borderBottom = "1px solid #111827";
        th.textContent = header;
        headerRow.appendChild(th);
      });
      table.appendChild(headerRow);

      for (const book of array) {
        const row = document.createElement("tr");
        Object.values(book).forEach((value) => {
          const cell = document.createElement("td");
          cell.textContent = value;
          cell.dataset.id = book.id;
          row.appendChild(cell);
        });
        const deleteCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.dataset.bookId = book.id;
        deleteCell.appendChild(deleteButton);

        const readCell = document.createElement("td");
        const readButton = document.createElement("button");
        readButton.textContent = "Toggle read";
        readButton.dataset.bookId = book.id;
        readCell.appendChild(readButton);

        row.append(deleteCell, readButton);
        table.appendChild(row);
        deleteButton.addEventListener("click", () => {
          Object.values(book).forEach((value) => {
            if (value === book.id) table.removeChild(row);
          });
        });
        readButton.addEventListener("click", () => {
          book.toggleRead();
          this.reset().displayBooks();
        });
      }
      document.getElementById("books").appendChild(table);

      return api;
    },
    showForm() {
      if (!formCreated) {
        const dialog = document.createElement("dialog");
        dialog.style.width = "250px";
        dialog.style.display = "flex";
        dialog.style.gap = "16px";
        dialog.style.border = "1px solid";
        dialog.style.position = "fixed";
        dialog.style.top = "50%";
        dialog.style.left = "50%";
        dialog.style.transform = "translate(-50%, -50%)";
        dialog.style.margin = "0";

        const form = document.createElement("form");
        form.style.width = "250px";
        form.style.display = "flex";
        form.style.flexDirection = "column";
        form.style.gap = "16px";

        for (let i = 1; i < headers.length - 3; i++) {
          const label = document.createElement("label");
          label.style.display = "flex";
          label.style.gap = "16px";
          label.style.justifyContent = "space-between";
          label.textContent = headers[i];

          const input = document.createElement("input");
          input.name = headers[i].toLowerCase();
          input.type = "text";

          label.appendChild(input);
          form.appendChild(label);
        }
        const haveRead = document.createElement("label");
        haveRead.style.display = "flex";
        haveRead.style.gap = "16px";
        haveRead.style.justifyContent = "space-between";
        haveRead.textContent = "Have read:";

        const checkbox = document.createElement("input");
        checkbox.name = "have read:";
        checkbox.type = "checkbox";
        haveRead.appendChild(checkbox);

        const submitButton = document.createElement("input");
        submitButton.style.alignSelf = "flex-end";
        submitButton.name = "submit";
        submitButton.type = "submit";
        form.append(haveRead, submitButton);

        submitButton.addEventListener("click", (event) => {
          event.preventDefault();

          const formData = new FormData(form);
          const title = formData.get("title:");
          const author = formData.get("author:");
          const pages = formData.get("pages:");
          const read = formData.get("read:");

          addBook(
            crypto.randomUUID(),
            title,
            author,
            pages,
            read === "on" ? true : false,
          );
          this.reset().displayBooks();
        });
        dialog.appendChild(form);
        document.getElementById("books").appendChild(dialog);
        formCreated = true;
      }

      return api;
    },
    reset() {
      const main = document.getElementById("books");

      while (main.firstChild) {
        main.removeChild(main.lastChild);
      }
      formCreated = false;

      return api;
    },
  };
  return api;
};

const library = bookFactory();

library.displayBooks();

button.addEventListener("click", () => {
  library.showForm();
});
