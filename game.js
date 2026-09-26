const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 960;
canvas.height = 540;


// =========================
// PLAYER
// =========================

const player = {
    x: 80,
    y: 400,

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
// LEVEL
// =========================

const platforms = [

    // Starting ground
    {
        x: 0,
        y: 490,
        width: 300,
        height: 50
    },

    // Platform 1
    {
        x: 350,
        y: 420,
        width: 150,
        height: 20
    },

    // Platform 2
    {
        x: 550,
        y: 350,
        width: 150,
        height: 20
    },

    // Platform 3
    {
        x: 750,
        y: 280,
        width: 120,
        height: 20
    },

    // Final ground
    {
        x: 700,
        y: 490,
        width: 260,
        height: 50
    }

];


// =========================
// FINISH DOOR
// =========================

const finish = {

    x: 850,
    y: 350,

    width: 50,
    height: 140

};

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


    // Horizontal movement

    player.x += player.velocityX;


    // Screen boundaries

    if (player.x < 0) {

        player.x = 0;

    }

    if (
        player.x + player.width >
        canvas.width
    ) {

        player.x =
            canvas.width - player.width;

    }


    // Vertical movement

    player.y += player.velocityY;


    // Assume player is not grounded

    player.grounded = false;


    // =========================
    // PLATFORM COLLISION
    // =========================

    for (const platform of platforms) {

        const falling =
            player.velocityY >= 0;

        const abovePlatform =
            player.y + player.height <=
            platform.y + 10;

        const touchingPlatform =
            player.y + player.height +
            player.velocityY >=
            platform.y;

        const horizontalOverlap =
            player.x <
            platform.x + platform.width &&
            player.x + player.width >
            platform.x;


        if (
            falling &&
            abovePlatform &&
            touchingPlatform &&
            horizontalOverlap
        ) {

            player.y =
                platform.y - player.height;

            player.velocityY = 0;

            player.grounded = true;

        }

    }


    // =========================
    // FALL DEATH
    // =========================

    if (
        player.y >
        canvas.height + 100
    ) {

        resetPlayer();

    }


    // =========================
    // FINISH CHECK
    // =========================

    if (
        player.x <
            finish.x + finish.width &&
        player.x + player.width >
            finish.x &&
        player.y <
            finish.y + finish.height &&
        player.y + player.height >
            finish.y
    ) {

        levelComplete();

    }

}


// =========================
// RESET
// =========================

function resetPlayer() {

    player.x = 80;
    player.y = 400;

    player.velocityX = 0;
    player.velocityY = 0;

}


// =========================
// LEVEL COMPLETE
// =========================

function levelComplete() {

    alert("LEVEL 1 COMPLETE!");

    resetPlayer();

}


// =========================
// DRAW
// =========================

function draw() {

    // Background

    ctx.fillStyle = "#87CEEB";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // =========================
    // PLATFORMS
    // =========================

    ctx.fillStyle = "#333";

    for (const platform of platforms) {

        ctx.fillRect(
            platform.x,
            platform.y,
            platform.width,
            platform.height
        );

    }


    // =========================
    // FINISH DOOR
    // =========================

    ctx.fillStyle = "#8B4513";

    ctx.fillRect(
        finish.x,
        finish.y,
        finish.width,
        finish.height
    );
// Door outline

ctx.strokeStyle = "black";
ctx.lineWidth = 4;

ctx.strokeRect(
    finish.x,
    finish.y,
    finish.width,
    finish.height
);

    // Door handle

    ctx.fillStyle = "gold";

    ctx.beginPath();

    ctx.arc(
        finish.x + 38,
        finish.y + 35,
        4,
        0,
        Math.PI * 2
    );

    ctx.fill();


    // =========================
    // PLAYER
    // =========================

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
