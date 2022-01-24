// score storage
// window.localStorage.clear()
var storage = window.localStorage
// console.log(storage)
if(!storage.scores){
    // if first time loading page
    window.localStorage.setItem('scores', JSON.stringify([]))
}
var scores = JSON.parse(storage.scores)

var timer;
var time = 60

var quiz = [
    
    {
        question: 'Which of the following is not a javascript comment symbol',
        options: ['/*', '/', '//'],
        answer: '/',
        correct: null,
        point: 10
    },
    {
        question: 'What attribute will .querySelector access?',
        options: ['id', 'class'],
        answer: 'class',
        correct: null,
        point: 10
    },
    {
        question: 'Given a variable <i>var foo = "michael"</i> in the global scope, which is the correct way to reassign it?',
        options: [`var foo = 'alex'`, `var alex = 'alex'`, `foo = 'alex'`, `foo.alex = 'alex'`],
        answer: `foo = 'alex'`,
        correct: null,
        point: 15
    },
    {
        question: 'What is the result of <i>typeOf {name: "michael"}</i>?',
        options: ['null', 'string', 'object'],
        answer: 'object',
        correct: null,
        point: 10
    },
    {
        question: 'Which of the following === 3?',
        options: [`3 - 1`, `2 + 1`, `'2' + 1`],
        answer: `2 + 1`,
        correct: null,
        point: 10
    },
    {
        question: 'Which of the following will stop a setInterval() function named "timer"?',
        options: [`timer.stop()`, `clearInterval(timer)`, `timer.setInterval()`, `timer.clearInterval()`],
        answer: `clearInterval(timer)`,
        correct: null,
        point: 15
    },
    {
        question: 'Which of the following === "michael34"?',
        options: [`michael,3,4`, `'michael','3',`, `'michael' + '3' + '4'`],
        answer: `'michael' + '3' + '4'`,
        correct: null,
        point: 10
    },
]
let container = document.querySelector('.container')

function question(index){
    // given index, grab question element from quiz array and populate items into divs

    $("#choices").html('');
    $("#nav").html('');
    if(index < 0){
        $("#question").html('');
        
    } else {
        $("#question").html(`<h2>${quiz[index].question}<h2`);

        for (var i = 0; i < quiz[index].options.length; i++) {
            // New <li> elements are created here and added to the <ul> element.
            $('#choices').append(`<li data="${quiz[index].options[i]}"><input type="button" data="${quiz[index].options[i]}" class="signout_btn" value="${quiz[index].options[i]}" id=${quiz[index].options[i]}></li>`);
        }   
        // navigation
        if(index === 0){
            $('#nav').append(`<button id="next">Next</button>`)

        } else if(index < (quiz.length - 1)){
            $('#nav').append(`<button id="back">Back</button>`)
            $('#nav').append(`<button id="next">Next</button>`)
        } 
        else if(index = (quiz.length - 1)){
            $('#nav').append(`<button id="back">Back</button>`)
            $('#nav').append(`<button id="finish">Finish</button>`)
        }
    }
}


const btnclick = document.querySelector('.container');

btnclick.addEventListener('click', function (event) {
    if(event.target.getAttribute("id") === 'start'){

    } else {
        var response = event.target.getAttribute("data")
        // $(event.target).css({"color": "red"});
        console.log(response, quiz[counter].answer)
        if(response === quiz[counter].answer){
            quiz[counter].correct = true
        } else {
            quiz[counter].correct = false
            
        }
    }


});

const navClick = document.querySelector('.nav');
var counter = 0
navClick.addEventListener('click', function (event) {
    if(event.target.getAttribute('id') === 'next'){
        if(quiz[counter].correct === false){
            time = time - 10
            if(time > 0){
                $('#msg').html(`Incorrect answer. 10 seconds deducted!`)
            }
            setTimeout(()=>{
                $('#msg').html(``)
            }, 2000)
        }
        counter++

        
        question(counter)
    } else if (event.target.getAttribute('id') === 'back'){
        counter--
        question(counter)
    } else if (event.target.getAttribute('id') === 'finish'){
        endState()
    }


});

function endState(){
    $("#choices").html('');
    $("#nav").html('');
    clearInterval(timer)
    if (time <= 0){
        $('#timer').html(`Timer expired. Quiz incomplete!`)
    } else {
        $('#timer').html(`Quiz completed in: ${60 - time} seconds`)
    }
    
    // calculate the score
    // apply score to user object
    for(i=0;i<quiz.length;i++){
        if(quiz[i].correct === true){
            user.score = user.score + quiz[i].point
        }
    } 
    $("#question").html(`<h2>Your final Score: ${user.score}</h2><p><p>Top Scores:`);
    // push user object into scores array, then run sortScores
    scores.push(user)
    sortScores()
}
// start button
var user = {
    name: null,
    score: 0
}

$('#start').click(function(event){
    var username = document.getElementById('name').value
    user.name = username
    var starting = document.querySelector('.starting')
    starting.innerHTML = ''
    var naming = document.querySelector('.starting')
    naming.innerHTML = ''
    $('#timer').html(`Time left: ${time} seconds`)
    timer = setInterval(function(){
        if(time <= 0){
            endState()
        } else {
            time--
            $('#timer').html(`Time left: ${time} seconds`)    
        }

    }, 1000)
    question(0)
})

function sortScores(){
    // sort them descending according to score
    scores.sort((firstItem, secondItem) => secondItem.score - firstItem.score);
    // results
    // store scores in window
    window.localStorage.setItem('scores', JSON.stringify(scores))
    // iterate:
    for(i=0; i<scores.length; i++){
        var pos = i + 1
        $('#scoreList').append(`<li>${pos + '. ' + scores[i].name + ': ' +  scores[i].score} Points</li>`);
    }


}