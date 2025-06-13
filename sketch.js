let tractor;
let fruits = [];
let trees = [];
let city;
let score = 0;
let timeLeft = 50;
let gameOver = false;

function setup() {
  createCanvas(800, 600);
  
  // Criar árvores no campo
  for (let i = 0; i < 5; i++) {
    trees.push(createTree(random(100, 300), random(100, 500)));
  }
  
  // Criar o trator
  tractor = new Tractor(50, height / 2);
  
  // Criar a cidade
  city = new City(width - 150, height / 2);
  
  // Iniciar o contador de tempo
  setInterval(updateTime, 1000);
}

function draw() {
  background(135, 206, 235);  // Céu azul
  noStroke();
  
  // Desenhar o sol
  fill(255, 255, 0);
  ellipse(100, 100, 100, 100);
  
  // Desenhar o campo com árvores
  fill(34, 139, 34);  // Cor do campo
  rect(0, height / 2, width, height / 2);
  
  // Desenhar as árvores
  for (let tree of trees) {
    tree.show();
  }
  
  // Mostrar o trator
  tractor.show();
  
  // Mostrar as frutas
  for (let fruit of fruits) {
    fruit.show();
  }
  
  // Mostrar a cidade
  city.show();
  
  // Mostrar o score e tempo
  fill(0);
  textSize(20);
  text("Frutas coletadas: " + score, 20, 30);
  text("Tempo restante: " + timeLeft, 20, 60);
  
  // Checar se o jogo acabou
  if (gameOver) {
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Jogo Finalizado! Você coletou " + score + " frutas.", width / 2, height / 2);
    noLoop();
  }
}

function mousePressed() {
  if (!gameOver) {
    tractor.move(mouseX, mouseY);
    collectFruits();
  }
}

function createTree(x, y) {
  return {
    x: x,
    y: y,
    show: function() {
      fill(139, 69, 19);  // Tronco da árvore
      rect(this.x - 10, this.y, 20, 50);
      fill(34, 139, 34);  // Folhas da árvore
      ellipse(this.x, this.y - 20, 60, 60);
      
      // Criar frutas nas árvores
      if (frameCount % 60 === 0) {
        fruits.push(new Fruit(random(this.x - 30, this.x + 30), random(this.y - 30, this.y - 10)));
      }
    }
  };
}

function collectFruits() {
  for (let i = fruits.length - 1; i >= 0; i--) {
    let fruit = fruits[i];
    if (dist(tractor.x, tractor.y, fruit.x, fruit.y) < 20) {
      fruits.splice(i, 1);
      score++;
    }
  }
}

function updateTime() {
  if (timeLeft > 0) {
    timeLeft--;
  } else {
    gameOver = true;
  }
}

class Tractor {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 5;
  }
  
  show() {
    fill(255, 0, 0);
    rect(this.x, this.y, 40, 30);
  }
  
  move(targetX, targetY) {
    let angle = atan2(targetY - this.y, targetX - this.x);
    this.x += cos(angle) * this.speed;
    this.y += sin(angle) * this.speed;
  }
}

class Fruit {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  
  show() {
    fill(255, 0, 0);  // Cor da fruta
    ellipse(this.x, this.y, 10, 10);
  }
}

class City {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  
  show() {
    fill(200);
    rect(this.x, this.y - 50, 100, 100);  // Construção da cidade
    fill(255);
    ellipse(this.x + 20, this.y - 30, 40, 40);  // Sol da cidade
  }
}
