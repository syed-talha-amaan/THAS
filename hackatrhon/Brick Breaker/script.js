// Basic canvas
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth / 2.2;
canvas.height = innerHeight / 1.2;

// Mouse Movement
const mouse = {
  x: undefined,
  y: undefined,
};

window.addEventListener(`mousemove`, (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

let lives = document.querySelector(".lives");
let level = document.querySelector(".levelCount");
let score = document.querySelector(".scoreCount");

const start = document.querySelector(".start");
const main = document.querySelector(".main");
const bottom = document.querySelector(".bottom");
const exit = document.querySelector(".exitBtn");
const pause = document.querySelector(".pauseBtn");
const ttlScoreM = document.querySelector(".ttlScore");
const ttlScore = document.querySelector(".ttlScoreCount");
const result = document.querySelector(".result");
const paddleHit = document.querySelector(".paddleHit");
const brickHit = document.querySelector(".brickHit");
const win = document.querySelector(".win");
const lost = document.querySelector(".lost");
const audioBtn = document.querySelector(".audioM");
const unMute = document.querySelector(".unMute");
const mute = document.querySelector(".mute");
const mainAd = document.querySelector(".mainAd");

mainAd.volume = 0.2;

// Main Player
class Player {
  constructor(x, y, length, height, color) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.height = height;
    this.color = color;
  }

  draw() {
    c.save();
    c.beginPath();
    c.rect(this.x, this.y, this.length, this.height);
    c.fillStyle = this.color;
    c.fill();
    c.restore();
  }

  update() {
    this.draw();
  }
}

// Ball
class Ball {
  constructor(x, y, dy, dx, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.dy = dy;
    this.dx = dx;
    this.velocity = velocity;
  }

  draw() {
    c.save();
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.shadowColor = this.color;
    c.shadowBlur = 15;
    c.fillStyle = this.color;
    c.fill();
    c.restore();
  }

  update() {
    this.draw();

    // ball pyhsics
    if (this.y + this.radius + this.dy > canvas.height) {
      this.x = canvas.width / 2;
      this.y = canvas.height / 2;
      lives.innerText--;
    }
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    if (lives.innerText == 0) {
      this.dx = 0;
      this.dy = 0;
    }
  }
}

// obstacle
class Obstacle {
  constructor(x, y, length, height, color, status, status2, status3) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.height = height;
    this.color = color;
    this.status = status;
    this.status2 = status2;
    this.status3 = status3;
  }
}

// particles friction
const friction = 0.97;

// Particles
class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 1;
  }

  draw() {
    c.save();
    c.globalAlpha = this.alpha;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.restore();
  }

  update() {
    this.draw();

    this.velocity.x *= friction;
    this.velocity.y *= friction;

    this.x += this.velocity.x;
    this.y += this.velocity.y;

    this.alpha -= 0.01;
  }
}

let length = 135;
const height = 10;
const x = mouse.x;
const y = canvas.height - 60;

let player = new Player(x, y, length, height, `lightgreen`);

const bx = canvas.width / 2;
const by = canvas.height - 60;
const bradius = 8;
const dy = -4;
const dx = -4;
const velocity = 4;

let ball = new Ball(bx, by, dy, dx, bradius, `white`, velocity);

let obstacles = [];

let particles = [];

let rowCount = 6;
let colCount = 6;

//creating obstacles
for (let r = 0; r < rowCount; r++) {
  obstacles[r] = [];
  for (let cl = 0; cl < colCount; cl++) {
    const x = (20 + cl * 50) * 1.8;
    const y = 80 + r * 40;
    const color = `rgb(${Math.random() * 255}, 120,150)`;
    obstacles[r][cl] = new Obstacle(x, y, 80, 15, color, false, false, false);
  }
}

let scoreCount = 0;
let hit = obstacles.length * obstacles[0].length;
let hitLev1 = 12;
let hitLev2 = 24;
let hitLev3 = 36;

