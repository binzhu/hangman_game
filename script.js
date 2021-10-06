
var randomNounapi = "https://random-word-form.herokuapp.com/random/noun?count=10";
var randomapi = "https://random-word-api.herokuapp.com/word?number=10&swear=0";
var randomAnimalapi = "https://random-word-form.herokuapp.com/random/animal?count=10";

var timerEl = document.getElementById("timer");
var scoreWinEl = document.getElementById("win");
var scoreLossEl = document.getElementById("loss");
var resetBtnEl = document.getElementById("resetBtn");

var activeTimer;
var activeWord;
var activeWordPlaceHolder;
var charRemaining;
var activeGameResult;

var win = 0;
var loss = 0;

async function startGame(){
  var words = [];
  await fetch(randomAnimalapi, 			{
          method: 'get'
      })
      .then(response => response.json())
      .then(jsonData => {words = jsonData})

  //console.log(words);
  timerEl.textContent = "Gamte started..";
  if(activeTimer) {
  	clearInterval(activeTimer);
  }
  activeWord =randomPickFromArray(words);
  //activeWord = "abc cnd";
  //for showing character
  activeWordPlaceHolder = activeWord;
  
  charRemaining = activeWord.length;
  console.log(activeWord);
  createBlankFromWord(activeWord);
  activeTimer = startTimer(30);
  
  document.onkeydown = trackKeyAgainstWord;
}

function randomPickFromArray(holdingArray){
	var length = holdingArray.length;
 
  var randomIndex = Math.floor(Math.random() * length);
  
  return holdingArray[randomIndex];
}

function createBlankFromWord(word) {
	const letterbox = document.querySelector("#letterbox")
  letterbox.innerHTML = '';
	for(let i = 0; i< word.length; i++) {
  	var el = document.createElement("div");
    if(activeWord[i] !== ' ') {
      el.textContent="*";
      el.style.borderBottom  = "solid";
      letterbox.appendChild(el);
    } else {
      el.textContent="_";
      letterbox.appendChild(el);
    }
  }
}

function startTimer(seconds){
	let remaining = seconds;
  var countDown = setInterval(function(){
  	timerEl.textContent = "Time remaining: " + remaining;
  	remaining --;
    
    if(remaining === 0) {
    	clearInterval(countDown);
      timerEl.textContent = "Time up, you lost ";
      updateScore(false);
			stopGame();

    }
  }, 1000);
  
  return countDown;
}

function trackKeyAgainstWord(e){
	let keyPressed = String.fromCharCode(e.keyCode).toLowerCase();
  if(activeWord.includes(keyPressed)) {
  	console.log("found letter: " + keyPressed);
    
    for(let i = 0;i<activeWord.length;i++) {
    	if(activeWord[i] === keyPressed) {
      	activeWord = activeWord.replace(keyPressed,"*");
        showCharacter(i);
        charRemaining--;
      }
    }
    
    console.log(activeWord);
    
    calculateWinCondition();
  }
}

function calculateWinCondition(){
	console.log(charRemaining);
	if (charRemaining === 0) {
  	console.log("you win!")
    timerEl.textContent = "You Won!"
    stopGame();
    updateScore(true);
  }

}

function showCharacter(index) {
	
  var current = document.getElementById('letterbox').children[index];
  
  current.textContent = activeWordPlaceHolder[index];
}
function stopGame(){
	clearInterval(activeTimer);
  document.onkeydown = null;
}

function updateScore(won){
	if(won){
  	win++;
    scoreWinEl.textContent = "win: " + win;
  } else {
  	loss++;
    scoreLossEl.textContent = "loss: " + loss;
  }

}
var start = document.getElementById("startBtn");
start.addEventListener("click", startGame);

function resetScore(){
	win = 0;
  loss = 0;
  scoreWinEl.textContent = "win: " + win;
  scoreLossEl.textContent = "loss: " + loss;
}

resetBtnEl.addEventListener("click", resetScore);

