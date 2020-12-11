let myLibrary = [];

class Book {
  constructor(name,author,numPages,hasRead,id)
  {
    this.name = name
    this.author = author
    this.numPages = numPages
    this.hasRead = hasRead
    this.id = id
  }

}

function updateDisplay(index)
{
  const newDiv = document.createElement("div");

  const book = myLibrary[index];

  for (let prop in book)
  {
    const newContent = document.createTextNode(prop + ": " + book[prop]);
    const br = document.createElement("br");

    newDiv.appendChild(newContent);
    newDiv.appendChild(br);
  }

  newDiv.classList.add("book");
  newDiv.setAttribute('data-attribute',index);

  const editButton = document.createElement("button");
  const newContent = document.createTextNode(prop + ": " + book[prop]);

  const deleteButton = document.createElement("button");




  const booklist = document.querySelector(".booklist");
  booklist.appendChild(newDiv,booklist);
  //add index as data attribute to div 
  
}

function addBookToLibrary()
{
  let title = document.querySelector("#title-input").value;
  let author = document.querySelector("#author-input").value;
  let numPages = document.querySelector("#numPages-input").value;
  //let numPages = document.querySelector("#numPages-input").value;
  let hasRead = false;

  if(document.getElementById('hasRead').checked)
  {
    hasRead=true;
  }


  let index = myLibrary.length;
  let bookObj = new Book(title,author,numPages,hasRead,index);
  
  myLibrary.push(bookObj);

  let modal = document.getElementById("modalWindow");
  modal.style.display = "none";

  updateDisplay(index);
}


function editBookDetails()
{

  //will only allow edit button to appear on already added books
  //will use data-attribute of book div to access mylibrary array and edit book object
}

function removeBook()
{

}

function theDomHasLoaded(e) {

  const edit_button = document.querySelector("#edit-book");
  edit_button.addEventListener("click",editBookDetails)

  const remove_button = document.querySelector("#remove-book");
  remove_button.addEventListener("click",removeBook)

  let modal = document.getElementById("modalWindow");
  // Get the button that opens the modal
  let btn = document.getElementById("add-book");
  // Get the <span> element that closes the modal
  let span = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal
  btn.onclick = function() {
    modal.style.display = "block";
  }
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  const submit_book = document.querySelector("#submit");
  submit_book.addEventListener("click",addBookToLibrary)
}

document.addEventListener("DOMContentLoaded",theDomHasLoaded,false);