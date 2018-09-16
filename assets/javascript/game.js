// function restart(){
$(".card").hide();
$(".hones").hide();
$("#startPoster").show();
$("#endPoster").hide();
// $("#time").append(seconds);
// }
// restart();



$("#startBtn").on("click", function(){
$(".card").show();
$(".hones").show();
$("#startPoster").hide();
$("#endPoster").hide();
run();
});


var correct = 0;
var wrong = 0;
var unanswered = 0;
var number = 30;
var intervalId;
function run() {
  clearInterval(intervalId);
  intervalId = setInterval(decrement, 1000);
}

function decrement() {
  number--;
  $("#timer").html(number);
  if (number === 0){
    console.log("time is up");
    $(".card").hide();
    $(".hones").hide();
    $("#endPoster").show();
    $("#timer").hide();
}
}

$(".right").on("click", function(){
correct++;
console.log(correct);
});