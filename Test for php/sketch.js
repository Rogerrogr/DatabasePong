var xBall = Math.floor(Math.random() * 300) + 50;
var yBall = 50;
var xSpeed = (2, 5);
var ySpeed = (-5, -2);
var score = 0;
let loss = false;
let xPaddle;
let yPaddle;
let highScore;
let finalScore;

// Canvas
function setup() {
  createCanvas(400, 400);
}

//Background

function draw() {
  background(0);

  // Paddle
  fill('#ffffff');
  rect(mouseX - 45, 375, 90, 15);

  display();

  //Functions
  if(!loss) {
    move();
    bounce();
    resetBall();
    paddle();
  
    //Score
    fill('#d9c3f7');
    textSize(24);
    text("Score: " + score, 10, 25);
  } else {
    fill('FFFF00');
    textSize(30);
    textAlign(CENTER);
    text("You lost!", 200, 40);
    text("Your score is: " + score, 200, 75);
    textSize(35)
    text("High score: " + highScore, 200, 150);
  }
}
// Ball Functions
function move() {
  xBall += xSpeed;
  yBall += ySpeed;
}


function bounce() {
  if (xBall < 10 ||
    xBall > 400 - 10) {
    xSpeed *= -1;
  }
  if (yBall < 10 ||
    yBall > 400 - 10) {
    ySpeed *= -1;
  }
}

function resetBall() {
  if (yBall >= 400 ||
    yBall > 400 - 10) {
    loss = true;
    addScore(score);
    retrieveHighScores();
  }
}

async function addScore(finalScore) {
  let formData = new FormData();

  formData.append("high_score", finalScore);
  fetch("https://oege.ie.hva.nl/~wesselr4/api/score.php", {
    method: "POST",
    body: formData,
  }).then((data) => console.log(data));
}

async function retrieveHighScores() {
  fetch("https://oege.ie.hva.nl/~wesselr4/api/retrieve_score.php")
    .then((response) => response.json())
    .then((data) => {
      highScore = data.high_score;
      console.log(data.high_score); // Move the console.log inside this block
    })
    .catch((error) => {
      console.error('Fetch error:', error);
    });
}

function display() {
  fill('#d9c3f7');
  ellipse(xBall, yBall, 20, 20);
}

// Bounce off Paddle
function paddle() {
  if ((xBall > mouseX - 45 &&
      xBall < mouseX + 45) &&
    (yBall + 10 >= 375)) {
    xSpeed *= -1;
    ySpeed *= -1;
    score++;
  }
}