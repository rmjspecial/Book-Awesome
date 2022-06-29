const input = document.querySelector('#title');
const author = document.querySelector('#Author');
const taskDiv = document.querySelector('#list');
const Add = document.querySelector('.add');

class AwesomeBooks {
  constructor() {
    // Empty Array To store The Tasks
    this.arrayOfTasks = [];
  }

  // Check If theres Tasks In Local Storge
  checkLocal() {
    if (localStorage.getItem('tasks')) {
      this.arrayOfTasks = JSON.parse(localStorage.getItem('tasks'));
    }
  }

  addElementToPageFrom = (arrayOfTasks) => {
    // Empty Taskk Div
    taskDiv.innerHTML = '';
    // Looping on Array of Tasks
    arrayOfTasks.forEach((task) => {
      // create Main Div
      const div = document.createElement('tr');
      div.className = 'task';
      div.setAttribute('data-id', task.id);
      // Add Title to the main div
      const title = document.createElement('td');
      title.className = 'titleTask';
      title.textContent = `"${task.title}" by`;
      title.style.marginRight = '7px';
      div.appendChild(title);
      // Add Author to the main div
      const Author = document.createElement('td');
      Author.className = 'AuthorTask';
      Author.textContent = task.author;
      div.appendChild(Author);
      // create remove button
      const span = document.createElement('button');
      span.className = 'del';
      span.type = 'button';
      span.appendChild(document.createTextNode('remove'));
      // Append Button To main Div
      div.appendChild(span);
      // Add task Div To Tasks container
      taskDiv.appendChild(div);
    });
  };

  AddToStorge = (arrayOfTasks) => {
    window.localStorage.setItem('tasks', JSON.stringify(arrayOfTasks));
  };

  getData = () => {
    const data = window.localStorage.getItem('tasks');
    if (data) {
      const tasks = JSON.parse(data);
      this.addElementToPageFrom(tasks);
    }
  };

  // use filter method
  deleteTask = (taskId) => {
    // eslint-disable-next-line eqeqeq
    this.arrayOfTasks = this.arrayOfTasks.filter((task) => task.id != taskId);
    this.AddToStorge(this.arrayOfTasks);
  };

  // click on task Element
  remover() {
    taskDiv.addEventListener('click', (e) => {
      // remove Element from page
      if (e.target.classList.contains('del')) {
        // remove task from Local storage
        this.deleteTask(e.target.parentElement.getAttribute('data-id'));
        // Remove Element from page
        e.target.parentElement.remove();
      }
    });
  }

  // Trigger Get Data From Local Stroge Function
  addTaskToArray = (taskTitle, taskAuthor) => {
    // Task Data
    const task = {
      id: Date.now(),
      title: taskTitle,
      author: taskAuthor,
    };
    // Push Task to Array of Tasks
    this.arrayOfTasks.push(task);
    // Add Tasks To page
    this.addElementToPageFrom(this.arrayOfTasks);
    // Add Tasks to  Local Storage
    this.AddToStorge(this.arrayOfTasks);
  };

  // Add task
  handlesubmit() {
    Add.onclick = () => {
      if (input.value !== '' && author.value !== '') {
        this.addTaskToArray(input.value, author.value); // Add task To Array of Tasks
        author.value = '';
        input.value = ''; // Empty Input Feild
      }
    };
  }
}

const books = new AwesomeBooks();

books.handlesubmit();
books.getData();
books.checkLocal();
books.remover();

const container = document.querySelector('.container');
const contact = document.querySelector('.contact');
const Book = document.querySelector('.addBook');

function contactPage() {
  container.style.display = 'none';
  Book.style.display = 'none';
  contact.style.display = 'flex';
}

function addBook() {
  container.style.display = 'none';
  Book.style.display = 'flex';
  contact.style.display = 'none';
}

function list() {
  container.style.display = 'block';
  Book.style.display = 'none';
  contact.style.display = 'none';
}

list();
addBook();
contactPage();