// Related to obstacles
function draw() {
  //drawing obstacles
  for (let cl = 0; cl < colCount; cl++) {
    for (let r = 0; r < rowCount; r++) {
      if (level.innerText == 1) {
        rowCount = 2;
        if (!obstacles[r][cl].status) {
          c.beginPath();
          c.rect(
            obstacles[r][cl].x,
            obstacles[r][cl].y,
            obstacles[r][cl].length,
            obstacles[r][cl].height
          );
          c.fillStyle = obstacles[r][cl].color;
          c.fill();
          c.closePath();
        }

        // Deleting and Collison of Obstacles
        if (!obstacles[r][cl].status) {
          let b = obstacles[r][cl];
          if (
            ball.x + ball.radius > b.x &&
            ball.x - ball.radius < b.x + b.length &&
            ball.y + ball.radius > b.y &&
            ball.y - ball.radius < b.y + b.height
          ) {
            ball.dy *= -1;
            b.status = true;
            hitLev1--;
            scoreCount += 10;
            score.innerText = scoreCount;
            brickHit.play();

            if (hitLev1 == 0) {
              // ball.dy = 0;
              // ball.dx = 0;
              level.innerText++;
              hit = obstacles.length * obstacles[0].length;
            }
            if (level.innerText == 2) {
              ball.x = canvas.width / 2;
              ball.y = canvas.height - 60;
              ball.dy = -ball.dy;
              lives.innerText = 3;
            }
          }
        }
      }

      if (level.innerText == 2) {
        obstacles[r][cl].status = false;
        rowCount = 4;
        if (!obstacles[r][cl].status2) {
          c.beginPath();
          c.rect(
            obstacles[r][cl].x,
            obstacles[r][cl].y,
            obstacles[r][cl].length,
            obstacles[r][cl].height
          );
          c.fillStyle = obstacles[r][cl].color;
          c.fill();
          c.closePath();
        }

        if (!obstacles[r][cl].status2) {
          let b = obstacles[r][cl];
          if (
            ball.x + ball.radius > b.x &&
            ball.x - ball.radius < b.x + b.length &&
            ball.y + ball.radius > b.y &&
            ball.y - ball.radius < b.y + b.height
          ) {
            ball.dy *= -1;
            b.status2 = true;
            hitLev2--;
            scoreCount += 10;
            score.innerText = scoreCount;
            brickHit.play();

            if (hitLev2 == 0) {
              // ball.dy = 0;
              // ball.dx = 0;
              level.innerText++;
            }
            if (level.innerText == 3) {
              ball.x = canvas.width / 2;
              ball.y = canvas.height - 60;
              lives.innerText = 3;
            }
          }
        }
      }

      if (level.innerText == 3) {
        obstacles[r][cl].status = false;
        obstacles[r][cl].status2 = false;
        rowCount = 6;
        if (!obstacles[r][cl].status3) {
          c.beginPath();
          c.rect(
            obstacles[r][cl].x,
            obstacles[r][cl].y,
            obstacles[r][cl].length,
            obstacles[r][cl].height
          );
          c.fillStyle = obstacles[r][cl].color;
          c.fill();
          c.closePath();
        }

        if (!obstacles[r][cl].status3) {
          let b = obstacles[r][cl];
          if (
            ball.x + ball.radius > b.x &&
            ball.x - ball.radius < b.x + b.length &&
            ball.y + ball.radius > b.y &&
            ball.y - ball.radius < b.y + b.height
          ) {
            ball.dy *= -1;
            b.status3 = true;
            hitLev3--;
            scoreCount += 10;
            score.innerText = scoreCount;
            brickHit.play();

            if (hitLev3 == 0) {
              level.innerText++;
            }
            if (level.innerText == 4) {
              level.innerText = "Win!";
            }
            if (level.innerText == "Win!") {
              ttlScoreM.classList.remove("hide");
              ball.dy = 0;
              ball.dx = 0;
              cancelAnimationFrame(animationId);
              canvas.classList.add("blur");
              result.classList.remove("hide");
              result.innerText = "You Won !";
              bottom.classList.remove("hide");
              pause.classList.add("hide");
              main.classList.add("hide");
              win.play();

              start.addEventListener(`click`, reload, false);
            }
            if ((result.innerText = "You Won !")) {
              result.style.color = "lime";
            }
          }
        }
      }
    }
  }
}

