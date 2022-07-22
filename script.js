document.addEventListener("keydown", move);
document.addEventListener("keyup", movestop);

let pressed = false;
let right = true;
let death = false;

class Character {
	pressed = false;
	position = 70;
	interval = 1000;
    fps = 25
    jumpinterval = 20;
	intervalAtk = 75;
	diff = 200;
	left = 40;
    top = 200;
	step = 5;
	right = true;
    jumpState = false
	death = false;
    hp = 10;
    hpWidth 
    reloadTime = 2
    reloadCode = 2
    inReload = false
    canHit = true
    hpnum // узнать сколько полоска занимает от хп
    hpWidthstyle // число сколько сейчас полоска
    hpId
	tID;
    jID;
    
	constructor(num) {
        this.num = num
    }
	createHero(){
        let hero = document.createElement('div')
        hero.classList.add('image')
        demo.append(hero)
    }
	stopAnimate() {
		clearInterval(this.tID);
	}
	moveRight() {
		this.tID = setInterval(() => {
            let canrun = checkCollision(this.num + 1)
            if(this.jumpState === false){
			demo.children[this.num].style.backgroundImage = "url(" + "'" +this.num + "Run.png')";
            }
            if(canrun = true){
			this.left += this.step;
            }
			demo.children[this.num].style.left = this.left + "px";
			demo.children[this.num].style.transform = "scaleX(1)";
			this.right = true;
			demo.children[this.num].style.backgroundPosition = `-${this.position}px -40px`;

			if (this.position < 1600) {
				this.position = this.position + this.diff;
			}
			if (this.position > 1600) {
				this.position = 70;
			}
		}, this.interval / this.fps);
	}
    jump(){
        let fall = false;
        let position = 70
        clearInterval(this.tID);
        this.jumpState = true
        this.jID = setInterval(() => {
			
            if(parseInt(demo.children[this.num].style.top) > 100 && fall === false){
                demo.children[this.num].style.backgroundImage = "url(" + "'" +this.num + "Jump.png')";
                this.top -= 5;
            }else if(parseInt(demo.children[this.num].style.top) <= 200){
                demo.children[this.num].style.backgroundImage = "url(" + "'" +this.num + "Fall.png')";
                fall = true
                this.top += 5;
                if(parseInt(demo.children[this.num].style.top) === 195){
                    clearInterval(this.jID);
                    this.jumpState = false
                    if(this.pressed === false){
                        this.idle()
                    }
                }
            }
			demo.children[this.num].style.top = this.top + "px";
			demo.children[this.num].style.backgroundPosition = `-${position}px -40px`;

			if (position < 400) {
				position = position + this.diff;
			}
			if (position > 400) {
				position = 70;
			}
            console.log(this.top)
		}, this.interval / this.fps);
    }
    takeDamage(){
        if(this.death === false){
            let position = 70;
            let spriteLenght = 800
            this.stopAnimate()
            if(this.num == 1){
                    spriteLenght = 600
                }
    		this.tID = setInterval(() => {
    			demo.children[this.num].style.backgroundImage = "url(" + "'" +this.num + "TakeHit.png')";
    			demo.children[this.num].style.backgroundPosition = `-${position}px -40px`;
    			if (position < spriteLenght) {
    				position = position + this.diff;
    			}
    			if (position > spriteLenght) {
                    
                    this.stopAnimate()
                    if(this.pressed === false){
                        this.idle()
                    }
    				position = 70;
    			}
    		}, this.interval / this.fps);
        }
    }
	idle() {
		let position = 70;
        let spriteLenght = 1600
        this.stopAnimate()
        if(this.num == 1){
                spriteLenght = 800
            }
		this.tID = setInterval(() => {
            if(this.jumpState === false){
			demo.children[this.num].style.backgroundImage = "url(" + "'" +this.num + "Idle.png')";
            }
			demo.children[this.num].style.backgroundPosition = `-${position}px -40px`;
			if (position < spriteLenght) {
				position = position + this.diff;
			}
			if (position > spriteLenght) {
				position = 70;
			}
		}, this.interval / this.fps);
	}
    load() {
    	demo.children[this.num].style.backgroundImage = "url(" + "'" +this.num + "Idle.png')";
    	demo.children[this.num].style.backgroundImage = "url(" + "'" +this.num + "Run.png')";
    	demo.children[this.num].style.backgroundImage = "url(" + "'" +this.num + "Attack1.png')";
    	demo.children[this.num].style.backgroundImage = "url(" + "'" +this.num + "Attack2.png')";
    	demo.children[this.num].style.backgroundImage = "url(" + "'" +this.num + "Jump.png')";
        demo.children[this.num].style.backgroundImage = "url(" + "'" +this.num + "Fall.png')";
        demo.children[this.num].style.backgroundImage = "url(" + "'" +this.num + "TakeHit.png')";
        demo.children[this.num].style.backgroundImage = "url(" + "'" +this.num + "Death.png')";
        
        if(this.num === 0){
            demo.children[this.num].style.top = "200px"
            demo.children[this.num].style.left = "50px"
            demo.children[this.num].style.width = "130px"
            demo.children[this.num].style.height = "100px"
            this.left = 50
            this.hpId =  document.querySelector("#hpNowPlayerOne")
            this.hpId.style.width = window.innerWidth * .4 + "px"
            this.hpWidth = window.innerWidth * .4 + "px"
            this.hp = 10
            this.hpWidthstyle = parseInt(this.hpWidth)
            this.hpnum = this.hp / parseInt(this.hpWidth);
            this.hpId.style.width = this.hpWidthstyle + "px"
        }else{
            demo.children[this.num].style.top = "200px"
            demo.children[this.num].style.left = "150px"
            demo.children[this.num].style.width = "130px"
            demo.children[this.num].style.height = "100px"
            this.left = 150
            this.hpId = document.querySelector("#hpNowPlayerTwo")
            this.hpId.style.width = window.innerWidth * .4 + "px"
            this.hpWidth = window.innerWidth * .4 + "px"
            this.hp = 10
            this.hpWidthstyle = parseInt(this.hpWidth)
            this.hpnum = this.hp / parseInt(this.hpWidth);
            this.hpId.style.width = this.hpWidthstyle + "px"
            this.hpId.style.right = '0px'
        }
        
        this.idle()
    
    }
    calcWidthHp(){
        this.hpWidthstyle = this.hp / this.hpnum;
        this.hpId.style.width = this.hpWidthstyle + "px"
        if(this.num == 1){
            this.hpId.style.right = '0px'
        }
    
    }
    hit(){
        this.hp -= 1
        this.calcWidthHp()
        
        if(this.hp <= 0){
            if(this.num === 0){
                char1.dead()
                if(char1.death === false){
                    alert('Player 2 WIN')
                }
            }else{
                char2.dead()
                if(char2.death === false){
                    alert('Player 1 WIN')
                }
            }
        }
    } 
    moveLeft() {
    	this.tID = setInterval(() => {
            let canrun = checkCollision(this.num + 1)
            demo.children[this.num].style.transform = "scaleX(-1)";
			if(this.jumpState === false){
			demo.children[this.num].style.backgroundImage = "url(" + "'" +this.num + "Run.png')";
            }
            if(canrun = true){
			this.left -= this.step;
            }
    		this.right = false;
    		demo.children[this.num].style.left = this.left - 60 + "px";
    		demo.children[this.num].style.backgroundPosition = `-${this.position}px -40px`;
    
    		if (this.position < 1600) {
    			this.position = this.position + this.diff;
    		}
    		if (this.position > 1600) {
    			this.position = 70;
    		}
    	}, this.interval / this.fps);
    }
    attack() {
        if(this.canHit === true){
            this.canHit = false
            this.hitReload();
        	this.stopAnimate();
        	let position = 70;
        	let numAnim = Math.floor(Math.random() * (3 - 1) + 1);
            let spriteLenght = 1200
                if(this.num == 1){
                    spriteLenght = 800
                }
        	this.tID = setInterval(() => {
        		this.pressed = true;        
                demo.children[this.num].style.backgroundImage = "url(" + "'" +this.num + "Attack" + numAnim + ".png')";
            	demo.children[this.num].style.backgroundPosition = `-${position}px -40px`;
            		if (position < spriteLenght) {
            			position = position + this.diff;
            		}
            		else {
            			this.stopAnimate();
            			this.idle();
            			this.pressed = false;
            			position = 70;
            		}
            	}, this.interval / this.fps);
            takeHit(this.num+1)
        }
    }
    hitReload(){
    let id
        if(this.reloadTime >= 0){
            id = setInterval(() => {
            this.reloadTime--;
            if(this.reloadTime < 0){
                clearInterval(id)
                console.log("reload complete")
                this.canHit = true;
                this.inReload = true;
                this.reloadTime = this.reloadCode;
            }
            }, 250);
        }
        
    }
    
