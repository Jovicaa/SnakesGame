// Get a reference to the canvas element and its context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Define the size of the canvas and the size of each tile
const canvasSize = 400;
const tileSize = 10;

// Calculate the number of tiles on the canvas
const numTiles = canvasSize / tileSize;

// Initialize the snake's starting position and direction
let snakeX = Math.floor(numTiles / 2);
let snakeY = Math.floor(numTiles / 2);
let dx = 0;
let dy = -1;

// Define an array to hold the positions of the snake's body segments
const snakeBody = [];

// Define the initial length of the snake
const initialLength = 5;

// Initialize the snake's body segments
for (let i = 0; i < initialLength; i++) {
  snakeBody.push({x: snakeX, y: snakeY + i});
}

// Define the food's initial position
let foodX = Math.floor(Math.random() * numTiles);
let foodY = Math.floor(Math.random() * numTiles);

// Define a variable to hold the score
let score = 0;

// Define a function to draw the snake
function drawSnake() {
  // Draw the head
  ctx.fillStyle = 'green';
  ctx.fillRect(snakeX * tileSize, snakeY * tileSize, tileSize, tileSize);

  // Draw the body segments
  ctx.fillStyle = 'lightgreen';
  for (let i = 0; i < snakeBody.length; i++) {
    const segment = snakeBody[i];
    ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
  }
}

// Define a function to draw the food
function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(foodX * tileSize, foodY * tileSize, tileSize, tileSize);
}

// Define a function to handle collisions with the walls or the snake's body
function checkCollisions() {
  // Check for collisions with the walls
  if (snakeX < 0 || snakeX >= numTiles || snakeY < 0 || snakeY >= numTiles) {
    return true;
  }

  // Check for collisions with the snake's body
  for (let i = 0; i < snakeBody.length; i++) {
    const segment = snakeBody[i];
    if (snakeX === segment.x && snakeY === segment.y) {
      return true;
    }
  }

  // If there are no collisions, return false
  return false;
}

// Define a function to update the game state
function update() {
  // Move the snake
  snakeX += dx;
  snakeY += dy;

  // Check for collisions
  if (checkCollisions()) {
    alert(`Game over! Your score was ${score}.`);
    document.location.reload();
  }

  // Check for food collisions
  if (snakeX === foodX && snakeY === foodY) {
    // Increase the score
    score++;

    // Generate new food coordinates
    foodX = Math.floor(Math.random() * numTiles);
    foodY = Math.floor(Math.random() * numTiles);

    // Add a new body segment to the snake
    const lastSegment = snakeBody[snakeBody.length - 1];
    snakeBody.push({x: lastSegment.x, y: lastSegment.y});
  }

  // Move the snake's body segments
for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i].x = snakeBody[i - 1].x;
    snakeBody[i].y = snakeBody[i - 1].y;
    }
    
    // Update the first body segment to follow the snake's head
    snakeBody[0].x = snakeX;
    snakeBody[0].y = snakeY;
    }
    
    // Define a function to handle user input
    function handleInput(event) {
    switch (event.code) {
    case 'ArrowUp':
    dx = 0;
    dy = -1;
    break;
    case 'ArrowDown':
    dx = 0;
    dy = 1;
    break;
    case 'ArrowLeft':
    dx = -1;
    dy = 0;
    break;
    case 'ArrowRight':
    dx = 1;
    dy = 0;
    break;
    }
    }
    
    // Add an event listener for keydown events
    document.addEventListener('keydown', handleInput);
    
    // Define a function to draw the game board
    function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    
    // Draw the snake
    drawSnake();
    
    // Draw the food
    drawFood();
    
    // Update the game state
    update();
    
    // Display the score
    ctx.fillStyle = 'black';
    ctx.font = '16px Arial';
    ctx.fillText(`Score: ${score}`, 10, 20);
    
    // Call the draw function again after a short delay
    setTimeout(draw, 100);
    }
    
    // Call the draw function to start the game
    draw();