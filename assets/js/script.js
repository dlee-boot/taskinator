// var taskIdCounter = 0;
// var formEl = document.querySelector("#task-form");
// var tasksToDoEl = document.querySelector("#tasks-to-do");
// var pageContentEl = document.querySelector("#page-content");
// var tasksInProgressEl = document.querySelector("#tasks-in-progress");
// var tasksCompletedEl = document.querySelector("#tasks-completed");
// var tasks = [];

// var taskFormHandler = function (event) {
//     event.preventDefault();
//     var taskNameInput = document.querySelector("input[name='task-name']").value;
//     var taskTypeInput = document.querySelector("select[name='task-type']").value;

//     // check if input values are empty strings
//     if (!taskNameInput || !taskTypeInput) {
//         alert("You need to fill out the task form!");
//         return false;
//     }

//     formEl.reset();

//     var isEdit = formEl.hasAttribute("data-task-id");
//     // has data attribute, so get task id and call function to complete edit process
//     if (isEdit) {
//         var taskId = formEl.getAttribute("data-task-id");
//         completeEditTask(taskNameInput, taskTypeInput, taskId);
//     } 
//   // no data attribute, so create object as normal and pass to createTaskEl function
//     else {
//         var taskDataObj = {
//         name: taskNameInput,
//         type: taskTypeInput,
//         status: "to do"
//     };

//     createTaskEl(taskDataObj);
//   }
    
// };

// var createTaskEl = function(taskDataObj) {
//     // create list item
//     var listItemEl = document.createElement("li");
//     listItemEl.className = "task-item";
//     // add task id as a custom attribute
//     listItemEl.setAttribute("data-task-id", taskIdCounter);
//     listItemEl.setAttribute("draggable", "true");
//     // create div to hold task info and add to list item
//     var taskInfoEl = document.createElement("div");
//     taskInfoEl.className = "task-info";
//     taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
//     listItemEl.appendChild(taskInfoEl);

//     taskDataObj.id = taskIdCounter;
//     tasks.push(taskDataObj);
//     saveTasks();

//     var taskActionsEl = createTaskActions(taskIdCounter);
//     listItemEl.appendChild(taskActionsEl);
//     // add entire list item to list
//     tasksToDoEl.appendChild(listItemEl);
//     // increase task counter for next unique id
//     taskIdCounter++;
//     console.log(taskDataObj);
//     console.log(taskDataObj.status);
// }

// var createTaskActions = function(taskId) {
//     var actionContainerEl = document.createElement("div");
//     actionContainerEl.className = "task-actions";

//     // create edit button
//     var editButtonEl = document.createElement("button");
//     editButtonEl.textContent = "Edit";
//     editButtonEl.className = "btn edit-btn";
//     editButtonEl.setAttribute("data-task-id", taskId);
//     actionContainerEl.appendChild(editButtonEl);

//     // create delete button
//     var deleteButtonEl = document.createElement("button");
//     deleteButtonEl.textContent = "Delete";
//     deleteButtonEl.className = "btn delete-btn";
//     deleteButtonEl.setAttribute("data-task-id", taskId);
//     actionContainerEl.appendChild(deleteButtonEl);

//     var statusSelectEl = document.createElement("select");
//     statusSelectEl.className = "select-status";
//     statusSelectEl.setAttribute("name", "status-change");
//     statusSelectEl.setAttribute("data-task-id", taskId);
//     actionContainerEl.appendChild(statusSelectEl);

//     var statusChoices = ["To Do", "In Progress", "Completed"];
//     for (var i = 0; i < statusChoices.length; i++) {
//         // create option element
//         var statusOptionEl = document.createElement("option");
//         statusOptionEl.textContent = statusChoices[i];
//         statusOptionEl.setAttribute("value", statusChoices[i]);
      
//         // append to select
//         statusSelectEl.appendChild(statusOptionEl);
//     }

//     return actionContainerEl;
// };

// var taskButtonHandler = function(event) {
//     console.log(event.target);
//     // get target element from event
//     var targetEl = event.target;

//     // edit button was clicked
//     if (targetEl.matches(".edit-btn")) {
//         var taskId = targetEl.getAttribute("data-task-id");
//         editTask(taskId);
//     } 
//     // delete button was clicked
//     else if (targetEl.matches(".delete-btn")) {
//         var taskId = targetEl.getAttribute("data-task-id");
//         deleteTask(taskId);
//     }
// };

// var deleteTask = function(taskId) {
//     var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
//     console.log(taskSelected);
//     taskSelected.remove();

//     // create new array to hold updated list of tasks
//     var updatedTaskArr = [];