    dead() {
        if(this.death === false){
        	this.stopAnimate();
        	let position = 70;
            let spriteLenght = 1200
            if(this.num == 1){
                    spriteLenght = 1400
                }
        	this.tID = setInterval(() => {
        		this.pressed = true;
        		this.death = true;
        		demo.children[this.num].style.backgroundImage = "url(" + "'" +this.num + "Death.png')";
        		demo.children[this.num].style.backgroundPosition = `-${position}px -40px`;
        		if (position < spriteLenght) {
        			position = position + this.diff;
        		}
        		if (position > spriteLenght) {
        			this.stopAnimate();
        		}
        	}, this.interval / this.fps);
        }
    }
}
    
let char1 = new Character(0);
let char2 = new Character(1);

window.onload = () => {
    char1.createHero()    
   char1.load()
    char2.createHero()    
   char2.load()
}
function move(e) {
	if (e.keyCode === 88 && char1.pressed === false && char1.death === false) {
		char1.stopAnimate();
		char1.dead();
		char1.pressed = true;
	}
    if (e.keyCode === 87 && char1.jumpState === false && char1.death === false) {
		char1.stopAnimate();
		char1.jump();

	}
     if (e.keyCode === 38 && char2.jumpState === false && char1.death === false) {
		char2.stopAnimate();
		char2.jump();

	}
	if (e.keyCode === 65 && char1.pressed === false && char1.death === false) {
		char1.stopAnimate();
		char1.moveLeft();
		char1.pressed = true;
	}
	if (e.keyCode === 68 && char1.pressed === false && char1.death === false) {
		char1.stopAnimate();
		char1.moveRight();
		char1.pressed = true;
	}
	if (e.keyCode === 32 && char1.pressed === false && char1.death === false) {
		char1.attack();
	}
    if (e.keyCode === 191 && char2.pressed === false && char2.death === false) {
		char2.stopAnimate();
		char2.dead();
		char2.pressed = true;
	}
	if (e.keyCode === 37 && char2.pressed === false && char2.death === false) {
		char2.stopAnimate();
		char2.moveLeft();
		char2.pressed = true;
	}
	if (e.keyCode === 39 && char2.pressed === false && char2.death === false) {
		char2.stopAnimate();
		char2.moveRight();
		char2.pressed = true;
	}
	if (e.keyCode === 190 && char2.pressed === false && char2.death === false) {
		char2.attack();
	}
}
function movestop(e) {
	if (e.keyCode === 68 && char1.pressed === true && char1.death === false) {
		char1.stopAnimate();
		char1.pressed = false;
		char1.idle();
	}
	if (e.keyCode === 65 && char1.pressed === true && char1.death === false) {
		char1.stopAnimate();
		char1.pressed = false;
		char1.idle();
	}if (e.keyCode === 39 && char2.pressed === true && char2.death === false) {
		char2.stopAnimate();
		char2.pressed = false;
		char2.idle();
	}
	if (e.keyCode === 37 && char2.pressed === true && char2.death === false) {
		char2.stopAnimate();
		char2.pressed = false;
		char2.idle();
	}
}

