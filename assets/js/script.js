//to display the current date for top of page
var today = moment();
$("#currentDay").text(today.format("dddd, MMM Do"));

timeBlocks = [
  $("#block-0"),
  $("#block-1"),
  $("#block-2"),
  $("#block-3"),
  $("#block-4"),
  $("#block-5"),
  $("#block-6"),
  $("#block-7"),
  $("#block-8"),
];

//for loop to set color of
for (i = 0; i < timeBlocks.length; i++) {
  //var to check time against. This represents the time for each timeblock
  var currentTime = moment();
  var chkTime = moment()
    .set("hour", 9 + i)
    .set("minute", 0)
    .set("second", 0);
  if (chkTime.hour() == currentTime.hour()) {
    timeBlocks[i].addClass("present");
  } else if (currentTime.isBefore(chkTime)) {
    timeBlocks[i].addClass("future");
  } else {
    timeBlocks[i].addClass("past");
  }
}

// timeBlocks[0].data(
//   "hour",
//   moment().set("hour", 9).set("minute", 0).set("second", 0)
// );

// console.log(timeBlocks[0].data("hour").hour());
