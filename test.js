const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = {
    x: 50,
    y: 50,
    width: 20,
    height: 20,
    color: 'blue',
    speed: 5,
    isInsideHouse: false,
};

const house = {
    x: 200,
    y: 200,
    width: 100,
    height: 100,
    color: 'brown',
};

const update = () => {
    // Update player logic
    if (player.isInsideHouse) {
        // If inside house, move freely
        if (keys['ArrowUp']) player.y -= player.speed;
        if (keys['ArrowDown']) player.y += player.speed;
        if (keys['ArrowLeft']) player.x -= player.speed;
        if (keys['ArrowRight']) player.x += player.speed;
    } else {
        // If outside house, check if player is near the house to enter
        if (
            player.x < house.x + house.width &&
            player.x + player.width > house.x &&
            player.y < house.y + house.height &&
            player.y + player.height > house.y
        ) {
            if (keys['Enter']) {
                player.isInsideHouse = true;
            }
        }

        // Move player outside the house
        if (keys['ArrowUp'] && player.y > 0) player.y -= player.speed;
        if (keys['ArrowDown'] && player.y < canvas.height - player.height) player.y += player.speed;
        if (keys['ArrowLeft'] && player.x > 0) player.x -= player.speed;
        if (keys['ArrowRight'] && player.x < canvas.width - player.width) player.x += player.speed;
    }
};

const draw = () => {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw house
    ctx.fillStyle = house.color;
    ctx.fillRect(house.x, house.y, house.width, house.height);

    // Draw player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Draw message when inside the house
    if (player.isInsideHouse) {
        ctx.fillStyle = 'white';
        ctx.fillText('Inside the House! Press Enter to go outside.', 10, 20);
    }
};

const keys = {};

document.addEventListener('keydown', (event) => {
    keys[event.key] = true;
});

document.addEventListener('keyup', (event) => {
    keys[event.key] = false;
});

const gameLoop = () => {
    update();
    draw();
    requestAnimationFrame(gameLoop);
};

gameLoop();
