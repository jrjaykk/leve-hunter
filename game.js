const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 960;
canvas.height = 540;


// =========================
// PLAYER
// =========================

const player = {
    x: 100,
    y: 350,

    width: 40,
    height: 50,

    velocityX: 0,
    velocityY: 0,

    speed: 5,
    jumpPower: 13,

    grounded: false
};


// =========================
// PHYSICS
// =========================

const gravity = 0.6;


// =========================
// PLATFORMS
// =========================

const platforms = [

    {
        x: 0,
        y: 490,
        width: 960,
        height: 50
    },

    {
        x: 250,
        y: 400,
        width: 180,
        height: 20
    },

    {
        x: 520,
        y: 330,
        width: 180,
        height: 20
    },

    {
        x: 760,
        y: 250,
        width: 150,
        height: 20
    }

];


// =========================
// KEYBOARD
// =========================

const keys = {};

document.addEventListener("keydown", (event) => {

    keys[event.key] = true;

    if (
        event.key === " " &&
        player.grounded
    ) {

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

    // Movement

    if (keys["ArrowLeft"]) {

        player.velocityX = -player.speed;

    }

    else if (keys["ArrowRight"]) {

        player.velocityX = player.speed;

    }

    else {

        player.velocityX = 0;

    }


    // Gravity

    player.velocityY += gravity;


    // Horizontal movement

    player.x += player.velocityX;


    // Horizontal boundaries

    if (player.x < 0) {

        player.x = 0;

    }

    if (player.x + player.width > canvas.width) {

        player.x =
            canvas.width - player.width;

    }


    // Vertical movement

    player.y += player.velocityY;


    // Ground state

    player.grounded = false;


    // Platform collision

    for (const platform of platforms) {

        const isFalling =
            player.velocityY >= 0;

        const isAbove =
            player.y + player.height <=
            platform.y + 10;

        const willTouch =
            player.y + player.height +
            player.velocityY >= platform.y;

        const horizontalOverlap =
            player.x < platform.x + platform.width &&
            player.x + player.width > platform.x;


        if (
            isFalling &&
            isAbove &&
            willTouch &&
            horizontalOverlap
        ) {

            player.y =
                platform.y - player.height;

            player.velocityY = 0;

            player.grounded = true;

        }

    }


    // Fell below screen

    if (player.y > canvas.height + 100) {

        resetPlayer();

    }

}


// =========================
// RESET PLAYER
// =========================

function resetPlayer() {

    player.x = 100;
    player.y = 350;

    player.velocityX = 0;
    player.velocityY = 0;

}


// =========================
// DRAW
// =========================

function draw() {

    // Sky

    ctx.fillStyle = "#87CEEB";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // Platforms

    ctx.fillStyle = "#333";

    for (const platform of platforms) {

        ctx.fillRect(
            platform.x,
            platform.y,
            platform.width,
            platform.height
        );

    }


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