// направление right если тру то право если фолс то лево
function takeHit(num){
    if(num === 1){
        if(char1.right === true){
            if(parseInt(demo.children[0].style.left) + parseInt(demo.children[0].style.width) - 30 >= parseInt(demo.children[1].style.left) &&
               parseInt(demo.children[0].style.left) + parseInt(demo.children[0].style.width) - 30 <= parseInt(demo.children[1].style.left) +                                         parseInt(demo.children[1].style.width)-30 && char2.right === true){
                char2.takeDamage()
                char2.hit()
            }else if(parseInt(demo.children[0].style.left) + parseInt(demo.children[0].style.width) >= parseInt(demo.children[1].style.left)+                                               parseInt(demo.children[1].style.width) - 30 && parseInt(demo.children[0].style.left) + 65 <=                                                                           parseInt(demo.children[1].style.left) + parseInt(demo.children[1].style.width) && char2.right === false){
                char2.takeDamage()
                 char2.hit()
            }
        }else{
            if(parseInt(demo.children[0].style.left) + 105 <= parseInt(demo.children[1].style.left) + parseInt(demo.children[1].style.width) &&
                parseInt(demo.children[0].style.left) >= parseInt(demo.children[1].style.left) - 60 &&
                char2.right === true){
                char2.takeDamage()
                 char2.hit()
            }else if(parseInt(demo.children[0].style.left) + 30 <= parseInt(demo.children[1].style.left) + parseInt(demo.children[1].style.width) &&
                    parseInt(demo.children[0].style.left) >= parseInt(demo.children[1].style.left) &&
                    char2.right === false){
                    char2.takeDamage()
                 char2.hit()
            }
        }
    }else{
        if(char2.right === true){
            if(parseInt(demo.children[1].style.left) + parseInt(demo.children[1].style.width) - 30 >= parseInt(demo.children[0].style.left) &&
               parseInt(demo.children[1].style.left) + parseInt(demo.children[1].style.width) - 30 <= parseInt(demo.children[0].style.left) +                                         parseInt(demo.children[0].style.width)-30 && char1.right === true){
                char1.takeDamage()
                 char1.hit()
            }else if(parseInt(demo.children[1].style.left) + parseInt(demo.children[1].style.width) >= parseInt(demo.children[0].style.left)+                                               parseInt(demo.children[0].style.width) - 30 && parseInt(demo.children[1].style.left) + 65 <=                                                                           parseInt(demo.children[0].style.left) + parseInt(demo.children[0].style.width) && char1.right === false){
                char1.takeDamage()
                char1.hit()
            }
        }else{
            if(parseInt(demo.children[1].style.left) + 105 <= parseInt(demo.children[0].style.left) + parseInt(demo.children[0].style.width) &&
                parseInt(demo.children[1].style.left) >= parseInt(demo.children[0].style.left) - 60 &&
                char1.right === true){
                char1.takeDamage()
                char1.hit()
            }else if(parseInt(demo.children[1].style.left) + 30 <= parseInt(demo.children[0].style.left) + parseInt(demo.children[0].style.width) &&
                    parseInt(demo.children[1].style.left) >= parseInt(demo.children[0].style.left) &&
                    char1.right === false){
                    char1.takeDamage()
                char1.hit()
            }
        }
    }
}

