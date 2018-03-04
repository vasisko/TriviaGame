// Trivia Game 


$(document).ready(function() {
/// Monday; figure out how to reference each question in trivia obj!!!!

// declare var's
var trivia = [
    {question: "What is the nation's top selling candy?",
        answerA: "Reeses",
        answerB: "M & M's",
        answerC: "Snickers",
        answerD: "Hershey Bar",
        correct: "B",
        image: '<img src="./assets/images/mandms.jpg" width="286px" alt="M&Ms image">',
        answer: "The nation's top selling candy is M&M's.",
    },
    {question: "How big was the diameter of the world's largest pizza?",
        answerA: '20 feet',
        answerB: '60 feet',
        answerC: '100 feet',
        answerD: '140 feet',
        correct:'D',
        image: '<img src="./assets/images/pizza.jpeg" width="286px" alt="pizza image">',
        answer: " The biggest pizza was 140' in diameter!",
    },
    {question: "Approximately how many licks does it take to reach the center of a Tootsie Roll Pop?",
        answerA: '57 licks',
        answerB: '89 licks',
        answerC: '142 licks',
        answerD: '217 licks',
        correct:'C',
        image: '<img src="./assets/images/tootsierollpop.jpg" width="286px" alt="Tootsie Roll Pop image">',
        answer: "Approximately 142 licks to get to the center of a Tootsie Roll Pop",
    },
    {question: "How many pounds of honey does a honey bee consume for each pound of wax it produces?",
        answerA: '1 pound',
        answerB: '3 pounds',
        answerC: '5 pounds',
        answerD: '7 pounds',
        correct:'D',
        image: '<img src="./assets/images/honeybee.jpg" width="286px" alt="q1 image">',
        answer: "A honey bee consumes 7lb of honey for every lb of wax it produces",
    },       
    {question: "Which dog breed is not in the top 5 American Kennel Club dog breeds?",
        answerA: 'Poodle',
        answerB: 'German Shepherd',
        answerC: 'Golden Retriever',
        answerD: 'Laborador Retriever',
        correct:'A',
        image: '<img src="./assets/images/dogs.jpg" width="286px" alt="q1 image">',
        answer: "The top 5 breeds:  1.Lab Retriever, 2.German Shepherd, 3.Golden Retriever, 4.Bull Dog, 5.Beagle",
    }                
    ];


var intervalId=0;
var pauseIt=0;
var clockRunning=false;
var right=0, wrong=0;
var result="";
var QQ=0;


//-------Get ready ---------------------
function startGame () {
    //clear timer, clear var's
    clearInterval(intervalId);
    clockRunning=false;
    result="";
    QQ=0,
    // clear score 
    right=0, wrong=0;

    // Is player ready to start?
    $('button').on('click', function(){
        if ($('#yesready')) {
        //Start Game;
        postTrivia();
        }
    });
}//---------------------------------------

//-------- Play! -------------------------
//  Reveal question and answer choices, start timer 
function postTrivia() {
   // clearTimeout(pauseIt);
        clearInterval(intervalId);
        clockRunning = false;
    // post question
    $('#question').html('<p class="card-text">' + trivia[QQ].question + '</p>');

    //post answers
    $('#answers').html('<li class="list-group-item guess" value="A">' + trivia[QQ].answerA + '</li><li class="list-group-item guess" value="B">' + trivia[QQ].answerB + '</li><li class=list-group-item guess" value="C">'+ trivia[QQ].answerC + '</li><li class="list-group-item guess" value="D">'+ trivia[QQ].answerD + '</li>');

   

    gameTimer.start();
}//---------------------------------------

//  game timer obj: 10 sec countdown timer-----------------  
var gameTimer = {
    time: 10,
    //increment timer 
    count: function(){
        $('#timer').html('<p class="card-text">You have ' + gameTimer.time + ' seconds left</p>');
        if( gameTimer.time===0){
            gameTimer.stop();
        }
        else { gameTimer.time--;}
    },
    // start clock running
    start: function() {
        if(!clockRunning){
        intervalId = setInterval(gameTimer.count,1000);
        clockRunning = true;
        }
    },
    //stop timer when interval is up
    stop: function(){
            clearInterval(intervalId);
            clockRunning = false;
            wrong++;
            result="Time's Up!  The correct answer is " + trivia[QQ].correct; 
            gameTimer.time=10;  
            endRound();
    }
};  //End of timer function----------------------------------

//  listen for player guess
$('#answers').on('click',".guess", function(){

        //stop timer/reset interval to 10 sec
        clearInterval(intervalId);
        clockRunning = false;
        gameTimer.time=10;

    //  is answer right? -- WIN
    if($(this).attr("value") === trivia[QQ].correct){
        right++;
        result='Right!  The correct answer is ' + trivia[QQ].correct;
    }
    //  if not -- LOSE
    else {
        wrong++;
        result='Wrong. The correct answer is ' + trivia[QQ].correct;
    }
    // round is over
    endRound();
});

function endRound(){

    // display result/right answer
     $('#question').html('<p class="card-text">' + result + '</p><p class="card-text">' + trivia[QQ].answer + '</p><p class="card-text">Score:  Right= ' + right + ' Wrong= ' + wrong + '</p>');
    // display updated score
     $('#answers').empty();
     $('#timer').html(trivia[QQ].image);
     pauseIt = setTimeout(playMore, 1000*3);    
}

function playMore(){
     clearTimeout(pauseIt);
     if (QQ < trivia.length-1) {
        QQ++;
    // Next Question
        postTrivia();
     
    }
    else if (QQ===trivia.length-1) {
    //   ask: play again?
        $('#timer').empty();
        $('#answer').empty();
        $('#question').html('<p class="card-text">Ready for MORE Fun Facts?</p> <button id="yesready" type="button" class="btn btn-primary">Yes!</button>');
       
        startGame();
    }
}

startGame();

});


 