//to display the current date for top of page
var today = moment();
$("#currentDay").text(today.format("dddd, MMM Do"));
//set array of timeeblock elements

container = $(".container");

var taskUpdates;
var update;
var selectedBlock;
var tasks = [];
console.log(tasks);

//An array of the timeblocks second element for user inputs
timeBlocks = [
  $("#block-0 div:nth-child(2)"),
  $("#block-1 div:nth-child(2)"),
  $("#block-2 div:nth-child(2)"),
  $("#block-3 div:nth-child(2)"),
  $("#block-4 div:nth-child(2)"),
  $("#block-5 div:nth-child(2)"),
  $("#block-6 div:nth-child(2)"),
  $("#block-7 div:nth-child(2)"),
  $("#block-8 div:nth-child(2)"),
];

init();
//funtion to intitalise page with previously saved tasks on
function init() {
  //get tasks from local storage
  tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks !== null) {
    //     //     //set this to the pages task array
    //     // for loop to go thorugh taks array if the timeblocks match then write tasks from stroage to element
    for (i = 0; i < tasks.length; i++) {
      var currentTimeBlock = tasks[i].timeBlock;
      console.log(currentTimeBlock);
      var currentTasks = tasks[i].taskUpdate;
      console.log(currentTasks);

      for (j = 0; j < timeBlocks.length; j++) {
        if (currentTimeBlock == timeBlocks[j].attr("data-timeBlock")) {
          timeBlocks[j].text(currentTasks);
        }
        // console.log(timeBlocks[i].attr("data-timeBlock"));
      }
    }
  } else {
    tasks = [];
  }
}

function saveChanges(event) {
  var event = $(event.target);

  if (event.is("button, i")) {
    selectedBlock = event.attr("data-timeBlock");
    for (i = 0; i < timeBlocks.length; i++) {
      if (timeBlocks[i].attr("data-timeBlock") == selectedBlock) {
        taskUpdates = timeBlocks[i].text();
        update = { timeBlock: selectedBlock, taskUpdate: taskUpdates };
        // console.log(update);
        // console.log(tasks);
        // if the tasks is not empty
        if (tasks.length !== 0) {
          // remove previous updates to prevent duplications of updates in tasks array
          for (i = 0; i < tasks.length; i++) {
            if (tasks[i].timeBlock == selectedBlock) {
              //remove the previously saved task
              tasks.splice(i, 1);
            }
          }
        }
        console.log(tasks);
        tasks.push(update);
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }
    }
  }
}
container.on("click", saveChanges);

// for loop to set color of timeblocks
for (i = 0; i < timeBlocks.length; i++) {
  //var to check time against. This represents the time for each timeblock
  var currentTime = moment();
  //sets time block time to todays date
  var chkTime = moment()
    .set("hour", 9 + i)
    .set("minute", 0)
    .set("second", 0);
  //adds correct class  to time blocks according to the current time
  if (chkTime.hour() == currentTime.hour()) {
    timeBlocks[i].addClass("present");
  } else if (currentTime.isBefore(chkTime)) {
    timeBlocks[i].addClass("future");
  } else {
    timeBlocks[i].addClass("past");
  }
}

//create an initialise function to reset the tasks array
//if new day remove the prev taks from local storage
//otherwise write the taks to the page

//create an array to store tasks in along with which data attr they belong to
//on a click event remove the object that has the matching attr maybe for loop
//add the new object to the arrayf ror tasks
// write the arrya to local storage

//   // push the update to to the tasks array

//   // store the updated array to local storage
