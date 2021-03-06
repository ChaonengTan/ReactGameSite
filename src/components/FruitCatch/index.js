import Fruit from './fruit'
import Paddle from './paddle'

class game{
    constructor(id){
        // canvas
        this.canvas = document.getElementById('fruitCatchCanvas');
        this.ctx = this.canvas.getContext('2d');
        // solids
        this.score = 0
        this.lives = 3;
        this.color = 'red'
        this.spawnInterval = 10;
        // dynamics
        this.fruits = [];
        this.paddle = new Paddle((this.canvas.width - 75) / 2, 75, 10, this.color, 7, this.canvas);
        // event handlers
        document.addEventListener('mousemove', this.mouseMoveHandler.bind(this), false);
        document.addEventListener('keydown', this.keyDownHandler.bind(this), false);
        document.addEventListener('keyup', this.keyUpHandler.bind(this), false);
        // draw
        this.isRunning = true
        this.draw=this.draw.bind(this)
        this.draw()
    }
    // FUNCTIONALS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    collisionDetection() {
        // for every fruit in this.fruit: run this code
        for (let c = 0; c < this.fruits.length; c += 1){
            // if next pos is out of frame:
            if (this.fruits[c].y + this.fruits[c].dy > this.canvas.height - this.fruits[c].radius) {
                // check if it collides with paddle
                if (this.fruits[c].x > this.paddle.x && this.fruits[c].x < this.paddle.x + this.paddle.width) {
                    this.fruits.splice(c, 1)
                    this.score += 1;
                } else { /* if not: add a miss */
                    this.fruits.splice(c, 1)
                    this.lives -= 1;
                    if (this.lives<1) {
                        alert('GAME OVER');
                        document.location.reload();
                    }
                }
            }
        }
    }
    stop(){
        this.isRunning = false
        document.removeEventListener('mousemove', this.mouseMoveHandler, false);
        document.removeEventListener('keydown', this.keyDownHandler, false);
        document.removeEventListener('keyup', this.keyUpHandler, false);
    }
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }
    createFruit(speed=4) {
        this.fruits.push(new Fruit(this.getRandomInt(0, this.canvas.width), speed))
    }
    fruitLimit(limit) {
        if (this.fruits.length<limit){
            this.createFruit(4+Math.floor(this.score/this.spawnInterval))
        }
    }
    // CREATE and DRAW ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    createGradiant() {
        // skyGrad
        const grd = this.ctx.createLinearGradient(0, 0, 0, 320);
        grd.addColorStop(0, 'cornflowerblue');
        grd.addColorStop(1, 'white');
      
        this.ctx.fillStyle = grd;
        this.ctx.fillRect(0, 0, 480, 320);
    }
    drawScore() {
        this.ctx.font = '16px Arial';
        this.ctx.fillStyle = this.infoColor;
        this.ctx.fillText(`Score: ${this.score}`, 8, 20);
    }
    drawLives() {
        this.ctx.font = '16px Arial';
        this.ctx.fillStyle = this.infoColor;
        this.ctx.fillText(`Lives: ${this.lives}`, this.canvas.width - 65, 20);
    }
    drawElements() {
        for (let c = 0; c < this.fruits.length; c += 1){
            this.fruits[c].render(this.ctx);
        }
        this.paddle.render(this.ctx)
        this.drawScore()
        this.drawLives()
    }
    moveElements() {
        // moves all fruit
        for (let c = 0; c < this.fruits.length; c += 1){
            this.fruits[c].move()
        }
        this.paddle.move()
    }
    // KEY HANDLERS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    mouseMoveHandler(e) {
        const relativeX = e.clientX - this.canvas.offsetLeft;
        if (relativeX > 0 && relativeX < this.canvas.width) {
          this.paddle.x = relativeX - this.paddle.width / 2;
        }
      }
      keyDownHandler(e) {
        if (e.key === 'Right' || e.key === 'ArrowRight') {
          this.paddle.keyPressed = 'right';
        } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
          this.paddle.keyPressed = 'left';
        }
      }
      keyUpHandler(e) {
        if (e.key === 'Right' || e.key === 'ArrowRight') {
          this.paddle.keyPressed = 'none';
        } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
          this.paddle.keyPressed = 'none';
        }
    }
    // DRAW ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.createGradiant();
        this.drawElements();
        this.collisionDetection();
        this.fruitLimit(1);
        this.moveElements();
        if (this.isRunning){
            requestAnimationFrame(this.draw)
        }
      }
}

export default game