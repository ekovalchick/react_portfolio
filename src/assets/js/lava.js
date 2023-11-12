const canvas = document.getElementById('canvas1');


const ctx= canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle = '#CE547E'

//object oriented programming below

class Ball{
    //will define the movement and what it looks like
    constructor(effect){
        this.effect = effect;
        this.x = this.effect.width * 0.5;
        this.y = this.effect.height * 0.5;
        // x & ymakes the starting point in the middle of page
        this.radius = Math.random() * 80 + 20;
        this.speedX = Math.random() - 0.1;
        this.speedY = Math.random() - 0.1;
        //speed positive = right movement(x) positive direction (y)
        // this.angle = 0;
        // this.va = Math.random() * 0.1 -0.05;
        // //all will have a start angle of 0 then a velocity to increase angle value
        // this.range = Math.random() *20;



    }
    update(){
        //make the metaBalls bounce
        if (this.x < this.radius || this.x > this.effect.width - this.radius) this.speedX *= -1;
        if (this.y < this.radius || this.y > this.effect.height - this.radius) this.speedY *= -1;
        
        // this.angle += this.va;

        this.x += this.speedX 
        // * Math.cos(this.angle) * this.range
        //this will map a position of metaballs of a cos movement
        this.y += this.speedY 
        // * Math.cos(this.angle) * this.range
        //makes the balls move 
    }
    draw(context){
        //this describes what canvas to draw on
        context.beginPath();
        //creates a new circle shape
        context.arc(this.x,this.y,this.radius,0, Math.PI *2);
        //0=start angle where to draw, end angle
        context.fill()
        ///can change this to a diff color with fill
    }
    reset(){
        this.x = this.effect.width * 0.5;
        this.y = this.effect.height * 0.5;
        //when webpage is resized, lava is responsive
    }

}

class MetaballsEffect{
//manage effects.
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.metaballsArray = [];
        //will store all metaballs created
    }
    init(numberOfBalls){
        //initialize 
        for (let i = 0; i < numberOfBalls; i++) {
            this.metaballsArray.push(new Ball(this))
            
        }

    }
    update(){
        this.metaballsArray.forEach(metaball => metaball.update())
        //uses update method in line 23 (moves ball)
    }
    draw(context){
        this.metaballsArray.forEach(metaball => metaball.draw(context))
        //uses draw from 28


    }
    reset(newWidth, newHeight){
        this.width = newWidth;
        this.height = newHeight;
        this.metaballsArray.forEach(metaball => metaball.reset());
        //responsive metaballs 
    }

}

const effect = new MetaballsEffect(canvas.width, canvas.height)
//instant of this class want the effect to be full screen so use width and height 

effect.init(20)
//because line 48 is expecting #of balls input

console.log(effect)

function animate(){
    //will run loop to update and draw the metaballs
    ctx.clearRect(0,0,canvas.width, canvas.height)
    //need to clear previous animation frames
    effect.update()
    effect.draw(ctx)
    //expects content so use ctx
    requestAnimationFrame(animate)

}
animate()

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = '#CE547E';
    //^so will keep the metaballs when moving webpage size
    effect.reset(canvas.width, canvas.height)
})