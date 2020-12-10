let myLibrary = [];

class Book {
  constructor(name,author,numPages,hasRead,id)
  {
    this.name = name
    this.author = author
    this.numPages = numPages
    this.hasRead = hasRead
    this.id
  }

}

function updateDisplay(index)
{
  //add index as data attribute to div 

}

function addBookToLibrary()
{
  let index = myLibrary.length;
  let bookObj = new Book("Hard-Boiled","Murakami",405,true,index);
  //let bookObj2 = new Book("Norwegian Wood","Murakami",200,true);
  myLibrary.push(bookObj);
  updateDisplay(index);
  //myLibrary.push(bookObj2);
  //console.log(myLibrary);
}

function enterBookDetails()
{

}

function theDomHasLoaded(e) {
  const add_button = document.querySelector("#add-book");
  add_button.addEventListener("click",enterBookDetails)
}

document.addEventListener("DOMContentLoaded",theDomHasLoaded,false);