let animationId;

// Rendering of all the objects
function animate() {
  animationId = requestAnimationFrame(animate);

  c.fillStyle = "rgba(0, 0, 0, 0.3)";
  c.shadowBlur = 0;
  c.fillRect(0, 0, canvas.width, canvas.height);

  // player drawing
  player.x = mouse.x - length * 3;
  player.update();

  // ball drawing
  ball.update();

  particles.forEach((particle, index) => {
    if (particle.alpha <= 0) {
      particles.splice(index, 1);
    } else {
      particle.update();
    }
  });

  for (let cl = 0; cl < colCount; cl++) {
    for (let r = 0; r < rowCount; r++) {
      let obs = obstacles[r][cl];
      // distance between obs and ball

      // particles power
      const power = 5;

      // explosions
      if (
        ball.x + ball.radius > obs.x &&
        ball.x - ball.radius < obs.x + obs.length &&
        ball.y + ball.radius > obs.y &&
        ball.y - ball.radius < obs.y + obs.height
      ) {
        // create explosions
        for (let i = 0; i < ball.radius * 2; i++) {
          if (
            obs.status == false &&
            obs.status2 == false &&
            obs.status3 == false
          ) {
            particles.push(
              new Particle(ball.x, ball.y, Math.random() * 2, obs.color, {
                x: (Math.random() - 0.5) * (Math.random() * power),
                y: (Math.random() - 0.5) * (Math.random() * power),
              })
            );
          }
        }

        setTimeout(() => {
          particles.splice(obs, 1);
        }, 0);
      }
    }
  }

  // ball paddle collision
  if (
    ball.y + ball.radius > player.y &&
    ball.y < player.y + player.height &&
    ball.x + ball.radius > player.x &&
    ball.x < player.x + player.length
  ) {
    let collidPoint = ball.x - (player.x + player.length / 2);
    collidPoint = collidPoint / (player.length / 2);
    let angle = collidPoint * (Math.PI / 3);
    ball.dy = -(ball.velocity * Math.cos(angle));
    ball.dx = ball.velocity * Math.sin(angle);
    paddleHit.play();
  }

  if (lives.innerText == 0) {
    cancelAnimationFrame(animationId);
    main.classList.add("hide");
    bottom.classList.remove("hide");
    ttlScoreM.classList.remove("hide");
    canvas.classList.add("blur");
    result.classList.remove("hide");
    result.innerText = "You Lost !";
    bottom.classList.remove("hide");
    pause.classList.add("hide");
    main.classList.add("hide");
    lost.play();

    start.addEventListener(`click`, reload, false);
  }

  ttlScore.innerText = scoreCount;

  draw();
}

start.addEventListener(`click`, () => {
  animate();
  main.classList.remove("hide");
  bottom.classList.add("hide");
  result.classList.add("hide");
  pause.classList.remove("hide");
});

pause.addEventListener(`click`, () => {
  pause.classList.toggle("play");
  if (pause.classList.contains("play")) {
    cancelAnimationFrame(animationId);
  } else {
    animate();
  }
});

function reload() {
  reload = location.reload();
}

exit.addEventListener(`click`, reload, false);

audioBtn.addEventListener(`click`, () => {
  unMute.classList.toggle("hide");
  mute.classList.toggle("show");

  mainAd.classList.toggle("play");

  if (mainAd.classList.contains("play")) {
    mainAd.play();
  } else {
    mainAd.pause();
  }
});
