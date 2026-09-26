const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 900;
canvas.height = 500;


// =========================
// PLAYER
// =========================

const player = {
    x: 100,
    y: 350,

    width: 40,
    height: 40,

    velocityX: 0,
    velocityY: 0,

    speed: 5,
    jumpPower: 12,

    grounded: false
};


// =========================
// GRAVITY
// =========================

const gravity = 0.6;


// =========================
// GROUND
// =========================

const ground = {
    x: 0,
    y: 450,

    width: canvas.width,
    height: 50
};


// =========================
// KEYBOARD
// =========================

const keys = {};

document.addEventListener("keydown", (event) => {

    keys[event.key] = true;

    if (event.key === " " && player.grounded) {
        player.velocityY = -player.jumpPower;
        player.grounded = false;
    }

});


document.addEventListener("keyup", (event) => {

    keys[event.key] = false;

});


// =========================
// UPDATE
// =========================

function update() {

    // LEFT
    if (keys["ArrowLeft"]) {
        player.velocityX = -player.speed;
    }

    // RIGHT
    else if (keys["ArrowRight"]) {
        player.velocityX = player.speed;
    }

    // STOP
    else {
        player.velocityX = 0;
    }


    // Gravity
    player.velocityY += gravity;


    // Move player
    player.x += player.velocityX;
    player.y += player.velocityY;


    // Ground collision
    if (
        player.y + player.height >= ground.y
    ) {

        player.y = ground.y - player.height;

        player.velocityY = 0;

        player.grounded = true;

    }


    // Screen boundaries

    if (player.x < 0) {
        player.x = 0;
    }

    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }

}


// =========================
// DRAW
// =========================

function draw() {

    // Clear screen
    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // Sky

    ctx.fillStyle = "#87CEEB";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // Ground

    ctx.fillStyle = "#333";

    ctx.fillRect(
        ground.x,
        ground.y,
        ground.width,
        ground.height
    );


    // Player

    ctx.fillStyle = "red";

    ctx.fillRect(
        player.x,
        player.y,
        player.width,
        player.height
    );

}


// =========================
// GAME LOOP
// =========================

function gameLoop() {

    update();

    draw();

    requestAnimationFrame(gameLoop);

}


gameLoop();
