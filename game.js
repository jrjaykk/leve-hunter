const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 960;
canvas.height = 540;
const currentLevel = levels[0];
const traps = currentLevel.traps || [];

// =========================
// PLAYER
// =========================

const player = {
    x: currentLevel.playerStart.x,
    y: currentLevel.playerStart.y,

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
// CURRENT LEVEL
// =========================



// =========================
// LEVEL DATA
// =========================

const platforms = currentLevel.platforms;

const finish = currentLevel.finish;
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
// TRAP SYSTEM
// =========================

for (const trap of traps) {

    if (trap.triggered) continue;

    const playerTouchesTrap =
        player.x < trap.x + trap.width &&
        player.x + player.width > trap.x &&
        player.y < trap.y + trap.height &&
        player.y + player.height > trap.y;

    if (playerTouchesTrap) {

        if (trap.type === "fallingFloor") {

            trap.triggered = true;

            setTimeout(() => {

                const index = platforms.findIndex(
                    platform =>
                        platform.x === trap.x &&
                        platform.y === trap.y &&
                        platform.width === trap.width &&
                        platform.height === trap.height
                );

                if (index !== -1) {
                    platforms.splice(index, 1);
                }

            }, 200);

        }

    }

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

    player.x = currentLevel.playerStart.x;
    player.y = currentLevel.playerStart.y;

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