//     // loop through current tasks
//     for (var i = 0; i < tasks.length; i++) {
//         // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
//         if (tasks[i].id !== parseInt(taskId)) {
//             updatedTaskArr.push(tasks[i]);
//         }
//     }

//     // reassign tasks array to be the same as updatedTaskArr
//     tasks = updatedTaskArr;
//     saveTasks();
// };

// var editTask = function(taskId) {
//     console.log("editing task #" + taskId);
  
//     // get task list item element
//     var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
//     console.log(taskSelected);
//     // get content from task name and type
//     var taskName = taskSelected.querySelector("h3.task-name").textContent;
//     var taskType = taskSelected.querySelector("span.task-type").textContent;
//     document.querySelector("input[name='task-name']").value = taskName;
//     document.querySelector("select[name='task-type']").value = taskType;
//     document.querySelector("#save-task").textContent = "Save Task";
//     formEl.setAttribute("data-task-id", taskId);
// };

// var completeEditTask = function(taskName, taskType, taskId) {
//     // find the matching task list item
//     var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

//     // set new values
//     taskSelected.querySelector("h3.task-name").textContent = taskName;
//     taskSelected.querySelector("span.task-type").textContent = taskType;

//     // loop through tasks array and task object with new content
//     for (var i = 0; i < tasks.length; i++) {
//         if (tasks[i].id === parseInt(taskId)) {
//         tasks[i].name = taskName;
//         tasks[i].type = taskType;
//         }
//     };
//     saveTasks();

//     alert("Task Updated!");
//     formEl.removeAttribute("data-task-id");
//     document.querySelector("#save-task").textContent = "Add Task";
// };

// var taskStatusChangeHandler = function(event) {
//     // get the task item's id
//     var taskId = event.target.getAttribute("data-task-id");

//     // get the currently selected option's value and convert to lowercase
//     var statusValue = event.target.value.toLowerCase();

//     // find the parent task item element based on the id
//     var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

//     if (statusValue === "to do") {
//         tasksToDoEl.appendChild(taskSelected);
//       } 
//       else if (statusValue === "in progress") {
//         tasksInProgressEl.appendChild(taskSelected);
//       } 
//       else if (statusValue === "completed") {
//         tasksCompletedEl.appendChild(taskSelected);
//       }
    
//     // update task's in tasks array
//     for (var i = 0; i < tasks.length; i++) {
//         if (tasks[i].id === parseInt(taskId)) {
//             tasks[i].status = statusValue;
//         }
//     }
//     console.log(tasks);
//     saveTasks();
// };

// var dragTaskHandler = function(event) {
//     var taskId = event.target.getAttribute("data-task-id");
//     event.dataTransfer.setData("text/plain", taskId);
//     var getId = event.dataTransfer.getData("text/plain");
//     console.log("getId:", getId, typeof getId);

// } 

// var dropZoneDragHandler = function(event) {
//     // console.log("Dragover Event Target:", event.target);
//     var taskListEl = event.target.closest(".task-list");
//     if (taskListEl) {
//         event.preventDefault();
//         taskListEl.setAttribute("style", "background: rgba(68, 233, 255, 0.7); border-style: dashed;");
//         console.dir(taskListEl);
//     }

// };

// var dropTaskHandler = function(event) {
//     var id = event.dataTransfer.getData("text/plain");
//     var draggableElement = document.querySelector("[data-task-id='" + id + "']");
//     var dropZoneEl = event.target.closest(".task-list");
//     var statusType = dropZoneEl.id;
//     // set status of task based on dropZone id
//     var statusSelectEl = draggableElement.querySelector("select[name='status-change']");
//     if (statusType === "tasks-to-do") {
//         statusSelectEl.selectedIndex = 0;
//       } 
//       else if (statusType === "tasks-in-progress") {
//         statusSelectEl.selectedIndex = 1;
//       } 
//       else if (statusType === "tasks-completed") {
//         statusSelectEl.selectedIndex = 2;
//       }
//     dropZoneEl.removeAttribute("style");
//     dropZoneEl.appendChild(draggableElement);


//     // loop through tasks array to find and update the updated task's status
//     for (var i = 0; i < tasks.length; i++) {
//         if (tasks[i].id === parseInt(id)) {
//             tasks[i].status = statusSelectEl.value.toLowerCase();
//         }
//     }
//     console.log(tasks);
//     saveTasks();
// };

// var dragLeaveHandler = function(event) {
//     console.dir(event.target);
//     var taskListEl = event.target.closest(".task-list");
//     if (taskListEl) {
//         taskListEl.removeAttribute("style");
//     }
// }

