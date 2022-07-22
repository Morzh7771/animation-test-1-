let attackLength = 85
    if(num === 1){
        if(char1.right === true){
            if(parseInt(demo.children[0].style.top) === parseInt(demo.children[1].style.top) &&
               parseInt(demo.children[0].style.left) + attackLength >= parseInt(demo.children[1].style.left) &&
               parseInt(demo.children[0].style.left) <= parseInt(demo.children[1].style.left) + parseInt(demo.children[1].style.width) ){
                char2.takeDamage()
            }
        }else{
            if(parseInt(demo.children[0].style.top) === parseInt(demo.children[1].style.top) &&
               parseInt(demo.children[0].style.left) - attackLength <= parseInt(demo.children[1].style.left) &&
               parseInt(demo.children[0].style.left) >= parseInt(demo.children[1].style.left)){
                char2.takeDamage()
            }
        }
    }else{
        if(char2.right === true){
            if(parseInt(demo.children[1].style.top) === parseInt(demo.children[0].style.top) &&
               parseInt(demo.children[1].style.left) + attackLength >= parseInt(demo.children[0].style.left) &&
               parseInt(demo.children[1].style.left) <= parseInt(demo.children[0].style.left)){
                char1.takeDamage()
            }
        }else{
            if(parseInt(demo.children[1].style.top) === parseInt(demo.children[0].style.top) &&
               parseInt(demo.children[1].style.left) - attackLength <= parseInt(demo.children[0].style.left) &&
               parseInt(demo.children[1].style.left) >= parseInt(demo.children[0].style.left)){
                char1.takeDamage()
            }
        }
    }