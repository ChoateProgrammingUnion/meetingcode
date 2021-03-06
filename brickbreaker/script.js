var width = 800;
var height = 600;

bricks = [];
ball = {
	x: 300,
	y: 300,
	vx: 5,
	vy: -4,
	radius: 10
};
paddle = {
	x: (width-100)/2,
	y: height-40,
	width: 100,
	height: 30,
	v:0
}

function setup() {
	ctx.fillStyle="red";
	ctx.lineWidth=2;	
	makeBricks();
}

function loop() {
	fillCanvas("white");
	//change stuff
	ball.x+=ball.vx;
	ball.y+=ball.vy;
	paddle.x+=paddle.v;
	// collisions
	if(ball.x>=width || ball.x<=0) {
		ball.vx*=-1;
	}
	if(ball.y<=0) {
		ball.vy*=-1;
	} else if(ball.y>=height) {
		//loss condition
		ball.vy*=-1;
	}
	if(ball.x>=paddle.x && ball.x<=paddle.x+paddle.width &&
	   ball.y>=paddle.y && ball.y<=paddle.y+paddle.height) {
		ball.vy*=-1;
	}



	for(var i=0; i<bricks.length; i++) {
		if(!bricks[i].broken) {
			if(bricks[i].x < ball.x && ball.x < bricks[i].x+bricks[i].w &&
			   bricks[i].y < ball.y && ball.y < bricks[i].y+bricks[i].h) {
				bricks[i].broken=true;
				ball.vy*=-1;
			}
		}
	}

	//redraw stuff
	ctx.fillStyle="blue";
	drawCircle(ball.x, ball.y, ball.radius); //draw the ball
	ctx.fillStyle="red";
	drawBricks();
	drawRect(paddle.x, paddle.y, paddle.width, paddle.height);
}
function drawBricks() {
	for(var i=0; i<bricks.length; i++) {
		if(!bricks[i].broken) {
			drawRect(bricks[i].x, bricks[i].y, bricks[i].w, bricks[i].h);
		}
	}
}
function makeBricks() {
	var maxCol=10;
	var border=5;
	var brickWidth = width/maxCol;
	var brickHeight = brickWidth*0.6;

	for(var row=0; row<3; row++) { //number of rows
		limit = maxCol;
		startx=0;
		if(row % 2 == 1) { limit-=1; startx+=brickWidth/2}
		for(var col=0; col<limit; col++) {
			brick = {
				broken: false,
				x: startx+col*brickWidth+border,
				y: row*brickHeight+border,
				w: brickWidth-2*border,
				h: brickHeight-2*border
			}
			bricks.push(brick);
		}
	}
}

//set up an event listener
window.addEventListener("keydown", doKeyDown, true);
function doKeyDown(e) {
	if(e.keyCode == 37) { //key pressed is LEFT
		paddle.v=-5;
	}
	if(e.keyCode == 39) { //key pressed is RIGHT
		paddle.v=5;
	}
}
window.addEventListener("keyup", doKeyUp, true);
function doKeyUp(e) {
	paddle.v=0;
}