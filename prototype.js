let myLibrary = [];
let typeofStorage ="";

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
  const editContent = document.createTextNode("Edit");

  editButton.appendChild(editContent);
  editButton.addEventListener("click",editBook)

  const deleteButton = document.createElement("button");
  const deleteContent = document.createTextNode("Delete");

  deleteButton.appendChild(deleteContent);
  deleteButton.addEventListener("click",removeBook)

  newDiv.appendChild(editButton);
  newDiv.appendChild(deleteButton);


  const booklist = document.querySelector(".booklist");
  booklist.appendChild(newDiv,booklist);
  //add index as data attribute to div 
  
}

function populateStorage()
{
  let storage;
  storage = window['localStorage'];
  storage.setItem('myLibrary', JSON.stringify(myLibrary));

}

function loadFromStorage()
{
  let storage;
  storage = window['localStorage'];
  if(JSON.parse(storage.getItem('myLibrary')) != null)
  {
    myLibrary = JSON.parse(storage.getItem('myLibrary'));
  }

  for(let i=0;i<myLibrary.length;i++)
  {
    updateDisplay(parseInt(myLibrary[i].id));
  }
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

  if (storageAvailable('localStorage')) {
    populateStorage();
  }
  else {
    console.log("Local Storage not available");
  }

  let modal = document.getElementById("modalWindow");
  modal.style.display = "none";

  updateDisplay(index);
  document.querySelector("#title-input").value="";
  document.querySelector("#author-input").value="";
  document.querySelector("#numPages-input").value="";

}


function editBook()
{

  let edit_title= document.getElementById("edit-title-input");
  let edit_author= document.getElementById("edit-author-input")
  let edit_numPages= document.getElementById("edit-numPages-input")
  let editHasRead = document.getElementById("edit-hasRead");
  let editHasNotRead = document.getElementById("edit-hasNotRead");
  let editModal = document.getElementById("editModalWindow");

  editModal.style.display = "block";

  let span = document.getElementsByClassName("close")[1];

  span.onclick = function() {
    editModal.style.display = "none";
    edit_title.value="";
    edit_author.value="";
    edit_numPages.value="";


  }
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == editModal) {
      editModal.style.display = "none";
      edit_title.value="";
      edit_author.value="";
      edit_numPages.value="";
    }
  }

  let editDiv = this.parentElement;
  let editIndex = editDiv.getAttribute("data-attribute");

  let name_placeholder = myLibrary[editIndex].name;
  let author_placeholder = myLibrary[editIndex].author;
  let numPages_placeholder = myLibrary[editIndex].numPages;
  let hasRead_placeholder = myLibrary[editIndex].hasRead;


  //edit_title.setAttribute("placeholder",name_placeholder); 
  //edit_author.setAttribute("placeholder",author_placeholder); 
  //edit_numPages.setAttribute("placeholder",numPages_placeholder);

  edit_title.value=name_placeholder; 
  edit_author.value=author_placeholder; 
  edit_numPages.value=numPages_placeholder;

  if(hasRead_placeholder==true)
  {
   editHasRead.checked=true;
  }
  else
  {
    editHasNotRead.checked=true;
  }

  let submit_edits = document.getElementById("submit-edits");
  
  submit_edits.onclick = function(){
    myLibrary[editIndex].name = edit_title.value;
    myLibrary[editIndex].author = edit_author.value;
    myLibrary[editIndex].numPages = edit_numPages.value;
    if(editHasRead.checked)
    {
      myLibrary[editIndex].hasRead = true;
    }
    else
    {
      myLibrary[editIndex].hasRead = false; 
    }

    editDiv.childNodes[0].nodeValue = "name: " + myLibrary[editIndex].name;
    editDiv.childNodes[2].nodeValue = "author: " + myLibrary[editIndex].author;
    editDiv.childNodes[4].nodeValue = "numPages: " + myLibrary[editIndex].numPages;
    editDiv.childNodes[6].nodeValue = "hasRead: " + myLibrary[editIndex].hasRead;

    if (storageAvailable('localStorage')) {
      populateStorage();
    }
    else {
      console.log("Local Storage not available");
    }

    editModal.style.display = "none";
    edit_title.value="";
    edit_author.value="";
    edit_numPages.value="";    
  }

}

function removeBook()
{

  let indexToRemove = this.parentElement.getAttribute("data-attribute");
  this.parentElement.remove();
  myLibrary.splice(indexToRemove,1);

  let bookNodeList = document.querySelectorAll(".book");

  for (let i = 0;i<myLibrary.length;i++)
  {
    const book = myLibrary[i];
    book.id = i;
    
    bookNodeList[i].setAttribute("id",i);
    bookNodeList[i].setAttribute("data-attribute",i);

    bookNodeList[i].childNodes[8].nodeValue = "id: " + i;

  }

  if (storageAvailable('localStorage')) {
    populateStorage();
  }
  else {
    console.log("Local Storage not available");
  }
}

function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

function theDomHasLoaded(e) {

  loadFromStorage();

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