function checkCollision(num){
    let charWidth = 25
        if(num === 1){
            if(char1.right === true){
                if(parseInt(demo.children[0].style.top) === parseInt(demo.children[1].style.top) &&
                    parseInt(demo.children[0].style.left) + charWidth === parseInt(demo.children[1].style.left) &&
                    char2.right === true){
                    return false
                }else if(parseInt(demo.children[0].style.top) === parseInt(demo.children[1].style.top) &&
                    parseInt(demo.children[0].style.left) + charWidth === parseInt(demo.children[1].style.left) + 65 &&
                    char2.right === false){
                    return false
                    
                }
            }else{
                if(parseInt(demo.children[0].style.top) === parseInt(demo.children[1].style.top) &&
                   parseInt(demo.children[0].style.left) + 65 === parseInt(demo.children[1].style.left) + charWidth &&
                    char2.right === true){
                    return false
                }else if(parseInt(demo.children[0].style.top) === parseInt(demo.children[1].style.top) &&
                           parseInt(demo.children[0].style.left) + 30 === parseInt(demo.children[1].style.left) + 50 &&
                            char2.right === false){
                    return false
                }
            }
        }else{
            if(char2.right === true){
                if(parseInt(demo.children[1].style.top) === parseInt(demo.children[0].style.top) &&
                    parseInt(demo.children[1].style.left) + charWidth === parseInt(demo.children[0].style.left) &&
                    char1.right === true){
                    return false
                }else if(parseInt(demo.children[1].style.top) === parseInt(demo.children[0].style.top) &&
                    parseInt(demo.children[1].style.left) + charWidth === parseInt(demo.children[0].style.left) + 65 &&
                    char1.right === false){
                    return false
                    
                }
            }else{
                if(parseInt(demo.children[1].style.top) === parseInt(demo.children[0].style.top) &&
                   parseInt(demo.children[1].style.left) + 65 === parseInt(demo.children[0].style.left) + charWidth &&
                    char1.right === true){
                    return false
                }else if(parseInt(demo.children[1].style.top) === parseInt(demo.children[0].style.top) &&
                           parseInt(demo.children[1].style.left) + 30 === parseInt(demo.children[0].style.left) + 50 &&
                            char1.right === false){
                    return false
                }
            }
        }
    // if(char1.right === false){
    //     if(parseInt(demo.children[0].style.left) <= 0 || parseInt(demo.children[0].style.left) >= innerWidth ){
    //         return false
    //     }
    //     if(parseInt(demo.children[1].style.left) <= 0 || parseInt(demo.children[1].style.left) >= innerWidth){
    //         console.log("Стена")
    //     }
    // }
        
    return true
}
let time = 30
function timer(){
    let intevalID
    intevalID = setInterval(() => {        
        time -= 1
        document.getElementById('time').textContent = time
        if(time == 0){
            clearInterval(intevalID)
            if(char1.hp > char2.hp){
               alert('Player 1 WIN')
            }else if(char2.hp > char1.hp){
               alert('Player 2 WIN')
            }else{
               alert('DRAW')
            }
            char1.load()
            char2.load()
            time = 30
            timer()
        }
        

    },1000)
}
timer()