// var saveTasks = function() {
//     localStorage.setItem("tasks", JSON.stringify(tasks));
// }

// var loadTasks = function() {
//     var savedTasks = localStorage.getItem("tasks");
//     // if there are no tasks, set tasks to an empty array and return out of the function
//     if (!savedTasks) {
//       return false;
//     }
//     console.log("Saved tasks found!");
//     // else, load up saved tasks
  
//     // parse into array of objects
//     savedTasks = JSON.parse(savedTasks);
  
//     // loop through savedTasks array
//     for (var i = 0; i < savedTasks.length; i++) {
//       // pass each task object into the `createTaskEl()` function
//       createTaskEl(savedTasks[i]);
//     }
//   };

// formEl.addEventListener("submit", taskFormHandler);

// pageContentEl.addEventListener("click", taskButtonHandler);
// pageContentEl.addEventListener("change", taskStatusChangeHandler);
// pageContentEl.addEventListener("dragstart", dragTaskHandler);
// pageContentEl.addEventListener("dragover", dropZoneDragHandler);
// pageContentEl.addEventListener("drop", dropTaskHandler);
// pageContentEl.addEventListener("dragleave", dragLeaveHandler);

// loadTasks();

var taskIdCounter = 0;

var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var pageContentEl = document.querySelector("#page-content");

// create array to hold tasks for saving
var tasks = [];

var taskFormHandler = function(event) {
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  // check if inputs are empty (validate)
  if (!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the task form!");
    return false;
  }

  // reset form fields for next task to be entered
  document.querySelector("input[name='task-name']").value = "";
  document.querySelector("select[name='task-type']").selectedIndex = 0;

  // check if task is new or one being edited by seeing if it has a data-task-id attribute
  var isEdit = formEl.hasAttribute("data-task-id");

  if (isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
  } else {
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput,
      status: "to do"
    };
    createTaskEl(taskDataObj);
  }
};

var createTaskEl = function(taskDataObj) {
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  listItemEl.setAttribute("data-task-id", taskIdCounter);
  listItemEl.setAttribute("draggable", "true");

  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";
  taskInfoEl.innerHTML =
    "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  listItemEl.appendChild(taskInfoEl);

  var taskActionsEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionsEl);

  switch (taskDataObj.status) {
    case "to do":
      taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 0;
      tasksToDoEl.append(listItemEl);
      break;
    case "in progress":
      taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 1;
      tasksInProgressEl.append(listItemEl);
      break;
    case "completed":
      taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 2;
      tasksCompletedEl.append(listItemEl);
      break;
    default:
      console.log("Something went wrong!");
  }

  // save task as an object with name, type, status, and id properties then push it into tasks array
  taskDataObj.id = taskIdCounter;

  tasks.push(taskDataObj);

  // save tasks to localStorage
  saveTasks();

  // increase task counter for next unique task id
  taskIdCounter++;
};

var createTaskActions = function(taskId) {
  // create container to hold elements
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  // create edit button
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(editButtonEl);
  // create delete button
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(deleteButtonEl);
  // create change status dropdown
  var statusSelectEl = document.createElement("select");
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);
  statusSelectEl.className = "select-status";
  actionContainerEl.appendChild(statusSelectEl);
  // create status options
  var statusChoices = ["To Do", "In Progress", "Completed"];

  for (var i = 0; i < statusChoices.length; i++) {
    // create option element
    var statusOptionEl = document.createElement("option");
    statusOptionEl.setAttribute("value", statusChoices[i]);
    statusOptionEl.textContent = statusChoices[i];

    // append to select
    statusSelectEl.appendChild(statusOptionEl);
  }

  return actionContainerEl;
};

var completeEditTask = function(taskName, taskType, taskId) {
  // find task list item with taskId value
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // set new values
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;

  // loop through tasks array and task object with new content
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].name = taskName;
      tasks[i].type = taskType;
    }
  }

  alert("Task Updated!");

  // save tasks to localStorage
  saveTasks();

  // remove data attribute from form
  formEl.removeAttribute("data-task-id");
  formEl.querySelector("#save-task").textContent = "Add Task";
};

var taskButtonHandler = function(event) {
  // get target element from event
  var targetEl = event.target;

  if (targetEl.matches(".edit-btn")) {
    console.log("edit", targetEl);
    var taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
  } 
  else if (targetEl.matches(".delete-btn")) {
    console.log("delete", targetEl);
    var taskId = targetEl.getAttribute("data-task-id");
    deleteTask(taskId);
  }
};

