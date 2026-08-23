const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");
const addTaskButton = document.querySelector("#add-new-task");
const colunms = [todo, progress, done];
let tasksData = {};
let Dragelement = null;

if (localStorage.getItem("tasks")) {
  const data = JSON.parse(localStorage.getItem("tasks"));
  for (const col in data) {
    const column = document.querySelector(`#${col}`);
    data[col].forEach(task => {
      const div = document.createElement("div");

      div.classList.add("task");
      div.setAttribute("draggable", "true");
      div.innerHTML = `
        <h2>${task.title}</h2>
        <p>${task.desc}</p>
        <button>Delete</button>
        `;
      column.appendChild(div);
      div.addEventListener("drag", (e) => {
        Dragelement = div;
      });
    });
  }
}

const tasks = document.querySelectorAll(".task");
console.log(tasks);
tasks.forEach((task) => {
  task.addEventListener("drag", (e) => {
    // console.log("dragging", e)
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
    colunm.classList.remove("hover-over");
  });
}
addDragEventOnColunm(todo);
addDragEventOnColunm(progress);
addDragEventOnColunm(done);

// Modal related logic
const ToggleModalButton = document.querySelector("#toggle-modal");
const modalbg = document.querySelector(".modal .bg");
const modal = document.querySelector(".modal");

ToggleModalButton.addEventListener("click", () => {
  modal.classList.toggle("active");
});
modalbg.addEventListener("click", () => {
  modal.classList.toggle("active");
});
addTaskButton.addEventListener("click", () => {
  const taskTitle = document.querySelector("#task-title-input").value;
  const taskDescription = document.querySelector("#task-desc-input").value;
  const div = document.createElement("div");
  div.setAttribute("draggable", "true");
  div.setAttribute("class", "task");
  div.innerHTML = `
        <h2>${taskTitle}</h2>
        <p>${taskDescription}</p>
        <button>Delete</button>
    `;
  todo.appendChild(div);

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
  div.addEventListener("drag", (e) => {
    Dragelement = div;
  });
  modal.classList.remove("active");
});
// Modal related logic
