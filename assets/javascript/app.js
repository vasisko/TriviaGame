// Trivia Game 


$(document).ready(function() {
/// Monday; figure out how to reference each question in trivia obj!!!!

// declare var's
var trivia = [
    {question: 'question 1 blah blah blah',
        answerA: 'answer A text here',
        answerB: 'answer B text here',
        answerC: 'answer C text here',
        answerD: 'answer D text here',
        correct: 'C',
        image: '<img src="./assets/images/q1.gif" alt="q1 image"> '
    },
    {question: 'question 2 blah blah blah',
        answerA: 'answer A text here',
        answerB: 'answer B text here',
        answerC: 'answer C text here',
        answerD: 'answer D text here',
        correct:'A'
        },
    {question: 'question 3 blah blah blah',
        answerA: 'answer A text here',
        answerB: 'answer B text here',
        answerC: 'answer C text here',
        answerD: 'answer D text here',
        correct:'B'
        }          
    ];


var intervalId=0;
var clockRunning=false;
var right=0, wrong=0;
var result="";
var QQ;


//  -------Get ready ---------------------
function startGame () {
//clear timer, clear var's
    clearInterval.intervalId;
    clockRunning=false;
    result="";
    // Is player ready to start?
    $('button').on('click', function(){
        if ($('#yesready')) {
        //startGame();
        postTrivia();
        }
    });
}


//------- Play! --------
//  Reveal question and answer choices, start timer 
function postTrivia() {
    QQ= Math.floor(Math.random()*3);
    console.log(QQ);
    //var qNum = randNum.toString;
    //var QQ ='q'+ randNum;
    //console.log(QQ);
    console.log(trivia[QQ].question);
    $('#question').html('<p>' + trivia[QQ].question + '<ul><li class="guess" value="A">' + trivia[QQ].answerA + '</li><li class="guess" value="B">' + trivia[QQ].answerB + '</li><li class="guess" value="C">'+ trivia[QQ].answerC + '</li><li class="guess" value="D">'+ trivia[QQ].answerD + '</li></ul></p>');
    gameTimer.start();
}
//  game timer obj: 30 sec countdown timer-----------------  
var gameTimer = {
    time: 30,
    //increment timer 
    count: function(){
        gameTimer.time--;
        $('#timer').html('You have ' + gameTimer.time + ' seconds left');
    },
    start: function() {
        if(!clockRunning){
        intervalId=setInterval(gameTimer.count, 1000);
        }
    },
    stop: function(){
        if (gameTimer.time===0) {
            wrong++;
            result="Time's Up!  The correct answer is " + trivia[QQ].correct;
            endRound();
        }
    }
};  //End of timer function----------------------------------

$('#question').on('click',".guess", function(){

    //  listen for keyup 
    
    console.log(trivia[QQ]);
//$('.guess').on('click', function(){
    //  is answer right? -- WIN
    if($(this).attr("value") === trivia[QQ].correct){
        right++;
        result='Right!  The correct answer is ' + trivia[QQ].correct;
        clearInterval(intervalId);;
    }
    //  if not -- LOSE
    else {
        wrong++;
        result='The correct answer is ' + trivia[QQ].correct;
        clearInterval(intervalId);;
    }
    endRound();
});
 



function endRound(){
    console.log('right:' + right + 'wrong:' + wrong);
    // display result/right answer
     $('#question').html('<p>' + result + '</p>');
    // display updated score
     $('#answerChoices').html('<p>Score:  Right= ' + right + ' Wrong= ' + wrong + '</p>');
    // ask play again?
    $('#timer').html("<p>Ready for MORE Fun Facts?</p> <button id='yesready' type='button' class='btn btn-primary'>Yes!</button>");
    startGame();
}



startGame();


})


 