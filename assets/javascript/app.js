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
        image: '<img src="./assets/images/mandms.jpg" width="200px" alt="q1 image">',
        answer: "The nation's top selling candy is M&M's.",
        factoid: "Fun fact: The rock band Van Halen had it written into their contract that if members saw brown M&M's anywhere in the area, they would cancel their show.",
    },
    {question: "How big was the diameter of the world's largest pizza?",
        answerA: '20 feet',
        answerB: '60 feet',
        answerC: '100 feet',
        answerD: '140 feet',
        correct:'D',
        image: '<img src="./assets/images/pizza.jpeg" width="200px" alt="q1 image">',
        answer: " The biggest pizza was 140' in diameter!",
    },
    {question: "Approximately how many licks does it take to reach the center of a Tootsie Roll Pop?",
        answerA: '57 licks',
        answerB: '89 licks',
        answerC: '142 licks',
        answerD: '217 licks',
        correct:'C',
        image: '<img src="./assets/images/tootsierollpop.jpg" width="200px" alt="q1 image">',
        answer: "Approximately 142 licks to get to the center of a Tootsie Roll Pop",
    },
    {question: "How many pounds of honey does a honey bee consume for each pound of wax it produces?",
        answerA: '1 pound',
        answerB: '3 pounds',
        answerC: '5 pounds',
        answerD: '7 pounds',
        correct:'C',
        image: '<img src="./assets/images/bee.jpg" width="200px" alt="q1 image">',
        answer: "A honey bee consumes 7lb of honey for every lb of wax it produces",
    },       
    {question: "Which dog breed is not in the top 5 American Kennel Club dog breeds?",
        answerA: 'Poodle',
        answerB: 'German Shepherd',
        answerC: 'Golden Retriever',
        answerD: 'Laborador Retriever',
        correct:'A',
        image: '<img src="./assets/images/.jpg" width="200px" alt="q1 image">',
        answer: "The top 5 breeds:  1.Lab Retriever, 2.German Shepherd, 3.Golden Retriever, 4.Bull Dog, 5.Beagle",
    }                
    ];


var intervalId=0;
var clockRunning=false;
var right=0, wrong=0;
var result="";
var QQ=0;


//  -------Get ready ---------------------
function startGame () {
//clear timer, clear var's
    clearInterval.intervalId;
    clockRunning=false;
    result="";
    QQ=0,
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
    //QQ= Math.floor(Math.random()*3); use if displaying questions randomly
    
    console.log(QQ);
    //var qNum = randNum.toString;
    //var QQ ='q'+ randNum;
    //console.log(QQ);
    console.log(trivia[QQ].question);
    $('#question').html('<p>' + trivia[QQ].question + '<ul><li class="guess" value="A">' + trivia[QQ].answerA + '</li><li class="guess" value="B">' + trivia[QQ].answerB + '</li><li class="guess" value="C">'+ trivia[QQ].answerC + '</li><li class="guess" value="D">'+ trivia[QQ].answerD + '</li></ul></p>');
    $('#answer').html("");
    $('#timer').html("");

    gameTimer.start();
}
//  game timer obj: 30 sec countdown timer-----------------  
var gameTimer = {
    time: 10,
    //increment timer 
    count: function(){
        gameTimer.time--;
        $('#timer').html('You have ' + gameTimer.time + ' seconds left');
    },
    start: function() {
        if(!clockRunning){
        intervalId=setInterval(gameTimer.count, 1000);
        clockRunning = true;
        }
    },
    stop: function(){
        if (gameTimer.time===0) {
            clearInterval('intervalId: ' + intervalId);
            console.log(intervalId);
            clockRunning = false;
            wrong++;
            result="Time's Up!  The correct answer is " + trivia[QQ].correct;
            
            endRound();
        }
    }
};  //End of timer function----------------------------------

$('#question').on('click',".guess", function(){

    //  listen for keyup 
    
//$('.guess').on('click', function(){
    //  is answer right? -- WIN
    if($(this).attr("value") === trivia[QQ].correct){
        right++;
        result='Right!  The correct answer is ' + trivia[QQ].correct;
        clearInterval(intervalId);
    }
    //  if not -- LOSE
    else {
        wrong++;
        result='Wrong. The correct answer is ' + trivia[QQ].correct;
        clearInterval(intervalId);
    }
    endRound();
});
 



function endRound(){
    console.log('right:' + right + 'wrong:' + wrong);
    // display result/right answer
     $('#question').html('<p>' + result + '</p><p>' + trivia[QQ].answer + '</p>');
    // display updated score
     $('#answer').html('<p>Score:  Right= ' + right + ' Wrong= ' + wrong + '</p>');
     $('#timer').html(trivia[QQ].image);
     
     console.log(QQ);

     // Next Question
    if (QQ < trivia.length) {
        QQ++;
        console.log(QQ);
        setTimeout(postTrivia, 1000 * 3);
    };

    if (QQ===trivia.length) {
//   ask play again?
        $('#timer').html("<p>Ready for MORE Fun Facts?</p> <button id='yesready' type='button' class='btn btn-primary'>Yes!</button>");
        startGame();
    }
}


startGame();


})


 