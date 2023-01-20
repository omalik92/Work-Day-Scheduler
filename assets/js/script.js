//to display the current date for top of page
var today = moment();
$("#currentDay").text(today.format("dddd, MMM Do"));

container = $(".container");
//initialising variables in global scope
var taskUpdates;
var update;
var selectedBlock;
var tasks = [];
// console.log(tasks);

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
//function call for initialising page on refresh
init();
//funtion to intitalise page with previously saved tasks on refresh
function init() {
  //get tasks from local storage
  tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks !== null) {
    //for loop to go thorugh taks array from storage, if the timeblocks data attr match then write tasks from stroage to element
    for (i = 0; i < tasks.length; i++) {
      var currentTimeBlock = tasks[i].timeBlock;
      // console.log(currentTimeBlock);
      var currentTasks = tasks[i].taskUpdate;
      // console.log(currentTasks);

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
//function to save changes on click of save button
function saveChanges(event) {
  var event = $(event.target);
  // if either a button or icont is clicked the get the data attr.
  if (event.is("button, i")) {
    selectedBlock = event.attr("data-timeBlock");
    //for loop to go through timeBlocks array to find matching dat attr for button clicked and get the text input for the tasks.
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
              //remove the previously saved task using splice
              tasks.splice(i, 1);
            }
          }
        }
        // console.log(tasks);
        //push the new update to the tasks array then store the taks array in local storage
        tasks.push(update);
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }
    }
  }
}
//adding event listener to the container div containing all the buttons
container.on("click", saveChanges);

// for loop to set color of timeblocks
for (i = 0; i < timeBlocks.length; i++) {
  //var containing the current time
  var currentTime = moment();
  //var that sets time of each time block. e.g. 9,10,11,12,122
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
