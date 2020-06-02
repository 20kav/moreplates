

var chest =  ["Barbell Bench Press", "Incline Barbell Bench Press", "Decline Barbell Bench Press",
"Bench Dumbbell Press",
"Incline Dumbbell Bench Press", "Decline Dumbbell Bench Press",
"Machine Chest Press", "Weighted Dips", "Landmine Press", "Weighted Pushup", "Barbell Close-Grip Bench Press",
"Dumbbell Pullovers", "Smith Machine Bench Press", "Dumbbell Flyes", "Decline Dumbell Flyes", "Incline Dumbbell Flyes", "Cable Crossovers", "Cable Iron Cross", "Pushups", "Cable Chest Press"];
var arms =  ["Dumbbell Bicep Curl", "Barbell Preacher Curl", "Cable Tricep Extension", "Skull Crusher", "Cable Bicep Curl", "Single Arm Overhead Tricep Extension", "Dumbbell Hammer Curls"];

var back =  ["Conventional Deadlift", "Sumo Deadlift", "Barbell Row", "Pullup", "Lat Pulldown", "Cable Row", "Dumbbell Row", "Wide-grip Pullups", "Chinups", "Weighted Pullups", "Romanian Deadlift"];
var shoulders =  ["Dumbbell Lateral Raise", "Upright Row", "Front Raise", "Overhead Press", "Push Press", "Military Press", "Seated Dumbbell Shoulder Press"];
var cardio =  ["Running", "Basketball", "Swimming", "Jogging", "Hiking", "Soccer", "Rowing", "Boxing"];
var legs =  ["Bulgarian Split Squats", "Front Squat", "Back Squat", "Hack Squat", "Leg Extension", "Leg Curls", "Leg Press", "Calf Press", "Box Squats"];
var compounds =  ["Deadlift", "Squat", "Clean-and-Jerk", "Bench Press"];
var access =  ["Trap Shrugs", "Calf Raise", "Wrist Curls", "Reverse Curls", "Plate Pinches"];
var all = chest.concat(arms, back, shoulders, legs, compounds, access, cardio);


var categories = {
  chest: chest,
  arms: arms,
  back: back,
  shoulders: shoulders,
  legs: legs,
  compounds: compounds,
  access: access,
  cardio: cardio,
  all: all
};

//change day tabs on clicked
//hide OR box and ADD exercise on start


$(".starthidden").hide();
$("#daytabs a").click(() => {
  $(".starthidden").show();
  $(".hideonstart").hide();

  $("#daytabs li").removeClass("is-active");
  $(event.target).parent().addClass("is-active");

  switchDayPanel();

});

//create current day panel
//add elements for panel, hides other day tables.
$(".panel.dayPanel").hide();
$(".RESTbox").hide();
function switchDayPanel() {
  var currentTab = $(".is-active a").attr("id");
  var days =  ["day1", "day2", "day3", "day4", "day5", "day6", "day7"];
  for (day in days) {

    var period = ".";
    var selectionStringTab = period.concat(days[day], ".panel", ".dayPanel");
    var selectionStringREST = period.concat(days[day], ".RESTbox");
  if (currentTab != days[day]) {

      $(selectionStringTab).hide();
      $(selectionStringREST).hide();

    }
    else {
      $(selectionStringTab).show();
      $(selectionStringREST).show();
    }
  }

}


//add workouts to exercise panel from clicked category
$("#exerciseTabs a").click(() => {

  var current_cat = categories[event.target.id];
  $(".workoutList").empty();
  for (exercise in current_cat) {
    var exerciseToAdd = document.createElement("a");
    exerciseToAdd.appendChild(document.createTextNode(current_cat[exercise]));
    exerciseToAdd.setAttribute("class", "panel-block");
    $(".workoutList").append(exerciseToAdd);
  }
});


//search exercise panel

  $('.search').change(function() {
    var query = $('.search').val().toLowerCase();
    console.log(query);
    var workoutList = $(".workoutList").children();
    for (var i=0; i<workoutList.length; i++) {
      console.log(workoutList[i].text);
      if ((workoutList[i].text).toLowerCase().includes(query) == false) {
        $(".workoutList").children('a').eq(i).hide();
      } else {
        $(".workoutList").children('a').eq(i).show();
      }
    }
});






//add exercises to table
$(".workoutList").on("click", (event) => addToTable(event));


$(".restcheck").change( () => {
  $(".dayPanel").hide();
  if ($('.restcheck').is(':checked') != true) {
    $(".dayPanel").show();
  } else {
    var currentTab = $(".is-active a").attr("id");
    var selectionString = ".".concat(currentTab, ".workoutTable");
    $(selectionString).addClass("rest");
    console.log($(selectionString));

  }

});

