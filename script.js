let tasksData = {};

const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");
const colunms = [todo, progress, done];
let Dragelement = null;

function addTask(title, desc, colunm) {
  const div = document.createElement("div");
  div.classList.add("task");
  div.setAttribute("draggable", "true");
  div.innerHTML = `
      <h2>${title}</h2>
      <p>${desc}</p>
      <button>Delete</button>
      `;
  colunm.appendChild(div);
  div.addEventListener("drag", (e) => {
    Dragelement = div;
  });
  const deleteButton = div.querySelector("button");
    deleteButton.addEventListener("click", () => {
      div.remove();
      UpdateTaskCount();
    });
  return div;
}

function UpdateTaskCount() {
  colunms.forEach((colu) => {
    const tasks = colu.querySelectorAll(".task");
    const count = colu.querySelector(".right");

    tasksData[colu.id] = Array.from(tasks).map((t) => {
      return {
        title: t.querySelector("h2").innerText,
        desc: t.querySelector("p").innerText,
      };
    });
    // console.log(tasksData)
    localStorage.setItem("tasks", JSON.stringify(tasksData));
    count.innerHTML = tasks.length;
  });
}

if (localStorage.getItem("tasks")) {
  const data = JSON.parse(localStorage.getItem("tasks"));
  for (const col in data) {
    const column = document.querySelector(`#${col}`);
    data[col].forEach((task) => {
      addTask(task.title, task.desc, column);
    });
  }
  UpdateTaskCount();
}

const tasks = document.querySelectorAll(".task");
// console.log(tasks);
tasks.forEach((task) => {
  task.addEventListener("drag", (e) => {
    Dragelement = task;
  });
});
function addDragEventOnColunm(colunm) {
  colunm.addEventListener("dragenter", (e) => {
    e.preventDefault();
    colunm.classList.add("hover-over");
  });
  colunm.addEventListener("dragleave", (e) => {
    e.preventDefault();
    colunm.classList.remove("hover-over");
  });
  colunm.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  colunm.addEventListener("drop", (e) => {
    e.preventDefault();
    colunm.appendChild(Dragelement);
    colunm.classList.remove("hover-over");
    UpdateTaskCount();
  });
}
addDragEventOnColunm(todo);
addDragEventOnColunm(progress);
addDragEventOnColunm(done);

// Modal related logic
const ToggleModalButton = document.querySelector("#toggle-modal");
const modalbg = document.querySelector(".modal .bg");
const modal = document.querySelector(".modal");
const addTaskButton = document.querySelector("#add-new-task");

ToggleModalButton.addEventListener("click", () => {
  modal.classList.toggle("active");
});
modalbg.addEventListener("click", () => {
  modal.classList.toggle("active");
});
addTaskButton.addEventListener("click", () => {
  const taskTitle = document.querySelector("#task-title-input").value;
  const taskDescription = document.querySelector("#task-desc-input").value;

  addTask(taskTitle, taskDescription, todo);
  UpdateTaskCount();
  modal.classList.remove("active");
  document.querySelector("#task-title-input").value="";
  document.querySelector("#task-desc-input").value="";
});
// Modal related logic
