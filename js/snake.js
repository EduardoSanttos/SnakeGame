document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("gameCanvas");
    const context = canvas.getContext("2d");

    const gridSize = 20;
    const gridWidth = canvas.width / gridSize;
    const gridHeight = canvas.height / gridSize;

    const snake = {
        body: [
            { x: 6, y: 4 },
            { x: 5, y: 4 },
            { x: 4, y: 4 }
        ],
        direction: "right"
    };

    let food = { x: 10, y: 10 };

    let gameover = false;
    let score = 0;

    function draw() {
        // Limpar o canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Desenhar a cobrinha
        context.fillStyle = "blue";
        snake.body.forEach(segment => {
            context.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
        });

        // Desenhar a comida
        context.fillStyle = "red";
        context.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

        // Desenhar a pontuação
        context.fillStyle = "black";
        context.font = "20px Arial";
        context.fillText("Score: " + score, 10, 30);
    }

    function update() {
        if (gameover) {
            return;
        }

        // Atualizar a posição da cobrinha
        const head = { x: snake.body[0].x, y: snake.body[0].y };

        if (snake.direction === "right") {
            head.x++;
        } else if (snake.direction === "left") {
            head.x--;
        } else if (snake.direction === "up") {
            head.y--;
        } else if (snake.direction === "down") {
            head.y++;
        }

        // Verificar colisão com a borda do canvas
        if (
            head.x < 0 ||
            head.x >= gridWidth ||
            head.y < 0 ||
            head.y >= gridHeight
        ) {
            gameover = true;
            return;
        }

        snake.body.unshift(head);

        // Verificar se a cobrinha comeu a comida
        if (head.x === food.x && head.y === food.y) {
            // Gerar nova posição para a comida
            food.x = Math.floor(Math.random() * gridWidth);
            food.y = Math.floor(Math.random() * gridHeight);
            score++; // Incrementar a pontuação
        } else {
            // Remover o último segmento da cobrinha
            snake.body.pop();
        }
    }

    function handleKeyPress(event) {
        const keyPressed = event.keyCode;

        if (keyPressed === 37 && snake.direction !== "right") {
            snake.direction = "left";
        } else if (keyPressed === 38 && snake.direction !== "down") {
            snake.direction = "up";
        } else if (keyPressed === 39 && snake.direction !== "left") {
            snake.direction = "right";
        } else if (keyPressed === 40 && snake.direction !== "up") {
            snake.direction = "down";
        }
    }

    function gameLoop() {
        update();
        draw();

        if (gameover) {
            clearInterval(gameInterval);
            alert("Game Over. Pontuação: " + score);
        }
    }

    // Iniciar o jogo
    const gameInterval = setInterval(gameLoop, 100);
    document.addEventListener("keydown", handleKeyPress);
});