function addToTable(event) {


  var currentTab = $(".is-active a").attr("id");
  var exercise_name = $(event.target).text();

  if (cardio.includes(exercise_name)) {
    console.log("ra");
    var row = document.createElement("tr");


    //create exercise part of row
    var row_exercise = document.createElement("th");
    row_exercise.appendChild(document.createTextNode(exercise_name));
    row_exercise.setAttribute("style", "font-weight: bold;");
    row_exercise.setAttribute("colspan", "1");


    //create rest of row components
    var row_enterable = document.createElement("input");
    row_enterable.setAttribute("class", "enterNums");
    row_enterable.setAttribute("class", "input");
    row_enterable.setAttribute("type", "text");
    row_enterable.style.width = "300px";
    row_enterable.style.height = "30px";

    var row_long = document.createElement("th");
    row_long.setAttribute("colspan", "3");
    row_long.appendChild(row_enterable);
    var row_remove = document.createElement("td");
    row_remove.setAttribute("class", "rowRemoveCell");
    var row_remove_button = document.createElement("button");
    row_remove_button.setAttribute("class", "button is-danger is-small removeRow");
    row_remove_button.appendChild(document.createTextNode("X"));


    row_remove.appendChild(row_remove_button);


    //add row components to row
    row.appendChild(row_exercise);

    row.appendChild(row_long)
    row.appendChild(row_remove);
    var selectionString = ".".concat(currentTab, ".workoutTable");
    $(selectionString).append(row);
  }
  else {

  var row = document.createElement("tr");
  row.style.height = "7px";

  //create exercise part of row
  var row_exercise = document.createElement("td");
  row_exercise.appendChild(document.createTextNode(exercise_name));
  row_exercise.setAttribute("style", "font-weight: bold;");

  //create rest of row components
  var row_enterable = document.createElement("input");
  row_enterable.setAttribute("class", "enterNums");
  row_enterable.setAttribute("class", "input");
  row_enterable.setAttribute("type", "text");
  row_enterable.style.width = "70px";
  row_enterable.style.height = "30px";

  var row_sets = document.createElement("td");

  row_sets.appendChild(row_enterable);
  var row_remove = document.createElement("td");
  row_remove.setAttribute("class", "rowRemoveCell");
  var row_remove_button = document.createElement("button");
  row_remove_button.setAttribute("class", "button is-danger is-small removeRow");
  row_remove_button.appendChild(document.createTextNode("X"));


  row_remove.appendChild(row_remove_button);


  //add row components to row
  row.appendChild(row_exercise);

  row.appendChild(row_sets);
  row.appendChild(row_sets.cloneNode(true));
  row.appendChild(row_sets.cloneNode(true));
  row.appendChild(row_remove);
  var selectionString = ".".concat(currentTab, ".workoutTable");
  $(selectionString).append(row);
}

}

$('tbody').sortable();

//delete row when needed

$(".workoutTable").on("click", "button", (event) => {
  $(event.target).parent().parent().remove();

});









//Create new combined table page

$(".viewplan").on("click", (event) => makeFinalTable(event));

function makeFinalTable(event) {
  //clear the screen
  $(".createplan.is-active").removeClass("is-active");
  $(".viewplan").addClass("is-active");
  $(".blockmargins.box").children().hide();

  //make table

  var finalTable = document.createElement("table");
  finalTable.setAttribute("class", "table is-fullwidth is-hoverable is-bordered finaltable is-striped");
  var col1 = document.createElement("col");
  col1.setAttribute("style", "width:70%");
  var col2 = col1.cloneNode();
  col2.setAttribute("style", "width:10%");

  var col3 = col2.cloneNode();
  var col4 = col2.cloneNode();
finalTable.appendChild(col1);
  finalTable.appendChild(col2);
  finalTable.appendChild(col3);
  finalTable.appendChild(col4);

  var days =  ["day1", "day2", "day3", "day4", "day5", "day6", "day7"];
  for (day in days) {
    //add day heading
    var tableDayRow = document.createElement("tr");
    $(tableDayRow).css("background-color", "#767676");
    var tableDayTitle = document.createElement("th");
    tableDayTitle.setAttribute("colspan", "4");
    tableDayTitle.setAttribute("style", "text-align:center");

    var slice1 = days[day].slice(0,3);
    var slice2 = days[day].slice(3);
    var comb = slice1.concat(" ", slice2).toUpperCase();
    console.log(comb);

    tableDayTitle.appendChild(document.createTextNode(comb));

    tableDayRow.appendChild(tableDayTitle);
    finalTable.appendChild(tableDayRow);




    //add content from create plan day tables
    var period = ".";
    var selectionString = "";
    selectionString = period.concat(days[day], ".workoutTable");
    $(selectionString).show();
    $(".rowRemoveCell").remove();

    console.log($(selectionString));

    if ($(selectionString).hasClass("rest")) {
      var rest_notes = period.concat(days[day], ".textarea");
      $(rest_notes).css("width", "100%");
      $(rest_notes).css("height", "40px");
      $(selectionString).append($(rest_notes));
    }

    $(finalTable).append($(selectionString));



    $(".enterNums").addClass("clear-input");
    $(".enterNums").removeClass("input");

    $(".blockmargins.box").append(finalTable);




  }
  var print_button = document.createElement("button");
  print_button.setAttribute("class", "button is-link is-small");
  print_button.append(document.createTextNode("Print Sheet"));
  var toPrint = $(".blockmargins.box").not(".button")
  $(print_button).click(() => $(toPrint).printThis());
  var download_button = document.createElement("button");
  download_button.setAttribute("class", "button is-link is-small");
  download_button.append(document.createTextNode("Download as CSV"));
  $(download_button).click(() => $(finalTable).table2csv());
  $(".blockmargins.box").append(print_button);
  $(".blockmargins.box").append(download_button);

}