var taskStatusChangeHandler = function(event) {
  console.log(event.target.value);

  // find task list item based on event.target's data-task-id attribute
  var taskId = event.target.getAttribute("data-task-id");

  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // convert value to lower case
  var statusValue = event.target.value.toLowerCase();

  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  } else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  } else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }

  // update task's in tasks array then save to localStorage for persistence
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].status = statusValue;
    }
  }
  saveTasks();
};

var editTask = function(taskId) {
  console.log(taskId);

  // get task list item element
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // get content from task name and type
  var taskName = taskSelected.querySelector("h3.task-name").textContent;
  console.log(taskName);

  var taskType = taskSelected.querySelector("span.task-type").textContent;
  console.log(taskType);

  // write values of taskName and taskType to form to be edited
  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;

  // set data attribute to the form with a value of the task's id so it knows which one is being edited
  formEl.setAttribute("data-task-id", taskId);
  // update form's button to reflect editing a task rather than creating a new one
  formEl.querySelector("#save-task").textContent = "Save Task";
};

var deleteTask = function(taskId) {
  console.log(taskId);
  // find task list element with taskId value and remove it
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  taskSelected.remove();

  // create new array to hold updated list of tasks
  var updatedTaskArr = [];

  // loop through current tasks
  for (var i = 0; i < tasks.length; i++) {
    // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
    if (tasks[i].id !== parseInt(taskId)) {
      updatedTaskArr.push(tasks[i]);
    }
  }

  // reassign tasks array to be the same as updatedTaskArr
  tasks = updatedTaskArr;

  saveTasks();

  alert("Task deleted!");
};

var dropTaskHandler = function(event) {
  event.preventDefault();
  var id = event.dataTransfer.getData("text/plain");
  var draggableElement = document.querySelector("[data-task-id='" + id + "']");
  var dropZone = event.target.closest(".task-list");
  console.log(dropZone);
  // set status of task based on dropzone id
  var statusSelectEl = draggableElement.querySelector("select[name='status-change']");
  var statusType = dropZone.id;

  // create variable to hold status
  var newStatus;

  switch (statusType) {
    case "tasks-to-do":
      statusSelectEl.selectedIndex = 0;
      break;
    case "tasks-in-progress":
      statusSelectEl.selectedIndex = 1;
      break;
    case "tasks-completed":
      statusSelectEl.selectedIndex = 2;
      break;
    default:
      console.log("Something went wrong!");
  }

  // loop through tasks array to find and update the updated task's status
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(id)) {
      tasks[i].status = statusSelectEl.value.toLowerCase();
    }
  }

  // saveTasks
  saveTasks();

  dropZone.removeAttribute("style");
  dropZone.appendChild(draggableElement);
};

var dropZoneDragHandler = function(event) {
  var taskListEl = event.target.closest(".task-list");
  if (taskListEl) {
    event.preventDefault();
    taskListEl.setAttribute("style", "background: rgba(68, 233, 255, 0.7); border-style: dashed;");
  }
};

var dragTaskHandler = function(event) {
  if (event.target.matches("li.task-item")) {
    var taskId = event.target.getAttribute("data-task-id");
    event.dataTransfer.setData("text/plain", taskId);
  }
};

var dragLeaveHandler = function(event) {
  var taskListEl = event.target.closest(".task-list");

  if (taskListEl) {
    event.target.closest(".task-list").removeAttribute("style");
  }
};

var saveTasks = function() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  console.log("tasks saved");
};

var loadTasks = function() {
  var savedTasks = localStorage.getItem("tasks");
  // if there are no tasks, set tasks to an empty array and return out of the function
  if (!savedTasks) {
    return false;
  }
  console.log("Saved tasks found!");
  // else, load up saved tasks

  // parse into array of objects
  savedTasks = JSON.parse(savedTasks);

  // loop through savedTasks array
  for (var i = 0; i < savedTasks.length; i++) {
    // pass each task object into the `createTaskEl()` function
    createTaskEl(savedTasks[i]);
  }
};

// Create a new task
formEl.addEventListener("submit", taskFormHandler);

// for edit and delete buttons
pageContentEl.addEventListener("click", taskButtonHandler);

// for changing the status
pageContentEl.addEventListener("change", taskStatusChangeHandler);

// for dragging
pageContentEl.addEventListener("dragstart", dragTaskHandler);
pageContentEl.addEventListener("dragover", dropZoneDragHandler);
pageContentEl.addEventListener("dragleave", dragLeaveHandler);
pageContentEl.addEventListener("drop", dropTaskHandler);

loadTasks();
