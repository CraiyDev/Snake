function Snake(ctx, cells) {
    this.ctx = ctx;
    this.cells = cells;
    this.cellSize = ctx.canvas.width / this.cells;
    this.food = null;
    this.startHandler = () => {}
    this.stopHandler = () => {}

    this.keyInput = (event) => {
        var key = event.key.toLowerCase();
        switch(key) {
            case "w": if(this.facingPre != "s") this.facing = "n"; break;
            case "d": if(this.facingPre != "w") this.facing = "e"; break;
            case "s": if(this.facingPre != "n") this.facing = "s"; break;
            case "a": if(this.facingPre != "e") this.facing = "w"; break;
        }
    }

    this.setCell = (cell, color) => {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(cell[0] * this.cellSize, cell[1] * this.cellSize, this.cellSize, this.cellSize);
    }

    this.generateFood = () => {
        do {
            var x = Math.floor(Math.random() * this.cells);
            var y = Math.floor(Math.random() * this.cells);
            var nextFood = [x,y]
        } while(this.snake.some((cell) => cell[0] == nextFood[0] && cell[1] == nextFood[1]))
        this.food = nextFood;
    }

    this.collectFood = () => {
        console.log("abc");
        this.snake.push(this.snake[this.snake.length - 1]);
        this.score++;
        this.generateFood();
    }

    this.drawSnake = () => {
        for(var cell of this.snake) {
            this.setCell(cell, "#FFFFFF")
        }
    }

    this.move = () => {
        var next = this.snake[0].slice();

        switch(this.facing) {
            case "n": next[1]--; break;
            case "e": next[0]++; break;
            case "s": next[1]++; break;
            case "w": next[0]--; break;
        }
        this.facingPre = this.facing;

        for(var i = this.snake.length - 1; i >= 1; i--) {
            this.snake[i] = this.snake[i - 1]
        }

        if(next[0] >= this.cells || next[1] >= this.cells || next[0] < 0 || next[1] < 0) {
            this.gameover();
        }

        this.snake.forEach((item) => {
            if(next[0] == item[0] && next[1] == item[1]) {
                this.gameover();
            }
        });

        if(next[0] == this.food[0] && next[1] == this.food[1]) {
            this.collectFood();
        }
        this.snake[0] = next;
    }

    this.clear = () => {
        this.ctx.fillStyle = "#050a12";
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    this.tick = () => {
        this.clear();
        this.move();
        this.drawSnake();
        this.setCell(this.food, "#00FF00")
        this.allowMove = true;
    }

    this.gameover = () => {
        clearInterval(this.gameTick);
        this.stopHandler();
    }

    this.start = () => {
        this.clear();
        this.score = 0;
        this.facing = "e";
        this.facingPre = this.facing;
        this.snake = [[1,0],[0,0]];
        this.generateFood();
        this.gameTick = setInterval(() => { this.tick() }, 1000/12);
        this.startHandler();
    }
}